import React from 'react'
import '../assest/css/main.css';
import '../assest/css/style.css';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ContactUs from '../Pages/ContactUs'

export default function ContactUsLayout() {
  return (
    <div className='abc'>
      <Navbar />
        <ContactUs />
      <Footer />
    </div>
  )
}
