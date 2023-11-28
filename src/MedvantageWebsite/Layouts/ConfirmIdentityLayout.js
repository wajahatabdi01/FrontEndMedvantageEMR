import React from 'react'
import Navbar from '../Components/Navbar'
import ConfirmIdentity from '../Pages/ConfirmIdentity'
import Footer from '../Components/Footer'

export default function ConfirmIdentityLayout() {
  return (
    <div className='abc'>
      <Navbar/>
      <ConfirmIdentity/>
      <Footer/>
    </div>
  )
}
