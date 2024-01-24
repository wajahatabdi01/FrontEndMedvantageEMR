import React, { useEffect } from 'react'
import logomain from '../../../assets/images/Navbar/offcanvas-logo.png';
import GetPatientBillingDetails from '../../../Pathology/Api/GetPatientBillingDetails';
import GetCompleteTestResultOfMicrobiologyForPrintBySubId from '../../Api/SampleRecieve/Get/GetCompleteTestResultOfMicrobiologyForPrintBySubId';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostPrintTest from '../../../Pathology/Api/PrintTest/PostPrintTest';

export default function ViewPrintOrganismReport() {

const navigate = useNavigate()

  let [getPatientBillingDetails, setPatientBillingDetails] = useState([]);
  let [sampleType, setSampleType] = useState('');
  let [getDetailsForPrint,setDetailsForPrint] = useState([])

  var theUhid = sessionStorage.getItem("uhid");
  var theBillNo = sessionStorage.getItem('billNo');
  var theLabNo = sessionStorage.getItem('labNumber');
  var duplicatePrint = parseInt(sessionStorage.getItem('duplicatePrint'));
  var cultureTypeID = parseInt(sessionStorage.getItem('culturetypeID'));
  var sampleCollectionMainIdJSON = sessionStorage.getItem("sampleCollectionMainIdJSON");

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;


  let getPatientDetails = async () => {
    let patientDetails = await GetPatientBillingDetails(theBillNo,clientID);
    let detailsForPrint = await GetCompleteTestResultOfMicrobiologyForPrintBySubId(sampleCollectionMainIdJSON,cultureTypeID,clientID)
    const detailsForPrintList = detailsForPrint.responseValue;
   
    if(patientDetails.status === 1) {
      const patientBillingDetails = patientDetails.responseValue[0];
    
      setPatientBillingDetails(patientBillingDetails);
      setDetailsForPrint(detailsForPrintList)
      var parserData = JSON.parse(patientBillingDetails.sampleTypeList);
      var formatCol = "";
      for (var k = 0; k < parserData.length; k++) {


        formatCol = formatCol === "" ? formatCol + parserData[k].sampleType : formatCol + ',' + parserData[k].sampleType;

      }
      setSampleType(formatCol);
    }
   }

////////////////////// Final Print /////////////////////////
let handlePrint = async () => {
  var tempArr = [];
  for (var i = 0; i < getDetailsForPrint.length; i++) {
    tempArr.push({
          testResultRowId: getDetailsForPrint[i].id,
          testId: getDetailsForPrint[i].testID,
          subtestID:getDetailsForPrint[i].subtestID,
          userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId

        })
      }

      var obj = {
        resultPrintJson: JSON.stringify(tempArr),
        clientId:clientID
        
      }

  let data = await PostPrintTest(obj);

  document.title = 'Organism Report'; // Set the desired title here

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
   
    if(cultureTypeID === 2)
    {
    navigate('/printorganismreport/')
    }
  }

   useEffect(() => {
    getPatientDetails()
   },[])
  return (
    <>

      <div className='searchbtnn' style={{ position: 'absolute', top: '10px', right: '200px', display: 'flex', gap: '10px', zIndex: '1' }}>
        <button id="print" onClick={handlePrint}>Print Report</button>
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
                      <td>:<span style={{ paddingLeft: '5px' }}>{getPatientBillingDetails.age}/{getPatientBillingDetails.agetype}</span></td>
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
                    {/* <tr>
                      <td><strong>Center</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>{'patientType'}</span></td>  

                    </tr> */}
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
                  {getDetailsForPrint && getDetailsForPrint.map((list, ind) => {
                    
                    return(
                      <table className='table-certificate border-bottom mt-2 mb-5'>
                 
                 <thead>
                   <tr className='border-bottom'>
                     <th colSpan={4} style={{ fontSize: '17px' }}>{list.testname}</th>
                   </tr>
                   <tr>
                     <td><span style={{fontWeight:'bold'}}>Organism</span> : {JSON.parse(list.antibiogramResult)[0].AgentFactor}</td>
                     <td><span style={{fontWeight:'bold'}}>Growth</span> : {JSON.parse(list.antibiogramResult)[0].Growth}</td>
                   </tr>
                   <tr className='border-bottom'>
                     <th>Antibiotic Name</th>

                     <th>Result</th>
                  </tr>
                 </thead>
                 <tbody>
                 {(JSON.parse(list.antibiogramResult).map((newList,index) => {
                  return(
                    <tr>
                      <td>{newList.MedicineName}</td>
                      <td>{newList.Result}</td>
                    </tr>
                  )
                 }))}
                 <tr>
                     <td><span style={{fontWeight:'bold'}}>Gram Stain</span> : {JSON.parse(list.investigationResultDetails)[0].datailValue}</td>
                     <td><span style={{fontWeight:'bold'}}>Wet Mount</span> : {JSON.parse(list.investigationResultDetails)[1].datailValue}</td>
                   </tr>
                 </tbody>
               </table>
                    )
                  })
                    }
                  
                </div>
                {/* <div className='pat-dtls'>
                  <div style={{ fontSize: '15px', color: '#707070' }}><b>Remark : </b> {remarkFinal}</div>
                </div> */}
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
