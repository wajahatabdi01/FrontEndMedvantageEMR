import React, { useEffect, useState } from 'react'
// import logomain from '../../../assets/images/Navbar/offcanvas-logo.png'
import logomain from '../../../assets/images/Navbar/blankLogo.svg'
import ImgBarcode from '../../../assets/images/OPD/barcodedemo.png'
import waterMark from '../../../assets/images/Navbar/water-mark.png'
import '../../../assets/css/CertificateCard.css'
import { useSelector } from 'react-redux'

export default function OpdPrintout() {

    let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    let DepartmentId = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId
    // let organizationName = JSON.parse(window.sessionStorage.getItem("name")).name
    // let organizationAddress = JSON.parse(window.sessionStorage.getItem("address")).address
    // let organizationContact = JSON.parse(window.sessionStorage.getItem("mobileNo")).mobileNo  

    // console.table("LocalStorage",organizationName, organizationAddress,organizationContact)
    let patientsendData = useSelector((state) => state.PatientSendData["patientSendData"])
    let [printData, setPrintData] = useState([])
    
    
    
    
   

    let [investdata, setInvestdata] = useState([])
    let [activeWard, setactiveWard] = useState()
    let dateY = new Date().getFullYear()
    let dateM = new Date().getMonth()
    let dateD = new Date().getDate()
    let getData = async () => {
        setactiveWard(JSON.parse(window.sessionStorage.getItem("activePage")))
        let patientdata = JSON.parse(window.sessionStorage.getItem("patientsendData"))
        let tempSendData = {}
        investdata = JSON.parse(window.sessionStorage.getItem("Invest"))
        setInvestdata(investdata)
        patientdata.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activePatient) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonArray") {

                        tempSendData["jsonArray"] = val.jsonArray

                    }
                    else if (key[0] === "jsonInvestigation") {
                        tempSendData["jsonInvestigation"] = val.jsonInvestigation

                    }
                    else if (key[0] === "jsonVital") {
                        tempSendData["jsonVital"] = val.jsonVital

                    }
                    else if (key[0] === "jsonDiagnosis") {

                        if (tempSendData.jsonDiagnosis != undefined || tempSendData.jsonDiagnosis != null) {
                            tempSendData["jsonDiagnosis"] = [...tempSendData.jsonDiagnosis, ...val.jsonDiagnosis]

                        }
                        else {
                            tempSendData["jsonDiagnosis"] = val.jsonDiagnosis

                        }

                    }
                    else if (key[0] === "jsonFood") {
                        if (tempSendData.jsonDiagnosis != undefined || tempSendData.jsonDiagnosis != null) {
                            tempSendData["jsonDiagnosis"] = [...tempSendData.jsonDiagnosis, ...val.jsonFood]

                        }
                        else {
                            tempSendData["jsonDiagnosis"] = val.jsonFood

                        }
                    }
                    else if (key[0] === "nextVisitDate") {

                        tempSendData["nextVisitDate"] = val.nextVisitDate


                    }
                    else if (key[0] === "adviseWardName") {

                        tempSendData["wardName"] = val.adviseWardName


                    }
                    else if (key[0] === "jsonallergies") {

                        tempSendData["allergies"] = val.jsonallergies


                    }

                }
            })
        })
        let temparray = tempSendData.jsonArray
        tempSendData.jsonArray.map((val, ind) => {
            if (val.id === 0 && val.drugName === "") {
                temparray.splice(ind, 1)
            }
        })
        tempSendData["jsonArray"] = temparray


        let temp = JSON.parse(window.sessionStorage.getItem("patientList"))
        // console.log("dadasd", temp)
        let patientData = JSON.parse(window.sessionStorage.getItem("LoginData"))
        
        temp.map((val, ind) => {
            if (val.uhId === activePatient) {
                tempSendData["patientData"] = val
            }
        })
        tempSendData["userData"] = patientData
        tempSendData["userId"] = window.userId
        tempSendData["uhId"] = activePatient
        tempSendData["deptId"] = DepartmentId
        tempSendData["dataClient"] = patientData.clientdata
        // tempSendData["dataClientBrandLogo"] = patientData.clientdata.logoUrl
        setPrintData(tempSendData)       
        
    }

    useEffect(() => {
        getData()
        // patientPersonaldata()
        // console.log("dssdd", printData)
        setTimeout(() => {
            window.print()
            window.close()
        }, 1000)      
        

    }, [])
    // let handlePrint=()=>{
    //     console.log("cdsj")
    //     window.print()
    // }
    return (
        <>
            <div className='card-wrapper'>
                <div className='quater-border right-top'></div>
                <div className='quater-border left-bottom'></div>
                {/* <div className='waterMark'><img src={waterMark} /></div> */}
                {printData.dataClient &&
                <div className='water-mark'>                
                {/* {printData.dataClient.logoUrl == null ? <img src={logomain} alt='Brand Logo' title='Brand Logo'/> : <img src={printData.dataClient.logoUrl} alt='Brand Logo' title='Brand Logo'/>} */}
                <div className='clientText'>{printData.dataClient.clientName}</div>
                </div>
                }
                {/* -----------------------------------------Header Section-------------------------------------- */}

                <table className='tableHeaderFooter'>
                    <thead>
                        <tr>
                            <td>
                                <div className='dis-hed'>
                                {printData.dataClient &&
                                    <div className="logo-main">
                                        {/* <img src={logomain} style={{ width: '100%' }} /> */}
                                        {printData.dataClient.logoUrl == null ? <img src={logomain} alt='Brand Logo' title='Brand Logo'/> : <img src={printData.dataClient.logoUrl} alt='Brand Logo' title='Brand Logo'/>}
                                    </div>
                                }

                                    <div className="address-section">
                                        {printData.dataClient &&
                                            <>
                                             {/* {printData.dataClient.logoUrl == null ? <img src={logomain} alt='Brand Logo' title='Brand Logo'/> : <img src={printData.dataClient.logoUrl} alt='Brand Logo' title='Brand Logo'/>} */}
                                                {/* {console.log("printData.userData", printData.dataClient.address)} */}
                                                <div className='organizationName'> {printData.dataClient.clientName}</div>
                                                <div className='organizationAddress'> {printData.dataClient.address}</div> 
                                                {printData.dataClient.emailID == null ? '' : <div className='email'>Email: {printData.dataClient.emailID}</div>}                        
                                                {printData.dataClient.mobileNo == null ? '' : <div className='organizationContact'>Phone: +{printData.dataClient.countryCode} {printData.dataClient.mobileNo}</div>}
                                            </>}
                                    </div>


                                    {/* <div className="address-section">
    <div className='organizationName'> {organizationName} </div>
    <div className='organizationAddress'> {organizationAddress}</div>
    <div className='organizationContact'>PHONE : {organizationContact}</div>
</div> */}

                                    <div className='pres-inn' style={{ textAlign: 'right' }}>
                                        {/* <div className='address'><strong>Date:&nbsp;{dateD + "/" + dateM + "/" + dateY}</strong></div> */}
                                        <div className='phone'><strong>UHID:&nbsp;{printData.uhId}</strong></div>
                                        {/* <div style={{ width: '127px' }}><img src={ImgBarcode} style={{ width: '100%' }} /></div> */}
                                    </div>

                                </div>

                                <div className="pat-dtls text-center"><div className='document-title'> OPD PRESCRIPTION</div></div>
                                {/* ----------------------------Patient Information--------------------------------------- */}
                                <div className='pat-dtls'>
                                    {printData.length != 0 ?
                                        <table className='table-certificate cert-top1'>
                                            <tr>
                                                <td><strong>Patient Name</strong></td>
                                                <td>: <span style={{ paddingLeft: '5px' }}>{printData.patientData.patientName}</span></td>
                                                <td><strong>Department</strong></td>
                                                <td>:<span style={{ paddingLeft: '5px' }}>{activeWard.departmentName}</span></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Gender/Age</strong></td>
                                                {console.log("object, ", printData.patientData)}
                                                <td>:<span style={{ paddingLeft: '5px' }}>{printData.patientData.age} {printData.patientData.ageUnit}/{printData.patientData.gender}</span></td>
                                                <td><strong>Prescribed By</strong></td>
                                                <td>:<span style={{ paddingLeft: '5px' }}>{printData.userData.name}</span></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Address</strong></td>
                                                <td>:<span style={{ paddingLeft: '5px' }}>ERA MEDICAL COLLEGE </span></td>
                                                <td><strong>Consultant Name</strong></td>
                                                <td>:<span style={{ paddingLeft: '5px' }}>{printData.userData.name}</span></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Phone No</strong></td>
                                                <td>:<span style={{ paddingLeft: '5px' }}>{printData.patientData.mobileNo}</span></td>
                                                <td><strong>Next Visit Date</strong></td>
                                                <td>:<span style={{ paddingLeft: '5px' }}>{printData.nextVisitDate}</span></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Visit No</strong></td>
                                                <td>:<span style={{ paddingLeft: '5px' }}>{printData.patientData.crNo}</span></td>
                                                {/* <td><strong>Appointment Date</strong> </td>
                                                <td>:<span style={{ paddingLeft: '5px' }}>...</span></td> */}
                                            </tr>
                                        </table>
                                        : ""}
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <hr />
                                <div className='pat-dtls'>
                                    {/* <div className='document-title'>Diagnostic Details</div> */}
                                    <table className='table-certificate cert-top1'>
                                        {/* {printData.jsonDiagnosis.map(()=>{return})} */}
                                        <tr>
                                            <td><strong>Consultant Diagnosis:</strong></td>
                                            <td>
                                                {printData.jsonDiagnosis && printData.jsonDiagnosis.map((val, ind) => {
                                                    if (val.pdmId === 4) {
                                                        return (<span className='commaSeparatedValues'>
                                                            {val.problemName}
                                                        </span>)
                                                    }
                                                })}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{ width: '20%' }}><strong>Patient Complaint:</strong></td>
                                            <td>
                                                {printData.jsonDiagnosis && printData.jsonDiagnosis.map((val, ind) => {
                                                    if (val.pdmId === 2) {
                                                        return (<span className='commaSeparatedValues'>
                                                            {val.problemName}
                                                        </span>)
                                                    }
                                                })}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><strong>History of Patient Illness:</strong></td>
                                            <td>
                                                {printData.jsonDiagnosis && printData.jsonDiagnosis.map((val, ind) => {
                                                    if (val.pdmId === 6) {
                                                        return (<span className='commaSeparatedValues'>
                                                            {val.problemName}
                                                        </span>)
                                                    }
                                                })}
                                            </td>
                                        </tr>


                                    </table>
                                </div>

                                {/* ----------------------------Prescribed Medicine--------------------------------------- */}
                                {printData.jsonArray && printData.jsonArray.length !== 0 ?
                                    <div className='pat-dtls'>
                                        {/* <div className='document-title'>Prescribed Medicine</div> */}
                                        <table className='table-certificate border-bottom mt-2 mb-5'>
                                            <thead>
                                                <tr className='border-bottom'>
                                                    <th colSpan={4} style={{ fontSize: '17px' }}>Rx</th>
                                                </tr>
                                                <tr className='border-bottom'>
                                                    <th>Medicine</th>
                                                    {/* <th>Dosage Form</th> */}
                                                    {/* <th>Strength</th> */}
                                                    <th>Dosages</th>
                                                    <th>Duration</th>
                                                    <th>Remark</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {printData.jsonArray && printData.jsonArray.map((val, ind) => {
                                                    return (
                                                        <tr>
                                                            <td>{val.drugName}</td>
                                                            {/* <td>{val.dosageForm}</td>
                                        <td>{val.dosageStrength}</td> */}
                                                            <td>{val.doseFrequency}</td>
                                                            <td>{val.duration != -1 ? val.duration : ""}</td>
                                                            <td>{val.remark}</td>
                                                        </tr>
                                                    )
                                                })}


                                            </tbody>
                                        </table>
                                    </div>
                                    : ""}

                                {investdata && investdata.length !== 0 ?
                                    <div className='pat-dtls'>
                                        <div className='document-title fs-6'>Suggested Investigations</div>
                                        <table className='table-certificate border-bottom mt-2 mb-5'>
                                            <thead>
                                                <tr className='border-bottom'>
                                                    <th>Test Name</th>
                                                    {/* <th>Remark</th>
                                                    <th>Instruction</th> */}

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {investdata && investdata.map((val, ind) => {
                                                    console.log("vvv", val)
                                                    return (
                                                        <tr>
                                                            <td>{val}</td>
                                                            {/* <td>&nbsp;</td>
                                                            <td>&nbsp;</td>
                                                            <td>{val.drugName}</td>
                                                            <td>{val.dosageStrength}</td> */}

                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                    : ""}

                                {/* ----------------------------Advice Given--------------------------------------- */}

                                <div className='pat-dtls'>
                                    {/* <div className='document-title'>Diagnostic Details</div> */}
                                    <table className='table-certificate cert-top1'>
                                        <tr className='border-bottom'>
                                            <th colSpan={4} style={{ fontSize: '17px' }}>Given Advice</th>
                                        </tr>
                                        {/* {printData.jsonDiagnosis.map(()=>{return})} */}
                                        <tr>

                                            <td><strong>Recommended Diet Advice:</strong></td>
                                            <td>
                                                {printData.jsonDiagnosis && printData.jsonDiagnosis.map((val, ind) => {
                                                    console.log('val diet : ', val)
                                                    if (val.pdmId === 9) {
                                                        return (<span className='commaSeparatedValues'>
                                                            {val.problemName}
                                                        </span>)
                                                    }
                                                })}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{ width: '20%' }}><strong>Food To Be Avoided Advice:</strong></td>
                                            <td>
                                                {printData.jsonDiagnosis && printData.jsonDiagnosis.map((val, ind) => {
                                                    if (val.pdmId === 10) {
                                                        return (<span className='commaSeparatedValues'>
                                                            {val.problemName}
                                                        </span>)
                                                    }
                                                })}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{ width: '20%' }}><strong>Other Advice:</strong></td>
                                            <td>
                                                {printData.jsonDiagnosis && printData.jsonDiagnosis.map((val, ind) => {
                                                    if (val.pdmId === 11) {
                                                        return (<span className='commaSeparatedValues'>
                                                            {val.problemName}
                                                        </span>)
                                                    }
                                                })}
                                            </td>
                                        </tr>
                                        {/* <tr>

                                            <td style={{ width: '20%' }}><strong>Admission Advice:</strong></td>
                                            <td> (<span className='commaSeparatedValues'>
                                                {printData.wardName}
                                            </span>)</td>

                                        </tr> */}
                                    </table>
                                </div>

                                {/* <div className='pat-dtls'>
                                    <table className='table-certificate cert-top1'>
                                        <tr className='border-bottom'>
                                            <th colSpan={4} style={{ fontSize: '17px' }}>Allergies</th>
                                        </tr>
                                        <tr>

                                            <td><strong>Food:</strong></td>
                                            <td>
                                                {printData.allergies && printData.allergies.map((val, ind) => {
                                                    if (val.pdmId === 7) {
                                                        return (<span className='commaSeparatedValues'>
                                                            {val.problemName}
                                                        </span>)
                                                    }
                                                })}
                                            </td>
                                        </tr>
                                        <tr>

                                            <td><strong>Medicine:</strong></td>
                                            <td>
                                                {printData.allergies && printData.allergies.map((val, ind) => {
                                                    if (val.pdmId === 8) {
                                                        return (<span className='commaSeparatedValues'>
                                                            {val.problemName}
                                                        </span>)
                                                    }
                                                })}
                                            </td>
                                        </tr>
                                    </table>
                                </div> */}

                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                {/* --------------------------------------Signature Section------------------------------------- */}

                                <div className='pat-dtls'>
                                    <div className='d-flex justify-content-end'>
                                        <table className="table-certificate cert-top1" style={{ maxWidth: '200px' }}>
                                            {printData.length != 0 ?
                                                <tr>
                                                    <td><span className='consultantSign'>{printData.userData.name}</span></td>
                                                </tr>
                                                : ""}
                                        </table>
                                    </div>

                                </div>


                                <div className='document-title-h'>In case of emergency the patient can also consult any other doctor</div>
                            </td>
                        </tr>
                    </tfoot>
                </table>








            </div>

        </>
    )
}
