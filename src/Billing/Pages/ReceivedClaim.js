import React,{ useEffect, useState } from 'react'
import Loder from '../../Component/Loader';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Select from 'react-select';
import clearIcon from '../../assets/images/icons/clear.svg';
import getAllTpaCompany from '../API/getAllTpaCompany';
import TrackPolicyNo from '../API/TrackPolicyNo';
import UpdateClaim from '../API/UpdateClaim';
import statement from '../../assets/images/icons/statement.png';
import AlertToster from "../../Component/AlertToster";



export default function ReceivedClaim() {


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
  const [PolicyNo, setPolicyNo] = useState('');
  const [tosterMessage, setTosterMessage] = useState("");
  const [TrackPolicyList, setTrackPolicyList] = useState([]);
  let [showClaimModel, setshowClaimModel] = useState(0);
  let [companyName, setcompanyName] = useState(null);
  let [companyList, setcompanyList] = useState([]);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [rowUHID, setrowUHID] = useState('');
  const [rowCompany, setrowCompany] = useState('');
  const [rowCompanyID, setrowCompanyID] = useState('');
  const [rowPolicyNo, setrowPolicyNo] = useState('');
  const [rowAmount, setrowAmount] = useState('');
  const [claimDate, setClaimDate] = useState(formatDate(currentDate));
  const [ReceivedAmount, setReceivedAmount] = useState('');
  const [rowID, setrowID] = useState(0);
  const [rowReceivedAmount, setrowReceivedAmount] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showMessage, setShowMeassage] = useState("");
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);


  const handleOnChange =(e)=>{
    const {name , value} = e.target

    if(name === 'fromdate'){
      setFromDate(value)
    }
    if(name === 'PolicyNo'){
      setPolicyNo(value)
    }
    if(name === 'receivedamount'){
      setReceivedAmount(value)
    }
  };


      const handleSelectChange = async (selectedOption, errorElementId, setSelectedFunction) => {
        document.getElementById(errorElementId).style.display = 'none';
        
        if (selectedOption) {
          setSelectedFunction(selectedOption);
          GetClaimList(selectedOption.value, PolicyNo);
        } else {
   
          setSelectedFunction(null);
 
        }
      };
      let getAllTpaCompanyList = async () => {
        setShowLoder(1)
        let data = await getAllTpaCompany();
        
        console.log('Data',data);
        if (data.status === 1) {
            setShowLoder(0)
            setcompanyList(data.responseValue.map(Tpa=>({
                value: Tpa.id,
                label: Tpa.companyname 
            })));
        }
        else {
            setShowLoder(0);
         }
    }
  const GetClaimList = async(companyId)=>{

       let trackPolicy = await TrackPolicyNo(companyId , PolicyNo)
    if(trackPolicy.status === 1 ){
      setTrackPolicyList(trackPolicy.responseValue)
      console.log("trackPolicy" , trackPolicy.responseValue)
    
    }
   
  }

  const ShowClaimDetails = async(index)=>{
    setshowClaimModel(1)
    let IndexData = TrackPolicyList[index]
    setshowClaimModel(1);
    setrowUHID(IndexData.uhid)
    setrowCompany(IndexData.companyname)
    setrowCompanyID(IndexData.tpaCompanyID)
    setrowPolicyNo(IndexData.tpaReferenceNo)
    setrowAmount(IndexData.amount)
    setrowID(IndexData.id)
    setrowReceivedAmount(IndexData.receivedAmount)
    console.log('index', IndexData)
  }


const updateClaim = async()=>{
if(ReceivedAmount < rowAmount ){
setShowMeassage("Recieved Amount Should not be less than Requested Amount");
setShowAlertToster(1)
return
}
  const obj ={
   
    userID: userID,
    receivedDate : claimDate,
    receivedAmount : ReceivedAmount,
    isCashless : 0,
    uhid: rowUHID
  }

  console.log('obj' , obj)
  let data = await UpdateClaim(obj)
  if(data.status === 1){
    setShowToster(1)
    setTosterMessage("Received Successfully...!!")
    GetClaimList()
    setshowClaimModel(0)
    setTimeout(() => {
      setShowToster(0);

    }, 1000)
    GetClaimList()
  }
}

