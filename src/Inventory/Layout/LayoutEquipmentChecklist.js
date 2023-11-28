import React from 'react'
import Navbar from '../../Components/Navbar'
import InventorySideBar from '../../Components/InventorySideBar'
import EquipmentChecklist from '../Pages/EquipmentChecklist'


export default function LayoutEquipmentChecklist() {
  return (
    <>
    <Navbar/>
<EquipmentChecklist/>
<InventorySideBar/>

    </>
  )
}
