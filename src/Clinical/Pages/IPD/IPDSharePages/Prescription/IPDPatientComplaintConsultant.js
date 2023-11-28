import React, { useRef } from 'react'
import ExistingComplain from "../../../../../assets/images/OPD/existingComplain.svg"
import ProvisionalDiagonisys from "../../../../../assets/images/OPD/provisionalDiagonisys.svg"
import { useState } from 'react'
import Search, { FindByQuery, SearchIndex } from '../../../../../Code/Serach'
import GetProblemList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import { useEffect } from 'react'
import SaveIPDData from '../../../../../Code/SaveIPDData'
import { useSelector } from 'react-redux'
import OPDSymptomsPopUp from '../../../OPD/OPDSharePage/OPDPrescription/OPDSymptomsPopUp'
import OPDAllergiesPopUP from '../../../OPD/OPDSharePage/OPDPrescription/PopUp/OPDAllergiesPopUP'
import OPDConsultantDiagnosis from '../../../OPD/OPDSharePage/OPDPrescription/OPDConsultantDiagnosis'
import OPDDiagnosisSuggestion from '../../../OPD/OPDSharePage/OPDPrescription/OPDDiagnosisSuggestion'
import Antibiogram from '../../../OPD/OPDSharePage/OPDPrescription/PopUp/Antibiogram'
import DownKey, { UpKey } from "../../../../../Code/ListSelect";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import AlertToster from '../../../../../Component/AlertToster'


