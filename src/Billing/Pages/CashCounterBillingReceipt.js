import React, {useState} from 'react'
import { useEffect } from 'react';
import mainlogo from '../../../src/assets/images/Navbar/offcanvas-logo.png'
import '../../assets/css/CertificateCard.css'



export default function CashCounterBillingReceipt() {    

   
    let [billPrint, setBillPrint] = useState();   
    let [itmeDetailByBill, setItmeDetailByBill] = useState();

    var converter = require('number-to-words');

    let getBillingDetails = () => {
        console.log('object show'); 
        let data =JSON.parse(window.sessionStorage.getItem("PringBillingDetails"));      
        // console.log('itemDitemD>datadata', data[0]);
       setBillPrint(data[0]);
       let itemD = JSON.parse(data[0].itemDetails);
    console.log('itemDitemD>', itemD);
       setItmeDetailByBill(itemD);
     
    }


    useEffect(() => {
        getBillingDetails(); 

        setTimeout(() => {
            handlepritnt();
        }, 1200)
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
        document.title = 'Billing Slip';        
        window.print("");
        window.close();

    }

    let Username =JSON.parse(window.sessionStorage.getItem("LoginData"));  
    return (
        <>
        { billPrint && 
            <div className="card-wrapper main-content mt-5 pt-3">  
            <div className='quater-border right-top'></div>
            <div className='quater-border left-bottom'></div>             
                {/* ----------------Header Sec-------------- */}
                <div className="dis-hed">
                    <div className="discharge-logo">
                        <div className="logo-main">
                            <img src={mainlogo} />
                        </div>
                    </div>
                    <div className="address-section">
                        <div className='address'>K.No-3, Sarfarazganj, Hardoi road, Lucknow, UP-226003</div>
                        <div className='email'>info@medvantage.com</div>
                        <div className='phone'>+91-7795688088</div>                        
                    </div> 
                </div>
           
            {/* -----------------------Patient's Details------------------- */}           
               
                <div className="pat-dtls">
                <div className='document-title'> {billPrint.tpaCompanyID ? 'Credit Bill Details' : 'Cash Bill Details'}</div>

                
                    <table className='table-certificate'>
                        <tr>
                            <td>Bill No</td>
                            <td className='value'>{billPrint.billNo}</td>
                            <td>Bill Date</td>
                            <td className='value'>{billPrint.billDate}</td>
                        </tr>
                        <tr>
                            <td>UHID</td>                           
                            <td className='value'>{billPrint.uhId}</td>
                            <td>CRNO</td>
                            <td className='value'>{billPrint.crNo}</td>
                        </tr>
                        <tr>
                            <td>IPNO</td>
                            <td className='value'>{billPrint.ipNo}</td>
                            <td>Gender</td>
                            <td className='value'>{billPrint.gender}</td>
                        </tr>
                        <tr>
                            <td>Patient Name</td>
                            <td className='value'>{billPrint.patientName}</td>
                            <td>Age</td>
                            <td className='value'>{billPrint.age} {billPrint.agetype}</td>
                        </tr>
                        <tr>
                            <td>Patient Mobile No</td>
                            <td className='value'>{billPrint.mobileNo}</td>
                            <td>Ward Name</td>
                            <td className='value'>{billPrint.wardName}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td className='value' colSpan={3}>{billPrint.departName}</td>                           
                        </tr>
                        <tr>
                            <td><b>Consultant Name</b></td>
                            <td colSpan={3}><b>{billPrint.drName}</b></td>                            
                        </tr>
                    </table>
                  
                    
                </div>  
                    
                
             

                <div className="pat-dtls cert-top2"> 
                <div className='document-title'>Test Details</div>
                    <table className='table-certificate border'>
                        <thead>
                            <tr>
                               <th className='text-center'>#</th>
                               <th>Items</th>
                                <th>Category</th> 
                               <th className='text-right'>Charges (Rs)</th>
                               <th className='text-center'>Qty.</th>
                               <th className='text-right'>Dis. (Rs)</th>
                               <th className='text-right'>Total Amt. (Rs)</th>
                            </tr>
                        </thead>
                       
                        <tbody>

                        {itmeDetailByBill && itmeDetailByBill.map((val, ind) => {
                        return(
                           
                           <tr key={ind}>
                            <td className='text-center'>{ind + 1}</td>
                            <td>{val.itemName}</td>
                             <td></td> 
                            <td className='text-right'>{val.itemCharge}</td>
                            <td className='text-center'>{val.itemQuantity}</td>
                            <td className='text-right'>{val.totalDiscount}</td>
                            <td className='text-right'>{val.totalAmount}</td>
                           </tr>                                          
 )
})}
                           <tr>
                            <td colSpan={5} className='text-right'><b>Grand Total (Rs)</b></td>
                            <td className='text-right'><b>{billPrint.totalDiscountSum}</b></td>
                            <td className='text-right'><b>{billPrint.totalAmountSum}</b></td>
                           </tr>
                           
                          
                      
                        </tbody>

                    </table>
                </div>

                
                <div className="pat-dtls cert-top2"> 
                <div className='document-title'>Amount Details</div>
                <table className='table-certificate border-bottom'>                      
                 <tbody>
                    <tr>
                     <td style={{width:'50%'}}>Paid Amount(Rs)</td>
                     <td className='value'>: {billPrint.totalPaidAmount}</td>
                    </tr>

                    <tr>                        
                     <td>Amount In Words</td>
                     <td className='value' id='paidWords'>: {converter.toWords(billPrint.totalPaidAmount)}</td>
                    </tr>
                    <tr>

                     <td>Balance Amount(Rs) </td>
                     <td className='value'>: {billPrint.totalBalanceAmount}</td>
                    </tr>
               
                    <tr>
                     <td>TPA Reference No </td>
                     <td className='value'>: {billPrint.tpaReferenceNo === '' ? 'Not Applicable' : billPrint.tpaReferenceNo }</td>
                    </tr>
                    {/* {billPrint.paymentMode == 0 ? "" : 'Payment Mode'} */}
             
                    <tr className={`${billPrint.paymentMode == 0 ? 'd-none' : ''}`}> 
                     <td>{billPrint.paymentMode == 0 ? "" : 'Payment Mode'} </td>
                     <td className='value'>: {billPrint.paymentMode == 0 ? "" : billPrint.paymentMode == "1" ? 'By Cash' : 'Card' && billPrint.paymentMode == "2" ? 'By Card' : 'Cash' && billPrint.paymentMode == "3" ? "By Cheque" : 'Card' && billPrint.paymentMode == "4" ? 'Online' : 'By Cheque'}</td>
                    </tr>


                    <tr>
                     <td>Advance Balance Amount(Rs)</td>
                     <td className='value'>: {billPrint.advanceBalance}</td>
                    </tr>

                    <tr>
                     <td>Discount by/ Narration</td>
                     <td className='value'>:  {billPrint.discountRemark}</td>
                    </tr>

                 </tbody>
                </table>
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
