import React, { useEffect, useState } from 'react'
import JsBarcode from 'jsbarcode';
// import mainlogo from '../../../assets/images/Navbar/offcanvas-logo.png'
import mainlogo from '../../assets/images/Navbar/blankLogo.svg'

export default function PrintBloodDonorRegistration() {
    let date = new Date()
    let [bool, setBool] = useState(true);
    let [dateTime, setDateTime] = useState();
    let [printdata, setPrintData] = useState([]);
    let [loginData, setLoginData] = useState([]);

    // let getPTData = async () => {
    //     let ptData = JSON.parse(window.sessionStorage.getItem("PrintAdmitDetailsQR"));
    //     setPrintData(ptData);
    // }
    let [data, setData] = useState(JSON.parse(window.sessionStorage.getItem("PrintDonorRegistration")))

    let functionGetLoginData = ()=> {      
        let response = JSON.parse(window.sessionStorage.getItem("LoginData"));            
        let getLoginData = response.clientdata        
        setLoginData(getLoginData)        
       }

    useEffect(() => {
        functionGetLoginData();
        //get data from lop
       
        // JsBarcode("#barcode", data.uhid, { height: '24px', displayValue: false });
        // window.print("");
        setDateTime(date.toLocaleDateString() + " " + date.toLocaleTimeString());
        // getPTData()
        setTimeout(() => {
            handlepritnt();
        }, 1000)
    }, []);
    let handlepritnt = () => {
        document.title = 'Blood Donor Registration Print'; // Set the desired title here
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
                    {/* <div className='address'>{loginData.address}</div> */}                   
                    <div style={{ width: '127px' }}> <img id="barcode" style={{ width: '100%' }}/></div> 
                    <div className='phone text-right'> {dateTime}</div>                        
                    </div>

                </div>
               

                <div className="pat-dtls text-center">
                    <div className='document-title'>BLOOD DONOR REGISTRATION SLIP</div>
                </div>               


                <div className="pat-dtls">
                    <table className='table-certificate cert-top1 border'>
                        <tbody className=''>
                            {/* <div className='document-title fs-6'>ADMIT PATIENT DETAILS</div> */}
                            <tr className=''>
                                <th>Donor Id : </th><td className='ps-3 fw-semibold'>{data.id}</td>
                                <th>Donor Name : </th><td className='ps-3 fw-semibold'>{data.donorName}</td>
                                <th>DOB : </th><td className='ps-3 pe-1 fw-semibold'>{data.dob} </td>
                            </tr>

                            <tr>
                                <th>Gender : </th><td className='ps-3 fw-semibold'>{data.gender}</td>
                                <th>Blood-Group : </th><td className='ps-3 fw-semibold'>{data.groupName}</td>
                                <th>Identity Type : </th><td className='ps-3 fw-semibold'>{data.idName}</td>
                            </tr>

                            <tr>
                                <th>Identity No. : </th><td className='ps-3 fw-semibold'>{data.identityNumber}</td>
                                <th>Contact : </th><td className='ps-3 fw-semibold'>{data.contactNumber}</td>
                                <th>Address : </th><td className='ps-3 fw-semibold'>{data.address}</td>
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
