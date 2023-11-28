import React from 'react'
import '../assest/css/main.css';
import '../assest/css/style.css';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import BenifitOfRMD from '../Pages/BenifitOfRMD'

export default function BenifitOfRMDLayout() {
    return (
        <div className='abc'>
            <Navbar />
            <BenifitOfRMD />
            <Footer />
        </div>
    )
}
