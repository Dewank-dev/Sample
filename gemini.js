import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI();

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
            if ((error.status === 503 || error.status === 429) && attempt < maxRetries) {
                const waitTime = attempt * 2000;
                console.warn(`[${model}] Busy (Status ${error.status}). Retrying in ${waitTime / 1000}s... (Attempt ${attempt}/${maxRetries})`);
                await sleep(waitTime);
            } else {
                throw error;
            }
        }
    }
}

async function main() {
    const userPrompt = process.argv.slice(2).join(" ");
    if (!userPrompt) {
        console.log("Please provide a prompt.");
        return;
    }

    let htmlContext = "";
    if (fs.existsSync('index.html')) {
        htmlContext = fs.readFileSync('index.html', 'utf8');
    }

    const fullPrompt = `
You are a frontend developer working on a luxury interactive wedding invitation ("Dewank & Anuradha").
Current index.html content:
\`\`\`html
${htmlContext}
\`\`\`

User Request: ${userPrompt}
`;

    // Try primary stable model first, fallback to pro if busy
    const modelsToTry = ['gemini-2.5-flash', 'gemini-2.5-pro'];

    for (const model of modelsToTry) {
        try {
            console.log(`Sending request using ${model}...`);
            const text = await generateWithRetry(model, fullPrompt);
            console.log(`\n--- Response from ${model} ---\n` + text + "\n");
            return;
        } catch (error) {
            console.warn(`Model ${model} failed after retries. Trying fallback...`);
        }
    }

    console.error("All model endpoints are busy. Please try again shortly.");
}

main();