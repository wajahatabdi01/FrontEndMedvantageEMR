import React, { useState } from 'react'
import BoxHeading from './BoxHeading'
import "../assets/css/patientMonitoringDashboard.css"
import Monochrome from "../assets/images/icons/Monochrome.png";
import Saturation from "../assets/images/icons/Saturation.png";
import Contrast from "../assets/images/icons/Contrast.png";

import BlindUsers from "../assets/images/icons/BlindUsers.png";
import Mute from "../assets/images/icons/Mute.png";
import ReadMask from "../assets/images/icons/ReadMask.png";
import HoverEffect from "../assets/images/icons/HoverEffect.png";
import Reset from "../assets/images/icons/Reset.png";




export default function WCAGPopup(props) {
    let [showIcon, setShowIcon] = useState(0)
    let [isStopVoice, setIsStopVoice] = useState(0)
    let btnOpenChatBox = () => {
        setShowIcon(1)
        document.querySelector(".chatBox").style.display = "block";
    }
    let btnCloseChatBox = () => {
        setShowIcon(0)
        document.querySelector(".chatBox").style.display = "none";
    }
    let changeText = (color) => {
        document.documentElement.style.setProperty('--secondary-color', color);

    }
    let changeHeadingText = (color) => {
        document.documentElement.style.setProperty('--primary-color', color);

    }
    let changebuttonText = (color) => {
        document.documentElement.style.setProperty('--primary-bg-btn-text-color', color);

    }
    let changebgbutton = (color) => {
        document.documentElement.style.setProperty('--primary-bg-btn-color', color);

    }
    let changebodygrayscale = (val) => {
        // let a = document.getElementsByTagName("html").style.filter;
        // console.log("filter ", a)
        Array.from(document.getElementsByTagName("html"))
            .forEach(el => {
                if (el.style.filter !== "grayscale(100%) saturate(0%) brightness(70%) contrast(150%)") {
                    el.style.filter = 'grayscale(100%) saturate(0%) brightness(70%) contrast(150%)'
                }
                else {
                    el.style.filter = 'grayscale(0%) saturate(100%) brightness(100%) contrast(100%)'
                }
            });
        // .forEach(el => el.style.filter = 'grayscale(100%)');
    }
    let changebodylowsaturation = (val) => {
        // let a = document.getElementsByTagName("html").style.filter;
        // console.log("filter ", a)
        Array.from(document.getElementsByTagName("html"))
            .forEach(el => {
                if (el.style.filter !== "saturate(60%)") {
                    el.style.filter = 'saturate(60%)'
                }
                else {
                    el.style.filter = 'saturate(100%)'
                }
            });
        // .forEach(el => el.style.filter = 'grayscale(100%)');
    }
    let changebodydarkcontrast = () => {
        Array.from(document.getElementsByTagName("html"))
            .forEach(el => {
                // el.style.background = "black "
                // el.style.color = "white "
                if (el.style.filter !== "grayscale(100%) brightness(55%) contrast(650%) saturate(300%)") {
                    el.style.filter = 'grayscale(100%) brightness(55%) contrast(650%) saturate(300%)';

                }
                else {
                    el.style.filter = 'grayscale(0%) contrast(100%) brightness(100%) saturate(100%)'

                }
            });
    }
    let changebodyhighcontrast = () => {
        Array.from(document.getElementsByTagName("html"))
            .forEach(el => {
                if (el.style.filter !== " brightness(80%) contrast(180%) saturate(100%)") {
                    el.style.filter = ' brightness(80%) contrast(180%) saturate(100%)';

                }
                else {
                    el.style.filter = 'grayscale(0%) contrast(100%) brightness(100%) saturate(100%)'

                }
            });
    }
    let handleReadMask = () => {
        if (props.showReadMask === 0) {
            props.setReadMask(1)
            const blur_elem = document.getElementById("blur-around");

            document.onmousemove = (evt) => {
                blur_elem.style.transform = `translate(${0}px, ${evt.clientY}px)`;
                // blur_elem.style.left = evt.clientX + "px";
                // blur_elem.style.top =  evt.clientY / 420 + "px";
            };
        }
        else {
            props.setReadMask(0)
            document.removeEventListener("onmousemove", () => { }, false)

        }
    }

    let handleSpeak = () => {

        if (isStopVoice === 0) {
            let selectedText = ""

            document.onmouseup = () => {

                if (window.getSelection) {
                    selectedText = window.getSelection();
                    console.log("text", selectedText)

                    let textToSpeak = selectedText;
                    let speakData = new SpeechSynthesisUtterance();
                    speakData.volume = 1; // From 0 to 1
                    speakData.rate = 0.75; // From 0.1 to 10
                    speakData.pitch = 2; // From 0 to 2
                    speakData.text = textToSpeak;
                    speakData.lang = 'en';
                    speakData.voice = getVoices()[0];

                    speechSynthesis.speak(speakData);
                }
                else {
                    let textToSpeak = "";
                    let speakData = new SpeechSynthesisUtterance();
                    speakData.volume = 1; // From 0 to 1
                    speakData.rate = 0.75; // From 0.1 to 10
                    speakData.pitch = 2; // From 0 to 2
                    speakData.text = textToSpeak;
                    speakData.lang = 'en';
                    speakData.voice = getVoices()[0];

                    speechSynthesis.speak(speakData);
                }
            }

            setIsStopVoice(1)

        }
        else {
            setIsStopVoice(0)
            document.onmouseup = ()=>{}
        }
    }
    function getVoices() {
        let voices = speechSynthesis.getVoices();
        if (!voices.length) {
            let utterance = new SpeechSynthesisUtterance("");
            speechSynthesis.speak(utterance);
            voices = speechSynthesis.getVoices();
        }
        return voices;
    }
    return (
        <>
<div className="hideOnprint">
            <div className="chatBox floats" id="t" style={{bottom:"25px", left:"5px"}}>
                {/* <i className="bi bi-x-octagon-fill iconCloseChatBox" title='Close Window' onClick={btnCloseChatBox}></i> */}
                <h3 className='colorpallat'>User Accessibility Adjustment Setting</h3>
                <div className='colorpallate-cnt'>
                    <div className='whitebox-cnt'>
                        <h4>Color Adjustments</h4>
                        <div className='satu-cnt'>
                            <span className='satu' onClick={() => changebodygrayscale()}><img src={Monochrome} alt='' /> Monochrome</span>
                            <span className='satu' onClick={() => changebodylowsaturation()}><img src={Saturation} alt='' />Low Saturation</span>
                            <span className='satu' onClick={() => changebodydarkcontrast()}><img src={Contrast} alt='' />Dark Contrast</span>
                            <span className='satu' onClick={() => changebodyhighcontrast()}><img src={Saturation} alt='' />High Saturation</span>
                        </div>
                    </div>

                    <div className='whitebox-cnt'>
                        <h4>Text Color Adjust</h4>
                        <div className='d-flex flex-wrap gap-2 mbb'>
                            <span className='collorpallate' onClick={() => changeText("#002F75")} style={{ background: "#002F75" }}></span>
                            <span className='collorpallate' onClick={() => changeText("#BD0000")} style={{ background: "#BD0000" }}></span>
                            <span className='collorpallate' onClick={() => changeText("#BDB600")} style={{ background: "#BDB600" }}></span>
                            <span className='collorpallate' onClick={() => changeText("#00BDBD")} style={{ background: "#00BDBD" }}></span>
                            <span className='collorpallate' onClick={() => changeText("#ffffff")} style={{ background: "#ffffff", border: "1px solid  #cdc5c5" }}></span>
                        </div>

                        <h4>Heading Text Color Adjust</h4>
                        <div className='d-flex flex-wrap gap-2 mbb'>
                            <span className='collorpallate' onClick={() => changeHeadingText("#002F75")} style={{ background: "#002F75" }}></span>
                            <span className='collorpallate' onClick={() => changeHeadingText("#BD0000")} style={{ background: "#BD0000" }}></span>
                            <span className='collorpallate' onClick={() => changeHeadingText("#BDB600")} style={{ background: "#BDB600" }}></span>
                            <span className='collorpallate' onClick={() => changeHeadingText("#00BDBD")} style={{ background: "#00BDBD" }}></span>
                            <span className='collorpallate' onClick={() => changeHeadingText("#ffffff")} style={{ background: "#ffffff", border: "1px solid  #cdc5c5" }}></span>
                        </div>


                        <h4>Button Color Adjust</h4>
                        <div className='d-flex flex-wrap gap-2 mbb'>
                            <span className='collorpallate' onClick={() => changebgbutton("#002F75")} style={{ background: "#002F75" }}></span>
                            <span className='collorpallate' onClick={() => changebgbutton("#BD0000")} style={{ background: "#BD0000" }}></span>
                            <span className='collorpallate' onClick={() => changebgbutton("#BDB600")} style={{ background: "#BDB600" }}></span>
                            <span className='collorpallate' onClick={() => changebgbutton("#00BDBD")} style={{ background: "#00BDBD" }}></span>
                            <span className='collorpallate' onClick={() => changebgbutton("#ffffff")} style={{ background: "#ffffff", border: "1px solid  #cdc5c5" }}></span>
                        </div>

                        <h4>Button Text Color Adjust</h4>
                        <div className='d-flex flex-wrap gap-2 mbb'>
                            <span className='collorpallate' onClick={() => changebuttonText("#002F75")} style={{ background: "#002F75" }}></span>
                            <span className='collorpallate' onClick={() => changebuttonText("#BD0000")} style={{ background: "#BD0000" }}></span>
                            <span className='collorpallate' onClick={() => changebuttonText("#BDB600")} style={{ background: "#BDB600" }}></span>
                            <span className='collorpallate' onClick={() => changebuttonText("#00BDBD")} style={{ background: "#00BDBD" }}></span>
                            <span className='collorpallate' onClick={() => changebuttonText("#ffffff")} style={{ background: "#ffffff", border: "1px solid  #cdc5c5" }}></span>
                        </div>
                    </div>

                    <div className='whitebox-cnt'>
                        <h4>Content Adjustments</h4>
                        <div className='satu-cnt'>
                            {/* <span className='satu'><img src={BlindUsers} alt='' /> Blind Users</span> */}
                            <span className='satu' onClick={handleSpeak}><img src={Mute} alt='' />Speak</span>
                            <span className='satu' onClick={handleReadMask}><img src={ReadMask} alt='' />Read Mask</span>
                            {/* <span className='satu'><img src={HoverEffect} alt='' />Hover Effect</span> */}
                        </div>
                    </div>

                    <div className='settingsbtns-in'>
                        {/* <div className='settingsbtns'><i className='fa fa-refresh'></i>Reset Setting</div>
                        <div className='settingsbtns'><i className='fa fa-save'></i> Save</div> */}
                        <div className='settingsbtns cancelbtn' onClick={btnCloseChatBox}><i className='fa fa-close'></i>Cancel</div>
                    </div>
                </div>
            </div>
            {
                showIcon === 0 ?
                    <a className="floats" onClick={btnOpenChatBox} style={{bottom:"25px", left:"5px"}}>
                        <i className="fa fa-3x fa-universal-access  my-float" aria-hidden="true">  </i>
                    </a> : ""
            }
</div>
        </>
    )
}

