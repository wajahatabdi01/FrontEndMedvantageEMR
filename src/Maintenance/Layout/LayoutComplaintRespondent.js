import React from 'react'

import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'
import ComplaintRespondent from '../Pages/ComplaintRespondent'

export default function LayoutComplaintRespondent() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <ComplaintRespondent/>
    </>
  )
}
