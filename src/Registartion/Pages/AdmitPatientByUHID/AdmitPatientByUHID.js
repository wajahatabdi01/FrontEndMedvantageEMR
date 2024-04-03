import React, { useEffect, useState } from 'react'
// import Heading from '../../../Components/Heading'
// import TableContainer from '../../../Components/TableContainer'
// import BoxHeading from '../../../Clinical/PatientMonitorDashboard/Components/BoxHeading'
import GetDepartmentList from '../../API/GET/GetDepartmentList'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import GetWardList from '../../API/GET/GetWardList'
import GetAPIWardMaster from '../../../Admin/Api/Master/WardMasterAPI/GetAllBedAssignByWardId'
import GetWardMaster from '../../../Admin/Api/Master/WardMasterAPI/GetAPIWardMaster'
import GetDoctorList from '../../API/GET/GetDoctorList'
import PostInsuranceDetails from '../../API/POST/PostInsuranceDetails'
import GetRegisterDetailsByUHID from '../../API/GET/GetRegisterDetailsByUHID'
import GetInsuranceCompanyList from '../../API/GET/GetInsuranceCompanyList'
import GetAdmitDetailsByUhid from '../../API/GET/GetAdmitDetailsByUhid'
import POSTAdmitPatientByUHID from '../../API/POST/POSTAdmitPatientByUHID'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import Toster from '../../../Component/Toster'
import AdmitPatientValidation from '../../../Validation/Registartion/AdmitPatientValidation'
// import JsBarcode from 'jsbarcode';
//Icons
import uhidIcon from "../../../assets/images/icons/UHID1.svg";
import patientNameIcon from "../../../assets/images/icons/patientOPD.svg";
import ageIcon from "../../../assets/images/icons/ageIcon.svg";
import mobileNoIcon from "../../../assets/images/icons/smartphone.svg";
import wardIcon from "../../../assets/images/icons/ward.svg";
import genderIcon from "../../../assets/images/icons/genders.svg";
import doctorIcon from "../../../assets/images/icons/assistance.svg";
import saveBtnIcon from "../../../assets/images/icons/save.svg";
import clearBtnIcon from "../../../assets/images/icons/clear.svg";
import AutoComplete from '../../../Component/AutoComplete'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function AdmitPatientByUHID() {

    let [departmentList, setDepartmentList] = useState()
    let [wardList, setWardList] = useState()
    let [bedList, setBedList] = useState()
    let [doctorList, setDoctorList] = useState()
    let [patientData, setPatientData] = useState([])
    let [patientSendData, setPatientSendData] = useState({
        uhid: "",
        departmentId: "",
        wardID: "",
        doctorId: "",
        bedId: "",

        // insurancecompany : "",
        

    })
    let [clearDropdown, setClearDropdown] = useState(0)
    let [departmentId, setDepartmentId] = useState('')
    let [wardID, setWardID] = useState('')
    let [uhid, setUhid] = useState('')
    let [bedName, setBedName] = useState('')
    let [doctorId, setDoctorId] = useState('')
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [paymentType, setPaymentType] = useState(0);
    let [cashpayment, setCashpayment] = useState('');
    let [CardNo, setCardNo] = useState('');
    let [insuranceCompany, setinsuranceCompany] = useState(0);
    let [InsuranceCompanyList, setInsuranceCompanyList] = useState([]);
    let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);

