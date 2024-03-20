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
import Remark from '../../BloodBank/images/Remark.svg'
import bloodproduct from '../../BloodBank/images/bloodproduct.svg'
import ward from '../../BloodBank/images/ward.svg'
import printer from '../../BloodBank/images/printer.svg'
import exportfile from '../../BloodBank/images/exportfile.svg'
import donorid from '../../BloodBank/images/donorid.svg'
import GetDetailsByBagNo from '../Api/BloodDonorRegestration/GetBlood/GetDiscard/GetDetailsByBagNo';
import GetBagsByDonorID from '../Api/BloodDonorRegestration/GetBlood/GetDiscard/GetBagsBydonorID';
import GetDiscardTypeReason from '../Api/BloodDonorRegestration/GetBlood/GetDiscard/GetDiscardTypeReason';
import GetBagByBagNo from '../Api/BloodDonorRegestration/GetBlood/GetDiscard/GetBagByBagNo';
import PostDiscardBag from '../Api/BloodDonorRegestration/PostBlood/PostDiscardBag/PostDiscardBag'
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import BloodDiscardSearchValidation from '../../Validation/BloodBank/BloodDiscardSearchValidation';
import BloodDiscardTypeValidation from '../../Validation/BloodBank/BloodDiscardTypeValidation';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import AlertToster from '../../../src/Component/AlertToster'
import SuccessToster from '../../../src/Component/SuccessToster'


