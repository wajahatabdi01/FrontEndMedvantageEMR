import React, { useEffect } from 'react'
import DepartmentNavbar from './DepartmentNavbar'
import OPDInvestigationLeft from './OPDInvestigationLeft'
import { useState } from 'react'
import OPDInvestigationRight from './OPDInvestigationRight'
import { useSelector } from 'react-redux'
import OPDInvestigationRightList from './OPDInvestigationRightList'
import GetPatientMediaData from '../../../../../PatientMonitorDashboard/Api/GetPatientMediaData'
 import NoDataFound from '../../../../../assets/images/icons/No data-rafiki.svg'
import TableContainer from '../../../../../Component/TableContainer'
import { Link } from 'react-router-dom'

export default function OPDInvestigationIndex(props) {

    let [activeId, setActiveId] = useState("")
    let [activeSubId, setActiveSubId] = useState("")
    let [activeUHID, setActiveUHID] = useState("")
    let [showTestList, setShowTestList] = useState(1)
    let patientsendData = useSelector((state) => state.PatientSendData["patientSendData"])
    let [mediaData, setMediaData] = useState("");
    let [showNoDataFound, setNoDataFound] = useState(0);
    let [isUpload, setIsUpload] = useState(0)
    let uploadedInvestigation = async () => {
        setActiveId("");
        setIsUpload(1);
        const getActiveUhid=JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
        console.log('getActiveUhid',getActiveUhid)
        let response = await GetPatientMediaData(getActiveUhid);
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
        let uhid = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        try {

            // let uhid = "UHID00181"
            setActiveUHID(uhid)
        }
        catch (e) {
            console.log("e", e.message)
        }
    }, [])
    return (

        <div className='row'>
            <div className='col-md-6 col-sm-12 plt1'>
                <div className='row p-0 m-0'>
                    <div className='row p-0 m-0 boxcontainer'>
                    <div className='d-flex'>
                        <DepartmentNavbar getActiveID={setActiveId} callingpage={0} setIsUpload={setIsUpload}/>
                        <div className='navbar-nav commonnav singleTab'>
                                    <div className='tab-container dropdown-item tabnew' style={{ 'border': '1px solid #002f75', 'border-radius': '5px', backgroundColor: activeId === "" ? "#1D4999" : "white", color: activeId === "" ? "white" : "#1d4999", cursor: 'pointer' }} onClick={uploadedInvestigation}>
                                        Uploaded Investigations
                                    </div>
                        </div>
                    </div>
                    </div>
                    {isUpload === 0 ?
                        <div className='row pt-2 p-0 m-0 boxcontainer'>
                           <OPDInvestigationLeft activeId={activeId} getActiveSubID={setActiveSubId} setShowTestList={setShowTestList} callingpage={0} />
                        </div>
                    :
                    <div style={{ height: '350px', overflowY: 'auto', position: 'relative' }}>
                                {showNoDataFound === 0 ?
                                    <TableContainer>
                                        <thead>
                                            <th>#</th>
                                            <th>Category</th>
                                            <th>File Name</th>
                                            <th className='text-center'>Action</th>

                                        </thead>
                                        <tbody>
                                            {mediaData && mediaData.map((li, i) => {
                                                return (
                                                    <tr >
                                                        <td style={{ backgroundColor: 'white' }}>{i + 1}</td>
                                                        <td style={{ backgroundColor: 'white' }}>{li.category}</td>
                                                        <td style={{ backgroundColor: 'white' }}>{li.fileName}</td>
                                                        <td style={{ backgroundColor: 'white' }} className='text-center'>
                                                            <Link to={li.url} target='_blank' title='View Document'> <i className="bi bi-eye-fill"></i></Link>

                                                        </td>
                                                        {/* <td ><img src={li.url} style={{width:'100%'}}/></td> */}

                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </TableContainer>
                                    :
                                    <img className='imageNoDataFound' src={NoDataFound} alt='' />
                                }
                    </div>

                    }
                    
                </div>
            </div>
            <div className='col-md-6 col-sm-12 prt1'>
                <div className='row pt-2 p-0 m-0 boxcontainer investopd'>
                    {
                        showTestList === 1 ? <OPDInvestigationRightList uhid={activeUHID} /> :
                            <OPDInvestigationRight activeSubId={activeSubId} callingpage={0} uhid={activeUHID} />
                    }
                </div>
            </div>
        </div>

    )
}
