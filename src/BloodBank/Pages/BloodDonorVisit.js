import React, { useEffect, useState } from 'react';
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import donorid from '../../BloodBank/images/donorid.svg';
import phone from '../../BloodBank/images/phone.svg';
import name from '../../BloodBank/images/name.svg';
import genders from '../../BloodBank/images/genders.svg';
//import dob from '../../BloodBank/images/dob.svg';
import dobImage from '../images/dob.svg';
import bloddgroup from '../../BloodBank/images/bloddgroup.svg';
import idcard from '../../BloodBank/images/id-card.svg';
import address from '../../BloodBank/images/address.svg';
import weight from '../../BloodBank/images/weight.svg';
import height from '../../BloodBank/images/height.svg';
import hblevel from '../../BloodBank/images/hblevel.svg';
import bp from '../../BloodBank/images/bp.svg';
import pulserate from '../../BloodBank/images/pulserate.svg';
import temprature from '../../BloodBank/images/temprature.svg';
import investigation from '../../BloodBank/images/investigation.svg';
//import donorid from '../../BloodBank/images/donorid.svg'
import uhid from '../../BloodBank/images/uhid.svg'
import segmentno from '../../BloodBank/images/segmentno.svg';
import donationtype from '../../BloodBank/images/donationtype.svg';
import donationdate from '../../BloodBank/images/donationdate.svg';
import donationtime from '../../BloodBank/images/donationtime.svg';
import GuardianName from '../../BloodBank/images/GuardianName.svg';
import RelationID from '../../BloodBank/images/RelationID.svg';
import Remark from '../../BloodBank/images/Remark.svg';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import GetDonorByDonorID from '../Api/BloodDonorRegestration/GetBlood/GetDonorByDonorID';
import GetAllVisitorList from '../Api/BloodDonorRegestration/GetBlood/GetAllVisitorList';
import DonorVisitValidations from '../../Validation/BloodBank/DonorVisitValidations';
import PostBloodDonorVisit from '../Api/BloodDonorRegestration/PostBlood/PostBloodDonorVisit';
import GetAllRelation from '../Api/BloodDonorRegestration/GetBlood/GetAllRelation';
import printer from '../../BloodBank/images/printer.svg';
import exportfile from '../../BloodBank/images/exportfile.svg';
import moment from 'moment';
import { date } from '@linways/table-to-excel';
import PutBloodDonorVisit from '../Api/BloodDonorRegestration/PutBlood/PutBloodDonorVisit';
import DeleteBloodVisit from '../Api/BloodDonorRegestration/DeleteBlood/DeleteBloodVisit';
import addressIcon from '../../BloodBank/images/address.svg';
import uhIDIcon from '../../assets/images/icons/UHID1.svg';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import weightIcon from '../../assets/images/icons/weight.svg'
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon  from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import AlertToster from '../../../src/Component/AlertToster'
import SuccessToster from '../../Component/SuccessToster'


