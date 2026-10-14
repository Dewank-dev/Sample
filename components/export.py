from __future__ import annotations
import base64,json,subprocess,tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

def embedded_assets():
    result={}
    for key,path in {"mandap":"assets/mandap/mandap-canopy.jpg","ganesha":"assets/flowers/ganesha-medallion.jpg","peacock":"assets/peacock/peacock-pair.jpg"}.items():
        f=ROOT/path
        if f.exists():result[key]="data:image/jpeg;base64,"+base64.b64encode(f.read_bytes()).decode()
    return result

def standalone_html(config,audio_url=""):
    page=(ROOT/"components/frontend/index.html").read_text();css=(ROOT/"styles/wedding.css").read_text();js="\n".join((ROOT/"animation"/n).read_text() for n in ("scenes.js","particles.js","decorations.js","text.js","transitions.js","engine.js"))
    page=page.replace('<link rel="stylesheet" href="/styles/wedding.css">',f"<style>{css}</style>")
    page=page.replace("<script>(()=>{const send=",f"<script>{js}</script><script>(()=>{{const send=")
    page=page.replace("window.addEventListener('message',e=>{if(e.data?.type==='streamlit:render')init(e.data.args||{})});",f"init({{config:{json.dumps(config,ensure_ascii=False)},assets:{json.dumps(embedded_assets())},audio:{json.dumps(audio_url)}}});")
    page=page.replace("function load(){return Promise.all(scripts.map(src=>new Promise((ok,no)=>{let s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})))}","function load(){return Promise.resolve()}")
    page=page.replace("document.querySelector('#html').onclick=()=>send('wedding:download-html');","document.querySelector('#html').onclick=()=>save(new Blob([document.documentElement.outerHTML],{type:'text/html'}),'wedding-invitation.html');")
    page=page.replace("send('streamlit:setComponentValue',{value:{type:'wedding-webm',data:r.result.split(',')[1]}});","save(blob,'wedding-invitation.webm');")
    page=page.replace("busy(false,'Video sent for MP4 encoding. Download it from the app panel.')","busy(false,'WebM downloaded. Use FFmpeg to convert it to MP4 if required.')")
    return page.encode()

def convert_webm_to_mp4(webm):
    if not webm:raise ValueError("The browser returned an empty recording.")
    with tempfile.TemporaryDirectory(prefix="wedding-video-") as folder:
        src=Path(folder)/"recording.webm";out=Path(folder)/"invitation.mp4";src.write_bytes(webm)
        args=["ffmpeg","-hide_banner","-loglevel","error","-y","-i",str(src),"-vf","scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,fps=30","-c:v","libx264","-preset","veryfast","-crf","22","-pix_fmt","yuv420p","-movflags","+faststart","-c:a","aac","-b:a","128k",str(out)]
        try:r=subprocess.run(args,capture_output=True,text=True,timeout=240)
        except FileNotFoundError as e:raise RuntimeError("FFmpeg is missing. Install it with `sudo apt install ffmpeg`.") from e
        except subprocess.TimeoutExpired as e:raise RuntimeError("MP4 encoding timed out. Download WebM instead.") from e
        if r.returncode or not out.is_file():raise RuntimeError((r.stderr or "FFmpeg failed to encode the recording.")[-1200:])
        return out.read_bytes()
