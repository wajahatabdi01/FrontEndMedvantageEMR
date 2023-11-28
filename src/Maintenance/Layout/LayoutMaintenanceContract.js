import React from 'react'

import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'

import MaintenanceContract from '../Pages/MaintenanceContract'

export default function LayoutMaintenanceContract() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <MaintenanceContract/>
    </>
  )
}
