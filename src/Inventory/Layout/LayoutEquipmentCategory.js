import React from 'react'
import { EquipmentCategory } from '../Pages/EquipmentCategory'
import Navbar from '../../Components/Navbar'
import InventorySideBar from '../../Components/InventorySideBar'


export const LayoutEquipmentCategory = () => {
  return (
    <>
        <Navbar />
        <EquipmentCategory />
        <InventorySideBar />
        
    </>
  )
}
