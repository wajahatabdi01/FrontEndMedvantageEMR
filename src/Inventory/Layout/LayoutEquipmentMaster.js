import React from 'react'
import Navbar from '../../Components/Navbar'
import InventorySideBar from '../../Components/InventorySideBar'
import { EquipmentMaster } from '../Pages/EquipmentMaster'


export const LayoutEquipmentMaster = () => {
  return (
    <>
        <Navbar />
        <EquipmentMaster/>
        <InventorySideBar />
        
    </>
  )
}
