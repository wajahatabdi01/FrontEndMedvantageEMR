import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import HippaDocuments from '../Pages/HippaDocuments'


export default function LayoutHippaDocuments() {
  return (
    <div className='abc'>
            
            <Navbar/>
            <ClinicalSidebar/>
            <HippaDocuments/>
        </div>
  )
}
