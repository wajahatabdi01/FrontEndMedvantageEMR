import React, { useEffect, useState } from 'react'
import TableContainer from '../../../Component/TableContainer';
import BoxContainer from '../../../Component/BoxContainer';
import Heading from '../../../Component/Heading';
import { t } from 'i18next';
import GetAllSearchByName from '../../../EditCredentional/API/GetAllSearchByName';
import GetUserList from '../../Api/Schedule/GET/GetUserList';
import clearIcon from '../../../assets/images/icons/clear.svg';
function LogsViewer() {
    const [selectedPatient, setSelectedPatient] = useState('');
    let [searchByName, setSearchByName] = useState('')
    let [filteredNameList, setFilteredNameList] = useState([]);
    let [searchByNameList, setSearchByNameList] = useState([])
    let [userList, setUserList] = useState([])

    let getAllNames = async (query) => {
        const response = await GetAllSearchByName(query);
        if (response.status === 1) {
            setSearchByNameList(response.responseValue);
        }
    }
    let getAllUsers = async () => {
        const response = await GetUserList(window.clientId);
        if (response.status === 1) {
            setUserList(response.responseValue);
        }
    }
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
    const handleSelectPatient = (param) => {
        setSelectedPatient(param.patientName);
        document.getElementById('ddlDataContainer').style.display = "none";

    }
    let handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // if (name === "socialSecurityNo") {
        //     setSocialSecurityNo(value)
        // }
        // if (name === "externalId") {
        //     setExternalId(value)
        // }
        // console.log("SocialSecurityNo", value)
    }
    useEffect(() => {
        getAllUsers();
    }, [])
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text="Logs Viewer" />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label for="bedName" class="form-label relative">Start Date</label>
                                    <input type="date" className="form-control form-control-sm" id="startDateTime" name='startDate' onChange={"handleChange"} />
                                    <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                    </small>
                                </div>
                                <div className="mb-2 me-2">
                                    <label for="bedName" class="form-label relative">End Date</label>
                                    <input type="date" className="form-control form-control-sm" id="startDateTime" name='startDate' onChange={"handleChange"} />
                                    <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                    </small>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="name" className="form-label">Patient<span className="starMandatory"></span></label>
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
                                <div className=" mb-2 me-2">
                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><>User</></label>
                                    <div className='d-flex gap-3' >
                                        <select className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={"handleIssueDetailsChange"} >
                                            <option value="0" selected>Select User</option>
                                            {userList && userList.map((list) => {
                                                return (
                                                    <option value={list.id}>{list.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                                <div className=" mb-2 me-2">
                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Name of Events</></label>
                                    <div className='d-flex gap-3' >
                                        <select className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={"handleIssueDetailsChange"} >
                                            <option value="0" selected>Select Event</option>
                                            <option value="1">All</option>
                                            <option value="2">add_list</option>
                                            <option value="3">api</option>
                                            <option value="4">checksum</option>
                                            <option value="5">delete</option>
                                            <option value="6">edit_list</option>
                                            <option value="7">fee</option>
                                            <option value="8">login</option>
                                            <option value="9">login attempt</option>
                                            <option value="10">logout</option>
                                            <option value="11">order</option>
                                            <option value="12">other</option>
                                            <option value="13">patient</option>
                                            <option value="14">patient-merge</option>
                                            <option value="15">patient-record</option>
                                            <option value="16">portalapi</option>
                                            <option value="17">print</option>
                                            <option value="18">qrda3</option>
                                            <option value="19">scheduling</option>
                                            <option value="20">security-administration</option>
                                            <option value="21">uuid</option>
                                            <option value="22">view</option>
                                            <option value="23">disclosure</option>

                                        </select>
                                    </div>
                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                                <div className=" mb-2 me-2">
                                    <label htmlFor="ddlRelationshipTertiary" className="form-label">Type of Events</label>
                                    <div className='d-flex gap-3' >
                                        <select className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={"handleIssueDetailsChange"} >
                                            <option value="0" selected>Select Event</option>
                                            <option value="1">All</option>
                                            <option value="2">Query</option>
                                            <option value="3">update</option>
                                            <option value="4">insert</option>
                                            <option value="5">delete</option>
                                            <option value="6">replace</option>
                                        </select>
                                    </div>
                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                                <div className="mb-2 mt-4 relative ">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" >Show <i class="fa-regular fa-eye" style={{ color: "#ffffff" }}></i> </button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={"handleClear"}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                </div>
                            </BoxContainer>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Date</th>
                                            <th>Event</th>
                                            <th>Category</th>
                                            <th>User</th>
                                            <th>Certificate User</th>
                                            <th>Group</th>
                                            <th>Patient ID</th>
                                            <th>Success</th>
                                            <th>API Logging</th>
                                            <th>Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {registeredPatientList && Array.isArray(registeredPatientList) && registeredPatientList.filter((val) => `${val.patientName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            const adjustedIndex = ind + (pageNumbers - 1) * pageSize + 1;
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{adjustedIndex}</td>
                                                    <td>{val.patientName}</td>
                                                    <td>{val.socialSecurityNo}</td>
                                                    <td>{val.externalId}</td>
                                                    <td>{val.dob.substring(0, 10)}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" title="Edit Row" data-bs-placement="bottom">
                                                                <img src={viewIcon} onClick={() => { handleRedirect(val.uhID) }} alt='' />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })} */}


                                    </tbody>
                                </TableContainer>
                                {/* ---------------------------Pagination-------------------------- */}
                                {/* {patientCountdata && patientCountdata.map((data) => {
                                    return (<div className='paginationcount'>
                                        <div className='showingcount'>Showing <span>{startIndex}</span> to <span>{endIndex}</span> out of <span>{data.patientCount}</span></div>
                                        <div className='paginationSearch'>
                                            <nav aria-label="...">
                                                <ul class="pagination">
                                                    <li class="page-item">
                                                        <button class="page-link" onClick={() => { handlePageChange(pageNumbers - 1); getData(pageNumbers-1) }} disabled={pageNumbers === 1}>Previous</button>
                                                    </li>
                                                    <li class="page-item active"><a class="page-link" href="#">{pageNumbers}</a></li>
                                                    <li class="page-item">
                                                        <button class="page-link" onClick={() => { handlePageChange(pageNumbers + 1); getData(pageNumbers+1) }}>Next</button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>)
                                })} */}


                                {/* ---------------------------End Pagination-------------------------- */}

                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LogsViewer
