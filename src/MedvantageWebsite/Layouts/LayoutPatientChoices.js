import React from 'react'
import Navbar from '../Components/Navbar'
import PatientChoices from '../Pages/PatientChoices'
import Footer from '../Components/Footer'

export default function LayoutPatientChoices() {
  return (
    <div className='abc'>
            
            <PatientChoices/>
            <Footer />
        </div>
  )
}
