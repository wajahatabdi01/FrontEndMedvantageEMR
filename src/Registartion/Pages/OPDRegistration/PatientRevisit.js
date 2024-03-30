import React, { useEffect, useState } from 'react'
import IconPatientRelation from '../../../assets/images/icons/IconPatientRelation.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import roomIcon from '../../../assets/images/icons/room.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import { t } from 'i18next';
import VisitDetails from './Components/VisitDetails';
import medicalAssistance from '../../../assets/images/icons/medical-assistance.svg';
import GetDepartmentList from '../../API/GET/GetDepartmentList';
import GetWardList from '../../API/GET/GetWardList';
import GetUserListByRoleId from '../../API/GET/GetUserListByRoleId';
import GetRoomList from '../../API/GET/GetRoomList';
import GetAllItem from './UserProfile/API/GetAllItem';
import InsertPatientDemographicData from '../../API/POST/InsertPatientDemographicData';
import saveBillingDetails from '../../../Billing/API/saveBillingDetails';
import InsertPatientRevisitData from '../../API/POST/InsertPatientRevisitData';
import GetDepartmentByID from '../../../EditCredentional/API/GetDepartmentByID';
import GetPatientDetailsByUHID from '../../../Clinical/API/RemotePatientMonitorDashboard/GetPatientDetailsByUHID';
import GetMenuByHead from '../../../EditCredentional/API/GetMenuByHead';
import { useNavigate } from 'react-router-dom';
import AlertToster from '../../../Component/AlertToster';
import SuccessToster from '../../../Component/SuccessToster';
export default function PatientRevisit({ UHID }) {
    let [deparetmentList, setDepartmentList] = useState([]);
    let [roomList, setRoomList] = useState([]);
    let [wardList, setWardList] = useState([]);
    let [itemList, setItemList] = useState([]);
    let [providerList, setProviderList] = useState([]);
    let [selectedDept, setSelectedDept] = useState('0');
    let [selectedDoctor, setSelectedDoctor] = useState('0');
    let [selectedRoom, setSelectedRoom] = useState('0');
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showToster, setShowToster] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [clearStatus, setClearStatus] = useState(0)
    const navigate = useNavigate();
    const [visitDetails, setVisitDetails] = useState();
    const [issueDetails, setIssueDetails] = useState(
        {
            Problem: {
                titleId: '',
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },

            Allergy: {
                titleId: '',
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: '',
                reactionId: '',
                severityId: '',
                allergyType: '',
                allergyTypeId: '',
            },

            Medication: {
                titleId: '',
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },
            Device: {
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },
            Surgery: {
                titleId: '',
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },
            Dental: {
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },
        }

    );
    const [billingObj, setBillingObj] = useState({
        itemId: '',
        itemName: '',
        itemCharge: 500,
        categoryId: 0,
        itemQuantity: 0,
        discountRs: 0,
        discountPer: 0,
        totalAmount: 0,
        actualTotalAmount: 0,
        billMasterID: 0,
        billNo: 0,
        billTypeId: 0,
        tpaCompanyID: "",
        tpaReferenceNo: '',
        totalDiscount: 0,
        uhid: '',
    });
    let getDepartmentList = async () => {
        let data = await GetDepartmentList()
        setDepartmentList(data.responseValue);

    }
    let getDdlListByDeptID = async (val) => {
        document.getElementById("errDepartment").style.display = "none";
        const deptID = document.getElementById('ddlDepartment').value;
        let data = await GetRoomList(deptID);
        setSelectedDept(deptID);
        getWardListByDeptID(deptID);
        setRoomList(data.responseValue);
    }
    let getWardListByDeptID = async (deptID) => {
        let data = await GetWardList(deptID);
        setWardList(data.responseValue);
    }
    const getItemList = async () => {
        let response = await GetAllItem()
        if (response.status === 1) {
            setItemList(response.responseValue)
        }
    }
    let getSelectedDoctor = () => {

        document.getElementById("errDoctor").style.display = "none";
        const doctor = document.getElementById('ddlDoctor').value;
        setSelectedDoctor(doctor);
    }
    let getSelectedRoom = () => {
        document.getElementById("errRoom").style.display = "none";
        const roomID = document.getElementById('ddlRoomNo').value;
        setSelectedRoom(roomID);
    }
    const getUserListByRoleId = async () => {
        const param = {
            roleId: 2,
            clientID: window.clientId,
        }
        const response = await GetUserListByRoleId(param)
        if (response.status === 1) {
            setProviderList(response.responseValue)
        }
    }
    let handleBilling = (e, value) => {
        const ddlItem = document.getElementById("itemId");
        const selectedOption = ddlItem.options[ddlItem.selectedIndex];
        const selectedItem = selectedOption ? selectedOption.textContent : "";

        setBillingObj((prevData) => ({
            ...prevData,
            [e]: value,
            itemName: selectedItem,
        }))
    }

    //Function to get current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const handleRedirect = async (key) => {
        // const menuDetails = taskDetails.menuData;
        let resp = await GetPatientDetailsByUHID(key);
        if (resp.status === 1) {
            // let deptResponse = await GetDepartmentByID(1);
            let deptResponse = await GetDepartmentByID(resp.responseValue[0].deptId);
            if (deptResponse) {
                if (resp.responseValue[0].admitDoctorId !== 0) {
                    let deptmenu = await GetMenuByHead(resp.responseValue[0].deptId, 4);
                    if (deptmenu.status === 1) {
                        let patientList = await GetPatientDetailsByUHID(key, 4)
                        window.sessionStorage.setItem("IPDpatientList", JSON.stringify(
                            patientList.responseValue,
                        ))
                        window.sessionStorage.setItem("departmentmenu", JSON.stringify({
                            "menuList": deptmenu.responseValue.menuList,
                            "departmentList": deptmenu.responseValue.departmentList,
                        }))
                        window.sessionStorage.setItem("IPDpatientsendData", JSON.stringify(
                            [[key]],
                        ))
                        window.sessionStorage.setItem("IPDactivePatient", JSON.stringify({ Uhid: key }))
                        window.sessionStorage.setItem("activePage", JSON.stringify({
                            "WardId": resp.responseValue[0].wardId,
                            "wardName": resp.responseValue[0].wardName,
                            "DepartmentId": resp.responseValue[0].deptId,
                            "departmentName": deptResponse.departmentName,
                            "menuName": "Prescription",
                            "menuId": 51
                        }))
                        navigate('/prescriptionipd/')
                    }
                }
                else {
                    let deptmenu = await GetMenuByHead(resp.responseValue[0].deptId, 1);
                    if (deptmenu.status === 1) {
                        let patientList = await GetPatientDetailsByUHID(key, 1)

                        window.sessionStorage.setItem("patientList", JSON.stringify(
                            patientList.responseValue,
                        ))
                        window.sessionStorage.setItem("OPDPatientData", JSON.stringify(
                            resp.responseValue,
                        ))
                        window.sessionStorage.setItem("departmentmenu", JSON.stringify({
                            "menuList": deptmenu.responseValue.menuList,
                            "departmentList": deptmenu.responseValue.departmentList,
                        }))
                        window.sessionStorage.setItem("patientsendData", JSON.stringify(
                            [[key]],
                        ))
                        window.sessionStorage.setItem("activePatient", JSON.stringify({ Uhid: key }))
                        window.sessionStorage.setItem("activePage", JSON.stringify({
                            "WardId": 1,
                            "wardName": "OPD",
                            "DepartmentId": resp.responseValue[0].deptId,
                            "departmentName": deptResponse.departmentName,
                            "menuName": "Prescription",
                            "menuId": 51
                        }))
                        if (patientList.responseValue[0].createdDate === formattedDate) {
                            navigate('/prescriptionopd/')
                        }
                        else {
                            navigate('/fhirpatientprofile/')
                            // console.log('createdDate', patientList.responseValue[0].createdDate, ' ', 'formattedDate', formattedDate);
                            // setShowAlertToster(1)
                            // setShowErrMessage("Patient is not currently in the OPD.")
                            // setTimeout(() => {
                            //     setShowAlertToster(0)
                            // }, 2000)
                        }
                    }

                }
            }
            else {
                console.error('Something went wrong..');
            }
        }
    }

    let handleValidation = (ddlDepartment, ddlDoctor, ddlRoomNo) => {
        if (ddlDepartment !== "0" && ddlDoctor !== "0" && ddlRoomNo !== "0") {
            return true
        }
        else if (ddlDepartment === "0") {
            document.getElementById("errDepartment").style.display = "block"
            document.getElementById("errDepartment").innerHTML = "Please select department"
            return false
        }
        else if (ddlDoctor === "0") {
            document.getElementById("errDoctor").style.display = "block"
            document.getElementById("errDoctor").innerHTML = "Please select doctor"
            return false
        }
        else if (ddlRoomNo === "0") {
            document.getElementById("errRoom").style.display = "block"
            document.getElementById("errRoom").innerHTML = "Please select room no"
            return false
        }
    }
    let handleSaveIssues = async () => {
        const billjson = JSON.stringify(billingObj)
        const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
        const ddlDepartment = document.getElementById('ddlDepartment').value;
        const ddlDoctor = document.getElementById('ddlDoctor').value;
        const ddlRoomNo = document.getElementById('ddlRoomNo').value;
        const visitObj = {
            uhID: UHID,
            clientID: clientID,
            userId: window.userId,
            "departmentId": ddlDepartment,
            "doctorId": ddlDoctor,
            "roomId": ddlRoomNo,
            visitReasonId: 0,
            visitCategoryId: 0,
            encounterDetailsJsonString: JSON.stringify([issueDetails.Problem, issueDetails.Allergy, issueDetails.Medication, issueDetails.Device, issueDetails.Surgery, issueDetails.Dental]),
            ...visitDetails,
        }
        let respValidation = handleValidation(ddlDepartment, ddlDoctor, ddlRoomNo)
        if (respValidation) {
            const response = await InsertPatientRevisitData(visitObj);
            if (response.status === 1) {
                handleRedirect(UHID);
                const billObj = {
                    uhid: UHID,
                    billTypeId: 1,
                    CompanyId: 0,
                    TotalAmount: 455,
                    TotalDiscount: 0,
                    TotalPaybleAmount: 455,
                    TotalPaidAmount: 455,
                    TotalBalanceAmount: 0,
                    DiscountRemark: '',
                    UserID: 0,
                    PaymentMode: 1,
                    JsonData: billjson,
                    cardNo: 0,
                    bankId: 0,
                    ChequeNo: 0,
                    ChequeDate: "",
                    trustTypeId: 0,
                    tpaReferenceNo: ""
                }
                const billresponse = await saveBillingDetails(billObj)
                if (billresponse.status === 1) {
                    // alert("Visited")
                    setShowToster(1);
                    setShowSuccessMsg("Patient visited successfully.");
                    setTimeout(() => {
                        setShowToster(0);
                    }, 1500)
                }
            }
            else {
                setShowAlertToster(1)
                setShowErrMessage(response.responseValue)
                setTimeout(() => {
                    setShowAlertToster(0)
                }, 2000)
            }
        }
    }
    let handleClear = () => {
        setClearStatus(1)
        setBillingObj({
            itemId: '',
            itemName: '',
            itemCharge: 500,
            categoryId: 0,
            itemQuantity: 0,
            discountRs: 0,
            discountPer: 0,
            totalAmount: 0,
            actualTotalAmount: 0,
            billMasterID: 0,
            billNo: 0,
            billTypeId: 0,
            tpaCompanyID: "",
            tpaReferenceNo: '',
            totalDiscount: 0,
            uhid: '',
        })
        document.getElementById('ddlDepartment').selectedIndex = 0;
        document.getElementById('ddlDoctor').selectedIndex = 0;
        document.getElementById('ddlRoomNo').selectedIndex = 0;
    }
    useEffect(() => {
        getItemList();
        getUserListByRoleId();
        getDepartmentList();
    }, [])
    return (
        <>
            {/* ....................................................................Visit Details..................................................................... */}
            <div class="fieldsett-in">
                <div className="accordion accordionPatientRaceSection" id="accordionExample">
                    <div className="accordion-item position-relative">
                        <h2 className="accordion-header otherinfo ">
                            <span className='collapsetxt'> {t("Visit Details")}</span>
                            <span
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#statsInfo"
                                aria-expanded="false"
                                aria-controls="statsInfo"
                            >
                            </span>
                        </h2>
                        <div
                            id="statsInfo"
                            className="accordion-collapse collapse show1"
                            data-bs-parent="#accordionExample"

                        >
                            <div className="accordion-body">
                                <VisitDetails visitDetailsData={setVisitDetails} issueDetailData={setIssueDetails} issueDetails={issueDetails} setClearStatus={setClearStatus} clearStatus={clearStatus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ....................................................................End Visit Details..................................................................... */}

            {/* ....................................................................Appointment_Details..................................................................... */}
            <div class="fieldsett-in">
                <div class="fieldsett">
                    <span class="fieldse">{t("Appointment_Details")}</span>
                    <div className="inner-content">
                        <div className="dflex row1">
                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                <label htmlFor="ddlDepartment" className="form-label"><img src={medicalAssistance} className='icnn' />{t("Department")}<span class="starMandatory">*</span></label>
                                <select className="form-select form-select-sm selectwid_" id="ddlDepartment" onChange={() => { getDdlListByDeptID(1) }} aria-label=".form-select-sm example">
                                    <option value="0">{t("Select_Department")}</option>
                                    {deparetmentList && deparetmentList.map((list, ind) => {
                                        if (list.categoryId === 1) {
                                            return (
                                                <option value={list.id}>{list.departmentName}</option>
                                            )
                                        }
                                    })}
                                </select>
                                <small id="errDepartment" className="form-text text-danger" style={{ display: 'none' }}></small>
                            </div>

                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                <label htmlFor="ddlDoctor" className="form-label"><img src={medicalAssistance} className='icnn' />{t("Doctor/Consultant")}<span class="starMandatory">*</span></label>
                                <select className="form-select form-select-sm" id="ddlDoctor" name='doctor' onChange={getSelectedDoctor} aria-label=".form-select-sm example">
                                    <option value="0">{t("selectDoctor")}</option>
                                    {providerList && providerList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                                <small id="errDoctor" className="form-text text-danger" style={{ display: 'none' }}></small>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                <label htmlFor="ddlRoomNo" className="form-label"><img src={roomIcon} className='icnn' />{t("Room_Number")}<span class="starMandatory">*</span></label>
                                <select className="form-select form-select-sm" id="ddlRoomNo" onChange={getSelectedRoom} aria-label=".form-select-sm example">
                                    <option value="0">{t("Select_Room")}</option>
                                    {roomList && roomList.map((list, ind) => {
                                        return (
                                            <option value={list.id} >{list.roomNumber}</option>
                                        )
                                    })}
                                </select>
                                <small id="errRoom" className="form-text text-danger" style={{ display: 'none' }}></small>
                            </div>
                            <div className="col-2 mb-2">
                                <label htmlFor="txtGaurdianGender" className="form-label"><img src={IconPatientRelation} className='icnn' />Patient Visit Charge</label>
                                <select className="form-select form-select-sm" aria-label=".form-select-sm example" id="itemId" name='itemId' value={billingObj.itemId} onChange={(e) => { handleBilling("itemId", e.target.value) }} >
                                    <option value="0">Select Visit Charge</option>
                                    {itemList && itemList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.itemName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ....................................................................Guardian_Details..................................................................... */}
            <div class="modal-footer">
                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleSaveIssues}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                </div>
            </div>
            {
                isShowToaster === 1 ?
                    <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
            }
            {
                showAlertToster === 1 ?
                    <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
            }
        </>
    )
}
