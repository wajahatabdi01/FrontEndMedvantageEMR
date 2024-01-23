import React, { useEffect, useImperativeHandle, useState } from 'react'
// import BoxContainer from '../../../../../Components/BoxContainer'
// import TableContainer from '../../../../../Components/TableContainer'
// import Heading from '../../../../../Components/Heading'
// import OPDTopVitals from './OPDTopVitals'
import OPDInvestigationProcedure from './OPDInvestigationProcedure'
import OPDPatientInputData from './OPDPatientInputData'
import OPDPatientMedicationAssign from './OPDPatientMedicationAssign'
import OPDPatientLabDetails from './OPDPatientLabDetails'
import OPDBottomSection from './OPDBottomSection'
// import OPDPatientTabs from './OPDPatientTabs'
import GetPatientHistory from '../../../../API/OPD/Prescription/GetPatientHistory'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import SuccessToster from '../../../../../Component/SuccessToster'
import AlertToster from '../../../../../Component/AlertToster'
import Loader from '../../../../../Component/Loader'
import GetCheckCrNo from '../../../../API/OPD/Prescription/GetCheckCrNo'
import POSTVisitRevisit from '../../../../API/OPD/Prescription/POSTVisitRevisit'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function OPDPrescriptionIndex(props) {


 
  

    let [showPopUp, setShowPopUp] = useState(1)
    let [patientHistory, setPatientHistory] = useState([])
    let [getD, setGetD] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState(0)
    let [disable, setDisable] = useState(0)
    let [showLoader, setShowLoader] = useState(1)
    let [foodData, setFoodData] = useState([])



    let handlePopUp = (val) => {
        setShowPopUp(val)
    }



    let getdata = async (val, NoYes) => {
        try {

            if (val === 0) {
                let response = await GetPatientHistory()
                let data = response.responseValue;
                if (response.status === 1) {
                    setPatientHistory(response.responsevalue)
                    let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
                    let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
                    let Vitalsdata = [
                        {
                            "vmId": 56,
                            "vmValue": ""
                        },
                        {
                            "vmId": 4,
                            "vmValue": ""
                        },
                        {
                            "vmId": 6,
                            "vmValue": ""
                        },
                        {
                            "vmId": 3,
                            "vmValue": ""
                        },
                        {
                            "vmId": 7,
                            "vmValue": ""
                        },
                        {
                            "vmId": 5,
                            "vmValue": ""
                        },
                        {
                            "vmId": 2,
                            "vmValue": ""
                        },
                        {
                            "vmId": 1,
                            "vmValue": ""
                        }]
                    let symptomsDatas = []
                    let consultantDatas = []
                    let physicalexamination = []
                    let prescriptiondata = []
                    let foodData = []
                    let allergiesData = []
                    let nextVisitDate = []
                    let investigationData = []
                    let patientCategoryResult = []
                    let patientExaminationResult = []
                    let patientHistoryCategoryResult = []
                    let patientHistoryCategoryResultExistance = []

                    temp.map((values, index) => {
                        values.map((val, ind) => {
                            if (values[0] === activeUHID) {
                                let key = Object.keys(val)
                                if (key[0] === "jsonDiagnosis") {
                                    if (data.patientComplainHistory.length != 0) {

                                        data.patientComplainHistory.map((value, ind) => {
                                            if (value.pdmId === 2) {
                                                symptomsDatas.push(value)
                                            }
                                            if (value.pdmId === 4) {
                                                consultantDatas.push(value)
                                            }
                                            if (value.pdmId === 6) {
                                                physicalexamination.push(value)
                                            }
                                            if (value.pdmId === 11) {
                                                foodData.push(value)
                                            }
                                            if (value.pdmId === 10) {
                                                foodData.push(value)
                                            }
                                            if (value.pdmId === 9) {
                                                foodData.push(value)
                                            }
                                            if (value.pdmId === 7) {
                                                allergiesData.push(value)
                                            }
                                            if (value.pdmId === 8) {
                                                allergiesData.push(value)
                                            }
                                        })
                                    }
                                    else {
                                        data.patientHeightWeight.map((val, ind) => {

                                            Vitalsdata.map((v, ii) => {
                                                if (v.vmId === 1) {
                                                    Vitalsdata[ii].vmValue = val.height
                                                }
                                                else if(v.vmId === 2)
                                                {
                                                    Vitalsdata[ii].vmValue = val.weight
                                                }
                                            })

                                        })
                                        // data.patientHeightWeight
                                    }
                                }
                                else if (key[0] === "jsonVital") {
                                    if (data.patientVitals.length != 0) {
                                        console.log("vitals data", data.patientVitals)
                                        Vitalsdata = [...data.patientVitals]

                                    }
                                }
                                else if (key[0] === "jsonArray") {
                                    if (data.allPrescription.length != 0) {
                                        prescriptiondata = [...data.allPrescription]
                                        // console.log("dataPrescription", data.allPrescription)
                                        // SaveOPDData(data.allPrescription, "jsonArray")
                                    }
                                    else {
                                        prescriptiondata = []


                                    }
                                }
                                else if (key[0] === "jsonInvestigation") {
                                    if (data.patientInvestigation.length != 0) {
                                        investigationData = [...data.patientInvestigation]
                                        // SaveOPDData(data.patientInvestigation, "jsonInvestigation")
                                    }
                                    else {
                                        investigationData = []


                                    }
                                }
                                else if (key[0] === "patientCategoryResult") {

                                    if (data.patientCategoryResult.length != 0) {

                                        patientCategoryResult = data.patientCategoryResult
                                    }
                                }
                                else if (key[0] === "patientExaminationResult") {
                                    if (data.patientExaminationResult.length != 0) {
                                        patientExaminationResult = data.patientExaminationResult
                                    }

                                }
                                else if (key[0] === "patientHistoryCategoryResult") {
                                    if (data.patientHistoryCategoryResult.length != 0) {
                                        patientHistoryCategoryResult = data.patientHistoryCategoryResult
                                    }

                                }
                                else if (key[0] === "patientHistoryCategoryResultExistance") {
                                    if (data.patientHistoryCategoryResultExistance.length != 0) {
                                        patientHistoryCategoryResultExistance = data.patientHistoryCategoryResultExistance
                                    }

                                }

                            }
                        })
                    })

                    let t = [...consultantDatas, ...symptomsDatas, ...physicalexamination]
                    SaveOPDData(t, "jsonDiagnosis")
                    SaveOPDData(foodData, "jsonFood")
                    SaveOPDData(Vitalsdata, "jsonVital")
                    SaveOPDData(patientCategoryResult, "patientCategoryResult")
                    SaveOPDData(patientExaminationResult, "patientExaminationResult")
                    SaveOPDData(patientHistoryCategoryResult, "patientHistoryCategoryResult")
                    SaveOPDData(patientHistoryCategoryResultExistance, "patientHistoryCategoryResultExistance")
                    SaveOPDData(prescriptiondata, "jsonArray")
                    SaveOPDData(investigationData, "jsonInvestigation")
                    SaveOPDData(nextVisitDate, "nextVisitDate")
                    SaveOPDData(allergiesData, "jsonallergies")

                    SaveOPDData(0, "disable")
                    setGetD(1)
                    setTimeout(() => {
                        setShowLoader(0)
                    }, 1500)
                    return
                }
                else {
                    setShowLoader(0)
                }
            }

            else if (val === 2) {
                if (NoYes === 1) {
                    let Vitalsdata = [
                        {
                            "vmId": 56,
                            "vmValue": ""
                        },
                        {
                            "vmId": 4,
                            "vmValue": ""
                        },
                        {
                            "vmId": 6,
                            "vmValue": ""
                        },
                        {
                            "vmId": 3,
                            "vmValue": ""
                        },
                        {
                            "vmId": 7,
                            "vmValue": ""
                        },
                        {
                            "vmId": 5,
                            "vmValue": ""
                        },
                        {
                            "vmId": 2,
                            "vmValue": ""
                        },
                        {
                            "vmId": 1,
                            "vmValue": ""
                        }]

                    let sendData = {
                        "uhId": JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid,
                        "deptId": JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId,
                        "userId": window.userId,
                    }

                    let responsedd = await POSTVisitRevisit(sendData)

                    if (responsedd.status === 0) {
                        setShowToster(1)
                        setMessage(responsedd.responseValue)
                    }

                    setDisable(0)
                    setGetD(1)

                    let allPopdata = JSON.parse(window.sessionStorage.getItem("PopUpData")) ? JSON.parse(window.sessionStorage.getItem("PopUpData")) : []
                    let temppopup = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid

                    let response = await GetPatientHistory()
                    let data = response.responseValue;
                    if (response.status === 1) {
                        let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
                        let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : temppopup
                        temp.map((values, index) => {
                            values.map((val, ind) => {
                                if (values[0] === activeUHID) {
                                    let key = Object.keys(val)
                                    
                                    if (key[0] === "jsonVital") {
                                        if (data.patientVitals.length != 0) {
                                            Vitalsdata = data.patientVitals
                                        }
                                        else {
                                            data.patientHeightWeight.map((val, ind) => {

                                                Vitalsdata.map((v, ii) => {
                                                    if (v.vmId === 1) {
                                                        Vitalsdata[ii].vmValue = val.height
                                                    }
                                                    else if(v.vmId === 2)
                                                    {
                                                        Vitalsdata[ii].vmValue = val.weight
                                                    }
                                                })

                                            })
                                            // data.patientHeightWeight
                                        }
                                    }
                                    SaveOPDData(data.patientCategoryResult, "patientCategoryResult")
                                    SaveOPDData(data.patientExaminationResult, "patientExaminationResult")
                                    SaveOPDData(data.patientHistoryCategoryResult, "patientHistoryCategoryResult")
                                    SaveOPDData(data.patientHistoryCategoryResultExistance, "patientHistoryCategoryResultExistance")

                                }
                            })
                        })
                    }



                    let jsons = { "UHID": temppopup, "show": 1 }
                    let setPopup = [...allPopdata, jsons]


                    window.sessionStorage.setItem("PopUpData", JSON.stringify(setPopup))
                    setTimeout(() => {
                        setShowLoader(0)
                    }, 1500)

                    return

                }
                else if (NoYes != 1) {
                    let response = await GetPatientHistory()
                    let data = response.responseValue;
                    if (response.status === 1) {
                        // setShowLoader(0)
                        setPatientHistory(response.responsevalue)
                        let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
                        let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
                        let symptomsDatas = []
                        let consultantDatas = []
                        let physicalexamination = []
                        let Vitalsdata = [
                            {
                                "vmId": 56,
                                "vmValue": ""
                            },
                            {
                                "vmId": 4,
                                "vmValue": ""
                            },
                            {
                                "vmId": 6,
                                "vmValue": ""
                            },
                            {
                                "vmId": 3,
                                "vmValue": ""
                            },
                            {
                                "vmId": 7,
                                "vmValue": ""
                            },
                            {
                                "vmId": 5,
                                "vmValue": ""
                            },
                            {
                                "vmId": 2,
                                "vmValue": ""
                            },
                            {
                                "vmId": 1,
                                "vmValue": ""
                            }]
                        let prescriptiondata = []
                        let investigationData = []
                        let foodData = []
                        let patientCategoryResult = []
                        let patientExaminationResult = []
                        let patientHistoryCategoryResult = []
                        let patientHistoryCategoryResultExistance = []
                        temp.map((values, index) => {
                            values.map((val, ind) => {
                                if (values[0] === activeUHID) {
                                    let key = Object.keys(val)
                                    console.log("data", key[0])
                                    if (key[0] === "jsonDiagnosis") {
                                        if (data.patientComplainHistory.length != 0) {

                                            data.patientComplainHistory.map((value, ind) => {
                                                if (value.pdmId === 2) {
                                                    symptomsDatas.push(value)
                                                }
                                                if (value.pdmId === 4) {
                                                    consultantDatas.push(value)
                                                }
                                                if (value.pdmId === 6) {
                                                    physicalexamination.push(value)
                                                }
                                                if (value.pdmId === 11) {
                                                    foodData.push(value)
                                                }
                                                if (value.pdmId === 10) {
                                                    foodData.push(value)
                                                }
                                                if (value.pdmId === 9) {
                                                    foodData.push(value)
                                                }
                                            })
                                        }
                                    }
                                    else if (key[0] === "jsonVital") {
                                        if (data.patientVitals.length != 0) {
                                            Vitalsdata = data.patientVitals

                                        }
                                        else {
                                            data.patientHeightWeight.map((val, ind) => {

                                                Vitalsdata.map((v, ii) => {
                                                    if (v.vmId === 1) {
                                                        Vitalsdata[ii].vmValue = val.height
                                                    }
                                                    else if(v.vmId === 2)
                                                    {
                                                        Vitalsdata[ii].vmValue = val.weight
                                                    }
                                                })

                                            })
                                            // data.patientHeightWeight
                                        }
                                    }
                                    else if (key[0] === "jsonArray") {
                                        if (data.allPrescription.length != 0) {
                                            prescriptiondata = data.allPrescription
                                        }
                                    }
                                    else if (key[0] === "jsonInvestigation") {
                                        if (data.patientInvestigation.length != 0) {
                                            investigationData = [...data.patientInvestigation]
                                        }
                                    }
                                    else if (key[0] === "patientCategoryResult") {
                                        if (data.patientCategoryResult.length != 0) {
                                            patientCategoryResult = data.patientCategoryResult
                                        }
                                    }
                                    else if (key[0] === "patientExaminationResult") {
                                        if (data.patientExaminationResult.length != 0) {
                                            patientExaminationResult = data.patientExaminationResult
                                        }

                                    }
                                    else if (key[0] === "patientHistoryCategoryResult") {
                                        if (data.patientHistoryCategoryResult.length != 0) {
                                            patientHistoryCategoryResult = data.patientHistoryCategoryResult
                                        }

                                    }
                                    else if (key[0] === "patientHistoryCategoryResultExistance") {
                                        if (data.patientHistoryCategoryResultExistance.length != 0) {
                                            patientHistoryCategoryResultExistance = data.patientHistoryCategoryResultExistance
                                        }

                                    }
                                }
                            })
                        })

                        let t = [...consultantDatas, ...symptomsDatas, ...physicalexamination]
                        SaveOPDData(t, "jsonDiagnosis")
                        SaveOPDData(foodData, "jsonFood")
                        SaveOPDData(1, "disable")
                        SaveOPDData(investigationData, "jsonInvestigation")
                        SaveOPDData(data.patientCategoryResult, "patientCategoryResult")
                        SaveOPDData(data.patientExaminationResult, "patientExaminationResult")
                        SaveOPDData(data.patientHistoryCategoryResult, "patientHistoryCategoryResult")
                        SaveOPDData(data.patientHistoryCategoryResultExistance, "patientHistoryCategoryResultExistance")

                        SaveOPDData(prescriptiondata, "jsonArray")
                        SaveOPDData(Vitalsdata, "jsonVital")




                        setGetD(1)
                        setDisable(1)
                        let allPopdata = JSON.parse(window.sessionStorage.getItem("PopUpData")) ? JSON.parse(window.sessionStorage.getItem("PopUpData")) : []
                        let temppopup = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
                        let jsons = { "UHID": temppopup, "show": 1 }
                        let setPopup = [...allPopdata, jsons]
                        window.sessionStorage.setItem("PopUpData", JSON.stringify(setPopup))

                        setShowLoader(0)
                    }
                    else {
                        setTimeout(() => {
                            setShowLoader(0)
                        }, 1500)
                    }

                    return
                }


            }
        }
        catch (e) {
            setShowToster(1)
            setMessage(e)
        }
    }

    let CheckCrNo = async () => {
        let activepatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        let response = await GetCheckCrNo(activepatient)
        if (response.status === 1) {
            if (response.responseValue[0].crNo != null) {
                getdata(0, 3)
                handlePopUp(0)
            }
            else {
                handlePopUp(0)
            }
        }
    }

    useEffect(() => {
        try {

            let flag = 0
            let t = []
            let patientData = JSON.parse(window.sessionStorage.getItem("patientsendData"))
            let activepatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
            patientData && patientData.map((val, ind) => {
                console.log("val value", val.length)
                if ((val[0].toString().toLowerCase().trim() === activepatient.toString().toLowerCase().trim()) && val.length > 1) {
                    flag = 1
                    t = val
                    return
                }
            })
            console.log("flag value ", flag)
            if (flag === 1) {
                t.map((v, i) => {
                    if (v.disable === 0) {
                        getdata(0, 1)
                        setShowPopUp(0)
                        // setShowLoader(0)
                    }
                    else if (v.disable === 1) {
                        getdata(2, 2)
                        setShowPopUp(0)
                        // setShowLoader(0)
                    }
                })
            }
            else {
                console.log("enter")
                CheckCrNo()
            }
        }
        catch (e) {
            setShowToster(1)
            setMessage(e)
        }



    }, [])



    return (
        <>
            {/* <OPDPatientTabs handlePopUp={handlePopUp} getdata={getdata} handlepatientTab={handlepatientTab}/> */}

            {showPopUp != 1 ?
                <div className=''>
                    {/* <OPDTopVitals /> */}
                    <div className="row" >
                        <div className='col-md-9 col-sm-12 plt1'>
                            <OPDPatientInputData values={getD} funh={setGetD} setFoodData={setFoodData} />
                            <OPDPatientMedicationAssign values={getD} funh={setGetD} foodData={foodData} />
                        </div>
                        <div className='col-md-3 col-sm-12 prt1 arabicpad'>
                            <OPDPatientLabDetails values={getD} funh={setGetD} />
                            <OPDInvestigationProcedure values={getD} funh={setGetD} />
                        </div>
                    </div>
                    <OPDBottomSection />
                    {showToster === 1 ?
                        <AlertToster message={message} handle={setShowToster} /> : ""
                    }
                    <Loader val={showLoader} />
                </div>
                : <ConfirmModal bool={showPopUp} close={handlePopUp} getdata={getdata} />}

        </>
        // <>
        // ffdfs</>
    )
}


let ConfirmModal = (props) => {

    const {t} = useTranslation()
    document.body.dir = i18n.dir();

    return (
        <div className={`modal d-${props.bool === 10 ? 'block' : 'none'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{t("Modal title")}</h1>
                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                    </div>
                    <div className="modal-body">
                        {t("Do you want to Visit Or Revisit Patient?")}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { props.close(-1); props.getdata(2, 1); }}>{t("Yes")}</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { props.close(-1); props.getdata(2, 0); }}>{t("No")}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}