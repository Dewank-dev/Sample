from pathlib import Path
import streamlit.components.v1 as components
_component=components.declare_component("royal_wedding_invitation",path=str(Path(__file__).resolve().parent/"frontend"))
def wedding_preview(config,assets,audio,key="wedding_preview"):
    return _component(config=config,assets=assets,audio=audio or "",key=key,default=None)
