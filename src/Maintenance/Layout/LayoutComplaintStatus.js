import React from 'react'

import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'
import ComplaintStatus from '../Pages/ComplaintStatus'

export default function LayoutComplaintStatus() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <ComplaintStatus/>
    </>
  )
}
