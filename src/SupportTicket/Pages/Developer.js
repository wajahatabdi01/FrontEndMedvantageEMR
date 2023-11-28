import React, { useEffect, useState } from "react";
import Loader from "../../Component/Loader";
import SuccessToster from "../../Component/SuccessToster";
import AlertToster from "../../Component/AlertToster";
import TableContainer from "../../Component/TableContainer";
import Heading from "../../Component/Heading";
import GetTicketListForDevelopers from "../Api/GetTicketListForDevelopers";
import GetStatusList from "../Api/GetStatusList";
import { Link } from "react-router-dom";

export function Developer(){
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
  let [supportTicketClientID, setsupportTicketClientID] = useState(37);
  let [showToster, setShowToster] = useState(0);
  let [showLoder, setShowLoder] = useState(0);
  let [isShowToaster, setisShowToaster] = useState(0);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showSuccessMsg, setShowSuccessMsg] = useState('');
  let [devTicketList, setDevTicketList] = useState([]);
  let [ticketStatusList,setTicketStatusList]=useState([]);
//   JS Code  Start Here
  const getTicketListForDevelopers = async()=>{
    setShowLoder(1);
    var obj = {
      // ClientId:supportTicketClientID,
      ClientId: 5,
      StatusId: 1,
      UserId: 10024
      // UserId:userID
    }
    console.log('obj', obj)
    const response = await GetTicketListForDevelopers(obj);
    console.log('response all ticket', response)
    if (response.status === 1) {
        setDevTicketList(response.responseValue)
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
    console.log('Status Res--->',response)
    if(response.status === 1){
      setTicketStatusList(response.responseValue)
    }
  }
  const getTicketListByFilter = async()=>{
    setShowLoder(1);
    const getValue= document.getElementById("ddlStatusFilter").value;
    let obj={
      ClientId:5,
      StatusId:parseInt(getValue),
      UserId:10024
    }
    console.log('filter obj',obj)
    const response = await GetTicketListForDevelopers(obj)
    if (response.status === 1) {
      setTicketStatusList(response.responseValue)
      setShowLoder(0);
    }
    else {
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(response.message);
    }
  }
  useEffect(()=>{
    getTicketListForDevelopers();
    getStatusList();
  },[]);
    return(
        <>
             <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <Heading text="Generate Ticket" />
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
                   {/* Use Map function To Bind Ticket List */}
                    {devTicketList && devTicketList.map((val, ind) => {
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
                              {/* <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleEdit(val) }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} />
                              </div>
                              <div><i class="fa fa-eye" aria-hidden="true" title="Cilck Here To Track Ticket" onClick={() => { handleTrackTicket(val) }}></i></div> */}
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
                        <button type="button" className="btn-delete popBtnDelete" onClick={'handleDelete'} data-bs-dismiss="modal">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

              </div>
            </div>
          </div>
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