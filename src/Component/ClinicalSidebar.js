import React, { useEffect } from "react";
import OffcanvasLogo from '../assets/images/Navbar/offcanvas-logo.png'
import MaskGroup from "../assets/images/Navbar/MaskGroup.png"
import uhidNavLinkicon from "../assets/images/Navbar/medical-report.svg";
import { Link } from 'react-router-dom'
import Select from 'react-select';

//Icons
import dashboardIcon from "../assets/images/icons/dashboard.svg";
import registrationIcon from "../assets/images/icons/registration1.svg";
import admin from "../assets/images/icons/admin.svg";
import admitPatientIcon from "../assets/images/icons/admitPatient.svg";
import patientRegistrationIcon from "../assets/images/icons/patientRegistration.svg";
import dieteticsIcon from "../assets/images/icons/dietetics.svg";
import operationTheatreIcon from "../assets/images/icons/operationTheatre.svg";
import billingIcon from "../assets/images/icons/billing.svg";
import vaccinationChartIcon from "../assets/images/icons/vaccinationChart.svg";
import bloodBankIcon from "../assets/images/icons/bloodBank.svg";
import InventoryIcon from "../assets/images/icons/Inventory.svg";
import settingIcon from "../assets/images/icons/setting.svg";

import LaboratoryIcon from "../assets/images/icons/Laboratory.svg";
import Inventory1Icon from "../assets/images/icons/Inventory1.svg";
import BMSServicesIcon from "../assets/images/icons/BMSServices.svg";
import MaintenanceIcon from "../assets/images/icons/Maintenance.svg";
import SpringboardIcon from "../assets/images/icons/Springboard.svg";
import PatientonVentilatorIcon from "../assets/images/icons/PatientonVentilator.svg";
import PharmacyIcon from "../assets/images/icons/Pharmacy.svg";

import CityMasterIcon from "../assets/images/icons/CityMaster.svg";
import HealthCardIcon from "../assets/images/icons/HealthCard.svg";
import userpatientRegistrationIcon from "../assets/images/icons/userpatientRegistration.svg";
import { useNavigate } from 'react-router-dom'; 
//import GetAssignProject from '../../SpringBoard/API/AssignProject/GetAssignProject'

