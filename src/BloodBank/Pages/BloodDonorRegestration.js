import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import phone from '../../BloodBank/images/phone.svg'
import name from '../../BloodBank/images/name.svg'
import genders from '../../BloodBank/images/genders.svg'
import dob from '../../BloodBank/images/dob.svg'
import bloddgroup from '../../BloodBank/images/bloddgroup.svg'
import idcard from '../../BloodBank/images/id-card.svg'
import addressIcon from '../../BloodBank/images/address.svg'
import weight from '../../BloodBank/images/weight.svg'
import height from '../../BloodBank/images/height.svg'
import hblevel from '../../BloodBank/images/hblevel.svg'
import bp from '../../BloodBank/images/bp.svg'
import pulserate from '../../BloodBank/images/pulserate.svg'
import temprature from '../../BloodBank/images/temprature.svg'
import investigation from '../../BloodBank/images/investigation.svg'
import donorid from '../../BloodBank/images/donorid.svg'
import uhid from '../../BloodBank/images/uhid.svg'
import segmentno from '../../BloodBank/images/segmentno.svg'
import donationtype from '../../BloodBank/images/donationtype.svg'
import donationdate from '../../BloodBank/images/donationdate.svg'
import donationtime from '../../BloodBank/images/donationtime.svg'
import GuardianName from '../../BloodBank/images/GuardianName.svg'
import RelationID from '../../BloodBank/images/RelationID.svg'
import Remark from '../../BloodBank/images/Remark.svg'
import printer from '../../BloodBank/images/printer.svg'
import exportfile from '../../BloodBank/images/exportfile.svg'
import GetBloodGroup from '../../BloodBank/Api/BloodDonorRegestration/GetBlood/GetBloodGroup';
import PostBloodDonorRegistration from '../../BloodBank/Api/BloodDonorRegestration/PostBlood/PostBloodDonorRegestration'
import ValidationDonorRegistration from '../../Validation/BloodBank/DonorRegistrationValidations'
import GetCountryCode from '../Api/BloodDonorRegestration/GetBlood/GetCountryCode';
import GetIdentity from '../Api/BloodDonorRegestration/GetBlood/GetIdentity';
import GetAllDonorList from '../Api/BloodDonorRegestration/GetBlood/GetAllDonorList';
import DeleteBloodDonorRegistration from '../Api/BloodDonorRegestration/DeleteBlood/DeleteBloodDonorRegestration';
//import Toster from '../../Component/Toster';
//import TosterUnderProcess from '../../Component/TosterUnderProcess';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import PutBloodDonorRegistration from '../Api/BloodDonorRegestration/PutBlood/PutBloodDonorRegestration';
import GetDonorByContact from '../Api/BloodDonorRegestration/GetBlood/GetDonorByContact';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import AlertToster from '../../../src/Component/AlertToster'
import SuccessToster from '../../Component/SuccessToster'


