import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import store from '../../../Store'
import { getUHIDSearch } from '../../../Reduce/OPD/UHIDSearch'
import { getIPDPatientData } from '../../../Reduce/IPD/IPDPatientData'
import { getPatientData } from '../../../Reduce/OPD/PatientData'

import searchIcon from "../../../assets/images/Navbar/search.svg"
import viewIcon from "../../../assets/images/icons/viewIcon.svg"
import Search, { FindByQuery } from '../../../Code/Serach'
import AlertToster from '../../../Component/AlertToster'
import GetOPDPatientList from '../../API/OPD/GetOPDPatientList'
import GetCheckCrNo from '../../API/OPD/Prescription/GetCheckCrNo'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function OPDPatientList(props) {

    const { t } = useTranslation();

    let [patientList, setPatientList] = useState([])
    let [patientListTemp, setPatientListTemp] = useState([])
    let [showAlert, setShowAlert] = useState(0)
    let [showAlertMessage, setShowAlertMessage] = useState(0)
    let getdata = async () => {
        let response = await GetOPDPatientList()
        if (response.status === 1) {
            setPatientList(response.responseValue)
            setPatientListTemp(response.responseValue)
        }
    }

    let [serachdata, setSearchData] = useState("")
    let navigate = useNavigate()
    let patientsendData = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []


    let func = async (response, uhid) => {
        let patientList = window.sessionStorage.getItem("patientList") ? JSON.parse(window.sessionStorage.getItem("patientList")) : ""
        if (response.status === 1) {
            if (patientList != "") {
                let flag = null
                flag = patientList.filter(item => item.uhId.toLowerCase().includes(response.responseValue[0].uhId.toLowerCase()));
               
                if (flag.length === 0 && flag != null) {
                    store.dispatch(getUHIDSearch(uhid))
                    store.dispatch(getPatientData(response))
                    window.sessionStorage.setItem("patientList", JSON.stringify([...patientList, response.responseValue[0]]))
                    let t = [response.responseValue[0].uhId]
                    window.sessionStorage.setItem("patientsendData", JSON.stringify([...patientsendData, t]))
                    window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": uhid }))
                    
                    if (props.showPatientListValue === 1) {
                        props.setShowPatientList(0)
                        if (props.setShowMenu !== undefined) {

                            props.setShowMenu(1)
                        }
                        navigate(window.location.pathname)

                    }
                    else {
                        props.setShowMenu(1)
                        let menus = window.sessionStorage.getItem("departmentmenu") ? JSON.parse(window.sessionStorage.getItem("departmentmenu")) : []


                        let wardId = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
                        let wardname = JSON.parse(window.sessionStorage.getItem("activePage")).wardName
                        let departmentName = JSON.parse(window.sessionStorage.getItem("activePage")).departmentName ? JSON.parse(window.sessionStorage.getItem("activePage")).departmentName : ""
                        let DepartmentId = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId ? JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId : null
                        let menuName = menus[0].menuName
                        let menuId = menus[0].menuId

                        window.sessionStorage.removeItem("activePage")
                        window.sessionStorage.setItem("activePage", JSON.stringify({ "WardId": wardId, "wardName": wardname, "DepartmentId": DepartmentId, "departmentName": departmentName, "menuName": menuName, "menuId": menuId }))

                        if (menus.length !== 0) {
                            let url = menus[0].url
                            navigate(url)
                        }
                        else {
                            navigate("/opdpatientlist/")
                        }
                    }
                }

            }
            else {
                
                store.dispatch(getUHIDSearch(uhid))
                store.dispatch(getPatientData(response))
                window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": uhid }))
                let t = [response.responseValue[0].uhId]
                window.sessionStorage.setItem("patientList", JSON.stringify([...patientList, response.responseValue[0]]))

                window.sessionStorage.setItem("patientsendData", JSON.stringify([...patientsendData, t]))
                if (props.showPatientListValue === 1) {
                    props.setShowPatientList(0)
                    if (props.setShowMenu !== undefined) {

                        props.setShowMenu(1)
                    }

                    navigate(window.location.pathname)

                }
                else {
                    if (props.setShowMenu !== undefined) {

                        props.setShowMenu(1)
                    }

                    let menus = window.sessionStorage.getItem("departmentmenu") ? JSON.parse(window.sessionStorage.getItem("departmentmenu")).menuList : []


                    let wardId = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
                    let wardname = JSON.parse(window.sessionStorage.getItem("activePage")).wardName
                    let departmentName = JSON.parse(window.sessionStorage.getItem("activePage")).departmentName ? JSON.parse(window.sessionStorage.getItem("activePage")).departmentName : ""
                    let DepartmentId = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId ? JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId : null
                    let menuName = menus[0].menuName
                    let menuId = menus[0].menuId

                    window.sessionStorage.removeItem("activePage")
                    window.sessionStorage.setItem("activePage", JSON.stringify({ "WardId": wardId, "wardName": wardname, "DepartmentId": DepartmentId, "departmentName": departmentName, "menuName": menuName, "menuId": menuId }))

                    if (menus.length !== 0) {
                        let url = menus[0].url
                        navigate(url)
                    }
                    else {
                        navigate("/opdpatientlist/")
                    }

                }

            }

        }
        else {
            // props.setShowMessage(response.responseValue)
            // props.setShowToster(1)
        }
    }

    let handleActiveTab = async (data) => {
        let tempPList = window.sessionStorage.getItem("patientList") ? JSON.parse(window.sessionStorage.getItem("patientList")) : []
        if (tempPList.length !== 0) {
            let response = FindByQuery(tempPList, data.uhid, "uhId")
            if (response.length !== 0) {
                setShowAlert(1)
                setShowAlertMessage("Patient Already Exists !!")
            }
            else {
                let response = await GetCheckCrNo(data.uhid)
                func(response, data.uhid)
                if (window.sessionStorage.getItem("OPDPatientData")) {
                   
                    let temp = JSON.parse(window.sessionStorage.getItem("OPDPatientData"))
                    temp.push(data)
                    window.sessionStorage.setItem("OPDPatientData", JSON.stringify(temp))
                }
                else {
                    

                    window.sessionStorage.setItem("OPDPatientData", JSON.stringify([data]))

                }
            }

        }
        else {
            let response = await GetCheckCrNo(data.uhid)
            func(response, data.uhid)
            if (window.sessionStorage.getItem("OPDPatientData")) {
                
                let temp = JSON.parse(window.sessionStorage.getItem("OPDPatientData"))
                temp.push(data)
                window.sessionStorage.setItem("OPDPatientData", JSON.stringify(temp))
            }
            else {
                

                window.sessionStorage.setItem("OPDPatientData", JSON.stringify([data]))

            }
        }

    }

    let handleSearch = (e) => {
        if (e.target.value !== "") {
            let result = Search(patientList, e.target.value)
            if (result.length != 0) {
                setPatientListTemp(result)
            }
            // else {
            //     setPatientListTemp(patientList)
            // }
        }
        else {
            setPatientListTemp(patientList)
        }


    }
    useEffect(() => {
        getdata()
        if (props.showPatientListValue === 0) {
            window.sessionStorage.removeItem("activePatient")
            window.sessionStorage.removeItem("patientList")
            window.sessionStorage.removeItem("patientList")
            window.sessionStorage.removeItem("patientsendData")
            window.sessionStorage.removeItem("Invest")
            window.sessionStorage.removeItem("PopUpData")
            window.sessionStorage.removeItem("OPDPatientData")
            if (props.handlepatientTab !== 1) {
                window.sessionStorage.removeItem("patientList")


            }
        }
    }, [])

    document.body.dir = i18n.dir();

    return (
        <div className='main-content_ mt-5 pt-3 mainn'>
            <div className='med-box'>
                <div className={""}>
                    <div className='d-flex justify-content-between ps-2 pe-2'>
                        <div className="title">{t("APPOINTMENT_LIST")}</div>
                        <div className={`col-3 mt-2 pt-2 pe-2 position-relative`} >
                            <input type='text' placeholder={t("Search")} className='searchBarOPD' onChange={handleSearch} />
                            <img src={searchIcon} className='searchBarOPDIcon' alt='' />
                        </div>
                    </div>
                    <div className='med-table-section' style={{ height: '87vh' }}>
                        <table className='med-table border_ striped med-table-ipd'>
                            <thead>
                                <th className='text-center pe-1'>#</th>
                                <th>{t("Patient_nm")}</th>
                                {/* <th>{t("Uhid")}</th> */}
                                <th>{t("Visit_No")}</th>
                                <th>{t("Contact_No.")}</th>
                                <th>{t("VISIT_DATE")}</th>
                                <th>{t("CONSULTANT")}</th>
                                <th>{t("PATIENT_TYPE")}</th>
                                {/* <th>Nurse Details</th> */}
                                <th>{t("Action")}</th>
                            </thead>
                            <tbody>
                                {patientListTemp && patientListTemp.map((val, ind) => {
                                    return (
                                        <tr>
                                            <td className='text-center pe-1'>{ind + 1}</td>
                                            <td>
                                                <span className='txtb'>{val.patientName.toUpperCase()}</span><span className='txtb'> {val.lastName.toUpperCase()?val.lastName.toUpperCase():''}</span> <span className='txtb1'>({val.age ? val.age : "-"}{val.ageTyepe ? val.ageTyepe : ''}/{val.genderName ? val.genderName : "-"})</span>
                                                <span className='uhidnao'>{val.uhid}</span>
                                            </td>
                                            {/* <td>{val.uhid}</td> */}
                                            <td>{val.crNo}</td>
                                            <td>{val.mobileNo}</td>
                                            <td>{val.visitDate}</td>
                                            <td>{val.doctorName || val.name}</td>
                                            <td> <div className='text-center ps-2 pe-2' style={{ width: "80px", borderRadius: "5px", fontSize: "12px", fontWeight: "600", padding: "3px", color: `${val.patientType.toString().toLowerCase() === "Old".toString().toLowerCase() ? "#C77700" : "#5651F9"}`, fontSize: "12px", backgroundColor: `${val.patientType.toString().toLowerCase() === "Old".toString().toLowerCase() ? "#FFEDD2" : "#EBECFD"}` }}>{val.patientType.toString().toLowerCase() === "Old".toString().toLowerCase() ? "FOLLOWUP" : val.patientType.toUpperCase()}</div> </td>
                                            <td className='pointer' title='Open Profile'><span onClick={() => { handleActiveTab(val) }} title='Open Profile'> <img src={viewIcon} className='bgicn' alt='Open Profile' /></span></td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>

            {
                showAlert === 1 ?
                    <AlertToster handle={setShowAlert} message={showAlertMessage} />

                    : ""
            }
        </div>
    )
}

