import React from 'react'
import Navbar from '../Components/Navbar'
import PatientChoices from '../Pages/PatientChoices'
import Footer from '../Components/Footer'
import PatientGuardianDetails from '../Pages/PatientGuardianDetails'

export default function LayoutPatientGuradian() {
  return (
    <div className='abc'>
            
            <PatientGuardianDetails/>
            <Footer />
        </div>
  )
}
