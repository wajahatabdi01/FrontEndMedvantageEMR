import React from 'react'
import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'
import ComplaintApproval from '../Pages/ComplaintApproval'


export default function LayoutComplaintApproval() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <ComplaintApproval/>
    </>
  )
}
