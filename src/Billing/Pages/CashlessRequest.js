import React,{ useEffect, useState } from 'react'
import Loder from '../../Component/Loader';
import Toster from '../../Component/Toster';
import view from '../../assets/images/icons/view.svg';
import active from "../../assets/images/icons/active.svg";
import fillform from "../../assets/images/icons/fillform.svg";
import rejected from "../../assets/images/icons/rejected.svg";
import hold from "../../assets/images/icons/hold.svg";
import GetCashlessRequestList from '../API/GetCashlessRequestList';
import UpdateCashlessRequest from '../API/UpdateCashlessRequest';
import SuccessToster from "../../Component/SuccessToster";
import AlertToster from "../../Component/AlertToster";
import getAllTpaCompany from '../API/getAllTpaCompany';
import PostCashlessRequestForm from '../API/POST/PostCashlessRequestForm';
import clearIcon from '../../assets/images/icons/clear.svg';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import RelativeRelations from '../API/RelativeRelations';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GetAllCashlessFormList from '../API/GetAllCashlessFormList';
import PatientDetailByHID from "../API/getPatientDetailByUhid";
import EditCashlessForm from '../API/EditCashlessForm';


export default function CashlessRequest() {


  const [showLoder, setShowLoder] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterValue, setTosterValue] = useState(0);
  const [cashlessReport, setcashlessReport] = useState([]);
  let [isShowApproveModal, setisShowApproveModal] = useState(0);
  let [rowIndex, setrowIndex] = useState(0);
  let [isShowRejectModal, setisShowRejectModal] = useState(0);
  const [rowUHID, setrowUHID] = useState("");
  const [IsYes, setIsYes] = useState(false);
  const [UHID, setUHID] = useState('');
  const [TpaCompanyList, setTpaCompanyList] = useState([])
  const [PatientDetail, setPatientDetail] = useState(1)
  const [RelativeName, setRelativeName] = useState('')
  const [RelativeContact, setRelativeContact] = useState('')
  const [Occupation, setOccupation] = useState('')
  const [PolicyNumber, setPolicyNumber] = useState('')
  const [Corporate, setCorporate] = useState('')
  const [Employee, setEmployee] = useState('')
  const [IsYesChecked, setIsYesChecked] = useState(false)
  const [IsNoChecked, setIsNoChecked] = useState(false)
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
  const [rowID, setrowID] = useState(0)
  const [rowCompanyName, setrowCompanyName] = useState('')
  const [RelationData, setRelationData] = useState([])
    let [showSuccessToster, setShowSuccessToster] = useState(0)
    let [showMessage, setShowMeassage] = useState("");
    let [showPreview, setshowPreview] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showForm, setShowForm] = useState(0);
    let [patientDetails, setPatientDetails] = useState([]);
    let [CashlessList, setCashlessList] = useState([]);
    let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
 

 const cashlessRequestList = async()=>{
    let data = await GetCashlessRequestList()
    if(data.status === 1){
        setcashlessReport(data.responseValue)
        console.log("List" , data.responseValue)
    }
 }


const GetCompanyList =async()=>{
  let data = await getAllTpaCompany()
  if(data.status === 1){
    setTpaCompanyList(data.responseValue)
  }
}

const handleOnChange = (e)=>{
  const {name , value} = e.target


  if(name === "remark"){
    setremark(value)
  }
  

  if(name === 'relativeName'){
    setRelativeName(value)
}
if(name === "relativeContact"){
    setRelativeContact(value)
}
if(name === "Occupation"){
    setOccupation(value)
}
if(name === "PolicyNumber"){
    setPolicyNumber(value)
}
if(name === "Corporate"){
    setCorporate(value)
}
if(name === "Employee"){
    setEmployee(value)
}
if (name === "Yes") {
    setIsYesChecked(true);
    setIsNoChecked(false);
    setIsYes(true)
   
  }
  if (name === "No") {
    setIsYesChecked(false);
    setIsNoChecked(true);
    setIsYes(false)
    setOtherCompany('')
    setOtherDetail('')
    

  }
  if(name === 'OtherCompany'){
    setOtherCompany(value)
  }
  if(name === "OtherDetail"){
    setOtherDetail(value)
  }
  if(name === "Relation"){
    setRelation(value)
  }
  if(name === "CompanyName"){
    setCompanyName(value)
  }
}
// const handleOpenApproveModal = (index)=>{
//   setisShowApproveModal(1)
//   setisShowRejectModal(0)
//   let rowData = cashlessReport[index]
//   setrowIndex(index)
//   setrowUHID(rowData.uhID)
//   setPatientName(rowData.patientName)
//   setrowCardNo(rowData.policyOrCardNumber)
//   setrowCompanyName(rowData.insuranceCompanyId)

  
// }


