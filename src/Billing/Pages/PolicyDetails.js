import React,{ useEffect, useState } from 'react'
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import clearIcon from '../../assets/images/icons/clear.svg';
import claim from '../../assets/images/icons/claim.svg';
import claimtable from '../../assets/images/icons/claimtable.svg';
import view from '../../assets/images/icons/view.svg';
import GetAllPolicyList from '../API/GetAllPolicyList';
import GetPolicyBills from '../API/GetPolicyBills';
import getPatientDetailByUhid from '../API/getPatientDetailByUhid';
import PostClaimAmount from '../API/POST/PostClaimAmount';
import AlertToster from "../../Component/AlertToster";


export default function PolicyDetails() {
  const currentDate = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [showLoder, setShowLoder] = useState(0);
  
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterValue, setTosterValue] = useState(0);
  let [showMessage, setShowMeassage] = useState("");
  const [UHID, setUHID] = useState('');
  const [tosterMessage, setTosterMessage] = useState("");
  const [PolicyList, setpolicyList] = useState([]);
  let [isShowBillModel, setIsShowBillModel] = useState(0);
  let [showClaimModel, setshowClaimModel] = useState(0);
  const [allbills, setallbills] = useState([]);
  let [isShowBillItemsModel, setIsShowBillItemsModel] = useState(0);
  let [itmeDetailByBill, setItmeDetailByBill] = useState([]);
  const [billReport, setbillReport] = useState([]);
  const [billDetails, setbillDetails] = useState([]);
  const [rowUHID, setrowUHID] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  const [rowCompany, setrowCompany] = useState('');
  const [rowCompanyID, setrowCompanyID] = useState('');
  const [rowPolicyNo, setrowPolicyNo] = useState('');
  const [rowAmount, setrowAmount] = useState('');
  const [claimDate, setClaimDate] = useState(formatDate(currentDate));
  const [claimAmount, setclaimAmount] = useState('');
  const [issuancedetailsId, setissuancedetailsId] = useState('');
  const [Remark, setRemark] = useState('');
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

   
    if (name === 'uhid') {
      setUHID(value);
    }
    if (name === 'remark') {
      setRemark(value);
    }
    if (name === 'claimamount') {
      setclaimAmount(value);
    }
  }

  let GetPolicyList = async()=>{

    let PolicyLists = await GetAllPolicyList(UHID)
    if(PolicyLists.status===1){
      setpolicyList(PolicyLists.responseValue)
      console.log("GetPolicyList" , PolicyLists.responseValue)
    }
  }

  const ShowAllBills = async(index)=>{
    let IndexData = PolicyList[index]
    console.log('index', IndexData.uhid)
    let UHID  = IndexData.uhid
    let policyNo = IndexData.tpaReferenceNo
    let ShowBillList = await GetPolicyBills(UHID , policyNo)
    if(ShowBillList.status===1){
      let data = ShowBillList.responseValue;
      setallbills(data);
      setIsShowBillModel(1);
      console.log('setallbills', data[0])
    }
  }
  
  const ClaimPolicy = async(index)=>{
    let IndexData = PolicyList[index]
    setshowClaimModel(1);
    setissuancedetailsId(IndexData.issuancedetailsId)
    setrowUHID(IndexData.uhid)
    setrowCompany(IndexData.companyname)
    setrowCompanyID(IndexData.tpaCompanyID)
    setrowPolicyNo(IndexData.tpaReferenceNo)
    // setrowAmount(IndexData.totalAmountSumByTpaReferenceNo)
    setclaimAmount(IndexData.totaltotalBalanceSumByTpaReferenceNo)
    console.log('index', IndexData)
 
  }
  const ShowBillingDetails = async(index)=>{
    let IndexData = allbills[index]
    console.log('index', allbills[index])
    let UHID  = IndexData.uhid
    let BillNo = IndexData.billNo
    let ShowBillingDetails = await getPatientDetailByUhid(UHID , BillNo)
    if(ShowBillingDetails.status===1){
      let data = ShowBillingDetails.responseValue;
      setbillDetails(data[0]);
      let itemD = JSON.parse(data[0].itemDetails);
      console.log('itemD', itemD);
      setItmeDetailByBill(itemD);
      console.log("ShowBillingDetails" , ShowBillingDetails.responseValue)
      setIsShowBillItemsModel(1);
    }
  }

  const handleClear=()=>{
  
   setUHID('')
    
  }
  const handleClaim = async () => {


    let cliamAmount = document.getElementById('claimamount').value;
    //let amount = document.getElementById('amount').value;


    // if(cliamAmount > amount){
    //   document.getElementById('errClaimAmount').style.display = 'block'
    //   document.getElementById('errClaimAmount').innerHTML = 'Claim Amount should not be greater than Purchase amount'
    //   return
    // }


    // else{
      const obj = {

        userID : userID,
        uhid : rowUHID,
        issuancedetailsId:issuancedetailsId,
        tpaCompanyID : rowCompanyID,
        tpaReferenceNo :rowPolicyNo,
        amount : claimAmount,
        remark : Remark,
        claimDate : claimDate,
        isCashless : 0,
      }
      console.log('post' , obj)
      let data = await PostClaimAmount(obj)
      if(data.status === 1){
        console.log('post' , obj)
        setShowUnderProcess(0);
        setshowClaimModel(0);
        setShowToster(1);
        setTosterValue(0)
        setTosterMessage("Claimed Successfully!!");
        setTimeout(() => {
          setShowToster(0);

        }, 1000)
      }
      else if(data.status === 0){
        setShowUnderProcess(0)
        setShowToster(0)
        setshowClaimModel(0);
        setTosterMessage(data.responseValue);
        setTosterValue(1)
        setShowToster(1)
        setTimeout(() => {
          setShowToster(0);

        }, 1000)
      // }
    }
  }

  useEffect(() => {
    setIsShowBillModel(0);
    GetPolicyList(0)
  }, [])
  return (
   <>
    <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="inner-content">
                <div className='fieldsett-in'>
                <div className='fieldsett'>
                  <span className='fieldse'>Policy Details By UHID</span>
                  <div className='row'>
                 
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">UHID<span className="starMandatory"></span></label>
                      <input id="uhid" type="text" value={UHID} className="form-control form-control-sm" onChange={handleOnChange} placeholder = "UHID" name="uhid"  />
                      <small id="erruhid" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
 
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"  onClick = {()=>GetPolicyList(UHID)} ><i class="bi bi-search me-2"></i>Search</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />Clear</button>
        
                          </div>
                      }
                    </div>
                  </div>
                  </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Company Name</th>
                      <th>Policy Number</th>
                      <th>Balance Amount</th>
                      {/* <th>Total Amount </th> */}
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                      
                  
                  
              
                   
            
                  {PolicyList.map((data, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{data.uhid}</td>
                        <td>{data.companyname}</td>
                        <td>{data.tpaReferenceNo}</td>
                        <td>{data.totaltotalBalanceSumByTpaReferenceNo}</td>
                        {/* <td>{data.totalAmountSumByTpaReferenceNo}</td> */}
                        <td>
                          <div className="action-button">
                          <div onClick={() => ClaimPolicy(index)}>
                        <img src={claimtable} alt='' title='Claim'/>
                            </div>
                            <div onClick={() => ShowAllBills(index)}>
                            <img src={view} alt='' title='View'/>
                            </div>
                          
        </div>npm start
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

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loder val={showLoder} /> : ""
        }
      </section>


      {isShowBillModel === 1 ?
  <div className={`modal d-${isShowBillModel === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">

<div className="modal-dialog modal-lg">

  <div className="modal-content p-0">

    <div className="modal-header">

      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">All Bills Lists </h1>

      <button type="button" className="btn-close_ btnModalClose"  title="Close Window" onClick={()=>{setIsShowBillModel(0)}}>

        <i className="bi bi-x-octagon"></i>

      </button>

    </div>
     
      <div className="modal-body p-0">

<div className="row">

  <div className="col-12">

    <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">

      <div className="row">
  
      <div className='col-12 mt-3 mb-3'>
          <table className='table-certificate border'>
                        <thead>
                            <tr>
                               <th className='text-center'>#</th>
                               <th className='text-center'>UHID</th>
                               <th className='text-center'>Bill No</th>
                               <th className='text-center'>Billing Date</th>
                               <th className='text-center'>Paid Amount</th>
                               {/* <th className='text-center'>Payment Mode </th> */}
                               <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                       
                        <tbody>

                        {allbills && allbills.map((val, index) => {
                        return(
                           
                           <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{val.uhid}</td>
                            <td className='text-center'>{val.billNo}</td>
                            <td className='text-center'>{val.billDate}</td>
                            <td className='text-center'>{val.totalPaidAmount}</td>
                            {/* <td className='text-center'>{val.paymentMode === "1" ? 'By Cash' : 'Card' && val.paymentMode === "2" ? 'By Card' : 'Cash' && val.paymentMode === "3" ? "By Cheque" : 'Card' && val.paymentMode === "4" ? 'Online' : 'By Cheque'}</td> */}
                            <td>
                            <div className="action-button">
                                <div
                                // data-bs-toggle="tooltip"
                                // data-bs-title="Edit Row"
                                // data-bs-placement="bottom"
                                onClick={() => {ShowBillingDetails(index);}}
                                >
                              <img src={view} alt='' title='claim'/>
                                </div>
                            </div>
                            </td>
                           </tr>                                          
                            )
                            }
                            )}      
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

</div>

</div> :''
}
      {showClaimModel === 1 ?
  <div className={`modal d-${showClaimModel === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">

<div className="modal-dialog modal-lg">

  <div className="modal-content p-0">

    <div className="modal-header">

      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Claim Policy</h1>

      <button type="button" className="btn-close_ btnModalClose"  title="Close Window" onClick={()=>{setshowClaimModel(0)}}>

        <i className="bi bi-x-octagon"></i>

      </button>

    </div>
     
      <div className="modal-body p-0" >

<div className="row">

  <div className="col-12">

    <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">

      <div className="row">
  
              
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code" className="form-label">UHID<span className="starMandatory"></span></label>
                                <input  type="text" id='rowUhid' value={rowUHID} className="form-control form-control-sm mt-1" disabled />
                                </div>
               
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code" className="form-label">Company Name<span className="starMandatory"></span></label>
                                <input id='company' type="text" key={rowCompanyID} value={rowCompany} className="form-control form-control-sm mt-1"   disabled />
                                </div>
                          
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code" className="form-label">Card Number<span className="starMandatory"></span></label>
                                <input  type="text" id='rowPolicyNo' value={rowPolicyNo} className="form-control form-control-sm mt-1"  disabled />
                                </div>
                              
                                {/* <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code"  className="form-label">Amount<span className="starMandatory"></span></label>
                                <input  type="text" id="amount" value={rowAmount} className="form-control form-control-sm mt-1" disabled />
                                </div> */}

                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code" className="form-label">Claim Date<span className="starMandatory"></span></label>
                                <input  type="date" id='claimdate' value={claimDate} className="form-control form-control-sm mt-1" disabled />
                                </div>
                   
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code" className="form-label">Claim Amount<span className="starMandatory"></span></label>
                                <input id="claimamount" type="number" value={claimAmount} className="form-control form-control-sm mt-1" name="claimamount" onChange = {handleOnChange} disabled/>
                                <small id="errClaimAmount" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                         <div>
                         <textarea id='remark' value={Remark} name = "remark" type="text"  className="form-control form-control" placeholder = "Remark" onChange = {handleOnChange} />
                         </div>

      </div>
      <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 mt-3">
      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 " onClick={handleClaim}>Claim Now <img src={claim}  alt='' style={{width : '15px' , height: '15px'}}/></button>
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
{isShowBillItemsModel === 1 ?
  <div className={`modal d-${isShowBillItemsModel === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static" style={{background:'transparent'}}>

<div className="modal-dialog modal-lg">

  <div className="modal-content p-0">

    <div className="modal-header">

      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">All Items Lists </h1>

      <button type="button" className="btn-close_ btnModalClose"  title="Close Window" onClick={()=>{setIsShowBillItemsModel(0)}}>

        <i className="bi bi-x-octagon"></i>

      </button>

    </div>
     
      <div className="modal-body p-0">

<div className="row">

  <div className="col-12">

    <div className="med-box"> {/* <div className="title">Hello Title</div> */} <div className="inner-content">

      <div className="row">
      <div className='col-12'>
      <table className='table-certificate striped'>
                    <tbody>
                        <tr>
                            <td className='fw-bold' style={{width:'21%'}}>Bill No :</td>
                            <td className='value'>{billDetails.billNo}</td>
                            <td className='fw-bold'  style={{width:'15%'}}>Bill Date :</td>
                            <td className='value'>{billDetails.billDate}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>UHID :</td>                           
                            <td className='value'>{billDetails.uhId}</td>
                            <td className='fw-bold'>CRNO :</td>
                            <td className='value'>{billDetails.crNo}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>IPNO :</td>
                            <td className='value'>{billDetails.ipNo}</td>
                            <td className='fw-bold'>Gender :</td>
                            <td className='value'>{billDetails.gender}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Patient Name :</td>
                            <td className='value'>{billDetails.patientName}</td>
                            <td className='fw-bold'>Age :</td>
                            <td className='value'>{billDetails.age} {billDetails.agetype}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Patient Mobile No :</td>
                            <td className='value'>{billDetails.mobileNo}</td>
                            <td className='fw-bold'>Ward Name :</td>
                            <td className='value'>{billDetails.wardName}</td>
                        </tr>
                        <tr>
                            <td className='fw-bold'>Department :</td>
                            <td className='value' colSpan={3}>{billDetails.departName}</td>                           
                        </tr>

                        </tbody>
                    </table>

          </div>

          <div className='col-12 mt-3 mb-3'>
          <table className='table-certificate border'>
                        <thead>
                            <tr>
                               <th className='text-center'>#</th>
                               <th className='text-center'>Items</th>
                               <th className='text-right'>Charges (Rs)</th>
                               <th className='text-center'>Qty.</th>
                               <th className='text-right'>Dis. (Rs)</th>
                               <th className='text-right'>Total Amt. (Rs)</th>
                            </tr>
                        </thead>
                       
                        <tbody>

                        {itmeDetailByBill && itmeDetailByBill.map((val, ind) => {
                        return(
                           
                           <tr key={ind}>
                            <td className='text-center'>{ind + 1}</td>
                            <td>{val.itemName}</td>
                            <td className='text-right'>{val.itemCharge}</td>
                            <td className='text-center'>{val.itemQuantity}</td>
                            <td className='text-right'>{val.totalDiscount}</td>
                            <td className='text-right'>{val.totalAmount}</td>
                           </tr>                                          
 )
}
)}      
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

</div>

</div> :''
}
{showAlertToster === 1 ? (
              <AlertToster message={showMessage} handle={setShowAlertToster} />
            ) : (
              ""
            )}
   </>
  )
}
