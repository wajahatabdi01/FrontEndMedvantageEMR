import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import MedicalHistory from '../Pages/MedicalHistory'

export default function LayoutMedicalHistory() {
  return (
    <div className='abc'>
            
    <Navbar/>
    <ClinicalSidebar/>
    <MedicalHistory/>
</div>
  )
}
