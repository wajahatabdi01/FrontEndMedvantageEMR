import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';
import name from '../../BloodBank/images/name.svg'
import age from '../../BloodBank/images/age.svg'
import genders from '../../BloodBank/images/genders.svg'
import department from '../../BloodBank/images/department.svg'
import bloddgroup from '../../BloodBank/images/bloddgroup.svg'
import product from '../../BloodBank/images/product.svg'
import requestunit from '../../BloodBank/images/requestunit.svg'
import dob from '../../BloodBank/images/dob.svg'
import time from '../../BloodBank/images/time.svg'
import Remark from '../../BloodBank/images/Remark.svg'
import bloodproduct from '../../BloodBank/images/bloodproduct.svg'
import ward from '../../BloodBank/images/ward.svg'
import printer from '../../BloodBank/images/printer.svg'
import exportfile from '../../BloodBank/images/exportfile.svg'
import GetBloodRequest from '../Api/BloodDonorRegestration/GetBlood/GetBloodRequest/GetBloodRequest';
import GetAllBloodProduct from '../Api/BloodDonorRegestration/GetBlood/GetAllBloodProduct';
import BloodRequestValidation from '../../Validation/BloodBank/BloodRequestValidation';
import GetBloodGroup from '../Api/BloodDonorRegestration/GetBlood/GetBloodGroup';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import PostBloodRequest from '../Api/BloodDonorRegestration/PostBlood/PostBloodRequest/PostBloodRequest';
import GetDepartmentList from '../../Registartion/API/GET/GetDepartmentList'
import GetWardForBloodBank from '../Api/BloodDonorRegestration/GetBlood/GetBloodRequest/GetWardForBloodBank';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import uhid from '../../assets/images/icons/UHID1.svg';



