import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
// import '../Assets/CSS/Print.css'

import '../../../../src/assets/css/CertificateCard.css'

import mainlogo from '../../../assets/images/Navbar/offcanvas-logo.png'

import Vector from "../../../assets/images/icons/Vector.svg";
import Contact from "../../../assets/images/icons/Contact.svg";



export default function PatientNotesPrint() {

    let [bool, setBool] = useState(true);
    let [dateTime, setDateTime] = useState();
    let [printdata, setPrintData] = useState([]);
    // let [jsonPrintData, setJsonPrintData] = useState([]);
    let [billNo, setBillNo] = useState();
    let [uhid, setUhid] = useState();
    let [grossAmount, setGrossAmount] = useState();
    let [discount, setDiscount] = useState();
    let [netAmount, setNetAmount] = useState();
    let [billData, setBillData] = useState();
    let date = new Date()


  
    const notesData = JSON.parse(window.sessionStorage.getItem("PrintPatientNotes"));
    let [patientData, setPatientData] = useState(JSON.parse(window.sessionStorage.getItem("IPDpatientList")))
    let [clientData, setClientData] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).clientdata)
    let [userName, setUseName] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).name)


    useEffect(() => {
        // functionGetLoginData()
        setDateTime(date.toLocaleDateString() + " " + date.toLocaleTimeString());
        // getPurchaseSubDetails()
        // getPTData();

        setTimeout(() => {
            handlepritnt();
        }, 1200)

    }, [])



    let handlepritnt = () => {
        document.title = 'Sale Slip'; // Set the desired title here
        setBool(false)
        window.print("");
        window.close();

    }
    return (

        <>

            <div className="opdSlipContainer pt-3">

                {/* ----------------Header Sec-------------- */}
                <div className="dis-hed">
                    <div className="discharge-logo">
                        <div className="logo-main">
                            <img src={mainlogo} alt="Company Logo"
                                style={{ width: "211px", }} />
                        </div>
                    </div>


                

                    <div className="CompanyDetailsHeading">
                        <div className="companyNameChallan">
                            {clientData.clientName}
                        </div>
                        <div className="companyLocation">
                            {clientData.address}
                        </div>
                        <div className="companyContact">
                            <img src={Vector} alt=""></img> {clientData.emailID}

                            <img src={Contact} alt=""></img> {clientData.mobileNo}
                        </div>
                    </div>

                </div>

            


                <div className="pat-dtls">
                    <div className='document-title'>Patient Details</div>
                    <table className='table-certificate_ border-bottom_ tableWhiteSmoke mt-2_'>
                        <tbody>                                                                                                                                                                 
                           
                            <tr>
                             
                                <td>
                                    <div className="whiteSmokeheader">CRNO</div>
                                    <div className="containerDetails">{patientData[0].crNo}</div>
                                </td>

                                <td>
                                    <div className="whiteSmokeheader">Gender</div>
                                    <div className="containerDetails">{patientData[0].gender}</div>
                                </td>

                                <td>
                                    <div className="whiteSmokeheader">Patient Name</div>
                                    <div className="containerDetails">{patientData[0].patientName}</div>
                                </td>

                                <td>
                                    <div className="whiteSmokeheader">Age</div>
                                    <div className="containerDetails">{patientData[0].age} {patientData[0].agetype}</div>
                                </td>

                            </tr>

                            <tr>
                                <td>
                                    <div className="whiteSmokeheader">Patient Mobile No</div>
                                    <div className="containerDetails">{patientData[0].mobileNo}</div>
                                </td>

                                <td>
                                    <div className="whiteSmokeheader"> Address</div>
                                    <div className="containerDetails">{patientData[0].address}</div>
                                </td>
                                <td colSpan={2}>
                                    <div className="whiteSmokeheader">Consultant Name</div>
                                    <div className="containerDetails">{patientData[0].name}</div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>


                <div className="pat-dtls cert-top2" >
                    <div className='document-title'>{notesData.noteName ? notesData.noteName : 'Progress Note'}</div>
                    <table className='table-certificate_ border-bottom_ tableWhiteSmoke mt-2_'>
                        <thead>
                            <tr>
                                
                              
                                <th className='text-center'>Date</th>
                                <th className='text-center'>Time</th>
                                <th className='text-center'>{notesData.noteName ? notesData.noteName : 'Progress Note'}</th>
                               


                            </tr>
                        </thead>

                        <tbody style={{ height: '100px' }}>

                                    <tr>                                                                            
                                        <td className='text-center'>{notesData.detailsDate}</td>
                                        <td className='text-center'>{notesData.detailsTime}</td>
                                        <td className='text-center'><div dangerouslySetInnerHTML={{ __html:notesData.details }} style={{ lineHeight: '2px', margin: '2px', padding: '2px' }}/></td>
                                    </tr>
                                                                                                                                                       
                        </tbody>
                    </table>
                </div>



                <div className='cert-title-details cert-top3 d-flex justify-content-between'>
                    <div><b>User Name : {userName}</b></div><div><b>Authorised Signature</b></div>
                </div>

                <div className="opdSlipFooter">
                    <a href="https://criteriontechnologies.com/" target="_blank" rel="noopener noreferrer">www.criteriontechnologies.com</a>
                </div>
            </div >

        </>
    )
}
