import React from 'react'
import BoxContainer from '../../Component/BoxContainer'
import bill from '../../assets/images/icons/bill.svg'
import MobileNo from '../../assets/images/icons/Mobile No..svg'
import UHID1 from '../../assets/images/icons/UHID1.svg'
import RefBy from '../../assets/images/icons/Ref By.svg'
import patient from '../../assets/images/icons/patient.svg'
import sample from '../../assets/images/icons/sample.svg'
import center from '../../assets/images/icons/center.svg'
import department from '../../assets/images/icons/department.svg'
import ward from '../../assets/images/icons/ward.svg'
import calender from '../../assets/images/icons/calender.svg'
import Heading from '../../Component/Heading' 
import TableContainer from '../../Component/TableContainer'
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'

import send from '../../assets/images/icons/send.svg'
import clear from '../../assets/images/icons/clear.svg'

import { useState } from 'react'
import GetSampleRecieve from '../Api/SampleRecieve/Get/GetSampleRecieve'
import PostSampleRecieve from '../Api/SampleRecieve/Post/PostSampleRecieve';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import GetPatientBillingDetails from '../../Pathology/Api/GetPatientBillingDetails'
import AlertToster from '../../Component/AlertToster'
import Loader from '../../Component/Loader'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function SampleRecieve() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  let [patientDetails, setPatientDetails] = useState([])
  let [textBillNo, setTextboxValue] = useState('');
   let [sampleType, setSampleType] = useState('');
  let [sampleRecieveList, setSampleRecieveList] = useState([]);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [showButtons, setShowButtons] = useState(false);
  let[showImage,setShowImage]=useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showLoder, setShowLoder] = useState(0);
  let arr = [];

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  const handleTextChange = (e) => {
    if(e.target.name === 'Bill'){
      setTextboxValue(e.target.value)
    }
  }
    // ************************* GET SAMPLE RECIEVE *****************************
  let getReport = async () => {
    if(textBillNo === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0) {
      alert('Fill Bill Number!');
      return false;
    }
    else{
      setShowLoder(1)
      let getResponse = await GetSampleRecieve(textBillNo,clientID);
     
      let getPatientDetails = await GetPatientBillingDetails(textBillNo,clientID);
      const patientDetails = getPatientDetails.responseValue[0];
      const testList = getResponse.responseValue.testDetails
  
     
      if(getPatientDetails.status === 1) {
        setShowImage(0)
        setShowButtons(true)
       setShowLoder(0)
        arr = []
        setPatientDetails(patientDetails)
        var parserData = JSON.parse(patientDetails.sampleTypeList);
        var formatCol = "";
       
        for (var k = 0; k < parserData.length; k++) {
          formatCol = formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' + parserData[k].sampleType;
        }
        setSampleType(formatCol)
      }
      else if(getPatientDetails !== 1)
      {
        setShowLoder(0)
        setShowImage(1);
        setShowButtons(false)
        setShowAlertToster(1);
        setShowErrMessage('Bill Number does not exists!');
        setPatientDetails([]);setSampleType('')
      }

      if(getResponse.status === 1) {
        arr = []
        setShowLoder(0)
        setShowImage(0)
        setShowButtons(true)
        setSampleRecieveList(testList)
      }
      else if(getPatientDetails.status === 1){
        setShowLoder(0)
        setShowButtons(false)
        setShowImage(1);
        setShowAlertToster(1);
        setShowErrMessage('No tests on this Bill Number!');
      }
    }
  }
    // ************************* To Push Item in Array *******************
  let getCheckedItem = (itemId,sampleCollectionSubId) => {
   
    if(arr.length === 0){
      arr.push({
        testID : itemId,
        sampleCollectionSubId : sampleCollectionSubId
      })
    }

    else{
      var index =arr.findIndex((arrFindIndex) => arrFindIndex.itemID === itemId)
      if(index !== -1)
      {
        arr.splice(index,1)
      }
      else{
        arr.push({
          testID: itemId,
          sampleCollectionSubId : sampleCollectionSubId
        })
      }
    }
   

  }
  // ********************* To Save Data *************************
  let handleSave = async () => {
    if(textBillNo  === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0) {
      alert('Please fill Bill Number!');
      return false;
    }
    else{
      //const isCritical = document.getElementById('Urgent').checked === true ? true:false;
      
      if(arr.length === 0){
        alert('Please select atleast one test to be recieved');
      }
      else{
        var obj = {
          receiverUserId : JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
          jsonString : JSON.stringify(arr),
          clientId:clientID
        };
        
        
        let data = await PostSampleRecieve(obj);
        if(data.status === 1)
        {
          getReport();
          setShowUnderProcess(0);
          setTosterValue(0);
          setShowToster(1);
          setTosterMessage('Sample Recieved !');
          setTimeout(() => {
            setShowToster(0)
          },2000)
        }
        else{
          setShowUnderProcess(0);
          setShowToster(1);
          setTosterMessage(data.responseValue);
          setTosterValue(1);
          setTimeout(() => {
            setShowToster(0);
          },2000)
        }
      }
    }
  }

  const handleClearTextbox = () => {
    getReport();
   
  for(var j=0; j<sampleRecieveList.length; j++)
  {
    if(sampleRecieveList[j].labReceivingStatus === 0)
    document.getElementById("testList"+sampleRecieveList[j].itemID).checked = false;
  }
 
    
  };

  
  return (
    
    <>
    <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
        <div className="row">
          <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Microbiology_Sample_Receive")}</div></div></div>
          <div className="col-12">
              <div className='whitebg'>
                  <div className="row">
                      <div className="col-md-3 col-sm-12 analuze">
                          <div className="fieldsett-in">
                              <div className="fieldsett  billfie">
                                      <span className='fieldse'>{t("Bill_Details")}</span>
                                      <div className="mt-2 me-2 col-12" >
                                       <img src={bill} className='icnn'alt=''/> <label htmlFor="Bill" className="form-label">{t("Bill_No.")}</label>                             
                                     </div>
                                  <BoxContainer> 
                                  
                                    <div className="mb-2 me-2">
                                      <input type="text" value={textBillNo} onChange={handleTextChange}  className="form-control form-control-sm" id="BillNo" name="Bill" placeholder={t("Enter_Bill_No.")} />
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
                                        <img src={UHID1} className='icnn' alt=''/> 
                                        <label htmlFor="uhid" className="form-label">{t("Uhid")}</label>
                                        {patientDetails.length === 0 ?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Uhid")} value={''} />:
                                        <input type='text' disabled className='form-control form-control-sm' value={patientDetails.uhId} />}
                                      </div>
                                      <div className="col-2 mb-2 me-2">
                                        <img src={UHID1} className='icnn'alt=''/> 
                                        <label htmlFor="ipno" className="form-label">{t("IP_No")}</label>
                                        {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("IP_No")} value={''} />:
                                        <input type='text' disabled className='form-control form-control-sm' value={patientDetails.ipNo} />}
                                      </div>
                                      <div className="col-2 mb-2 me-2">
                                        <img src={patient} className='icnn'alt=''/> 
                                        <label htmlFor="pname" className="form-label">{t("Patient_nm")}</label>
                                        {patientDetails.length === 0 ?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Patient_nm")} value={''} />:
                                        <input type='text' disabled className='form-control form-control-sm' value={patientDetails.patientName + ' ' + patientDetails.age + ' ' + patientDetails.agetype} />}

                                      </div>
                                      {/* <div className="mb-2 me-2">
                                        <img src={age} className='icnn'alt=''/> 
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input type='text' disabled className='form-control form-control-sm' value={patientAge} />
                                      </div>
                                      <div className="mb-2 me-2">
                                        <img src={gender} className='icnn'alt=''/> 
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <input type='text' disabled className='form-control form-control-sm' value={genderType} />
                                      </div> */}
                                      <div className="col-2 mb-2 me-2">
                                        <img src={MobileNo} className='icnn'alt=''/> 
                                        <label htmlFor="Mobile" className="form-label">{t("Mobile_No")}</label>
                                        {patientDetails.length === 0 ?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Mobile_No")} value={''} />:
                                        <input type='text' disabled className='form-control form-control-sm' value={patientDetails.mobileNo} />}                                        
                                      </div>
                                      <div className="col-2 mb-2 me-2">
                                        <img src={sample} className='icnn'alt=''/> 
                                        <label htmlFor="sample" className="form-label">{t("Sample")}</label>
                                        {sampleType === '' ?<input type='text' disabled className='form-control form-control-sm' placeholder={t("Sample_Type")} value={''} />:
                                          <input type='text' disabled className='form-control form-control-sm' value={sampleType} />
                                        }
                                        
                                      </div>
                                      <div className="col-2 mb-2 me-2">
                                        <img src={RefBy} className='icnn'alt=''/> 
                                        <label htmlFor="Ref" className="form-label">{t("Ref_By")}</label>
                                        {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder={t("Ref_By")} value={patientDetails.drName} />:
                                        <input type='text' disabled className='form-control form-control-sm' value={patientDetails.drName} />}
                                      </div>
                                      <div className="col-2 mb-2 me-2">
                                        <img src={department} className='icnn' alt=''/> 
                                        <label htmlFor="FoodSupplementDrug" className="form-label">{t("Department")}</label>
                                       {patientDetails.length === 0 ?  <input type='text' disabled className='form-control form-control-sm' placeholder={t("Department")} value={''} />:
                                       <input type='text' disabled className='form-control form-control-sm' value={patientDetails.departName} />}
                                      </div>
                                      <div className="col-2 mb-2 me-2">
                                        <img src={ward} className='icnn' alt=''/> 
                                        <label htmlFor="ward" className="form-label">{t("ward")}</label>
                                        {patientDetails.length === 0?<input type='text' disabled className='form-control form-control-sm' placeholder={t("ward")} value={''} />:
                                        <input type='text' disabled className='form-control form-control-sm' value={patientDetails.wardName} />}
                                      </div> 
                                      <div className="col-2 mb-2 me-2">
                                        <img src={calender} className='icnn' alt=''/> 
                                        <label htmlFor="billdate" className="form-label">{t("Bill_Date")}</label>
                                        {patientDetails.length === 0 ? <input type='text' disabled className='form-control form-control-sm' placeholder={t("Bill_Date")} value={''} />:
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
            <div className='whitebg1' >
              <div className='row'> 
                <div className="col-12">
                <div className='whitebg' style={{height:'61vh', paddingTop:'0px'}}>
                <div className='title-h'><Heading text={t("Test_List")} /></div>
                    <div className="med-table-section shadow-none" style={{ "height": "52vh",position:'relative' }}>
                    {showImage === 1? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                      <TableContainer>
                        <thead>
                          <tr>
                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                            <th>{t("testNamePlaceholder")}</th>
                            <th>{t("Category")}</th>
                            <th>{t("Sample_Received")}</th>
                            
                            <th>{t("isReceived")}</th>
                          </tr>
                        </thead>
                        <tbody>
                        {sampleRecieveList && sampleRecieveList.map((list, index) => {
                         
                          return(
                            <>{
                              list.isCollected === 'YES' && <tr key={list.id}> 
                                                  <td className="text-center">{index + 1}</td>
                                                  <td>{list.testname}</td>
                                                  <td>{list.categoryName}</td>
                                                  {list.labReceivingStatus === 1 ? <td>{t("Yes")}</td> : <td>{t("No")}</td>}
                                                  {/* <td>{list.isCollected}</td> */}
                                                  {list.labReceivingStatus === 1 ? <td style={{ "width": "10%" }} className="text-center"><input type="checkbox" style={{backgroundColor : '#0000007a'}} disabled/></td> :
                                                    <td style={{ "width": "10%" }} className="text-center"><input type="checkbox" onClick={() => {getCheckedItem(list.itemID,list.sampleCollectionSubId)}} id={"testList"+list.itemID}/></td>}
                                                                                                   
                                              </tr>
                            }
                            </>
                          )
                        })}
                        
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
                      </TableContainer>}
                    </div>
                    {showButtons === true &&
                <div className="col-12">
                <div className="d-flex justify-content-end gap-2 mt-2">
             {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                              <button type="button" className="btn btn-save btn-sm mb-1 me-1  btn-save-fill" onClick={handleSave}><img src={send} className='icnn'  alt='' />{t("Save")}</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClearTextbox}><img src={clear} className='icnn'  alt='' />{t("Clear")}</button>
                              </>
                              }

                {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSave}>Save</button>                  
                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClearTextbox}>Clear</button>
                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={''}>Barcode</button> */}
                </div>
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
