import React, { useEffect, useState } from 'react';

import logomain from '../../assets/images/Navbar/offcanvas-logo.png';
import ImgBarcode from '../../assets/images/OPD/barcodedemo.png';
import '../../assets/css/CertificateCard.css'
//import GetPatientPersonalDashboardByUHID from '../../Registration/API/GET/GetPatientPersonalDashboardByUHID';
import GetSubTestForValidationByMainAndTestId from '../Api/ValidateTest/GetSubTestForValidationByMainAndTestId';
import { json, useNavigate } from 'react-router-dom';
import GetPrintTestResultBySubIdAndUserId from '../Api/PrintTest/GetPrintTestResultBySubIdAndUserId';
import PostPrintTest from '../Api/PrintTest/PostPrintTest';
import GetLabSampleType from '../Api/GetLabSampleType';
import GetPatientBillingDetails from '../Api/GetPatientBillingDetails';
import GetPatientPersonalDashboardByUHID from '../../Registartion/API/GET/GetPatientPersonalDashboardByUHID';
// import tecnicianSign from 'http://172.16.61.31:7095/MediaFiles/tecnicianSign.png'

export default function ViewReportPrint(props) {

  let [patientName, setPatientName] = useState('');
  let [ward, setWard] = useState('');
  let [gender, setGender] = useState('');
  let [age, setAge] = useState('');
  let [crNo, setCrNo] = useState('');
  let [ipNo, setIpNo] = useState('');
  let [sampleType, setSampleType] = useState('');
  let [patientType, setPatientType] = useState('');
  let [getBillDate, setBillDate] = useState('');
  let [getPrintDate, setPrintDate] = useState('');
  let [getResultDate, setResultDate] = useState('');
  let [remarkFinal, setRemarkFinal] = useState('');
  let [sampleCollectionDate, setSampleCollectionDate] = useState('');

  let [testResultPrintList, setTestResultPrintList] = useState([]);

  const navigate = useNavigate();
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;
  var theUhid = sessionStorage.getItem("uhid");
  var theBillNo = sessionStorage.getItem('billNo');
  var theLabNo = sessionStorage.getItem('labNumber');
  var duplicatePrint = parseInt(sessionStorage.getItem('duplicatePrint'))
  //var thecrNo = sessionStorage.getItem('crNo');
  var sampleCollectionMainIdJSON = sessionStorage.getItem("sampleCollectionMainIdJSON");
  var theUserId = parseInt(sessionStorage.getItem("userIdForPrint"));



  let getPatientDetails = async (theUhid, sampleCollectionMainIdJSON) => {

    let data = await GetPatientPersonalDashboardByUHID(theUhid);
    let testResultData = await GetPrintTestResultBySubIdAndUserId(sampleCollectionMainIdJSON,clientID);

    let testDataForRemark = testResultData.responseValue
    var remarkString = '';
    for (var a = 0; a < testDataForRemark.length; a++) {


      remarkString = remarkString === '' ? testDataForRemark[a].resultRemark : remarkString + ',' + testDataForRemark[a].resultRemark;
    }
    setRemarkFinal(remarkString)

    //console.log('GetPrintTestResultBySubIdAndUserId : ', testResultData);
    //let getSampleType = await GetLabSampleType(theBillNo);
    let getPatientDetails = await GetPatientBillingDetails(theBillNo,clientID)

    if (getPatientDetails.status === 1) {

      const patientBillingDetails = getPatientDetails.responseValue[0];
      setBillDate(patientBillingDetails.billDate);
      setPrintDate(patientBillingDetails.printDate);
      setResultDate(patientBillingDetails.resultDateDate);
      setSampleCollectionDate(patientBillingDetails.sampleCollectionDate);
      setPatientType(patientBillingDetails.patientType)
      var parserData = JSON.parse(patientBillingDetails.sampleTypeList);
      var formatCol = "";

      for (var k = 0; k < parserData.length; k++) {


        formatCol = formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' + parserData[k].sampleType;

      }
      setSampleType(formatCol);
    }
    setTestResultPrintList(testResultData.responseValue);

    //let testData = await GetSubTestForValidationByMainAndTestId(sampleCollectionMainId,theUserId);

    //console.log('patient test details : ', testData.responseValue);
    setPatientName(data.responseValue[0].patientName)
    setWard(data.responseValue[0].wardName)
    setGender(data.responseValue[0].gender)
    setAge(data.responseValue[0].age)
    setCrNo(data.responseValue[0].crNo)
    setIpNo(data.responseValue[0].ipNo)


  }

  let handlepritnt = async () => {
    var tempArr = [];

    for (var i = 0; i < testResultPrintList.length; i++) {

      var cnvrtJson = JSON.parse(testResultPrintList[i].jsonResult);
      for (var j = 0; j < cnvrtJson.length; j++) {
        tempArr.push({
          testResultRowId: cnvrtJson[j].testResultRowId,
          testId: cnvrtJson[j].testID,
          subtestID: cnvrtJson[j].subtestID,
          userID: 99

        })
      }

    }

    var obj = {
      resultPrintJson: JSON.stringify(tempArr),
      clientId:clientID
    }



    let data = await PostPrintTest(obj);
    // setTimeout(async () =>  {

    // },500);


    document.title = 'Test Report'; // Set the desired title here

    // var printContents = document.getElementById('printReport').innerHTML;
    // var originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    document.getElementById("print").style.display = "none"
    document.getElementById("back").style.display = "none"
    window.print();
    // document.body.innerHTML = originalContents;
    window.close();
    document.getElementById("print").style.display = "block"
    document.getElementById("back").style.display = "block"
  }

  let previousPage = () => {

    navigate('/Print/')
  }

  useEffect(() => {
    getPatientDetails(theUhid, sampleCollectionMainIdJSON);
  }, [])


  return (

    <>
      <div className=''>
      <div className='searchbtnn' style={{ position: 'absolute', top: '10px', right: '200px', display: 'flex', gap: '10px', zIndex: '1' }}>
        <button id="print" onClick={handlepritnt}>Print Report</button>
        <button id="back" onClick={previousPage}>Back</button>
      </div>

      <div className='card-wrapper' id='printReport'>

        {/* <div className='quater-border right-top'></div>
        <div className='quater-border left-bottom'></div> */}
        {/* <div className='waterMark'><img src={waterMark} /></div> */}
        {/* -----------------------------------------Header Section-------------------------------------- */}

        <table className='tableHeaderFooter'>
          <thead>
            <tr>
              <td>
                <div className='dis-hed'>

                  <div style={{ width: '150px' }}><img src={logomain} style={{ width: '100%' }} alt='' /></div>

                  <div className="address-section">

                    <>
                      {/* {console.log("printData.userData", printData.dataClient.address)} */}
                      <div className='organizationName'> ERA MEDICAL COLLEGE</div>
                      <div className='organizationAddress'> ERA MEDICAL COLLEGE , SARFARAZGANJ,LUICKNOW</div>
                      <div className='organizationContact'>PHONE :7007545201 </div>
                      {duplicatePrint === 1 ? <div className='organizationContact'>Duplicate Report</div> : <></>}
                    </>
                  </div>


                  {/* <div className="address-section">
    <div className='organizationName'> {organizationName} </div>
    <div className='organizationAddress'> {organizationAddress}</div>
    <div className='organizationContact'>PHONE : {organizationContact}</div>
</div> */}

                  <div className='pres-inn' style={{ textAlign: 'right' }}>
                    {/* <div className='address'><strong>Date:&nbsp;{dateD + "/" + dateM + "/" + dateY}</strong></div> */}
                    <div className='phone'><strong>UHID:&nbsp;{theUhid}</strong></div>
                    {/* <div style={{ width: '127px' }}><img src={ImgBarcode} style={{ width: '100%' }} alt='' /></div> */}
                  </div>

                </div>
                {/* ----------------------------Patient Information--------------------------------------- */}
                <div className='pat-dtls'>

                  <table className='table-certificate cert-top1'>
                    <tr>
                      <td><strong>Lab No</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{theLabNo}</span></td>
                      <td><strong>Patient Name</strong></td>
                      <td>: <span style={{ paddingLeft: '5px' }}>{patientName}</span></td>

                    </tr>
                    <tr>
                      <td><strong>Age/Gender</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{age}/{gender}</span></td>
                      <td><strong>Ward</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{ward}</span></td>     {/*still static */}
                    </tr>
                    <tr>
                      <td><strong>Bill No</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{theBillNo}</span></td>   {/*still static */}
                      <td><strong>Bill Date</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{getBillDate}</span></td>  {/*still static */}

                    </tr>
                    <tr>
                      <td><strong>Sample Date</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{sampleCollectionDate}</span></td>   {/*still static */}
                      <td><strong>Result Date</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{getResultDate}</span></td>   {/*still static */}
                    </tr>
                    <tr>
                      <td><strong>Cr No</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{crNo}</span></td>
                      <td><strong>IPNo</strong> </td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{ipNo}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Print Date</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{getPrintDate}</span></td>  {/*still static */}
                      <td><strong>Sample(s)</strong> </td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{sampleType}</span></td>
                    </tr>
                    <tr>
                      <td><strong>Center</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{patientType}</span></td>  {/*still static */}

                    </tr>
                  </table>

                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {/* <hr /> */}
                {/* <div className='pat-dtls'>
                  <div className='document-title'>Diagnostic Details</div>
                  <table className='table-certificate cert-top1'>
                    {printData.jsonDiagnosis.map(()=>{return})}
                    <tr>
                      <td><strong>Consultant Diagnosis:</strong></td>
                      <td>
                        <span className='commaSeparatedValues'>
                          D-Glyceric acidemia, D-Glycerol 1-phosphate</span>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ width: '20%' }}><strong>Patient Complaint:</strong></td>
                      <td>
                        <span className='commaSeparatedValues'>
                          fdssdsd
                        </span>
                      </td>
                    </tr>
                    <tr>
                            <td><strong>History:</strong></td>
                            <td></td>
                        </tr>

                  </table>
                </div> */}

                {/* ----------------------------Prescribed Medicine--------------------------------------- */}

                <div className='pat-dtls'>
                  {/* <div className='document-title'>Prescribed Medicine</div> */}
                  <table className='table-certificate border-bottom mt-2 mb-5'>
                    <thead>
                      {/* <tr className='border-bottom'>
                        <th colSpan={4} style={{ fontSize: '17px' }}>Rx</th>
                      </tr> */}
                      <tr className='border-bottom'>
                        <th>Test Name</th>
                        {/* <th>Dosage Form</th> */}
                        {/* <th>Strength</th> */}
                        <th>Value</th>
                        <th>Unit</th>
                        <th className='text-center'>Reference Ranges Given By Kit Manufacturer</th>
                      </tr>

                    </thead>
                    <tbody>
                      {testResultPrintList && testResultPrintList.map((list, index) => {
                        return (
                          <>
                            <tr>
                              <td className='pt-2' style={{ fontWeight: 'bold', backgroundColor: '#80808024' }} colSpan={4}>{list.testname}</td>
                            </tr>
                            {JSON.parse(list.jsonResult).map((jsonList, index) => {

                              return (
                                <tr>
                                  <td className='pt-1'>{jsonList.subTestName}</td>
                                  {jsonList.isNormalResult === 0 ? <td style={{ color: 'red', fontWeight: 'bold' }}>{jsonList.result}</td> : <td>{jsonList.result}</td>}

                                  <td>{jsonList.unit}</td>
                                  <td className='text-center'>{jsonList.rangeRemark}</td>
                                </tr>
                              )
                            })}
                          </>
                        )
                      })}


                    </tbody>
                  </table>
                </div>
                <div className='pat-dtls'>
                  <div style={{ fontSize: '15px', color: '#707070' }}><b>Remark : </b> {remarkFinal}</div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                {/* --------------------------------------Signature Section------------------------------------- */}

                <div className='pat-dtls'>
                  <div className='d-flex justify-content-end'>
                    <table class="table-certificate cert-top1">
                      <tr>
                        <td>
                          <div className='d-flex justify-content-between'>


                            <div className='text-center'>
                              <div> <img src='http://172.16.61.31:7095/MediaFiles/tecnicianSign.png' alt="" style={{ width: '125px', marginTop: '2px' }} /></div>
                              <div><b>Technician</b></div>

                            </div>

                            <div className='text-center'>
                              <div> <img src='http://172.16.61.31:7095/MediaFiles/doctorSign.png' alt="" style={{ width: '125px', marginTop: '2px' }} /></div>
                              <div><b>Doctor</b></div>

                            </div>


                          </div>
                        </td>
                      </tr>

                    </table>
                  </div>

                </div>


                {/* <div className='document-title-h'>In case of emergency the patient can also consult any other doctor</div> */}
              </td>
            </tr>
          </tfoot>
        </table>








      </div>
</div>
    </>
  )
}