const handleFormModal= async(index)=>{
  setShowForm(1 )
  let rowData = cashlessReport[index]
  setrowIndex(index)
  setrowUHID(rowData.uhID)
 
  setCompanyName(rowData.insuranceCompanyId)
  setrowCardNo(rowData.policyOrCardNumber)
  
  let data = await PatientDetailByHID(rowData.uhID, 0);
  let dt = data.responseValue[0];
  setPatientDetails(dt);
  console.log("Pateint Data>>>" ,dt )

  setPatientName(dt.patientName)
  setPatientage(dt.age)
  setgender(dt.gender)
  setmobileNo(dt.mobileNo)
}

const handleCloseForm=()=>{
  setShowForm(0)
}
const handleClosePreviewForm=()=>{
  setshowPreview(0)

  setrowID(0)
  setrowUHID('')
  setCompanyName('')
  setrowCardNo('')
  
setRelation('')
setRelativeContact('')
setOccupation('')
setPolicyNumber('')
setCorporate('')
setEmployee('')
setRelativeName('')
setOtherCompany('')
setOtherDetail('')
}




const handleOpenRejectModal = (index)=>{
  setisShowRejectModal(1)
  let rowData = cashlessReport[index]
  setrowIndex(index)
  setrowUHID(rowData.uhID)
  setPatientName(rowData.patientName)
  setrowCardNo(rowData.policyOrCardNumber)
  setrowCompanyName(rowData.insuranceCompanyId)

  
}


const handleOnSave = async ()=>{


  
  if(RelativeName.trim() === '' || RelativeName === undefined){
      setShowAlertToster(1)
      setShowMeassage("Please Enter Attending Relative Name")
      return
  }
  
  
  if(Relation.trim() === '' || Relation === undefined){
      setShowAlertToster(1)
      setShowMeassage("Please Select Attending Relation")
      return
  }
  
  if(RelativeContact === '' || RelativeContact === undefined){
      setShowAlertToster(1)
      setShowMeassage("Please Enter Attending Relative Contact Number")
      return
    
  }
  if(CompanyName === '' || CompanyName === undefined || CompanyName == 'Insurance Company'){
      setShowAlertToster(1)
      setShowMeassage("Please Select Insurance Company")
      return
    
  }
  
  if(RelativeContact < 0 || RelativeContact.length !== 10){
      setShowAlertToster(1)
      setShowMeassage("Please Enter Valid Attending Relative Contact Number")
      return
  }

  
  // if(Occupation.trim() === "" || Occupation === undefined){
  //     setShowAlertToster(1)
  //     setShowMeassage("Please Enter Patient Occupation")
  //     return
    
  // }
  // if(PolicyNumber === "" ){
  //     setShowAlertToster(1)
  //     setShowMeassage("Please Enter Patient Insurance Policy Number")
  //     return
    
  // }
  
  
  
  // if(Employee.trim() === "" || Employee === undefined){
  //     setShowAlertToster(1)
  //     setTosterMessage("Please Enter Employee ID")
  //     return
     
  // }
  
  if(IsYesChecked === true && OtherCompany === "" ){
      setShowAlertToster(1)
      setShowMeassage("Please Enter Other Insurance Company Name")
     return
  }
  
  const obj = {
      
      uhid: rowUHID,
      relationId: Relation,
      attendingRelative: RelativeName,
      attendingRelativeContact: RelativeContact,
      patientOccupation: Occupation,
      corporateName: Corporate,
      employeeId: Employee,
      anotherInsurance: OtherDetail,
      anotherInsuranceName: OtherCompany,
      tpaCompanyID: CompanyName,
      cardNo: rowCardNo,
      policyNo: PolicyNumber,
      isCashLess: 0,
      formStatus: 0,
      userId: userID
  
  }

  const patientDetails = {
    uhid: rowUHID,
    relationId: Relation,
    attendingRelative: RelativeName,
    attendingRelativeContact: RelativeContact,
    patientOccupation: Occupation,
    corporateName: Corporate,
    employeeId: Employee,
    anotherInsurance: OtherDetail,
    anotherInsuranceName: OtherCompany,
    tpaCompanyID: CompanyName,
    cardNo: rowCardNo,
    policyNo: PolicyNumber,
    isCashLess: 0,
    formStatus: 0,
    userId: userID,
    patientName : PatientName,
    Gender : gender,
    age : Patientage,
    mpbile : mobileNo,

  }
   console.log("rrrr" , obj)
  let data = await PostCashlessRequestForm(obj)
  if(data.status === 1){
      setShowSuccessToster(1)
      setShowMeassage("Data Saved Successfully!..!")
      window.sessionStorage.setItem('CashlessFormData',JSON.stringify(patientDetails))
      window.open("/cashlessformprint/", "noopener,noreferrer");
      handleClear()
      setShowForm(0)
      cashlessRequestList()
      GetAllCashlessData()
  }
  
  }


  const handlePreviewForm =async(index)=>{
    setshowPreview(1);
    let rowData = CashlessList[index]
    setrowIndex(index)
    setrowID(rowData.id)
    setrowUHID(rowData.uhid)
    setCompanyName(rowData.tpaCompanyID)
    setrowCardNo(rowData.cardNo)
    
  setRelation(rowData.relationId)
  setRelativeContact(rowData.attendingRelativeContact)
  setOccupation(rowData.patientOccupation)
  setPolicyNumber(rowData.policyNo)
  setCorporate(rowData.corporateName)
  setEmployee(rowData.employeeId)
  setRelativeName(rowData.attendingRelative)
  setOtherCompany(rowData.anotherInsuranceName)
  setOtherDetail(rowData.anotherInsuranceDetail)
  
  console.log("rowID " ,rowData.id)
     
    let data = await PatientDetailByHID(rowData.uhid, 0);
    let dt = data.responseValue[0];
    setPatientDetails(dt);
    console.log("Pateint Data>>>" ,dt )
  
    setPatientName(dt.patientName)
    setPatientage(dt.age)
    setgender(dt.gender)
    setmobileNo(dt.mobileNo)
   }



