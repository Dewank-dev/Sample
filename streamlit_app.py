"""Serve the static wedding invitation through Streamlit Community Cloud."""

from __future__ import annotations

import base64
from pathlib import Path

import streamlit as st
from streamlit.components.v1 import html as html_component


ROOT = Path(__file__).resolve().parent
ASSETS = {
    "hero.mp4": "video/mp4",
    "hero-poster.jpg": "image/jpeg",
    "card.jpg": "image/jpeg",
    "music.mp3": "audio/mpeg",
    "chime.mp3": "audio/mpeg",
}


def asset_data_url(filename: str, mime_type: str) -> str:
    """Return an embedded URL for an invitation asset."""
    asset = (ROOT / filename).read_bytes()
    encoded = base64.b64encode(asset).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


def invitation_markup() -> str:
    source = (ROOT / "index.html").read_text(encoding="utf-8")
    for filename, mime_type in ASSETS.items():
        source = source.replace(filename, asset_data_url(filename, mime_type))
    return source


def main() -> None:
    st.set_page_config(
        page_title="Dewank Shukla & Anuradha Pandey Wedding",
        page_icon="favicon.svg",
        layout="wide",
        initial_sidebar_state="collapsed",
    )

    st.markdown(
        """
        <style>
          [data-testid="stHeader"], [data-testid="stToolbar"],
          [data-testid="stDecoration"], footer, #MainMenu,
          [data-testid="stSidebar"], [data-testid="manage-app-button"],
          [data-testid="stAppDeployButton"],
          a[href*="github.com"], a[href*="streamlit.io"] {
            display: none !important;
          }
          [data-testid="stAppViewContainer"], [data-testid="stMain"],
          [data-testid="stMainBlockContainer"] {
            width: 100% !important;
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          [data-testid="stVerticalBlock"] { gap: 0 !important; }
          [data-testid="stElementContainer"] { margin: 0 !important; padding: 0 !important; }
          html, body, #root, [data-testid="stAppViewContainer"] {
            height: 100%;
            overflow: hidden;
          }
          [data-testid="stIFrame"], [data-testid="stIFrame"] iframe {
            height: 100vh !important;
            height: 100svh !important;
            height: 100dvh !important;
            min-height: 100svh !important;
            max-height: 100dvh !important;
          }
        </style>
        """,
        unsafe_allow_html=True,
    )
    html_component(invitation_markup(), height=844, scrolling=True)


if __name__ == "__main__":
    main()
