import React, { useEffect, useState } from 'react';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loader from '../../Component/Loader';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import getAllTpaCompany from '../API/getAllTpaCompany';
import getPatientDetailByUhid from '../API/getPatientDetailByUhid';
import AlertToster from "../../Component/AlertToster";
import RelativeRelations from '../API/RelativeRelations';
import PostCashlessRequestForm from '../API/POST/PostCashlessRequestForm';
import SuccessToster from "../../Component/SuccessToster";

export default function CashlessRequestForm() {


    const [showUnderProcess, setShowUnderProcess] = useState(0);
    const [showToster, setShowToster] = useState(0);
    const [tosterMessage, setTosterMessage] = useState("");
    const [tosterValue, setTosterValue] = useState(0);
    const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showMessage, setShowMeassage] = useState("");
    const [showLoder, setShowLoder] = useState(0);
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
    const [CompanyName, setCompanyName] = useState('')
    const [RelationData, setRelationData] = useState([])
    let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
    let [showSuccessToster, setShowSuccessToster] = useState(0)
    




    const GetCompanyList =async()=>{
        let data = await getAllTpaCompany()
        if(data.status === 1){
          setTpaCompanyList(data.responseValue)
        }
      }

const GetRelation=async()=>{
    let data = await RelativeRelations()
    if(data.status === 1){
        setRelationData(data.responseValue)
        console.log("relation" , data.responseValue)
    }
}



      const hanldeOnChange = async (e)=>{
        const {name , value} = e.target
   

        if(name === "UHID"){
            setUHID(value)
            let data = await getPatientDetailByUhid(value , 0)

       
            if(data.status === 1){
             let dt = data.responseValue[0];
             setPatientDetail(dt)
             console.log("Details By UHID>>" ,data.responseValue)
            
            }
            setCompanyName(data.responseValue[0].insuranceCompanyId)
         
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


const handleOnSave = async ()=>{

if(UHID.trim()=== "" || UHID === undefined){
    setShowAlertToster(1)
    setShowMeassage("UHID is required")
    return
}


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

if(RelativeContact < 0 || RelativeContact.length !== 10){
    setShowAlertToster(1)
    setShowMeassage("Please Enter Valid Attending Relative Contact Number")
    return
}

if(Occupation.trim() === "" || Occupation === undefined){
    setShowAlertToster(1)
    setShowMeassage("Please Enter Patient Occupation")
    return
  
}
if(PolicyNumber === "" ){
    setShowAlertToster(1)
    setShowMeassage("Please Enter Patient Insurance Policy Number")
    return
  
}



// if(Employee.trim() === "" || Employee === undefined){
//     setShowAlertToster(1)
//     setTosterMessage("Please Enter Employee ID")
//     return
   
// }

if(IsYes === true && OtherCompany.trim() === "" ){
    setShowAlertToster(1)
    setShowMeassage("Please Enter Company Name")
  
}

const obj = {
    uhid: UHID,
    relationId: Relation,
    attendingRelative: RelativeName,
    attendingRelativeContact: RelativeContact,
    patientOccupation: Occupation,
    corporateName: Corporate,
    employeeId: Employee,
    anotherInsurance: OtherDetail,
    anotherInsuranceName: OtherCompany,
    tpaCompanyID: CompanyName,
    cardNo: PatientDetail.policyOrCardNumber,
    policyNo: PolicyNumber,
    isCashLess: 0,
    formStatus: 0,
    userId: userID

}
 console.log("rrrr" , obj)
let data = await PostCashlessRequestForm(obj)
if(data.status === 1){
    setShowSuccessToster(1)
    setShowMeassage("Data Saved Successfully!..!")
    window.sessionStorage.setItem('CashlessFormData',JSON.stringify(obj))
    window.open("/cashlessformprint/", "noopener,noreferrer");
    handleClear()
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


      useEffect(() => {
        GetCompanyList();
        GetRelation()
      
      }, [])

  return (
    <section className="main-content mt-5 pt-3">
            <div className="container-fluid">
                <div className="row">
                <div class="col-12"><div class="med-box  mb-1"><div class="title">Cashless Request Form</div></div></div>
                    <div className="col-12">
                        <div className="med-box">
        
                               <div className="inner-content">
                        
                                     <>
                                
                                     {PatientDetail && (
                                        <>

                                           <div className='fieldsett-in col-md-12'>
                                      <div className='fieldsett'>
                                       <span className='fieldse'>Patient Details</span>

                                  
                                        <div className='row'>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">Patient UHID<span className="starMandatory">*</span></label>
                                                <input type="text" maxLength={11} value = {UHID} className="form-control form-control-sm" name="UHID" onChange={hanldeOnChange} placeholder='UHID'/>
                                                <small id="errUHID" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>


                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">Patient Name<span className="starMandatory">*</span></label>
                                                <input type="text" id="pName" value={PatientDetail.patientName} className="form-control form-control-sm"  name="PatientName"  placeholder="Patient Name" disabled />
                                                <small id="errpatientName" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>


                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">Patient Age<span className="starMandatory">*</span></label>
                                                <input type="number" id="pAge" className="form-control form-control-sm"  value={PatientDetail.age} name="PatientAge"  placeholder="Patient Age" disabled />
                                                <small id="errpatientAge" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">Gender<span className="starMandatory">*</span></label>
                                                <input type="number" id="pGender" className="form-control form-control-sm" value={PatientDetail.gender} name="PatientGender"  placeholder="Gender" disabled />
                                                <small id="errGender" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">Patient Contact Number<span className="starMandatory">*</span></label>
                                                <input type="number" id="pContact" className="form-control form-control-sm" value={PatientDetail.mobileNo}  name="PatientContact"  placeholder="Patient Contact Number" disabled />
                                                <small id="errpatientContact" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">Current Address of Insured Patient<span className="starMandatory">*</span></label>
                                                <input type="text" id="paddress" className="form-control form-control-sm"  name="PatientAddress"  placeholder="Current Address of Insured Patient" disabled />
                                                <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">Attending relative Name<span className="starMandatory">*</span></label>
                                                <input type="text" className="form-control form-control-sm" value={RelativeName} name="relativeName"  placeholder="Attending relative Name" onChange={hanldeOnChange} />
                                                <small id="errRelativeName" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                           <label htmlFor="Code" className="form-label">Attending Relative Relation<span className="starMandatory">*</span></label>
                                                    <select  name ='Relation' value={Relation}  className="form-control form-control-sm" id="selectBank"   onChange={hanldeOnChange} >
                                                                   <option value="0">Select attending Relative Relation</option>

                                                   {RelationData && RelationData.map((val, ind) => {
                                                             return (

                                                                  <option key={ind} value={val.id}>{val.guardianRelationName}</option>

                                                                    )
                                                                        })}


                                                              </select>
                                                        </div>

                                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">Attending relative Contact Number<span className="starMandatory">*</span></label>
                                                <input type="number" className="form-control form-control-sm"  name="relativeContact" value={RelativeContact}  placeholder="Attending relative Contact Number"  onChange={hanldeOnChange} />
                                                <small id="errRelativeContact" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>
                                     


                                            
                                               </div>
                                   
                                          
                                        
                                     
                                                   </div>
                                            </div>


<div className='fieldsett-in col-md-12'>
<div className='fieldsett'>
 <span className='fieldse'>Insurance Details</span>
 <div className='row'>

      <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
      <label htmlFor="Code" className="form-label">Company Name<span className="starMandatory">*</span></label>
      <select  name ='CompanyName' value={CompanyName}  className="form-control form-control-sm" id="selectBank"   onChange={hanldeOnChange} >
    <option value="0">Insurance Company</option>

    {TpaCompanyList && TpaCompanyList.map((val, ind) => {
              return (

                   <option key={ind} value={val.id}>{val.companyname}</option>

                     )
                         })}


               </select>
         </div>


      <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Insured Card ID No<span className="starMandatory">*</span></label>
          <input type="number" id="pCard" value={PatientDetail.policyOrCardNumber} className="form-control form-control-sm"  name="PatientName"  placeholder="Insured Card ID No" disabled/>
          <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>


      <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Occupation of Patient<span className="starMandatory">*</span></label>
          <input type="text" className="form-control form-control-sm"     onChange={hanldeOnChange}  value={Occupation} name="Occupation"  placeholder="Occupation of Patient" />
          <small id="errOccupation" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

      <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Policy Number<span className="starMandatory">*</span></label>
          <input type="text" value={PolicyNumber} className="form-control form-control-sm"    onChange={hanldeOnChange}   name="PolicyNumber"  placeholder="Policy Number" />
          <small id="errPolicy" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

      <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Name of Corporate<span className="starMandatory"></span></label>
          <input type="text" value={Corporate} className="form-control form-control-sm"  name= "Corporate"    placeholder="Name of Corporate" onChange={hanldeOnChange}/>
          <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

      <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Employee ID<span className="starMandatory"></span></label>
          <input type="text" value={Employee} className="form-control form-control-sm"  name="Employee"      onChange={hanldeOnChange}  placeholder="Employee ID" />
          <small id="errEmployee" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

      <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 regularCheck">
      <label htmlFor="Code" className="form-label">Do you have another mediclaim/Helath Insurance?<span className="starMandatory">*</span></label>
      <div class="d-flex column-gap-3 mt-1 me-3"><label for="canRead" class="form-label">Yes<span class="starMandatory"></span></label><div class="form-check">
      <input id="ddaccessallowed" name="Yes" checked={IsYesChecked} class="form-check-input" type="checkbox"       onChange={hanldeOnChange} />
      </div>
      <div class="d-flex column-gap-3 me-3"><label for="canRead" class="form-label">No<span class="starMandatory"></span></label><div class="form-check">
      <input id="ddaccessallowed" name="No" checked={IsNoChecked} class="form-check-input"    onChange={hanldeOnChange} type="checkbox"  />
      </div>
      <small id="erraccessallowed" class="form-text text-danger" style={{display: "none"}}></small>
      </div>
      </div>
      </div>
   {IsYes === true?  (
      <>
           <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Other Insurance Company Name<span className="starMandatory">*</span></label>
          <input type="text" value={OtherCompany} className="form-control form-control-sm"  name="OtherCompany"  placeholder="Company Name" onChange={hanldeOnChange}/>
          <small id="errCompanyName" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>

           <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
          <label htmlFor="Code" className="form-label">Other Details(Optional)<span className="starMandatory"></span></label>
          <input type="text" value={OtherDetail} className="form-control form-control-sm"  name="OtherDetails"  placeholder="Other Details" onChange={hanldeOnChange} />
          <small id="errCardIDNo" className="form-text text-danger" style={{ display: 'none' }}></small>
      </div>
      </>
 
   ) : ''}
      



</div>

</div>
  </div>
  </>
                                     )}
                                  
                                     
                                     </>



                                 


                                            
                                       
                               </div>
                               <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                                                {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                    showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                        :
                                                        <div>
                                                            {isUpdateBtnShow !== true ? <>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleOnSave}><img src={saveButtonIcon} alt='' className='icnn' />Save</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} alt='' className='icnn' />Clear</button>
                                                            </> :
                                                                <>
                                                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" >Update</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1" >Cancel</button>
                                                                </>
                                                            }
                                                        </div>
                                                }
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

            {/* -----------------------Start Delete Modal Popup-------------------    */}

            {/* <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modalDelete">
                    <div className="modal-content">
                        <div className="modal-body modelbdy text-center">
                            <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                            <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                            <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                        </div>
                        <div className="modal-footer1 text-center">

                            <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                            <button type="button" className="btn-delete popBtnDelete" onClick={deleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* -----------------------End Delete Modal Popup---------------------  */}
            {
                showLoder === 1 ? <Loader val={showLoder} /> : ""
            }
        </section>
  )
}
