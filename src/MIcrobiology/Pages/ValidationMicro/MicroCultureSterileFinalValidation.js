import React, { useEffect, useState } from 'react'
import sample from '../../../assets/images/icons/sample.svg'
import NoDataFound from '../../../assets/images/icons/No data-rafiki.svg'
import patient from '../../../assets/images/icons/patient.svg';
import UHID1 from '../../../assets/images/icons/UHID1.svg';
import calender from '../../../assets/images/icons/calender.svg'
import center from '../../../assets/images/icons/center.svg';
import department from '../../../assets/images/icons/department.svg'
import ward from '../../../assets/images/icons/ward.svg';
import BoxContainer from '../../../Component/BoxContainer'
import Heading from '../../../Component/Heading';
import TableContainer from '../../../Component/TableContainer';
import GetMicrobiologyTestResultListForValidation from '../../Api/SampleRecieve/Get/GetMicrobiologyTestResultListForValidation';
import GetPatientBillingDetails from '../../../Pathology/Api/GetPatientBillingDetails';
import GetListOfTestOptionsDataForCultureSterileTest from '../../Api/SampleRecieve/Get/GetListOfTestOptionsDataForCultureSterileTest';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import GetMicrobiologyTestResultForValidation from '../../Api/SampleRecieve/Get/GetMicrobiologyTestResultForValidation';
import PostMicrobiologyTestResultValidation from '../../Api/SampleRecieve/Post/PostMicrobiologyTestResultValidation';
import PostModifyCultureSterileReport from '../../Api/SampleRecieve/Post/PostModifyCultureSterileReport';