export default function BloodDiscardForm() {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();

  let [donorID, setDonorID] = useState('');
  let [getDonorID, setGetDonorID] = useState('');
  let [getDonorName, setGetDonorName] = useState('');
  let [bagNo, setBagNo] = useState('');
  let [bagNumber, setBagNumber] = useState('')
  let [donorIdFlag, setDonorIdFlag] = useState(false);
  let [bagNoFlag, setBagNoFlag] = useState(false);
  let [donorIDBagList, setDonorIDBagList] = useState([]);
  let [bagNoBagList, setBagNoBagList] = useState([]);
  let [discardType, setDiscardType] = useState([]);
  let [listFlag, setListFlag] = useState(false);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [showAlertToster, setShowAlertToster] = useState(0)
  let [showSuccessToster, setShowSuccessToster] = useState(0)
  let [showMessage, setShowMeassage] = useState("")
  //let [showField, setShowField] = useState(false);

  let handleAlert = (e) => {
    if (e.target.name === 'DonorID') {
      document.getElementById('errDonorID').style.display = 'none';
      setDonorID(e.target.value);
    }
    else if (e.target.name === 'BagNO') {
      document.getElementById('errBagNo').style.display = 'none';
      setBagNo(e.target.value);
    }
    else if (e.target.name === 'BagNumber') {
      setBagNumber(e.target.value);
    }
  }

  ////////////////////////////// Get Details By Bag No ///////////////////////////////////
  let getDetailsByBagNo = async () => {
    try{
   
    document.getElementById('shwFld').style.display = 'block';
    let data = await GetDetailsByBagNo(parseInt(bagNumber));
    setGetDonorID(data.responseValue[0].donorId);
    setGetDonorName(data.responseValue[0].donorName);
    }
    catch (e) {
      setShowAlertToster(1)
      setShowMeassage(e.message)
  }

  }
  ///////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////// Get List of Bags by donor ID /////////////////////////
  let getListOfBagsByDonorId = async () => {
    document.getElementById('errDonorID').style.display = 'none';
    const res = BloodDiscardSearchValidation(donorID, 'dummy');
    var id = res[1]
  
    
    if (res === true) {
      setListFlag(true);
    
      let data = await GetBagsByDonorID(donorID);
      setDonorIDBagList(data.responseValue);
      let discardData = await GetDiscardTypeReason();
      setDiscardType(discardData.responseValue);
      
    }
    else {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).innerHTML = res[0];
    }
  }

  let getListByDonorID = async () => 
  {
    let data = await GetBagsByDonorID(donorID);
    setDonorIDBagList(data.responseValue);
    
  }
  ////////////////////////////////////////////////////////////////////////////////

  ///////////////////////// Get List of Bags by Bag No /////////////////////////
  let getListOfBagsByBagNo = async () => {
    document.getElementById('errBagNo').style.display = 'none';

    var resB = BloodDiscardSearchValidation('dumy', bagNo);
    var id = resB[1];
    if (resB === true) {
      setListFlag(false);
      let data = await GetBagByBagNo(bagNo);
      setBagNoBagList(data.responseValue);
      
      let discardData = await GetDiscardTypeReason();
      setDiscardType(discardData.responseValue);
    }
    else {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).innerHTML = resB[0];
    }


  }
  let getListByBagNumber = async () => 
  {
    let data = await GetBagByBagNo(bagNo);
    setBagNoBagList(data.responseValue);
    
    
  }
  ////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////POST DISCARD BAG ////////////////////////////
  let discardTheBag = async (val) => {
    //document.getElementById('errDiscard').style.display = 'none';
    const discardTypeID = parseInt(document.getElementById('discardTypeID').value);
    
      const resD = BloodDiscardTypeValidation(discardTypeID);
      var id = resD[1];
      if (resD === true)
      {
        var obj = {
          visitID: val.visitID,
          bloodCompositionID: val.bagCompositionID,
          jsonbagDiscard: val.jsonColumn,
          discardTypeID: discardTypeID,
          userID: window.userId
        }
        
  
        let data = await PostDiscardBag(obj);
        if (data.status === 1) {
        
          setShowUnderProcess(0);
          setTosterValue(0);
          setShowToster(1);
          setTosterMessage(t('Bag Discarded Successfully'));
          setTimeout(() => {
            clear();
            if(donorIdFlag === true)
            {
              getListByDonorID();
              setDonorIdFlag(false);
              setBagNoFlag(false)
            }
            else{
              getListByBagNumber();
              setBagNoFlag(false)
              setDonorIdFlag(false);
            }
            setShowToster(0);
          }, 2000);
      }
      else {
     
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage(data.responseValue);
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0);
        }, 2000);
      }
    }
    else {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).innerHTML = resD[0];
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  let getShowFields = async () => {
    document.getElementById('shwFld').style.display = 'block';
  }

  let getDonorIDField = async () => {
 
    setBagNoFlag(false);
    setDonorIdFlag(true);
    clearBagNo();
  }

 

  let getBagNoField = async () => {
    setDonorIdFlag(false);
    setBagNoFlag(true);
    clearDonorID();
  }

  

  let clearDonorID = () => {
    setDonorID('');
  }
  let clearBagNo = () => {
    setBagNo('');
  }
  let clear = () => {
    setDonorID('');
    setBagNo('');
    setDonorIdFlag(false);
    setBagNoFlag(false);
    setBagNoBagList('')
    setDonorIDBagList('')
    document.getElementById("BagNumber").value = ''
    setGetDonorID('')
    setGetDonorName('')
    
   // document.getElementById('shwFld').style.display = 'none';
    let getbtnsActive = document.getElementsByClassName('btnDonorActive');
    for (const getbtnActive of getbtnsActive) {
      getbtnActive.classList.remove("active");
    }
  }


  useEffect(() => {

    let getbtnDonorsActive = document.getElementsByClassName('btnDonorActive');
    for (const getbtnDonorActive of getbtnDonorsActive) {
      getbtnDonorActive.addEventListener("click", function () {
        resetbtnDonorActive();
        getbtnDonorActive.classList.add("active");
      });

    }

    function resetbtnDonorActive() {
      for (const getbtnDonorActive of getbtnDonorsActive) {
        getbtnDonorActive.classList.remove("active");
      }
    }



  }, [])

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t('Blood Discard')} id='top' />

              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className='fieldse'>{t("Blood Discard")}</span>
                  <div className='row mt-3 px-2'>
                    <div className="col-xxl-2 col-xl-4 col-lg-6 mb-2">
                      <button type="button" className="btn btn-save btn-sm w-100 btnDonorActive" onClick={getDonorIDField}>{t("Discard All Bags of Donor")}</button>
                    </div>
                    <div className="col-xxl-2 col-xl-4 col-lg-6 mb-2">
                      <button type="button" className="btn btn-save btn-sm  w-100 btnDonorActive" onClick={getBagNoField}>{t("Discard Single Bag of Donor")}</button>
                    </div>
                    <div className="col-xxl-2 col-xl-4 col-lg-6 mb-2">
                      <button type="button" className="btn btn-save btn-sm  w-100 btnDonorActive" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={getShowFields}>{t("Get DonorID by Bag No")}</button>
                    </div>

                    <div className='col-xxl-3 col-xl-4 col-lg-6 mb-2'  id='shwFld' >
                      {donorIdFlag === true && bagNoFlag === false ? <>
                        <div className="d-flex gap-3"><input type="text" className="form-control form-control-sm" id="DonorID" name="DonorID" placeholder={t("Enter DonorID")} value={donorID} onChange={handleAlert} />

                          <button type="button" className="btn btn-save btn-sm" id='donorIDBtn' onClick={getListOfBagsByDonorId}>{t("Search")}</button></div>
                        <small id='errDonorID' className='form-text text-danger' style={{ display: 'none' }}></small></>
                        : <></>}

                        {bagNoFlag === true && donorIdFlag === false ? <>
                        <div className="d-flex gap-3"><input type="text" className="form-control form-control-sm" id="BagNO" name="BagNO" placeholder={t("Enter Bag Number")} value={bagNo} onChange={handleAlert} />

                          <button type="button" className="btn btn-save btn-sm" id='bagNoBtn' onClick={getListOfBagsByBagNo}>{t("Search")}</button></div>
                        <small id='errBagNo' className='form-text text-danger' style={{ display: 'none' }}></small></>
                        : <></>}

                    </div>

                  </div>



                </div>
              </div>

              <div className="rt-btns">
                <BoxContainer>
                  <div className="mb-2">

                    <div>

                      <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}>{t("Clear")}</button>
                    </div>
                  </div>
                </BoxContainer>
              </div>
            </div>

            <div className="col-12 mt-2">
              {/* <Heading text='Donor List' /> */}
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <div className='listd-in'><img src={dob} className='icnn' alt='' /> <span style={{ color: '#1D4999', fontWeight: 'bold', fontSize: '14px' }}>{t("Select Date")}</span></div>
                  <div className='listd-in'>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option selected>{t("May")} 10, 2023 - {t("May")} 16, 2023</option>
                    </select>
                  </div>
                </div>
                <div className='listdetailsct-in'>
                  <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder={t("Search")} />
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
                      <th className="" style={{ "width": "5%" }}>S.No.</th>
                      <th>{t("Donor Info")}</th>
                      <th>{t("Age / Gender")}</th>
                      <th>{t("BG")}</th>
                      <th>{t("Bag Name")}</th>
                      <th>{t("Bag No")}</th>
                      <th>{t("Product")}</th>
                      <th>{t("Discard Reason")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listFlag === true ? <>
                      {donorIDBagList && donorIDBagList.map((list, index) => {
                        return (
                          <tr>
                            <td className="" style={{ paddingLeft: '7px' }}>{index + 1}</td>
                            <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.donorName}</span><br /><span style={{ fontSize: '13px', color: '#929292' }}>{t("Donor ID")} : {list.donorID}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.age}/{list.gender}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.groupName}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.bagName}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{JSON.parse(list.jsonColumn).map((val) => { return (val.bagSerialNumber + ',') })}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{JSON.parse(list.jsonColumn).map((val) => { return (val.productName + ',') })}</span></td>

                            <td>
                              <select className='form-select form-select-sm' aria-label=".form-select-sm example" id='discardTypeID' >
                                <option value='0'>Select</option>
                                {discardType && discardType.map((listDis) => {

                                  return (
                                    <option value={listDis.id}>{listDis.discardCategory}</option>
                                  )
                                })
                                }
                                
                              </select>
                              <small id='errDiscard' className='form-text text-danger' style={{ display: 'none' }}></small>
                              
                            </td>
                            <td>
                              {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                                showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> :
                                  <div className="action-button">

                                    <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom">
                                      <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => { discardTheBag(list) }}>{t("Discard")}</button>
                                    </div>
                                  </div>
                              }
                            </td>
                          </tr>
                        )
                      })}</> : <>
                      {bagNoBagList && bagNoBagList.map((bagList, index) => {
                        return (
                          <tr>
                            <td className="" style={{ paddingLeft: '7px' }}>{index + 1}</td>
                            <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{bagList.donorName}</span><br /><span style={{ fontSize: '13px', color: '#929292' }}>{t("Donor ID")} : {bagList.donorID}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{bagList.age}/{bagList.gender}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{bagList.groupName}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{bagList.bagName}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{JSON.parse(bagList.jsonColumn).map((val) => { return (val.bagSerialNumber) })}</span></td>
                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{JSON.parse(bagList.jsonColumn).map((val) => { return (val.productName) })}</span></td>

                            <td>
                              <select className='form-select form-select-sm' aria-label=".form-select-sm example" id='discardTypeID'>
                                <option value='0'>{t("Select")}</option>
                                {discardType && discardType.map((listDis) => {

                                  return (
                                    <option value={listDis.id}>{listDis.discardCategory}</option>
                                  )
                                })
                                }
                              </select>
                            </td>
                            <td>
                              <div className="action-button">

                                <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={() => { discardTheBag(bagList) }}>{t("Discard")}</button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </>
                    }
                  </tbody>
                </TableContainer>
              </div>

            </div>


          </div>
        </div>
        {/* Modal For Donor ID*/}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundImage: 'none' }}>
                <h1 className="heading mb-2" id="exampleModalLabel">{t("Donor ID by Bag Number")}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className='col-md-12'>
                  <div className='row  px-2 fieldsett-in'>
                    <div className='col-md-6 mb-1'>
                      <div className='d-flex align-items-baseline'>
                        <img src={name} className='icnn' alt='' /> <label htmlFor="BagNumber" className="form-label">{t("Bag No")}</label>
                      </div>
                      <input type="number" className="form-control form-control-sm" id="BagNumber" name="BagNumber" value={bagNumber} onChange={handleAlert} placeholder={t("Enter Bag No")} />
                    </div>
                    <div className='col-md-6 mb-1'>
                      <div className='d-flex align-items-baseline'>
                        <img src={donorid} className='icnn' alt='' /> <label htmlFor="DonorID" className="form-label">{t("Donor ID")}</label>
                      </div>
                      <input type="text" className="form-control form-control-sm" id="DonorID" name="DonorID" value={getDonorID} placeholder={t("Enter Donor ID")} disabled />
                    </div>
                  </div>
                  <div className='row  px-2 fieldsett-in'>
                    <div className='col-md-6'>
                      <div className='d-flex align-items-baseline'>
                        <img src={name} className='icnn' alt='' /> <label htmlFor="DonorName" className="form-label">{t("Donor Name")}</label>
                      </div>
                      <input type="text" className="form-control form-control-sm" id="DonorName" name="DonorName" value={getDonorName} placeholder={t("Enter Donor Name")} disabled />
                    </div>
                    <div className='col-md-6 mb-1'>
                      <div className='d-flex align-items-baseline '>
                        <label>&nbsp;</label>
                      </div>
                      <div>
                      <button type="button" className="btn btn-save btn-sm mb-1 me-1"  onClick={getDetailsByBagNo}>{t("Search")}</button>
                      <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}>{t("Clear")}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                            showAlertToster === 1 ? <AlertToster message={showMessage} handle={setShowAlertToster} /> : ""
                        }
                        {
                            showSuccessToster === 1 ? <SuccessToster message={showMessage} handle={setShowSuccessToster} /> : ""
                        }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
