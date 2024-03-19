import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';

import uhid from '../../BloodBank/images/uhid.svg'
import name from '../../BloodBank/images/name.svg'
import age from '../../BloodBank/images/age.svg'
import genders from '../../BloodBank/images/genders.svg'
import department from '../../BloodBank/images/department.svg'
import bloddgroup from '../../BloodBank/images/bloddgroup.svg'
import product from '../../BloodBank/images/product.svg'
import requestunit from '../../BloodBank/images/requestunit.svg'
import dob from '../../BloodBank/images/dob.svg'
import time from '../../BloodBank/images/time.svg'
import printer from '../../BloodBank/images/printer.svg'
import exportfile from '../../BloodBank/images/exportfile.svg'
import GetElisaTestMaster from '../Api/BloodDonorRegestration/GetBlood/GetElisa/GetElisaTestMaster';
import GetAllCreatedBag from '../Api/BloodDonorRegestration/GetBlood/GetCreateBag/GetAllCreatedBag';
import GetBagProductMapping from '../Api/BloodDonorRegestration/GetBlood/GetCreateBag/GetBagProductMapping';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import GetTestResult from '../Api/BloodDonorRegestration/GetBlood/GetElisa/GetTestResult';
import ElisaTestValidation from '../../Validation/BloodBank/ElisaTestValidation';
import PostUploadElisaTestResult from '../Api/BloodDonorRegestration/PostBlood/PostElisaTest/PostUploadElisaTestResult';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';