export default function MicroCultureSterileFinalValidation() {

  //let [showLoder, setShowLoder] = useState(0);
  let [patientDetails, setPatientDetails] = useState([])
  let [getTxtBillNo, setTxtBillNo] = useState(window.sessionStorage.getItem('billNumber'));
  let [getBillMasterID, setBillMasterID] = useState(parseInt(window.sessionStorage.getItem('billMasterID')));
  let [sampleType, setSampleType] = useState('');
  let [saveButtonDisable, setSaveButtonDisable] = useState(false);
  let [showEditButton, setShwowEditButton] = useState(true)
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [getGramStain, setGramStain] = useState('');
  let [getWetMount, setWetMount] = useState('');
  let [labNumber, setLabNumber] = useState('');
  let [getTestID, setTestID] = useState('');
  let [showButton, setShowButton] = useState(false);
  let[showImage,setShowImage]=useState(0);
  let [sampleCollectionSubId, setSampleCollectionSubId] = useState('');
  let [getBillMasterId, setGetBillMasterId] = useState('');
  let [investigationArr, setInvestigationArr] = useState([]);
  let [getPerformTestList, setPerformTestList] = useState([]);
  let [testOptionsForSterile, setTestOptionsForSterile] = useState([]);
  let [validateArr, setValidateArr] = useState([]);
  let [getTestRowIDArr, setTestRowIDArr] = useState([]);
  let [getTestRowID, setTestRowID] = useState('')

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  let handleText = (e) => {
    if(e.target.name === 'GramStain'){
      setGramStain(e.target.value)
    }
    else if(e.target.name === 'WetMount'){
      setGramStain(e.target.value)
    }
  }

  ///////////////////// To get details of patient and his/her tests///////////////////////////////////////
  let funGetPatientDetails = async () => {
    let cultureTypeID = parseInt(window.sessionStorage.getItem('cultureTypeId'))
   
    //setShowLoder(1);
    let getResult = await GetMicrobiologyTestResultListForValidation(getBillMasterID,cultureTypeID,clientID);
    let getPatientDetails = await GetPatientBillingDetails(getTxtBillNo,clientID);
    
    
    
    if (getResult.status === 1 && getPatientDetails.status === 1){
      const testList = getResult.responseValue;
      const patientBillingDetails = getPatientDetails.responseValue[0];

      setPatientDetails(patientBillingDetails)

      //setShowLoder(0);
      setShowImage(0)
      setPerformTestList(testList);
      //setTestID(patientBillingDetails.testID);
      setGetBillMasterId(testList[0].billMasterID);
      //setSampleCollectionSubId(testList.sampleCollectionSubId);
      setLabNumber(testList[0].labNumber);
      var parserData=JSON.parse(patientBillingDetails.sampleTypeList);
        var formatCol="";        
        for(var k =0;k<parserData.length;k++){ 
          formatCol= formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' +  parserData[k].sampleType ;
        }
        setSampleType(formatCol)
    }
    else{
      setShowImage(1)
    }
  }

  /////////////////// Gives list of sterile for validation ////////////////////////////
  let getSterileTestListOptions = async (testId, sampleCollectionSubId) => {
    
    let tempArr = [...validateArr];
    let tempDetailsArr = [...getTestRowIDArr]
    let cultureTypeID = parseInt(window.sessionStorage.getItem('cultureTypeId'))
    
    //setBillMasterId(billMasterID);
    let getList = await GetListOfTestOptionsDataForCultureSterileTest(clientID);
    let getResultData = await GetMicrobiologyTestResultForValidation(testId,sampleCollectionSubId,cultureTypeID,clientID);
    setInvestigationArr(JSON.parse(getResultData.responseValue[0].investigationresultdetailsJson))
    let investArr = JSON.parse(getResultData.responseValue[0].investigationresultdetailsJson)
    
    if(getList.status === 1){
      setShowButton(true)
      setTestOptionsForSterile(getList.responseValue);
      setSampleCollectionSubId(sampleCollectionSubId);
      setTestID(testId);
      setTimeout(() =>{
        var d = investArr.filter((arr) => arr.investigationresultdetailsId === 1)
        var d1 = investArr.filter((arr) => arr.investigationresultdetailsId === 2)
        setWetMount(d[0].detailValue);
        setGramStain(d1[0].detailValue);
        
        for(var i=0;i<getList.responseValue.length;i++){
          for(var j =0;j<investArr.length;j++){
            if(getList.responseValue[i].id === investArr[j].investigationresultdetailsId){
             
              document.getElementById('checkSubTestForText'+investArr[j].investigationresultdetailsId).checked = true;
              
              tempArr.push({
                id:investArr[j].investigationresultdetailsId,
                textValue:''
              })
              setValidateArr([...tempArr])
            }
          }
        }
      },200)
    }

    if(getResultData.status === 1){
      setSaveButtonDisable(false)
      setTestRowID(getResultData.responseValue[0].id)
      for(var i =0; i<getResultData.responseValue.length;i++){
      
        tempDetailsArr.push({
                testResultRowId:getResultData.responseValue[i].id
               })
               setTestRowIDArr([...tempDetailsArr])
      }
    }
  }

  let handleCheck = (checkId) => {
    let tempArr = [...validateArr];
    if(tempArr.length === 0)
    {
      tempArr.push({
        id:checkId,
        textValue:''
      })
    }
    else{
      var index= validateArr.findIndex((i) => i.id === checkId)
      if(index != -1)
      {
        let tempArr = [...validateArr];
        tempArr.splice(index, 1);
        setValidateArr([...tempArr])
      }
      else{
        tempArr.push({
          id:checkId,
          textValue:''
        })
        setValidateArr([...tempArr])
      }
    }
  }

  let handleSave = async () => {
   
    if(validateArr.length === 0)
    {
      alert('Please check atleast one checkbox')
    }
    else{
      let detailsArr =[];
      validateArr.push({
        id:1,
        textValue:getGramStain
      },
      {
        id:2,
        textValue:getWetMount
      }
      );
      detailsArr.push({
        itemID:getTestID,
        id:getTestRowID,
        sampleCollectionSubID:sampleCollectionSubId,
        userId:JSON.parse(window.sessionStorage.getItem("LoginData")).userId
      });
     
      let obj ={
        billMasterId:getBillMasterID,
        resultValidationJson: JSON.stringify(validateArr),
        resultTemplateJson: JSON.stringify(detailsArr),
        userId:JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        clientId:clientID
      }
     
      let modifyData = await PostModifyCultureSterileReport(obj);
      if(modifyData.status === 1){
        setSaveButtonDisable(true);
        funGetPatientDetails();
        setShowUnderProcess(0);
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

  let handleValidate = async () => {
    let obj = {
      resultValidationJson:JSON.stringify(getTestRowIDArr),
        userId : JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        clientId:clientID
    }
  
    let validateData = await PostMicrobiologyTestResultValidation(obj);
    if(validateData.status === 1) {
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
      setTosterMessage(validateData.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }
  }

  let handleEdit = () => {
    setShwowEditButton(false)
  }

  useEffect(() => {
    funGetPatientDetails()
  },[])
  return (
    <section className="main-content mt-5 pt-3"> 
   <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className='whitebg'>
              <div className="row">
                
                <div className="col-md-12 col-sm-12">
                    <div className="fieldsett-in">
                      <div className="fieldsett">
                        <span className='fieldse'>Culture Sterile Validation</span>
                        <BoxContainer>
                        <div className="mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">UHID</label>
                            {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder='UHID' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.uhId} />}
                          </div>
                          <div className="mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">IP No.</label>
                            {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder='IP No.' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.ipNo} />}
                          </div>
                          <div className="mb-2 me-2">
                            <img src={patient} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Patient Name</label>
                            {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder='Patient Name' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.patientName + ' ' + patientDetails.age + ' ' + patientDetails.agetype} />} 
                          </div>

                          <div className="mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Visit No.</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Visit No.' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.crNo} />}
                          </div>
                          <div className="mb-2 me-2">
                            <img src={sample} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Sample Type</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder='Sample Type' value={sampleType} />
                          </div>
                          <div className="mb-2 me-2">
                            <img src={center} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Center</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Center' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.center} />}
                          </div>
                          <div className="mb-2 me-2">
                            <img src={department} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Department</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Department' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.departName} />}
                          </div>
                          <div className="mb-2 me-2">
                            <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Ward</label>
                            {patientDetails.length === 0 ?<input type='text' disabled className='form-control form-control-sm' placeholder='Ward' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.wardName} />}
                          </div>
                          
                          <div className="mb-2 me-2">
                            <img src={calender} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Bill Date.</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Bill Date' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.billDate} />}
                          </div>
                        </BoxContainer>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2">
              <div className='whitebg1'>
                <div className='row'>
                  <div className="col-md-4 col-sm-12 plt">
                    <div className='whitebg'>
                      <Heading text='Test Details' />
                      <div style={{marginBottom:'5px'}}>
                      <label className='heading' style={{color:'#546788', fontSize:'16px', fontWeight:'600'}}>Sample:</label>
                      <span className='headingSample'>{''}</span>
                      </div>
                      <div className="med-table-section" style={{ "height": "50vh" , position:'relative'}}>
                      {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                        <TableContainer>
                          <thead>
                            <tr>
                              <th className="text-center" style={{ "width": "5%" }}>#</th>
                              <th>Test Name</th>
                              
                              <th style={{ "width": "10%" }} className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {getPerformTestList && getPerformTestList.map((val, ind) => {
                          
                              return (
                                <tr key={val.id}>
                                  <td className="text-center">{ind + 1}</td>
                                  <td>{val.testname}</td>
                                  {val.currentValidateLevel === 1?<td title='Data already collected!' disabled><i className="fa fa-edit actionedit"></i></td>:
                                  <td onClick={() => {getSterileTestListOptions(val.testID,val.sampleCollectionSubID)}} ><i className="fa fa-edit actionedit"></i></td>}
                                  
                                </tr>
                              )
                            })}
                          {/* <tr>
                            <td>1</td>
                            <td>Test Name</td>
                            <td>Done</td>
                            <td  title='Disabled' disabled><i className="fa fa-edit actionedit" style={{backgroundColor:'#00000040'}} ></i></td>
                          </tr> */}
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

                  <div className="col-md-8 col-sm-12 prt">
                  <>
                      <div className="whitebg">
                      <div className="row">
                        <div className='col-12'>
                          <div className="titile-txt"><div className="title-h"><div className="heading mb-2">Test Only</div></div></div>
                          <div className="col-md-8 col-sm-12">
                          
                          <BoxContainer>
                        <div className="mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Gram Stain</label>
                            {showEditButton === true ? <input type='text' className='form-control form-control-sm' name='GramStain' id='1'  onChange={''}  value={getGramStain} disabled/> :
                            <input type='text' className='form-control form-control-sm' name='GramStain' id='1'  onChange={handleText}  value={getGramStain} />}
                          </div>
                          <div className="mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Wet Mount</label>
                            {showEditButton === true ? <input type='text'className='form-control form-control-sm' name='WetMount' id='2' onChange={''}  value={getWetMount} disabled/> :
                            <input type='text'className='form-control form-control-sm' name='WetMount' id='2' onChange={handleText}  value={getWetMount} />}
                          </div>
                          <div className="mb-2 me-2">
                            <img src={patient} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">SubTest Name</label>
                            <input type='text' disabled className='form-control form-control-sm' value={''} />
                          </div>
                          
                          
                          
                          
                        </BoxContainer>
                        
                          </div>
                          <div className='col-md-12 col-sm-12'>
                          <div className="fieldsett-in">
                            
                          <div className="fieldsett">
                          <>
                            <label className='heading' style={{color:'#546788', fontSize:'16px', fontWeight:'600', marginTop:'-7px'}}>Test Result</label>
                            <hr style={{marginTop:'7px'}} />
                            </>
                            <div className='med-table-section box-shadow-none'>
                            <table className="med-table border_ striped">
                              <thead>
                              {testOptionsForSterile && testOptionsForSterile.map((list, ind) => {
                                return(
                                  <tr>
                                  {showEditButton === true ? <td><input type="checkbox" id={'checkSubTestForText' + list.id} name='checkSubTestForText' defaultChecked={''} role='switch' onClick={''} disabled></input></td>:
                                  <td><input type="checkbox" id={'checkSubTestForText' + list.id} name='checkSubTestForText' defaultChecked={''} role='switch' onClick={()=>{handleCheck(list.id)}} ></input></td>}
                                  <td style={{color:'#7B7B7B'}}>{list.detailsName}</td>
                                  
                                </tr>
                                )
                              })}
                               
                              </thead>
                            </table>
                            </div>
                          </div>
                          </div>
                          </div>
                          {/* <div className='med-table-section box-shadow-none'>
                            <table className="med-table border_ striped">
                              <thead>
                                <tr>
                                  <th className='text-center_'>Action</th>
                                  <th>Sub Test Name</th>
                                  <th>Value</th>
                                </tr>
                              </thead>
                              <tbody>
                              <tr>
                              <td><input type="checkbox" id={'checkSubTestForText'} name='checkSubTestForText' defaultChecked={''} role='switch' onClick={''} ></input></td>
                                <td>Test</td>
                                <td>{<input type="number" id={'subtestDisabled'} onChange={''} />}<span>&nbsp;{''}</span></td>
                              </tr>

                                {sampleTampleList && sampleTampleList.map((val, ind) => {
                                  return (
                                    <tr key={val.subTestId}>
                                      <td><input type="checkbox" id={'checkSubTestForText' + val.subTestId} name='checkSubTestForText' defaultChecked={isChecked} role='switch' onClick={() =>{pushCheckBoxDataForText(val.subTestId, val.subTestName
                                      )}} ></input></td>
                                      <td>{val.subTestName}</td>
                                      <td>{<input type="number" id={'subtestDisabled' + val.subTestId} onChange={()=>{handleFillSubtestValue(val.subTestId,val.unit)}} />}<span>&nbsp;{''}</span></td>
                                    </tr>

                                  )
                                })}
                                {showRemark && <tr>
                                                  <textarea className='mt-2' id='remarkForSubTest' name='remarkForSubTest' value={fillRemark} placeholder='Please Enter Remark....' style={{width: '100%'}} onChange={handleTextboxChange}/>
                                                </tr>
                                        }


                              </tbody>
                            </table>
                          </div> */}
                          <div>
                          </div>
                          
                        </div>
                        {(showEditButton === true && showButton === true) && <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">
                          {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                          showToster === 1 ? <Toster value={tosterValue} message = {tosterMessage} /> : <>
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleValidate}>Validate</button>
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleEdit}>Edit</button></>}
                                
                          </div>

                        </div>}
                        
                        {(showEditButton === false && showButton === true) && <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">
                           {showUnderProcess === 1 ? <><TosterUnderProcess /></> : 
                           showToster === 1 ? <Toster value={tosterValue} message = {tosterMessage} /> : <>
                             {saveButtonDisable === false ?
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSave}>Modify</button>:
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={''} disabled>Save</button>}
                                {saveButtonDisable === false ?
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={''}>Clear</button>:
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={''} disabled>Clear</button>}</>}
                          </div>

                        </div>}
                        {/* <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">
                            {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                              showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                              {saveButtonDisable === false?<button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSave}>Save</button>:
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSave}>Save</button>}
                                
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}>Clear</button></>}
                          </div>

                        </div> */}
                      </div>
                    </div>
                    </>




                  </div>

                </div>
              </div>
            </div>
        </div>
      </div>
   </section>
    
  )
}
