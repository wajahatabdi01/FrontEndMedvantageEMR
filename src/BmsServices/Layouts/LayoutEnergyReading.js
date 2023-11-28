import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'
import EnergyReading from '../Pages/EnergyReading'

export const LayoutEnergyReading= () => {
  return (
    <>
         <Navbar />
    <EnergyReading/>
    <BMSservicesSidebar/>
    </>
   
  )
}
