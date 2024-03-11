import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import addcreditlimit from '../../assets/images/icons/addcreditlimit.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
import Heading from "../../Component/Heading"; 
import Page from "../../assets/images/icons/Page-1.svg";
import GetAllinsuranceDetails from "../API/GetAllinsuranceDetails";
import PostCreditLimit from "../API/POST/PostCreditLimit";
import view from '../../assets/images/icons/view.svg';
import GetAllCashlessFormList from "../API/GetAllCashlessFormList";
import active from "../../assets/images/icons/active.svg";
import hold from "../../assets/images/icons/hold.svg";
import PatientDetail from "../API/getPatientDetailByUhid";
import ApproveCreditLimit from "../API/ApproveCreditLimit";
import SuccessToster from "../../Component/SuccessToster";

export default function ApproveRejectCashlessform() {
    const [list, setlist] = useState([])
    const [isShowPreviewModal, setisShowPreviewModal] = useState(0)
    const [rowUHID, setrowUHID] = useState("");
    const [RelativeName, setRelativeName] = useState('')
    const [RelativeContact, setRelativeContact] = useState('')
    const [Occupation, setOccupation] = useState('')
    const [PolicyNumber, setPolicyNumber] = useState('')
    const [Corporate, setCorporate] = useState('')
    const [CreditLimt, setCreditLimt] = useState('')
    const [Employee, setEmployee] = useState('')
    const [OtherCompany, setOtherCompany] = useState('')
    const [OtherDetail, setOtherDetail] = useState('')
    const [Relation, setRelation] = useState('')
    const [PatientName, setPatientName] = useState('')
    const [CompanyName, setCompanyName] = useState('')
    const [remark, setremark] = useState('')
    const [mobileNo, setmobileNo] = useState('')
    const [Patientage, setPatientage] = useState('')
    const [rowCardNo, setrowCardNo] = useState('')
    const [gender, setgender] = useState('')
    const [RowID, setRowID] = useState(0)
    const [isShowRejectModal, setisShowRejectModal] = useState(0)
    const [IsShowApproveModal , setIsShowApproveModal] = useState(0)
    const [tpaCompany, settpaCompany] = useState(0)
    let [showMessage, setShowMeassage] = useState("");
    let [showSuccessToster, setShowSuccessToster] = useState(0)
    let [patientDetails, setPatientDetails] = useState([]);
    let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);


const GetApproveRejectList=async()=>{
    let data = await GetAllCashlessFormList()
    if(data.status === 1){
        setlist(data.responseValue)
        console.log("Data" ,data.responseValue)
    }
}


const handleOnChange = (e)=>{
  const {value , name } = e.target
  document.getElementById("errCreditLimit").style.display = 'none'

  if(name === 'creditLimit'){
    setCreditLimt(value)
    
  }
  if(name === 'remark'){
    setremark(value)
  }
}


const handleOpenPreview= async (index)=>{
    setisShowPreviewModal(1)
    let rowData = list[index]
   setrowUHID(rowData.uhid)
   setRelativeName(rowData.attendingRelative)
   setRelation(rowData.relationId)
   setRelativeContact(rowData.attendingRelativeContact)
   setCompanyName(rowData.companyname)
   setCorporate(rowData.corporateName)
   setEmployee(rowData.employeeId)
   setrowCardNo(rowData.cardNo)
   setPolicyNumber(rowData.policyNo)
   setOtherCompany(rowData.anotherInsuranceName)
   setOtherDetail(rowData.anotherInsuranceDetail)
   setOccupation(rowData.patientOccupation)
   settpaCompany(rowData.tpaCompanyID)
   setRowID(rowData.id)
     console.log("rowData" ,rowData)


     let data = await PatientDetail(rowData.uhid, 0);
     let dt = data.responseValue[0];
     setPatientDetails(dt);
     console.log("Pateint Data>>>" ,dt )

     setPatientName(dt.patientName)
     setgender(dt.gender)
    setPatientage(dt.age)
    setmobileNo(dt.mobileNo)
}


const ConfirmApprove = async()=>{
  if(CreditLimt === "" || CreditLimt === undefined){
    document.getElementById("errCreditLimit").innerHTML = 'Please Enter Credit Limit'
    document.getElementById("errCreditLimit").style.display = 'block'
  }
  
 else{
 
  const obj = {
    id: RowID,
    uhid : rowUHID,
    tpaCompanyID: tpaCompany,
    cardNo: rowCardNo,
    policyNo : PolicyNumber,
    userID: userID,
    creditLimit: CreditLimt,
    currentStatus: 1,
    formStatus : 2,
    remark : remark
    
 
  }
  console.log("obj" , obj)
  let data = await ApproveCreditLimit(obj)
  if(data.status === 1){
    setisShowPreviewModal(0)
    setIsShowApproveModal(0)
    setShowSuccessToster(1)
    setShowMeassage("Request approved Successfully..!")
    GetApproveRejectList()
  }
 }
}


