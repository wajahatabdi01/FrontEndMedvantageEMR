import React, { useEffect, useState } from 'react'
import OPDPatientTabs from './OPDPatientTabs'
import OPDPatientList from '../OPDPatientList'
import OPDPrescriptionIndex from './OPDPrescription/OPDPrescriptionIndex'

export default function CommonOPDLayout({ props }) {
    let [handlepatientTab, setHandlePatientTab] = useState(0)
    let [activePage, setActivePage] = useState("")
    let [getata, setGetata] = useState("")
    let [popu, setPopu] = useState("")

    useEffect(() => {
        setActivePage(props.Component)
    }, [props])

    return (
        <>
        <div>
            <div className='main-content mt-5 pt-3'>
            <div className='container-fluid'>
                <OPDPatientTabs handlepatientTab={setHandlePatientTab} showPatientListValue={handlepatientTab} getdata={setGetata} handlePopUp={setPopu} />
                {handlepatientTab === 1 ? <OPDPatientList setShowPatientList={setHandlePatientTab} showPatientListValue={handlepatientTab} /> : ""}
                {activePage !== "" ? handlepatientTab !== 1 ? activePage : "" : ""}
            </div>
            </div>
        </div>
        </>
    )
}
