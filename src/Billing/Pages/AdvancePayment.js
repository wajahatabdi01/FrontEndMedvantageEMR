import React from "react";
import active from "../../assets/images/icons/active.svg";
import hold from "../../assets/images/icons/hold.svg";
import imgPaymentMode from "../../assets/images/icons/imgPaymentMode.svg";
import imgCardNo from "../../assets/images/icons/imgCardNo.svg";
import imgBank from "../../assets/images/icons/imgBank.svg";
import imgCheque from "../../assets/images/icons/imgCheque.svg";
import imgRef from "../../assets/images/icons/imgRef.svg";
import imgBill from "../../assets/images/icons/imgBill.svg";
import imgCompany from "../../assets/images/icons/imgCompany.svg";
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
import UpdateAdvance from "../API/UpdateAdvance";
import PostAdvancePaymentDetails from "../API/POST/PostAdvancePaymentDetails";
import imgPrint from "../../assets/images/icons/imgPrint.svg";
import Heading from "../../Component/Heading";
import GetBankNameList from "../API/getBankNameList";
import getCompanyType from "../API/companyType";
import GetallPaymentMode from "../API/GetallPaymentMode";
import imgDiscount from "../../assets/images/icons/discount.svg";

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
  let [billType, setBillType] = useState([]);
  let [FromDate, setFromDate] = useState(formatDate(currentDate));
  let [ToDate, setToDate] = useState(formatDate(currentDate));
  let [searchUHID, setsearchUHID] = useState('');
  let [AlertBorder, setAlertBorder] = useState(false);
  const [rowID, setRowID] = useState("");
  let [byCard, setByCard] = useState();
  let [BankName, setBankName] = useState('');
  let [PaymentModeList, setPaymentModeList] = useState([]);
  let [pamentMode, setPaymentMode] = useState(0);
  let [refNo, setRefNo] = useState('');
  let [bankList, setBankList] = useState([])
  let [discountBy, setDiscountBy] = useState();
  let [companyType, setCompanyType] = useState([]);
  let [chequeNo, setchequeNo] = useState('');
   let [chequeDate, setchequeDate] = useState('') 
   let [insCardNo, setinsCardNo] = useState(0)
  let [AdvancepaymentList, setAdvancepaymentList] = useState([]);
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);



  



  




  let handleUhidEvent = async (e) => {

    
    let UHID = e.target.value.toUpperCase();
    setUHID(UHID);
    if(UHID.length !== 9){
      
      document.getElementById("Pgender").value = ""
      document.getElementById("PName").value = ""
      document.getElementById("PAge").value = ""
      document.getElementById("PWard").value = ""
      // document.getElementById("Pdepartment").value = ""
      document.getElementById("UHID").value = ""

      setPatientDetails([])
     }


else {
   
  setAlertBorder(false)
  let data = await PatientDetailforadvancepayment(UHID);
  console.log('data' , data.responseValue)
  let dt = data.responseValue[0];
  setPatientDetails(dt); 
  setshowPaymentDetails(true)
}

  


   
  };

