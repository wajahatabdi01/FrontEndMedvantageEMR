import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Components/TosterUnderProcess';
import Toster from '../../Components/Toster';
import Loder from '../../Components/Loder';

import GetAllComplaintStatusMaster from "../API/ComplaintStatusMaster/GetAllComplaintStatusMaster";
import PostComplaintStatusMaster from "../API/Complaint Status Master/PostComplaintStatusMaster";
import GetAllComplaint from "../API/Complaint/GetAllComplaint";
import GetComplaintStatus from "../API/Complaint Status/GetComplaintStatus";
import GetAccessName from "../../Maintenance/API/Complaint/GetAccessName";
import PostComplaintStatus from "../API/ComplaintStatus/PostComplaintStatus";


export default function ComplaintStatus() {


  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [Complaint, setComplaint] = useState([]);
  const [UpdatedStatusDate, setUpdatedStatusDate] = useState("")
  const [ComplaintStatusID, setComplaintStatusID] = useState('')
  const [ComplaintStatusIDDropdown, setComplaintStatusIDDropdown] = useState([])
  const [ComplaintDropdown, setComplaintDropdown] = useState([])
  const [AllComplaintStatusTable, setAllComplaintStatusTable] = useState([])
  const [StatusUpdatedByDropdown, setStatusUpdatedByDropdown] = useState([])
  const [StatusUpdatedBy, setStatusUpdatedBy] = useState('')
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
  




  // The Code is  written By S Ayaz


  let Dropdowns = async ()=>{        
    let ComplaintStatusMaster = await GetAllComplaintStatusMaster();
    if (ComplaintStatusMaster.status === 1) {
    //    console.log("ComplaintStatusMaster", ComplaintStatusMaster.responseValue)
      setShowLoder(0);
      setComplaintStatusIDDropdown(ComplaintStatusMaster.responseValue);
    }

    let complaint = await GetAllComplaint()
    if(complaint.status ===1){
        setComplaintDropdown(complaint.responseValue)
        // console.log("Complaint", complaint.responseValue)
    }

let StatusUpdate = await GetAccessName()
if(StatusUpdate.status === 1){
    setStatusUpdatedByDropdown(StatusUpdate.responseValue)
    // console.log("StatusUpdate", StatusUpdate.responseValue)
}

  }





  let ComplaintStatus = async ()=>{
    let AllComplaintStatus = await GetComplaintStatus()
    if(AllComplaintStatus.status === 1){
        setAllComplaintStatusTable(AllComplaintStatus.responseValue)
        console.log("AllComplaintStatus",AllComplaintStatus)
    }
  }




  // POST API called for data saving


  const handleOnChange = (e) => {
    document.getElementById('errComplaint').style.display = 'none';
    document.getElementById('errComplaintStatus').style.display = 'none';
    document.getElementById('errUpdatedStatusDate').style.display = 'none';
    document.getElementById('errStatusUpdatedBy').style.display = 'none';
 


    const { name, value } = e.target;
    if (name === 'Complaint') {
      setComplaint(value);
    }
   else if (name === 'ComplaintStatusID') {
      setComplaintStatusID(value);
    }
   else if (name === 'UpdatedStatusDate') {
      setUpdatedStatusDate(value);
    }
   else if (name === 'StatusUpdatedBy') {
      setStatusUpdatedBy(value);
    }
  

  };

  const handleOnSave = async () => {
   

     if (Complaint.trim() === '' || Complaint === undefined) {
      document.getElementById('errComplaint').innerHTML = 'Please Select Complaint';
      document.getElementById('errComplaint').style.display = 'block';
      return;
    }
     else if (UpdatedStatusDate.trim() === '' || UpdatedStatusDate === undefined) {
      document.getElementById('errUpdatedStatusDate').innerHTML = 'Please Enter UpdatedStatusDate';
      document.getElementById('errUpdatedStatusDate').style.display = 'block';
      return;
    }
     else if (ComplaintStatusID.trim() === '' || UpdatedStatusDate === undefined) {
      document.getElementById('errComplaintStatus').innerHTML = 'Please Select errComplaint Status';
      document.getElementById('errComplaintStatus').style.display = 'block';
      return;
    }
     else if (StatusUpdatedBy.trim() === '' || StatusUpdatedBy === undefined) {
      document.getElementById('errStatusUpdatedBy').innerHTML = 'Please Select Status Updated By';
      document.getElementById('errStatusUpdatedBy').style.display = 'block';
      return;
    }
 
  
    const obj = {
        complaintID: Complaint,
        complaintStatusID: ComplaintStatusID,
        updatedStatusDate : UpdatedStatusDate,
        statusUpdatedBy: StatusUpdatedBy,
        userID: userID,
    };

    let data = await PostComplaintStatus(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      setTimeout(() => {
        setShowToster(0);
        handleClear();
        ComplaintStatus()
      }, 2000);
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(1);
      setTosterMessage("Already Exist!");
      setTosterMessage(data.responseValue);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };


  const handleClear = () => {
  //  console.log('clear')
  document.getElementById('errComplaint').style.display = 'none';
  document.getElementById('errComplaintStatus').style.display = 'none';
  document.getElementById('errUpdatedStatusDate').style.display = 'none';

  document.getElementById('errStatusUpdatedBy').style.display = 'none';
  
   
  setComplaint("")
  setComplaintStatusID('')
setUpdatedStatusDate('')
setStatusUpdatedBy('')
  setUpdatedStatusDate("")

  };


//   const edit = (ComplaintStatusMaster) => {
//     setRowID(ComplaintStatusMaster.id)
//     setIsUpdateBtnShow(true);
//     setComplaint(ComplaintStatusMaster.statusTitle)
//     setComplaintStatusID()
//     setUpdatedStatusDate(ComplaintStatusMaster.remark)
 
  

//   }

//   const handleUpdate = async () => {

//     let userid = window.userId;

 
//     if (StatusTitle.trim() === '' || StatusTitle === undefined) {
//       document.getElementById('errcomplaintTitle').innerHTML = 'Please Complaint Title';
//       document.getElementById('errcomplaintTitle').style.display = 'block';
//       return;
//     }
//      else if (UpdatedStatusDate.trim() === '' || UpdatedStatusDate === undefined) {
//       document.getElementById('errUpdatedStatusDate').innerHTML = 'Please Enter UpdatedStatusDate';
//       document.getElementById('errUpdatedStatusDate').style.display = 'block';
//       return;
//     }
 
  
//     const obj = {
//         id: rowID,
//         statusTitle: StatusTitle,
//         remark: UpdatedStatusDate, 
//         userID: userid,
//     };

//     const data = await PutComplaintStatusMaster(obj);
//     if (data.status === 1) {
//       setShowUnderProcess(0);
//       setTosterValue(0);
//       setShowToster(1);
//       setTosterMessage('Data Updated Successfully!');
//       setTimeout(() => {
//         setShowToster(0);
//         handleClear()
//         GetComplaintStatus()

//       }, 2000);
//       setIsUpdateBtnShow(false);
//     } else {
//       setShowUnderProcess(0);
//       setShowToster(1);
//       setTosterMessage(data.responseValue);
//       setTosterValue(1);
//       setTimeout(() => {
//         setShowToster(0);
//       }, 2000);
//     }
//   };
  const handleCancel = () => {
    handleClear()
    setIsUpdateBtnShow(false);

  };

//   const deleteRow = async () => {
//      setShowUnderProcess(1);
//       let userID = window.userID
//       const obj = {
//       id: rowID,
//       userId: userID
//     }

//     let data = await DeleteComplaintStatusMaster(obj);
//     if (data.status === 1) {
//       setShowUnderProcess(0);
//       setTosterValue(0);
//       setShowToster(1);
//       setTosterMessage("Data Deleted Successfully!!");
//       console.log('success')
//       setTimeout(() => {
//         setShowToster(0);
//         handleClear()
//         GetComplaintStatus()
//       }, 1000)
//     }
//     else {
//       setShowUnderProcess(0)
//       setShowToster(0)
//       setTosterMessage(data.responseValue)
//       setTosterValue(1)
//       setTimeout(() => {
//         setShowToster(0);
//       }, 2000)
//     }
//   };

  useEffect(() => {
    Dropdowns()
    ComplaintStatus()
   
    
  }, []);


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title"> Complaint Status
                </div>
                <div className="inner-content">
                  <div className='row'>
                    <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                      <div className="d-flex flex-wrap align-content-end">

                     
                      <div className="col-md-12 col-sm-12 col-xs-12 mb-3 me-2" style={{ width: '200px' }}>
                          <label htmlFor="ddlequipment" className="form-label">Complaint<span className="starMandatory">*</span></label>
                          <select value={Complaint} name="Complaint" className="form-select form-select-sm" id='Complaint' aria-label=".form-select-sm example" onChange={handleOnChange}>
                          <option>Select Complaint</option>
                            {ComplaintDropdown && ComplaintDropdown.map((val,index)=>{
                                return(
                                    <option key={index} value={val.id}>{val.complaintNumber}</option>
                                )
                            })}
                          </select>
                          <small id="errComplaint" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-12 col-sm-12 col-xs-12 mb-3 me-2" style={{ width: '200px' }}>
                          <label htmlFor="ddlequipment" className="form-label">Complaint Status<span className="starMandatory">*</span></label>
                          <select value={ComplaintStatusID} name="ComplaintStatusID" className="form-select form-select-sm" id='Complaint' aria-label=".form-select-sm example" onChange={handleOnChange}>
                          <option>Select Complaint Status</option>
                            {ComplaintStatusIDDropdown && ComplaintStatusIDDropdown.map((val,index)=>{
                                return(
                                    <option key={index} value={val.id}>{val.statusTitle}</option>
                                )
                            })}
                          </select>
                          <small id="errComplaintStatus" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 mb-3" style={{ width: '200px' }}>
                          <label htmlFor="ddlequipment" className="form-label">Status Updated By<span className="starMandatory">*</span></label>
                          <select value={StatusUpdatedBy} name="StatusUpdatedBy" className="form-select form-select-sm" id='Complaint' aria-label=".form-select-sm example" onChange={handleOnChange}>
                          <option>Select Status Updated By</option>
                            {StatusUpdatedByDropdown && StatusUpdatedByDropdown.map((val,index)=>{
                                return(
                                    <option key={index} value={val.id}>{val.name}</option>
                                )
                            })}
                          </select>
                          <small id="errStatusUpdatedBy" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2 mx-2">
                          <label htmlFor="Code" className="form-label">Updated Status Date <span className="starMandatory">*</span></label>
                          <input value={UpdatedStatusDate} id="UpdatedStatusDate" type="datetime-local" className="form-control form-control-sm" name="UpdatedStatusDate" placeholder="Enter Remark" onChange={handleOnChange} />
                          <small id="errUpdatedStatusDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                  
                    
                     
                        <div className="mb-2 relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-1" onClick={handleOnSave}  >Save</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}  >Clear</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-1">Update</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancel} >Cancel</button>
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


            {/* table is made using getAllItemMaster API and mapped the data   */}


            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Complaint</th>
                      <th>Complaint Status</th>
                      <th>Complaint Status Updated By</th>
                      <th>Complaint Updated Date</th>
                      <th></th>
                    
                       <th></th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AllComplaintStatusTable && AllComplaintStatusTable.map((data, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{data.complaintID}</td>
                        <td>{data.complaintStatusID}</td>
                        <td>{data.statusUpdatedBy}</td>
                        <td>{data.updatedStatusDate}</td>
                      
                        <td></td>
                  
                      
                        <td></td>

                        <td>
                          <div className="action-button">
                            <div
                              data-bs-toggle="tooltip"
                              data-bs-title="Edit Row"
                              data-bs-placement="bottom"
                           
                            >
                              <i className="fa fa-edit actionedit"></i>
                            </div>
                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowID(data.id); }}></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                <div className='popDeleteTitle mt-3'> Delete?</div>
                <div className='popDeleteContent'> Are you sure you want to delete?</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal"onClick={handleCancel} >Cancel</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal"  >Delete</button>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loder val={showLoder} /> : ""
        }
      </section>
    </>

  )
}


