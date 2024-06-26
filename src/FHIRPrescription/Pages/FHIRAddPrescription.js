
import React, { useEffect, useState } from "react";
import plus from "../../assets/images/icons/icons8-plus-30.png";
import DropdownWithSearch from "../../Component/DropdownWithSearch";
import GetBrandList from "../../Clinical/API/KnowMedsAPI/GetBrandList";
import GetUserListByRoleId from "../../Registartion/API/GET/GetUserListByRoleId";
import FHIRGetAllForm from "../API/GET/FHIRGetAllForm";
import GetAllRoute from "../API/GET/GetAllRoute";
import GetAllInterval from "../API/GET/GetAllInterval";
import FHIRPostAddPrescreption from "../API/POST/FHIRPostAddPrescreption";
import clear from "../../assets/images/icons/clear.svg";
import FHIRGetAllPrescriptionListByUHID from "../API/GET/FHIRGetAllPrescriptionListByUHID";
import deleteIcon from "../../assets/images/icons/icons8-delete-30.png";
import editIcon from "../../assets/images/icons/icons8-pencil-30.png";
import FHIRDeletePrescriptionList from "../API/DELETE/FHIRDeletePrescriptionList";
import FHIRPutPrescription from "../API/PUT/FHIRPutPrescription";

import sendIcon from '../../assets/images/icons/icons8-send-48.png'
import InsertPrescriptionNotification from "../../Pharmacy/NotificationAPI/InsertPrescriptionNotification";
import GetCarePlanByUhid from "../../FHIRCarePlan/API/GetCarePlanByUhid";
import GetMedicalHistory from "../../PatientMonitorDashboard/Components/History/Api/GetMedicalHistory";
import GetMedicationAllergyStatus from "../API/GET/GetMedicationAllergyStatus";
import GetAllRefills from "../API/GET/GetAllRefills";
import SuccessToster from "../../Component/SuccessToster";
import FHIRGetAllUnit from "../API/GET/FHIRGetAllUnit";

