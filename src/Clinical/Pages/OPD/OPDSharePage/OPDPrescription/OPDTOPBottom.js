import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AlertToster from "../../../../../Component/AlertToster";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
// import OPDProblemPopUp from "./FHIROPDPopUp/OPDProblemPopUp";
// import OPDAllergyPopUp from "./FHIROPDPopUp/OPDAllergyPopUp";
// import OPDMedicationPopUp from "./FHIROPDPopUp/OPDMedicationPopUp";
// import OPDDevicePopUp from "./FHIROPDPopUp/OPDDevicePopUp";
import SuccessToster from "../../../../../Component/SuccessToster";
import OPDSurgeryPopUp from "./FHIROPDPopUp/OPDSurgeryPopUp";
import FHIRFamilyHistoryEdit from "../../../../../EditCredentional/Pages/FHIRFamilyHistoryEdit";
import FHIRCarePlan from "../../../../../FHIRCarePlan/Pages/FHIRCarePlan";
import FHIRImmunization from "../../../../../FHIRImmunization/Pages/FHIRImmunization";
import OPDRecordDisclosurePopUp from "./FHIROPDPopUp/OPDRecordDisclosurePopUp";
import OPDPatientMessagePopUp from "./FHIROPDPopUp/OPDPatientMessagePopUp";
// import OPDViewDiscloserRecord from "./FHIROPDPopUp/OPDViewDiscloserRecord";
import FHIRAddPrescription from "../../../../../FHIRPrescription/Pages/FHIRAddPrescription";
// import FHIRPrescreptionList from "../../../../../FHIRPrescription/Pages/FHIRPrescreptionList";
import OPDLifeStyle from "./FHIROPDPopUp/OPDLifeStyle";
// import OPDPrescriptionIndex from "./OPDPrescriptionIndex";
import FHIRClinicalNotes from "./FHIROPDPopUp/FHIRClinicalNotes";
import ClinicalInstructions from "../../../../../FHIIRClinicalInstruction/Pages/ClinicalInstructions";
import FunctionalAndCognitive from "../../../../../FHIRFunctionalAndCognitive/Pages/FunctionalAndCognitive";
import FHIRObservation from "../../../../../FHIRObservation/Pages/FHIRObservation";

