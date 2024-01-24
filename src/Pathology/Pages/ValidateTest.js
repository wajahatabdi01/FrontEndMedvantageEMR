import React, { useState } from 'react';
import BoxContainer from '../../Component/BoxContainer';
import Heading from '../../Component/Heading';
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'
import bill from '../../assets/images/icons/bill.svg';
import age from '../../assets/images/icons/age.svg';
import patient from '../../assets/images/icons/patient.svg'
import gender from '../../assets/images/icons/gender.svg'
import samples from '../../assets/images/icons/sample.svg'
import uhidIcon from '../../assets/images/icons/UHID1.svg'
import billDateIcon from '../../assets/images/icons/calender.svg'
import RefBy from '../../assets/images/icons/Ref By.svg'
import ward from '../../assets/images/icons/ward.svg'
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import validate from '../../assets/images/icons/validate.svg'
import visible from '../../assets/images/icons/viewIcon.svg'
import modify from '../../assets/images/icons/modify.svg'
import validate1 from '../../assets/images/icons/validate1.svg'
import edit from '../../assets/images/icons/edit.svg'
import save from '../../assets/images/icons/save.svg'
import { useEffect } from 'react';
import GetValidateTestList from '../Api/ValidateTest/GetValidateTestList';
import TableContainer from '../../Component/TableContainer';
// import GetPatientPersonalDashboardByUHID from '../../Registartion/API/GET/GetPatientPersonalDashboardByUHID';
import GetSubTestForValidationByMainAndTestId from '../Api/ValidateTest/GetSubTestForValidationByMainAndTestId';
import GetPerformTest from '../Api/GetPerformtest';
import GetSubTest from '../Api/GetSubTest';
import { json } from 'react-router-dom';
import PostValidateTest from '../Api/ValidateTest/PostValidateTest';
import GetResultByTestIdAndSampleCollectionSubId from '../Api/ValidateTest/GetResultByTestIdAndSampleCollectionSubId';
import PostModifyValidateTest from '../Api/ValidateTest/PostModifyValidateTest';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import GetPatientBillingDetails from '../Api/GetPatientBillingDetails';
import { FindByQuery } from '../../Code/Serach';
import GetPatientPersonalDashboardByUHID from '../../Registartion/API/GET/GetPatientPersonalDashboardByUHID';
import AlertToster from '../../Component/AlertToster';
import SaveButton from '../../Component/SaveButton';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function ValidateTest() {
  let [patientDetails, setPatientDetails] = useState([])
  let [billNo, setBillNo] = useState('');
  let [searchValue, setSearchValue] = useState([])
  let [remarkModify, setRemarkModify] = useState('');
  let [theAge, setTheAge] = useState('');
  let [theGender, setTheGender] = useState('');
  let [ageType, setAgeType] = useState('');
  let [sampleType, setSampleType] = useState('');
  let [getLabNo, setLabNo] = useState('');
  let [getTestID, setTestID] = useState('');
  let [sampleCollectionSubId, setSampleCollectionSubId] = useState('');
  let [validateList, setValidateList] = useState([]);
  let [validateListTemp, setValidateListTemp] = useState([]);
  let [getSubTestList, setSubTestList] = useState([])
  let [eyeClick, setEyeClick] = useState(false);
  let [modifyClick, setModifyClick] = useState(false);
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId)
  let [validateTestList, setValidateTestList] = useState([]);
  let [getPerformTestList, setPerformTestList] = useState([]);
  let [subTestValueList, setSubTestValueList] = useState([]);
  let [showButtons, setShowButtons] = useState(false)
  let [validateActive, setValidateActive] = useState(true);
  let [showRemark, setShowRemark] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  let [selectedSubtestList, setSelectedSubtestList] = useState([]);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [showUnderProcessValidate, setShowUnderProcessValidate] = useState(0);
  let [showTosterValidate, setShowTosterValidate] = useState(0);
  let [tosterMessageValidate, setTosterMessageValidate] = useState("");
  let [tosterValueValidate, setTosterValueValidate] = useState(0);
  let [showImage, setShowImage] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  let temp = [...subTestValueList];
  let handleBillNoChange = (e) => {
    if (e.target.name === 'billNo') {
      setBillNo(e.target.value);
    }
    else if (e.target.name === 'remarkForSubTest') {
      setRemarkModify(e.target.value);
    }

  }

  let getValidateTestList = async () => {
    const userLoggedID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;

    let dataValidateList = await GetValidateTestList(userLoggedID,clientID);
    if(dataValidateList.status === 1){
      setShowImage(0)
    setValidateList(dataValidateList.responseValue);
    setValidateListTemp(dataValidateList.responseValue)
  }
   
    else{
      setShowImage(1)
    }
    //setValidateJsonList(dataValidateList.responseValue.testID);

  }

  let getPatientDetails = async (billNum, billDatee, theUHID, samplecollectionMainID, labNo) => {


    setLabNo(labNo)
    setBillNo(billNum);
    let detailsPatient = await GetPatientPersonalDashboardByUHID(theUHID);
    let getPatientDetails = await GetPatientBillingDetails(billNum,clientID)
    let detailsOfSample = await GetSubTestForValidationByMainAndTestId(samplecollectionMainID, userID,clientID);
    const patientBillingDetails = getPatientDetails.responseValue[0];
    setPatientDetails(patientBillingDetails)
    setValidateTestList(detailsOfSample.responseValue);
    setTheAge(patientBillingDetails.age);
    setTheGender(patientBillingDetails.gender);
    setAgeType(patientBillingDetails.agetype);

    var parserData = JSON.parse(patientBillingDetails.sampleTypeList);
    var formatCol = "";

    for (var k = 0; k < parserData.length; k++) {


      formatCol = formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' + parserData[k].sampleType;

    }
    setSampleType(formatCol)



  }

  let funGetPerformTest = async () => {

    let getResult = await GetPerformTest(billNo,clientID);
    if (getResult.status === 1) {
      //const patientDetails = getResult.responseValue['personalInformation'][0];
      const testList = getResult.responseValue.tests;


      setPerformTestList(testList);
      setTestID(testList.testID);
      setSampleCollectionSubId(testList.sampleCollectionSubId)
    }
  }

  let getSubtestData = async (event, subTestId) => {
    setShowButtons(true)
    setIsChecked(true);
    setShowRemark(true);
    setTestID(event)
    setSampleCollectionSubId(subTestId);


    let getSubTestResult = await GetSubTest(event,clientID);

    if (getSubTestResult.status === 1) {
      setTimeout(async () => {
        let getDetailsByTestIdAndSubTestId = await GetResultByTestIdAndSampleCollectionSubId(event, subTestId,clientID);
        setSubTestValueList(getDetailsByTestIdAndSubTestId.responseValue);
        // setSelectedSubtestList(getDetailsByTestIdAndSubTestId.responseValue)

      }, 1000)
    }
    setSubTestList(getSubTestResult.responseValue);


  }

  let subTestHandleChange = (key, key2) => {

    var getResult = document.getElementById('subtestDisabled' + key2).value;

    var tempArr = [...subTestValueList]

    var index = tempArr.findIndex((arr) => arr.id === key);

    if (key2 === tempArr[index].subtestID) {


      tempArr.splice(index, 1, {
        currentValidateLevel: subTestValueList[index].currentValidateLevel,
        isModified: subTestValueList[index].isModified,
        isNormalResult: subTestValueList[index].isNormalResult,
        isPrinted: subTestValueList[index].isPrinted,
        machineID: subTestValueList[index].machineID,
        machineName: subTestValueList[index].machineName,
        normalRangeID: subTestValueList[index].normalRangeID,
        normalRangeID1: subTestValueList[index].normalRangeID1,
        normalRangeText: subTestValueList[index].normalRangeText,
        resultRemark1: subTestValueList[index].resultRemark1,
        resultText: subTestValueList[index].resultText,
        subTestName: subTestValueList[index].subTestName,

        id: subTestValueList[index].id,
        resultUnitID: subTestValueList[index].resultUnitID,
        result: getResult,
        userId: userID,
        //resultRemark: remarkModify,
        sampleCollectionSubID: subTestValueList[index].sampleCollectionSubID,
        subtestID: subTestValueList[index].subtestID,
        testID: subTestValueList[index].testID,
        resultDateTime: subTestValueList[index].resultDateTime



      })

      setSubTestValueList(tempArr)

    }
  }

  let getDataDetail = (id, name, unit) => {

    const targetInputBox = document.getElementById("checkSubTest" + id).checked;

    if (targetInputBox === false) {
      document.getElementById("subtestDisabled" + id).setAttribute('disabled', 'disabled');


      for (var i = 0; i < temp.length; i++) {
        if (temp[i].subtestID === id) {

          temp.splice(i, 1)

        }
      }
      setSelectedSubtestList(temp);


    }
    else {
      document.getElementById('subtestDisabled' + id).removeAttribute("disabled");
    }
  }

  let validateTheTest = async () => {
    if (validateActive === true) {
      
      let validateTestIDArr = []

      for (var i = 0; i < validateTestList.length; i++) {

        for (var j = 0; j < JSON.parse(validateTestList[i].jsonResult).length; j++) {
          validateTestIDArr.push({
            testResultRowId: JSON.parse(validateTestList[i].jsonResult)[j].testResultRowId
          })

        }
      }



      let obj =
      {
        userId: userID,
        resultValidationJson: JSON.stringify(validateTestIDArr),
        clientId:clientID
      }
     

      let data = await PostValidateTest(obj);
      if (data.status === 1) {
        setValidateActive(false);
        setShowUnderProcessValidate(0);
        setTosterValueValidate(0);
        setShowTosterValidate(1);
        setTosterMessageValidate('Data Validated Successfully!');
        setTimeout(() => {
          setShowTosterValidate(0)
        }, 2000)
        setTimeout(() => {
          readOnlyAfterModify();
          funGetPerformTest();
        }, 1000);

        if (validateActive === false) {
          setShowAlertToster(1);
          setShowErrMessage('Test has been Validated!')
        }
      }
      else {
        setShowUnderProcess(0)
        setShowTosterValidate(1)//0 for save and warning 1 for Error
        setTosterMessageValidate(data.responseValue)
        setTosterValueValidate(1)
        setTimeout(() => {
          setShowTosterValidate(0)
        }, 2000)
      }

    }
    else{
      setShowAlertToster(1);
          setShowErrMessage('Test has been Validated!')
    }
  }

  // ####################### To Open and Close Details of Patient ##########################
  let openPatientDetails = () => {
    setEyeClick(true);
  }

  let openModifyPage = () => {
    setModifyClick(true);
  }

  let previousPage = () => {
    setValidateActive(true);
    setEyeClick(false);
    getValidateTestList();
  }
  let previousPageModify = () => {
    setModifyClick(false);
    //setValidateActive(true)

  }


  let saveModifiedData = async () => {

    let finalArr = [];
    let tempArr = [];
    if (billNo === '0' || billNo === undefined || billNo === null || billNo === "") {
      setShowAlertToster(1);
      setShowErrMessage('Please fill Bill Number!')
    }
    else {

      for (var i = 0; i < temp.length; i++) {
        if (temp[i].result !== '') {
          finalArr.push({
            testResultRowId: temp[i].id,
            sampleCollectionSubID: temp[i].sampleCollectionSubID,
            testID: temp[i].testID,
            subtestId: temp[i].subtestID,
            result: temp[i].result,
            resultUnitID: temp[i].resultUnitID,
            resultDateTime: temp[i].resultDateTime,
            patientAge: theAge,
            theGender: theGender,
            ageType: ageType,
            userId: userID,
            resultRemark: remarkModify
          })
        }
      }

      var obj = {
        userId:userID,
        modifiedResultJson: JSON.stringify(finalArr),
        clientId:clientID
      }
     


      if (finalArr.length !== subTestValueList.length) {

        setShowAlertToster(1);
          setShowErrMessage('Please Fill Data!')
      }
      else {
        let saveData = await PostModifyValidateTest(obj);

        if (saveData.status === 1) {
          setShowUnderProcess(0);
          setTosterValue(0);
          setShowToster(1);
          setTosterMessage('Data Modified Successfully!');
          setTimeout(() => {
            setShowToster(0)
          }, 2000)
          setTimeout(() => {
            readOnlyAfterModify();
            funGetPerformTest();
          }, 1000);


        }
        else {
          setShowUnderProcess(0)
          setShowToster(1)//0 for save and warning 1 for Error
          setTosterMessage(saveData.responseValue)
          setTosterValue(1)
          setTimeout(() => {
            setShowToster(0)
          }, 2000)
        }
      }
    }
  }

  let readOnlyAfterModify = () => {
    for (var i = 0; i < getSubTestList.length ; i++) {
      if(document.getElementById("checkSubTest" + getSubTestList[i].id)!== null)
      {
        document.getElementById("checkSubTest" + getSubTestList[i].id).setAttribute('disabled', 'disabled');
        document.getElementById("subtestDisabled" + getSubTestList[i].id).setAttribute('disabled', 'disabled');
        document.getElementById('remarkForSubTest').value = "";
      }
     
    }
  }

  ////////////////////To search the bills ///////////////////////////
  let handleSearch = () => {
    
    let response = FindByQuery(validateList, searchValue, "billNo");
  
    if(searchValue.length !==0 && searchValue.length !== undefined) {
      if(response.length !== 0){
        setValidateListTemp(response)
      } 
      else{
        setValidateListTemp([])
      }
    }
  }
  useEffect(() => {
    getValidateTestList();
  }, [])
  return (
    <>


      <section className='main-content mt-5 pt-3'>
        <div className='container-fluid'>
          {(eyeClick === false && modifyClick === false) &&
            <div className='row'>
            <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Laboratory_Validate_Test")}</div></div></div>
              <div className="col-12">
                  <div className='whitebg1'>
                    <div className='whitebg'>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 analuze">
                        <div className="fieldsett-in">
                          <div className="fieldsett">
                            <span className='fieldse'>{t("Laboratory_Validation")}</span>
                            <BoxContainer>
                              
                              <div className="mt-2 me-2" >
                                {/* <div className='col-12'> 
                                          <img src={bill} className='icnn' alt=''/> <label htmlFor="Bill" className="form-label">Bill No./UHID</label>                             
                                        </div> */}

                                <div className='sert'>
                                  <div className='sertin'>
                                    <input type="text" className="form-control form-control-sm" id="Bill" name="Bill" placeholder={t("Enter_Bill_No.")}onChange={(e) => { setSearchValue(e.target.value); if(e.target.value.length === 0){ setValidateListTemp(validateList)} }} />
                                  </div>
                                  <div className='searchbtnn' onClick={handleSearch}>
                                    <button><i className='fa fa-search' ></i>{t("Search_Result")}</button>
                                  </div>

                                </div>
                              </div>
                            </BoxContainer>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
              </div>
              {/* <img src={saveBtnIcon} className='icnn' alt='' /> */}
              <div className="col-12 mt-1">
                <div className="med-table-section whitebg" style={{ "height": "77vh" , position:'relative' }}>
                {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                  <table className='med-table border_ striped'>
                    <thead>
                      <tr>
                        <th className="" >{t("S.No.")}</th>
                        <th>{t("Bill_No.")}</th>
                        <th>{t("Lab_NO")}</th>
                        <th>{t("DATE")}</th>

                        <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                      </tr>
                    </thead>

                    <tbody>
                      {validateListTemp && validateListTemp.map((list, index) => {
                        
                        return (

                          <>

                            <tr key={list.samplecollectionMainID}>
                              <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>
                              <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.billNo}</span></td>
                              <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.labNumber}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.createdDate}</span></td>
                              <td className='text-center'>
                                <div className='action-button'>
                                  <div data-bs-toggle='tooltip' data-bs-little='Edit Row' data-bs-placement='bottom'><a href='#top'><img src={visible}  style={{'width':'20px','border-radius':'5px'}} alt='' onClick={() => { openPatientDetails(); getPatientDetails(list.billNo, list.createdDate, list.uhid, list.samplecollectionMainID, list.labNumber); }} /></a></div>
                                </div>
                              </td>
                            </tr>
                          </>
                        )
                      })}


                    </tbody>
                  </table>}
                </div>
              </div>
            </div>
          }


          {/* ################################ After Clicking on Eye Button ################################ */}
          {(eyeClick === true && modifyClick === false) &&
            <div className='row'>
              <div class="col-12"><div class="med-box  mb-1"><div class="title" id='top' >{t("Validate_Test")}</div></div></div>
              <div className="col-12"> 
                <div className="fieldsett-in whitebg">
                  <div className="fieldsett">
                    <span className='fieldse'>{t("Patient_Details")}</span>
                    <div class="inner-content">
                      <div className='dflex regEqualColums'>
                        <div className='col-2'>
                          <div className="mb-2">
                            <div className='d-flex align-items-baseline'>
                            <img src={bill} className='icnn' alt='icnn' />
                              <label htmlFor="UHID" className="form-label">{t("Bill_No.")}</label>
                            </div>
                            <input type="text" className="form-control form-control-sm" id="billNo" value={billNo} name="billNo" onChange={''} placeholder={t("Bill_No.")} disabled />
                          </div>

                        </div>
                        <div className='col-2'>
                          <div className="mb-2">
                            <div className='d-flex align-items-baseline'>
                            <img src={patient} className='icnn' alt='icnn' />
                              <label htmlFor="PatientName" className="form-label">{t("Patient_nm")}</label>
                            </div>
                            {patientDetails.length === 0? <input type="text" className="form-control form-control-sm" id="PatientName" name="PatientName" value={''} onChange={''} placeholder={t("Patient_nm")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="PatientName" name="PatientName" value={patientDetails.patientName} onChange={''} placeholder={t("Patient_nm")} disabled />}
                            
                          </div>

                        </div>
                        <div className='col-2'>
                          <div className='mb-2'>
                            <div className='d-flex align-items-baseline'>
                            <img src={age} className='icnn' alt='icnn' />
                              <label htmlFor="Age" className="form-label">{t("Age")}</label>
                            </div>
                            {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="Age" name="Age" onChange={''} value={''} placeholder={t("Age")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="Age" name="Age" onChange={''} value={patientDetails.age + ' Years'} placeholder={t("Age")} disabled />}
                          </div>
                        </div>

                        <div className='col-2'>
                          <div className='mb-2'>
                            <div className='d-flex align-items-baseline'>
                            <img src={gender} className='icnn' alt='icnn' />
                              <label htmlFor="Age" className="form-label">{t("Gender")}</label>
                            </div>
                            {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="gender" name="gender" onChange={''} value={''} placeholder={t("Gender")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="gender" name="gender" onChange={''} value={patientDetails.gender} placeholder={t("Gender")} disabled />}
                          </div>
                        </div>
                        <div className='col-2'>
                          <div className='mb-2'>
                            <div className='d-flex align-items-baseline'>
                            <img src={billDateIcon} className='icnn' alt='icnn' />
                              <label htmlFor="Age" className="form-label">{t("Bill_Date")}</label>
                            </div>
                            {patientDetails.length===0 ? <input type="text" className="form-control form-control-sm" id="billDate" name="billDate" onChange={''} value={''} placeholder={t("Bill_Date")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="billDate" name="billDate" onChange={''} value={patientDetails.billDate} placeholder={t("Bill_Date")} disabled />}
                          </div>
                        </div>
                        <div className='col-2'>
                          <div className='mb-2'>
                            <div className='d-flex align-items-baseline'>
                            <img src={uhidIcon} className='icnn' alt='icnn' />
                              <label htmlFor="Age" className="form-label">{t("Uhid")}</label>
                            </div>
                            {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="uhid" name="uhid" onChange={''} value={''} placeholder={t("Uhid")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="uhid" name="uhid" onChange={''} value={patientDetails.uhId} placeholder={t("Uhid")} disabled />}
                          </div>

                        </div>
                        <div className='col-2'>
                        <div className="mb-2">
                          <div className='d-flex align-items-baseline'>
                          <img src={uhidIcon} className='icnn' alt='icnn' />
                            <label htmlFor="CRNo" className="form-label">{t("Cr No")}</label>
                          </div>
                          {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="crNo" name="crNo" value={''} onChange={''} placeholder={t("Cr No")} disabled />:
                          <input type="text" className="form-control form-control-sm" id="crNo" name="crNo" value={patientDetails.crNo} onChange={''} placeholder={t("Cr No")} disabled />}
                        </div>

                        </div>
                        <div className='col-2'>
                        <div className='mb-2'>
                          <div className='d-flex align-items-baseline'>
                          <img src={uhidIcon} className='icnn' alt='icnn' />
                            <label htmlFor="Age" className="form-label">{t("IPNo")}</label>
                          </div>
                          {patientDetails.length === 0 ?<input type="text" className="form-control form-control-sm" id="ipNo" name="ipNo" onChange={''} value={''} placeholder={t("IPNo")}disabled />:
                          <input type="text" className="form-control form-control-sm" id="ipNo" name="ipNo" onChange={''} value={patientDetails.ipNo} placeholder={t("IPNo")} disabled />}
                        </div>
                        </div>

                        <div className='col-2'>
                        <div className='mb-2'>
                          <div className='d-flex align-items-baseline'>
                          <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="Age" className="form-label">{t("Center")}</label>
                          </div>
                          {patientDetails.length === 0? <input type="text" className="form-control form-control-sm" id="centre" name="centre" onChange={''} value={''} placeholder={t("Center")} disabled />:
                          <input type="text" className="form-control form-control-sm" id="centre" name="centre" onChange={''} value={patientDetails.patientType} placeholder={t("Center")} disabled />}
                        </div>
                        </div>
                        <div className='col-2'>
                        <div className='mb-2'>
                          <div className='d-flex align-items-baseline'>
                          <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="Age" className="form-label">{t("ward")}</label>
                          </div>
                          {patientDetails.length === 0 ?<input type="text" className="form-control form-control-sm" id="ward" name="ward" onChange={''} value={''} placeholder={t("ward")} disabled />:
                          <input type="text" className="form-control form-control-sm" id="ward" name="ward" onChange={''} value={patientDetails.wardName} placeholder={t("ward")} disabled />}
                        </div>
                        </div>
                        <div className='col-2'>
                        <div className='mb-2'>
                          <div className='d-flex align-items-baseline'>
                          <img src={RefBy} className='icnn' alt='icnn' />
                            <label htmlFor="Age" className="form-label">{t("Ref_By")}</label>
                          </div>
                          {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="refBy" name="refBy" onChange={''} value={''} placeholder={t("Ref_By")} disabled />:
                          <input type="text" className="form-control form-control-sm" id="refBy" name="refBy" onChange={''} value={patientDetails.drName} placeholder={t("Ref_By")} disabled />}
                        </div>

                        </div>
                        <div className='col-2'>
                        <div className="mb-2">
                          <div className='d-flex align-items-baseline'>
                          <img src={samples} className='icnn' alt='icnn' />
                            <label htmlFor="UHID" className="form-label">{t("Samples")}</label>
                          </div>
                          <input type="text" className="form-control form-control-sm" id="samples" value={sampleType.toUpperCase()} name="samples" onChange={''} placeholder={t("Samples")} disabled />
                        </div>

                        </div>
                      </div>
                    </div>

                  </div>


                  <div className="rt-btns">
                      <div className="relative mt-2">
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={previousPage}>Back</button>
                      </div>
                  </div>
                </div>
                <div className='col-12 mt-1 whitebg' style={{padding:"0 10px"}}>
                  <div className="med-box"><div className="title">Tests List</div></div>

                  <div className="med-table-section repeat mb-2 " style={{height:"545px"}}>
                    <table className="med-table border_ striped">
                      {validateTestList && validateTestList.map((sampleList, index) => {                      
                        return (<>
                          <thead className='py-2' key={sampleList.testID}>
                            <tr style={{ backgroundColor: '#1d499926' }}>
                              <th colSpan={3} style={{ color: '#f27539' }}>{sampleList.testname}</th>
                            </tr>
                            <tr>
                              <th>{t("Subtest_name")}</th>
                              <th>{t("Value")}</th>
                              <th>{t("Normal_Range")}</th>
                            </tr>
                          </thead>

                          <tbody>
                            {JSON.parse(sampleList.jsonResult).map((val) => {
                              return (
                                <tr key={val.testResultRowId}>
                                  <td>{val.subTestName}</td>
                                  {val.isNormalResult === 0 ? <td style={{ fontWeight: 'bold', color: 'red' }}>{val.result}</td> : <td>{val.result}</td>}

                                  <td>{val.rangeRemark}</td>
                                </tr>
                              )
                            })}

                          </tbody>
                        </>
                        )
                      })}

                    </table>
                  </div>


                  <div className="med-box mt-1">
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex column-gap-2 flex-wrap justify-content-end pt-1">
                          {showUnderProcessValidate === 1 ? <><TosterUnderProcess /></> :
                            showTosterValidate === 1 ? <Toster value={tosterValueValidate} message={tosterMessageValidate} /> : <>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#validateModal"><img src={validate1} className='icnn'  alt='' />{t("Validate")}</button>
                              <button type="button" className="btn btn-save btn-clear btn-sm mb-1 me-1" onClick={() => { openModifyPage(); funGetPerformTest(); }}><img src={modify} className='icnn'  alt='' />{t("Modify")}</button></>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}

          {/* ################################### After Clicking on Modify Button ############################ */}
          {(modifyClick === true && eyeClick === true) &&
            <div className='row'>
              <div class="col-12"><div class="med-box  mb-1"><div class="title" id='top'>{t("Modify_Laboratory_Test")}</div></div></div>
              <div className="col-12">
                <div className="fieldsett-in whitebg">
                  <div className="fieldsett">
                    <span className='fieldse'>{t("Patient_Details")}</span>
                    <div class="inner-content">
                      <div className='dflex regEqualColums'>

                        <div className='col-2'>
                          <div className="mb-2">
                            <div className='d-flex align-items-baseline'>
                            <img src={bill} className='icnn' alt='icnn' />
                              <label htmlFor="UHID" className="form-label">{t("Bill_No.")}</label>
                            </div>
                            <input type="text" className="form-control form-control-sm" id="billNo" value={billNo} name="billNo" onChange={''} placeholder={t("Bill_No.")} disabled />
                          </div>

                        </div>
                        <div className='col-2'>
                          <div className="mb-2">
                            <div className='d-flex align-items-baseline'>
                            <img src={patient} className='icnn' alt='icnn' />
                              <label htmlFor="PatientName" className="form-label">{t("Patient_nm")}</label>
                            </div>
                            {patientDetails.length === 0? <input type="text" className="form-control form-control-sm" id="PatientName" name="PatientName" value={''} onChange={''} placeholder={t("Patient_nm")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="PatientName" name="PatientName" value={patientDetails.patientName} onChange={''} placeholder={t("Patient_nm")} disabled />}
                          </div>

                        </div>
                        <div className='col-2'>
                          <div className='mb-2'>
                            <div className='d-flex align-items-baseline'>
                            <img src={age} className='icnn' alt='icnn' />
                              <label htmlFor="Age" className="form-label">{t("Age")}</label>
                            </div>
                            {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="Age" name="Age" onChange={''} value={''} placeholder={t("Age")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="Age" name="Age" onChange={''} value={patientDetails.age + ' Years'} placeholder={t("Age")} disabled />}
                          </div>
                        </div>
                        <div className='col-2'>
                          <div className='mb-2'>
                            <div className='d-flex align-items-baseline'>
                            <img src={gender} className='icnn' alt='icnn' />
                              <label htmlFor="Age" className="form-label">{t("Gender")}</label>
                            </div>
                            {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="gender" name="gender" onChange={''} value={''} placeholder={t("Gender")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="gender" name="gender" onChange={''} value={patientDetails.gender} placeholder={t("Gender")} disabled />}
                          </div>
                        </div>
                        <div className='col-2'>
                          <div className='mb-2'>
                            <div className='d-flex align-items-baseline'>
                            <img src={billDateIcon} className='icnn' alt='icnn' />
                              <label htmlFor="Age" className="form-label">{t("Bill_Date")}</label>
                            </div>
                            {patientDetails.length===0 ? <input type="text" className="form-control form-control-sm" id="billDate" name="billDate" onChange={''} value={''} placeholder={t("Bill_Date")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="billDate" name="billDate" onChange={''} value={patientDetails.billDate} placeholder={t("Bill_Date")} disabled />}
                          </div>
                        </div>
                        <div className='col-2'>
                          <div className='mb-2'>
                            <div className='d-flex align-items-baseline'>
                            <img src={uhidIcon} className='icnn' alt='icnn' />
                              <label htmlFor="Age" className="form-label">{t("Uhid")}</label>
                            </div>
                            {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="uhid" name="uhid" onChange={''} value={''} placeholder={t("Uhid")} disabled />:
                            <input type="text" className="form-control form-control-sm" id="uhid" name="uhid" onChange={''} value={patientDetails.uhId} placeholder={t("Uhid")} disabled />}
                          </div>

                        </div>

                        <div className='col-2'>
                        <div className="mb-2">
                          <div className='d-flex align-items-baseline'>
                          <img src={uhidIcon} className='icnn' alt='icnn' />
                            <label htmlFor="CRNo" className="form-label">{t("Cr No")}</label>
                          </div>
                          {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="crNo" name="crNo" value={''} onChange={''} placeholder={t("Cr No")} disabled />:
                          <input type="text" className="form-control form-control-sm" id="crNo" name="crNo" value={patientDetails.crNo} onChange={''} placeholder={t("Cr No")} disabled />}
                        </div>

                        </div>
                        <div className='col-2'>
                        <div className='mb-2'>
                          <div className='d-flex align-items-baseline'>
                          <img src={uhidIcon} className='icnn' alt='icnn' />
                            <label htmlFor="Age" className="form-label">{t("IPNo")}</label>
                          </div>
                          {patientDetails.length === 0 ?<input type="text" className="form-control form-control-sm" id="ipNo" name="ipNo" onChange={''} value={''} placeholder={t("IPNo")} disabled />:
                          <input type="text" className="form-control form-control-sm" id="ipNo" name="ipNo" onChange={''} value={patientDetails.ipNo} placeholder={t("IPNo")} disabled />}
                        </div>
                        </div>
                        <div className='col-2'>
                        <div className='mb-2'>
                          <div className='d-flex align-items-baseline'>
                          <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="Age" className="form-label">{t("Center")}</label>
                          </div>
                          {patientDetails.length === 0? <input type="text" className="form-control form-control-sm" id="centre" name="centre" onChange={''} value={''} placeholder={t("Center")} disabled />:
                          <input type="text" className="form-control form-control-sm" id="centre" name="centre" onChange={''} value={patientDetails.patientType} placeholder={t("Center")} disabled />}
                        </div>
                        </div>
                        <div className='col-2'>
                        <div className='mb-2'>
                          <div className='d-flex align-items-baseline'>
                          <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="Age" className="form-label">{t("ward")}</label>
                          </div>
                          {patientDetails.length === 0 ?<input type="text" className="form-control form-control-sm" id="ward" name="ward" onChange={''} value={''} placeholder={t("ward")} disabled />:
                          <input type="text" className="form-control form-control-sm" id="ward" name="ward" onChange={''} value={patientDetails.wardName} placeholder={t("ward")} disabled />}
                        </div>
                        </div>
                        <div className='col-2'>
                        <div className='mb-2'>
                          <div className='d-flex align-items-baseline'>
                          <img src={RefBy} className='icnn' alt='icnn' />
                            <label htmlFor="Age" className="form-label">{t("Ref_By")}</label>
                          </div>
                          {patientDetails.length === 0 ? <input type="text" className="form-control form-control-sm" id="refBy" name="refBy" onChange={''} value={''} placeholder={t("Ref_By")} disabled />:
                          <input type="text" className="form-control form-control-sm" id="refBy" name="refBy" onChange={''} value={patientDetails.drName} placeholder={t("Ref_By")} disabled />}
                        </div>

                        </div>
                        <div className='col-2'>
                        <div className="mb-2">
                          <div className='d-flex align-items-baseline'>
                          <img src={samples} className='icnn' alt='icnn' />
                            <label htmlFor="UHID" className="form-label">{t("Samples")}</label>
                          </div>
                          <input type="text" className="form-control form-control-sm" id="samples" value={sampleType.toUpperCase()} name="samples" onChange={''} placeholder={t("Samples")} disabled />
                        </div>

                        </div>

                      </div>
                    </div>
                  </div>


                  <div className="rt-btns">
                      <div className="mt-2 relative">
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={previousPageModify}>Back</button>
                      </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-1">
                <div className='whitebg1'>
                  <div className='row'>
                    <div className="col-md-4 col-sm-12 plt1">
                      <div className='whitebg' style={{height:'66vh', paddingTop:"0px"}}>
                        <Heading text='Test List' />
                        <div className="med-table-section" style={{ "height": "50vh" ,'box-shadow':'none'}}>
                          <TableContainer>
                            <thead>
                              <tr>
                                <th className="text-center" style={{ "width": "5%" }}>#</th>
                                <th>{t("testNamePlaceholder")}</th>
                                <th>{t("Status")}</th>
                                <th align='center' style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getPerformTestList && getPerformTestList.map((val, ind) => {
                                return (<>
                                  {val.isPerformedTest === 'YES' && <tr key={val.sampleCollectionSubID}>
                                    <td className="text-center">{ind + 1}</td>
                                    <td>{val.testname}</td>
                                    <td>
                                      {val.isPerformedTest === "YES" ? "DONE" : "NOT DONE"}
                                    </td>
                                    {/* <td onClick={() => { getSubtestData(val.testID, val.sampleCollectionSubID); }} >
                                    {val.isPerformedTest === "NO" ? (<i className="fa fa-edit actionedit"></i>) : ("NA")}
                                  </td> */}
                                    {val.isModified === 0 ? <td onClick={() => { getSubtestData(val.testID, val.sampleCollectionSubID); }} ><img src={edit} className='btl-icnn1'  alt='' /></td> :
                                      <td title='Disabled' disabled><img src={edit} className='btl-icnn1'  alt='' /></td>}

                                  </tr>}</>

                                )
                              })}
                            </tbody>
                          </TableContainer>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-8 col-sm-12 prt1">
                      <div className="whitebg" style={{height:'66vh', paddingTop:"0px"}}>
                        <div className="row">
                          <div className='col-12'>
                            <div class="titile-txt"><div class="title-h"><div class="heading mb-2">{t("Subtest_List")}</div></div><div class="title-h1">{t("Lab_NO")} <span>{getLabNo}</span></div></div>
                            <div className='med-table-section box-shadow-none' style={{height:'57vh'}}>
                              <table className="med-table border_ striped">
                                <thead>
                                  <tr>
                                    <th className='text-center_'>{t("Action")}</th>
                                    <th>{t("Sub_Test_Name")}</th>
                                    <th>{t("Value")}</th>
                                  </tr>
                                </thead>
                                <tbody>

                                  {getSubTestList && getSubTestList.map((val, ind) => {
                                    return (
                                      <>
                                        {subTestValueList && subTestValueList.map((list) => {

                                          return (
                                            <>
                                              {val.id === list.subtestID ?
                                                <tr key={val.id}>
                                                  <td><input type="checkbox" id={'checkSubTest' + val.id} name='checkSubTest' defaultChecked={isChecked} role='switch' onClick={() => { getDataDetail(val.id, val.subTestName, val.unitID) }} disabled></input></td>
                                                  <td>{val.subTestName}</td>

                                                  <td style={{display:"flex", gap:"5px"}}>
                                                    {list.isModified === 0 ? <input className='form-control form-control-sm' type="text" id={'subtestDisabled' + val.id} value={list.result} onChange={() => { subTestHandleChange(list.id, val.id) }} style={{width:"auto"}}/> :
                                                      <input className='form-control form-control-sm' type="text" id={'subtestDisabled' + val.id} value={list.result} onChange={''} disabled style={{width:"auto"}} />}
                                                    {/* <input type="text" id={'subtestDisabled' + val.id} value={list.result} onChange={() => { subTestHandleChange(list.id, val.id) }} /> */}
                                                    <span>&nbsp;{val.unitName}</span></td>
                                                </tr>
                                                : ''}
                                            </>

                                          )
                                        })}

                                      </>
                                    )

                                  })}
                                  <tr>
                                  <td></td>
                                  <td><strong>{t("Remark")}</strong></td>
                                  <td>
                                    <textarea className='form-control form-control-sm mt-2' id='remarkForSubTest' name='remarkForSubTest' placeholder='Please Enter Remark....' style={{ width: '100%' }} onChange={handleBillNoChange} />
                                    </td>
                                 
                                  </tr>



                                </tbody>
                              </table>
                            </div>
                            <div>
                            </div>
                          </div>

                          {showButtons === true &&
                            <div className="col-12">
                              <div className="d-flex justify-content-end gap-2 mt-2">
                                {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                                  showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={saveModifiedData}><img src={save} className='icnn'  alt='' /> {t("Save")}</button>
                                    </>}
                              </div>
                            </div>
                          }
                        </div>
                      </div>




                    </div>

                  </div>
                </div>
              </div>

            </div>}

          {/*  <!------------------- Start Validate Modal ---------------------------------->  */}
          <div className="modal fade" id="validateModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog modalDelete">
              <div className="modal-content">
                <div className="modal-body modelbdy text-center">
                  <div className="popDeleteIcon">
                    {/* <i className="fa fa-trash"></i> */}
                    <img src={validate} id='svgColor' alt='hey' style={{ height: '31px' }} />
                  </div>
                  <div className="popDeleteTitle mt-3">{t("Validate")}</div>
                  <div className="popDeleteContent"> {" "} {t("Are_you_sure_you_want_to_validate?")} </div>
                </div>
                <div className="modal-footer1 text-center">
                  <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("No")}</button>
                  <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={validateTheTest}> {t("Yes")} </button>
                </div>
              </div>
            </div>
          </div>
          {/* {/ -----------------------End Validate Modal Popup--------------------- /} */}

          {/*  <!------------------- Start Validate Modal ---------------------------------->  */}
          <div className="modal fade" id="invalidateModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog modalDelete">
              <div className="modal-content">
                <div className="modal-body modelbdy text-center">
                  <div className="popDeleteIcon">
                    <i className="fa fa-trash"></i>
                  </div>
                  <div className="popDeleteTitle mt-3">{t("Invalidate")}</div>
                  <div className="popDeleteContent"> {" "} {t("Are_you_sure_you_want_to_Invalidate?")}</div>
                </div>
                <div className="modal-footer1 text-center">
                  <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("No")}</button>
                  <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={''}> {t("Yes")} </button>
                </div>
              </div>
            </div>
          </div>
          {/* {/ -----------------------End Validate Modal Popup--------------------- /} */}

        </div>
        
      </section>
      {
                      showAlertToster === 1 ?
                          <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
      }
    </>
  )
}
