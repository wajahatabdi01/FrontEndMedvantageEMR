import React, { useEffect, useState } from 'react'
// import Heading from "../../../../../../Components/Heading"
import BoxHeading from '../../../../../../Component/BoxHeading'
// import Loder from '../../../../../../Component/Loder'
import GetAllDepartmentMaster from "../../../../../../SuperAdmin/Api/Master/DepartmentMaster/GetDepartmentMaster"
import POSTPatientRefer from '../../../../../API/OPD/Prescription/POSTPatientRefer'
import SuccessToster from '../../../../../../Component/SuccessToster'
import AlertToster from '../../../../../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function OPDReferral(props) {
    const {t} = useTranslation(); 
     document.body.dir = i18n.dir();
    let [departmentList, setDepartmentList] = useState([])
    let [hospitalList, setHospitalList] = useState([])
    let [checkedRadio, setCheckedRadio] = useState(1)
    let [sendObject, setSendObject] = useState({ uhID: JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid, referTypeId: 1, fromDeptId: JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId, toDeptId: 0, reason: 0, outerHospitalName: 0, UserId: window.userId })

    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    let getData = async () => {
        let responseDepartment = await GetAllDepartmentMaster()
        if (responseDepartment.status === 1) {
            setDepartmentList(responseDepartment.responseValue)
        }
    }

    let handleRadioBtn = (val) => {

        setCheckedRadio(val)
        document.getElementById("reason").value = ""
    }
    let handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === "toDeptId") {

            sendObject[name] = parseInt(value)
        }
        else {
            sendObject[name] = value

        }
    }

    let handleRefer = async () => {
        try {
            sendObject["referTypeId"] = checkedRadio
            let response = await POSTPatientRefer(sendObject)
            if (response.status === 1) {
                setShowToster(1)
                setMessage(response.message)
                props.func(0)
            }
            else {
                setShowToster(2)
                setMessage(response.responseValue)
            }
            console.log("sendData", sendObject)
        }
        catch (e) {
            setShowToster(2)
            setMessage(e.message)
        }
    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <div className={`modal d-${props.showModal === 1 ? "block" : "none"}`} id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1" style={{background:'#272525cf'}}>
            <div className="modal-dialog modal-dialog-centered modal-md PopUpModal">
                <div className="modal-content">
                    <div className="modal-header d-flex flex-row justify-content-between refheader">
                        {/* <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Modal 1</h1> */}
                        {/* <Heading text="Drug Interaction" /> */}
                        {/* <BoxHeading title={t("Referral")} /> */}
                        <div className='refral'>{t("Referral")}</div>
                        <div  className="cld" data-bs-dismiss="modal" aria-label="Close" onClick={() => { props.func(0) }}><i className='fa fa-times'></i></div>
                    </div>
                    <div className="modal-body ">
                        <div className='d-flex flex-row gap-3 pb-3'>
                            <span className='d-flex flex-row gap-2'>
                                <input type='radio' name="option" defaultChecked={checkedRadio === 1 ? true : false} onClick={() => { handleRadioBtn(1) }} /> <span>{t("Inner Hospital")}</span>
                            </span>
                            <span className='d-flex flex-row gap-2'>
                                <input type='radio' name="option" defaultChecked={checkedRadio === 2 ? true : false} onClick={() => { handleRadioBtn(2) }} /><span>{t("Outer Hospital")}</span>
                            </span>
                        </div>
                        <div className='d-flex flex-column gap-2'>
                            {checkedRadio === 1 ?
                                <>
                                    <select className='opdmedicationinput referalin' name='toDeptId' onChange={handleChange}>
                                        <option value={-1}>{t("Select_Department")}</option>
                                        {departmentList && departmentList.map((val, ind) => {
                                            return (

                                                <option value={val.id}>{val.departmentName}</option>
                                            )
                                        })}
                                    </select>

                                </>

                                :
                                <>
                                    <input type='text' className='opdmedicationinput referinput' name='outerHospitalName' onChange={handleChange} placeholder={t('Please Enter Hospital Name')} />

                                </>
                            }
                            <textarea className='refertextarea' rows="4" cols="50" id="reason" name='reason' onChange={handleChange}></textarea>
                        </div>
                        <div className='d-flex flex-row justify-content-end  pt-3'>
                            <button className='btn referbtn' onClick={handleRefer}>{t("Refer")}</button>
                        </div>

                    </div>
                </div>
            </div>
            {
                showToster === 1 ? < SuccessToster message={message} handle={setShowToster} /> : ""
            }
            {
                showToster === 2 ? <AlertToster message={message} handle={setShowToster} /> : ""
            }
        </div>
    )
}
