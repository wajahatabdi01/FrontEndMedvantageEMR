import React from 'react'
import '../assest/css/main.css';
import '../assest/css/style.css';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import VerifyEmail from '../Pages/Verify-Email'

export default function LayoutVerifyEmail() {
    return (
        <div className='abc'>
            <Navbar />
            <VerifyEmail />
            <Footer />
        </div>
    )
}
