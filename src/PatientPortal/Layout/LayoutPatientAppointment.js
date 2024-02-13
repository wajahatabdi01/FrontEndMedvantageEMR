import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import PatientAppointment from '../Pages/PatientAppointmnet'


export default function LayoutPatientAppointment() {
  return (
    <div className='abc'>
            
            <Navbar/>
            <ClinicalSidebar />
            <PatientAppointment/>
        </div>
  )
}
