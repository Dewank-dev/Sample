"""Editable couple and function details, with weekday derived from dates."""
from datetime import date, time
import streamlit as st

DEFAULTS=[
 {"name":"Haldi","date":date(2026,11,21),"time":time(12),"venue":"Shukla Family Residence, Prayagraj","theme":"Yellow","color":"#E4B735"},
 {"name":"Mehendi","date":date(2026,11,23),"time":time(16),"venue":"Shukla Family Residence, Prayagraj","theme":"Green","color":"#66884F"},
 {"name":"Sangeet","date":date(2026,11,25),"time":time(21),"venue":"Shukla Family Residence, Prayagraj","theme":"Colorful","color":"#A74B73"},
 {"name":"Baraat","date":date(2026,11,25),"time":time(17),"venue":"Shukla Family Residence, Prayagraj","theme":"Royal Maroon and Gold","color":"#711C30"},
 {"name":"Vivah / Phere","date":date(2026,11,25),"time":time(14),"venue":"Pandey Family Residence, Prayagraj","theme":"Traditional Red and Gold","color":"#A6262C"},
]

def render_editor():
    st.markdown("<div class='editor-title'>✦ &nbsp; YOUR CELEBRATION &nbsp; ✦</div>",unsafe_allow_html=True)
    with st.expander("Couple details",expanded=True):
        a,b=st.columns(2);groom=a.text_input("Groom","Dewank",max_chars=60);bride=b.text_input("Bride","Anuradha",max_chars=60)
        location=st.text_input("Wedding location","Prayagraj, Uttar Pradesh",max_chars=120)
        invitation=st.text_area("Invitation line","With the blessings of our families, we invite you to celebrate our wedding.",max_chars=240,height=75)
    functions=[]
    for i,base in enumerate(DEFAULTS):
        with st.expander(base["name"],expanded=i==0):
            a,b=st.columns([1.3,.7]);name=a.text_input("Function name",base["name"],key=f"name{i}",max_chars=60);theme=b.text_input("Theme",base["theme"],key=f"theme{i}",max_chars=40)
            a,b=st.columns(2);day=a.date_input("Date",base["date"],key=f"date{i}",min_value=date(2020,1,1),max_value=date(2040,12,31),format="DD MMM YYYY");at=b.time_input("Time",base["time"],key=f"time{i}",step=900)
            venue=st.text_input("Venue",base["venue"],key=f"venue{i}",max_chars=140);a,b=st.columns([.35,1.65]);color=a.color_picker("Accent",base["color"],key=f"color{i}");desc=b.text_input("Optional note","",key=f"desc{i}",max_chars=180)
            functions.append({"name":name.strip(),"date":day.strftime("%d %B %Y"),"weekday":day.strftime("%A"),"time":at.strftime("%I:%M %p").lstrip("0"),"venue":venue.strip(),"theme":theme.strip(),"color":color,"description":desc.strip()})
    with st.expander("Closing message"):
        blessing=st.text_area("Blessing / final message","Your presence and blessings will make our celebration complete.",max_chars=300,height=85)
    with st.expander("Music"):
        music=st.file_uploader("Background music (optional)",type=["mp3","wav","m4a"],help="Audio starts only after pressing Play. Files up to 15 MB.")
        if music and music.size>15*1024*1024: st.warning("Please choose an audio file smaller than 15 MB.");music=None
    with st.expander("Animation settings"):
        duration=st.slider("Invitation duration",30,40,34,format="%d seconds")
        background=st.selectbox("Paper style",["Warm ivory","Antique parchment","Rose ivory"])
    return {"groom":groom.strip(),"bride":bride.strip(),"location":location.strip(),"invitation":invitation.strip(),"blessing":blessing.strip(),"functions":functions,"duration":duration,"background":background},music

def validate(data):
    errors=[]
    for key,label in (("groom","groom name"),("bride","bride name"),("location","wedding location")):
        if not data[key]:errors.append(f"Please enter the {label}.")
    for item in data["functions"]:
        if not item["name"]:errors.append("Each function needs a name.")
        if not item["venue"]:errors.append(f"Add a venue for {item['name'] or 'a function'}.")
    return errors
