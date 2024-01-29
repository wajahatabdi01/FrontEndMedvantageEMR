import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IPDDynamicHistoryCategorySideBar from './Siderbar/IPDDynamicHistoryCategorySideBar'
import IPDDynamicExaminationSideBar from './Siderbar/IPDDynamicExaminationSideBar'

export default function IPDHistory() {
    // let [patientHistoryCategoryResult, setPatientHistoryCategoryResult] = useState([])
    let [patientHistoryCategoryResultExistance, setPatientHistoryCategoryResultExistance] = useState([])
    let [patientCategoryResult, setPatientCategoryResult] = useState([])
    let patientsendDataChange = useSelector((state) => state.IPDPatientSendData)
    let [showDynamicSideBar, setShowDynamicSideBar] = useState(0)
    let [showHistorySideBar, setShowHistoryideBar] = useState(0)
    let [nameDynamicSidebar, setNameDynamicSidebar] = useState("")
    let [categoryId, setCategoryId] = useState(-1)
    let [categoryType, setCategoryType] = useState(-1)
    let [activetab, setActivetab] = useState(-1)


    let handleClick = (val, name, id, categoryType) => {


        setNameDynamicSidebar(name)
        setCategoryId(id)
        setCategoryType(categoryType)
        if (categoryType === 2) {

            setShowDynamicSideBar(val)
            setShowHistoryideBar(0)

        }
        else {
            setShowHistoryideBar(val)
            setShowDynamicSideBar(0)

        }
    }

    let setData = () => {
        let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "patientCategoryResult") {
                        setPatientCategoryResult(val.patientCategoryResult)
                    }
                    else if (key[0] === "patientHistoryCategoryResultExistance") {
                        setPatientHistoryCategoryResultExistance(val.patientHistoryCategoryResultExistance)
                    }

                }
            })
        })
    }

    useEffect(() => {
        setData()
    }, [patientsendDataChange])
    return (
        <>
            <div className='roww'>
                <div className={`d-flex flex-row gap-2 pt-2  pb-2 boxcontainer mt-2 boxs`} style={{ overflow: "auto" }}>
                    {patientCategoryResult && patientCategoryResult.map((value, index) => {
                        return (
                            <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' style={{ whiteSpace: "nowrap", backgroundColor: `${index === activetab ? categoryType === 1 ? "#1d4999" : "white" : "white"}` }} onClick={() => { handleClick(1, value.categoryName, value.categoryId, 1); setActivetab(index); }}>
                                <span style={{ color: `${index === activetab ? categoryType === 1 ? "white" : "#1d4999" : "#1d4999"}` }}>{value.categoryName}</span>
                                {value.isDataExists === 1 ? <i className="fa-sharp fa-solid fa-circle-check"></i> : ""}
                            </div>
                        )
                    })}

                    {patientHistoryCategoryResultExistance && patientHistoryCategoryResultExistance.map((val, index) => {
                        return (
                            <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' style={{ whiteSpace: "nowrap", backgroundColor: `${index === activetab ? categoryType === 2 ? "#1d4999" : "white" : "white"}` }} onClick={() => { handleClick(1, val.categoryName, val.categoryId, 2); setActivetab(index); }}>
                                <span style={{ color: `${index === activetab ? categoryType === 2 ? "white" : "#1d4999" : "#1d4999"}` }}>{val.categoryName}</span>
                                {val.isDataExists === 1 ? <i className="fa-sharp fa-solid fa-circle-check"></i> : ""}
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* {patientHistoryCategoryResult && patientHistoryCategoryResult.map((value, index) => {
                return (
                    <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' style={{ backgroundColor: `${index === activetab ? categoryType === 1 ? "#1d4999" : "white" : "white"}` }} onClick={() => { handleClick(1, value.categoryName, value.categoryId, 1);  setActivetab(index); }}>
                        <span style={{color: `${index === activetab ? categoryType === 1 ? "white" : "#1d4999" : "#1d4999"}`}}>{value.categoryName}</span>
                        {value.isDataExists === 1 ? <i className="fa-sharp fa-solid fa-circle-check"></i> : ""}
                    </div>
                )
            })}

            {patientHistoryCategoryResultExistance && patientHistoryCategoryResultExistance.map((value, index) => {
                return (
                    <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' style={{ backgroundColor: `${index === activetab ? categoryType === 2 ? "#1d4999" : "white" : "white"}` }} onClick={() => { handleClick(1, value.categoryName, value.categoryId, 2); setActivetab(index);  }}>
                        <span style={{ color: `${index === activetab ? categoryType === 2 ? "white" : "#1d4999" : "#1d4999"}`}}>{value.categoryName}</span>
                        {value.isDataExists === 1 ? <i className="fa-sharp fa-solid fa-circle-check"></i> : ""}
                    </div>
                )
            })} */}


            {
                showDynamicSideBar === 1 ? <IPDDynamicHistoryCategorySideBar name={nameDynamicSidebar} id={categoryId} fun={handleClick} categoryType={categoryType} /> : ""
            }
            {
                showHistorySideBar === 1 ? <IPDDynamicExaminationSideBar name={nameDynamicSidebar} id={categoryId} fun={handleClick} categoryType={categoryType} /> : ""
            }
        </>
    )

}