const handleOnChange=(e)=>{

  const inputValue = e.target.value;
  const isValidInput = /^[A-Za-z\s]+$/.test(inputValue);


    const {value,name} = e.target;

    if(name === 'advancedpaid'){
        setadvancedpaid(value)
        setAlertBorder(false)
    }
    else if(name === 'advancedpaidBy'){
        setAlertBorder(false)
        setadvancedpaidBy(value)
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
  // document.getElementById("Pdepartment").value = ""
  document.getElementById("UHID").value = ""
  
    setadvancedpaid('')
    setadvancedpaidBy('')
    setcontactNo('')
    setremark('')
    setshowPaymentDetails(false)
    setPatientDetails([])
 

  
}

const handleOnsubmit=async()=>{
  if(UHID.trim() === ""){
    setAlertBorder(true)
    setShowAlertToster(1)
    setShowMeassage("UHID is required..!!")
    return;
}
  let Bycard = document.getElementById("byCard").value 
  let Bycheque = document.getElementById("chequeNo").value 
  let Online = document.getElementById("refNo").value 
  let Bank = document.getElementById("selectBank").value
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
        setShowMeassage("Please Enter Deposit Amount..!!")
        return;
    }
    else if(advancedpaid == 0){
        setAlertBorder(true)
        setShowAlertToster(1)
        setShowMeassage("Deposit Amount should not be 0")
        return;
    }
    else if(advancedpaid < 0){
        setAlertBorder(true)
        setShowAlertToster(1)
        setShowMeassage("Deposit Amount should not be in negative..!!")
        return;
    }
     if(advancedpaidBy.trim() == ''){
        setAlertBorder(true)
        setShowAlertToster(1)
        setShowMeassage("Please Enter Deposit Paid By..!!")
     
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
    else if (pamentMode == 0 ){
      setShowAlertToster(1)
      setShowMeassage("Please select Payment Mode..!!")
      return;
    }
    else if (pamentMode == 2 && Bycard === "" ){
      setShowAlertToster(1)
      setShowMeassage("Please Enter Card No..!!")
      return;
    }
    else if (pamentMode == 3  &&  BankName == ""  ){
      setShowAlertToster(1)
      setShowMeassage("Please Select bank and enter cheque No..!!")
      return;
    }
    else if (pamentMode == 3  &&  BankName !== '' && chequeNo === ''){
      setShowAlertToster(1)
      setShowMeassage("Please Enter cheque No..!!")
      return;
    }
    else if (pamentMode == 3  &&  BankName !== '' && chequeNo !== '' && chequeDate === '' ){
      setShowAlertToster(1)
      setShowMeassage("Please Select Cheque Date..!!")
      return;
    }
    else if (pamentMode == 4 && Online == "" ){
      setShowAlertToster(1)
      setShowMeassage("Please Enter Transaction ID..!!")
      return;
    }


else{
  let pname = patientDetails.patientName
  let pAge = patientDetails.age
  let pGender = patientDetails.gender

    const obj = {
        uhid : UHID,
        advanceLimit : advancedpaid,
        advanceSumitedBy  : advancedpaidBy,
        contactNo : contactNo,
        remark : remark,
        userID : userID,
        paymentModeId: pamentMode,
     
       
     }
    const objSession = {
        uhid : UHID,
        advanceLimit : advancedpaid,
        advanceSumitedBy  : advancedpaidBy,
        contactNo : contactNo,
        remark : remark,
        userID : userID,
        paymentModeId: pamentMode,
        paymentTransactionNumber: refNo,
          bankId: BankName,
         chequeNo: chequeNo,
         chequeDate : chequeDate,
        patientGender : pGender,
        patientAge : pAge,
        patientName : pname
        
   
     }
    
     console.log('obj' , obj)
 let data = await PostAdvancePaymentDetails(obj)
 window.sessionStorage.setItem("DepositAmountDetails", JSON.stringify(objSession))
 if(data.status === 1){
    setShowSuccessToster(1)
    setShowMeassage(`Deposit Amount Paid Successfully for ${UHID}`)
  
    window.sessionStorage.setItem("DepositAmountDetails", JSON.stringify(objSession))
    window.open("/depositamountprint/", "noopener,noreferrer");
    GetAdvancedPaymentList()
    handleOnReset()
    document.getElementById("Pgender").value = ""
    document.getElementById("PName").value = ""
    document.getElementById("PAge").value = ""
    document.getElementById("PWard").value = ""
    // document.getElementById("Pdepartment").value = ""
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


let HandlePaymentDetails = (e) => {
  if (e.target.name === "discountBy") {
    setDiscountBy(e.target.value);
  }
  if (e.target.name === "byCard") {
    setByCard(e.target.value);
  }
  if (e.target.name === "refNo") {
    setRefNo(e.target.value);
    document.getElementById("paymentModeRefNo").style.display = "block";
  }
  if(e.target.name === "bnkCardNo"){
    setinsCardNo(e.target.value);
  }
  if(e.target.name === "chequeNo"){
    setchequeNo(e.target.value);
  }
  if(e.target.name === "bankName"){
    setBankName(e.target.value);
  }
  if(e.target.name === "chequeDate"){
    setchequeDate(e.target.value);
  }   
};

let companyTypeList = async (e) => {
  let billtypeId = e.target.value;      
 var response = await getCompanyType(billtypeId);
setCompanyType(response.responseValue);

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

  const handleUpdateApproveCredit = async(index)=>{
    setRowID(index)
    let RowIndex = AdvancepaymentList[index]
  
      const obj = {
  id : RowIndex.id,
  limitStatus: 1,
      }
      console.log(obj)
      let approveCredt = await UpdateAdvance(obj)
      if (approveCredt.status === 1) {
        setShowSuccessToster(1)
        setShowMeassage("Advance Approved Successfully..!!");
        GetAdvancedPaymentList()
      }
  }

  const handleUpdateHoldCredit = async(index)=>{
    let RowIndex = AdvancepaymentList[index]
  
      const obj = {
    id : RowIndex.id,
    limitStatus: 2,
      }
      console.log(obj)
      let approveCredt = await UpdateAdvance(obj)
      if (approveCredt.status === 1) {
        setShowSuccessToster(1)
        
        setShowMeassage("Advacne Hold Successfully..!!")
        GetAdvancedPaymentList()
      }
  }

  let GetBankList = async () => {
    var response = await GetBankNameList();
    setBankList(response.responseValue);
    console.log("this is responsesss", response);
  };


  let handlePaymentMode = (e) => {
    let mode = e.target.value
    setPaymentMode(mode)
    if (mode == "0") {
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("bnkdetails").style.display = "none";
      document.getElementById("chequeDate").style.display = "none";
      document.getElementById("chequeNo").style.display = "none";
    } else if (mode === "1") {
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("bnkdetails").style.display = "none";
      document.getElementById("chequeDate").style.display = "none";
      document.getElementById("chequeNo").style.display = "none";
    } else if (mode === "2") {
 
      document.getElementById("paymentModeCard").style.display = "block";
      document.getElementById("chequeDate").style.display = "none";
      document.getElementById("chequeNo").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("bnkdetails").style.display = "none";
      document.getElementById("chequeDate").style.display = "none";
      document.getElementById("chequeNo").style.display = "none";
    } else if (mode === "3") {
      GetBankList();
      document.getElementById("bnkdetails").style.display = "block";
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("chequeDate").style.display = "block";
      document.getElementById("chequeNo").style.display = "block";
    } else if (mode === "4") {
      setPaymentMode(4);
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "block";
      document.getElementById("bnkdetails").style.display = "none";
      document.getElementById("chequeDate").style.display = "none";
      document.getElementById("chequeNo").style.display = "none";
    }
    console.log("payment Value" , mode)
  };

  let GetPaymentModes = async()=>{
    let PaymentMode = await GetallPaymentMode()
    if(PaymentMode.status === 1){
      setPaymentModeList(PaymentMode.responseValue)
      console.log("PaymentMode",PaymentMode.responseValue)
    }
  }

  useEffect(() => {
   
    GetAdvancedPaymentList()
    GetPaymentModes()
    GetBankList()

 
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
                  <span className='fieldse'>Patient Details</span>
                  <div className="row">
              
                  <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 mb-3">
                          <img src={Page} alt=''/>{" "}
                          <label for="UHID" class="form-label">
                            UHID <span class="starMandatory">*</span>
                          </label>
                         
                          <input
                            type="text"
                            class="form-control form-control-sm ms-2"
                            id="UHID"
                            value={UHID}
                            placeholder="UHID"
                            name="UHID"
                            maxLength={11}
                            onChange={handleUhidEvent}
                          />
                   
                         
                          </div>
       
                                <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3 mt-1">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={user3} className='icnn' alt='' /><label htmlFor="FullName*" className="form-label">Patient Name</label>
                                </div>
                                  <input type="text" className="form-control form-control-sm" id="PName" name="donor" placeholder="Patient Name" value=  {patientDetails.patientName} disabled />
                                </div>
                              </div>
                              
                              <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3 mt-1">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={category} className='icnn' alt='' /> <label htmlFor="gender" className="form-label">Gender</label>
                                </div>
                                <input type="text" className="form-control form-control-sm" id="Pgender" name="donor" placeholder="Gender" value=  {patientDetails.gender} disabled />
                         
                                  </div>
                                </div>

                               <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={question} className='icnn' alt='' /><label htmlFor="dob" className="form-label">Age <span className="starMandatory"></span></label>
                                </div>
                                  
                                  <input type="text" className="form-control form-control-sm" id='PAge' name='regDate' placeholder="Age" value={patientDetails.age} disabled />
                                </div>
                              </div>
          
                              <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                                <div className="mb-2">
                                <div className='d-flex align-items-baseline'>
                                <img src={medicalRoom} className='icnn' alt='' /><label htmlFor="bloodGroup" className="form-label">Ward</label>
                                </div>
                                 
                                  <input type="text" className="form-control form-control-sm" id="PWard" value={patientDetails.wardName} name="ddlBloodGroup" placeholder="Ward" disabled />
                                </div>
                              </div>
          
                              {/* <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                                <div className="mb-2">
                                <div className='d-flex align-items-baseline'>
                                <img src={imgDepartment} className='icnn' alt='' /><label htmlFor="identity" className="form-label">Doctor's Name</label>
                                </div>
                                  <input type="text" value={patientDetails.doctorName} className="form-control form-control-sm" id="Pdepartment" name="ddlIdentityType" placeholder="Doctor's Name" disabled />
                                </div>
                              </div> */}
                
                   
                   
                   
                 
    
                    
                    </div>

                   
                       
                                 {showPaymentDetails && (
                                    <div className="row ps-2">
                            <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Deposit Amount<span className="starMandatory">*</span></label>
                      <input  id="advancedpaid" value={advancedpaid} type="number" className="form-control form-control-sm"  name="advancedpaid" placeholder= "Deposit Amount" onChange={handleOnChange} />
                      <small id="errwarmingviewtime" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                        <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Deposit Amount Paid By<span className="starMandatory">*</span></label>
                      <input  id="advancedpaidBy" value={advancedpaidBy} type="text" className="form-control form-control-sm" name="advancedpaidBy" placeholder= "Deposit Paid By" onChange={handleOnChange} />
                      <small id="erradvancedpaidBy" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                        <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Contact No.<span className="starMandatory">*</span></label>
                      <input  id="contactNo" value={contactNo} type="number" className="form-control form-control-sm" name="contactNo" placeholder= "Contact No." onChange={handleOnChange}/>
                      <small id="errcontactNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    
                

                    <div class="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3" id="paymentModediv">
                    <label for="PaymentMode" class="form-label">
                      <img src={imgPaymentMode} alt=''/> Payment Mode{" "}
                      <span class="starMandatory">*</span>
                    </label>
                    <select id="Payment"  class="form-control form-control-sm" value={pamentMode} onChange={handlePaymentMode}  >
                      <option value="0" selected>Select Payment Mode</option>
                      {PaymentModeList && PaymentModeList.map((val,index)=>{
                        return (
                          <option key={index} value={val.id}>{val.paymentMethodName}</option>
                        )
                      })}
                    </select>
                  </div>

                  <div class="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3" id="paymentModeCard" style={{display : 'none'}}>
                    <label for="byCard" class="form-label">
                      <img src={imgCardNo}alt='' /> Transaction Number
                      <span class="starMandatory">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="byCard"
                      placeholder="Transaction No."
                      name="byCard"
                      onChange={HandlePaymentDetails}
                    />
                  </div>
                  <div class="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3" id="paymentModeRefNo" style={{display : 'none'}}>
                    <label for="byOnline" class="form-label">
                      <img src={imgCardNo} alt=''/> Ref No.
                      <span class="starMandatory">*</span>
                    </label>
                    <input
                    value={refNo}
                      type="text"
                      class="form-control form-control-sm"
                      id="refNo"
                      placeholder="Enter Ref. Number"
                      name="refNo"
                      onChange={HandlePaymentDetails}
                    />
                  </div>
                  <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3" id="bnkdetails" style={{display : 'none'}}>
                   
                    
                        <label for="bank" class="form-label">
                          <img src={imgBank}alt='' /> Bank
                          <span class="starMandatory">*</span>
                        </label>
                        <select value={BankName}  className="form-control form-control-sm" id="selectBank" name="bankName" onChange={HandlePaymentDetails}>
                          <option value="0">Select Bank</option>
                          {bankList &&
                            bankList.map((val, ind) => {
                              return (
                                <option key={ind} value={val.id}>{val.bankName}</option>
                              );
                            })}
                        </select>
                        {/* <input
                          type="text"
                          class="form-control form-control-sm"
                          id="bank"
                          placeholder="Enter Bank Name"
                          name="bank"
                          onChange={HandlePaymentDetails}
                        /> */}
                      </div>
                      <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3" id="chequeNo" style={{display : 'none'}}>
                        <label for="chequeNo" class="form-label">
                          <img src={imgCheque} alt=''/> Cheque No.
                          <span class="starMandatory">*</span>
                        </label>
                        <input
                        value={chequeNo}
                          type="text"
                          class="form-control form-control-sm"
                          id="chequeNo"
                          placeholder="Enter Cheque No."
                          name="chequeNo"
                          onChange={HandlePaymentDetails}
                        />
                      </div>
                      <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3" id="chequeDate" style={{display : 'none'}}>
                        <label for="chequeDate" class="form-label">
                          <img src={imgCheque} alt='' /> Cheque Date.
                          <span class="starMandatory">*</span>
                        </label>
                        <input
                        value={chequeDate}
                          type="date"
                          class="form-control form-control-sm"
                          id="chequeDate"
                          name="chequeDate"
                          min={new Date().toISOString().split('T')[0]}
                          onChange={HandlePaymentDetails}
                        />
                      </div>
               
            

                  <div className="container-fluid mb-2 p-0" id="crdBillDetails" style={{display : 'none'}}>
                    <div class="row">
                      <div className="col-md-4">
                        <label for="cardNo" class="form-label">
                          <img src={imgCardNo} alt=''/> Card No.
                          <span class="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          id="bnkCardNo"
                          placeholder="Transaction No."
                          name="bnkCardNo"
                          onChange={HandlePaymentDetails}
                        />
                      </div>
            
                    </div>
                  </div>

          


                  <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                        <label for="ddlPaymentType" class="form-label">Active / Hold Deposit Amount</label>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id="isCashlessSwitchCheck"/>
                          </div>
                    </div>

                        <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Remark<span className="starMandatory"></span></label>
                      <input  id="remark" value={remark} type="text" className="form-control form-control-sm" name="remark" placeholder= "Remark" onChange={handleOnChange} />
                      <small id="errremark" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                            </div>
                                 )}
                                              <div className="rt-btns">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mb-3 mt-3 rt-btns ">
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
  <div className="container-fluid col-12 mt-3">
  <div className="med-table-section" >
      <div className='handlser ps-2 mb-3'>
              <Heading text="Deposit Amount List"/>
                <div style={{ position: 'relative' , display : 'flex'}}>
                    
                <label  class="title me-2 mt-1" style={{fontSize: '12px'}}>From<span className="starMandatory"></span></label>
                  <input type="date" name="FromDate" value={FromDate} className='form-control form-control-sm p-0'  onChange={handleDateChange} />
                  <label htmlFor="Code" className="form-label title me-2 mt-1" style={{fontSize: '12px'}}>To<span className="starMandatory"></span></label>
                  <input type="date" name="ToDate" value={ToDate} className='form-control form-control-sm p-0'  onChange={handleDateChange} />
                  <input type="text" placeholder = "Search by UHID" name="searchUHID" value={searchUHID} className='form-control form-control-sm'  onChange={handleDateChange} />
                  <div className="ms-5">
                    <span className="tblsericon"><i class="fas fa-search" onClick={GetAdvancedPaymentList}></i></span>
                  </div>
                  
                 
                </div>
              </div>
  </div>

              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Deposit Amount Paid</th>
                      <th>Deposit Amount Paid By</th>
                      <th>Contact No.</th>
                      <th>Remark</th>
                      <th>Status</th>
                      <th className="text-center">Action</th>
                      {/* <th>Status</th> */}
                      {/* <th>Action</th> */}

                      <th></th>
                      {/* <th style={{ "width": "10%" }} className="text-center">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    
                    {AdvancepaymentList && AdvancepaymentList.map((data,index)=>{
                        return(
                            <tr key={index}>
                            <td className="text-center">{index+1}</td>
                            <td>{data.uhid}</td>
                            <td>{data.advanceLimit}</td>
                            <td>{data.advanceSumitedBy}</td>
                            <td>{data.contactNo}</td>
                            <td>{data.remark == '' ? '---' : data.remark }</td>
                            <td><span style={{width:"50px"}} className={`text-white d-block text-center rounded-1 p-1 ${data.limitStatus == 1 ? "bg-success" : 'bg-danger'} `}>{data.limitStatus === 1 ? 'Active' : 'Hold'}</span></td>

                            <td>
                            <div className="action-button">
                    <div className= {data.limitStatus == 2 ? 'd-block' : data.limitStatus == 1 ? 'd-none' : ''}
                      onClick={() => {handleUpdateApproveCredit(index);}}
                    >
                   <img src={active} alt='' title='Activate' />
                    </div>
                    <div className= {data.limitStatus == 1 ? 'd-block' : data.limitStatus == 2 ? 'd-none' : ''}><img src={hold} alt='' title='Hold'   onClick={() => {handleUpdateHoldCredit(index);}}/>
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