export default function OPDTOPBottom(props) {
  document.body.dir = i18n.dir();
  const { t } = useTranslation();
  // let [activeBox, setActiveBox] = useState();
  // let [showPhysicalExamination, setShowPhysicalExamination] = useState()
  // let [showAlergies, setShowAlergies] = useState();
  let [disable, setDisable] = useState(0);
  let [patientCategoryResult, setPatientCategoryResult] = useState([]);
  // let [patientExaminationResult, setPatientExaminationResult] = useState([])
  let [patientHistoryCategoryResultExistance,setPatientHistoryCategoryResultExistance,] = useState([]);
  // let [patientHistoryCategoryResult, setPatientHistoryCategoryResult] = useState([])
  let [showDynamicSideBar, setShowDynamicSideBar] = useState(0);
  let [showHistorySideBar, setShowHistoryideBar] = useState(0);
  let [nameDynamicSidebar, setNameDynamicSidebar] = useState("");
  let [categoryId, setCategoryId] = useState("");
  let [categoryType, setCategoryType] = useState(-1);
  // let [activetab, setActivetab] = useState(-1);
  let [message, setMessage] = useState("");
  let [showToster, setShowToster] = useState("");
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showMessage, setShowMessage] = useState(0);
  let [precription, setPrecription] = useState(0);
  let [observation, setObservation] = useState(0);
  let [carePlan, setCarePlan] = useState(0);
  let [immunization, setImmunization] = useState(0);
  let [clinicalPres, setClinicalPres] = useState(0);
  let [functionalAndCog, setFunctionalAndCog] = useState(0);
  let [familyHistory, setFamilyHistory] = useState(0);

  // Active Menu
  let getopdvitalbottom = document.querySelectorAll('.opdvitalbottom');

  let getopdvitalbottomArray = Array.from(getopdvitalbottom);
  getopdvitalbottomArray.forEach((item) => item.addEventListener('click', (e) => {

    getopdvitalbottomArray.forEach((el) => el.classList.remove('active'));

    e.target.parentNode.classList.add('active');
  }));




  // let [saveData, setSavedata] = useState()

  const activePatient = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : [];

  let handleClick = (val, name, id, categoryType) => {
    setNameDynamicSidebar(name);
    setCategoryId(id);
    setCategoryType(categoryType);
    if (categoryType === 1) {
      setShowDynamicSideBar(val);
      setShowHistoryideBar(0);
    } else {
      setShowHistoryideBar(val);
      setShowDynamicSideBar(0);
    }
  };

  let patientsendData = useSelector(
    (state) => state.PatientSendData["patientSendData"]
  );

  useEffect(() => {
    if (props.values === 1 || props.values === 0) {
      setData();
      props.funh(0);
    }
  }, [props.values === 1, props.values === 0]);

  let setData = () => {
    try {
      let temp = window.sessionStorage.getItem("patientsendData")
        ? JSON.parse(window.sessionStorage.getItem("patientsendData"))
        : [];
      // let activeUHID = window.sessionStorage.getItem("activePatient")
      //   ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
      //   : [];
      let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
      temp.map((value, index) => {
        value.map((val, ind) => {
          if (value[0] === activeUHID) {
            let key = Object.keys(val);

            if (key[0] === "patientCategoryResult") {
              setPatientCategoryResult(val.patientCategoryResult);
            }
            // else if (key[0] === "patientExaminationResult") {
            //     setPatientExaminationResult(val.patientExaminationResult)
            // }
            // else if (key[0] === "patientHistoryCategoryResult") {
            //     setPatientHistoryCategoryResult(val.patientHistoryCategoryResult)
            // }
            else if (key[0] === "patientHistoryCategoryResultExistance") {
              setPatientHistoryCategoryResultExistance(
                val.patientHistoryCategoryResultExistance
              );
            } else if (key[0] === "disable") {
              setDisable(val.disable);
            }
          }
        });
      });
    } catch (e) {
      setShowToster(1);
      setMessage(e);
    }
  };

  

  useEffect(() => {
    setData();
  }, [patientsendData]);

  // useEffect(() => {
  //   if(props.toRefreshComponent === true){
  //     setNameDynamicSidebar(""); setShowHistoryideBar(0); setShowDynamicSideBar(0); setPatientHistoryCategoryResultExistance([]); setPatientCategoryResult([]); setDisable(0); 
  //     setCarePlan(0); setObservation(0); setPrecription(0); setShowAlertToster(0) ; setShowToster(""); setMessage(""); setCategoryType(-1); setCategoryId("");
  //     setFamilyHistory(0); setFunctionalAndCog(0); setClinicalPres(0);
  //   }
  // },[props.toRefreshComponent])

  return (
    <>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span onClick={() => { props.setActiveComponent("problemId"); props.setShowTheButton(true); props.setIssueID(1); props.setHeadingName("Problem"); props.setToShowDesiredList(true)}}>
          {t("Problem")}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span onClick={() => { props.setActiveComponent("allergyId"); props.setShowTheButton(true); props.setIssueID(2); props.setHeadingName("Allergy"); props.setToShowDesiredList(true) }}>
          {t("Allergy")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span onClick={() => { props.setActiveComponent("medicationId"); props.setShowTheButton(true); props.setIssueID(3); props.setHeadingName("Medication"); props.setToShowDesiredList(true) }}>
          {t("Medication")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span onClick={() => { props.setActiveComponent("deviceId"); props.setShowTheButton(true); props.setIssueID(4); props.setHeadingName("Device"); props.setToShowDesiredList(true) }}>
          {t("Device")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span onClick={() => { props.setActiveComponent("surgeryId"); props.setShowTheButton(true); props.setIssueID(5); props.setHeadingName("Surgery"); props.setToShowDesiredList(true) }}>
          {t("Surgery")}{" "}
        </span>
      </div>
      {/* <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span>{t("Dental")} </span>

            </div> */}
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#carePlanId" onClick={() => {setCarePlan(1); props.setToShowDesiredList(false)}}>
          {t("Care Plan")}{" "}
        </span>
      </div>
      {/* <div className='opdvitalbottom d-flex gap-1 align-items-center pointer'>
                <span data-bs-toggle="modal" data-bs-target="#familyHistory">{t("Family History")} </span>

            </div> */}
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#familyHistoryID" onClick={() => {setFamilyHistory(1); props.setToShowDesiredList(false)}}>
          {t("Family History")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#ImmunizationPop" onClick={() => {setImmunization(1);props.setToShowDesiredList(false)}}>
          {t("Immunization")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#exampleModalToggle" onClick={() => {props.setToShowDesiredList(false)}}>
          {t("Record Disclosure")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer" onClick={() => {props.setToShowDesiredList(false)}}>
        <span data-bs-toggle="modal" data-bs-target="#Message">
          {t("Patient Message")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#PrescriptionPopList" onClick={() => { setPrecription(1); props.setToShowDesiredList(false)}}>
          {t("Prescription")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#Lifestyle" onClick={() => {props.setToShowDesiredList(false)}}>
          {t("LifeStyle")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#ClinicalNotes" onClick={() => {props.setToShowDesiredList(false)}}>
          {t("Clinical Notes Form")}{" "}</span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#ClinicalInstructions" onClick={() => { setClinicalPres(1); props.setToShowDesiredList(false)}}>
          {t("Clinical Instructions")}{" "}</span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#FunctionalAndCognitive" onClick={() => { setFunctionalAndCog(1); props.setToShowDesiredList(false)}}>
          {t("Functional And Cognitive Status")}{" "}
        </span>
      </div>
      <div className="opdvitalbottom d-flex gap-1 align-items-center pointer">
        <span data-bs-toggle="modal" data-bs-target="#ObservationPopList" onClick={() => { setObservation(1); props.setToShowDesiredList(false)}}>
          {t("Observation")}{" "}
        </span>
      </div>
      {/* --------------------------------------------------------------Problem PopUp Begin--------------------------------------------------- */}

      {/* --------------------------------------------------------------Problem PopUp End--------------------------------------------------- */}

      {/* --------------------------------------------------------------Allergy PopUp Begin--------------------------------------------------- */}
      {/* --------------------------------------------------------------Allergy PopUp End--------------------------------------------------- */}

      {/* --------------------------------------------------------------Medication PopUp Begin--------------------------------------------------- */}
      {/* --------------------------------------------------------------Medication PopUp End--------------------------------------------------- */}

      {/* --------------------------------------------------------------Device PopUp Begin--------------------------------------------------- */}
      {/* --------------------------------------------------------------Device PopUp End--------------------------------------------------- */}

      {/* --------------------------------------------------------------Surgery PopUp Begin--------------------------------------------------- */}
      <div className="modal fade" id="surgery" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Surgery
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content" id="myTabContent">
                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                <div class="tab-pane fade show active" id="allergy" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
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
      <div className="modal fade" id="exampleModalToggle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-white " id="staticBackdropLabel">
                Record Disclosure
              </h1>
              <button type="button" class="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close">
                <i class="fa fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <OPDRecordDisclosurePopUp theEncounterId = {props.theEncounterId}/>
            </div>
            {/* <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button>
                        </div> */}
          </div>
        </div>
      </div>
      {/* <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header"><h1 class="modal-title fs-5 text-white " id="staticBackdropLabel">View Disclosure</h1><button type="button" class="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button></div>
                        <div class="modal-body">
                        <OPDViewDiscloserRecord />
                        </div>
                      
                    </div>
                </div>
            </div> */}
      {/* --------------------------------------------------------------LifeStyle PopUp End--------------------------------------------------- */}

      <div className="modal fade" id="Lifestyle" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" aria-labelledby="staticBackdropLabe2" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable1 modal-xl">
          <div class="modal-content">
            <div class="modal-header"><h1 class="modal-title fs-5 text-white " id="staticBackdropLabel">Lifestyle</h1><button type="button" class="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button></div>
            <div class="modal-body">
              <OPDLifeStyle setShowToster={setShowToster} theEncounterId = {props.theEncounterId}/>
            </div>

          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------LifeStyle PopUp End--------------------------------------------------- */}


      {/* --------------------------------------------------------------Record Disclosure PopUp End--------------------------------------------------- */}
      {/* --------------------------------------------------------------Patient Message PopUp Begin--------------------------------------------------- */}
      <div className="modal fade" id="Message" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Patient Message
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content" id="myTabContent">
                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                {/* <div
                  class="tab-pane fade show active"
                  id="allergy"
                  role="tabpanel"
                  value="1"
                  aria-labelledby="home-tab"
                  tabindex="0"
                > */}
                <OPDPatientMessagePopUp theEncounterId = {props.theEncounterId}/>
                {/* </div> */}
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
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Family History
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setFamilyHistory(0); }}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">

              {/* <OPDProblemPopUp setShowToster={setShowToster}/> */}
              {familyHistory === 1 ? (<FHIRFamilyHistoryEdit setShowToster={setShowToster} setFamilyHistory={setFamilyHistory} theEncounterId = {props.theEncounterId}/>) : ("")}

            </div>
          </div>
        </div>
      </div>
      {/* -----------------------------------------------------------------------End FHIR Family History --------------------------------------------- */}

      {/* -----------------------------------------------------------------------Start Care Plan --------------------------------------------- */}

      <div className="modal fade" id="carePlanId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Care Plan
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setCarePlan(0); }}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content" id="myTabContent">
                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                <div class="tab-pane fade show active" id="careplan" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                  {/* <OPDProblemPopUp setShowToster={setShowToster}/> */}
                  {carePlan === 1 ? (<FHIRCarePlan patientUhid={activePatient} setShowCarePlan={true} setShowToster={setShowToster} setCarePlan = {setCarePlan} theEncounterId = {props.theEncounterId}/>):("")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -----------------------------------------------------------------------End Care Plan --------------------------------------------- */}
      {/* -----------------------------------------------------------------------Start Immunization Plan --------------------------------------------- */}

      <div className="modal fade" id="ImmunizationPop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Immunization
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content" id="myTabContent">
                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                <div class="tab-pane fade show active" id="problem" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                  {/* <OPDProblemPopUp setShowToster={setShowToster}/> */}
                  {immunization === 1 ? (<FHIRImmunization setShowToster={setShowToster} setImmunization = {setImmunization} theEncounterId = {props.theEncounterId}/>) : ("")}
                  {/* <FHIRImmunization setShowToster={setShowToster} theEncounterId = {props.theEncounterId}/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -----------------------------------------------------------------------End Immunization Plan --------------------------------------------- */}

      {/* -----------------------------------------------------------------------Start Prescription Plan --------------------------------------------- */}

      <div class="modal fade" id="PrescriptionPopList" data-backdrop="static">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-white">Add Prescription</h4>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setPrecription(0); }}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div class="container"></div>
            <div class="modal-body">{precription === 1 ? (<FHIRAddPrescription setShowToster={setShowToster} setPrecription={setPrecription} theEncounterId = {props.theEncounterId}/>) : ("")}
            </div>

            {/* <div class="modal-footer">
          <button  data-dismiss="modal" class="btn">Close</button>
          <a href="##" class="btn btn-primary">Save changes</a>
        </div> */}
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------------End Prescription Plan --------------------------------------------- */}
      {/* -----------------------------------------------------------------------Start ClinicalNotes Plan --------------------------------------------- */}


      <div
        className="modal fade"
        id="ClinicalNotes"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabe2"
        aria-hidden="true"
      >
        <div className=" modal-dialog modal-dialog-scrollable modal-xl">
          <div className="modal-content ">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                Clinical Notes Form
              </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div class="tab-content" id="myTabContent">
                <FHIRClinicalNotes />

              </div>
            </div>
          </div>
        </div>
      </div>


      {/* -----------------------------------------------------------------------End ClinicalNotes Plan --------------------------------------------- */}

      {/* -----------------------------------------------------------------------Start Clinical Instructions Plan --------------------------------------------- */}
      <div class="modal fade" id="ClinicalInstructions" data-backdrop="static">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-white">Clinical Instructions</h4>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setClinicalPres(0); }}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div class="container"></div>
            <div class="modal-body">{clinicalPres === 1 ? (<ClinicalInstructions setShowToster={setShowToster} setClinicalPres={setClinicalPres} theEncounterId = {props.theEncounterId}/>) : ("")}
            </div>

            {/* <div class="modal-footer">
          <button  data-dismiss="modal" class="btn">Close</button>
          <a href="##" class="btn btn-primary">Save changes</a>
        </div> */}
          </div>
        </div>
      </div>
      {/* -----------------------------------------------------------------------End Clinical Instructions Plan --------------------------------------------- */}

      {/* -----------------------------------------------------------------------Start Functional Instructions Plan --------------------------------------------- */}
      <div class="modal fade" id="FunctionalAndCognitive" data-backdrop="static">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-white">Functional And Cognitive Status</h4>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setFunctionalAndCog(0); }}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div class="container"></div>
            <div class="modal-body">{functionalAndCog === 1 ? (<FunctionalAndCognitive setShowToster={setShowToster} setFunctionalAndCog={setFunctionalAndCog} />) : ("")}
            </div>

            {/* <div class="modal-footer">
          <button  data-dismiss="modal" class="btn">Close</button>
          <a href="##" class="btn btn-primary">Save changes</a>
        </div> */}
          </div>
        </div>
      </div>
      {/* -----------------------------------------------------------------------End Clinical Instructions Plan --------------------------------------------- */}

      {/* -----------------------------------------------------------------------Start observation Plan --------------------------------------------- */}

      <div class="modal fade" id="ObservationPopList" data-backdrop="static">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-white">Add Observation</h4>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setObservation(0); }}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div class="container"></div>
            <div class="modal-body">{observation === 1 ? (<FHIRObservation setShowToster={setShowToster} setObservation={setObservation} theEncounterId = {props.theEncounterId}/> ) : ("")}
            </div>

            {/* <div class="modal-footer">
          <button  data-dismiss="modal" class="btn">Close</button>
          <a href="##" class="btn btn-primary">Save changes</a>
        </div> */}
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------------End observation Plan --------------------------------------------- */}



      {showToster === 1 ? (<SuccessToster  handle={setShowToster}  message="Problem saved successfully !!"/>) : (  "")}
      {showToster === 2 ? (<SuccessToster  handle={setShowToster}  message="Allergy saved successfully !!"/>) : (  "")}
      {showToster === 3 ? (<SuccessToster  handle={setShowToster}  message="Medication saved successfully !!"/>) : (  "")}
      {showToster === 4 ? (<SuccessToster  handle={setShowToster}  message="Device saved successfully !!"/>) : (  "")}
      {showToster === 5 ? (<SuccessToster  handle={setShowToster}  message="Surgery saved successfully !!"/>) : (  "")}
      {showToster === 6 ? (<SuccessToster  handle={setShowToster}  message="History saved successfully !!"/>) : (  "")}
      {showToster === 7 ? (<SuccessToster  handle={setShowToster}  message="Immunization saved successfully !!"/>) : (  "")}
      {showToster === 8 ? (<SuccessToster  handle={setShowToster}  message="Lifestyle saved successfully !!"/>) : (  "")}
      {showToster === 9 ? (<SuccessToster  handle={setShowToster}  message="Careplan deleted successfully !!"/>) : (  "")}
      {showToster === 10 ? (<SuccessToster  handle={setShowToster}  message="Careplan updated successfully !!"/>) : (  "")}
      {showToster === 22 ? (<SuccessToster  handle={setShowToster}  message="Prescription saved successfully !!"/>) : (  "")}
      {showToster === 23 ? (<SuccessToster  handle={setShowToster}  message="Prescription sent successfully !!"/>) : (  "")}
      {showToster === 24 ? (<SuccessToster  handle={setShowToster}  message="Clinical Instruction saved successfully !!"/>) : (  "")}
      {showToster === 25 ? (<SuccessToster  handle={setShowToster}  message="Clinical Instruction updated successfully !!"/>) : (  "")}
      {showToster === 26 ? (<SuccessToster  handle={setShowToster}  message="Clinical Instruction deleted successfully !!"/>) : (  "")}
      {showToster === 27 ? (<SuccessToster  handle={setShowToster}  message="Functional and Cognitive saved successfully !!"/>) : (  "")}
      {showToster === 28 ? (<SuccessToster  handle={setShowToster}  message="Functional and Cognitive deleted successfully !!"/>) : (  "")}
      {showToster === 29 ? (<SuccessToster  handle={setShowToster}  message="Observation deleted successfully !!"/>) : (  "")}
      {showToster === 30 ? (<SuccessToster  handle={setShowToster}  message="Functional and Cognitive updated successfully !!"/>) : (  "")}
      {showToster === 31 ? (<SuccessToster  handle={setShowToster}  message="Observation saved successfully !!"/>) : (  "")}
      {showToster === 32 ? (<SuccessToster  handle={setShowToster}  message="Observation updated successfully !!"/>) : (  "")}

      {showAlertToster === 1 ? (
        <AlertToster handle={setShowAlertToster} message={showMessage} />) : (  "")}
      {showAlertToster === 2 ? (
        <AlertToster handle={setShowAlertToster} message={showMessage} />) : (  "")}
      {showAlertToster === 3 ? (
        <AlertToster handle={setShowAlertToster} message={showMessage} />) : (  "")}
      {showAlertToster === 4 ? (
        <AlertToster handle={setShowAlertToster} message={showMessage} />) : (  "")}
      {showAlertToster === 5 ? (
        <AlertToster handle={setShowAlertToster} message={showMessage} />) : (  "")}
    </>
  );
}
