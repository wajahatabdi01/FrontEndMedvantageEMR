import React, { useEffect, useState } from 'react'
import OPDAllergiesPopUP from './PopUp/OPDAllergiesPopUP'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import { useSelector } from 'react-redux'
import POSTOPDPatientPrescription from '../../../../API/OPD/Prescription/POSTOPDPatientPrescription'
import SuccessToster from '../../../../../Component/SuccessToster'
// import GetPatientHistoryByUHID from '../../../../Api/OPD/Prescription/PatientHistoryOnClick/GetPatientHistoryByUHID'
// import GetPatientVitalHistoryByPmID from '../../../../Api/OPD/Prescription/PatientHistoryOnClick/GetPatientVitalHistoryByPmID'
// import PostAdmissionAdvice from '../../../../Api/OPD/Prescription/PostAdmissionAdvice'
import OPDReferral from './PopUp/OPDReferral'
import AlertToster from '../../../../../Component/AlertToster'
import PatientHistory from './PopUp/PatientHistory';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next"



import PatientHistory1 from '../../../../../assets/images/icons/PatientHistory1.svg'
import Referral from '../../../../../assets/images/icons/Referral.svg'
import advice from '../../../../../assets/images/icons/advice.svg'
import printerwhite from "../../../../../assets/images/icons/printerwhite.svg"
import GetWardDepartmentAssign from '../../../../../Admin/Api/Master/WardDepartmentAssignAPI/GetWardDepartmentAssign'
import GetWardDepartmentAssignById from '../../../../../Admin/Api/Master/WardDepartmentAssignAPI/GetWardDepartmentAssignById'
import Loader from '../../../../../Component/Loader'
import SaveButton from '../../../../../Component/SaveButton'
import FHIRFamilyHistoryEdit from '../../../../../EditCredentional/Pages/FHIRFamilyHistoryEdit'
import FHIRCarePlan from '../../../../../FHIRCarePlan/Pages/FHIRCarePlan'


