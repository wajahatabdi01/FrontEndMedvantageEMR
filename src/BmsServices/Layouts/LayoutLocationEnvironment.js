import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'
import LocationEnvironment from '../Pages/LocationEnvironment'

export const LayoutLocationEnvironment= () => {
  return (
    <>
         <Navbar />
    <LocationEnvironment/>
    <BMSservicesSidebar/>
    </>
   
  )
}