export default function FHIRAddPrescription({ setPrecription, theEncounterId , setPatientType}) {
  console.log('setPatientType : ', setPatientType)
  const [brandList, setBrandList] = useState([]);
  const [clearDropdown, setClearDropdown] = useState(0);
  const [editName, setEditName] = useState("");
  let [showToster, setShowToster] = useState(0)
  const [providerList, setProviderList] = useState([]);
  const [getFormList, setFormList] = useState([]);
  const [getIntervalList, setIntervalList] = useState([]);
  const [getRouteList, setRouteList] = useState([]);
  const [sendForm, setSendForm] = useState({
    userId: window.userId, clientId: window.clientId, currentlyActive: 1, ePrescription: false, checkedDrug: false, ControlledSubstance: false, startingdate: "", providerName: 0, exampleRadios: 0, QuantityName: "", medicineStrength: "", medicineUnit: 0, RefillsUnit: 0, oftabletsName: "", DirectionsName: "", formName: 0, routeName: 0, FrequencyName: 0, Notes: "", addToList: 0, ReasonName: 0,
  });
  const [prescreptionList, setPrescreptionList] = useState([]);

  const [theRowId, setTheRowId] = useState("");
  const [showUpdate, setShowUpdate] = useState(0);
  const [showSave, setShowSave] = useState(1);
  const [getMedName, setMedName] = useState('');
  const [getUnit, setUnit] = useState([]);
  const [isShowDeletePopUp, setIsShowDeletePopUp] = useState(0);

  const [getRefillsList, setRefillsList] = useState([])
  let [showTosterMessage, setShowTosterMessage] = useState("");


  //const [editBrand, setEditBrand] = useState("")

  // const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  // const userId=JSON.parse(sessionStorage.getItem("LoginData")).userId;
  const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const userId = JSON.parse(sessionStorage.getItem("LoginData")).userId;
  let activeUHID = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : [];


  const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
    JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];

  const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
    JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
  
      // Adding leading zero if month/day is less than 10
      if (month < 10) {
          month = '0' + month;
      }
      if (day < 10) {
          day = '0' + day;
      }
  
      return `${year}-${month}-${day}`;
  }

  const funGetAllList = async () => {

    const listRes = await FHIRGetAllPrescriptionListByUHID(
      activeUHID,
      clientID, theEncounterId
    );
    if (listRes.status === 1) {

      setPrescreptionList(listRes.responseValue);
    }
    else{
      setPrescreptionList([])
    }
  };

  const handleDelete = async () => {
    const deleteRes = await FHIRDeletePrescriptionList(theRowId);
    if (deleteRes.status === 1) {
      funGetAllList();
      setShowToster(9);
        setTimeout(() => {
          setShowToster(9)
        }, 2000);
        
        setIsShowDeletePopUp(0)
    }
  };

    const handleOpenDeletePopUp = (rowId) => {
    setTheRowId(rowId);
    setIsShowDeletePopUp(1);}

    const handleCloseDeletePopUp = () => {
      setIsShowDeletePopUp(0);
      setTheRowId(0)
    }

  const getAllBrandList = async () => {

    const response = await GetBrandList();
    if (response.status === 1) {
      const slicedProblemList = response.responseValue.slice(0, 100);
      setBrandList(slicedProblemList);
    }
  };

  const getAllRerfillsList = async () => {
    const response = await GetAllRefills();
    if (response.status === 1) {
      setRefillsList(response.responseValue)
    }
  }
  const getProviderList = async () => {
    const dataToProvider = {
      roleId: 2,
      clientID: clientID,
    };
    const providerRes = await GetUserListByRoleId(dataToProvider);
    if (providerRes.status === 1) {
      setProviderList(providerRes.responseValue);
    }
  };

  const getAllFromList = async () => {
    const formRes = await FHIRGetAllForm();

    setFormList(formRes.responseValue);
  };

  const getAllRouteList = async () => {
    const routeRes = await GetAllRoute();
    if (routeRes.status === 1) {
      setRouteList(routeRes.responseValue);
    }
  };

  const getAllIntervalList = async () => {
    const intervalRes = await GetAllInterval();
    if (intervalRes.status === 1) {
      setIntervalList(intervalRes.responseValue);
    }
    else {
      setIntervalList([])
    }
  };

  const handleChangeText = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox, handle it differently
    if (type === "checkbox") {
      // If the checkbox is checked, set the value to 1, otherwise set it to 0
      const currentlyActive = checked ? 1 : 0;

      setSendForm((prevState) => ({
        ...prevState,
        [name]: currentlyActive,
      }));
    } else if (name === "formName") {
      const selectElement = document.getElementById("formID")
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const selectedValue = selectedOption.value;
      const selectedText = selectedOption.text;

      setSendForm((prevState) => ({
        ...prevState,
        "formName": selectedValue,
        "formText": selectedText
      }));

    } else {
      setSendForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    document.getElementById("errDate").style.display = "none";
  };

  //Handle Change
  const handleChange = async (e) => {

    setMedName(e.target.selectedName)
    let name = e.target.name;
    let value = e.target.value;

    const getAllergy = await GetMedicationAllergyStatus(activeUHID, clientID, value);

    if ((getAllergy.status === 1) && (getAllergy.responseValue[0].allergyStatus === 'True')) {
      document.getElementById("errDrug").style.display = "block";
      window.localStorage.setItem("medName", e.target.selectedName);
    }
    else {
      document.getElementById("errDrug").style.display = "none";
      window.localStorage.setItem("medName", '');
    }
    setEditName("");
    //setEditBrand("")
    // setSendForm(sendForm => ({
    //     ...sendForm,
    //     [name]: value
    // }))
    setSendForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // document.getElementById("errDrug").style.display = "none";
  };

  ////////////// to clear data in medicine search//////////////////
  let handleClearMedicineSearch = (value) => {
    setClearDropdown(value);
    setEditName("");
    //setEditBrand("")
    setSendForm({ userId: window.userId });
    // document.getElementById("wardID").value = 0;
    // document.getElementById("departmentID").value = 0;
    //setUpdateBool(0)
  };

  //////////////////////////////// Final Save /////////////////////////
  const handleSave = async () => {
    if (sendForm.startingdate === "") {
      document.getElementById("errDate").innerHTML = "Please select date.";
      document.getElementById("errDate").style.display = "block";
    } else if (!sendForm.brandList) {
      document.getElementById("errDrug").innerHTML = "Please select drug.";
      document.getElementById("errDrug").style.display = "block";
    } else {
      const filterArr = brandList.filter((arr) => { if (arr.medicineID === sendForm.brandList) { return arr; } });

      const finalObj = {
        uhid: activeUHID,
        currentlyActive: sendForm.currentlyActive,
        startingDate: sendForm.startingdate,
        providerId: sendForm.providerName,
        drugId: sendForm.brandList,
        quantity: sendForm.QuantityName,
        size: sendForm.medicineStrength,
        unit: sendForm.medicineUnit,
        refills: sendForm.RefillsUnit,
        perRefill: sendForm.oftabletsName,
        dosage: sendForm.DirectionsName,
        form: sendForm.formName,
        route: sendForm.routeName,
        interval: sendForm.FrequencyName,
        note: sendForm.Notes,
        medication: sendForm.addToList,
        substitute: sendForm.ReasonName,
        drug:
          filterArr[0].name,
        userId: userId,
        rxnormDrugCode: "1432537",
        clientId: clientID,
        doctorId: activeDocID,
        departmentId: activeDeptID
      };
      if (window.localStorage.getItem("medName")) {

        if (window.confirm(`Patient is allergic to ${getMedName}. Do you wish to continue!`)) {
          const finalSave = await FHIRPostAddPrescreption(finalObj);
          if (finalSave.status === 1) {

            funGetAllList();
            setShowToster(22);
            setTimeout(() => {
              setShowToster(22)
            }, 2000);
            handleClear();
          }
        }

      }
      else {
        const finalSave = await FHIRPostAddPrescreption(finalObj);
        if (finalSave.status === 1) {

          funGetAllList();
          setShowToster(22);
          setTimeout(() => {
            setShowToster(22)
          }, 2000);
          handleClear();
        }
      }
    }
  };

  const handleClear = () => {
    //document.getElementById('currentlyActiveID').value = 1;
    setSendForm({
      userId: window.userId,
      clientId: window.clientId,
      currentlyActive: 1,
      ePrescription: false,
      checkedDrug: false,
      ControlledSubstance: false,
      startingdate: "",
      providerName: 0,
      exampleRadios: 0,
      QuantityName: "",
      medicineStrength: "",
      medicineUnit: 0,
      RefillsUnit: 0,
      oftabletsName: "",
      DirectionsName: "",
      formName: 0,
      routeName: 0,
      FrequencyName: 0,
      Notes: "",
      addToList: 0,
      ReasonName: 0,
    });
  };

  //////////////////////////////To Update the data ////////////////////////////////////////////
  const handleUpdate = (drug, rowId, startDate, providerId, drugId, quantity, size, unit, refills, dosage, form, route, interval, note, perRefill, medication, substitute) => {
    setEditName(drug.split(" ")[0]);
    setTheRowId(rowId);
    setShowUpdate(1);
    setShowSave(0);
    //
    
    const selectElement = document.getElementById("formID")
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    //const selectedValue = selectedOption.value;
    const selectedText = selectedOption.text;

    const startingDate = startDate.substring(0, startDate.indexOf(" "));
    const [day, month, year] = startingDate.split("-");

    // Create a new Date object using the components (Note: Month is 0-indexed in JavaScript)
    const dateConvert = new Date(`${year}-${month}-${day}`);

    // Get the formatted date in YYYY-MM-DD format
    const formattedDate = dateConvert.toISOString().split("T")[0];

    setSendForm((prev) => ({
      ...prev,
      currentlyActive: 1,
      ePrescription: false,
      checkedDrug: false,
      ControlledSubstance: false,
      startingdate: formattedDate,
      providerName: providerId,
      //exampleRadios: drugId, later on change
      QuantityName: quantity,
      medicineStrength: size,
      medicineUnit: unit,
      RefillsUnit: refills,
      oftabletsName: perRefill,
      DirectionsName: dosage,
      formName: form,
      routeName: route,
      FrequencyName: interval,
      Notes: note,
      addToList: medication,
      ReasonName: substitute,
      selectedText: selectedText
    }));
    document.getElementById("formID").value = form;
  };

  const handleUpdateSave = async () => {

    if (sendForm.brandList) {
      var filterArrUpName = brandList.filter((arr) => { if (arr.medicineID === sendForm.brandList) { return arr; } });
      
    }
    else {
      var filterArrUpId = brandList.filter((arr) => { if (arr.name === editName) { return arr; } });
      
    }



    const finalObjUpdate = {
      id: theRowId,
      uhid: activeUHID,
      currentlyActive: sendForm.currentlyActive,
      startingDate: sendForm.startingdate,
      providerId: sendForm.providerName,
      drugId: (filterArrUpId && filterArrUpId.length > 0) ? filterArrUpId[0].medicineID : ((filterArrUpName && filterArrUpName.length > 0) ? filterArrUpName[0].medicineID : null),
      quantity: sendForm.QuantityName,
      size: sendForm.medicineStrength,
      unit: sendForm.medicineUnit,
      refills: sendForm.RefillsUnit,
      perRefill: sendForm.oftabletsName,
      dosage: sendForm.DirectionsName,
      form: sendForm.formName,
      route: sendForm.routeName,
      interval: sendForm.FrequencyName,
      note: sendForm.Notes,
      medication: sendForm.addToList,
      substitute: sendForm.ReasonName,
      drug: `${(filterArrUpName && filterArrUpName.length > 0) ? filterArrUpName[0].name : (filterArrUpId && filterArrUpId.length > 0) ? filterArrUpId[0].name : ''} `,
      userId: userId,
      rxnormDrugCode: "1432537",
      clientId: clientID,
  };
    const updateRes = await FHIRPutPrescription(finalObjUpdate);
    if (updateRes.status === 1) {
      setShowToster(10);
          setTimeout(() => {
            setShowToster(10)
          }, 2000);
          handleClear();
      handleClear(); funGetAllList(); setShowSave(1); setShowUpdate(0)
    }
  };

  const handleSendPrescription = async (list) => {

    sendNotification(list)
  }

  let sendNotification = async (datas) => {
    // let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    //  let patientname = JSON.parse(window.sessionStorage.getItem("IPDpatientList")).filter((val) => val.uhId.toString() === activeUHID.toString())?
    //                     JSON.parse(window.sessionStorage.getItem("IPDpatientList")).filter((val) => val.uhId.toString() === activeUHID.toString()):
    //                     JSON.parse(window.sessionStorage.getItem("patientList")).filter((val) => val.uhId.toString() === activeUHID.toString())
    if (JSON.parse(window.sessionStorage.getItem("IPDpatientList"))) {
      var patientname = JSON.parse(window.sessionStorage.getItem("IPDpatientList")).filter((val) => val.uhId.toString() === activeUHID.toString())
    }
    else if (JSON.parse(window.sessionStorage.getItem("patientList"))) {
      patientname = JSON.parse(window.sessionStorage.getItem("patientList")).filter((val) => val.uhId.toString() === activeUHID.toString())
    }
    let doctorName = JSON.parse(window.sessionStorage.getItem("LoginData")).name
    let data = {
      "userId": window.userId,
      "Uhid": activeUHID,
      "medicineData": datas,
      "patientName": patientname[0].patientName,
      "doctorName": doctorName
    }
    let sendData = {

      "id": 0,
      "notificationTitle": "prescribe medicine",
      "senderId": window.userId,
      // "recieverId": 331,
      "recieverId": 252,
      "prescriptionDetails": JSON.stringify(data),
      "comingFrom": setPatientType === 'IPD'? 'IPD' : 'OPD',
      "status": true,
      // "createdDate": datas.startingDate,
      "isSent": true


      // "notificationTemplateId": 0,
      // "notificationTitle": "prescribe medicine",
      // "senderId": window.userId,
      // "recieverId": 99,
      // "isSent": 0,
      // "responseValue": JSON.stringify(data),
      // "isSystemGenerated": true,
      // "status": true,
      // "methodName": "receivePrescription"
    }


    let response = await InsertPrescriptionNotification(sendData)

    if (response.status === 1) {
      setShowToster(23)
      setTimeout(() => {
        setShowToster(0)
      }, 2000);

    }
  }

  const funGetUnit = async () => {
    const resUnit = await FHIRGetAllUnit();
    if (resUnit.status === 1) {
      setUnit(resUnit.responseValue)
    }
  }


  useEffect(() => {
    getProviderList();
    funGetAllList();

  }, []);
  useEffect(() => {
    getAllBrandList();
    getAllRerfillsList();
    getAllFromList();
    getAllRouteList();
    getAllIntervalList();
    funGetUnit();
  }, [setPrecription]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="med-box">
              <div className="inner-content">
                <div className="row">
                  <div className="fieldsett-in col-md-12">
                    <div className="fieldsett">
                      <div className="fieldse">
                        <span className="fieldse">Prescription</span>
                        <div className="row">
                          <div className=" col-12 row ms-1">
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check">
                              <label htmlFor="Administration" className="form-label">
                                Currently Active
                              </label>
                              <input className="form-check-input" type="checkbox" id="currentlyActiveID" checked={sendForm.currentlyActive === 1 ? true : false} role="switch" name="currentlyActive" value={sendForm.currentlyActive} onChange={handleChangeText} />
                            </div>
                            {/* <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="E-Prescription?" className="form-label">E-Prescription?</label>
                              <input className="form-check-input" type="checkbox" id="ePrescription" name="ePrescription" /> 
                            </div>
                            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="Administration" className="form-label">Checked Drug Formulary?</label>
                              <input className="form-check-input" type="checkbox" id="checkedDrug" name="checkedDrug" /> 
                            </div>
                            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="Administration" className="form-label">Controlled Substance?</label>
                              <input className="form-check-input" type="checkbox" id="ControlledSubstance" name="ControlledSubstance" /> 
                            </div> */}
                          </div>
                          <div className=" col-12 row">
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <label htmlFor="Code" className="form-label">
                                Starting Date
                                <span className="starMandatory">*</span>
                              </label>
                              <input id="startingdateID" type="date" min={getCurrentDate()}  className="form-control form-control-sm" name="startingdate" value={sendForm.startingdate} onChange={handleChangeText} />
                              <small id="errDate" className="form-text text-danger" style={{ display: "none" }}></small>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <label htmlFor="Code" className="form-label">
                                Provider
                              </label>
                              {/* <input  id="providerID" type="text" className="form-control form-control-sm" name="providerName" placeholder= "Enter Provider" value={sendForm.providerName} onChange={handleChangeText} /> */}
                              <select name="providerName" className="form-select form-select-sm" id="providerID" value={sendForm.providerName} onChange={handleChangeText}>
                                <option value="0">--Select Provider--</option>
                                {providerList &&
                                  providerList.map((prList, ind) => {
                                    return (
                                      <option value={prList.id}>
                                        {prList.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <div>
                                <label htmlFor="checkedDrug" className="form-label">
                                  Drug
                                </label>{" "}
                              </div>
                              <div className="d-flex gap-3">
                                <div>
                                  <div className="form-check">
                                    <label className="form-label" for="UseDefault">
                                      Use Default
                                    </label>
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="UseDefault" value={0} onChange={handleChangeText} checked={sendForm.exampleRadios == 0} />
                                  </div>
                                </div>

                                <div>
                                  <div className="form-check">
                                    <label className="form-label" for="UseRxNorm">
                                      Use RxNorm
                                    </label>
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="UseRxNorm" value={1} onChange={handleChangeText} checked={sendForm.exampleRadios == 1} />
                                  </div>
                                </div>

                                <div>
                                  <div className="form-check">
                                    <label className="form-label" for="UseRxCUI">
                                      Use RxCUI
                                    </label>
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="UseRxCUI" value={2} onChange={handleChangeText} checked={sendForm.exampleRadios == 2} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <label htmlFor="Code" className="form-label">
                                Drug Search
                                <span className="starMandatory">*</span>
                              </label>
                              {/* <input  id="DrugSearchID" type="text" className="form-control form-control-sm" name="DrugSearchID" placeholder= "Enter Drug" onClick={''} /> */}
                              {brandList && (
                                <DropdownWithSearch defaulNname="Search Medicine" name="brandList" list={brandList} valueName={"medicineID"} displayName="name" editdata={editName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClearMedicineSearch} />
                              )}
                              <small id="errDrug" className="form-text text-danger" style={{ display: 'none' }}>Allergic to {getMedName}.</small>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <label htmlFor="Code" className="form-label">
                                Quantity
                              </label>
                              <input id="QuantityID" type="text" className="form-control form-control-sm" name="QuantityName" placeholder="Enter Quantity" value={sendForm.QuantityName} onChange={handleChangeText} />
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <label htmlFor="Code" className="form-label">
                                Medicine Strength
                              </label>
                              <input id="medicinestrengthID" type="text" className="form-control form-control-sm" name="medicineStrength" placeholder="Enter Medicine" value={sendForm.medicineStrength} onChange={handleChangeText} />
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <label htmlFor="Code" className="form-label">
                                Medicine Unit
                              </label>
                              <select name="medicineUnit" className="form-select form-select-sm" id="medicineUnitID" value={sendForm.medicineUnit} onChange={handleChangeText}>
                                <option value="0">--Select Unit--</option>
                                {getUnit &&
                                  getUnit.map((unitList, ind) => {
                                    return (
                                      <option value={unitList.id}>
                                        {unitList.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <div className="d-flex gap-2">
                                <div>
                                  <label htmlFor="Code" className="form-label">
                                    Refills
                                  </label>
                                  <select name="RefillsUnit" className="form-select form-select-sm" id="RefillsID" value={sendForm.RefillsUnit} onChange={handleChangeText}>
                                    <option value="0">
                                      --Select Refills--
                                    </option>
                                    {getRefillsList &&
                                      getRefillsList.map((list, ind) => {
                                        return (
                                          <option value={list.id}>
                                            {list.refillsTimes}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                                <div>
                                  <label htmlFor="Code" className="form-label">
                                    of tablets
                                  </label>
                                  <input id="ofTabletsID" type="number" className="form-control form-control-sm" name="oftabletsName" placeholder="Enter Medicine" value={sendForm.oftabletsName} onChange={handleChangeText} />
                                </div>
                              </div>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 mb-2 mt-2">
                              <div className="row">
                                <div className="col">
                                  <div className="d-flex gap-2">
                                    <div>
                                      <label htmlFor="Code" className="form-label">
                                        Directions
                                      </label>
                                      <input id="DirectionsID" type="text" className="form-control form-control-sm" name="DirectionsName" placeholder="Enter Directions" value={sendForm.DirectionsName} onChange={handleChangeText} />
                                    </div>
                                    <div>
                                      <label htmlFor="Code" className="form-label">
                                        Form
                                      </label>

                                      <select name="formName" className="form-select form-select-sm" id="formID" value={sendForm.formName} onChange={handleChangeText}>
                                        <option value="0">
                                          --Select Form--
                                        </option>
                                        {getFormList &&
                                          getFormList.map((list, ind) => {
                                            return (
                                              <option value={list.id}>
                                                {list.name}
                                              </option>
                                            );
                                          })}
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="col">
                                  <div className="d-flex gap-2">
                                    <div>
                                      <label htmlFor="Code" className="form-label">
                                        Route
                                      </label>
                                      <select name="routeName" className="form-select form-select-sm" id="routeID" value={sendForm.routeName} onChange={handleChangeText}>
                                        <option value="0">
                                          --Select Route--
                                        </option>
                                        {getRouteList &&
                                          getRouteList.map((routeList, ind) => {
                                            return (
                                              <option
                                                value={routeList.id}>
                                                {routeList.name}
                                              </option>
                                            );
                                          })}
                                      </select>
                                    </div>
                                    <div>
                                      <label htmlFor="Code" className="form-label">
                                        Frequency
                                      </label>
                                      <select name="FrequencyName" className="form-select form-select-sm" id="FrequencyID" value={sendForm.FrequencyName} onChange={handleChangeText}>
                                        <option value="0">
                                          --Select Frequency--
                                        </option>
                                        {getIntervalList &&
                                          getIntervalList.map(
                                            (intList, ind) => {
                                              return (
                                                <option value={intList.id}>
                                                  {intList.name}
                                                </option>
                                              );
                                            }
                                          )}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 mb-2 mt-2">
                              <label htmlFor="Notes" className="form-label">
                                Notes
                              </label>
                              <textarea id="NotesId" type="text" className="form-control form-control-sm" name="Notes" value={sendForm.Notes} onChange={handleChangeText} />
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <div>
                                <label htmlFor="checkedDrug" className="form-label">
                                  Add to Medication List
                                </label>{" "}
                              </div>
                              <div className="d-flex gap-3">
                                <div>
                                  <div class="form-check">
                                    <label class="form-label" for="UseDefault">
                                      No
                                    </label>
                                    <input class="form-check-input" type="radio" name="addToList" id="No" value={0} onChange={handleChangeText} checked={sendForm.addToList == 0} />
                                  </div>
                                </div>
                                <div>
                                  <div class="form-check">
                                    <label class="form-label" for="UseRxNorm">
                                      Yes
                                    </label>
                                    <input class="form-check-input" type="radio" name="addToList" id="Yes" value={1} onChange={handleChangeText} checked={sendForm.addToList == 1} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2">
                              <label htmlFor="Code" className="form-label">
                                Reason
                              </label>
                              <select name="ReasonName" className="form-select form-select-sm" id="ReasonNameID" value={sendForm.ReasonName} onChange={handleChangeText}>
                                <option value="0">mm/gg</option>
                                <option value="1">mm/CC</option>
                                <option value="2">mm</option>
                              </select>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2">
                              <div className="row align-items-center p-2">
                                <label htmlFor="ObservationCriteria" className="form-label"></label>
                                <div className="d-flex">
                                  <label htmlFor="ObservationCriteria" className="form-label"></label>
                                  {showSave === 1 && <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}>
                                    <img src={plus} className="icnn" alt="" />{" "}
                                    Save
                                  </button>}
                                  {showUpdate === 1 && (
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleUpdateSave}>
                                      <img src={plus} className="icnn" alt="" />
                                      Update
                                    </button>
                                  )}
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1 btnbluehover" onClick={handleClear}>
                                    <img src={clear} className="icnn" alt="" />
                                    Clear
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* //////////////////////////////////// Table ////////////////////////////////////// */}

          <div className="col-12 mt-2">
            <div className="med-table-section" style={{ maxHeight: "40vh", minHeight: '20vh' }}>
              <table className="med-table border striped mt-3">
                <thead style={{ zIndex: "0" }}>
                  <tr>
                    <th className="text-center" style={{ width: "5%" }}>
                      #
                    </th>
                    <th>Drug</th>
                    <th>Route</th>
                    <th>RxNorm</th>
                    <th>Form</th>
                    <th>Created Date</th>
                    <th>Changed Date</th>
                    <th>Dosage</th>
                    <th>Qty.</th>
                    <th>Unit</th>
                    <th>Refills</th>
                    <th>Provider</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {prescreptionList &&
                    prescreptionList.map((list, ind) => {
                      
                      return (
                        <tr>
                          <td className="text-center" style={{ width: "5%" }}>{ind + 1}</td>
                          <td>{list.drug}</td>
                          <td>{list.routeName}</td>
                          <td>{list.rxnormDrugCode}</td>
                          <td>{list.formName}</td>
                          <td>{list.startingDate}</td>
                          <td>{list.startingDate}</td>
                          <td>{list.dosage}</td>
                          <td>{list.quantity}</td>
                          <td>{list.unitName}</td>
                          <td>{list.refills}</td>
                          <td>{list.userName}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm btn-danger-fill mb-1 me-1"
                              onClick={() => { handleOpenDeletePopUp(list.id) }} title="Delete"
                            >
                              <img src={deleteIcon} className="icnn" alt="" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm btn-save-fill mb-1 me-1"
                              onClick={() => {
                                handleUpdate(
                                  list.drug,
                                  list.id,
                                  list.startingDate,
                                  list.providerId,
                                  list.drugId,
                                  list.quantity,
                                  list.size,
                                  list.unit,
                                  list.refillsId,
                                  list.dosage,
                                  list.form,
                                  list.routeId,
                                  list.interval,
                                  list.note,
                                  list.perRefill,
                                  list.medication,
                                  list.substitute
                                );

                              }}
                            >
                              <img src={editIcon} className="icnn" alt="" />
                            </button>
                            <button type="button"
                              className="btn btn-danger btn-sm btn-danger-fill mb-1 me-1" title="Send Prescription"
                              onClick={() => { handleSendPrescription(list); }}
                            ><img src={sendIcon} className="icnn" alt="" /></button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isShowDeletePopUp === 1 ? <div className={`modal d-${isShowDeletePopUp === 1 ? 'block' : 'none'}`} id="deleteModal"  data-bs-backdrop="static">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ position: 'relative', zIndex: '1051' }}>
            <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                <div className='popDeleteTitle mt-3'>Delete?</div>
                <div className='popDeleteContent'>Do you want to delete?</div>
            </div>
            <div className="modal-footer1 text-center">
                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={handleCloseDeletePopUp}>Cancel</button>
                <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
            </div>
        </div>
    </div>
</div>
 : ''}

      {showToster === 22 ? (<SuccessToster handle={setShowToster} message="Prescription saved successfully !!" />) : ("")}
      {showToster === 9 ? (<SuccessToster handle={setShowToster} message="Prescription deleted !!" />) : ("")}
      {showToster === 10 ? (<SuccessToster handle={setShowToster} message="Prescription updated successfully!!" />) : ("")}
      {showToster === 23 ? (<SuccessToster handle={setShowToster} message="Prescription sent successfully!!" />) : ("")}
    </>
  );
}
