import React, { useState } from 'react';
import bill from '../../assets/images/icons/bill.svg';
import patient from '../../assets/images/icons/patient.svg';
import UHID1 from '../../assets/images/icons/UHID1.svg';
import gramStain from '../../assets/images/icons/gram stain.svg'
import wetMount from '../../assets/images/icons/wet mount.svg'
import organism from '../../assets/images/icons/organism.svg'
import testName from '../../assets/images/icons/test name.svg'
import growth from '../../assets/images/icons/growth.svg'
import calender from '../../assets/images/icons/calender.svg'
import center from '../../assets/images/icons/center.svg';
import sample from '../../assets/images/icons/sample.svg';
import department from '../../assets/images/icons/department.svg'
import ward from '../../assets/images/icons/ward.svg';
import save from '../../assets/images/icons/save.svg'
import clear from '../../assets/images/icons/clear.svg'
import BoxContainer from '../../Component/BoxContainer';
import Heading from '../../Component/Heading';
import TableContainer from '../../Component/TableContainer';
import GetPatientBillingDetails from '../../Pathology/Api/GetPatientBillingDetails';
import GetBacteriaList from '../Api/SampleRecieve/Get/GetBacteriaList';
import GetSensitiveAndResistanceByBacteria from '../Api/SampleRecieve/Get/GetSensitiveAndResistanceByBacteria';
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import TextEditor from '../../Component/TextEditor';
import GetSampleRecieve from '../Api/SampleRecieve/Get/GetSampleRecieve';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import PostCultureReport from '../Api/SampleRecieve/Post/PostCultureReport';
import AlertToster from '../../Component/AlertToster';
import Loader from '../../Component/Loader';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function CreateCultureReport() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  let noGrowthTemp = '<span style="font-size: 14px;"><b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</b></span><div><span style="font-size: 14px;"><b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</b></span><b><font size="2">&nbsp;<u>BACTERIOLOGY REPORT</u></font></b></div><div><b><font size="2"><u><br></u></font></b></div><div><ul style=""><li><b><font size="2">Culture shows growth of Micrococcus/ Diptheroids (Non pathogenic skin contaminants).</font></b></li></ul><div><b><font size="2"><br></font></b></div><ul style=""><li><b><font size="2">Culture shows growth of Budding Yeast-like cells (Candida species). &nbsp;Correlate clinically.</font></b></li></ul><div><b><font size="2"><br></font></b></div><ul style=""><li><b><font size="2">Culture shows that specimen was contaminated. Kindly repeat the sample with aseptic precautions.</font></b></li></ul><b><span style="font-size: 14px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></b></div>'
  let [patientDetails, setPatientDetails] = useState([])
  let [textBillNo, setTextbillValue] = useState('');
  let [getGramStain, setGramStain] = useState('');
  let [getWetMount, setWetMount] = useState('');
  let [sampleType, setSampleType] = useState('');
  // let [getBillDate, setBillDate] = useState('');
  // let [getPatientName, setPatientName] = useState('');
  // let [getGender, setGender] = useState('');
  // let [getAge, setAge] = useState('');
  // let [getUHID, setUHID] = useState('');
  // let [getVisitNumber, setVisitNumber] = useState('');
  // let [getIPNumber, setIPNumber] = useState('');
  // let [getCenter, setCenter] = useState('');
  // let [getWard, setWard] = useState('');
  // let [getDepartment, setDepartment] = useState('');
  let [billId, setBillId] = useState('');
  //let [getPMID, setPMID] = useState('');
  let [disableSaveButton, setDisableSaveButton] = useState(false);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [getBacteriaList, setBacteriaList] = useState([]);
  let [getBacteriaId, setBacteriaId] = useState([]);
  let [getGrowthId, setGrowthId] = useState([]);
  let [arrForTestName, setArrForTestName] = useState([])
  let [getDataForResistanceState, setDataForResistanceState] = useState([])
  let [arr, setArr] = useState([]);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showLoder, setShowLoder] = useState(0);
  //let [arrForTestId, setArrForTestId] = useState([]);
  let [editorValue, setEditorValue] = useState(noGrowthTemp)
  let [clearDropdown, setClearDropdown] = useState(0);

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  const handleTextChange = async (e) => {
    if (e.target.name === 'Bill') {
      setTextbillValue(e.target.value)
    }
    else if (e.target.name === 'gramStain') {
      setGramStain(e.target.value)
    }
    else if (e.target.name === 'wetMount') {
      setWetMount(e.target.value)
    }
    else if (e.target.name === 'bacteriaID') {
      setBacteriaId(e.target.value);
      
      let getDataForResistance = await GetSensitiveAndResistanceByBacteria(e.target.value);
    
      setDataForResistanceState(getDataForResistance.responseValue);
      setGrowthId('Heavy')
      setArr([]);
      setTimeout(() => {
        for( var a = 0; a<getDataForResistance.responseValue.length; a++)
      {
        
        var id= 'checkSubTest'+getDataForResistance.responseValue[a].medicineId ;
         if(document.getElementById(id).checked === true){
           document.getElementById(id).checked = false;
          
        }
        document.getElementById('antibiotic'+a).innerText= 'R'

        
      }
      },200)
      
      
    }

  }

  ///////////////// To Handle check box ///////////////////
  let handleCheckBox = (chckId, index) => {
    let tempArr = [...arr];
    let result = document.getElementById("antibiotic" + index).innerText;
    if (tempArr.length === 0) {
      tempArr.push({
        medicineID: chckId,
        userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        bacteriaID:getBacteriaId,
        result: result,
        growth: getGrowthId
      })
      setArr([...tempArr])
    }
    else {
      var index = arr.findIndex((i) => i.medicineID == chckId);
      if (index != -1) {
        let tempArr = [...arr];
        tempArr.splice(index, 1);
        setArr([...tempArr])
      }
      else {
        tempArr.push({
          medicineID: chckId,
          userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
          bacteriaID:getBacteriaId,
          result: result,
          growth: getGrowthId,
          
        })
        setArr([...tempArr])
      }
    }

    

  }

  let getDetails = async () => {
    console.log('first')
    let arrForDropdown = []
    if (textBillNo === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0) {
      alert('Fill Bill Number!');
      return false;
    }
    else {
      
      setShowLoder(1);
      let getpatientBillingDetails = await GetPatientBillingDetails(textBillNo,clientID);
      let getTestDetails = await GetSampleRecieve(textBillNo,clientID)
      
      const patientBillingDetails = getpatientBillingDetails.responseValue[0];
      const testList = getTestDetails.responseValue.testDetails;

   
      if (getpatientBillingDetails.status === 1) {
        
        setShowLoder(0);
        
        setPatientDetails(patientBillingDetails)
        //setTestID(patientBillingDetails.testID);
        var parserData = JSON.parse(patientBillingDetails.sampleTypeList);
        var formatCol = "";

        for (var k = 0; k < parserData.length; k++) {


          formatCol = formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' + parserData[k].sampleType;

        }
        setSampleType(formatCol)
        
      }
      else if(getpatientBillingDetails !== 1) {
        setShowLoder(0);
        setShowAlertToster(1);
        setShowErrMessage('Bill Number does not exists!');
          setPatientDetails([])
        setSampleType('')
      }

      if(getTestDetails.status === 1) {
        setShowLoder(0);
        for (var a = 0; a<testList.length;a++)
        {
          if(testList[a].labReceivingStatus === 1){
          
        arrForDropdown.push(testList[a])}
         
        }
        setArrForTestName([...arrForDropdown])
        setBillId(testList[0].billMasterId)
        let bacteriaList = await GetBacteriaList();                    //To fetch bacteria list
        setBacteriaList(bacteriaList.responseValue);
      }
      else if(getpatientBillingDetails.status === 1) {
        setShowLoder(0);
        setShowAlertToster(1);
        setShowErrMessage('No tests on this Bill Number!');
      }

    }
  }

  // let getSensitiveAndResistanceByBacteria = async () => {
  //   console.log('hello')
  //   //let orgID = document.getElementById('organismID').value;
  // }

  let getGrowthIdFun = () => {
    let grwId = document.getElementById('growthID').value;
    
    setGrowthId(grwId);
  }

  let handleClear = (value) => {
    setClearDropdown(value);
    setBacteriaList('')
  }

  

  let handleTexteditor = (e) => {
   
    setEditorValue(e.target.value)
  }

  ///////////////////////////// Resistance button ///////////////////////////////
  let resistanceButton = (key, val, medId) => {
    document.getElementById('antibiotic' + key).innerHTML = val;
   
     var tempResArray = [...arr];
    

      if(tempResArray.length !== 0)
      {
      var indexOfRes = arr.findIndex((i) => i.medicineID == medId);
      if(indexOfRes != -1){
        let tempResArray = [...arr];
        tempResArray.splice(indexOfRes,1,{
          medicineID: medId,
          userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
          bacteriaID:getBacteriaId,
        result: val,
        growth: getGrowthId
        })
          setArr([...tempResArray])
      }
    }
    // if(tempResArray.length !== 0){
    // var indexOfRes = arr.findIndex((i)=> i.id == medId)
    // if(indexOfRes != -1)
    // {
    //   let tempResArray = [...arr];
    //   tempResArray.splice(indexOfRes, 1 , {
    //     id: medId,
    //       result: val,
    //       growth: getGrowthId
    //   })

    // }}
    

  }

  ///////////////////// Save Button ///////////////////
   let handleSave = async () => {
    let testIDArr = []
    let bacID = document.getElementsByName('bacteriaID').value;
   
    
    if(arr.length === 0)
    {
      alert('Please check atleast one checkbox')
    }
    else{
      let testId = document.getElementById('testNameId').value;
      testIDArr.push({
        itemID:testId
      })
       
      let obj ={
        billMasterId : billId,
        userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        gramStain:getGramStain,
        wetMount: getWetMount,
        growth:getGrowthId,
        tempAntibioGram:JSON.stringify(arr),
        resultTemplateJson:JSON.stringify(testIDArr),
        clientId:clientID
      }


      let postData = await PostCultureReport(obj);
      if(postData.status === 1){
        setDisableSaveButton(true)
        setShowUnderProcess(0);
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
          setTosterMessage(postData.responseValue);
          setTosterValue(1);
          setTimeout(() => {
            setShowToster(0)
          }, 2000)
      }
    }
   
  
   }

   /////////////////// Save Button for text Template ////////////////
    let handleSaveForText = async () => 
    {
     
      let finalArrForText = [];
      if (textBillNo === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0) {
        alert('Fill Bill Number!');
        return false;
      }
      else{
        let testId = document.getElementById('testNameId').value;
        finalArrForText.push({
          
          //billMasterId : billId,
        // userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        //gramStain:getGramStain,
        //wetMount: getWetMount,
        //growth:getGrowthId,
        itemID:testId,
          resultText:editorValue
        })
        let obj ={
          billMasterId:billId,
          growth:getGrowthId,
          userId:JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
          resultTemplateJson:JSON.stringify(finalArrForText),
          clientId:clientID
        }
       
       
        let postData = await PostCultureReport(obj);
      if(postData.status === 1){
        setDisableSaveButton(true)
        setShowUnderProcess(0);
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
          setTosterMessage(postData.responseValue);
          setTosterValue(1);
          setTimeout(() => {
            setShowToster(0)
          }, 2000)
      }
      }
     
    }
  return (<>
    <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
        <div className="row">
        <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Create_Culture_Report")}</div></div></div>
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
                          <input type="text" value={textBillNo} onChange={handleTextChange} className="form-control form-control-sm" id="txtBillNo" name="Bill" placeholder={t("Enter_Bill_No.")} />
                        </div>
                        <div className="mb-2">
                          <div className='searchbtnn'>
                            <button onClick={getDetails}><i className='fa fa-search'></i>{t("Search_Result")}</button>
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
                          {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder={t("Uhid")} value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.uhId} />}
                        </div>
                        <div className="col-2 mb-2 me-2">
                          <img src={UHID1} className='icnn' alt='icnn' />
                          <label htmlFor="FoodSupplementDrug" className="form-label">{t("IP_No")}</label>
                          {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder={t("IP_No")} value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.ipNo} />}
                        </div>
                        <div className="col-2 mb-2 me-2">
                          <img src={patient} className='icnn' alt='icnn' />
                          <label htmlFor="FoodSupplementDrug" className="form-label">{t("Patient_nm")}</label>
                          {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder={t("Patient_nm")} value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.patientName + ' ' + patientDetails.age + ' ' + patientDetails.agetype} />}
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
                          {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Center")} value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.center} />}
                        </div>

                        <div className="col-2 mb-2 me-2">
                          <img src={ward} className='icnn' alt='icnn' />
                          <label htmlFor="FoodSupplementDrug" className="form-label">{t("ward")}</label>
                          {patientDetails.length === 0 ?<input type='text' disabled className='form-control form-control-sm' placeholder={t("ward")} value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.wardName} />}
                        </div>
                        <div className="col-2 mb-2 me-2">
                          <img src={department} className='icnn' alt='icnn' />
                          <label htmlFor="FoodSupplementDrug" className="form-label">{t("Department")}</label>
                          {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Department")} value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.departName} />}
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
                <div className="col-12">
                  <div className='whitebg' style={{paddingTop:'0px'}}>
                    <div className='title-h'><Heading text={t("Test_List")} /></div>
                    <div className="col-md-12 col-sm-12">
                      <div className="fieldsett-in">
                        <div className='dflex regEqualColums'>
                          <div className="col-2 mb-2 me-2">
                            <img src={gramStain} className='icnn' alt='' />
                            <label htmlFor="uhid" className="form-label">{t("Gram_Stain")}</label>
                            <input type='text' className='form-control form-control-sm' name='gramStain' id='gramStain' value={getGramStain} onChange={handleTextChange} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={wetMount} className='icnn' alt='' />
                            <label htmlFor="ipno" className="form-label">{t("Wet_Mount")}</label>
                            <input type='text' className='form-control form-control-sm' name='wetMount' id='wetMount' value={getWetMount} onChange={handleTextChange} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={sample} className='icnn' alt='' />
                            <label htmlFor="pname" className="form-label">{t("Samples")}</label>
                            <input type='text' className='form-control form-control-sm' name='samples' id='samples' value={sampleType} disabled />
                          </div>
                          {/* <div className="mb-2 me-2">
                                        <img src={age} className='icnn'alt=''/> 
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input type='text' disabled className='form-control form-control-sm mt-2 ' value={patientAge} />
                                      </div>
                                      <div className="mb-2 me-2">
                                        <img src={gender} className='icnn'alt=''/> 
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <input type='text' disabled className='form-control form-control-sm mt-2 ' value={genderType} />
                                      </div> */}
                          <div className="col-2 mb-2 me-2">
                            <img src={testName} className='icnn' alt='' />
                            <label htmlFor="Mobile" className="form-label">{t("testNamePlaceholder")}</label>
                            {/* <input type='text'  className='form-control form-control-sm mt-2 ' value={''} /> */}
                            <select className='form-select form-select-sm text-truncate' id='testNameId' style={{width:'179px'}}>
                              <option value={0}>{t("--select--")}</option>
                              {arrForTestName && arrForTestName.map((arrList, ind) => {
                               
                                return(
                                  <option value={arrList.itemID}>{arrList.testname}</option>
                                )
                                
                                
                              })}
                            </select>

                          </div>
                          {/* <div className="mb-2 me-2">
                            <img src={patient} className='icnn' alt='' />
                            <label htmlFor="Mobile" className="form-label">Organism</label>
                            
                            <select className='form-select form-select-sm mt-2' id='organismID' onChange={getSensitiveAndResistanceByBacteria}>
                              <option value={0}>--Select--</option>
                              {getBacteriaList && getBacteriaList.map((btList, ind) => {
                                return (
                                  <option value={btList.bacteriaID}>{btList.agentFactor}</option>
                                )
                              })}
                              <option>hello</option>
                              <option>hello</option>
                              <option>hello</option>
                            </select>

                          </div> */}


                          <div className="col-2 mb-2 me-2">
                            <img src={organism} className='icnn' alt='' />
                            <label for="date" className="form-label">{t("Organism")}</label>
                            <div>
                              <DropdownWithSearch defaulNname="Select Organism" name="bacteriaID" list={getBacteriaList} valueName="bacteriaID" displayName="agentFactor" editdata={""} getvalue={handleTextChange} clear={clearDropdown} clearFun={handleClear} />
                            </div>

                            {/* <small id="errddlDoctorID" className="form-text text-danger" style={{ display: 'none' }}></small> */}

                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={growth} className='icnn' alt='' />
                            <label htmlFor="Mobile" className="form-label">{t("Growth")}</label>
                            {/* <input type='text'  className='form-control form-control-sm mt-2 ' value={''} /> */}
                            <select className='form-select form-select-sm text-truncate' id='growthID' onChange={getGrowthIdFun} style={{width:'179px'}}>
                              <option value={'Not select'}>{t("--select--")}</option>
                              <option value={'Heavy'}>{t("Heavy")}</option>
                              <option value={'Moderate'}>{t("Moderate")}</option>
                              <option value={'Scanty'}>{t("Scanty")}</option>
                              <option value={'No Growth'}>{t("No_Growth")}</option>
                            </select>

                          </div>
                        </div>
                      </div>
                      {getGrowthId == 'No Growth' && <div>
                        <TextEditor getTextvalue={handleTexteditor} name="abc" id="abc" setValue={editorValue} />
                      </div>}

                      {getGrowthId != 'No Growth' &&
                        <div className="tblcul mt-3" style={{height:'51vh'}}>
                          <div className="med-table-section shadow-none">
                            <TableContainer>
                              <thead>
                                <tr>
                                  <th>{t("Antibiotic Name")}</th>
                                  <th>{t("Result")}</th>
                                  <th>{t("Growth")}</th>
                                  <th>{t("Option")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getDataForResistanceState && getDataForResistanceState.map((resList, index) => {
                                 
                                  return (
                                    <tr>
                                      <td><input type="checkbox" id={"checkSubTest" + resList.medicineId} role='switch' onClick={() => { handleCheckBox(resList.medicineId, index) }} />&nbsp;<span>{resList.medicineName}</span></td>
                                      <td id={'antibiotic' + index}>R</td>
                                      {(getGrowthId == 'Heavy' || getGrowthId == 'No select') && <td >{t("Heavy")}</td>}
                                      {getGrowthId == 'Moderate' && <td>{t("Moderate")}</td>}
                                      {getGrowthId == 'Scanty' && <td>{t("Scanty")}</td>}


                                      <td>
                                        <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1" id={'rRes' + resList.medicineId} value={''} onClick={() => { resistanceButton(index, 'R',resList.medicineId) }}>R</button>
                                        <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1 " id={'sRes' + resList.medicineId} value={''} onClick={() => { resistanceButton(index, 'S',resList.medicineId) }}>S</button>
                                        <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1" id={'msRes' + resList.medicineId} value={''} onClick={() => { resistanceButton(index, 'MS',resList.medicineId) }}>MS</button>
                                      </td>
                                    </tr>
                                  )
                                })}
                                {/* <tr>
                              <td><input type="checkbox" id={"checkSubTest"} role='switch' onClick={()=>{handleCheckBox()}} />&nbsp;<span>Azithromycin</span></td>
                              <td>R</td>
                              <td>Moderate</td>
                              <td>
                                <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1" onClick={''}>R</button> 
                                <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1" onClick={''}>S</button>
                                <button type="button" className="btn btn-save-opt btn-sm mb-1 me-1" onClick={''}>MS</button>
                              </td>
                            </tr> */}
                                {/* {sampleRecieveList && sampleRecieveList.map((list, index) => {
                          console.log('the list : ', list)
                          return(
                            <>{
                              list.isCollected === 'YES' && <tr key={list.id}> 
                                                  <td className="text-center">{index + 1}</td>
                                                  <td>{list.testname}</td>
                                                  <td>{list.categoryName}</td>
                                                  {list.labReceivingStatus === 1 ? <td>YES</td> : <td>NO</td>}
                                                  <td>{list.isCollected}</td>
                                                  {list.labReceivingStatus === 1 ? <td style={{ "width": "10%" }} className="text-center"><input type="checkbox" style={{backgroundColor : '#0000007a'}} disabled/></td> :
                                                    <td style={{ "width": "10%" }} className="text-center"><input type="checkbox" onClick={() => {getCheckedItem(list.itemID,list.sampleCollectionSubId)}} id={"testList"+list.itemID}/></td>}
                                                                                                   
                                              </tr>
                            }
                            </>
                          )
                        })} */}

                                {/* {sampleCollectionList && sampleCollectionList.map((val, ind) => {
                                          return (
                                              <tr key={val.id}>
                                                  <td className="text-center">{ind + 1}</td>
                                                  <td>{val.testname}</td>
                                                  <td>{val.categoryName}</td>
                                                  <td>{val.isCollected}</td>
                                                  {val.isCollected === 'YES' ? <th style={{ "width": "10%" }} className="text-center"><input type="checkbox" style={{backgroundColor : '#0000007a'}} disabled/></th> :
                                                  <th style={{ "width": "10%" }} className="text-center"><input type="checkbox" onClick={() => {getCheckedItem(val.itemID)}} id={"testList"+val.itemID}/></th>}
                                                                                                   
                                              </tr>
                                          )
                                      })} */}
                              </tbody>
                            </TableContainer>
                          </div>
                        </div>}
                      {getGrowthId != 'No Growth' && 
                        <div className="col-12">
                        <div className="d-flex justify-content-end gap-2 mt-2">
                          {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                            {disableSaveButton === false ? <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={handleSave}><img src={save} className='icnn'  alt='' />{t("Save")}</button>:
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={''} disabled>{t("Save")}</button>
                            }
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clear} className='icnn'  alt='' />{t("Clear")}</button>
                              </>
                              }

                          {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSave}>Save</button>
                          <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}>Reset</button> */}

                        </div>
                      </div>}

                      {getGrowthId == 'No Growth' && 
                        <div className="col-12">
                        <div className="d-flex justify-content-end gap-2 mt-2">
                          {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                            {disableSaveButton === false ? <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSaveForText}>{t("Save_Text")}</button>:
                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={''} disabled>{t("Save_Text")}</button>
                            }
                              
                              {/* <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}>Clear</button> */}
                              </>
                              }

                          {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSave}>Save</button>
                          <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}>Reset</button> */}

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
    {/* <div className='chatcnt'><img src={chat} className='icnn' alt='' /> </div> */}
    {/* {
      showLoder === 1 ? <Loder val={showLoder} /> : ""
    } */}
    {
                  showLoder === 1 ? <Loader val={showLoder} /> : ""
       }
    {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }
  </>
  )
}
