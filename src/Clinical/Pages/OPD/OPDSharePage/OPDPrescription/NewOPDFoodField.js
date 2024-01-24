import React, { useEffect, useRef, useState } from 'react'
import GetFoodListByPrefixText from '../../../../API/OPD/Prescription/KnowMedsAPI/GetFoodListByPrefixText'
import { FindByQuery, SearchIndex } from '../../../../../Code/Serach'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import { useSelector } from 'react-redux'
import DownKey, { UpKey } from "../../../../../Code/ListSelect"
import AlertToster from '../../../../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function NewOPDFoodField(props) {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();

    let row = { "problemId": 0, "problemName": "", "pdmId": 0 }

    let [disable, setDisable] = useState(0)
    let [foodDataList, setFoodDataList] = useState([])
    let [foodDataListTemp, setFoodDataListTemp] = useState([])

    let [selectedRow, setSelectedRow] = useState(-1)


    // box show
    let [showFoodDataRecommendedList, setShowFoodDataRecommendedList] = useState(-1)
    let [showFoodDataAvoidList, setShowFoodDataAvoidList] = useState(-1)
    let [showFoodDataOtherList, setShowFoodDataOtherList] = useState(-1)
    let [sendData, setSendData] = useState([])

    // selected list show
    let [recommendedFoodList, setRecommendedFoodList] = useState([])
    let [avoidFoodList, setAvoidFoodList] = useState([])
    let [otherFoodList, setOtherFoodList] = useState([])
    let patientsendData = useSelector((state) => state.PatientSendData)
    let [showAlert, setShowAlert] = useState(0)
    let [message, setMessage] = useState("")

    let liSelected = useRef()
    let index = useRef(-1)
    let next = useRef()
    let oldData = useRef(0)

    let handleOnkeyPress = (e, val) => {
        let value = e.target.value;
        let name = e.target.name
        let ul = ""

        // sendfor["abc"] =  "" + ""
        if (e.keyCode === 13) {
            if (name === "Recommended") {
                if (showFoodDataRecommendedList === -1) {
                    row["problemId"] = 0
                    row["problemName"] = value
                    row["pdmId"] = 9
                }
                else {
                    ul = document.getElementById('RecommendedList');
                    row["problemId"] = ul.getElementsByTagName('li')[index.current].value
                    row["problemName"] = ul.getElementsByTagName('li')[index.current].innerText
                    row["pdmId"] = 9
                    setShowFoodDataRecommendedList(-1)
                    liSelected.current = ""
                    index.current = -1
                    next.current = ""
                    oldData.current = 0
                }

                setRecommendedFoodList([...recommendedFoodList, row])
                setSendData([...sendData, row])

                document.getElementById(name).value = ""
                document.getElementById(name).focus()
            }
            else if (name === "Avoided") {
                if (showFoodDataAvoidList === -1) {
                    row["problemId"] = 0
                    row["problemName"] = value
                    row["pdmId"] = 10
                }
                else {
                    ul = document.getElementById('AvoidedList');
                    row["problemId"] = ul.getElementsByTagName('li')[index.current].value
                    row["problemName"] = ul.getElementsByTagName('li')[index.current].innerText
                    row["pdmId"] = 10
                    setShowFoodDataAvoidList(-1)
                    liSelected.current = ""
                    index.current = -1
                    next.current = ""
                    oldData.current = 0

                }
                setAvoidFoodList([...avoidFoodList, row])
                setSendData([...sendData, row])
                document.getElementById(name).value = ""
                document.getElementById(name).focus()
            }
            else if (name === "Other") {
                if (showFoodDataOtherList === -1) {
                    row["problemId"] = 0
                    row["problemName"] = value
                    row["pdmId"] = 11
                }
                else {
                    ul = document.getElementById('OtherList');
                    row["problemId"] = ul.getElementsByTagName('li')[index.current].value
                    row["problemName"] = ul.getElementsByTagName('li')[index.current].innerText
                    row["pdmId"] = 11
                    setShowFoodDataOtherList(-1)
                    liSelected.current = ""
                    index.current = -1
                    next.current = ""
                    oldData.current = 0

                }
                setOtherFoodList([...otherFoodList, row])
                setSendData([...sendData, row])
                document.getElementById(name).value = ""
                document.getElementById(name).focus()
            }

            SaveOPDData([...sendData, row], "jsonFood")
        }

        else if (e.keyCode === 40) {
            // down
            if (name === "Recommended") {
                if (showFoodDataRecommendedList !== -1) {
                    ul = document.getElementById('RecommendedList');
                    DownKey(ul, liSelected, index, next, oldData)
                }
            }
            else if (name === "Avoided") {
                if (showFoodDataAvoidList !== -1) {
                    ul = document.getElementById('AvoidedList');
                    DownKey(ul, liSelected, index, next, oldData)
                }

            }

            else if (name === "Other") {
                if (showFoodDataOtherList !== -1) {
                    ul = document.getElementById('OtherList');
                    DownKey(ul, liSelected, index, next, oldData)
                }

            }

        }

        else if (e.keyCode === 38) {
            // Up
            if (name === "Recommended") {
                if (showFoodDataRecommendedList !== -1) {
                    ul = document.getElementById('RecommendedList');
                    UpKey(ul, liSelected, index, next, oldData)

                }
            }
            else if (name === "Avoided") {
                if (showFoodDataAvoidList !== -1) {
                    ul = document.getElementById('AvoidedList');
                    UpKey(ul, liSelected, index, next, oldData)
                }

            }

            else if (name === "Other") {
                if (showFoodDataOtherList !== -1) {
                    ul = document.getElementById('OtherList');
                    UpKey(ul, liSelected, index, next, oldData)
                }

            }

        }

    }


    let setData = () => {
        try {
            let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
            let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
            // setRecommendedFoodList([])
            // setAvoidFoodList([])
            // setOtherFoodList([])
            // setSendData([])

            let RecommendedFoodList = []
            let AvoidFoodList = []
            let OtherFoodList = []

            let tempdata = []
            
            temp.map((value, index) => {
                value.map((val, ind) => {
                    if (value[0] === activeUHID) {
                        let key = Object.keys(val)
                        if (key[0] === "jsonFood") {
                            val.jsonFood.map((v, i) => {
                               
                                if (v.pdmId === 10) {
                                    
                                    AvoidFoodList.push(v)
                                    setAvoidFoodList(v)
                                    tempdata.push([...tempdata, v])
                                }
                                else if (v.pdmId === 9) {

                                    RecommendedFoodList.push(v)
                                    tempdata.push([...tempdata, v])

                                }
                                else if (v.pdmId === 11) {
                                    OtherFoodList.push(v)
                                    tempdata.push([...tempdata, v])

                                }


                            })
                        }
                        else if (key[0] === "disable") {
                            setDisable(val.disable)
                        }
                    }
                })
            })
            setSendData([...tempdata])
            // SaveOPDData([...tempdata], "jsonFood")

            setRecommendedFoodList([...RecommendedFoodList])
            setAvoidFoodList([...AvoidFoodList])
            setOtherFoodList([...OtherFoodList])
            tempdata = []
        }

        catch (e) { }
    }

    useEffect(() => {
        getData()
        if (props.values === 1) {
            setData()
            props.funh(0)
        }
    }, [props.values === 1])

    let handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let data = [...sendData].filter(n => n)

        try {
            liSelected.current = ""
            index.current = -1
            next.current = ""
            if (value != "") {
                if (name === "Recommended") {
                    let response = FindByQuery(foodDataList, value, "foodName")
                    if (response.length != 0) {
                        


                        setFoodDataListTemp(response)
                        setShowFoodDataRecommendedList(1)
                        // var offsets = document.getElementById("recommendedListdiv").getBoundingClientRect();
                        // let bodyheight = document.body.clientHeight
                       
                        //   if(offsets.top + 250> bodyheight)
                        // {
                        document.getElementById("recommendedListdiv").style.marginTop = "-278px";
                        // }
                    }
                    else {
                        setShowFoodDataRecommendedList(-1)
                    }
                }
                else if (name === "Avoided") {
                    let response = FindByQuery(foodDataList, value, "foodName")
                    if (response.length != 0) {
                        setFoodDataListTemp(response)
                        setShowFoodDataAvoidList(1)
                    }
                    else {
                        setShowFoodDataAvoidList(-1)

                    }
                }

                // else if (name === "Other") {
                //     let response = FindByQuery(foodDataList, value, "foodName")
                //     if (response.length != 0) {
                //         setFoodDataListTemp(response)
                //         setShowFoodDataOtherList(1)
                //     }
                //     else {
                //         setShowFoodDataOtherList(-1)

                //     }
                // }
            }
            else {
                setShowFoodDataRecommendedList(-1)
                setShowFoodDataAvoidList(-1)
                setShowFoodDataOtherList(-1)
                oldData.current = 0

            }
        }
        catch (e) {

        }
    }

    let handleRemove = (name, index, problemId, problemName, pmId) => {
        let temp = [...sendData]
        if (name === "Recommended") {
            
            let recTemp = [...recommendedFoodList]
            sendData.map((val, ind) => {
                if (val.pdmId === 9 && val.problemId === problemId) {
                    temp.splice(ind, 1)
                }
            })
            recommendedFoodList.map((val, ind) => {
                if (ind === index && val.problemId === problemId) {
                    recTemp.splice(ind, 1)
                }
            })
            SaveOPDData([...temp], "jsonFood")
            setRecommendedFoodList(recTemp)
            setSendData(temp)
        }
        else if (name === "Avoided") {
           
            let recTemp = [...recommendedFoodList]
            sendData.map((val, ind) => {
                if (val.pdmId === 10 && val.problemId === problemId) {
                    temp.splice(ind, 1)
                }
            })
            recommendedFoodList.map((val, ind) => {
                if (ind === index && val.problemId === problemId) {
                    recTemp.splice(ind, 1)
                }
            })
            SaveOPDData([...temp], "jsonFood")
            setAvoidFoodList(recTemp)
            setSendData(temp)
        }
        else if (name === "Other") {
           
            let recTemp = [...otherFoodList]
            sendData.map((val, ind) => {
                if (val.pdmId === 11 && val.problemId === problemId) {
                    temp.splice(ind, 1)
                }
            })
            otherFoodList.map((val, ind) => {
                if (ind === index && val.problemId === problemId) {
                    recTemp.splice(ind, 1)
                }
            })
            SaveOPDData([...temp], "jsonFood")
            setOtherFoodList(recTemp)
            setSendData(temp)
        }
    }

    let handleClick = (boxname, id, name) => {
        let data = [...sendData].filter(n => n)
        try {
            if (boxname === "Recommended") {
             
                let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
                let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
                // let patientDataAlergies = temp.filter(val => val[0] === activeUHID)
                // setShowFoodDataAvoidList(-1)

                let checkFood = []
                temp.map((value, index) => {
                    value.map((val, ind) => {
                        if (value[0] === activeUHID) {
                            let key = Object.keys(val)
                            if (key[0] === "jsonallergies") {
                                if (val.jsonallergies.length !== 0) {
                                    checkFood = val
                                   
                                }
                            }
                        }
                    })
                })
                

                if (checkFood.length === 0) {
                    let t = 0
                    row["problemId"] = id
                    row["problemName"] = name
                    row["pdmId"] = 9
                    setShowFoodDataRecommendedList(-1)
                    let flag = 0
                    recommendedFoodList.map((v, i) => {
                        if (v.problemId === id) {
                            flag = 1
                            return
                        }
                    })
                    if (flag === 0) {
                        setSendData([...data, row])
                        setRecommendedFoodList([...recommendedFoodList, row])
                    }

                    document.getElementById("Recommended").focus()
                    document.getElementById("Recommended").value = "";
                }
                else {
                    let flag = 0
                    checkFood.jsonallergies.map((val, ind) => {
                        if (val.problemId === id) {
                            flag = 1

                        }
                    })

                    if (flag === 0) {
                        let t = 0
                        row["problemId"] = id
                        row["problemName"] = name
                        row["pdmId"] = 9
                        setShowFoodDataRecommendedList(-1)
                        let flags = 0
                        recommendedFoodList.map((v, i) => {
                            if (v.problemId === id) {
                                flag = 1
                                return
                            }
                        })
                        if (flags === 0) {
                            setSendData([...data, row])
                            setRecommendedFoodList([...recommendedFoodList, row])
                        }

                        document.getElementById("Recommended").focus()
                        document.getElementById("Recommended").value = "";
                    }
                    else {
                        setShowAlert(1)
                        setMessage("Patient Allergic To This Food.")
                        document.getElementById("Recommended").value = ""
                        setShowFoodDataRecommendedList(-1)

                    }
                }



            }

            else if (boxname === "Avoided") {
                let t = 0
                row["problemId"] = id
                row["problemName"] = name
                row["pdmId"] = 10
                setShowFoodDataAvoidList(-1)
                let flag = 0
                avoidFoodList.map((v, i) => {
                    if (v.problemId === id) {
                        flag = 1
                        return
                    }
                })
                if (flag === 0) {
                    setSendData([...data, row])
                    setAvoidFoodList([...avoidFoodList, row])
                }

                document.getElementById("Avoided").focus()
                document.getElementById("Avoided").value = "";

            }
            else if (boxname === "Other") {
                let t = 0
                row["problemId"] = id
                row["problemName"] = name
                row["pdmId"] = 11
                setShowFoodDataOtherList(-1)
                let flag = 0
                otherFoodList.map((v, i) => {
                    if (v.problemId === id) {
                        flag = 1
                        return
                    }
                })
                if (flag === 0) {
                    setSendData([...data, row])
                    setOtherFoodList([...otherFoodList, row])
                }

                document.getElementById("Other").focus()
                document.getElementById("Other").value = "";
            }

            SaveOPDData([...data, row], "jsonFood")

        }
        catch (e) {

        }
    }

    let getData = async () => {
        let response = await GetFoodListByPrefixText()
        if (response.status === 1) {
            setFoodDataList(response.responseValue)
            setFoodDataListTemp(response.responseValue)
        }
    }

    useEffect(() => {
        if (props.foodData.length !== 0) {
            let RecommendedFoodList = []
            let AvoidFoodList = []
            let OtherFoodList = []
            props.foodData.map((val, ind) => {
                if (val.pdmId === 10) {
                    AvoidFoodList.push(val)
                }
                else if (val.pdmId === 9) {
                    RecommendedFoodList.push(val)
                }

                else if (val.pdmId === 11) {
                    OtherFoodList.push(val)
                }
            })
            SaveOPDData([...RecommendedFoodList, ...AvoidFoodList, ...OtherFoodList, ...recommendedFoodList, ...avoidFoodList, ...otherFoodList], "jsonFood")
            setRecommendedFoodList([...RecommendedFoodList, ...recommendedFoodList])
            setAvoidFoodList([...AvoidFoodList, ...avoidFoodList])
            setOtherFoodList([...OtherFoodList, ...otherFoodList])
        }
        else {
            setData()

        }
    }, [patientsendData, props.foodData])

    return (
        // <></> 
        <div className={`d-flex  fooddec overflow-auto position-relative_ `} >
            <div className='m-0 '>
                <input autoComplete="off" className='btn-bottom-opd dietbtn ps-3 pe-3 ' style={{ color: "#419849", background: "#D5EED7" }} placeholder={t("Recommended Diet")} name="Recommended" id="Recommended" onKeyDown={handleOnkeyPress} onChange={(e) => { handleChange(e) }} disabled={disable === 1 ? true : false} />
                {showFoodDataRecommendedList === 1 ?
                    <div id="recommendedListdiv" className={`position-absolute opdmedicationsearchbox `}  >
                        <ul id="RecommendedList" >
                            {foodDataListTemp && foodDataListTemp.map((val, ind) => {
                                return (
                                    <li className='pointer' value={"" + val.id + "," + val.foodName} onClick={(e) => { handleClick("Recommended", val.id, val.foodName) }}>{val.foodName}</li>
                                )
                            })}
                        </ul>
                    </div>
                    : ""}
                <div className='d-flex flex-wrap gap-2 btn-bottom-opd ps-2' style={{ overflowX: "auto", height: '70px', color: "#419849", background: "#D5EED7", width: "0px" }}>
                    {
                        recommendedFoodList && recommendedFoodList.map((val, ind) => {
                            
                            return (
                                <div className='d-flex flex-row justify-content-center align-items-center gap-2 p-2 opdcancletab'>
                                    <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                                    <i className="fa-solid fa-xmark" onClick={() => { handleRemove("Recommended", ind, val.problemId, val.problemName, val.pdmId) }}></i>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='m-0 '>
                <input autoComplete="off" type="text" className='btn-bottom-opd foodbtn ps-3 pe-3 ' style={{ color: "#FF1E3F", background: "#FBD4DA" }} placeholder={t('Food to be Avoided')} name="Avoided" id="Avoided" onKeyDown={handleOnkeyPress} onChange={(e) => { handleChange(e) }} disabled={disable === 1 ? true : false} />
                {showFoodDataAvoidList === 1 ?
                    <div id="avoidedListdiv" className='position-absolute opdmedicationsearchbox'>
                        <ul id="AvoidedList">
                            {foodDataListTemp && foodDataListTemp.map((val, ind) => {
                                return (
                                    <li className='pointer' onClick={(e) => { handleClick("Avoided", val.id, val.foodName) }}>{val.foodName}</li>
                                )
                            })}
                        </ul>
                    </div>
                    : ""}


                <div className='d-flex flex-wrap gap-2 btn-bottom-opd ps-2' style={{ overflowX: "auto", height: '70px', color: "#FF1E3F", background: "#FBD4DA", width: "0px" }}>
                    {
                        avoidFoodList && avoidFoodList.map((val, ind) => {
                            return (
                                <div className='d-flex flex-row justify-content-center align-items-center gap-2 p-2 opdcancletab'>
                                    <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                                    <i className="fa-solid fa-xmark" onClick={() => { handleRemove("Avoided", ind, val.problemId, val.problemName, val.pdmId) }}></i>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='m-0 '>

                <input autoComplete="off" className='btn-bottom-opd advicebtn ps-3 pe-3' style={{ color: "#757575", background: "#E8E8E8" }} id="Other" name="Other" placeholder={t('Enter Other Advice')} onKeyDown={handleOnkeyPress} onChange={(e) => { handleChange(e) }} disabled={disable === 1 ? true : false} />
                {/* {showFoodDataOtherList === 1 ?
                    <div id="otherListdiv" className='position-absolute opdmedicationsearchbox'>
                        <ul id="OtherList">
                            {foodDataListTemp && foodDataListTemp.map((val, ind) => {
                                return (
                                    <li className='pointer' onClick={(e) => { handleClick("Other", val.id, val.foodName) }}>{val.foodName}</li>
                                )
                            })}
                        </ul>
                    </div>     
                    : ""}   */}
                <div className='d-flex flex-wrap gap-2 btn-bottom-opd ps-2' style={{ overflowX: "auto", height: '70px', color: "#757575", background: "#E8E8E8", width: "0px" }}>
                    {
                        otherFoodList && otherFoodList.map((val, ind) => {
                            return (
                                <div className='d-flex flex-row justify-content-center align-items-center gap-2 p-2 opdcancletab'>
                                    <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                                    <i className="fa-solid fa-xmark" onClick={() => { handleRemove("Other", ind, val.problemId, val.problemName, val.pdmId) }}></i>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                showAlert === 1 ?

                    <AlertToster message={message} handle={setShowAlert} /> : ""
            }

        </div>
    )
}
