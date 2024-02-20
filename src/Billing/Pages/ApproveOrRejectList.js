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
import GetAllApprovedandRejectList from '../API/GetAllApprovedandRejectList';

export default function ApproveOrRejectList() {


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
    const [remark, setremark] = useState('')
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showSuccessToster, setShowSuccessToster] = useState(0)
    let [showMessage, setShowMeassage] = useState("");

    const [UHID, setUHID] = useState('');


const [isShowCreditApproveModel, setisShowCreditApproveModel] = useState(0)
const [Status, setStatus] = useState('3')



const GetList = async()=>{
    let List = await GetAllApprovedandRejectList('',Status)
    if(List.status === 1){
        setCreditApproveList(List.responseValue)
        console.log("List" ,List.responseValue )
    }
}




const handleStatus= async(e)=>{
setStatus(e.target.value)
}
const handleClear=()=>{
setStatus('')
setUHID('')
}

const handleOnChange=(e)=>{
    setUHID(e.target.value)
}
const handleSearch=async()=>{
    let List = await GetAllApprovedandRejectList(UHID,Status)
    if(List.status === 1){
        setCreditApproveList(List.responseValue)
        console.log("List" ,List.responseValue )
    }
}

useEffect(() => {
    GetList()
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
                  <span className='fieldse'>Approve and Reject Insurance List</span>
                  <div className='row'>


                    <div class="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" id="paymentModediv">
                    <label for="PaymentMode" class="form-label">
                      Status Type
                      
                    </label>
                    <select id="Payment"
                      class="form-control form-control-sm"
                      value={Status}
                      onChange={handleStatus}
                    >
                      <option value="3" selected>All</option>
                      <option value="2">Reject</option>
                      <option value="1">
                        Approved
                      </option>
                    

                    </select>
                  </div>

                  <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">UHID<span className="starMandatory"></span></label>
                      <input value={UHID} id="ddwarningviewtime" type="text" className="form-control form-control-sm" placeholder='UHID' name="UHID" onChange={handleOnChange}/>
                      <small id="errUHID" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSearch}  ><i class="bi bi-search mx-2"></i>Search</button>
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
                      <th>Company Name</th>
                      <th>Card Number</th>
                      <th>Status</th>
                     
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
                <td><span style={{width:"75px"}} className={`text-white d-block text-center rounded-1 p-1 ${data.isCashLess == 1 ? "bg-success" : 'bg-danger'} `}>{data.status}</span></td>

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



    
    </>
  )
}
