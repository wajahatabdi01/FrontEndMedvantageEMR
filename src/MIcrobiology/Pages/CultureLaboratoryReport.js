import React, { useState } from 'react';
import BoxContainer from '../../Component/BoxContainer';
import bill from '../../assets/images/icons/bill.svg';
import patient from '../../assets/images/icons/patient.svg';
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'
import UHID1 from '../../assets/images/icons/UHID1.svg';
import age from '../../assets/images/icons/age.svg';
import chat from '../../assets/images/icons/chat.svg'
import calender from '../../assets/images/icons/calender.svg'
import center from '../../assets/images/icons/center.svg'
import edit from '../../assets/images/icons/edit.svg'
import save from '../../assets/images/icons/save.svg'
import clear from '../../assets/images/icons/clear.svg'

import sample from '../../assets/images/icons/sample.svg';
import department from '../../assets/images/icons/department.svg'
import gender from '../../assets/images/icons/gender.svg';
import ward from '../../assets/images/icons/ward.svg';
import Heading from '../../Component/Heading';
import TableContainer from '../../Component/TableContainer';
import GetPatientBillingDetails from '../../Pathology/Api/GetPatientBillingDetails';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import GetPerformTest from '../../Pathology/Api/GetPerformtest';
import GetSampleRecieve from '../Api/SampleRecieve/Get/GetSampleRecieve';
import GetMicrobiologySubtestTemplateBySubTestId from '../Api/SampleRecieve/Get/GetMicrobiologySubtestTemplateBySubTestId';
import TextEditor from '../../Component/TextEditor';
import PostCultureLabReport from '../Api/SampleRecieve/Post/PostCultureLabReport';
import AlertToster from '../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function CultureLaboratoryReport() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  let [patientDetails, setPatientDetails] = useState([])
  let [textBillNo, setTextBillNo] = useState('');
  let [getLabNumber, setLabNumber] = useState('')
  let [billId, setBillId] = useState('');
  let [testname, setTestname] = useState('');
  let [templateType, setTemplateType] = useState('');
  let [sampleType, setSampleType] = useState('');
  let [getTestID, setTestID] = useState('');
  let [getUnitID, setUnitID] = useState('');
  let [getSubTestID, setSubTestID] = useState('');
  let [showButtons, setShowButtons] = useState(false);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [disableSaveButton, setDisableSaveButton] = useState(false);
  let [tosterValue, setTosterValue] = useState(0);;
  let [sampleRecieveList, setSampleRecievelist] = useState([])
  let [sampleTampleList, setSampleTampleList] = useState([]);
  let [arr, setArr] = useState([]);
  let [arrRadio, setArrRadio] = useState([]);
  let [arrText, setArrText] = useState([]);
  let[showImage,setShowImage]=useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  const [isChecked, setIsChecked] = useState(true);

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  
  const handleTextboxChange = (e) =>{
    if(e.target.name === 'Bill')
    {
      setTextBillNo(e.target.value);
    }
  }

  // ******************* Get Patient Details Report ************************* //

  let getReport = async () => {
    if(textBillNo === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0)
    {
      alert('Fill Bill Number !');
      return false;
    }
    else{
      // setShowLoder(1)
      
      let getPatientDetails = await GetPatientBillingDetails(textBillNo,clientID);
      let getTestDetails = await GetSampleRecieve(textBillNo,clientID)
      const testList = getTestDetails.responseValue.testDetails;
       
      const patientDetails = getPatientDetails.responseValue[0];
      console.log('testList : ', testList)
      console.log('patientDetails : ', patientDetails)
      if(getPatientDetails.status === 1)
      {
        
        // setShowLoder(0)
        setShowImage(0)
        arr = [];
        setPatientDetails(patientDetails)
        //setMobileNumber(patientDetails.mobileNo);
        //setSample(""); 
        var parserData=JSON.parse(getPatientDetails.responseValue[0].sampleTypeList);
      var sampleString = '';
      for ( var k =0 ;k<parserData.length;k++){
        sampleString = sampleString === '' ? sampleString + parserData[k].sampleType : sampleString + ',' + parserData[k].sampleType
      }
      setSampleType(sampleString)
        
      }
      else if(getPatientDetails.status !== 1)
      {
        setShowAlertToster(1);
        setShowErrMessage('Bill Number does not exists!');
        setShowImage(1);
        ;setSampleType('');setPatientDetails([])
      }

      if(getTestDetails.status === 1)
      {
        arr =[]
        setBillId(testList[0].billMasterId)
        setSampleRecievelist(testList);
      }
      else if(getPatientDetails.status === 1){
        setShowImage(1)
        setShowAlertToster(1);
        setShowErrMessage('No tests on this Bill Number!');
      }
    }
  }

  let getSubTestTemplate = async (testId,labNumber) =>
  {
    let getResponse = await GetMicrobiologySubtestTemplateBySubTestId(testId,clientID);
    if(getResponse.status === 1)
    {
      setDisableSaveButton(false)
      setLabNumber(labNumber)
      setShowButtons(true);
      setIsChecked(true)
      setTestID(testId);
      setSubTestID(getResponse.responseValue[0].subTestId);
      setUnitID(getResponse.responseValue[0].unitID);
      setSampleTampleList(getResponse.responseValue);
      setTestname(getResponse.responseValue[0].testname)
      setTemplateType(getResponse.responseValue[0].inputType)
      // setTemplateData(getResponse.responseValue[0].testtemplate)
      setEditorValue(getResponse.responseValue[0].testtemplate)
    }
  }
  ////////////////////////// To Push Checked box Data in Array ///////////////////////
  let pushCheckedBoxData = (subTestId,subTestName) => {
    
    const targetRadioBox = document.getElementById("checkSubTest" + subTestId).checked;
   
    // if(targetRadioBox === false)
    // {
    //   let temp = [...arr]
    //   for(var i =0; i<temp.length;i++)
    //   {
    //     if(temp[i].subTestId === subTestId){
    //       temp.splice(i,1);
    //     }
    //   }
    //   setArr(...temp)
    // }
    // else{
    //   let temp = [...arr];
    //   temp.push({
    //     subTestName: subTestName
    //   })
    //   setArr([...temp])
    // }
    if (targetRadioBox === false) {
      
   
      
      let temp = [...arr]
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].subTestId === subTestId) {
          temp.splice(i, 1)

        }
      }
      
      setArr(temp)
    
    }
    else {
     
      let temp = [...arr]
        
      temp.push({
        subTestName:subTestName

      })
      setArr([...temp])
    }
 
  }
  let handleRadio = (val,id,subTestName) => {
    
   
    let temp = [...arrRadio];
    if(temp.length === 0)
    {
      temp.push({
        subTestId:id,
        radioVal: val,
        subTestName:subTestName
      })
      setArrRadio([...temp])
    }
    else{
      var index  = arrRadio.findIndex((i) => i.subTestId === id);
      if(index != -1){
        let temp = [...arrRadio]
        temp.splice(index,1,
          {
            subTestId:id,
        radioVal: val,
        subTestName:subTestName
          }
          
        )
        setArrRadio([...temp])
      }
      else{
        temp.push({
          subTestId:id,
        radioVal: val,
        subTestName:subTestName
        })
        setArrRadio([...temp])
      }
    }
    
  }

  let radioSave = async () => {
 
    var finalArr = [];
    var tempArr = [];
    if(textBillNo === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0)
    {
      alert('Fill Bill Number !');
      return false;
    }
    else {
      for(var i =0; i<arrRadio.length;i++)
      {
        finalArr.push({
          itemID:getTestID,
          subTestId: arrRadio[i].subTestId,
          radioVal: arrRadio[i].radioVal,
          subTestName: arrRadio[i].subTestName

        })
      }
      if(finalArr.length === 0){
        alert('please fill');
          
      }
      else{
        for(var j =0 ; j<sampleTampleList.length;j++){
          if(sampleTampleList[j].inputType === 'RadioButton R/N-R'){
            if(document.getElementById('checkSubTest'+sampleTampleList[j].subTestId).checked === true){
              tempArr.push({
                rowID: sampleTampleList[j].subTestId
              })
            }
          }
      }
        if(tempArr.length === finalArr.length){
          var obj = {
            resultArr: JSON.stringify(finalArr),
            billMasterId: billId,
      userId:JSON.parse(window.sessionStorage.getItem("LoginData")).userId
          }
          console.log('lab obj : ', obj);
          return;
         
          let saveRadioData = await PostCultureLabReport(obj);
          if(saveRadioData.status === 1)
    {
      setShowUnderProcess(0);
      setDisableSaveButton(true)
      getReport();
          setTosterValue(0);
          setShowToster(1);
          setTosterMessage('Data Saved Successfully!');
          setTimeout(() => {
            setShowToster(0)
          },2000)
    }
    else{
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage(saveRadioData.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }

        }
        else{
          alert('Cannot send value for unchecked or unselected subtest status ')
        }
     
      }
     
      
    }
  }

  ////////////////////////////////// CODE FOR TEXTBOX //////////////////////////////////////////////////////////////////////////

  let pushCheckBoxDataForText = (subTestId, subTestName, unit) => {
      const targetCheckBoxForText = document.getElementById('checkSubTestForText'+subTestId);
      if(targetCheckBoxForText === false)
      {
        document.getElementById("subtestDisabled" + subTestId).setAttribute('disabled', 'disabled');
        let tempText = [...arrText];
        for(var i=0; i<tempText.length;i++)
        {
          if(tempText[i].subTestId === subTestId)
          {
            tempText.splice(i,1)
          }
        }
        setArrText(tempText)
      }
      else{
        let tempText = [...arrText];
        const subtestValue = document.getElementById("subtestDisabled" + subTestId).value;
        document.getElementById('subtestDisabled' + subTestId).removeAttribute("disabled");
        tempText.push({
          subTestId: subTestId,
          result: subtestValue,
        unitId: unit,
        })
        setArrText([...arrText])
      }
  }
  
  let handleFillSubtestValue =(subTestId, unit) =>{
    const getValue = document.getElementById('subtestDisabled'+subTestId).value;
    let tempText = [...arrText];
    if(tempText.length === 0)
    {
      tempText.push({
        subTestId:subTestId,
        result: getValue,

        unitId:unit
      })
      setArrText([...tempText])
    }
    else{
      var ind = arrText.findIndex((i)=>i.subTestId=subTestId)
      if(ind != -1)
      {
        let tempText = [...arrText];
        tempText.splice(ind, 1, {
          subTestId:subTestId,
        result: getValue,

        unitId:unit
        })
        setArrText([...tempText])
      }
      else{
        tempText.push({
          subTestId:subTestId,
        result: getValue,

        unitId:unit
        })
        setArrText([...tempText])
      }
    }

  }

  let saveText = async () => {
    
    let finalArr = [];
    if(textBillNo === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0)
    {
      alert('Fill Bill Number !');
      return false;
    }
    else{
      finalArr.push({
        itemID:getTestID,
        subTestID:getSubTestID,
        unitID:getUnitID,
        resultText:editorValue
      })
    }
    
    var obj = {
      // resultTemplateJson:JSON.stringify(JSON.stringify(finalArr)),
      resultTemplateJson:JSON.stringify(finalArr),
      billMasterId: billId,
      userId:JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
      clientId:clientID

    }

    //console.log('save text obj : ', obj );
    
    let saveTextData = await PostCultureLabReport(obj);
    if(saveTextData.status === 1)
    {
      setShowUnderProcess(0);
      setDisableSaveButton(true)
      getReport();
          setTosterValue(0);
          setShowToster(1);
          setTosterMessage('Data Saved Successfully!');
          setTimeout(() => {
            setShowToster(0)
          },2000)
    }
    else{
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage(saveTextData.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }
   
  }
  

  let disableAfterSave = () => {
    for (var i=0; i<sampleTampleList.length; i++) {
      document.getElementById("checkSubTest" + sampleTampleList[i].id).setAttribute('disabled', 'disabled');
      document.getElementById("subtestDisabled" + sampleTampleList[i].id).setAttribute('disabled', 'disabled');
      //document.getElementById('remarkForSubTest').setAttribute('disabled','disabled');
    }
    
  }

  let [editorValue, setEditorValue] = useState("")

  let handleTexteditor = (e)=>{
    
    setEditorValue(e.target.value)
  }
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
          <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Create_Laboratory_Report")}</div></div></div>
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
                            <input type="text" value={textBillNo} onChange={handleTextboxChange} className="form-control form-control-sm" id="txtBillNo" name="Bill" placeholder={t("Enter_Bill_No.")} />
                          </div>

                          <div className="mb-2">
                            <div className='searchbtnn'>
                              <button onClick={getReport}><i className='fa fa-search'></i>{t("Search_Result")}</button>
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
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Uhid")} value={''} />:
                            <input type='text' disabled className='form-control form-control-sm' value={patientDetails.uhId} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("IP_No")}</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("IP_No")}value={''} />:
                            <input type='text' disabled className='form-control form-control-sm' value={patientDetails.ipNo} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={patient} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Patient_Name")}</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Patient_Name")} value={''} />:
                            <input type='text' disabled className='form-control form-control-sm' value={patientDetails.patientName + ' ' + patientDetails.age + ' ' + patientDetails.agetype} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={sample} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Sample")}</label>
                            {sampleType === '' ?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Sample")} value={''} />:
                            <input type='text' disabled className='form-control form-control-sm' value={sampleType} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Visit_No")}</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Visit_No")} value={''} />:
                            <input type='text' disabled className='form-control form-control-sm' value={patientDetails.crNo} />}
                          </div>
                          
                          <div className="col-2 mb-2 me-2">
                            <img src={center} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Center")}</label>
                           {patientDetails.length === 0? <input type='text' disabled className='form-control form-control-sm' placeholder={t("Center")} value={''} />:
                           <input type='text' disabled className='form-control form-control-sm' value={patientDetails.patientType} />}
                          </div>
                          
                          <div className="col-2 mb-2 me-2">
                            <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("ward")}</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("ward")} value={''} />:
                            <input type='text' disabled className='form-control form-control-sm' value={patientDetails.wardName} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={department} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Department")}</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Department")} value={''} />:
                            <input type='text' disabled className='form-control form-control-sm' value={patientDetails.departName} />
                          }
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={calender} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Bill_Date")}</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Bill_Date")} value={''} />:
                            <input type='text' disabled className='form-control form-control-sm' value={patientDetails.billDate} />}
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
                  <div className="col-md-4 col-sm-12 plt1">
                    <div className='whitebg' style={{height:'68vh', paddingTop:'0px'}}>
                      <Heading text={t("Test_List")} />
                      <div className="med-table-section shadow-none" style={{ height: "64vh", position:'relative' }}>
                      {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                        <TableContainer>
                          <thead>
                            <tr>
                              {/* <th className="text-center" style={{ "width": "5%" }}>#</th> */}
                              <th>{t("testNamePlaceholder")}</th>
                              <th>{t("Status")}</th>
                              <th align='center' style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                          {sampleRecieveList && sampleRecieveList.map((list, index) => {
                           
                            return (<>
                              {list.labReceivingStatus === 1 && <tr>
                                {/* <td className='text-center'>{index + 1}</td> */}
                                <td>{list.testname}</td>
                                <td>
                                    {list.isPerformed === "YES" ? "DONE" : "NOT DONE"}
                                  </td>
                                {/* <td  title='Disabled' onClick={() => {getSubTestTemplate(list.itemID);}}><i className="fa fa-edit actionedit" style={{backgroundColor:'#00000040'}} ></i></td> */}
                                {list.isPerformed === 'NO' ? <td align='center' onClick={() => {getSubTestTemplate(list.itemID,list.labNumber);}} ><img src={edit} className='btl-icnn1'  alt='' /></td> :
                                  <td align='center'  title='Disabled' disabled><img src={edit} className='btl-icnn1'  alt='' /></td>}
                              </tr>}
                              </>
                            )
                          })}
                            {/* {getPerformTestList && getPerformTestList.map((val, ind) => {
                              return (
                                <tr key={val.id}>
                                  <td className="text-center">{ind + 1}</td>
                                  <td>{val.testname}</td>
                                  <td>
                                    {val.isPerformedTest === "YES" ? "DONE" : "NOT DONE"}
                                  </td>
                                  
                                  {val.isPerformedTest === 'NO' ? <td onClick={() => { getSubtestData(val.testID, val.sampleCollectionSubID); }} ><i className="fa fa-edit actionedit"></i></td> :
                                  <td  title='Disabled' disabled><i className="fa fa-edit actionedit" style={{backgroundColor:'#00000040'}} disabled></i></td>}
                                </tr>
                              )
                            })} */}
                          </tbody>
                        </TableContainer>}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8 col-sm-12 prt1">
                    <div className="whitebg" style={{height:'68vh', paddingTop:'0px'}}>
                      <div className="row">
                        <div className='col-12'>
                        {templateType === 'RadioButton R/N-R' &&<>
                          <div className="titile-txt"><div className="title-h"><div className="heading mb-2">{testname}</div></div><div className="title-h1">{t("Lab_NO")} <span>{getLabNumber}</span></div></div>
                          <div className='med-table-section box-shadow-none'>
                            <table className="med-table border_ striped">
                              <thead>
                                <tr>
                                  <th className='text-center_'>{t("Action")}</th>
                                  <th>{t("SubTest_Status")}</th>
                                  <th>{t("SubTest_Name")}</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                sampleTampleList && sampleTampleList.map((listTemp, ind) => {
                                  
                                  return(
                                    <>
                                    {listTemp.inputType === 'RadioButton R/N-R' && <tr>
                                    <td><input type="checkbox" id={'checkSubTest' + listTemp.subTestId} name='checkSubTest' defaultChecked={isChecked} role='switch' onClick={() => {pushCheckedBoxData(listTemp.subTestId,listTemp.subTestName)}} ></input></td>
                                    <td>
                                    <input className="form-check-input" type="radio" value={1} name={"gender"+listTemp.subTestId} id={"cbNewBill"+listTemp.subTestId} onClick={() => {handleRadio(1,listTemp.subTestId,listTemp.subTestName);}}  />&nbsp;
                                      <label className="form-check-label" for="gender">
                                        {t("Positive")}
                                      </label>&nbsp;&nbsp;&nbsp;&nbsp;
                                      <input className="form-check-input" type="radio" value={0} name={"gender"+listTemp.subTestId} id={"cbNewBill"+listTemp.subTestId} onClick={() => {handleRadio(0,listTemp.subTestId,listTemp.subTestName);}} />&nbsp;
                                      <label className="form-check-label" for="gender1">
                                        {t("Negative")}
                                      </label>
                                      </td>
                                    <td>{listTemp.subTestName}<span>&nbsp;{listTemp.unitName}</span></td>
                                    </tr>
                                      
                                    }</>

                                  )
                                })
                              } 

                                {/* <tr>
                                                  <textarea className='mt-2' id='remarkForSubTest' name='remarkForSubTest' value={''} placeholder='Please Enter Remark....' style={{width: '100%'}} onChange={''}/>
                                                </tr> */}
                                {/* {showRemark && <tr>
                                                  <textarea className='mt-2' id='remarkForSubTest' name='remarkForSubTest' value={fillRemark} placeholder='Please Enter Remark....' style={{width: '100%'}} onChange={handleTextboxChange}/>
                                                </tr>
                                        } */}


                              </tbody>
                            </table>
                          </div>
                          <div>
                          </div></>}
                          {templateType === 'text' && <>
                          <div className="titile-txt"><div className="title-h"><div className="heading mb-2">{testname}</div></div><div className="title-h1">{t("Lab_NO")} <span>{getLabNumber}</span></div></div>
                          
                          <div className='med-table-section box-shadow-none mt-2'>
                            <TextEditor getTextvalue={handleTexteditor} name="abc" id="abc" setValue={editorValue} />
                          </div>
                          <div>
                          </div>
                          </>}
                        </div>
                                        {templateType === 'RadioButton R/N-R' && <>
                        {showButtons === true && <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">{showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={radioSave}><img src={save} className='icnn'  alt='' />{t("Save")}</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={''}><img src={clear} className='icnn'  alt='' />{t("Clear")}</button>
                              </>
                          }</div></div>}</>}
                          {templateType === 'text' && <>
                        {showButtons === true && <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">{showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>{disableSaveButton === false ? <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={saveText}><img src={save} className='icnn'  alt='' /> {t("Save")}</button> :
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={''} disabled><img src={save} className='icnn'  alt='' />{t("Save")}</button> }
                              
                              {/* <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={''}>Clear</button> */}
                              </>
                          }</div></div>}</>}

                        {/* {showButtons === true && <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">
                            {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                              showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                              {saveButtonDisable === false?<button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSave}>Save</button>:
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSaveAlert}>Save</button>}
                                
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearSubTest}>Clear</button></>}
                          </div>

                        </div>} */}
                      </div>
                    </div>




                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <div className='chatcnt'><img src={chat} className='icnn' alt=''/> </div> */}
      {/* {
        showLoder === 1 ? <Loder val={showLoder} /> : ""
      } */}
        {
                      showAlertToster === 1 ?
                          <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                  }
    </>
  )
}