const handleSaveEdit =async()=>{
  if(RelativeName.trim() === '' || RelativeName === undefined){
    setShowAlertToster(1)
    setShowMeassage("Please Enter Attending Relative Name")
    return
}


if(Relation === '' || Relation === undefined){
    setShowAlertToster(1)
    setShowMeassage("Please Select Attending Relation")
    return
}

if(RelativeContact === '' || RelativeContact === undefined){
    setShowAlertToster(1)
    setShowMeassage("Please Enter Attending Relative Contact Number")
    return
  
}

if(RelativeContact < 0 || RelativeContact.length !== 10){
    setShowAlertToster(1)
    setShowMeassage("Please Enter Valid Attending Relative Contact Number")
    return
}


if(IsYesChecked === true && OtherCompany === "" ){
  setShowAlertToster(1)
  setShowMeassage("Please Enter Other Insurance Company Name")
 return
}



const obj = {
  id: rowID,
  uhid: rowUHID,
  relationId: Relation,
  attendingRelative: RelativeName,
  attendingRelativeContact: RelativeContact,
  patientOccupation: Occupation,
  corporateName: Corporate,
  employeeId: Employee,
  anotherInsurance: OtherDetail,
  anotherInsuranceName: OtherCompany,
  tpaCompanyID: CompanyName,
  cardNo: rowCardNo,
  policyNo: PolicyNumber,
  isCashLess: 0,
  formStatus: 0,
  userId: userID

}
console.log("obj Edit" , obj)

let data = await EditCashlessForm(obj)
if(data.status === 1){
  setShowSuccessToster(1)
  setShowMeassage("Form Edited Successfully!..!")
  handleClear()
  setshowPreview(0)
  GetAllCashlessData()
}

}

  const handleClear =()=>{
    setUHID('');
    setRelation('')
    setRelativeName('')
    setRelativeContact('')
    setOccupation('')
    setPolicyNumber('')
    setCorporate('')
    setEmployee('')
    setIsYes(false)
    setIsYesChecked(false)
    setIsNoChecked(false)
    setOtherCompany('')
    setOtherDetail('')
    setCompanyName('')
    setPatientDetail([])
    document.getElementById("pName").value = ''
    document.getElementById("pAge").value = ''
    document.getElementById("pContact").value = ''
    document.getElementById("pGender").value = ''
    document.getElementById("paddress").value = ''
    document.getElementById("pCard").value = ''
}



 const RejectIsCashless = async(index)=>{
  let rowData = cashlessReport[index]

  console.log("rowData" , rowData)
  setrowIndex(index)
  setrowUHID(rowData.uhID)
  setPatientName(rowData.patientName)
  setPatientage(rowData.age)
  setgender(rowData.gender)
  setmobileNo(rowData.mobileNo)

 
  const obj ={ 
    id: rowData.id,
    uhid: rowData.uhID,
    isCashLess: 0,
    insuranceCompanyId: rowData.insuranceCompanyId,
    policyOrCardNumber: rowCardNo,
    remark : remark,

  }

  let data = await UpdateCashlessRequest(obj)
  setisShowRejectModal(0)
  if(data.status === 1){
    setShowSuccessToster(1)
    setShowMeassage("Cashless Request Rejected Successfully..!!");
    cashlessRequestList()
    setTimeout(() => {
      setShowSuccessToster(0)
    }, 2000);
 
  }
  

 }


 const GetRelation=async()=>{
  let data = await RelativeRelations()
  if(data.status === 1){
      setRelationData(data.responseValue)
      console.log("relation" , data.responseValue)
  }
}

 const handleCloseModal =()=>{
  setisShowApproveModal(0)
  setisShowRejectModal(0)
 }
 

 

 const GetAllCashlessData = async()=>{
  let data = await GetAllCashlessFormList()
  if(data.status === 1){
    setCashlessList(data.responseValue)
    console.log("CashlessList" , data.responseValue)
  }
 }




