import React from 'react'
import bill from '../../../assets/images/icons/bill.svg'
import NoDataFound from '../../../assets/images/icons/No data-rafiki.svg'
import patient from '../../../assets/images/icons/patient.svg'
import sample from '../../../assets/images/icons/sample.svg'
import UHID1 from '../../../assets/images/icons/UHID1.svg'
import ward from '../../../assets/images/icons/ward.svg'
import calender from '../../../assets/images/icons/calender.svg'
import center from '../../../assets/images/icons/center.svg'
import department from '../../../assets/images/icons/department.svg';
import validate1 from '../../../assets/images/icons/validate1.svg'
import clear from '../../../assets/images/icons/clear.svg'
import back from '../../../assets/images/icons/back.svg'
import edit from '../../../assets/images/icons/edit.svg'
import modify from '../../../assets/images/icons/modify.svg'
import chat from '../../../assets/images/icons/chat.svg'
import gender from '../../../assets/images/icons/gender.svg'
import TableContainer from '../../../Component/TableContainer';
import BoxContainer from '../../../Component/BoxContainer';
import Heading from '../../../Component/Heading';
import { useState } from 'react';
import TextEditor from '../../../Component/TextEditor'
import GetPerformTest from '../../../Pathology/Api/GetPerformtest'
import GetPatientBillingDetails from '../../../Pathology/Api/GetPatientBillingDetails'
import { useEffect } from 'react'
import GetMicrobiologyTestResultListForValidation from '../../Api/SampleRecieve/Get/GetMicrobiologyTestResultListForValidation'
import GetMicrobiologyTestResultForValidation from '../../Api/SampleRecieve/Get/GetMicrobiologyTestResultForValidation'
import PostMicrobiologyTestResultValidation from '../../Api/SampleRecieve/Post/PostMicrobiologyTestResultValidation'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import Toster from '../../../Component/Toster'
import { useNavigate } from 'react-router-dom'
import PostModifyCultureLabReport from '../../Api/SampleRecieve/Post/PostModifyCultureLabReport'

