import React from 'react'
import bill from '../../assets/images/icons/bill.svg';
import patient from '../../assets/images/icons/patient.svg';
import UHID1 from '../../assets/images/icons/UHID1.svg';
import chat from '../../assets/images/icons/chat.svg'
import calender from '../../assets/images/icons/calender.svg'
import center from '../../assets/images/icons/center.svg';
import sample from '../../assets/images/icons/sample.svg';
import department from '../../assets/images/icons/department.svg'
import ward from '../../assets/images/icons/ward.svg';
import edit from '../../assets/images/icons/edit.svg'
import save from '../../assets/images/icons/save.svg'
import clear1 from '../../assets/images/icons/clear.svg'
import BoxContainer from '../../Component/BoxContainer'
import Heading from '../../Component/Heading';
import TableContainer from '../../Component/TableContainer';
import GetListOfTestOptionsDataForCultureSterileTest from '../Api/SampleRecieve/Get/GetListOfTestOptionsDataForCultureSterileTest';
import { useState } from 'react';
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'
import GetPerformTest from '../../Pathology/Api/GetPerformtest';
import GetPatientBillingDetails from '../../Pathology/Api/GetPatientBillingDetails';
import GetSampleRecieve from '../Api/SampleRecieve/Get/GetSampleRecieve';
import PostCultureSterileReport from '../Api/SampleRecieve/Post/PostCultureSterileReport';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import AlertToster from '../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function CreateCultureSterileReport() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  let [patientDetails, setPatientDetails] = useState([])
  let [txtBillNo, setTxtBillNo] = useState();
  let [sampleType, setSampleType] = useState('');
  let [getGramStain, setGramStain] = useState('');
  let [getWetMount, setWetMount] = useState('');
  let [billMasterId, setBillMasterId] = useState('');
  let [subTestName, setSubTestName] = useState('')
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [saveButtonDisable, setSaveButtonDisable] = useState(false)
  let [getTestID, setTestID] = useState('');
  let [getSampleCollectionSubId,setSampleCollectionSubId] = useState('')
  let [showRightSection, setShowRightSection] = useState(false);
  let [sampleRecieveList, setSampleRecieveList] = useState([])
  let [testOptionsForSterile, setTestOptionsForSterile] = useState([])
  let [arr, setArr] = useState([]);
  let[showImage,setShowImage]=useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  let handleTextBox = (e) => {
    if(e.target.name === 'Bill'){
      setTxtBillNo(e.target.value)
    }
    else if(e.target.name=== 'GramStain')
    {
     setGramStain(e.target.value);    
    }
    else if(e.target.name === 'WetMount'){
      
      // if(tempArr.length === 0){
      //   tempArr.push({
      //     id:2,
      //     text:e.target.value
      //   })
    
      //   setTxtTempArr([...tempArr]);
      // }
      // else{
      //   let index=tempArr.findIndex((arr)=>arr.id === 2);
      //   if(index !== -1){
      //     tempArr.splice(index,1,{
      //       id:2,
      //       text:e.target.value
      //     })
   
      //     setTxtTempArr([...tempArr]);
      //   }
      // }
      
      setWetMount(e.target.value);
    }
  }

  

