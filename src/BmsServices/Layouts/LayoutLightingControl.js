import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'
import LightingControl from '../Pages/LightingControl'


export const LayoutLightingControl= () => {
  return (
    <>
         <Navbar />
    <LightingControl/>
    <BMSservicesSidebar/>
    </>
   
  )
}
