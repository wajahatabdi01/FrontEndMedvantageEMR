import React, { useEffect, useRef, useState } from 'react'
import TableContainer from '../../../../../Component/TableContainer'
import GetBrandList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetBrandList'
import Search, { FindByQuery, SearchIndex } from '../../../../../Code/Serach'
import GetFrequncyList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetFrequncyList'
import GetProblemList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import { useSelector } from 'react-redux'
import OPDFoodFields from './OPDFoodFields'
import IsStopImg from "../../../../../assets/images/OPD/IsStop.png"
import POSTDeleteMedicationRow from '../../../../API/OPD/Prescription/POSTDeleteMedicationRow'
import AlertToster from '../../../../../Component/AlertToster'
import SuccessToster from '../../../../../Component/SuccessToster'
import PostDrugInteraction from '../../../../API/OPD/Prescription/KnowMedsAPI/PostDrugInteraction'
import PopUpDrugIteraction from './PopUp/PopUpDrugIteraction'
import PostContraIndicationList from '../../../../API/OPD/Prescription/KnowMedsAPI/PostContraIndicationList'
// import ADRReportPost from '../../../../Api/RemotePatientMonitorDashboard/ADRReportPost'
import NewOPDFoodField from './NewOPDFoodField'
// import DownKey, { UpKey } from '../../../Component/ListSelect'

import stopMedIcon from '../../../../../assets/images/icons/stop-medicine.svg'
import deleteIcon from '../../../../../assets/images/icons/delete.svg'



import meddetails from '../../../../../assets/images/Ventilator/meddetails.svg'
import frequency from '../../../../../assets/images/Ventilator/frequency.svg'
import duration from '../../../../../assets/images/Ventilator/duration.svg'
import rational from '../../../../../assets/images/Ventilator/rational.svg'
import remark1 from '../../../../../assets/images/Ventilator/remark1.svg'
import status from '../../../../../assets/images/Ventilator/status.svg'
import del from '../../../../../assets/images/Ventilator/del.svg'


import { handleDeleteRowCode } from '../../../../../Code/Medication';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";


