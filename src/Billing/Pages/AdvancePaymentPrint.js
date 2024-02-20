import React, {useState} from 'react'
import { useEffect } from 'react';
import mainlogo from '../../../src/assets/images/Navbar/offcanvas-logo.png'
import EraLogo from '../../../src/assets/images/icons/EraLogo.png'
import '../../assets/css/CertificateCard.css';
import Vector from "../../assets/images/icons/Vector.svg";
import Contact from "../../assets/images/icons/Contact.svg";



export default function AdvancePaymentPrint() {    

   
    let [AdvancePrint, setAdvancePrint] = useState();   
    const [clientData , setclientData] = useState()


   

    let GetDepositAmountDetails = () => {
        console.log('object show'); 
        let data =JSON.parse(window.sessionStorage.getItem("DepositAmountDetails"));      
        setAdvancePrint(data);
    }

    
    const ClientData=()=>{
        let data = JSON.parse(window.sessionStorage.getItem("LoginData")).clientdata;
        console.log('ClientData' , data)
        setclientData(data)
      }


    useEffect(() => {
        GetDepositAmountDetails(); 
        ClientData()
     
        setTimeout(() => {
       handlepritnt();
        }, 1200)
    }, []);

    //Amount in Words

    
   
    // let pDeatails = 'Demo - UHID00181';  

    
    

    // useEffect(() => {
    //     console.log('this is useEffect>');
        // GetDepositAmountDetails();         
        // document.title = `Cash Bill: ${pDeatails}`; // Set the desired title here

        // setTimeout(() => {
        //     handlepritnt();
        // }, 1200)
       
   // }, [])

   
    let handlepritnt = () => {
        document.title = 'Deposit Amount Receipt';        
        window.print("");
        window.close();

    }

    let Username =JSON.parse(window.sessionStorage.getItem("LoginData"));  
    return (
        <>
        { AdvancePrint && 
            <div className="card-wrapper main-content pt-5" style={{background: 'white'}}>  
            <div className='quater-border right-top'></div>
            <div className='quater-border left-bottom'></div>             
                {/* ----------------Header Sec-------------- */}
              <div
                className="dis-hed"
                style={{
                  height: "auto",
                  padding: "8px",
                  background: "rgb(245 245 245)",
                  alignItems: "center",
                }}
              >
                <div className="">
                  <img
                    src={clientData.logoUrl}
                    alt="Company Logo"
                    style={{width: "211px", }}
                  />
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
           
            {/* -----------------------Patient's Details------------------- */}           
               
                <div className="pat-dtls">
                <div className='Challanheading text-center mt-2'style={{fontSize: '17px'}}>Receipt</div>

                <div className="Challanheading mt-4" style={{fontSize: '14px'}}>Patient Details</div>
                <div className='mt-2' style={{minHeight:'830px'}}>
                    <table className='table-certificate border'>
                      
                        <tr>
                            <td>UHID</td>                           
                            <td className='value'>{AdvancePrint.uhid}</td>
                            <td>Patient Name</td>                           
                            <td className='value'>{AdvancePrint.patientName}</td>

                        </tr>
                        <tr>
                            <td>Deposit Amount</td>
                            <td className='value'>{AdvancePrint.patientAge}</td>
                            <td>Gender</td>
                            <td className='value'>{AdvancePrint.patientGender}</td>
                        </tr>

                        <div className="Challanheading mt-4" style={{fontSize: '14px'}}>Deposit Amount Details</div>

                        <tr className='mt-2'>
                            <td>Deposit Amount</td>
                            <td className='value'>{AdvancePrint.advanceLimit}</td>
                            <td>Deposited By</td>
                            <td className='value'>{AdvancePrint.advanceSumitedBy}</td>
                        </tr>
                        <tr>
                            <td>Contact No</td>
                            <td className='value'>{AdvancePrint.contactNo}</td>
                            <td>Payment Mode</td>
                            <td className='value'>{AdvancePrint.Payment}</td>
                        </tr>
                    </table>
                    </div>
                  
                    
                </div>  

                    
                
             


                
           
                {/* ---------------------------Examination---------------------- */}
                
                   
                    

                    {/* <div className='cert-title cert-top1'>Your Expected Time Of Test: - 06/07/2023 06:54 PM</div> */}
                    {/* <div className='cert-title-details cert-top3 fs-6'><b><i>Your Expected Time Of Test: - 06/07/2023 06:54 PM</i></b></div> */}
                    <div className='cert-title-details cert-top3 d-flex justify-content-between'>
                      <div><b>User Name : {Username.name}</b></div><div><b>Authorised Signator</b></div>                        
                    </div>
            </div>
}
        </>
    )
}
