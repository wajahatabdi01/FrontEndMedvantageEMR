import React from "react";
import Page from "../../assets/images/icons/Page-1.svg";
import user3 from "../../assets/images/icons/user (3).svg";
import question from "../../assets/images/icons/question.svg";
import category from "../../assets/images/icons/category.svg";
import medicalAssistance from "../../assets/images/icons/medical-assistance.svg";
import medicalRoom from "../../assets/images/icons/medical-room.svg";
import imgDepartment from "../../assets/images/icons/imgDepartment.svg";
import imgBillNo from "../../assets/images/icons/imgBillNo.svg";
import PatientDetail from "../API/getPatientDetailByUhid";
import Search from "../../Code/Serach";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import { useState } from "react";
import { useEffect } from "react";
import SuccessToster from "../../Component/SuccessToster";
import AlertToster from "../../Component/AlertToster";
import PatientDetailforadvancepayment from "../API/PatientDetailforadvancepayment";
import GetAdvancePaymentList from "../API/GetAdvancePaymentList";
import PostAdvancePaymentDetails from "../API/POST/PostAdvancePaymentDetails";
import imgPrint from "../../assets/images/icons/imgPrint.svg";
import Heading from "../../Component/Heading";

export default function AdvancePayment() {

    const currentDate = new Date();
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

  let [UHID, setUHID] = useState('');
  let [patientDetails, setPatientDetails] = useState(1);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showSuccessToster, setShowSuccessToster] = useState(0)
  let [showMessage, setShowMeassage] = useState("");
  let [showPaymentDetails, setshowPaymentDetails] = useState(false);
  let [advancedpaid, setadvancedpaid] = useState('');
  let [advancedpaidBy, setadvancedpaidBy] = useState('');
  let [contactNo, setcontactNo] = useState('');
  let [remark, setremark] = useState('');
  let [FromDate, setFromDate] = useState(formatDate(currentDate));
  let [ToDate, setToDate] = useState(formatDate(currentDate));
  let [searchUHID, setsearchUHID] = useState('');
  let [AlertBorder, setAlertBorder] = useState(false);
  
  let [AdvancepaymentList, setAdvancepaymentList] = useState([]);
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);



  



  




  let handleUhidEvent = async (e) => {
let UHID = e.target.value
    setUHID(UHID);
    setAlertBorder(false)
  let data = await PatientDetailforadvancepayment(UHID);
  console.log('data' , data.responseValue)
  let dt = data.responseValue[0];
  setPatientDetails(dt); 
  setshowPaymentDetails(true)
   
  };

const handleOnChange=(e)=>{

  const inputValue = e.target.value;
  const isValidInput = /^[A-Za-z\s]+$/.test(inputValue);


    const {value,name} = e.target;
    if(name === 'advancedpaid'){
        setadvancedpaid(value)
        setAlertBorder(false)
    }
    else if(isValidInput || inputValue === ''){
        setAlertBorder(false)
        setadvancedpaidBy(inputValue)
    }
    else if(name === 'contactNo'){
        setAlertBorder(false)
        setcontactNo(value)
    }
    else if(isValidInput || inputValue === ''){
        setAlertBorder(false)
        setremark(inputValue)
    }
}

const handleOnReset=()=>{

  document.getElementById("Pgender").value = ""
  document.getElementById("PName").value = ""
  document.getElementById("PAge").value = ""
  document.getElementById("PWard").value = ""
  document.getElementById("Pdepartment").value = ""
  document.getElementById("UHID").value = ""
  
    setadvancedpaid('')
    setadvancedpaidBy('')
    setcontactNo('')
    setremark('')
    setshowPaymentDetails(false)
 

  
}

const handleOnsubmit=async()=>{

    let data = await PatientDetailforadvancepayment(UHID);
    if(UHID.trim() === ""){
        setAlertBorder(true)
        setShowAlertToster(1)
        setShowMeassage("UHID is required..!!")
        return;
    }
    else if (data.status === 0){
        setShowAlertToster(1)
        setShowMeassage("UHID is not Valid...!!")
        return;
    }
    else if(advancedpaid == ''){
        setAlertBorder(true)
        setShowAlertToster(1)
        setShowMeassage("Please Enter Advance Amount..!!")
        return;
    }
     if(advancedpaidBy.trim() == ''){
        setAlertBorder(true)
        setShowAlertToster(1)
        setShowMeassage("Please Enter Advance Paid By..!!")
     
    }
    else if(contactNo == ''){
        setAlertBorder(true)
        setShowAlertToster(1)
        setShowMeassage("Please Enter Contact Number..!!")
        return;
    }
    else if(contactNo.length  !== 10){
        setAlertBorder(true)
        setShowAlertToster(1)
        setShowMeassage("Please Enter valid Contact Number..!!")
        return;
    }
else{
    const obj = {
        uhid : UHID,
        advanceLimit : advancedpaid,
        advanceSumitedBy  : advancedpaidBy,
        contactNo : contactNo,
        remark : remark,
        userID : userID
     }

     console.log('obj' , obj)
 let data = await PostAdvancePaymentDetails(obj)
 if(data.status === 1){
    setShowSuccessToster(1)
    setShowMeassage(`Advance Paid Successfully for ${UHID}`)
    GetAdvancedPaymentList()
    handleOnReset()
    document.getElementById("Pgender").value = ""
    document.getElementById("PName").value = ""
    document.getElementById("PAge").value = ""
    document.getElementById("PWard").value = ""
    document.getElementById("Pdepartment").value = ""
    document.getElementById("UHID").value = ""
 }
}


}


