import React, { useEffect } from 'react'
import { useState } from 'react';
import bill from '../../assets/images/icons/bill.svg'
import patient from '../../assets/images/icons/patient.svg'
import UHID1 from '../../assets/images/icons/UHID1.svg'
import ward from '../../assets/images/icons/ward.svg'
import calender from '../../assets/images/icons/calender.svg'
import center from '../../assets/images/icons/center.svg'
import department from '../../assets/images/icons/department.svg';
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'
import saveBtnIcon from "../../assets/images/icons/saveButton.svg";
import clearBtnIcon from "../../assets/images/icons/clear.svg";
import BoxContainer from '../../Component/BoxContainer';
import Heading from '../../Component/Heading';
import TableContainer from '../../Component/TableContainer';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import AlertToster from '../../Component/AlertToster';
import GetTestListForValidate from '../API/FinalValidate/GET/GetTestListForValidate';
import GetPatientDetails from '../API/PerformTest/GET/GetPatientDetails';
import remarkIcon from '../../assets/images/icons/edit.svg'
import TextEditor from '../../Component/TextEditor';
import GetTestData from '../API/FinalValidate/GET/GetTextData';
import ValidateTest from '../API/FinalValidate/POST/ValidateTest';
import SaveAndValidate from '../API/FinalValidate/POST/SaveAndValidate';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function RadioFinalValidate() {
  let [billNumber, setBillNumber] = useState(window.sessionStorage.getItem("billNumber"));
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [isModify, setisModify] = useState(0);
  let [showLoder, setShowLoder] = useState(0);
  let [showImage, setShowImage] = useState(0);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [patientDetails, setPatientDetails] = useState([]);
  let [testList, setTestList] = useState([]);
  let [testData, setTestData] = useState([]);
  let [activeTestName, setActiveTestName] = useState('');
  let [activeTestID, setActiveTestID] = useState('');
  let [showButtons, setShowButtons] = useState(false);
  let [isShowTxtImpression, setShowTxtImpression] = useState(false);
  let [txtImpression, setTxtImpression] = useState('');
  let [showRemark, setRhowRemark] = useState(0);
  let [remarkList, setRemarkList] = useState([]);
  let [activeOrganID, setActiveOrganID] = useState('');
  let [txtRemark, stetxtRemark] = useState("");
  let [editorValue, setEditorValue] = useState("");
  let [activeTestResultRowID, setActiveTestResultRowID] = useState("");
  let [isDisabledTextEditor, setisDisabledTextEditor] = useState(true);
  let [disableRemark, setDisableRemark] = useState(true)
  const { t } = useTranslation();
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;
  const handlerGetPatientDetailsAndSubtestList = async (param) => {
    setShowLoder(1);
    var obj = {
      billNo: billNumber,
      userID: userID,
      clientId : clientID
    }
    const responsePatientDetails = await GetPatientDetails(billNumber);
    const responseTestList = await GetTestListForValidate(obj);

    if (responsePatientDetails.status === 1) {
      setPatientDetails(responsePatientDetails.responseValue[0]);
      setShowLoder(0);
    }
    else {
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(responseTestList.responseValue);
    }
    if (responseTestList.status === 1) {
      setTestList(responseTestList.responseValue);
      setShowLoder(0);
      // if(responseTestList.responseValue.testType.length === 0){
      //     setShowImage(1);
      // }
      // else{
      //     setShowImage(0);
      // }
    }
    else {
      setShowImage(1);
      setShowLoder(0);
      // setShowAlertToster(1);
      // setShowErrMessage(responseTestList.responseValue);
    }
  }
  let getTestDataByTestID = async (param) => {
    var obj = {
      key: param,
      userID: userID,
      clientId:clientID
    }
    const response = await GetTestData(obj);
    if (response.status === 1) {
      
      setTestData(response.responseValue);
      setActiveTestResultRowID(param);
      if (response.responseValue.length > 0) {
        setActiveTestName(response.responseValue[0].testName);
        setActiveTestID(response.responseValue[0].testId);
        setEditorValue(response.responseValue[0].impression);
        setisModify(0);
        handlerSetDisabledFields();
        setShowButtons(true);
        setShowTxtImpression(true);
        handlerClear();
       setTimeout(()=>{
        showDataValue(response.responseValue);
       },)
       
      }
      else {
        setActiveTestName('');
        setActiveTestID('');
        setShowButtons(false);
        setShowTxtImpression(false);

      }

    }
    else {
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
    }
  }
  let showDataValue=(param)=>{
    const dataList=param;
    for(var i =0 ; i < dataList.length; i++){
     
      const dataParser=JSON.parse(dataList[i].parameterValue);
      
      for(var j=0 ; j < dataParser.length; j++){
        document.getElementById("param_txtbox_val"+dataList[i].testId+''+dataList[i].organId+''+dataParser[j].ParameterId).value=dataParser[j].ParameterValue;
      }
    }
  }
  let handlerClear = () => {
    // var dataArrParser=[];
    // for(var i = 0; i < testData.length; i++){
    //    dataArrParser = JSON.parse(testData[i].parameterValue);
    //    for(var j =0; j < dataArrParser.length; j++){
    //        const input_boxID= "param_txtbox_val"+testData[i].testId+''+testData[i].organId+''+dataArrParser[j].parameterId;
    //        document.getElementById(input_boxID).value='';
    //    }
    //  }
    setTxtImpression('');
  }
  let handlerModifyTest = () => {
    setisModify(1);
    setDisableRemark(false)
    setisDisabledTextEditor(false);
    var dataArrParser = [];
    for (var i = 0; i < testData.length; i++) {
      dataArrParser = JSON.parse(testData[i].parameterValue);
      for (var j = 0; j < dataArrParser.length; j++) {
        const input_boxID = "param_txtbox_val" + testData[i].testId + '' + testData[i].organId + '' + dataArrParser[j].ParameterId;
        document.getElementById(input_boxID).removeAttribute('disabled');
      }
    }
    setTxtImpression('');
  }
  let handlerSetDisabledFields = () => {
    var dataArrParser = [];
    for (var i = 0; i < testData.length; i++) {
      dataArrParser = JSON.parse(testData[i].parameterValue);
      for (var j = 0; j < dataArrParser.length; j++) {
        const input_boxID = "param_txtbox_val" + testData[i].testId + '' + testData[i].organId + '' + dataArrParser[j].ParameterId;
        document.getElementById(input_boxID).setAttribute('disabled', '');
      }
    }
    setisDisabledTextEditor(true);
  }
  let handleTexteditor = (e)=>{
    
    setEditorValue(e.target.value)
  }
  let handlerSaveTestValue = (param1,param2)=>{
    const id= "param_txtbox_val"+activeTestID+''+param2+''+param1;
    const currentValue=document.getElementById(id).value;
    document.getElementById(id).value =currentValue;

  }
  let handlerShowRemarkPopUp = (params) => {
    setActiveOrganID(params.organId);
    
    if (remarkList.length > 0) {
      for (var i = 0; i < remarkList.length; i++) {
        if (remarkList[i].testID === activeTestID && remarkList[i].testResultRowID === params.testresultID && remarkList[i].organId === params.organId) {
          document.getElementById('txtRemark').value = remarkList[i].remark;
          stetxtRemark(remarkList[i].remark)
          break
        }
        else {
          document.getElementById('txtRemark').value=params.remark;
          stetxtRemark("")
        }
      }
    }
    else{
      document.getElementById('txtRemark').value=params.remark;
    }
  }
  let handlerSaveRemark = (params) => {
    const getData = document.getElementById("txtRemark").value;
    let tempArrData = [...remarkList];
    if (tempArrData.length === 0) {
      tempArrData.push({
        testID: activeTestID,
        testResultRowID: activeTestResultRowID,
        organId: activeOrganID,
        remark: getData
      })
    }
    else {
      const index = tempArrData.findIndex((arr) => arr.testID === activeTestID && arr.testResultRowID === activeTestResultRowID && arr.organId === activeOrganID);
      if (index != -1) {
        if(getData === ""){
          tempArrData.splice(index, 1)
        }
        else{
          tempArrData.splice(index, 1, {
            testID: activeTestID,
            testResultRowID: activeTestResultRowID,
            organId: activeOrganID,
            remark: getData
          })
        }
      }
      else {
        if(getData !== ""){
          tempArrData.push({
            testID: activeTestID,
            testResultRowID: activeTestResultRowID,
            organId: activeOrganID,
            remark: getData
          })
        }
      }
    }
    setRemarkList(tempArrData);

  }
  let makeRemarkDataList= async()=>{
    if(remarkList.length > 0){
      const tempArr=[...remarkList];
      
      for(var k =0; k < testData.length; k++){
        if(testData[k].remark !== null && testData[k].remark !== "" && testData[k].remark !== undefined)
        tempArr.push({
          testID: testData[k].testId,
          testResultRowID: testData[k].testresultID,
          organId: testData[k].organId,
          remark: testData[k].remark
        })
      }
      return tempArr;
    }
    else{
      const tempArr=[];
      for(var l =0; l < testData.length; l++){
        if(testData[l].remark !== null && testData[l].remark !== "" && testData[l].remark !== undefined)
            tempArr.push({
              testID: testData[l].testId,
              testResultRowID: testData[l].testresultID,
              organId: testData[l].organId,
              remark: testData[l].remark
            })
      }
      return tempArr;
    }
  }
  let handlerValidateTest = async () => {
    setShowUnderProcess(1)
    var obj = {
      key: activeTestResultRowID,
      userID: userID,
      clientId: clientID
    }
       const response = await ValidateTest(obj);
      if(response.status === 1){
        setShowUnderProcess(0);
         setTosterValue(0);
         setShowToster(1);
         setTosterMessage("Test Validate Successfully");
         setTimeout(() => {
             setShowToster(0);
              setShowButtons(false);
              setTestData([])
              setShowTxtImpression(false);
              setActiveTestName('');
              setActiveTestID('');
              handlerGetPatientDetailsAndSubtestList();
         }, 2000)
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(response.responseValue)
        setTosterValue(1)
        setTimeout(() => {
            setShowToster(0)
        }, 2000)
    }
  }
  let handlerModifyAndValidate = async ()=>{
    setShowUnderProcess(1);
    const remarkResponse=await makeRemarkDataList();    
    let resultArray=[]
    for(var i=0; i < testData.length; i++){
    const dataParser=JSON.parse(testData[i].parameterValue);
      for(var j=0; j < dataParser.length; j++){
        const id= "param_txtbox_val"+activeTestID+''+testData[i].organId+''+dataParser[j].ParameterId;
        const data=document.getElementById(id).value;
        if(data !== ""&& data !== undefined && data !== null && data.trim() !== '')
        resultArray.push({
          parameterID:dataParser[j].ParameterId,
          parameterResult:data,
          organID:testData[i].organId,testresultID:testData[i].testresultID});
      }
    }
    var obj ={
      JsonData:JSON.stringify(resultArray),
      uhid:patientDetails.uhId,
      billNumber:patientDetails.billNo,
      pmID:patientDetails.pmid,
      testId:activeTestID,
      testResultRowId:activeTestResultRowID,
      normalRangeText:'normalRangeText',
      impression:editorValue,
      resultRemark:JSON.stringify(remarkResponse),
      userId:userID,
      clientID:clientID,
      age:patientDetails.age,
      ageUnit:patientDetails.agetype,
      gender:patientDetails.gender
    }
   
    const response = await SaveAndValidate(obj);
    if(response.status === 1){
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Test Modify and Validate Successfully");
      setTimeout(() => {
          setShowToster(0);
            setShowButtons(false);
            setisModify('');
            setisDisabledTextEditor(true);
            setTestData([])
            setShowTxtImpression(false);
            setActiveTestName('');
            setActiveTestID('');
            handlerGetPatientDetailsAndSubtestList();
          
            
      }, 2000)
    }
    else {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage(response.responseValue)
      setTosterValue(1)
      setTimeout(() => {
          setShowToster(0)
      }, 2000)
    }
  }
  let handlerCloseModifyTest =()=>{
    var dataArrParser = [];
    const tempArr=testData;
    setTestData(tempArr);
    for (var i = 0; i < tempArr.length; i++) {
      dataArrParser = JSON.parse(tempArr[i].parameterValue);
      for (var j = 0; j < dataArrParser.length; j++) {
        const input_boxID = "param_txtbox_val" + tempArr[i].testId + '' + tempArr[i].organId + '' + dataArrParser[j].ParameterId;
        document.getElementById(input_boxID).setAttribute('disabled', '');
        document.getElementById(input_boxID).value=dataArrParser[j].parameterResult;
      }
    }
    setisDisabledTextEditor(true);
    setisModify('');
  }

  useEffect(() => {
    handlerGetPatientDetailsAndSubtestList()
  }, []);
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className='whitebg'>
                <div className="row">
                  <div className="col-md-4 col-sm-12 analuze">
                    <div className="fieldsett-in">
                      <div className="fieldsett">
                        <span className='fieldse'>{t("Validate_Test")}</span>
                        <div className="mt-2 me-2 col-12" >
                          <img src={bill} className='icnn' alt='icnn' /> <label htmlFor="Bill" className="form-label">{t("Bill_No.")}</label>
                        </div>
                        <BoxContainer>
                          <div className="mb-2 me-2">
                            <input type="text" value={patientDetails.billNo}  className="form-control form-control-sm" id="txtBillNo" name="BillNo" placeholder={t("Enter_Bill_No")} disabled/>
                          </div>

                          <div className="mb-2 me-2">
                            <div className='searchbtnn'>
                              <button onClick={ handlerGetPatientDetailsAndSubtestList}><i className='fa fa-search'></i>{t("Search_Result")}</button>
                            </div>
                          </div>
                        </BoxContainer>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 col-sm-12">
                    <div className="fieldsett-in">
                      <div className="fieldsett">
                        <span className='fieldse'>{t("Patient_Details")}</span>
                        <BoxContainer>
                          <div className="mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Uhid")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("UHID")} value={patientDetails.uhId} />
                          </div>
                          <div className="mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("IP_No")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("IP_No")} value={patientDetails.ipNo} />
                          </div>
                          <div className="mb-2 me-2" >
                            <img src={patient} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Patient_nm")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Enter_Patient_Name")} value={patientDetails.patientName} />


                          </div>
                          <div className="mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Visit_No")}.</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder='Visit No' value={patientDetails.crNo} />
                          </div>

                          <div className="mb-2 me-2">
                            <img src={center} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Center")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Center")} value={''} />
                          </div>
                          <div className="mb-2 me-2">
                            <img src={department} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Department")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Enter_Department")} value={patientDetails.departName} />
                          </div>
                          <div className="mb-2 me-2">
                            <img src={ward} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("ward")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Ward_Name")} value={patientDetails.wardName} />
                          </div>

                          <div className="mb-2 me-2">
                            <img src={calender} className='icnn' alt='icnn' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Bill_Date")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Bill_Date")} value={patientDetails.billDate} />
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
                      <Heading text={t("Test_List")} />
                      <div className="med-table-section" style={{ "height": "50vh", position: 'relative' }}>
                        {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div> :
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
                              {testList && testList.map((val, ind) => {
                                return (
                                  <tr key={val.id}>
                                    <td>{ind + 1}</td>
                                    <td>{val.testname}</td>
                                    <td> {val.currentValidateLevel === 0 ? "Not Validate" : "Validated"}</td>
                                    {val.currentValidateLevel === 0 ?  
                                    <td><i className="fa fa-edit actionedit" onClick={() => { getTestDataByTestID(val.testResultRowId) }}></i></td>:
                                     <td  title='Disabled' disabled><i className="fa fa-edit actionedit" style={{backgroundColor:'#00000040'}} disabled></i></td>}  
                                  </tr>
                                )
                              })}
                            </tbody>
                          </TableContainer>
                        }
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8 col-sm-12 prt">
                    <div className="whitebg">
                      <div className="row">
                        <div className='col-12'>
                          <div className="titile-txt">
                            <div className="title-h">
                              <div className="heading mb-2">{t("testNamePlaceholder")} - <span>{activeTestName}</span></div>
                              {
                                testData && testData.map((val, ind) => {
                                  return (

                                    <div className='mt-2 repeat'>
                                    {disableRemark === false ?
                                      <div className='ms-2'><b className='fs-6'> {val.organName}</b><img src={remarkIcon} alt="remark" data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#remarkModal" style={{ marginLeft: '8px', borderRadius: '20px', cursor: 'pointer' }} title='Remark' onClick={() => { handlerShowRemarkPopUp(val) }} /></div> :
                                      <div className='ms-2'><b className='fs-6'> {val.organName}</b><img src={remarkIcon} alt="remark" style={{ marginLeft: '8px', borderRadius: '20px', cursor: 'pointer' }} title='Remark' disabled /></div>
                                    }
                                      <BoxContainer>
                                      {JSON.parse(val.parameterValue).map((list) => {
                                        
                                          return (<>
                                            <div>
                                              <div><label htmlFor="" className='form-label' style={{fontWeight:'bold'}}>{list.ParameterName}</label></div>
                                              <div><input type='text' className='form-control form-control-sm' id={"param_txtbox_val" + val.testId + '' + val.organId + '' + list.ParameterId} disabled onChange={()=>{handlerSaveTestValue(list.ParameterId,val.organId)}}/></div>
                                            </div>
                                            <div className='form-label mt-4 fst-italic'><span>{list.UnitName}</span></div>&nbsp;
                                            </>
                                          )
                                        })}
                                      </BoxContainer>
                                    </div>

                                  )
                                })

                              }
                            </div>
                          </div>

                          <div>
                          </div>
                        </div>
                       {isShowTxtImpression === true && 
                        <div className='col-12 mt-1 ms-2'>
                            <div className='med-table-section box-shadow-none mt-3'>
                              <b >{t("Impression")}</b>
                              <div className={isDisabledTextEditor ? 'textEditorDisabled':''}>
                                <TextEditor getTextvalue={handleTexteditor} name="abc" id="abc" setValue={editorValue} />
                              </div>
                            </div>
                          </div>
                       }
                        {showButtons === true &&
                          <>
                            {showUnderProcess === 1 ? <TosterUnderProcess /> :

                                <div className='col-12 mt-3'>
                                  <div className='d-flex justify-content-end gap-2'>
                                  {showUnderProcess === 1 ? <TosterUnderProcess /> : 
                                   showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : 
                                    isModify === 1 ?
                                      <>
                                        <button type="button" class="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerModifyAndValidate}><img src={saveBtnIcon} class="icnn"  alt=''/>{t("Save_And_Validate")}</button>
                                        <button type="button" class="btn btn-save btn-sm mb-1 me-1" onClick={handlerCloseModifyTest}><img src={clearBtnIcon} class="icnn" alt=''/>{t("Cancel")}</button>
                                      </>
                                      :
                                      <>
                                        <button type="button" class="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerValidateTest}><img src={saveBtnIcon} class="icnn" alt=''/>{t("Validate")}</button>
                                        <button type="button" class="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerModifyTest}>{t("Modify")}</button>
                                      </>
                                  }  
                                   </div>
                                </div>
                            }
                          </>
                        }
                      </div>
                      {/*  <!-- Modal -->  */}
                      {/* {showRemark === 1 ?  */}
                      <div className={`modal fade`} id="remarkModal" tabIndex="-1" aria-labelledby="remarkModal" aria-hidden="true" data-bs-backdrop="static"  data-bs-keyboard="false">
                        <div className="modal-dialog modalDelete" style={{margin:'5% auto'}}>
                          <div className="modal-content">

                            <div className="modal-body modelbdy_ text-center_">
                            <div className='fieldsett-in'>
                              <div className='fieldsett'>
                              <span class="fieldse">{t("Remarks")}</span>
                              <div className="inner-content">
                                <div className="mb-2 mt-2">
                                <img src="/static/media/UHID1.3a584370815bb1421aa6f7c648e28ba6.svg" class="icnn" alt="icnn"/>
                                <label for="FoodSupplementDrug" class="form-label">{t("Remark")}</label>
                                <textarea rows="3" id={'txtRemark'} className='form-control'></textarea>
                                </div>
                                <div className='d-flex flex-wrap justify-content-end'>
                                <div> <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={() => { setRhowRemark(0) }}>{t("Cancel")}</button></div>
                                <div> <button type="button" className="btn-delete popBtnDelete" onClick={handlerSaveRemark} data-bs-dismiss="modal">{t("Save")}</button></div>
                                </div>

                              </div>
                              </div>
                            </div>
                              {/* <div className='popDeleteTitle mt-3'> Remark</div>
                              <div className='popDeleteContent'> <textarea rows="3" id={'txtRemark'} className='form-control'></textarea></div> */}
                            </div>
                            {/* <div className="modal-footer1 text-center">

                              
                            </div> */}
                          </div>
                        </div>
                      </div>

                      {/* } */}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className='chatcnt'><img src={chat} className='icnn' alt=''/> </div> */}
      {
        showLoder === 1 ? <Loder val={showLoder} /> : ""
      }
      {
        showAlertToster === 1 ? <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
      }
    </>

  )
}
