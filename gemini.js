import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

// Helper to delay execution during retries
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateWithRetry(model, prompt, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: model,
                contents: prompt,
            });
            return response.text;
        } catch (error) {
            // If server is busy (503/429), wait and retry
            if ((error.status === 503 || error.status === 429) && attempt < maxRetries) {
                const waitTime = attempt * 2000; // 2s, then 4s
                console.warn(`[${model}] Busy (Status ${error.status}). Retrying in ${waitTime / 1000}s... (Attempt ${attempt}/${maxRetries})`);
                await sleep(waitTime);
            } else {
                throw error;
            }
        }
    }
}

async function main() {
    const prompt = process.argv.slice(2).join(" ");
    if (!prompt) {
        console.log("Please provide a prompt.");
        return;
    }

    const modelsToTry = [
        'gemini-3.8-flash',
        'gemini-3.7-flash',
        'gemini-3.6-flash'
    ];

    for (const model of modelsToTry) {
        try {
            const text = await generateWithRetry(model, prompt);
            console.log(`\n[Response from ${model}]:\n` + text + "\n");
            return;
        } catch (error) {
            console.warn(`Model ${model} failed after retries. Trying next model...`);
        }
    }

    console.error("All models are experiencing high traffic right now. Please try your request again in a few seconds.");
}

main();