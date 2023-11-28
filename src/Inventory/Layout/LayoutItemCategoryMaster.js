import React from 'react'
import Navbar from '../../Components/Navbar'
import { ItemCategoryMaster } from '../Pages/ItemCategoryMaster'
import InventorySideBar from '../../Components/InventorySideBar'

export const LayoutItemCategoryMaster = () => {
  return (
   <>
   <Navbar />
   <ItemCategoryMaster/>
   <InventorySideBar/>
   </>
  )
}
