import React,{useState,useEffect} from 'react'
import imgPaymentMode from "../../assets/images/icons/imgPaymentMode.svg";
import active from "../../assets/images/icons/active.svg";
import hold from "../../assets/images/icons/hold.svg";
import Loder from '../../Component/Loader';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import clearIcon from '../../assets/images/icons/clear.svg';
import GetCreditLimitlist from '../API/GetCreditLimitlist';
import UpdateCredit from '../API/UpdateCredit';

export default function CreditApprovedLimit() {
    const [showLoder, setShowLoder] = useState(0);
    const [showUnderProcess, setShowUnderProcess] = useState(0);
    const [showToster, setShowToster] = useState(0);
    const [tosterValue, setTosterValue] = useState(0);
    const [tosterMessage, setTosterMessage] = useState("");
    const [CreditApproveList, setCreditApproveList] = useState([]);
    const [rowUHID, setrowUHID] = useState("");
    const [creditAmount, setcreditAmount] = useState('');
    const [rowCompanyName, setrowCompanyName] = useState('');
    const [rowCardNo, setrowCardNo] = useState('')
    // const [remark, setremark] = useState('')
    // let [showAlertToster, setShowAlertToster] = useState(0);
    let [showSuccessToster, setShowSuccessToster] = useState(0)
    let [showMessage, setShowMeassage] = useState("");
    const [rowID, setRowID] = useState(0);


const [isShowCreditApproveModel, setisShowCreditApproveModel] = useState(0)
const [ApprovedStatus, setApprovedStatus] = useState('0')
const [UHID, setUHID] = useState('')


const GetApprovedList = async()=>{
    let List = await GetCreditLimitlist()
    if(List.status === 1){
        setCreditApproveList(List.responseValue)
      
    }
}

const handleOnChange=(e)=>{
const {value , name} = e.target

if(name === 'UHID'){
    setUHID(value)
}

}


const handleApprovedStatus= async(e)=>{
setApprovedStatus(e.target.value)
}
const handleClear=()=>{
setUHID('')
setApprovedStatus('0')
}

const showCreditRowReport= async(index)=>{
  // setisShowCreditApproveModel(1)
let RowIndex = CreditApproveList[index]
setrowUHID(RowIndex.uhid);
setrowCompanyName(RowIndex.companyname)
setrowCardNo(RowIndex.cardNo)
setcreditAmount(RowIndex.creditLimit)
}

useEffect(() => {
    GetApprovedList()
}, [])

const handleUpdateApproveCredit = async(index)=>{
  setRowID(index)
  let RowIndex = CreditApproveList[index]

    const obj = {
   id : RowIndex.id,
  currentStatus: 1,
    }

    let approveCredt = await UpdateCredit(obj)
    if (approveCredt.status === 1) {
      setShowSuccessToster(1)
      setShowMeassage("Credit Approved Successfully..!!");
      GetApprovedList()
    }
}
const handleUpdateHoldCredit = async(index)=>{
  let RowIndex = CreditApproveList[index]

    const obj = {
  id : RowIndex.id,
  currentStatus: 2,
    }

    let approveCredt = await UpdateCredit(obj)
    if (approveCredt.status === 1) {
      setShowSuccessToster(1)
      setShowMeassage("Credit Approved Successfully..!!")
      GetApprovedList()
    }
}

const handleSearch = async()=>{
  let List = await GetCreditLimitlist(UHID)
  if(List.status === 1){
    setCreditApproveList(List.responseValue)
  }
}
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
                  <span className='fieldse'>Approve Credit</span>
                  <div className='row'>


                    <div class="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" id="paymentModediv">
                    <label for="PaymentMode" class="form-label">
                      Status Type
                      
                    </label>
                    <select id="Payment"
                      class="form-control form-control-sm"
                      value={ApprovedStatus}
                      onChange={handleApprovedStatus}
                    >
                      <option value="0" selected>All</option>
                      <option value="1">
                        Approved
                      </option>
                      <option value="2">Hold</option>
               
               
                      {/* <option value={0}>By Online Payment</option> */}
                    </select>
                  </div>

                  <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">UHID<span className="starMandatory">*</span></label>
                      <input value={UHID} id="ddwarningviewtime" type="text" className="form-control form-control-sm" placeholder='Enter UHID' name="UHID" onChange={handleOnChange}/>
                      <small id="errUHID" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSearch} ><i class="bi bi-search mx-2"></i>Search</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear} ><img src={clearIcon} className='icnn' alt=''/>Clear</button>
                   
                     
                       
                            
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
                      <th>Card Number</th>
                      <th>Credit Limit</th>
                      {/* <th>Payment Mode</th> */}
                      <th>Status</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                
             {CreditApproveList && CreditApproveList.map((data,index)=>{
              return(
                <tr >
               <td className="text-center">{index + 1}</td>
                <td>{data.uhid}</td>
                <td>{data.companyname}</td>
                <td>{data.cardNo}</td>
                <td>{data.creditLimit}</td>
                {/* <td className='value'>{data.paymentMode == "1" ? 'By Cash' : 'Card' && data.paymentMode == "2" ? 'By Card' : 'Cash' && data.paymentMode == "3" ? "By Cheque" : 'Card' && data.paymentMode == "4" ? 'Online' : 'By Cheque'}</td> */}
                <td><span style={{width:"50px"}} className={`text-white d-block text-center rounded-1 p-1 ${data.currentStatus == 1 ? "bg-success" : 'bg-danger'} `}>{data.currentStatus1}</span></td>



                <td>
                  <div className="action-button">
                    <div className= {data.currentStatus == 2 ? 'd-block' : data.currentStatus == 1 ? 'd-none' : ''}
                      onClick={() => {handleUpdateApproveCredit(index);}}
                    >
                   <img src={active} alt='' title='Activate' />
                    </div>
                    <div className= {data.currentStatus == 1 ? 'd-block' : data.currentStatus == 2 ? 'd-none' : ''} data-bs-title="Delete Row" data-bs-placement="bottom"><img src={hold} alt='' title='Hold'   onClick={() => {handleUpdateHoldCredit(index);}}/>
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



      {isShowCreditApproveModel === 1 ?
  <div className={`modal d-${isShowCreditApproveModel === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">

<div className="modal-dialog modal-lg">

  <div className="modal-content p-0">

    <div className="modal-header">

      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">All Items Lists </h1>

      <button type="button" className="btn-close_ btnModalClose"  title="Close Window" onClick={()=>{setisShowCreditApproveModel(0)}}>

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
                                <input  type="number" id="amount" value={creditAmount} name="creditAmount" className="form-control form-control-sm mt-1" onChange={handleOnChange} disabled/>
                                </div>
                                
                                {/* <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code"  className="form-label">Remark<span className="starMandatory"></span></label>
                                <input  type="text" id="amount" value={remark} name="remark" className="form-control form-control-sm mt-1" onChange={handleOnChange} />
                                </div> */}

      </div>
      <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 mt-3">
      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 " onClick={()=>handleUpdateApproveCredit(rowID)}> Activate <img src={active} className='icnn' alt="" /></button>
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
