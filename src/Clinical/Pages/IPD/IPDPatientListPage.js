import React, { useEffect, useState } from 'react'
// import TableContainer from '../../../Components/TableContainer'
import GetPatientList from '../../API/IPD/GetPatientList'
import { Link, useNavigate } from 'react-router-dom'
import store from '../../../Store'
import { getIPDUHIDChangeData } from '../../../Reduce/IPD/IPDUHIDChange'
// import searchIcon from "../../../assets/images/Navbar/search.svg"
// import viewIcon from "../../../assets/images/icons/viewIcon.svg"

import bedicn from "../../../assets/images/PatientListIcons/bedicn.svg"
import bedttransicn from "../../../assets/images/PatientListIcons/bedttransicn.svg"
import chaticn from "../../../assets/images/PatientListIcons/chaticn.svg"
import dwnicn from "../../../assets/images/PatientListIcons/dwnicn.svg"
import graphicn from "../../../assets/images/PatientListIcons/graphicn.svg"
import notiicn from "../../../assets/images/PatientListIcons/notiicn.svg"
import pdficn from "../../../assets/images/PatientListIcons/pdficn.svg"
import printicn from "../../../assets/images/PatientListIcons/printicn.svg"
import viewicn from "../../../assets/images/PatientListIcons/viewicn.svg"
import upDownIcon from "../../../assets/images/icons/upDownIcon.svg"

