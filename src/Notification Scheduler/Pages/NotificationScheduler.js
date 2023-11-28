import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../Component/Loader'
import SuccessToster from '../../Component/SuccessToster'
import AlertToster from '../../Component/AlertToster'
import Heading from '../../Component/Heading'
import DropdownWithSearch from '../../Component/DropdownWithSearch'
import TosterUnderProcess from '../../Component/TosterUnderProcess'
import Toster from '../../Component/Toster'
import clearIcon from '../../assets/images/icons/clear.svg';
import Send from '../../assets/images/icons/send.svg';
import GetAllUsers from '../API/GET/GetAllUsers'
import GetAllFrequency from '../API/GET/GetAllFrequency'
import GetAllTemplate from '../API/GET/GetAllTemplate'
import GetAllScheduleType from '../API/GET/GetAllScheduleType'
import TextEditor from '../../Component/TextEditor'
import PostNotificationScheduler from '../API/POST/PostNotificationScheduler'
import GetAPIDepartmentMaster from '../../Admin/Api/Master/DepartmentMasterAPI/GetAPIDepartmentMaster'
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import GetAPIUrl from '../API/GET/GetAPIUrl'


export default function NotificationScheduler() {
   let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
   let [showUnderProcess, setShowUnderProcess] = useState(0);
   let [showToster, setShowToster] = useState(0);
   let [tosterMessage, setTosterMessage] = useState("");
   let [tosterValue, setTosterValue] = useState(0);
   let [showLoder, setShowLoder] = useState(0);
   let [isShowToaster, setisShowToaster] = useState(0);
   let [showAlertToster, setShowAlertToster] = useState(0);
   let [showErrMessage, setShowErrMessage] = useState('');
   let [showSuccessMsg, setShowSuccessMsg] = useState('');
   let [clearDropdown, setClearDropdown] = useState(0);
   let [updateBool, setUpdateBool] = useState(0);
   let [userList, setUserList] = useState([]);
   let [apiList, setAPIList] = useState([]);
   let [editapiList, setEditAPIList] = useState([]);
   let [departmentList, setDepartmentList] = useState([]);
   let [selectedDepartment, setSelectedDepartment] = useState();
   let [frequencyList, setFrequencyList] = useState([]);
   let [templateList, setTemplateList] = useState([]);
   let [scheduleList, setScheduleList] = useState([]);
   let [selectedUser, setSelectedUser] = useState();
   let [selectedFrequency, setSelectedfrequency] = useState();
   let [selectedTemplate, setSelectedTemplate] = useState();
   let [selectedSchedule, setSelectedSchedule] = useState();
   let [startingDate, setStartingDate] = useState();
   let [scheduleDate, setScheduleDate] = useState();
   let [stopDate, setStopDate] = useState();
   let [preferredTime, setPreferredTime] = useState();
   let [customBody, setCustomBody] = useState();
   let [priorWeek, setPriorWeek] = useState();
   let [priorDay, setPriorDay] = useState();
   let [priorMonth, setPriorMonth] = useState();
   let [apiUrl, setApiUrl] = useState();
   let [header, setHeaderName] = useState();
   let [body, setBody] = useState();
   let [sendScheduleList, setSendScheduleList] = useState([]);
   let [rowID, setRowId] = useState(0);
   let [selectedTemplateData, setSelectedTemplateData] = useState([]);
   let [selectedAPIurl, setSelectedAPIUrl] = useState([]);
   let [selectedAPIName, setSelectedAPIName] = useState([]);
   let [scheduleType, setScheduleType] = useState([]);
   let [divs, setDivs] = useState([]);
   let [userType, setUserType] = useState([]);
   const inputRef = useRef(null);
   let handleChange = (e) => {
      // document.getElementById('errUser').style.display="none";
      document.getElementById('errDepartment').style.display = "none";
      document.getElementById('errfrequency').style.display = "none";
      document.getElementById('errpreferredTime').style.display = "none";
      document.getElementById('errStartDate').style.display = "none";

      const name = e.target.name;
      const value = e.target.value;
      if (name === "ddlUserType") {
         setSelectedUser(value)
      }
      if (name === "ddlfrequency") {
         setSelectedfrequency(value)
      }
      if (name === "ddlTemplate") {
         setSelectedTemplateData(value)
      }
      if (name === "ddlscheduleType") {
         setSelectedSchedule(value)
      }
      if (name === "startingDate") {
         setStartingDate(value)
      }
      if (name === "stopDate") {
         setStopDate(value)
      }
      if (name === "preferredTime") {
         setPreferredTime(value)
      }
      if (name === "priorWeek") {
         setPriorWeek(value)
      }
      if (name === "ddlAPI") {
         setSelectedAPIUrl(value)
      }
      if (name === "header") {
         setHeaderName(value)
      }
      if (name === "body") {
         setBody(value)
      }
      if (name === "customBody") {
         setCustomBody(e.target.value);
      }
   }

   // Select All Schedule
   let checkId = (id) => {
      let bool = false;
      sendScheduleList.map((val, ind) => {
         if (id === val) {
            bool = true;
            return [bool, ind];
         }
      });
      return [bool, -1];
   };


   let getAllUsers = async () => {
      const response = await GetAllUsers();
      if (response.status === 1) {
         console.log("responseValue", response.responseValue)
         setUserList(response.responseValue);
      }
   }

   let getDepartment = async () => {
      const response = await GetAPIDepartmentMaster()
      if (response.status === 1) {
         setDepartmentList(response.responseValue);
         // if (response.responseValue.length > 0 && selectedDepartment === null) {
         //    setSelectedDepartment(response.responseValue[0].id);
         // }
      }
   }
   let getFrequencyList = async () => {
      const response = await GetAllFrequency();
      if (response.status === 1) {
         console.log("responseValue", response.responseValue)
         setFrequencyList(response.responseValue);
      }
   }

   let getTemplateList = async () => {
      const response = await GetAllTemplate();
      if (response.status === 1) {
         console.log("responseValue", response.responseValue)
         setTemplateList(response.responseValue);
      }
   }

   let getScheduleTypeList = async () => {
      const response = await GetAllScheduleType();
      if (response.status === 1) {
         console.log("responseValue", response.responseValue)
         setScheduleList(response.responseValue);
      }
   }


   let getAllAPI = async () => {
      const response = await GetAPIUrl();
      if (response.status === 1) {
         setAPIList(response.responseValue);
      }
   }
   let handlerGetUser = async (e) => {
      const getKey = e.target.value;
      setSelectedDepartment(getKey)
      const response = await GetAllUsers(getKey);
      if (response.status === 1) {
         console.log("responseValue", response.responseValue)
         setUserList(response.responseValue);

      }
   }

   // Change Select Schedule  
   let changeSchedule = (id) => {
      let data = [...scheduleType]
      console.log('data 1', data)
      if (data.length === 0) {
         data.push({
            typeId: id
         })
      }
      else {
         var index = data.findIndex((arr) => arr.typeId === id);
         console.log('index', index)
         if (index !== -1) {
            document.getElementById('ddlSelectSchedule').checked = false;
            data.splice(index, 1)
         }
         else {
            data.push({
               typeId: id
            })
         }

      }
      console.log('Final data', data)
      setScheduleType(data)
   };

   let changeUser = (ids) => {
      let data = [...userType]
      console.log("data", ids)
      if (data.length === 0) {
         data.push(
            {
               id: ids
            }
         )
      }
      else {
         console.log('data List', data)
         var index = data.findIndex((arr, i) => arr.id === ids);
         console.log('index', index)

         if (index !== -1) {
            document.getElementById('ddlSelectAllUser').checked = false;
            data.splice(index, 1);
         }
         else {
            data.push(
               {
                  id: ids
               }
            )
         }

      }

      setUserType(data)
   };
   let handlerSelectAll = () => {
      const isSelectedAll = document.getElementById("ddlSelectAllUser").checked;
      let tempArr = [];
      console.log('isSelectedAll', isSelectedAll)
      for (var i = 0; i < userList.length; i++) {
         let getID = userList[i].id;
         if (isSelectedAll === true) {
            document.getElementById(getID).checked = true;
            tempArr.push({
               id: getID
            })
         }
         else {
            document.getElementById(getID).checked = false;
         }
      }

      console.log('tempArr', tempArr)
      setUserType(tempArr)

   }

   let handlerSelectAllSchedule = () => {
      const isSelectedAll = document.getElementById("ddlSelectSchedule").checked;
      let tempArr = [];
      console.log('isSelectedAll', isSelectedAll)
      for (var i = 0; i < scheduleList.length; i++) {
         let getID = scheduleList[i].id;
         if (isSelectedAll === true) {
            document.getElementById(getID).checked = true;
            tempArr.push({
               typeId: getID
            })
         }
         else {
            document.getElementById(getID).checked = false;
         }
      }

      console.log('tempArr', tempArr)
      setScheduleType(tempArr)

   }
   let handlerSave = async () => {
      var tempCol = [];
      if (selectedDepartment === '' || selectedDepartment === 0 || selectedDepartment === undefined || selectedDepartment === null) {
         document.getElementById('errDepartment').innerHTML = "Please Select Department";
         document.getElementById('errDepartment').style.display = "block";
      }
      else if (userType.length === '' || userType.length === 0 || userType === undefined || userType === null) {
         document.getElementById('errUser').innerHTML = "Please Select User";
         document.getElementById('errUser').style.display = "block";
      }
      else if (selectedFrequency === '' || selectedFrequency === 0 || selectedFrequency === undefined || selectedFrequency === null) {
         document.getElementById('errfrequency').innerHTML = "Please Select Frequency";
         document.getElementById('errfrequency').style.display = "block";
      }
      else if (preferredTime === '' || preferredTime === 0 || preferredTime === undefined || preferredTime === null) {
         document.getElementById('errpreferredTime').innerHTML = "Please Choose Preferred Time";
         document.getElementById('errpreferredTime').style.display = "block";
      }
      else if (startingDate === '' || startingDate === 0 || startingDate === undefined || startingDate === null) {
         document.getElementById('errStartDate').innerHTML = "Please Choose Starting Date";
         document.getElementById('errStartDate').style.display = "block";
      }
      else {
         for (var i = 0; i < userType.length; i++) {
            tempCol.push(userType[i].id);
         }
         let notificationobj = [];
         notificationobj.push({
            apiId: selectedAPIurl.id
            // apiUrl:apiUrl,
            // header:header,
            // body:body
         })
         console.log('notificationobj', notificationobj)
         const obj = {
            sendTo: tempCol,
            frequencyId: selectedFrequency,
            templateId: selectedTemplateData.id,
            notificationScheduleType: scheduleType,
            preferredTime: preferredTime,
            startingDate: startingDate,
            stopDate: stopDate,
            customBody: customBody,
            notificationApiMaster: notificationobj,
            userID: userID
         }

         console.log('obj', obj)

         setShowUnderProcess(1);
         const response = await PostNotificationScheduler(obj);
         if (response.status === 1) {
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTosterMessage("Send Successfully");
            setTimeout(() => {
               setShowToster(0);
               handleClear(1);
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
   }

   let handleClear = (value) => {
      setRowId(0);
      setUpdateBool(0);
      setClearDropdown(value);
      setRowId('');
      setSelectedUser('');
      setSelectedfrequency('');
      setSelectedTemplate('');
      setPreferredTime('');
      setStartingDate('');
      setStopDate('');
      setPriorWeek('');
      setPriorDay('');
      setPriorMonth('');
      setScheduleDate('');
      setSelectedTemplateData('');
      setCustomBody('');
      setApiUrl('');
      //   document.getElementById('errUser').style.display="none";
      document.getElementById('errfrequency').style.display = "none";
      document.getElementById('errDepartment').style.display = "none";
      document.getElementById('errTemplate').style.display = "none";
      document.getElementById('errSchedule').style.display = "none";
      document.getElementById('errpreferredTime').style.display = "none";
      document.getElementById('errStartDate').style.display = "none";
      document.getElementById('errStopDate').value = "";
      document.getElementById('errPriorWeek').value = '';
      document.getElementById('errPriorday').value = '';
      document.getElementById('errPriorMonth').value = '';
      document.getElementById('errScheduleDate').value = '';
      setSelectedTemplateData([])

   }

   // const addDiv = () => {
   //    const newDiv = (
   //      <div className="dflex" key={divs.length}>
   //        <div className="col-2 mb-2 me-2">
   //          <label htmlFor="TestName" className="form-label">Prior Week </label>
   //          <input type="number" className="form-control form-control-sm" name="priorWeek" value={priorWeek} onChange={handleChange} placeholder="Enter Prior Week" />
   //          <small className="form-text text-danger" style={{ display: 'none' }}></small>
   //        </div>
   //        <div className="col-2 mb-2 me-2">
   //          <label htmlFor="TestName" className="form-label">Prior day </label>
   //          <input type="number" className="form-control form-control-sm" name="priorDay" value={priorDay} onChange={handleChange} placeholder="Enter Prior day" />
   //          <small className="form-text text-danger" style={{ display: 'none' }}></small>
   //        </div>
   //        <div className="col-2 mb-2 me-2">
   //          <label htmlFor="TestName" className="form-label">Prior Month </label>
   //          <input type="number" className="form-control form-control-sm" name="priorMonth" value={priorMonth} onChange={handleChange} placeholder="Enter Prior Month" />
   //          <small className="form-text text-danger" style={{ display: 'none' }}></small>
   //        </div>
   //        <div className="col-2 mb-2 me-2">
   //          <label htmlFor="scheduleDate" className="form-label">Schedule Date<span className="starMandatory">*</span></label>
   //          <input type="date" className="form-control form-control-sm" name="scheduleDate" value={scheduleDate} onChange={handleChange} />
   //          <small className="form-text text-danger" style={{ display: 'none' }}></small>
   //        </div>
   //        {/* <button type="button" className="btn btn-add btn-save-fill btn-sm me-1" onClick={() => deleteDiv(newDiv)}>Delete</button> */}
   //        <div className="action-button">
   //        <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => deleteDiv(newDiv)}/>
   //             </div>
   //           </div>
   //      </div>
   //    );

   //    setDivs((prevDivs) => [...prevDivs, newDiv]);
   //  };

   //  const deleteDiv = (divToDelete) => {
   //    setDivs((prevDivs) => prevDivs.filter((div) => div !== divToDelete));
   //  };


   let handleClearTemplate = (value) => {
      setRowId(0);
      setUpdateBool(0);
      setClearDropdown(value);
      setRowId('');
      setSelectedTemplateData('');
   }

   const handlerTemplate = async (e) => {
      document.getElementById('errTemplate').style.display = "none";
      const key = e.target.value;
      console.log('e.target.value', e.target.value)
      // const response= await GetAllTemplate(key);
      for (var i = 0; i < templateList.length; i++) {
         if (templateList[i].id === key) {
            console.log('templateList[i].id === key', templateList[i])
            setSelectedTemplateData(templateList[i])
            // break;
         }
      }
   }

   let handlerAPI = async (e) => {
      const key = e.target.value;
      for (var i = 0; i < apiList.length; i++) {
         if (apiList[i].id === key) {
            console.log('apiList[i].id === key', apiList[i])
            setSelectedAPIUrl(apiList[i])
         }
      }
   }
   const adjustInputWidth = () => {
      if (inputRef.current) {
         const input = inputRef.current;
         input.style.width = `${input.scrollWidth}px`;
      }
   };

   useEffect(() => {
      getDepartment();
      getAllUsers();
      getFrequencyList();
      getTemplateList();
      getScheduleTypeList();
      getAllAPI();
      adjustInputWidth();
   }, [selectedAPIurl.apiUrl]);

   return (
      <>
         <section className="main-content mt-5 pt-3">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-12">
                     <Heading text='Notification Scheduler' />
                  </div>
               </div>

               <div className='med-box'>
                  <div className='inner-content'>
                     <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-4 mb-2">
                           <label htmlFor="SampleId" className="form-label">Department <span className="starMandatory">*</span></label>
                           {departmentList &&
                              <DropdownWithSearch defaulNname="Select Department" name="ddlDepartment" list={departmentList} valueName="id" displayName="departmentName" getvalue={handlerGetUser} editdata={""} clear={clearDropdown} clearFun={handleClear} />
                           }
                           <small id="errDepartment" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4 mb-2">
                           <label htmlFor="caretakerName" className="form-label">Users<span className="starMandatory">*</span></label>
                           <div className="dropdown">
                              <button className="btn btn-light dropdown-toggle multi-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                 Select User
                              </button>
                              <ul className="dropdown-menu multistyl">
                                 <li className="d-flex flex-row ps-1 gap-2">
                                    <input type="checkbox" id="ddlSelectAllUser" onChange={handlerSelectAll} />
                                    <span>Select all</span>
                                 </li>
                                 {userList && userList.map((val, index) => {
                                    return (
                                       <>

                                          <li className="d-flex flex-row ps-1 gap-2">
                                             <input type="checkbox" name='ddlUserType' id={val.id} onClick={() => { changeUser(val.id); }} />
                                             <span htmlFor="val.id">{val.name}</span>
                                          </li>
                                       </>
                                    );
                                 })}
                              </ul>
                              <small id="errUser" className="form-text text-danger" style={{ display: 'none' }}></small>
                           </div>
                        </div>
                        {/* <div className="col-xl-2 col-lg-3 col-md-4 mb-2">
                     <label htmlFor="SampleId" className="form-label">Users <span className="starMandatory">*</span></label>
                     {userList && 
                     <DropdownWithSearch defaulNname="Select User" name="ddlUser" list={userList} valueName="id" displayName="name" getvalue={handleChange} editdata={""} clear={clearDropdown} clearFun={handleClear} />
                     }
                     <small id="errUser" className="form-text text-danger" style={{ display: 'none' }}></small>
                  </div> */}

                        <div className="col-xl-2 col-lg-3 col-md-4 mb-2">
                           <label htmlFor="SampleId" className="form-label">Frequency <span className="starMandatory">*</span></label>
                           {frequencyList &&
                              <DropdownWithSearch defaulNname="Select Frequency" name="ddlfrequency" list={frequencyList} valueName="id" displayName="name" getvalue={handleChange} editdata={""} clear={clearDropdown} clearFun={handleClear} />
                           }
                           <small id="errfrequency" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xl-2 col-lg-3 col-md-4 mb-2">
                           <label htmlFor="template" className="form-label">Template</label>
                           {templateList &&
                              <DropdownWithSearch defaulNname="Select Template" id="ddlTemplate" name="ddlTemplate" list={templateList} valueName="id" displayName="notificationTitle" getvalue={handlerTemplate} clear={clearDropdown} editdata={""} clearFun={handleClear} />
                           }
                           <small id="errTemplate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        {selectedTemplateData.length === 0 ?
                           <div className="col-xl-4 mb-2">
                              <div className="disch">
                                 <label htmlFor="customBody" className="form-label">Custom Template</label>
                                 <TextEditor getTextvalue={handleChange} setValue={customBody} name="customBody" id="customBody" />
                              </div>
                           </div>
                           :
                           <div className="col-xl-4 mb-2">
                              <div className="disch_">
                                 <label htmlFor="customBody" className="form-label">{selectedTemplateData.notificationTitle} Template</label>

                                 <div className='p-2' style={{ border: '1px solid #dee2e6', maxHeight: '200px', overflow: 'auto', fontSize: '13px' }}>
                                    <div className="mb-2">
                                       <div className="form-label fw-bold">Sms Template</div>
                                       <div>{selectedTemplateData.smsTemplate}</div>
                                    </div>
                                    <div className="mb-2">
                                       <div className="form-label fw-bold">Mail Template</div>
                                       <div>{selectedTemplateData.mailTemplate}</div>
                                    </div>
                                    <div className="mb-2">
                                       <div className="form-label fw-bold">Firebase Template</div>
                                       <div>{selectedTemplateData.firebaseTemplate}</div>
                                    </div>
                                    <div className="mb-2">
                                       <div className="form-label fw-bold">SignalR Template</div>
                                       <div>{selectedTemplateData.signalRTemplate}</div>
                                    </div>
                                    <div className="mb-2">
                                       <div className="form-label fw-bold">Whatsapp Template</div>
                                       <div>{selectedTemplateData.whatsappTemplate}</div>
                                    </div>
                                 </div>

                                 <button type="button" className="btn btn-clear btn-sm mb-1 mt-2" onClick={() => { handleClearTemplate() }}><img src={clearIcon} className='icnn' />Clear</button>
                              </div>
                           </div>
                        }

                        <div className="col-xl-2 col-lg-3 col-md-4 mb-2">
                           <label htmlFor="caretakerName" className="form-label">Schedule Type<span className="starMandatory">*</span></label>
                           <div className="dropdown">
                              <button className="btn btn-light dropdown-toggle multi-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                 Select Schedule
                              </button>
                              <ul className="dropdown-menu multistyl">
                                 <li className="d-flex flex-row ps-1 gap-2">
                                    <input type="checkbox" id="ddlSelectSchedule" onChange={handlerSelectAllSchedule} />
                                    <span>Select All</span>
                                 </li>
                                 {scheduleList && scheduleList.map((val, index) => {
                                    return (
                                       <li className="d-flex flex-row ps-1 gap-2">
                                          <input type="checkbox" name='ddlscheduleType' id={val.id} onClick={() => { changeSchedule(val.id); }} />
                                          <span htmlFor="val.id">{val.name}</span>
                                       </li>
                                    );
                                 })}
                              </ul>
                              <small id="errSchedule" className="form-text text-danger" style={{ display: 'none' }}></small>
                           </div>
                        </div>

                        <div className="col-xl-2 col-lg-3 col-md-4 mb-2">
                           <label htmlFor="preferredTime" className="form-label">Prefered Time<span className="starMandatory">*</span></label>
                           <input type="time" className="form-control form-control-sm" name="preferredTime" id="preferredTime" value={preferredTime} onChange={handleChange} />
                           <small id="errpreferredTime" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xl-2 col-lg-3 col-md-4 mb-2">
                           <label htmlFor="startdate" className="form-label">Start Date<span className="starMandatory">*</span></label>
                           <input type="date" className="form-control form-control-sm" name="startingDate" id="startingDate" value={startingDate} onChange={handleChange} />
                           <small id="errStartDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xl-2 col-lg-3 col-md-4 mb-2">
                           <label htmlFor="minimumAge" className="form-label">Stop Date</label>
                           <input type="date" className="form-control form-control-sm" name="stopDate" id="stopDate" value={stopDate} onChange={handleChange} />
                           <small id="errStopDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-lg-12 mb-2">
                           <div className="row">
                              <div class="accordion accordionPatientRaceSection" id="accordionPaymentType">
                                 <div class="accordion-item">
                                    <h2 class="accordion-header otherinfo">
                                       <button
                                          class="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseTwo"
                                          aria-expanded="false"
                                          aria-controls="collapseTwo"
                                       >
                                          Custom Type
                                       </button>
                                    </h2>
                                    <div
                                       id="collapseTwo"
                                       class="accordion-collapse collapse show1"
                                       data-bs-parent="#accordionPaymentType"
                                    >
                                       <div class="accordion-body">
                                          <div className="dflex" id='add'>
                                             <div className="col-2 mb-2 me-2">
                                                <label htmlFor="TestName" className="form-label">Prior Week </label>
                                                <input type="number" className="form-control form-control-sm" name="priorWeek" id="priorWeek" value={priorWeek} onChange={handleChange} placeholder="Enter Prior Week" />
                                                <small id="errPriorWeek" className="form-text text-danger" style={{ display: 'none' }}></small>
                                             </div>
                                             <div className="col-2 mb-2 me-2">
                                                <label htmlFor="TestName" className="form-label">Prior day </label>
                                                <input type="number" className="form-control form-control-sm" name="priorDay" id="priorDay" value={priorDay} onChange={handleChange} placeholder="Enter Prior day" />
                                                <small id="errPriorday" className="form-text text-danger" style={{ display: 'none' }}></small>
                                             </div>
                                             <div className="col-2 mb-2 me-2">
                                                <label htmlFor="TestName" className="form-label">Prior Month </label>
                                                <input type="number" className="form-control form-control-sm" name="priorMonth" id="priorMonth" value={priorMonth} onChange={handleChange} placeholder="Enter Prior Month" />
                                                <small id="errPriorMonth" className="form-text text-danger" style={{ display: 'none' }}></small>
                                             </div>
                                             <div className="col-2 mb-2 me-2">
                                                <label htmlFor="scheduleDate" className="form-label">Schedule Date</label>
                                                <input type="date" className="form-control form-control-sm" name="scheduleDate" id="scheduleDate" value={scheduleDate} onChange={handleChange} />
                                                <small id="errScheduleDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                                             </div>
                                             {/* <button type="button" className="btn btn-add btn-save-fill btn-sm me-1" onClick={addDiv}>+</button>
                                          {divs.map((div, index) => (
                                             <div key={index}>{div}</div>
                                          ))} */}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* ///// */}

                        <div className="col-lg-12 mb-2">
                           <div className="row">
                              <div class="accordion accordionPatientRaceSection" id="accordionPaymentType">
                                 <div class="accordion-item">
                                    <h2 class="accordion-header otherinfo">
                                       <button
                                          class="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseTwoo"
                                          aria-expanded="false"
                                          aria-controls="collapseTwoo"
                                       >
                                          Notification API
                                       </button>
                                    </h2>
                                    <div
                                       id="collapseTwoo"
                                       class="accordion-collapse collapse show1"
                                       data-bs-parent="#accordionPaymentType"
                                    >
                                       <div class="accordion-body">
                                          <div className="dflex">
                                             <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                                <label htmlFor="roleId" className="form-label">API</label>
                                                {apiList &&
                                                   <DropdownWithSearch defaulNname="Select Api" name="ddlAPI" list={apiList} valueName="id" displayName="apiName" getvalue={handlerAPI} editdata={editapiList} clear={clearDropdown} clearFun={handleClear} />
                                                }
                                                <small id="errRole" className="form-text text-danger" style={{ display: 'none' }}></small>
                                             </div>
                                             <div className="mb-2 me-2">
                                                <label htmlFor="apiUrl" className="form-label">API URL</label>
                                                <input type="text" disabled className="form-control form-control-sm" id="apiUrl" placeholder="Api Url" name="apiUrl" ref={inputRef} value={selectedAPIurl.apiUrl} />
                                                <small id="errName" className="form-text text-danger" style={{ display: 'none' }}></small>
                                             </div>
                                             {/* <div className="mb-2 me-2">
                                            <label htmlFor="header" className="form-label">Header</label>
                                            <input type="text" className="form-control form-control-sm" id="header" placeholder="Enter header name" name="header" value={header} onChange={handleChange} />
                                            <small id="errName" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                          <div className="mb-2 me-2">
                                            <label htmlFor="body" className="form-label">Body</label>
                                            <input type="text" className="form-control form-control-sm" id="body" placeholder="Enter body" name="body" value={body} onChange={handleChange} />
                                            <small id="errName" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div> */}
                                             {/* <button type="button" className="btn btn-add btn-save-fill btn-sm me-1" onClick={addDiv}>+</button>
                                          {divs.map((div, index) => (
                                             <div key={index}>{div}</div>
                                          ))} */}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>


                        <div className='col-xl-12'>
                           <div className='d-flex justify-content-end'>
                              <div className="mb-2 relative">
                                 <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                 <div>
                                    {showUnderProcess === 1 ?
                                       <TosterUnderProcess />
                                       :
                                       <>
                                          {showToster === 1 ?
                                             <Toster value={tosterValue} message={tosterMessage} />
                                             :
                                             <div>
                                                {updateBool === 0 ?
                                                   <>
                                                      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={Send} className='icnn' />Send</button>
                                                      <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' />Clear</button>
                                                   </>
                                                   :
                                                   <>
                                                      {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={'handlerUpdate'}>Update</button> */}
                                                      <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handleClear(1) }}>Cancel</button>
                                                   </>
                                                }
                                             </div>
                                          }
                                       </>
                                    }
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {
               showLoder === 1 ?
                  <Loader val={showLoder} />
                  : ""
            }
            {/* Toaster */}
            {
               isShowToaster === 1 ?
                  <SuccessToster handle={setShowToster} message={showSuccessMsg} />
                  : ""
            }
            {
               showAlertToster === 1 ?
                  <AlertToster handle={setShowAlertToster} message={showErrMessage} />
                  : ""
            }
         </section>
      </>
   )
}
