import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import PatientPortalDashboard from '../Pages/PatientPortalDashboard'


export default function LayoutPatientPotalDashboard() {
  return (
    <div className='abc'>
            
            <Navbar/>
            <ClinicalSidebar />
            <PatientPortalDashboard/>
        </div>
  )
}
