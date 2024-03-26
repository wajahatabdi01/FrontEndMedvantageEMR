import React, { useEffect, useState } from "react";
import BoxContainer from "../../Component/BoxContainer";
import Heading from "../../Component/Heading";
import upDownIcon from '../../assets/images/icons/upDownIcon.svg'
import IconVisible from '../../assets/images/icons/IconVisible.svg'
import IconVenti from '../../assets/images/icons/IconVenti.svg'
import IconEdit from '../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../assets/images/icons/IconDelete.svg'
import Loder from "../../Component/Loader";
import TestBoxWithSaerch from "../../Component/TextBoxWithSaerch";
import DropdownWithSearch from "../../Component/DropdownWithSearch";
import TableContainer from '../../Component/TableContainer';
//Icons
import uhidIcon from "../../assets/images/icons/UHID1.svg";
import patientIcon from "../../assets/images/icons/patient.svg"
import ageIcon from "../../assets/images/icons/ageIcon.svg"
import wardIcon from "../../assets/images/icons/ward.svg"
import genderIcon from "../../assets/images/icons/genders.svg"
import surgeryIcon from "../../assets/images/icons/surgery.svg"
import dateIcon from "../../assets/images/icons/date.svg"
import timeIcon from "../../assets/images/icons/time.svg"
import doctorIcon from "../../assets/images/icons/assistance.svg"
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import GetSurgeryList from "../API/GET/GetSurgeryList";
import GetOperationTheaterList from "../API/GET/GetOperationTheaterList";
import GetAnesthesiaList from "../API/GET/GetAnesthesiaList";

import viewBtnIcon from '../../assets/images/icons/viewIcon.svg';


import GetPatientPersonalDashboard from "../../Clinical/API/IPD/PersonalDashboard/GetPatientDetailsForPersonalDashboard";
import GetDevicesList from "../API/GET/GetDevicesList";
import GetAnesthesiologist from "../API/GET/GetAnesthesiologist";
import GetSurgeonList from "../API/GET/GetSurgeonList";
import SaveSurgeryPlan from "../API/POST/SaveSurgeryPlan";
import Toster from '../../Component/Toster';
import { json } from "react-router-dom";
import GetPatientDetailsByUHID from "../API/GET/GetPatientDetailsByUHID";
import ValidationPatientSurgeryPlanned from "../../Validation/OperationTheatre/PatientSurgeryPlanned";
import GetSurgeryPlannedList from "../API/GET/GetSurgeryPlannedList";
import GetDeviceDetails from "../API/GET/GetDeviceDetails";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
import surgery from '../../assets/images/icons/surgery.svg'