export default function MicroValidation() {
  let [patientDetails, setPatientDetails] = useState([])
  let [isEnabledTextEditor, setIsEnabledTextEditor] = useState(false)
  let [getTxtBillNo, setTxtBillNo] = useState(window.sessionStorage.getItem('billNumber'));
  let [getBillMasterID, setBillMasterID] = useState(parseInt(window.sessionStorage.getItem('billMasterID')));
  let [getPerformTestList, setPerformTestList] = useState([]);
  let [getBillMasterId, setGetBillMasterId] = useState('');
  let [sampleType, setSampleType] = useState('');
  let [getSubTestID, setSubTestID] = useState('')
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [labNumber, setLabNumber] = useState('');
  let [getTestID, setTestID] = useState('');
  let [getRowID, setRowID] = useState('');
  let [getUnitID, setUnitID] = useState('')
  let [getTestRowIDArr, setTestRowIDArr] = useState([]);
  let [sampleCollectionSubId, setSampleCollectionSubId] = useState('');
  let [editorValue, setEditorValue] = useState("");
  let [saveButtonDisable, setSaveButtonDisable] = useState(false);
  let [showTemplate, setShowTemplate] = useState(false)
  let [showModify, setShowModify] = useState(false);
  let[showImage,setShowImage]=useState(0);

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;
  const navigate = useNavigate()
  ////////////////////// To fill data in text box //////////////
  let handleTexteditor = (e)=>{
    
    setEditorValue(e.target.value)
  }

///////////////////// To get details of patient and his/her tests///////////////////////////////////////
  let funGetPatientDetails = async () => {
    let cultureTypeID = parseInt(window.sessionStorage.getItem('cultureTypeId'))
  
    
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

  let funGetMicroTestResult = async (testRowId,testId,sampleCollectionSubId) =>{
    let tempArr = [...getTestRowIDArr]
    let cultureTypeID = parseInt(window.sessionStorage.getItem('cultureTypeId'))
    let getResultData = await GetMicrobiologyTestResultForValidation(testId,sampleCollectionSubId,cultureTypeID,clientID)
    
   
    if(getResultData.status === 1){
    for(var i =0; i<getResultData.responseValue.length;i++){
    
             tempArr.push({
              testResultRowId:getResultData.responseValue[i].id
             })
             setTestRowIDArr([...tempArr])
    }
   
    setIsEnabledTextEditor(false)
    setSampleCollectionSubId(sampleCollectionSubId)
    setRowID(getResultData.responseValue[0].id);
    setUnitID(getResultData.responseValue[0].resultUnitID)
    setSubTestID(getResultData.responseValue[0].subtestID)
    setTestID(testId)
    setEditorValue(getResultData.responseValue[0].resultText);
    setSaveButtonDisable(false);
    setShowTemplate(true)
  }
  else{
    alert('Data Is Not Available at moment')
  }
  }

  ////////////// to validate data //////////////////////////////////

  let funValidateData = async () => {
    
    if(editorValue.trim() === ''){
      alert('Please write the report');
    }
    else{
      
      let obj = {
        resultValidationJson:JSON.stringify(getTestRowIDArr),
        userId : JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        clientId: clientID

      }
      // return;
      let validateDataSave = await PostMicrobiologyTestResultValidation(obj);
      if(validateDataSave.status === 1) {
        setShowUnderProcess(0);
      setSaveButtonDisable(true);
      funGetPatientDetails();
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
  }

  let funPreviousPage = () =>
  {
    navigate('/microlaboratoryvalidation/')
  }

  let funEdit = () => {
    
    setShowModify(true)
    setIsEnabledTextEditor(true)
  }

  let funModifyData = async () => {
    
    let finalArr = [];
    if(getTxtBillNo === '' || getTxtBillNo === null || getTxtBillNo === undefined || getTxtBillNo === 0)
    {
      alert('Fill Bill Number !');
      return false;
    }
    else{
      finalArr.push({
        id:getRowID,
        itemID:getTestID,
        subTestID: getSubTestID,
        sampleCollectionSubID:sampleCollectionSubId,
        unitID:getUnitID,
        resultText:editorValue,
        userId:JSON.parse(window.sessionStorage.getItem("LoginData")).userId
        
      })
      
    }
    var obj = {
      resultTemplateJson:JSON.stringify(finalArr),
      
      userId:JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
      clientId:clientID
    }
  
    let modifyData = await PostModifyCultureLabReport(obj);
    if(modifyData.status === 1){
      setShowUnderProcess(0);
      setSaveButtonDisable(true);
      funGetPatientDetails();
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
      setTosterMessage(modifyData.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }

  }

  useEffect(() => {
    funGetPatientDetails()
  },[])

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
          <div class="col-12"><div class="med-box  mb-1"><div class="title">Microbiology Laboratory Validation</div></div></div>
            <div className="col-12">
                <div className="whitebg">
                    <div className="fieldsett-in">
                      <div className="fieldsett">
                        <span class="fieldse">Laboratory Validation</span> 
                        <div className='dflex regEqualColums'>
                          <div className="col-2 mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">UHID</label>
                            {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder='UHID' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.uhId} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">IP No.</label>
                            {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder='IP No.' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.ipNo} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={patient} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Patient Name</label>
                            {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder='Patient Name' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.patientName + ' ' + patientDetails.age + ' ' + patientDetails.agetype} />} 
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Visit No.</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Visit No.' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.crNo} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={sample} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Sample Type</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder='Sample Type' value={sampleType} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={center} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Center</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Center' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.center} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={department} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Department</label>
                            {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder='Department' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.departName} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">Ward</label>
                            {patientDetails.length === 0 ?<input type='text' disabled className='form-control form-control-sm' placeholder='Ward' value={''} />:
                          <input type='text' disabled className='form-control form-control-sm' value={patientDetails.wardName} />}
                          </div>                         
                          <div className="col-2 mb-2 me-2">
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
              <div className='whitebg1'>
                <div className='row'>
                  <div className="col-md-4 col-sm-12 plt">
                    <div className='whitebg' style={{height:'76vh', paddingTop:"0px"}}>
                      <Heading text='Test List' />
                      <div className="med-table-section" style={{ "height": "69vh" ,position:'relative'}}>
                      {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                        <TableContainer>
                          <thead>
                            <tr>
                              <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                              <th>Test Name</th>
                              <th>Status</th>
                              <th align='center' style={{ "width": "10%" }} className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getPerformTestList && getPerformTestList.map((val, ind) => {
                        
                              return (
                                <tr key={val.id}>
                                  <td className="text-center">{ind + 1}</td>
                                  <td>{val.testname}</td>
                                  <td>{val.currentValidateLevel === 1 ? 'Done':'Not Done'}</td>
                                  {val.currentValidateLevel === 1?<td align='center' title='Data already collected' disabled><img src={edit} className='btl-icnn1'  alt='' /></td>:
                                  <td align='center' onClick={()=>{funGetMicroTestResult(val.id,val.testID,val.sampleCollectionSubID)}} ><img src={edit} className='btl-icnn1'  alt='' /></td>}
                                  
                                </tr>
                              )
                            })}
{/* {val.isPerformedTest === 'NO' ? <td onClick={''} ><i className="fa fa-edit actionedit"></i></td> :
                                  <td  title='Disabled' disabled><i className="fa fa-edit actionedit" style={{backgroundColor:'#00000040'}} disabled></i></td>} */}
                          </tbody>
                        </TableContainer>}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8 col-sm-12 prt">
                    <div className="whitebg"  style={{height:'76vh', paddingTop:"0px"}}>
                      {showTemplate === true &&
                        <div className="row">
                        <div className='col-12'>
                        <div className="titile-txt"><div className="title-h"><div className="heading mb-2">Test Name</div></div><div className="title-h1">Lab NO. <span>{''}</span></div></div>
                        <div className={isEnabledTextEditor ? 'med-table-section box-shadow-none':'textEditorDisabled med-table-section box-shadow-none mt-2'} style={{height:'66vh',overflow:"auto"}}>
                        {/* <div className='med-table-section box-shadow-none' style={{marginTop:'5px'}}> */}
                            <TextEditor getTextvalue={handleTexteditor} name="abc" id="abc" setValue={editorValue} disabled/>
                          {/* </div> */}
                          </div>
                          <div>
                          </div>
                        </div>
                        
                        {showModify === false &&
                          <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">
                            {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                              showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                              {saveButtonDisable === false?<button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={funValidateData}><img src={validate1} className='icnn'  alt='' /> Validate</button>:
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={''} disabled><img src={validate1} className='icnn'  alt='' /> Validate</button>}
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={funEdit}><img src={clear} className='icnn'  alt='' />Edit</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={funPreviousPage}><img src={back} className='icnn'  alt='' />Back</button></>}
                          </div>

                        </div>}
                        {showModify === true &&
                          <div className="col-12">
                          <div className="d-flex justify-content-end gap-2 mt-2">
                            {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                              showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                              {saveButtonDisable === false?<button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={funModifyData}><img src={modify} className='icnn'  alt='' /> Modify</button>:
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={''} disabled><img src={validate1} className='icnn'  alt='' /> Validate</button>}   
                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={funPreviousPage}><img src={back} className='icnn'  alt='' /> Back</button></>}
                          </div>

                        </div>}
                      </div>}
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
    </>
  )
}
