import React, { useState, useEffect } from 'react'
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';
import bill from '../../assets/images/icons/bill.svg'
import patient from '../../assets/images/icons/patient.svg'
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'
import Remark from '../../assets/images/icons/Remark.svg'
import sample from '../../assets/images/icons/sample.svg'
import UHID1 from '../../assets/images/icons/UHID1.svg'
import ward from '../../assets/images/icons/ward.svg'
import age from '../../assets/images/icons/age.svg'
import calender from '../../assets/images/icons/calender.svg'
import center from '../../assets/images/icons/center.svg'
import department from '../../assets/images/icons/department.svg';
import dot from '../../assets/images/icons/dot-23836.png';
import gender from '../../assets/images/icons/gender.svg'
import edit from '../../assets/images/icons/edit.svg'
import save from '../../assets/images/icons/saveButton.svg'
import clear from '../../assets/images/icons/clear.svg'
import GetPerformTest from '../../Pathology/Api/GetPerformtest'
import GetSubTest from '../../Pathology/Api/GetSubTest'
import SaveSubTest from '../../Pathology/Api/SaveSubTest'
//import Loder from '../../Component/Loder';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import GetLabSampleType from '../Api/GetLabSampleType';
import GetPatientBillingDetails from '../Api/GetPatientBillingDetails';
import AlertToster from '../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function PerformTest() {

  // let [showLoder, setShowLoder] = useState(0);
  let [getPerformTestList, setPerformTestList] = useState([])
  let [getSubTestList, setSubTestList] = useState([])
  let [getTestID, setTestID] = useState('')
  let [getSubTestID, setSubTestID] = useState([]);
  let [sampleCollectionSubId, setSampleCollectionSubId] = useState('');
  let [getTxtBillNo, setTxtBillNo] = useState('');
  let [theTestName, setTheTestName] = useState('')
  let [getBillMasterId, setGetBillMasterId] = useState('');
  let [getBillDate, setBillDate] = useState('');
  let [getPatientName, setPatientName] = useState('');
  let [getGender, setGender] = useState('');
  let [getAge, setAge] = useState('');
  let [getUHID, setUHID] = useState('');
  let [sampleType, setSampleType] = useState('');
  let [getVisitNumber, setVisitNumber] = useState('');
  let [getIPNumber, setIPNumber] = useState('');
  let [getCenter, setCenter] = useState('');
  // //let [getSample, setSample] = useState('');
  let [getWard, setWard] = useState('');
  let [getDepartment, setDepartment] = useState('');
  let [labNumber, setLabNumber] = useState('')
  // let [getBillNumber, setBillNumber] = useState('');
  let [getPMID, setPMID] = useState('');
  let [showRemark, setShowRemark] = useState(false);
  let [fillRemark, setFillRemark] = useState('');
  let [showButtons, setShowButtons] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  // ########################## USE STATE FOR LOADERS ######################
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [saveButtonDisable, setSaveButtonDisable] = useState(false);
  let [arr, setArr] = useState([]);
  let[showImage,setShowImage]=useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  let testArr = [];
  const { t } = useTranslation();

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  const handleTextboxChange = (event) => {
    if (event.target.name === "BillNo") {
      setTxtBillNo(event.target.value);
    }
    else if(event.target.name === 'remarkForSubTest')
    {
      setFillRemark(event.target.value);
    }
  };
  /// ***************************** GET perform Test **********************************************

  let funGetPerformTest = async () => {
    console.log('getTxtBillNo : ', getTxtBillNo)
    // setShowLoder(1)
    let getResult = await GetPerformTest(getTxtBillNo,clientID);
    let getPatientDetails = await GetPatientBillingDetails(getTxtBillNo,clientID);
    const testList = getResult.responseValue.tests;
    const patientBillingDetails = getPatientDetails.responseValue[0];
    console.log('getResult : ', getResult);

    if (getPatientDetails.status === 1) {

      
      // setShowLoder(0)
      setShowImage(0)
      setPatientName(patientBillingDetails.patientName);
      setGender(patientBillingDetails.gender);
      setAge(patientBillingDetails.age);
      setUHID(patientBillingDetails.uhId);
      setVisitNumber(patientBillingDetails.crNo);
      setIPNumber(patientBillingDetails.ipNo);
      setCenter(patientBillingDetails.patientType);
      //setSample("SAMPLE");
      setWard(patientBillingDetails.wardName);
      setDepartment(patientBillingDetails.departName);
      setBillDate(patientBillingDetails.billDate);
      setPMID(patientBillingDetails.pmid);
      setTestID(patientBillingDetails.testID);
      
      var parserData=JSON.parse(patientBillingDetails.sampleTypeList);
        var formatCol="";
        
        for(var k =0;k<parserData.length;k++){
          
          
          formatCol= formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' +  parserData[k].sampleType ;

        }
        setSampleType(formatCol)
   

    }
    else if(getPatientDetails.status !== 1){
      setShowAlertToster(1);
      setShowErrMessage('Bill Number does not exists!');
        setShowImage(1);
      setPatientName(''); setGender('');  setAge(''); setIPNumber(''); setUHID(''); setPMID(''); 
        setBillDate(''); setDepartment(''); setWard(''); ;setSampleType('');setVisitNumber('');setCenter('');setTestID('')
    }

    if(getResult.status === 1){
      setPerformTestList(testList);
      setGetBillMasterId(testList[0].billMasterID);
      setSampleCollectionSubId(testList.sampleCollectionSubId);
      setLabNumber(testList[0].labNumber);
    }
    else if(getPatientDetails.status === 1){
      setShowImage(1)
        setShowAlertToster(1);
        setShowErrMessage('No tests on this Bill Number!');
    }
  }
  

  //***************************  GET SUB Test ****************************************** */

  

  const getSubtestData = async (event, subTestId, testName) => {
    setShowButtons(true);
    setIsChecked(true)
    setShowRemark(true);
    setSaveButtonDisable(false);
    setTestID(event);
    setFillRemark('');
    setSampleCollectionSubId(subTestId);
    setTheTestName(testName)
    // setShowLoder(1);
    
    let getResult = await GetSubTest(event,clientID);
    
    setSubTestList(getResult.responseValue);
  
    // setShowLoder(0)

  };
  //*************************** Save sub test ****************************************** */
  let handleSave = async () => {
    var finalArr = [];
    let tempArr = [];
    
    if (getTxtBillNo === '0' || getTxtBillNo === undefined || getTxtBillNo === null || getTxtBillNo === "") {
      setShowAlertToster(1);
      setShowErrMessage('Please fill Bill Number!')
    }
    else {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].result !== '') {
          finalArr.push({
            subTestID: arr[i].subtestId,
            result: arr[i].result,
            itemID: getTestID,
            unitID: arr[i].unitId,
            resultRemark: fillRemark,
            userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId

          })
        }
      }
      if (finalArr.length > 0) {
        for (var j = 0; j < getSubTestList.length; j++) {
          if (document.getElementById('checkSubTest' + getSubTestList[j].id).checked === true) {
            tempArr.push({
              rowID: getSubTestList[j].id
            })
          }
        }
        if (tempArr.length === finalArr.length) {
          
          
          // setShowUnderProcess(1);
          var obj = {
            billMasterId: getBillMasterId,
            uhId: getUHID,
            pmId: getPMID,
            resultJson: JSON.stringify(finalArr),
            testId: getTestID,
            sampleCollectionSubId: sampleCollectionSubId,
            billNo: getTxtBillNo,
            userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
            clientId:clientID
          }
           
          let response = await SaveSubTest(obj);

          if (response.status === 1) {
            setArr([]);
           
            disableAfterSave();
            
            funGetPerformTest();
            setSaveButtonDisable(true);
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTosterMessage('Data Saved Successfully!');
            setTimeout(() => {
              setShowToster(0)
            }, 2000)
          }
          else {
           
            setShowUnderProcess(0)
            setShowToster(1)//0 for save and warning 1 for Error
            setTosterMessage(response.responseValue)
            setTosterValue(1)
            setTimeout(() => {
              setShowToster(0)
            }, 2000)
          }
          
        }
        else {
        
          setShowAlertToster(1);
      setShowErrMessage('Please check the box or fill value')
        }
      }
      else {
        setShowAlertToster(1);
      setShowErrMessage('Please check the box or fill value')
        
      }
    }
  }

  let getDataDetail = (id, name, unit) => {

    const targetInputBox = document.getElementById("checkSubTest" + id).checked;

    
    if (targetInputBox === false) {

      document.getElementById("subtestDisabled" + id).setAttribute('disabled', 'disabled');
      let temp = [...arr]
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].subtestId === id) {
          temp.splice(i, 1)

        }
      }
      setArr(temp)
    
    }
    else {
      let temp = [...arr]
      const subtestValue = document.getElementById("subtestDisabled" + id).value;
      document.getElementById('subtestDisabled' + id).removeAttribute("disabled");
      temp.push({
        subtestId: id,
        result: subtestValue,
        unitId: unit,

      })
      setArr([...temp])
    }
    
  }
  let handleFillSubtestValue = (key, unit) => {
   
    const getValue = document.getElementById('subtestDisabled' + key).value;
    
    let temp = [...arr]

    if (temp.length === 0) {
      temp.push({
        subtestId: key,
        result: getValue,
        unitId: unit,

      })
      setArr([...temp])

    }
    else {
      var index = arr.findIndex((i) => i.subtestId == key);

      if (index != -1) {
    let temp = [...arr]

    temp.splice(index, 1,
          {
            subtestId: key,
            result: getValue,
            unitId: unit,

          })
      setArr([...temp])

      }
      else {
        temp.push({
          subtestId: key,
          result: getValue,
          unitId: unit
        })
      setArr([...temp])

      }
    }
  
  }

  let handleSaveAlert = () => {
    setShowAlertToster(1);
      setShowErrMessage('Data Already Saved!')
  }

  let disableAfterSave = () => {
    for (var i=0; i<getSubTestList.length; i++) {
      document.getElementById("checkSubTest" + getSubTestList[i].id).setAttribute('disabled', 'disabled');
      document.getElementById("subtestDisabled" + getSubTestList[i].id).setAttribute('disabled', 'disabled');
      //document.getElementById('remarkForSubTest').setAttribute('disabled','disabled');
    }
    
  }

  let clearSubTest =  () => {
   
    for (var k =0; k< getSubTestList.length; k++){
      document.getElementById('checkSubTest' + getSubTestList[k].id).checked= true;
      document.getElementById('subtestDisabled' + getSubTestList[k].id).value = '';
      document.getElementById('subtestDisabled' + getSubTestList[k].id).removeAttribute("disabled");
    }
    setFillRemark('');
  }
  useEffect(() => {
    console.log('getTxtBillNo : ', getTxtBillNo)
  }, [])
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
          <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Perform_Test")}</div></div></div>
            <div className="col-12">
              <div className='whitebg'>
                <div className="row">
                  <div className="col-md-3 col-sm-12 analuze">
                    <div className="fieldsett-in">
                      <div className="fieldsett  billfie">
                        <span className='fieldse'>{t("Bill_Details")}</span>
                        <div className="mt-2 me-2 col-12" >
                          <img src={bill} className='icnn' alt='icnn' /> <label htmlFor="Bill" className="form-label">{t("Bill_No.")}</label>
                        </div>
                        <BoxContainer>
                          <div className="mb-2 me-2">
                            <input type="text" value={getTxtBillNo} onChange={handleTextboxChange} className="form-control form-control-sm" id="txtBillNo" name="BillNo" placeholder={t("Enter_Bill_No.")} />
                          </div>

                          <div className="mb-2 me-2">
                            <div className='searchbtnn'>
                              <button onClick={funGetPerformTest}><i className='fa fa-search'></i>{t("Search_Result")}</button>
                            </div>
                          </div>
                        </BoxContainer>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9 col-sm-12">
                    <div className="fieldsett-in">
                      <div className="fieldsett">
                        <span className='fieldse'>{t("Patient_Details")}</span>
                        <div className='dflex regEqualColums'>
                         <div className="col-2 mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Uhid")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("UHID")} value={getUHID} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("IP_No")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("IP_No")} value={getIPNumber} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={patient} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Patient_Name")}</label>
                            {getPatientName !== ''?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Patient_Name")} value={getPatientName + ' ' + getAge + ' ' + getGender} /> :
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Patient_Name")} value={''} />}
                          </div>                        
                          <div className="col-2 mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Visit_No")}.</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Visit_No")} value={getVisitNumber} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={sample} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Sample_Type")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Sample_Type")} value={sampleType} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={center} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Center")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Center")} value={getCenter} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={department} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Department")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Department")} value={getDepartment} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("ward")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("ward")} value={getWard} />
                          </div>                         
                          <div className="col-2 mb-2 me-2">
                            <img src={calender} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Bill_Date")}.</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Bill_Date")} value={getBillDate} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-12 mt-1">
              <div className='whitebg1'>
                <div className='row'>
                  <div className="col-md-6 col-sm-12 plt1">
                    <div className='whitebg' style={{height:'68vh',paddingTop:'0px'}}>
                      <Heading text={t("Test_List")} />
                      <div className="med-table-section shadow-none" style={{ height: "58vh" , position:'relative'}}>
                      {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                        <TableContainer>
                          <thead>
                            <tr>
                              <th className="text-center" style={{ "width": "5%" }}>#</th>
                              <th>{t("testNamePlaceholder")}</th>
                              <th>{t("Status")}</th>
                              <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPerformTestList && getPerformTestList.map((val, ind) => {
                              console.log('val : ', val)
                              return (
                                <tr key={val.id}>
                                  <td className="text-center">{ind + 1}</td>
                                  {val.isCritical === 1 ? <td>{val.testname}&nbsp;&nbsp;<span className='blinking' style={{color:'red', fontWeight: 'bold'}}>{t("Urgent")}</span></td>:<td>{val.testname}</td>}
                                  {/* <td>{val.testname}</td> */}
                                  <td>
                                    {val.isPerformedTest === "YES" ? "DONE" : "NOT DONE"}
                                  </td>
                                  {/* <td onClick={() => { getSubtestData(val.testID, val.sampleCollectionSubID); }} >
                                    {val.isPerformedTest === "NO" ? (<i className="fa fa-edit actionedit"></i>) : ("NA")}
                                  </td> */}
                                  {/* {val.isPerformedTest === 'NO' ? <td onClick={() => { getSubtestData(val.testID, val.sampleCollectionSubID); }} ><i className="fa fa-edit actionedit"></i></td> :
                                  <td  title='Disabled' disabled><i className="fa fa-edit actionedit" style={{backgroundColor:'#00000040'}} disabled></i></td>} */}
                                  {val.isPerformedTest === 'NO' ? <td align='center' onClick={() => { getSubtestData(val.testID, val.sampleCollectionSubID, val.testname); }} ><img src={edit} className='btl-icnn1'  alt='' /></td> :
                                  <td align='center' title='Disabled' disabled><img src={edit} className='btl-icnn1'  alt='' /></td>}
                                </tr>
                              )
                            })}
                          </tbody>
                        </TableContainer>
                      }
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 prt1">
                    <div className="whitebg"  style={{height:'68vh', paddingTop:'0px'}}>
                      <div className="row">
                        <div className='col-12'>
                          <div className="titile-txt"><div className="title-h"><div className="heading mb-2">{t("Subtest_List")} Of {theTestName}</div></div><div className="title-h1">{t("Lab_NO")}. <span>{labNumber}</span></div></div>
                          <div className='med-table-section box-shadow-none'  style={{ height: "58vh" , position:'relative'}}>
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
                                    <tr key={val.id}>
                                      <td><input type="checkbox" id={'checkSubTest' + val.id} name='checkSubTest' defaultChecked={isChecked} role='switch' onClick={() => { getDataDetail(val.id, val.subTestName, val.unitID) }} ></input></td>
                                      <td>{val.subTestName}</td>
                                      <td>{<input className='form-control form-control-sm' type="number" id={'subtestDisabled' + val.id} onChange={() => { handleFillSubtestValue(val.id, val.unitID) }} />}<span>&nbsp;{val.unitName}</span></td>
                                    </tr>

                                  )
                                })}
                                {showRemark && <tr>
                                         <td></td>
                                         <td colSpan={1}><strong>Remark</strong></td>
                                          <td >
                                            <textarea className='form-control form-control-sm mt-2' id='remarkForSubTest' name='remarkForSubTest' value={fillRemark} placeholder='Please Enter Remark....' style={{width: '100%'}} onChange={handleTextboxChange}/>
                                          </td>
                                        </tr>
                                        }


                              </tbody>
                            </table>
                          </div>
                          <div>
                          </div>
                        </div>

                        {showButtons === true && <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">
                            {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                              showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                              {saveButtonDisable === false?<button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={handleSave}><img src={save} className='icnn'  alt='' /> Save</button>:
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={handleSaveAlert}><img src={save} className='icnn'  alt='' /> Save</button>}
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearSubTest}><img src={clear} className='icnn'  alt='' />Clear</button></>}
                          </div>

                        </div>}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <div className='chatcnt'><img src={chat} className='icnn' alt=''/> </div>
      {
        showLoder === 1 ? <Loder val={showLoder} /> : ""
      } */}
      {
                      showAlertToster === 1 ?
                          <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                  }
    </>
  )
}
