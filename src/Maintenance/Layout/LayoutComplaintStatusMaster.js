import React from 'react'

import MaintenanceSidebar from '../../Components/MaintenanceSidebar'
import Navbar from '../../Components/Navbar'
import ComlaintStatusMaster from '../Pages/ComlaintStatusMaster'


export default function LayoutComplaintStatusMaster() {
  return (
    <>
      <Navbar/>
      <MaintenanceSidebar/>
      <ComlaintStatusMaster/>
    </>
  )
}