export default function OPDBottomSection(props) {
    document.body.dir = i18n.dir();
    const {t} = useTranslation();

    let [nextVisitDate, setNextVisitDate] = useState()
    let [disable, setDisable] = useState(props.disable)

    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showAlertMessage, setShowAlertMessage] = useState("")

    let [wardList, setWardList] = useState([])

    let [loderVal, setLoderVal] = useState(0);
    const [isShowPopUp, setIsShowPopUp] = useState(0);
    const [isShowCarePlanPopUp, setIsShowCarePlanPopUp] = useState(0);

    const handleOpenModal=(modalID)=>{
        setIsShowPopUp(1);      
       }

    const handleOpenCarePlanModal=(modalID)=>{
        setIsShowCarePlanPopUp(1);      
       }

       const handleCloseModal=()=>{
        setIsShowPopUp(0);       
       }
       const handleCloseCarePlanModal=()=>{
        setIsShowCarePlanPopUp(0);       
       }


    let getWardData = async () => {

        let resp = await GetWardDepartmentAssignById()
        console.log("tt", resp)
        if (resp.status === 1) {
            setWardList(resp.responseValue)

        }
    }

    let handleChnage = (e) => {
        setNextVisitDate(e.target.value)
    }

    let activePatient = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
    let DepartmentId = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId
    let patientsendData = useSelector((state) => state.PatientSendData["patientSendData"])
    let [showToster, setShowtoster] = useState(0)
    let [showReferralModal, setShowReferralModal] = useState(0)

    const [selectedOptionAdmission, setSelectedOptionAdmission] = useState('');

    const handleChangeAdmission = (e) => {

        if (e.target.name === 'dropdownadmission') {
            console.log("cscscscscsd",e.target.value.split(",")[1]);
            setSelectedOptionAdmission(parseInt(e.target.value.split(",")[0]));
            SaveOPDData(e.target.value.split(",")[1], "adviseWardName");

        }
    };

    let handlesave = async () => {
        try {

            console.log("sdcdcs", window.userId)
            let patientdata = JSON.parse(window.sessionStorage.getItem("patientsendData"))
            let tempSendData = {}
            patientdata.map((value, index) => {
                value.map((val, ind) => {
                    if (value[0] === activePatient) {
                        let key = Object.keys(val)
                        if (key[0] === "jsonArray") {

                            tempSendData["jsonArray"] = JSON.stringify(val.jsonArray)

                        }
                        else if (key[0] === "jsonInvestigation") {
                            // if (val.jsonInvestigation.length !== 0) {

                            tempSendData["jsonInvestigation"] = JSON.stringify(val.jsonInvestigation)
                            // }
                            // else {
                            //     tempSendData["jsonInvestigation"] = ""
                            // }

                        }
                        else if (key[0] === "jsonVital") {
                            tempSendData["jsonVital"] = JSON.stringify(val.jsonVital)

                        }
                        else if (key[0] === "jsonDiagnosis") {

                            if (tempSendData.jsonDiagnosis != undefined || tempSendData.jsonDiagnosis != null) {
                                tempSendData["jsonDiagnosis"] = [...tempSendData.jsonDiagnosis, ...val.jsonDiagnosis]

                            }
                            else {
                                tempSendData["jsonDiagnosis"] = val.jsonDiagnosis

                            }

                        }
                        else if (key[0] === "jsonFood") {
                            if (tempSendData.jsonDiagnosis != undefined || tempSendData.jsonDiagnosis != null) {
                                tempSendData["jsonDiagnosis"] = [...tempSendData.jsonDiagnosis, ...val.jsonFood]

                            }
                            else {
                                tempSendData["jsonDiagnosis"] = val.jsonFood

                            }
                        }
                        else if (key[0] === "jsonallergies") {
                            if (tempSendData.jsonDiagnosis != undefined || tempSendData.jsonDiagnosis != null) {
                                tempSendData["jsonDiagnosis"] = [...tempSendData.jsonDiagnosis, ...val.jsonallergies]

                            }
                            else {
                                tempSendData["jsonDiagnosis"] = val.jsonallergies

                            }
                        }
                        else if (key[0] === "nextVisitDate") {

                            if (val.nextVisitDate.length !== 0) {

                                tempSendData["nextVisitDate"] = val.nextVisitDate
                            }
                            else {
                                tempSendData["nextVisitDate"] = []
                            }


                        }
                        else if (key[0] === "patientExaminationResult") {
                            // if (val.patientExaminationResult.length !== 0) {

                            tempSendData["jsonExamination"] = JSON.stringify(val.patientExaminationResult)
                            // }
                            // else {
                            //     tempSendData["jsonExamination"] = []
                            // }
                        }
                        else if (key[0] === "patientHistoryCategoryResult") {
                            // if (val.patientHistoryCategoryResult.length !== 0) {

                            tempSendData["jsonHistory"] = JSON.stringify(val.patientHistoryCategoryResult)
                            // }
                            // else {
                            //     tempSendData["jsonHistory"] = []
                            // }
                        }
                    }
                })
            })


            let flag = 0
            let diagnoFlaf = 0

            if (tempSendData["jsonDiagnosis"].length !== 0 && tempSendData["jsonDiagnosis"][0] !== null) {
                if (tempSendData["jsonDiagnosis"][tempSendData["jsonDiagnosis"].length - 1] === null) {
                    tempSendData["jsonDiagnosis"].pop()
                }
                tempSendData["jsonDiagnosis"].map((v, i) => {
                    if (v.pdmId === 2) {
                        flag = 1
                    }
                    if (v.pdmId === 4) {
                        diagnoFlaf = 1
                    }


                })
            }
            console.log("vitsalss", tempSendData.jsonVital)

            // get data from complaint and diagnosis
            if (document.getElementById("symptomsData").value !== "") {
                let row = { "problemId": 0, "problemName": document.getElementById("symptomsData").value, "pdmId": 2 }
                tempSendData["jsonDiagnosis"].push(row)

            }
            if (document.getElementById("physicalData").value !== "") {
                let row = { "problemId": 0, "problemName": document.getElementById("physicalData").value, "pdmId": 6 }
                tempSendData["jsonDiagnosis"].push(row)
            }

            if (document.getElementById("consultantData").value !== "") {
                let row = { "problemId": 0, "problemName": document.getElementById("consultantData").value, "pdmId": 4 }
                tempSendData["jsonDiagnosis"].push(row)
            }


            console.log("dignosisData", tempSendData["jsonDiagnosis"])


            tempSendData["jsonDiagnosis"] = JSON.stringify(tempSendData["jsonDiagnosis"])
            tempSendData["userId"] = window.userId
            tempSendData["uhId"] = activePatient
            tempSendData["deptId"] = DepartmentId
            tempSendData["doctorId"] = window.userId
            tempSendData["adviseWardId"] = selectedOptionAdmission


            let freqFlag = [-1, -1]
            let durationFlag = [-1, -1]
            let temparray = JSON.parse(tempSendData.jsonArray)
            JSON.parse(tempSendData.jsonArray).map((val, ind) => {
                console.log("val", val)
                if (val.id === 0 && val.drugName === "") {
                    temparray.splice(ind, 1)
                }
                else if (val.doseFrequency === "") {
                    freqFlag = [0, ind + 1]
                    return
                }
                else if (val.duration === "-1") {
                    durationFlag = [0, ind + 1]
                    return durationFlag
                }
                // else {
                //     if (val.drugName !== "") {
                //         if (freqFlag[0] === -1) {

                //         }
                //         freqFlag = [0, ind + 1]
                //     }
                // }

            })


            tempSendData["jsonArray"] = JSON.stringify(temparray)
            if (flag === 1 && diagnoFlaf === 1 && freqFlag[0] === -1 && durationFlag[0] === -1 && tempSendData["nextVisitDate"].length !== 0) {
                setLoderVal(1)
                let response = await POSTOPDPatientPrescription(tempSendData)

                if (response.status === 1) {
                    console.log("finalResponse", response.responseValue)
                    setShowtoster(1)
                    window.open("/prescriptionPrint/", 'noopener,noreferrer');
                    setLoderVal(0)
                }
                else {
                    if(response.responseValue.toString().toLowerCase() === "Column 'vmValue' cannot be null".toString().toLowerCase())
                    {
                        setLoderVal(0)
                        setShowAlertToster(1)
                        setShowAlertMessage("Please Fill Vitals!!")
                    }
                    else{
                        setLoderVal(0)
                        setShowAlertToster(1)
                        setShowAlertMessage(response.responseValue)
                    }
                    
                }
            }
            else {

                console.log("flags", freqFlag, durationFlag)
                if (flag === 0) {
                    setShowAlertToster(1)
                    setShowAlertMessage("Please Fill Patient complaint!!")
                }
                else if (diagnoFlaf === 0) {
                    setShowAlertToster(1)
                    setShowAlertMessage("Please Fill Consultant Diagnosis!!")
                }
                else if (freqFlag[0] === 0 && freqFlag[1] !== -1) {
                    setShowAlertToster(1)
                    setShowAlertMessage("Please Fill Medicine Frequency At Row" + freqFlag[1])
                }
                else if (durationFlag[0] === 0 && durationFlag[1] !== -1) {
                    setShowAlertToster(1)
                    setShowAlertMessage("Please Fill Medicine Duration At Row" + durationFlag[1])
                }
                else {
                    setShowAlertToster(1)
                    setShowAlertMessage("Please Fill Patient Next Visit Date!!")
                }

            }
        }
        catch (e) {
            setShowAlertToster(1)
            setShowAlertMessage(e.message)
        }

    }

    useEffect(() => {
        SaveOPDData(nextVisitDate, "nextVisitDate")

    }, [nextVisitDate])

    useEffect(() => {
        getWardData()
        setNextVisitDate([])
        let patientdata = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
        let activePatient = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
        let tempSendData = {}
        patientdata.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activePatient) {
                    let key = Object.keys(val)
                    if (key[0] === "nextVisitDate") {
                        setNextVisitDate(val.nextVisitDate)
                    }
                    else if (key[0] === "disable") {
                        setDisable(val.disable)
                    }
                }
            })
        })

    }, [patientsendData])


    return (
    <div className='rtyn20'>
      <div className='opdbtn'>
        <div className='leftbtnn' >
          <label htmlFor="nextVisitDate" className='admid'>{t("Next Followup Date")}* </label>
          <input
            type='date'
            min={new Date().toJSON().split("T")[0]}
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toJSON().split("T")[0]}
            className='form-control from-control-sm opdBottominput'
            name="nextVisitDate"
            value={nextVisitDate != undefined ? nextVisitDate.length != 0 ? nextVisitDate : "" : ""}
            onChange={handleChnage}
            style={{ color: "#707070", width: "169px" }}
            disabled={disable === 1 ? true : false}
          />
          <label htmlFor="dropdown" className='admid'>{t("Admission Advice")}</label>
          <select style={{textAlignLast:"center"}} className='saveprintopd sectopb' id='dropdownadmission' name='dropdownadmission' disabled={disable === 1 ? true : false} onChange={handleChangeAdmission}>
            <option value='' id='admissionadvice'>{t("--select--")}</option>
            {wardList && wardList.map((val, ind) => {
              return (
                <option value={val.wardId + "," + val.wardName}>{val.wardName}</option>
              )
            })}
          </select>
        </div>

        <div className='leftbtnn'>
          <button className='saveprintopd btnbluehover ps-3 pe-3' disabled={disable === 1 ? true : false} onClick={() => { setShowReferralModal(1) }}>
            <img src={Referral} className='icnn' alt='' />{t("Referral")}
          </button>
          <button className='saveprintopd btnbluehover ps-3 pe-3' disabled={disable === 1 ? true : false} onClick={handleOpenCarePlanModal}>
            <img src={Referral} className='icnn' alt='' />Care Plan
          </button>
          <button className='saveprintopd btnbluehover ps-3 pe-3' disabled={disable === 1 ? true : false} onClick={handleOpenModal}>
            <img src={Referral} className='icnn' alt='' />Family History
          </button>
          <button className='saveprintopd btnbluehover ps-3 pe-3' disabled={disable === 1 ? true : false} data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal">
            <img src={PatientHistory1} className='icnn' alt=''/> {t("Patient History")}
          </button>
          <button className='saveprintopd ps-3 pe-3 btn-save-fill' onClick={handlesave} disabled={disable === 1 ? true : false}>
            <img src={printerwhite} className='icnn' alt='' /> {t("Save & Print")}
          </button>
        </div>

        {showToster === 1 ?
          <SuccessToster handle={setShowtoster} message={t("Data Save Successfully!!")} /> : ""
        }
        {showAlertToster === 1 ? <AlertToster handle={setShowAlertToster} message={showAlertMessage} /> : ""}
        <PatientHistory />
        {showReferralModal === 1 ? <OPDReferral showModal={1} func={setShowReferralModal} /> : ""}
        {isShowPopUp === 1 ?
      
      <div className={`modal d-${isShowPopUp===1 ?'block':'none'}`} id="codesModal"  data-bs-backdrop="static" >
                    <div className="modal-dialog modalDelete" style={{maxWidth:'750px'}}>
                        <div className="modal-content" >
                        {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>
                           

                            <FHIRFamilyHistoryEdit patientUhid = {activePatient}/> 
                           {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
                        </div>
                    </div>
                </div>
      :''}
        {isShowCarePlanPopUp === 1 ?
      
      <div className={`modal d-${isShowCarePlanPopUp===1 ?'block':'none'}`} id="codesModal"  data-bs-backdrop="static" >
                    <div className="modal-dialog modalDelete" style={{maxWidth:'750px'}}>
                        <div className="modal-content" >
                        {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseCarePlanModal}></i></button>
                           

                            <FHIRCarePlan patientUhid = {activePatient}/> 
                           {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
                        </div>
                    </div>
                </div>
      :''}
        <Loader val={loderVal} />
     </div>
    </div>
      


    )
}