const handleClear=()=>{
  setcompanyName(null)
  setPolicyNo('')
  setTrackPolicyList([])
}



useEffect(() => {
  GetClaimList(0)
  setshowClaimModel(0);
  getAllTpaCompanyList()
}, [])

  return (
   <>
    <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">Received Claim</div>
                <div className="inner-content">
                  <div className='row'>

                 
                  <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                        <label htmlFor="ddlitem" className="form-label ">Company<span className="starMandatory"></span></label>
                          <Select value={companyName} options={companyList} className=" create-select" id="serviceType" placeholder="Select TPA Company" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errCompany", setcompanyName)} />
                          <small id="errCompany" className="form-text text-danger" style={{ display: 'none' }}></small>
                         </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Policy Number<span className="starMandatory"></span></label>
                      <input value={PolicyNo} id="ddwarningviewtime" type="text" className="form-control form-control-sm" name="PolicyNo" placeholder='Enter Policy Number' onChange={handleOnChange}/>
                      <small id="errPolicyNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>



                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick = {()=>GetClaimList(companyName,PolicyNo)} ><i class="bi bi-search mx-2"></i>Search</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear} ><img src={clearIcon} className='icnn' alt='' />Clear</button>
                   
                          </div>
                      }
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
                      <th>Received Amount</th>
                      <th>Pending Amount</th>
                      <th>Date | Time</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                
             {TrackPolicyList && TrackPolicyList.map((data,index)=>{
      const claimDate = data.claimDate ? new Date(data.claimDate) : null;

    const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} At ${hours}:${minutes}`;
  };

              return(
                <tr >
               <td className="text-center">{index + 1}</td>
                <td>{data.uhid}</td>
                <td>{data.companyname}</td>
                <td>{data.tpaReferenceNo}</td>
                <td>{data.receivedAmount === null ? '0' : data.receivedAmount }</td>
                <td>{data.pendingAmount}</td>
                <td>{formatDate(claimDate)}</td>
                <td>
                  <div className="action-button">
                    <div
                      onClick={() => {ShowClaimDetails(index)}}
                    >
                    <img src={statement} alt="" title="Fill Claim Amount"/>
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



      {showClaimModel === 1 ?
  <div className={`modal d-${showClaimModel === 1 ?"block":""}`} id="EditModal" data-bs-backdrop="static">

<div className="modal-dialog modal-lg">
  <div className="modal-content p-0">
    <div className="modal-header">
      <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Received Claim</h1>
      <button type="button" className="btn-close_ btnModalClose"  title="Close Window" onClick={()=>{setshowClaimModel(0)}}>
        <i className="bi bi-x-octagon"></i>

      </button>

    </div>
     
      <div className="modal-body p-0" >

<div className="row">

  <div className="col-12">

    <div className="med-box">
      <div className="inner-content">
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
                                <label htmlFor="Code" className="form-label">Policy Number<span className="starMandatory"></span></label>
                                <input  type="text" id='rowPolicyNo' value={rowPolicyNo} className="form-control form-control-sm mt-1"  disabled />
                                </div>
                              
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code"  className="form-label">Requested Amount<span className="starMandatory"></span></label>
                                <input  type="text" id="amount" value={rowAmount} className="form-control form-control-sm mt-1" disabled />
                                </div>
                    
          

                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code" className="form-label">Claim Date<span className="starMandatory"></span></label>
                                <input  type="date" id='claimdate' value={claimDate} className="form-control form-control-sm mt-1" />
                                </div>
                   
                                <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <label htmlFor="Code" className="form-label">Received Amount<span className="starMandatory"></span></label>
                                <input id="claimamount" type="number" value={ReceivedAmount} className="form-control form-control-sm mt-1" name="receivedamount" onChange = {handleOnChange} />
                                <small id="errClaimAmount" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                         <div>
                        
                         </div>

      </div>
      <div className="col-xxl-6 col-xl-3 col-lg-4 col-md-6 mb-3 mt-3">
      <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 " onClick={updateClaim}><i class="bi bi-arrow-right-circle-fill me-2"></i>Proceed</button>
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
    

  </div>

</div>

</div> :''
}



   </>
  )
}
