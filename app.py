"""Royal invitation studio: Streamlit editor plus Canvas animation engine."""
import base64,hashlib
import streamlit as st
from components.editor import render_editor,validate
from components.export import embedded_assets,standalone_html,convert_webm_to_mp4
from components.preview import wedding_preview

def _audio_url(upload):
    if not upload:return ""
    return f"data:{upload.type or 'audio/mpeg'};base64,{base64.b64encode(upload.getvalue()).decode('ascii')}"

def main():
    st.set_page_config(page_title="Royal Wedding Invitation Studio",page_icon="💐",layout="wide",initial_sidebar_state="expanded")
    st.markdown("""<style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Cormorant+Garamond:wght@400;500;600&display=swap');
    [data-testid="stAppViewContainer"]{background:radial-gradient(ellipse at 50% 0%,#fffdf7,#f6ead3 74%,#efdfc2);color:#35191b}
    [data-testid="stHeader"],[data-testid="stToolbar"],footer,#MainMenu,[data-testid="stDecoration"],[data-testid="manage-app-button"],[data-testid="stAppDeployButton"],[data-testid="stStatusWidget"],#stDeployButton,.viewerBadge_container__1QSob,a[href*="github.com"]{display:none!important}
    [data-testid="stMainBlockContainer"]{max-width:1440px;padding-top:1.25rem;padding-bottom:2rem}h1{font-family:Cinzel,Georgia,serif!important;color:#681729!important}h2,h3{font-family:'Cormorant Garamond',Georgia,serif!important;color:#6f1e2a!important}
    [data-testid="stExpander"]{border:1px solid rgba(185,139,63,.35)!important;border-radius:15px!important;background:rgba(255,253,247,.78)!important;margin-bottom:9px!important;box-shadow:0 5px 15px rgba(64,31,18,.045)}[data-testid="stExpander"] summary{font-family:Cinzel,Georgia,serif;font-size:.82rem;color:#681729}
    [data-testid="stTextInput"] input,[data-testid="stTextArea"] textarea,[data-testid="stDateInput"] input,[data-testid="stTimeInput"] input{background:#fffdf8;border-color:#d5bd8c;border-radius:9px}[data-testid="stFileUploader"]{border:1px dashed #bd9652;border-radius:14px;padding:8px;background:#fffaf0}
    .editor-title{text-align:center;font:600 1rem Cinzel,Georgia,serif;color:#8e0e17;padding:8px 0 15px;letter-spacing:.07em}.preview-title{text-align:center;font:600 .85rem Cinzel,Georgia,serif;letter-spacing:.16em;text-transform:uppercase;color:#7d2630;margin:2px 0 10px}.lede{text-align:center;color:#765d47;font:italic 1.1rem 'Cormorant Garamond',Georgia,serif;margin:-7px 0 18px}[data-testid="stDownloadButton"] button{border:1px solid #a57b36;background:linear-gradient(135deg,#f6dfa0,#d6ac5e);color:#3a1820;border-radius:999px}
    @media(max-width:700px){[data-testid="stMainBlockContainer"]{padding:1rem .7rem}.preview-title{margin-top:22px}}
    </style>""",unsafe_allow_html=True)
    st.title("Royal Wedding Invitation Studio")
    st.markdown("<p class='lede'>Create a living invitation in marigold, ivory and antique gold.</p>",unsafe_allow_html=True)
    left,right=st.columns([1.05,.95],gap="large")
    with left:data,music=render_editor()
    with right:
        st.markdown("<div class='preview-title'>Your animated invitation</div>",unsafe_allow_html=True)
        for issue in validate(data):st.warning(issue)
        audio=_audio_url(music);value=wedding_preview(data,embedded_assets(),audio)
        if isinstance(value,dict) and value.get("type")=="wedding-webm" and value.get("data"):
            encoded=value["data"];digest=hashlib.sha256(encoded.encode()).hexdigest()
            if st.session_state.get("converted_id")!=digest:
                try:
                    with st.spinner("Encoding the animation as an MP4…"):
                        st.session_state["mp4_video"]=convert_webm_to_mp4(base64.b64decode(encoded,validate=True))
                    st.session_state["converted_id"]=digest;st.success("Your MP4 invitation is ready.")
                except (ValueError,RuntimeError,base64.binascii.Error) as err:st.error(f"MP4 export failed: {err}")
        if st.session_state.get("mp4_video"):
            st.download_button("Download MP4 invitation",st.session_state["mp4_video"],"wedding-invitation.mp4","video/mp4",use_container_width=True)
        st.download_button("Download standalone HTML invitation",standalone_html(data,audio),"wedding-invitation.html","text/html",use_container_width=True)
        st.caption("Video export contains the invitation only. The HTML invitation runs offline in a modern browser; no API key is needed.")

if __name__=="__main__":main()
