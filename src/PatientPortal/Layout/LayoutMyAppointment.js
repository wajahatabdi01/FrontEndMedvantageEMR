import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import PatientAppointment from '../Pages/PatientAppointmnet'
import MyAppointment from '../Pages/MyAppointment'


export default function LayoutMyAppointment() {
  return (
    <div className='abc'>
            
            <Navbar/>
            <ClinicalSidebar/>
            <MyAppointment/>
        </div>
  )
}
