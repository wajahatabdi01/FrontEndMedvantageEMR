import React from 'react'
import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'

import MaintenanceSchedule from '../Pages/MaintenanceSchedule'


export default function LayoutMaintenanceSchedule() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <MaintenanceSchedule/>
    </>
  )
}
