import i18next from 'i18next';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AlertToster from '../../Component/AlertToster';

export default function PatientTabs() {
    const { t } = useTranslation();
    document.body.dir = i18next.dir()
    let [patientList, setPatientList] = useState(null)
    let [activeTab, setActiveTab] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    let navigate = useNavigate()




    let handleremove = (index) => {
        let temp = [...patientList]
        temp.splice(index, 1)
        if (temp.length !== 0) {
            if (temp.length === 1) {
                setActiveTab(temp[0].uhId)
                window.sessionStorage.setItem("activeUHIDdiet", JSON.stringify({ "Uhid": temp[0].uhId }))

                window.sessionStorage.setItem("activePatientDatadiet", JSON.stringify(temp))
                
            }
            else {
                if ((temp.length) > 1) {
                    window.sessionStorage.setItem("activeUHIDdiet", JSON.stringify({ "Uhid": temp[temp.length - 1].uhId }))
                    window.sessionStorage.setItem("activePatientDatadiet", JSON.stringify(temp))
                    setActiveTab(temp[temp.length - 1].uhId)
                }
                else {
                    console.log("activeTab", activeTab)
                    // window.sessionStorage.setItem("activeUHIDdiet", JSON.stringify({ "Uhid": temp[activeTab].uhId }))
                }
            }
            setPatientList(temp)
        }
        else {

            window.sessionStorage.removeItem("activePatientDatadiet")
            window.sessionStorage.removeItem("activeUHIDdiet")
            navigate("/dieteticsPatientList/")
        }
    }
    let handleActiveTab = (ind) => {
        setActiveTab(patientList[ind].uhId)
        window.sessionStorage.setItem("activeUHIDdiet", JSON.stringify({ "Uhid": patientList[ind].uhId }))
        
    }
    useEffect(() => {
        setPatientList(window.sessionStorage.getItem("activePatientDatadiet") ? JSON.parse(window.sessionStorage.getItem("activePatientDatadiet")) : JSON.parse(window.sessionStorage.getItem("IPDpatientList")) )
        setActiveTab(window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : "")
        console.log("cslcbdshcdsabjkcbdaskbcsvcdskjdvjkl", window.sessionStorage.getItem("activePatientDatadiet") ? JSON.parse(window.sessionStorage.getItem("activePatientDatadiet")) : null)
    }, [])
    return (
        <>
            <div className='row  hideOnprint'>
                <div class="col-12">
                    <div className='d-flex flex-row p-0 gap-2 comtab' >
                        <div className='d-flex flex-row  gap-2 align-items-center tablist'>
                            
                            <div className='boxcontainer ptab'>
                                {patientList && patientList.map((val, ind) => {
                                    return (
                                        <div className='boxcontainer1 ptab1' onClick={() => { handleActiveTab(ind) }} >
                                            <div className='position-relative d-flex flex-column opd-patient-tab1 patientper p-1' style={{ backgroundColor: `${val.uhId === activeTab ? "#d1daf1" : "white"}` }}>
                                                <label>{val.patientName.toUpperCase()} <span className='patage'>{val.age}/</span><span className='patgender'>{val.gender[0]}</span> <span className='uhidd'>{val.uhId}</span></label>
                                                {/* <label style={{ fontSize: "12px", fontWeight: "600" }}>UHID </label> */}
                                                <i className="fa  fa-circle-xmark pointer position-absolute closeicn" onClick={() => { handleremove(ind) }}></i>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {showToster === 1 ? <AlertToster message={message} handle={setShowToster} /> : ""}

                    </div>
                </div>
            </div>
        </>
    )
}

