import React, { useEffect, useState } from 'react'
import OPDPhysicalExamination from './PopUp/OPDPhysicalExamination'
import OPDAllergiesPopUP from './PopUp/OPDAllergiesPopUP'
import { useSelector } from 'react-redux'
import OPDDynamicSideBar from './PopUp/OPDDynamicSideBar'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import OPDHistorySideBar from './PopUp/OPDHistorySideBar'
import AlertToster from '../../../../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OPDTOPBottom(props) {
    document.body.dir = i18n.dir();
    const {t} = useTranslation();

    let [activeBox, setActiveBox] = useState()
    // let [showPhysicalExamination, setShowPhysicalExamination] = useState()
    let [showAlergies, setShowAlergies] = useState()
    let [disable, setDisable] = useState(0)
    let [patientCategoryResult, setPatientCategoryResult] = useState([])
    // let [patientExaminationResult, setPatientExaminationResult] = useState([])
    let [patientHistoryCategoryResultExistance, setPatientHistoryCategoryResultExistance] = useState([])
    // let [patientHistoryCategoryResult, setPatientHistoryCategoryResult] = useState([])
    let [showDynamicSideBar, setShowDynamicSideBar] = useState(0)
    let [showHistorySideBar, setShowHistoryideBar] = useState(0)
    let [nameDynamicSidebar, setNameDynamicSidebar] = useState("")
    let [categoryId, setCategoryId] = useState("")
    let [categoryType, setCategoryType] = useState(-1)
    let [activetab, setActivetab] = useState(-1)
    let [message, setMessage] = useState("")
    let [showToster, setShowToster] = useState("")



    let handleClick = (val, name, id, categoryType) => {

        setNameDynamicSidebar(name)
        setCategoryId(id)
        setCategoryType(categoryType)
        if (categoryType === 1) {

            setShowDynamicSideBar(val)
            setShowHistoryideBar(0)

        }
        else {
            setShowHistoryideBar(val)
            setShowDynamicSideBar(0)

        }
    }

    let patientsendData = useSelector((state) => state.PatientSendData["patientSendData"])

    useEffect(() => {
        if (props.values === 1 || props.values === 0) {
            setData()
            props.funh(0)
        }
    }, [props.values === 1, props.values === 0])

    let setData = () => {
        try {
            let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
            let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
            temp.map((value, index) => {
                value.map((val, ind) => {
                    if (value[0] === activeUHID) {
                        let key = Object.keys(val)

                        if (key[0] === "patientCategoryResult") {
                            
                            setPatientCategoryResult(val.patientCategoryResult)
                        }
                        // else if (key[0] === "patientExaminationResult") {
                        //     setPatientExaminationResult(val.patientExaminationResult)
                        // }
                        // else if (key[0] === "patientHistoryCategoryResult") {
                        //     setPatientHistoryCategoryResult(val.patientHistoryCategoryResult)
                        // }
                        else if (key[0] === "patientHistoryCategoryResultExistance") {
                            setPatientHistoryCategoryResultExistance(val.patientHistoryCategoryResultExistance)
                        }
                        else if (key[0] === "disable") {
                            setDisable(val.disable)
                        }
                    }
                })
            })
        }
        catch (e) {
            setShowToster(1)
            setMessage(e)
        }
    }

    useEffect(() => {
        setData()
    }, [patientsendData])



    return (
        <>
            <div className='opdvitalbottom d-flex gap-1 align-items-center pointer' onClick={() => { handleClick(setShowAlergies(7)) }}>
                <span>{t("Allergies")} </span>
                {/* {activeBox === 2 ? checkHtml : ""} */}
            </div>

            {patientCategoryResult && patientCategoryResult.map((value, index) => {
                return (
                    <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' style={{ whiteSpace: "nowrap", backgroundColor: `${index === activetab ? categoryType === 1 ? "#1d4999" : "white" : "white"}` }} onClick={() => { handleClick(1, value.categoryName, value.categoryId, 1); setActivetab(index); }}>
                        <span style={{ color: `${index === activetab ? categoryType === 1 ? "white" : "#1d4999" : "#1d4999"}` }}>{value.categoryName}</span>
                        {value.isDataExists === 1 ? <i className="fa-sharp fa-solid fa-circle-check"></i> : ""}
                    </div>
                )
            })}

            {patientHistoryCategoryResultExistance && patientHistoryCategoryResultExistance.map((value, index) => {
                return (
                    <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' style={{ whiteSpace: "nowrap", backgroundColor: `${index === activetab ? categoryType === 2 ? "#1d4999" : "white" : "white"}` }} onClick={() => { handleClick(1, value.categoryName, value.categoryId, 2); setActivetab(index); }}>
                        <span style={{ color: `${index === activetab ? categoryType === 2 ? "white" : "#1d4999" : "#1d4999"}` }}>{value.categoryName}</span>
                        {value.isDataExists === 1 ? <i className="fa-sharp fa-solid fa-circle-check"></i> : ""}
                    </div>
                )
            })}

            <>
                {/* <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(2)}}>
                <span>PEHx</span>
                {activeBox === 2?checkHtml:""}
            </div>
            <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(3)}}>
                <span>PCHx</span>
                {activeBox === 3?checkHtml:""}
            </div>
            <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(4)}}>
                <span>PHRHx</span>
                {activeBox === 4?checkHtml:""}
            </div>
            <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(5)}}>
                <span>Social Hx</span>
                {activeBox === 5?checkHtml:""}
            </div> */}
                {/* <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(6)}}>
                <span>FHx</span>
                {activeBox === 6?checkHtml:""}
            </div> */}
                {/* <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={() => { handleClick(7) }}>
                <span>Allergies</span>
                {activeBox === 7 ? checkHtml : ""}
            </div> */}
                {/* <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(8)}}>
                <span>Medication</span>
                {activeBox === 8?checkHtml:""}
            </div> */}
                {/* <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(9)}}>
                <span>Physical Examination</span>
                {activeBox === 9?checkHtml:""}
            </div> */}
                {/* <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(10)}}>
                <span>OBs Hx</span>
                {activeBox === 10?checkHtml:""}
            </div>
            <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(11)}}>
                <span>Menstrual Hx</span>
                {activeBox === 11?checkHtml:""}
            </div>
            <div className='opdvitalbottom d-flex gap-2 align-items-center pointer' onClick={()=>{handleClick(12)}}>
                <span>GYN Hx</span>
                {activeBox === 12?checkHtml:""}
            </div> */}
            </>
            {
                showDynamicSideBar === 1 ? <OPDDynamicSideBar name={nameDynamicSidebar} id={categoryId} fun={handleClick} categoryType={categoryType} /> : ""
            }
            {
                showHistorySideBar === 1 ? <OPDHistorySideBar name={nameDynamicSidebar} id={categoryId} fun={handleClick} categoryType={categoryType} /> : ""
            }

            {
                showAlergies === 7 ? <OPDAllergiesPopUP val={1} fun={() => { setShowAlergies(-1) }} /> : ""
            }
            {
                showToster === 1 ? < AlertToster handle={setShowToster} message={message} /> : ""
            }
        </>
    )
}
