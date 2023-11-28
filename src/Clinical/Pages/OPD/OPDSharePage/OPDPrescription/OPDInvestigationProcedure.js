import React, { useEffect, useMemo, useState } from 'react'
import TableContainer from '../../../../../Component/TableContainer'
import searchIcon from "../../../../../assets/images/Navbar/search.svg"
import Heading from '../../../../../Component/Heading'
import GetAllItemMaster from '../../../../API/OPD/GetAllItemMaster'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import { useSelector } from 'react-redux'
import Search from '../../../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function OPDInvestigationProcedure(props) {
    document.body.dir = i18n.dir();
    const { t } = useTranslation();
    let [investigationHistory, setInvestigationHistory] = useState([])
    let [itemMasterList, setItemMasterList] = useState([])
    let [total, setTotal] = useState(0)
    let [disable, setDisable] = useState(0)
    let [searchShow, setSearchShow] = useState([])

    let [showInvestigation, setShowInvestigation] = useState([])

    let [sendData, setSendData] = useState([])

    let getdata = async () => {
        let response = await GetAllItemMaster()
        if (response.status === 1) {
            setItemMasterList(response.responseValue)
            if (props.values != 1) {
                setShowInvestigation(response.responseValue)
                setSearchShow(response.responseValue)
            }
        }
    }

    let [investname, setInvestname] = useState([])

    let handlechange = (e, cost, name, index) => {
        try {
            let flag = 0
            let id = e.target.name
            let temp = [...sendData]
            let tempN = [...investname]
            if (temp.length != 0) {
                sendData.map((val, ind) => {
                    console.log("itemId", val.itemId, typeof (id))
                    if (val.itemId === parseInt(id)) {
                        console.log("investigation")
                        showInvestigation[index].checked = 0
                        document.getElementById(id).checked = false
                        temp.splice(ind, 1)
                        tempN.splice(ind, 1)
                        setSendData([...temp])
                        setInvestname([...tempN])
                        setTotal(total - cost)
                        flag = 1

                    }

                })

                if (flag === 0) {
                    let data = { "itemId": parseInt(id) }
                    setTotal(total + cost)
                    setSendData([...sendData, data])
                    setInvestname([...investname, name])
                    tempN = [...investname, name]
                    showInvestigation[index].checked = 1
                }
            }
            else {
                let data = { "itemId": parseInt(id) }
                setTotal(total + cost)
                setSendData([...sendData, data])
                setInvestname([...investname, name])
                tempN = [...investname, name]
                showInvestigation[index].checked = 1
            }
            setShowInvestigation(showInvestigation)

            window.sessionStorage.setItem("Invest", JSON.stringify(tempN))
        }
        catch (e) { }

    }

    let patientsendData = useSelector((state) => state.PatientSendData)

    useEffect(() => {
        getdata(props.values)
        if (props.values === 1) {
            setData()
            props.funh(0)
        }


    }, [props.values === 1])


    useEffect(() => {
        SaveOPDData(sendData, "jsonInvestigation")
        // SaveOPDData(total, "total")

    }, [sendData])


    let setData = () => {
        setSendData([])
        let tempdata = []
        setShowInvestigation([])
        let response = []
        let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonInvestigation") {
                        setSendData(val.jsonInvestigation)
                        setInvestigationHistory(val.jsonInvestigation)
                        tempdata = val.jsonInvestigation
                        // setTotal(val.total)
                    }
                    else if (key[0] === "disable") {
                        setDisable(val.disable)
                    }
                }
            })
        })
        let total = 0
        let tempitems = [...itemMasterList]
        itemMasterList.map((val, ind) => {
            let res = searches(tempdata, parseInt(val.id))
            if (res != -1) {
                tempitems[ind].checked = true
                // val.checked = 1
                total += val.itemCharge
            }
            else {
                if (tempitems[ind].checked !== true) {

                    tempitems[ind].checked = false
                }
                else{
                    tempitems[ind].checked = false
                }
            }

            // response.push(val)
        })
        setShowInvestigation([...tempitems])
        console.log("tempitems", tempitems)
        setSearchShow([...tempitems])
        setTotal(total)

    }

    let handleSearch = (e) => {
        // console.log("itemMasterList", itemMasterList)
        try {
            if (e.target.value !== "") {
                let searcresult = Search(searchShow, e.target.value)
                let total = 0
                let tempitems = [...searcresult]

                if (searcresult.length != 0) {

                    searcresult.map((val, ind) => {
                        let res = searches(sendData, parseInt(val.id))
                        if (res != -1) {
                            tempitems[ind].checked = true
                            // val.checked = 1
                            total += val.itemCharge
                        }
                        else {
                            if (tempitems[ind].checked !== true) {

                                tempitems[ind].checked = false
                            }
                        }

                        // response.push(val)
                    })
                    setShowInvestigation(tempitems)
                    console.log("temps", tempitems)

                }
                else {
                    searcresult.map((val, ind) => {
                        let res = searches(sendData, parseInt(val.id))
                        if (res != -1) {
                            tempitems[ind].checked = true
                            // val.checked = 1
                            total += val.itemCharge
                        }
                        else {
                            if (tempitems[ind].checked !== true) {

                                tempitems[ind].checked = false
                            }
                        }

                        // response.push(val)
                    })
                    setShowInvestigation(tempitems)
                    console.log("temps", tempitems)
                }
            }
            else {
                setData()
                // setShowInvestigation(searchShow)
            }
        }
        catch (e) { }

    }

    let handleReset = () => {

        let total = 0
        let tempitems = [...itemMasterList]
        itemMasterList.map((val, ind) => {
            let res = searches(investigationHistory, parseInt(val.id))
            if (res != -1) {
                tempitems[ind].checked = true
                document.getElementById(tempitems[ind].id).checked = true
                // val.checked = 1
                total += val.itemCharge
            }
            else {
                if (tempitems[ind].checked !== true) {
                    document.getElementById(tempitems[ind].id).checked = false
                    tempitems[ind].checked = false
                }
            }

            // response.push(val)
        })
        setShowInvestigation([...tempitems])
        console.log("tempitems", tempitems)
        setSearchShow([...tempitems])
        setTotal(total)
        setSendData(investigationHistory)
    }
    useEffect(() => {
        setData()
    }, [patientsendData])

    // let callInvestigation = useMemo(Investigartiondata, [patientsendData])

    return (
        <div className='p-0 boxcontainer mt-2 ' style={{ height: "412px" }}>
            <div className='opdorder-in'>
                <div className='opdorder'>
                    <Heading text={t("Order Investigation")} />
                </div>
                <div className='opdserchinvest position-relative'>
                    <input type='text' placeholder={t("Search Investigation & Procedure...")} className='searchBarOPD' onChange={handleSearch} disabled={disable === 1 ? true : false} />
                    <img src={searchIcon} className='searchBarOPDIcon2' alt='' />
                </div>
            </div>
            <div className='overflow-auto' style={{ height: "28vh" }}>
                <TableContainer>
                    <thead>
                        <th className='wrap-content'>{t("Investigation & Procedure")}</th>
                        <th>{t("Price")}</th>
                    </thead>
                    <tbody>
                        {showInvestigation && showInvestigation.map((val, ind) => {
                            return (
                                <tr key={val.id}>
                                    <td >
                                        <div className='d-flex regularCheck column-gap-1 px-2 align-items-start'>
                                            <div className='form-check'>
                                                <input className='form-check-input' type="checkbox" id={val.id} value="true" defaultChecked={val.checked} name={val.id} onClick={(e) => { handlechange(e, val.itemCharge, val.itemName, ind, val.id) }} disabled={disable === 1 ? true : false} />
                                            </div>
                                            <label htmlFor={val.id}>{val.itemName}</label>
                                        </div>
                                    </td>
                                    <td>{val.itemCharge}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TableContainer>
            </div>


            <div className='opdorder border-topp'>
                <div className='totalod'>  {t("Total Investigation Charge")}: <span>{total}</span></div>
                <div className='resetpodinvest'>
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" style={{ width: "100px" }} onClick={() => { handleReset(); console.log("investigation ", sendData) }}>
                        <i className="fa fa-refresh" aria-hidden="true"></i> {t("Reset")}
                    </button>
                </div>
            </div>

        </div>

    )
}


let searches = (array, value) => {
    const index = array.findIndex(item => item.itemId === value);
    return index
}