export default function ClinicalSidebar() {
   
    


    // const navigate = useNavigate();

    // const routeOptions = ApiRoutesSearch.map((route) => ({
    //     value: route.path,
    //     label: route.label,
    //   }));

    //   const handleRouteChange = (selectedOption) => {
    //     if (selectedOption && selectedOption.value) {
    //       navigate(selectedOption.value); // Redirect to the selected route
    //     }
    //   };
    // let [getProjectAssignList, setProjectAssignList] = useState([])

    // const funGetAllAssignProject = async () => {
    //     let getResult = await GetAssignProject()
    //     setProjectAssignList(getResult.responseValue);
    // };
    // useEffect(() => {

    //     let getSideCollapseLinks = document.getElementsByClassName("sidebar-link");
    //     for (const getSideCollapseLink of getSideCollapseLinks) {
    //         getSideCollapseLink.addEventListener("click", function () {
    //             resetPreLink();
    //             getSideCollapseLink.classList.add("active");
    //         });
    //     }

    //     function resetPreLink() {
    //         for (const getSideCollapseLink of getSideCollapseLinks) {
    //             getSideCollapseLink.classList.remove("active");
    //         }
    //     }

    //     let getCustomeCollapseInnerLinks = document.querySelectorAll(".custome-collapse a.nav-link");
    //     for (const getCustomeCollapseInnerLink of getCustomeCollapseInnerLinks) {
    //         getCustomeCollapseInnerLink.addEventListener("click", function () {
    //             resetPregetCustomeCollapseInnerLink();
    //             getCustomeCollapseInnerLink.classList.add("active");
    //         });
    //     }

    //     function resetPregetCustomeCollapseInnerLink() {
    //         for (const getCustomeCollapseInnerLink of getCustomeCollapseInnerLinks) {
    //             getCustomeCollapseInnerLink.classList.remove("active");
    //         }
    //     }

    // }, []);
    return (
        // < !--offCanvas navbar-- >  
        <div className="offcanvas offcanvas-start sidebar-nav shadow-sm rounded_" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header offcanvas-header-custome">

                <div className='offcanvas-logo-username'>
                    <div className='offcanvas-logoBorderBottom p-2' style={{borderBottom: '0px'}}>
                        <img src={MaskGroup} className="logoLeft" />
                        <div className='offcanvas-logo '>
                            <Link to="/dashboard/"> <img src={OffcanvasLogo} className="OffcanvasLogo" /></Link>
                        </div>
                    </div>
                    {/* <h5 className="offcanvas-title text-uppercase user-name text-center pt-3" id="offcanvasExampleLabel">UserName</h5> */}
                </div>

                <button type="button" className="btn-close btn-offcanvas-close btn-closeCustome" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
            </div>
            <div className="offcanvas-body p-0" >
                <nav className="navbar">
                {/* <div className="col-md-12 col-sm-12 col-xs-12 mb-3 ms-2" style={{ width: '290px',display: 'flex'}}>
                          <i className="bi bi-search ms-2 me-1 mt-1" style={{fontSize: '25px',color: 'orange'}}></i><Select  styles={{control: (baseStyles, ) => ({...baseStyles,borderColor: "#ffb13c",border: 'none',borderBottom: '2px solid #ffb13c', fontSize: '12px',fontFamily: 'monospace',color: 'black',width: '210px'})}} value={SelectedRoutes} options={routeOptions} className="mx-2" placeholder = "Search Pages..." isSearchable={isSearchable} isClearable={isClearable} onChange={handleRouteChange} />
                </div> */}
                    <ul className='navbar-nav side-ul-list singleList' >

                        {/* <li className="singleList">
                        <div className="nav-link  px-3 sidebar-link selectSearch active ">
                            <span className="me-3"><i className="bi bi-search mt-1 fs-5 navLinkicon"></i></span>
                            <Select  value={SelectedRoutes} options={routeOptions} className=" create-select" placeholder = "Search Pages.." isSearchable={isSearchable} isClearable={isClearable} onChange={handleRouteChange} />
                        </div>                       
                        
                        </li> */}
                      
                        <li className="singleList">
                            <Link to="/dashboard/" className="nav-link  px-3 sidebar-link active">
                                <span className="me-2"><img src={dashboardIcon} alt="" className="navLinkicon" /></span>
                                <span>Personal Dashboard</span>
                            </Link>
                        </li>
                        {/* <li className="singleList">
                            <Link to="/bedMaster/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><img src={admin} alt="" className="navLinkicon" /></span>
                                <span>Admin</span>
                            </Link>
                        </li> */}
                        {/* <li className="singleList">
                            <Link to="/opdRegistration/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><img src={uhidNavLinkicon} alt="" className="navLinkicon" /></span>
                                <span>Registration</span>
                            </Link>
                        </li> */}
                        <li>
                            <a href="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#Schedule" aria-expanded="false">
                                <span className="me-2">
                                    {/* <i className="bi bi-alarm"></i> */}
                                    <img src={registrationIcon} alt="" className="navLinkicon" />
                                </span>

                                <span>Appointment</span>
                                <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                            </a>
                            <div className="collapse custome-collapse" id="Schedule">
                                <ul className="navbar-nav ps-3">
                                    {/* <li>
                                        <Link to="/opdRegistration/" className="nav-link">
                                            <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                            <span>Patient Registration</span>
                                        </Link>
                                    </li> */}

                                    {/* <li>
                                        <Link to="/admitPatient/" className="nav-link">
                                            <span> <img src={admitPatientIcon} alt="" className="icnn" /></span>
                                            <span>Admit Patient</span>
                                        </Link>
                                    </li> */}

                                    {/* <li>
                                        <Link href="/citymaster" className="nav-link">
                                            <span> <img src={CityMasterIcon} alt="" className="icnn" /></span>
                                            <span>City Master</span>
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link to="/healthCard/" className="nav-link">
                                            <span> <img src={HealthCardIcon} alt="" className="icnn" /></span>
                                            <span>Health Card</span>
                                        </Link>
                                    </li> */}

                                </ul>
                            </div>
                        </li>

                        {/* <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={uhidNavLinkicon} alt="" className="navLinkicon" />
                                </span>
                                <span>Nutrianalyser</span>
                            </Link>
                        </li> */}
                        <li className="singleList">
                            <Link to="/surgerymaster/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={operationTheatreIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Operation Theatre</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="#" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={settingIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Setting</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/billing/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={billingIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Billing</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/SampleCollection" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={LaboratoryIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Laboratory</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/organmaster/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={InventoryIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Radiology</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/SampleRecieve/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={InventoryIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Microbiology</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/vaccinationChart/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={vaccinationChartIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Vaccination Chart</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/donorregistration/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={bloodBankIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Blood Bank</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/DieteticsPatientList" className="nav-link  px-3 sidebar-link">
                            {/* <Link to="/foodIntake/" className="nav-link  px-3 sidebar-link"> */}
                                <span className="me-2">
                                    <img src={dieteticsIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Dietetics</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/itemcategorymaster/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={Inventory1Icon} alt="" className="navLinkicon" />
                                </span>
                                <span>Inventory</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/EnergyTypeMaster/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={BMSServicesIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>BMS Services</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/Maintenancedashboard/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={MaintenanceIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Maintenance</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/SprintBacklog" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={SpringboardIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Springboard</span>
                            </Link>
                        </li>
                    
                        <li className="singleList">
                            <Link to="/patientventilatorassignipd" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={PatientonVentilatorIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Patient on Ventilator</span>
                            </Link>
                        </li>
                        <li className="singleList">
                            <Link to="/pharmacyPurchase" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                    <img src={PharmacyIcon} alt="" className="navLinkicon" />
                                </span>
                                <span>Pharmacy</span>
                            </Link>
                        </li>
 
                        {/* <li className="singleList"> 
                                        <Link to="/patientmedication" className="nav-link  px-3 sidebar-link">
                                            <span className="me-2">
                                                <img src={uhidNavLinkicon} alt="" className="navLinkicon" />
                                            </span>
                                            <span>Patient Medication</span>
                                        </Link>
                        </li> */}
                        {/* <li className="singleList">
                            <Link to="/adduser/" className="nav-link  px-3 sidebar-link">
                                <span className="me-2">
                                <img src={uhidNavLinkicon} alt="" className="navLinkicon" />                                   
                                </span>
                                <span>User Services</span>
                            </Link>
                        </li> */}



                        {/* <li className="multiList">
                            <a className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#UHIDReport" aria-expanded="false">
                                <span className="me-2"><i className="bi bi-folder-check"></i></span>
                                <span>UHID Report</span>
                                <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                            </a>
                            <div className="collapse custome-collapse" id="UHIDReport">
                                <ul className="navbar-nav ps-4">
                                    <li>
                                        <a href="#" className="nav-link">
                                            <span><i className="bi bi-check"></i></span>
                                            <span>Patient Track</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link">
                                            <span><i className="bi bi-check"></i></span>
                                            <span>Patient Search</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li> */}



                    </ul>




                </nav>

            </div>
        </div>
        // <!--offCanvas navbar-- >
    )
}
