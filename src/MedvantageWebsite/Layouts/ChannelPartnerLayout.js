import React from 'react'
import '../assest/css/main.css';
import '../assest/css/style.css';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ChannelPartner from '../Pages/ChannelPartner'
export default function ChannelPartnerLayout() {
    return (
        <div className='abc'>
            <Navbar />
            <ChannelPartner />
            <Footer />
        </div>
    )
}
