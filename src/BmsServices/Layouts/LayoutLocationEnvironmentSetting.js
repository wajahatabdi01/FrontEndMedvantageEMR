import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'
import LocationEnvironmentSetting from '../Pages/LocationEnvironmentSetting'

export const LayoutLocationEnvironmentSetting = () => {
  return (
    <>
         <Navbar />
    <LocationEnvironmentSetting/>
    <BMSservicesSidebar/>
    </>
   
  )
}
