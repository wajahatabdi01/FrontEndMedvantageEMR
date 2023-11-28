import React from 'react'
import Navbar from '../../Components/Navbar'
import InventorySideBar from '../../Components/InventorySideBar'

import VehicleRenewal from '../Pages/VehicleRenewal'



export default function LayoutVehicleRenewal() {
  return (
    <>
    <Navbar/>
<VehicleRenewal/>
<InventorySideBar/>

    </>
  )
}
