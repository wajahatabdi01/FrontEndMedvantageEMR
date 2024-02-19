import React, { useState } from 'react'
import TableContainer from '../../../Component/TableContainer';
import BoxContainer from '../../../Component/BoxContainer';
import Heading from '../../../Component/Heading';
import { t } from 'i18next';
import GetAllSearchByName from '../../../EditCredentional/API/GetAllSearchByName';

function LogsViewer() {
    const [selectedPatient, setSelectedPatient] = useState('');
    let [searchByName, setSearchByName] = useState('')
    let [filteredNameList, setFilteredNameList] = useState([]);
    let [searchByNameList, setSearchByNameList] = useState([])

    let getAllNames = async (query) => {
        const response = await GetAllSearchByName(query);
        if (response.status === 1) {
            setSearchByNameList(response.responseValue);
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
                            </BoxContainer>

                        </div>
                        <div className="col-12 mt-3">
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
