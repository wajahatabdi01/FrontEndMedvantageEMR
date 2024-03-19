import React, { useEffect, useState } from "react";
import SuccessToster from "../../Component/SuccessToster";
import AlertToster from "../../Component/AlertToster";
import Heading from "../../Component/Heading";
import BoxContainer from "../../Component/BoxContainer";
import GetPriorityList from "../Api/GetPriorityList";
import Loader from "../../Component/Loader";
import DropdownWithSearch from "../../Component/DropdownWithSearch";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import TableContainer from "../../Component/TableContainer";
import GetTicketList from "../Api/GetTicketList.js";
import { Link } from "react-router-dom";
import TextEditor from "../../Component/TextEditor.js";
import SaveButtonIcon from '../../assets/images/icons/saveButton.svg';
import ClearButtonIcon from '../../assets/images/icons/clear.svg';
import UploadAttachment from "../Api/UploadAttachment.js";
import GenerateTicket from "../Api/GenerateTicket.js";
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import UpdateTicket from "../Api/UpdateTicket.js";
import DeleteTicket from "../Api/DeleteTicket.js";
import TrackTicketActivity from "../Api/TrackTicketActivity.js";
import GetStatusList from "../Api/GetStatusList.js";
export function User() {
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
  let [supportTicketClientID, setsupportTicketClientID] = useState(37);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [showLoder, setShowLoder] = useState(0);
  let [isShowToaster, setisShowToaster] = useState(0);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showSuccessMsg, setShowSuccessMsg] = useState('');
  let [editPriorityList, setEditPriorityList] = useState('');
  let [clearDropdown, setClearDropdown] = useState(0);
  let [updateBool, setUpdateBool] = useState(0);
  let [priorityList, setPriorityList] = useState([]);
  let [ticketList, setTicketList] = useState([]);
  let [editorValue, setEditorValue] = useState("");
  let [txtSubject, setTxtSubject] = useState("");
  let [selectedPriority, setSelectedPriority] = useState("");
  let [rowID, setRowId] = useState("");
  let [attachmentUrl, setAttachmentURl] = useState("");
  let [showTicketActivity, setsSowTicketActivity] = useState(0);
  let [ticketActivityList, setTicketActivityList] = useState([]);
  let [ticketStatusList,setTicketStatusList]=useState([]);
  let handleTexteditor = (e) => {
    clearValidationMessage();
    setEditorValue(e.target.value)
  }
  const handleChange = (e) => {
    clearValidationMessage();
    const name = e.target.name;
    const value = e.target.value;

  

    if (name === "subject") {
    
      setTxtSubject(value)
    }
    else if (name === "ddlPriority") {
      // setEditPriorityList(e.target.selectedName);
      setSelectedPriority(value);
    }
  }
  const getPriorityList = async () => {
    const response = await GetPriorityList();
   
    if (response.status === 1) {
      setPriorityList(response.responseValue)
    }
  }
  const getTicketList = async () => {
    setShowLoder(1);
    var obj = {
      // ClientId:supportTicketClientID,
      ClientId: 5,
      StatusId: 1,
      UserId: 10104
      // UserId:userID
    }
    
    const response = await GetTicketList(obj);
   
    if (response.status === 1) {
      setTicketList(response.responseValue)
      setShowLoder(0);
    }
    else {
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(response.message);
    }
  }
  const getStatusList= async ()=>{
    const response = await GetStatusList();
    
    if(response.status === 1){
      setTicketStatusList(response.responseValue)
    }
  }
  const handleGenerateTicket = async () => {
    const validationSuccess = handleSaveValidation(txtSubject, selectedPriority, editorValue);
   
    if (validationSuccess === true) {
      setShowUnderProcess(1)
      var obj = {
        //  ClientId:supportTicketClientID,
        ClientId: 5,
        StatusId: 1,
        UserId: 10104,
        //  UserId:userID,
        PriorityId: selectedPriority,
        Description: editorValue,
        Subject: txtSubject,
        FilePath: attachmentUrl
      }
    
      const response = await GenerateTicket(obj);
      
      if (response.status === 1) {
        setShowUnderProcess(0)
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Saved Successfully");
        setTimeout(() => {
          setShowToster(0);
          getTicketList();
        }, 1500)
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(response.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0);
        }, 1500)
      }
    }
    else {

      document.getElementById(validationSuccess[0].key).style.display = "block";
      document.getElementById(validationSuccess[0].key).innerHTML = validationSuccess[0].errormessage;
    }
  }
  const handleSaveValidation = (subject, priority, description) => {
    if (subject.trim() === '' || subject === undefined || subject === null) {
      return [{
        errormessage: 'Please Fill Subject ',
        key: 'errSubject'
      }];
    }
    else if (priority === '0' || priority === '' || priority === undefined || priority === null) {
      return [{
        errormessage: 'Please Select Priority ',
        key: 'errPriority'
      }];
    }
    else if (description.trim() === '' || description === undefined || description === null) {
      return [{
        errormessage: 'Please Fill Description ',
        key: 'errDescription'
      }];
    }
    else {
      return true;
    }
  }
  const handlerUploadAttachment = async (e) => {
    const fileData = e.target.files[0];
  
    const formData = new FormData();
    formData.append('file', fileData)
    const response = await UploadAttachment(formData);
   
    setAttachmentURl(response)
  }
  const handlerClear = (value) => {
    setTxtSubject('');
    setEditorValue('');
    setClearDropdown(value);
    setSelectedPriority('');
    setEditPriorityList('');
    clearValidationMessage();
    setUpdateBool(0)


  }
  const clearValidationMessage = () => {
    const arrID = [{ id: 'errSubject' }, { id: 'errPriority' }, { id: 'errDescription' }];
    arrID.forEach((item, index) => {
      document.getElementById(item.id).style.display = "none";
    })

  }
  const handleEdit = (params) => {
   
    setTxtSubject(params.subject);
    setEditorValue(params.description);
    setSelectedPriority(params.priorityId);
    setEditPriorityList(params.priority);
    setUpdateBool(1);
    setRowId(params.id)
  }
  const handlerUpdate = async () => {
    const validationSuccess = handleSaveValidation(txtSubject, selectedPriority, editorValue);
    if (validationSuccess === true) {
      const obj = {
        //  ClientId:supportTicketClientID,
        rowID: rowID,
        ClientId: 5,
        StatusId: 1,
        UserId: 10104,
        //  UserId:userID,
        PriorityId: selectedPriority,
        Description: editorValue,
        Subject: txtSubject,
        FilePath: ''
      }
    
      const response = await UpdateTicket(obj);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Updated Successfully");
        setTimeout(() => {
          setShowToster(0);
          getTicketList();
          handlerClear();
        }, 1500)
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(response.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0);
        }, 1500)
      }
    }
    else {
      document.getElementById(validationSuccess[0].key).style.display = "block";
      document.getElementById(validationSuccess[0].key).innerHTML = validationSuccess[0].errormessage;
    }
  }
  const handleDelete = async () => {
    var obj = {
      rowID: rowID,
      ClientId: 5,
      UserId: 10104
    }
   
    const response = await DeleteTicket(obj);
    if (response.status === 1) {
      setisShowToaster(1)
      setShowSuccessMsg('Ticket Deleted Successfully')
      setTimeout(() => {
        setisShowToaster(0)
        getTicketList();
        setRowId("");
      }, 1000)
    }
    else {
      setShowAlertToster(1)
      setShowErrMessage(response.responseValue)
      setTimeout(() => {
        setisShowToaster(0)
      }, 1300)
    }
  }
  const handleTrackTicket = async (params) => {
  
    const response = await TrackTicketActivity(params.id);
 
    if (response.status === 1) {
      setTicketActivityList(response.responseValue)
      setsSowTicketActivity(1)
    }


  }
  const getTicketListByFilter = async()=>{
    setShowLoder(1);
    const getValue= document.getElementById("ddlStatusFilter").value;
    let obj={
      ClientId:5,
      StatusId:parseInt(getValue),
      UserId:10104
    }
  
    const response = await GetTicketList(obj)
    if (response.status === 1) {
      setTicketList(response.responseValue)
      setShowLoder(0);
    }
    else {
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(response.message);
    }
  }
  useEffect(() => {
    getPriorityList();
    getTicketList();
    getStatusList();

  }, [])
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <Heading text="Generate Ticket" />
          <div className="row bg-white">
            <div className="col-5">
              <div className="col-12 mb-2">
                <label htmlFor="TestName" className="form-label">Subject<span className="starMandatory">*</span></label>
                <textarea rows="3" className="form-control form-control-sm" name="subject" id="subject" onChange={handleChange} value={txtSubject}></textarea>
                <small id="errSubject" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="SampleId" className="form-label">Priority List<span className="starMandatory">*</span></label>
                {priorityList &&
                  <DropdownWithSearch defaulNname="Select Priority" name="ddlPriority" list={priorityList} valueName="id" displayName="name" editdata={editPriorityList} getvalue={handleChange} clear={clearDropdown} clearFun={handlerClear} />
                }
                <small id="errPriority" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
              <div className="col-12 mb-2">
                <label htmlFor="TestName" className="form-label">Attachment<span className="starMandatory">*</span></label>
                <input type="file" className="form-control form-control-sm" name="attachment" id="attachment" onChange={handlerUploadAttachment} />
                <small id="errAttachmentt" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
              <div className="mb-2 relative">
                <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                <div>
                  {showUnderProcess === 1 ? <TosterUnderProcess /> :
                    <>
                      {showToster === 1 ?
                        <Toster value={tosterValue} message={tosterMessage} />

                        : <div>
                          {updateBool === 0 ?
                            <>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleGenerateTicket}><img src={SaveButtonIcon} className='icnn' />Save</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handlerClear(1) }}><img src={ClearButtonIcon} className='icnn' />Clear</button>
                            </>
                            :
                            <>
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>Update</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handlerClear(1) }}>Cancel</button>
                            </>
                          }
                        </div>}
                    </>
                  }
                </div>
              </div>
            </div>
            <div className="col-7">

              <div className="col-12">
                <div className='med-table-section box-shadow-none mt-2'>
                  <label htmlFor="TestName" className="form-label">Description</label>
                  <TextEditor getTextvalue={handleTexteditor} name="abc" id="abc" setValue={editorValue} />
                  <small id="errDescription" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
              </div>

            </div>
          </div>



          <div className="row">
            <div className="col-12 mt-2">
            <div className="row flterbg">
              <div className="col-6 text-left">Ticket List</div>
              <div className="col-6 text-right filtersec">
                  <select onChange={getTicketListByFilter} id="ddlStatusFilter">
                       <option value="0">All</option>
                      {ticketStatusList && ticketStatusList.map((value,index)=>{
                        return( 
                          <>
                          {/* Status(Open) Will Be Selected By Default */}
                          {value.id === 1 ? <option value={value.id} selected>{value.name}</option>   : <option value={value.id}>{value.name}</option> }
                          </>
                         
                          )
                      })}
                  </select>
              </div>
            </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Ticket No</th>
                      <th>Date Time</th>
                      <th>Ticket Status	</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Attachment</th>
                      <th>Priority</th>
                      <th>Requested by</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ticketList && ticketList.map((val, ind) => {
                      // Create a unique ID for the dt element in each iteration
                      const descriptionId = `dt_${ind}`;
                      // Create a variable to store the parsed content
                      const parsedContent = new DOMParser().parseFromString(val.description, "text/html");
                      // Use a function to set the content
                      const setDtContent = () => {
                        const dtElement = document.getElementById(descriptionId);
                        if (dtElement) {
                          dtElement.innerHTML = parsedContent.body.innerHTML;
                        }
                      };

                      // Call the setDtContent function after 1000 milliseconds
                      setTimeout(setDtContent, 200);
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.ticketNo}</td>
                          <td>{val.createdDate}</td>
                          <td>{val.status}</td>
                          <td>{val.subject}</td>
                          {/* <td>{val.description}</td> */}
                          <td> <div id={descriptionId} className='mt-2 mx-2'></div></td>
                          <td><Link to={val.filePath} dataTarget="_blank"><img src={val.filePath} alt="Attachment" style={{ height: '5rem' }} /></Link></td>
                          <td>{val.priority}</td>
                          <td>{val.requestedby}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleEdit(val) }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} />
                              </div>
                              <div><i class="fa fa-eye" aria-hidden="true" title="Cilck Here To Track Ticket" onClick={() => { handleTrackTicket(val) }}></i></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}


                  </tbody>
                </TableContainer>
                {/* -----------------------Start Delete Modal Popup-------------------   */}

                {/*  <!-- Modal -->  */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                  <div className="modal-dialog modalDelete">
                    <div className="modal-content">

                      <div className="modal-body modelbdy text-center">
                        <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                        <div className='popDeleteTitle mt-3'>Delete</div>
                        <div className='popDeleteContent'>Are you sure you want to delete?</div>
                      </div>
                      <div className="modal-footer1 text-center">

                        <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

              </div>
            </div>
          </div>

          {showTicketActivity === 1 ?
            <div className={`modal d-${showTicketActivity === 1 ? "block" : ""}`} id="modalSetting" data-bs-backdrop="static">
              <div className="modal-dialog" style={{ maxWidth: '65vw' }}>
                <div className="modal-content p-0">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Ticket Status</h1>
                    <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { setsSowTicketActivity(0) }}><i className="bi bi-x-octagon"></i></button>
                  </div>
                  <div className="modal-body p-0">
                    <div className="row">
                      <div className="col-12">
                        <div className="med-box">
                          <div className="row">
                            {/* {ticketActivityList && ticketActivityList.map((value,index)=>{
                                          return(
                                            <div>
                                              <span><i class="fa fa-check-circle" aria-hidden="true"></i></span>
                                            </div>
                                          )
                                        })} */}
                            <div className="col-12">
                              <div className="d-flex py-4">
                                {ticketActivityList && ticketActivityList.map((value, index) => {
                                  return (
                                    <>
                                      <div className="order-tracking completed">
                                        <span className="is-complete"></span>
                                        {index === 0 ?
                                            <p>Ticket Generated<br /><span>{value.ticketcreatedDate}</span><br /><span>Ticket Assign To : &nbsp;{value.tickettransferTo}</span></p>
                                          : <p>Ticket Transfer<br /><span >{value.ticketTransferDate}</span><br /><span class="ng-binding">Ticket Assign To : &nbsp;{value.tickettransferTo}</span></p>
                                        }
                                      </div>
                                      {ticketActivityList.length -1 === index && value.ticketcloseDate === null ?
                                        <div class="order-tracking" style={{opacity: '40%'}}>
                                          <span class="is-complete"></span>
                                          <p>Ticket Closed</p>
                                        </div>
                                        : ticketActivityList.length -1 === index && value.ticketcloseDate !== null ?
                                         <div class="order-tracking">
                                            <span class="is-complete"></span>
                                            <p style={{color:'#000'}}>Ticket Closed<br /><span>{value.ticketcloseDate}</span><br /><span>Ticket Close By : &nbsp;{value.ticketclosedBy}</span></p>
                                        </div> :''
                                        }
                                    </>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div> : ""}
        </div>
        {
          showLoder === 1 ? <Loader val={showLoder} /> : ""
        }
        {/* Toaster */}
        {
          isShowToaster === 1 ?
            <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
        }

        {
          showAlertToster === 1 ?
            <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
        }
      </section>
    </>
  )
}