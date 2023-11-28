import React, { useEffect, useState } from 'react'
// import OPDInvestigationProcedure from '../../../../OPD/OPDSharePage/OPDPrescription/OPDInvestigationProcedure'
import TableContainer from '../../../../../../Component/TableContainer'
import { useSelector } from 'react-redux'
import GetAllItemMaster from '../../../../../API/OPD/GetAllItemMaster'
import Search, { FindByQuery } from '../../../../../../Code/Serach'
import searchIcon from "../../../../../../assets/images/Navbar/search.svg"
import clear1 from '../../../../../../assets/images/icons/clear.svg'
import send from '../../../../../../assets/images/icons/send.svg'
import SaveIPDData from '../../../../../../Code/SaveIPDData';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
import { clear } from '@testing-library/user-event/dist/clear'


export default function IPDInvestigation(props) {
    const {t} = useTranslation();

    let [itemMasterList, setItemMasterList] = useState([])
    let [total, setTotal] = useState(0)
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
        let flag = 0
        let id = e.target.name
        let temp = [...sendData]
        let tempN = [...investname]
        if (temp.length != 0) {
            sendData.map((val, ind) => {
                // console.log("itemId", val.itemId, typeof (id))
                if (val.itemId === parseInt(id)) {
                    // console.log("investigation")
                    showInvestigation[index].checked = 0
                    document.getElementById(id).checked = false
                    temp.splice(ind, 1)
                    tempN.splice(ind, 1)
                    setSendData([...temp])
                    SaveIPDData([...temp], "patientInvestigation")

                    setInvestname([...tempN])
                    setTotal(total - cost)
                    SaveIPDData(total - cost, "total")
                    flag = 1

                }

            })

            if (flag === 0) {
                let data = { "itemId": parseInt(id), "Name":name, "charges": cost}
                setTotal(total + cost)
                SaveIPDData(total + cost, "total")

                setSendData([...sendData, data])
                SaveIPDData([...sendData, data], "patientInvestigation")

                setInvestname([...investname, name])
                tempN = [...investname, name]
                showInvestigation[index].checked = 1
            }
        }
        else {
            let data = { "itemId": parseInt(id), "Name":name, "charges": cost }
            setTotal(total + cost)
            SaveIPDData(total + cost, "total")

            setSendData([...sendData, data])
            SaveIPDData([...sendData, data], "patientInvestigation")

            setInvestname([...investname, name])
            tempN = [...investname, name]
            showInvestigation[index].checked = 1
        }
        setShowInvestigation(showInvestigation)

        window.sessionStorage.setItem("Invest", JSON.stringify(tempN))
    }

    let patientsendDataChange = useSelector((state) => state.IPDPatientSendData)



    useEffect(() => {
        getdata(props.values)
        setData()

    }, [props.showFun]);
    document.body.dir = i18n.dir();


    // useEffect(() => {
    //     SaveIPDData(sendData, "patientInvestigation")
    //     SaveIPDData(total, "total")

    // }, [sendData])


    let setData = () => {
        console.log("dscs")
        setSendData([])
        let tempdata = []
        setShowInvestigation([])
        let response = []
        let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "patientInvestigation") {
                        setSendData(val.patientInvestigation)
                        tempdata = val.patientInvestigation
                        // setTotal(val.total)
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
            }

            // response.push(val)
        })
        setShowInvestigation([...tempitems])
        setSearchShow([...tempitems])
        setTotal(total)


    }

    let handleSearch = (e) => {
        // console.log("itemMasterList", itemMasterList)
        if (e.target.value !== "") {
            let searcresult = FindByQuery(searchShow, e.target.value, "itemName")
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
            }
        }
        else {
            setData()
            // setShowInvestigation(searchShow)
        }
    }


    useEffect(() => {
        setData()
    }, [patientsendDataChange])
    return (
        <div className={`${props.showFun === 0 ? 'offcanvas' : "offcanvas show"}  offcanvas-end`} id="modalAntibiogram" data-bs-backdrop="static">
            <div className="offcanvas-header d-flex justify-content-start gap-4  p-4 " style={{ borderBottom: "1px solid #C6C6C6", background: "#1D4999" }}>
                <div className='d-flex justify-content-center align-items-center pointer' style={{ backgroundColor: "white", borderRadius: "50px", width: "24px", height: "24px" }} data-bs-dismiss="offcanvas" onClick={() => { props.modelCloseFun(0) }} aria-label="Close"><i className='fa fa-close ' ></i></div>
                <h5 className="offcanvas-title text-white" id="allergiesLabel" > {t("ORDER_INVESTIGATION")} </h5>
            </div>

            <div className="offcanvas-body " >
                <div className='p-0 boxcontainer'>
                    <div className='row pb-3  m-0'>
                        {/* <Heading text="Order Investigation" /> */}
                        <div className={`col-12 p-0 position-relative`} >
                            <input type='text' placeholder= {t("SEARCH_INVESTIGATION_AND_PROCEDURE")} className='searchBarOPD' onChange={handleSearch} />
                            <img src={searchIcon} className='searchBarOPDIcon' alt='' />
                        </div>
                    </div>

                    <div className='overflow-auto' style={{ height: "75vh" }}>
                        <TableContainer>
                            <thead>
                                <th className='wrap-content'>{t("INVESTIGATION_AND_PROCEDURE")} </th>
                                <th>Price</th>
                                {/* <th>Action</th> */}
                            </thead>
                            <tbody>
                                {/* {callInvestigation} */}
                                {showInvestigation && showInvestigation.map((val, ind) => {

                                    // console.log("cdscs", val)
                                    return (
                                        <tr key={val.id}>
                                            <td >
                                                <div className='d-flex regularCheck column-gap-1 px-2 align-items-start'>
                                                    <div className='form-check'>
                                                        <input className='form-check-input' type="checkbox" id={val.id} value="true" defaultChecked={val.checked} name={val.id} onClick={(e) => { handlechange(e, val.itemCharge, val.itemName, ind, val.id) }} />
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
                    <div className='toal-invest-in'>
                      <div className='toal-invest'>
                        {t("TOTAL") } : {total}
                      </div>
                      <div className='toal-invest'>
                         <button type="button" className="btn btn-save-fill"> <img src={send} className='icnn'  alt='' /> {t("Send")}</button>
                      </div>
                      <div className='toal-invest'>
                         <button type="button" className="btn btnbluehover btn-clear"  onClick={() => { console.log("investigation ", sendData) }}> <img src={clear1} className='icnn'  alt='' /> {t("RESET")} </button>
                      </div>
                    </div>

                </div>


            </div>
        </div>
    )
}
let searches = (array, value) => {
    const index = array.findIndex(item => item.itemId === value);
    return index
}