const GetInsuranceList = async()=>{
    let InsuranceList = await GetInsuranceCompanyList()
    if(InsuranceList.status === 1){
        setInsuranceCompanyList(InsuranceList.responseValue)
       
    }
}

    const { t } = useTranslation();
    let getData = async () => {
        let responseDepartment = await GetDepartmentList()
        let responseDoctor = await GetDoctorList()
        if (responseDepartment.status === 1) {
            let tempArr = [];
            if (responseDepartment.responseValue.length > 0) {
                for (var i = 0; i < responseDepartment.responseValue.length; i++) {
                    if (responseDepartment.responseValue[i].categoryId === 1) {
                        tempArr.push(responseDepartment.responseValue[i])
                    }
                }
            }
            setDepartmentList(tempArr)
        }
        if (responseDoctor.status === 1) {
            setDoctorList(responseDoctor.responseValue)
        }
    }

    let handleChange = async (e) => {
        let name = e.target.name
        let value = e.target.value

       
        if (name === "uhid") {

            let response = await GetRegisterDetailsByUHID(value)
            if (response.status === 1) {
                setPatientData(response.responseValue.admittedPatientDetails[0])
                
            }
            setUhid(value)
        }
        if (name === "departmentId") {
            let responseWard = await GetWardList(value)
            if (responseWard.status === 1) {
                setWardList(responseWard.responseValue)
            }
        }
        else if (name === "wardID") {
            let responseWard = await GetAPIWardMaster(value)
            if (responseWard.status === 1) {
                setBedList(responseWard.responseValue)
                
            }
        }
        // if (name === "cashpayment") {
        //     setCashpayment(value)
        // }
        // if(name === "insuranceCompany"){
        //     setinsuranceCompany(value)
        // }
        // if(name=== "cardNo"){
        //     setCardNo(value)
        // }




        setPatientSendData(patientSendData => ({ ...patientSendData, [name]: value }))
    }

    let handleSave = async () => {
        // SaveInsuranceDetails();
     

        let UHID = ""
        let bedL = ""
        
        let validationreponse = AdmitPatientValidation(patientSendData.uhid, patientSendData.departmentId, patientSendData.wardID, patientSendData.doctorId, patientSendData.bedId)
        if (validationreponse[0]) {
            setShowUnderProcess(1)
            let response = await POSTAdmitPatientByUHID(patientSendData)
         
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data save successfully!")
                handleClear(1);
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
                // UHID = uhid;
                // let allptresponse = await GetAdmitDetailsByUhid(UHID);
             
                // if (allptresponse.status === 1) {
                //     const allPt = allptresponse.responseValue.admittedPatientDetails[0];
                //     // if (allPt.length > 0) {
                //     //     const lastPt = allPt[allPt.length - 1]; // Get the last element
                //     const deptL = allPt.ptDep;
                //     const wardL = allPt.ward;
                //     const bedL = allPt.ptBed;
                //     const doctorL = allPt.consultant;
                
                   
                //     // window.sessionStorage.setItem("PrintAdmitDetailsQR", JSON.stringify({"patientData":patientData, "uhid":patientSendData.uhid}))
                //     // const wardIDD = wardID;
                //     // const departmentIdd = departmentId;
                //     window.sessionStorage.setItem("PrintAdmitDetailsQR", JSON.stringify({
                //         "patientData": patientData, "uhid": patientSendData.uhid, "cashpayment": patientSendData.cashpayment, "departmentId": deptL,
                //         "wardID": wardL,  "bedId": bedL, "doctorId": doctorL
                //     }))
                //     window.open("/printAdmitDetails/", 'noopener,noreferrer');
                //     setTimeout(() => {
                //         setShowToster(0)
                //         setTosterValue(0)
                //         handleClear(1)
                //         setPatientSendData([])
                //     }, 2000)

                //     // window.sessionStorage.setItem("UHIDQRData", JSON.stringify({"patientData":patientData, "uhid":patientSendData.uhid}))
                //     // window.open("/ipdPrint/", '_blank', 'noopener,noreferrer');
                // }
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
             
                setTosterMessage(response.responseValue ? response.responseValue : "Data Not Saved")
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                    setTosterValue(0)
                }, 2000)
            }
        }
        else {
            setShowToster(1)
            setTosterMessage(validationreponse[1])
            setTosterValue(2)
            setTimeout(() => {
                setShowToster(0)
                setTosterValue(0)
            }, 2000)
        }
        // SaveInsuranceDetails()
    }

