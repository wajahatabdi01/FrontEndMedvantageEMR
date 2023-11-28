import React from 'react'
import logomain from '../../../assets/images/Navbar/offcanvas-logo.png';
// import logo from "../../assets/images/Navbar/offcanvas-logo.png";
import GetPatientBillingDetails from '../../../Pathology/Api/GetPatientBillingDetails';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetCompleteTestResultOfMicrobiologyForPrintBySubId from '../../Api/SampleRecieve/Get/GetCompleteTestResultOfMicrobiologyForPrintBySubId';
import PostPrintTest from '../../../Pathology/Api/PrintTest/PostPrintTest';
export default function ViewPrintLaboratoryReport() {
  const navigate = useNavigate();
  let noGrowthTemp = '<span style="font-size: 14px;"><b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</b></span><div><span style="font-size: 14px;"><b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</b></span><b><font size="2">&nbsp;<u>BACTERIOLOGY REPORT</u></font></b></div><div><b><font size="2"><u><br></u></font></b></div><div><ul style=""><li><b><font size="2">Culture shows growth of Micrococcus/ Diptheroids (Non pathogenic skin contaminants).</font></b></li></ul><div><b><font size="2"><br></font></b></div><ul style=""><li><b><font size="2">Culture shows growth of Budding Yeast-like cells (Candida species). &nbsp;Correlate clinically.</font></b></li></ul><div><b><font size="2"><br></font></b></div><ul style=""><li><b><font size="2">Culture shows that specimen was contaminated. Kindly repeat the sample with aseptic precautions.</font></b></li></ul><b><span style="font-size: 14px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></b></div>'
  // let d = new DOMParser().parseFromString(noGrowthTemp, "text/html");
  //   document.getElementById('dt').innerHTML = d.body.innerHTML
  let [getPatientBillingDetails, setPatientBillingDetails] = useState([]);
  let [sampleType, setSampleType] = useState('');
  let [getDetailsForPrint, setDetailsForPrint] = useState([])

  var theUhid = sessionStorage.getItem("uhid");
  var theBillNo = sessionStorage.getItem('billNo');
  var theLabNo = sessionStorage.getItem('labNumber');
  var duplicatePrint = parseInt(sessionStorage.getItem('duplicatePrint'));
  var cultureTypeID = parseInt(sessionStorage.getItem('culturetypeID'));
  var sampleCollectionMainIdJSON = sessionStorage.getItem("sampleCollectionMainIdJSON");

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;
  ////////////////// To fetch patient details /////////////////////
  let getPatientDetails = async () => {
    let patientDetails = await GetPatientBillingDetails(theBillNo,clientID);
    let detailsForPrint = await GetCompleteTestResultOfMicrobiologyForPrintBySubId(sampleCollectionMainIdJSON, cultureTypeID,clientID)

    if (patientDetails.status === 1) {
      const patientBillingDetails = patientDetails.responseValue[0];

      setPatientBillingDetails(patientBillingDetails);
      setDetailsForPrint(detailsForPrint.responseValue)
      var parserData = JSON.parse(patientBillingDetails.sampleTypeList);
      var formatCol = "";
      for (var k = 0; k < parserData.length; k++) {


        formatCol = formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' + parserData[k].sampleType;

      }
      setSampleType(formatCol);
    }
  }

  //////////////////// To give the final print page ///////////////////////////////////
  let handlepritnt = async () => {
    // console.log('detailsForPrint :: ', getDetailsForPrint)
    var tempArr = [];


    for (var i = 0; i < getDetailsForPrint.length; i++) {
      tempArr.push({
        testResultRowId: getDetailsForPrint[i].id,
        testId: getDetailsForPrint[i].testID,
        subtestID: getDetailsForPrint[i].subtestID,
        userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId

      })
 
      var obj = {
        resultPrintJson: JSON.stringify(tempArr),
        clientId:clientID

      }

      let data = await PostPrintTest(obj);
      // setTimeout(async () =>  {

      // },500);


      document.title = 'Test Report'; // Set the desired title here

      // // var printContents = document.getElementById('printReport').innerHTML;
      // // var originalContents = document.body.innerHTML;
      // // document.body.innerHTML = printContents;
      document.getElementById("printLab").style.display = "none"
      document.getElementById("backLab").style.display = "none"
      window.print();
      // // document.body.innerHTML = originalContents;
      window.close();
      document.getElementById("printLab").style.display = "block"
      document.getElementById("backLab").style.display = "block"
    }
  }

  /////////////////// To the previous page ////////////////////////
  let previousPage = () => {

    if (cultureTypeID === 3) {
      navigate('/printlaboratoryreport/')
    }
  }

  useEffect(() => {
    getPatientDetails();
  }, [])
  return (
    <>
      <div className=''>
        <div className="container-fluid">
          <div className="row">
            {getDetailsForPrint && getDetailsForPrint.map((list, ind) => {
              // Create a unique ID for the dt element in each iteration
              const dtId = `dt_${ind}`;

              // Create a variable to store the parsed content
              const parsedContent = new DOMParser().parseFromString(list.resultText, "text/html");

              // Use a function to set the content
              const setDtContent = () => {
                const dtElement = document.getElementById(dtId);
                if (dtElement) {
                  dtElement.innerHTML = parsedContent.body.innerHTML;
                }
              };

              // Call the setDtContent function after 1000 milliseconds
              setTimeout(setDtContent, 200);

              return (
                <>
                <div className='hideOnprint'>
                <div className='searchbtnn' style={{ position: 'absolute', top: '10px', right: '200px', display: 'flex', gap: '10px', zIndex: '1' }}>
                    <button id="printLab" onClick={handlepritnt}>Print Report</button>
                    <button id= "backLab" onClick={previousPage}>Back</button>
                  </div>
                  </div>

                  <div key={ind}>
                  

                  <div className='card-wrapper' id='printReport'>
                  {/* <div className='waterMark'><img src={logomain} alt="" /></div> */}
                    {/* Header Section */}
                    <table className='tableHeaderFooter'>
                      <thead>
                        <tr>
                          <td>
                            {/* ... (your existing header code) */}

                            <div className='dis-hed'>

                              <div style={{ width: '150px' }}><img src={logomain} style={{ width: '100%' }} alt='' /></div>

                              <div className="address-section">

                                <>
                                  {/* {console.log("printData.userData", printData.dataClient.address)} */}
                                  <div className='organizationName'> ERA MEDICAL COLLEGE</div>
                                  <div className='organizationAddress'> ERA MEDICAL COLLEGE , SARFARAZGANJ,LUICKNOW</div>
                                  {/* <div className='organizationContact'>PHONE :7007545201 </div> */}
                                  <div className='organizationAddress'> MICROBIOLOGY REPORT</div>
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
                                  <td>: <span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.patientName}</span></td>

                                </tr>
                                <tr>
                                  <td><strong>Age/Gender</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.age}/{getPatientBillingDetails.gender}</span></td>
                                  <td><strong>Ward</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.wardName}</span></td>     {/*still static */}
                                </tr>
                                <tr>
                                  <td><strong>Bill No</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{theBillNo}</span></td>   {/*still static */}
                                  <td><strong>Bill Date</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.billDate}</span></td>  {/*still static */}

                                </tr>
                                <tr>
                                  <td><strong>Sample Date</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.sampleCollectionDate}</span></td>   {/*still static */}
                                  <td><strong>Result Date</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.resultDateDate}</span></td>   {/*still static */}
                                </tr>
                                <tr>
                                  <td><strong>Cr No</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.crNo}</span></td>
                                  <td><strong>IPNo</strong> </td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.ipNo}</span></td>
                                </tr>
                                <tr>
                                  <td><strong>Print Date</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.printDate}</span></td>  {/*still static */}
                                  <td><strong>Sample(s)</strong> </td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{sampleType}</span></td>
                                </tr>
                                <tr>
                                  <td><strong>Center</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.patientType}</span></td>  {/*still static */}

                                </tr>
                              </table>

                            </div>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className='pat-dtls border'>
                              <table className='table-certificate _border-bottom mb-2'>
                                <thead>
                                  <tr>
                                    <td className='pat-dtls border' style={{ fontWeight: 'bold', backgroundColor: '#80808024' }} colSpan={4}>{list.testname}</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <div className='pat-dtls'>
                                    {/* Use the unique dtId for the id attribute */}
                                    <div id={dtId} className='mt-2 mx-2'></div>
                                  </div>
                                </tbody>
                              </table>
                            </div>
                            <div className='pat-dtls'>
                              <div style={{ fontSize: '15px', color: '#707070' }}><b>Remark : </b>Results to be correlated clinically.</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>
                            {/* Signature Section */}
                            <div className='pat-dtls'>
                              <div className='d-flex justify-content-end'>
                                {/* ... (your existing signature code) */}

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
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                </>
                
              );
            })}
          </div>
        </div>
      </div>


    </>
  )
}
