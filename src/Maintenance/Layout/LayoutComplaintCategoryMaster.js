import React from 'react'

import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'
import ComplaintCategoryMaster from '../Pages/ComplaintCategoryMaster'

export default function LayoutComplaintCategoryMaster() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <ComplaintCategoryMaster/>
    </>
  )
}
