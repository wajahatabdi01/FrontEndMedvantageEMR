import React, { useState } from 'react'
import OffcanvasLogo from '../../../../assets/images/Navbar/offcanvas-logo.png'
import MaskGroup from "../../../../../src/assets/images/Navbar/MaskGroup.png";
import scheduleNavLinkicon from "../../../../../src/assets/images/Navbar/Layer.svg";

import PersonalDashboardIcon from "../../../../../src/assets/images/icons/PersonalDashboard.svg";
import IPDPrescriptionIcon from "../../../../../src/assets/images/icons/IPDPrescription.svg";
import VitalsIcon from "../../../../../src/assets/images/icons/Vitals.svg";
import InvestigationsIcon from "../../../../../src/assets/images/icons/Investigations.svg";
import CalculatorsIcon from "../../../../../src/assets/images/icons/Calculators.svg";
import DischargeCardIcon from "../../../../../src/assets/images/icons/DischargeCard.svg";
import PatientonVentilatorIcon from "../../../../../src/assets/images/icons/PatientonVentilator.svg";
import FoodIntakeIcon from "../../../../../src/assets/images/icons/FoodIntake.svg";
import PatientNotesIcon from "../../../../../src/assets/images/icons/PatientNotes.svg";
import PatientAnalyzingGraphIcon from "../../../../../src/assets/images/icons/PatientAnalyzingGraph.svg";
import HealthViewIcon from "../../../../../src/assets/images/icons/HealthView.svg";
import AssignMachineIcon from "../../../../../src/assets/images/icons/AssignMachine.svg";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


import { Link } from 'react-router-dom'
// import UHIDSearch from '../../Component/UHIDSearch'
import AlertToster from '../../../../Component/AlertToster'

export default function IPDSharePageSidebar() {
    const {t} = useTranslation();
    document.body.dir = i18n.dir()

    let [showToster, setShowToster] = useState(0)
    let [showMessage, setShowMessage] = useState("")

    let [activeTab, setActiveTab] =  useState(0)

    return (
        // < !--offCanvas navbar-- >  
        <div className="offcanvas offcanvas-start sidebar-nav shadow-sm rounded_" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header offcanvas-header-custome">
                <div className='offcanvas-logo-username'>
                    <div className='offcanvas-logoBorderBottom p-2_'>
                    <img src={MaskGroup} className="logoLeft" />
                        <div className='offcanvas-logo '>
                            <Link to="/dashboard/"> <img src={OffcanvasLogo} /></Link>
                        </div>
                    </div>
                    {/* <h5 className="offcanvas-title text-uppercase user-name text-center pt-3" id="offcanvasExampleLabel">UserName</h5> */}
                </div>





                <button type="button" className="btn-close btn-offcanvas-close btn-closeCustome" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
            </div>
            <div className="offcanvas-body p-0" >
                <nav className="navbar">
                    <ul className='navbar-nav side-ul-list singleList' >
                        {/* <li className='searchbar mb-3 ps-2 pe-2'>
                            <input type='text' className='OPDSideBarSearch' placeholder='Search PID' onKeyDown={handleSearckKey} onChange={(e) => { setSearchData(e.target.value) }} />
                            <img src={searcIcon} width="" height="" style={{ right: "40px" }} onClick={handleSearckKeyClick} />
                        </li> */}
                        {/* <UHIDSearch setShowToster={setShowToster} setShowMessage={setShowMessage} val={0} /> */}
                        {/* <li className="singleList">
                            <Link to="/ipdpatientlist/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>Patient List</span>
                            </Link>
                        </li> */}
                       

                        <li className="singleList">
                            <Link to="/patientpersonalDashboardipd/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><img src={PersonalDashboardIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Personal Dashboard")}</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/prescriptionipd/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={IPDPrescriptionIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Prescription")}</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/iPDDischargeCard/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={DischargeCardIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Discharge Card")}</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/vitalipd/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={VitalsIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Vitals")}</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/investigationipd/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={InvestigationsIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Investigation")}</span>
                            </Link>
                        </li>
                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>Refer Patient</span>
                            </Link>
                        </li> */}
                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>Vision</span>
                            </Link>
                        </li> */}
                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>Tension</span>
                            </Link>
                        </li> */}
                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>Reports</span>
                            </Link>
                        </li> */}
                        <li className="singleList">
                            <Link to="/calculatoripd/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={CalculatorsIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Calculator")}</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/AssignMachinetoPatient/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={PatientonVentilatorIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Patient On Ventilator")}</span>
                            </Link>
                        </li>
                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>IPD File</span>
                            </Link>
                        </li> */}
                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>Case Study</span>
                            </Link>
                        </li> */}
                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>Diabetes Clinic</span>
                            </Link>
                        </li> */}
                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>Patient Document List</span>
                            </Link>
                        </li> */}
                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><i className="bi bi-file-earmark"></i></span>
                                <span>Vaccination Chart</span>
                            </Link>
                        </li> */}

                        <li className="singleList">
                            <Link to="/foodintakeipd/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={FoodIntakeIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Food Intake")}</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/patientNotes/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={PatientNotesIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Patient Notes")}</span>
                            </Link>
                        </li>
                      

                        <li className="singleList">
                            <Link to="/PatientAnalyzingGraph/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={PatientAnalyzingGraphIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Patient Analyzing Graph")}</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            {/* <Link to="/healthViewScroll/" className="nav-link  px-3 sidebar-link"> */}
                            <Link to="/healthViewIndex/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={HealthViewIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Health View")}</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            {/* <Link to="/healthViewScroll/" className="nav-link  px-3 sidebar-link"> */}
                            <Link to="/AssignMachinetoPatient/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={AssignMachineIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Assign Machine to Patient")}</span>
                            </Link>
                        </li>
                        
                        <li className="singleList">
                            <Link to="/ipdfile/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={DischargeCardIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("IPD File")}</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/output/" className="nav-link  px-3 sidebar-link">
                            <span className="me-2"><img src={DischargeCardIcon} alt="" className="navLinkicon" /></span>
                                <span>{t("Output")}</span>
                            </Link>
                        </li>







                    </ul>




                </nav>

            </div>
            {showToster === 1 ? <AlertToster message={showMessage} handle={setShowToster} /> : ""}
        </div>
        // <!--offCanvas navbar-- >
    )
}