useEffect(() => {
    cashlessRequestList()
    GetCompanyList()
    GetRelation()
    GetAllCashlessData()
}, [])



  return (
   <>
    <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row px-2">
            
              <div className="med-box">
              
                <div className="inner-content">
        
                <div className='fieldsett-in col-md-12'>
                <div className="fieldsett">
                    <span className='fieldse'>Cashless Requests</span>
                    <div className="inner-content" >
                    <div className="med-table-section" >
                       <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Patient Name</th>
                      <th>Age</th>
                      <th>Mobile No.</th>
                      <th>Company Name</th>
                      <th>Is CashLess</th>
                      <th>Policy / Card Number</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>
     
                  <tbody>
                  
                
             {cashlessReport && cashlessReport.map((data,index)=>{
              return(
                <tr >
               <td className="text-center">{index + 1}</td>
                <td>{data.uhID }</td>
                <td>{data.patientName}</td>
                <td>{data.age}</td>
                <td>{data.mobileNo}</td>
                <td>{data.companyName}</td>
                <td>{data.isCashLess === 1 ? "Yes" : 'No'}</td>
                <td>{data.policyOrCardNumber}</td>
                <td>
                  <div className="action-button">
                    <div>
                   <img src={fillform} alt='' title='Fill Form' onClick={()=>handleFormModal(index)} />
                    </div>
                    <div><img src={rejected} alt='' onClick={()=>handleOpenRejectModal(index)} title='Reject'   />
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
          </div>


         
                            <div className="med-table-section mt-1" style={{ "height": "80vh" }}>
                                <table className="med-table border_ striped">
                                    <thead style={{zIndex: '0'}}>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>UHID</th>
                                            <th>TPA Company</th>
                                            <th>Card Number</th>
                                            <th>Policy Number</th>
                                            <th>Attending Relative Relation</th>
                                            <th>Attending Relative </th>
                                            <th>Attending Relative Contact No. </th>
                                            <th>Patient Occupation</th>
                                            <th>Corporate Name</th>
                                            <th>Employee ID</th>
                                            <th>Form Status</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {CashlessList && CashlessList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.uhid}</td>
                                                    <td>{list.tpaCompanyID}</td>
                                                    <td>{list.cardNo}</td>        
                                                    <td>{list.policyNo}</td>        
                                                    <td>{list.relationId}</td>
                                                    <td>{list.attendingRelative}</td>
                                                    <td>{list.attendingRelativeContact}</td>
                                                    <td>{list.patientOccupation == '' ? '---' : list.patientOccupation  }</td>
                                                    <td>{list.corporateName == '' ? '---' : list.corporateName }</td>
                                                    <td>{list.employeeId == '' ? '---' : list.employeeId}</td>
                                                    <td>{list.formStatusLabel}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div>
                                                            <img src={editBtnIcon} alt='' title='Edit Form' onClick={()=>handlePreviewForm(index)} />
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
    
        {/* -----------------------Start Delete Modal Popup-------------------    */}
       {/* {isShowApproveModal === 1 ?
          <div className={`modal d-${isShowApproveModal === 1 ? "block" : ''}`} id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modalInsuranceApprove">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i class="bi bi-exclamation" style={{fontSize: '70px'}}></i></div>
                <div className='popDeleteTitle mt-3'> Approve ?</div>
                <div className='popDeleteContent'> Do you want to Approve the request ?</div>
              </div>
              <div className="row modal-body modelbdy ">

                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 text-start fw-medium ">
                                <label htmlFor="Code" className="form-label">UHID<span className="starMandatory"></span></label>
                                <input  type="text" id='rowUhid' value={rowUHID}  className="form-control form-control-sm" disabled />
                                </div>


                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 text-start fw-medium">
                                <label htmlFor="Code"  className="form-label">Patient Name<span className="starMandatory"></span></label>
                                <input type="text" id="amount" value={PatientName} name="creditAmount" className="form-control form-control-sm"  disabled/>
                                </div>


                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md6 mb-3 text-start fw-medium">
                                <label htmlFor="Code" className="form-label">Company Name<span className="starMandatory"></span></label>
                                <select value= {rowCompanyName}  name ='company'  className="form-control form-control-sm" id="selectBank"  onChange={handleOnChange}>
                               <option value="0">Select Company</option>
                                  {TpaCompanyList && TpaCompanyList.map((val, ind) => {
                                      return (
                                          <option key={ind} value={val.id}>{val.companyname}</option>
                                           )
                                  })}
                        </select>
                                </div>
                          
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 text-start fw-medium">
                                <label htmlFor="Code" className="form-label">Policy No./Card No.<span className="starMandatory"></span></label>
                                <input  type="text" id='rowPolicyNo' value={rowCardNo} name='cardNo' className="form-control form-control-sm"  onChange={handleOnChange}   />
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 text-start fw-medium">
                                <label htmlFor="Code" className="form-label">Credit Limit<span className="starMandatory">*</span></label>
                                <input  type="number" id='CreditLimit' value={CreditLimit} placeholder='Enter Credit Limit'  className="form-control form-control-sm" name='CreditLimit' onChange={handleOnChange} />
                                <small id="errCreditLimit" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 text-start fw-medium">
                                <label htmlFor="Code" className="form-label">Remark<span className="starMandatory"></span></label>
                                <input  type="text" id='remrk' value={remark} placeholder='Enter Remark' className="form-control form-control-sm" name='remark'  onChange={handleOnChange} />
                                </div>
                              

                                
                      

      </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={handleCloseModal}>Cancel</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={()=>ApproveIsCashless(rowIndex)} > Yes</button>
                
              </div>
            </div>
          </div>
        </div> : ''
       }  */}



{showForm === 1 ? (
 <div className={`modal d-${showForm === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">
<div className="modal-dialog modal-xl">
  <div className="modal-content p-0">
    <div className="modal-header">
      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Cashless Request Form </h1>
      <button type="button" className="btn-close_ btnModalClose"  title="Close Window" >
        <i className="bi bi-x-octagon" onClick={handleCloseForm}></i>
      </button>
    </div>
      <div className="modal-body p-0">
<div className="row">
  <div className= "col-12">
<div className="med-box">
      <div className="inner-content">
<div className='row'>

<div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
    <label htmlFor="Code" className="form-label">UHID<span className="starMandatory"></span></label>
    <input type="text" maxLength={11} value = {rowUHID} className="form-control form-control-sm" name="UHID" disabled placeholder='UHID'/>
    <small id="errUHID" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>


<div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
    <label htmlFor="Code" className="form-label">Patient Name<span className="starMandatory"></span></label>
    <input type="text" id="pName" value={PatientName} className="form-control form-control-sm"  name="PatientName"  placeholder="Patient Name" disabled />
    <small id="errpatientName" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>


<div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
    <label htmlFor="Code" className="form-label">Age<span className="starMandatory"></span></label>
    <input type="number" id="pAge" className="form-control form-control-sm"  value={Patientage} name="PatientAge"  placeholder="Age" disabled />
    <small id="errpatientAge" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
    <label htmlFor="Code" className="form-label">Gender<span className="starMandatory"></span></label>
    <input type="text" id="pGender" className="form-control form-control-sm" value={gender} name="PatientGender"  placeholder="Gender" disabled />
    <small id="errGender" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
    <label htmlFor="Code" className="form-label">Contact No.<span className="starMandatory"></span></label>
    <input type="number" id="pContact" className="form-control form-control-sm" value={mobileNo}  name="PatientContact"  placeholder="Contact No." disabled />
    <small id="errpatientContact" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
    <label htmlFor="Code" className="form-label">Current Address of Patient<span className="starMandatory"></span></label>
    <input type="text" id="paddress" className="form-control form-control-sm"  name="PatientAddress"  placeholder="Current Address of Patient" disabled />
    <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
    <label htmlFor="Code" className="form-label">Attending Relative Name<span className="starMandatory">*</span></label>
    <input type="text" className="form-control form-control-sm" value={RelativeName} name="relativeName"  placeholder="Attending Relative Name" onChange={handleOnChange} />
    <small id="errRelativeName" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
<label htmlFor="Code" className="form-label">Attending Relative Relation<span className="starMandatory">*</span></label>
        <select  name ='Relation' value={Relation}  className="form-control form-control-sm" id="selectBank"   onChange={handleOnChange} >
                       <option value="0">Select Attending Relative Relation</option>

       {RelationData && RelationData.map((val, ind) => {
                 return (

                      <option key={ind} value={val.id}>{val.guardianRelationName}</option>

                        )
                            })}


                  </select>
            </div>

<div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
    <label htmlFor="Code" className="form-label">Attending Relative Contact No.<span className="starMandatory">*</span></label>
    <input type="number" className="form-control form-control-sm"  name="relativeContact" value={RelativeContact}  placeholder="Attending Relative Contact No."  onChange={handleOnChange} />
    <small id="errRelativeContact" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>




   </div>

</div>
</div>
</div>

  <div className="col-12">
    <div className="med-box">
      <div className="inner-content">
      <div className='row'>
     <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
      <label htmlFor="Code" className="form-label">Company Name<span className="starMandatory">*</span></label>
      <select  name ='CompanyName' value={CompanyName}  className="form-control form-control-sm" id="selectBank"   onChange={handleOnChange} >
   
    {TpaCompanyList && TpaCompanyList.map((val, ind) => {
              return (

                   <option key={ind} value={val.id}>{val.companyname}</option>

                     )
                         })}


               </select>
         </div>


      <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Insured ID Card No.<span className="starMandatory">*</span></label>
          <input type="text" id="pCard" value={rowCardNo} className="form-control form-control-sm"  name="PatientName"  placeholder="Insured ID Card No." disabled/>
          <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

      <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Policy Number<span className="starMandatory"></span></label>
          <input type="text" value={PolicyNumber} className="form-control form-control-sm"    onChange={handleOnChange}   name="PolicyNumber"  placeholder="Policy Number" />
          <small id="errPolicy" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>


      <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Occupation Of Patient<span className="starMandatory"></span></label>
          <input type="text" className="form-control form-control-sm"     onChange={handleOnChange}  value={Occupation} name="Occupation"  placeholder="Occupation Of Patient" />
          <small id="errOccupation" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

   

      <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Name Of Corporate<span className="starMandatory"></span></label>
          <input type="text" value={Corporate} className="form-control form-control-sm"  name= "Corporate"    placeholder="Name Of Corporate" onChange={handleOnChange}/>
          <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

      <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Employee ID<span className="starMandatory"></span></label>
          <input type="text" value={Employee} className="form-control form-control-sm"  name="Employee"      onChange={handleOnChange}  placeholder="Employee ID" />
          <small id="errEmployee" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

      <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3 regularCheck">
      <label htmlFor="Code" className="form-label">Do you have another Mediclaim/Health Insurance?<span className="starMandatory">*</span></label>
      <div class="d-flex column-gap-3 mt-1 me-3"><label for="canRead" class="form-label">Yes<span class="starMandatory"></span></label><div class="form-check">
      <input id="ddaccessallowed" name="Yes" checked={IsYesChecked} class="form-check-input" type="checkbox"       onChange={handleOnChange} />
      </div>
      <div class="d-flex column-gap-3 me-3"><label for="canRead" class="form-label">No<span class="starMandatory"></span></label><div class="form-check">
      <input id="ddaccessallowed" name="No" checked={IsNoChecked} class="form-check-input"    onChange={handleOnChange} type="checkbox"  />
      </div>
      <small id="erraccessallowed" class="form-text text-danger" style={{display: "none"}}></small>
      </div>
      </div>
      </div>
   {IsYes === true?  (
      <>
           <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Other Insurance Company Name<span className="starMandatory">*</span></label>
          <input type="text" value={OtherCompany} className="form-control form-control-sm"  name="OtherCompany"  placeholder="Other Insurance Company Name" onChange={handleOnChange}/>
          <small id="errCompanyName" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

           <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Other Details<span className="starMandatory"></span></label>
          <input type="text" value={OtherDetail} className="form-control form-control-sm"  name="OtherDetails"  placeholder="Other Details" onChange={handleOnChange} />
          <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>
      </>
 
   ) : ''}

</div>




      <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 mt-3">
      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 " onClick={handleOnSave}> Submit <img src={saveButtonIcon} className='icnn' alt="" /></button>
      <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} alt='' className='icnn' />Clear</button>
      </div>

    </div>

    </div>

  </div>

</div>

      </div>
      
   {/* ####### alert here ######## */}

   {showAlertToster === 1 ? (
              <AlertToster message={showMessage} handle={setShowAlertToster} />
            ) : (
              ""
            )}
{showToster === 1 ? <Toster value={tosterValue} message={showMessage} /> : (
              ""
            )}

   {/* ####### alert here ######## */}

  </div>

</div>

</div>  
) : ''}




{showPreview === 1 ? (
 <div className={`modal d-${showPreview === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">
 <div className="modal-dialog modal-xl">
   <div className="modal-content p-0">
     <div className="modal-header">
       <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Edit Cashless Request Form </h1>
       <button type="button" className="btn-close_ btnModalClose"  title="Close Window" >
         <i className="bi bi-x-octagon" onClick={handleClosePreviewForm}></i>
       </button>
     </div>
       <div className="modal-body p-0">
        <div className="med-box">
          <div className="inner-content">
          <div className='row'>
 
 <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
     <label htmlFor="Code" className="form-label">UHID<span className="starMandatory"></span></label>
     <input type="text" maxLength={11} value = {rowUHID} className="form-control form-control-sm" name="UHID" disabled placeholder='UHID'/>
     <small id="errUHID" className="form-text text-danger" style={{ display: 'none' }}></small>
 </div>
 
 
 <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
     <label htmlFor="Code" className="form-label">Patient Name<span className="starMandatory"></span></label>
     <input type="text" id="pName" value={PatientName} className="form-control form-control-sm"  name="PatientName"  placeholder="Patient Name" disabled />
     <small id="errpatientName" className="form-text text-danger" style={{ display: 'none' }}></small>
 </div>
 
 
 <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
     <label htmlFor="Code" className="form-label">Age<span className="starMandatory"></span></label>
     <input type="number" id="pAge" className="form-control form-control-sm"  value={Patientage} name="PatientAge"  placeholder="Age" disabled />
     <small id="errpatientAge" className="form-text text-danger" style={{ display: 'none' }}></small>
 </div>
 
 <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
     <label htmlFor="Code" className="form-label">Gender<span className="starMandatory"></span></label>
     <input type="text" id="pGender" className="form-control form-control-sm" value={gender} name="PatientGender"  placeholder="Gender" disabled />
     <small id="errGender" className="form-text text-danger" style={{ display: 'none' }}></small>
 </div>
 
 <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
     <label htmlFor="Code" className="form-label">Contact No.<span className="starMandatory"></span></label>
     <input type="number" id="pContact" className="form-control form-control-sm" value={mobileNo}  name="PatientContact"  placeholder="Contact No." disabled />
     <small id="errpatientContact" className="form-text text-danger" style={{ display: 'none' }}></small>
 </div>
 
 <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
     <label htmlFor="Code" className="form-label">Current Address Of Patient<span className="starMandatory"></span></label>
     <input type="text" id="paddress" className="form-control form-control-sm"  name="PatientAddress"  placeholder="Current Address Of Patient" disabled />
     <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
 </div>
 
 <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
     <label htmlFor="Code" className="form-label">Attending Relative name<span className="starMandatory">*</span></label>
     <input type="text" className="form-control form-control-sm" value={RelativeName} name="relativeName"  placeholder="Attending Relative Name" onChange={handleOnChange} />
     <small id="errRelativeName" className="form-text text-danger" style={{ display: 'none' }}></small>
 </div>
 <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
 <label htmlFor="Code" className="form-label">Attending Relative Relation<span className="starMandatory">*</span></label>
         <select  name ='Relation' value={Relation}  className="form-control form-control-sm" id="selectBank"   onChange={handleOnChange} >
                        <option value="0">Select Attending Relative Relation</option>
 
        {RelationData && RelationData.map((val, ind) => {
                  return (
 
                       <option key={ind} value={val.id}>{val.guardianRelationName}</option>
 
                         )
                             })}
 
 
                   </select>
             </div>
 
 <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
     <label htmlFor="Code" className="form-label">Attending Relative Contact No.<span className="starMandatory">*</span></label>
     <input type="number" className="form-control form-control-sm"  name="relativeContact" value={RelativeContact}  placeholder="Attending Relative Contact No."  onChange={handleOnChange} />
     <small id="errRelativeContact" className="form-text text-danger" style={{ display: 'none' }}></small>
 </div>
 
 
 
 
    </div>
          </div>
        </div>
 <div className="row">

   <div className="col-12">
     <div className="med-box">
       <div className="inner-content">
       <div className='row'>
      <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
       <label htmlFor="Code" className="form-label">Company Name<span className="starMandatory">*</span></label>
       <select  name ='CompanyName' value={CompanyName}  className="form-control form-control-sm" id="selectBank"   onChange={handleOnChange} >
   
 
     {TpaCompanyList && TpaCompanyList.map((val, ind) => {
               return (
 
                    <option key={ind} value={val.id}>{val.companyname}</option>
 
                      )
                          })}
 
 
                </select>
          </div>
 
 
       <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
           <label htmlFor="Code" className="form-label">Insured ID Card No.<span className="starMandatory"></span></label>
           <input type="text" id="pCard" value={rowCardNo} className="form-control form-control-sm"  name="PatientName"  placeholder="Insured ID Card No." disabled/>
           <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
       </div>
 
 
     
 
       <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
           <label htmlFor="Code" className="form-label">Policy Number<span className="starMandatory"></span></label>
           <input type="text" value={PolicyNumber} className="form-control form-control-sm"    onChange={handleOnChange}   name="PolicyNumber"  placeholder="Policy Number" />
           <small id="errPolicy" className="form-text text-danger" style={{ display: 'none' }}></small>
       </div>

       <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
           <label htmlFor="Code" className="form-label">Occupation Of Patient<span className="starMandatory"></span></label>
           <input type="text" className="form-control form-control-sm"     onChange={handleOnChange}  value={Occupation} name="Occupation"  placeholder="Occupation Of Patient" />
           <small id="errOccupation" className="form-text text-danger" style={{ display: 'none' }}></small>
       </div>
 
       <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
           <label htmlFor="Code" className="form-label">Name Of Corporate<span className="starMandatory"></span></label>
           <input type="text" value={Corporate} className="form-control form-control-sm"  name= "Corporate"    placeholder="Name Of Corporate" onChange={handleOnChange}/>
           <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
       </div>
 
       <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
           <label htmlFor="Code" className="form-label">Employee ID<span className="starMandatory"></span></label>
           <input type="text" value={Employee} className="form-control form-control-sm"  name="Employee"      onChange={handleOnChange}  placeholder="Employee ID" />
           <small id="errEmployee" className="form-text text-danger" style={{ display: 'none' }}></small>
       </div>
 
       <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3 regularCheck">
       <label htmlFor="Code" className="form-label">Do you have another Mediclaim/Health Insurance?<span className="starMandatory">*</span></label>
       <div class="d-flex column-gap-3 mt-1 me-3"><label for="canRead" class="form-label">Yes<span class="starMandatory"></span></label><div class="form-check">
       <input id="ddaccessallowed" name="Yes" checked={IsYesChecked} class="form-check-input" type="checkbox"       onChange={handleOnChange} />
       </div>
       <div class="d-flex column-gap-3 me-3"><label for="canRead" class="form-label">No<span class="starMandatory"></span></label><div class="form-check">
       <input id="ddaccessallowed" name="No" checked={IsNoChecked} class="form-check-input"    onChange={handleOnChange} type="checkbox"  />
       </div>
       <small id="erraccessallowed" class="form-text text-danger" style={{display: "none"}}></small>
       </div>
       </div>
       </div>
    {IsYes === true?  (
       <>
            <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
           <label htmlFor="Code" className="form-label">Other Insurance Company Name<span className="starMandatory">*</span></label>
           <input type="text" value={OtherCompany} className="form-control form-control-sm"  name="OtherCompany"  placeholder="Other Insurance Company Name" onChange={handleOnChange}/>
           <small id="errCompanyName" className="form-text text-danger" style={{ display: 'none' }}></small>
       </div>
 
            <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
           <label htmlFor="Code" className="form-label">Other Details<span className="starMandatory"></span></label>
           <input type="text" value={OtherDetail} className="form-control form-control-sm"  name="OtherDetails"  placeholder="Other Details" onChange={handleOnChange} />
           <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
       </div>
       </>
  
    ) : ''}
 
 </div>
 
 
 
 
       <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 mt-3">
       <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 " onClick={handleSaveEdit}> Save <img src={saveButtonIcon} className='icnn' alt="" /></button>
       <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} alt='' className='icnn' />Clear</button>
       </div>
 
     </div>
 
     </div>
 
   </div>
 
 </div>
 
       </div>
       
    {/* ####### alert here ######## */}
 
    {showAlertToster === 1 ? (
               <AlertToster message={showMessage} handle={setShowAlertToster} />
             ) : (
               ""
             )}
 {showToster === 1 ? <Toster value={tosterValue} message={showMessage} /> : (
               ""
             )}
 
    {/* ####### alert here ######## */}
 
   </div>
 
 </div>
 
 </div>  
) : ''}


       
       {isShowRejectModal === 1 ?
          <div className={`modal d-${isShowRejectModal === 1 ? "block" : ''}`} id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modalInsuranceApprove">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i class="bi bi-exclamation" style={{fontSize: '70px'}}></i></div>
                <div className='popDeleteTitle mt-3'> Reject ?</div>
                <div className='popDeleteContent'> Do you want to Reject the Cashless Request ?</div>
              </div>
              <div className="row modal-body modelbdy ">

                                <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 mb-3 text-start fw-medium ">
                                <label htmlFor="Code" className="form-label">UHID<span className="starMandatory"></span></label>
                                <input  type="text" id='rowUhid' value={rowUHID} placeholder='UHID' className="form-control form-control-sm" disabled />
                                </div>


                                <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 mb-3 text-start fw-medium">
                                <label htmlFor="Code"  className="form-label">Patient Name<span className="starMandatory"></span></label>
                                <input type="text" id="amount" value={PatientName} name="creditAmount" placeholder='Patient Name' className="form-control form-control-sm"  disabled/>
                                </div>


                                <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 mb-3 text-start fw-medium">
                                <label htmlFor="Code" className="form-label">Company Name<span className="starMandatory"></span></label>
                                <select value= {rowCompanyName}  name ='company'  className="form-control form-control-sm" id="selectBank"  onChange={handleOnChange}>
                              
                                  {TpaCompanyList && TpaCompanyList.map((val, ind) => {
                                      return (
                                          <option key={ind} value={val.id}>{val.companyname}</option>
                                           )
                                  })}
                        </select>
                                </div>
                          
                                <div className="col-xxl-6 col-xl-5 col-lg-5 col-md-6 mb-3 text-start fw-medium">
                                <label htmlFor="Code" className="form-label">Policy No./Card No.<span className="starMandatory"></span></label>
                                <input  type="text" id='rowPolicyNo' value={rowCardNo} name='cardNo' placeholder="Policy No./Card No." className="form-control form-control-sm"  onChange={handleOnChange}   />
                                </div>

                                <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-6 mb-3 text-start fw-medium">
                                <label htmlFor="Code" className="form-label">Remark<span className="starMandatory"></span></label>
                                <input  type="text" id='remrk' value={remark} placeholder='Remark' className="form-control form-control-sm" name='remark'  onChange={handleOnChange} />
                                </div>
                              

                                
                                {/* <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code"  className="form-label">Remark<span className="starMandatory"></span></label>
                                <input  type="text" id="amount" value={remark} name="remark" className="form-control form-control-sm mt-1" onChange={handleOnChange} />
                                </div> */}

      </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={handleCloseModal}>Cancel</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={()=>RejectIsCashless(rowIndex)} > Reject</button>
                
              </div>
            </div>
          </div>
        </div> : ''
       } 

      
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loder val={showLoder} /> : ""
        }

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
  )
}
