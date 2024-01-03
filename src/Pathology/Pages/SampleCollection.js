
import React, { useState, useEffect } from 'react'
import Heading from '../../Component/Heading'
import BoxContainer from '../../Component/BoxContainer'
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'
import MobileNo from '../../assets/images/icons/Mobile No..svg'
import TableContainer from '../../Component/TableContainer'
import bill from '../../assets/images/icons/bill.svg'
import patient from '../../assets/images/icons/patient.svg'
import RefBy from '../../assets/images/icons/Ref By.svg'
import sample from '../../assets/images/icons/sample.svg'
import UHID1 from '../../assets/images/icons/UHID1.svg'
import ward from '../../assets/images/icons/ward.svg'
import age from '../../assets/images/icons/age.svg'
import calender from '../../assets/images/icons/calender.svg'
import center from '../../assets/images/icons/center.svg'
import department from '../../assets/images/icons/department.svg'
import gender from '../../assets/images/icons/gender.svg'
import chat from '../../assets/images/icons/chat.svg'
import save from '../../assets/images/icons/save.svg'
import clear from '../../assets/images/icons/clear.svg'
import barcode from '../../assets/images/icons/barcodeblue.svg'
import GetSampleCollection from '../Api/SampleCollection'
import SaveSampleCollection from '../Api/SaveSampleCollection'
import JsBarcode from 'jsbarcode';
//import Loder from '../../Component/Loder';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import GetLabSampleType from '../Api/GetLabSampleType'
import GetPatientBillingDetails from '../Api/GetPatientBillingDetails'
import GetLabNumberByBillNumber from '../Api/GetLabNumberByBillNumber'
import AlertToster from '../../Component/AlertToster'
import Loader from '../../Component/Loader'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";


