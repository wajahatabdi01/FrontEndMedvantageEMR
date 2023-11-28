import React, { useEffect, useState } from 'react'
import AlertToster from '../../../../Component/AlertToster'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getPatinetSendData } from '../../../../Reduce/OPD/PatinetSendData'
import store from '../../../../Store'
import { getIPDUHIDChangeData } from '../../../../Reduce/IPD/IPDUHIDChange';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function IPDPatientTab(props) {

    const {t} = useTranslation();
    document.body.dir = i18n.dir()
    let [patientList, setPatientList] = useState(null)
    let [activeTab, setActiveTab] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    let navigate = useNavigate()



    let IPDUHIDChange = useSelector((state) => state.IPDUHIDChange)

    let handleremove = (index) => {
        let temp = [...patientList]
        temp.splice(index, 1)
        if (temp.length !== 0) {
            if (temp.length === 1) {
                setActiveTab(temp[0].uhId)
                window.sessionStorage.setItem("IPDpatientList", JSON.stringify(temp))
                let patientdata = JSON.parse(window.sessionStorage.getItem("IPDpatientsendData"))
                patientdata.splice(index, 1)
                window.sessionStorage.setItem("IPDpatientsendData", JSON.stringify(patientdata))
            }
            else {
                if ((temp.length) > 1) {
                    window.sessionStorage.setItem("IPDactivePatient", JSON.stringify({ "Uhid": temp[temp.length - 1].uhId }))
                    window.sessionStorage.setItem("IPDpatientList", JSON.stringify(temp))
                    setActiveTab(temp[temp.length - 1].uhId)
                }
                else {
                    console.log("activeTab", activeTab)
                    // window.sessionStorage.setItem("IPDactivePatient", JSON.stringify({ "Uhid": temp[activeTab].uhId }))
                }
            }
            setPatientList(temp)
        }
        else {

            window.sessionStorage.removeItem("IPDpatientList")
            window.sessionStorage.removeItem("IPDpatientsendData")
            window.sessionStorage.removeItem("IPDactivePatient")
            navigate("/ipdpatientlist/")
        }
    }
    let handleActiveTab = (ind) => {
        setActiveTab(patientList[ind].uhId)
        window.sessionStorage.setItem("IPDactivePatient", JSON.stringify({ "Uhid": patientList[ind].uhId }))
        props.handlepatientTab(0)
        store.dispatch(getIPDUHIDChangeData(patientList[ind].uhId))
    }
    useEffect(() => {
        setPatientList(window.sessionStorage.getItem("IPDpatientList") ? JSON.parse(window.sessionStorage.getItem("IPDpatientList")) : null)
        setActiveTab(window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : "")
    }, [IPDUHIDChange])
    return (
        <div className='row  hideOnprint'>
          <div class="col-12">
            <div className='d-flex flex-row p-0 gap-2 comtab' >
                <div className='d-flex flex-row  gap-2 align-items-center tablist'>
                    <div className='position-relative' onClick={() => { props.handlepatientTab(1) }} >
                        <div className='d-flex flex-column opd-patient-tab1 patlist1' >
                            <label className='ptablist'>{t("patientList")}</label>
                        </div>
                        {/* <i className="fa  fa-circle-xmark  position-absolute" style={{ color: "red", top: -5, right: -5, fontSize: "16px" }} ></i> */}
                    </div>
                    <div className='boxcontainer ptab'>
                    {patientList && patientList.map((val, ind) => {
                        return (
                            <div className='boxcontainer1 ptab1' onClick={() => { handleActiveTab(ind) }} >
                                <div className='position-relative d-flex flex-column opd-patient-tab1 patientper p-1' style={{ backgroundColor: `${val.uhId === activeTab ? "#d1daf1" : "white"}` }}>
                                    <label>{val.patientName.toUpperCase()} <span className='patage'>{val.age}/</span><span className='patgender'>{val.gender[0]}</span> <span className='uhidd'>{val.uhId}</span></label>
                                    {/* <label style={{ fontSize: "12px", fontWeight: "600" }}>UHID </label> */}
                                    <i className="fa  fa-circle-xmark pointer position-absolute closeicn"  onClick={() => { handleremove(ind) }}></i>
                                </div>
                               
                            </div>
                        )
                    })}
                    </div>
                </div>
                {props.showPatientPersnalDataIcon === 1 ?
                    <div className='d-flex flex-row gap-3'>
                        <Link to='/personalDashboardIndexSecond/' onClick={() => { props.setShowDataType(0) }} title='Body Parts'><i className="bi bi-grid-1x2-fill"></i></Link>
                        <Link to='/patientpersonalDashboardipd/' onClick={() => { props.setShowDataType(1) }} title='Personal Dashboard'><i className="bi bi-filter-square-fill"></i></Link>
                    </div>
                    : ""}
                {showToster === 1 ? <AlertToster message={message} handle={setShowToster} /> : ""}

            </div>
          </div>
        </div>
    )
}
