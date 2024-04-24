import React, { useEffect, useState } from 'react'
import Height from "../../../../../assets/images/OPD/height.svg"
import Weight from "../../../../../assets/images/OPD/weight.svg"
import BloodPressure from "../../../../../assets/images/OPD/bloodpressure.svg"
import PulseRate from "../../../../../assets/images/OPD/pulse.svg"
import RespiratoryRate from "../../../../../assets/images/OPD/ChestPain.svg"

import OPDTOPBottom from './OPDTOPBottom'
import { useSelector } from 'react-redux'
import store from '../../../../../Store'
import { getPatinetSendData } from '../../../../../Reduce/OPD/PatinetSendData'
import SaveOPDData from '../../../../../Code/SaveOPDData';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

import saveButtonIcon from '../../../../../assets/images/icons/saveButton.svg'
import InsertPatientVitalForONC from '../../../../API/OPD/Vitals/InsertPatientVitalForONC'


export default function OPDTopVitals(props) {
    const deptId = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId;
    // console.log('testttt : ', JSON.parse(window.sessionStorage.getItem("OPDPatientData"))[0].doctorId)

    // const doctorId = JSON.parse(window.sessionStorage.getItem("OPDPatientData"))[0].doctorId ? JSON.parse(window.sessionStorage.getItem("OPDPatientData"))[0].doctorId : 0;
    const opdPatientData = JSON.parse(window.sessionStorage.getItem("OPDPatientData"));
    const doctorId = opdPatientData && opdPatientData.length > 0 ? opdPatientData[0].doctorId : 0;


    const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const userId = JSON.parse(sessionStorage.getItem("LoginData")).userId;

    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    const { t } = useTranslation();
    document.body.dir = i18n.dir();
    // let [showVitalPopUp, setShowVitalPopUp] = useState()

    let [sendVitals, setSendVitals] = useState(
        [
            {
                "vmId": 56,
                "vmValue": "",
                "name": "spo2",
                "img": Height,
                "unit": "%",
                "shortname": t("SPO2"),
                "width": "80px",
                "maxLimit": 100,

            },
            {
                "vmId": 4,
                "vmValue": "",
                "name": "BP_Sys",
                "img": BloodPressure,
                "unit": "mmHg",
                "shortname": t("BPS"),
                "width": "90px",
                "maxLimit": 500

            },
            {
                "vmId": 6,
                "vmValue": "",
                "name": "BP_Dias",
                "img": BloodPressure,
                "unit": "mmHg",
                "shortname": t("BPD"),
                "width": "92px",
                "maxLimit": 1000

            },
            {
                "vmId": 3,
                "vmValue": "",
                "name": "Pulse",
                "img": PulseRate,
                "unit": "bpm",
                "shortname": t("PR"),
                "width": "80px",
                "maxLimit": 170

            },
            {
                "vmId": 7,
                "vmValue": "",
                "name": "respRate",
                "img": RespiratoryRate,
                "unit": "bpm",
                "shortname": t("RR"),
                "width": "95px",
                "maxLimit": 50


            },
            {
                "vmId": 5,
                "vmValue": "",
                "name": "Temperature",
                "img": Height,
                "unit": "°F",
                "shortname": t("Temp"),
                "width": "90px",
                "maxLimit": 109


            },
            {
                "vmId": 2,
                "vmValue": "",
                "name": "Weight",
                "img": Weight,
                "unit": "kg",
                "shortname": t("Wt"),
                "width": "70px",
                "maxLimit": 500


            },
            {
                "vmId": 1,
                "vmValue": "",
                "name": "Height",
                "img": Height,
                "unit": "CM",
                "shortname": t("Ht"),
                "width": "70px",
                "maxLimit": 272

            }]
    )
    let [showPatientType, setShowPatientType] = useState("")

    let [disable, setDisable] = useState(0)

    let patientsendData = useSelector((state) => state.PatientSendData)

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

        if (value !== '') {
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
    }

    const handleSaveVital = async () => {
        const saveObj = {
            deptId: deptId,
            doctorId: doctorId,
            uhid: activeUHID,
            userId: userId,
            clientId: clientID,
            jsonVital: JSON.stringify(sendVitals)
        }
        const saveRes = await InsertPatientVitalForONC(saveObj);
        if (saveRes.status === 1) {
            alert('Data Saved For Vital');
        }
        else {
            alert('Not saved')
        }
    }

    useEffect(() => {
        if (props.values === 1) {
            setData()
            props.funh(0)
        }
    }, [props.values === 1])

    useEffect(() => {
        let flag = 0
        sendVitals.map((val, ind) => {
            if (val.vmValue.length === 0) {
                flag = 1
            }
        })
        if (flag === 0) {
            SaveOPDData(sendVitals, "jsonVital");
        }
        else {

            setTimeout(() => {
                setData()
            }, 600)
        }

    }, [sendVitals])

    let setData = () => {
        let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
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
                            setSendVitals(sendVitals)
                        }
                    }
                    else if (key[0] === "disable") {
                        setDisable(val.disable)
                    }

                }
            })
        })
    }


    useEffect(() => {
        setData()
        let a = window.sessionStorage.getItem("OPDPatientData") ? JSON.parse(window.sessionStorage.getItem("OPDPatientData")) : []
        let active = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid

        a.map((val, ind) => {

            if (active === val.uhid || active === val.uhId) {
                if (val.patientType === "New" || val.patientType === "OPD") {
                    setShowPatientType("New Patient")
                }
                else {
                    setShowPatientType("Follow up")

                }
            }
        })

    }, [patientsendData])



    return (
        <>
            <div className='row p-0 m-0 '>
                <div className='optv d-flex gap-2 boxcontainer  cenn'>
                    <div className={`optv1 d-flex fex-row justify-content-center align-items-center`}>

                        <div className='cb'>
                            {/* <input type="radio" id='newPatient' name="vital-radio" value="1" disabled={disable === 1 ? true : false} checked /> */}
                            <label htmlFor='newPatient' className='vital-left justify-content-center d-flex align-items-center ' style={{ padding: "5px 10px", fontWeight: "bolder", height: "25px", borderRadius: "5px", color: `${showPatientType.toString().toLowerCase() === "Follow up".toString().toLowerCase() ? "#C77700" : "#5651F9"}`, fontSize: "11px", backgroundColor: `${showPatientType.toString().toLowerCase() === "Follow up".toString().toLowerCase() ? "#FFEDD2" : "#EBECFD"}` }}>{showPatientType.toUpperCase()}</label>
                        </div>

                        {/* <div className='d-flex fex-row justify-content-center align-items-center'>
                            <input type="radio" id='oldPatient' name="vital-radio" value="2" disabled={disable === 1 ? true : false}/>
                            <label htmlFor='oldPatient' className='ps-1 vital-left'>Old Patient</label>
                        </div> */}
                        {/* <div className='d-flex fex-row gap-1  justify-content-center align-items-center'>
                            <input type="radio" name="vital-radio" value="3" disabled={disable === 1 ? true : false}/>
                            <span className='ps-1 vital-left'>Routine Ch.</span>
                        </div> */}

                    </div>
                    <div className={`col m-0 vitasopd boxcontainer`}>

                        {sendVitals && sendVitals.map((val, ind) => {
                            if (val.vmId === 4) {
                                return (
                                    <div className=' d-flex flex-row didd' style={{ width: "250px", border: "1px solid #E5E5E5", borderRadius: "5px", 'margin-bottom': '0px' }} >
                                        <div className="did-floating-label-content pe-2 ">
                                            <input autoComplete="off" className="did-floating-input" type="number" id={'vitalId' + val.vmId} style={{ maxWidth: "108px", border: "none" }} name={val.vmId} placeholder=" " value={val.vmValue != "" ? val.vmValue : ""} onChange={handleOnchange} />
                                            <label className={`${(val.vmValue === "") || (val.vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + val.vmId}> <img src={val.img} className='pe-1' alt='' />{val.shortname} <span className='vitalUnit'>{val.unit}</span></label>
                                        </div>
                                        <div className='pt-2'>/&nbsp;</div>
                                        <div className="did-floating-label-content pe-2 didd">
                                            <input autoComplete="off" className="did-floating-input" id={'vitalId' + 6} type="number" style={{ maxWidth: "108px", border: "none" }} name={6} placeholder=" " value={sendVitals[2].vmValue != "" ? sendVitals[2].vmValue : ""} onChange={handleOnchange} />
                                            <label className={`${(sendVitals[2].vmValue === "") || (sendVitals[2].vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + 6}> <img src={val.img} className='pe-1' alt='' />{sendVitals[2].shortname} <span className='vitalUnit'>{sendVitals[2].unit}</span></label>
                                        </div>

                                    </div>
                                )
                            }
                            else if (val.vmId !== 6) {
                                return (

                                    <div className="did-floating-label-content pe-2 didd">
                                        <input autoComplete="off" className="did-floating-input" type="number" id={'vitalId' + val.vmId} style={{ maxWidth: "90px" }} name={val.vmId} placeholder=" " value={val.vmValue != "" ? val.vmValue : ""} onChange={handleOnchange} />
                                        <label className={`${(val.vmValue === "") || (val.vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + val.vmId}> <img src={val.img} className='pe-1' alt='' />{val.shortname} <span className='vitalUnit'>{val.unit}</span></label>
                                    </div>
                                )
                            }
                        })}
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSaveVital}><img src={saveButtonIcon} className='icnn' alt="" />Save</button>
                        {/* <div className="did-floating-label-content pe-2" >
                            <input className="did-floating-input" type="number" name="56" placeholder=" " value={sendVitals[0].vmValue != "" ? sendVitals[0].vmValue : ""} style={{ maxWidth: "80px" }} onChange={handleOnchange} disabled={disable === 1 ? true : false}/>
                            <label className={`${sendVitals[0].vmValue === ""?"did-floating-label": !Number.isNaN(sendVitals[0].vmValue)?"temp-did-floating-label":"did-floating-label"} `}><img src={Height} className='pe-1' />SPO2</label>
                        </div>
                        <div className="did-floating-label-content pe-2" >
                            <input className="did-floating-input" type="number" name="4" placeholder=" " value={sendVitals[1].vmValue != "" ? sendVitals[1].vmValue : "BPS"} style={{ maxWidth: "70px" }} onChange={handleOnchange} disabled={disable === 1 ? true : false}/>
                            <label className={`${sendVitals[1].vmValue === ""?"did-floating-label": !Number.isNaN(sendVitals[1].vmValue)?"temp-did-floating-label":"did-floating-label"} `}><img src={BloodPressure} className='pe-1' />BPS</label>
                        </div>
                        <div className="did-floating-label-content pe-2" >
                            <input className="did-floating-input" type="number" name="6" placeholder=" " value={sendVitals[2].vmValue != "" ? sendVitals[2].vmValue : ""} style={{ maxWidth: "70px" }} onChange={handleOnchange} disabled={disable === 1 ? true : false}/>
                            <label className={`${sendVitals[2].vmValue === ""?"did-floating-label": !Number.isNaN(sendVitals[2].vmValue)?"temp-did-floating-label":"did-floating-label"} `}><img src={BloodPressure} className='pe-1' />BPD</label>
                        </div>

                        <div className="did-floating-label-content pe-2">
                            <input className="did-floating-input" type="number" name="3" placeholder=" " value={sendVitals[3].vmValue != "" ? sendVitals[3].vmValue : ""} style={{ maxWidth: "70px" }} onChange={handleOnchange} disabled={disable === 1 ? true : false}/>
                            <label className={`${sendVitals[3].vmValue === ""?"did-floating-label": !Number.isNaN(sendVitals[3].vmValue)?"temp-did-floating-label":"did-floating-label"} `}><img src={PulseRate} className='pe-1' />PR</label>
                        </div>
                        <div className="did-floating-label-content pe-2" >
                            <input className="did-floating-input" type="number" name="7" placeholder=" " value={sendVitals[4].vmValue != "" ? sendVitals[4].vmValue : ""} style={{ maxWidth: "70px" }} onChange={handleOnchange} disabled={disable === 1 ? true : false}/>
                            <label className={`${sendVitals[4].vmValue === ""?"did-floating-label": !Number.isNaN(sendVitals[4].vmValue)?"temp-did-floating-label":"did-floating-label"} `}><img src={RespiratoryRate} className='pe-2' />RR</label>
                        </div>
                        <div className="did-floating-label-content pe-2" >
                            <input className="did-floating-input" type="number" name="5" placeholder=" " value={sendVitals[5].vmValue != "" ? sendVitals[5].vmValue : ""} style={{ maxWidth: "80px" }} onChange={handleOnchange} disabled={disable === 1 ? true : false}/>
                            <label className={`${sendVitals[5].vmValue === ""?"did-floating-label": !Number.isNaN(sendVitals[5].vmValue)?"temp-did-floating-label":"did-floating-label"} `}><img src={Height} className='pe-1' />Temp.</label>
                        </div>
                        <div className="did-floating-label-content pe-2">
                            <input className="did-floating-input" type="number" name="2" placeholder=" " value={sendVitals[6].vmValue != "" ? sendVitals[6].vmValue : ""} style={{ maxWidth: "70px" }} onChange={handleOnchange} disabled={disable === 1 ? true : false}/>
                            <label className={`${sendVitals[6].vmValue === ""?"did-floating-label": !Number.isNaN(sendVitals[6].vmValue)?"temp-did-floating-label":"did-floating-label"} `}><img src={Weight} className='pe-1' />Wt</label>
                        </div>
                        <div className="did-floating-label-content pe-2">
                            <input className="did-floating-input" type="number" name="1" placeholder=" " value={sendVitals[7].vmValue != "" ? sendVitals[7].vmValue : ""} style={{ maxWidth: "70px" }} onChange={handleOnchange} disabled={disable === 1 ? true : false}/>
                            <label className={`${sendVitals[7].vmValue === ""?"did-floating-label": !Number.isNaN(sendVitals[7].vmValue)?"temp-did-floating-label":"did-floating-label"} `}> <img src={Height} className='pe-1' />Ht</label>
                        </div> */}
                        {/* <button className='btn-vitalhistory ' onClick={() => { console.log("babcb cscsd", sendVitals) }} >
                            <i className='fa fa-eye'></i> View More
                        </button> */}



                    </div>
                </div>
                {/* <div className={`d-flex gap-1 boxcontainer mt-2 `} style={{ padding: "7px", overflowX: "auto" }}>

                    <OPDTOPBottom values={props.values} funh={props.funh} />
                </div> */}

            </div>
            {
                // showVitalPopUp === 1 ? <OPDVitalsPopUp val={showVitalPopUp} fun={() => { setShowVitalPopUp(0) }} /> : ""
            }
        </>

    )
}


