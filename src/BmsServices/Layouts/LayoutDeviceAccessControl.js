import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'
import DeviceAccessControl from '../Pages/DeviceAccessControl'

export const LayoutDeviceAccessControl= () => {
  return (
    <>
         <Navbar />
    <DeviceAccessControl/>
    <BMSservicesSidebar/>
    </>
   
  )
}
