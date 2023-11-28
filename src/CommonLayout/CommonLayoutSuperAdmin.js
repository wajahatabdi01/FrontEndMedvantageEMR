import React from 'react'
import Navbar from '../Component/Navbar'
import MenuSideBarSuperAdmin from '../Component/MenuSideBarSuperAdmin'

export default function CommonLayoutSuperAdmin(props) {
  return (
    <div>
      <Navbar showMenu={1} changeNavbar={0} isSuperadmin={true} />
      <MenuSideBarSuperAdmin />
      

      {props.Component}
     
    </div>
  )
}

