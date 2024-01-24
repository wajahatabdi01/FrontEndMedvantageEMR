import React, { useEffect, useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import Navbar from '../Component/Navbar'
import DepartmentSideBar from '../Component/DepartmentSideBar'
import GetMenuAndDeptByHeadId from '../Dashboard/API/GetMenuAndDeptByHeadId'
import OPDPatientList from '../Clinical/Pages/OPD/OPDPatientList'
import CommonOPDLayout from '../Clinical/Pages/OPD/OPDSharePage/CommonOPDLayout'
import CommonIPDLayout from '../Clinical/Pages/IPD/IPDSharePages/CommonIPDLayout'
import IPDPatientListPage from '../Clinical/Pages/IPD/IPDPatientListPage'
import WCAGPopup from '../Component/WCAGPopup'
import MenuSideBar from '../Component/MenuSideBar'
import { Link, useNavigate } from 'react-router-dom'
import OffcanvasLogo from '../../src/assets/images/Navbar/offcanvas-logo.png'
import DieteticsPatientList from '../Dietetics/Pages/DieteticsPatientList'
import AlertToster from '../Component/AlertToster'
import ChatCornCall from '../Component/ChatCornCall'


export default function CommonLayout(props) {

    let [activePage, setActivePage] = useState(null)
    let [getHeadName, setGetHeadName] = useState("")
    let [departmentData, setDepartmentData] = useState([])
    let [showMenu, setShowMenu] = useState(1)
    let [showDepart, setShowDepart] = useState(0)
    let [menutData, setMenuData] = useState([])
    let [changeNavbar, setChangeNavbar] = useState(0)
    let [showReadMask, setReadMask] = useState(0)
    let [isSuperadmin, setIsSuperadmin] = useState(false)
    let navigate = useNavigate()
    let [showAlert, setShowAlert] = useState(0)


    useEffect(() => {
        if (props.name.toString().trim().toLowerCase() === "Dashboard".toString().trim().toLowerCase()) {
            let url = window.location.href.split("/")
            if (url[3].toString().toLowerCase() === "dashboard".toString().toLowerCase()) {
                setChangeNavbar(1)
                setShowMenu(0)
                setShowDepart(0)
                setIsSuperadmin(false)

            }
            setActivePage(<Dashboard getDataDeaprtmentMenu={getDataDeaprtmentMenu} setGetHeadName={setGetHeadName} />)
        }
        else if (props.name.toString().trim().toLowerCase() === "opdpatientlist".toString().trim().toLowerCase()) {
            setChangeNavbar(0)
            setIsSuperadmin(false)
            setShowMenu(0)
            setActivePage(<OPDPatientList setShowMenu={setShowMenu} handlepatientTab={0} showPatientListValue={0}/>)
        }
        else if (props.name.toString().trim().toLowerCase() === "IPDPatientList".toString().trim().toLowerCase()) {
           
            setChangeNavbar(0)
            setIsSuperadmin(false)
            setShowMenu(0)
            setActivePage(<IPDPatientListPage setShowMenu={setShowMenu} />)
        }
        else if (props.name.toString().trim().toLowerCase() === "DieteticsPatientList".toString().trim().toLowerCase()) {
            setChangeNavbar(0)
            setIsSuperadmin(false)
            setShowMenu(0)
            // setActivePage(props.Component)
            setActivePage(<DieteticsPatientList setShowMenu={setShowMenu} />)
        }
        else if (props.name.toString().trim().toLowerCase() === "opd".toString().trim().toLowerCase()) {
            setChangeNavbar(0)
            setIsSuperadmin(false)

            // setShowMenu(1)
            // setShowDepart(0)
            setActivePage(<CommonOPDLayout props={props} />)
        }
        else if (props.name.toString().trim().toLowerCase() === "ipd".toString().trim().toLowerCase()) {
            setChangeNavbar(0)
            setIsSuperadmin(false)

            setShowMenu(1)
            // setShowDepart(0)
            setActivePage(<CommonIPDLayout props={props} />)
        }
        else if (props.name.toString().trim().toLowerCase() === "superadmin".toString().trim().toLowerCase()) {
            setChangeNavbar(1)
            setIsSuperadmin(true)
            // setShowMenu(1)
            // setShowDepart(0)
            // setActivePage(<CommonIPDLayout props={props} />)
            setActivePage(props.Component)

        }
        else if (props.name.toString().trim().toLowerCase() === "null".toString().trim().toLowerCase()) {
            // setChangeNavbar(1)
            setShowMenu(0)
            setShowDepart(0)
            setIsSuperadmin(false)
            setActivePage(props.Component)

        }
        else if (props.Component !== null) {
            setIsSuperadmin(false)

            setChangeNavbar(0)

            setActivePage(props.Component)
        }

    }, [props])

    let getDataDeaprtmentMenu = async (value) => {
        let response = await GetMenuAndDeptByHeadId(value)
        if (response.status === 1) {
           

            setDepartmentData(response.responseValue.departmentList)
            setMenuData(response.responseValue.menuList)
            window.sessionStorage.setItem("departmentmenu", JSON.stringify(response.responseValue))
            if (response.responseValue.departmentList.length !== 0) {
                if (response.responseValue.departmentList.length !== 1) {
                    setShowMenu(0)
                    setShowDepart(1)
                }
                else {
                    let wardId = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
                    let wardname = JSON.parse(window.sessionStorage.getItem("activePage")).wardName
                    let departmentId = response.responseValue.departmentList[0].departmentId
                    let departmentName = response.responseValue.departmentList[0].departmentName
                    window.sessionStorage.removeItem("activePage")
                    window.sessionStorage.setItem("activePage", JSON.stringify({ "WardId": wardId, "wardName": wardname, "DepartmentId": departmentId, "departmentName": departmentName }))
                    navigate("/ipdpatientlist/")

                }
            }
            else if (response.responseValue.departmentList.length === 0 && response.responseValue.menuList.length !== 0) {

                if (response.responseValue.menuList[0].subMenuList.length !== 0) {
                    let flag = 0
                    let url = ""
                    response.responseValue.menuList.map((v, ind) => {
                        if (v.subMenuList.url === "/patientregistration/") {
                            flag = 1
                            return
                        }
                        else {

                        }
                    })

                    if (flag === 1) {
                        navigate("/patientregistration/")
                    }
                    else {
                        navigate(response.responseValue.menuList[0].subMenuList[0].url)
                    }

                }
                else {
                  
                    let flag = 0
                    
                    response.responseValue.menuList.map((val, ind) => {
                        if (val.url === "/opdpatientlist/") {
                            flag = 1
                            return
                        }
                    })
                    if (flag === 1) {
                        navigate("/opdpatientlist/")

                    }
                    else {
                        navigate(response.responseValue.menuList[0].url)
                    }
                }
                setShowMenu(1)
                setShowDepart(0)
            }
        }
        else {
            setShowAlert(1)
        }
    }

    return (
        <>

            {/* {showMenu !== 0 ? */}
            {/* // <LeftSideBar exMenutData={menutData} getHeadName={getHeadName} /> : "" */}
            {/* <MenuSideBar exMenutData={menutData} getHeadName={getHeadName} setShowMenu={setShowMenu} showMenu={showMenu} /> */}


            <MenuSideBar exMenutData={menutData} getHeadName={getHeadName} setShowMenu={setShowMenu} showMenu={showMenu} changeNavbar={changeNavbar} isSuperadmin={isSuperadmin} />

            {/* }? */}
            {
                showDepart !== 0 ?
                    // <RightSideBar extDepartmentData={departmentData} getHeadName={getHeadName} extsetDepartmentData={setDepartmentData} /> : ""
                    <DepartmentSideBar extDepartmentData={departmentData} getHeadName={getHeadName} extsetDepartmentData={setDepartmentData} setShowDepart={setShowDepart} /> : ""
            }

            {showMenu === 0 ?
                <div className='fullNavbar'>
                    {
                        window.sessionStorage.getItem("languageId") ? JSON.parse(window.sessionStorage.getItem("languageId")).languageId === "20" ?
                            <Navbar setShowMenu={setShowMenu} showMenu={showMenu} changeNavbar={changeNavbar} isSuperadmin={isSuperadmin} />
                            :
                            <div>
                                <div className="offcanvas-logo">
                                    <Link to="/dashboard/"><img src={OffcanvasLogo} alt="" style={{ width: '76%' }} /></Link>
                                </div>
                                <Navbar setShowMenu={setShowMenu} showMenu={showMenu} changeNavbar={changeNavbar} isSuperadmin={isSuperadmin} />
                            </div>
                            :
                            // <div>
                            //     <div className="offcanvas-logo">
                            //         <Link to="/dashboard/"><img src={OffcanvasLogo} alt="" style={{ width: '76%' }} /></Link>
                            //     </div>
                            //     <Navbar setShowMenu={setShowMenu} showMenu={showMenu} changeNavbar={changeNavbar} isSuperadmin={isSuperadmin} />
                            // </div>
                            <></>
                    }

                </div>
                :

                <Navbar setShowMenu={setShowMenu} showMenu={showMenu} changeNavbar={changeNavbar} isSuperadmin={isSuperadmin} />
            }




            {activePage !== null ? activePage : <></>}

            <WCAGPopup setReadMask={setReadMask} showReadMask={showReadMask} />
            <div id="blur-around" className={`${showReadMask === 1 ? "d-block" : "d-none"}`}>

            </div>
            {
                showAlert === 1 ?
                    <AlertToster handle={setShowAlert} message={"Please Assign Department"} />
                    : ""

            }


            <ChatCornCall />


        </>

    )
}

