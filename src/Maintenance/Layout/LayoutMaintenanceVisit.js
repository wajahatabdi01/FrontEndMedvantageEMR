import React from 'react'
import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Complaint from '../Pages/Complaint'
import Navbar from '../../Components/Navbar'
import MaintenanceVisit from '../Pages/MaintenanceVisit'


export default function LayoutMaintenanceVisit() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <MaintenanceVisit/>
    </>
  )
}
