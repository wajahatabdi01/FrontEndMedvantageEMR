import React from 'react'
import Navbar from '../../Components/Navbar'
import InventorySideBar from '../../Components/InventorySideBar'
import ItemSubCategoryMaster from '../Pages/ItemSubCategoryMaster'

export default function LayoutInventoryItemMaster() {
  return (
    <>
    <Navbar/>
<ItemSubCategoryMaster/>
<InventorySideBar/>

    </>
  )
}
