import React from "react";
import "../../assets/css/CertificateCard.css";
import { useNavigate } from 'react-router-dom';
import printCss from "../../assets/css/CertificateCard.css";
import logo from "../../assets/images/Navbar/offcanvas-logo.png";
import GetDataForPrint from "../API/PrintReport/GET/GetDataForPrint";
import { useEffect } from "react";
import { useState } from "react";
import AlertToster from "../../Component/AlertToster";
import GetPatientDetails from "../API/PerformTest/GET/GetPatientDetails";
import SaveTestRepPrintDetails from "../API/PrintReport/POST/SaveTestRepPrintDetails";

export default function RadiologyPrintReport() {
  const navigate = useNavigate();
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [printDataList, setPrintDataList] = useState([]);
  let [patientDetails, setPatientDetails] = useState([]);

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  const getPrintDataForPrint = async () => {
    var obj = {
      jsonDataList: sessionStorage.getItem("ultraSoundReport"),
      userID: userID,
      clientId: clientID
    }
    const response = await GetDataForPrint(obj);
    if (response.status === 1) {
      setPrintDataList(response.responseValue);
      const patientDetailsResponse= await GetPatientDetails(response.responseValue[0].billNumber);
      if(patientDetailsResponse.status === 1){
        setPatientDetails(patientDetailsResponse.responseValue[0])
      }
    }
    else {
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
    }
  }
  let handlePrint = async () => {
      let tempArr=[];
      for(var i=0; i < printDataList.length; i++){
        tempArr.push({
          testresultId:printDataList[i].testresultID
        })
      }
      let obj={
        userId: userID,
        jsontestResultRowId: JSON.stringify(tempArr),
        clientID:clientID
      }
     const response= await SaveTestRepPrintDetails(obj);
     if(response.status ===1){
      document.title = 'Radiology Report'; 
      window.print();
     }
     else {
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
    }
    window.close();
  }
  let previousPage =()=>{
    sessionStorage.setItem('ultraSoundReport', '');
    navigate('/printReport/');
  }
  useEffect(() => {
    getPrintDataForPrint();
  }, [])

  return (
    <>
      <div className="">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-12 mb-2 hideOnprint">
              <div className="med-box d-flex justify-content-between">
                <div className="title">Ultra Sound Report</div>
                <div> <i className="bi bi-printer-fill fs-4 pe-3 pointer" title="Print Ultrasound Report" onClick={handlePrint}></i>
                </div>
              </div>
            </div> */}
            {printDataList && printDataList.map((list, i) => {
              
              setTimeout(()=>{ 
                 let d = new DOMParser().parseFromString(list.impression, "text/html");
                document.getElementById("txtImpression"+list.testId+''+list.testresultID).innerHTML = d.body.innerHTML;
               },1000)
              return (
                <>
                <div className='col-12  hideOnprint' >
                <div className="searchbtnn" style={{ position: 'absolute', top: '10px', right: '200px', display: 'flex', gap: '10px', zIndex: '1' }}>
                <button id="print" onClick={handlePrint}>Print Report</button>
                <button id="back" onClick={previousPage}>Back</button>
                </div>
             </div>
                

                <div className="col-12 ">                
                  <div className='card-wrapper' id='printUltraSoundReport'>
                    {/* <div className='waterMark'><img src={logo} alt="" /></div> */}
                    <table className="tableHeaderFooter">
                      <thead>
                        <tr>
                          <td>
                            <div className='dis-hed'>
                              <div style={{ width: '150px' }}><img src={logo} alt='' style={{ width: '100%' }} /></div>

                              <div className="address-section">
                                <div className='organizationName'> ERA MEDICAL COLLEGE</div>
                                <div className='organizationAddress'> ERA MEDICAL COLLEGE , SARFARAZGANJ,LUICKNOW</div>
                                <div className='organizationContact'>PHONE :7007545201 </div>
                                <div className='organizationAddress'> Radiology Report</div>
                              </div>
                              <div>&nbsp;</div>
                            </div>


                            <div className='pat-dtls'>

                            <table className='table-certificate cert-top1'>
                                <tr>
                                  <td><strong>UHID</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{patientDetails.uhId}</span></td>
                                  <td><strong>Patient Name</strong></td>
                                  <td>: <span style={{ paddingLeft: '5px' }}>{patientDetails.patientName}</span></td>

                                </tr>
                                <tr>
                                  <td><strong>Age/Gender</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{patientDetails.age}{patientDetails.agetype}/{patientDetails.gender}</span></td>
                                  <td><strong>Department</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{patientDetails.departName}</span></td>
                                </tr>
                                <tr>
                                  <td><strong>Ward</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{patientDetails.wardName}</span></td>
                                  <td><strong>Bill No</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{patientDetails.billNo}</span></td>
                                  

                                </tr>
                                <tr>
                                   <td><strong>Bill Date</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{patientDetails.billDate}</span></td>
                                  <td><strong>Result Date</strong></td>
                                  <td>:<span style={{ paddingLeft: '5px' }}>{list.resultDateTime}</span></td>
                                </tr>

                              </table>

                            </div>

                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className='pat-dtls'>
                              <div className='head1 mt-2'>{list.testName}</div>
                              {JSON.parse(list.organParameter).map((val,ind)=>{
                                  return(
                                          <>
                                            <div className="fs-6 fw-bold mt-2">{val.OrganName}</div>
                                            <div className="d-flex gap-3 flex-wrap" style={{fontSize: '13px'}}>
                                            {JSON.parse(val.Parameter).map((li)=>{                                           
                                              return(<div><b>{li.ParameterName} :</b> {li.ParameterValue}&nbsp;{li.ParameterUnitName}</div>) 
                                            })}  
                                            </div>                            
                                            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', marginTop: '10px' }}><b>REMARK:</b> <i>{val.Remark}</i>  </div>
                                          </>
                                        ) 
                              })}
                              <div className="mt-2" style={{ display: 'flex', gap: '10px',  marginBottom: '10px' }}><b className="fs-5 fw-bold">IMPRESSION:</b><span style={{marginTop: '5px'}} id={"txtImpression"+list.testId+''+list.testresultID}></span></div>
                              {/* <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}> <b>NOTE:</b> <i style={{ color: 'red' }}>MILDLY ENLARGED FATTY LIVER (GRADE 1). LEFT SIDED SMALL RENAL CONCRETION. LOW LEVEL ECHOES IN URINARY BLADDER-CYSTITIS</i>  </div> */}
                            </div>
                          </td>
                        </tr>
                      </tbody>


                      <tfoot>
                        <tr>
                          <td>
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
                          </td>
                        </tr>
                      </tfoot>
                    </table>

                  </div>
                </div>
                </>
              )
              
            })}


          </div>
        </div>
      </div>
      {
        showAlertToster === 1 ? <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
      }
    </>
  );
}