export default function BloodDonorVisit() {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [donorId, setDonorId] = useState('');
  let [contact, setContact] = useState('');
  let [countryCode, setCountryCode] = useState('');
  let [donorName, setDonorName] = useState('');
  let [gender, setGender] = useState(false);
  let [bloodGroup, setBloodGroup] = useState('');
  let [identityNo, setIdentityNo] = useState('');
  let [address, setAddress] = useState('');
  let [uhid, setUhid] = useState('');
  let [segmentNo, setsegmentNo] = useState('');
  let [donationDate, setDonationDate] = useState('');
  let [guardianName, setGuardianName] = useState('');

  let [remark, setRemark] = useState('');
  let [weight, setWeight] = useState('');

  let [HBLevel, setHBLevel] = useState('');
  let [bloodPressure, setBloodPressure] = useState('');
  let [pulseRate, setPulseRate] = useState('');
  let [temperature, setTemperature] = useState('');
  let [bloodQuantity, setBloodQuantity] = useState('');
  let [relation, setRelation] = useState('');
  let [dob, setDob] = useState('');
  let [donorVisitList, setDonorVisitList] = useState([]);
  let [rowID, setRowID] = useState([])
  let [time, setTime] = useState('');
  let [identityType, setIdentityType] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showMessage, setShowMeassage] = useState("")
  let [showSuccessToster, setShowSuccessToster] = useState(0)

  let handleChange = async (e) => {
    const { name, value } = e.target;
    if (e.target.name === 'UHID') {
      setUhid(e.target.value);
    }

    if (name === 'DonorID') {
      // getPatientDetails(value);
      if (value.trim() === '') {
          // If uhId is empty, clear the details or perform any other action
          clear();
      } else {
        getDataByDonorID(value);
      }
  }

    if (e.target.name === 'SegmentNo') {
      setsegmentNo(e.target.value);
    }

    if (e.target.name === 'DonationDate') {
      setDonationDate(e.target.value);
    }
    if (e.target.name === 'Donationtime') {
      setTime(e.target.value);
    }
    if (e.target.name === 'GuardianName') {
      setGuardianName(e.target.value);
    }
    if (e.target.name === 'Remark') {
      setRemark(e.target.value);
    }
    if (e.target.name === 'Weight') {
      setWeight(e.target.value);
    }

    if (e.target.name === 'HBLevel') {
      setHBLevel(e.target.value);
    }
    if (e.target.name === 'BloodPressure') {
      setBloodPressure(e.target.value);
    }
    if (e.target.name === 'PulseRate') {
      setPulseRate(e.target.value);
    }
    if (e.target.name === 'Temperature') {
      setTemperature(e.target.value);
    }
    if (e.target.name === 'BloodQuantity') {
      setBloodQuantity(e.target.value);
    }

  }

  let getDataByDonorID = async (e) => {
    try {
    // let donorsID = document.getElementById('DonorID').value;
    document.getElementById('errDonor').style.display = 'none';
    let donorsId = !isNaN(e) ? e : e.target.value;
   
    setDonorId(donorsId)
    
    let data = await GetDonorByDonorID(donorsId);
    if (data.status === 1) {

      let response = data.responseValue[0];
      setContact(response.contactNumber);
      setDonorName(response.donorName);
      response.gender === 'M' ? document.getElementById('male').checked = true : document.getElementById('female').checked = true;
      setBloodGroup(response.groupName);
      setIdentityNo(response.identityNumber);
      setAddress(response.address);
      setDob(response.dobEdit);
      setIdentityType(response.idName);
      //setCountryCode(response.countryCode);
   


    

    
    }
  }
  catch (e) {
    setShowMeassage("Donor details not found for the input Donor Id")
    setShowAlertToster(1)
    setTimeout(() => {
      setShowToster(0)
    }, 2000)
}
  }



  //*********************** To Save Data ************************************/                       
  let save = async () => {
    document.getElementById('errDonor').style.display = 'none';
    const res = DonorVisitValidations(donorId);
    var id = res[1];
    if (res === true) {
      setShowUnderProcess(1);
      const DonorID = parseInt(document.getElementById('DonorID').value);
      const uhid = document.getElementById('UHID').value;
      const segmentNo = parseInt(document.getElementById('SegmentNo').value);
      const donationDate = document.getElementById('DonationDate').value;
      //const donationTime = document.getElementById('Donationtime').value;
      const guardianName = document.getElementById('GuardianName').value;
      const remark = document.getElementById('Remark').value;
      const weight = parseInt(document.getElementById('Weight').value);
      //const height = parseInt(document.getElementById('Height').value);
      const hbLevel = parseInt(document.getElementById('HBLevel').value);
      const bloodPressure = document.getElementById('BloodPressure').value;
      const pulseRate = parseInt(document.getElementById('PulseRate').value);
      const temperature = parseInt(document.getElementById('Temperature').value);
      const donationTypeId = parseInt(document.getElementById('donationType').value);
      const investigationDoneId = document.getElementById('ddlInvestigation').value;
      const relationTypeID = parseInt(document.getElementById('ddlrelation').value);
      const bloodQuantity = parseInt(document.getElementById('BloodQuantity').value);

      let dataObj =
      {
        donorID: DonorID,
        patientUHID: uhid,
        segmentNo: segmentNo,
        bloodQuantity: bloodQuantity,
        donationDate: donationDate,

        weight: weight,
        hbLevel: hbLevel,
        bp: bloodPressure,
        pulse: pulseRate,
        temp: temperature,
        remark: remark,
        guardianRelationID: relationTypeID,
        guardianName: guardianName,
        donationTypeID: donationTypeId,
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userID,
      }
      

      let data = await PostBloodDonorVisit(dataObj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage(t('Data Saved'));
        setTimeout(() => {
          clear();
          setShowToster(0);
          getVisitorList();
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
      document.getElementById(id).innerHTML = res[0];
    }
  }
  //*************************** Save Ends ****************************** */

  //**************************** Edit data ********************************* */
  let edit = (list) => {

 
    setRowID(list.visitID)
    setUhid(list.patientUHID);
    setsegmentNo(list.segmentNo);
    setBloodQuantity(list.bloodQuantity);
    setGuardianName(list.guardianName);
    //setRelation(list.guardianRelationID);
    setRemark(list.remark);
    setWeight(list.weight);
    setBloodPressure(list.bp);
    setPulseRate(list.pulse);
    setHBLevel(list.hbLevel);
    setDonorId(list.donorID);
    setDonationDate(list.donationDate);
    setTime(list.donationTime);
    setTemperature(list.temp);
    setIsUpdateBtnShow(true);
    //getDataByDonorID();


    document.getElementById('donationType').value = list.donationTypeID;
    //document.getElementById('ddlrelation').value = list.donationTypeID;
    document.getElementById('ddlInvestigation').value = list.investigationPriorToDonate;
    document.getElementById('ddlrelation').value = list.guardianRelationID;

  }

  let updateData = async () => {
    document.getElementById('errDonor').style.display = 'none';
    const res = DonorVisitValidations(donorId);
    var id = res[1];
    if (res === true) {
      const uhid = parseInt(document.getElementById('UHID').value);
      const segmentno = parseInt(document.getElementById('SegmentNo').value);
      const bloodQuantity = parseInt(document.getElementById('BloodQuantity').value);
      const guardianRelationID = parseInt(document.getElementById('ddlrelation').value);
      const remark = document.getElementById('Remark').value;
      const weight = parseInt(document.getElementById('Weight').value);
      const HBLevel = parseInt(document.getElementById('HBLevel').value);
      const bloodPressure = document.getElementById('BloodPressure').value;
      const pulseRate = parseInt(document.getElementById('PulseRate').value);
      const donationType = parseInt(document.getElementById('donationType').value);
      //const relation = document.getElementById('ddlrelation').value;
      const investigation = document.getElementById('ddlInvestigation').value;
      const donorID = parseInt(document.getElementById('DonorID').value);
      const donationDate = document.getElementById('DonationDate').value;
      const donationtime = document.getElementById('Donationtime').value;
      const temperature = parseInt(document.getElementById('Temperature').value);


      var obj = {
        id: rowID,
        patientUHID: uhid,
        segmentNo: segmentno,
        bloodQuantity: bloodQuantity,
        weight: weight,
        hbLevel: HBLevel,
        bp: bloodPressure,
        pulse: pulseRate,
        remark: remark,
        temp: temperature,
        investigationPriorToDonate: investigation,
        guardianRelationID: guardianRelationID,
        donationTypeID: donationType,
        donorID: donorID,
        donationDate: donationDate + ' ' + donationtime,

        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userID,
      }
  

      let data = await PutBloodDonorVisit(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage(t('Updated Successfully'));
        setTimeout(() => {
          setShowToster(0);
          setIsUpdateBtnShow(false);
          clear();
          getVisitorList();
        }, 2000);
      }
      else {
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage(data.responseValue);
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0);
        }, 2000)
      }
    }
    else {
      document.getElementById(id).style.display = 'block';
      document.getElementById(id).innerHTML = res[0];
    }
  }

  //**************************** Edit data end******************************** */

  let deleteData = async () => {

    const userID = JSON.parse(window.sessionStorage.getItem('LoginData')).userID;
    var obj = {
      id: rowID,
      userID: userID,
    }
    let data = await DeleteBloodVisit(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage(t('Deleted Successfully'));
      setTimeout(() => {
        setShowToster(0);
        getVisitorList();
      }, 2000);
    }
  }

  //*************************** Clear The fields ************************* */
  let clear = async () => {
    setDonorId('');
    setBloodGroup('');
    setContact('');
    setDonorName('');
    setDob('');
    setIdentityNo('');
    setIdentityType('');
    setAddress('');
    setUhid('');
    setsegmentNo('');
    document.getElementById('donationType').value = 0;
    setDob('');
    setBloodQuantity('');
    setGuardianName('');
    document.getElementById('ddlrelation').value = 0;
    setRemark('');
    setWeight('');
    setTime('');
    setDonationDate('');
    setHBLevel('');
    setBloodPressure('');
    setPulseRate('');
    setTemperature('');
    document.getElementById('ddlInvestigation').value = 0;
    setIsUpdateBtnShow(false);
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
  }


  //*************************** Clear fields ends ************************ */

  //******************** */ For dropdowns *******************************

  let getAllRelation = async () => {
    let data = await GetAllRelation();
    setRelation(data.responseValue);
  }

  //**************************** For all list ***************** */
  let getVisitorList = async () => {
    let data = await GetAllVisitorList();
    setDonorVisitList(data.responseValue);
  }
  //**************************** For All List Ends************* */

  useEffect(() => {
    getAllRelation();
    getVisitorList();
  }, []);

  return (

    <>
      <section className='main-content mt-5 pt-3'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <Heading text='Donor Visit' id='top' />
              <div className='fieldsett-in'>
                <div className='fieldsett'>
                  <span className='fieldse'>{t("Donor Details")}</span>
                  <div className="row mt-2 px-2">
                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className="d-flex align-items-baseline">
                      <img src={donorid} className='icnn' alt='' /><label htmlFor="DonorID" className="form-label">{t("Donor ID")}<span className="starMandatory">*</span></label>
                      </div>
                        <input type="number" className="form-control form-control-sm" id="DonorID" name="DonorID" value={donorId} onChange={handleChange} placeholder={t("Enter Donor ID")} />
                        <small id='errDonor' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className="d-flex align-items-baseline">
                      <img src={phone} className='icnn' alt='' /><label htmlFor="ContactNo" className="form-label">{t("Contact No")} <span className="starMandatory">*</span></label>
                      </div>
                        
                        <div className='lft'>
                          <input type="text" className="form-control form-control-sm input-right-radius" id="countryCode" name="countryCode" value={countryCode} style={{ width: "48px" }} placeholder="+91" disabled />
                          <input type="text" className="form-control form-control-sm input-left-radius" id="contact" name="contact" placeholder={t("Contact No")} value={contact} disabled />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className="d-flex align-items-baseline">
                      <img src={name} className='icnn' alt='' /><label htmlFor="FullName*" className="form-label">{t("Full Name")}</label>
                      </div>
                        
                        <input type="text" className="form-control form-control-sm" id="donor" name="donor" placeholder={t("Donor Name")} value={donorName} disabled />
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className="d-flex align-items-baseline">
                      <img src={genders} className='icnn' alt='' /> <label htmlFor="gender" className="form-label">{t("Gender")}</label>
                      </div>
                        
                        <div className='d-flex flex-direction-column gap-2'>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value={gender} id="male" disabled />
                            <label className="form-check-label" for="gender">
                              {t("Male")}
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" value={gender} id="female" disabled />
                            <label className="form-check-label" for="gender">
                              {t("Female")}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="row px-2">
                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className="d-flex align-items-baseline">
                      <img src={dobImage} className='icnn' alt='' /><label htmlFor="dob" className="form-label">{t("Date of birth")} <span className="starMandatory">*</span></label>
                      </div>
                        
                        <input type="date" className="form-control form-control-sm" id='regDate' name='regDate' value={dob} disabled />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={bloddgroup} className='icnn' alt='' /><label htmlFor="bloodGroup" className="form-label">{t("Blood group")}</label>
                      </div>
                       
                        <input type="text" className="form-control form-control-sm" id="ddlBloodGroup" value={bloodGroup} name="ddlBloodGroup" placeholder={t("Blood Group")} disabled />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={idcard} className='icnn' alt='' /><label htmlFor="identity" className="form-label">{t("Identity Type")}</label>
                      </div>
                        <input type="text" className="form-control form-control-sm" id="ddlIdentityType" value={identityType} name="ddlIdentityType" placeholder={t("Identity")} disabled />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                        <img src={idcard} className='icnn' alt='' /><label htmlFor="identityNo" className="form-label">{t("Identity Number")} <span className="starMandatory">*</span></label>
                        </div>
                        
                        <input type="text" className="form-control form-control-sm" id="idnetityno" value={identityNo} name="idnetityno" placeholder={t("Identity Number")} disabled />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                        <img src={address} className='icnn' alt='' /><label for="address" className="form-label"><img src={addressIcon} className='icnn' alt='' />{t("Address")}<span className="starMandatory">*</span></label>
                        </div>
                        
                        <textarea className="form-control form-control-sm" id="address" name="address" value={address} placeholder={t("Address")} rows={3} disabled></textarea>
                      </div>
                    </div>

                  </div>


                </div>
              </div>

              {/* Donor specific information */}
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className='fieldse'>{t("Donor Specific Information")}</span>

                  <div className='row mt-2 px-2'>
                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <label htmlFor="UHID" className="form-label"><img src={uhIDIcon} className='icnn' alt='' />{t("Uhid")}<span className="starMandatory">*</span></label>
                      </div>
                        
                        <input type="text" className="form-control form-control-sm" id="UHID" value={uhid} onChange={handleChange} name="UHID" placeholder={t("UHID")} />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={segmentno} className='icnn' alt='' /><label htmlFor="SegmentNo" className="form-label">{t("Segment No")}<span className="starMandatory">*</span></label>
                      </div>
                        
                        <input type="text" className="form-control form-control-sm" id="SegmentNo" name="SegmentNo" value={segmentNo} onChange={handleChange} placeholder={t("Enter Segment No")} />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={donationtype} className='icnn' alt='' /><label htmlFor="Donationtype" className="form-label">{t("Donation type")}</label>
                      </div>
                        
                        <select className="form-select form-select-sm" id='donationType' aria-label=".form-select-sm example">

                          <option value='0'>{t("Apherisis Donation")}</option>
                          <option value='1'>{t("Family Donor Donation")}</option>
                          <option value='2'>{t("Replacement Donation")}</option>
                          <option value='3'>{t("Voluntary Donation")}</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={donationdate} className='icnn' alt='' /><label htmlFor="DonationDate" className="form-label">{t("Donation Date")}<span className="starMandatory">*</span></label>
                      </div>
                        
                        <input type="date" className="form-control form-control-sm" id="DonationDate" value={donationDate} onChange={handleChange} name="DonationDate" placeholder={t("Enter Donation Date")} />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={donationtime} className='icnn' alt='' /><label htmlFor="Donationtime" className="form-label">{t("Donation Time")}<span className="starMandatory">*</span></label>
                      </div>
                        
                        <input type="time" className="form-control form-control-sm" id="Donationtime" name="Donationtime" value={time} onChange={handleChange} placeholder={t("Enter Donation Time")} />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={donationtype} className='icnn' alt='' /><label htmlFor="bloodQuantity" className="form-label">{t("Blood Quantity")}<span className="starMandatory">*</span></label>
                      </div>
                        
                        <input type="number" className="form-control form-control-sm" id="BloodQuantity" name="BloodQuantity" value={bloodQuantity} onChange={handleChange} placeholder={t("Enter Blood Quantity")} />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={GuardianName} className='icnn' alt='' /><label htmlFor="GuardianName" className="form-label">{t("Guardian Name")}<span className="starMandatory">*</span></label>
                      </div>
                        
                        <input type="text" className="form-control form-control-sm" id="GuardianName" name="GuardianName" onChange={handleChange} value={guardianName} placeholder={t("Enter Guardian Name")} />
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={RelationID} className='icnn' alt='' /><label htmlFor="Relation" className="form-label">{t("Relation")}</label>
                      </div>
                        
                        <select className="form-select form-select-sm" id='ddlrelation' aria-label=".form-select-sm example">
                          <option value='0'>{t("Select Relation")}</option>
                          {relation && relation.map((list, index) => {
                            return (
                              <option value={list.id}>{list.guardianRelationName}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={Remark} className='icnn' alt='' /><label htmlFor="Remark" className="form-label">{t("Remark")}<span className="starMandatory">*</span></label>
                      </div>
                        
                        <textarea className="form-control form-control-sm" id="Remark" name="Remark" value={remark} onChange={handleChange} rows={3} placeholder={t("Remarks")} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              {/* Donor Specific information ends */}

              {/* Vital details start */}
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className='fieldse'>{t("Vitals Details")}</span>
                  <div className="row mt-2 px-2">
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-2">
                          <div className='d-flex align-items-baseline'>
                         <label htmlFor="Weight" className="form-label"><img src={weightIcon} className='icnn' alt='' />{t("Weight")}<span className="starMandatory">*</span></label>
                          </div>
                        
                        <input type="text" className="form-control form-control-sm" id="Weight" name="Weight" onChange={handleChange} value={weight} placeholder={t("Enter Weight")} />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={hblevel} className='icnn' alt='' />
                      <label htmlFor="HBLevel" className="form-label">{t("HB Level")}<span className="starMandatory">*</span></label>
                      </div>
                        
                        <input type="text" className="form-control form-control-sm" id="HBLevel" name="HBLevel" value={HBLevel} onChange={handleChange} placeholder={t("Enter HB Level")} />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-2">
                          <div className='d-flex align-items-baseline'>
                          <img src={bp} className='icnn' alt='' />
                          <label htmlFor="BloodPressure" className="form-label">{t("Blood Pressure")}<span className="starMandatory">*</span></label>
                          </div>
                        
                        <input type="text" className="form-control form-control-sm" id="BloodPressure" name="BloodPressure" value={bloodPressure} onChange={handleChange} placeholder={t("Enter Blood Pressure")} />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-2">
                      <div className='d-flex align-items-baseline'>
                      <img src={pulserate} className='icnn' alt='' />
                      <label htmlFor="PulseRate" className="form-label">{t("Pulse Rate")}<span className="starMandatory">*</span></label>
                      </div>
                        
                        <input type="text" className="form-control form-control-sm" id="PulseRate" name="PulseRate" onChange={handleChange} value={pulseRate} placeholder={t("Enter Pulse Rate")} />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-2">
                        <div className='d-flex align-items-baseline'>
                          <img src={temprature} className='icnn' alt='' />
                          <label htmlFor="Temperature" className="form-label">{t("Temperature")}<span className="starMandatory">*</span></label>
                        </div>
                        <input type="text" className="form-control form-control-sm" id="Temperature" name="Temperature" onChange={handleChange} value={temperature} placeholder={t("Enter Temperature")} />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                      <div className="mb-2">
                        <div className="d-flex align-items-baseline">
                          <img src={investigation} className='icnn' alt='' />
                          <label htmlFor="Investigation" className="form-label">{t("Investigation prior to donate")}</label>
                        </div>
                        <select className="form-select form-select-sm" id='ddlInvestigation' aria-label=".form-select-sm example">
                          <option value='0'>{t("Select Investigation")}</option>
                          <option value='Yes'>{t("Yes")}</option>
                          <option value='No'>{t("No")}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              {/* Vital details ends */}

              {/* Buttons start */}

              {/* Button Ends */}
            </div>

            <div className='col-12'>
              <div className="d-flex flex-wrap gap-3 p-2_ boxcontainer justify-content-end">
                <div className="mb-2 relative_">
                  {/* <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label> */}
                  {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                    showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                      :
                      <div>
                        {isUpdateBtnShow !== true ? <>
                          <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={save}> <img src={saveBtnIcon} className='icnn' alt='' />{t("Save")}</button>
                          <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}> <img src={clearBtnIcon} className='icnn' alt='' />{t("Clear")}</button>
                        </> :
                          <>
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={updateData}>{t("Update")}</button>
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}>{t("Cancel")}</button>
                          </>
                        }
                      </div>
                  }

                </div>
              </div>



            </div>
            {/* List */}
            <div className="col-12 mt-2">

              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <div className='listd-in'><img src={dobImage} className='icnn' alt=''/> <span style={{ color: '#1D4999', fontWeight: 'bold', fontSize: '14px' }}>Select Date</span></div>
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
                <table className='med-table border striped'>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "0%" }}>#</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Donor Info")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("B.Group")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Donor ID")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{("Uhid")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Segment No")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Donation type")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Date-Time")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Blood Qty")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Guardian")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Remark")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Weight")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("HB Level")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("BP")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Pulse")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Temp")}</th>
                      <th style={{ textAlign: 'center', "width": "1%" }}>{t("Ix")}</th>
                      <th style={{ "width": "3%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {donorVisitList && donorVisitList.map((list, index) => {
                      return (
                        <tr>
                          <td className='text-center'>{index + 1}</td>
                          <td style={{ textAlign: 'center' }}><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.countryCode}-{list.contactNumber}</span><br /><span style={{ color: '#7B7B7B', fontSize: '13px' }}>{list.donorName}</span><br /><span style={{ fontSize: '13px', color: '#929292' }}>{list.gender}, {list.age}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.groupName}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.donorID}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.patientUHID}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.segmentNo}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.donationTypeID}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.donationDate}<br />{list.donationTime}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.bloodQuantity}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.guardianName}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.remark}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.weight}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.hbLevel}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.bp}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.pulse}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.temp}</span></td>  {/*add temp */}
                          <td style={{ textAlign: 'center' }}><span style={{ fontSize: '13px', color: '#7B7B7B' }}>{list.investigationPriorToDonate}</span></td>
                          <td>
                            <div className='action-button'>
                              <div data-bs-toggle='tooltip' data-bs-little='Edit Row' data-bs-placement='bottom'><a href='#top'><img src={editBtnIcon} className='' alt='' onClick={() => { edit(list); getDataByDonorID(list.donorID); }}/></a></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.visitID) }}  /></div>
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
        {/* Modal for Delete */}
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
                <button type='button' className='btn-delete popBtnDelete' onClick={deleteData} data-bs-dismiss='modal'>{t("Delete")}</button>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}
