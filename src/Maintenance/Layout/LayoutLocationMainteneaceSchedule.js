import React from 'react'
import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'
import LocationMainteneaceSchedule from '../Pages/LocationMainteneaceSchedule'


export default function LayoutLocationMainteneaceSchedule() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <LocationMainteneaceSchedule/>
    </>
  )
}