export default function BloodDonorRegestration() {

  const { t } = useTranslation();
  document.body.dir = i18n.dir();


  let [showAlertToster, setShowAlertToster] = useState(0);
  let [contact, setContact] = useState();
  let [donor, setDonor] = useState('');
  let [donorList, setDonorList] = useState([])
  let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  //let [printButton, setPrintButton] = useState(false);
  let [genderType, setGender] = useState('');
  let [bloodGroup, setBloodGroup] = useState([]);
  let [regDate, setRegDate] = useState('');
  let [identityType, setIdentityType] = useState([]);
  let [identityNo, setIdentityNo] = useState('');
  let [address, setAddress] = useState('');
  let [countryCodeList, setcountryCodeList] = useState([]);
  let [countryID, setCountryID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).countryId);
  let [rowID, setRowID] = useState([]);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [idType, setIdtype] = useState(0);
  //let [donorList, setDonorList] =useState([])
  let [showMessage, setShowMeassage] = useState("")
  let [showSuccessToster, setShowSuccessToster] = useState(0)


  let handleChange = (e) => {
    if (e.target.name === 'donor') {
      document.getElementById('errDonor').style.display = 'none';
      setDonor(e.target.value.replace(/[^a-zA-Z ]/ig, ''));
    }
    if (e.target.name === 'regDate') {
      document.getElementById('errDate').style.display = 'none';
      setRegDate(e.target.value);
    }
    if (e.target.name === 'idnetityno') {
      document.getElementById('errIDNo').style.display = 'none';
      setIdentityNo(e.target.value);
    }

    if (e.target.name === 'address') {
      document.getElementById('errAddress').style.display = 'none';
      setAddress(e.target.value);
    }

    if (e.target.name === "contact") {

      const checkLength = e.target.value;
      if (checkLength >= 0) {
        if (checkLength.toString().length > 10) {
          return false;

        }
        else {
          setContact(e.target.value);
          if (checkLength.toString().length === 10 || checkLength.toString().length < !0) {
            
            const key = e.target.value;
            getDataByContactNo(key);
          }

        }

      } else {
        setShowMeassage("Please enter a non-negative number for the contact")
        setShowAlertToster(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)

      }
    }
  }

  let clearErrorDisplay = (e) => {
    if (e.target.id === 'ddlBloodGroup') {
      document.getElementById('errBloodGroup').style.display = 'none';
    }
    else if (e.target.id === 'ddlIdentityType') {
      document.getElementById('errIDType').style.display = 'none';

    }
  }
  // let getCodeList=()=>{
  //   setcountryCodeList(counrtyPhoneCode);

  // }
  let getGender = (gender) => {
    setGender(gender);
  }
  // blood group get
  let getBloodGroup = async () => {
    let data = await GetBloodGroup();

    setBloodGroup(data.responseValue);
  }
  let getCoundryCode = async () => {
    let data = await GetCountryCode();

    setcountryCodeList(data.responseValue);
  }
  let getIdentityType = async () => {
    let data = await GetIdentity();
    console.log("data", data)
    // const idtype = data.responseValue.idName
    // console.log("idtype",idtype)
    setIdentityType(data.responseValue)


  }
  let getAllDonorList = async () => {
    let data = await GetAllDonorList();
    setDonorList(data.responseValue);
  }

  // let getSelectedBloodGroup = () => {
  //   const bloodGroup = document.getElementById('ddlBloodGroup').value;
  //   setBloodGroup(bloodGroup);

  // }
  let save = async () => {
    //const isNumValidate = /^\d{10}$/;
    document.getElementById('errMobile').style.display = 'none';
    document.getElementById('errDonor').style.display = 'none';
    document.getElementById('errGender').style.display = 'none';
    document.getElementById('errDate').style.display = 'none';
    document.getElementById('errIDType').style.display = 'none';
    document.getElementById('errIDNo').style.display = 'none';
    document.getElementById('errAddress').style.display = 'none';
    document.getElementById('errBloodGroup').style.display = 'none';
    const idType = document.getElementById('ddlIdentityType').value
    const bgID = document.getElementById('ddlBloodGroup').value


    const res = ValidationDonorRegistration(contact, donor, genderType, regDate, bgID, idType, identityNo, address);

    var id = res[1];
    if (res === true) {
      setShowUnderProcess(1);
      const bloodGroup = parseInt(document.getElementById('ddlBloodGroup').value);
      const contactno = document.getElementById('contact').value;
      const donorName = document.getElementById('donor').value;
      const regDate = document.getElementById('regDate').value;
      const identityTypeID = parseInt(document.getElementById('ddlIdentityType').value);
      const identityNo = document.getElementById('idnetityno').value;
      const address = document.getElementById('address').value;
      const countrycode = document.getElementById('countryCode').value;
      const genderr = genderType === 'M' ? document.getElementById('male').value : document.getElementById('female').value
      // let userID=JSON.parse(window.sessionStorage.getItem("LoginData")).userId

      let dataObj =
      {
        donorName: donorName,
        dob: regDate,
        gender: genderr,
        identityTypeID: identityTypeID,
        identityNumber: identityNo,
        countryCode: countrycode,
        contactNumber: contactno,
        address: address,
        bloodGroupID: bloodGroup,
        donorBiometric: "no",
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
      }


      let data = await PostBloodDonorRegistration(dataObj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage(t("Data Saved Successfully"));
        setTosterValue(0);//0 for save and warning 1 for Erro

        let allptresponse = await GetAllDonorList();
        console.log("allptresponse", allptresponse)
        if (allptresponse.status === 1) {
          const allDonor = allptresponse.responseValue;
          console.log("allDonor", allDonor)

          if (allDonor.length > 0) {
            const lastDonor = allDonor[allDonor.length - 1];
            const donorId = lastDonor.id;
            const groupName = lastDonor.groupName;
            const idName = lastDonor.idName;

            window.sessionStorage.setItem("PrintDonorRegistration", JSON.stringify({
              "donorName": dataObj.donorName, "dob": dataObj.dob, "gender": dataObj.gender, "idName": idName,
              "identityNumber": dataObj.identityNumber, "contactNumber": dataObj.contactNumber, "address": dataObj.address, "groupName": groupName,
              "id": donorId,
            }))
            window.open("/printblooddonorregistration/", 'noopener,noreferrer');

            setTimeout(() => {
              setShowToster(0);
              clear();
              getAllDonorList();

            }, 2000)
          }
        }
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)//0 for save and warning 1 for Error
        setTosterMessage(data.responseValue)
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

  let clear = async () => {
    setContact('');
    setDonor('');
    setAddress('');
    setIdentityNo('');
    setRegDate('');
    const getClientCountryID = JSON.parse(window.sessionStorage.getItem("LoginData")).countryId;
    document.getElementById('countryCode').value = getClientCountryID;
    setCountryID(getClientCountryID);
    document.getElementById('ddlBloodGroup').value = 0;
    document.getElementById('ddlIdentityType').value = 0;
    //document.getElementById('countryCode').value = 1;
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
    //document.getElementsByName('gender').checked = false;
    document.getElementById('errMobile').style.display = "none";
    setIsUpdateBtnShow(false);
  }
  let edit = (list) => {
    setIsUpdateBtnShow(true);
    setDonor(list.donorName);
    setRegDate(list.dobEdit);
    setAddress(list.address);
    setIdentityNo(list.identityNumber);
    setContact(list.contactNumber);
    setRowID(list.id);
    setGender(list.gender);
    document.getElementById('countryCode').value = list.countryCode;
    //document.getElementById('gender').checked=true;
    list.gender === 'M' ? document.getElementById('male').checked = true : document.getElementById('female').checked = true;
    document.getElementById('ddlBloodGroup').value = list.bloodGroupID;
    document.getElementById('ddlIdentityType').value = list.identityTypeID;

  }
  let handleEdit = async () => {
    document.getElementById('errMobile').style.display = 'none';

    const idType = document.getElementById('ddlIdentityType').value
    const bgID = document.getElementById('ddlBloodGroup').value


    const resUpdate = ValidationDonorRegistration(contact, donor, genderType, regDate, bgID, idType, identityNo, address);
    var id = resUpdate[1];
    if (resUpdate === true) {
      setShowUnderProcess(1);
      const bloodGroup = parseInt(document.getElementById('ddlBloodGroup').value);
      const contactno = document.getElementById('contact').value;
      const donorName = document.getElementById('donor').value;
      const regDate = document.getElementById('regDate').value;
      const identityTypeID = parseInt(document.getElementById('ddlIdentityType').value);
      const identityNo = document.getElementById('idnetityno').value;
      const address = document.getElementById('address').value;
      const countrycode = document.getElementById('countryCode').value;
      const genderr = genderType === 'M' ? document.getElementById('male').value : document.getElementById('female').value;

      var obj = {
        id: rowID,
        donorName: donorName,
        dob: regDate,
        gender: genderr,
        identityTypeID: identityTypeID,
        identityNumber: identityNo,
        countryCode: countrycode,
        contactNumber: contactno,
        address: address,
        bloodGroupID: bloodGroup,
        donorBiometric: "no",
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
      }

      let data = await PutBloodDonorRegistration(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage(t("Updated Saved Successfully"));
        setTimeout(() => {
          setShowToster(0);
          setIsUpdateBtnShow(false);
          clear();
          getAllDonorList();

        }, 2000)
      }

      else {
        setShowUnderProcess(0)
        setShowToster(1)//0 for save and warning 1 for Error
        setTosterMessage(data.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }

    }
    else {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).innerHTML = resUpdate[0];
    }
  }

  let deleteRow = async () => {

    const userID = JSON.parse(window.sessionStorage.getItem('LoginData')).userId;
    var obj = {
      id: rowID,
      userID: userID
    }
    let data = await DeleteBloodDonorRegistration(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage(t('Deleted successfully'));
      setTimeout(() => {
        setShowToster(0)
        getAllDonorList();
      }, 2000);

    }
  }
  useEffect(() => {
    getBloodGroup();
    getCoundryCode();
    getIdentityType();
    getAllDonorList();
  }, []);

  let getDataByContactNo = async () => {
    try {
      document.getElementById('errMobile').style.display = 'none';
      let contactNumber = document.getElementById('contact').value;
      const countryCode = document.getElementById('countryCode').value;

      console.log("countryCode", countryCode)
      setContact(contactNumber);

      if (contactNumber.length === 10) {
        let data = await GetDonorByContact(countryCode, contactNumber);

        if (data.status === 1) {
          //setPrintButton(true);
          let response = data.responseValue[0]

          setDonor(response.donorName);
          setIdentityNo(response.identityNumber);

          setAddress(response.address);
          document.getElementById('ddlBloodGroup').value = response.bloodGroupID;
          document.getElementById('ddlIdentityType').value = response.identityTypeID;
          document.getElementsByName('gender').checked = response.gender;
          document.getElementById('regDate').value = response.dobEdit;
          setRegDate(response.dobEdit);
          response.gender === 'M' ? document.getElementById('male').checked = true : document.getElementById('female').checked = true;

        }
      }

    }
    // else if (contactNumber.length !== 10) {
    //   setPrintButton(false);
    //   setDonor('');
    //   setAddress('');
    //   setIdentityNo('');
    //   document.getElementById('ddlBloodGroup').value = 0;
    //   document.getElementById('ddlIdentityType').value = 0;
    //   document.getElementById('male').checked = false;
    //   document.getElementById('female').checked = false;


    // }
    catch (e) {
      setShowAlertToster(0)
      setShowMeassage(e.message)
    }

  }
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text='Donor Registration' id='top' />
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className='fieldse'>{t("Donor Details")}</span>
                  <div className='row mt-2 px-2'>
                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                        <img src={phone} className='icnn' alt='' /><label htmlFor="ContactNo" className="form-label">{t("Contact No")} <span className="starMandatory">*</span></label>
                        <div className='lft'>
                          <select className="form-select form-select-sm" id='countryCode' aria-label=".form-select-sm example" style={{ width: "72px" }} >
                            {/* <option value='0'>+91</option> */}
                            {countryCodeList && countryCodeList.map((list, index) => {

                              if (list.id === countryID) {
                                return (
                                  <option value={list.id} selected>{list.countryCode}</option>
                                )
                              }
                              else {
                                return (
                                  <option value={list.id}>{list.countryCode}</option>)
                              }

                            })}
                          </select>
                          <input type="number" className="form-control form-control-sm" id="contact" name="contact" placeholder={t("Enter Contact No")} value={contact} onChange={handleChange} />

                        </div>
                        <small id='errMobile' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-6'>
                      <div className="mb-2">
                        <img src={name} className='icnn' alt='' /><label htmlFor="FullName*" className="form-label">{t("Full Name")} <span className="starMandatory">*</span></label>
                        <input type="text" className="form-control form-control-sm" id="donor" name="donor" pattern='[A-Za-z]' placeholder={t("Enter Donor Name")} onChange={handleChange} value={donor} />
                        <small id='errDonor' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-6'>
                      <div className="mb-2">
                        <img src={dob} className='icnn' alt='' /><label htmlFor="dob" className="form-label">{t("Date of Birth")} <span className="starMandatory">*</span></label>
                        <input type="date" className="form-control form-control-sm" id='regDate' name='regDate' onChange={handleChange} value={regDate} />
                        <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-6' >
                      <div className="mb-2">
                        <img src={genders} className='icnn' alt='' /> <label htmlFor="gender" className="form-label">{t("Gender")} <span className="starMandatory">*</span></label>
                        <div className='d-flex flex-direction-column gap-2'>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value={genderType} onChange={() => { getGender('M') }} id="male" />
                            <label className="form-check-label" for="gender">
                              {t("Male")}
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" onChange={() => { getGender('F') }} value={genderType} id="female" />
                            <label className="form-check-label" for="gender">
                              {t("Female")}
                            </label>
                          </div>

                        </div>
                        <small id='errGender' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    {/*  */}


                  </div>
                  <div className="row mt-2 px-2">
                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                        <img src={bloddgroup} className='icnn' alt='' /><label htmlFor="bloodGroup" className="form-label">{t("Blood Group")}<span className="starMandatory">*</span></label>
                        <select className="form-select form-select-sm" id='ddlBloodGroup' aria-label=".form-select-sm example" onChange={clearErrorDisplay}>
                          <option value='0'>{t("Select")}</option>
                          {bloodGroup && bloodGroup.map((list) => {
                            return (
                              <option value={list.id}>{list.groupName}</option>
                            )
                          })}
                        </select>
                        <small id='errBloodGroup' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                        <img src={idcard} className='icnn' alt='' /><label htmlFor="identity" className="form-label">{t("Identity Type")}<span className="starMandatory">*</span></label>
                        <select className="form-select form-select-sm" id='ddlIdentityType' aria-label=".form-select-sm example" onChange={clearErrorDisplay}>
                          <option value="0">{t("SELECT")}</option>
                          {identityType && identityType.map((list) => {
                            return (
                              <option value={list.id}>{list.idName}</option>
                            )
                          })}
                        </select>
                        <small id='errIDType' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-6'>
                      <div className="mb-2">
                        <img src={idcard} className='icnn' alt='' /><label htmlFor="identityNo" className="form-label">{t("Identity Number")} <span className="starMandatory">*</span></label>
                        <input type="text" className="form-control form-control-sm" onChange={handleChange} id="idnetityno" name="idnetityno" placeholder={t("Enter Identity Number")} value={identityNo} />
                        <small id='errIDNo' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                        <label for="address" className="form-label"> <img src={addressIcon} className='icnn' alt='' />{t("Address")}<span className="starMandatory">*</span></label>
                        <textarea className="form-control form-control-sm" id="address" name="address" placeholder={t("Enter Address")} value={address} onChange={handleChange} rows={3} />
                        <small id='errAddress' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                  </div>
                  <BoxContainer>
                  </BoxContainer>
                </div>
              </div>

              <div className="rt-btns">
                <BoxContainer>
                  <div className="mb-2 relative">
                    {/* <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label> */}
                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                      showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                        :
                        <div>
                          {isUpdateBtnShow !== true ? <>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={save}> <img src={saveBtnIcon} className='icnn' alt='' />{t("Save & Print")}</button>
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}> <img src={clearBtnIcon} className='icnn' alt='' />{t("Clear")}</button>
                          </> :
                            <>
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleEdit}>{t("Update")}</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}>{t("Cancel")}</button>
                            </>
                          }
                        </div>
                    }

                  </div>
                </BoxContainer>
              </div>
            </div>

            <div className="col-12 mt-2">

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
                  {/* <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Search.." />
                      <i className="fa fa-search"></i>
                    </form>
                  </div> */}
                  {/* <div className='listd-in'><img src={exportfile} className='icnn' alt='' /></div>
                  <div className='listd-in'><img src={printer} className='icnn' alt='' /></div> */}
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "581px" }}>
                <table className='med-table border_ striped'>
                  <thead>
                    <tr>
                      <th className="" style={{ "width": "5%" }}>S.No.</th>
                      <th>{t("Donor Info")}</th>
                      <th>{t("Identity")}</th>
                      <th>{t("Blood Group")}</th>
                      <th>{t("Address")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {donorList && donorList.map((list, index) => {
                      return (
                        <tr>
                          <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>
                          <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.countryCode}-{list.contactNumber}</span><br /><span style={{ color: '#858585', fontSize: '13px' }}>{list.donorName}</span><br /><span style={{ fontSize: '13px', color: '#929292' }}>{list.gender}, {list.age}</span></td>
                          <td><span></span><br /><span style={{ fontSize: '13px', color: '#929292' }}>{list.identityNumber}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.groupName}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.address}</span></td>
                          <td className='text-center'>
                            <div className='action-button'>
                              <div data-bs-toggle='tooltip' data-bs-little='Edit Row' data-bs-placement='bottom'><a href='#top'><img src={editBtnIcon} alt='' onClick={() => { edit(list) }} /></a></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} alt='' onClick={() => { setRowID(list.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
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
        {/*  ---------Start Delete Modal---------------  */}
        <div className='modal fade' id='deleteModal' tabIndex='-1' aria-labelledby='deleteModalLabel' aria-hidden='true'>
          <div className='modal-dialog modalDelete'>
            <div className='modal-content'>
              <div className='modal-body modelby text-center'>
                <div className='popDeleteIcon'><i className='fa fa-trash'></i></div>
                <div className='popDeleteTitle mt-3'>{t("Delete")}</div>
                <div className='popDeleteContent'>{t("Do you want to delete it")}</div>
              </div>
              <div className='modal-footer1 text-center'>
                <button type='button' className='btncancel popBtnCancel me-2' data-bs-dismiss='modal'>{t("Cancel")}</button>
                <button type='button' className='btn-delete popBtnDelete' onClick={deleteRow} data-bs-dismiss='modal'>{t("DELETE")}</button>
              </div>
            </div>
          </div>
        </div>
        {/* END MODAL */}
      </section>
    </>
  )
}