export default function IPDPatientComplaintConsultant() {

    const { t } = useTranslation();
    document.body.dir = i18n.dir()


    let [symptomsData, setSymptomsData] = useState([])
    let [consultantData, setConsultantData] = useState([])

    let [showSearchBoxProblem, setShowSearchBoxProblem] = useState(-1)
    let [showSearchBoxProblemConsultant, setShowSearchBoxProblemConsultant] = useState(-1)

    let [problemList, setProblemList] = useState()
    let [problemListTemp, setProblemListTemp] = useState()

    let [sendData, setSendData] = useState([])

    let [showDignosis, setShowDignosis] = useState(1)
    let [symptomsPopUp, setSymptomsPopUp] = useState(0)
    let [allergiesPopUP, setAllergiesPopUP] = useState(0)
    let [consultantPopUP, setConsultantPopUP] = useState(0)
    let [diagnosisSuggestionPopUP, setDiagnosisSuggestionPopUP] = useState(0)
    let [showAntibiogram, setShowAntibiogram] = useState(0)
    let [showAlert, setShowAlert] = useState(0)


    let row = { "problemId": 0, "problemName": "", "pdmId": 0 }
    let liSelected = useRef()
    let index = useRef(-1)
    let next = useRef()
    let oldData = useRef(0)

    let getdata = async () => {
        let response = await GetProblemList()
        if (response.status === 1) {
            setProblemList(response.responseValue)
            setProblemListTemp(response.responseValue)
        }
    }

    let handleKeyPress = (e) => {
        let value = e.target.value;
        let name = e.target.name
        let ul = ""
        if (e.keyCode === 13) {
            if (name === "symptomsData") {
                if (showSearchBoxProblem === -1) {
                    row["problemId"] = 0
                    row["problemName"] = value
                    row["pdmId"] = 2
                }
                else {
                    ul = document.getElementById('symptomsDataList');
                    row["problemId"] = ul.getElementsByTagName('li')[index.current].value
                    row["problemName"] = ul.getElementsByTagName('li')[index.current].innerText
                    row["pdmId"] = 2
                    setShowSearchBoxProblem(-1)
                    liSelected.current = ""
                    index.current = -1
                    next.current = ""
                    oldData.current = 0
                }

                setSymptomsData([...symptomsData, row])
                setSendData([...sendData, row])

                document.getElementById(name).value = ""
                document.getElementById(name).focus()
            }
            else if (name === "consultantData") {
                if (showSearchBoxProblemConsultant === -1) {
                    row["problemId"] = 0
                    row["problemName"] = value
                    row["pdmId"] = 4
                }
                else {
                    ul = document.getElementById('consultantDataList');
                    row["problemId"] = ul.getElementsByTagName('li')[index.current].value
                    row["problemName"] = ul.getElementsByTagName('li')[index.current].innerText
                    row["pdmId"] = 4
                    setShowSearchBoxProblemConsultant(-1)
                    liSelected.current = ""
                    index.current = -1
                    next.current = ""
                    oldData.current = 0
                }
                setConsultantData([...consultantData, row])
                setSendData([...sendData, row])

                document.getElementById(name).value = ""
                document.getElementById(name).focus()
            }

        }

        else if (e.keyCode === 40) {
            // down
            if (name === "symptomsData") {
                if (showSearchBoxProblem !== -1) {
                    ul = document.getElementById('symptomsDataList');
                    DownKey(ul, liSelected, index, next, oldData)
                }
            }
            else if (name === "consultantData") {
                if (showSearchBoxProblemConsultant !== -1) {
                    ul = document.getElementById('consultantDataList');
                    DownKey(ul, liSelected, index, next, oldData)
                }

            }

        }

        else if (e.keyCode === 38) {
            // Up
            if (name === "consultantData") {
                if (showSearchBoxProblem !== -1) {
                    ul = document.getElementById('symptomsDataList');
                    UpKey(ul, liSelected, index, next, oldData)

                }
            }
            else if (name === "consultantData") {
                if (showSearchBoxProblemConsultant !== -1) {
                    ul = document.getElementById('consultantDataList');
                    UpKey(ul, liSelected, index, next, oldData)
                }

            }

        }
    }

    let handleSearch = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let data = [...sendData].filter(n => n)

        if (value != "") {
            if (name === "symptomsData") {
                // let response = Search(problemList, value)
                let response = FindByQuery(problemList, value, "problemName")
                if (response.length != 0) {
                    setProblemListTemp(response)
                    setShowSearchBoxProblem(1)
                }
                else {
                    // let t = 0
                    // row["problemId"] = 0
                    // row["problemName"] = value
                    // row["pdmId"] = 2
                    // let temp = [...data]
                    // let flag = 0
                    // data.map((val, ind) => {
                    //     if (val.pdmId === 2 && val.problemId === 0) {
                    //         temp[ind]["problemName"] = value
                    //         flag = 1
                    //     }
                    // })
                    // if (flag != 1) {
                    //     setSendData([...data, row])
                    //     SaveIPDData([...data, row], "jsonDiagnosis")
                    // }
                    // else {
                    //     setSendData([...temp])
                    //     SaveIPDData([...temp], "jsonDiagnosis")

                    // }


                    // setProblemListTemp([])
                    setShowSearchBoxProblem(-1)

                }

            }
            else if (name === "consultantData") {

                let response = FindByQuery(problemList, value, "problemName")

                if (response.length != 0) {
                    setProblemListTemp(response)
                    setShowSearchBoxProblemConsultant(1)
                }
                else {
                    // let t = 0
                    // row["problemId"] = 0
                    // row["problemName"] = value
                    // row["pdmId"] = 4
                    // let temp = [...data]
                    // let flag = 0
                    // data.map((val, ind) => {
                    //     if (val.pdmId === 2 && val.problemId === 0) {
                    //         temp[ind]["problemName"] = value
                    //         flag = 1
                    //     }
                    // })
                    // if (flag != 1) {
                    //     setSendData([...data, row])
                    //     SaveIPDData([...data, row], "jsonDiagnosis")

                    // }
                    // else {
                    //     setSendData([...temp])
                    //     SaveIPDData([...temp], "jsonDiagnosis")

                    // }
                    // setProblemListTemp([])
                    setShowSearchBoxProblemConsultant(-1)

                }

            }

        }
        else {
            setShowSearchBoxProblem(-1)
            setShowSearchBoxProblemConsultant(-1)
        }

    }

    let handleClick = (boxname, id, name) => {
        let data = [...sendData].filter(n => n)
        if (boxname === "symptomsData") {
            let t = 0
            row["problemId"] = id
            row["problemName"] = name
            row["pdmId"] = 2

            setShowSearchBoxProblem(-1)
            let flag = 0
            symptomsData.map((v, i) => {
                if (v.problemId === id) {
                    flag = 1
                    return
                }
            })
            if (flag === 0) {
                setSendData([...data, row])
                SaveIPDData([...data, row], "jsonDiagnosis")

                setSymptomsData([...symptomsData, row])
            }
            let r = SearchIndex(problemList, "problemName", name)
            let tt = [...problemList]
            tt.splice(r, 1)
            setProblemList(tt)


            let temp = [...data]
            data.map((val, ind) => {
                if (val.pdmId === 2 && val.problemId === 0) {
                    delete temp[ind]
                }
            })
            setSendData([...temp.filter(n => n), row])
            SaveIPDData([...temp.filter(n => n), row], "jsonDiagnosis")

            document.getElementById("symptomsData").focus()

            document.getElementById("symptomsData").value = "";

        }
        else if (boxname === "consultantData") {
            let t = 0
            row["problemId"] = id
            row["problemName"] = name
            row["pdmId"] = 4
            setShowSearchBoxProblemConsultant(-1)

            let flag = 0
            symptomsData.map((v, i) => {
                if (v.problemId === id) {
                    flag = 1
                    return
                }
            })
            if (flag === 0) {
                setSendData([...data, row])
                SaveIPDData([...data, row], "jsonDiagnosis")

                setConsultantData([...consultantData, row])
            }
            let r = SearchIndex(problemList, "problemName", name)
            let tt = [...problemList]
            tt.splice(r, 1)
            setProblemList(tt)

            let temp = [...data]
            data.map((val, ind) => {
                if (val.pdmId === 4 && val.problemId === 0) {
                    delete temp[ind]
                }
            })
            // getDataFood([...consultantData, row])
            document.getElementById("consultantData").focus();

            setSendData([...temp.filter(n => n), row])
            SaveIPDData([...temp.filter(n => n), row], "jsonDiagnosis")

            document.getElementById("consultantData").value = "";
        }
    }
    let patientsendDataChange = useSelector((state) => state.IPDPatientSendData)

    let handleRemove = (ind, problemId, name, problemName) => {
        let tempsymptomsData = [...symptomsData]
        let tempconsultantData = [...consultantData]
        let tempSenddata = [...sendData]

        if (name === "symptomsData") {
            sendData.map((val, index) => {
                if (val.pdmId === 2 && val.problemId === problemId && val.problemName === problemName) {
                    tempSenddata.splice(index, 1)
                    return
                }
            })
            console.log("ind", ind)
            tempsymptomsData.splice(ind, 1)
        }
        else if (name === "consultantData") {
            sendData.map((val, index) => {
                if (val.pdmId === 4 && val.problemId === problemId && val.problemName === problemName) {
                    tempSenddata.splice(index, 1)
                    return
                }
            })
            tempconsultantData.splice(ind, 1)
        }

        setSymptomsData(tempsymptomsData)
        setConsultantData(tempconsultantData)
        setSendData(tempSenddata)
        SaveIPDData(tempSenddata, "jsonDiagnosis")
    }


    let setData = () => {
        setSymptomsData([])
        setConsultantData([])
        setSendData([])
        document.getElementById("symptomsData").value = ""
        document.getElementById("consultantData").value = ""
        let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        let symptomsDatas = []
        let consultantDatas = []

        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonDiagnosis") {
                        if (val.jsonDiagnosis[0] != null) {
                            val.jsonDiagnosis.map((val, ind) => {

                                if (val != null) {
                                    if (val.pdmId === 2) {
                                        setSymptomsData([...symptomsDatas, val])
                                        symptomsDatas.push(val)
                                    }
                                    if (val.pdmId === 4) {
                                        setConsultantData([...consultantDatas, val])
                                        consultantDatas.push(val)
                                    }
                                }
                            })
                        }
                    }
                }

            })

        })
        setSendData([...symptomsDatas, ...consultantDatas])

        symptomsDatas = []
        consultantDatas = []
    }

    // useEffect(() => {
    //     SaveIPDData(sendData, "jsonDiagnosis")
    // }, [sendData])

    useEffect(() => {
        getdata()
    }, [])

    useEffect(() => {
        setData()
    }, [patientsendDataChange])
    return (
        <>
            <div className={`roww  gap-2 gap-lg-0 mt-2`} >
                <div className='col-12 p-0  pe-lg-21 boxcontainer boxs'>
                    <div className='d-flex flex-column'>
                        <div className={`row p-0 m-0 opd-prescription-box `} >
                            <div className='m-0  col-sm-3 col-12 img-text-box-back-opd pdd'>
                                <div className='d-flex flex-row gap-2  m-0' onClick={() => { }}>
                                    <img src={ExistingComplain} className='compcon' alt='' />
                                    <label className='cheifc'>{t("CHIEF_COMPLAINTS")}</label>
                                </div>
                            </div>
                            <div className='p-2 m-0 col-sm-9 col-12'>

                                <input autoComplete="off" type="text" className='text-box-opd ' placeholder={t('ENTER_CHIEF_COMPLAINTS')} name="symptomsData" id="symptomsData" onKeyDown={handleKeyPress} onChange={(e) => { handleSearch(e) }} />
                                {showSearchBoxProblem === 1 ?
                                    <div id="symptomsDataListdiv" className='position-absolute opdmedicationsearchbox'>
                                        <ul id="symptomsDataList">
                                            {problemListTemp && problemListTemp.map((val, ind) => {
                                                return (
                                                    [6, 7].map((id, index) => {
                                                        if (val.problemTypeID === id) {
                                                            return (

                                                                <li className='pointer' onClick={(e) => { handleClick("symptomsData", val.id, val.problemName) }}>{val.problemName}</li>
                                                            )
                                                        }
                                                    })
                                                )
                                            })}
                                        </ul>
                                        <div className='full-screen-div-opd' onClick={() => { setShowSearchBoxProblem(-1) }}></div>

                                    </div>
                                    : ""}

                                <div className='d-flex flex-wrap gap-2' style={{ overflowX: "auto", height: '65px' }}>

                                    {
                                        symptomsData && symptomsData.map((val, ind) => {
                                            return (
                                                <div className='d-flex flex-row justify-content-center align-items-center gap-2 pe-1 opdcancletab'>
                                                    <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                                                    <i className="fa-solid fa-xmark" onClick={() => { handleRemove(ind, val.problemId, "symptomsData", val.problemName) }}></i>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>




                        </div>


                        <div className='row p-0 m-0 opd-prescription-box'>
                            <div className=' m-0  col-sm-3 col-12 img-text-box-back-opd pdd1'>
                                <div className='d-flex flex-row gap-2  m-0'>
                                    <img src={ProvisionalDiagonisys} className='compcon' alt='' />
                                    <label className='cheifc'>{t("Consultant Diagnosis")}</label>
                                </div>


                                <div className="d-flex regularCheck column-gap-2 align-items-center mt-1 justify-content-end">
                                    <label className='fw-lighter fst-italic provi' htmlFor='provisionalDiagnosis'>{t("Provisional Diagnosis")}</label>
                                    <div className="form-check"><input className="form-check-input" type="checkbox" id="provisionalDiagnosis" defaultChecked /></div>
                                </div>


                            </div>
                            <div className='p-2 m-0 col-sm-7 col-12'>


                                <input autoComplete="off" type="text" className='text-box-opd ' placeholder={t('Consultant Diagnosis')} name='consultantData' id="consultantData" onKeyDown={handleKeyPress} onChange={(e) => { handleSearch(e) }} onClick={() => { showDignosis === 1 ? setDiagnosisSuggestionPopUP(1) : setDiagnosisSuggestionPopUP(0); setShowDignosis(0) }} />
                                {showSearchBoxProblemConsultant === 1 ?
                                    <div id="consultantDataListdiv" className='position-absolute opdmedicationsearchbox'>
                                        <ul id="consultantDataList">
                                            {problemListTemp && problemListTemp.map((val, ind) => {
                                                return (
                                                    [1, 2, 3, 4].map((id, ind) => {
                                                        if (val.problemTypeID === id) {
                                                            return (

                                                                <li className='pointer' onClick={(e) => { handleClick("consultantData", val.id, val.problemName) }}>{val.problemName}</li>
                                                            )
                                                        }
                                                    })
                                                )
                                            })}
                                        </ul>
                                        <div className='full-screen-div-opd' onClick={() => { setShowSearchBoxProblemConsultant(-1) }}></div>

                                    </div>
                                    : ""}

                                <div className='d-flex flex-wrap gap-2' style={{ overflowX: "auto", height: "50px" }}>
                                    {
                                        consultantData && consultantData.map((val, ind) => {
                                            return (
                                                <div className='d-flex flex-row justify-content-center align-items-center gap-2 ps-0 pe-1 opdcancletab'>
                                                    <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                                                    <i className="fa-solid fa-xmark" onClick={() => { handleRemove(ind, val.problemId, "consultantData", val.problemName) }}></i>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="col-sm-2 img-text-box-back-opd linkAntibiogram mantibio-cn">
                                <div className='mantibio'><a href='##' data-bs-toggle="modal" data-bs-target="#modalAntibiogram" > <i className="bi bi-virus"></i> {t("Show Antibiogram")}</a></div>
                                <div className='mantibio'><a href="##" onClick={symptomsData.length !== 0 ? () => { setDiagnosisSuggestionPopUP(1) } : () => setShowAlert(1)}> <i className="fa fa-stethoscope" aria-hidden="true" ></i> {t("Diagnosis Suggestion")}</a></div>
                            </div>
                        </div>
                    </div>
                </div>



                <Antibiogram setShowAntibiogram={setShowAntibiogram} />

                {
                    showAlert === 1?<AlertToster handle={setShowAlert} message="Please Write Complaints"/>:""
                }
            </div>
            {

                symptomsPopUp ? <OPDSymptomsPopUp val={symptomsPopUp} fun={setSymptomsPopUp} /> : ""
            }

            {
                allergiesPopUP ? <OPDAllergiesPopUP val={allergiesPopUP} fun={setAllergiesPopUP} /> : ""
            }

            {
                consultantPopUP ? <OPDConsultantDiagnosis val={consultantPopUP} fun={setConsultantPopUP} /> : ""
            }
            {
                diagnosisSuggestionPopUP ? <OPDDiagnosisSuggestion val={diagnosisSuggestionPopUP} fun={setDiagnosisSuggestionPopUP} setConsultantData={setConsultantData} consultantData={consultantData} setSendData={setSendData} sendData={sendData} saveData={SaveIPDData} calling={1} /> : ""
            }
        </>
    )
}