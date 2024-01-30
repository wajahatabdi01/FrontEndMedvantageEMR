import React, { useEffect, useState } from 'react'
import GetFrequncyList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetFrequncyList'
import GetProblemList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import GetBrandList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetBrandList'
import POSTDeleteMedicationRow from '../../../../API/OPD/Prescription/POSTDeleteMedicationRow'
import { FindByQuery } from '../../../../../Code/Serach'
import PostDrugInteraction from '../../../../API/OPD/Prescription/KnowMedsAPI/PostDrugInteraction'
import PostContraIndicationList from '../../../../API/OPD/Prescription/KnowMedsAPI/PostContraIndicationList'
import ADRReportPost from '../../../../API/RemotePatientMonitorDashboard/ADRReportPost'
import AlertToster from '../../../../../Component/AlertToster'
import SuccessToster from '../../../../../Component/SuccessToster'
import PopUpDrugIteraction from '../../../OPD/OPDSharePage/OPDPrescription/PopUp/PopUpDrugIteraction'
import TableContainer from '../../../../../Component/TableContainer'
import GetDischargeCard from './API/GetDischargeCard'

import meddetails from '../../../../../assets/images/Ventilator/meddetails.svg'
import frequency from '../../../../../assets/images/Ventilator/frequency.svg'
import duration from '../../../../../assets/images/Ventilator/duration.svg'
import rational from '../../../../../assets/images/Ventilator/rational.svg'
import remark1 from '../../../../../assets/images/icons/Remark.svg'
import status from '../../../../../assets/images/Ventilator/status.svg'
import deleteIcon from '../../../../../assets/images/Ventilator/del.svg'
import TextBoxWithSearch from '../../../../../Component/TextBoxWithSearch'
import { useTranslation } from 'react-i18next'
import { handleDeleteRowCode } from '../../../../../Code/Medication'

import  i18n from "i18next";
import stopMedicine from '../../../../../assets/images/icons/stop-medicine.svg';



