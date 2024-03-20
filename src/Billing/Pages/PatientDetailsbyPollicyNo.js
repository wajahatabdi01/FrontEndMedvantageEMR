import React,{ useEffect, useState } from 'react'
import Loder from '../../Component/Loader';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import imgPrint from '../../assets/images/icons/imgPrint.svg'
import PatientDetail from "../API/getPatientDetailByUhid";
import GetUHIDbyPolicyNo from "../API/GetUHIDbyPolicyNo";
import getPatientDetailByUhid from '../API/getPatientDetailByUhid';
import getAllTpaCompany from '../API/getAllTpaCompany';
import Select from 'react-select';



export default function PatientDetailsbyPollicyNo() {
 
  
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showLoder, setShowLoder] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterValue, setTosterValue] = useState(0);
  const [companyName, setcompanyName] = useState(null);
  let [companyList, setcompanyList] = useState([]);
  const [PolicyNo, setPolicyNo] = useState('');
  const [tosterMessage, setTosterMessage] = useState("");
  const [billReport, setbillReport] = useState([]);
  const [billDetails, setbillDetails] = useState([]);
  let [isShowBillItemsModel, setIsShowBillItemsModel] = useState(0);
  let [itmeDetailByBill, setItmeDetailByBill] = useState([]);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [patientDetails, setpatientDetails] = useState([]);


  const handleOnChange =(e)=>{
    const {name , value} = e.target

    if(name === 'PolicyNo'){
        setPolicyNo(value)
    }

  
  };

//   const handleSelectChange = async (selectedOption, errorElementId, setSelectedFunction) => {
//     document.getElementById(errorElementId).style.display = 'none';
//     if (selectedOption) {
//         setSelectedFunction(selectedOption);
//         GetBillingList(selectedOption.value, PolicyNo);
//       } else {
//         setSelectedFunction(null);

//       }
 
//   };
  const handleSelectChange = async (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    
    if (selectedOption) {
      setSelectedFunction(selectedOption);
      GetuhidbyPolicyNo(selectedOption.value, PolicyNo);
    } else {

      setSelectedFunction(null);

    }
  };
  let getAllTpaCompanyList = async () => {
    setShowLoder(1)
    let data = await getAllTpaCompany();
    

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


const GetuhidbyPolicyNo = async (companyId) => {
    // You should provide a value for PolicyNo if needed
    if(companyId != null){
        let BillingList = await GetUHIDbyPolicyNo(companyId.value, PolicyNo);
        if (BillingList.status === 1) {
          setbillReport(BillingList.responseValue);
         
          ShowUhidDetails(BillingList.responseValue[0].uhid);
        
          return
        }
    }
 
  };
  

  const ShowUhidDetails= async(uhid)=>{
   
  let getPatientdetails = await getPatientDetailByUhid(uhid);
  if(getPatientdetails.status === 1){
    setpatientDetails(getPatientdetails.responseValue);
   
  }
  }
const handleClear=()=>{
 setcompanyName(null)
 setPolicyNo('')
 setpatientDetails([])

}



useEffect(() => {
    getAllTpaCompanyList()
    ShowUhidDetails()
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
                  <span className='fieldse'>Patient Detail by Policy Number</span>
                  <div className='row'>

                  <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                        <label htmlFor="ddlitem" className="form-label ">TPA Company<span className="starMandatory">*</span></label>
                                        <Select value={companyName} options={companyList} className=" create-select" id="serviceType" placeholder="Select TPA Company" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errCompany", setcompanyName)} />
                                        <small id="errCompany" className="form-text text-danger" style={{ display: 'none' }}></small>
                                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">Company Policy Number<span className="starMandatory">*</span></label>
                      <input value={PolicyNo} id="ddwarningviewtime" type="text" className="form-control form-control-sm"placeholder="Enter Policy Number" name="PolicyNo" onChange={handleOnChange}/>
                      <small id="errPolicyNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>



                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"  onClick={() => GetuhidbyPolicyNo(companyName, PolicyNo)}><i class="bi bi-search mx-2"></i>Search</button>
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
                      <th>Patient Name</th>
                      <th>Mobile Number</th>
                      <th>Department</th>
                      <th>patient Type</th>
                      <th>Ward Name</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  
                
             {patientDetails && patientDetails.map((data,index)=>{
              return(
                <tr >
               <td className="text-center">{index + 1}</td>
                <td>{data.uhId}</td>
                <td>{data.patientName}<br></br><span>{data.age} | {data.gender}</span></td>
                <td>{data.mobileNo}</td>
                <td>{data.departName}</td>
                <td>{data.patientType}</td>
                <td>{data.wardName}</td>
                <td>
                 
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
