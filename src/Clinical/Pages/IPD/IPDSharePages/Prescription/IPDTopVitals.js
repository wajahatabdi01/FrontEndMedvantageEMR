import React, { useEffect, useState } from 'react'
import Height from "../../../../../assets/images/OPD/height.svg"
import Weight from "../../../../../assets/images/OPD/weight.svg"
import BloodPressure from "../../../../../assets/images/OPD/bloodpressure.svg"
import PulseRate from "../../../../../assets/images/OPD/pulse.svg"
import RespiratoryRate from "../../../../../assets/images/OPD/ChestPain.svg"
import SaveIPDData from '../../../../../Code/SaveIPDData'
import { useSelector } from 'react-redux'
import store from '../../../../../Store'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import OPDTOPBottom from '../../../OPD/OPDSharePage/OPDPrescription/OPDTOPBottom'


export default function IPDTopVitals(props) {
    const { t } = useTranslation();
    document.body.dir = i18n.dir()


    let [sendVitals, setSendVitals] = useState(
        [
            {
                "vmId": 56,
                "vmValue": "",
                "name": "spo2",
                "img": Height,
                "unit": "%",
                "shortname": t("SPO2"),
                "maxLimit": 100,

            },
            {
                "vmId": 4,
                "vmValue": "",
                "name": "BP_Sys",
                "img": BloodPressure,
                "unit": "mmHg",
                "shortname": t("BPS"),
                "maxLimit": 500

            },
            {
                "vmId": 6,
                "vmValue": "",
                "name": "BP_Dias",
                "img": BloodPressure,
                "unit": "mmHg",
                "shortname": t("BPD"),
                "maxLimit": 1000

            },
            {
                "vmId": 3,
                "vmValue": "",
                "name": "Pulse",
                "img": PulseRate,
                "unit": "bpm",
                "shortname": t("PR"),
                "maxLimit": 170

            },
            {
                "vmId": 7,
                "vmValue": "",
                "name": "respRate",
                "img": RespiratoryRate,
                "unit": "bpm",
                "shortname": t("RR"),
                "maxLimit": 2300

            },
            {
                "vmId": 5,
                "vmValue": "",
                "name": "Temperature",
                "img": Height,
                "unit": "°F",
                "shortname": t("Temp"),
                "maxLimit": 109

            },
            {
                "vmId": 2,
                "vmValue": "",
                "name": "Weight",
                "img": Weight,
                "unit": "kg",
                "shortname": t("Wt"),
                "maxLimit": 500

            },
            {
                "vmId": 1,
                "vmValue": "",
                "name": "Height",
                "img": Height,
                "unit": "CM",
                "shortname": t("Ht"),
                "maxLimit": 272
            }]
    )

    let handleOnchange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let temp = [...sendVitals]

        if (value !== "" && parseFloat(value) < 0) {
            // Prevent negative values
            // You can show an error message, set the input to 0, or handle it as you prefer
            // For example, setting it to 0:
            value = "0";
        }

        if (value !== "") {
            sendVitals.map(((val, ind) => {
                if (val.vmId === parseInt(name)) {

                    if ((val.maxLimit && parseInt(value) > val.maxLimit)) {
                        document.getElementById('vitalId' + parseInt(name)).style.border = "2px solid red";
                        document.getElementById('vitalLabel' + parseInt(name)).style.color = "red";
                        //temp[ind].vmValue = parseFloat(value);
                    } else {
                        temp[ind].vmValue = parseFloat(value);
                        document.getElementById('vitalId' + parseInt(name)).style.border = "1px solid #e5e5e5";
                        document.getElementById('vitalLabel' + parseInt(name)).style.color = "#1d4999";
                    }
                }
            }))
        }
        else {
            sendVitals.map(((val, ind) => {
                if (val.vmId === parseInt(name)) {
                    temp[ind].vmValue = ""
                }
            }))
        }


        setSendVitals(temp)
        SaveIPDData(temp, "jsonVital")
    }

    let patientsendDataChange = useSelector((state) => state.IPDPatientSendData)


    let setData = () => {
        let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        let tempVital = [...sendVitals]
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonVital") {
                        if (val.jsonVital.length != 0) {
                            val.jsonVital.map((val, ind) => {
                                sendVitals.map((v, i) => {
                                    if (val.vmId === v.vmId) {
                                        tempVital[i]["vmValue"] = val.vmValue
                                    }
                                })
                            })
                            setSendVitals(tempVital)
                        }
                        else {
                            setSendVitals([
                                {
                                    "vmId": 56,
                                    "vmValue": "",
                                    "name": "spo2",
                                    "img": Height,
                                    "unit": "%",
                                    "shortname": t("SPO2")

                                },
                                {
                                    "vmId": 4,
                                    "vmValue": "",
                                    "name": "BP_Sys",
                                    "img": BloodPressure,
                                    "unit": "mmHg",
                                    "shortname": t("BPS")

                                },
                                {
                                    "vmId": 6,
                                    "vmValue": "",
                                    "name": "BP_Dias",
                                    "img": BloodPressure,
                                    "unit": "mmHg",
                                    "shortname": t("BPD")

                                },
                                {
                                    "vmId": 3,
                                    "vmValue": "",
                                    "name": "Pulse",
                                    "img": PulseRate,
                                    "unit": "bpm",
                                    "shortname": t("PR")

                                },
                                {
                                    "vmId": 7,
                                    "vmValue": "",
                                    "name": "respRate",
                                    "img": RespiratoryRate,
                                    "unit": "bpm",
                                    "shortname": t("RR")

                                },
                                {
                                    "vmId": 5,
                                    "vmValue": "",
                                    "name": "Temperature",
                                    "img": Height,
                                    "unit": "(°F)",
                                    "shortname": t("Temp")

                                },
                                {
                                    "vmId": 2,
                                    "vmValue": "",
                                    "name": "Weight",
                                    "img": Weight,
                                    "unit": "kg",
                                    "shortname": t("Wt")

                                },
                                {
                                    "vmId": 1,
                                    "vmValue": "",
                                    "name": "Height",
                                    "img": Height,
                                    "unit": "CM",
                                    "shortname": t("Ht")
                                }])
                        }
                    }
                }
            })
        })
        // SaveIPDData(tempVital, "jsonVital")

    }

    // useEffect(() => {
    //     if (props.loader === 1) {
    //         SaveIPDData(sendVitals, "jsonVital")
    //     }
    // }, [sendVitals])

    useEffect(() => {
        setData()
    }, [patientsendDataChange])

    return (
        <div className='roww'>
            <div className={`col-12 d-flex flex-wrap  gap-1 ps-3 pt-2 pb-2 boxcontainer pe-3 boxs`}>

                {sendVitals && sendVitals.map((val, ind) => {
                    if (val.vmId === 4) {
                        return (
                            <div className=' d-flex flex-row didd' style={{ width: "250px", border: "1px solid #E5E5E5", borderRadius: "5px", 'margin-bottom': '10px' }} >
                                <div className="did-floating-label-content pe-2 ">
                                    <input autoComplete="off" className="did-floating-input" type="number" id={'vitalId' + val.vmId} style={{ maxWidth: "108px", border: "none" }} name={val.vmId} placeholder=" " value={val.vmValue != "" ? val.vmValue : ""} onChange={handleOnchange} />
                                    <label className={`${(val.vmValue === "") || (val.vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + val.vmId}> <img src={val.img} className='pe-1' />{val.shortname} <span className='vitalUnit'>{val.unit}</span></label>
                                </div>
                                <div className='pt-2'>/&nbsp;</div>
                                <div className="did-floating-label-content pe-2 didd">
                                    <input autoComplete="off" className="did-floating-input" id={'vitalId' + 6} type="number" style={{ maxWidth: "108px", border: "none" }} name={6} placeholder=" " value={sendVitals[2].vmValue != "" ? sendVitals[2].vmValue : ""} onChange={handleOnchange} />
                                    <label className={`${(sendVitals[2].vmValue === "") || (sendVitals[2].vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + 6}> <img src={val.img} className='pe-1' />{sendVitals[2].shortname} <span className='vitalUnit'>{sendVitals[2].unit}</span></label>
                                </div>

                            </div>
                        )
                    }
                    else if (val.vmId !== 6) {
                        return (

                            <div className="did-floating-label-content pe-2 didd">
                                <input autoComplete="off" className="did-floating-input" type="number" id={'vitalId' + val.vmId} style={{ maxWidth: "108px" }} name={val.vmId} placeholder=" " value={val.vmValue != "" ? val.vmValue : ""} onChange={handleOnchange} />
                                <label className={`${(val.vmValue === "") || (val.vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + val.vmId}> <img src={val.img} className='pe-1' />{val.shortname} <span className='vitalUnit'>{val.unit}</span></label>
                            </div>
                        )
                    }
                })}

                {/* <div className="did-floating-label-content pe-2">
                    <input className="did-floating-input" type="number" style={{ maxWidth: "108px" }} name="2" placeholder=" " value={sendVitals[6].vmValue != "" ? sendVitals[6].vmValue : ""} onChange={handleOnchange} />
                    <label className={`${sendVitals[6].vmValue === "" ? "did-floating-label" : !Number.isNaN(sendVitals[6].vmValue) ? "temp-did-floating-label" : "did-floating-label"} `}><img src={Weight} className='pe-1' />Wt <span className='vitalUnit'>(Kg)</span></label>
                </div>

                <div className="did-floating-label-content pe-2" >
                    <input className="did-floating-input" type="number" style={{ maxWidth: "108px" }} name="4" placeholder=" " value={sendVitals[1].vmValue != "" ? sendVitals[1].vmValue : ""} onChange={handleOnchange} />
                    <label className={`${sendVitals[1].vmValue === "" ? "did-floating-label" : !Number.isNaN(sendVitals[1].vmValue) ? "temp-did-floating-label" : "did-floating-label"} `}><img src={BloodPressure} className='pe-1' />BPS <span className='vitalUnit'>(mmHg)</span></label>
                </div>
                <div className="did-floating-label-content pe-2" >
                    <input className="did-floating-input" type="number" style={{ maxWidth: "108px" }} name="6" placeholder=" " value={sendVitals[2].vmValue != "" ? sendVitals[2].vmValue : ""} onChange={handleOnchange} />
                    <label className={`${sendVitals[2].vmValue === "" ? "did-floating-label" : !Number.isNaN(sendVitals[2].vmValue) ? "temp-did-floating-label" : "did-floating-label"} `}><img src={BloodPressure} className='pe-1' />BPD <span className='vitalUnit'>(mmHg)</span></label>
                </div>

                <div className="did-floating-label-content pe-2" >
                    <input className="did-floating-input" type="number" style={{ maxWidth: "108px" }} name="5" placeholder=" " value={sendVitals[5].vmValue != "" ? sendVitals[5].vmValue : ""} onChange={handleOnchange} />
                    <label className={`${sendVitals[5].vmValue === "" ? "did-floating-label" : !Number.isNaN(sendVitals[5].vmValue) ? "temp-did-floating-label" : "did-floating-label"} `}><img src={Height} className='pe-1' />Temp. <span className='vitalUnit'>(°F)</span></label>
                </div>


                <div className="did-floating-label-content pe-2" >
                    <input className="did-floating-input" type="number" style={{ maxWidth: "108px" }} name="56" placeholder=" " value={sendVitals[0].vmValue != "" ? sendVitals[0].vmValue : ""} onChange={handleOnchange} />
                    <label className={`${sendVitals[0].vmValue === "" ? "did-floating-label" : !Number.isNaN(sendVitals[0].vmValue) ? "temp-did-floating-label" : "did-floating-label"} `}><img src={Height} className='pe-1' />SPO2 <span className='vitalUnit'>(%)</span></label>
                </div>

                <div className="did-floating-label-content pe-2">
                    <input className="did-floating-input" type="number" style={{ maxWidth: "108px" }} name="3" placeholder=" " value={sendVitals[3].vmValue != "" ? sendVitals[3].vmValue : ""} onChange={handleOnchange} />
                    <label className={`${sendVitals[3].vmValue === "" ? "did-floating-label" : !Number.isNaN(sendVitals[3].vmValue) ? "temp-did-floating-label" : "did-floating-label"} `}><img src={PulseRate} className='pe-1' />PR <span className='vitalUnit'>(bpm)</span></label>
                </div>
                <div className="did-floating-label-content pe-2" >
                    <input className="did-floating-input" type="number" style={{ maxWidth: "108px" }} name="7" placeholder=" " value={sendVitals[4].vmValue != "" ? sendVitals[4].vmValue : ""} onChange={handleOnchange} />
                    <label className={`${sendVitals[4].vmValue === "" ? "did-floating-label" : !Number.isNaN(sendVitals[4].vmValue) ? "temp-did-floating-label" : "did-floating-label"} `}><img src={RespiratoryRate} className='pe-2' />RBS <span className='vitalUnit'>(mg/dl)</span></label>
                </div> */}


                {/* <button className='btn-vitalhistory1 ' onClick={() => { console.log("babcb cscsd") }} >
                    <i className='fa fa-eye'></i> View More
                </button> */}
            </div>
            <div className={`d-flex gap-1 boxcontainer mt-2 `} style={{ padding: "7px", overflowX: "auto" }}>

                <OPDTOPBottom values={props.values} funh={props.funh} />
            </div>
        </div>
    )
}

