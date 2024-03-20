import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
// import '../Assets/CSS/Print.css'
import mainlogo from '../../../assets/images/Navbar/offcanvas-logo.png'
import '../../../../src/assets/css/CertificateCard.css'

import JsBarcode from 'jsbarcode';
import { json } from 'react-router-dom';

import GetAllOtherPurchase from '../API/GetAllOtherPurchase';


export default function PurchasePrint() {

    let [bool, setBool] = useState(true);
    let [dateTime, setDateTime] = useState();
    let [printdata, setPrintData] = useState([]);
    let [jsonPrintData, setJsonPrintData] = useState([]);
    let [billNo, setBillNo] = useState();
    let date = new Date()



    let getPTData = async () => {
        let ptData = JSON.parse(window.sessionStorage.getItem("PrintPurchaseData"));
        setPrintData(ptData);
    }

    const getPurchaseSubDetails = async () => {
        setBillNo(billNo)
        try {
            let ptData = JSON.parse(window.sessionStorage.getItem("PrintPurchaseData"));
           
            const billNo = ptData.billNo;
         
            let purchasesubresponse = await GetAllOtherPurchase(billNo);
            
            if (purchasesubresponse.status === 1) {
                setJsonPrintData(purchasesubresponse.responseValue)
                

            }


        } catch (e) {

        }
    }



    useEffect(() => {
      
        setDateTime(date.toLocaleDateString() + " " + date.toLocaleTimeString());
        getPurchaseSubDetails()
        getPTData();
        setTimeout(() => {
            handlepritnt();
        }, 1200)

    }, [])



    let handlepritnt = () => {
        document.title = 'Purchase Slip'; // Set the desired title here
        setBool(false)
        window.print("");
        window.close();

    }
    return (

        <>

            <div className="opdSlipContainer">

                {/* ----------------Header Sec-------------- */}
                <div className="dis-hed">
                    <div className="discharge-logo">
                        <div className="logo-main">
                            <img src={mainlogo} />
                        </div>
                    </div>


                    <div className="address-section">
                        <div className='proprietor'>Medvantage Hospital</div>
                        <div className='proprietor'>ميدوانتاج  مستشفى</div>
                        {/* <div className='phone'>+91-7795688088</div>                         */}
                        <div className='phone'> {dateTime}</div>
                    </div>

                </div>

                <div className="pat-dtls">
                    <div className='document-title'>PURCHASE SLIP</div>
                </div>


                <div className="pat-dtls">
                    <table className='table-certificate cert-top1 border'>
                        <tbody className=''>



                            {printdata && <>
                                <tr className=''>

                                    <th>Supplier Name : </th><td className='ps-3 fw-semibold'>{printdata.supplierId}</td>
                                    <th>Bill No. : </th><td className='ps-3 fw-semibold'>{printdata.billNo}</td>
                                    <th>Invoice Date : </th><td className='ps-3 pe-1 fw-semibold'>{printdata.dateOfPurchase} </td>


                                </tr>

                                <tr>
                                    <th>Gross Amount: </th><td className='ps-3 fw-semibold'>{printdata.grossAmount}</td>
                                    <th>Discount: </th><td className='ps-3 fw-semibold'>{printdata.discount}</td>
                                    <th>Net Amount : </th><td className='ps-3 fw-semibold'>{printdata.netAmount}</td>


                                </tr>


                            </>
                            }
                        </tbody>
                    </table>


                    <table className='table-certificate cert-top3 border'>
                        <thead>

                            <tr>
                                <th>S.No</th>
                                <th>Item Name</th>
                                <th>Unit Name</th>
                                <th>HSN Code</th>
                                <th>Batch No.</th>
                                <th>Purchase Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>

                        <tbody style={{ height: '100px' }}>


                            {jsonPrintData && jsonPrintData.map((list, index) => {
                                return (


                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{list.productId}</td>
                                        <td>{list.unitId}</td>
                                        <td>{list.hsnCodeId}</td>
                                        <td>{list.batchNo}</td>
                                        <td>{list.purchasePrice}</td>
                                        <td>{list.quantity}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                        <tbody>
                            <tr>
                                <td colSpan={2} className='totalReceivedText' style={{ borderRight: '1px solid transparent' }}>
                                    <div> Amount Received in Cash</div>
                                    <div> </div>
                                </td>
                                <td colSpan={2} className='text-center' style={{ borderRight: '1px solid transparent' }}>
                                    <div>
                                        <b>Net Amount</b>
                                    </div>
                                </td>
                                <td>
                                    <div>

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
