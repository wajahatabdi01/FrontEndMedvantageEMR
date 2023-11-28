import React from 'react'

import '../assest/css/main.css';
import '../assest/css/style.css';

import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import About from '../Pages/About'

export default function AboutLayout() {
    return (
        <div className='abc'>
            <Navbar />
            <About />
            <Footer />
        </div>
    )
}