export default function PatientSurgeryPlanned() {
  let [showToster, setShowToster] = useState(0);
  let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  let [showLoder, setShowLoder] = useState(0);
  let [surgeryList, setSurgeryList] = useState();
  let [anesthesiaList, setanesthesiaList] = useState([]);
  let [surgeonList, setSurgeonList] = useState([]);
  let [ddlAnesthesiaDoctor, setAnesthesiaDoctorList] = useState([]);
  let [uhid, setUhid] = useState('');
  let [txtPatientName, setTxtPatientName] = useState('');
  let [txtWard, setTxtWard] = useState('');
  let [txtAge, setTxtAge] = useState('');
  let [txtGender, setTxtGender] = useState('');
  let [txtDiagnosisDetails, setTxtDiagnosisDetails] = useState('');
  let [endDate, setEndDate] = useState('');
  let [endTime, setEndTime] = useState('');
  let [operativeNotes, setOperativeNotes] = useState('');

  let [generalInstruction, setGeneralInstruction] = useState('');

  let [techniques, settechniques] = useState('');
  let [qualityNo, setqualityNo] = useState('');
  let [standardiseNo, setstandardiseNo] = useState('');
  let [madeBy, setmadeBy] = useState('');
  let [description, setdescription] = useState('');
  let [ddlOperationTheater, setOTList] = useState([]);
  let [selectOperationTheater, setselectOperationTheater] = useState("");
  let [ddlAnesthesia, setGetAnesthesiaList] = useState([]);
  let [GetAllDevicesLData, setGetDevicesList] = useState([]);
  let [GetDevicesDetailData, setGetDevicesDetailList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  let [selectedsurgeryList, setSelectedsurgeryList] = useState([]);
  let [selectedAnesthesiaList, setSelectedAnesthesiaList] = useState([]);
  let [selectedAnesthesiologist, setSelectedAnesthesiologist] = useState([]);
  let [selectedSurgeon, setselectedSurgeon] = useState([]);
  let [ddlSurgeon, setddlSurgeonList] = useState([]);
  let [rows, setRows] = useState([{ id: 1 }]); // Initial default row
  const [selecteddata, setData] = useState([]);
  let [durationHour, setDurationHour] = useState('');
  let [durationMinute, setDurationMinute] = useState('');
  let [surgeryDate, setSurgeryDate] = useState('');
  let [surgeryTime, setSurgeryTime] = useState('');
  let [surgeryExpectedDate, setSurgeryExpectedDate] = useState('');
  let [surgeryExpectedTime, setSurgeryExpectedTime] = useState('');
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [deviceId, setDeviceId] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [PatientData, setGetPatientData] = useState([]);
  let [SelectedSurgeon, setSelectedSurgeon] = useState([]);
  let [getPatientDetails, setGetPatientDetails] = useState([]);
  let [pmId, setPmId] = useState(null)
  let [rowId, setrowId] = useState('');
  let [clearTextBox, setClearTextBox]  = useState(0)
  const [isdisabled, setisdisabled] = useState(true)
  const {t} = useTranslation();

  let [getSurgeryPlannedList, setGetSurgeryPlannedList] = useState([]);


  let getTextonChange = (vak) => { };

  let getClickValue = (vak) => {
    setDeviceId(vak.id)
    let temp = [...rows]

    temp[temp.length - 1]["device"] = vak.id
   

    setRows([...temp])
  };

  let handleClear = (val) => {
    
    
   
    setClearTextBox(val)
    setUhid('');
    setTxtPatientName('');
    setTxtWard('');
    setTxtAge('');
    setTxtGender('');
    setTxtDiagnosisDetails('');
    setEndDate('');
    setEndTime('');
    setOperativeNotes('');
    setSurgeryExpectedDate('');
    setSurgeryExpectedTime('');
    setGeneralInstruction('');
    setDurationHour('');
    setDurationMinute('');
    setGeneralInstruction('');
    setSurgeryTime('');
    setSurgeryDate('');
    setSelectedsurgeryList([]);
    setSelectedAnesthesiaList([]);
    setSelectedAnesthesiologist([]);
    setselectedSurgeon([]);

    const collectedData = rows.map(row => ({
      device:document.getElementById(`deviceNames_${row.id}`).value = '',
      batchNo: document.getElementById(`batchNo_${row.id}`).value = '',
      techniques: document.getElementById(`techniques_${row.id}`).value = '',
      qualityNo: document.getElementById(`qualityNo_${row.id}`).value = '',
      standardiseNo: document.getElementById(`standardiseNo_${row.id}`).value = '',
      manufacturingDate: document.getElementById(`manufacturingDate_${row.id}`).value = '',
      expiryDate: document.getElementById(`expiryDate_${row.id}`).value = '',
      madeBy: document.getElementById(`madeBy_${row.id}`).value = '',
    }));
    setRows([{ id: 1 }]);


  }

  let handleChange = (e) => {

  
    document.getElementById('errStartDate').style.display = 'none';
    document.getElementById('errStartTime').style.display = 'none';
    document.getElementById('errDuration').style.display = 'none';
    document.getElementById('errOperationTheatre').style.display = 'none';
    document.getElementById('errRqtAnesthesia').style.display = 'none';
    
    if (e.target.name === "Surgery") {
      var slctdSurgery = e.target.value;
     
      var arr = [...selectedsurgeryList];
      // var tempVitalList=[...selectedVitalList];
      for (var i = 0; i < surgeryList.length; i++) {
        if (surgeryList[i].id === slctdSurgery) {
          if (arr.length === 0) {
            arr.push({
              id: slctdSurgery,
              surgeryTitle: surgeryList[i].surgeryTitle
            });
            document.getElementById('errSurgery').style.display = "none";
          
          }
          else {
            var index = arr.findIndex((val) => val.id === slctdSurgery);
            
            if (index !== -1) {
             
              document.getElementById('errSurgery').style.display = "block";
            }
            else {
              arr.push({
                id: slctdSurgery,
                surgeryTitle: surgeryList[i].surgeryTitle
              });
              document.getElementById('errSurgery').style.display = "none";
            }
          }
        
         
          setSelectedsurgeryList(arr);
        }
      }
    }

    if (e.target.name === "Anesthesia") {
      var slctderAnesthesia = e.target.value;
      
      var arr = [...selectedAnesthesiaList];
      // var tempVitalList=[...selectedVitalList];
      for (var i = 0; i < ddlAnesthesia.length; i++) {
        if (ddlAnesthesia[i].id === slctderAnesthesia) {
          if (arr.length === 0) {
            arr.push({
              id: slctderAnesthesia,
              anesthesiaType: ddlAnesthesia[i].anesthesiaType
            });
          }
          else {
            var index = arr.findIndex((val) => val.id === slctderAnesthesia);
            
            if (index !== -1) {
              document.getElementById('errAnesthesia').style.display = "block";
            }
            else {
              arr.push({
                id: slctderAnesthesia,
                anesthesiaType: ddlAnesthesia[i].anesthesiaType
              });
            }
          }
         
          setSelectedAnesthesiaList(arr);
        }
      }
    }

    if (e.target.name === "Anesthesiologist") {
      var slctderAnesthesiologist = e.target.value;
      
      var arr = [...selectedAnesthesiologist];
      // var tempVitalList=[...selectedVitalList];
      for (var i = 0; i < ddlAnesthesiaDoctor.length; i++) {
        if (ddlAnesthesiaDoctor[i].id === slctderAnesthesiologist) {
          if (arr.length === 0) {
            arr.push({
              id: slctderAnesthesiologist,
              name: ddlAnesthesiaDoctor[i].name
            });
          }
          else {
            var index = arr.findIndex((val) => val.id === slctderAnesthesiologist);
           
            if (index !== -1) {
              document.getElementById('errAnesthesiologist').style.display = "block";
            }
            else {
              arr.push({
                id: slctderAnesthesiologist,
                name: ddlAnesthesiaDoctor[i].name
              });
            }
          }
          
          setSelectedAnesthesiologist(arr);
        }
      }
    }

    if (e.target.name === "Surgeon") {
      var slctderSurgeon = e.target.value;
     
      var arr = [...selectedSurgeon];
      // var tempVitalList=[...selectedVitalList];
      for (var i = 0; i < ddlSurgeon.length; i++) {
        if (ddlSurgeon[i].id === slctderSurgeon) {
          if (arr.length === 0) {
            arr.push({
              id: slctderSurgeon,
              name: ddlSurgeon[i].name
            });
          }
          else {
            var index = arr.findIndex((val) => val.id === slctderSurgeon);
           
            if (index !== -1) {
              document.getElementById('errSurgeon').style.display = "block";
            }
            else {
              arr.push({
                id: slctderSurgeon,
                name: ddlSurgeon[i].name
              });
            }
          }
         
          setselectedSurgeon(arr);
        }
      }
    }

    if (e.target.name === "txtUHID") {
      setUhid(e.target.value);
      if (e.target.value.length === 9) {
        GetPatientData(e.target.value);
        GetPatientDetails(e.target.value);
      }
    }

    if (e.target.name === "techniques") {
      settechniques(e.target.value);
    }
    if (e.target.name === "qualityNo") {
      setqualityNo(e.target.value);
    }
    if (e.target.name === "standardiseNo") {
      setstandardiseNo(e.target.value);
    }
    if (e.target.name === "madeBy") {
      setmadeBy(e.target.value);
    }

    if (e.target.name === "operativeNotes") {
      setOperativeNotes(e.target.value);
    }
    // if(e.target.name === "surgeryExpectedDate"){
    //   setSurgeryExpectedDate(e.target.value);
    // }
    // if(e.target.name === "surgeryExpectedTime"){
    //   setSurgeryExpectedTime(e.target.value);
    // }
    if (e.target.name === "generalInstruction") {
      setGeneralInstruction(e.target.value);
    }
    if (e.target.name === "durationHour") {
      setDurationHour(e.target.value);
    }
    if (e.target.name === "durationMinute") {
      setDurationMinute(e.target.value);
    }
    if (e.target.name === "surgeryDate") {
      setSurgeryDate(e.target.value);
      setisdisabled(false)
    }
    if (e.target.name === "surgeryTime") {
      setSurgeryTime(e.target.value);
    }
    if (e.target.name === "setselectOperationTheater") {
      setselectOperationTheater(e.target.value)
    }
  }

  let handleUpdate = () => {

  }

  let deleteRow = () => {

  }
  const handleOptionSelect = (option) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  let getSurgeryList = async () => {
    let data = await GetSurgeryList();
  
    if (data.status === 1) {
      setSurgeryList(data.responseValue);
    }
  }

  let Anesthesiologist = async () => {
    let data = await GetAnesthesiologist();
   
    if (data.status === 1) {
      setAnesthesiaDoctorList(data.responseValue);
    }
  }

  let SurgeonList = async () => {
    let data = await GetSurgeonList();
    
    if (data.status === 1) {
      setddlSurgeonList(data.responseValue);
    }
  }

  let clearToasterOrError = async () => {
    document.getElementById('errddlSurgery').style.display = "none";
  }
  let operationTheaterList = async () => {
    setShowLoder(1);
    let data = await GetOperationTheaterList();
  
    if (data.status === 1) {
      setShowLoder(0);
      setOTList(data.responseValue);
    }

  }
  let GetAnesthesia = async () => {

    let data = await GetAnesthesiaList();
   
    if (data.status === 1) {
      setShowLoder(0);
      setGetAnesthesiaList(data.responseValue);
    }

  }


  let GetSurgeryPlanned = async () => {

    let data = await GetSurgeryPlannedList();
   
    if (data.status === 1) {
      setShowLoder(0);
       setGetSurgeryPlannedList(data.responseValue);
    }

  }

  let GetDevices = async () => {
    let deviceName = 'r';
    let data = await GetDevicesList(deviceName);
 
    if (data.status === 1) {
      setShowLoder(0);
      setGetDevicesList(data.responseValue);
    }

  }




  let GetPatientData = async (uhid) => {
    let UHID = uhid;

    let data = await GetPatientPersonalDashboard(UHID);
    

    // if (data.status === 1) {
      
    //   let responsedaignosis = data.responseValue.patientComplainHistory;

      
    //   // setTxtPatientName(response.patientName);
    //   // setTxtAge(response.age);
    //   // setTxtGender(response.genderName);
    //   // 
    
    //   setShowLoder(0);
    //   setGetPatientData(data.responseValue);
    // }
    
    if (data.status === 1) {
      let responsedaignosis = data.responseValue.patientComplainHistory.filter(item => item.pdmId === 4);
     
    
      // Extract problem names from the filtered array
      const problemNames = responsedaignosis.map(item => item.problemName);
    
    
      // Assuming setTxtDiagnosisDetails expects an array of problem names
      setTxtDiagnosisDetails(problemNames);
    
      setShowLoder(0);
      setGetPatientData(data.responseValue);
    }
  }

  const addRow = () => {
    const newRowId = rows.length + 1; // Generate sequential IDs
    setRows([...rows, { id: newRowId }]);
  };

  const removeRow = (id) => {
    // Ensure that the first row is never removed
    if (id !== 1) {
      setRows(rows.filter(row => row.id !== id));

    }
  };

  const collectData = () => {
    const collectedData = rows.map(row => ({
      deviceID: row.device,
      batchNo: document.getElementById(`batchNo_${row.id}`).value,
      techniques: document.getElementById(`techniques_${row.id}`).value,
      qualityNo: document.getElementById(`qualityNo_${row.id}`).value,
      standardiseNo: document.getElementById(`standardiseNo_${row.id}`).value,
      manufacturingDate: document.getElementById(`manufacturingDate_${row.id}`).value,
      expiryDate: document.getElementById(`expiryDate_${row.id}`).value,
      madeBy: document.getElementById(`madeBy_${row.id}`).value,

    }));

    // Filter out rows with all null/empty values
    const filteredData = collectedData.filter(item => Object.values(item).some(value => value !== null && value !== ''));

    setData(filteredData);
    return filteredData;
   

  };

  let handleSave = async () => {
    let selectData = collectData()
    document.getElementById('errUhid').style.display = 'none';
    const selectedsurgery = selectedsurgeryList.length;
    document.getElementById('errRqtSurgery').style.display = 'none';
    document.getElementById('errStartDate').style.display = 'none';
    document.getElementById('errStartTime').style.display = 'none';
    document.getElementById('errDuration').style.display = 'none';
    document.getElementById('errOperationTheatre').style.display = 'none';
    document.getElementById('errRqtAnesthesia').style.display = 'none';
    const ddlOperationTheater = document.getElementById('ddlOperationTheater').value;
    document.getElementById('errRqtAnesthesiologist').style.display = 'none';
    document.getElementById('errRqtSurgeon').style.display = 'none';
    document.getElementById('errRqtDevice').style.display = 'none';
    const selectedAnesthesia = selectedAnesthesiaList.length;
    const selectedAnesthesiologistlen = selectedAnesthesiologist.length;
    const selectedSurgeonlen = selectedSurgeon.length;
    const pmIderr = pmId;
    const selectedDevicelen = selectData;

    

    const res = ValidationPatientSurgeryPlanned(uhid, surgeryDate, surgeryTime, durationHour, ddlOperationTheater, selectedsurgery, selectedAnesthesia, selectedSurgeonlen, selectedAnesthesiologistlen, pmIderr);
    var id = res[1];
    if (res === true) {
      var obj = {
        UHID: uhid.toString(),
        pmID: pmId,
        userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId,
        startDateTime: surgeryDate + ' ' + surgeryTime,
        endDateTime: surgeryExpectedDate + ' ' + surgeryExpectedTime,
        operativeNotes: operativeNotes,
        generalInstructions: generalInstruction,
        operationTheaterID: selectOperationTheater,
        devicesListJson: JSON.stringify(selectData),
        surgeryIdJson: JSON.stringify(selectedsurgeryList),
        surgeonIdJson: JSON.stringify(selectedSurgeon),
        anaesthesiologistIDJson: JSON.stringify(selectedAnesthesiologist),
        anesthesiaJson: JSON.stringify(selectedAnesthesiaList)
      }
     
      let response = await SaveSurgeryPlan(obj);
      if (response.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Save Successfully!");
        setTimeout(() => {
          handleClear(1);
          GetSurgeryPlanned();
          setShowToster(0);
        }, 2000)

      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(response.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }
    else {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).innerHTML = res[0];
    }
  }

  //Used To Remove Selected Vitals
  let removeSelectedSurgery = (index) => {
    var tempArr = [...selectedsurgeryList]
 
    tempArr.splice(index, 1);
    setSelectedsurgeryList(tempArr)
  }
  let removeSelectedAnesthesia = (index) => {
    var tempArr = [...selectedAnesthesiaList]
    
    tempArr.splice(index, 1);
    setSelectedAnesthesiaList(tempArr)
  }
  let removeselectedAnesthesiologist = (index) => {
    var tempArr = [...selectedAnesthesiologist]

    tempArr.splice(index, 1);
    setSelectedAnesthesiologist(tempArr)
  }
  let removeselectedSurgeon = (index) => {
    var tempArr = [...selectedSurgeon]
  
    tempArr.splice(index, 1);
    setSelectedSurgeon(tempArr)
  }

  const handleDurationChange = (durationHour, durationMinute) => {
    if (surgeryTime != '' || surgeryDate != '') {
      const surgeryDateTime = new Date(surgeryDate + 'T' + surgeryTime);
      const durationInSeconds = durationHour * 60 * 60 + durationMinute * 60;

      const surgeryDateTimeInSeconds = surgeryDateTime.getTime() / 1000;
      const surgeryExpectedDateTimeInSeconds = surgeryDateTimeInSeconds + durationInSeconds;

      const updatedSurgeryDateTime = new Date(surgeryExpectedDateTimeInSeconds * 1000);

      // Adjust date if the time crosses midnight
      if (updatedSurgeryDateTime.getHours() < surgeryDateTime.getHours()) {
        updatedSurgeryDateTime.setDate(updatedSurgeryDateTime.getDate() + 1);
      }

      const expectedHours = updatedSurgeryDateTime.getHours();
      const expectedMinutes = updatedSurgeryDateTime.getMinutes();

      const formattedExpectedHours = expectedHours < 10 ? '0' + expectedHours : expectedHours;
      const formattedExpectedMinutes = expectedMinutes < 10 ? '0' + expectedMinutes : expectedMinutes;

      const updatedSurgeryTime = formattedExpectedHours + ':' + formattedExpectedMinutes;

      setSurgeryDate(surgeryDate); // Keep the surgery date unchanged
      setSurgeryExpectedDate(updatedSurgeryDateTime.toISOString().split('T')[0]); // Set the expected date
      setSurgeryExpectedTime(updatedSurgeryTime); // Set the expected time
    }
  };

  const handleDurationInput = (event) => {
    const inputName = event.target.name;
    const value = event.target.value;
    // if (!isNaN(parseInt(durationHour)) && !isNaN(parseInt(durationMinute))) {
    //   handleDurationChange(durationHour, durationMinute);
    //   setDurationHour(value);
    //   setDurationMinute(value);
    // }

    if (inputName === 'durationHour') {
      setDurationHour(value);
      handleDurationChange(value, durationMinute);
    } else if (inputName === 'durationMinute') {
      handleDurationChange(durationHour, value);
      setDurationMinute(value);
    }

  };

  const handleSurgeryDateChange = (event) => {
    setSurgeryDate(event.target.value);
    setdatetime ();
  };

  const handleSurgeryTimeChange = (event) => {
    setSurgeryTime(event.target.value);
    setdatetime ();
  };

   let setdatetime = () => {
    if(surgeryTime == "" && surgeryDate == ""){
      setisdisabled(true);
    }
    else{
      setisdisabled(false);
    }
  }


  let GetPatientDetails = async (uhid) => {
    let UHID = uhid;
    let data = await GetPatientDetailsByUHID(UHID);

    if (data.status === 1) {
      setShowLoder(0);
      setGetPatientDetails(data.responseValue);
      setPmId(data.responseValue[0].pmid);

      setTxtPatientName(data.responseValue[0].patientName);
      setTxtAge(data.responseValue[0].age);
      setTxtGender(data.responseValue[0].gender);
     
    }
  }

  let viewDevices = (list) => {
  
    setrowId(list.surgeryPlannedID)
  }

  
  let GetDevicesDetail = async (rowId) => {
    let SrowId = rowId;
    let data = await GetDeviceDetails(SrowId);
    
    if (data.status === 1) {
      setShowLoder(0);
      setGetDevicesDetailList(data.responseValue);
    }

  }

  useEffect(() => {
    GetPatientDetails();
    operationTheaterList();
    getSurgeryList();
    GetAnesthesia();
    GetDevices();
    Anesthesiologist();
    SurgeonList();
    GetSurgeryPlanned();
  }, []);
  document.body.dir = i18n.dir();
  return (
    <>
      {/* Yogesh cChnages */}
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="fieldsett-in">
                  <div className="fieldsett">
                    <span className='fieldse'>{t("Patient_Surgery_Planned")}</span>
                    <div className="inner-content">
                      <div className="gridFothItems mt-2">
                        <div className="gridFothItemsItems">
                          <div className="row">
                            <div className="col-md-4 mb-2">
                              <label htmlFor="FullName*" className="form-label"><img src={uhidIcon} className='icnn' alt=""/>{t("Uhid")}<span className="starMandatory">*</span></label>
                              <input type="text" className="form-control form-control-sm" id="txtUHID" name="txtUHID" value={uhid} placeholder={t("UHID")} onChange={handleChange} />
                              <small id='errUhid' className='form-text text-danger' style={{ display: 'none' }}></small>
                            </div>

                            <div className="col-md-8 mb-2">
                              <label htmlFor="FullName*" className="form-label"><img src={patientIcon} className='icnn' alt=""/>{t("Patient_Name")}</label>
                              <input type="text" className="form-control form-control-sm" id="txtPatientName" name="txtPatientName" value={txtPatientName} placeholder={t("Enter_Patient_Name")} onChange={handleChange} disabled />
                            </div>

                            <div className="col-md-6 mb-2"><label htmlFor="txtAge*" className="form-label"><img src={ageIcon} className='icnn' alt=""/>{t("Age")}</label>
                              <input type="text" className="form-control form-control-sm" id="txtAge" name="txtAge" placeholder={t("Age")} value={txtAge} onChange={handleChange} disabled />
                            </div>

                            <div className="col-md-6 mb-2"><label htmlFor="txtGender*" className="form-label"><img src={genderIcon} className='icnn' alt=""/>{t("Gender")}</label>
                              <input type="text" className="form-control form-control-sm" id="txtGender" name="txtGender" placeholder={t("Gender")} value={txtGender} onChange={handleChange} disabled />
                            </div>

                            <div className="col-md-12 mb-2">
                              {/* <label htmlFor="txtDiagnosisDetails" className="form-label">Diagnosis Details</label> */}
                              <textarea className="form-control form-control-sm" id="txtDiagnosisDetails" name="txtDiagnosisDetails" placeholder={t("Diagnosis_Details")}value={txtDiagnosisDetails} onChange={handleChange} style={{ minHeight: '123px' }} disabled> </textarea>
                            </div>
                          </div>

                        </div>

                        <div className="gridFothItemsItems">
                          <div className="row">
                            <div className="col-md-12 mb-2">
                              <div className='deat'>

                                <label htmlFor="Surgery" className="form-label"> <img src={surgery} className='icnn' alt='' />{t("Surgery")}</label>
                                <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedsurgeryList([]) }}></span>
                                {/* <input type="text" className="form-control form-control-sm" id="Vital" name="Vital" placeholder="Enter Vital" /> */}
                                {surgeryList && <DropdownWithSearch defaulNname={t("Select_Surgery")} name="Surgery" list={surgeryList} valueName="id" displayName="surgeryTitle" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlSurgery" />}
                                <small id="errSurgery" className="form-text text-danger" style={{ display: 'none' }}>{t("surgery_Already_Selected")}</small>
                                <div className="addvalue narrt1">
                                  {selectedsurgeryList && selectedsurgeryList.map((val, index) => {
                                    return (
                                      <div className="addvalue-in" >{val.surgeryTitle}<span className="closeadd" onClick={() => { removeSelectedSurgery(index) }}><i className="fa fa-times"></i></span></div>
                                    )
                                  })}

                                </div>
                                <small id='errRqtSurgery' className='form-text text-danger' style={{ display: 'none' }}></small>

                              </div>

                            </div>
                            <div className="col-md-6 mb-2">
                              <label htmlFor="dob" className="form-label"> <img src={dateIcon} className='icnn' alt='' />{t("Start_Date")}</label>
                              <input type="date" className="form-control form-control-sm" id='surgeryDate' name='surgeryDate' value={surgeryDate}  min={new Date().toISOString().split('T')[0]} placeholder="Start Date" onChange={handleSurgeryDateChange} />
                              <small id='errStartDate' className='form-text text-danger' style={{ display: 'none' }}></small>
                            </div>

                            <div className="col-md-6 mb-2">
                              <label htmlFor="dob" className="form-label"><img src={timeIcon} className='icnn' alt=""/>{t("Start_Time")}</label>
                              <input type="time" className="form-control form-control-sm" id='surgeryTime' name='surgeryTime' value={surgeryTime} placeholder={t("Start_Time")} onChange={handleSurgeryTimeChange} />
                              <small id='errStartTime' className='form-text text-danger' style={{ display: 'none' }}></small>

                            </div>
                            <div className="col-md-6 mb-2">
                              <label htmlFor="durationHour" className="form-label"> <img src={timeIcon} className='icnn' alt='' />{t("DURATION")}</label>
                              <input type="number" className="form-control form-control-sm" id='durationHour' name='durationHour' value={durationHour} disabled={isdisabled} placeholder={t("Enter_Hours")} onChange={handleDurationInput} />
                              <small id='errDuration' className='form-text text-danger' style={{ display: 'none' }}></small>

                            </div>

                            <div className="col-md-6 mb-2">
                              <img src="" className='icnn' alt='' /><label htmlFor="durationMinute" className="form-label">&nbsp;</label>
                              <input type="number" className="form-control form-control-sm" id='durationMinute' name='durationMinute' placeholder={t("Enter_Minute")} disabled={isdisabled} value={durationMinute}  onChange={handleDurationInput} />

                            </div>

                            <div className="col-md-6 mb-2">
                              <label htmlFor="dob" className="form-label"><img src={dateIcon} className='icnn' alt=""/>{t("End_Date")}</label>
                              <input type="text" className="form-control form-control-sm" id='surgeryExpectedDate' name='surgeryExpectedDate' value={surgeryExpectedDate} onChange={handleChange} disabled />
                              <small id='errEndDate' className='form-text text-danger' style={{ display: 'none' }}></small>

                            </div>
                            <div className="col-md-6 mb-2">
                              <label htmlFor="dob" className="form-label"><img src={timeIcon} className='icnn' alt=""/>{t("End_Time")}</label>
                              <input type="text" className="form-control form-control-sm" id='surgeryExpectedTime' name='surgeryExpectedTime' value={surgeryExpectedTime} onChange={handleChange} disabled />
                              <small id='errEndTime' className='form-text text-danger' style={{ display: 'none' }}></small>

                            </div>

                            <div className="col-md-12 mb-2">
                              {/* <img src="" className='icnn' alt=''/><label htmlFor="operativeNotes" className="form-label">Operative Notes</label> */}
                              <textarea className="form-control form-control-sm" id="operativeNotes" name="operativeNotes" placeholder={t("Enter_Operative_Notes")} value={operativeNotes} onChange={handleChange} style={{ minHeight: '123px' }}> </textarea>
                            </div>

                          </div>

                        </div>

                        <div className="gridFothItemsItems">
                          <div className="row">


                            <div className="col-md-12 mb-2">
                              <div className='deat'>
                              <img src={doctorIcon} class="icnn" alt=""/>
                                <label htmlFor="Anesthesia" className="form-label">{t("Select_Anesthesia")}</label>
                                <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedAnesthesiaList([]) }}></span>
                                {/* <input type="text" className="form-control form-control-sm" id="Vital" name="Vital" placeholder="Enter Vital" /> */}
                                {ddlAnesthesia && <DropdownWithSearch defaulNname={t("Select_Anesthesia")} name="Anesthesia" list={ddlAnesthesia} valueName="id" displayName="anesthesiaType" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlAnesthesia" />}
                                <small id="errAnesthesia" className="form-text text-danger" style={{ display: 'none' }}>{t("Anesthesia_Already_Selected")}</small>
                                <div className="addvalue narrt1">
                                  {selectedAnesthesiaList && selectedAnesthesiaList.map((val, index) => {
                                    return (
                                      <div className="addvalue-in" >{val.anesthesiaType}<span className="closeadd" onClick={() => { removeSelectedAnesthesia(index) }}><i className="fa fa-times"></i></span></div>
                                    )
                                  })}

                                </div>
                                <small id='errRqtAnesthesia' className='form-text text-danger' style={{ display: 'none' }}></small>

                              </div>
                            </div>


                            <div className="col-md-12 mb-2">
                              <div className='deat'>
                              <img src={doctorIcon} class="icnn" alt=""/>
                                <label htmlFor="Anesthesiologist" className="form-label">{t("Select_Anesthesiologist")}</label>
                                <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedAnesthesiologist([]) }}></span>
                                {/* <input type="text" className="form-control form-control-sm" id="Vital" name="Vital" placeholder="Enter Vital" /> */}
                                {ddlAnesthesiaDoctor && <DropdownWithSearch defaulNname={t("Select_Anesthesiologist")} name="Anesthesiologist" list={ddlAnesthesiaDoctor} valueName="id" displayName="name" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlAnesthesiaDoctor" />}
                                <small id="errAnesthesiologist" className="form-text text-danger" style={{ display: 'none' }}>{t("Anesthesiologist_Already_Selected")}</small>
                                <div className="addvalue narrt1">
                                  {selectedAnesthesiologist && selectedAnesthesiologist.map((val, index) => {
                                    return (
                                      <div className="addvalue-in" >{val.name}<span className="closeadd" onClick={() => { removeselectedAnesthesiologist(index) }}><i className="fa fa-times"></i></span></div>
                                    )
                                  })}

                                </div>
                                <small id='errRqtAnesthesiologist' className='form-text text-danger' style={{ display: 'none' }}></small>

                              </div>
                            </div>
                            <div className="col-md-12 mb-2">
                              <textarea className="form-control form-control-sm" id="generalInstruction" name="generalInstruction" placeholder={t("Enter_General_Instructions")} value={generalInstruction} style={{ minHeight: '84px' }} onChange={handleChange}> </textarea>
                            </div>
                          </div>
                        </div>

                        <div className="gridFothItemsItems">
                          <div className="row">
                            <div className="col-md-12 mb-2">
                              <label htmlFor="ddlOperationTheater" className="form-label"><img src={doctorIcon} className='icnn' alt='' />{t("Operation_Theater")}</label>
                              <select className="form-select form-select-sm" id='ddlOperationTheater' name="setselectOperationTheater" aria-label=".form-select-sm example" onChange={handleChange} value={selectOperationTheater}  >
                                <option value="0">{t("Select_OT")}</option>
                                {
                                  ddlOperationTheater && ddlOperationTheater.map((list, index) => {
                                    return (
                                      <option key={index} value={list.id}>{list.operationTheterName}</option>
                                    )
                                  })
                                }
                              </select>
                              <small id='errOperationTheatre' className='form-text text-danger' style={{ display: 'none' }}></small>

                            </div>


                            {/* <div className="col-md-12 mb-2">
                      <label htmlFor="ddlSurgeon" className="form-label"><img src={doctorIcon} className='icnn' />Surgeon</label>
                        <select className="form-select form-select-sm" id='ddlSurgeon' aria-label=".form-select-sm example">
                          <option value='0'>Select Surgeon</option>
                          {
                            ddlSurgeon && ddlSurgeon.map((list, index) => {
                                return (
                                  <option value={list.id}>{list.name}</option>
                                )
                            })
                            }
                        </select>
                      </div> */}

                            <div className="col-md-12 mb-2">
                              <div className='deat'>
                              <img src={doctorIcon} class="icnn" alt=""/>
                                <label htmlFor="Surgeon" className="form-label">{t("Select_Surgeon")}</label>
                                <span className='df1' style={{ cursor: 'pointer' }} onClick={() => { setSelectedSurgeon([]) }}></span>
                                {/* <input type="text" className="form-control form-control-sm" id="Vital" name="Vital" placeholder="Enter Vital" /> */}
                                {ddlSurgeon && <DropdownWithSearch defaulNname={t("Select_Surgeon")} name="Surgeon" list={ddlSurgeon} valueName="id" displayName="name" getvalue={handleChange} editdata={0} clear={0} clearFun={""} id="ddlSurgeon" />}
                                <small id="errSurgeon" className="form-text text-danger" style={{ display: 'none' }}>{t("Surgeon_Already_Selected")}</small>
                                <div className="addvalue narrt1">
                                  {selectedSurgeon && selectedSurgeon.map((val, index) => {
                                    return (
                                      <div className="addvalue-in" >{val.name}<span className="closeadd" onClick={() => { removeselectedSurgeon(index) }}><i className="fa fa-times"></i></span></div>
                                    )
                                  })}

                                </div>
                                <small id='errRqtSurgeon' className='form-text text-danger' style={{ display: 'none' }}></small>

                              </div>
                            </div>

                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="fieldsett-in">
                  <div className="fieldsett">
                    <span className='fieldse'>{t("Implantable_Devices")}</span>
                    <div className="inner-content">



                      <div className='row mt-3'>
                        <div className='col-md-12'>

                          <div style={{ minHeight: '50px', overflow: 'auto' }}>
                            <table className='med-table border_ striped billingTable'>
                              <thead>
                                <tr>
                                  <th className='text-center'>#</th>
                                  <th>{t("Device_Name")}</th>
                                  <th>{t("Batch_No")}</th>
                                  <th>{t("Techniques")}</th>
                                  <th>{t("Quality_No")}</th>
                                  <th>{t("Standardise_No")}</th>
                                  <th>{t("Manufacturing_Date")}</th>
                                  <th>{t("Expiry_Date")}</th>
                                  <th>{t("Made_By")}</th>
                                  <th>{t("Status")}</th>
                                </tr>
                              </thead>
                              <tbody>

                                {rows.map((row, index) => (
                                  <tr key={row.id}>

                                    <td className='text-center'>{row.id}</td>

                                    <td>
                                      {/* <input type="text" className="form-control form-control-sm" id={`deviceNames_${row.id}`} name={`deviceNames_${row.id}`} placeholder="Device Names" /> */}
                                      {GetAllDevicesLData && <TestBoxWithSaerch getTextOnchange={GetDevices} searchParameter="term" list={GetAllDevicesLData} displayName="term" placeholder="Device Names" getClickValue={getClickValue} id={`deviceNames_${row.id}`} clear={clearTextBox} clearFun={handleClear}/>}
                                      {/* {GetAllDevicesLData && <DropdownWithSearch defaulNname="Search Devices" name={`deviceNames_${row.id}`} id={`deviceNames_${row.id}`}  getClickValue={getClickValue} getvalue={handleChange} list={GetAllDevicesLData} valueName="id" displayName="term"
editdata={""} clear={""} clearFun={""} />}  */}
                                    </td>
                                    <td><input type="text" className="form-control form-control-sm" id={`batchNo_${row.id}`} name={`batchNo_${row.id}`} placeholder={t("enter_batch_nomber")} /></td>
                                    <td><input type="text" className="form-control form-control-sm" id={`techniques_${row.id}`} name={`techniques_${row.id}`} placeholder={t("Enter_Techniques")} /></td>
                                    <td><input type="text" className="form-control form-control-sm" id={`qualityNo_${row.id}`} name={`qualityNo_${row.id}`} placeholder={t("Enter_Quality_No")} /></td>
                                    <td><input type="text" className="form-control form-control-sm" id={`standardiseNo_${row.id}`} name={`standardiseNo_${row.id}`} placeholder={t("Enter_Standardise_No")} /></td>
                                    <td><input type="date" className="form-control form-control-sm" id={`manufacturingDate_${row.id}`} name={`manufacturingDate_${row.id}`} max={new Date().toISOString().split('T')[0]}  placeholder={t("Enter_Manufacturing_Date")} /></td>
                                    <td><input type="date" className="form-control form-control-sm" id={`expiryDate_${row.id}`} name={`expiryDate_${row.id}`}  min={new Date().toISOString().split('T')[0]} placeholder="Enter Expiry Date" /></td>
                                    <td><input type="text" className="form-control form-control-sm" id={`madeBy_${row.id}`} name={`madeBy_${row.id}`} placeholder={t("Enter_Made_By")} /></td>
                                    <td>
                                      <div className='action-button'>
                                        <div className='action-button' onClick={() => { addRow(); }}> <i class="bi bi-plus-square"></i></div>
                                        <div className='action-button' onClick={() => removeRow(row.id)}> <i class="bi bi-dash-square"></i></div>
                                      </div>
                                    </td>
                                    <small id='errRqtDevice' className='form-text text-danger' style={{ display: 'none' }}></small>

                                  </tr>

                                ))}

                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="row">
                          {/* <div className="col-md-10 mb-2">
                       <img src="" className='icnn' alt=''/><label htmlFor="description" className="form-label">Description</label> 
                      <textarea class="form-control form-control-sm" id="description" name="description" placeholder="Enter Description " value={description} onChange={handleChange} style={{minHeight:'40px'}}> </textarea>                      
                      </div> */}
                          <div className="col-md-12 mt-4">
                            <div className="d-flex flex-wrap justify-content-end">
                              {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                  :
                                  <div>
                                    {isUpdateBtnShow !== true ? <>

                                      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => { handleSave(); }} ><img src={saveBtnIcon} className='icnn' alt='' /> {t("Save")}</button>
                                      <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearBtnIcon} className='icnn' alt='' /> {t("Clear")}</button>

                                    </> :
                                      <>
                                      </>
                                    }
                                  </div>
                              }
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

          <div className="col-12 mt-2">

            <div className="med-box">

              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <label className="labelPageIndex" >{t("Showing")} <span className="pageIndex">1-3 </span> of  <span className="pageIndex">21</span> {t("Entries")}</label>
                </div>
                <div className='listdetailsct-in'>
                  <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder={t("Search")} />
                      <i className="fa fa-search"></i>
                    </form>
                  </div>
                </div>
              </div>


              <div className="med-table-section" style={{ "height": "445px" }}>
              <TableContainer>
                <table className='med-table border_ striped'>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Uhid")} <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>{t("Patient_Name")} <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>{t("Surgery")} <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>{t("Anesthesiologist")} <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>{t("Surgeon")} <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>{t("O.T")} <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>{t("Start_Time/Date")}<img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>{t("End_Time/Date")}<img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th>{t("Is_Postponed")} <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

               
                  <tbody>
                    {getSurgeryPlannedList && getSurgeryPlannedList.map((list, index) => {
                     
                      return (
                        <tr>
                          <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>
                          
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.uhid}</span></td>

                          <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.patientName}</span><br /><span style={{ color: '#858585', fontSize: '13px' }}>{list.patientgender}</span> / <span style={{ color: '#858585', fontSize: '13px' }}>{list.patientAge}</span><br /></td>
                          
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{JSON.parse(list.surgeryID).map((val) => {return(val.surgeryName +  ' , '  )})}</span></td>
                          
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>
                          {list && list.anesthesiologistList.map((val)=>{
                            return(
                              <>
                              {val.name} ,
                            </>
                            
                            )
                          })}
                          </span></td>

                          <td><span style={{ color: '#858585', fontSize: '13px' }}>
                          {list && list.surgeonList.map((val)=>{
                            return(
                              <>
                              {val.name} ,
                            </>
                            
                            )
                          })}
                          </span></td>

                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.operationTheterName}</span></td>

                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.startDateTime}</span></td>

                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.endDateTime}</span></td>

                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.isPostponed}</span></td>

                          <td>
                              <div className="action-button">
                                  {/* <div data-bs-toggle="tooltip" data-bs-title="View Row" data-bs-placement="bottom"><img src={viewBtnIcon} className='' alt='' onClick={() => { edit(list) }}/></div> */}
                                  <div data-bs-toggle="modal"  data-bs-target="#IssueModal" data-bs-title="Edit Row" data-bs-placement="bottom" onClick={() => {GetDevicesDetail(list.surgeryPlannedID); viewDevices(list);}}><i className="fa fa-camera-retro actioncam"></i></div>

                              </div>
                          </td>
                        </tr>
                      )
                    })}



                  </tbody>
                </table>
                </TableContainer>
              </div>



              <div className="pagginationSection">
                <div className="paginationItemContainer">
                  <div className="d-flex gap-2 align-items-center">
                    <span className="spanText" style={{ minWidth: '125px' }}>{t("THE_PAGE_YOU_ARE_ON")}</span>
                    <select name="" id="" className="form-select form-select-sm pagginationDrp">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="d-flex gap-2 align-items-center"> <span className="spanText">{t("PREVIOUS")}</span> <i className="bi bi-arrow-left"></i> <i className="bi bi-arrow-right"></i> <span className="spanText">Next</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* -----------------------Start Delete Modal Popup-------------------    */}

        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modalDelete">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                <button type="button" className="btn-delete popBtnDelete" onClick={deleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loder val={showLoder} /> : ""
        }

      </section>
      <div className="modal fade" id="IssueModal" data-bs-backdrop="static">

