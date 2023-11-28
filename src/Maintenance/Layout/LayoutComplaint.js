import React from 'react'
import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Complaint from '../Pages/Complaint'
import Navbar from '../../Components/Navbar'


export default function LayoutComplaint() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <Complaint/>
    </>
  )
}