let SaveInsuranceDetails = async()=>{
    const obj = {
        uhid: uhid,
        tpaCompanyID: insuranceCompany, 
        cardNo: CardNo, 
        userId: userID
        }
       
        let data = await PostInsuranceDetails(obj)
        if(data.status === 1){
        setShowToster(1)

    }
}

    let handleClear = (value) => {
        setClearDropdown(value)
        setCashpayment('');
        document.getElementById("uhid").value = "";
        setPatientData([]);
        setPaymentType(0);
    }
    let handlePaymentChange = () => {
        let ddlPatmentType = parseInt(document.getElementById('ddlPaymentType').value);
        if (ddlPatmentType === 1) {
            setPaymentType(1)
        }
        else if (ddlPatmentType === 2) {
            setPaymentType(2)
        }
        else {
            setPaymentType(0)
        }
    }
    useEffect(() => {
        getData()
        GetInsuranceList()
    }, [])
    document.body.dir = i18n.dir();
    return (
        <div className='main-content mt-5 py-3'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="med-box">
                            <div className="title">{t("Admit_Details")}</div>
                        </div>
                    </div>


                    <div className="admidp-in">
                        <div className="admidp">
                            <div className="med-box1" >
                                <div className="fieldsett-in">
                                    <div className="fieldsett" style={{ paddingBottom: '21px' }}>
                                        <span className='fieldse'>{t("Patient_Details")}</span>
                                        <div className='row'>
                                            <div className="col-12">

                                                <div className="med-table-section_1 mt-2">
                                                    <table className="med-table border_ striped">
                                                        <tbody>
                                                            <tr>
                                                                <td><img src={uhidIcon} className='icnn' alt='' />{t("UHID")}</td>
                                                                <td>
                                                                    <input type="text" className='registrationinput ps-2' id="uhid" name='uhid' placeholder={t("UHID")} onChange={handleChange} />
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td><img src={patientNameIcon} className='icnn' alt=''  />{t("Patient_Name")}:</td>
                                                                <td><strong>{patientData && patientData.patientName} {patientData.lastName?patientData.lastName:''}</strong></td>
                                                            </tr>

                                                            <tr>
                                                                <td><img src={genderIcon} className='icnn' alt=''  />{t("Gender")}:</td>
                                                                <td><strong>
                                                                    {patientData && patientData.gender}
                                                                </strong></td>
                                                            </tr>

                                                            <tr>
                                                                <td><img src={ageIcon} className='icnn' alt=''  />{t("Age")}:</td>
                                                                <td><strong> {patientData && patientData.age}{patientData.ageType ? patientData.ageType : ''}</strong></td>
                                                                
                                                            </tr>

                                                            <tr>
                                                                <td><img src={mobileNoIcon} className='icnn' alt=''  />{t("Mobile_No")}:</td>
                                                                <td> <strong>{patientData && patientData.mobileNo}</strong>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>{t("CR_No")}:</td>
                                                                <td> <strong>{patientData && patientData.crNo}</strong></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="admidp">
                            <div className="med-box1">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("Ward_Details")}</span>


                                        <div className='row'>
                                            <div className="col-12">

                                                <div className="med-table-section_ mt-2">

                                                    <table className="med-table border_ striped">
                                                        <tbody>
                                                            <tr>
                                                                <td>{t("Department")}</td>
                                                                <td className=' d-flex justify-content-end'>

                                                                    <div className='registrationinput'>
                                                                        {departmentList &&
                                                                            <DropdownWithSearch defaulNname={t("Select_Department")} name="departmentId" list={departmentList} valueName="id" displayName="departmentName" editdata={""} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                                                                            // <AutoComplete suggestions={departmentList} searchKey="departmentName"/>
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td><img src={wardIcon} className='icnn' alt='' />{t("ward")}</td>
                                                                <td className=' d-flex justify-content-end'>
                                                                    <div className='registrationinput'>
                                                                        {wardList &&
                                                                            <DropdownWithSearch defaulNname={t("Select_Ward")} name="wardID" list={wardList} valueName="wardId" displayName="wardName" getvalue={handleChange} editdata={""} clear={clearDropdown} clearFun={handleClear} />
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>{t("Bed")}</td>
                                                                <td className=' d-flex justify-content-end'>
                                                                    <div className='registrationinput'>
                                                                        
                                                                        {bedList &&

                                                                            <DropdownWithSearch defaulNname={t("select_Bed")} name="bedId" list={bedList} valueName="bedId" displayName="bedName" getvalue={handleChange} editdata={""} clear={clearDropdown} clearFun={handleClear} />
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td><img src={doctorIcon} className='icnn' alt='' />{t("Doctor's_Name")}</td>
                                                                <td className=' d-flex justify-content-end'> <div className='registrationinput'>
                                                                    {doctorList &&
                                                                        <DropdownWithSearch defaulNname={t("Doctor's_Name")} name="doctorId" list={doctorList} valueName="id" displayName="name" getvalue={handleChange} editdata={""} clear={clearDropdown} clearFun={handleClear} />
                                                                    }
                                                                </div></td>
                                                            </tr>

 
                                                        </tbody>
                                                    </table>


                                                </div>
                                            </div>

                                            <div className='col-12 mt-2'>
                                                <div className='med-table-section_ mt-2'>
                                                    <table className='med-table border_ striped paytbl'>
                                                        <tbody>
                                                            {/* <tr className="d-flex-justify-content-between">
                                                                <td className="col-md-6">
                                                                    <div className="col-md-6 mb-2">
                                                                        <label htmlFor="ddlPaymentType" className="form-label">{t("Payment_Type")}</label><span class="starMandatory">*</span>
                                                                       
                                                                        <select className="form-select form-select-sm" id="ddlPaymentType" aria-label=".form-select-sm example" onChange={handlePaymentChange}>
                                                                            <option value="0">{t("Select_Payment_Type")}</option>
                                                                            <option value="1">{t("Cash")}</option>
                                                                            <option value="2">{t("Insurance")}</option>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                {paymentType === 1
                                                                    ? <td className=' d-flex justify-content-end'>

                                                                        <input type="number" className='registrationinput ps-2' id="txtCashPayment" name='cashpayment' placeholder='Enter Payment' value={cashpayment} onChange={handleChange} />
                                                                       </td>
                                                                    : ''}

                                                                {paymentType === 2
                                                                    ? <td className=' d-flex'>
                                                                        <div className="mb-2 col-md-6 mt-1">
                                                                            <label htmlFor="ddlInsuranceCompany" className="form-label">{t("Insurance_Company")}</label>  <span class="starMandatory">*</span>
                                                                            <select value={insuranceCompany} name="insuranceCompany" className="form-select form-select-sm" id="ddlInsuranceCompany" aria-label=".form-select-sm example" onChange={handleChange} >
                                                                                <option value="0">Select Insurance Company</option>
                                                                                  {InsuranceCompanyList && InsuranceCompanyList.map((data , index)=>{
                                                                                    return(
                                                                                        <option key={index} value={data.id}>{data.companyname}</option>
                                                                                    )
                                                                                  })}
                                                                            </select>
                                                                        </div>
                                                                        <td className='mb-2'>
                                                                        <label htmlFor="ddlInsuranceCompany" className="form-label">{t("Card Number")}</label>
                                                                        <input type="text" value={CardNo} className='registrationinput ps-2' id="cardNo" name='cardNo' placeholder='Enter Card Number' onChange={handleChange} />
                                                                       </td>
                                                                    </td>
                                                                    : ''}



                                                            </tr> */}

                                                            <tr>
                                                                <td colSpan={5}>
                                                                    {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                                                        <>
                                                                            {showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> :
                                                                                <div className='d-flex justify-content-end'>
                                                                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveBtnIcon} className='icnn' />{t("Save")} </button>
                                                                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearBtnIcon} className='icnn' />{t("Clear")}</button>
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    }

                                                                </td>
                                                            </tr>

                                                        </tbody>

                                                    </table>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-lg-6 mt-2 pe-1">
                        <div className="med-box" >
                            <div className="fieldsett-in">
                                <div className="fieldsett" style={{ paddingBottom: '21px' }}>
                                    <span className='fieldse'>Payment Details</span>
                                    <div className='row'>
                                        <div className="col-12">

                                            <div className="med-table-section_ mt-2">
                                                <table className="med-table border_ striped">
                                                    <tbody>
                                                        {/* <tr>
                                                            <td>UHID</td>
                                                            <td>
                                                                <strong>
                                                                    {patientData && patientData.gender}
                                                                </strong>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>Patient Name:</td>
                                                            <td><strong>{patientData && patientData.patientName}</strong></td>
                                                        </tr>

                                                        <tr>
                                                            <td>Age/Gender:</td>
                                                            <td>
                                                                <strong> {patientData && patientData.age}</strong>
                                                                {patientData !==''? '/' :''}
                                                                <strong>
                                                                    {patientData && patientData.gender}
                                                                </strong></td>
                                                        </tr> */}
                    {/* <tr>
                                                            <td>
                                                                <div className="col-6 mb-2">
                                                                    <label htmlFor="ddlPaymentType" className="form-label">Payment Type</label>
                                                                    <select className="form-select form-select-sm" id="ddlPaymentType" aria-label=".form-select-sm example" onChange={handlePaymentChange}>
                                                                        <option value="0">Select Payment Type</option>
                                                                        <option value="1">Cash</option>
                                                                        <option value="2">Insurance</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            {paymentType === 1
                                                                ? <td>
                                                                    <input type="number" className='registrationinput ps-2' id="txtCashPayment" name='cashpayment' placeholder='Enter Payment' value={cashpayment} onChange={handleChange} />
                                                                </td>
                                                                : ''}

                                                            {paymentType === 2
                                                                ? <td>
                                                                    <div className="col-6 mb-2">
                                                                        <label htmlFor="ddlInsuranceCompany" className="form-label">Insurance Company</label>
                                                                        <select className="form-select form-select-sm" id="ddlInsuranceCompany" aria-label=".form-select-sm example" >
                                                                            <option value="0">Select Insurance Company</option>
                                                                            <option value="1">Max Life Insurance</option>
                                                                            <option value="2">SBI Life Insurance Company</option>
                                                                            <option value="3">Life Insurance Corporation Of India</option>
                                                                            <option value="4">	HDFC Life Insurance</option>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                : ''}


                                                        </tr> */}


                    {/* 
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>


        </div>
    )
}

