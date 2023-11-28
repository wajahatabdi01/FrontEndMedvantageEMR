import React, { useEffect, useState } from 'react'
import JsBarcode from 'jsbarcode';
// import mainlogo from '../../../assets/images/Navbar/offcanvas-logo.png'
import mainlogo from '../../../assets/images/Navbar/blankLogo.svg'

export default function PrintAdmitDetails() {
    let date = new Date()
    let [bool, setBool] = useState(true);
    let [dateTime, setDateTime] = useState();
    let [printdata, setPrintData] = useState([]);
    let [loginData, setLoginData] = useState([]);

    // let getPTData = async () => {
    //     let ptData = JSON.parse(window.sessionStorage.getItem("PrintAdmitDetailsQR"));
    //     setPrintData(ptData);
    // }
    let [data, setData] = useState(JSON.parse(window.sessionStorage.getItem("PrintAdmitDetailsQR")))

    let functionGetLoginData = ()=> {      
        let response = JSON.parse(window.sessionStorage.getItem("LoginData"));            
        let getLoginData = response.clientdata        
        setLoginData(getLoginData)        
       }

    useEffect(() => {
        functionGetLoginData();
        //get data from lop
        // console.log("daTA",data)
        JsBarcode("#barcode", data.uhid, { height: '24px', displayValue: false });
       
        setDateTime(date.toLocaleDateString() + " " + date.toLocaleTimeString());
        // getPTData()
        setTimeout(() => {
            handlepritnt();
        }, 1000)
    }, []);
    let handlepritnt = () => {
        document.title = 'Admit Patient Slip'; // Set the desired title here
        setBool(false)
        window.print("");
        window.close();


    }
    return (
        <>
            {/* <table>
            <tbody>
            <tr><td> <img id="barcode" /></td></tr>
            <tr>
                <td>
                    UHID :
                </td>
                <td>
                    {data.uhid}
                </td>
            </tr>
                <tr>
                    <td>Name:</td>
            
                    <td>{data.patientData.patientName}</td>
                </tr>
                <tr>
                    <td>Age/Gender:</td>
            
                    <td>{data.patientData.age}/ {data.patientData.gender}</td>
                </tr>
                
            </tbody>
            <tbody>
            <tr><td> <img id="barcode" /></td></tr>
            <tr>
                <td>
                {t("Uhid")} :
                </td>
                <td>
                {t("Uhid")} :
                </td>
                <td>
                    {data.uhid}
                </td>
            </tr>
                <tr>
                    <td>{t("NAME")}:</td>
            
                    <td>{data.patientData.patientName}</td>
                </tr>
                <tr>
                    <td>{t("Age/Gender")}:</td>
            
                    <td>{data.patientData.age}/ {data.patientData.gender}</td>
                </tr>
                
            </tbody>
        </table> */}



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
                    {/* <div className='address'>{loginData.address}</div> */}                   
                    <div style={{ width: '127px' }}> <img id="barcode" style={{ width: '100%' }}/></div> 
                    <div className='phone text-right'> {dateTime}</div>                        
                    </div>

                </div>
               

                <div className="pat-dtls text-center">
                    <div className='document-title'>ADMIT PATIENT SLIP</div>
                </div>               


                <div className="pat-dtls">
                    <table className='table-certificate cert-top1 border'>
                        <tbody className=''>
                            {/* <div className='document-title fs-6'>ADMIT PATIENT DETAILS</div> */}
                            <tr className=''>
                                <th>UHID : </th><td className='ps-3 fw-semibold'>{data.uhid}</td>
                                <th>Patient Name : </th><td className='ps-3 fw-semibold'>{data.patientData.patientName}</td>
                                <th>Gender : </th><td className='ps-3 pe-1 fw-semibold'>{data.patientData.gender} </td>


                            </tr>

                            <tr>
                                <th>CR. No. : </th><td className='ps-3 fw-semibold'>{data.patientData.crNo}</td>
                                <th>Age : </th><td className='ps-3 fw-semibold'>{data.patientData.age}</td>
                                <th>Mobile No. : </th><td className='ps-3 fw-semibold'>{data.patientData.mobileNo}</td>


                            </tr>

                        </tbody>
                    </table>


                    {/* <table className='table-certificate cert-top3 border'>
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
                                    <b>Net Amount</b>
                                </div>
                            </td>
                            <td>
                                <div>

                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table> */}

                </div>

                <div className="pat-dtls">
                <div className='document-title cert-top2 fs-6'>Ward Details</div>
                    <table className='table-certificate border'>
                        <tbody className=''>
                            {/* <div className='document-title fs-6'>WARD DETAILS</div> */}
                            <tr className=''>
                                <th>Department Name : </th><td className='ps-3 fw-semibold'>{data.departmentId}</td>
                                <th>Ward Name : </th><td className='ps-3 fw-semibold'>{data.wardID}</td>
                                <th>Bed No. : </th><td className='ps-3 pe-1 fw-semibold'>{data.bedId} </td>
                                <th>Doctor's Name : </th><td className='ps-3 fw-semibold'>{data.doctorId}</td>

                            </tr>

                        </tbody>
                        <tbody>
                            <tr>
                                <td  className='totalReceivedText' style={{ borderRight: '1px solid transparent' }}>
                                    <div> Amount Received in Cash</div>
                                    <div> </div>
                                </td>
                                <td colSpan={7} className='totalReceivedText'>{data.cashpayment}</td>
                                {/* <td colSpan={5} className='text-center' style={{ borderRight: '1px solid transparent' }}>
                                    <div>
                                        <b>Net Amount</b>
                                    </div>
                                </td> */}
                                

                            </tr>
                        </tbody>
                    </table>


                    {/* <table className='table-certificate cert-top3 border'>
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
                                    <b>Net Amount</b>
                                </div>
                            </td>
                            <td>
                                <div>

                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table> */}

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
