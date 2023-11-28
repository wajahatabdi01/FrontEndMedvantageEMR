import React from 'react'
import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'
import MaintenanceDashboard from '../Pages/MaintenanceDashboard'


export default function LayoutMaintenanceDashboard() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <MaintenanceDashboard/>
      
    </>
  )
}