export default function BloodRequest() {

  let [bloodRequestList, setBloodRequestList] = useState([]);
  let [departmentList, setDepartmentList] = useState([]);
  let [wardList, setWardList] = useState([]);
  let [patientName, setPatientName] = useState('');
  let [patientAge, setPatientAge] = useState('');
  let [patientUhid, setPatientUhid] = useState('');
  let [patientGender, setPatientGender] = useState('');
  let [hospitalName, setHospitalName] = useState('');
  let [requestDate, setRequestDate] = useState('');
  let [requestTime, setRequestTime] = useState('');
  let [hospitalAddress, setHospitalAddress] = useState('');
  let [rqstQty, setRqstQty] = useState('');
  let [productName, setProductName] = useState('');
  let [bloodGroup, setBloodGroup] = useState('');
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [arrBindList, setArrBindList] = useState([]);
  let listData = [];
  let [arrProduct, setArrProduct] = useState([]);

let handleChange = (e) => {
  if(e.target.name === 'UHID')
  {
    document.getElementById('errUHID').style.display = 'none';
    setPatientUhid(e.target.value);
  }
 else if(e.target.name === 'PatientName')
  {
    document.getElementById('errName').style.display = 'none';
    setPatientName(e.target.value);
  }
  else if(e.target.name === 'Age')
  {
    document.getElementById('errAge').style.display = 'none';
    setPatientAge(e.target.value);
  }
  else if(e.target.name === 'RequestDate')
  {
    document.getElementById('errDate').style.display = 'none';
    setRequestDate(e.target.value);
  }
  else if(e.target.name === 'RequestTime')
  {
    document.getElementById('errTime').style.display = 'none';
    setRequestTime(e.target.value);
  }
  else if(e.target.name === 'Hospital')
  {
    document.getElementById('errHospital').style.display = 'none';
    setHospitalName(e.target.value);
  }
  else if(e.target.name === 'HospitalAddress')
  {
    document.getElementById('errHospitalAddress').style.display = 'none';
    setHospitalAddress(e.target.value);
  }
}
//////////////////////////////// GET API FOR DROPDOWN /////////////////////////////
  let getBloodRequestList = async () => {
    let data = await GetBloodRequest();
    setBloodRequestList(data.responseValue);
  }
  let getAllBloodProductList = async () => {
    let data = await GetAllBloodProduct();
    setProductName(data.responseValue);
  }
  let getAllBloodGroup  = async () => {
    let data = await GetBloodGroup();
    setBloodGroup(data.responseValue);
  }
  let getDepartmentList = async () => {
    let data = await GetDepartmentList();
    setDepartmentList(data.responseValue);
  }
  let getWardList = async () => {
    let data =await GetWardForBloodBank();
    setWardList(data.responseValue)
  }
  /////////////////////////////////////////////////////////////////////////

  let getGender = (gender) => {
    setPatientGender(gender);
  }



  let addProduct = async () => {
    document.getElementById('errUnit').style.display = 'none';
    document.getElementById('errProduct').style.display = 'none';
    //document.getElementById('errHospital').setAttribute('disabled')
    document.getElementById('Hospital').setAttribute("disabled","disabled");
    document.getElementById('UHID').setAttribute("disabled","disabled");
    document.getElementById('Age').setAttribute("disabled","disabled");
    document.getElementById('PatientName').setAttribute("disabled","disabled");
    document.getElementById('RequestDate').setAttribute("disabled","disabled");
    document.getElementById('RequestTime').setAttribute("disabled","disabled");
    document.getElementById('BloodGroup').setAttribute("disabled","disabled");
    
    document.getElementById('HospitalAddress').setAttribute("disabled","disabled");

    const prdctID = document.getElementById('bloodProduct').value;
    const prdctName = document.getElementById('bloodProduct');
    const selectedOption = prdctName.options[prdctName.selectedIndex];
    const selectedOptionName = selectedOption.text;
    const unit = document.getElementById('rqstQty').value;

    const res = BloodRequestValidation('dummyUhid','dummyName', 'dummyAge', 'dummyDate', 'dummyTime','dummyName', 'dummyAddress','1',prdctID,unit);
    var id = res[1];
    if (res === true) {
      let temp = [...arrProduct]
  
      if(temp.length === 0){
        temp.push({
          ProductID: prdctID,
          requestedQuantity: unit,
          productName: selectedOptionName
        })
      }
      else{
        
        var duplicate = temp.findIndex((arry)=> arry.ProductID == prdctID);
   
         if(duplicate != -1){
          
          var id1 = 'errAddProduct';
          document.getElementById(id1).style.display = 'block';
          document.getElementById(id1).innerHTML = selectedOptionName + ' already exists.' ;
         }
         else{
          temp.push({
            ProductID: prdctID,
            requestedQuantity: unit,
            productName: selectedOptionName
          })
          
         }

      }
      setArrProduct(temp)
      //clearArr();
     
    }
    
    else{
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).innerHTML = res[0];
    }
  }

  let saveData  = async () => 
  {
    document.getElementById('errUnit').style.display = 'none';
    document.getElementById('errHospitalAddress').style.display = 'none';
    document.getElementById('errHospital').style.display = 'none';
    document.getElementById('errTime').style.display = 'none';
    document.getElementById('errDate').style.display = 'none';
    document.getElementById('errAge').style.display = 'none';
    document.getElementById('errUHID').style.display = 'none';
    document.getElementById('errBlood').style.display = 'none';
    document.getElementById('errProduct').style.display = 'none';
    document.getElementById('errName').style.display = 'none';
    
    const productID = parseInt(document.getElementById('bloodProduct').value);
    const wardID = document.getElementById('ward').value;
    const bldGroup = parseInt(document.getElementById('BloodGroup').value);
    const reqstQty = parseInt(document.getElementById('rqstQty').value);
    const departmentID = document.getElementById('departmentID').value;
    const genderType = patientGender === 'M' ? document.getElementById('male').value : document.getElementById('female').value;


    
    const res = BloodRequestValidation(patientUhid,patientName, patientAge, requestDate, requestTime,hospitalName, hospitalAddress,bldGroup,productID,reqstQty);
    var id = res[1];
    if(res === true)
    {
      //alert('u have achieved it ');

      let saveTemp = [];
      for(var i =0 ; i<arrProduct.length; i++)
      {
        saveTemp.push({
          ProductID : arrProduct[i].ProductID,
          requestedQuantity : arrProduct[i].requestedQuantity
        })
      }

      
      
      let obj = {
        patientUHID : patientUhid,
        age : patientAge,
        department : departmentID,
        gender : genderType,
        ward : wardID,
        tranfusionDate : requestDate +' ' + requestTime,
        bloodGroupID : bldGroup,
        hospitalName : hospitalName,
        hospitalAddress : hospitalAddress,
        patientName : patientName,
        isUrgent: 0,
        jsonbloodrequest : JSON.stringify(saveTemp),
        userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
      }

   
      

      let data = await PostBloodRequest(obj);
      if(data.status ===  1)
      {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage('Request saved successfully');
        setTimeout(() => {
          clearArr();
          getBloodRequestList();
          setShowToster(0);
        },2000);
      }
      else{
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage(data.responseValue);
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0);
        },2000)
      }


    }
    else
    {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).innerHTML = res[0];
    }
  }

  let remove = (index) => {
    let temp = [...arrProduct]
    temp.splice(index, 1)

    setArrProduct(temp)
  }

  let edit = (list) => {
    setPatientName(list.patientName);
    setHospitalName(list.hospitalName);
    setHospitalAddress(list.hospitalpAddress);
    setRqstQty(list.requestedQuantity);
    //setProductName(list.productName);
    setBloodGroup(list.groupName)

  }

  let clearArr = async () => {
    document.getElementById('bloodProduct').value = 0;
    document.getElementById('rqstQty').value = 0;
    document.getElementById('BloodGroup').value = 0;
    setPatientAge('');
    setPatientUhid('');
    setPatientName('');
    setRequestDate('');
    setRequestTime('');
    setHospitalAddress('');
    setHospitalName('');
    setArrProduct([]);
  }

  let clearErrorDisplay = (e) =>
  {
    if(e.target.id === 'BloodGroup')
    {
      document.getElementById('errBlood').style.display = 'none';
    }
    else if(e.target.id ==='bloodProduct')
    {
      document.getElementById('errProduct').style.display = 'none';
    }
    else if(e.target.id ==='rqstQty')
    {
      document.getElementById('errUnit').style.display = 'none';
    }
  }

  let justToNone = (e) => {
    document.getElementById('errAddProduct').style.display = 'none';
    if(e.target.id ==='bloodProduct')
    {
      document.getElementById('errProduct').style.display = 'none';
    }
  }
  useEffect(() => {
    getBloodRequestList();
    getAllBloodProductList();
    getAllBloodGroup();
    getDepartmentList();
    getWardList();
  }, [])
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text='Blood Request' />

              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className='fieldse'>Blood Request</span>
                  <div className='row mt-2 px-2'>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={uhid} className='icnn' alt='' /> <label htmlFor="UHID" className="form-label">UHID<span className="starMandatory">*</span></label>
                        </div>
                        <input type="text" className="form-control form-control-sm" id="UHID" value={patientUhid} name="UHID" onChange={handleChange} placeholder="Enter UHID" />
                      </div>
                      <small id='errUHID' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={name} className='icnn' alt='' /> <label htmlFor="PatientName" className="form-label">Patient Name<span className="starMandatory">*</span></label>
                        </div>
                        <input type="text" className="form-control form-control-sm" id="PatientName" name="PatientName" value={patientName} onChange={handleChange} placeholder="Enter Patient Name" />
                      </div>
                      <small id='errName' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className='mb-2'>
                        <div className='d-flex align-items-baseline'>
                          <img src={age} className='icnn' alt='' /> <label htmlFor="Age" className="form-label">Age<span className="starMandatory">*</span></label>
                        </div>
                        <input type="number" className="form-control form-control-sm" id="Age" name="Age" onChange={handleChange} value={patientAge} placeholder="Enter Age" />
                      </div>
                      <small id='errAge' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={genders} className='icnn' alt='' /> <label htmlFor="departmentName" className="form-label">Gender <span className="starMandatory">*</span></label>
                        </div>

                        <div className='d-flex flex-direction-column gap-2'>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="male" value={patientGender} onChange={() => {getGender('M')}}/>
                            <label className="form-check-label" for="gender">
                              Male
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="female" value={patientGender} onChange={() => {getGender('F')}}/>
                            <label className="form-check-label" for="gender">
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={department} className='icnn' alt='' /> <label htmlFor="Department" className="form-label">Department</label>
                        </div>

                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='departmentID'>
                          <option value='0'>Select Department</option>
                          {departmentList && departmentList.map((list, index) => {
                            return(
                              <option value={list.id}>{list.departmentName}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={dob} className='icnn' alt='' /> <label htmlFor="RequestDate" className="form-label">Request Date<span className="starMandatory">*</span></label>
                        </div>

                        <input type="date" className="form-control form-control-sm" id="RequestDate" name="RequestDate" value={requestDate} onChange={handleChange} placeholder="Enter Request Date" />
                      </div>
                      <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                  </div>

                  <div className='row mt-2 px-2'>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={time} className='icnn' alt='' /> <label htmlFor="RequestTime" className="form-label">Request Time<span className="starMandatory">*</span></label>
                        </div>
                        <input type="time" className="form-control form-control-sm" id="RequestTime" name="RequestTime" value={requestTime} onChange={handleChange} placeholder="Enter Request Time"  />
                      </div>
                      <small id='errTime' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={ward} className='icnn' alt='' /> <label htmlFor="ward" className="form-label">Ward<span className="starMandatory">*</span></label>
                        </div>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id="ward">
                          <option value='0'>Select Ward</option>
                          {wardList && wardList.map((list, index) => {
                            
                            return(
                              <option value={list.id}>{list.wardName}</option>
                            )
                          })}
                        </select>
                        
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={ward} className='icnn' alt='' /> <label htmlFor="BloodGroup" className="form-label">Blood Group<span className="starMandatory">*</span></label>
                        </div>

                        
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id="BloodGroup" onChange={clearErrorDisplay}>
                          <option value='0'>Select Group</option>
                          {bloodGroup && bloodGroup.map((list, index) => {
                            return(
                              <option value={list.id}>{list.groupName}</option>
                            )
                          })}
                        </select>
                        <small id='errBlood' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                      
                    </div>
                    

                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={product} className='icnn' alt='' /> <label htmlFor="BloodProduct" className="form-label">Blood Product<span className="starMandatory">*</span></label>
                        </div>

                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='bloodProduct' onChange={justToNone}>
                          <option value='0'>Select Product</option>
                          {productName && productName.map((list, index) => {
                            return (
                              <option value={list.id}>{list.productName}</option>
                            )
                          })}
                        </select>
                        <small id='errProduct' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>

                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={bloodproduct} className='icnn' alt='' /> <label htmlFor="rqstQty" className="form-label">Request Qty<span className="starMandatory">*</span></label>
                        </div>

                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='rqstQty'>
                          <option value='0'>Select Unit</option>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                          <option value='6'>6</option>
                        </select>
                        <small id='errUnit' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={Remark} className='icnn' alt='' /> <label htmlFor="Hospital" className="form-label">Hospital<span className="starMandatory">*</span></label>
                        </div>
                        <input type="text" className="form-control form-control-sm" id="Hospital" name="Hospital" value={hospitalName} onChange={handleChange} placeholder="Enter Hospital Name" />
                      </div>
                      <small id='errHospital' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                    

                  </div>

                  <div className='row mt-2 px-2'>
                    
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={Remark} className='icnn' alt='' /> <label htmlFor="HospitalAddress" className="form-label">Hospital Address<span className="starMandatory">*</span></label>
                        </div>
                        <textarea className="form-control form-control-sm" id="HospitalAddress" name="HospitalAddress" value={hospitalAddress} onChange={handleChange} placeholder="Enter Hospital Address" />
                      </div>
                      <small id='errHospitalAddress' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                    <label>&nbsp;</label>
                      <div className="mb-2">
                     
                      
                        <div className='adddiv' style={{ cursor: 'pointer' }}>
                       
                          <i className='fa fa-plus' onClick={addProduct}></i>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className='addvalue'>
                          {
                            arrProduct && arrProduct.map((list, index) => {
                              return (
                                <>
                                <div className='addvalue-in'><span>{list.productName}</span>/<span>{list.requestedQuantity}</span>
                                  <span className='closeadd' onClick={() => { remove(index) }}><i className='fa fa-times'></i></span>
                                </div>
                                
                                </>
                                
                              )
                            })
                          }
                          
                        </div>
                        <small id='errAddProduct' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                  </div>


                  {/* <div className='row mt-2 px-2'>
                    <div className='col-xs-4 col-sm-6 col-md-10'>
                      <div className="mb-2">
                        <div className='addvalue'>
                          {
                            arrProduct && arrProduct.map((list, index) => {
                              return (
                                <div className='addvalue-in'><span>{list.productName}</span>/<span>{list.requestedQuantity}</span>
                                  <span className='closeadd' onClick={() => { remove(index) }}><i className='fa fa-times'></i></span>
                                </div>
                              )
                            })
                          }

                        </div>

                      </div>
                    </div>
                    <div className='col-md-2'>
                      <div className="mb-2">
                        <div className='adddiv' style={{ float: 'right', cursor: 'pointer' }}>
                          <i className='fa fa-plus' onClick={addProduct}></i>
                        </div>
                      </div>
                    </div>

                  </div> */}
                </div>
              </div>

              <div className="rt-btns">
                <BoxContainer>
                  <div className="mb-2 relative">
                  {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                      showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                        :
                        <div>
                          
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveData}> <img src={saveBtnIcon} className='icnn' alt='' />Save</button>
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearArr}><img src={clearBtnIcon} className='icnn' alt='' />Clear</button>
                          
                        </div>
                    }

                    {/* <div>
                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveData}>Save</button>
                      <button type="button" className="btn btn-clear btn-sm mb-1 me-1">Clear</button>
                    </div> */}
                  </div>
                </BoxContainer>
              </div>
            </div>

            <div className="col-12 mt-2">
              {/* <Heading text='Donor List' /> */}
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <div className='listd-in'><img src={dob} className='icnn' alt='' /> <span style={{ color: '#1D4999', fontWeight: 'bold', fontSize: '14px' }}>Select Date</span></div>
                  <div className='listd-in'>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option selected>May 10, 2023 - May 16, 2023</option>
                    </select>
                  </div>
                </div>
                <div className='listdetailsct-in'>
                  <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Search.." />
                      <i className="fa fa-search"></i>
                    </form>
                  </div>
                  <div className='listd-in'><img src={exportfile} className='icnn' /></div>
                  <div className='listd-in'><img src={printer} className='icnn' /></div>
                </div>
              </div>

              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="" style={{ "width": "5%" }}>S.No.</th>
                      <th>UHID</th>
                      <th>Patient Name</th>
                      <th>Hospital Info</th>
                      <th>Bloodgroup</th>
                      <th>Product</th>
                      
                      
                    </tr>
                  </thead>

                  <tbody>
                    {bloodRequestList && bloodRequestList.map((list, index) => {
                      return (
                        <tr>
                          <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>
                          <td>784561</td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.patientName}</span></td>
                          <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.hospitalName}</span><br /><span style={{ color: '#858585', fontSize: '13px' }}>{list.hospitalpAddress}</span><br /></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.groupName}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{JSON.parse(list.productInfo).map((val) => {return(val.productName + '/' + val.requestedQuantity + ' ')})}</span></td>
                          
                        </tr>
                      )
                    })}



                  </tbody>
                </TableContainer>
              </div>

            </div>


          </div>
        </div>

      </section>
    </>
  )
}
