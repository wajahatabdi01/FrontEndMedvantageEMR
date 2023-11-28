import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
// import '../Assets/CSS/Print.css'
import mainlogo from '../../../assets/images/Navbar/offcanvas-logo.png'
import '../../../../src/assets/css/CertificateCard.css'
import GetAllSaleByBillNo from '../API/GetAllSaleByBillNo'
import GetAllSale from '../API/GetAllSale'
import JsBarcode from 'jsbarcode';
import { json } from 'react-router-dom';




export default function SalePrint() {

    let [bool, setBool] = useState(true);
    let [dateTime, setDateTime] = useState();
    let [printdata, setPrintData] = useState([]);
    let [jsonPrintData, setJsonPrintData] = useState([]);
    let [billNo, setBillNo] = useState();
    let [uhid, setUhid] = useState();
    let [grossAmount, setGrossAmount] = useState();
    let [discount, setDiscount] = useState();
    let [netAmount, setNetAmount] = useState();
    let [billData, setBillData] = useState();
    let date = new Date()
    let [loginData, setLoginData] = useState([]);
    let [userName, setUserName] = useState('');


    let getPTData = async () => {
        let ptData = JSON.parse(window.sessionStorage.getItem("PrintSaleData"));
        // let ptData = JSON.parse(window.sessionStorage.getItem("PrintBillData"));
        console.log("ptData", ptData);
        setPrintData(ptData);
        // setBillData(ptData)
    }

    let functionGetLoginData = () => {
        let response = JSON.parse(window.sessionStorage.getItem("LoginData"));
        let getLoginData = response.clientdata
        console.log("getLoginData", getLoginData);
        setLoginData(getLoginData)
        let username = response
      setUserName(username)

    }

    const getPurchaseSubDetails = async () => {
        try {
            let allsaleresponse = await GetAllSale();

            if (allsaleresponse.status === 1) {
                const allSales = allsaleresponse.responseValue;

                if (allSales.length > 0) {
                    const lastSale = allSales[allSales.length - 1]; // Get the last element
                    const billNo = lastSale.billNo;
                    // const uhid = lastSale.uhid;
                    // const grossAmount = lastSale.grossAmount;
                    // const discount = lastSale.discount;
                    // const netAmount = lastSale.netAmount;
                    // const pmId = lastSale.pmId;
                    setBillNo(billNo);
                    // setUhid(uhid)
                    // setGrossAmount(grossAmount)
                    // setDiscount(discount)
                    // setNetAmount(netAmount)
                    // pmId(pmId)

                    // window.sessionStorage.setItem("PrintBillData", JSON.stringify({
                    //     "billNo": billNo, "uhid": uhid, "grossAmount": grossAmount, "discount": discount,
                    //     "netAmount": netAmount, "pmId": pmId

                    // }));
                    // Now, make the API request using the billNo
                    let salesubresponse = await GetAllSaleByBillNo(billNo);
                    console.log("salesubresponse", salesubresponse);

                    if (salesubresponse.status === 1) {
                        setJsonPrintData(salesubresponse.responseValue);

                    }
                } else {
                    console.log("No sales data available");
                }
            }
        } catch (e) {
            // Handle any errors that may occur during the API requests
        }


    };




    useEffect(() => {
        functionGetLoginData()
        setDateTime(date.toLocaleDateString() + " " + date.toLocaleTimeString());
        getPurchaseSubDetails()
        getPTData();
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
                    <div className='document-title'>SALE SLIP</div>
                </div>


                <div className="pat-dtls">
                    <table className='table-certificate cert-top1 border'>
                        <tbody className=''>



                            {printdata && <>
                                <tr className=''>

                                    <th>UHID : </th><td className='ps-3 fw-semibold'>{printdata.uhId}</td>
                                    <th>PMID: </th><td className='ps-3 fw-semibold'>{printdata.pmId}</td>
                                    <th>Bill No. : </th><td className='ps-3 pe-1 fw-semibold'>{printdata.billNo} </td>


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
                                <th>Batch No.</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>

                            </tr>
                        </thead>

                        <tbody style={{ height: '100px' }}>


                            {jsonPrintData && jsonPrintData.map((list, index) => {
                                return (


                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{list.productId}</td>
                                        <td>{list.unitName}</td>
                                        <td>{list.batchNo}</td>
                                        <td>{list.unitPrice}</td>
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
                                        <b>Net Amount :</b> {printdata.netAmount}
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
<div>
<div className='mt-3 pat-dtls cert-top2'> User Name : {userName.name}</div>
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
