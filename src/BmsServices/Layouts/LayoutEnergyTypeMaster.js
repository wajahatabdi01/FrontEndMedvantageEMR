import React from 'react'
import Navbar from '../../Components/Navbar'

import EnergyTypeMaster from '../Pages/EnergyTypeMaster'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'

export const LayoutEnergyTypeMaster= () => {
  return (
    <>
         <Navbar />
    <EnergyTypeMaster/>
    <BMSservicesSidebar/>
    </>
   
  )
}
