import React, { useEffect, useState } from 'react'
import AlertToster from '../../../../Component/AlertToster'
import { useSelector } from 'react-redux'
// import POSTVisitRevisit from '../../../../API/OPD/Prescription/POSTVisitRevisit'
import { useNavigate } from 'react-router-dom'
import store from '../../../../Store'
import { getPatinetSendData } from '../../../../Reduce/OPD/PatinetSendData';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OPDPatientTabs(props) {
    const {t} = useTranslation(); 
document.body.dir = i18n.dir();
    let [message, setMessage] = useState("")
    let [showToster, setShowToster] = useState(0)
    let navigate = useNavigate()
    let UHIDSearch = useSelector((state) => state.UHIDSearch["uhidSearch"])
    let response = useSelector((state) => state.PatientData["patientData"])
    let patientsendData = useSelector((state) => state.PatientSendData["patientSendData"])


    let [patientList, setPatientList] = useState(null)
    let [activeTab, setActiveTab] = useState(0)


    let getdatas = async () => {
        try {
            if (UHIDSearch != "") {

                if (response.status === 1) {
                    if (response.responseValue[0].crNo != null) {
                     
                        // props.getdata([0, 3])
                        // props.handlePopUp(0)
                        if (patientList != null) {
                            setPatientList([...patientList, response.responseValue[0]])
                            window.sessionStorage.setItem("patientList", JSON.stringify([...patientList, response.responseValue[0]]))
                        }
                        else {
                            setPatientList([response.responseValue[0]])
                            window.sessionStorage.setItem("patientList", JSON.stringify([response.responseValue[0]]))
                        }
                    }
                    else {
                        // fresh
                        // props.handlePopUp(1)
                        // let sendData = {
                        //     "uhId": JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid,
                        //     "deptId": JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId,
                        //     "userId": window.userId,
                        // }
                        if (patientList != null) {
                            setPatientList([...patientList, response.responseValue[0]])
                            window.sessionStorage.setItem("patientList", JSON.stringify([...patientList, response.responseValue[0]]))
                        }
                        else {
                            setPatientList([response.responseValue[0]])
                            
                            window.sessionStorage.setItem("patientList", JSON.stringify([response.responseValue[0]]))
                        }
                        // let responsedd = await POSTVisitRevisit(sendData)
                    }
                }
                else {
                    setShowToster(1)
                    setMessage("UHID Not Found!!!")
                }
            }
        }
        catch (e) {
            setShowToster(1)
            setMessage(e.message)
        }
    }

    let handleremove = (index) => {
        try {


            let temp = [...patientList]
            temp.splice(index, 1)

            let patientsendData = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
            let tempPatient = [...patientsendData]
            let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
            patientsendData.map((value, index) => {

                if (value[0] === activeUHID) {
                    tempPatient.splice(index, 1)
                    window.sessionStorage.setItem("patientsendData", JSON.stringify(tempPatient))
                }
            })

            if (temp.length != 0) {
                if (temp.length === 1) {
                    setActiveTab(0)

                    window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": temp[0].uhId }))
                    window.sessionStorage.setItem("patientList", JSON.stringify(temp))
                }
                else {

                    if (activeTab > (temp.length - 1)) {

                        window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": temp[temp.length - 1].uhId }))

                        window.sessionStorage.setItem("patientList", JSON.stringify(temp))
                       
                        setActiveTab(temp.length - 1)
                    }
                    else {
                       
                        window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": temp[activeTab].uhId }))
                    }


                }
                setPatientList(temp)
            }
            else {
                window.sessionStorage.removeItem("activePatient")
                window.sessionStorage.removeItem("patientList")
                window.sessionStorage.removeItem("patientList")
                window.sessionStorage.removeItem("patientsendData")
                window.sessionStorage.removeItem("Invest")
                window.sessionStorage.removeItem("PopUpData")
                window.sessionStorage.removeItem("OPDPatientData")
                navigate("/opdpatientlist/")
            }
        }
        catch (e) {
            setShowToster(1)
            setMessage(e)
        }
    }

    let handleActiveTab = (ind) => {
        try {
            setActiveTab(patientList[ind].uhId)
            window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": patientList[ind].uhId }))
            store.dispatch(getPatinetSendData(JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid))
            props.handlepatientTab(0)
        }
        catch (e) {
            setShowToster(1)
            setMessage(e)
        }

    }

    useEffect(() => {
        // let data = JSON.parse(window.sessionStorage.getItem("patientList"))
        setPatientList(window.sessionStorage.getItem("patientList") ? JSON.parse(window.sessionStorage.getItem("patientList")) : null)
        setActiveTab(JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid)
        store.dispatch(getPatinetSendData(JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid))
        // getdatas()
    }, [UHIDSearch, response])



    return (
        <div className='row' id="hello">
           <div class="col-12">
                <div className='d-flex flex-row p-0 gap-2 comtab'>
                   <div className='d-flex flex-row  gap-2 align-items-center tablist'>
                    <div className='position-relative' onClick={() => { props.handlepatientTab(1) }} >
                        <div className='d-flex flex-column opd-patient-tab1 patlist1'>
                            <label className='ptablist'>{t("APPOINTMENT_LIST")}</label>
                        </div>
                        {/* <i className="fa  fa-circle-xmark  position-absolute" style={{ color: "red", top: -5, right: -5, fontSize: "16px" }} ></i> */}
                    </div>
                    
                    <div className='boxcontainer ptab'>
                    {patientList && patientList.map((val, ind) => {
                        return (
                            <div className='boxcontainer1 ptab1'>
                                <div className='position-relative d-flex flex-row opd-patient-tab1 patientper p-1' onClick={() => { handleActiveTab(ind); }} style={{ background: `${val.uhId === activeTab ? "#d1daf1" : "white"}` }}>
                                    <label>{val.patientName.toUpperCase()} <span  className='patage'>{val.age}{val.ageUnit[0].toUpperCase()}/{val.gender !== null ? val.gender[0] : ""}</span> <span className='uhidd'>({val.uhId})</span>  </label>
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
    )

}
