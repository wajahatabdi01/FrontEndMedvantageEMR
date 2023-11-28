import React from 'react'
import { useState, useEffect } from 'react'
import GetAllComplaint from '../API/Complaint/GetAllComplaint'
import PostComplaintReply from "../API/ComplaintChart/PostComplaintReply";
import Loder from '../../Component/Loader'
import Toster from '../../Component/Toster';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import commenticon from '../../assets/images/icons/commenticon.png';
import Send from '../../assets/images/icons/send.png';
import Ellipse from '../../assets/images/icons/Ellipse.png';
import Cross from '../../assets/images/icons/Cross.png';
import GetRespondentDepartment from '../API/ComplaintRespondent/GetRespondentDepartment'
import ReadUnreadComplaint from '../API/ComplaintChart/ReadUnreadComplaint';
import TransferComplaint from '../API/ComplaintChart/TransferComplaint';
import GetComplaintChartReply from '../API/ComplaintChart/GetComplaintChartReply';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";



export default function ComplaintChart() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [ComplaintChartTable, setComplaintChartTable] = useState([])
  const [showLoder, setShowLoder] = useState(0);
  const [selectDepartmentTable, setSelectDepartmentTable] = useState([])
  const [selectDepartment, setselectDepartment] = useState('')
  const [showReply, setShowReply] = useState(false);
  const [showTransfer, setshowTransfer] = useState(false)
  const [ComplaintDetails, setComplaintDetails] = useState('')
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [ComplaintChartReply, setComplaintChartReply] = useState([])
  const [responseTextValues, setResponseTextValues] = useState({});
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);



  // Complaint Lists data

  let GetComplaintChart = async () => {
    let ComplaintChart = await GetAllComplaint();
    if (ComplaintChart.status === 1) {
      setComplaintChartTable(ComplaintChart.responseValue);
      // console.log("ComplaintList" , ComplaintChart.responseValue)
    }
  };


  let DepartmentMaster = async () => {
    let Department = await GetRespondentDepartment()
    if (Department.status === 1) {
      setSelectDepartmentTable(Department.responseValue)
    }
  }




  const handleRowClick = async (index) => {
    let clickedRow = ComplaintChartTable[index];
    let ID = clickedRow.id;
    setClickedRowIndex(index);

    let Complaintnumber = clickedRow.complaintNumber;
    const response = await ReadUnreadComplaint(ID, Complaintnumber);
    const ComplaintReplydata = await GetComplaintChartReply(ID, ID);
    if (response.status === 1 || ComplaintReplydata.status === 1) {
      setComplaintChartReply(ComplaintReplydata.responseValue);
      console.log('obj', clickedRow.id, clickedRow.complaintNumber);
      GetComplaintChart()

    }
  };

  const handleOnchange = (e) => {
   
    const { name, value } = e.target;
    if (name === 'select department') {
      setselectDepartment(value)
    
    }
    else if (name === 'ComplaintText') {
      setComplaintDetails(value)
      document.getElementById("errComplaintreply").style.display = "none"
    }

  }



  const handleReplyClick = () => {
    setshowTransfer(false)
    setShowReply(true);
    GetComplaintChart()
  };



  const handleTransferClick = () => {
    setShowReply(false);
    setshowTransfer(true)
  }

  const handleOnSend = async (index) => {
    if (ComplaintDetails === "") {
      document.getElementById("errComplaintreply").style.display = "block"
      document.getElementById("errComplaintreply").innerHTML = "Please Enter Complaint Reply"
    }
    const clickedRow = ComplaintChartTable[index];
    let ID = clickedRow.id
    const timeZoneOffsetInMinutes = 330;
    const currentDate = new Date(Date.now() + timeZoneOffsetInMinutes * 60 * 1000);
    const formattedDate = currentDate.toISOString();

    const obj = {
      complaintID: ID,
      responseBy: 17,
      responseTo: 32,
      responseText: ComplaintDetails,
      responseDate: formattedDate
    };

    const data = await PostComplaintReply(obj);

    if (data.status === 1) {
      const ComplaintReplydata = await GetComplaintChartReply(ID, ID);
      if (ComplaintReplydata.status === 1) {
        setComplaintChartReply(ComplaintReplydata.responseValue);
        setShowToster(1);
        setTosterValue(0);
        setTosterMessage("Data Saved Successfully!");
        GetComplaintChart()
      }
      setComplaintDetails('');

    } else {
      console.log('Error');
    }
  };


  const handleOnTransfer = async (index) => {
    const clickedRow = ComplaintChartTable[index]

    const currentDate = new Date();

    const obj = {
      complaintID: clickedRow.id,
      transferredBy: 17,
      transferredDepartmentID: selectDepartment,
      transferredDate: currentDate,
    }

    const data = await TransferComplaint(obj)
    if (data.status === 1) {
      console.log("obj Transfer", obj)
    }
  }


  useEffect(() => {
    GetComplaintChart();
    DepartmentMaster();


  }, [])




  return (
    <section className="main-content pt-3 mt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-2">
            <div className="med-box">
              <div class="title mx-2">{t("Complaint_Chart")}</div>
            </div>
          </div>


          <div className="col-12">
            <div className="med-box">
              <div class="title mx-2">{t("Complaint_List")}</div>
              <div className="med-table-section" style={{ height: '788px' }}>
                <table className="med-table border_ striped">
                  <thead>
                    <tr className='table-primary' style={{ color: 'black' }}>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Complaint_Number")}</th>
                      <th>{t("Complaint_Text")}</th>
                      <th>{t("Complaint_by")}</th>
                      <th>{t("Compliant_Status")}</th>
                      <th>{t("Respondent_Department")}</th>
                      <th>{t("Complaint_Raised_Time")}</th>
                      <th></th>
                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ComplaintChartTable && ComplaintChartTable.map((data, index) => {

                      return (
                        <tr
                          onClick={() => handleRowClick(index)}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.complaintNumber}</td>
                          <td>{data.complaintText}</td>
                          <td>{data.complaintBy}</td>
                          <td>{data.complaintStatus}</td>
                          <td>{data.respondentDepartMent}</td>

                          <td>
                            {(() => {
                              const dateTime = new Date(data.complaintRaisedTime);
                              const formattedDate = dateTime.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                              });
                              const formattedTime = dateTime.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                              }).toUpperCase();

                              return `${formattedDate} at ${formattedTime}`;
                            })()}
                          </td>

                          <td>

                          </td>
                          <td></td>


                          <td>
                            <div className="action-button">
                              <div>
                                {/* <i className="bi bi-book"style={{color: 'black',fontWeight: 'bolder'}}></i> */}
                                <span className={data.isRead === 1 ? "unreadColor" : "readColor"} title={data.isRead === 1 ? "Message Read" : "Message Unread"}><i class="fas fa-envelope fs-5" ></i></span>
                              </div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#removePopUp"><span title='Reply to complaint'><i class="bi bi-reply-fill" onClick={handleReplyClick} style={{ color: 'red' }} ></i></span>


                              </div>


                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="col-12 mt-4">

      </div>


      {/* -----------------------Start Delete Modal Popup-------------------    */}

      <div className="modal fade" id="removePopUp" data-bs-backdrop="static">
        <div className="modal-dialog modal-xl fitsize">
          <div className="modal-content p-0">
            <div className="header">
              <div className='d-flex header-title'>
                <img src={commenticon} className='ms-3 mt-1' alt='' /><span><h1 className="modal-title fs-5 text-white mx-3" id="exampleModalLabel">{t("Complaint_Reply")}</h1></span>
              </div>

              <button type="button" className="closeBtn me-3" data-bs-dismiss="modal" aria-label="Close" title="Close Window">
                <img className='closeImg' src={Cross} alt='' />
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">

                  <div className="row">
                    <div className='d-flex gap-2 mt-3'>
                      <button className={`headerbutton ms-4_ mx-2_ mt-3_ ${showReply ? 'header-button-active' : 'headerbutton'}`} onClick={handleReplyClick}>{t("Reply")}</button>
                      <button className={`headerbutton ms-4_ mx-2_ mt-3_ ${showTransfer ? 'header-button-active' : ''}`} onClick={handleTransferClick}>{t("Transfer")}</button>
                      <button className='headerbutton mx-2_ mt-3_' >{t("Approval")}</button>
                    </div>

                    {showTransfer && (
                      <>
                        <div className='ms-4_ mt-3 '>
                          <select value={selectDepartment} className='select' name='select department' onChange={handleOnchange}>
                            <option>{t("Select_Department")}</option>
                            {selectDepartmentTable && selectDepartmentTable.map((data, index) => {
                              return (
                                <option key={index} value={data.id}>{data.departmentName}</option>
                              )
                            })}
                          </select>
                          <button className='sendbtn mx-2 Approve-btn' onClick={() => handleOnTransfer(clickedRowIndex)}>{t("Transfer")}</button>
                        </div>

                      </>
                    )}





                    {showReply && (
                      <>
                        <div className='d-flex gap-1 align-items-center mt-4'>
                          <input className='ms-4_ user-comment' type='text' name="ComplaintText" value={ComplaintDetails} onChange={handleOnchange} />


                          <button className='sendbtn mx-2' onClick={() => handleOnSend(clickedRowIndex)}><img src={Send} className='mx-2' alt='' />{t("Send")}</button>
                        </div>

                        <small id="errComplaintreply" className="form-text text-danger" style={{ display: 'none' }}></small>

                        <div className='col-12' style={{ maxHeight: '500px', overflowY: 'auto' }}>

                          <div className='d-flex flex-column'>

                            {ComplaintChartReply && ComplaintChartReply.map((data, index) => {
                              return (
                                <>
                                  <div className='d-flex flex-column mt-2' key={index}>
                                    <div>
                                      <img src={Ellipse} className='' alt='alt' style={{ display: 'inline' }} />
                                    </div>
                                    <div className='profile'>{t("Aman_Sharma")}</div>
                                    <p className='paragraph'> {(() => {
                                      const dateTime = new Date(data.responseDate);
                                      const formattedDate = dateTime.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                      });
                                      const formattedTime = dateTime.toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                      }).toUpperCase();

                                      return `${formattedDate} at ${formattedTime}`;
                                    })()}</p>
                                    <div className='paragraph'>{data.responseText}</div>
                                    <div class="d-flex  column-gap-3 pb-2" style={{ borderBottom: " 1px solid rgba(128, 128, 128, 0.32)", width: '50vw' }}><div class="d-flex flex-column"></div></div>
                                  </div>
                                </>
                              );
                            })}


                          </div>



                        </div>


                      </>

                    )}

                  </div>
                  {/* <hr style={{width: '50vw'}}/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* -----------------------End Delete Modal Popup---------------------  */}
      {
        showLoder === 1 ? <Loder val={showLoder} /> : ""
      }


    </section>


  )
}