let getPatientDetails = async () => {
  let data = await GetSampleRecieve(txtBillNo,clientID);
  let getPersonalDetails = await GetPatientBillingDetails(txtBillNo,clientID);
  let getTestDetails = data.responseValue.testDetails
  
  const patientBillingDetails = getPersonalDetails.responseValue[0];
  if(getPersonalDetails.status === 1) {
    setPatientDetails(patientBillingDetails)
    setShowImage(0)
      var parserData=JSON.parse(getPersonalDetails.responseValue[0].sampleTypeList);
      var sampleString = '';
      for ( var k =0 ;k<parserData.length;k++){
        sampleString = sampleString === '' ? sampleString + parserData[k].sampleType : sampleString + ',' + parserData[k].sampleType
      }
      setSampleType(sampleString)
  }
  else if(getPersonalDetails.status !== 1){
    setShowAlertToster(1);
        setShowErrMessage('Bill Number does not exists!');
        setShowImage(1); setSampleType(''); setPatientDetails([])
  }

  if(data.status === 1){
    setSampleRecieveList(getTestDetails);
  }
  else if(getPersonalDetails.status === 1){
    setShowImage(1)
        setShowAlertToster(1);
        setShowErrMessage('No tests on this Bill Number!');
  }
}

  let getSterileTestListOptions = async (subTestName,billMasterID, testId, sampleCollectionSubId) => {
    setBillMasterId(billMasterID);
    let getList = await GetListOfTestOptionsDataForCultureSterileTest();
    if(getList.status === 1){
      
      setShowRightSection(true);
      setSubTestName(subTestName)
      setTestOptionsForSterile(getList.responseValue);
      setSampleCollectionSubId(sampleCollectionSubId);
      setTestID(testId)
    }
  }

  let handleCheckBox   = (chckId) => {
    let temp = [...arr];
    if(temp.length === 0)
    {
      temp.push({
        id: chckId,
        textValue:''
      })
      setArr([...temp])
    }
    else{
      var index = arr.findIndex((i)=> i.id==chckId);
      if(index != -1)
      {
        let temp = [...arr]
        temp.splice(index,1);
        setArr([...temp])
      }
      else{
        temp.push({
          id:chckId,
          textValue:''
        })
        setArr([...temp])
      }
    }
    
  }

  let handleSave = async () => {
    
    if(arr.length === 0)
    {
      alert('Please check atleast one checkbox')
    }
    else{
     let detailsArr =[];
      arr.push({
        id:1,
        textValue:getGramStain
      },{
         id:2,
         textValue:getWetMount
      });
      detailsArr.push({
        itemID:getTestID,
        
        userId:JSON.parse(window.sessionStorage.getItem("LoginData")).userId
      })
      let obj ={
        resultJsonForDetails: JSON.stringify(arr),
        resultTemplateJson: JSON.stringify(detailsArr),
        billMasterId:billMasterId,
        userId:JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        clientId:clientID
      }
    
      
      let postData = await PostCultureSterileReport(obj)
      
        if(postData.status === 1) {
          for(var j=0; j<testOptionsForSterile.length;j++)
      {
        document.getElementById('checkSubTestForText'+ testOptionsForSterile[j].id).setAttribute('disabled','disabled');
      }
      setSaveButtonDisable(true);
      getPatientDetails();
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
   let clear = () => {
    for(var i =0; i<testOptionsForSterile.length;i++)
    {
      document.getElementById('checkSubTestForText'+testOptionsForSterile[i].id).checked = false;
    }
    setGramStain('');
    setWetMount('');
   }

   

  return (<>
   <section className="main-content mt-5 pt-3"> 
   <div className="container-fluid">
        <div className="row">
        <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Create_Culture_Sterile_Report")}</div></div></div>
          <div className="col-12">
            <div className='whitebg'>
              <div className="row">
                <div className="col-md-3 col-sm-12 analuze">
                  <div className="fieldsett-in">
                    <div className="fieldsett billfie">
                    <span className='fieldse'>{t("Bill_Details")}</span>
                    <div className="mt-2 me-2 col-12" >
                          <img src={bill} className='icnn' alt='icnn' /> <label htmlFor="Bill" className="form-label">{t("Bill_No.")}</label>
                        </div>
                        <BoxContainer>
                        <div className="mb-2 me-2">
                            <input type="text" value={txtBillNo} onChange={handleTextBox} className="form-control form-control-sm" id="txtBillNo" name="Bill" placeholder={t("Enter_Bill_No.")} />
                          </div>
                          <div className="mb-2">
                            <div className='searchbtnn'>
                              <button onClick={getPatientDetails}><i className='fa fa-search'></i>{t("Search_Result")}</button>
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
                          {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder={t("UHID")} value={''} />:
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
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.patientName + ' ' + patientDetails.age + ' ' + patientDetails.ageType} />}
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
                          <label htmlFor="FoodSupplementDrug" className="form-label">{t('Bill_Date')}</label>
                          {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t('Bill_Date')} value={''} />:
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
                      <Heading text={t("Test_Details")} />
                      <div className='samplename'>
                        <label className='headingtxt'><strong>{t("Sample")}:</strong></label>
                        <span className='headingSample'>{sampleType}</span>
                      </div>
                      <div className="med-table-section shadow-none" style={{ height: "60vh",  position:'relative'}}>
                      {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
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
                          {sampleRecieveList && sampleRecieveList.map((list, index) => {
                         
                            return (<>
                              {list.labReceivingStatus === 1 && <tr>
                                <td className='text-center'>{index + 1}</td>
                                <td>{list.testname}</td>
                                <td>{list.isPerformed === 'NO' ? 'NOT DONE':'DONE'}</td>
                                {list.isPerformed === 'NO' ? <td  align='center'  title='Disabled' onClick={() => {getSterileTestListOptions(list.testname, list.billMasterId,list.itemID,list.sampleCollectionSubId)}}><img src={edit} className='btl-icnn1'  alt='' /></td>:
                                <td  align='center' title='Disabled' disabled><img src={edit} className='btl-icnn1'  alt='' /></td>}
                                
                              </tr>}
                              </>
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

                  <div className="col-md-8 col-sm-12 prt1">
                    {showRightSection === true && <>
                      <div className="whitebg" style={{height:'68vh', paddingTop:'0px'}}>
                      <Heading text={t("Test_Only")} />
                      <div className="row">
                        
                          <div className="col-md-12 col-sm-12 mb-1">
                          
                            <div className='dflex regEqualColums srreport'>
                              <div className="col-2 mb-2 me-2">
                                <img src={UHID1} className='icnn' alt='icnn' />
                                <label htmlFor="FoodSupplementDrug" className="form-label">{t("Gram_Stain")}</label>
                                <input type='text' className='form-control form-control-sm' name='GramStain' id='1'  onChange={handleTextBox}  value={getGramStain} />
                              </div>
                              <div className="col-2 mb-2 me-2">
                                <img src={UHID1} className='icnn' alt='icnn' />
                                <label htmlFor="FoodSupplementDrug" className="form-label">{t("Wet_Mount")}</label>
                                <input type='text'className='form-control form-control-sm' name='WetMount' id='2' onChange={handleTextBox}  value={getWetMount} />
                              </div>
                              <div className="col-2 mb-2 me-2">
                                <img src={patient} className='icnn' alt='icnn' />
                                <label htmlFor="FoodSupplementDrug" className="form-label">{t("SubTest_Name")}</label>
                                <input type='text' disabled className='form-control form-control-sm' value={subTestName} />
                              </div> 
                            </div>
                        
                          </div>
                          <div className='col-md-12 col-sm-12'>                          
                            <label className='subj'>{t("Test_Result")}</label>
                            <div className='med-table-section box-shadow-none'>
                            <table className="med-table border_ striped">
                              <tbody>
                              {testOptionsForSterile && testOptionsForSterile.map((list, ind) => {
                                return(
                                  <tr>
                                  <td><input type="checkbox" id={'checkSubTestForText' + list.id} name='checkSubTestForText' defaultChecked={''} role='switch' onClick={()=>{handleCheckBox(list.id)}} ></input></td>
                                  <td style={{color:'#7B7B7B'}}>{list.detailsName}</td>
                                  
                                </tr>
                                )
                              })}
                               
                              </tbody>
                            </table>
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
                       
                        <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">
                           {showUnderProcess === 1 ? <><TosterUnderProcess /></> : 
                           showToster === 1 ? <Toster value={tosterValue} message = {tosterMessage} /> : <>
                             {saveButtonDisable === false ?
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={handleSave}><img src={save} className='icnn'  alt='' />{t("Save")}</button>:
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={''} disabled><img src={save} className='icnn'  alt='' />{t("Save")}</button>}
                                {saveButtonDisable === false ?
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clear}><img src={clear1} className='icnn'  alt='' />{t("Clear")}</button>:
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={''} disabled><img src={clear1} className='icnn'  alt='' />{t("Clear")}</button>}</>}
                          </div>
                        </div>
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
                    </>}




                  </div>

                </div>
              </div>
            </div>
        </div>
      </div>
      {
                      showAlertToster === 1 ?
                          <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                  }
   </section>
   </>
  )
}
