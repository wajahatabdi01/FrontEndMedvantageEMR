import React, { useEffect } from 'react'
import { useState } from 'react'
import BoxHeading from './BoxHeading'
import DepartmentNavbar from '../../Clinical/Pages/OPD/OPDSharePage/OPDInvestigation/DepartmentNavbar'
// import OPDInvestigationRight from '../../Pages/OPD/OPDSharePage/OPDInvestigation/OPDInvestigationRight'
import GetSubTestListForDashboard from '../../Clinical/API/RemotePatientMonitorDashboard/GetSubTestListForDashboard'
import TableContainer from '../../Component/TableContainer'
// import BoxHeading from '../../../../Components/BoxHeading'
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'
import GetPatientMediaData from '../Api/GetPatientMediaData'
import { Link } from 'react-router-dom'
import NODataFound from '../../Component/NODataFound'

export default function InvestigationReport(props) {

    // let [activeTab, setActiveTab] = useState(0)
    let [activeId, setActiveId] = useState("");
    let [subTestData, setSubTestData] = useState("");
    let [mediaData, setMediaData] = useState("");
    let [showNoDataFound, setNoDataFound] = useState(0);

    let getData = async (number) => {

        let activeUHID = props.patientdata.UhId
        // console.log("id", activeId)

        let response = await GetSubTestListForDashboard(activeUHID, activeId)
        // console.log("rsposne", response)
        if (response.status === 1) {

            setSubTestData(response.responseValue)
            // console.log("investigation", response.responseValues)

        }
        else {
            setSubTestData([])

        }

    }
    let uploadedInvestigation = async () => {
        setActiveId("")
        let response = await GetPatientMediaData(props.patientdata.UhId)
        if (response.status === 1) {
            if (response.responseValue.length === 0) {
                setNoDataFound(1)
            }
            else {
                setMediaData(response.responseValue)
            }
        }
        else {
            setNoDataFound(1)
        }
    }
    useEffect(() => {
        getData()

    }, [activeId])
    return (
        <div className={`modal d-${props.investigationpopup === 0 ? 'none' : 'block'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered_ modal-xl">
                <div className="modal-content">
                    {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                        <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                    </span> */}
                    {/* <BoxHeading title="Investgation Deatils" patientName={props.patientdata.PntName} uhid={props.patientdata.UhId} /> */}

                    <span className="closee" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>
                    <div className='p-profile'>
                        <div className='p-profile-h'>Investigation Details</div>
                        <div className='p-profile-h'>
                            <div className='pname'><span>{props.patientdata.UhId}</span></div>
                            <div className='pname'>- {props.patientdata.PntName}</div>
                        </div>
                    </div>


                    <div className='row'>
                        {/* <div className=" navbar-collapse wrap" id="navbarTogglerDemo01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
                                {TabList && TabList.map((value, index) => {
                                    return (
                                        <li className='tab-container dropdown-item' style={{ 'border': '1px solid #0F3D54', 'background-color': `${activeTab === index ? '#0F3D54' : 'white'}`, 'cursor': 'pointer', 'color': `${activeTab === index ? 'white' : '#0F3D54'}` }} onClick={() => { handleTab(index) }}>{value}</li>
                                    )
                                })}
                            </ul>
                        </div> */}
                        <div className='col-12'>
                            <div className='d-flex flex-wrap_'>
                                <DepartmentNavbar getActiveID={setActiveId} callingpage={0} />
                                <div className='navbar-nav commonnav singleTab'>
                                    <div className='tab-container dropdown-item tabnew' style={{ 'border': '1px solid #002f75', 'border-radius': '5px', backgroundColor: activeId === "" ? "#1D4999" : "white", color: activeId === "" ? "white" : "#1d4999", cursor: 'pointer' }} onClick={uploadedInvestigation}>
                                        Uploaded Investigations</div>
                                </div>
                            </div>
                        </div>
                        {activeId !== "" ?
                            <div className='col-12 col-12 px-4 pb-2'>
                                <div className='med-table-section pdtable' style={{ height: "350px", position: 'relative' }}>
                                    {/* <OPDInvestigationRight activeSubId={activeId} callingpage={2} /> */}
                                    {
                                        subTestData.length !== 0 ?
                                            <table>
                                                <thead>
                                                    <th className='text-center'>#</th>
                                                    <th>Test</th>
                                                    <th className='text-center'>Result</th>
                                                    <th>Normal Range</th>
                                                    <th>Collection Date/Time</th>
                                                </thead>
                                                <tbody>
                                                    {subTestData && subTestData.map((val, ind) => {
                                                        return (
                                                            <tr >
                                                                <td className='text-center'>{ind + 1}</td>
                                                                <td>{val.subTestName}</td>
                                                                <td className='text-center'><span style={{ color: val.isNormalResult === 0 ? "red" : "green", fontWeight: "bold" }}>{val.result}</span> </td>
                                                                <td>{val.rangeRemark}</td>
                                                                <td>{val.collectionDateTime.split("T")[0]} / {val.collectionDateTime.split("T")[1]}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </table> :
                                            <NODataFound />
                                    }

                                </div>
                            </div>
                            :
                            <div className='col-12 col-12 px-4 pb-2 pdtable' style={{ height: '350px', overflowY: 'auto', position: 'relative' }}>
                                {showNoDataFound === 0 ?
                                    <table>
                                        <thead>
                                            <th className='text-center'>#</th>
                                            <th>Category</th>
                                            <th>File Name</th>
                                            <th className='text-center'>Action</th>
                                        </thead>
                                        <tbody>
                                            {mediaData && mediaData.map((li, i) => {
                                                return (
                                                    <tr >
                                                        <td className='text-center'>{i + 1}</td>
                                                        <td>{li.category}</td>
                                                        <td >{li.fileName}</td>
                                                        <td className='text-center'><Link to={li.url} target='_blank' title='View Document'> <i className="bi bi-eye-fill"></i></Link></td>
                                                        {/* <td ><img src={li.url} style={{width:'100%'}}/></td> */}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    :
                                    <NODataFound />
                                }
                            </div>
                        }



                    </div>
                </div>
            </div>
        </div>
    )
}
