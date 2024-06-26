import React,{ useEffect, useState } from 'react'
import Loder from '../../Component/Loader';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import view from '../../assets/images/icons/view.svg';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import imgPrint from '../../assets/images/icons/imgPrint.svg'
import PatientDetail from "../API/getPatientDetailByUhid";
import GetAllBillListbyDate from "../API/GetAllBillListbyDate";
import getPatientDetailByUhid from '../API/getPatientDetailByUhid';
import GetAllClaim from '../API/GetAllClaim';



export default function ClaimedPolicies() {
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
  const [FromDate, setFromDate] = useState(formatDate(currentDate));
  const [ToDate, setToDate] = useState(formatDate(currentDate));
  const [tosterMessage, setTosterMessage] = useState("");
  const [billReport, setbillReport] = useState([]);
  const [billDetails, setbillDetails] = useState([]);
  let [isShowBillItemsModel, setIsShowBillItemsModel] = useState(0);
  let [itmeDetailByBill, setItmeDetailByBill] = useState([]);
  const handleOnChange =(e)=>{
    const {name , value} = e.target

    if(name === 'fromdate'){
      setFromDate(value)
    }
    if(name === 'todate'){
      setToDate(value)
    }
  };

  const GetClaimList = async()=>{
    let ClaimedList = await GetAllClaim(FromDate , ToDate)
    if(ClaimedList.status===1){
      setbillReport(ClaimedList.responseValue)
    
    }
  }

  const ShowBillingDetails = async(index)=>{
    // let IndexData = billReport[index]
   
    // let UHID  = IndexData.uhid
    // let BillNo = IndexData.billNo
    // let ShowBillingDetails = await getPatientDetailByUhid(UHID , BillNo)
    // if(ShowBillingDetails.status===1){
   
      
    //   let data = ShowBillingDetails.responseValue;
    //   setbillDetails(data[0]);
    //   let itemD = JSON.parse(data[0].itemDetails);
  
    //   setItmeDetailByBill(itemD);
    
    //   setIsShowBillItemsModel(1);
    // }
  }
const handleClear=()=>{
  setFromDate(formatDate(currentDate))
  setToDate(formatDate(currentDate))
}


let handlePrintBill = async (index) => {
  // let IndexData = billReport[index]
  
  // let UHID  = IndexData.uhid
  // let BillNo = IndexData.billNo



  // let data = await PatientDetail(UHID, BillNo);
  
  // if (data.status === 1) {
    
  //   window.sessionStorage.setItem(
  //     "PringBillingDetails",
  //     JSON.stringify(data.responseValue)
  //   );
  //   window.open("/billingcahcounterprint/", "noopener,noreferrer");
  // } else {
  //   alert("Not Saved");
  // }
};
useEffect(() => {
  GetClaimList()
  setIsShowBillItemsModel(0);
}, [])

  return (
   <>
    <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title"></div>
                <div className="inner-content">
                <div className='fieldsett-in'>
                <div className='fieldsett'>
                  <span className='fieldse'>Claimed Policies</span>
                  <div className='row'>

                 
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">From<span className="starMandatory">*</span></label>
                      <input value={FromDate} id="ddalarmtime" type="date" className="form-control form-control-sm" name="fromdate" onChange={handleOnChange} />
                      <small id="errfrom" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">To<span className="starMandatory">*</span></label>
                      <input value={ToDate} id="ddwarningviewtime" type="date" className="form-control form-control-sm" name="todate" onChange={handleOnChange}/>
                      <small id="errtodate" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>



                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick = {GetClaimList} ><i class="bi bi-search mx-2"></i>Search</button>
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

            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Company</th>
                      <th>Policy Number</th>
                      <th>Claimed Amount</th>
                      <th>Claimed Date | Time</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                
             {billReport && billReport.map((data,index)=>{
              return(
                <tr >
               <td className="text-center">{index + 1}</td>
                <td>{data.uhid}</td>
                <td>{data.companyname}</td>
                <td>{data.tpaReferenceNo}</td>
                <td>{data.amount}</td>
                <td>{data.claimDate}</td>
                <td>
                  <div className="action-button">
                    <div
                      onClick={() => {ShowBillingDetails(index);}}
                    >
                 <img src={view} alt=""/>
                    </div>
                    <div  data-bs-title="Delete Row" data-bs-placement="bottom"    onClick={() => handlePrintBill(index)}><img src={imgPrint} style={{width: '20px'}} className='' alt='' />
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



      {isShowBillItemsModel === 1 ?
  <div className={`modal d-${isShowBillItemsModel === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">

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

    <div className="med-box">
      <div className="inner-content">

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
                        <tr>
                            <td className='fw-bold'>Consultant Name :</td>
                            <td colSpan={3}><b>{billDetails.drName}</b></td>                            
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

   </>
  )
}