<div className="modal-dialog modal-xl">

  <div className="modal-content p-0">

    <div className="modal-header">

      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">{t("Implantable_Devices_List")}</h1>

      <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window">

        <i className="bi bi-x-octagon"></i>

      </button>

    </div>

    <div className="modal-body p-0">

      <div className="row">

        <div className="col-12">

          <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">

         

            <div className='row'>

            <div className="col-md-12 mb-2">
            <div className="med-table-section" style={{ "height": "50vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Device_Name")}</th>
                      <th>{t("Batch_No")}</th>
                      <th>{t("Techniques")}</th>
                      <th>{t("Quality_No")}</th>
                      <th>{t("Standardise_No")}</th>
                      <th>{t("Manufacturing_Date")} </th>
                      <th>{t("Expiry_Date")} </th>
                      <th>{t("Made_By")}</th>
                    
                    </tr>
                  </thead>

                  <tbody>
                  {GetDevicesDetailData && GetDevicesDetailData.map((list, index) => {
                      return (
                        <tr>
                          <td className='' style={{paddingLeft:'7px',fontSize: '13px'}}>{index + 1}</td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.deviveName}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.batchNo}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.techniques}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.qualityNo}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.standardiseNo}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.manufacturingDate}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.expiryDate}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.madeBy}</span></td>
                        
                        </tr>
                      )
                    })}

                  </tbody>
                </TableContainer>
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
    </>
  )
}