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

function SearchRegisteredPatient() {
    const { t } = useTranslation();
    document.body.dir = i18n.dir();
    let [registeredPatientList, setRegisteredPatientList] = useState([]);
    let [pageNumbers, setPageNumber] = useState(1);
    let [searchByName, setSearchByName] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    let [searchByNameList, setSearchByNameList] = useState([])
    let [searchByDob, setSearchByDob] = useState('')
    let [searchByDobList, setSearchByDobList] = useState([])
    const [showSearchBox, setShowSearchBox] = useState(false);
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [updateBool, setUpdateBool] = useState(0);
    let [filteredNameList, setFilteredNameList] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    // const [selectedDob, setSelectedDob] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const pageSize = 15;
    let getData = async (pageNumbers) => {
        const response = await GetAllRegisteredPatients(pageNumbers, pageSize, selectedPatient, selectedDate);
        if (response.status === 1) {
            setRegisteredPatientList(response.responseValue);
        }
        window.sessionStorage.setItem("PatientDetails", JSON.stringify(response.responseValue));
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
        setSelectedPatient(param.patientName);
        document.getElementById('ddlDataContainer').style.display = "none";

    }
    const handleSelectDob = (param) => {
        //setSelectedDob(param.dob);
        document.getElementById('ddlDataContainerForDob').style.display = "none";

    }

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

    const handleClear = () => {
        getData(pageNumbers);
        setSearchByName('');
        setSelectedPatient('');
        setSelectedDate('');
        setRegisteredPatientList('');

    }

    const handleRedirect = async (key) => {
        // const menuDetails = taskDetails.menuData;
        let resp = await GetPatientDetailsByUHID(key);


        if (resp.status === 1) {
            let deptmenu = await GetMenuByDepartmentIdAndUserId(resp.responseValue[0].deptId);
            // let deptResponse = await GetDepartmentByID(1);
            let deptResponse = await GetDepartmentByID(resp.responseValue[0].deptId);
            if (deptResponse) {
                if (deptmenu.status === 1) {
                    window.sessionStorage.setItem("IPDpatientList", JSON.stringify(
                        resp.responseValue,
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
                    window.open('/prescriptionipd/')
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
                                                        <li onClick={() => { handleSelectPatient(val) }}>{val.patientName}</li>
                                                    </ul>
                                                );
                                            })}
                                    </div>
                                </div>
                                <div className="mb-2 me-2">
                                    <input type="email" className="form-control form-control-sm" id="bedName" placeholder="search by Home Phone" name="bedName" onChange={"handleChange"} />
                                </div>
                                <div className="mb-2 me-2">
                                    <input type="email" className="form-control form-control-sm" id="bedName" placeholder="search by SSN" name="bedName" onChange={"handleChange"} />
                                </div>
                                <div className="mb-2 me-2">
                                    <input type="date" onChange={handleDateChange} value={selectedDate} className="form-control form-control-sm" id="date" name='date' />
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
                                    <input type="email" className="form-control form-control-sm" id="bedName" placeholder="search by External ID" name="bedName" onChange={"handleChange"} />
                                </div>
                                <div className="mb-2 relative">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => { getData(pageNumbers) }}>Show <i class="fa-regular fa-eye" style={{ color: "#ffffff" }}></i> </button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
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
                                            <th>Date of Birth</th>
                                            <th>External ID</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registeredPatientList && registeredPatientList.filter((val) => `${val.patientName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            const adjustedIndex = ind + (pageNumbers - 1) * pageSize + 1;
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{adjustedIndex}</td>
                                                    <td>{val.patientName}</td>
                                                    <td>{val.ssn}</td>
                                                    <td>{val.dob}</td>
                                                    <td>{val.externalID}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" title="Edit Row" data-bs-placement="bottom">
                                                                <img src={viewIcon} onClick={() => { handleRedirect(val.uhID) }} alt='' />
                                                            </div>

                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                    </tbody>
                                </TableContainer>
                                {/* ---------------------------Pagination-------------------------- */}
                                <div className='paginationcount'>
                                    <div className='showingcount'>Showing <span>1</span> to <span>15</span> out of <span>2000</span></div>
                                    <div className='paginationSearch'>
                                        <nav aria-label="...">
                                            <ul class="pagination">
                                                <li class="page-item ">
                                                    <a class="page-link" href="#" onClick={previousPage}>Previous</a>
                                                </li>
                                                <li class="page-item active"><a class="page-link" href="#">{pageNumbers}</a></li>
                                                {/* <li class="page-item active" aria-current="page">
                                                <span class="page-link">2</span>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li> */}
                                                <li class="page-item">
                                                    <a class="page-link" href="#" onClick={nextPage}>Next</a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>

                                {/* ---------------------------End Pagination-------------------------- */}
                                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={"handleDeleteRow"} data-bs-dismiss="modal">{t("Delete")}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SearchRegisteredPatient