export default function SampleCollection(props) {
  
  let [sampleCollectionList, setSampleCollectionList] = useState([])
  let [textBillNo, setTextboxValue] = useState('');
  let [patientName, setPatientName] = useState('');
  let [mobileNumber, setMobileNumber] = useState('')
  let [genderType, setGender] = useState('')
  let [patientAge, setAge] = useState('');
  let [UHID, setUHID] = useState('')
  let [billId, setBillId] = useState('');
  let [pmid, setPMID] = useState('')
  let [patientType, setPatientType] = useState('')
  let [visitNumber, setVisitNumber] = useState('')
  let [ipNumber, setIPNumber] = useState('')
  let [departmentName, setDepartment] = useState('')
  let [refrenceBy, setRefrenceBy] = useState('')
  let [samples, setSample] = useState('');
  let [sampleType, setSampleType] = useState('');
  let [wardId, setWardId] = useState('');
  let [wards, setWard] = useState('')
  let [billDate, setBillDate] = useState('')
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [showButtons, setShowButtons] = useState(false);
  let[showImage,setShowImage]=useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [isShowbtnSec, setIsShowbtnSec] = useState(0);
  
  const { t } = useTranslation();
  
   let [showLoder, setShowLoder] = useState(0);

   const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  let arr = [];
  const handleTextboxChange = (event) => {
    if (event.target.name === "Bill") {
      setTextboxValue(event.target.value);
      //setBarcodeValue(event.target.value);
    }
  };
  // ****************************** GET SAMPLE COLLECTION DATA *************************************
  let getReport = async () => {
    if (textBillNo === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0) {
      setShowAlertToster(1);
      setShowErrMessage('Please fill Bill Number!')
      return false;
    }
    else {
      
      setShowLoder(1)
      let getResponse = await GetSampleCollection(textBillNo,clientID);
      let getPatientDetails = await GetPatientBillingDetails(textBillNo,clientID)
      console.log('	getPatientDetails : ', getPatientDetails)
      const patientDetails = getPatientDetails.responseValue[0];
      if (getPatientDetails.status === 1) {
        setShowImage(0)
        setShowButtons(true)
         setShowLoder(0)
        arr = [];
        
        setPatientName(patientDetails.patientName);
        setGender(patientDetails.gender);
        setMobileNumber(patientDetails.mobileNo);
        setAge(patientDetails.age);
        setIPNumber(patientDetails.ipNo);
        setUHID(patientDetails.uhId);
        setPMID(patientDetails.pmid);
        setPatientType(patientDetails.patientType);
        setVisitNumber('');
        setRefrenceBy(patientDetails.drName);
        //setSample(""); 
        setBillDate(patientDetails.billDate);
        setDepartment(patientDetails.departName);
        setWard(patientDetails.wardName);
        
        setWardId(patientDetails.wardId);
        var parserData = JSON.parse(patientDetails.sampleTypeList);
        var formatCol = "";
       
        for (var k = 0; k < parserData.length; k++) {
         

          formatCol = formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' + parserData[k].sampleType;

        }
        setSampleType(formatCol)
       
      }

      else if(getPatientDetails !== 1){
         setShowLoder(0);
        setShowImage(1); setShowButtons(false);setPatientName(''); setGender(''); setMobileNumber(''); setAge(''); setIPNumber(''); setUHID(''); setPMID(''); setPatientType('');setRefrenceBy('');
        setBillDate(''); setDepartment(''); setWard(''); setWardId('');setSampleType('');setShowAlertToster(1);
        setShowErrMessage('Bill Number does not exists!');
      }

      if(getResponse.status === 1) {
        arr = [];
        setIsShowbtnSec(1)
        setShowImage(0)
        setShowButtons(true);
        setSampleCollectionList(getResponse.responseValue[1]);
        setBillId(getResponse.responseValue[1][0].billMasterId);
        setTimeout(() => {
          if (getResponse.responseValue[1].length > 1) {
            for (var i = 0; i < getResponse.responseValue[1].length; i++) {
              if (getResponse.responseValue[1][i].isCollected === "NO") {
                document.getElementById("testList" + getResponse.responseValue[1][i].itemID).checked = false;

              }
            }
          }
        }, 400);
      }
      else if(getPatientDetails.status === 1){
        setShowButtons(false)
        setIsShowbtnSec(0)
        setShowImage(1);
        setShowAlertToster(1);
        setShowErrMessage('No tests on this Bill Number!');
      }
    }
  }


  // ****************************** SAVE SAMPLE COLLECTION DATA *************************************

  let handlerSave = async () => {
    //document.getElementById('errKit').style.display = "none";
    if (textBillNo === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0) {
      setShowAlertToster(1);
      setShowErrMessage('Please fill Bill Number!')
      return false;
    }

    else {

      const isCriticalVal = document.getElementById('Urgent').checked === true ? true : false;

      if (arr.length === 0) {
        setShowAlertToster(1);
      setShowErrMessage('No Data for Sample Collection!')
      }
      else {
        const userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
        // var stringOfTestName = '';
        // for(var m=0;m<arr.length;m++)
        // {
        //   console.log('arrForBarcode : ', arr[m].testname);
        //   stringOfTestName = stringOfTestName === ''? stringOfTestName + arr[m].testname + ',': stringOfTestName + arr[m].testname
        // }
        // console.log('user id  : ', userID)
        // console.log('the stringOfTestName to show : ', stringOfTestName);
     
        
        let data = await SaveSampleCollection(textBillNo, billId, UHID, pmid, isCriticalVal, patientType, JSON.stringify(arr), userID,clientID);

        if (data.status === 1) {
       
          //setLabNumber(data.responseValue[0].labNumber);
          getReport();
          setShowUnderProcess(0);
          setTosterValue(0);
          setShowToster(1);
          setTosterMessage('Data Saved Successfully!');
          setTimeout(() => {
            setShowToster(0)
          }, 2000)
          setTimeout(() => {
            handlePrint(data.responseValue[0].labNumber);
          }, 1000);
        }
        else {
          setShowUnderProcess(0)
          setShowToster(1)//0 for save and warning 1 for Error
          setTosterMessage(data.responseValue)
          setTosterValue(1)
          setTimeout(() => {
            setShowToster(0)
          }, 2000)
        }
      }

    }
  }

  

  // ****************************** CLEAR TEXT VALues   ***********************
  const handleClearTextbox = () => {
    getReport();
    for (var j = 0; j < sampleCollectionList.length; j++) {
      if (sampleCollectionList[j].isCollected === 'NO') {
        document.getElementById("testList" + sampleCollectionList[j].itemID).checked = false;
      }
    }
    // if(document.getElementById('Urgent').checked === true){
    // document.getElementById('Urgent').checked = false;
    // }
  };
  // ******************************* BARCODE GENRATE *************************************************
  //const [barcodeValue, setBarcodeValue] = useState('');

  const handlePrint = async (val) => {
    window.sessionStorage.removeItem("printPatientBarCode")
   
    if (textBillNo === '' || textBillNo === null || textBillNo === undefined || textBillNo === 0) {
      setShowAlertToster(1);
      setShowErrMessage('Please fill Bill Number!')
      return false;
    }
    else {
      if (val === 0) {
        let getLabNumber = await GetLabNumberByBillNumber(textBillNo,clientID)
        if (getLabNumber.status === 1) {
          let t = {
            patientName: patientName,
            patientAge: patientAge,
            genderType: genderType,
            checked:document.getElementById('Urgent').checked === true ? true : false
          }

          window.sessionStorage.setItem("printPatientBarCode", JSON.stringify({ ...getLabNumber, ...t }))
          window.open("/PrintBarCode", 'noopener,noreferrer');


        }
        
      }
      else {

        let t = {
          patientName: patientName,
          patientAge: patientAge,
          genderType: genderType,
          checked:document.getElementById('Urgent').checked === true ? true : false

        }
        let getLabNumber = {
          responseValue: [{ labNumber: val, billNo: textBillNo }]
        }

        window.sessionStorage.setItem("printPatientBarCode", JSON.stringify({ ...getLabNumber, ...t }))
        window.open("/PrintBarCode", 'noopener,noreferrer');

      }

    }
  };
  // ******************** To Push Data in Array *************************
  let getCheckedItem = (list, testname) => {
      
     
    if (arr.length === 0) {
      arr.push(
        {
          itemID: list,
          // testname: testname

        }
      )

    }
    else {
      var index = arr.findIndex((arrFindIndex) => arrFindIndex.itemID === list);

      if (index !== -1) {
        arr.splice(index, 1)
      }
      else {
        arr.push(
          {
            itemID: list,
            // testname: testname
          }
        )
      }
    }



  }



  useEffect(() => {
    //setBiiNumFromSession(window.sessionStorage.getItem('billNu'));
    setTextboxValue(window.sessionStorage.getItem('billNu'))
  }, [])
  document.body.dir = i18n.dir();

  window.addEventListener('beforeunload', () => {
    console.log('User clicked back button');
  });
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
          <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Sample_Collection")}</div></div></div>
            <div className="col-12">
              <div className='whitebg'>
                <div className="row">
                  <div className="col-md-3 col-sm-12 analuze">
                    <div className="fieldsett-in">
                      <div className="fieldsett billfie">
                        <span className='fieldse'>{t("Bill_Details")}</span>
                        <div className="mt-2 me-2 col-12" >
                          <img src={bill} className='icnn' alt='' /> <label htmlFor="Bill" className="form-label">{t("Bill_No.")}</label>
                        </div>
                        <BoxContainer>

                          <div className="mb-2 me-2">
                            <input  type="text" value={textBillNo} onChange={handleTextboxChange} className="form-control form-control-sm" id="BillNo" name="Bill" placeholder={t("Enter_Bill_No.")}  />
                          </div>

                          <div className="mb-2 me-2">
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
                            <img src={UHID1} className='icnn' alt='' />
                            <label htmlFor="uhid" className="form-label">{t("Uhid")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("UHID")} value={UHID} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={UHID1} className='icnn' alt='' />
                            <label htmlFor="ipno" className="form-label">{t("IP_No")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("IP_No")} value={ipNumber} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={patient} className='icnn' alt='' />
                            <label htmlFor="pname" className="form-label">{t("Patient_nm")}</label>
                            {patientName !== '' ? <input type='text' disabled className='form-control form-control-sm' placeholder={t("Enter_Patient_Name")} value={patientName + ' ' + patientAge + ' ' + genderType} /> :
                              <input type='text' disabled className='form-control form-control-sm' placeholder={t("Enter_Patient_Name")} value={''} />}
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={MobileNo} className='icnn' alt='' />
                            <label htmlFor="Mobile" className="form-label">{t("Mobile_No")}.</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Mobile_Number")} value={mobileNumber} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={sample} className='icnn' alt='' />
                            <label htmlFor="sample" className="form-label">{t("Sample_Type")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Sample_Type")} value={sampleType} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={RefBy} className='icnn' alt='' />
                            <label htmlFor="Ref" className="form-label">{t("Ref_By")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Ref_By")}value={refrenceBy} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={department} className='icnn' alt='' />
                            <label htmlFor="FoodSupplementDrug" className="form-label">{t("Department")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Enter_Department")} value={departmentName} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={ward} className='icnn' alt='' />
                            <label htmlFor="ward" className="form-label">{t("ward")}</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Ward_Name")} value={wards} />
                          </div>
                          <div className="col-2 mb-2 me-2">
                            <img src={calender} className='icnn' alt='' />
                            <label htmlFor="billdate" className="form-label">{t("Bill_Date")}.</label>
                            <input type='text' disabled className='form-control form-control-sm' placeholder={t("Bill_Date")} value={billDate} />
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
                      <div className="med-table-section shadow-none" style={{ "height": "57vh" , position:'relative',background:"transparent"}}>
                      {showImage === 1? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                        <TableContainer>
                          <thead>
                            <tr>
                              <th className="text-center" style={{ "width": "5%" }}>#</th>
                              <th>{t("testNamePlaceholder")}</th>
                              <th>{t("Category")}</th>
                              <th>{t("Sample_Collected")}</th>

                              <th>{t("isCollected")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sampleCollectionList && sampleCollectionList.map((val, ind) => {
                              
                              return (
                                <tr key={val.itemID}>
                                  <td className="text-center">{ind + 1}</td>
                                  <td>{val.testname}</td>
                                  <td>{val.categoryName}</td>
                                  <td>{val.isCollected}</td>
                                  {val.isCollected === 'YES' ? <th style={{ "width": "10%" }} className="text-center"><input type="checkbox" style={{ backgroundColor: '#0000007a' }} disabled /></th> :
                                    <th style={{ "width": "10%" }} className="text-center"><input type="checkbox" onClick={() => { getCheckedItem(val.itemID, val.testname) }} id={"testList" + val.itemID} /></th>}

                                </tr>
                              )
                            })}
                          </tbody>
                        </TableContainer>}
                      </div>
                    </div>
                  </div>



                </div>
              </div>
            </div>

{isShowbtnSec===1?
  <div className="col-12 mt-2">
              <div className='whitebg1'>
                <div className='row'>
                  <div className="col-12">
                    <div className='whitebg' style={{padding:"3px"}}>
                    <div className="d-flex  gap-2 mt-2 samplebtnn">
                          

                          {showButtons === true && <div className="form-check frmchk">
                            <input className="form-check-input" type="checkbox" value="" id="Urgent" />
                            <label className="form-check-label" htmlFor="Urgent">
                              {t("Urgent")}
                            </label>
                          </div>}

                          {showButtons === true && <>{showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                              <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" onClick={handlerSave}><img src={save} className='icnn' alt='' />{t("Save")}</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1 btnbluehover" onClick={handleClearTextbox}><img src={clear} className='icnn' alt='' />{t("Clear")}</button>
                              <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1" onClick={()=>handlePrint(0)}><img src={barcode} className='icnn' alt='' />{t("Barcode")}</button></>
                          }</>}

                          
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
:""}
          


          </div>
        </div>
      </section>

      {/* <div className='chatcnt'><img src={chat} className='icnn' alt='' /> </div> */}
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
