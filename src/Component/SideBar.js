import React from 'react'
import Logo from "../assets/images/LoginPage/RMD-Logo.png"
export default function SideBar() {
    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <img src={Logo} />
            </div>
            <div className='d-flex flex-column justify-center-center'>
                <div className='d-flex flex-row gap-3'>
                    <img src="" />
                    <label></label>
                </div>
            </div>
        </div>
    )
}

