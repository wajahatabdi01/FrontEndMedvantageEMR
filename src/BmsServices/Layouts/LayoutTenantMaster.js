import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'

import TenantMaster from '../Pages/TenantMaster'

export const LayoutTenantMaster= () => {
  return (
    <>
         <Navbar />
    <TenantMaster/>
    <BMSservicesSidebar/>
    </>
   
  )
}