const ConfirmReject =async()=>{

  const obj = {
    id: RowID,
    uhid : rowUHID,
    tpaCompanyID: tpaCompany,
    cardNo: rowCardNo,
    policyNo : PolicyNumber,
    userID: userID,
    currentStatus: 0,
    formStatus : 4,
    remark : remark
  }

  console.log("obj" , obj)
  let data = await ApproveCreditLimit(obj)
  if(data.status === 1){
    setisShowPreviewModal(0)
    setisShowRejectModal(0)
    setShowSuccessToster(1)
    setShowMeassage("Cashless Request Rejected Successfully..!")
    GetApproveRejectList()
 
 }
}


const RejectIsCashless=()=>{
  setisShowRejectModal(1)
}

const ApproveCashless=()=>{
  if(CreditLimt === "" || CreditLimt === undefined){
    document.getElementById("errCreditLimit").innerHTML = 'Please Enter Credit Limit'
    document.getElementById("errCreditLimit").style.display = 'block'
  }
  else{
    setIsShowApproveModal(1)
  }
  
}


useEffect(() => {
    GetApproveRejectList()
}, [])

  return (
    <section className="main-content mt-5 pt-3">
   <div class="col-12 ps-2">
    <div class="med-box  mb-1">
      <div class="title">Approve Or Reject Cashless Requests</div>
      </div>
      </div>
     <div className="col-12 mt-3 px-2">
  <div className='handlser'>
              <Heading text="Requests List"/>
               
              </div>
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                  <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>UHID</th>
                                            <th>TPA Company</th>
                                            <th>Card Number</th>
                                            <th>Policy Number</th>
                                            <th>Attending Relative Relation</th>
                                            <th>Attending Relative </th>
                                            <th>Attending Relative Contact Number </th>
                                            <th>Patient Occupation</th>
                                            <th>Corporate Name</th>
                                            <th>Employee ID</th>
                                            <th>Form Status</th>
                                            <th  className="text-center">Action</th>
                                        </tr>
                  </thead>
                  <tbody>
                    
                    {list && list.map((list,index)=>{
                        return(
                            <tr>
                            <td className="text-center">{index + 1}</td>
                            <td>{list.uhid}</td>
                            <td>{list.tpaCompanyID}</td>
                            <td>{list.cardNo}</td>        
                            <td>{list.policyNo}</td>        
                            <td>{list.relationId}</td>
                            <td>{list.attendingRelative}</td>
                            <td>{list.attendingRelativeContact}</td>
                            <td>{list.patientOccupation == '' ? '---' : list.patientOccupation }</td>
                            <td>{list.corporateName == '' ? '---' : list.corporateName }</td>
                             <td>{list.employeeId == '' ? '---' : list.employeeId}</td>
                            <td>{list.formStatusLabel}</td>
                            <td>
                                <div className="action-button">
                                    <div><img src={view}  className='' alt='' onClick={()=>handleOpenPreview(index)}/>
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
     {isShowPreviewModal === 1 ?
  <div className={`modal d-${isShowPreviewModal === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">

<div className="modal-dialog modal-lg">

  <div className="modal-content p-0">

    <div className="modal-header">

      <h1 className=" modal-title text-white" id="exampleModalLabel">Approve or Reject Cashless Request </h1>

      <button type="button" className="btn-close_ btnModalClose"  title="Close Window" onClick={()=>{setisShowPreviewModal(0)}}>

        <i className="bi bi-x-octagon"></i>

      </button>

    </div>
     
      <div className="modal-body p-0">

<div className="row">

  <div className="col-12">

    <div className="med-box">
      <div className="inner-content">

      <div className="row">
      <div className='col-12'>
      <div className="med-table-section">
          <table className='table-certificate striped border'>
                    <tbody>
                    <h6 className="modal-table-heading">Patient Details</h6>
                        <tr>
                            <td className='fw-bold' style={{width : '281px'}}>UHID :</td>                           
                            <td className='value'>{rowUHID}</td>
                            <td className='fw-bold' style={{width: '193px'}}>Patient Name :</td>
                            <td className='value'>{PatientName}</td>
                        </tr>
                        <tr>
                        <td className='fw-bold'>Age :</td>
                            <td className='value'>{Patientage}</td>
                            <td className='fw-bold'>Gender :</td>
                            <td className='value'>{gender}</td>
                        </tr>
                     
                        <tr>
                            <td className='fw-bold'>Patient Mobile No :</td>
                            <td className='value'>{mobileNo}</td>
                            <td className='fw-bold'>Patient Occupation :</td>
                            <td className='value'>{Occupation}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Attending Relative:</td>
                            <td className='value'>{RelativeName}</td>
                            <td className='fw-bold'>Attending Relative Relations :</td>
                            <td className='value'>{Relation}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Attending Relative Contact Number:</td>
                            <td className='value'>{RelativeContact}</td>
                       
                        </tr>

                        <h6 className="mt-2">Patient Employement Details</h6>
                        <tr>
                            <td className='fw-bold'>Corporate Name :</td>
                            <td className='value'>{Corporate}</td> 
                            <td className='fw-bold'>Employee ID :</td>
                            <td className='value'>{Employee}</td>                          
                        </tr>



                        <h6 className="modal-table-heading mt-2">Patient Insurance Details</h6>
                        <tr>
                            <td className='fw-bold'>Company Name :</td>
                            <td className='value'>{CompanyName}</td> 
                            <td className='fw-bold'>Card Number :</td>
                            <td className='value'>{rowCardNo}</td>                          
                        </tr>
                        <tr>
                            <td className='fw-bold'>Policy Number :</td>
                            <td className='value'>{PolicyNumber}</td>                          
                        </tr>
                        <h6 className="modal-table-heading mt-2">Another Insurance Details</h6>
                        <tr>
                            <td className='fw-bold'>Company Name :</td>
                            <td className='value'>{OtherCompany ==  '' ? 'Not Eligible' : OtherCompany}</td> 
                            <td className='fw-bold'>Insurance Details :</td>
                            <td className=''>{OtherDetail === null ? 'Not Eligible' : OtherDetail}</td>                          
                        </tr>
                      

              
                        </tbody>
                    </table>
      </div>
    
                    <h6 className="modal-table-heading mt-2">Insurance Credit Limit</h6>


<div className="">
 <div className="inner-content">
 <div className='row'>


<div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
<label htmlFor="Code" className="form-label">Credit Limit<span className="starMandatory">*</span></label>
<input type="number" className="form-control form-control-sm" value={CreditLimt} name="creditLimit"  placeholder='Enter Credit Limit' onChange={handleOnChange}/>
<small id="errCreditLimit" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
<label htmlFor="Code" className="form-label">Remark<span className="starMandatory"></span></label>
<input type="text" className="form-control form-control-sm" value={remark} name="remark"  placeholder='Remark' onChange={handleOnChange}/>
<small id="remark" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>



</div>
</div>
</div>
                    <div className="action-button justify-content-end">
                                                            <div>
                                                           <button className="btn btn-primary fw-bold" onClick={ApproveCashless} style={{ background: '#1d4999' , color : 'white' , borderRadius : '2px',padding: '6px 22px'}}>Approve</button>
                                                            </div>
                                                            <div>
                                                           <button className="btn-delete popBtnDelete"  onClick={RejectIsCashless}>Reject</button>
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

</div> :''
}
  

{showSuccessToster === 1 ? (
              <SuccessToster
                message={showMessage}
                handle={setShowSuccessToster}
              />
            ) : (
              ""
            )}

      
{isShowRejectModal === 1 ?
          <div className={`modal d-${isShowRejectModal === 1 ? "block" : ''}`} id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modalInsuranceApprove">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i class="bi bi-exclamation" style={{fontSize: '70px'}}></i></div>
                <div className='popDeleteTitle mt-3'> Reject ?</div>
                <div className='popDeleteContent'> Are you sure you want to reject the cashless request ?</div>
              </div>
      
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={()=>setisShowRejectModal(0)}>Cancel</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={ConfirmReject}> Yes</button>
                
              </div>
            </div>
          </div>
        </div> : ''
       } 



{IsShowApproveModal === 1 ?
          <div className={`modal d-${IsShowApproveModal === 1 ? "block" : ''}`} id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modalInsuranceApprove">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i class="bi bi-exclamation" style={{fontSize: '70px'}}></i></div>
                <div className='popDeleteTitle mt-3'> Approve ?</div>
                <div className='popDeleteContent'>Are you sure you want to approve the cashless request ?</div>
              </div>
      
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={()=>setIsShowApproveModal(0)}>Cancel</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={ConfirmApprove}> Yes</button>
                
              </div>
            </div>
          </div>
        </div> : ''
       } 
            </section>
  )
}
