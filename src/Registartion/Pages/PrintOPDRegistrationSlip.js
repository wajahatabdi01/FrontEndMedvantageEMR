import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
// import '../Assets/CSS/Print.css'
// import mainlogo from '../../../src/assets/images/Navbar/offcanvas-logo.png'
import mainlogo from '../../../src/assets/images/Navbar/blankLogo.svg'
import '../../assets/css/CertificateCard.css'
// import BtnPrint from './BtnPrint';
import JsBarcode from 'jsbarcode';
import { json } from 'react-router-dom';
// import DMGET from '../Clinical/Api/Admin/Masters/DepartmentMaster/DMGET';

export default function PrintOPDRegistrationSlip() {   

    let [bool, setBool] = useState(true);
    let [dateTime, setDateTime] = useState();
    let [printdata, setPrintData] = useState();
    let [printConsultantFee, setConsultantFee] = useState();
    let [department, setDepartment] = useState("");
    let [loginData, setLoginData] = useState([]);
    let date = new Date()

    // let getdata = async () => {
    //     let response = await DMGET()
    //     let dep = response.responseValue
    //     let depName = dep.filter((val) => { if (printdata !== undefined) return val.id === printdata[0].departmentID })
    //     if (depName !== 'undefined') {
    //         setDepartment(depName[0].departmentName)
    //     }

    // }

    let getPTData = () => {
        let ptData = JSON.parse(window.sessionStorage.getItem("PrintOpdData"));
        let ConsultantFee = window.sessionStorage.getItem("PrintOpdDataConsultantFee");
        setPrintData(ptData);
        setConsultantFee(ConsultantFee);
    }

    let functionGetLoginData = ()=> {      
        let response = JSON.parse(window.sessionStorage.getItem("LoginData"));            
        let getLoginData = response.clientdata        
        setLoginData(getLoginData)        
       }

  
    useEffect(() => {
        //setPrintData(JSON.parse(window.sessionStorage.getItem("PrintOpdData")));
        setDateTime(date.toLocaleDateString() + " " + date.toLocaleTimeString());
        getPTData();
        functionGetLoginData();
        setTimeout(() => {
            handlepritnt();
        }, 1200)
        // getdata()
        // if (printdata !== undefined) {
        //    // JsBarcode("#barcode", printdata[0].uhID, { height: '24px', displayValue: false });
        // }

    }, [])
    


    let handlepritnt = () => {
        document.title = 'OPD Slip'; // Set the desired title here
        setBool(false)
        window.print("");
        window.close();
    }
    return (

<>

              <div className="opdSlipContainer">
                <div className='water-mark'>
                {/* {loginData.logoUrl == null ? <img src={mainlogo} alt='Brand Logo' title='Brand Logo'/> : <img src={loginData.logoUrl} alt='Brand Logo' title='Brand Logo'/>} */}
                <div className='clientText'>{loginData.clientName}</div>
                </div>
                  {/* ----------------Header Sec-------------- */}
                   <div className="dis-hed">
                    <div className="discharge-logo">
                        <div className="logo-main">
                            {/* <img src={mainlogo} /> */}
                            {loginData.logoUrl == null ? <img src={mainlogo} alt='Brand Logo' title='Brand Logo'/> : <img src={loginData.logoUrl} alt='Brand Logo' title='Brand Logo'/>}                            
                        </div>
                    </div>
                    <div className="address-section">
                        {/* <div className='address'>K.No-3, Sarfarazganj, Hardoi road, Lucknow, UP-226003</div>
                        <div className='email'>info@medvantage.com</div>
                        <div className='phone'>+91-7795688088</div>  */}
                        <div className='organizationName'>{loginData.clientName}</div>  
                        <div className='organizationAddress'>{loginData.address}</div> 
                        {loginData.emailID == null ? '' : <div className='email'>Email: {loginData.emailID}</div>}                        
                        {loginData.mobileNo == null ? '' : <div className='organizationContact'>Phone: +{loginData.countryCode} {loginData.mobileNo}</div>} 
                    </div>

                    <div className="address-section">
                     {/* <div className='proprietor'>Medvantage Hospital</div> 
                    <div className='proprietor'>ميدوانتاج  مستشفى</div>                        
                    <div className='phone'>+91-7795688088</div>  */}
                    {/* <div className='address'>{loginData.address}</div>                                                 */}
                    <div className='phone text-right'> {dateTime}</div>                        
                    </div>

                </div>

                <div className="pat-dtls text-center">
                    <div className='document-title'> OPD VISIT SLIP</div>
                </div>


                <div className="pat-dtls">
                    <table className='table-certificate cert-top1 border'>
                    <tbody className=''> 

                                {/* <tr className=''>
                                   
                                       <th>UHID : </th><td className='ps-3 fw-semibold'>1000010</td>
                                 
                   
                                       <th>Cr No. : </th><td className='ps-3 fw-semibold'>25252-525</td>
                                
                          
                                       <th>Department : </th><td className='ps-3 fw-semibold'>Cardiology</td>
                               
                               </tr>                       */}
                           
                           {printdata && <>
                               <tr>                                   
                                       <th>UHID : </th><td>{printdata.uhID}</td>
                                       <th>Name : </th><td>{printdata.patientName}</td>
                                       <th>Age/Gender : </th><td>{printdata.age} <span>{parseInt(printdata.ageUnitId) === 1 ? 'Y':parseInt(printdata.ageUnitId) === 2 ? 'M':parseInt(printdata.ageUnitId) === 3 ? 'D' :'' }</span> / {printdata.genderName}</td>                                     
                                
                               </tr>

                               <tr>
                                <th>Mobile No : </th><td>{printdata.mobileNo}</td>  
                                <th>Guardian Name: </th><td>{printdata.guardianName}</td>
                                <th>Visit No. : </th><td>{printdata.crNo}</td>
                               </tr>
                               
                               <tr> 
                               <th>Department : </th><td>{printdata.departmentName}</td>
                               <th>Doctor : </th><td>{printdata.doctorName}</td>
                               <th>Room No : </th><td>{printdata.roomNumber}</td>                                                                          
                               </tr>

                               <tr>
                               <th>Queue No : </th><td>{printdata.queueNo}</td>
                                <th>Visit Date : </th><td>{printdata.visitDate}</td>
                                <th>Address : </th> <td>{printdata.address}</td>                                   
                               </tr>
                               
                           </>
                           }
                       </tbody>
                    </table> 

                    <table className='table-certificate cert-top3 border'>
                        <thead>
                            <tr>
                                <th className='text-center'>#</th>
                                <th>OPD Service Details</th>
                                <th className='text-center'>Qty</th>
                                <th className='text-center'>Rate</th>
                                <th className='text-right'>Amount</th>
                            </tr>
                        </thead>

                        <tbody style={{height:'100px'}}>
                            <tr>
                                <td className='text-center'>1</td>
                                <td>Consulting Charge</td>
                                <td className='text-center'>1</td>
                                <td className='text-center'>500</td>
                                <td className='text-right'>500</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={2} className='totalReceivedText' style={{borderRight:'1px solid transparent'}}>
                                   <div><b>Amount Received in Cash</b></div>
                                   <div><b>{printConsultantFee}</b> </div>
                                </td>
                                <td colSpan={2} className='text-right' style={{borderRight:'1px solid transparent'}}>
                                    <div>
                                        <b>Net Amount</b>
                                    </div>
                                </td>
                                <td className='text-right'>
                                    <div> 
                                        <b>{printConsultantFee}</b>
                                    </div>
                                </td>
                               
                            </tr>
                        </tbody>
                    </table>              

                </div>

                <div className='signatureSection cert-top3'>
                    <div className='borderBottom'>Authorized  Signature</div>
                </div>

             <div className="opdSlipFooter">
                <a href="https://criteriontechnologies.com/" target="_blank" rel="noopener noreferrer">www.criteriontechnologies.com</a>
           </div>   
        </div>
       
        </>
    )
}
