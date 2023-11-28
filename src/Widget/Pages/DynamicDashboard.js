import React, { useEffect, useState } from 'react'
import DynamicNavbar from './DynamicNavbar'
import DynamicBox from './DynamicBox'
import GetAllWidgetByRoleId from '../API/GetAllWidgetByRoleId'
import GetWidgetMasterById from '../API/GetWidgetMasterById'

export default function DynamicDashboard() {

    let [widgetBoxData, setWidgetBoxData] = useState(null)
    let [temData, setTemdata] = useState([])
    let [filterData, setFilterData] = useState("1")
    let [showSelectedFilter, setShowSelectedFilter] = useState("Select Filter")

    let getWidgetBoxData = async (id) => {

        let response = await GetWidgetMasterById(id)

        if (response.status === 1) {
            return response.responseValue

        }


    }

    let getData = async () => {
        let role  =  JSON.parse(window.sessionStorage.getItem("LoginData")).roleId
        let responseRole = await GetAllWidgetByRoleId(role)
        let temp = []
        if (responseRole.status === 1) {
            let data =  responseRole.responseValue.map(async (val, index) => {
                return await getWidgetBoxData(val.widgetId)
                
            })
            Promise.all(data).then((val)=>{
                setWidgetBoxData(val)
                console.log("val", val)
            })
        }

    }

    let handleRemove = (index) => {
        let temp = [...widgetBoxData]
        temp.splice(index, 1)
        setWidgetBoxData(temp)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className="container-fluid mt-50px">
                <div className="row">
                    <DynamicNavbar handleFilter={setFilterData} showSelectedFilter={showSelectedFilter} setShowSelectedFilter={setShowSelectedFilter}/>
                    <div className="col-12 p-0 mt-1">
                        <div className="med-box">
                            <div id="dynamicBoxContainer" className="dynamicBoxContainer p-2">
                                {widgetBoxData && widgetBoxData.map((val, ind) => {
                                    return (
                                        <DynamicBox data={val} handleRemove={handleRemove} index={ind} filterData={filterData}/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

