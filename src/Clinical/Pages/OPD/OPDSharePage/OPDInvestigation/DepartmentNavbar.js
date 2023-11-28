import React, { useEffect, useState } from 'react'
import GetCategoryMaster from '../../../../../Lab/Api/CategoryMaster/GetCategoryMaster'

export default function DepartmentNavbar(props) {

    let [allTestCategory, setAllTestCategory] = useState([])
    let [activeTab, setActiveTab] =  useState(0)
    let getData = async () => {
        let response = await GetCategoryMaster()
        if (response.status === 1) {
            // console.log("csdcsc", response.responseValue)
            setAllTestCategory(response.responseValue)
            props.getActiveID(response.responseValue[0].id)
        }
    }

    let handleTab = (index, id)=>{
        // props.setIsUpload(0)
        setActiveTab(index)
        props.getActiveID(id)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="container-fluid" style={{'padding':'0px'}}>
            <div className=" wrap" id="navbarTogglerDemo01">
                {/* <ul className="navbar-nav d-flex flex-row  pb-2 " style={{flexWrap: "wrap"}}> */}
                <div className="navbar-nav commonnav">
                    {allTestCategory && allTestCategory.map((value, index) => {
                        // console.log("dcsd", value)
                        return (
                            <div className='tab-container dropdown-item tabnew' style={{ 'border': '1px solid #002f75','border-radius':'5px', 'background-color': `${activeTab === index ? '#002f75' : 'white'}`, 'cursor': 'pointer', 'color': `${activeTab === index ? 'white' : '#1d4999'}` }} onClick={() => { handleTab(index, value.id) }}>{value.categoryName}</div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
