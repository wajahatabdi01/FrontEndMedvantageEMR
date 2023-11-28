import React from 'react'
import DynamicDashboard from '../Pages/DynamicDashboard'
import OffcanvasLogo from "../../assets/images/Navbar/offcanvas-logo.png";
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';

export default function LayoutDynamicDasgboard() {
    return (
        <>
            <div>
                <div className='layOutSurgeryOTNavbar'>
                    <Link to="/dashboard/">
                        <div className="offcanvas-logo">
                            <img src={OffcanvasLogo} />
                        </div>
                    </Link>
                    <Navbar />
                </div>
            </div>
            <DynamicDashboard />
        </>
    )
}
