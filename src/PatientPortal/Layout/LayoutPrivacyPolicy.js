import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import PrivacyPolicy from '../Pages/PrivacyPolicy'


export default function LayoutPrivacyPolicy() {
  return (
    <div className='abc'>
            
            <Navbar/>
            <ClinicalSidebar />
            <PrivacyPolicy/>
        </div>
  )
}
