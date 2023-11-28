import React, { useEffect, useState } from 'react'
import TableContainer from '../../../../../Component/TableContainer'
import Heading from '../../../../../Component/Heading'
// import GetCategoryMaster from '../../../../../Lab/API/CategoryMaster/GetCategoryMaster'
import DepartmentNavbar from '../OPDInvestigation/DepartmentNavbar'
import OPDInvestigationRight from '../OPDInvestigation/OPDInvestigationRight'
import { useSelector } from 'react-redux'
export default function OPDPatientLabDetails() {

    let [activeId, setActiveId] = useState("")
    let [activeUHID, setActiveUHID] = useState("")
    // let [activeSubId, setActiveSubId] = useState("")
    let patientsendData = useSelector((state) => state.PatientSendData["patientSendData"])
    useEffect(() => {
        let uhid = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        setActiveUHID(uhid)
    }, [patientsendData])

    return (
        <div className='boxcontainer'>

            {/* <div className='d-flex flex-wrap p-2 gap-3'>
                <div className='opdLabDetailsbox '>
                    <span>Lab</span>
                </div>
                <div className='opdLabDetailsbox '>
                    <span>Radiology</span>
                </div>
                <div className='opdLabDetailsbox '>
                    <span>ECG</span>
                </div>
                <div className='opdLabDetailsbox '>
                    <span>Radiology</span>
                </div>
                <div className='opdLabDetailsbox '>
                    <span>ECH</span>
                </div>
                <div className='opdLabDetailsbox '>
                    <span>Lab</span>
                </div>
            </div> */}
            <div className='row p-0 m-0 boxcontainer'>
                <DepartmentNavbar getActiveID={setActiveId} callingpage={0} />
            </div>

            <div className='d-flex flex-column p-2 overflow-auto pb-2' style={{ height: "260px" }}>
                <OPDInvestigationRight activeSubId={activeId} callingpage={1} uhid={activeUHID}/>
            </div>
        </div>
    )
}
