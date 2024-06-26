import React from "react";
import OffcanvasLogo from '../assets/images/Navbar/offcanvas-logo.png'
import MaskGroup from "../assets/images/Navbar/MaskGroup.png"

import { Link, NavLink } from 'react-router-dom'


//Icons
import dashboardIcon from "../assets/images/dashboard/patientPortalDashboard/patientportal.svg";
import appointment from "../assets/images/dashboard/patientPortalDashboard/Appointment.svg";
import messageicn from "../assets/images/dashboard/patientPortalDashboard/messageicn.svg";
import documenticn from "../assets/images/dashboard/patientPortalDashboard/documenticn.svg";
import reposticn from "../assets/images/dashboard/patientPortalDashboard/reposticn.svg";
import sign from "../assets/images/dashboard/patientPortalDashboard/sign.svg";
import inbox from "../assets/images/dashboard/patientPortalDashboard/inbox.svg";
// import registrationIcon from "../assets/images/icons/registration1.svg";
// import admin from "../assets/images/icons/admin.svg";
// import admitPatientIcon from "../assets/images/icons/admitPatient.svg";
// import patientRegistrationIcon from "../assets/images/icons/patientRegistration.svg";
// import dieteticsIcon from "../assets/images/icons/dietetics.svg";
// import operationTheatreIcon from "../assets/images/icons/operationTheatre.svg";
// import billingIcon from "../assets/images/icons/billing.svg";
// import vaccinationChartIcon from "../assets/images/icons/vaccinationChart.svg";
// import bloodBankIcon from "../assets/images/icons/bloodBank.svg";
// import InventoryIcon from "../assets/images/icons/Inventory.svg";
// import settingIcon from "../assets/images/icons/setting.svg";

// import LaboratoryIcon from "../assets/images/icons/Laboratory.svg";
// import Inventory1Icon from "../assets/images/icons/Inventory1.svg";
// import BMSServicesIcon from "../assets/images/icons/BMSServices.svg";
// import MaintenanceIcon from "../assets/images/icons/Maintenance.svg";
// import SpringboardIcon from "../assets/images/icons/Springboard.svg";
// import PatientonVentilatorIcon from "../assets/images/icons/PatientonVentilator.svg";
// import PharmacyIcon from "../assets/images/icons/Pharmacy.svg";

// import CityMasterIcon from "../assets/images/icons/CityMaster.svg";
// import HealthCardIcon from "../assets/images/icons/HealthCard.svg";
import userpatientRegistrationIcon from "../assets/images/icons/userpatientRegistration.svg";
// import { useNavigate } from 'react-router-dom'; 
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
                        <img src={MaskGroup} className="logoLeft" alt="" />
                        <div className='offcanvas-logo '>
                            <Link to="/PatientPortalDashboard/"> <img src={OffcanvasLogo} className="OffcanvasLogo" alt=""/></Link>
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

                      
                        <li className="singleList">
                            <Link to="/PatientPortalDashboard/" className="nav-link  px-3 sidebar-link active">
                                <span className="me-2"><img src={dashboardIcon} alt="" className="navLinkicon" /></span>
                                <span>Personal Dashboard</span>
                            </Link>
                        </li>

                      
                        <li>
                            <a href="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#Schedule" aria-expanded="false">
                                <span className="me-2">
                                    {/* <i className="bi bi-alarm"></i> */}
                                    <img src={appointment} alt="" className="navLinkicon" />
                                </span>

                                <span>Appointment</span>
                                <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                            </a>
                            <div className="collapse custome-collapse" id="Schedule">
                                <ul className="navbar-nav ps-3">
                                    <li>
                                        <Link to="/PatientAppointment/" className="nav-link">
                                            <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                            <span>Book Appointment</span>
                                        </Link>
                                        <Link to="/myappointmentlist/" className="nav-link">
                                            <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                            <span>My Appointment</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#message" aria-expanded="false">
                                <span className="me-2">
                                    {/* <i className="bi bi-alarm"></i> */}
                                    <img src={messageicn} alt="" className="navLinkicon" />
                                </span>

                                <span>Message</span>
                                <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                            </a>
                            <div className="collapse custome-collapse" id="message">
                                <ul className="navbar-nav ps-3">
                                    <li>
                                        <NavLink to="/messageinbox/" className="nav-link" activeClassName="active">
                                            <span> <img src={inbox} alt="" className="icnn" /></span>
                                            <span>Inbox</span>
                                        </NavLink>
                                    </li>

            
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a href="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#document" aria-expanded="false">
                                <span className="me-2">
                                    {/* <i className="bi bi-alarm"></i> */}
                                    <img src={documenticn} alt="" className="navLinkicon" />
                                </span>

                                <span>Documents</span>
                                <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                            </a>
                            <div className="collapse custome-collapse" id="document">
                                <ul className="navbar-nav ps-3">
                                    <li>
                                        <Link to="/hippadeclaration/" className="nav-link">
                                            <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                            <span>Hippa Declaration</span>
                                        </Link>
                                        <Link to="/medicalhistory/" className="nav-link">
                                            <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                            <span>Medical History</span>
                                        </Link>
                                        <Link to="/privacypolicy/" className="nav-link">
                                            <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                            <span>Privacy Policy</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/documenthistory/" className="nav-link ">
                                            <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                            <span>Document History</span>
                                        </Link>
                                    </li>                                 

                                </ul>
                            </div>
                        </li>
                        
                       

                            <li>
                            <a href="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#report" aria-expanded="false">
                                <span className="me-2">
                                    {/* <i className="bi bi-alarm"></i> */}
                                    <img src={reposticn} alt="" className="navLinkicon" />
                                </span>

                                <span>Reports</span>
                                <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                            </a>
                            <div className="collapse custome-collapse" id="report">
                                <ul className="navbar-nav ps-3">
                                    <li>
                                        <Link to="/reportcontent/" className="nav-link">
                                            <span> <img src={userpatientRegistrationIcon} alt="" className="icnn" /></span>
                                            <span>Report Content</span>
                                        </Link>
                                       
                                    </li>
                                    <li className="singleList">
                                <Link to="/DownloadChartedDocument/" className="nav-link">
                                <span className="me-2"><img src={dashboardIcon} alt="" className="navLinkicon" /></span>
                                <span>Download Charted Document</span>
                            </Link>
                        </li>
                                </ul>
                            </div>
                        </li>

                        <li className="singleList">
                            <Link to="/signature/"  className="nav-link  px-3 sidebar-link">
                                <span className="me-2"><img src={sign} alt="" className="navLinkicon" /></span>
                                <span>Signature</span>
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
