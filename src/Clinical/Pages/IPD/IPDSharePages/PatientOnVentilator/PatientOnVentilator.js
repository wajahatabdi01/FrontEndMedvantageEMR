import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
//import Heading from "../../../../../Components/Heading";
//import TableContainer from "../../../../../Components/TableContainer";
import GetPatientDataAPI from "../../../../API/IPD/PatientOnVentilator/GetPatientDataAPI";
import GetMachineModeDataAPI from "../../../../API/IPD/PatientOnVentilator/GetMachineModeDataAPI";
import PostMachineData from "../../../../API/IPD/PatientOnVentilator/PostPatientOnVentilator/PostMachineData";
import PostModeData from "../../../../API/IPD/PatientOnVentilator/PostPatientOnVentilator/PostModeData";
import PutIntubatePatient from "../../../../API/IPD/PatientOnVentilator/PutPatientOnVentilator/PutPatientIntubate";
import Toster from "../../../../../Component/Toster";
import TosterUnderProcess from "../../../../../Component/TosterUnderProcess";
import ValidationVentilatorSaveMachine from '../../../../../Validation/PatientOnVentilatorValidation/ValidationVentilatotSaveMachine'
//import BoxContainer from "../../../../../Components/BoxContainer";
import ValidationVentilatorSaveMode from "../../../../../Validation/PatientOnVentilatorValidation/ValidationVentilatorSaveMode";
//import PostVitalData from "../../../../API/IPD/PatientOnVentilator/PostPatientOnVentilator/PostVitaldata";      
import GetDischargeTypeVenti from "../../../../API/IPD/PatientOnVentilator/GetPatientOnVentilator/GetDischargeTypeVenti";
import PatientSupportImg from "../../../../../assets/images/IPD/pressureSupportNIV.png"
import PatientControlImg from '../../../../../assets/images/IPD/pressureControlNIV.png'
import PatientIntubateImg from '../../../../../assets/images/IPD/intubate.png'
import PutPatientExtubate from "../../../../API/IPD/PatientOnVentilator/PutPatientOnVentilator/PutPatientExtubate";
import PutPatientRemove from "../../../../API/IPD/PatientOnVentilator/PutPatientOnVentilator/PutPatientRemove";
import DeletePatientVenti from "../../../../API/IPD/PatientOnVentilator/DeletePatientOnVentilator/DeletePatientVenti";
import IntubateExtubateRemoveValidation from "../../../../../Validation/PatientOnVentilatorValidation/IntubateExtubateRemoveValidation";
import Navbar from "../../../../../Component/Navbar";
import OffcanvasLogo from "../../../../../assets/images/Navbar/offcanvas-logo.png";
import GetPatientListOnVenti from "../../../../API/IPD/PatientOnVentilator/GetPatientOnVentilator/GetPatientListOnVenti";
import PostVentilatorDetails from "../VentilatorDetails/PostVentilatorDetails";
import Loader from "../../../../../Component/Loader";





export default function PatientOnVentilator() {


  let [machineList, setMachineList] = useState([]);
  let [modeList, setModeList] = useState([]);
  let [uhid, setUhid] = useState("");
  let [pmID, setpmID] = useState("");
  let [rowId, setRowID] = useState('');
  let [patientName, setPatientName] = useState("");
  let [department, setDepartment] = useState('');
  let [removeDate, setRemoveDate] = useState('');
  let [removeTime, setRemoveTime] = useState('');
  let [intubateDate, setIntubateDate] = useState('');
  let [intubateTime, setIntubateTime] = useState('');
  let [extubateDate, setExtubateDate] = useState('');
  let [extubateTime, setExtubateTime] = useState('');
  let [wardName, setWardName] = useState('');
  let [consultantName, setConsultantName] = useState('');
  let [fio2, setFio2] = useState('');
  let [peep, setPeep] = useState('');
  let [patientList, setPatientList] = useState([]);
  let [dischargeList, setDischargeList] = useState([]);
  let [machineDate, setMachineDate] = useState('');
  let [machineTime, setMachineTime] = useState('');
  let [modeDate, setModeDate] = useState('');
  let [modeTime, setModeTime] = useState('')
  let [slctdRowUHID, setSlctdRowUHID] = useState('');
  let [slctdRemoveReason, setSlctdRemoveReason] = useState('');
  // ####################Show Under Process ####################
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [showTosterMode, setShowTosterMode] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  // ##################### Show Under Process Mode #################
  let [showUnderProcessMode, setShowUnderProcessMode] = useState(0);
  let [tosterMessageMode, setTosterMessageMode] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterValueMode, setTosterValueMode] = useState(0);
