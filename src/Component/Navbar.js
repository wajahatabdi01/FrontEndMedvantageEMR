import React, { useEffect, useState } from 'react'
import Logog from '../assets/images/Navbar/NavbarLogo.png'
import Monitor from '../assets/images/Navbar/Navbarmonitor.png'
import Notification from '../assets/images/Navbar/NavbarRing.png'
import Setting from '../assets/images/Navbar/NavbarSetting.png'
import Exit from '../assets/images/Navbar/NavbarExit.png'
import Home from '../assets/images/Navbar/Home.png'
import Search from '../assets/images/Navbar/search.svg'
import DoctorLogo from "../assets/images/Navbar/DoctorLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import SearchGlobal from '../Code/SearchGlobal'
import profilepic from "../assets/images/icons/profilepic.png"
import changepassword from "../assets/images/LoginPage/changepassword.jpg"
import * as signalR from '@microsoft/signalr';
import TableContainer from './TableContainer'
import store from '../Store'
import { getNotificationData } from '../Reduce/Notification/Notifications'
import HandleLanguage from '../Code/LanguageManage';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
import languageIcon from "../assets/images/icons/languageIcon.png";
import ChangePassword from '../Registartion/Pages/OPDRegistration/UserProfile/ChangePassword'

export default function Navbar(props) {

    let navigate = useNavigate();
    let [activePageData, setActivePageData] = useState()
    let [toatalNotification, setToatalNotification] = useState([])
    let [prescription, setPrescription] = useState([])
    let [uhid, setUhid] = useState(0)
    let [patientName, setPatientName] = useState('')
    let [menueShortCut, setmenueShortCut] = useState([])
    
    const {t} = useTranslation();

    let logout = () => {
        if (props.isSuperadmin === true) {
            navigate("/superadmin/")
            window.sessionStorage.removeItem("SuperAdminData")
            window.localStorage.removeItem("SuperAdminData")
        }
        else {
            navigate("/login/")
            window.sessionStorage.clear()
            window.localStorage.clear()
        }

    }

    let searchGlobal = (e) => {
        if (e.keyCode === 13) {
            // console.log("sdsfsd",e.keyCode)
            SearchGlobal(e.target.value)
        }
        else if (e.keyCode === 40) {
            // console.log("sdsfsd",e.keyCode)
            SearchGlobal(e.target.value)
        }

    }

    let searchGlobals = (e) => {
        SearchGlobal(e.target.value)
    }

    let handleHomeIcon = () => {

        if (props.isSuperadmin === false) {
            navigate("/dashboard/")
        }
    }


    
    

    let functionGetMenueShortCutList = ()=> {    
        if(window.sessionStorage.getItem("LoginData"))
        {
            let response = JSON.parse(window.sessionStorage.getItem("LoginData"));            
            let menuArray = (response.shortCutMenu.slice(0, 10))        
            setmenueShortCut(menuArray)   
        }  
             
       }


    useEffect(() => {
        let total = 0
        let tempnotification = ""
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(window.NotificationUrl + "/Notification")
            .configureLogging(signalR.LogLevel.Information)  // Replace with your API URL
            .build();
        connection.start().then(() => {
            connection.invoke("NewUserConnected", window.userId, 0).catch(err => console.log(err))
            connection.on("OnNewUserConnected", (message) => {
                connection.on("commonNotification", (message) => {
                    console.log("mess", message.responseValue.recieverId === window.userId)
                    if (message.responseValue.recieverId === window.userId) {
                        tempnotification = message.responseValue
                        console.log("sddsbcsbcd", tempnotification)
                        total += 1
                        setToatalNotification([...toatalNotification, tempnotification])
                    }
                });
            });
        })

        let getDepartment = JSON.parse(window.sessionStorage.getItem("activePage")) ? JSON.parse(window.sessionStorage.getItem("activePage")).departmentName : ""
        let getWard = JSON.parse(window.sessionStorage.getItem("activePage")) ? JSON.parse(window.sessionStorage.getItem("activePage")).wardName : ""
        if (props.changeNavbar === 0) {
            setActivePageData(
                <div className='d-flex flex-row gap-1'>
                    <img src={DoctorLogo} width="" />
                    <div className='d-flex flex-row '>
                        <span>{getWard}</span>
                        <span>-</span>
                        <span>{getDepartment}</span>
                    </div>
                </div>
            )
        }
        else {
            setActivePageData(
                <div className='d-flex flex-row gap-1'>
                    <img src={DoctorLogo} width="" />
                    <span>{t("Medvantage")}</span>
                    <div className='d-flex flex-row '>

                        {props.isSuperadmin === true ?
                            <>
                                <span>-</span>
                                <span>{t("Admin")}</span>
                            </>
                            :
                            <>
                                <span>-</span>
                                <span>{t("Dashboard")}</span>
                            </>
                        }
                    </div>
                </div>

            )
        }
        functionGetMenueShortCutList();
    }, [props.changeNavbar])

    let handleShowPrescription = (param) => {
        // console.log('paramsssss', param);

        setPrescription(JSON.parse(param.medicineData));
        setUhid(param.UHID);
        setPatientName(param.PatientName);
    };

    //  console.log('prescription', prescription);

    

    useEffect(() => {
        let getDepartment = JSON.parse(window.sessionStorage.getItem("activePage")) ? JSON.parse(window.sessionStorage.getItem("activePage")).Department : ""
        let getWard = JSON.parse(window.sessionStorage.getItem("activePage")) ? JSON.parse(window.sessionStorage.getItem("activePage")).Ward : ""
        if (getDepartment) {
            setActivePageData(
                <div className='d-flex flex-row gap-1'>
                    <div className='d-flex flex-row '>
                        <img src={DoctorLogo} width="" />
                        <span>{getWard}</span>
                        <span>-</span>
                        <span>{getDepartment}</span>
                    </div>
                </div>
            )
        }

        /// ######################### Toogle left side, side menu
        let getshortCollapseBtn = document.querySelector(".shortCollapseBtn");
        let customeTopNav = document.querySelector('.customeTopNav');
        let mainContent = document.querySelector('.main-content');
        let offcanvasLogo = document.querySelector('.offcanvas-logo');
        let logoLeft = document.querySelector('.logoLeft');
        let navLinkicons = document.getElementsByClassName('navLinkicon');
        let customeCollapses = document.querySelectorAll('.custome-collapse ul.navbar-nav');
        //  console.log(customeCollapses);
        let getSidebarNav = document.querySelector(".sidebar-nav");
        let offcanvasBody = document.querySelector(".offcanvas-body");
        getshortCollapseBtn.onclick = function () {
            getSidebarNav.classList.toggle('active');
            mainContent.classList.toggle('active');
            customeTopNav.classList.toggle('active');
            offcanvasLogo.classList.toggle('active');
            logoLeft.classList.toggle('active');

            for (const navLinkicon of navLinkicons) {
                navLinkicon.classList.toggle("active");
            }

            for (const customeCollapse of customeCollapses) {
                customeCollapse.classList.add("active");
            }
            offcanvasBody.classList.toggle('active');
        }
        let removeAtiveClass;
        let getSideCollapseLinks = document.getElementsByClassName("sidebar-link");

        for (const getSideCollapseLink of getSideCollapseLinks) {
            removeAtiveClass = getSideCollapseLink.onclick = function () {
                getSidebarNav.classList.remove('active');
                mainContent.classList.remove('active');
                customeTopNav.classList.remove('active');
                offcanvasLogo.classList.remove('active');
                // logoLeft.classList.remove('active');        
                for (const navLinkicon of navLinkicons) {
                    navLinkicon.classList.remove("active");
                }
                for (const customeCollapse of customeCollapses) {
                    customeCollapse.classList.remove("active");
                }
                offcanvasBody.classList.remove('active');
            }
        }

        let getNavbarTogglerRemoveActiveClasses = document.querySelector(".navbarTogglerRemoveActiveClass");
        getNavbarTogglerRemoveActiveClasses.onclick = function () {
            removeAtiveClass();
        }


    })

    // useEffect(() =>{
    //     handleShowPrescription();
    // }, []);
    document.body.dir = i18n.dir();

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-theme text-white customeTopNav fixed-top" id='navbar' data-bs-theme="dark">
                <div className="container-fluid">
                    {/* <a class="navbar-brand" href="#">Navbar</a> */}

                    {/* <button class="navbar-toggler" style={{ display: "block" }} type='button' onClick={() => { props.setShowMenu(props.showMenu === 1 ? 0 : 1) }}>
                    <span class="navbar-toggler-icon"></span>
                </button> */}
                    <button className="navbar-toggler me-4 navbarTogglerRemoveActiveClass" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <i className="bi bi-filter-left"></i>
                    </button>
                    {/* <a className="navbar-brand mx-auto userloginTypeTopNav" href="#">{activePageData && activePageData}</a>   */}
                    {/* <a className="navbar-brand adminLogo me-auto" href="#"><i className="bi bi-filter-right" style={{lineHeight:'41px', fontSize:'38px'}}></i></a>  */}
                    <a className="navbar-brand me-auto shortCollapseBtn" href="#" id='shortCollapseBtn'><i className="bi bi-filter-right" style={{ lineHeight: '41px', fontSize: '38px' }}></i></a>
                    {/* <Link className="navbar-brand adminLogo me-auto" to="/dashboard/"><img src={Logog} /></Link> */}

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-filter"></i>
                    </button>

                    {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button> */}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className="d-flex ms-auto" role="search" style={{ position: 'relative' }}>
                                    <input className="form-control me-2 navbar-searchbar" type="search" placeholder={t("Search")} aria-label="Search" onKeyDown={searchGlobal} />
                                    <i className="bi bi-search navbar-searchBarIcon text-white" onClick={searchGlobals}></i>
                                </div>
                            </li>
                        </ul> */}
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item userTypeLi ">
                                <a className="nav-link userloginType text-white" aria-current="page" href="">
                                    {activePageData && activePageData}
                                </a>    
                            </li>
                        </ul> */}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navBarRightIconUl">
                        {/* <li className="nav-item">
                                <div className="d-flex ms-auto dashsearch" role="search" style={{ position: 'relative' }}>
                                    <input className="form-control me-2 navbar-searchbar" type="search" placeholder={t("Search")} aria-label="Search" onKeyDown={searchGlobal} />
                                    <i className="bi bi-search navbar-searchBarIcon text-white " onClick={searchGlobals}></i>
                                </div>
                            </li> */}

                                  {/* short cut icons ################## */}

                                  {menueShortCut && menueShortCut.map((val)=>{return( 
                                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title={val.description}>
                                                <li className="nav-item"  >
                                                    <Link className="nav-link" to={val.url}>
                                                        <i className="bi bi-file-earmark-arrow-up" style={{ fontSize: "18px", color: 'white' }} title={val.url}></i>
                                                        {/* <img src={val.imgUrl} width="20px" height="20px" /> */}
                                                    </Link>
                                                </li>
                                            </span>                                        
                                     )})}                             

                                  {/* short cut icons end here ################## */}

                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title="Home" onClick={handleHomeIcon}>
                                <li className="nav-item"  >
                                    <Link className="nav-link"><img src={Home} width="20px" height="20px" alt='Home' /></Link>
                                </li>
                            </span>
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title="Remote Monitoring Dashboard">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/patientmonitordashboard/"><img src={Monitor} width="20px" height="20px" alt='Monitor'/></Link>
                                </li>
                            </span>
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title="Dynamic Dashboard">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dynamicdashboard/"><i className='bi bi-grid-3x3-gap-fill' style={{ fontSize: "18px", color: 'white' }} ></i></Link>
                                </li>
                            </span>


                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title="Notification">
                                <div className="dropdown profile_dd-cnt me-2">
                                    {/* <button class="btn dropdown-toggle profile_dd" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <a className="nav-link" href="#"><img src={Notification} width="20px" height="20px" /></a>
                                    </button> */}

                                    <button type="button" className="btn dropdown-toggle profile_dd arro position-relative px-0 py-0" id="notificationdropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-bell-fill fs-4" title=''></i>
                                    </button>
                                    <span className="position-absolute translate-middle badge rounded-pill text-white noti_cir">
                                            {/* 99 */}
                                            {toatalNotification.length !== 0 ? toatalNotification.length : 0}
                                            <span className="visually-hidden">{t("unread_messages")}</span>
                                        </span>

                                    <ul className="dropdown-menu" aria-labelledby="notificationdropdown">
                                        {/* {console.log('toatalNotification', toatalNotification[0])} */}
                                        {
                                            // console.log("xdscscs", toatalNotification)
                                            toatalNotification && toatalNotification.map((val, ind) => {
                                                console.log("dhsjksa", JSON.parse(val.responseValue))
                                                return (

                                                    <li><a className="dropdown-item" href="#" data-bs-target='#ViewAlterNativePrescriptionModal' data-bs-toggle='modal' onClick={() => { handleShowPrescription(JSON.parse(val.responseValue)) }}><i class="fa fa-cog"></i>{JSON.parse(val.responseValue).Uhid}</a></li>
                                                )


                                            })


                                        }
                                    </ul>
                                </div>
                            </span>

                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title="Exit">
                                <div className="dropdown profile_dd-cnt">
                                    <button className="btn dropdown-toggle profile_dd" type="button" id="profiledropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={profilepic} className='profileim' alt='profile' /><span className='adminis'>{window.sessionStorage.getItem("LoginData") ? JSON.parse(window.sessionStorage.getItem("LoginData")).name : "UserName"}</span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="profiledropdown">
                                        <li><a className="dropdown-item" href="#"><i className="fa fa-cog"></i>{t("Settings")}</a></li>
                                        {/* <li><a class="dropdown-item" href="#"><i className="fa fa-unlock"></i> Change Password</a></li> */}
                                        <li data-bs-toggle="modal" data-bs-target="#changePasswordModal"><a className="dropdown-item" href="#"><i className="fa fa-unlock"></i>{t("Change_Password")}</a></li>
                                        <li><Link className="dropdown-item" to="/profile/"><i className="bi bi-person-fill"></i>{t("User_Profile")}</Link></li>
                                        <li><a className="dropdown-item logott" href="#" onClick={logout}><i className="fa fa-sign-out"></i>{t("Logout")}</a></li>
                                    </ul>
                                </div>
                            </span>

                            {/* <div className="laguagesect mb-1">
                    <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title="Exit">
                        <div class="dropdown profile_dd-cnt">
                            <button className="btn dropdown-toggle profile_dd1" type="button" id="dropdownMenuButtonLanguage" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={languageIcon} className="me-1" alt="" />Select Language
                            </button>
                            <ul className="dropdown-menu sel-lang" aria-labelledby="dropdownMenuButtonLanguage">
                                <li onClick={HandleLanguage('en')} style={{ cursor: 'pointer' }}>English</li>
                                <li onClick={HandleLanguage('hi')} style={{ cursor: 'pointer' }}>Hindi</li>
                                <li onClick={HandleLanguage('ur')} style={{ cursor: 'pointer' }}>urdu</li>
                                <li onClick={HandleLanguage('ar')} style={{ cursor: 'pointer' }}>Arabic</li>
                            </ul>
                        </div>
                    </span>
                </div> */}



                            {/* REMOVE THIS CODE BEFORE PUSH AND PULL */}

                              {/* <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title="Exit">

                                <div class="dropdown profile_dd-cnt">

                                    <button className="btn dropdown-toggle profile_dd" type="button" id="dropdownMenuButtonLanguage" data-bs-toggle="dropdown" aria-expanded="false">

                                    {t("Select_Language")}

                                    </button>

                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonLanguage">

                                        <li onClick={HandleLanguage('en')} style={{ cursor: 'pointer' }}>{t("English")}</li>

                                        <li onClick={HandleLanguage('hi')} style={{ cursor: 'pointer' }}>{t("Hindi")}</li>

                                        <li onClick={HandleLanguage('ur')} style={{ cursor: 'pointer' }}>{t("Urdu")}</li>

                                        <li onClick={HandleLanguage('ar')} style={{ cursor: 'pointer' }}>{t("Arabic")}</li>

                                    </ul>
                                </div>
                            </span> */}
                               {/* REMOVE THIS CODE BEFORE PUSH AND PULL */}







                        </ul>

                    </div>
                </div>
            </nav>


            <div className="modal fade navmodel" id="changePasswordModal" tabIndex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered modal-lg" style={{ margin: '0px auto' }}>
                    <div className="modal-content nav-modal-content" >
                        <div className="btn-close1" data-bs-dismiss="modal" aria-label="Close"><i className='fa fa-times'></i></div>
                        <div className="modal-body nav-modelbody">
                            <div className='model-c'>
                            <ChangePassword/>                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* ------------------------------------------Modal For view Prescription------------------------------- */}
            <div className="modal fade" id="ViewAlterNativePrescriptionModal" data-bs-backdrop="static">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content p-0">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">{t("Pharmacy_Order")}</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window">
                                <i className="bi bi-x-octagon"></i>
                            </button>
                        </div>
                        <div className="whitebg modal-body p-0">
                            <div className="row">
                                <div className="col-12">
                                    <div className="med-box"> <div className="title">{t("Medicine/Item_Details")}</div>

                                        <div className='d-flex gap-3 justify-content-end me-2 mb-1 fst-italic text-primary-emphasis'>
                                            <div>
                                                {/* {toatalNotification && console.log("vvvvvv,", toatalNotification)} */}
                                                <b>{t("Uhid")}:</b> {uhid}
                                            </div>
                                            <div><b>{t("Patient_nm")}:</b> {patientName}</div>
                                        </div>
                                        <div className="inner-content">
                                            <div className='row'>
                                                <div className="col-md-12 mb-2">
                                                    <div className="med-table-section" style={{ height: '32vh' }}>
                                                        <TableContainer>
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>{t("Drug_Name")}</th>
                                                                    <th>{t("Alternative")}</th>
                                                                    {/* <th>Duration</th>
                                                                    <th>Remark</th>
                                                                    <th>Alternate</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {prescription && prescription.map((list, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <td>{list.drugName}</td>
                                                                            <td>{list.alternative}</td>
                                                                            {/* <td>{list.duration}</td>
                                                                            <td>{list.remark}</td>
                                                                            <td><input type='text' className='form-control form-control-sm ' id={'alternativeTxt' + list.id + list.drugName} /></td> */}
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </TableContainer>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------------------------------------------End view Prescription------------------------------- */}
        </>
    )

}

