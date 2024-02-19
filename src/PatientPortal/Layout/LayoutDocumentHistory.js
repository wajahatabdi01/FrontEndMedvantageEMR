import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import PatientAppointment from '../Pages/PatientAppointmnet'
import MessageInbox from '../Pages/DocumentHistory'
import DocumentHistory from '../Pages/DocumentHistory'


export default function LayoutDocumentHistory() {
  return (
    <div className='abc'>
            
            <Navbar/>
            <ClinicalSidebar />
            <DocumentHistory/>
        </div>
  )
}