const handleDateChange = (e)=>{
    const {name , value} = e.target

    if(name === "FromDate"){
        setFromDate(value)
    }
    else if (name === "ToDate"){
        setToDate(value)
    }
    else if (name === "searchUHID"){
        setsearchUHID(value)
    }
    GetAdvancedPaymentList(FromDate,ToDate,searchUHID)
}
  

 const GetAdvancedPaymentList = async()=>{
    let advancepayment = await GetAdvancePaymentList(searchUHID,FromDate,ToDate)
    if(advancepayment.status === 1){
        setAdvancepaymentList(advancepayment.responseValue)
        console.log("advancepayment",advancepayment.responseValue)
    }
 }

 


 



  //*****saveDetails */

  




  //*******Print */
  let handlePrintBill = async (rowData) => {
    sessionStorage.setItem('AdvancePaymentData', JSON.stringify(rowData));
    console.log("rowData" , rowData)
  
  };


  useEffect(() => {
    GetAdvancedPaymentList()
  }, []);
  
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
         
            <div className="col-12">
              <div className="med-box">
                <div className="inner-content">
                  
                  <div className="row">
{/* 
                  <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 mb-3 mt-3">
                          <img src={Page} alt=''/>{" "}
                          <label for="UHID" class="form-label">
                            UHID <span class="starMandatory">*</span>
                          </label>
                          
                          <input
                            value={UHID}
                            type="text"
                            className={`form-control form-control-sm ms-2 ${AlertBorder && UHID == "" ? "border-danger" : ''}`}
                            id="UHID"
                            placeholder="Enter UHID"
                            name="UHID"
                            maxLength={11}
                            onChange={handleUhidEvent}
                          />
                      

                         
                        </div> */}

                        {patientDetails && (
                      <div className='fieldsett-in col-md-12'>
                <div className='fieldsett'>
                  <span className='fieldse'>UHID Details</span>
                  <div className="row">
              
                  <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                          <img src={Page} alt=''/>{" "}
                          <label for="UHID" class="form-label">
                            UHID <span class="starMandatory">*</span>
                          </label>
                         
                          <input
                            type="text"
                            class="form-control form-control-sm ms-2"
                            id="UHID"
                            placeholder="Enter UHID"
                            name="UHID"
                            maxLength={11}
                            onChange={handleUhidEvent}
                          />
                   
                         
                          </div>
       
                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 mt-1">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={user3} className='icnn' alt='' /><label htmlFor="FullName*" className="form-label">Patient Full Name</label>
                                </div>
                                  <input type="text" className="form-control form-control-sm" id="PName" name="donor" placeholder="Patient Name" value=  {patientDetails.patientName} disabled />
                                </div>
                              </div>
                              
                              <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 mt-1">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={category} className='icnn' alt='' /> <label htmlFor="gender" className="form-label">Gender</label>
                                </div>
                                <input type="text" className="form-control form-control-sm" id="Pgender" name="donor" placeholder="Patiet Gender" value=  {patientDetails.gender} disabled />
                         
                                  </div>
                                </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={question} className='icnn' alt='' /><label htmlFor="dob" className="form-label">Age <span className="starMandatory">*</span></label>
                                </div>
                                  
                                  <input type="text" className="form-control form-control-sm" id='PAge' name='regDate' value={patientDetails.age} disabled />
                                </div>
                              </div>
          
                              <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <div className="mb-2">
                                <div className='d-flex align-items-baseline'>
                                <img src={medicalRoom} className='icnn' alt='' /><label htmlFor="bloodGroup" className="form-label">Ward</label>
                                </div>
                                 
                                  <input type="text" className="form-control form-control-sm" id="PWard" value={patientDetails.wardName} name="ddlBloodGroup" placeholder="Ward" disabled />
                                </div>
                              </div>
          
                              <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <div className="mb-2">
                                <div className='d-flex align-items-baseline'>
                                <img src={imgDepartment} className='icnn' alt='' /><label htmlFor="identity" className="form-label">Department</label>
                                </div>
                                  <input type="text" value={patientDetails.departName} className="form-control form-control-sm" id="Pdepartment" name="ddlIdentityType" placeholder="Department" disabled />
                                </div>
                              </div>
                
                   
                   
                   
                 
    
                    
                    </div>

                   
                       
                                 {showPaymentDetails && (
                                    <div className="row">
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Advanced amount<span className="starMandatory">*</span></label>
                      <input  id="advancedpaid" value={advancedpaid} type="number" className="form-control form-control-sm"  name="advancedpaid" placeholder= "Fill Advance Paid" onChange={handleOnChange} />
                      <small id="errwarmingviewtime" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Advanced amount by<span className="starMandatory">*</span></label>
                      <input  id="advancedpaidBy" value={advancedpaidBy} type="text" className="form-control form-control-sm" name="advancedpaidBy" placeholder= "Enter Advance Paid by" onChange={handleOnChange} />
                      <small id="erradvancedpaidBy" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Contact Number<span className="starMandatory">*</span></label>
                      <input  id="contactNo" value={contactNo} type="number" className="form-control form-control-sm" name="contactNo" placeholder= "Enter Contact No." onChange={handleOnChange}/>
                      <small id="errcontactNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Remark<span className="starMandatory"></span></label>
                      <input  id="remark" value={remark} type="text" className="form-control form-control-sm" name="remark" placeholder= "Enter Remark" onChange={handleOnChange} />
                      <small id="errremark" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                            </div>
                                 )}
                                              <div className="rt-btns">
                    <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3 mt-3 rt-btns ">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick = {handleOnsubmit}><img src={saveButtonIcon} className='icnn' alt="" />Submit</button>
                       <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleOnReset}><img src={clearIcon} className='icnn' alt= ""/>Clear</button>
                      </div>

                     </div>
                  
                        </div>

                  </div>


            
                    )}

      
                      
              

                  

                          
                    
           
                  </div>
              
                 
                </div>
    
              </div>
              
            </div>
          </div>


        </div>
        {showAlertToster === 1 ? (
              <AlertToster message={showMessage} handle={setShowAlertToster} />
            ) : (
              ""
            )}
            {showSuccessToster === 1 ? (
              <SuccessToster
                message={showMessage}
                handle={setShowSuccessToster}
              />
            ) : (
              ""
            )}
  <div className="col-12 mt-3">
  <div className='handlser'>
              <Heading text="Advance Payment List"/>
                <div style={{ position: 'relative' , display : 'flex'}}>
                    
                <label  class="title me-2 mt-1" style={{fontSize: '12px'}}>From<span className="starMandatory">*</span></label>
                  <input type="date" name="FromDate" value={FromDate} className='form-control form-control-sm'  onChange={handleDateChange} />
                  <label htmlFor="Code" className="form-label title me-2 mt-1" style={{fontSize: '12px'}}>To<span className="starMandatory">*</span></label>
                  <input type="date" name="ToDate" value={ToDate} className='form-control form-control-sm'  onChange={handleDateChange} />
                  <input type="text" placeholder = "Search by UHID" name="searchUHID" value={searchUHID} className='form-control form-control-sm'  onChange={handleDateChange} />
                  <div className="ms-5">
                    <span className="tblsericon"><i class="fas fa-search" onClick={GetAdvancedPaymentList}></i></span>
                  </div>
                  
                 
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Name</th>
                      <th>Advance Paid Amount</th>
                      <th>Paid By</th>
                      <th>Contact Number</th>
                      <th>Remark</th>

                      <th></th>
                      {/* <th style={{ "width": "10%" }} className="text-center">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    
                    {AdvancepaymentList && AdvancepaymentList.map((data,ind)=>{
                        return(
                            <tr key={ind}>
                            <td className="text-center">{ind+1}</td>
                            <td>{data.uhid}</td>
                            <td>{data.advanceSumitedBy}</td>
                            <td>{data.advanceLimit}</td>
                            <td>{data.advanceSumitedBy}</td>
                            <td>{data.contactNo}</td>
                            <td>{data.remark}</td>
                            <td></td>
  
                            <td>
                              {/* <div className="action-button">
                                <div
                                  data-bs-toggle="tooltip"
                                  data-bs-title="Edit Row"
                                  data-bs-placement="bottom"
  
                                >
                                  <img src={imgPrint}  alt=''  onClick={() => handlePrintBill(data)} />
                                </div>
                                <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal">
                                </div>
                              </div> */}
                            </td>
                          </tr>
                        )
                    })}
                
                       
                      
                   
                  </tbody>
                </table>
              </div>
            </div>
            {showAlertToster === 1 ? (
              <AlertToster message={showMessage} handle={setShowAlertToster} />
            ) : (
              ""
            )}
            {showSuccessToster === 1 ? (
              <SuccessToster
                message={showMessage}
                handle={setShowSuccessToster}
              />
            ) : (
              ""
            )}
      </section>
    </>
  );
}
