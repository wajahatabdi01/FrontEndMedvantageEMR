import React from 'react'

import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'
import ComplaintChart from '../Pages/ComplaintChart'

export default function LayoutComplaintChart() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <ComplaintChart/>
    </>
  )
}