export default function DischargeMedication(props) {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();

    let row = {
        id: 0,
        drugId: "",
        drugName: "",
        dosageForm: "",
        dosageStrength: "",
        doseUnit: "",
        doseFrequency: "",
        duration: "0,Days",
        remark: "",
        isAntibiotic: "",
        rationalId: 0,
    }
    let [medicationData, setMedicationData] = useState([])
    let [medicationList, setMedicationList] = useState([])
    let [medicationListTemp, setMedicationListTemp] = useState([])

    let [frequncyList, setFrequncyList] = useState()
    let [frequncyListTemp, setFrequncyListTemp] = useState([])

    let [rationalList, setRationalList] = useState([])
    let [rationalListTemp, setRationalListTemp] = useState([])

    let [showSearchBoxMedic, setShowSearchBoxMedic] = useState(-1)
    let [showSearchBoxFrequncy, setShowSearchBoxFrequncy] = useState(-1)
    let [showSearchBoxRational, setShowSearchBoxRational] = useState(-1)

    let [showMessage, setShowMeassage] = useState("")
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showSuccessToster, setShowSuccessToster] = useState(0)

    let [drugInteractionId, setDrugInteractionId] = useState([])
    let [drugInteractionResponse, setDrugInteractionIdResponse] = useState([])

    // let [problemId, setProblemId] = useState([])
    let [contraIndicationResponse, setContraIndicationResponse] = useState([])
    let [sideEffectResponse, setSideEffectResponse] = useState([])

    let [showPopupDrugInteraction, setShowPopupDDrugInteraction] = useState(0)


    let getMedicationList = async () => {
        let response = await GetBrandList()
        let freqresponse = await GetFrequncyList()

        let rationalData = await GetProblemList()
        if (response.status === 1) {
            setMedicationList(response.responseValue)
            setMedicationListTemp(response.responseValue)
        }
        if (freqresponse.status === 1) {
            setFrequncyList(freqresponse.responseValue)
            setFrequncyListTemp(freqresponse.responseValue)
        }
        if (rationalData.status === 1) {
            setRationalList(rationalData.responseValue)
            setRationalListTemp(rationalData.responseValue)
            
        }

    }

    let handleDeleteRow = async (ind, id, value, drugId) => {
        handleDeleteRowCode(ind, id, value, drugId, row, drugInteractionId, medicationData, setMedicationData, setShowMeassage, setShowSuccessToster, setShowAlertToster)
        // SaveIPDData([...medicationData, row], "jsonArray")
        props.sendAllMedication([...medicationData])
        // setTimeout(() => {
        //     if (value !== 0) {

        //         // props.getData()
        //         getDischarge()
        //     }
        // }, 1000)

        // let temp = [...medicationData]
        // if (value === 0) {
        //     temp.splice(ind, 1)
        //     if (temp.length != 0) {
        //         let index = temp.findIndex(temp => temp.id === 0);
        //         if (index != -1) {
        //             setMedicationData(temp)
        //             props.sendAllMedication(temp)

        //             let showAdd = temp.length - 1
        //             document.getElementById("addprescription" + showAdd).style.display = "block";
        //         }
        //         else {
        //             setMedicationData([...medicationData])
        //             props.sendAllMedication([...medicationData])

        //         }
        //     }
        //     else {
        //         setMedicationData([row])
        //         props.sendAllMedication([row])

        //     }
        // }
        // else {
        //     let sendData = {
        //         "id": id,
        //         "isStop": 0,
        //         "userId": window.userId
        //     }
        //     let response = await POSTDeleteMedicationRow(sendData)
        //     if (response.status === 1) {
        //         temp.splice(ind, 1)
        //         setMedicationData([...temp])
        //         props.sendAllMedication([...temp])

        //         setShowMeassage("Medicine Delete Successfully!!")
        //         setShowSuccessToster(1)

        //     }
        //     else {
        //         setShowMeassage(response.responseValue)
        //         setShowAlertToster(1)
        //     }

        // }

    }

    let handleChange = (e, ind) => {
        try {
            let temp = [...medicationData]
            let value = e.target.value
            let name = e.target.name

            if (e.target.value !== "") {
                if (name === "drugData") {

                    temp[ind]["drugId"] = 0
                    temp[ind]["drugName"] = value
                    temp[ind]["dosageForm"] = ""
                    temp[ind]["dosageStrength"] = ""
                    temp[ind]["doseUnit"] = ""
                    temp[ind]["isAntibiotic"] = 0

                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])


                    // let response = Search(medicationList, value)
                    let response = FindByQuery(medicationList, value, "brandName")
                    if (response.length != 0) {
                        setMedicationListTemp(response)
                        setShowSearchBoxMedic(ind)
                    }
                    else {
                        setMedicationListTemp([t("No Data Found"), ""])
                        setShowSearchBoxMedic(-1)

                    }
                    let flag = 0
                    medicationData.map((val, ind) => {
                        if (val.id === 0 && val.drugId === "") {
                            flag = 1
                            return
                        }
                    })
                    if (flag !== 1) {
                        setMedicationData([...medicationData, row])
                        props.sendAllMedication([...medicationData, row])


                    }


                }
                else if (name === "frequencyData") {
                    temp[ind]["doseFrequency"] = value
                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])


                    let response = FindByQuery(frequncyList, value, "frequencyName")

                    if (response.length != 0) {
                        setFrequncyListTemp(response)
                        setShowSearchBoxFrequncy(ind)
                    }
                    else {
                        setShowSearchBoxFrequncy([t("No Data Found"), ""])
                        setShowSearchBoxFrequncy(-1)

                    }
                }
                else if (name === "durationText") {
                    if (temp[ind]["duration"] !== "0,Days" && temp[ind]["duration"] !== "") {
                        let textdata = temp[ind]["duration"].split(",")[0]
                        let selectdata = temp[ind]["duration"].split(",")[1]
                        if (selectdata.length !== 0) {
                            temp[ind]["duration"] = value + "," + selectdata
                        }
                        else {
                            temp[ind]["duration"] = value + ","+"Days"
                        }

                    }
                    else {
                        temp[ind]["duration"] = value + ","+"Days"
                    }
                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])


                }
                else if (name === "duration") {
                    // temp[ind]["duration"] = value
                    
                    if (temp[ind]["duration"] !== "0,Days") {
                        let textdata = temp[ind]["duration"].split(",")[0]
                        let selectdata = temp[ind]["duration"].split(",")[1]
                        if (textdata.length !== 0) {
                            temp[ind]["duration"] = textdata + "," + value
                        }
                        else {
                            temp[ind]["duration"] = 0+"," + value
                        }

                    }
                    else {
                        temp[ind]["duration"] = 0+"," + value
                    }


                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])


                }
                else if (name === "rationalData") {
                    // temp[ind]["rationalId"] = value
                    document.getElementById("rationalData" + ind).value = value;
                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])


                    let response = FindByQuery(rationalList, value, "problemName")

                    if (response.length != 0) {
                        setFrequncyListTemp(response)
                        setShowSearchBoxRational(ind)
                    }
                    else {
                        setShowSearchBoxRational([t("No Data Found"), ""])
                        setShowSearchBoxRational(-1)

                    }
                }
                else if (name === "remark") {
                    temp[ind]["remark"] = e.target.value
                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])



                }
            }
            else {
                if (name === "drugData") {
                    temp[ind]["drugId"] = 0
                    temp[ind]["drugName"] = ""
                    temp[ind]["dosageForm"] = ""
                    temp[ind]["dosageStrength"] = ""
                    temp[ind]["doseUnit"] = ""
                    temp[ind]["isAntibiotic"] = 0
                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])


                }
                else if (name === "frequencyData") {
                    temp[ind]["doseFrequency"] = ""
                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])


                    // temp[ind]["duration"] = value
                }
                else if (name === "durationText") {
                    temp[ind]["duration"] = ""
                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])

                }
                else if (name === "duration") {
                    temp[ind]["duration"] = ""

                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])

                }
                else if (name === "rationalData") {
                    temp[ind]["rationalId"] = ""
                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])



                }
                else if (name === "remark") {
                    temp[ind]["remark"] = ""
                    setMedicationData([...temp])
                    props.sendAllMedication([...medicationData, row])



                }
                setShowSearchBoxMedic(-1)
                setShowSearchBoxFrequncy(-1)
                setShowSearchBoxRational(-1)


            }
        }
        catch (e) {
            setShowAlertToster(1)
            setShowMeassage(e.message)
        }
    }

    let getProblemId = () => {
        let problemId = []
        let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonDiagnosis") {
                        val.jsonDiagnosis.map((val, ind) => {
                            if (val != null) {
                                // setProblemId([...problemId, val.problemId])
                                problemId.push(val.problemId)

                            }
                        })
                    }
                }
            })
        })
        return problemId
    }

    let GetDrugInteractionn = async (senddata) => {

        let problemId = getProblemId()
        // let drugresponse = await PostDrugInteraction({ "brandId": "11884,11885,11886,11887,11888,12537", "medicineName": "string" })
        // let contraResponse = await PostContraIndicationList({ "brandId": "38802,38898", "diseaseName": "834" })
        // let sideEffectResponse = await ADRReportPost({"brandId":"3219","problemId":"14166,2891,577"})

        let drugresponse = await PostDrugInteraction({ "brandId": senddata.toString(), "medicineName": "string" })
        let contraResponse = await PostContraIndicationList({ "brandId": senddata.toString(), "diseaseName": problemId.toString() })
        let sideEffectResponse = await ADRReportPost({ "brandId": senddata.toString(), "problemId": problemId.toString() })

        if (drugresponse.status === 1 && drugresponse.responseValue.length != 0) {
            setShowPopupDDrugInteraction(1)
            setDrugInteractionIdResponse(drugresponse.responseValue)
        }
        if (contraResponse.status === 1 && contraResponse.responseValue.length != 0) {
            setShowPopupDDrugInteraction(1)
            setContraIndicationResponse(contraResponse.responseValue)
        }
        if (sideEffectResponse.status === 1 && sideEffectResponse.responseValue[0].otherSideEffect.length != 0) {
            setShowPopupDDrugInteraction(1)
            setSideEffectResponse(sideEffectResponse.responseValue[0].otherSideEffect)
        }
    }

    let handleClick = (name, ind, data) => {
        let temp = [...medicationData]
       
        if (name === "drugData") {
            temp[ind]["drugId"] = data[0]
            temp[ind]["drugName"] = data[1]
            temp[ind]["dosageForm"] = data[2]
            temp[ind]["dosageStrength"] = data[3]
            temp[ind]["doseUnit"] = data[4]
            temp[ind]["isAntibiotic"] = data[5]
            setDrugInteractionId([...drugInteractionId, data[0]])
            GetDrugInteractionn([...drugInteractionId, data[0]])
            document.getElementById("drugData" + ind).value = data[2] + "-" + data[1] + "-" + data[3]
            setShowSearchBoxMedic(-1)
            setMedicationData(temp)
            props.sendAllMedication(temp)

        }
        else if (name === "frequencyData") {
          
            temp[ind]["doseFrequency"] = data
            document.getElementById("frequencyData" + ind).value = data

            setShowSearchBoxFrequncy(-1)
            setMedicationData(temp)
            props.sendAllMedication(temp)

        }

        else if (name === "rationalData") {
            temp[ind]["rationalId"] = data[0]
            setShowSearchBoxRational(-1)
            document.getElementById("rationalData" + ind).value = data[1];
            setMedicationData(temp)
            props.sendAllMedication(temp)

        }

    }

    let handleStop = async (ind, id) => {
        let temp = [...medicationData]
        let sendData = {
            "id": id,
            "isStop": 1,
            "userId": window.userId
        }
        let response = await POSTDeleteMedicationRow(sendData)
        if (response.status === 1) {
            temp.splice(ind, 1)
            setMedicationData([...temp])
            props.sendAllMedication([...temp])

            setShowMeassage(t("Medicine Stop Successfully"))
            setShowSuccessToster(1)

        }
        else {
            setShowMeassage(response.responseValue)
            setShowAlertToster(1)
        }
    }

    let getDischarge = async () => {

        let UhId = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
        let DischargeTypeId = 2;
        
        let response = await GetDischargeCard(UhId, DischargeTypeId);
        
        if (response.status === 1) {
            
            // sendAllComplain(response.responseValue.patientComplainHistory)
            // setGetAllData(response.responseValue)
            
            if (response.responseValue.admitPrescriptionHistory.length !== 0) {
                setMedicationData([...response.responseValue.admitPrescriptionHistory, row])
                props.sendAllMedication([...response.responseValue.admitPrescriptionHistory])
            }
            else {
                setMedicationData([...response.responseValue.runningPrescription, row])
                props.sendAllMedication([...response.responseValue.runningPrescription])
            }

        }

    }
    let handleKeyDown = (e) => {
        if (e.keyCode === 9) {
            GetDrugInteractionn(drugInteractionId)
        }
    }
    useEffect(() => {
        getMedicationList()
        getDischarge()

    }, [])

    return (
        <div className='mt-1 boxs'>
            <div className={` boxcontainer med-table-section `} style={{ height: "575px", overflowX: "auto" }}>
                <TableContainer>
                    <thead>
                        <th className="wrap-content">#</th>
                        <th><img src={meddetails} className='icnim' alt='' />{t("Medication Details")}</th>
                        <th><img src={frequency} className='icnim' alt='' />{t("Frequency")}</th>
                        <th><img src={duration} className='icnim' alt='' />{t("Duration")}</th>
                        <th><img src={rational} className='icnim' alt='' />{t("RATIONALE")}</th>
                        <th><img src={remark1} className='icnim' alt='' />{t("Remark")}</th>
                        <th><img src={status} className='icnim' alt='' />{t("Status")}</th>
                    </thead>
                    <tbody className='pb-5' >
                        {medicationData && medicationData.map((val, ind) => {
                            return (
                                <tr key={ind}  >
                                    <td>{ind + 1}</td>
                                    <td className='position-relative'>
                                        {/* {medicationListTemp && <AutoComplete searchKey="dosageFormName" suggestions={medicationListTemp} />}  */}
                                        <input autoComplete="off" style={{ zIndex: 25 }} type='text' className='opdmedicationinput' name='drugData' value={val.drugName.toUpperCase() ? val.drugName.toUpperCase() : ""} placeholder={t('Dosage Form - Medicine Name - Strength')} id={`drugData${ind}`} onChange={(e) => { handleChange(e, ind) }} onKeyDown={handleKeyDown} />
                                        {showSearchBoxMedic === ind ?
                                            <div id="medicListDiv" className='position-absolute opdmedicationsearchbox'>
                                                <ul id="drugul">
                                                    {medicationListTemp && medicationListTemp.map((val, index) => {
                                                        return (

                                                            <li className='pointer' onClick={(e) => { handleClick("drugData", ind, [val.id, val.brandName, val.dosageFormName, val.doseStrength, val.doseUnitID, val.isAntibiotic]) }}>{val.brandName.toUpperCase()}</li>
                                                        )
                                                    })}
                                                </ul>
                                                <div className='full-screen-div-opd' onClick={() => { setShowSearchBoxMedic(-1) }}></div>

                                            </div>
                                            : ""}
                                    </td>
                                    <td><input autoComplete="off" type='text' className='opdmedicationinput' name="frequencyData" id={`frequencyData${ind}`} value={val.doseFrequency != "" ? val.doseFrequency : ""} placeholder={t('OD_BD_TDS')} style={{ width: "130px" }} onChange={(e) => { handleChange(e, ind) }} />
                                        {showSearchBoxFrequncy === ind ?
                                            <div className='position-absolute opdmedicationsearchbox'>
                                                <ul id="drugdataList">
                                                    {frequncyListTemp && frequncyListTemp.map((val, index) => {
                                                        return (

                                                            <li className='pointer' onClick={(e) => { handleClick("frequencyData", ind, val.frequencyName) }}>{val.frequencyName}</li>
                                                        )
                                                    })}
                                                </ul>
                                                <div className='full-screen-div-opd' onClick={() => { setShowSearchBoxFrequncy(-1) }}></div>

                                            </div> : ""}

                                    </td>
                                    <td>
                                        <div className='d-flex flex-row gap-2'>
                                            <input className='opdmedicationinput' value={val.duration != "" ? val.duration !== "Days" ? val.duration.split(",")[0] : 0 : "duration"} type='number' min="1" max="5" style={{ width: "50px" }} name="durationText" onChange={(e) => { handleChange(e, ind) }} />
                                            <select className='opdmedicationinput' style={{ width: "115px" }} id={`durationData${ind}`} value={val.duration != "" ? val.duration.split(",")[1] : "duration"} name='duration' onChange={(e) => { handleChange(e, ind) }}>
                                                {/* <option value={"-1"}>Select</option> */}
                                                <option value={"Days"}>{t("DAY")}</option>
                                                <option value={"Week"}>{t("WEEK")}</option>
                                                <option value={"Month"}>{t("Month")}</option>

                                            </select>

                                        </div>
                                        {/* <select className='opdmedicationinput' style={{ width: "130px" }} id={`durationData${ind}`} value={val.duration != "" ? val.duration : "duration"} name='duration' onChange={(e) => { handleChange(e, ind) }} >
                                            <option value={"-1"}>Select Days</option>
                                            <option value={"1 Day"}>1 Day</option>
                                            <option value={"2 Days"}>2 Days</option>
                                            <option value={"3 Days"}>3 Days</option>
                                            <option value={"4 Days"}>4 Days</option>
                                            <option value={"5 Days"}>5 Days</option>
                                            <option value={"6 Days"}>6 Days</option>
                                            <option value={"7 Days"}>7 Days</option>
                                            <option value={"8 Days"}>8 Days</option>
                                            <option value={"9 Days"}>9 Days</option>
                                            <option value={"10 Days"}>10 Days</option>
                                        </select> */}
                                    </td>
                                    <td><input type='text' autoComplete="off" className='opdmedicationinput' style={{ width: "150px" }} id={`rationalData${ind}`} value={val.problemName != 0 ? val.problemName : ""} placeholder={t('RATIONALE')} name="rationalData" onChange={(e) => { handleChange(e, ind) }} />
                                        {showSearchBoxRational === ind ?
                                            <div className='position-absolute opdmedicationsearchbox'>
                                                <ul >
                                                    {rationalListTemp && rationalListTemp.map((val, index) => {
                                                        return (
                                                            [6, 7, 8].map((id, i) => {
                                                                if (val.problemTypeID === id) {
                                                                    return (
                                                                        <li className='pointer' onClick={(e) => { handleClick("rationalData", ind, [val.id, val.problemName]) }}>{val.problemName}</li>
                                                                    )
                                                                }
                                                            })
                                                        )
                                                    })}
                                                </ul>
                                                <div className='full-screen-div-opd' onClick={() => { setShowSearchBoxRational(-1) }}></div>

                                            </div>
                                            : ""}
                                    </td>
                                    <td><input type='text' autoComplete="off" className='opdmedicationinput' style={{ width: "200px" }} id={`remark${ind}`} value={val.remark} name="remark" onChange={(e) => { handleChange(e, ind) }} placeholder={t('Remark')} /></td>
                                    <td align='center'>
                                        {
                                            val.id === 0 ?
                                                <div className='d-flex flex-row gap-2 justify-content-end pe-2 ipdm'>
                                                    {/* <i className="fa-solid fa-plus fa-xl" id={`addprescription` + ind} style={{ color: "#3ca735" }} onClick={() => { handleAddRow(ind) }}></i> */}
                                                    <i className="fa-solid fa-trash-can fa-xl" style={{ color: "#ff0000", fontSize: "18px" }} onClick={() => { handleDeleteRow(ind, val.id, 0, val.drugId) }}></i>

                                                </div> :
                                                <div className='d-flex flex-row gap-2 ipdm'>
                                                    {/* <i className="fa-solid fa-stopwatch fa-xl" title='Stop Medicine' style={{ color: "#db7a1f", fontSize: "18px",cursor:'pointer' }} onClick={() => { handleStop(ind, val.id) }}></i> */}
                                                    <img style={{ cursor:'pointer', width:'20px' }} src={stopMedicine} onClick={() => { handleStop(ind, val.id) }} title='Stop Medicine' alt=''/>
                                                    <i className="fa-solid fa-trash-can fa-xl" title='Delete Medicine' style={{ color: "#ff0000", fontSize: "18px",cursor:'pointer' }} onClick={() => { handleDeleteRow(ind, val.id, 1, val.drugId) }}></i>
                                                </div>
                                        }
                                    </td>

                                </tr>
                            )
                        })}



                    </tbody>
                </TableContainer>
            </div>
            {
                showAlertToster === 1 ? <AlertToster message={showMessage} handle={setShowAlertToster} /> : ""
            }
            {
                showSuccessToster === 1 ? <SuccessToster message={showMessage} handle={setShowSuccessToster} /> : ""
            }

            {
                showPopupDrugInteraction === 1 ? <PopUpDrugIteraction drugInteractionData={drugInteractionResponse} contraIndicationnData={contraIndicationResponse} sideEffectData={sideEffectResponse} show={showPopupDrugInteraction} func={setShowPopupDDrugInteraction} />
                    : ""
            }

        </div>
    )
}
