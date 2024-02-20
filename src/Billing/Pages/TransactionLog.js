import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';

import Page from "../../assets/images/icons/Page-1.svg";
import AlertToster from "../../Component/AlertToster";
import GetTransactionLog from "../API/GetTransactionLog";

export default function TransactionLog() {


  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);

  let [showAlertToster, setShowAlertToster] = useState(0);
  const [rowUHID, setrowUHID] = useState("");
  const [creditAmount, setcreditAmount] = useState('');
  const [rowCompanyName, setrowCompanyName] = useState('');
  const [rowCardNo, setrowCardNo] = useState('')
  const [remark, setremark] = useState('')
  let [showMessage, setShowMeassage] = useState("");
  const [TransactionLogTable, setTransactionLogTable] = useState([])
  const [TransactionLogTablePayment, setTransactionLogTablePayment] = useState([])
  let [isShowCreditModel, setisShowCreditModel] = useState(0);

  const [UHID, setUHID] = useState('')

  const [creditlimit, setcreditlimit] = useState('')
  const [CreditLimitList, setCreditLimitList] = useState([]);

  
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);



const handleChange = (e)=>{
    const {name , value} = e.target
let uhid = e.target.value.toUpperCase()
    if(name === "UHID"){
        setUHID(uhid)
    }
}


  let GetTransactions = async () => {
    if(UHID.trim() === "" || UHID === undefined){
      setShowAlertToster(1)
      setShowMeassage('UHID is required..!!')
      return
    }
  let data = await GetTransactionLog(UHID)
   if(data.status === 1){
    setTransactionLogTable(data.responseValue)
    setTransactionLogTablePayment(data.responseValue1)
    console.log('Insurance Details',data.responseValue )
   }
 
  }

  let Transactions = async () => {
  
  let data = await GetTransactionLog()
   if(data.status === 1){
    setTransactionLogTable(data.responseValue)
    setTransactionLogTablePayment(data.responseValue1)
    console.log('Insurance Details',data.responseValue )
   }
 
  }

  const handleClear=()=>{
    setUHID('');
    Transactions()
  }


  // POST API called for data saving


 


 



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
    Transactions()
  }, []);

 
  return (
    <>
     <section className="main-content mt-5 pt-3">
     <div className="container-fluid">
          <div className="row ">
         
            <div className="col-12">
              <div className="med-box">
                <div className="inner-content">
                  <div className="row pe-2">

                  <div className='fieldsett-in col-md-6'>
                <div className='fieldsett'>
                  <span className='fieldse'>Transaction Log</span>
               <div className="row">
                   <div className="col-xxl-7 col-xl-6 col-lg-5 col-md-5 mb-3">
                  <img src={Page} alt=''/>{" "}
                          <label for="UHID" class="form-label">UHID <span class="starMandatory">*</span></label>
                          <input type="text" value={UHID} className="form-control form-control-sm"id="UHID" placeholder="Enter UHID"name="UHID" onChange={handleChange} />
                          </div>



                       <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-7 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick = {GetTransactions} ><i class="bi bi-search mx-2"></i>Search</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear} ><img src={clearIcon} className='icnn' alt="" />Clear</button>
                   
                     
                       
                            
                          </div>
                      }
                    </div>
</div>
           
                    </div>
                        </div>

                        <div className="col-md-6 mb-2 fieldsett mt-3">
  <span class="fieldse">Payment Details</span>

  <div className="med-table-section">
 <table className="med-table border_ striped mt-3">
  <thead>
    <tr>
      <th>Total Credit</th>
      <th>Total Debit</th>
      <th>Remaining Limit</th>
      <th>Payable Bills</th>
      <th>Paid bill</th>
      <th>Balance</th>
      <th>Total Paid</th>
    </tr>
  </thead>
  <tbody>

    {TransactionLogTablePayment && TransactionLogTablePayment.map((data,index)=>{
              return(
                <tr >
                <td>{data.totalCredit == "" ? '---' : data.totalCredit}</td>
                <td>{data.totalDebit == "" ? '---' : data.totalDebit}</td>
                <td>{data.remainingLimit == "" ? '---' : data.remainingLimit }</td>
                <td>{data.payablebills == "" ? '---' : data.payablebills}</td>
                <td>{data.paidbill == "" ? '---' : data.paidbill}</td>
                <td>{data.balance == "" ? '---' : data.balance}</td>
                <td>{data.totalPaid == "" ? '---' : data.totalPaid}</td>
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
              
           
           
           
            </div>
          </div>
          <div className="col-12 mt-3 px-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Bill Number</th>
                      <th>Credit</th>
                      <th>Open Amount</th>
                      <th>Transaction For</th>
                      <th>Debit / Credit</th>
                      <th>Paid Amount</th>
                      <th>Created Date</th>
                                </tr>
                  </thead>
                  <tbody>
                  
                
             {TransactionLogTable && TransactionLogTable.map((data,index)=>{
              return(
                <tr >
               <td className="text-center">{index + 1}</td>
                <td>{data.uhid}</td>
                <td>{data.billNo}</td>
                <td>{data.credit}</td>
                <td>{data.openAmount}</td>
                <td>{data.transactionForName}</td>
                <td>{data.totalReceived + " " +  `(${(data.transactionTypeName)})`}</td>
                <td>{data.totalPaidAmount}</td>
                <td>{data.currentDate}</td>
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
                                <input  type="number" id="amount" value={creditAmount} name="creditAmount" className="form-control form-control-sm mt-1"  />
                                </div>
                                
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code"  className="form-label">Remark<span className="starMandatory"></span></label>
                                <input  type="text" id="amount" value={remark} name="remark" className="form-control form-control-sm mt-1"  />
                                </div>

          

      

      

      </div>
      <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 mt-3">
      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 " ><img src={saveButtonIcon} className='icnn' alt="" />Submit</button>
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


 
{showAlertToster === 1 ? (
              <AlertToster message={showMessage} handle={setShowAlertToster} />
            ) : (
              ""
            )}

            </section>
    </>

  )
}


