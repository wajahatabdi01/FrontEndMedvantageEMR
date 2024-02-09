import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AlertToster from '../../../../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import OPDProblemPopUp from './FHIROPDPopUp/OPDProblemPopUp'
import OPDAllergyPopUp from './FHIROPDPopUp/OPDAllergyPopUp'
import OPDMedicationPopUp from './FHIROPDPopUp/OPDMedicationPopUp'
import OPDDevicePopUp from './FHIROPDPopUp/OPDDevicePopUp'
import SuccessToster from '../../../../../Component/SuccessToster'
import OPDSurgeryPopUp from './FHIROPDPopUp/OPDSurgeryPopUp'
import FHIRFamilyHistoryEdit from '../../../../../EditCredentional/Pages/FHIRFamilyHistoryEdit'
import FHIRCarePlan from '../../../../../FHIRCarePlan/Pages/FHIRCarePlan';
import FHIRImmunization from '../../../../../FHIRImmunization/Pages/FHIRImmunization';
import OPDRecordDisclosurePopUp from './FHIROPDPopUp/OPDRecordDisclosurePopUp';
import OPDPatientMessagePopUp from './FHIROPDPopUp/OPDPatientMessagePopUp';
import OPDViewDiscloserRecord from './FHIROPDPopUp/OPDViewDiscloserRecord';

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
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)

    // let [saveData, setSavedata] = useState()

    const activePatient = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []

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
            {/* <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span>{t("Dental")} </span>

            </div> */}
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#carePlan">{t("Care Plan")} </span>

            </div>
            {/* <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#familyHistory">{t("Family History")} </span>

            </div> */}
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#familyHistoryID">{t("Family History")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#ImmunizationPop">{t("Immunization")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#exampleModalToggle">{t("Record Disclosure")} </span>

            </div>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#Message">{t("Patient Message")} </span>

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
                                    <OPDProblemPopUp setShowToster={setShowToster} />
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
                                    <OPDAllergyPopUp setShowToster={setShowToster} />
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
                                    <OPDMedicationPopUp setShowToster={setShowToster} />
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
                                    <OPDDevicePopUp setShowToster={setShowToster} />
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
                                    <OPDSurgeryPopUp setShowToster={setShowToster} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* --------------------------------------------------------------Surgery PopUp End--------------------------------------------------- */}

            {/* --------------------------------------------------------------Record Disclosure PopUp Begin--------------------------------------------------- */}
            {/* <div className="modal fade" id="disclosure" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Record Disclosure</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent"> */}
            {/* --------------------------Problem Tab Section----------------------------------------------- */}
            {/* <div class="tab-pane fade show active" id="allergy" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    <OPDRecordDisclosurePopUp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> */}
            <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header"><h1 class="modal-title fs-5 text-white " id="staticBackdropLabel">Record Disclosure</h1><button type="button" class="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button></div>
                        <div class="modal-body">
                        <OPDRecordDisclosurePopUp />
                        </div>
                        {/* <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header"><h1 class="modal-title fs-5 text-white " id="staticBackdropLabel">View Disclosure</h1><button type="button" class="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button></div>
                        <div class="modal-body">
                        <OPDViewDiscloserRecord/>
                        </div>
                        {/* <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Edit</button>
                            <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Delete</button>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* --------------------------------------------------------------Record Disclosure PopUp End--------------------------------------------------- */}
            {/* --------------------------------------------------------------Patient Message PopUp Begin--------------------------------------------------- */}
            <div className="modal fade" id="Message" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Patient Message</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="allergy" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    <OPDPatientMessagePopUp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* --------------------------------------------------------------Patient Message PopUp End--------------------------------------------------- */}

            {/* -----------------------------------------------------------------------Start FHIR Family History --------------------------------------------- */}

            <div className="modal fade" id="familyHistoryID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Family History</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="problem" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    {/* <OPDProblemPopUp setShowToster={setShowToster}/> */}
                                    <FHIRFamilyHistoryEdit patientUhid={activePatient} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -----------------------------------------------------------------------End FHIR Family History --------------------------------------------- */}

            {/* -----------------------------------------------------------------------Start Care Plan --------------------------------------------- */}

            <div className="modal fade" id="carePlan" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Care Plan</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="problem" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    {/* <OPDProblemPopUp setShowToster={setShowToster}/> */}
                                    <FHIRCarePlan patientUhid={activePatient} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -----------------------------------------------------------------------End Care Plan --------------------------------------------- */}
            {/* -----------------------------------------------------------------------Start Immunization Plan --------------------------------------------- */}

            <div className="modal fade" id="ImmunizationPop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Immunization</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="problem" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    {/* <OPDProblemPopUp setShowToster={setShowToster}/> */}
                                    <FHIRImmunization patientUhid={activePatient} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -----------------------------------------------------------------------End Immunization Plan --------------------------------------------- */}

            {
                showToster === 1 ?
                    <SuccessToster handle={setShowToster} message="Problem Saved SuccessFully !!" /> : ""
            }
            {
                showToster === 2 ?
                    <SuccessToster handle={setShowToster} message="Allergy Saved SuccessFully !!" /> : ""
            }
            {
                showToster === 3 ?
                    <SuccessToster handle={setShowToster} message="Medication Saved SuccessFully !!" /> : ""
            }
            {
                showToster === 4 ?
                    <SuccessToster handle={setShowToster} message="Device Saved SuccessFully !!" /> : ""
            }
            {
                showToster === 5 ?
                    <SuccessToster handle={setShowToster} message="Surgery Saved SuccessFully !!" /> : ""
            }

            {
                showAlertToster === 1 ?
                    <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
            }
            {
                showAlertToster === 2 ?
                    <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
            }
            {
                showAlertToster === 3 ?
                    <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
            }
            {
                showAlertToster === 4 ?
                    <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
            }
            {
                showAlertToster === 5 ?
                    <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
            }
        </>
    )
}
