import React, { useEffect, useState } from 'react'
import sample from '../../../assets/images/icons/sample.svg'
import BoxContainer from '../../../Component/BoxContainer'
//import bill from '../../../assets/images/icons/bill.svg';
//import testName from '../../../assets/images/icons/test name.svg'
import gramStain from '../../../assets/images/icons/gram stain.svg'
import wetMount from '../../../assets/images/icons/wet mount.svg'
import organism from '../../../assets/images/icons/organism.svg'

import growth from '../../../assets/images/icons/growth.svg'
import patient from '../../../assets/images/icons/patient.svg';
import UHID1 from '../../../assets/images/icons/UHID1.svg';
//import chat from '../../../assets/images/icons/chat.svg'
import calender from '../../../assets/images/icons/calender.svg'
import center from '../../../assets/images/icons/center.svg';
import department from '../../../assets/images/icons/department.svg'
import ward from '../../../assets/images/icons/ward.svg';

import modify from '../../../assets/images/icons/modify.svg'
import clear from '../../../assets/images/icons/clear.svg'
import back from '../../../assets/images/icons/back.svg'
import validate from '../../../assets/images/icons/validate1.svg'

import Heading from '../../../Component/Heading';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import TableContainer from '../../../Component/TableContainer';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import Loader from '../../../Component/Loader';
import GetPatientBillingDetails from '../../../Pathology/Api/GetPatientBillingDetails';
import GetMicrobiologyTestResultForValidation from '../../Api/SampleRecieve/Get/GetMicrobiologyTestResultForValidation';
import GetBacteriaList from '../../Api/SampleRecieve/Get/GetBacteriaList';
import GetSampleRecieve from '../../Api/SampleRecieve/Get/GetSampleRecieve';
import TextEditor from '../../../Component/TextEditor';
import GetSensitiveAndResistanceByBacteria from '../../Api/SampleRecieve/Get/GetSensitiveAndResistanceByBacteria';
import PostMicrobiologyTestResultValidation from '../../Api/SampleRecieve/Post/PostMicrobiologyTestResultValidation';
import { useNavigate } from 'react-router-dom';
import PostModifyCultureOrganismReport from '../../Api/SampleRecieve/Post/PostModifyCultureOrganismReport';

