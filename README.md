# Shubh Vivah Invitation

A mobile-first wedding invitation built as a static HTML, CSS, and vanilla JavaScript site. The invitation needs no build step or npm dependencies to run or deploy.

## Run locally

From the project folder:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>. Stop the server with `Ctrl+C`.

## Deploy the invitation

Deploy the invitation files to any static host, including Netlify Drop. Include `index.html`, `favicon.svg`, `card.jpg`, `hero.mp4`, `hero-poster.jpg`, `music.mp3`, and `chime.mp3` together so their relative paths continue to work. Do not include `send.html` in the public deployment; it has no access control.

## Project files

- `index.html` — invitation, styling, interactions, and RSVP form.
- `send.html` — guest-message builder for creating personalized invitation links and WhatsApp messages. It has no access control, so use it locally rather than deploying it publicly.
- `Code.gs` — Google Apps Script endpoint for saving RSVP replies.
- `gemini.js` — optional command-line helper that asks Gemini for suggested site changes; it prints suggestions and does not edit files.
- `hero.mp4` and `hero-poster.jpg` — hero video and its matching still image.
- `music.mp3` and `chime.mp3` — optional invitation music and interaction chime.
- `card.jpg` — downloadable invitation card used by the site and guest-message helper.
- `favicon.svg` — browser tab icon.

## Customize before publishing

Update the wedding information in the `weddingData` object and the visible invitation copy in `index.html`. Change the RSVP endpoint URL in `index.html` if you use a different Apps Script deployment. To prepare guest invitations, open `send.html` locally and paste guest names and phone numbers. Replace media files while keeping their filenames, or update the matching references in `index.html` and `send.html`.

## Optional Gemini helper

The static invitation does not use Node.js. To run the Gemini helper, use Node.js 20 or later, install its dependency, and provide a Gemini API key through the environment:

```bash
npm install
export GEMINI_API_KEY="your-api-key"
npm run generate -- "Suggest a more compact mobile hero layout"
```

The response is printed in the terminal. Review and apply any suggested changes yourself. `package-lock.json` is committed to keep the helper dependency versions reproducible.
