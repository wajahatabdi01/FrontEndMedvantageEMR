import React from 'react'
import Navbar from '../../Components/Navbar'
import { EquipmentAMC } from '../Pages/EquipmentAMC'
import InventorySideBar from '../../Components/InventorySideBar'

export const LayoutEquipmentAMC = () => {
  return (
    <>
         <Navbar />
    <EquipmentAMC />
    <InventorySideBar />
    </>
   
  )
}
