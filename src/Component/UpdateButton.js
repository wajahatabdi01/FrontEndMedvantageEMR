import React, { useEffect, useState } from 'react'
import save from '../assets/images/icons/save.svg'

export default function UpdateButton(props) {
    let [showUpdate, setShowUpdate] = useState(0)
    useEffect(() => {
        let getAllMenu = window.sessionStorage.getItem("departmentmenu") ? JSON.parse(window.sessionStorage.getItem("departmentmenu")).menuList : []
        let activeMenu = JSON.parse(window.sessionStorage.getItem("activePage"))
        getAllMenu.map((v, i) => {
            if (v.menuId === activeMenu.menuId) {
                if (v.permissions.modifyAllowed === true) {
                    setShowUpdate(1)
                }
            }
        })

    }, [])
    return (
        <>
            {
                showUpdate === 1 ? <button type="button" className="btn btn-save btn-save-fill btn-sm mt-2" onClick={() => { props.onClick() }}><img src={save} className='icnn' alt='' /> Update</button> : ""
            }
        </>

    )
}
