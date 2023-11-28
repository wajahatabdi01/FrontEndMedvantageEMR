import React from 'react'
import { ServiceTypeMaster } from '../Pages/ServiceTypeMaster'
import Navbar from '../../Components/Navbar'
import InventorySideBar from '../../Components/InventorySideBar'

export const LayoutServiceTypeMaster = () => {
  return (
    <>
        <Navbar />
        <ServiceTypeMaster />
        <InventorySideBar />
    </>
  )
}
