import React from "react";
import "../../assets/css/CertificateCard.css";
import printCss from "../../assets/css/CertificateCard.css";
import logo from "../../assets/images/Navbar/offcanvas-logo.png";

export default function UltraSoundReport() {
let handlePrint = ()=> {
  window.print();
  

  // const content = document.getElementById('printUltraSoundReport');
  //   if (content) {
  //     const printWindow = window.open('');
  //     printWindow.document.open();
  //     printWindow.document.write(`<html><head><title>Ultra Sound Report</title><link rel="stylesheet" href="../../assets/css/CertificateCard.css"></head><body>`);     
  //     printWindow.document.write(content.innerHTML);
  //     printWindow.document.write('</body></html>');
  //     printWindow.document.close();
  //     printWindow.print();
  //     printWindow.close();
  //   }

  
}


  return (
    <>
      <div className="main-content pt-3 mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mb-2 hideOnprint">
              <div className="med-box d-flex justify-content-between">
                <div className="title">Ultra Sound Report</div>
                <div> <i className="bi bi-printer-fill fs-4 pe-3 pointer" title="Print Ultrasound Report" onClick={handlePrint}></i>
                </div>
              </div>
            </div>

             <div className="col-12">
             <div className='card-wrapper' id='printUltraSoundReport'>
             <div className='waterMark'><img src={logo} alt="" /></div>
            <table className="tableHeaderFooter">
                <thead>
                    <tr>
                        <td>
                            <div className='dis-hed'>
                            <div style={{ width: '150px' }}><img src={logo} alt='' style={{width:'100%'}}/></div>

                                <div className="address-section">                                                      
                                    <div className='organizationName'> ERA MEDICAL COLLEGE</div>
                                    <div className='organizationAddress'> ERA MEDICAL COLLEGE , SARFARAZGANJ,LUICKNOW</div>
                                    <div className='organizationContact'>PHONE :7007545201 </div>  
                                    <div className='organizationAddress'> Ultrasound Report</div>
                                </div>
                                <div>&nbsp;</div>
                             </div>


                             <div className='pat-dtls'>

                  <table className='table-certificate cert-top1'>
                    <tr>
                      <td><strong>UHID</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>32644522552</span></td>
                      <td><strong>Patient Name</strong></td>
                      <td>: <span style={{ paddingLeft: '5px' }}>Adil Hasan</span></td>

                    </tr>
                    <tr>
                      <td><strong>Age/Gender</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>29/Male</span></td>
                      <td><strong>Ward</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>Radiology</span></td>    
                    </tr>
                    <tr>
                      <td><strong>Bill No</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>bill/102456</span></td>   
                      <td><strong>Bill Date</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>12-09-2023</span></td>  

                    </tr>
                    <tr>
                      <td><strong>Sample Date</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>12-09-2023</span></td>  
                      <td><strong>Result Date</strong></td>
                      <td>:<span style={{ paddingLeft: '5px' }}>16-09-2023</span></td>   
                    </tr> 
                   
                  </table>

                </div>

                        </td>
                    </tr>
                </thead>

                {/* <b><u></u></b> */}
                <tbody>
                  <tr>
                      <td>
                          <div className='pat-dtls'>
                          <div className='head1 mt-2'>EXAMINATION PERFORMED ULTRASOUND WHOLE ABDOMEN MALE </div>
                          <p><b><u>The Liver is mildly enlarged 15.7 cm in size and outline. It shows fatty echo pattern.</u></b>  No obvious focal pathology is seen. The intra and extra hepatic biliary passages are not dilated.</p>
                          <p>The <b><u>Gall Bladder</u></b> is normal in size, with no evidence of calculi. Walls are thin. The CBD appears normal.</p>
                          <p>The <b><u>Pancreas</u></b> is normal in size and echogenicity. Its outlines are distinct. No obvious focal lesion, calcification or ductal dilatation is seen. </p>        
                          <p><b><u>Spleen</u></b> is normal in size and echogenicity. There is no evidence of collaterals. </p> 
                          <p><b><u>Right Kidney</u></b> is normal in position, outline and echogenicity. No evidence of calculi or calyceal dilatation is seen. Renal mobility is not impaired. Perinephric space is clear. </p>
                          <p><b><u>Left Kidney</u></b> is normal in position, outline and echogenicity. <b><u>Small renal concretion 2-3 mm is seen. No hydronephrosis is seen. Renal mobility is not impaired. Perinephric space is clear.</u></b> </p>                   
                         <p>No ascites or pleural effusion. <b><u>No retroperitoneal adenopathy.</u></b> </p>
                         <p>The Urinary <b><u>Bladder</u></b> is normal in size and outline. <b><u>Walls are thick 3.4 mm & oedematous.</u></b> There is no evidence of any obvious intraluminal or peri vesical pathology. Low level echoes in urinary bladder. </p>
                         <p>The <b><u>Prostate</u></b> is normal in size and volume. Homogenous parenchyma. Median lobe is not projecting. The <b><u>Seminal Vesicles</u></b> are normally visualized. </p>
                         <p>Bowel loops are non- dilated, gas filled & show normal peristaltic activity. </p>
                         <p><b> ADVX-RAY KUB / URINE EXAMINATION / NCCT KUB </b></p>
                         <div  style={{display:'flex', gap:'10px', fontSize:'12px', marginBottom:'10px'}}><b>IMPRESSION:</b> <i style={{color:'red'}}>MILDLY ENLARGED FATTY LIVER (GRADE 1). LEFT SIDED SMALL RENAL CONCRETION. LOW LEVEL ECHOES IN URINARY BLADDER-CYSTITIS</i>  </div>                         
                         <div style={{display:'flex', gap:'10px', fontSize:'12px'}}> <b>NOTE:</b> <i style={{color:'red'}}>MILDLY ENLARGED FATTY LIVER (GRADE 1). LEFT SIDED SMALL RENAL CONCRETION. LOW LEVEL ECHOES IN URINARY BLADDER-CYSTITIS</i>  </div>
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

          </div>
        </div>
      </div>
    </>
  );
}
