import React from 'react'
import Navbar from '../Components/Navbar'
import ForgotPassword from '../Pages/ForgotPassword'
import Footer from '../Components/Footer'

export default function ForgotPasswordLayout() {
  return (
    <div className='abc'>
      <Navbar/>
      <ForgotPassword/>
      <Footer/>
    </div>
  )
}
