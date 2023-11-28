import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthRoutes(props) {
    let Compnent = props.Compnent;
    let navigate = useNavigate();
    let token = JSON.parse(window.sessionStorage.getItem("LoginData") ? window.sessionStorage.getItem("LoginData") : 0)
    const currentPath = useLocation()
    useEffect(() => {
        try {
            if (token === 0) {
                navigate("/login")
            }
            else {
                if (window.sessionStorage.getItem("departmentmenu")) {
                    console.log("enter")
                    let flag = 0
                    JSON.parse(window.sessionStorage.getItem("departmentmenu")).menuList.map((val, ind) => {
                        if (val.subMenuList.length !== 0) {
                            val.subMenuList.map((v, ii) => {
                                if (v.url.toLowerCase().toString().trim() === currentPath.pathname.toLowerCase().toString().trim()) {
                                    flag = 1
                                }
                            })
                            if (val.url.toLowerCase().toString().trim() === currentPath.pathname.toLowerCase().toString().trim()) {
                                flag = 1
                            }
                        }

                        else {
                            if (val.url.toLowerCase().toString().trim() === currentPath.pathname.toLowerCase().toString().trim()) {
                                flag = 1
                            }
                        }

                    })
                    if (flag === 0) {
                        // console.log("test", currentPath.pathname.toLowerCase().toString().trim().replace("/", "").includes("print"))
                        if (!currentPath.pathname.toLowerCase().toString().trim().replace("/", "").includes("print")) {
                            if (currentPath.pathname.toLowerCase().toString().trim() !== "/dashboard/") {
                                console.log("test", currentPath.pathname.toLowerCase().toString().trim())
                                if (currentPath.pathname.toLowerCase().toString().trim() !== "/profile/") {
                                    if (currentPath.pathname.toLowerCase().toString().trim() !== "/patientmonitordashboard/") {
                                        if (!currentPath.pathname.toLowerCase().toString().trim().replace("/", "").includes("list") && currentPath.pathname.toLowerCase().toString().trim() !== "/pagenotfound/") {
                                            navigate("/pagenotfound/")
                                        }
                                    }
                                    else {
                                        navigate("/patientmonitordashboard/")

                                    }
                                }
                                else {
                                    navigate("/profile/")

                                }

                            }
                            else {
                                navigate("/dashboard/")

                            }
                        }
                        else {

                        }

                    }
                }
                // else {
                //     console.log("currentpath", currentPath.pathname.toLowerCase().toString())
                //     if (currentPath.pathname.toLowerCase().toString().trim() !== "/dashboard/" && currentPath.pathname.toLowerCase().toString().trim()  !== "/patientmonitordashboard/" && currentPath.pathname.toLowerCase().toString().trim() !== "/patientpersonaldashboardpmddashboard/".toLowerCase().toString().trim()) {

                //         console.log("pathfound", currentPath.pathname.toLowerCase().toString().trim())
                //         navigate("/pagenotfound/")
                //     }
                //     else {
                //         // console.log("cdsvjbbjvbxcvxcvcnxbvmcnbzm")
                //     }
                // }
            }
        }
        catch (e) {

        }





    }, [])
    return (
        <>
            {Compnent}
        </>
    )
}
function AuthRoutesSuperadmin(props) {
    let Compnent = props.Compnent;
    let navigate = useNavigate();
    let token = JSON.parse(window.sessionStorage.getItem("SuperAdminData") ? window.sessionStorage.getItem("SuperAdminData") : 0)
    useEffect(() => {
        if (token === 0) {

            window.sessionStorage.removeItem("departmentmenu")
            navigate("/superadmin")
        }
    }, [])
    return (
        <>
            {Compnent}
        </>
    )
}
export { AuthRoutesSuperadmin }
