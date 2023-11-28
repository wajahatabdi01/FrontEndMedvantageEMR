import React from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import OffcanvasLogo from "../assets/images/Navbar/offcanvas-logo.png";
import PageNotfound from "../assets/images/LoginPage/PageNotfound.png"
export default function PageNotFound() {

    const history = useNavigate();
    
    return (
        <div className='d-flex flex-column '>
            <div className='layOutSurgeryOTNavbar'>
                <div>
                    <div className="offcanvas-logo">
                        <Link to="/dashboard/"><img src={OffcanvasLogo} /></Link>
                    </div>
                </div>
                <Navbar />
            </div>
            <div className='otDashboardWrapper'>
                <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
                    <div className='d-flex flex-column gap-2'>
                        <img src={PageNotfound} />
                        <div className='d-flex flex-column justify-content-center align-items-center gap-2' >
                            <span className='text-center' style={{ font: "normal normal 600 30px/37px Poppins", color: "#081834", width: "342px" }}>
                                We can't find the page you're looking for.
                            </span>
                            <span className='text-center' style={{ font: " normal normal normal 14px/21px Poppins", color: "#474A51", width: "414px" }}>
                                Sorry, the page you are looking for doesn't exist or has been moved. Please check the URL or go back home.
                            </span>
                            <button onClick={()=>{history(-2)}} className='text-white' style={{ width: "151px", height: "38px", borderRadius: "5px", font: "normal normal medium 16px/25px Poppins", background: "#1D4999 0% 0% no-repeat padding-box", border: "none" }}>
                                Go Back Home
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}