export default function MIcroCultureFinalValidation() {

  let noGrowthTemp = '<span style="font-size: 14px;"><b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</b></span><div><span style="font-size: 14px;"><b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</b></span><b><font size="2">&nbsp;<u>BACTERIOLOGY REPORT</u></font></b></div><div><b><font size="2"><u><br></u></font></b></div><div><ul style=""><li><b><font size="2">Culture shows growth of Micrococcus/ Diptheroids (Non pathogenic skin contaminants).</font></b></li></ul><div><b><font size="2"><br></font></b></div><ul style=""><li><b><font size="2">Culture shows growth of Budding Yeast-like cells (Candida species). &nbsp;Correlate clinically.</font></b></li></ul><div><b><font size="2"><br></font></b></div><ul style=""><li><b><font size="2">Culture shows that specimen was contaminated. Kindly repeat the sample with aseptic precautions.</font></b></li></ul><b><span style="font-size: 14px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></b></div>'
  const navigate = useNavigate();
  let [patientDetails, setPatientDetails] = useState([])
  let [showLoder, setShowLoder] = useState(0);
  let [getTxtBillNo, setTxtBillNo] = useState(window.sessionStorage.getItem('billNo'));
  let [getSampleCollectionSubID, setSampleCollectionSubID] = useState(parseInt(window.sessionStorage.getItem('sampleCollectionSubId')));
  let [getTestID, setTestID] = useState(parseInt(window.sessionStorage.getItem('testID')));

  let [getGramStain, setGramStain] = useState('');
  let [getWetMount, setWetMount] = useState('');
  let [tstRowID,setTstRowID] = useState('');
  //let [getSampleCollectionSubID, setSampleCollectionSubID] = useState('')
  let [billId, setBillId] = useState('');
  let [isTemplate, setIsTemplate] = useState('')
  let [sampleType, setSampleType] = useState('');
  let [getGrowth, setGrowth] = useState('');
  let [clearDropdown, setClearDropdown] = useState(0);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [testName, setTestName] = useState('');
  let [getBacteriaName, setBacteriaName] = useState('')
  let [editorValue, setEditorValue] = useState(noGrowthTemp)
  let [investigationJsonToArr, setInvestigationJsonToArr] = useState([]);
  let [getBacteriaList, setBacteriaList] = useState([]);
  let [getBacteriaId, setBacteriaId] = useState([]);
  let [arrForTestName, setArrForTestName] = useState([]);
  let [getDataForResistanceState, setDataForResistanceState] = useState([]);
  let [arrToCheckBox, setArrToCheckBox] = useState([]);
  let [getListOfMedicines, setListOfMedicines] = useState([]);
  let [getTestRowIDArr, setTestRowIDArr] = useState([]);
  let [saveButtonDisable, setSaveButtonDisable] = useState(false);
  let [editButtonShow, setEditButtonShow] = useState(false)
  let [fieldsActivation, setfieldsActivation] = useState(false);
  
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;  

  let handleTextChange = async (e) => {
    if(isTemplate === 1) {
      setIsTemplate(0)
      //funGetPatientDetails()
    }
    if(e.target.name === 'bacteriaID'){
      
      setBacteriaId(e.target.value);
      setBacteriaName(e.target.selectedName)
      let getDataForResistance = await GetSensitiveAndResistanceByBacteria(e.target.value);
      
    
      //setDataForResistanceState(getDataForResistance.responseValue);
      setListOfMedicines(getDataForResistance.responseValue);
      setGrowth('Heavy')
      setArrToCheckBox([]);
      setTimeout(() => {
        for( var a = 0; a<getDataForResistance.responseValue.length; a++)
      { 
        if(isTemplate !== 1){
          var id= 'checkSubTest'+getDataForResistance.responseValue[a].medicineId ;
         if(document.getElementById(id).checked === true){
           document.getElementById(id).checked = false;         
        }
        document.getElementById('antibiotic'+a).innerText= 'R' 
        }
      }
      },200)
  
    }
    else if (e.target.name === 'gramStain') {
      setGramStain(e.target.value)
    }
    else if (e.target.name === 'wetMount') {
      setWetMount(e.target.value)
    }
    }
  

  let handleTexteditor = (e) => {
    setEditorValue(e.target.value)
  }

  ///////////////////// To get details of patient and his/her tests///////////////////////////////////////
  let funGetPatientDetails = async () => {
    setShowLoder(1);
    let arrForDropdown = [];
    let testRowIDArr =[...getTestRowIDArr]
    let cultureTypeID = parseInt(window.sessionStorage.getItem('cultureTypeId'));
    let getPatientDetails = await GetPatientBillingDetails(getTxtBillNo,clientID);
    let getTestDetails = await GetSampleRecieve(getTxtBillNo,clientID)
    let getTestResult = await GetMicrobiologyTestResultForValidation(getTestID,getSampleCollectionSubID,cultureTypeID,clientID);
    const patientBillingDetails = getPatientDetails.responseValue[0];
    const testList = getTestDetails.responseValue.testDetails;
    
    if(getPatientDetails.status === 1 && getTestResult.status === 1){
      setTstRowID(getTestResult.responseValue[0].id);
      setSampleCollectionSubID(getTestResult.responseValue[0].sampleCollectionSubID)
      setPatientDetails(patientBillingDetails)
      var parserData=JSON.parse(patientBillingDetails.sampleTypeList);
        var formatCol="";      
        for(var b =0;b<parserData.length;b++){ 
          formatCol= formatCol === "" ? formatCol + parserData[b].sampleType : formatCol + ',' +  parserData[b].sampleType ;
        }
        setSampleType(formatCol);
      let bacteriaList = await GetBacteriaList();
      if(getTestResult.responseValue[0].isTemplate !== 1)
      {
        let jsonToArr = JSON.parse(getTestResult.responseValue[0].investigationresultdetailsJson);
        let antiBioToArr = JSON.parse(getTestResult.responseValue[0].antibioGramJson);
        let getListOfMedicinesData = await GetSensitiveAndResistanceByBacteria(antiBioToArr[0].bacteriaId);
         const getData=getListOfMedicinesData.responseValue;
         
        let tempArr=[]
       for(var i= 0; i<antiBioToArr.length; i++){
            for(var j=0; j < getData.length; j++ ){
                if(antiBioToArr[i].medicineId === getData[j].medicineId){
                  tempArr.push({
                    bacteriaID: getData[j].bacteriaID,
                    medicineId: getData[j].medicineId,
                    medicineName:getData[j].medicineName,
                    result:antiBioToArr[i].result
                  })
                }
            }
       }
       
       setListOfMedicines(tempArr)
      var d = jsonToArr.filter((arrToCheckBox) => arrToCheckBox.investigationresultdetailsId === 1)
      var d1 = jsonToArr.filter((arrToCheckBox) => arrToCheckBox.investigationresultdetailsId === 2)
     
      setWetMount(d[0].detailValue);
      setGramStain(d1[0].detailValue);
      ///////////////// For setting bacteria name /////////////////////////
      for(var k =0; k<bacteriaList.responseValue.length;k++){ 
        if(bacteriaList.responseValue[k].bacteriaID === antiBioToArr[0].bacteriaId){ 
          setBacteriaName(bacteriaList.responseValue[k].agentFactor)
        }
      }

      ////////////////////// end /////////////////////////////////
      ////////////// for autochecking of check box //////////////////

      setTimeout(() => {  
        let arrToCheckBox=[];
      for(var j = 0; j<antiBioToArr.length;j++)
      {
        document.getElementById('checkSubTest'+antiBioToArr[j].medicineId).checked = true;
        arrToCheckBox.push({medicineID:antiBioToArr[j].medicineId,
          userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
          bacteriaID:antiBioToArr[j].bacteriaId,
          result:antiBioToArr[j].result,
          growth:antiBioToArr[j].growth
        }); 
        setArrToCheckBox([...arrToCheckBox])
      }
      },200)
      /////////////////// end /////////////////////
      setBacteriaId(antiBioToArr[0].bacteriaId);
     setGrowth(antiBioToArr[0].growth)
     setDataForResistanceState(antiBioToArr)
    // setListOfMedicines(antiBioToArr)
      
        // for(var i =0; i<jsonToArr.length; i++) {

        // }
        setInvestigationJsonToArr(JSON.parse(getTestResult.responseValue[0].investigationresultdetailsJson));
      }

      /////////// for dropdown of testnames ////////////////
      for (var a = 0; a<testList.length;a++)
        {
          if(testList[a].labReceivingStatus === 1 && testList[a].itemID === getTestID){  
          arrForDropdown.push(testList[a])
          setTestName( testList[a].testname)
      }
      setArrForTestName([...arrForDropdown])
        }
        
        /////////////////////end////////////////////////

        /////////////////// For pushing test id in array //////////////
        for(var m =0; m<getTestResult.responseValue.length;m++){
          
        testRowIDArr.push({
          testResultRowId:getTestResult.responseValue[m].id
        })
        setTestRowIDArr([...testRowIDArr])
      }
        /////////////////////// end ////////////////////////////////////
        setIsTemplate(getTestResult.responseValue[0].isTemplate)
      setBacteriaList(bacteriaList.responseValue);    
      setBillId(testList[0].billMasterId)  
    }
  }

  let handleClear = (value) => {
    setClearDropdown(value);
    setBacteriaList('')
  }

  let getGrowthIdFun = () => {
    let grwId = document.getElementById('growthID').value;
    
    setGrowth(grwId);
//setfieldsActivation(false)
  }

  //////////////////////////// to handle check box for pushing or splicing data from getResistance array ///////////////
  let handleCheckBox = (chckId, index) => {
    let tempArr = [...arrToCheckBox]
    let result = document.getElementById("antibiotic" + index).innerText;
    if (tempArr.length === 0){
      tempArr.push({
        medicineID: chckId,
        userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        bacteriaID:getBacteriaId,
        result: result,
        growth: getGrowth
      })
      setArrToCheckBox([...tempArr])
    } 
    else{
      var ind = arrToCheckBox.findIndex((i) => i.medicineID == chckId);
      if (ind !== -1) {
        let tempArr = [...arrToCheckBox];
        tempArr.splice(ind, 1);
        setArrToCheckBox([...tempArr])
      }
      else{
        tempArr.push({
          medicineID: chckId,
        userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        bacteriaID:getBacteriaId,
        result: result,
        growth: getGrowth
        });
        setArrToCheckBox([...tempArr])
      }
    }
  }

  let validateData = async () => {
    
    let obj = {
      resultValidationJson: JSON.stringify(getTestRowIDArr),
      userId : JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
      clientId:clientID
    }
    
    
    let validateDataSave = await PostMicrobiologyTestResultValidation(obj);
    if(validateDataSave.status === 1) {
      setShowUnderProcess(0);
    setSaveButtonDisable(true)
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage('Data Validated Successfully!');
        setTimeout(() => {
          setShowToster(0)
        },2000)
    }
    else{
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage(validateDataSave.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }
   
  }

  //////////////////////////// Resistance button ///////////////////////////////
  let resistanceButton = (key, val, medId) => {
    document.getElementById('antibiotic' + key).innerHTML = val;
   
     var tempResArray = [...arrToCheckBox];
   
     
     if(tempResArray.length !== 0)
     {
      
      if(tempResArray.length !== 0){
      var indexOfRes = arrToCheckBox.findIndex((i) => i.medicineID == medId);
      if(indexOfRes !== -1){
        let tempResArray = [...arrToCheckBox];
    
        
        tempResArray.splice(indexOfRes,1,{
          medicineID: medId,
          userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
          bacteriaID:getBacteriaId,
        result: val,
        growth: getGrowth
        })
       
          setArrToCheckBox([...tempResArray])
      }
     
     }
    }
    // if(tempResArray.length !== 0){
    // var indexOfRes = arrToCheckBox.findIndex((i)=> i.id == medId)
    // if(indexOfRes != -1)
    // {
    //   let tempResArray = [...arrToCheckBox];
    //   tempResArray.splice(indexOfRes, 1 , {
    //     id: medId,
    //       result: val,
    //       growth: getGrowthId
    //   })

    // }}
    

  }

  let funModifyData = async () => {
    let testIDArr=[] 
    if(arrToCheckBox.length === 0) {
      alert('Please check atleast one checkbox')
    }
    else{
      let testId = document.getElementById('testNameId').value;
      testIDArr.push({
        id:tstRowID,
        itemID:testId,
        sampleCollectionSubID:getSampleCollectionSubID,
        userID:JSON.parse(window.sessionStorage.getItem("LoginData")).userId
      })

      let obj = {
        //billMasterId : billId,
        userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        gramStain:getGramStain,
        wetMount: getWetMount,
        growth:getGrowth  ,
        tempAntibioGram:JSON.stringify(arrToCheckBox),
        resultTemplateJson:JSON.stringify(testIDArr),
        clientId:clientID
      }
      
     
      let modifyData = await PostModifyCultureOrganismReport(obj);
      if(modifyData.status === 1){
        setShowUnderProcess(0);
    setSaveButtonDisable(true)
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage('Data Modified Successfully!');
        setTimeout(() => {
          setShowToster(0)
        },2000)
      }
      else{
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage(modifyData.responseValue);
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }
   }

  let funPreviousPage = () =>
  {
    navigate('/microculturereportvalidation/')
  }

let funToEnableFields = () => {
  setfieldsActivation(true)
  setEditButtonShow(true)
}

  useEffect(() => {
    funGetPatientDetails();
  },[])

  return (
    <>
    <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
        <div className="row">
        <div class="col-12"><div class="med-box  mb-1"><div class="title">Microbiology Culture Validation</div></div></div>

          <div className="col-12">
                <div className="whitebg">
                  <div className="fieldsett-in">
                    <div className="fieldsett">
                      <span className='fieldse'>Culture Validation</span>
                      <div className='dflex regEqualColums'>
                         <div className="col-2 mb-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">UHID</label>
                            {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder='UHID' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.uhId} />}
                          </div>
                          <div className="col-2 mb-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">IP No.</label>
                            {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder='IP No.' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.ipNo} />}
                          </div>
                          <div className="col-2 mb-2">
                            <img src={patient} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Patient Name</label>
                            {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder='Patient Name' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.patientName + ' ' + patientDetails.age + ' ' + patientDetails.agetype} />} 
                          </div>

                          <div className="col-2 mb-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Visit No.</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Visit No.' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.crNo} />}
                          </div>
                          <div className="col-2 mb-2">
                            <img src={sample} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Sample Type</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder='Sample Type' value={sampleType} />
                          </div>
                          <div className="col-2 mb-2">
                            <img src={center} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Center</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Center' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.center} />}
                          </div>
                          <div className="col-2 mb-2">
                            <img src={department} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Department</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Department' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.departName} />}
                          </div>
                          <div className="col-2 mb-2">
                            <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Ward</label>
                            {patientDetails.length === 0 ?<input type='text' disabled className='form-control form-control-sm' placeholder='Ward' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.wardName} />}
                          </div>
                          
                          <div className="col-2 mb-2">
                            <img src={calender} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Bill Date.</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Bill Date' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.billDate} />}
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
          </div>

          <div className="col-12 mt-1"> 
              <div className='whitebg' style={{paddingTop:"0px", height:"76vh"}}>
                    <div className='title-h mb-2'><Heading text='Test List' /></div>
                    <div className="col-md-12 col-sm-12">
                      <div className="fieldsett-in">
                        <div className='dflex regEqualColums'>
                          <div className="col-2 mb-2">
                          <img src={gramStain} className='icnn' alt='' />
                            <label htmlFor="uhid" className="form-label">Gram Stain</label>
                            {fieldsActivation === false ? <input type='text' className='form-control form-control-sm mt-2 ' name='gramStain' id='gramStain' value={getGramStain} onChange={''} disabled/>:
                            <input type='number' className='form-control form-control-sm mt-2 ' name='gramStain' id='gramStain' value={getGramStain} onChange={handleTextChange} />}
                          </div>
                          <div className="col-2 mb-2">
                          <img src={wetMount} className='icnn' alt='' />
                            <label htmlFor="ipno" className="form-label">Wet Mount</label>
                            {fieldsActivation === false ? <input type='text' className='form-control form-control-sm mt-2 ' name='wetMount' id='wetMount' value={getWetMount} onChange={''} disabled/>:
                            <input type='number' className='form-control form-control-sm mt-2 ' name='wetMount' id='wetMount' value={getWetMount} onChange={handleTextChange} />}
                          </div>
                          <div className="col-2 mb-2">
                          <img src={sample} className='icnn' alt='' />
                            <label htmlFor="pname" className="form-label">Samples</label>
                            <input type='text' className='form-control form-control-sm mt-2 ' name='samples' id='samples' value={sampleType} disabled />
                          </div>
                          
                          <div className="col-2 mb-2">
                          <img src={testName} className='icnn' alt='' />
                            <label htmlFor="Mobile" className="form-label">Test Name</label>
                            {fieldsActivation === false ?
                            <input type='text'  className='form-control form-control-sm mt-2 ' value={testName} disabled/>:
                            <select className='form-select form-select-sm mt-2' id='testNameId'>
                              <option value={0}>--Select--</option>
                              {arrForTestName && arrForTestName.map((arrList, ind) => {
                                if(arrList.itemID === getTestID){
                                  return(
                                  <option value={arrList.itemID} selected>{arrList.testname}</option>
                                )
                                }
                                else{
                                  return(
                                  <option value={arrList.itemID}>{arrList.testname}</option>
                                )
                                }
                              })}
                            </select>}

                          </div>
                          
                          <div className="col-2 mb-2">
                          <img src={organism} className='icnn' alt='' />
                            <label for="date" className="form-label">Organism</label>
                            <div style={{ marginTop: '8px' }}>
                            {
                              fieldsActivation === false ? <input type='text'  className='form-control form-control-sm mt-2 ' value={getBacteriaName} disabled/>:
                              <DropdownWithSearch defaulNname="Select Organism" name="bacteriaID" list={getBacteriaList} valueName="bacteriaID" displayName="agentFactor" editdata={getBacteriaName} getvalue={handleTextChange} clear={clearDropdown} clearFun={handleClear} />
                            
                            }
                            </div>
                              

                            {/* <small id="errddlDoctorID" className="form-text text-danger" style={{ display: 'none' }}></small> */}

                          </div>
                          <div className="col-2 mb-2">
                            <img src={growth} className='icnn' alt='' />
                            <label htmlFor="Mobile" className="form-label">Growth</label>
                            {fieldsActivation === false ?<input type='text'  className='form-control form-control-sm mt-2 ' value={getGrowth} disabled/> :
                            
                            <select className='form-select form-select-sm mt-2' id='growthID' onChange={getGrowthIdFun}>
                          
                              
                              
                              {getGrowth === "Heavy" ?<option value='Heavy' selected>Heavy</option>:<option value='Heavy'>Heavy</option>}
                              {getGrowth === "Moderate" ?<option value='Moderate' selected>Moderate</option>:<option value='Moderate'>Moderate</option>}
                              {getGrowth === "Scanty" ?<option value='Scanty' selected>Scanty</option>:<option value='Scanty'>Scanty</option>}
                              {getGrowth === "No Growth" ?<option value='No Growth' selected>No Growth</option>:<option value='No Growth'>No Growth</option>}
                            </select>}

                          </div>
                        </div>
                      </div>
                      {isTemplate === 1 && <div className='tempp'>
                        <TextEditor getTextvalue={handleTexteditor} name="abc" className="abc" id="abc" setValue={editorValue}/>
                      </div>}

                      {isTemplate !== 1 &&
                        <div className="fieldsett">
                          <div className="med-table-section shadow-none" style={{ "height": "300px" }}>
                            <TableContainer>
                              <thead>
                                <tr>
                                  <th>Antibiotic Name</th>
                                  <th>Result</th>
                                  <th>Growth</th>
                                  <th>Option</th>
                                </tr>
                              </thead>
                              <tbody>
                                
                                    
                                   {getListOfMedicines && getListOfMedicines.map((medList,medInd) => {

                                   
                                      return(<>
                                        {
                                        <tr>
                                      {fieldsActivation === false ? <td><input type="checkbox" id={"checkSubTest" + medList.medicineId} role='switch' onClick={''} disabled/>&nbsp;<span>{medList.medicineName}</span></td>:
                                      <td><input type="checkbox" id={"checkSubTest" + medList.medicineId} role='switch' onClick={() => { handleCheckBox(medList.medicineId, medInd) }} />&nbsp;<span>{medList.medicineName}</span></td>}
                                      <td id={'antibiotic' + medInd}>{medList.result}</td>
                                      {(getGrowth === 'Heavy' || getGrowth === 'No select') && <td >Heavy</td>}
                                      {getGrowth === 'Moderate' && <td>Moderate</td>}
                                      {getGrowth === 'Scanty' && <td>Scanty</td>}


                                      {fieldsActivation === false ?
                                        <td>
                                        <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1" id={'rRes' + medList.medicineId} title ='Disabled' value={''} onClick={''} style={{color:'#002F75',borderColor:'#002F75'}} disabled>R</button>
                                        <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1 " id={'sRes' + medList.medicineId} value={''} onClick={''} style={{color:'#002F75',borderColor:'#002F75'}} disabled>S</button>
                                        <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1" id={'msRes' + medList.medicineId} value={''} onClick={''} style={{color:'#002F75',borderColor:'#002F75'}} disabled>MS</button>
                                      </td>:
                                      <td>
                                        <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1" id={'rRes' + medList.medicineId} value={''} onClick={() => { resistanceButton(medInd, 'R',medList.medicineId) }}>R</button>
                                        <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1 " id={'sRes' + medList.medicineId} value={''} onClick={() => { resistanceButton(medInd, 'S',medList.medicineId) }}>S</button>
                                        <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1" id={'msRes' + medList.medicineId} value={''} onClick={() => { resistanceButton(medInd, 'MS',medList.medicineId) }}>MS</button>
                                      </td>}
                                    </tr>}</>
                                      )
                                    })
                                   }
                              </tbody>
                            </TableContainer>
                          </div>
                        </div>}
                      {getGrowth !== 'No Growth' && 
                        <>
                          {editButtonShow === false &&
                            <div className="col-12">
                        <div className="d-flex justify-content-end gap-2 mt-2">
                          {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                            {saveButtonDisable === false ? <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={validateData}>Validate</button>:
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={''} disabled>Validate</button>
                            }
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={funToEnableFields} >Edit</button>
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={funPreviousPage} >Back</button>
                              </>
                              }

                          

                        </div>
                      </div>}
                          {editButtonShow === true &&
                            <div className="col-12">
                        <div className="d-flex justify-content-end gap-2 mt-2">
                          {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                            {saveButtonDisable === false ? <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={funModifyData}>Modify</button>:
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={''} disabled>Modify</button>
                            }
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={funPreviousPage} >Back</button>
                              </>
                              }

                          

                        </div>
                      </div>}
                        </>}

                      {getGrowth == 'No Growth' && 
                        <div className="col-12">
                        <div className="d-flex justify-content-end gap-2 mt-2">
                          {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={validateData}>Validate</button>
                              
                              </>
                              }
                        </div>
                      </div>}
                    </div>

              </div>
          </div>

        </div>
      </div>
    </section>
    {/* <div className='chatcnt'><img src={chat} className='icnn' alt='' /> </div> */}
    {
      showLoder === 1 ? <Loader val={''} /> : ""
    }
  </>
  )
}
