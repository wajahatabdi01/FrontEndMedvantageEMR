import React, { useEffect, useState } from 'react'
import OPDInvestigationRight from '../../../OPD/OPDSharePage/OPDInvestigation/OPDInvestigationRight'
import DepartmentNavbar from '../../../OPD/OPDSharePage/OPDInvestigation/DepartmentNavbar'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function IPDPatientLabData() {
    const {t} = useTranslation();

    let [activeId, setActiveId] = useState("")
    let [activeUHID, setActiveUHID] = useState("")
    // let [activeSubId, setActiveSubId] = useState("")
    let patientsendDataChange = useSelector((state) => state.IPDPatientSendData)

    useEffect(() => {
        let uhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid
        setActiveUHID(uhid)
    }, [patientsendDataChange]);

    document.body.dir = i18n.dir();
    return (
        <div className='roww boxcontainer mt-2 boxs'>
            <div className='row p-0 m-0 boxcontainer'>
                <DepartmentNavbar getActiveID={setActiveId} callingpage={0} />
            </div>

            <div className='d-flex flex-column p-2 overflow-auto pb-2 patlab' style={{ height: "662px_" }}>
                <OPDInvestigationRight activeSubId={activeId} callingpage={1} uhid={activeUHID} />
            </div>
        </div>
    )
}
