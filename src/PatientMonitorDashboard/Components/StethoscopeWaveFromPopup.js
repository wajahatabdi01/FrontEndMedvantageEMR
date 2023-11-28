import React, { useEffect, useState } from 'react'
import BoxHeading from '../../Component/BoxHeading'

import Peaks from 'peaks.js'
import "../../assets/css/wstyle.css"
import GetPatientMediaData from '../Api/GetPatientMediaData.js';
import NODataFound from '../../Component/NODataFound.js';

export default function StethoscopeWaveFromPopup(props) {
    let [mediaFile, setMediaFile] = useState("")
    let [isDataFound, setIsDataFound] = useState(1)
    function a(Peaks) {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext = new AudioContext();

        var options = {
            zoomview: {
                container: document.getElementById('zoomview-container'),
                waveformColor: '#00e180',
                playedWaveformColor: '#bc6dfd',
                showPlayheadTime: true
            },
            mediaElement: document.getElementById('audio'),
            webAudio: {
                audioContext: audioContext,
                scale: 128,
                multiChannel: false
            },
            zoomLevels: [128],
            keyboard: true
        };

        Peaks.init(options, function (err, peaksInstance) {
            if (err) {
                console.error(err.message);
                return;
            }

            console.log('Peaks instance ready');

            var zoomview = peaksInstance.views.getView('zoomview');

            var zoomLevels = [5, 10, 20, 30, 60, 120, 180, 'auto'];

            zoomview.setZoom({ seconds: zoomLevels[0] });

            var zoom = document.getElementById('zoom');

            for (var i = 0; i < zoomLevels.length; i++) {
                var text = zoomLevels[i] === 'auto' ? 'Fit width' : (zoomLevels[i] + " seconds");
                zoom.options[i] = new Option(text, i);
            }

            zoom.addEventListener('change', function (event) {
                var zoomLevel = zoomLevels[event.target.value];

                zoomview.setZoom({ seconds: zoomLevel });
            });

            document.getElementById('seek').addEventListener('click', function (event) {
                var time = document.getElementById('seek-time').value;
                var seconds = parseFloat(time);

                if (!Number.isNaN(seconds)) {
                    peaksInstance.player.seek(seconds);
                }
            });

            var amplitudeScales = {
                "0": 0.0,
                "1": 0.1,
                "2": 0.25,
                "3": 0.5,
                "4": 0.75,
                "5": 1.0,
                "6": 1.5,
                "7": 2.0,
                "8": 3.0,
                "9": 4.0,
                "10": 5.0,
                "11": 8.0
            };

            document.getElementById('amplitude-scale').addEventListener('input', function (event) {
                var scale = amplitudeScales[event.target.value];
                var view = peaksInstance.views.getView();

                view.setAmplitudeScale(scale);
            });

            document.getElementById('waveform-color').addEventListener('input', function (event) {
                var view = peaksInstance.views.getView();

                view.setWaveformColor(event.target.value);
            });

            document.getElementById('played-waveform-color').addEventListener('input', function (event) {
                var view = peaksInstance.views.getView();

                view.setPlayedWaveformColor(event.target.value);
            });

            document.getElementById("set-start-time").addEventListener('click', function (event) {
                var time = document.getElementById('start-time').value;
                var seconds = parseFloat(time);

                if (!Number.isNaN(seconds)) {
                    var view = peaksInstance.views.getView();

                    view.setStartTime(seconds);
                }
            });
        });
    }
    let getData = async () => {
        let resp = await GetPatientMediaData(props.patientdata.UhId, "stethoscope")
        if (resp.status === 1) {
            setIsDataFound(1)
            console.log("url", resp.responseValue[0].url)
            setMediaFile(resp.responseValue[0].url)
            a(Peaks)
        }
        else {
            setIsDataFound(0)
            setMediaFile([])
        }
    }
    useEffect(() => {
        // setTimeout(()=>
        getData()
        // ,100)

        console.log("cdscsdcs", props.patientdata)
    }, [])

    return (
        <div className={`modal d-${props.ShowStethoScope === 0 ? 'none' : 'block'} mb-2 modal-xl`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered_ modal-xl">
                <div className="modal-content">
                    {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                        <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                    </span> */}
                    {/* <BoxHeading name={dateTime ? dateTime : props.grapVitalData.name} textcolor="#7E7E7E" patientBool={true} patientName={props.grapVitalData.patientName} patientUhid={props.grapVitalData.UHID} /> */}
                    {/* <BoxHeading title={"Stethoscope Wave Form"} uhid={props.patientdata.UhId} patientName={props.patientdata.PntName} /> */}

                    <span className="closee" onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>
                        <div className='p-profile'>
                         <div className='p-profile-h'>Stethoscope Wave Form</div>
                            <div className='p-profile-h'>
                            <div className='pname'><span>{props.patientdata.PntName} </span></div>
                            <div className='pname'>- {props.patientdata.UhId}</div>
                         </div>
                       </div>

                    <div className='mt-1 ps-5 pe-4 row'>
                        {isDataFound === 1 ?
                            <>
                                <div id="titles">
                                    <h1>Wave Graph </h1>
                                    <div class="waveform-container">
                                        <div id="zoomview-container"></div>
                                    </div>

                                    <div id="demo-controls">
                                        <audio id="audio" controls="controls">
                                            <source src={mediaFile && mediaFile} type="audio/wav" />
                                            {/* <source src="http://aws.edumation.in:5001/media/autoRecord_TrLuytl.wav" type="audio/wav" /> */}
                                            {/* <source src="http://172.16.61.31:7082/Upload\\Audio\\1699421901755_heartStethoWav.wav" type="audio/wav" /> */}
                                            Your browser does not support the audio element.
                                        </audio>

                                        <div id="controls">
                                            <div>
                                                <label for="zoom">Zoom: </label>
                                                <select id="zoom"></select>
                                                <input type="text" id="seek-time"   />
                                                <button data-action="seek" id="seek">Seek</button>
                                                <label for="amplitude-scale">Amplitude scale</label>
                                                <input type="range" id="amplitude-scale" min="0" max="10" step="1" />
                                            </div>
                                            <div>
                                                <input type="text" id="start-time"  />
                                                <button data-action="set-start-time" id="set-start-time">Set start time</button>
                                            </div>
                                            <div>
                                                <label for="waveform-color">Waveform color</label>
                                                <input type="color" id="waveform-color" value="#00e180" />
                                                <label for="played-waveform-color">Played waveform color</label>
                                                <input type="color" id="played-waveform-color" value="#bc6dfd" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="margin-right">
                                </div>
                            </> :
                            <NODataFound />

                        }

                    </div>
                </div>


            </div>
        </div>
    )
}

