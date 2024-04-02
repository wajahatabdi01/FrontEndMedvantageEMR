import React, { useEffect, useState } from 'react'
import TableContainer from '../../Component/TableContainer';
import Heading from '../../Component/Heading';
import Toster from '../../Component/Toster';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import BoxContainer from '../../Component/BoxContainer';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import IconEdit from '../../assets/images/icons/IconEdit.svg'
import viewIcon from '../../assets/images/icons/viewIcon.svg'
import IconDelete from '../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import Search from '../../Code/Serach'
import GetAllRegisteredPatients from '../API/GetAllRegisteredPatients';
import GetAllSearchByName from '../API/GetAllSearchByName';
import GetAllDob from '../API/GetAllDob';
import GetPatientDetailsByUHID from '../../Clinical/API/RemotePatientMonitorDashboard/GetPatientDetailsByUHID';
import GetMenuByDepartmentIdAndUserId from '../../Clinical/API/RemotePatientMonitorDashboard/GetMenuByDepartmentIdAndUserId';
import GetDepartmentByID from '../API/GetDepartmentByID';
import GetMenuByHead from '../API/GetMenuByHead';
import { useNavigate } from 'react-router-dom';
import AlertToster from '../../Component/AlertToster';
import PatientRevisit from '../../Registartion/Pages/OPDRegistration/PatientRevisit';