export default function OPDPatientMedicationAssign(props) {
    const { t } = useTranslation();
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
        stopBy: "",
        medicineId: 0,
        problemName: ""
    }
    let [medicationData, setMedicationData] = useState()
    let [disable, setDisable] = useState()


    let [medicationList, setMedicationList] = useState()
    let [medicationListTemp, setMedicationListTemp] = useState()

    let [frequncyList, setFrequncyList] = useState()
    let [frequncyListTemp, setFrequncyListTemp] = useState()

    let [rationalList, setRationalList] = useState([])
    let [rationalListTemp, setRationalListTemp] = useState()

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


    let liSelected = useRef()
    let index = useRef(-1)
    let next = useRef()
    let oldData = useRef(0)

    let getMedicationList = async () => {
        try {
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
        catch (e) {
            setShowAlertToster(1)
            setShowMeassage(e.message)
        }

    }

    // let handleAddRow = (ind) => {
    //     setMedicationData([...medicationData, row])
    //     document.getElementById("addprescription" + ind).style.display = "none";
    // }

    let handleDeleteRow = async (ind, id, value, drugId) => {
        handleDeleteRowCode(ind, id, value, drugId, row, drugInteractionId, medicationData, setMedicationData, setShowMeassage, setShowSuccessToster, setShowAlertToster)

        // // let response = handleDelete()
        // try {
        //     let temp = [...medicationData]
        //     if (value === 0) {
        //         temp.splice(ind, 1)
        //         if (temp.length != 0) {
        //             let druginteraction = drugInteractionId.findIndex(drugInteractionId => drugInteractionId === drugId)
        //             if (druginteraction !== -1) {
        //                 drugInteractionId.splice(druginteraction, 1)
        //             }
        //             let index = temp.findIndex(temp => temp.id === 0);
        //             if (index != -1) {
        //                 setMedicationData(temp)
        //                 let showAdd = temp.length - 1
        //                 // document.getElementById("addprescription" + showAdd).style.display = "block";
        //             }
        //             else {
        //                
        //                 if (temp.length === 1) {
        //                     setMedicationData([...temp, row])
        //                 }
        //                 else {
        //                     setMedicationData([...temp])

        //                 }
        //             }
        //         }
        //         else {
        //             setMedicationData([row])
        //         }
        //     }
        //     else {
        //         let sendData = {
        //             "id": id,
        //             "isStop": 0,
        //             "userId": window.userId
        //         }
        //         let response = await POSTDeleteMedicationRow(sendData)
        //         if (response.status === 1) {
        //             temp.splice(ind, 1)
        //             setMedicationData([...temp])
        //             setShowMeassage("Medicine Delete Successfully!!")
        //             setShowSuccessToster(1)

        //         }
        //         else {
        //             setShowMeassage(response.responseValue)
        //             setShowAlertToster(1)
        //         }

        //     }

        // }
        // catch (e) {
        //     setShowAlertToster(1)
        //     setShowMeassage(e.message)
        // }

    }
    let handleKeyDown = (e) => {
        if (e.keyCode === 9) {
            GetDrugInteractionn(drugInteractionId)
        }
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

                    let response = FindByQuery(medicationList, value, "brandName")
                    if (response.length != 0) {
                        setShowSearchBoxMedic(ind)
                        setMedicationListTemp(response)



                    }
                    else {
                        setMedicationListTemp(["No Data Found!", ""])
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
                    }






                }
                else if (name === "frequencyData") {
                    temp[ind]["doseFrequency"] = value
                    setMedicationData([...temp])

                    let response = FindByQuery(frequncyList, value, "frequencyName")
                    if (response.length != 0) {
                        setFrequncyListTemp(response)
                        setShowSearchBoxFrequncy(ind)
                    }
                    else {
                        setShowSearchBoxFrequncy(["No Data Found!", ""])
                        setShowSearchBoxFrequncy(-1)

                    }
                }
                else if (name === "durationText") {
                    if (temp[ind]["duration"] !== "-1" && temp[ind]["duration"] !== "") {
                        let textdata = temp[ind]["duration"].split(",")[0]
                        let selectdata = temp[ind]["duration"].split(",")[1]

                        if (selectdata.length !== 0) {
                            temp[ind]["duration"] = value + "," + selectdata
                        }
                        else {
                            temp[ind]["duration"] = value + ","
                        }

                    }
                    else {
                        temp[ind]["duration"] = value + ","
                    }
                    setMedicationData([...temp])

                }
                else if (name === "duration") {
                    if (temp[ind]["duration"] !== "-1") {
                        let textdata = temp[ind]["duration"].split(",")[0]
                        let selectdata = temp[ind]["duration"].split(",")[1]
                        if (textdata.length !== 0) {
                            temp[ind]["duration"] = textdata + "," + value
                        }
                        else {
                            temp[ind]["duration"] = "," + value
                        }

                    }
                    else {
                        temp[ind]["duration"] = "," + value
                    }

                    setMedicationData([...temp])
                }
                else if (name === "rationalData") {
                    // temp[ind]["rationalId"] = value
                    // temp[ind]["problemName"] = value
                    document.getElementById("rationalData" + ind).value = value;
                    setMedicationData([...temp])
                    let response = FindByQuery(rationalList, value, "problemName")
                    if (response.length != 0) {
                        setRationalListTemp(response)
                        setShowSearchBoxRational(ind)
                    }
                    else {
                        setShowSearchBoxRational(["No Data Found!", ""])
                        setShowSearchBoxRational(-1)

                    }
                }

                else if (name === "remark") {
                    temp[ind]["remark"] = e.target.value
                    setMedicationData([...temp])

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
                }
                else if (name === "frequencyData") {
                    temp[ind]["doseFrequency"] = ""
                    setMedicationData([...temp])
                    // temp[ind]["duration"] = value
                }
                else if (name === "durationText") {
                    if (temp[ind]["duration"] !== "0,Days" && temp[ind]["duration"] !== "") {
                        let textdata = temp[ind]["duration"].split(",")[0]
                        let selectdata = temp[ind]["duration"].split(",")[1]
                        if (selectdata.length !== 0) {
                            temp[ind]["duration"] = value + "," + selectdata
                        }
                        else {
                            temp[ind]["duration"] = value + "," + "Days"
                        }

                    }
                    else {
                        temp[ind]["duration"] = value + "," + "Days"
                    }

                    setMedicationData([...temp])
                }
                else if (name === "duration") {
                    if (temp[ind]["duration"] !== "0,Days") {
                        let textdata = temp[ind]["duration"].split(",")[0]
                        let selectdata = temp[ind]["duration"].split(",")[1]
                        if (textdata.length !== 0) {
                            temp[ind]["duration"] = textdata + "," + value
                        }
                        else {
                            temp[ind]["duration"] = 0 + "," + value
                        }

                    }
                    else {
                        temp[ind]["duration"] = 0 + "," + value
                    }

                    setMedicationData([...temp])
                }
                else if (name === "rationalData") {
                    temp[ind]["problemName"] = ""
                    setMedicationData([...temp])

                }
                else if (name === "remark") {
                    temp[ind]["remark"] = ""
                    setMedicationData([...temp])

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

    let handleClick = (name, ind, data) => {
        try {
            let temp = [...medicationData]


            if (name === "drugData") {

                let temps = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
                let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
                let checkMedicine = []
                temps.map((value, index) => {
                    value.map((val, ind) => {
                        if (value[0] === activeUHID) {
                            let key = Object.keys(val)
                            if (key[0] === "jsonallergies") {
                                if (val.jsonallergies.length !== 0) {
                                    checkMedicine = val

                                }
                            }
                        }
                    })
                })

                if (checkMedicine.length !== 0) {
                    if (checkMedicine.jsonallergies.length === 0) {
                        let response = FindByQuery(temp, data[1], "drugName")

                        if (response.length === 0) {
                            temp[ind]["drugId"] = data[0]
                            temp[ind]["drugName"] = data[1]
                            temp[ind]["dosageForm"] = data[2]
                            temp[ind]["dosageStrength"] = data[3]
                            temp[ind]["doseUnit"] = data[4]
                            temp[ind]["isAntibiotic"] = data[5]

                            setDrugInteractionId([...drugInteractionId, data[0]])


                            GetDrugInteractionn([drugInteractionId[drugInteractionId.length - 1], data[0]])
                            document.getElementById("drugData" + ind).value = data[2] + "-" + data[1] + "-" + data[3]
                            setShowSearchBoxMedic(-1)
                            setMedicationData(temp)
                        }
                        else {
                            setShowAlertToster(1)
                            setShowMeassage("Medicine Already Exits!!")
                            setShowSearchBoxMedic(-1)

                        }
                    }
                    else {
                        let flag = 0
                        checkMedicine.jsonallergies.map((val, ind) => {

                            if (val.problemId === data[0]) {
                                flag = 1
                            }
                        })
                        if (flag === 0) {
                            let response = FindByQuery(temp, data[1], "drugName")
                            if (response.length === 0) {
                                temp[ind]["drugId"] = data[0]
                                temp[ind]["drugName"] = data[1]
                                temp[ind]["dosageForm"] = data[2]
                                temp[ind]["dosageStrength"] = data[3]
                                temp[ind]["doseUnit"] = data[4]
                                temp[ind]["isAntibiotic"] = data[5]

                                setDrugInteractionId([...drugInteractionId, data[0]])


                                GetDrugInteractionn([drugInteractionId[drugInteractionId.length - 1], data[0]])
                                document.getElementById("drugData" + ind).value = data[2] + "-" + data[1] + "-" + data[3]
                                setShowSearchBoxMedic(-1)
                                setMedicationData(temp)
                            }
                            else {
                                setShowAlertToster(1)
                                setShowMeassage("Medicine Already Exits!!")
                                setShowSearchBoxMedic(-1)

                            }
                        }
                        else {
                            setShowAlertToster(1)
                            setShowMeassage("Patient Allergic To This Drug.")
                            setShowSearchBoxMedic(-1)
                            // document.getElementById("drugData" + ind).value = "";
                            temp[ind]["drugName"] = ""
                            setMedicationData(temp)

                        }
                    }
                }
                else {

                    let response = FindByQuery(temp, data[1], "drugName")
                    if (response.length === 0) {
                        temp[ind]["drugId"] = data[0]
                        temp[ind]["drugName"] = data[1]
                        temp[ind]["dosageForm"] = data[2]
                        temp[ind]["dosageStrength"] = data[3]
                        temp[ind]["doseUnit"] = data[4]
                        temp[ind]["isAntibiotic"] = data[5]

                        setDrugInteractionId([...drugInteractionId, data[0]])

                        GetDrugInteractionn([drugInteractionId[drugInteractionId.length - 1], data[0]])
                        document.getElementById("drugData" + ind).value = data[2] + "-" + data[1] + "-" + data[3]
                        setShowSearchBoxMedic(-1)
                        setMedicationData(temp)
                    }
                    else {
                        temp[ind]["drugId"] = 0
                        temp[ind]["drugName"] = ""
                        temp[ind]["dosageForm"] = ""
                        temp[ind]["dosageStrength"] = ""
                        temp[ind]["doseUnit"] = ""
                        temp[ind]["isAntibiotic"] = ""
                        document.getElementById("drugData" + ind).value = data[2] + "-" + data[1] + "-" + data[3]
                        setMedicationData(temp)

                        setShowAlertToster(1)

                        setShowMeassage(t("Medicine Already Exits"))
                        setShowSearchBoxMedic(-1)
                    }
                }





            }


            else if (name === "frequencyData") {
                temp[ind]["doseFrequency"] = data
                document.getElementById("frequencyData" + ind).value = data

                setShowSearchBoxFrequncy(-1)
                setMedicationData(temp)
            }
            else if (name === "rationalData") {
                temp[ind]["rationalId"] = data[0]
                temp[ind]["problemName"] = data[1]

                setShowSearchBoxRational(-1)
                document.getElementById("rationalData" + ind).value = data[1];
                setMedicationData(temp)
            }
        }
        catch (e) {
            setShowAlertToster(1)
            setShowMeassage(e.message)
        }




    }

    let handleStop = async (ind, id) => {
        try {
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

                setShowMeassage("Medicine Stop Successfully!!")
                setShowSuccessToster(1)

            }
            else {
                setShowMeassage(response.responseValue)
                setShowAlertToster(1)
            }
        }
        catch (e) {
            setShowAlertToster(1)
            setShowMeassage(e)
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
                                // if (val.stopBy === null || val.stopBy === "") {
                                problemId.push(val.problemId)
                                // }

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
        // let sideEffectResponse = await ADRReportPost({ "brandId": senddata.toString(), "problemId": problemId.toString() })
        if (drugresponse.status === 1 && drugresponse.responseValue.length != 0) {

            setShowPopupDDrugInteraction(1)
            setDrugInteractionIdResponse(drugresponse.responseValue)
        }
        else {
            setDrugInteractionIdResponse([])

        }
        if (contraResponse.status === 1 && contraResponse.responseValue.length != 0) {


            setShowPopupDDrugInteraction(1)
            setContraIndicationResponse(contraResponse.responseValue)
        }
        else {
            setContraIndicationResponse([])

        }
        if (sideEffectResponse.status === 1 && sideEffectResponse.responseValue[0].otherSideEffect.length != 0) {


            setShowPopupDDrugInteraction(1)
            setSideEffectResponse(sideEffectResponse.responseValue[0].otherSideEffect)
        }
        else {
            setSideEffectResponse([])

        }
    }

    let patientsendData = useSelector((state) => state.PatientSendData)

    let setData = () => {

        try {
            function query(data, query, value) {

                return data
                    .filter(item => item[value] == query)

            }
            let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
            let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
            setMedicationData([row])
            let medicationsData = []
            let druginteractionIds = []

            temp.map((value, index) => {
                value.map((val, ind) => {
                    if (value[0] === activeUHID) {
                        let key = Object.keys(val)

                        if (key[0] === "jsonArray") {
                            val.jsonArray.map((val, i) => {
                                if (val != null) {

                                    // setMedicationData([...medicationsData, val])
                                    if (val.stopBy === null || val.stopBy === "") {
                                        druginteractionIds.push(val.drugId)



                                        let resp = query(rationalList, val.rationalId, "id")
                                        // let resp = []
                                        if (resp.length !== 0) {
                                            val["problemName"] = resp[0].problemName
                                        }
                                        else {
                                            val["problemName"] = ""

                                        }
                                        medicationsData.push(val)
                                    }
                                }


                            })
                        }
                        else if (key[0] === "disable") {
                            setDisable(val.disable)
                        }


                    }
                })
            })

            setDrugInteractionId([...druginteractionIds])

            if (medicationsData.length != 0) {
                let index = medicationsData.findIndex(temp => temp.id === 0);
                if (index != -1) {
                    setMedicationData([...medicationsData])
                }
                else {
                    setMedicationData([...medicationsData, row])
                }
            }
            else {
                setMedicationData([...medicationsData, row])
            }
        }
        catch (e) {
            setShowAlertToster(1)
            setShowMeassage(e)
        }

    }

    // let handleOnkeyPress = (e, ind) => {
    //     let value = e.target.value;
    //     let name = e.target.name
    //     let ul = ""
    //     let temp = [...medicationData]


    //     // sendfor["abc"] =  "" + ""
    //     if (e.keyCode === 13) {
    //         if (name === "drugData") {
    //             if (showSearchBoxMedic === -1) {
    //                 temp[ind]["drugId"] = 0
    //                 temp[ind]["drugName"] = value
    //                 temp[ind]["dosageForm"] = ""
    //                 temp[ind]["dosageStrength"] = ""
    //                 temp[ind]["doseUnit"] = ""
    //                 temp[ind]["isAntibiotic"] = 0
    //             }
    //             else {
    //                 ul = document.getElementById('drugdataList');
    //                 temp[ind]["drugId"] = 0
    //                 temp[ind]["drugName"] =  ul.getElementsByTagName('li')[index.current].value
    //                 temp[ind]["dosageForm"] = ""
    //                 temp[ind]["dosageStrength"] = ""
    //                 temp[ind]["doseUnit"] = ""
    //                 temp[ind]["isAntibiotic"] = 0
    //                 setShowSearchBoxMedic(-1)
    //                 liSelected.current = ""
    //                 index.current = -1
    //                 next.current = ""
    //                 oldData.current = 0
    //             }
    //             setMedicationData([...medicationData, row])
    //             document.getElementById("drugData"+ind).value = ""
    //             document.getElementById("drugData"+ind).focus()
    //         }
    //         // else if (name === "frequencyData") {
    //         //     if (showSearchBoxFrequncy === -1) {
    //         //         row["problemId"] = 0
    //         //         row["problemName"] = value
    //         //         row["pdmId"] = 10
    //         //     }
    //         //     else {
    //         //         ul = document.getElementById('AvoidedList');
    //         //         row["problemId"] = ul.getElementsByTagName('li')[index.current].value
    //         //         row["problemName"] = ul.getElementsByTagName('li')[index.current].innerText
    //         //         row["pdmId"] = 10
    //         //         setShowFoodDataAvoidList(-1)
    //         //         liSelected.current = ""
    //         //         index.current = -1
    //         //         next.current = ""
    //         //         oldData.current = 0

    //         //     }
    //         //     setAvoidFoodList([...avoidFoodList, row])
    //         //     setSendData([...sendData, row])
    //         //     document.getElementById(name).value = ""
    //         //     document.getElementById(name).focus()
    //         // }
    //         // else if (name === "other") {

    //         //     row["problemId"] = 0
    //         //     row["problemName"] = value
    //         //     row["pdmId"] = 11

    //         //     setOtherFoodList([...otherFoodList, row])
    //         //     setSendData([...sendData, row])
    //         //     document.getElementById(name).value = ""
    //         //     document.getElementById(name).focus()
    //         // }
    //         // SaveOPDData([...sendData, row], "jsonFood")
    //     }

    //     else if (e.keyCode === 40) {
    //         // down
    //         if (name === "Recommended") {
    //             if (showSearchBoxMedic !== -1) {
    //                 ul = document.getElementById('RecommendedList');
    //                 DownKey(ul, liSelected, index, next, oldData)
    //             }
    //         }
    //         // else if (name === "Avoided") {
    //         //     if (showFoodDataAvoidList !== -1) {
    //         //         ul = document.getElementById('AvoidedList');
    //         //         DownKey(ul, liSelected, index, next, oldData)
    //         //     }

    //         // }

    //     }

    //     else if (e.keyCode === 38) {
    //         // Up
    //         if (name === "Recommended") {
    //             if (showSearchBoxMedic !== -1) {
    //                 ul = document.getElementById('RecommendedList');
    //                 UpKey(ul, liSelected, index, next, oldData)

    //             }
    //         }
    //         // else if (name === "Avoided") {
    //         //     if (showFoodDataAvoidList !== -1) {
    //         //         ul = document.getElementById('AvoidedList');
    //         //         UpKey(ul, liSelected, index, next, oldData)
    //         //     }

    //         // }

    //     }

    // }
    useEffect(() => {
        getMedicationList()
        if (props.values === 1) {
            setData()
            props.funh(0)
        }
    }, [props.values === 1])

    useEffect(() => {
        SaveOPDData(medicationData, "jsonArray");
    }, [medicationData])

    useEffect(() => {
        setData()
    }, [patientsendData])



    try {
        return (
            <div className='p-0 pt-2 m-0'>

                <div className={`p-2 boxcontainer med-table-section `} style={{ height: "315px", overflowX: "auto" }}>
                    <TableContainer>
                        <thead>
                            <th className="wrap-content">#</th>
                            <th><img src={meddetails} className='icnim' alt='' />{t("MEDICINE")}</th>
                            <th><img src={frequency} className='icnim' alt='' />{t("FREQUENCY")}</th>
                            <th><img src={duration} className='icnim' alt='' />{t("DURATION")}</th>
                            <th><img src={rational} className='icnim' alt='' />{t("RATIONALE")}</th>
                            <th><img src={remark1} className='icnim' alt='' />{t("Remark")}</th>
                            <th><img src={status} className='icnim' alt='' />{t("Action")}</th>
                        </thead>
                        <tbody className='pb-5' >

                            {medicationData && medicationData.map((val, ind) => {
                                try {
                                    if (val.stopBy === null || val.stopBy === "") {

                                        return (
                                            <tr key={ind}  >
                                                <td>{ind + 1}</td>
                                                <td className='position-relative_'>
                                                    <input autoComplete="off" style={{ zIndex: 25 }} type='text' className='opdmedicationinput' name='drugData' value={val.drugName ? val.drugName.toUpperCase() : ""} placeholder={t('Dosage Form - Medicine Name - Strength')} id={`drugData${ind}`} onChange={(e) => { handleChange(e, ind) }} onKeyDown={handleKeyDown} disabled={disable === 1 ? true : false} />
                                                    {showSearchBoxMedic === ind ?
                                                        <div id="medicListDiv" className='position-absolute opdmedicationsearchbox'>
                                                            <ul id="drugul">
                                                                {medicationListTemp && medicationListTemp.map((val, index) => {

                                                                    return (
                                                                        <li className='pointer' onClick={(e) => { handleClick("drugData", ind, [val.id, val.brandName, val.dosageFormName, val.doseStrength, val.doseUnitID, val.isAntibiotic]) }}>{val.brandName}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <div className='full-screen-div-opd' onClick={() => { setShowSearchBoxMedic(-1) }}></div>

                                                        </div>
                                                        : ""}
                                                </td>
                                                <td><input autoComplete="off" type='text' className='opdmedicationinput' name="frequencyData" id={`frequencyData${ind}`} value={val.doseFrequency != "" ? val.doseFrequency : ""} placeholder={t('OD_BD_TDS')} style={{ width: "130px" }} onChange={(e) => { handleChange(e, ind) }} disabled={disable === 1 ? true : false} />
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
                                                        <input className='opdmedicationinput' value={val.duration != "" ? val.duration !== "-1" ? val.duration.split(",")[0] : 0 : "duration"} type='number' min="1" max="5" style={{ width: "40px" }} name="durationText" onChange={(e) => { handleChange(e, ind) }} />
                                                        <select className='opdmedicationinput' style={{ width: "74px" }} id={`durationData${ind}`} value={val.duration != "" ? val.duration.split(",")[1] : "duration"} name='duration' onChange={(e) => { handleChange(e, ind) }} disabled={disable === 1 ? true : false}>
                                                            <option value={"-1"}>{t("SELECT")}</option>
                                                            <option value={"Days"}>{t("DAYS")}</option>
                                                            <option value={"Weeks"}>{t("WEEKS")}</option>
                                                            <option value={"Months"}>{t("MONTHS")}</option>

                                                        </select>

                                                    </div>
                                                    {/* <input type='date'  /> */}

                                                </td>
                                                <td><input type='text' autoComplete="off" className='opdmedicationinput' style={{ width: "150px" }} id={`rationalData${ind}`} placeholder={t('Fever/Headache')} name="rationalData" onChange={(e) => { handleChange(e, ind) }} disabled={disable === 1 ? true : false} />

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
                                                <td><input autoComplete="off" type='text' className='opdmedicationinput' style={{ width: "200px" }} id={`remark${ind}`} value={val.remark} name="remark" onChange={(e) => { handleChange(e, ind) }} placeholder={t('Remarks')} disabled={disable === 1 ? true : false} /></td>
                                                <td>
                                                    {
                                                        val.id === 0 ?
                                                            <div className='d-flex flex-row gap-2'>
                                                                {/* <i className="fa-solid fa-plus fa-xl" id={`addprescription` + ind} style={{ color: "#3ca735" }} onClick={() => { handleAddRow(ind) }}></i> */}

                                                                <div><img className='pointer' src={deleteIcon} alt="Remove Row" title='Remove Row' onClick={() => { handleDeleteRow(ind, val.id, 0, val.drugId) }} /> </div>
                                                                {/* <i className="fa-solid fa-trash-can fa-xl" style={{ color: "#ff0000", fontSize: "18px" }} onClick={() => { handleDeleteRow(ind, val.id, 0, val.drugId) }}></i> */}
                                                            </div> :
                                                            <div className='d-flex flex-row gap-2'>
                                                                {disable === 0 ?
                                                                    <>
                                                                        <div><img className='pointer' src={stopMedIcon} alt="Stop Medicine" title='Stop Medicine' onClick={() => { handleStop(ind, val.id) }} /> </div>
                                                                        <div><img className='pointer' src={deleteIcon} alt="Remove Row" title='Remove Row' onClick={() => { handleDeleteRow(ind, val.id, 1, val.drugId) }} /> </div>
                                                                        {/* <i className="fa-solid fa-stopwatch fa-xl" style={{ color: "#db7a1f", fontSize: "18px" }} onClick={() => { handleStop(ind, val.id) }}></i>
                                                                        <i className="fa-solid fa-trash-can fa-xl" style={{ color: "#ff0000", fontSize: "18px" }} onClick={() => { handleDeleteRow(ind, val.id, 1, val.drugId) }}></i> */}
                                                                    </> :
                                                                    <>


                                                                        <div><img className='pointer' src={stopMedIcon} alt="Stop Medicine" title='Stop Medicine' /> </div>
                                                                        <div><img className='pointer' src={deleteIcon} alt="Remove Row" title='Remove Row' /> </div>
                                                                        {/* <i className="fa-solid fa-stopwatch fa-xl" style={{ color: "#db7a1f", fontSize: "18px" }} ></i>
                                                                        <i className="fa-solid fa-trash-can fa-xl" style={{ color: "#ff0000", fontSize: "18px" }} ></i> */}
                                                                    </>
                                                                }

                                                            </div>
                                                    }
                                                </td>

                                            </tr>
                                        )

                                    }
                                } catch (e) {
                                    console.log("errrro", e.message)
                                }
                            })}



                        </tbody>
                    </TableContainer>
                </div>
                <NewOPDFoodField values={props.values} funh={props.funh} foodData={props.foodData} />
                {
                    showAlertToster === 1 ? <AlertToster message={showMessage} handle={setShowAlertToster} /> : ""
                }
                {
                    showSuccessToster === 1 ? <SuccessToster message={showMessage} handle={setShowSuccessToster} /> : ""
                }
                {
                    showPopupDrugInteraction === 1 ? <PopUpDrugIteraction drugInteractionData={drugInteractionResponse} contraIndicationnData={contraIndicationResponse} sideEffectData={sideEffectResponse} show={showPopupDrugInteraction} func={setShowPopupDDrugInteraction} getData={setMedicationData} medicationData={medicationData} />
                        : ""
                }



            </div>
        )
    }
    catch (e) {
        return (<>
            {
                <AlertToster message={e.message} handle={0} />
            }
        </>)
    }
}