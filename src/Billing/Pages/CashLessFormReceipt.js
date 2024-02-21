import React, { useState } from "react";
import { useEffect } from "react";
import mainlogo from "../../../src/assets/images/Navbar/offcanvas-logo.png";
import "../../assets/css/CertificateCard.css";
import Vector from "../../assets/images/icons/Vector.svg";
import Contact from "../../assets/images/icons/Contact.svg";

export default function CashLessFormReceipt() {

  let [FormPrint, setFormPrint] = useState();
  let [FormDetails, setFormDetails] = useState();
  const [clientData , setclientData] = useState()

  var converter = require("number-to-words");

  let getBillingDetails = () => {
    console.log('object show'); 
    let data =JSON.parse(window.sessionStorage.getItem("CashlessFormData"));      
     console.log('itemDitemD>datadata', data);
    setFormPrint(data);
 
 
}


const ClientData=()=>{
  let data = JSON.parse(window.sessionStorage.getItem("LoginData")).clientdata;
  console.log('ClientData' , data)
  setclientData(data)
}


  useEffect(() => {
    getBillingDetails()
    ClientData()

    setTimeout(() => {
      handlepritnt();
    }, 1200);
  }, []);
  //Amount in Words

  // let pDeatails = 'Demo - UHID00181';

  // useEffect(() => {
  //     console.log('this is useEffect>');
  // getBillingDetails();
  // document.title = `Cash Bill: ${pDeatails}`; // Set the desired title here

  // setTimeout(() => {
  //     handlepritnt();
  // }, 1200)

  // }, [])

  let handlepritnt = () => {
    document.title = "Cashless request slip";
    window.print("");
    window.close('')
  };

  let Username = JSON.parse(window.sessionStorage.getItem("LoginData"));
  return (
    <>
     {FormPrint &&
        <div className="card-wrapper main-content bg white pt-5">
          <div className="quater-border right-top"></div>
          <div className="quater-border left-bottom"></div>
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
            <div className="document-title">Patient Details</div>
            <table className="table-certificate_ border-bottom_ tableWhiteSmoke mt-2">
              <tbody>
              <tr>
              <td>
                <div className="whiteSmokeheader">UHID</div>
                   <div className="containerDetails">{FormPrint.uhid}</div>
                  </td>
            
                <td>
                  <div className="whiteSmokeheader">Patient Name</div>
                   <div className="containerDetails">{FormPrint.patientName} </div>
                   </td>

                <td>
                  <div className="whiteSmokeheader">Age</div>
                   <div className="containerDetails">{FormPrint.age}y</div>
                   </td>

                <td>
                  <div className="whiteSmokeheader">Gender</div>
                   <div className="containerDetails">{FormPrint.Gender} </div>
                </td>

                </tr>

                <tr>

                <td>
                  <div className="whiteSmokeheader">Patient Occupation</div>
                   <div className="containerDetails">{FormPrint.patientOccupation == '' ? '---' : FormPrint.patientOccupation } </div>
                   </td>
                <td>
                  <div className="whiteSmokeheader">Corporate Name</div>
                   <div className="containerDetails">{FormPrint.corporateName == '' ? '---' : FormPrint.corporateName} </div>
                   </td>
                <td>
                  <div className="whiteSmokeheader">Employee ID</div>
                   <div className="containerDetails">{FormPrint.employeeId == '' ? '---' : FormPrint.employeeId} </div>
                   </td>
                <td>
                  <div className="whiteSmokeheader">Patient Contact Number</div>
                   <div className="containerDetails">{FormPrint.mpbile} </div>
                   </td>
                   </tr>

                   <tr>
                <td>
                  <div className="whiteSmokeheader">Attending Relative Name</div>
                   <div className="containerDetails">{FormPrint.attendingRelative} </div>
                   </td>
                <td colSpan={3}>
                  <div className="whiteSmokeheader">Attending Relative Relation</div>
                   <div className="containerDetails">{FormPrint.relationId} </div>
                   </td>
    
              </tr>
              </tbody>
             
  
            </table>
          </div>


          <div className="pat-dtls mt-2">
            <div className="document-title mt-2">Patient Insurance Details</div>
            <table className="table-certificate_ border-bottom_ tableWhiteSmoke">
              <tbody>
                  <tr>
                <td>
                <div className="whiteSmokeheader"> Company Name</div>
                   <div className="containerDetails">{FormPrint.tpaCompanyID} </div>
                </td>
      
                <td>
                <div className="whiteSmokeheader">Card Number</div>
                   <div className="containerDetails">{FormPrint.cardNo}</div>
                </td>
                <td>
                <div className="whiteSmokeheader">Policy Number</div>
                   <div className="containerDetails">{FormPrint.policyNo}</div>
                  </td>
              </tr>

              </tbody>
            
        
      
            </table>
          </div>
          <div className="pat-dtls">
            <div className="document-title">Another Insurance Details</div>
            <table className="table-certificate_ border-bottom_ tableWhiteSmoke">
              <tbody>
                    <tr>
                <td>
                <div className="whiteSmokeheader">Another Company Name</div>
                   <div className="containerDetails">{FormPrint.anotherInsuranceName == '' ? '---' : FormPrint.anotherInsuranceName}</div>
                 </td>
                <td>
                <div className="whiteSmokeheader">Other Detail</div>
                   <div className="containerDetails">{FormPrint.anotherInsurance == '' ? '---' : FormPrint.anotherInsurance }</div>
                   </td>
              </tr>
              </tbody>
          
            
        
      
            </table>
          </div>

         {/* ---------------------------Declaration---------------------- */}

         <div className="mt-4" style={{minHeight: '551px'}}> 
         <div className="document-title" style={{textAlign: 'center'}}>DECLARATION BY THE PATIENT/REPRESENTATIVE</div>
            <ol type="a" className="mt-3">
              <li className ="" style={{color: 'gray' , fontSize: '11px'}}>
                   I agree to allow the hospital to submit all original documents pertaining to hospitalization to the lnsurer/ T.P.A
                  after the discharge. I agree to sign on the Final Bill & the Discharge Summary, before my discharge
              </li>
              <li className ="" style={{color: 'gray' , fontSize: '11px'}}>
              Payment to hospital is governed by the terms and conditions of the policy. In case the Insurer/ TPA is not liable
                    to settle the hospital bill, I undertake to settle the bill as per the terms and conditions of the policy.
              </li>
              <li className ="" style={{color: 'gray' , fontSize: '11px'}}>
              All non-medical expenses and expenses not relevant to current hospitalization and the amounts over & above
              the limit authorized by the lnsurer/ T.P.A not governed by the terms and conditions of the policy will be paid
              by me.
              </li>
              <li className ="" style={{color: 'gray' , fontSize: '11px'}}>
              I hereby declare to abide by the terms and conditions of the policy and if at any time the facts disclosed by me
              are found to be false or incorrect I forfeit my claim and agree to indemnify the Insurer/ T.P.A
              by me.
              </li>
              <li className ="" style={{color: 'gray' , fontSize: '11px'}}>
               I agree and understand that T.P.A is in no way warranting the service of the hospital & that the Insurer/ TPA is
               in no way guaranteeing that the services provided by the hospital will be of a particular quality or standard.
              </li>
              <li className ="" style={{color: 'gray' , fontSize: '11px'}}>
                I hereby warrant the truth of the forgoing particulars in every respect and I agree that if I have made or shall
                make any false or untrue statement, suppression or concealment with respect to the claim, my right to claim
                reimbursement of the said expenses shall be absolutely forfeited
              </li>
              <li className ="" style={{color: 'gray' , fontSize: '11px'}}>
              I agree to indemnify the hospital against all expenses incurred on my behalf, which are not reimbursed by the
              Insurer/TPA.
              </li>
              <li className ="" style={{color: 'gray' , fontSize: '11px'}}>
              “I/We authorize Insurance Company TPA to contact me/us through mobile/email for any update on this claim”.
              </li>
           </ol>
           <div className="pat-dtls">
       
            <table className="table-certificate border-bottom_">
              <tr>
                <td>Patient Name</td>
                <td className="value text-decoration-underline"></td>
                <td>Contact Number</td>
                <td className="value text-decoration-underline"></td>
              </tr>
              <tr>
                <td>Email ID (optional)</td>
                <td className="value text-decoration-underline"></td>
           
              </tr>
              <tr>
                <td>Patient’s / Insured’s Signature:</td>
                <td className="value text-decoration-underline"></td>
                <td>Date</td>
                <td className="value text-decoration-underline"></td>
           
              </tr>
        
    
            </table>
          </div>
         </div>

          
          {/* ---------------------------Examination---------------------- */}

          {/* <div className='cert-title cert-top1'>Your Expected Time Of Test: - 06/07/2023 06:54 PM</div> */}
          {/* <div className='cert-title-details cert-top3 fs-6'><b><i>Your Expected Time Of Test: - 06/07/2023 06:54 PM</i></b></div> */}
          <div className="cert-title-details cert-top3 d-flex justify-content-between">
            <div>
              <b>User Name : {Username.name}</b>
            </div>
            <div>
              <b>Authorised Signature</b>
            </div>
          </div>
        </div>
   }
    </>
  );
}
