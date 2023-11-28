import React from 'react'
import '../assest/css/main.css';
import '../assest/css/style.css';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Home from '../Pages/Home'
export default function HomeLayout() {
    return (
        <div className='abc'>
            <Navbar />
                <Home />
            <Footer />
        </div>
    )
}
