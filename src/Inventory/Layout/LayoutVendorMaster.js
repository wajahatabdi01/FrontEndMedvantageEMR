import React from 'react'
import Navbar from '../../Components/Navbar'
import { VendorMaster } from '../Pages/VendorMaster'
import InventorySideBar from '../../Components/InventorySideBar'

export const LayoutVendorMaster = () => {
  return (
    <>
        <Navbar />
        <VendorMaster />
        <InventorySideBar />
    </>
   
  )
}