// ####################### Show Under Process Intubate ################
  let [showUnderProcessIntubate, setShowUnderProcessIntubate] = useState(0);
  let [showTosterIntubate, setShowTosterIntubate] = useState(0);
  let [tosterMessageIntubate, setTosterMessageIntubate] = useState("");
  let [tosterValueIntubate, setTosterValueIntubate] = useState(0);
  // ######################### Show Under Process Extubate ###################
  let [showUnderProcessExtubate, setShowUnderProcessExtubate] = useState(0);
  let [showTosterExtubate, setShowTosterExtubate] = useState(0);
  let [tosterMessageExtubate, setTosterMessageExtubate] = useState("");
  let [tosterValueExtubate, setTosterValueExtubate] = useState(0);
  // ####################### Show Under Process Remove ###################
  let [showUnderProcessRemove, setShowUnderProcessRemove] = useState(0);
  let [showTosterRemove, setShowTosterRemove] = useState(0);
  let [tosterMessageRemove, setTosterMessageRemove] = useState("");
  let [tosterValueRemove, setTosterValueRemove] = useState(0);
  // ####################### Show Under Process Delete ################
  let [showUnderProcessDelete, setShowUnderProcessDelete] = useState(0);
  let [showTosterDelete, setShowTosterDelete] = useState(0);
  let [tosterMessageDelete, setTosterMessageDelete] = useState("");
  let [tosterValueDelete, setTosterValueDelete] = useState(0);
  let [loader, setLoader] = useState(1)

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;

  let getPatientList = async () => {
    let data = await GetPatientListOnVenti();
    if(data.status!==1){
      setLoader(1)
    }
    else{
      setLoader(0)
      setPatientList(data.responseValue.ventiList)
    }
    
    
  }

  let getData = async (value) => {
    let response = await GetPatientDataAPI(value);
    if (response.status === 1) {
      document.getElementById('machineID').value = response.responseValue.patientDetails[0].lifeSupportMachineNameID;
      document.getElementById('modeId').value = response.responseValue.patientDetails[0].lifeSupportModeID;
      setPatientName(response.responseValue.patientDetails[0].patientName);
      setpmID(response.responseValue.patientDetails[0].pmID)
      setDepartment(response.responseValue.patientDetails[0].departmentName);
      setWardName(response.responseValue.patientDetails[0].wardID);
      setConsultantName(response.responseValue.patientDetails[0].consultantName);
      setMachineTime(response.responseValue.patientDetails[0].fromTimeMachine);
      setMachineDate(response.responseValue.patientDetails[0].fromDateMachine);
      setFio2(response.responseValue.patientDetails[0].fio2);
      setPeep(response.responseValue.patientDetails[0].peep);
      setModeDate(response.responseValue.patientDetails[0].fromDateMode);
      setModeTime(response.responseValue.patientDetails[0].fromTimeMode);
      //setPatientData(response.responseValue.patientDetails[0]);
    }

  };


  //Get Machine/Mode data
  let getmachineModedata = async () => {
    let getmachine = await GetMachineModeDataAPI();
    if (getmachine.status === 1) {

      setMachineList(getmachine.responseValue.machine);
      setModeList(getmachine.responseValue.lifeSupportMode);
    }

  }

  let getDischargeList = async () => {
    let disList = await GetDischargeTypeVenti();
    if (disList.status === 1) {
      setDischargeList(disList.responseValue);
    }
  }
  let handleChange = async (e) => {
    if (e.target.name === 'uhid') {
      setUhid(e.target.value);
      getData(e.target.value);
      document.getElementById('errUHID').style.display = 'none';

    }
  };

  let handleMachine = async (e) => {
    if (e.target.name === 'machineDate') {
      setMachineDate(e.target.value);
      document.getElementById('errDate').style.display = 'none';
    }
    else if (e.target.name === 'machineTime') {
      setMachineTime(e.target.value);
      document.getElementById('errTime').style.display = 'none';
    }
  }

  let handleMode = async (e) => {
    if (e.target.name === 'fio2') {
      setFio2(e.target.value);
      document.getElementById('errFio2').style.display = 'none';
    }
    else if (e.target.name === 'peep') {
      setPeep(e.target.value);
      document.getElementById('errPeep').style.display = 'none';
    }
    else if (e.target.name === 'modeDate') {
      setModeDate(e.target.value);
      document.getElementById('errModeDate').style.display = 'none';
    }
    else if (e.target.name === 'modeTime') {
      setModeTime(e.target.value);
      document.getElementById('errModeTime').style.display = 'none';
    }
  }

  let handlePopUp = async (e) => {
    if(e.target.name === 'removeTime')
    {
      setRemoveTime(e.target.value);
      document.getElementById('errTimeIRE').style.display = 'none';
    }
    else if(e.target.name === 'removeDate')
    {
      setRemoveDate(e.target.value);
      document.getElementById('errDateIRE').style.display = 'none';
    }
    else if(e.target.name === 'intubateTime')
    {
      setIntubateTime(e.target.value);
      document.getElementById('errTimeIRE').style.display = 'none';
    }
    else if(e.target.name === 'intubateDate')
    {
      setIntubateDate(e.target.value);
      document.getElementById('errDateIRE').style.display = 'none';
    }
    else if(e.target.name === 'extubateDate')
    {
      setExtubateDate(e.target.value);
      document.getElementById('errDateIRE').style.display = 'none';
    }
    else if(e.target.name === 'extubateTime')
    {
      setExtubateTime(e.target.value);
      document.getElementById('errTimeIRE').style.display = 'none';
    }
  }

  let saveMachine = async () => {
    document.getElementById('errUHID').style.display = 'none';
    document.getElementById('errMachineID').style.display = 'none';
    document.getElementById('errDate').style.display = 'none';
    document.getElementById('errTime').style.display = 'none';
    const machineId = parseInt(document.getElementById('machineID').value);
    const res = ValidationVentilatorSaveMachine(uhid, machineId, machineDate, machineTime);
    var id = res[1];
    if (res === true) {
      setShowUnderProcess(1);
      // let userID=JSON.parse(window.sessionStorage.getItem("LoginData")).userId
      let dataObj =
      {
        UHID: uhid,
        machineDateTime: machineDate + ' ' + machineTime,
        machineID: machineId,
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
      }
      
      let data = await PostMachineData(dataObj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);//0 for save and warning 1 for Error
        setShowToster(1);
        setTosterMessage("Data Saved Successfully!");
        setTimeout(() => {
          setShowToster(0);
          //     getAllDonorList();
        }, 2000)


      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)//0 for save and warning 1 for Error
        setTosterMessage(data.responseValue)
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

  let saveMode = async () => {
    document.getElementById('errFio2').style.display = 'none';
    document.getElementById('errPeep').style.display = 'none';
    document.getElementById('errModeDate').style.display = 'none';
    document.getElementById('errMode').style.display = 'none';
    document.getElementById('errModeTime').style.display = 'none';
    const modeId = parseInt(document.getElementById('modeId').value);
    const resMode = ValidationVentilatorSaveMode(uhid, fio2, peep, modeId, modeDate, modeTime);
    var idM = resMode[1];
    if (resMode === true) {

      setShowUnderProcessMode(1);
      let dataMode = {
        UHID: uhid,
        ventiMode: modeId,
        ventiDateTime: modeDate + ' ' + modeTime,
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,

      }
      let dataVital = {
        //UHID: uhid,
        pmId:pmID,
        userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        pid: 0,
        peep: peep,
        //set_oxyg_conce: fio2,
        fiO2: fio2,
        isFromMachine: false,
        ventiMode: 0,
        ClientId:clientID

      }
      let dataModeObj = await PostModeData(dataMode);
      //let dataVitalObj = await PostVitalData(dataVital);
      let dataVitalObj = await PostVentilatorDetails(dataVital);

      if (dataModeObj.status === 1 && dataVitalObj.status === 1) {
        setShowUnderProcessMode(0);
        setTosterValueMode(0);//0 for save and warning 1 for Error
        setShowTosterMode(1);
        setTosterMessageMode("Data Saved Successfully!");
        setTimeout(() => {
          setShowTosterMode(0);
          //     getAllDonorList();
        }, 2000)
      }
      else if (dataModeObj.status !== 1) {
        setShowUnderProcessMode(0)
        setShowTosterMode(1)//0 for save and warning 1 for Error
        setTosterMessageMode(dataModeObj.responseValue)
        setTosterValueMode(1)
        setTimeout(() => {
          setShowTosterMode(0)
        }, 2000)
      }
      else {
        setShowUnderProcessMode(0)
        setShowTosterMode(1)//0 for save and warning 1 for Error
        setTosterMessageMode(dataVitalObj.responseValue)
        setTosterValueMode(1)
        setTimeout(() => {
          setShowTosterMode(0)
        }, 2000)
      }
    }
    else {
      document.getElementById(idM).style.display = 'block';
      document.getElementById(idM).innerHTML = resMode[0];
    }
  }

  let intubatePatient = async () => {
    let intubateData = {
      id: rowId,
      UHID: slctdRowUHID,
      intubateDateTime: intubateDate +' '+ intubateTime,
      userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
    }
    const validationIntubate = IntubateExtubateRemoveValidation(intubateDate,intubateTime)
    var idI = validationIntubate[1]
    if(validationIntubate === true) {
      setShowUnderProcessIntubate(1);
    let updateIntubate = await PutIntubatePatient(intubateData);
    if(updateIntubate.status === 1)
    {
      setShowUnderProcessIntubate(0);
        setTosterValueIntubate(0);//0 for save and warning 1 for Error
        setShowTosterIntubate(1);
        setTosterMessageIntubate("Data Saved Successfully!");
        setTimeout(() => {
          setShowTosterIntubate(0);
          //     getAllDonorList();
          getPatientList();
        }, 2000)
    }
    else {
      setShowUnderProcessIntubate(0)
      setShowTosterIntubate(1)//0 for save and warning 1 for Error
      setTosterMessageIntubate(updateIntubate.responseValue)
      setShowTosterIntubate(1)
      setTimeout(() => {
        setShowTosterIntubate(0)
      }, 2000)
    }
  }
  else{
    document.getElementById(idI).style.display = 'block';
      document.getElementById(idI).innerHTML = validationIntubate[0];
  }
  }

  let extubatePatient = async () => {
    let extubateData = {
      id: rowId,
      UHID: slctdRowUHID,
      extubateDateTime: extubateDate +' '+ extubateTime,
      userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,

    }
    
    const validateExtubate = IntubateExtubateRemoveValidation(extubateDate, extubateTime);
    var idE = validateExtubate[1];
    if(validateExtubate === true) {
      setShowUnderProcessExtubate(1);
  
    let dataExtubate = await PutPatientExtubate(extubateData);
    if(dataExtubate.status === 1)
    {
      setShowUnderProcessExtubate(0);
        setTosterValueExtubate(0);//0 for save and warning 1 for Error
        setShowTosterExtubate(1);
        setTosterMessageExtubate("Data Saved Successfully!");
        setTimeout(() => {
          setShowTosterExtubate(0);
          //     getAllDonorList();
          getPatientList();
        }, 2000)
    }
    else {
      setShowUnderProcessExtubate(0)
      setShowTosterExtubate(1)//0 for save and warning 1 for Error
      setTosterMessageExtubate(dataExtubate.responseValue)
      setShowTosterExtubate(1)
      setTimeout(() => {
        setShowTosterExtubate(0)
      }, 2000)
  }
  }
  else {
    document.getElementById(idE).style.display = 'block';
      document.getElementById(idE).innerHTML = validateExtubate[0];
  }
}

  let removePatient = async () => {
    let removeData = {
      id: rowId,
      UHID: slctdRowUHID,
      removeDateTime : removeDate +' '+ removeTime,
      removeReason : slctdRemoveReason,
      userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
    }
    let removeValidate = IntubateExtubateRemoveValidation(removeDate,removeTime);
    var idR = removeValidate[1];
    if(removeValidate === true)
    {
      setShowUnderProcessRemove(1);
    
    let dataRemove = await PutPatientRemove(removeData);
    if(dataRemove.status === 1)
    {
      setShowUnderProcessRemove(0);
        setTosterValueRemove(0);//0 for save and warning 1 for Error
        setShowTosterRemove(1);
        setTosterMessageRemove("Data Saved Successfully!");
        setTimeout(() => {
          setShowTosterRemove(0);
          //     getAllDonorList();
          getPatientList();
        }, 2000)
    }
    else{
      setShowUnderProcessRemove(0)
      setShowTosterRemove(1)//0 for save and warning 1 for Error
      setTosterMessageRemove(dataRemove.responseValue)
      setShowTosterRemove(1)
      setTimeout(() => {
        setShowTosterRemove(0)
      }, 2000)
    }
  }else{
    document.getElementById(idR).style.display = 'block';
      document.getElementById(idR).innerHTML = removeValidate[0];
  }
  }

  let deletePatient = async () => {
      var obj = {
        id: rowId,
        UHID:slctdRowUHID,
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
      }
      
      
      let deleteData = await DeletePatientVenti(obj);
      if(deleteData.status === 1)
      {
        
        setShowUnderProcessDelete(0);
      setTosterValueDelete(0);
      setShowTosterDelete(1);
      setTosterMessageDelete('Deleted successfully!');
      setTimeout(() => {
        setShowTosterDelete(0)
        getPatientList();
      }, 2000);
      }
  }


let handleDischargeType =(val1,val2)=>{
  setRowID(val1.id);
  setSlctdRowUHID(val1.uhid);
  setSlctdRemoveReason(val2.dischargeType)
 
}

let handleIntubateExtubate = (valUhid) => {
  setRowID(valUhid.id);
  setSlctdRowUHID(valUhid.uhid);
}
  let clearData = () => {
    setUhid('');
    setRowID('');
    setMachineDate('');
    setPatientName('')
    setModeDate('');
    setModeTime('');
    setMachineDate('');
    setMachineTime('');
    setConsultantName('');
    setDepartment('');
    setWardName('');
    document.getElementById('machineID').value = 0;
    document.getElementById('modeId').value = 0;
    setFio2(0);
    setPeep(0);
    getPatientList();
  }

  let clearDataForPopUp = () => {
    setIntubateDate('');
    setExtubateDate('');
    setRemoveDate('');
    setIntubateTime('');
    setExtubateTime('');
    setRemoveTime('');
    setSlctdRemoveReason('');
  }

  useEffect(() => {
    getmachineModedata()
    getPatientList();
  }, [])


  return (
    <>
             {/* <div className='layOutSurgeryOTNavbar'>
                    <div>
                        <div className="offcanvas-logo">
                            <Link to="/dashboard/"><img src={OffcanvasLogo} alt=""/></Link>
                        </div>
                    </div>
                    <Navbar />
                </div> */}


 <div className="med-box" style={{marginTop:'50px', padding:'10px'}}>
          <div className="d-flex flex-wrap justify-content-between">
            <div className="title">Patient On Ventilator List</div>
            <div className="d-flex flex-wrap justify-content-between column-gap-4 pt-2 me-3"> 
               <div className="btnOpenModal pointer" data-bs-toggle="modal" data-bs-target="#addPatientOnVenti" title="Add Patient">
                <i className="bi bi-person-plus"></i> <span>Add Patient</span>
                </div>               
              </div>
          </div>
          
          <div className="med-table-section" style={{ height: "806px", marginTop:'10px' }}>
            <table className="med-table border striped">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "5%" }}> # </th>
                  <th>UHID</th>
                  <th>PatientName</th>
                  <th>Dept/ward</th>
                  <th>Consultant</th>
                  <th>Ventilator Type</th>
                  <th>FI02/PEEP</th>
                  <th>Date & Time</th>
                  <th>Machine</th>
                  <th style={{ width: "10%" }} className="text-center"> Action </th>
                </tr>
              </thead>
              <tbody> {patientList && patientList.map((list, index) => {
                return (
                  
                  <tr style={{backgroundColor: list.isExtubateBtn === 1?'#D3EDFF':'#FFFFFF'}}>
                  <td className="text-center">{index + 1}</td>
                  <td className="">{list.uhid}</td>
                  <td className="">{list.patientName} ( {list.age} Years/{list.gender})</td>
                  <td className="">{list.departmentName} / {list.wardName}</td>
                  <td className="">{list.consultantName}</td>
                  {list.lifeSupportModeID === 7 && <td className=""><img src={PatientSupportImg} alt='PatientSupportImg'  className="ptVentiIcon"/>{list.lifeSupportType}</td>}
                  {list.lifeSupportModeID === 6 && <td className=""><img src={PatientControlImg} alt='PatientControlImg'  className="ptVentiIcon"/>{list.lifeSupportType}</td>}
                  {list.lifeSupportModeID === 8 && <td className="" ><img src={PatientIntubateImg} alt='PatientIntubateImg' className="blinking ptVentiIcon"/>{list.lifeSupportType}</td>}
                  <td className="">{list.fio2} / {list.peep}</td>
                  <td className="">{list.modeFromDate} {list.modeFromTime}</td>
                  <td className="">{list.equipmentName}</td>
                  <td>
                    <div className="action-button">
                      {list.isIntubateBtn === 1 ? <button type="button" className="btn btn-danger btn-sm btnVenti" data-bs-toggle="modal" data-bs-target="#intubatePoppUp" onClick={()=>{handleIntubateExtubate(list)}}>Intubate</button> 
                      : <button type="button" className="btn btn-warning btn-sm text-light btnVenti" data-bs-toggle="modal" data-bs-target="#extubatePoppUp" onClick={()=>{handleIntubateExtubate(list)}}>Extubate</button>}

                      <div className="dropdown">
                      {list.lifeSupportModeID === 8 ? <a className="btn btn-secondary dropdown-toggle_ btn-sm btnVenti" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" disabled>
                          <i className="bi bi-three-dots-vertical" ></i>
                        </a> :
                        <a className="btn btn-secondary dropdown-toggle_ btn-sm btnVenti" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={getDischargeList}>
                          <i className="bi bi-three-dots-vertical" ></i>
                        </a>}
                        
                        
                        <ul className="dropdown-menu">
                          {dischargeList && dischargeList.map((listDiv, index) => {
                            return (
                              <li>
                                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#removePopUp" onClick={()=>{handleDischargeType(list,listDiv)}}>{listDiv.dischargeType}</a>
                              </li>

                            )
                          })}
                        </ul>

                      </div>


                      <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal">
                        <i className="fa fa-trash actiondel" onClick={() => { setRowID(list.id);setSlctdRowUHID(list.uhid) }}></i>
                      </div>
                    </div>
                  </td>
                </tr>)
              })} </tbody>
            </table>
          </div>
          </div>
    

      {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modalDelete">
          <div className="modal-content">
            <div className="modal-body modelbdy text-center">
              <div className="popDeleteIcon">
                <i className="fa fa-trash"></i>
              </div>
              <div className="popDeleteTitle mt-3"> Delete?</div>
              <div className="popDeleteContent"> {" "} Are you sure you want to delete? </div>
            </div>
            <div className="modal-footer1 text-center">
              <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal"> Cancel </button>
              <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={deletePatient}> Delete </button>
            </div>
          </div>
        </div>
      </div>
      {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

      {/* ######################## Moodal Pop Area #################### */}

      <div className="modal fade" id="addPatientOnVenti" data-bs-backdrop="static">
        <div className="modal-dialog modal-xl">
          <div className="modal-content p-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white" id="exampleModalLabel"> Patient On Ventilator Details </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window" onClick={clearData}>
                <i className="bi bi-x-octagon"></i>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="row">
                <div className="col-12">
                  <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">
                    <div className="d-flex flex-wrap align-content-end flex-wrap">
                      <div className="mb-2 me-2">
                        <label htmlFor="UHID" className="form-label"> UHID <span className="starMandatory">*</span>
                        </label>
                        <input type="text" className="form-control form-control-sm" id="uhid" placeholder="Enter UHID" name="uhid" value={uhid} onChange={handleChange} />
                        <div> <small id='errUHID' className='form-text text-danger' ></small></div>
                      </div>

                      <div className="mb-2 me-2">
                        <label htmlFor="patientName" className="form-label"> Patient <span className="starMandatory">*</span>
                        </label>
                        <input disabled="true" className="form-control form-control-sm" id="patientName" name="patientName" value={patientName} />
                      </div>
                      <div className="mb-2 me-2">
                        <label htmlFor="gender" className="form-label"> Consultant <span className="starMandatory">*</span>
                        </label>
                        <input disabled="true" className="form-control form-control-sm" id="consultantID" value={consultantName} name="consultantID" />
                      </div>
                      <div className="mb-2 me-2">
                        <label htmlFor="bedName" className="form-label"> Dept/Ward <span className="starMandatory">*</span>
                        </label>
                        <input disabled="true" className="form-control form-control-sm" id="departmentID" value={department + ' / ' + wardName} name="departmentID" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="fieldsett-in">
                          <div className="fieldsett">
                            <span className="fieldse">Machine Data</span>
                            <div className="row mt-2 px-2">
                              <div className="col-md-6 mb-2">
                                <label htmlFor="roleIDFrom" className="form-label"> {" "} Machine Serial No.{" "} <span className="starMandatory">*</span>
                                </label>
                                <select name="machineID" id="machineID" className="form-select form-select-sm" aria-label=".form-select-sm example">
                                  <option value="0">Select</option> {machineList.map && machineList.map((val, index) => { return (<option value={val.id}>{val.name}</option>) })}
                                </select>
                                <div> <small id='errMachineID' className='form-text text-danger' ></small></div>
                              </div>
                              <div className="col-md-6 mb-2">
                                <label htmlFor="bedName" className="form-label"> Machine Date{" "} <span className="starMandatory">*</span>
                                </label>
                                <input type="date" className="form-control form-control-sm" id="machineDate" name="machineDate" value={machineDate} onChange={handleMachine} />
                                <div> <small id='errDate' className='form-text text-danger' ></small></div>
                              </div>
                              <div className="col-md-6 mb-2">
                                <label htmlFor="bedName" className="form-label"> Machine Time{" "} <span className="starMandatory">*</span>
                                </label>
                                <input type="time" className="form-control form-control-sm" id="machineTime" name="machineTime" value={machineTime} onChange={handleMachine} />
                                <div> <small id='errTime' className='form-text text-danger' ></small></div>
                              </div>
                              <div className="col-md-6 mb-2">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> &nbsp; </label>
                                <div style={{ whiteSpace: "nowrap" }}>
                                  {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                                    showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> :
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveMachine}> Save Machine </button>}
                                </div>
                              </div>
                            </div>
                            <div className="mt-5 col-md-12 mb-2">
                              <h5 style={{ color: "red", fontSize: "13px" }}> Note: Keep the PEEP value as 5 when you assign the ventilator first time. </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="fieldsett-in">
                          <div className="fieldsett">
                            <span className="fieldse">Manual Data</span>
                            <div className="row mt-2 px-2">
                              <div className="col-12">
                                <div className="row mt-2 px-2">
                                  <div className="col-md-6 mb-2">
                                    <label htmlFor="fio2" className="form-label"> FIO2{" "} <span className="starMandatory">*</span>
                                    </label>
                                    <input type="number" className="form-control form-control-sm" id="fio2" placeholder="Enter FIO2" name="fio2" value={fio2} onChange={handleMode} />
                                    <div> <small id='errFio2' className='form-text text-danger' ></small></div>
                                  </div>
                                  <div className="col-md-6 mb-2">
                                    <label htmlFor="peep" className="form-label"> PEEP{" "} <span className="starMandatory">*</span>
                                    </label>
                                    <input type="number" className="form-control form-control-sm" id="peep" placeholder="Enter PEEP" name="peep" value={peep} onChange={handleMode} />
                                    <div> <small id='errPeep' className='form-text text-danger' ></small></div>
                                  </div>
                                  <div className="col-md-6 mb-2">
                                    <label htmlFor="roleIDFrom" className="form-label"> {" "} Mode{" "} <span className="starMandatory">*</span>
                                    </label>
                                    <select name="modeId" id="modeId" className="form-select form-select-sm" aria-label=".form-select-sm example">
                                      <option value="0">Select</option> {modeList && modeList.map((val, index) => { return (<option value={val.id}>{val.lifeSupportMode}</option>) })}
                                    </select>
                                    <div> <small id='errMode' className='form-text text-danger' ></small></div>
                                  </div>
                                  <div className="col-md-6 mb-2">
                                    <label htmlFor="modeDate" className="form-label"> Date{" "} <span className="starMandatory">*</span>
                                    </label>
                                    <input type="date" className="form-control form-control-sm" id="modeDate" name="modeDate" value={modeDate} onChange={handleMode} />
                                    <div> <small id='errModeDate' className='form-text text-danger' ></small></div>
                                  </div>
                                  <div className="col-md-6 mb-2">
                                    <label htmlFor="modeTime" className="form-label"> Time{" "} <span className="starMandatory">*</span>
                                    </label>
                                    <input type="time" className="form-control form-control-sm" id="modeTime" name="modeTime" value={modeTime} onChange={handleMode} />
                                    <div> <small id='errModeTime' className='form-text text-danger' ></small></div>
                                  </div>
                                  <div className="col-md-6 mb-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label"> &nbsp; </label>
                                    <div style={{ whiteSpace: "nowrap" }}>
                                      {showUnderProcessMode === 1 ? <><TosterUnderProcess /></> :
                                        showTosterMode === 1 ? <Toster value={tosterValueMode} message={tosterMessageMode} /> :
                                          <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveMode}> Submit </button>}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ///////////////////////////////// Extubate Modal POP up/////////////////////////// */}
      <div className="modal fade" id="extubatePoppUp" data-bs-backdrop="static">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white" id="exampleModalLabel"> Extubate Patient Date and Time </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window" onClick={clearData}>
                <i className="bi bi-x-octagon"></i>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="row">
                <div className="col-12">
                  <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">
                    <div className="row">
                      <div className="col-md-4 mb-2">
                        <label htmlFor="extubateDate" className="form-label">Date<span className="starMandatory">*</span>
                        </label>
                        <input type="date" className="form-control form-control-sm" id="extubateDate" placeholder="Enter UHID" name="extubateDate" value={extubateDate} onChange={handlePopUp} />
                        <div> <small id='errDateIRE' className='form-text text-danger' ></small></div>
                      </div>
                      <div className="col-md-4 mb-2">
                        <label htmlFor="extubateTime" className="form-label">Time<span className="starMandatory">*</span>
                        </label>
                        <input type="time" className="form-control form-control-sm" id="extubateTime" placeholder="Enter UHID" name="extubateTime" value={extubateTime} onChange={handlePopUp}/>
                        <div> <small id='errTimeIRE' className='form-text text-danger'></small></div>
                      </div>


                      <div className="col-md-4 mb-2">
                        <label htmlFor="exampleFormControlInput1" className="form-label"> &nbsp; </label>
                        <div>
                        {showUnderProcessExtubate === 1 ? <><TosterUnderProcess /></> :
                                        showTosterExtubate === 1 ? <Toster value={tosterValueExtubate} message={tosterMessageExtubate} /> :
                                          <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={extubatePatient}> Submit </button>}
                          {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={extubatePatient}> Submit </button> */}
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

      {/* ///////////////////////////////// Intubate Modal POP up/////////////////////////// */}
      <div className="modal fade" id="intubatePoppUp" data-bs-backdrop="static">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white" id="exampleModalLabel"> Intubate Patient Date and Time </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window" onClick={clearData}>
                <i className="bi bi-x-octagon"></i>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="row">
                <div className="col-12">
                  <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">
                    <div className="row">
                      <div className="col-md-4 mb-2">
                        <label htmlFor="intubateDate" className="form-label">Date<span className="starMandatory">*</span>
                        </label>
                        <input type="date" className="form-control form-control-sm" id="intubateDate"  name="intubateDate" value={intubateDate} onChange={handlePopUp} />
                        <div> <small id='errDateIRE' className='form-text text-danger' ></small></div>
                      </div>
                      <div className="col-md-4 mb-2">
                        <label htmlFor="intubateTime" className="form-label">Time<span className="starMandatory">*</span>
                        </label>
                        <input type="time" className="form-control form-control-sm" id="intubateTime"  name="intubateTime" value={intubateTime} onChange={handlePopUp} />
                        <div> <small id='errTimeIRE' className='form-text text-danger'></small></div>
                      </div>


                      <div className="col-md-4 mb-2">
                        <label htmlFor="exampleFormControlInput1" className="form-label"> &nbsp; </label>
                        <div>
                        {showUnderProcessIntubate === 1 ? <><TosterUnderProcess /></> :
                                        showTosterIntubate === 1 ? <Toster value={tosterValueIntubate} message={tosterMessageIntubate} /> :
                                          <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={intubatePatient}> Submit </button>}
                          {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={intubatePatient}> Submit </button> */}
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

      {/* //////////////////////////////////// REMOVE Modal Pop Up/////////////////////////////// */}
      <div className="modal fade" id="removePopUp" data-bs-backdrop="static">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white" id="exampleModalLabel"> Remove Patient Date and Time </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window" onClick={clearDataForPopUp}>
                <i className="bi bi-x-octagon"></i>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="row">
                <div className="col-12">
                  <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">
                    <div className="row">
                      <div className="col-md-3 mb-2">
                        <label htmlFor="removeDate" className="form-label">Date<span className="starMandatory">*</span>
                        </label>
                        <input type="date" className="form-control form-control-sm" id="removeDate" name="removeDate" value={removeDate} onChange={handlePopUp}/>
                        <div> <small id='errDateIRE' className='form-text text-danger' ></small></div>
                      </div>
                      <div className="col-md-3 mb-2">
                        <label htmlFor="removeTime" className="form-label">Time<span className="starMandatory">*</span>
                        </label>
                        <input type="time" className="form-control form-control-sm" id="removeTime" placeholder="Enter UHID" name="removeTime" value={removeTime} onChange={handlePopUp}/>
                        <div> <small id='errTimeIRE' className='form-text text-danger'></small></div>
                      </div>
                      <div className="col-md-3 mb-2">
                        <label htmlFor="removeReason" className="form-label">Reason<span className="starMandatory">*</span>
                        </label>
                        <input type="text" className="form-control form-control-sm" id="removeReason" placeholder="Ex: Discharge" name="removeReason" value={slctdRemoveReason} onChange={''} disabled/>
                        <div> <small id='errRemoveReason' className='form-text text-danger'></small></div>
                      </div>


                      <div className="col-md-3 mb-2">
                        <label htmlFor="exampleFormControlInput1" className="form-label"> &nbsp; </label>
                        <div>
                        {showUnderProcessRemove === 1 ? <><TosterUnderProcess /></> :
                                        showTosterRemove === 1 ? <Toster value={tosterValueRemove} message={tosterMessageRemove} /> :
                                          <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={removePatient}> Submit </button>}
                          {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={removePatient}> Submit </button> */}
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
      <Loader val={loader} />
    </>
  );
}
