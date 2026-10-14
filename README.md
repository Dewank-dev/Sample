# Royal Wedding Invitation Studio

A Streamlit wedding invitation editor with a responsive 9:16 HTML Canvas animation inspired by the local traditional wedding video reference. Names, five function cards, dates, weekdays, times, venues, colors, notes, closing copy, paper style, duration and background music are editable. English/Hindi copy is rendered separately from the decorative scene.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
# Ubuntu / Debian: install the MP4 encoder
sudo apt install ffmpeg
streamlit run streamlit_app.py
```

The preview and standalone HTML export work without API keys. The MP4 button records the canvas in the browser, sends that recording to Streamlit, then converts it with FFmpeg. Keep the preview tab open during the 30–40 second recording and encoding. WebM is available as a browser fallback. Audio begins only after a user presses Play or starts a recording.

## Deploy to Streamlit Community Cloud

1. Push this project to a GitHub repository.
2. Create a Community Cloud app and set the entry point to `streamlit_app.py`.
3. Community Cloud installs Python dependencies from `requirements.txt` and the FFmpeg system package from `packages.txt`.
4. Open the app and verify the preview and MP4 export in the deployed browser.

The app includes a downloadable standalone HTML invitation with local imagery and the selected audio embedded. Open it in a modern browser to play the animation offline. It does not include Streamlit UI.

## Project layout

- `app.py`, `streamlit_app.py`: Streamlit UI and deploy entry point
- `components/editor.py`: wedding form and validation
- `components/preview.py`: isolated interactive HTML component
- `components/export.py`: standalone HTML and FFmpeg MP4 encoding
- `animation/`: timed scene, particle, decoration, typography, transition and canvas-engine modules
- `components/frontend/`: static HTML component files (the JS/CSS files mirror `animation/` and `styles/` for the component static server)
- `assets/`: locally bundled crops taken from the provided visual reference video

Missing optional artwork is skipped safely; system/browser Devanagari fonts are used when available, with serif fallbacks.
