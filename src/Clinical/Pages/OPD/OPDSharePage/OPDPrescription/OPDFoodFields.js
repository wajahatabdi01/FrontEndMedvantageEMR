import React, { useEffect, useState } from 'react'
import GetFoodListByPrefixText from '../../../../API/OPD/Prescription/KnowMedsAPI/GetFoodListByPrefixText'
import Search from '../../../../../Code/Serach'
import { useSelector } from 'react-redux'
import SaveOPDData, { GetDataPatient } from '../../../../../Code/SaveOPDData'
import { f } from '@linways/table-to-excel'
import AlertToster from '../../../../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OPDFoodFields(props) {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();

    let getData = async () => {
        let response = await GetFoodListByPrefixText()
        if (response.status === 1) {
            setFoodDataList(response.responseValue)
        }
    }

    let row = { "problemId": 0, "problemName": "", "pdmId": 0 }
    let [disable, setDisable] = useState(0)



    let [foodRecommendedSendData, setFoodRecommendedSendData] = useState([])
    let [foodAvoidSendData, setFoodAvoidSendData] = useState([])
    let [foodOtherSendData, setFoodOtherSendData] = useState([])
    let [sendData, setSendData] = useState([])

    let [foodDataList, setFoodDataList] = useState([])
    let [foodDataListTemp, setFoodDataListTemp] = useState([])
    let [showFoodDataRecommendedList, setShowFoodDataRecommendedList] = useState(-1)
    let [showFoodDataAvoidedList, setShowFoodDataAvoidedList] = useState(-1)
    let patientsendData = useSelector((state) => state.PatientSendData)


    let [otherData, setOtherData] = useState("")
    let [avoidData, setAvoidData] = useState("")
    let [recommendData, setRecommendData] = useState("")

    let [showAlert, setShowAlert] = useState(0)
    let [message, setMessage] = useState("")

    let handleData = () => {
        try {
            let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
            let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
            setFoodRecommendedSendData([])
            setFoodAvoidSendData([])
            setFoodOtherSendData([])
            setSendData([])

            let tempdata = []

            temp.map((value, index) => {
                value.map((val, ind) => {
                    if (value[0] === activeUHID) {
                        let key = Object.keys(val)
                        if (key[0] === "jsonFood") {
                            val.jsonFood.map((v, i) => {
                                if (v.pdmId === 10) {
                                    setFoodAvoidSendData([...foodAvoidSendData, v])
                                    tempdata.push(v)
                                }
                                else if (v.pdmId === 9) {

                                    setFoodRecommendedSendData(v)
                                    tempdata.push(v)

                                }
                                else if (v.pdmId === 11) {
                                    setFoodOtherSendData(v)
                                    tempdata.push(v)

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
            tempdata = []
        }

        catch (e) { }
    }

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value
        let temp = [...sendData]
        let response = Search(foodDataList, value)
        try {
            if (value != "") {
                if (name === "Recommended") {

                    if (response.length != 0) {
                        setFoodDataListTemp(response)
                        setShowFoodDataRecommendedList(1)
                        setShowFoodDataAvoidedList(-1)

                    }
                    else {
                        row["problemId"] = 0
                        row["problemName"] = value
                        row["pdmId"] = 9
                        setSendData([...temp, row])
                        setFoodRecommendedSendData(row)
                        setFoodDataListTemp(["No Data Found!", ""])
                        setShowFoodDataRecommendedList(-1)
                        setRecommendData(row)
                    }
                }
                else if (name === "Avoided") {
                   

                    if (response.length != 0) {
                        setFoodDataListTemp(response)
                        setShowFoodDataAvoidedList(2)
                        setShowFoodDataRecommendedList(-1)

                    }
                    else {
                        row["problemId"] = 0
                        row["problemName"] = value
                        row["pdmId"] = 10
                        setSendData([...temp, row])
                        // setFoodAvoidSendData([...temp, row])
                        setFoodDataListTemp(["No Data Found!", ""])
                        setShowFoodDataAvoidedList(-1)
                        setAvoidData(row)
                    }
                }

                else if (name === "other") {
                    let t = 0
                    row["problemId"] = 0
                    row["problemName"] = value
                    row["pdmId"] = 11
                    // setFoodOtherSendData([,row)
                    sendData.map((val, ind) => {
                        if (val.pdmId === 11) {
                            temp.splice(ind, 1);
                            setSendData([...temp, row])

                            t = 1;
                        }
                    })
                    if (t === 0) {
                        setSendData([...temp, row])
                    }
                    setOtherData(row)

                }
            }
            else {

                if (name === "Recommended") {
                    sendData.map((val, ind) => {
                        if (val.pdmId === 9) {
                            temp.splice(ind, 1);
                            setSendData([...temp])
                            setRecommendData("")

                        }
                    })
                }
                else if (name === "Avoided") {
                    sendData.map((val, ind) => {
                        if (val.pdmId === 10) {
                            temp.splice(ind, 1);
                            setSendData([...temp])
                            setAvoidData("")

                        }
                    })
                }
                else if (name === "other") {
                    sendData.map((val, ind) => {
                        if (val.pdmId === 11) {
                            temp.splice(ind, 1);
                            setSendData([...temp])
                            setOtherData("")
                            setFoodOtherSendData("")                            
                        }
                    })
                }
                setShowFoodDataRecommendedList(-1)
                setShowFoodDataAvoidedList(-1)
            }
        }
        catch (e) { }
    }

    let handleClick = (name, value) => {

        try {
            
            if (name === "Recommended") {

                let checkFood = JSON.parse(window.sessionStorage.getData("patientsendData")).jsonallergies ? JSON.parse(window.sessionStorage.getData("patientsendData")).jsonallergies : []
               
                if (checkFood.length === 0) {
                    let t = 0
                    row["problemId"] = value[0]
                    row["problemName"] = value[1]
                    row["pdmId"] = 9
                    setSendData([...sendData, row])
                    document.getElementById("Recommended").value = value[1]
                    setFoodRecommendedSendData(row)
                    setRecommendData(row)

                    setShowFoodDataRecommendedList(-1)
                }
                else {
                    let flag = 0
                    checkFood.map((val, ind) => {
                        if (val.problemId === value[0]) {
                            flag = 1

                        }
                    })
                    if (flag === 0) {
                        let t = 0
                        row["problemId"] = value[0]
                        row["problemName"] = value[1]
                        row["pdmId"] = 9
                        setSendData([...sendData, row])
                        document.getElementById("Recommended").value = value[1]
                        setFoodRecommendedSendData(row)
                        setRecommendData(row)

                        setShowFoodDataRecommendedList(-1)
                    }
                    else {
                        setShowAlert(1)
                        setMessage("Please Don't Recommended This Food")
                    }
                }

            }

            else if (name === "Avoided") {
                let t = 0
                row["problemId"] = value[0]
                row["problemName"] = value[1]
                row["pdmId"] = 10
                setSendData([...sendData, row])
                setFoodAvoidSendData([...foodAvoidSendData, row])
                // document.getElementById("Avoided").value = value[1]
                setShowFoodDataAvoidedList(-1)
                setAvoidData(row)

            }
        }
        catch (e) { }


    }

    useEffect(() => {
        getData()
        if (props.values === 1) {
            handleData()
            props.funh(0)
        }
    }, [props.values === 1])

    useEffect(() => {
        SaveOPDData(sendData, "jsonFood")
    }, [sendData])

    useEffect(() => {
        handleData()

    }, [patientsendData])

    return (
        <div className={`d-flex gap-3 pt-2 ps-2 pb-2  overflow-auto position-relative `} >
        <input className='btn-bottom-opd dietbtn ps-3 pe-3' style={{ color: "#419849", background: "#D5EED7" }} value={foodRecommendedSendData.length != 0 ? foodRecommendedSendData.problemName != "" ? foodRecommendedSendData.problemName : "" : ""} placeholder={t("Enter Recommended Diet")} name="Recommended" id="Recommended" onChange={(e) => { handleChange(e) }} disabled={disable === 1 ? true : false} />
        {showFoodDataRecommendedList === 1 ?
          <div className='position-absolute opdmedicationsearchbox' style={{ marginTop: "-30px" }}>
            <ul >
              {foodDataListTemp && foodDataListTemp.map((val, index) => {
                return (
                  <li className='pointer' onClick={(e) => { handleClick("Recommended", [val.id, val.foodName]) }}>{val.foodName}</li>
                )
              })}
            </ul>
          </div>
          : ""}
        <div className='pt-2 col-4' style={{ height: "62px", borderRadius: "5px", color: "#FF1E3F", background: "#FBD4DA" }}>
          <div className='d-flex flex-row gap-3 ps-3 pe-3' style={{ overflowX: "auto" }}>
            {foodAvoidSendData && foodAvoidSendData.map((val, ind) => {
              return (
                <div className='d-flex flex-row justify-content-center align-items-center gap-2 ps-2 pe-2 opdcancletab'>
                  <label className=''>{val.problemName[0].toUpperCase() + val.problemName.slice(1, val.problemName.length).toLowerCase()}</label>
                </div>
              )
            })}
          </div>
          <div className='pt-2 ps-1 pe-1'>
            <input type="text" className='text-box-opd ' style={{ height: "15px", color: "#FF1E3F", background: "#FBD4DA" }} placeholder={t("Enter Food to be Avoided")} name="Avoided" id="Avoided" onChange={(e) => { handleChange(e) }} disabled={disable === 1 ? true : false} />
          </div>
          {showFoodDataAvoidedList === 2 ?
            <div className='position-absolute opdmedicationsearchbox' style={{ top: "-30px" }}>
              <ul >
                {foodDataListTemp && foodDataListTemp.map((val, ind) => {
                  return (
                    <li className='pointer' onClick={(e) => { handleClick("Avoided", [val.id, val.foodName]) }}>{val.foodName}</li>
                  )
                })}
              </ul>
            </div>
          : ""}
        </div>
        <input className='btn-bottom-opd advicebtn ps-3 pe-3' style={{ color: "#757575", background: "#E8E8E8" }} value={foodOtherSendData.length != 0 ? foodOtherSendData.problemName != "" ? foodOtherSendData.problemName : "" : ""} id="other" name="other" placeholder={t("Enter Other Advice")} onChange={(e) => { handleChange(e) }} disabled={disable === 1 ? true : false} />
        {showAlert === 1 ?
          <AlertToster message={message} handle={setShowAlert} />
        : ""}
      </div>
      
    )
}
