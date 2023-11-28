import React from 'react'
import Navbar from '../../Components/Navbar'
import InventorySideBar from '../../Components/InventorySideBar'
import ItemCategory from '../Pages/ItemCategory'


export default function LayoutItemCategory() {
  return (
    <>
    <Navbar/>
<ItemCategory/>
<InventorySideBar/>

    </>
  )
}
