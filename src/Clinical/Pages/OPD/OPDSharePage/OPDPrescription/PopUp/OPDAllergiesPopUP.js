import React, { useEffect, useState } from 'react'
import searcIcon from "../../../../../../assets/images/Navbar/search.svg"
import GetFoodListByPrefixText from '../../../../../API/OPD/Prescription/KnowMedsAPI/GetFoodListByPrefixText'
import GetBrandList from '../../../../../API/OPD/Prescription/KnowMedsAPI/GetBrandList'
import Search, { FindByQuery, SearchIndex } from '../../../../../../Code/Serach'
import SaveOPDData from '../../../../../../Code/SaveOPDData'
import Loader from '../../../../../../Component/Loader';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OPDAllergiesPopUP(props) {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();

    let [showData, setShowData] = useState(0)
    let [sendData, setSendData] = useState([])
    let [foodDataList, setFoodDataList] = useState([])
    let [foodDataListTemp, setFoodDataListTemp] = useState([])

    let [medicationDataList, setMedicationDataList] = useState([])
    let [medicationDataListTemp, setMedicationDataListTemp] = useState([])

    let [itemListShow, setItemListShow] = useState(30)
    let [scroll, setScroll] = useState(0)
    let row = { "problemId": 0, "problemName": "", "pdmId": 0, "checked": true }
    let [disable, setDisable] = useState(0)
    let [loader, setLoader] = useState(1)

    let handleTab = (val) => {
        setShowData(val)
        setScroll(0)
        setItemListShow(30)
        document.getElementById("serachId").value = ""
        if (document.getElementById("serachId").value === "" && val === 0) {
            setFoodDataListTemp(foodDataList)
        }
        else {
            setMedicationDataListTemp(medicationDataList)
        }
    }

    let getdata = async () => {
        let responseFoodList = await GetFoodListByPrefixText()
        let responseMedicationList = await GetBrandList()
        if (responseFoodList.status === 1) {
            setLoader(0)
            setFoodDataList(responseFoodList.responseValue)
            setFoodDataListTemp(responseFoodList.responseValue)
            setData(responseFoodList.responseValue, "food")
        }
        if (responseMedicationList.status === 1) {
            setMedicationDataList(responseMedicationList.responseValue)
            setMedicationDataListTemp(responseMedicationList.responseValue)
            setData(responseMedicationList.responseValue, "medication")
        }
    }

    let setData = (val, name) => {

        let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
        let tempdata = []

        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonallergies") {
                        setSendData(val.jsonallergies)
                        tempdata = [...val.jsonallergies]
                    }
                    else if (key[0] === "disable") {
                        setDisable(val.disable)
                    }
                }
            })
        })


        let tempitems = [...val]
        val.map((val, ind) => {
            let res = SearchIndex(tempdata, "problemId", parseInt(val.id))
            if (res !== "") {
                tempitems[ind].checked = true
            }
            else {
                if (tempitems[ind].checked !== true) {
                    tempitems[ind].checked = false
                }
            }
        })
        if (name === "food") {
            setFoodDataListTemp(tempitems)
        }
        else {
            setMedicationDataListTemp(tempitems)
        }

    }

    // useEffect(()=>{
    // },[sendData])


    let handlechange = (val, name) => {
        let temp = [...sendData]
        if (name === "food") {
            let response = SearchIndex(sendData, "problemId", val.id)
            // console.log("response", response)
            if (response.length === 0) {
                let response = SearchIndex(foodDataListTemp, "id", val.id)

                console.log("val", response)
                row["problemId"] = val.id
                row["problemName"] = val.foodName
                row["pdmId"] = 7
                row["checked"] = true
                temp.push(row)
                foodDataListTemp[response]["checked"] = true

            }
            else {
                foodDataListTemp[response].checked = false
                document.getElementById("f" + val.id).checked = false
                temp.splice(response, 1)
                // setData(foodDataList, "food")
                setFoodDataListTemp(foodDataListTemp)
            }

        }
        else {
            let response = SearchIndex(sendData, "problemId", val.id)
            if (response.length === 0) {
                console.log("val", val)
                let response = SearchIndex(medicationDataListTemp, "id", val.id)

                row["problemId"] = val.id
                row["problemName"] = val.brandName
                row["pdmId"] = 8
                row["checked"] = true
                temp.push(row)
                medicationDataListTemp[response]["checked"] = true


            }
            else {
                medicationDataListTemp[response].checked = false
                document.getElementById("m" + val.id).checked = false
                temp.splice(response, 1)
                // setData(foodDataList, "food")
                setMedicationDataListTemp(medicationDataListTemp)
            }
        }

        setSendData(temp)
        SaveOPDData(temp, "jsonallergies")


    }

    let handleSearch = (e) => {

        let response = []
        if (showData === 0) {
            if (e.target.value !== "") {
                response = FindByQuery(foodDataList, e.target.value, "foodName")
                let tempitems = [...response]
                if (response.length !== 0) {
                    response.map((val, ind) => {
                        let res = FindByQuery(sendData, parseInt(val.problemId), "problemId")

                        if (res.length !== 0) {
                            if (response[ind].checked === true) {
                                tempitems[ind].checked = true
                            }
                            else {
                                tempitems[ind].checked = false
                            }
                        }
                        else {
                            if (val.checked === true) {
                                tempitems[ind].checked = true
                            }
                            else {
                                tempitems[ind].checked = false

                            }

                        }
                    })
                    setFoodDataListTemp(tempitems)
                    console.log(tempitems)
                    // setData(response, "food")
                }
                // setFoodDataListTemp([])
            }
            else {
                console.log("foodList", foodDataList)
                setFoodDataListTemp(foodDataList)
            }
        }
        else {
            console.log("branc name", e.target.value)
            if (e.target.value !== "") {
                response = FindByQuery(medicationDataList, e.target.value, "brandName")
                let tempitems = [...response]
                if (response.length !== 0) {
                    response.map((val, ind) => {
                        let res = FindByQuery(sendData, parseInt(val.problemId), "problemId")

                        if (res.length !== 0) {
                            if (response[ind].checked === true) {
                                tempitems[ind].checked = true
                            }
                            else {
                                tempitems[ind].checked = false
                            }
                        }
                        else {
                            if (val.checked === true) {
                                tempitems[ind].checked = true
                            }
                            else {
                                tempitems[ind].checked = false

                            }

                        }
                    })
                    setMedicationDataListTemp(tempitems)

                }
                // setMedicationDataListTemp([])
            }
            else {
                // console.log("foodList", foodDataList)
                setMedicationDataListTemp(medicationDataList)
            }
        }

    }

    let infinityScroll = () => {
        let getScrollSection = document.querySelector(".scroll-in-section");
        setScroll(getScrollSection.scrollTop)
        let scrollTop = getScrollSection.scrollTop;
        let scrollHeight = getScrollSection.scrollHeight;
        let clientHeight = getScrollSection.clientHeight;
        if ((scrollTop + clientHeight >= scrollHeight) && (itemListShow <= medicationDataListTemp.length)) {
            setItemListShow(itemListShow + 10)
        }
    }

    useEffect(() => {
        let getScrollSection = document.querySelector(".scroll-in-section");
        getScrollSection.addEventListener("scroll", infinityScroll);
    }, [scroll])

    useEffect(() => {
        getdata()
        setData([], "food")
    }, [])

    return (
        <>
            <div className={`${props.val === 0 ? 'offcanvas' : "offcanvas show"}   offcanvas-end`} style={{ width: "400px" }} data-bs-scroll="true" data-bs-backdrop="static" tabIndex="-1" id="allergies" aria-labelledby="allergiesLabel">
                <div className="offcanvas-header d-flex justify-content-start gap-4  p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
                    <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px" }} data-bs-dismiss="offcanvas" onClick={() => { props.fun(0) }} aria-label="Close"><i className='fa fa-close ' ></i></div>
                    <h5 className="offcanvas-title text-white" id="allergiesLabel" >{t("Allergies")}</h5>
                    {/* <button type="button" className="btn-close"  ></button> */}
                </div>
                <div className="offcanvas-body ps-4 pe-3" >
                    <div className='d-flex flex-column pt-2'>
                        <div className='d-flex flex-column searchbar gap-1  pt-2 mb-3'>
                            <input type='text' className='ps-3 pe-5 pb-2 pt-2 serchbox' id="serachId" placeholder={t('Search your Symptoms')} onChange={handleSearch} />
                            <img src={searcIcon} className='rightsidebarsearchicon' alt=''/>
                        </div>
                        <div className='d-flex flex-wrap mb-2 gap-3'>
                            <div className='opdLabDetailsbox pointer' style={{ background: `${showData === 0 ? "#dee5ef" : "white"}` }} onClick={() => { handleTab(0) }}>
                                <span>{t("Food")}</span>
                            </div>
                            <div className='opdLabDetailsbox pointer' style={{ background: `${showData === 1 ? "#dee5ef" : "white"}` }} onClick={() => { handleTab(1) }}>
                                <span>{t("Medication")}</span>
                            </div>
                        </div>

                        <div className='wrap scroll-in-section allergiespopup' style={{ maxHeight: "70vh" }}>

                            {showData === 0 ?
                                foodDataListTemp.slice(0, itemListShow).map((val, ind) => {
                                    return (

                                        <div className='d-flex flex-row gap-1 justify-content-left' style={{ verticalAlign: "middle" }} key={val.id +ind}>
                                            <span className='allergynamechk'>
                                                <input type="checkbox" defaultChecked={val.checked} value="true" id={"f" + val.id} name={val.id} onClick={() => handlechange(val, "food")} disabled={disable ? true : false} />
                                            </span>
                                            <span className='allergyname'>{val.foodName}</span>
                                        </div>

                                    )

                                })
                                :
                                medicationDataListTemp.slice(0, itemListShow).map((val, ind) => {
                                    return (
                                        <div className='d-flex flex-row gap-1 justify-content-left' style={{ verticalAlign: "middle" }} key={val.id + ind}>
                                            <span className='allergynamechk'>
                                                <input type="checkbox" defaultChecked={val.checked} value="true" name={val.id} id={"m" + val.id} onClick={() => { handlechange(val, "medication") }} disabled={disable ? true : false} />
                                            </span>
                                            <span className='allergyname'>{val.brandName}</span>
                                        </div>
                                    )
                                })}
                        </div>

                    </div>
                </div>
                <Loader val={loader} />
            </div>
            <div className="offcanvas-backdrop fade show" onClick={() => { props.fun(0) }}></div>
        </>
    )
}
let searches = (array, value) => {
    const index = array.findIndex(item => item.itemId === value);
    return index
}