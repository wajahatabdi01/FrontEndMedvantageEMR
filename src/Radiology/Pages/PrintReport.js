import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';
import GetListForPrint from '../API/PrintReport/GET/GetListForPrint';
import GetTestList from '../API/PrintReport/GET/GetTestList';
import Loder from '../../Component/Loader';
import AlertToster from '../../Component/AlertToster';
// import bill from '../../assets/images/icons/bill.svg'
// import pt from '../../assets/images/icons/pt.svg'
// import blink from '../../assets/images/icons/blink.json'
// import chat from '../../assets/images/icons/chat.svg'
// import GetPrintTestList from '../Api/PrintTest/GetPrintTestList';
// import { useEffect } from 'react';
// import GetTestResultList from '../Api/PrintTest/GetTestResultList';
// import ViewReportPrint from './ViewReportPrint';
// import { FindByQuery } from '../../Code/Serach';
import imgNoDataFound from '../../assets/images/icons/No data-rafiki.svg'
import GetDataForPrint from '../API/PrintReport/GET/GetDataForPrint';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";




export default function PrintReport() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  let [getLabNumber, setLabNumber] = useState('')
// --------------------------------------------
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
  let [showLoder, setShowLoder] = useState(0);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let[billType,setBillType]=useState(0);
  let[printDataList,setPrintDataList]=useState([]);
  let[testList,setTestList]=useState([]);
  let[showImage,setShowImage]=useState(0);  
  let[searchBox,setSearchBox]=useState(''); 
  const { t } = useTranslation(); 

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;

  const getListForPrint= async(param)=>{
    setShowLoder(1);
    setTestList([]);
    setPrintDataList([])
    const response = await GetListForPrint(param,clientID);
    if(response.status ===1){
        setShowLoder(0);
        setShowImage(0)
        setPrintDataList(response.responseValue)
    }
    else{
        setShowLoder(0);
        setShowAlertToster(1);
        setShowErrMessage(response.responseValue);
        setShowImage(1)
    }
  }
  const chnageCheckedType = (param)=>{
     setBillType(param)
    if(param === 0 ){
        document.getElementById('cbDupBill').checked=false;
        document.getElementById('cbNewBill').checked=true;
        getListForPrint(param)
    } 
    else{
        document.getElementById('cbNewBill').checked=false;
        document.getElementById('cbDupBill').checked=true;
        getListForPrint(param)
    }
  }
  let getTestList=async(params)=>{
      var obj={
        billNumber:params.billNumber,
        isDuplicate:billType,
        clientId: clientID
      }
      const response = await GetTestList(obj);;
      if(response.status === 1){
          setTestList(response.responseValue);
      }
      else{
        setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
      }

  }
  let getCheckedBoxesList=async()=>{
    const tempArray=[];
    for(var i=0; i < testList.length; i++){
        const findID='checkSubTest'+testList[i].testID+''+testList[i].testResultRowId;
        const isChecked=document.getElementById(findID).checked;
        if(isChecked === true)
         tempArray.push({
          testResultRowId:testList[i].testResultRowId
        });
         
    }
   return tempArray;
  }
  let handlerViewReport = async()=>{
    const getResponse = await getCheckedBoxesList();
    if(getResponse.length < 1){
        setShowAlertToster(1);
        setShowErrMessage("Please Check Any of The Checkbox");
    }
    else{
        sessionStorage.setItem('ultraSoundReport', JSON.stringify(getResponse));
        navigate('/radiologyPrintReport/');

        
    }
  }
  let handlerChange =(e)=>{
    if(e.target.value.length === 0){
      getListForPrint(billType);
      setSearchBox(e.target.value)
    }
    else{
      setSearchBox(e.target.value)
    }
  }
  let handlerSearch = ()=>{
    var tempArr=[];
    if(searchBox.length === 0){
      getListForPrint(billType);
    }
    else{
      for(var i=0; i < printDataList.length; i++){
        if(printDataList[i].uhid === searchBox.trim()){
          tempArr.push(printDataList[i]);
        }
        if(printDataList[i].billNumber === searchBox.trim()){
          tempArr.push(printDataList[i]);
        }
      }
      setPrintDataList(tempArr);
    }
  }
  useEffect(() => {
    getListForPrint(billType);
  }, [])
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">


            <div className="col-12 mt-2">
              <div className='whitebg1'>
                <div className='row'>



                  <div className="col-md-8 col-sm-12 plt">

                    <div className='whitebg' style={{ margin: "0 0 10px 0" }}>
                      <div className="row">
                        <div className="col-md-12 col-sm-12 analuze">
                          <div className="fieldsett-in">
                            <div className="fieldsett">
                              <span className='fieldse'>{t("Radiology_Report")}</span>
                              <BoxContainer>
                                <div className="mb-2 me-2">

                                  <div className='d-flex flex-direction-column gap-2 mt-2'>
                                    <div className="form-check">
                                      <input className="form-check-input" type="radio" name="cbNewBill" id="cbNewBill" onClick={()=>{chnageCheckedType(0)}} defaultChecked />
                                      <label className="form-check-label" for="cbNewBill">
                                        {t("New_Bill")}
                                      </label>
                                    </div>
                                    <div className="form-check">
                                      <input className="form-check-input" type="radio" name="cbDupBill" id="cbDupBill" onClick={()=>{chnageCheckedType(1)}} />
                                      <label className="form-check-label" for="cbDupBill">
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
                                      <input type="text" className="form-control form-control-sm" id="Bill" name="searchBox" value={searchBox} placeholder={t("Enter_Bill_No./UHID")} onChange={handlerChange} />
                                    </div>
                                    <div className='searchbtnn' onClick={handlerSearch}>
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

                    <div className='whitebg' style={{height:'82vh'}}>
                      <div className='titile-txt'>
                        {/* <div className='title-h'><Heading text='Showing 1-10 of 250 entries' /></div>
                        <div className='title-h1'> <img src={pt} className='icnn' alt=''/> </div> */}
                      </div>
                      <div className="med-table-section" style={{height: "79vh", position:'relative' }}>
                      {showImage === 1 ?<div className='imageNoDataFound'><img src={imgNoDataFound} alt="imageNoDataFound" /></div>:
                        <TableContainer>
                          <thead>
                            <tr>
                              <th className="text-center" style={{ "width": "5%" }}> #</th>
                              <th>{t("Bill_No.")}</th>
                              <th>{t("Uhid")}</th>
                              <th>{t("Result_Date_Time")}</th>
                              <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {printDataList && printDataList.map((list, index) => {
                              return (
                                <>
                                  <tr>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{list.billNumber}</td>
                                    <td>{list.uhid}</td>
                                    <td>{list.resultDateTime}</td>
                                    <td className="text-center"><i className='fa fa-eye actionedit viewaction ' onClick={() => {getTestList(list)}}></i></td>
                                  </tr>
                                </>
                              )
                            })}

                          </tbody>
                        </TableContainer>}
                      </div>

                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12 prt">
                    <div className='whitebg'>
                      <div className='titile-txt'>
                        <div className='title-h'><Heading text={t("Test_List")} /></div>
                        {getLabNumber !== '' && <div className='title-h1'>{t("Lab_NO")}. <span>{getLabNumber}</span></div>}

                      </div>
                      <div className="med-table-section" style={{ "height": "71vh",'box-shadow':'none' }}>
                        <TableContainer>
                          <thead>
                            <tr>
                              {/* <th className="text-center" style={{ "width": "5%" }}> <input type="checkbox" /></th> */}
                              <th>#</th>
                              <th>{t("Test_Name")}</th>
                              <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {testList && testList.map((val, index) => {
                              return (
                                <>
                                  <tr>
                                      <td > <input type="checkbox" id={'checkSubTest' + val.testID+''+val.testResultRowId} defaultChecked={isChecked} role='switch' /></td>
                                      <td>{val.testname}</td>
                                      <td>{t("Ready")}</td>
                                  </tr>
                                </>
                              )
                            })}

                          </tbody>
                        </TableContainer>
                      </div>
                      {/* <div className='viewre-in' >
                      <i className='fa fa-eye' ></i>
                      <Link to='/viewReportPrint/'  style={{color:'white', textDecoration:'none'}} onClick={''}>View Report</Link> 
                      </div>  */}
                      <div className='viewre'>{testList.length > 0 ?
                        <div className='viewre-in' onClick={handlerViewReport}><i className='fa fa-eye' ></i>{t("View_Report")}</div>:''
                      }
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {
        showLoder === 1 ? <Loder val={showLoder} /> : ""
      }
      {
        showAlertToster === 1 ? <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
      }
      {/* <div className='chatcnt'><img src={chat} className='icnn' alt='' /> </div> */}
    </>
  )
}
