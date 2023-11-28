import React from 'react'
import { useState } from 'react';
  import logomain from '../../../assets/images/Navbar/offcanvas-logo.png';
import { useEffect } from 'react';
import GetPatientBillingDetails from '../../../Pathology/Api/GetPatientBillingDetails';
import { useNavigate } from 'react-router-dom';
import GetAllMicrobiologyCultureStrileTestResultForValidation from '../../Api/SampleRecieve/Get/GetAllMicrobiologyCultureStrileTestResultForValidation';
import GetCompleteTestResultOfMicrobiologyForPrintBySubId from '../../Api/SampleRecieve/Get/GetCompleteTestResultOfMicrobiologyForPrintBySubId';
import PostPrintTest from '../../../Pathology/Api/PrintTest/PostPrintTest';

export default function ViewPrintCultureSterileReport() {
  
  const navigate = useNavigate();
  let [getPatientBillingDetails, setPatientBillingDetails] = useState([])
  let [sampleType, setSampleType] = useState('');
  let [sterileTestListArr, setSterileTestListArr] = useState([]);
  let [getDetailsForPrint,setDetailsForPrint] = useState([])

  let noGrowthTemp = '<span style="font-size: 14px;"><b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</b></span><div><span style="font-size: 14px;"><b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</b></span><b><font size="2">&nbsp;<u>BACTERIOLOGY REPORT</u></font></b></div><div><b><font size="2"><u><br></u></font></b></div><div><ul style=""><li><b><font size="2">Culture shows growth of Micrococcus/ Diptheroids (Non pathogenic skin contaminants).</font></b></li></ul><div><b><font size="2"><br></font></b></div><ul style=""><li><b><font size="2">Culture shows growth of Budding Yeast-like cells (Candida species). &nbsp;Correlate clinically.</font></b></li></ul><div><b><font size="2"><br></font></b></div><ul style=""><li><b><font size="2">Culture shows that specimen was contaminated. Kindly repeat the sample with aseptic precautions.</font></b></li></ul><b><span style="font-size: 14px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></b></div>'
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
    // let d = new DOMParser().parseFromString(noGrowthTemp, "text/html");

    // document.getElementById('dt').innerHTML = d.body.innerHTML
     let patientDetails = await GetPatientBillingDetails(theBillNo,clientID)
    let detailsForPrint = await GetCompleteTestResultOfMicrobiologyForPrintBySubId(sampleCollectionMainIdJSON,cultureTypeID,clientID)
    //let detailsForPrintRespponse = detailsForPrint.responseValue[0].detailsJson;
  
     if(patientDetails.status === 1 && detailsForPrint.status === 1){
      const patientBillingDetails = patientDetails.responseValue[0];
     
      setPatientBillingDetails(patientBillingDetails)
      setDetailsForPrint(detailsForPrint.responseValue)
      var parserData = JSON.parse(patientBillingDetails.sampleTypeList);
      var formatCol = "";
      for (var k = 0; k < parserData.length; k++) {


        formatCol = formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' + parserData[k].sampleType;

      }
      setSampleType(formatCol);
      
    }
     }

     let handlepritnt = async () => {
    var tempArr = [];

    for (var i = 0; i < getDetailsForPrint.length; i++) {
      tempArr.push({
            testResultRowId: getDetailsForPrint[i].id,
            testId: getDetailsForPrint[i].testID,
            //subtestID:getDetailsForPrint[i].subtestID,
            userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
  
          })
      //var cnvrtJson = JSON.parse(testResultPrintList[i].jsonResult);
      // for (var j = 0; j < cnvrtJson.length; j++) {
      //   tempArr.push({
      //     testResultRowId: cnvrtJson[j].testResultRowId,
      //     testId: cnvrtJson[j].testID,
      //     subtestID: cnvrtJson[j].subtestID,
      //     userID: 99

      //   })
      // }

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
   
    if(cultureTypeID === 3)
    {
    navigate('/printlaboratoryreport/')
    }
    else if(cultureTypeID === 2)
    {
      navigate('/printorganismreport/')
    }
    else if(cultureTypeID === 1)
    {
      navigate('/culturesterilereport/')
    }
  }


  useEffect(() => {
    getPatientDetails()
  },[])

 

  return (
    <>

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
                

                {/* ----------------------------Prescribed Medicine--------------------------------------- */}

                {/* <div className='pat-dtls border'>
                  <div id='dt'>{noGrowthTemp}</div>
                </div> */}
                {getDetailsForPrint && getDetailsForPrint.map((list, ind) => {
               
                  return(
                    <div className='pat-dtls border'>
                <table className='table-certificate border-bottom mb-2'>
                  <thead>
                  <tr>
                    <td className='pat-dtls border' style={{ fontWeight: 'bold', backgroundColor: '#80808024' }} colSpan={4}>{list.testname}</td>
                  </tr>
                  {/* <tr className='border-bottom'>
                        <th>Test Name</th>
                  </tr> */}
                  </thead>
                  <tbody>
                  { JSON.parse(list.detailsJson).map((detailsList, index) => {
                    return(
                      <>
                      <tr>
                      {(detailsList.investigationResultDetailId !== 1 && detailsList.investigationResultDetailId !== 2) && 
                      <td><span>&nbsp;&nbsp;</span>{detailsList.detailsName}&nbsp;</td>}                                          
                    </tr>
                    <tr>
                      {(detailsList.investigationResultDetailId === 1) && 
                        <td colSpan={4}><span style={{fontWeight:'bold'}}>{detailsList.detailsName}</span> : {detailsList.datailValue}</td>
                      }
                      {(detailsList.investigationResultDetailId === 2) && 
                        <td colSpan={4}><span style={{fontWeight:'bold'}}>{detailsList.detailsName}</span> : {detailsList.datailValue}</td>
                      }
                    </tr>
                    </>
                    )
                  })
                    
                  }
                    
                  </tbody>
                </table>
                </div>
                  )
                })
                  }
                
                <div className='pat-dtls'>
                  <div style={{ fontSize: '15px', color: '#707070' }}><b>Remark : </b>Results to be correlated clinically.</div>
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

    </>
  )
}
