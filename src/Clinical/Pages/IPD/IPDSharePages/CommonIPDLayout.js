import React, { useEffect, useState } from 'react'
import IPDPatientTab from './IPDPatientTab'
import IPDPatientListPage from '../IPDPatientListPage'

export default function CommonIPDLayout({ props }) {
    let [activePage, setActivePage] = useState("")
    let [showPatientList, setShowPatientList] = useState(0)
    let [showDataType, setShowDataType] = useState(0)
    useEffect(() => {
        setActivePage(props.Component)
    }, [props])
    return (
        <> 
        <div className='main-content mt-5 pt-3'>
         <div className='container-fluid'>
            <IPDPatientTab handlepatientTab={setShowPatientList} showPatientPersnalDataIcon={props.name.toString().trim().toLowerCase() === "patientpersonalDashboardipd".toString().trim().toLowerCase() ? 1 : 0} setShowDataType={setShowDataType} />
            {
                showPatientList === 1 ? <IPDPatientListPage showNavbar={0} setShowPatientList={setShowPatientList} /> : ""
            }
            {activePage !== "" ? showPatientList !== 1 ? activePage : "" : ""}
            </div>
        </div>
        </>
    )
}