export default function ElisaTest() {

  let [testName, setTestName] = useState([]);
  let [allCreatedBagList, setAllCreatedBagList] = useState([]);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [donorName, setDonorName] = useState('');
  let [donorID, setDonorID] = useState('');
  let [ageGet, setAgeGet] = useState('');
  let [gender, setGender] = useState('');
  let [bloodGroup, setBloodGroup] = useState('');
  let [bagType, setBagType] = useState('');
  let [visitID, setVisitID] = useState('')
  let [productName, setProductName] = useState([]);
  let [testResult, setTestResult] = useState([]);
  let [tempArray, setTempArray] = useState([])
  let [saveButtonDisable, setSaveButtonDisable] = useState(false)

  let getBloodTestMaster = async () => {
    let data = await GetElisaTestMaster()
    
    setTestName(data.responseValue);
  }
  let getAllBagList = async () => {
    let data = await GetAllCreatedBag()
    setAllCreatedBagList(data.responseValue);
  }
  let getTestResult = async () => {
    let data = await GetTestResult();

    setTestResult(data.responseValue);
  }



  ///////////////////////////// For Fields to be auto filled when clicked on button //////////////////////////
  let fillTest = (list) => {
    
    setSaveButtonDisable(false);
    setDonorName(list.donorName);
    setDonorID(list.donorID);
    setAgeGet(list.age);
    setGender(list.gender);
    setBloodGroup(list.groupName);
    setBagType(list.bagName);
    getProductMap(list.bagCompositionID);
    setVisitID(list.visitID)

    if (testName.length > 0) {
      for (var i = 0; i < testName.length; i++) {
        document.getElementById('ddlTestResult' + testName[i].id).value = '0';
      }
    }

  }

  let getProductMap = async (id) => {

    let data = await GetBagProductMapping(id)
    setProductName(data.responseValue)

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let handleSelect = (e, listID) => {
    let t = {}
    let index = tempArray.findIndex(value => value.elisaTestID === listID)
   
    if (index === -1) {
      t = {
        elisaTestID: listID,
        resultMasterID: e.target.value
      }
      setTempArray([...tempArray, t])
     

    }
    else {
      let t = [...tempArray]
      t[index].resultMasterID = e.target.value
      setTempArray(t)
    
    }


  }

  ////////////////////////////////////////// SAVE DATA ////////////////////////////////////////////////////////////

  let save = async () => {
    document.getElementById('errProduct').style.display = 'none';
    document.getElementById('errbagType').style.display = 'none';
    document.getElementById('errBldGrp').style.display = 'none';
    document.getElementById('errAge').style.display = 'none';
    document.getElementById('errDonorID').style.display = 'none';
    document.getElementById('errDonorName').style.display = 'none';

    if (testName.length > 0) {
      for (var i = 0; i < testName.length; i++) {
        var testID = testName[0].id
      }

    }

    const res = ElisaTestValidation(donorName, donorID, ageGet, bloodGroup, bagType, productName);
    var id = res[1]
    if (res === true) {
      setShowUnderProcess(1);
      // for(var j = 0; j < testName.length; j++)
      // {

      
      //   for(var k = 0; k<testResult.length; k++)
      //   {

      //       arr.push({
      //         elisaTestID : testName[j].id,
      //         resultMasterID: testResult[k].id
      //       })


      //   }

      // }
   
      let obj = {
        visitID:visitID,
        jsonelisaTest: JSON.stringify(tempArray),
        userId:JSON.parse(window.sessionStorage.getItem('LoginData')).userId
      }
    
      
      let saveData = await PostUploadElisaTestResult(obj);
      if(saveData.status === 1){
        setSaveButtonDisable(true);
        setShowUnderProcess(0);
        setTosterValue(0);//0 for save and warning 1 for Error
        setShowToster(1);
        setTosterMessage("Test Performed Successfully!");
        setTimeout(() => {
          setShowToster(0);
          getAllBagList();
        }, 1000)
      }
      else{
        setShowUnderProcess(0)
        setShowToster(1)//0 for save and warning 1 for Error
        setTosterMessage(saveData.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }
    else {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).innerHTML = res[0];
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////// CLEAR //////////////////////////////////////////////////////////////

  let clear = async () => {
    setDonorName('');
    setDonorID('');
    setBloodGroup('');
    setGender('');
    setAgeGet('');
    setProductName('');
    setBagType('');
    setSaveButtonDisable(false);
    // document.getElementById('testStatus').value = '0';


    if (testName.length > 0) {
      for (var i = 0; i < testName.length; i++) {
        document.getElementById('ddlTestResult' + testName[i].id).value = '0';
      }
    }

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getBloodTestMaster();
    getAllBagList();
    getTestResult();
  }, [])


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text='Elisa Test' />

              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className='fieldse'>Donor Details</span>
                  <div className="row mt-2 px-2">
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={name} className='icnn' alt='' /> <label htmlFor="DonorName" className="form-label">Donor Name</label>
                        </div>

                        <input type="text" className="form-control form-control-sm" id="DonorName" name="DonorName" value={donorName} placeholder="Donor Name" disabled />
                      </div>
                      <small id='errDonorName' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>

                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={''} className='icnn' alt='' /> <label htmlFor="MobileNumber" className="form-label">Donor ID</label>
                        </div>

                        <input type="text" className="form-control form-control-sm" id="donorID" name="donorID" value={donorID} placeholder="Donor ID" disabled/>
                      </div>
                      <small id='errDonorID' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>

                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={age} className='icnn' alt='' /> <label htmlFor="Age" className="form-label">Age/Gender</label>
                        </div>
                        <input type="text" className="form-control form-control-sm" id="Age" name="Age" placeholder="Age" value={ageGet + ' ' + gender} disabled />
                      </div>
                      <small id='errAge' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={bloddgroup} className='icnn' alt='' /> <label htmlFor="BloodGroup" className="form-label">Blood Group</label>
                        </div>

                        <input type="text" className="form-control form-control-sm" id="BloodGroup" name="BloodGroup" placeholder="Blood Group" value={bloodGroup} disabled />
                      </div>
                      <small id='errBldGrp' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={product} className='icnn' alt='' /> <label htmlFor="Bag Component" className="form-label">Bag Type</label>
                        </div>
                        <input type="text" className="form-control form-control-sm" id="ddlbagtype" name="ddlbagtype" placeholder="Bag type" value={bagType} disabled />
                      </div>
                      <small id='errbagType' className='form-text text-danger' style={{ display: 'none' }}></small>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className='mb-2'>
                        <div className='d-flex align-items-baseline'>
                          <img src={product} className='icnn' alt='' /><label htmlFor="product" className="form-label">Product</label>
                        </div>
                        <div className='form-control form-control-sm' id='product' name='product' style={{ backgroundColor: '#E9ECEF' }}>
                          {productName && productName.map((val, index) => {
                            return (
                              <span disabled>{val.productName}<br /></span>
                            )
                          })}
                        </div>
                        <small id='errProduct' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    {/* <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={product} className='icnn' alt='' /><label htmlFor="product" className="form-label">Product</label>
                        </div>
                        <input type="text" className="form-control form-control-sm" id="ddlproduct" name="ddlproduct" placeholder="Product" value={''} disabled />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className='fieldse'>Elisa Test</span>
                  <div className='row mt-2 px-2'>
                    {testName && testName.map((list, index) => {

                      return (
                        <>

                          <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                            <div className='mb-2'>
                              <div className='d-flex align-items-baseline'>
                                <label htmlFor="product" className="form-label" >{list.elisaTestName}</label>
                              </div>
                              <select className="form-select form-select-sm" aria-label=".form-select-sm example" id={'ddlTestResult' + list.id} onChange={(e) => { handleSelect(e, list.id);}}>
                                <option value='0'>Select</option>
                                {testResult && testResult.map((listTest, index) => {
                                  return (
                                    <option value={listTest.id}  >{listTest.statusName}</option>
                                  )
                                })}
                              </select>
                              <small id={'errTest' + list.id} className='form-text text-danger' style={{ display: 'none' }}></small>
                            </div>
                          </div>


                        </>

                      )
                    })}

                  </div>

                </div>
              </div>

              <div className="rt-btns">
                <BoxContainer>
                  <div className="mb-2">
                    <div>
                    {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                    showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> :
                    
                      saveButtonDisable === false ?
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={save}> <img src={saveBtnIcon} className='icnn' alt='' />Save</button>:<>
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''} disabled> <img src={saveBtnIcon} className='icnn' alt='' />Save</button>
                    </>}
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}> <img src={clearBtnIcon} className='icnn' alt='' />Clear</button>
                    </div>
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
                  <div className='listd-in'><img src={exportfile} className='icnn' alt='' /></div>
                  <div className='listd-in'><img src={printer} className='icnn' alt='' /></div>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th style={{ "width": "5%" }}>S.No.</th>
                      <th >Donor Name</th>
                      <th >Donor ID</th>
                      <th >Age/Gender</th>
                      <th >BG</th>
                      <th >Bag Name</th>
                      <th >Bag No</th>
                      <th >Product Name</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allCreatedBagList && allCreatedBagList.map((list, index) => {

                      return (
                        <tr>
                          <td ><span style={{ fontSize: '13px', paddingLeft: '7px' }}>{index + 1}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.donorName}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.donorID}</span></td>

                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.gender}/{list.age}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.groupName}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.bagName}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{JSON.parse(list.jsonColumn).map((val) => { return (val.bagSerialNo + ',') })}</span></td>
                          <td ><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{JSON.parse(list.jsonColumn).map((val) => { return (val.productName + ',') })}</span></td>
                          <td className="text-center">
                            
                                <div className="action-button">

                                  <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom">
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => { fillTest(list) }}>Test</button>
                                  </div>
                                </div>
                            
                          </td>
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

