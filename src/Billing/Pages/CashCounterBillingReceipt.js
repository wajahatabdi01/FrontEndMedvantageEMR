import React, {useState} from 'react'
import { useEffect } from 'react';
// import EraLogo from '../../../src/assets/images/icons/EraLogo.png'
import '../../assets/css/CertificateCard.css'
// import Vector from "../../assets/images/icons/Vector.svg";
// import Contact from "../../assets/images/icons/Contact.svg";



export default function CashCounterBillingReceipt() {    

   
    let [billPrint, setBillPrint] = useState();   
    let [itmeDetailByBill, setItmeDetailByBill] = useState();
    const [clientData , setclientData] = useState()

    var converter = require('number-to-words');

    let getBillingDetails = () => {
        
        let data =JSON.parse(window.sessionStorage.getItem("PrintBillingDetails"));      
       
       setBillPrint(data[0]);
       let itemD = JSON.parse(data[0].itemDetails);
  
       setItmeDetailByBill(itemD);
     
    }


    const ClientData=()=>{
      let data = JSON.parse(window.sessionStorage.getItem("LoginData")).clientdata;
     
      setclientData(data)
    }



    useEffect(() => {
        getBillingDetails(); 
        ClientData()

        setTimeout(() => {
            handlepritnt();
        }, 1200)
      
    }, []);

    //Amount in Words

    
   
    // let pDeatails = 'Demo - UHID00181';  

    
    

    // useEffect(() => {
   
        // getBillingDetails();         
        // document.title = `Cash Bill: ${pDeatails}`; // Set the desired title here

        // setTimeout(() => {
        //     handlepritnt();
        // }, 1200)
       
   // }, [])

   
    let handlepritnt = () => {
        document.title = 'Billing Slip';        
        window.print("");
        window.close();

    }

    let Username =JSON.parse(window.sessionStorage.getItem("LoginData"));  
    return (
        <>
        { billPrint && 
            <div className="card-wrapper main-content pt-5 bg-white">  
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
                    {/* <img src={Vector} alt=""></img> {clientData.emailID}
                    
                    <img src={Contact} alt=""></img> {clientData.mobileNo} */}
                  </div>
                </div>
                
              </div>
           
            {/* -----------------------Patient's Details------------------- */}           
              
                <div className="pat-dtls">
                <div className='document-title'>{billPrint.billType === 1 ? 'Bill Details' : 'Receipt Details'}</div>


                    <table className='table-certificate_ border-bottom_ tableWhiteSmoke mt-2_'>
                      <tbody>
                             <tr>
                              <td>
                                 <div className="whiteSmokeheader">Bill No</div>
                                 <div className="containerDetails">{billPrint.billNo}</div>
                              </td>
                   
                            <td>
                            <div className="whiteSmokeheader">Bill Date</div>
                                 <div className="containerDetails">{billPrint.billDate}</div>
                             </td>
                            <td>
                            <div className="whiteSmokeheader">UHID</div>
                                 <div className="containerDetails">{billPrint.uhId}</div>
                              </td>
                            <td>
                            <div className="whiteSmokeheader">CRNO</div>
                                 <div className="containerDetails">{billPrint.crNo}</div>
                              </td>
                        </tr>
                   
                   
                        <tr>
                        <td>
                               <div className="whiteSmokeheader">IPNO</div>
                                 <div className="containerDetails">{billPrint.ipNo}</div>
                          </td>
                          
                            <td>
                                 <div className="whiteSmokeheader">Gender</div>
                                 <div className="containerDetails">{billPrint.gender}</div>
                              </td>
                             
                             <td>
                                  <div className="whiteSmokeheader">Patient Name</div>
                                 <div className="containerDetails">{billPrint.patientName}</div>
                              </td>
                           
                            <td>
                                <div className="whiteSmokeheader">Age</div>
                                 <div className="containerDetails">{billPrint.age} {billPrint.agetype}</div>
                              </td>
                        </tr>
                       
                     
                        <tr>
                            <td>
                                <div className="whiteSmokeheader">Patient Mobile No</div>
                                 <div className="containerDetails">{billPrint.mobileNo}</div>
                              </td>
                           
                            <td>
                                <div className="whiteSmokeheader"> Ward Name</div>
                                 <div className="containerDetails">{billPrint.wardName}</div>
                             </td>
                             <td colSpan={2}>
                                <div className="whiteSmokeheader">Department</div>
                                 <div className="containerDetails">{billPrint.departName}</div>
                              </td>

                        </tr>

                        </tbody>
                    </table>
                  
                    
                </div>  
                    
                
             

                <div className="pat-dtls cert-top2" > 
                <div className='document-title'>Items/Service Detail</div>
                    <table className='table-certificate_ border-bottom_ tableWhiteSmoke mt-2_'>
                        <thead>
                            <tr>
                               <th className='text-center'>#</th>
                               <th>Item/Service </th>
                               <th className='text-center'>Unit</th>
                               <th className='text-right'>Rate (Rs)</th>
                               <th className='text-right'>Discount. (Rs)</th>
                               <th className='text-right'>Total Amount. (Rs)</th>
                            </tr>
                        </thead>
                       
                        <tbody>

                        {itmeDetailByBill && itmeDetailByBill.map((val, ind) => {
                            return( 
                           <tr key={ind}>
                              <td className='text-center'>{ind + 1}</td>
                                <td>{val.itemName}</td>
                                 <td className='text-center'>{val.itemQuantity}</td>
                                  <td className='text-right'>{val.itemCharge}</td>
                                    <td className={'text-right'}>{val.totalDiscount}</td>
                                     <td className='text-right'>{val.totalAmount - val.totalDiscount}</td>
                                  </tr>                                          
                                  )
                                    })}
 
                              <tr>
                                <td className='text-right' colSpan={5}>Gross Amount(Rs)</td>
                                   <td className='text-right'>{billPrint.totalAmountSum}</td>
                                 </tr>
                     
                             <tr>
                                <td className='text-right' colSpan={5}>Total Discount(Rs)</td>
                                  <td className='text-right'>{billPrint.totalDiscountSum}</td>
                                 </tr>                     
                    
            
                             <tr>
                               <td className='text-right' colSpan={5} >Net Amount(Rs)</td>
                               <td className='text-right'>{billPrint.totalAmountSum - billPrint.totalDiscountSum}</td>
                               </tr>

                             <tr>
                               <td className='text-right' colSpan={4}>Net Amount in words</td>
                                 <td className='text-right' colSpan={2}>{converter.toWords(billPrint.totalAmountSum - billPrint.totalDiscountSum).toUpperCase() }</td>
                                </tr>

                      </tbody>
                      

                    </table>
                </div>
 
                
                       <div className="pat-dtls cert-top2" style={{minHeight : '260px'}}> 
              
                      <table className='table-certificate_ border-bottom_ tableWhiteSmoke mt-2_'>       
                        <div className='document-title'>Payment Details</div>    

                       <tbody>
                          <tr>
                             <td style={{width:'50%'}}><strong>Paid Amount(Rs)</strong></td>
                             <td className='value'><strong>{billPrint.totalPaidAmount}</strong> </td>
                         </tr>

             
                         <tr className={`${billPrint.paymentMode == 0 ? 'd-none' : ''}`}> 
                           <td>{billPrint.paymentMode == 0 ? "" : 'Payment Mode'} </td>
                             <td className='value'>{billPrint.paymentMode == 1 ? "By Cash" : billPrint.paymentMode}</td>
                         </tr>

                 </tbody>

                </table>
                </div>
                {/* ---------------------------Examination---------------------- */}
                
                   
                    

                    {/* <div className='cert-title cert-top1'>Your Expected Time Of Test: - 06/07/2023 06:54 PM</div> */}
                    {/* <div className='cert-title-details cert-top3 fs-6'><b><i>Your Expected Time Of Test: - 06/07/2023 06:54 PM</i></b></div> */}
                    <div className='cert-title-details cert-top3 d-flex justify-content-between'>
                      <div><b>User Name : {Username.name}</b></div><div><b>Authorised Signature</b></div>                        
                    </div>
            </div>
}
        </>
    )
}
