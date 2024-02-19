import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import ReportContent from '../Pages/ReportContent'

export default function LayoutReportContent() {
  return (
    <div className='abc'>
            
    <Navbar/>
    <ClinicalSidebar/>
    <ReportContent/>
</div>
  )
}