import Search, { FindByQuery } from '../../../Code/Serach'
import GetDischargePatientList from '../../API/IPD/GetDischargePatientList'
import AlertToster from '../../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function IPDPatientListPage(props) {

    const {t} = useTranslation();

    let patientsendData = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []

    let [patientList, setPatientList] = useState([])
    let [patientListTemp, setPatientListTemp] = useState([])
    let [dischargePatientList, setDischargePatientList] = useState([])
    let [dischargePatientListTemp, setDischargePatientListTemp] = useState([])
    let [showAlert, setShowAlert] = useState(0)

    let [showTab, setShowTab] = useState(0)

    // let navigate = useNavigate()
    let navigate = useNavigate()

    let getPatientList = async () => {
        let response = await GetPatientList()
        if (response.status === 1) {
            setPatientList(response.responseValue)
            setPatientListTemp(response.responseValue)
        }
    }

    let getDischargePatient = async () => {
        let response = await GetDischargePatientList()
        if (response.status === 1) {
            setDischargePatientList(response.responseValue)
            setDischargePatientListTemp(response.responseValue)
        }
    }

    let handleActiveTab = (val) => {
        let oldPatientList = window.sessionStorage.getItem("IPDpatientList") ? JSON.parse(window.sessionStorage.getItem("IPDpatientList")) : []
        let response = FindByQuery(oldPatientList, val.uhId, "uhId")
        
        if (response.length === 0) {

            let menus = window.sessionStorage.getItem("departmentmenu") ? JSON.parse(window.sessionStorage.getItem("departmentmenu")).menuList : []
            let wardId = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
            let wardname = JSON.parse(window.sessionStorage.getItem("activePage")).wardName
            let departmentName = JSON.parse(window.sessionStorage.getItem("activePage")).departmentName ? JSON.parse(window.sessionStorage.getItem("activePage")).departmentName : ""
            let DepartmentId = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId ? JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId : null
            let menuName = menus.length !== 0 ? menus[0].menuName : ""
            let menuId = menus.length !== 0 ? menus[0].menuId : ""
            window.sessionStorage.removeItem("activePage")
            window.sessionStorage.setItem("activePage", JSON.stringify({ "WardId": wardId, "wardName": wardname, "DepartmentId": DepartmentId, "departmentName": departmentName, "menuName": menuName, "menuId": menuId }))

            // maintain session end



            if (props.showNavbar === 0) {
                props.setShowPatientList(0)
            }
           
            if (menus.length !== 0) {
                if (props.setShowMenu !== undefined) {
                    props.setShowMenu(1)
                }
                window.sessionStorage.setItem("IPDpatientList", JSON.stringify([...oldPatientList, val]))
                window.sessionStorage.setItem("IPDactivePatient", JSON.stringify({ "Uhid": val.uhId }))
                window.sessionStorage.setItem("IPDpatientsendData", JSON.stringify([...patientsendData, [val.uhId]]))
                store.dispatch(getIPDUHIDChangeData(val.uhId))
                let url = menus[0].url
                navigate("/prescriptionipd/")
            }

            else {
                navigate("/ipdpatientlist/")
            }
        }
        else {
            setShowAlert(1)
        }

    }

    let handleTab = (value) => {

        if (value === 0) {
            setShowTab(0)
        }
        else {
            setShowTab(1)
        }
    }
    let handleSearch = (e) => {

        if (showTab === 0) {
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
        else {
            if (e.target.value !== "") {
                let result = Search(dischargePatientList, e.target.value)
                if (result.length != 0) {
                    setDischargePatientListTemp(result)
                }
                // else {
                //     setPatientListTemp(patientList)
                // }
            }
            else {
                setDischargePatientListTemp(dischargePatientList)
            }
        }


    }
    // let dischargehandleSearch = (e) => {
    //     if (e.target.value !== "") {
    //         let result = Search(dischargePatientList, e.target.value)
    //         if (result.length != 0) {
    //             setDischargePatientListTemp(result)
    //         }
    //         // else {
    //         //     setPatientListTemp(patientList)
    //         // }
    //     }
    //     else {
    //         setDischargePatientListTemp(dischargePatientList)
    //     }


    // }

    useEffect(() => {
        getPatientList()
        getDischargePatient()
    }, []);

    document.body.dir = i18n.dir()
    return (
        <>
            {/* {props.showNavbar === 1 ?
                <div className='layOutSurgeryOTNavbar'>
                    <div>
                        <div className="offcanvas-logo">
                            <Link to="/dashboard/"><img src={OffcanvasLogo} /></Link>
                        </div>
                    </div>

                    <Navbar />
                </div>
                : ""} */}
            <div className='main-content_ mt-5_ pt-3' style={{marginTop:'37px'}}>
                <div className='med-box py-2 ps-2 pe-2'>
                    <div className={`${props.showNavbar === 1 ? "otDashboardWrapper" : ""} `}>
                        <div className='tabular-section tabb pb-2'>
                            <ul className="nav nav-pills  ipdTab" id="pills-tab" role="tablist" >
                                <li className="nav-item" role="presentation" onClick={() => { handleTab(0) }}>
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#admittedPatient" type="button" role="tab" aria-controls="pills-home" aria-selected="true" name={0} >{t("ADMITTED_PATIENTS")}</button>
                                </li>
                                {/* <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#consultation" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Consultation Patient</button>
                                       </li> */}
                                <li className="nav-item" role="presentation" onClick={() => { handleTab(1) }}>
                                    <button className="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#admittedPatient" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" name={1}>{t("DISCHARGED_PATIENTS")}</button>
                                </li>

                            </ul>

                            <div className="tab-content">
                                <div className='tab-pane fade show active' id='admittedPatient'>
                                    <div className='d-flex justify-content-between ps-2 pe-2'>
                                        <div className="title">{showTab === 0 ? `${t("ADMITTED_PATIENT_LIST")}` : `${t("DISCHARGED_PATIENT_LIST")}`}</div>
                                        <div className={`col-3 mt-2_ pt-2_ pe-2 position-relative serip`} >
                                            <input type='text' placeholder=  {t("Search")}  className='searchBarOPD searchipdo' onChange={handleSearch} />
                                            {/* <img src={searchIcon} className='searchBarOPDIcon' /> */}
                                            <i className='fa fa-search'></i>
                                        </div>
                                    </div>
                                    <div className='med-table-section' style={{ height: 'calc(100vh - 215px)', marginTop: '5px' }}>
                                        <table className='med-table border_ border-bottom_ striped med-table-ipd'>
                                            <thead>
                                                <th className='text-center pe-1' style={{ width: '3%' }}>#</th>
                                                <th className='pe-3'>{t("Patient_nm")}</th>
                                                {/* <th className='pe-3'>{t("Uhid")} </th> */}
                                                <th className='pe-3'>{t("IP_No")}</th>
                                                <th className='pe-3'>{t("Contact_No.")} </th>
                                                <th className='pe-3'>{t("Admission_Date")}</th>
                                                <th className='pe-3'>{t("CONSULTANT")}</th>
                                                <th className='pe-3'>{t("DIAGNOSIS")}</th>
                                                {/* <th>Nurse Details</th> */}
                                                <th className='pe-3'>{t("WARD_BED")}</th>
                                                <th className='text-center_'>{t("Action")}</th>
                                            </thead>
                                            <tbody>
                                               
                                                {showTab === 0 ? <>
                                                    {patientListTemp && patientListTemp.map((val, ind) => {
                                                        
                                                        return (
                                                            <tr className=''>
                                                                <td className='text-center pe-1'>{ind + 1}</td>
                                                                <td className='pe-3'><span className='txtb'>{val.patientName.toUpperCase()}</span><span className='txtb1'> ({val.age ? val.age :''}{val.ageType ? val.ageType :''}/{val.gender})</span><span className='uhidnao'>{val.uhId}</span></td>
                                                                {/* <td className='pe-3'>{val.uhId}</td> */}
                                                                <td className='pe-3'>{val.ipNo}</td>
                                                                <td className='pe-3'>{val.mobileNo}</td>
                                                                <td className='pe-3'>{val.admittedDate}</td>
                                                                <td className='pe-3'>{val.doctorName || val.name}</td>
                                                                <td className='pe-3'>
                                                                    <div className='d-flex gap-2 flex-wrap'>
                                                                        {val.diagnosis ? val.diagnosis.split(",").map((val, ind) => {
                                                                            return (
                                                                                <span className='diagnosisVal'>{val}</span>
                                                                            )
                                                                        }) : "-"}

                                                                    </div>
                                                                </td>
                                                                <td className='pe-3'>
                                                                    <div className='actionpatientlist1'>
                                                                        <span>{val.wardName}/{val.bedName}</span>
                                                                        {/* <img src={bedicn} className='bgicn' alt="Bed" title="Bed" />
                                                                        <img src={printicn} className='bgicn' alt="Print" title="Print" /> */}
                                                                    </div>
                                                                </td>
                                                                <td className='pointer text-center'>
                                                                    <div className='actionpatientlist'>
                                                                        <span><span onClick={() => { handleActiveTab(val) }}> <img src={viewicn} className='bgicn' alt="View" title="View" /></span></span>
                                                                        {/* <span><img src={bedttransicn} className='bgicn' alt="" title=""></img></span>
                                                                        <span><img src={notiicn} className='bgicn' alt="" title=""></img></span>
                                                                        <span><img src={dwnicn} className='bgicn' alt="" title="" data-bs-toggle="collapse" href={'#admittedDrp' + ind + 1} role="button" aria-expanded="false" ></img></span> */}
                                                                    </div>
                                                                    {/* <div className='actionpatientlist collapse multi-collapse' id={'admittedDrp' + ind + 1}>
                                                                        <span><img src={printicn} className='bgicn' alt="" title=""></img></span>
                                                                        <span><img src={chaticn} className='bgicn' alt="" title=""></img></span>
                                                                        <span><img src={pdficn} className='bgicn' alt="" title=""></img></span>
                                                                        <span><img src={graphicn} className='bgicn' alt="" title=""></img></span>
                                                                    </div> */}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </> :
                                                    <>
                                                        {dischargePatientListTemp && dischargePatientListTemp.map((val, ind) => {
                                                            return (
                                                                <tr className=''>
                                                                    <td className='text-center pe-1'>{ind + 1}</td>
                                                                    <td className='pe-3'><span className='txtb'>{val.patientName}</span><span className='txtb1'> ({val.age}/{val.gender})</span></td>
                                                                    <td className='pe-3'>{val.uhId}</td>
                                                                    <td className='pe-3'>{val.ipNo}</td>
                                                                    <td className='pe-3'>{val.mobileNo}</td>
                                                                    <td className='pe-3'>{val.admittedDate}</td>
                                                                    <td className='pe-3'>{val.doctorName}</td>
                                                                    <td className='pe-3'>
                                                                        <div className='d-flex gap-2 flex-wrap'>
                                                                            {val.diagnosis ? val.diagnosis.split(",").map((val, ind) => {
                                                                                return (
                                                                                    <span className='diagnosisVal'>{val}</span>
                                                                                )
                                                                            }) : "-"}

                                                                        </div>
                                                                    </td>
                                                                    <td className='pe-3'>
                                                                        <div className='actionpatientlist1'>
                                                                            <span>{val.wardName}/{val.bedName}</span>
                                                                            <img src={bedicn} className='bgicn' alt="Bed" title="Bed" />
                                                                            <img src={printicn} className='bgicn' alt="Print" title="Print" />
                                                                        </div>
                                                                    </td>
                                                                    <td className='pointer text-center'>
                                                                        <div className='actionpatientlist'>
                                                                            <span><span onClick={() => { handleActiveTab(val) }}> <img src={viewicn} className='bgicn' alt="View" title="View" /></span></span>
                                                                            {/* <span><img src={bedttransicn} className='bgicn' alt="" title=""></img></span>
                                                                            <span><img src={notiicn} className='bgicn' alt="" title=""></img></span>
                                                                            <span><img src={dwnicn} className='bgicn' alt="" title="" data-bs-toggle="collapse" href={'#admittedDrp' + ind + 1} role="button" aria-expanded="false" ></img></span> */}
                                                                        </div>
                                                                        {/* <div className='actionpatientlist collapse multi-collapse' id={'admittedDrp' + ind + 1}>
                                                                            <span><img src={printicn} className='bgicn' alt="" title=""></img></span>
                                                                            <span><img src={chaticn} className='bgicn' alt="" title=""></img></span>
                                                                            <span><img src={pdficn} className='bgicn' alt="" title=""></img></span>
                                                                            <span><img src={graphicn} className='bgicn' alt="" title=""></img></span>
                                                                        </div> */}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </>
                                                }

                                            </tbody>

                                        </table>
                                    </div>

                                    <div className="pagginationSection" style={{marginTop:'11px'}}>
                                        <div className="paginationItemContainer">
                                            <div className="d-flex gap-2 align-items-center">
                                                <span className="spanText" style={{ minWidth: '140px' }}> {t("THE_PAGE_YOU_ARE_ON")}</span>
                                                <select name="" id="" className="form-select form-select-sm pagginationDrp">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                            <div className="d-flex gap-2 align-items-center">
                                                <span className="spanText">{t("Previous")}</span> <i className="bi bi-arrow-left"></i>
                                                <i className="bi bi-arrow-right"></i> <span className="spanText">{t("NEXT")}</span>
                                            </div>
                                        </div>
                                    </div>



                                </div>


                            </div>
                        </div>

                    </div>

                </div>

            </div>
            {showAlert === 1 ? <AlertToster handle={setShowAlert} message= {t("PATIENT_ALREADY_EXISTS")}/> : ""}
        </>
    )
}

