import React from 'react'
import Navbar from '../Components/Navbar'
import PatientChoices from '../Pages/PatientChoices'
import Footer from '../Components/Footer'
import PatientInsurance from '../Pages/PatientInsurance'

export default function LayoutPatientInsuranceDetails() {
  return (
    <div className='abc'>
            
            <PatientInsurance/>
            <Footer />
        </div>
  )
}
