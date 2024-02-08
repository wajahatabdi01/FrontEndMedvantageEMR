import React, { useEffect, useState } from 'react'
import OPDPhysicalExamination from './PopUp/OPDPhysicalExamination'
import OPDAllergiesPopUP from './PopUp/OPDAllergiesPopUP'
import { useSelector } from 'react-redux'
import OPDDynamicSideBar from './PopUp/OPDDynamicSideBar'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import OPDHistorySideBar from './PopUp/OPDHistorySideBar'
import AlertToster from '../../../../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import Allergy from '../../../../../Registartion/Pages/OPDRegistration/IssuesPopUpComponents/Allergy'
import Problem from '../../../../../Registartion/Pages/OPDRegistration/IssuesPopUpComponents/Problem'
import OPDProblemPopUp from './FHIROPDPopUp/OPDProblemPopUp'
import OPDAllergyPopUp from './FHIROPDPopUp/OPDAllergyPopUp'
import OPDMedicationPopUp from './FHIROPDPopUp/OPDMedicationPopUp'
import OPDDevicePopUp from './FHIROPDPopUp/OPDDevicePopUp'
import SuccessToster from '../../../../../Component/SuccessToster'
import OPDSurgeryPopUp from './FHIROPDPopUp/OPDSurgeryPopUp'

export default function OPDTOPBottom(props) {
    document.body.dir = i18n.dir();
    const { t } = useTranslation();

    let [activeBox, setActiveBox] = useState()
    // let [showPhysicalExamination, setShowPhysicalExamination] = useState()
    let [showAlergies, setShowAlergies] = useState()
    let [disable, setDisable] = useState(0)
    let [patientCategoryResult, setPatientCategoryResult] = useState([])
    // let [patientExaminationResult, setPatientExaminationResult] = useState([])
    let [patientHistoryCategoryResultExistance, setPatientHistoryCategoryResultExistance] = useState([])
    // let [patientHistoryCategoryResult, setPatientHistoryCategoryResult] = useState([])
    let [showDynamicSideBar, setShowDynamicSideBar] = useState(0)
    let [showHistorySideBar, setShowHistoryideBar] = useState(0)
    let [nameDynamicSidebar, setNameDynamicSidebar] = useState("")
    let [categoryId, setCategoryId] = useState("")
    let [categoryType, setCategoryType] = useState(-1)
    let [activetab, setActivetab] = useState(-1)
    let [message, setMessage] = useState("")
    let [showToster, setShowToster] = useState("")
    // let [saveData, setSavedata] = useState()


    let handleClick = (val, name, id, categoryType) => {

        setNameDynamicSidebar(name)
        setCategoryId(id)
        setCategoryType(categoryType)
        if (categoryType === 1) {

            setShowDynamicSideBar(val)
            setShowHistoryideBar(0)

        }
        else {
            setShowHistoryideBar(val)
            setShowDynamicSideBar(0)

        }
    }

    let patientsendData = useSelector((state) => state.PatientSendData["patientSendData"])

    useEffect(() => {
        if (props.values === 1 || props.values === 0) {
            setData()
            props.funh(0)
        }
    }, [props.values === 1, props.values === 0])

    let setData = () => {
        try {
            let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
            let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
            temp.map((value, index) => {
                value.map((val, ind) => {
                    if (value[0] === activeUHID) {
                        let key = Object.keys(val)

                        if (key[0] === "patientCategoryResult") {

                            setPatientCategoryResult(val.patientCategoryResult)
                        }
                        // else if (key[0] === "patientExaminationResult") {
                        //     setPatientExaminationResult(val.patientExaminationResult)
                        // }
                        // else if (key[0] === "patientHistoryCategoryResult") {
                        //     setPatientHistoryCategoryResult(val.patientHistoryCategoryResult)
                        // }
                        else if (key[0] === "patientHistoryCategoryResultExistance") {
                            setPatientHistoryCategoryResultExistance(val.patientHistoryCategoryResultExistance)
                        }
                        else if (key[0] === "disable") {
                            setDisable(val.disable)
                        }
                    }
                })
            })
        }
        catch (e) {
            setShowToster(1)
            setMessage(e)
        }
    }

    useEffect(() => {
        setData()
    }, [patientsendData])

    return (
        <>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer '>
                <span data-bs-toggle="modal" data-bs-target="#problem" >{t("Problem")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#allergy">{t("Allergy")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#medication">{t("Medication")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#device">{t("Device")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#surgery">{t("Surgery")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span>{t("Dental")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span>{t("Care Plan")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span>{t("Family History")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span>{t("Immunization")} </span>

            </div>

            {/* --------------------------------------------------------------Problem PopUp Begin--------------------------------------------------- */}
            <div className="modal fade" id="problem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Problem</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="problem" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    <OPDProblemPopUp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* --------------------------------------------------------------Problem PopUp End--------------------------------------------------- */}
            
            {/* --------------------------------------------------------------Allergy PopUp Begin--------------------------------------------------- */}
            <div className="modal fade" id="allergy" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Allergy</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="allergy" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    <OPDAllergyPopUp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* --------------------------------------------------------------Allergy PopUp End--------------------------------------------------- */}
            
            {/* --------------------------------------------------------------Medication PopUp Begin--------------------------------------------------- */}
            <div className="modal fade" id="medication" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Medication</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="allergy" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    <OPDMedicationPopUp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* --------------------------------------------------------------Medication PopUp End--------------------------------------------------- */}
           
            {/* --------------------------------------------------------------Device PopUp Begin--------------------------------------------------- */}
            <div className="modal fade" id="device" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Device</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="allergy" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    <OPDDevicePopUp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* --------------------------------------------------------------Device PopUp End--------------------------------------------------- */}
           
            {/* --------------------------------------------------------------Surgery PopUp Begin--------------------------------------------------- */}
            <div className="modal fade" id="surgery" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Surgery</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="allergy" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    <OPDSurgeryPopUp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* --------------------------------------------------------------Surgery PopUp End--------------------------------------------------- */}

            {
                showToster === 1 ?
                    <SuccessToster handle={setShowToster} message="Problem Saved SuccessFully !!" /> : ""
            }

            {/* {
                showAlertToster === 1 ?
                    <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
            } */}
        </>
    )
}