function SearchRegisteredPatient() {
    const { t } = useTranslation();
    document.body.dir = i18n.dir();
    let [registeredPatientList, setRegisteredPatientList] = useState([]);
    let [pageNumbers, setPageNumber] = useState(1);
    let [searchByName, setSearchByName] = useState('')
    let [patientCountdata, setPatientCountData] = useState('')
    let [socialSecurityNo, setSocialSecurityNo] = useState('')
    let [externalId, setExternalId] = useState('')
    let [patientName, setPatientName] = useState('')
    let [uhid, setUhid] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    let [searchByNameList, setSearchByNameList] = useState([])
    let [searchByDob, setSearchByDob] = useState('')
    let [searchByDobList, setSearchByDobList] = useState([])
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showErrMessage, setShowErrMessage] = useState('');
    let [filteredNameList, setFilteredNameList] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const navigate = useNavigate();
    const pageSize = 15;
    let getData = async (pageNumbers) => {
        console.log("selectedPatient", selectedPatient);
        const parts = selectedPatient.split(' ');
        let firstName = '';
        let lastName = '';

        if (parts.length >= 2) {
            firstName = parts.slice(0, -1).join(' ');
            lastName = parts.slice(-1).join(' ');
        }

        const response = await GetAllRegisteredPatients(pageNumbers, pageSize, firstName, lastName, socialSecurityNo, selectedDate, externalId);
        if (response.status === 1) {
            setRegisteredPatientList(response.responseValue.searchResult);
            setPatientCountData(response.responseValue.totalCount);
        }
        window.sessionStorage.setItem("PatientDetails", JSON.stringify(response.responseValue));
    }

    let handleVisit = (patientName, Uhid, lastName) => {
        console.log("patientName", patientName)
        console.log("UHID", Uhid)
        setPatientName(patientName + ' ' + lastName)
        setUhid(Uhid)
    }

    let getAllNames = async (query) => {
        const response = await GetAllSearchByName(query);
        if (response.status === 1) {
            setSearchByNameList(response.responseValue);
        }
    }

    let getAllDob = async (query) => {
        const response = await GetAllDob(query);
        if (response.status === 1) {
            setSearchByDobList(response.responseValue);
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchPatientName = (searchValue) => {
        setSelectedPatient('');
        setSearchByName(searchValue);
        let ddlDataContainerValue = document.getElementById('ddlDataContainer');
        //ddlDataContainerValue.style.display = searchValue.length === 0 ? 'none' : 'block';
        ddlDataContainerValue.style.display = searchValue.length < 3 ? 'none' : 'block';
        if (searchValue.length >= 2) {
            const data = searchByNameList;
            const filteredData = data.filter((val, i, arr) => {
                var tempData = val.patientName.toLowerCase().includes(searchValue.toLowerCase());
                return tempData;
            });
            setFilteredNameList(filteredData);
            getAllNames(searchValue);
        } else {
            setFilteredNameList([]);
        }

    }

    const handleSearchByDob = (searchValue) => {
        setSearchByDob(searchValue);
        //setSelectedDob('');
        let ddlDataContainerValueForDob = document.getElementById('ddlDataContainerForDob');
        ddlDataContainerValueForDob.style.display = searchValue.length < 3 ? 'none' : 'block';
        if (searchValue.length >= 2) {
            const dobData = searchByDobList;
            const filteredDataForDob = dobData.filter((val, i, arr) => {
                var tempData = (typeof val.dob === 'string') && val.dob.toLowerCase().includes(searchValue.toLowerCase());
                return tempData
            });
            setFilteredNameList(filteredDataForDob);
            getAllDob(searchValue);
        }
        else {

            setSearchByDobList([]);
        }

    }

    const handleSelectPatient = (param) => {
        setSelectedPatient(param.patientName + ' ' + param.lastName);
        document.getElementById('ddlDataContainer').style.display = "none";

    }
    const handleSelectDob = (param) => {
        //setSelectedDob(param.dob);
        document.getElementById('ddlDataContainerForDob').style.display = "none";

    }

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    let nextPage = () => {
        setPageNumber(pageNumbers + 1)
        getData(pageNumbers)
    }
    let previousPage = () => {
        if (pageNumbers > 1) {
            setPageNumber((prevPage) => prevPage - 1);
            getData(pageNumbers - 1);
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value)
    }
    function convertDateFormat(dateString) {
        // Check if dateString is defined
        if (dateString) {
            // Split the date string by "-"
            const parts = dateString.split("-");

            // Check if parts contains three elements
            if (parts.length === 3) {
                // Rearrange the parts in the format yyyy-mm-dd
                const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                return formattedDate;
            } else {
                return null; // Or return an appropriate value indicating an error
            }
        } else {
            return null; // Or return an appropriate value indicating an error
        }
    }

    const redirectPaitent = () => {
        navigate('/patientregistration/')
    }

    const handleClear = (pageNumbers, pageSize) => {
        setSearchByName('');
        setSelectedPatient('');
        setSelectedDate('');
        setRegisteredPatientList([]);
        setSocialSecurityNo('');
        setExternalId('');
        getData(pageNumbers, pageSize);
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: January is 0
    const day = currentDate.getDate();

    // Formatting the date as YYYY-MM-DD
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    console.log(formattedDate); // Output: e.g., "2024-03-28"

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
                        // window.open(menuDetails.url)
                        // window.open('/prescriptionipd/')
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
                        // window.open('/prescriptionopd/')
                        // console.log("cdcsdcsdc", patientList.responseValue[0].createdDate, formattedDate)
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
            // newWindow["uhid"] = props.patientData.UhId
            // window["clientId"] = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId
            // setPatientProfilePopup(1)
        }
    }
    let handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "socialSecurityNo") {
            setSocialSecurityNo(value)
        }
        if (name === "externalId") {
            setExternalId(value)
        }

    }

    // Calculate start index and last index based on page number and page size
    const startIndex = (pageNumbers - 1) * pageSize + 1;
    // const endIndex = Math.min(startIndex + pageSize - 1, registeredPatientList.length - 1);
    const endIndex = Math.min(startIndex + registeredPatientList.length - 1);


    useEffect(() => {
        getAllNames();
        getData(pageNumbers);
        // getAllDob();
    }, []);
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text="Search Registered Patient" />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <input type="text" value={selectedPatient === '' ? searchByName : selectedPatient} onChange={(e) => { handleSearchPatientName(e.target.value) }} className="form-control form-control-sm" id="bedName" placeholder="search by Name" name="bedName" />

                                    <div className="box-container" id='ddlDataContainer' style={{ display: 'none' }} >
                                        {filteredNameList.length > 0 &&
                                            filteredNameList.map((val, index) => {
                                                return (
                                                    <ul class="list-items">
                                                        <li onClick={() => { handleSelectPatient(val) }}>{val.patientName} {val.lastName}</li>
                                                    </ul>
                                                );
                                            })}
                                    </div>
                                </div>
                                {/* <div className="mb-2 me-2">
                                    <input type="email" className="form-control form-control-sm" id="bedName" placeholder="search by Home Phone" name="bedName" onChange={"handleChange"} />
                                </div> */}
                                <div className="mb-2 me-2">
                                    <input type="text" value={socialSecurityNo} className="form-control form-control-sm" id="socialSecurityNo" placeholder="search by SSN" name="socialSecurityNo" onChange={handleChange} />
                                </div>

                                {/* <div className="mb-2 me-2">
                                    <input type="text" value={selectedDob === '' ? searchByDob : selectedDob} onChange={(e) => { handleSearchByDob(e.target.value) }} className="form-control form-control-sm" id="bedName" placeholder="search by Date of Birth" name="bedName" />
                                    <div className="box-container" id='ddlDataContainerForDob' style={{ display: 'none' }} >
                                        {searchByDobList.length > 0 &&
                                            searchByDobList.map((val, index) => {
                                                return (
                                                    <ul class="list-items">
                                                        <li onClick={() => { handleSelectDob(val) }}>{val.dob}</li>
                                                    </ul>
                                                );
                                            })}
                                    </div>
                                </div> */}
                                <div className="mb-2 me-2">
                                    <input type="text" value={externalId} className="form-control form-control-sm" id="externalId" placeholder="search by External ID" name="externalId" onChange={handleChange} />
                                </div>
                                <div className="mb-2 me-2">
                                    <input type="date" onChange={handleDateChange} value={selectedDate} className="form-control form-control-sm" id="date" name='date' />
                                </div>
                                <div className="mb-2 relative">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => { getData(pageNumbers) }}>Show <i class="fa-regular fa-eye" style={{ color: "#ffffff" }}></i> </button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => handleClear(1, 15)}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={redirectPaitent}><i class="fa-solid fa-user-plus"></i> Add</button>
                                </div>
                            </BoxContainer>

                        </div>
                        <div className="col-12 mt-3">
                            <div className='handlser'>
                                <Heading text="Registered Patient List" />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Full Name</th>
                                            <th>SSN</th>
                                            <th>External ID</th>
                                            <th>Date of Birth</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registeredPatientList && Array.isArray(registeredPatientList) && registeredPatientList.filter((val) => `${val.patientName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            const adjustedIndex = ind + (pageNumbers - 1) * pageSize + 1;
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{adjustedIndex}</td>
                                                    <td>{val.patientName} {val.middleName} {val.lastName} <span style={{ color: '#f26b29' }}>({val.uhID})</span></td>
                                                    <td>{val.socialSecurityNo}</td>
                                                    <td>{val.externalId}</td>
                                                    <td>{val.dob.substring(0, 10)}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" title="Edit Row" data-bs-placement="bottom">
                                                                <img src={viewIcon} onClick={() => { handleRedirect(val.uhID) }} alt='' />
                                                            </div>
                                                            <div data-bs-toggle="modal" data-bs-target="#patientrevisit">
                                                                <i class="fa-regular fa-clone" onClick={() => handleVisit(val.patientName, val.uhID, val.lastName)}></i>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}


                                    </tbody>
                                </TableContainer>
                                {/* ---------------------------Pagination-------------------------- */}
                                {patientCountdata && patientCountdata.map((data) => {
                                    return (<div className='paginationcount'>
                                        <div className='showingcount'>Showing <span>{startIndex}</span> to <span>{endIndex}</span> out of <span>{data.patientCount}</span></div>
                                        <div className='paginationSearch'>
                                            <nav aria-label="...">
                                                <ul class="pagination">
                                                    <li class="page-item">
                                                        <button class="page-link" onClick={() => { handlePageChange(pageNumbers - 1); getData(pageNumbers - 1) }} disabled={pageNumbers === 1}>Previous</button>
                                                    </li>
                                                    <li class="page-item active"><a class="page-link" href="#">{pageNumbers}</a></li>
                                                    <li class="page-item">
                                                        <button class="page-link" onClick={() => { handlePageChange(pageNumbers + 1); getData(pageNumbers + 1) }}>Next</button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>)
                                })}
                                {/* ---------------------------End Pagination-------------------------- */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                showAlertToster === 1 ?
                    <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
            }
            {/* ---------------------------------------------------Pateint Revisit Modal------------------------------------------------- */}
            <div className="modal fade" id="patientrevisit" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-xl">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                                Patient Revisit
                            </h1>
                            <div style={{ marginRight: '38px' }}>{patientName} - {uhid}</div>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close">
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="patientrevisit" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                    <PatientRevisit UHID={uhid} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchRegisteredPatient
