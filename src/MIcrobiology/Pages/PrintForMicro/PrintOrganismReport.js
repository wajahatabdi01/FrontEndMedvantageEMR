import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoDataFound from '../../../assets/images/icons/No data-rafiki.svg'
import { FindByQuery } from '../../../Code/Serach';
import GetTestResultList from '../../../Pathology/Api/PrintTest/GetTestResultList';
import GetPrintLaboratoryReportList from '../../Api/SampleRecieve/Get/GetPrintLaboratoryReportList';
import { useEffect } from 'react';
import BoxContainer from '../../../Component/BoxContainer';
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import AlertToster from '../../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function PrintOrganismReport() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const navigate = useNavigate();
  let [isDuplicate, setIsDuplicate] = useState(0);
  let[showImage,setShowImage]=useState(0);  
  let [getLabNumber, setLabNumber] = useState('');
  let [getTestResultList, setTestResultList] = useState([]);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  let [viewReportButton, setViewReportButton] = useState(false);
  let [uhid, setUhid] = useState('');
  let [billNumber, setBillNumber] = useState('');
  let [newBillList, setNewBillList] = useState([]);
  let [newBillListTemp, setNewBillListTemp] = useState([]);
  let [searchValue, setSearchValue] = useState([]);
  let [arrForJson, setArrForJson] = useState([]);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  ////////////////// For getting list of new bills /////////////////
  let newBillFun = (val) => {
   
    document.getElementById('cbDupBill').checked = false;
    document.getElementById('cbNewBill').checked = true;


    setEyeClicked(false);
    setViewReportButton(false)
    setIsDuplicate(0);
    getBillListForPrint(val,2);
  }
  //////////////////////////////////////////////////////////////////

  ////////////////////// For getting duplicate bill list ///////////////////
  let duplicateFun = (val) => {

    
    document.getElementById('cbNewBill').checked = false;
    document.getElementById('cbDupBill').checked = true;

    setIsDuplicate(1);
    setEyeClicked(false);
    setViewReportButton(false)
    getBillListForPrint(val,2)
  }
  //////////////////////////////////////////////////////////////

  ///////////////// For searching in list /////////////////////////
  let handleSearch = () => {
    
    let response = FindByQuery(newBillList, searchValue, "billNo")
    if (searchValue.length !== 0 && searchValue !== undefined) {
      if (response.length !== 0) {
        setNewBillListTemp(response)
      }
      else {
        setNewBillListTemp([])
      }
    }
  }
  ////////////////////////////////////////////////////////////

  /////////////////////////////// To show the test on related bill   ////////////////////////////////
  let getTestResultListForBill = async (sampleCollectionMainId, uhid, billNo, crNo, ipNo, labNumber, name) => {
    let testResultList = await GetTestResultList(sampleCollectionMainId,clientID);
    let tempForJson = [...arrForJson];
    for (var i = 0; i < testResultList.responseValue.length; i++) {

      tempForJson.push({
        sampleCollectionSubID: testResultList.responseValue[i].sampleCollectionSubID,
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
      })
      setArrForJson([...tempForJson])
    }
    
    setTestResultList(testResultList.responseValue);
    setLabNumber(labNumber);
    setViewReportButton(true);
    setUhid(uhid);
    setBillNumber(billNo);
    sessionStorage.setItem("uhid", uhid);
    sessionStorage.setItem('billNo', billNo);
    sessionStorage.setItem('crNo', crNo);
    sessionStorage.setItem('ipNo', ipNo);
    sessionStorage.setItem('labNumber', labNumber);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('culturetypeID', 2);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let viewReportFun = () => {
    var tempArr = [];
    for (var i = 0; i < getTestResultList.length; i++) {
      if (getTestResultList[i].isPrinted === 0 && isDuplicate === 0) {
        sessionStorage.setItem('duplicatePrint', 0)
        if (document.getElementById("checkSubTest" + getTestResultList[i].testID).checked === true) {
          tempArr.push({
            sampleCollectionSubID: getTestResultList[i].sampleCollectionSubID,
            userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId

          });
        }
      }
      else if (getTestResultList[i].isPrinted === 1 && isDuplicate === 1) {
        sessionStorage.setItem('duplicatePrint', 1)
        if (document.getElementById("checkSubTest" + getTestResultList[i].testID).checked === true) {
          tempArr.push({
            sampleCollectionSubID: getTestResultList[i].sampleCollectionSubID,
            userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId

          });
        }
      }
    }
    if (tempArr.length > 0) {

      sessionStorage.setItem('sampleCollectionMainIdJSON', JSON.stringify(tempArr));
      navigate('/viewprintorganismreport/');
    }
    else {
      setShowAlertToster(1)
      setShowErrMessage('Please Select Any of the Checkbox!');
    }
    
  }

  let eyeButtonClicked = () => {
    setEyeClicked(true);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  let getBillListForPrint = async (isDuplicate, cultureTypeID) =>
  {
    let listData = await GetPrintLaboratoryReportList(isDuplicate, cultureTypeID,clientID);
    if(listData.status === 1)
    {
      setNewBillList(listData.responseValue);
      setNewBillListTemp(listData.responseValue);
      setShowImage(0)
    }
    else{
      setShowImage(1)
    }
  }

  useEffect(() => {
    getBillListForPrint(isDuplicate,2)
  },[])
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
                  <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Organism_Report")}</div></div></div>
                  <div class="row">
                    <div className="col-md-8 col-sm-12 plt1">
                      <div className='whitebg'>
                        <div className="row">
                          <div className="col-md-12 col-sm-12 analuze">
                            <div className="fieldsett-in">
                              <div className="fieldsett">
                                <span className='fieldse'>{t("Bill_Details")}</span>
                                <BoxContainer>
                                  <div className="mb-2 me-2">
                                    <div className='d-flex flex-direction-column gap-2 mt-2'>
                                      <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender" id="cbNewBill" onClick={() => { newBillFun(0) }} defaultChecked />
                                        <label className="form-check-label" for="gender">
                                          {t("New_Bill")}
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gender1" id="cbDupBill" onClick={() => { duplicateFun(1) }} />
                                        <label className="form-check-label" for="gender1">
                                          {t("Duplicate_Bill")}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-2 me-2" >
                                    {/* <div className='col-12'> 
                                              <img src={bill} className='icnn' alt=''/> <label htmlFor="Bill" className="form-label">Bill No./UHID</label>                             
                                            </div> */}

                                    <div className='sert'>
                                      <div className='sertin'>
                                        <input type="text" className="form-control form-control-sm" id="Bill" name="Bill" placeholder={t("Enter_Bill_No_UHID")} onChange={(e) => { setSearchValue(e.target.value); if(e.target.value.length === 0){ setNewBillListTemp(newBillList)} }} />
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

                      <div className='whitebg mt-1' style={{height:'76vh'}}>
                        <div className='titile-txt'>
                          {/* <div className='title-h'><Heading text='Showing 1-10 of 250 entries' /></div>
                          <div className='title-h1'> <img src={pt} className='icnn' alt=''/> </div> */}
                        </div>
                        <div className="med-table-section shadow-none" style={{height: "72vh", position:'relative' }}>
                        {showImage === 1 ?<div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                          <TableContainer>
                            <thead>
                              <tr>
                                <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")}</th>
                                <th>{t("Bill_No.")}</th>
                                <th>{t("Lab_NO")}</th>
                                <th>{t("NAME")}</th>
                                <th>{t("Uhid")}</th>
                                <th>{t("Visit_No")}</th>
                                <th>{t("IP_No")}</th>
                                <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {newBillListTemp && newBillListTemp.map((list, index) => {

                                return (
                                  <>
                                    <tr>
                                      <td className="text-center">{index + 1}</td>
                                      <td>{list.billNo}</td>
                                      <td>{list.labNumber}</td>
                                      <td>{list.name}</td>
                                      <td>{list.uhid}</td>
                                      <td>{list.crNo}</td>
                                      <td>{list.ipNo}</td>
                                      <td className="text-center"><i className='fa fa-eye actionedit viewaction ' onClick={() => { getTestResultListForBill(list.sampleCollectionMainId, list.uhid, list.billNo, list.crNo, list.ipNo, list.labNumber, list.name); eyeButtonClicked(); }}></i></td>
                                    </tr>
                                  </>
                                )
                              })}

                            </tbody>
                          </TableContainer>}
                        </div>

                      </div>
                    </div>

                    <div className="col-md-4 col-sm-12 prt1">
                      <div className='whitebg' style={{height:'88vh', padding:'5px 0 2px'}}>
                        <div className='titile-txt'>
                          <div className='title-h'><Heading text={t("Test_List")} /></div>
                          {getLabNumber !== '' && <div className='title-h1'>{t("Lab_NO")} <span>{getLabNumber}</span></div>}

                        </div>
                        <div className="med-table-section" style={{ "height": "77vh",'box-shadow':'none' }}>
                          <TableContainer>
                            <thead>
                              <tr>
                                {/* <th className="text-center" style={{ "width": "5%" }}> <input type="checkbox" /></th> */}
                                <th>{t("S.No.")}</th>
                                <th>{t("testNamePlaceholder")}</th>
                                <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getTestResultList && getTestResultList.map((resultList, index) => {
                                
                                return (
                                  <>
                                    <tr>
                                      {(resultList.isPrinted === 0 && isDuplicate === 0 && eyeClicked === true) && <>
                                        <td > <input type="checkbox" id={'checkSubTest' + resultList.testID} defaultChecked={isChecked} role='switch' /></td>
                                        <td>{resultList.testname}</td>
                                        <td>{t("Ready")}</td></>}
                                      {(resultList.isPrinted === 1 && isDuplicate === 1 && eyeClicked === true) && <>
                                        <td > <input type="checkbox" id={'checkSubTest' + resultList.testID} defaultChecked={isChecked} role='switch' /></td>
                                        <td>{resultList.testname}</td>
                                        <td>{t("Ready")}</td></>}
                                    </tr>
                                  </>
                                )
                              })}

                            </tbody>
                          </TableContainer>
                        </div>
                        {/* <div className='viewre-in' ><i className='fa fa-eye' ></i><Link to='/viewReportPrint/'  style={{color:'white', textDecoration:'none'}} onClick={viewReportFun}>View Report</Link></div>  */}
                        <div className='viewre'>{viewReportButton &&

                          <div className='viewre-in' onClick={viewReportFun}><i className='fa fa-eye' ></i>{t("View_Report")}</div>


                        }
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </section>
      {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }
      {/* <div className='chatcnt'><img src={chat} className='icnn' alt='' /> </div> */}
    </>
  )
}
