import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'
import EnergyMeter from '../Pages/EnergyMeter'

export const LayoutEnergyMeter= () => {
  return (
    <>
         <Navbar />
    <EnergyMeter/>
    <BMSservicesSidebar/>
    </>
   
  )
}
