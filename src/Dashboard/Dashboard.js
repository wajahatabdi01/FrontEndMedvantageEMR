import React, { useEffect, useState } from 'react'
import Loader from '../Component/Loader'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import { useNavigate } from 'react-router-dom';
import PostChatCornCall from '../Login/API/PostChatCornCall';
export default function Dashboard(props) {
    const { t } = useTranslation();


    let [wardDepartmentData, setWardDepartmentData] = useState()
    let [wardId, setWardId] = useState(-1)
    let [wardName, setWardName] = useState(-1)
    let [loders, setLoders] = useState(1)
    let [userData, setuserData] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")))
    

    let navigate = useNavigate()

    let getData = async () => {

        setWardDepartmentData(window.sessionStorage.getItem("LoginData") ? JSON.parse(window.sessionStorage.getItem("LoginData")).headList : [])
        setLoders(0)

    }
    let handleWard = (ward, wardname) => {

        // if (wardname.toString().toLowerCase().localeCompare("dietetics") === 0) {
        //     // props.getDataDeaprtmentMenu(ward)
        //     // props.setGetHeadName(wardname)
        //     setWardId(ward)
        //     setWardName(wardname)
        //     window.sessionStorage.setItem("activePage", JSON.stringify({ "WardId": ward, "wardName": wardname, "DepartmentId": "" }))
        //     navigate("/dieteticsPatientList/")
        // }
        // else {
        props.getDataDeaprtmentMenu(ward)
        props.setGetHeadName(wardname)
        setWardId(ward)
        setWardName(wardname)
        window.sessionStorage.setItem("activePage", JSON.stringify({ "WardId": ward, "wardName": wardname, "DepartmentId": "" }))
        // }


    }
    // function viewEvent(evt) {
    //     let myTimeout = setTimeout(() => {
    //         window.sessionStorage.clear()
    //     }, 1000)
    //     if(evt.type)
    //     {
    //         clearTimeout(myTimeout);


    //     }

    // }
  
    useEffect(() => {
        
        getData()
        // GetCornCallAuth()
        window.sessionStorage.removeItem("activePage")
        window.sessionStorage.removeItem("activePatient")
        window.sessionStorage.removeItem("patientList")
        window.sessionStorage.removeItem("patientsendData")
        window.sessionStorage.removeItem("IPDpatientList")
        window.sessionStorage.removeItem("IPDactivePatient")
        window.sessionStorage.removeItem("Invest")
        window.sessionStorage.removeItem("IPDpatientsendData")
        window.sessionStorage.removeItem("OPDPatientData")
        window.sessionStorage.removeItem("departmentmenu")
        // document.addEventListener('mousedown', viewEvent);
        // document.addEventListener('mousemove', viewEvent);
        // document.addEventListener('touchstart', viewEvent);
        // document.addEventListener('scroll', viewEvent);
        // document.addEventListener('keydown', viewEvent);
        setTimeout(()=>{
            console.log("exicute")
            window.sessionStorage.clear()
            window.localStorage.clear()
          navigate("/login/")
        },1000 * 60 * 60 * 4)
        // setTimeout(() => {
        //     console.log("exicute")
        //     window.sessionStorage.clear()
        //     window.localStorage.clear()
        //     navigate("/login/")
        // }, 1000 * 60 * 2)
    }, [])
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content_">
                <div className='dashboard-top'>
                    <div className='d-fex flex-column dashboard-name '>
                        {/* {userData &&
                            <>
                                <h3>{userData.name}</h3>
                                <span>{t("Organize_your_department_quickly")}</span>
                            </>
                        } */}
                    </div>
                    <div className='dashboard-overlap'>
                        <div className='dashboard-main'>
                            {wardDepartmentData && wardDepartmentData.map((val, ind) => {
                                return (
                                    <div className='d-flex flex-row dashboard-box' onClick={() => { handleWard(val.headId, val.headName) }}>
                                        <div className='dah-pic'>
                                            <img src={val.url} alt='' />
                                            {/* <img src={bedImage} width="74px" height="74px" /> */}
                                        </div>
                                        <div className='d-flex flex-column dashboard-ward-name'>
                                            <span>
                                                {val.headName}
                                            </span>
                                            <span className='dashboard-ward-fullname'>
                                                {val.headRemark}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                            {/* <ClinicalRightSideBard wardId={wardId} wardName={wardName}/> */}
                            <Loader val={loders} />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
