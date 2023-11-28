import React from 'react'
import Navbar from '../../Components/Navbar'
import InventorySideBar from '../../Components/InventorySideBar'
import InventoryItemMaster from '../Pages/InventoryItemMaster'

export default function LayoutInventoryItemMaster() {
  return (
    <>
    <Navbar/>
<InventoryItemMaster/>
<InventorySideBar/>

    </>
  )
}
