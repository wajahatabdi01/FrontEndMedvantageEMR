import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'

import DeviceAccessLog from '../Pages/DeviceAccessLog'

export const LayoutDeviceAccessLog= () => {
  return (
    <>
         <Navbar />
    <DeviceAccessLog/>
    <BMSservicesSidebar/>
    </>
   
  )
}
