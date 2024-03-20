import React from 'react'
import { Link } from 'react-router-dom'
import OffcanvasLogo from "../assets/images/Navbar/offcanvas-logo.png";
import MaskGroup from "../assets/images/Navbar/MaskGroup.png";
import masterNavLinkicon from "../assets/images/Navbar/user.svg";
// import scheduleNavLinkicon from "../assets/images/Navbar/Layer.svg";
// import uhidNavLinkicon from "../assets/images/Navbar/medical-report.svg";
export default function MenuSideBarSuperAdmin(props) {

    return (
        <>
            <div className="offcanvas offcanvas-start sidebar-nav shadow-sm rounded_" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" >
                <div className="offcanvas-header offcanvas-header-custome">
                    <div className="offcanvas-logo-username">
                        <div className="offcanvas-logoBorderBottom p-2_">
                            <img src={MaskGroup} className="logoLeft" alt=''/>
                            <div className="offcanvas-logo">
                                <Link to={props.isSuperadmin === false ? "/dashboard/" : ""}>
                                    {" "}
                                    <img src={OffcanvasLogo} className="OffcanvasLogo" alt=''/>{" "}
                                </Link>
                            </div>
                        </div>
                        <h5
                            className="offcanvas-title text-uppercase user-name"
                            id="offcanvasExampleLabel"
                            style={{ display: "none" }}
                        >
                            Md Ijaharuddin Khan
                        </h5>
                    </div>

                    <button
                        type="button"
                        className="btn-close btn-offcanvas-close btn-closeCustome"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    >
                        X
                    </button>
                </div>

                <div className="offcanvas-body p-0">
                    <nav className="navbar">

                        <ul className="navbar-nav side-ul-list singleList">
                            <li className="multiList">
                                <Link to="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#Schedule" aria-expanded="false">
                                    <span className="me-2">
                                        {/* <i className="bi bi-alarm"></i> */}
                                        <img src={masterNavLinkicon} alt="" className="navLinkicon" />
                                    </span>

                                    <span>Master</span>
                                    <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                                </Link>
                                <div className="collapse custome-collapse" id="Schedule">
                                    <ul className="navbar-nav ps-4">
                                        <li>
                                            <Link to="/countrymaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Country Master</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/statemaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>State Master</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/citymaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>City Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/usermaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>User Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/usertypemaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>User Type Master</span>
                                            </Link>
                                        </li>
                                        {/* <li>
                    <Link to="/gendermaster/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Gender Master</span>
                    </Link>
                  </li> */}
                                        <li>
                                            <Link to="/patientdetailsmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Patient Details Master</span>
                                            </Link>
                                        </li>
                                        {/* <li>
                    <Link to="/categorymaster" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Category Master</span>
                    </Link>
                  </li> */}
                                        <li>
                                            <Link to="/departmentmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Department Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/adminheadmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Head Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/headdepartmentmapping/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Head Department Mapping</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/headmenuassign/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Head Menu Assign</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/menuapimapping/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Menu API Mapping</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/menumaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Menu Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/modulemaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Module Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/modulemenuassign/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Module Menu Assign</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/applicationfeaturechecklistmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Application Feature Checklist Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/moduledepartmentmapping/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Module Department Mapping</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            {/* --------------------------------------Examination Master-------------------------------- */}
                            {/* <li className="multiList">
              <Link to="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#Examination" aria-expanded="false">
                <span className="me-2">
                  <img src={masterNavLinkicon} alt="" className="navLinkicon" />
                </span>

                <span>Examination Master</span>
                <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
              </Link>
              <div className="collapse custome-collapse" id="Examination">
                <ul className="navbar-nav ps-4">

                  <li>
                    <Link to="/examinationcategorymaster/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Examination Category Master</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/examinationsubcategorymaster/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Examination Sub Category Master</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/examinationparametermaster/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Examination Parameter Master</span>
                    </Link>
                  </li>


                  <li>
                    <Link to="/examinationsubcategoryparameterassign/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Sub Category Parameter Assign</span>
                    </Link>
                  </li>

                </ul>
              </div>
            </li> */}

                            {/* --------------------------------------History  Master-------------------------------- */}
                            {/* <li className="multiList">
              <Link to="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#History" aria-expanded="false">
                <span className="me-2">
                  <img src={masterNavLinkicon} alt="" className="navLinkicon" />
                </span>

                <span>History Master</span>
                <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
              </Link>
              <div className="collapse custome-collapse" id="History">
                <ul className="navbar-nav ps-4">

                  <li>
                    <Link to="/historycategory/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>History Category</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/historysubcategory/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>History Sub Category</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/historyparameter/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>History Parameter</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/historysubcategoryparameterassign/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Sub Category Parameter Assign</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

                            {/* --------------------------------------Utility   Master-------------------------------- */}


                            <li className="multiList">
                                <Link to="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#UHIDReport" aria-expanded="false" >
                                    <span className="me-2">
                                        {/* <i className="bi bi-file-earmark"></i> */}
                                        <img src={masterNavLinkicon} alt="" className="navLinkicon" />
                                    </span>
                                    <span>Utility Master</span>
                                    <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                                </Link>
                                <div className="collapse custome-collapse" id="UHIDReport">
                                    <ul className="navbar-nav ps-4">
                                        <li>
                                            <Link to="/vitalmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Vital Master</span>
                                            </Link>
                                        </li>
                                        {/* <li>
                    <Link to="/unitmaster/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Unit Master</span>
                    </Link>
                  </li> */}
                                        {/* <li>
                    <Link to="/itemmaster/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Item Master</span>
                    </Link>
                  </li> */}
                                        {/* <li>
                    <Link to="/subtestmaster/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Sub Test Master</span>
                    </Link>
                  </li> */}
                                        <li>
                                            <Link to="/guardianRelationmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Guardian Relation Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/rolemaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Role Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/rolewisemenuassign/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Role Wise Menu Assign</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/rolewisedepartmentassign/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Role Wise Department Assign</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/designationmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Designation Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/paymentmodemaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Payment Mode Master</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li>
                                <Link to="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#Masters" aria-expanded="false" >
                                    <span className="me-2">
                                        {/* <i className="bi bi-file-earmark"></i> */}
                                        <img src={masterNavLinkicon} alt="" className="navLinkicon" />
                                    </span>
                                    <span>API Master</span>
                                    <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                                </Link>
                                <div className="collapse custome-collapse" id="Masters">
                                    <ul className="navbar-nav ps-4">
                                        <li>
                                            <Link to="/apidoucmentdetails/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>API Document Details</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/apidocumentmenumaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>API Document Menu Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/apidocumentrightdetails/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>API Document Right Details</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/apidocumentrrightmenu/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>API Document Right Menu Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/apimaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>API Master</span>
                                            </Link>
                                        </li>
                                        {/* <li>
                    <Link to="#" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>API Package Mapping</span>
                    </Link>
                  </li> */}
                                        <li>
                                            <Link to="/baseurlmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Base Url Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/educationtypemaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Education Type Master</span>
                                            </Link>
                                        </li>
                                        {/* <li>
                    <Link to="/featuremaster/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Feature Master</span>
                    </Link>
                  </li> */}
                                        <li>
                                            <Link to="/idtypemaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Id Type Master</span>
                                            </Link>
                                        </li>
                                        {/* <li>
                    <Link to="/mapfeaturepackage/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Map Feature Package</span>
                    </Link>
                  </li> */}
                                        <li>
                                            <Link to="/occupationtypemaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Occupation Type Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/packageMaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Package Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/servicemaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Service Master</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/serviceheadmapping/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Service Head Mapping</span>
                                            </Link>
                                        </li>
                                        {/* <li>
                    <Link to="/serviceapimapping/" className="nav-link">
                      <span><i className="bi bi-check"></i></span>
                      <span>Service Api Mapping</span>
                    </Link>
                  </li> */}
                                        <li>
                                            <Link to="/packageservicemapping/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Package Service Mapping</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/servicemodulemapping/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Service Module Mapping</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>



                            {/* <li className="singleList">
              <ul className="navbar-nav ps-3">
                <li>
                  <Link to="#" className="nav-link">
                    <span><i className="bi bi-file-earmark"></i></span>
                    <span>Single List</span>
                  </Link>
                </li>
              </ul>

            </li> */}

                            {/* --------------------------------------Widget Master-------------------------------- */}
                            <li className="multiList">
                                <Link to="##" className="nav-link px-3 sidebar-link" data-bs-toggle="collapse" data-bs-target="#Widget" aria-expanded="false">
                                    <span className="me-2">
                                        {/* <i className="bi bi-alarm"></i> */}
                                        <img src={masterNavLinkicon} alt="" className="navLinkicon" />
                                    </span>

                                    <span>Widget Master</span>
                                    <span className="right-icon ms-auto"><i className="bi bi-chevron-down"></i></span>
                                </Link>
                                <div className="collapse custome-collapse" id="Widget">
                                    <ul className="navbar-nav ps-4">

                                        <li>
                                            <Link to="/dashboardmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Dashboard Master</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/widgetcategorymaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Widget Category Master</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/widgetmaster/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Widget Master</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/dashboardwidgetassign/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Dashboard Widget Assign</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/widgetroleassign/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Widget Role Assign</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to="/widgetsequenceassign/" className="nav-link">
                                                <span><i className="bi bi-check"></i></span>
                                                <span>Widget Sequence Assign</span>
                                            </Link>
                                        </li>


                                    </ul>
                                </div>
                            </li>


                        </ul>


                    </nav>
                </div>
            </div>


        </>
    )
}
