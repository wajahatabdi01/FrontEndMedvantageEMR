import React from 'react'
import Navbar from '../../Component/Navbar'
import ClinicalSidebar from '../../Component/ClinicalSidebar'
import PatientAppointment from '../Pages/PatientAppointmnet'
import MessageInbox from '../Pages/MessageInbox'


export default function LayoutMessageInbox() {
  return (
    <div className='abc'>
            
            <Navbar/>
            <ClinicalSidebar />
            <MessageInbox/>
        </div>
  )
}
