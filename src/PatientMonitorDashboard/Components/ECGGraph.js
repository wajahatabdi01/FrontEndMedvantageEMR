import React, { useEffect, useState } from 'react'
import BoxHeading from './BoxHeading'
import ECGReportData from '../../Clinical/API/RemotePatientMonitorDashboard/ECGReportData'
import { HighchartsReact } from 'highcharts-react-official'
import Highcharts from 'highcharts';
// import HighchartsExporting from 'highcharts/modules/exporting';
import EcgImg from "../../assets/images/patientmonitordashboard/SinusRhythmLabelsECG.png"
import Loder from '../../Component/Loader';


export default function ECGGraph(props) {

    let [ecgMainData, setEcgMainData] = useState()
    let [ecgLeadData, setEcgLeadData] = useState()
    let [graph, setGraph] = useState()
    let [loder, setLoder] = useState(1)

    let getdata = async (leadtype) => {
        let sendData = {
            // "uhid": "2154772",
            // "userId": window.userId
            "leadType":leadtype, 
            "uhid": props.patientdata.UhId,
            "userId": window.userId
        }
        let response = await ECGReportData(sendData);
        if (response.status === 1) {
            setEcgMainData(response.responseValue.ecgMainData[0])
            
            
            grapConfig(response.responseValue.ecgLeadData[0].rawData)
            console.log("sdcds", response.responseValue)
            let a = response.responseValue.ecgLeadData[0]
            delete a.rawData;
            setEcgLeadData(a)
            setLoder(0)

        }
    }

    let grapConfig = (ecgGraphData) => {

        console.log("ddttttt", )
        let data = ecgGraphData.split(" ").map((val) => parseInt(val))
        setGraph(
            {
            chart: {


               

                zoomType: "xy",
            },
            title: {
                text: 'ECG Data ' + ecgGraphData.length + ' points'
            },

            tooltip: {
                enabled: true,
                shared: true
            },
            xAxis: {


                // min: 0,


                // scrollbar: {
                //     enabled: true
                // },

            },


            exporting: {
                enabled: true
            },



            series: [{
                data: data,
                lineWidth: 2,
                name: 'MS data points'
            }],
            credits: {
                enabled: false,
            }

        }
        )

    }

    let handleECGHead = (e)=>{
        let value = e.target.value;
        getdata(value)
    }   
    useEffect(() => {
        getdata("II")
    }, [])
    return (
        <div className={`modal d-${props.clinicalnotificationpopup === 0 ? 'none' : 'block'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "backdrop-filter": "blur(8px)", overflowY: 'none' }}>
            <div className="p-3">
                <div className="modal-content">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                        <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                    </span>

                    <BoxHeading title="ECG Graph Report" patientName={props.patientdata.PntName} uhid={props.patientdata.UhId} />
                    <div className='mt-1 ps-2 pe-2 pb-3 pt-1'>
                        <div className='d-flex flex-column pt-1'>
                            <div className='ecgtopconatiner gap-2'>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Sampling Rate</span>:
                                    <span>{ecgMainData && ecgMainData.samplingRate}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap' >
                                    <span>Global Ventricular Rate</span>:
                                    <span>{ecgMainData && ecgMainData.globalVenticularRateone}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global Atrial Rate</span>:
                                    <span>{ecgMainData && ecgMainData.globaltrialRate}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global Beat Count</span>:
                                    <span>{ecgMainData && ecgMainData.globalBeatCount}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global Signal Quality</span>:
                                    <span>{ecgMainData && ecgMainData.globalSignalQuality}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global PP Interval</span>:
                                    <span>{ecgMainData && ecgMainData.globalPPInterval}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global RR Interval</span>:
                                    <span>{ecgMainData && ecgMainData.globalRRInterval}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global QRS Count</span>:
                                    <span>{ecgMainData && ecgMainData.globalQRSCount}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global QRS Duration</span>:
                                    <span>{ecgMainData && ecgMainData.globalQRSDuration}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global QT Interval</span>:
                                    <span>{ecgMainData && ecgMainData.globalQTInterval}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global QT Corrected</span>:
                                    <span>{ecgMainData && ecgMainData.globalQTCorrected}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global PR Interval</span>:
                                    <span>{ecgMainData && ecgMainData.globalPRInterval}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global Ave RR Interval</span>:
                                    <span>{ecgMainData && ecgMainData.globalAveRRInterval}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global P Axis</span>:
                                    <span>{ecgMainData && ecgMainData.globalPAxis}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global R Axis</span>:
                                    <span>{ecgMainData && ecgMainData.globalRAxis}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global T Axis</span>:
                                    <span>{ecgMainData && ecgMainData.globalTAxis}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global StJ Point Off set</span>:
                                    <span>{ecgMainData && ecgMainData.globalStJPointOffset}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global P Duration</span>:
                                    <span>{ecgMainData && ecgMainData.globalPDuration}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>Global RR for QTc</span>:
                                    <span>{ecgMainData && ecgMainData.globalRRforQTc}</span>
                                </div>
                                <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                    <span>ECG Head</span>:
                                    <select name="ecghead" onChange={handleECGHead}>
                                        <option>----Select----</option>
                                        <option value={"I"}>I</option>
                                        <option value={"II"} selected>II</option>
                                        <option value={"III"}>III</option>
                                        <option value={"aVR"}>aVR</option>
                                        <option value={"aVL"}>aVL</option>
                                        <option value={"aVF"}>aVF</option>
                                        <option value={"V1"}>V1</option>
                                        <option value={"V2"}>V2</option>
                                        <option value={"V3"}>V3</option>
                                        <option value={"V4"}>V4</option>
                                        <option value={"V5"}>V5</option>
                                        <option value={"V6"}>V6</option>
                                    </select>
                                </div>
                            </div>


                            {/* ecg graph report */}

                            <div className='col-12 ps-3 pe-3 pt-5' >
                                {graph ?
                                    <HighchartsReact highcharts={Highcharts} options={graph} /> : ""}

                            </div>



                            {/* bottom */}
                            <div className='row p-0 m-0 pt-5'>
                                <div className='col-md-9  gap-2 m-0 p-0'>
                                    <div className='ecgtopconatiner gap-2'>





                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>PAmpV</span>:
                                            <span>{ecgLeadData && ecgLeadData.pAmp}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>QAmpV</span>:
                                            <span>{ecgLeadData && ecgLeadData.qAmp}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>QDurV</span>:
                                            <span>{ecgLeadData && ecgLeadData.qDur}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>RDurV</span>:
                                            <span>{ecgLeadData && ecgLeadData.rAmp}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>RDurV</span>:
                                            <span>{ecgLeadData && ecgLeadData.rDur}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>SAmpV</span>:
                                            <span>{ecgLeadData && ecgLeadData.sAmp}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>SDurV</span>:
                                            <span>{ecgLeadData && ecgLeadData.sDur}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>STJAmpV</span>:
                                            <span>{ecgLeadData && ecgLeadData.stjAmp}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>STMAmpV</span>:
                                            <span>{ecgLeadData && ecgLeadData.stmAmp}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>STEAmpV</span>:
                                            <span>{ecgLeadData && ecgLeadData.steAmp}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>TAmpV</span>:
                                            <span>{ecgLeadData && ecgLeadData.tAmp}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>TAmpMaxV</span>:
                                            <span>{ecgLeadData && ecgLeadData.tAmpMax}</span>
                                        </div>
                                        <div className='d-flex flex-row gap-1 ecgtopbox p-2 text-center ps-3 pe-3 text-nowrap'>
                                            <span>PAmp Max</span>:
                                            <span>{ecgLeadData && ecgLeadData.pAmpMax}</span>
                                        </div>
                                    </div>

                                </div>


                                <div className='col-md-3 p-0 m-0'>
                                    <div className='d-flex flex-row justify-content-center' style={{height:"200px"}}>

                                        <img src={EcgImg} style={{width:"60%"}} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

                                    <Loder val={loder}/>
        </div>
    )
}
