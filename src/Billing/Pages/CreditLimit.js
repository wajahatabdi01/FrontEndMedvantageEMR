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

export default function CreditLimit() {
  const currentDate = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [rowUHID, setrowUHID] = useState("");
  const [creditAmount, setcreditAmount] = useState('');
  const [rowCompanyName, setrowCompanyName] = useState('');
  const [rowCardNo, setrowCardNo] = useState('')
  const [remark, setremark] = useState('')
  let [isShowCreditModel, setisShowCreditModel] = useState(0);

  const [UHID, setUHID] = useState('')

  const [creditlimit, setcreditlimit] = useState('')
  const [CreditLimitList, setCreditLimitList] = useState([]);
  let [FromDate, setFromDate] = useState(formatDate(currentDate));
  let [ToDate, setToDate] = useState(formatDate(currentDate));
  
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
  const {t} = useTranslation();



  // The Code is  written By S Ayaz


  let GetInsuranceDetails = async () => {
   let insuranceDetails = await GetAllinsuranceDetails(UHID)
   if(insuranceDetails.status === 1){
    setCreditLimitList(insuranceDetails.responseValue)
    console.log('Insurance Details',insuranceDetails.responseValue )
   }
 
  }


  // POST API called for data saving


  const handleOnChange = (e) => {
  const {name , value} = e.target
 
  if(name === "UHID"){
    setUHID(value)
  }

  if(name === "fromdate"){
   setFromDate(value)
  }

  if(name === "todate"){
setToDate(ToDate)
  }
  if(name === "creditAmount"){
    setcreditAmount(value)
  }
if(name === "remark"){
  setremark(value)
}
  };

  const handleOnSave = async (index,rowID) => {
    setRowID(index)
    let RowIndex = CreditLimitList[index]
  
 const obj = {
   uhid: rowUHID,
  issuanceDetailId: RowIndex.id,
  creditLimit: creditAmount,
  remark: remark,
  userID: userID
 }

 console.log("obj" , RowIndex)

    let data = await PostCreditLimit(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      setisShowCreditModel(0)
      GetInsuranceDetails()
     
    
      // handleClear();
      setTimeout(() => {
        setShowToster(0);
        
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

  const handleClear = async () => {
    setUHID('') 
    
    if(UHID === ''){
      GetInsuranceDetails(UHID)
    }
    
 

  };


const handleCrediRowClick=async(index)=>{
  let RowIndex = CreditLimitList[index]
  setisShowCreditModel(1)
  setrowUHID(RowIndex.uhid)
  setrowCompanyName(RowIndex.companyname)
  setrowCardNo(RowIndex.cardNo)
  console.log("Row" ,RowIndex)
}

  // const handleUpdate = async () => {




  //   if (ComplaintTitle.trim() === '' || ComplaintTitle === undefined) {
  //     document.getElementById('errcomplaintTitle').innerHTML = 'Please Complaint Category Title';
  //     document.getElementById('errcomplaintTitle').style.display = 'block';
  //     return;
  //   }



  //   const obj = {
  //     id: rowID,
  //     complaintTitle: ComplaintTitle,
  //     remark: Remarks,
  //     userID: userID,
  //   };

  //   const data = await PutComplaintCategoryMaster(obj);
  //   if (data.status === 1) {
  //     setShowUnderProcess(0);
  //     setTosterValue(0);
  //     setShowToster(1);
  //     setTosterMessage('Data Updated Successfully!');
  //     GetComplaintCategory()
  //     handleClear()
  //     setTimeout(() => {
  //       setShowToster(0);


  //     }, 2000);
  //     setIsUpdateBtnShow(false);
  //   } else {
  //     setShowUnderProcess(0);
  //     setShowToster(1);
  //     setTosterMessage(data.responseValue);
  //     setTosterValue(1);
  //     setTimeout(() => {
  //       setShowToster(0);
  //     }, 2000);
  //   }
  // };


  const deleteRow = async () => {
    // setShowUnderProcess(1);

    // const obj = {
    //   id: rowID,
    //   userId: userID
    // }

    // let data = await DeleteComplaintCategory(obj);
    // if (data.status === 1) {
    //   setShowUnderProcess(0);
    //   setTosterValue(0);
    //   setShowToster(1);
    //   setTosterMessage("Data Deleted Successfully!!");
    //   setisNewRowAdded(false)
    //   GetComplaintCategory()
    //   handleClear()
    //   console.log('success')
    //   setTimeout(() => {
    //     setShowToster(0);


    //   }, 1000)
    // }
    // else {
    //   setShowUnderProcess(0)
    //   setShowToster(0)
    //   setTosterMessage(data.responseValue)
    //   setTosterValue(1)
    //   setTimeout(() => {
    //     setShowToster(0);
    //   }, 2000)
    // }
  };

  useEffect(() => {
    GetInsuranceDetails()
  }, []);

  document.body.dir = i18n.dir();
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

                 
                      <div className='fieldsett-in col-md-12'>
                <div className='fieldsett'>
                  <span className='fieldse'>Add Credit Limit</span>


                  <div className="row">


                  <div className="col-xxl-2 col-xl-4 col-lg-4 col-md-6 mb-3">
                  <img src={Page} alt=''/>{" "}
                          <label for="UHID" class="form-label">UHID <span class="starMandatory"></span></label>
                          <input type="text" value={UHID} className="form-control form-control-sm"id="UHID" placeholder="Enter UHID"name="UHID" onChange={handleOnChange} />
                          </div>

                           
                          {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">From<span className="starMandatory">*</span></label>
                      <input value={FromDate} id="ddalarmtime" type="date" className="form-control form-control-sm" name="fromdate" onChange={handleOnChange} />
                     
                    </div> */}

                    {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">To<span className="starMandatory">*</span></label>
                      <input value={ToDate} id="ddwarningviewtime" type="date" className="form-control form-control-sm" name="todate" onChange={handleOnChange}/>
                    </div> */}

<div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick = {GetInsuranceDetails} ><i class="bi bi-search mx-2"></i>Search</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear} ><img src={clearIcon} className='icnn' />Clear</button>
                   
                     
                       
                            
                          </div>
                      }
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
     <div className="col-12 mt-3 inner-content">
  <div className='handlser'>
              <Heading text="Add Credit Limit"/>
               
              </div>
              <div className="med-table-section inner-content" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Company Name</th>
                      <th>Card Number</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {CreditLimitList && CreditLimitList.map((data,index)=>{
                        return(
                            <tr key={index}>
                            <td className="text-center">{index+1}</td>
                            <td>{data.uhid}</td>
                            <td>{data.companyname}</td>
                            <td>{data.cardNo}</td>
                        
          
  
                            <td>
                          
                              <div className="action-button">
                                <div
                                  data-bs-toggle="tooltip"
                                  data-bs-title="Edit Row"
                                  data-bs-placement="bottom"
                                >
                                  <img src={addcreditlimit}  alt='' onClick={()=>handleCrediRowClick(index)}/>
                                </div>
                                <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal">
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

            {isShowCreditModel === 1 ?


  <div className={`modal d-${isShowCreditModel === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">

<div className="modal-dialog modal-lg">

  <div className="modal-content p-0">

    <div className="modal-header">

      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Add Credit Limit</h1>

      <button type="button" className="btn-close_ btnModalClose"  title="Close Window" onClick={()=>{setisShowCreditModel(0)}}>

        <i className="bi bi-x-octagon"></i>

      </button>

    </div>
     
      <div className="modal-body p-0">

<div className="row">

  <div className="col-12">

    <div className="med-box">
      <div className="inner-content">

      <div className="row">     
                               <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code" className="form-label">UHID<span className="starMandatory"></span></label>
                                <input  type="text" id='rowUhid' value={rowUHID} className="form-control form-control-sm mt-1" disabled />
                                </div>
               
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md6 mb-3">
                                <label htmlFor="Code" className="form-label">Company Name<span className="starMandatory"></span></label>
                                <input id='company' type="text"  value={rowCompanyName} className="form-control form-control-sm mt-1"   disabled />
                                </div>
                          
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code" className="form-label">Policy Number<span className="starMandatory"></span></label>
                                <input  type="text" id='rowPolicyNo' value={rowCardNo} className="form-control form-control-sm mt-1"  disabled />
                                </div>
                              
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code"  className="form-label">Credit Amount<span className="starMandatory"></span></label>
                                <input  type="number" id="amount" value={creditAmount} name="creditAmount" className="form-control form-control-sm mt-1" onChange={handleOnChange} />
                                </div>
                                
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code"  className="form-label">Remark<span className="starMandatory"></span></label>
                                <input  type="text" id="amount" value={remark} name="remark" className="form-control form-control-sm mt-1" onChange={handleOnChange} />
                                </div>

          

      

      

      </div>
      <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 mt-3">
      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 " onClick={()=>handleOnSave(rowID)}><img src={saveButtonIcon} className='icnn' alt="" />Submit</button>
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
            </section>
    </>

  )
}


