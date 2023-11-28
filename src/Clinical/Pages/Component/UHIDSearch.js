import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetCheckCrNo from '../../Api/OPD/Prescription/GetCheckCrNo'
import { getUHIDSearch } from '../../../Reduce/OPD/UHIDSearch'
import searcIcon from "../../../../src/assets/images/Navbar/search.svg"
import store from '../../../Store'
import { getPatientData } from '../../../Reduce/OPD/PatientData'
import { useSelector } from 'react-redux'
import { getPatinetSendData } from '../../../Reduce/OPD/PatinetSendData'

export default function UHIDSearch(props) {
    let navigate = useNavigate()
    let [serachdata, setSearchData] = useState("")

    // let patientsendData = useSelector((state) => state.PatientSendData["patientSendData"])
    let patientsendData = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []


    let handleUHIDSearch = async () => {

        let response = await GetCheckCrNo(serachdata)
        return response

    }
    let handleSearckKey = async (e) => {
        if (e.keyCode === 13) {
            let response = await handleUHIDSearch()
            await func(response)
            document.getElementById("uhidsearch").value = ""
        }
    }


    let handleSearckKeyClick = async () => {
        let response = await handleUHIDSearch()
        await func(response)
        document.getElementById("uhidsearch").value = ""
    }

    let func = async (response) => {
        let patientList = window.sessionStorage.getItem("patientList") ? JSON.parse(window.sessionStorage.getItem("patientList")) : ""
        if (response.status === 1) {
            if (patientList != "") {
                let flag = null
                flag = patientList.filter(item => item.uhId.toLowerCase().includes(response.responseValue[0].uhId.toLowerCase()));
                console.log("UHID HAi", flag)
                if (flag.length === 0 && flag != null) {
                    if (props.val === 1) {
                        store.dispatch(getUHIDSearch(serachdata))
                        store.dispatch(getPatientData(response))
                        let t = [response.responseValue[0].uhId]
                        window.sessionStorage.setItem("patientsendData", JSON.stringify([...patientsendData, t]))
                        window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": serachdata }))
                        navigate("/prescriptionopd/")
                    }
                    else {
                        store.dispatch(getUHIDSearch(serachdata))
                        store.dispatch(getPatientData(response))
                        let t = [response.responseValue[0].uhId]
                        window.sessionStorage.setItem("patientsendData", JSON.stringify([...patientsendData, t]))
                        window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": serachdata }))
                        return;
                    }

                }
                {

                    props.setShowMessage("Already Exits !!")
                    props.setShowToster(1)
                }
            }
            else {
                if (props.val === 1) {
                    store.dispatch(getUHIDSearch(serachdata))
                    store.dispatch(getPatientData(response))

                    window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": serachdata }))

                    let t = [response.responseValue[0].uhId]




                    window.sessionStorage.setItem("patientsendData", JSON.stringify([...patientsendData, t]))

                    navigate("/prescriptionopd/")
                }
                else {
                    store.dispatch(getUHIDSearch(serachdata))
                    store.dispatch(getPatientData(response))
                    window.sessionStorage.setItem("activePatient", JSON.stringify({ "Uhid": serachdata }))

                    let t = [response.responseValue[0].uhId]




                    window.sessionStorage.setItem("patientsendData", JSON.stringify([...patientsendData, t]))


                }
            }

        }
        else {
            props.setShowMessage(response.responseValue)
            props.setShowToster(1)
        }
    }

    let handlechange = (e) => {
        setSearchData(e.target.value)

    }



    return (
        <div className='searchbar ps-2 pe-2'>
            <input type='text' className='OPDSideBarSearch' placeholder='Search UHID' value={serachdata != "" ? serachdata : ""} id="uhidsearch" onKeyDown={handleSearckKey} onChange={handlechange} />
            <img src={searcIcon} width="" height="" onClick={handleSearckKeyClick} style={{ right: "20px" }} />
        </div>
    )
}
