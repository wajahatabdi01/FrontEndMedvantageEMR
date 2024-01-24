import React, { useEffect, useState } from 'react'
import Loader from '../../../../../Component/Loader'
import searcIcon from "../../../../../assets/images/Navbar/search.svg"
import GetProblemList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import POSTProvableDiseaseList from '../../../../API/OPD/Prescription/KnowMedsAPI/POSTProvableDiseaseList'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import Search, { FindByQuery } from '../../../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import NODataFound from '../../../../../Component/NODataFound'

export default function OPDDiagnosisSuggestion(props) {
    const { t } = useTranslation();
    document.body.dir = i18n.dir();

    let row = { "problemId": 0, "problemName": "", "pdmId": 4 }
    let [sendData, setSendData] = useState([])
    let [problemList, setProblemList] = useState()
    let [oldDiagnosis, setOldDiagnosis] = useState([])
    // let [problemList, setProblemList] = useState()
    let [isDataFound, setisdataFound] = useState(1)


    let [problemListTemp, setProblemListTemp] = useState()
    let [showloder, setShowloder] = useState(1)

    let getdata = async () => {
        
        let temp = []
        let activeUHID = []
        if (props.calling === 0) {
            temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
            activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
        }
        else {
            temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
            activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        }

        let symptomsDatas = []
        try {
            temp.map((value, index) => {
                value.map((val, ind) => {
                    if (value[0] === activeUHID) {
                        let key = Object.keys(val)
                        if (key[0] === "jsonDiagnosis") {
                            if (val.jsonDiagnosis[0] != null) {
                                setOldDiagnosis(val.jsonDiagnosis)
                                val.jsonDiagnosis.map((val, ind) => {
                                    if (val != null) {
                                        if (val.pdmId === 2) {
                                            symptomsDatas.push(val)
                                        }
                                    }
                                })
                            }
                        }
                    }
                })
            })

            let patientDeatails = []

            if (props.calling === 0) {
                patientDeatails = window.sessionStorage.getItem("patientList") ? JSON.parse(window.sessionStorage.getItem("patientList")) : []
            }
            else {
                patientDeatails = window.sessionStorage.getItem("IPDpatientList") ? JSON.parse(window.sessionStorage.getItem("IPDpatientList")) : []

            }
            let age = 0
            let gender = ""
            symptomsDatas = symptomsDatas.length === 0 ? 0 : symptomsDatas
            patientDeatails.map((val, ind) => {
                if (val.uhId === activeUHID) {
                    age = val.age
                    gender = val.gender[0]
                }
            })


            let problemId = []
            symptomsDatas.map((val, ind) => {
                problemId.push(val.problemId)
            })
            let sendData = {
                age: age,
                ageunit: "2014",
                gender: gender,
                problemID: problemId.toString()

            }

            let response = await POSTProvableDiseaseList(sendData)
            
            if (response.status === 1) {
                setShowloder(0)
                setProblemList(response.responseValue)
                setProblemListTemp(response.responseValue)
                setisdataFound(1)
            }
            else {
                setShowloder(0)
                setisdataFound(0)
            }
        }
        catch (e) { }

    }

    let handleSearch = (e) => {
        let value = e.target.value;
        try {
            if (value != "") {
                let response = FindByQuery(problemListTemp, value, "problemName")
                setProblemList(response)
            }
            else {
                setProblemList(problemListTemp)
            }
        }
        catch (e) {

        }

    }

    let handleClick = (id, name) => {
        try {
            row["problemId"] = id
            row["problemName"] = name
            if(props.calling === 1)
            {

                props.saveData([...props.sendData, row], "jsonDiagnosis")
            }
            else{
                SaveOPDData([...oldDiagnosis, row], "jsonDiagnosis")
                // props.saveData([...props.sendData, row])

            }
            props.setSendData([...props.sendData, row])
            props.setConsultantData([...props.consultantData, row])
            // props.setConsultantData([...props.consultantData, row])
            props.fun(0)
        }
        catch (e) { }

    }


    useEffect(() => {
        getdata()
    }, [])

    return (
        <>
            <div className={`${props.val === 0 ? 'offcanvas' : "offcanvas show"}   offcanvas-end`} style={{ width: "400px" }} data-bs-scroll="true" data-bs-backdrop="static" tabIndex="-1" id="symptoms" aria-labelledby="symptomsLabel">
                <div className="offcanvas-header d-flex justify-content-start gap-4  p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
                    <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px" }} data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => { props.fun(0) }}><i className='fa fa-close ' ></i></div>
                    <h5 className="offcanvas-title text-white" id="symptomsLabel" >{t("DIAGNOSIS_SUGGESTION")}</h5>
                    {/* <button type="button" className="btn-close"  ></button> */}
                </div>
                {
                    isDataFound === 1 ?
                        <div className="offcanvas-body ps-4 pe-3 position-relative" >
                            <div className='d-flex flex-column gap-3' >
                                <div className='d-flex flex-column searchbar gap-1 dfc'>
                                    <input type='text' className='ps-3 pe-5 pb-2 pt-2 serchbox' placeholder={t('Search Diagnosis')} onChange={handleSearch} />
                                    <img src={searcIcon} className='rightsidebarsearchicon' alt='' />
                                </div>
                                <div className='d-flex flex-column gap-1'>
                                    {problemList && problemList.map((val, ind) => {
                                        
                                        return (
                                            <>
                                                <span className='ps-4 p-2 departmentList d-flex flex-column gap-1' onClick={() => { handleClick(val.id, val.problemName) }}><label>{val.problemName}</label>
                                                    <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-success" style={{ "width": `${val.diseasePercentage}%` }}>{val.diseasePercentage}%</div>
                                                    </div>
                                                </span>

                                            </>
                                        )
                                    })}
                                </div>


                                {

                                    showloder === 1 ? <Loader val={showloder} /> : ""
                                }

                            </div>
                        </div>

                        :
                        <NODataFound />
                }

            </div>
            <div className="offcanvas-backdrop fade show" onClick={() => { props.fun(0) }}></div>


        </>
    )
}
