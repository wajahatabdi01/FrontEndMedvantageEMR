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
import i18n from "i18next";
import { clear } from '@testing-library/user-event/dist/clear'
import Heading from '../../../../../../Component/Heading'
import Loader from '../../../../../../Component/Loader'
import SuccessToster from '../../../../../../Component/SuccessToster'
import AlertToster from '../../../../../../Component/AlertToster'
import FHIRSavePatientInvestigation from '../../../../../API/FHIRPatirntInvestigation/FHIRSavePatientInvestigation'
import TosterUnderProcess from '../../../../../../Component/TosterUnderProcess'
import Toster from '../../../../../../Component/Toster'
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';


export default function IPDInvestigation(props) {
    const { t } = useTranslation();

    let [itemMasterList, setItemMasterList] = useState([])
    let [total, setTotal] = useState(0)
    let [searchShow, setSearchShow] = useState([])

    let [showInvestigation, setShowInvestigation] = useState([])

    let [sendData, setSendData] = useState([])
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [updateBool, setUpdateBool] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [investigationHistory, setInvestigationHistory] = useState([])

    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []

    let patientDeptId = window.sessionStorage.getItem("OPDPatientData")
        ? JSON.parse(window.sessionStorage.getItem("OPDPatientData"))[0].departmentId
        : window.sessionStorage.getItem("IPDpatientList") ? JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].deptId : []


    let patientDoctId = window.sessionStorage.getItem("OPDPatientData")
        ? JSON.parse(window.sessionStorage.getItem("OPDPatientData"))[0].doctorId
        : window.sessionStorage.getItem("IPDpatientList") ? JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].doctorId : []


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

                if (val.itemId === parseInt(id)) {

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
                let data = { "itemId": parseInt(id), "itemName": name, "itemCost": cost }
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
            let data = { "itemId": parseInt(id), "itemName": name, "itemCost": cost }
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

        setSearchShow([...tempitems])
        setTotal(total)
        setSendData(investigationHistory)
    }

    //Save Investigation
    const handlesaveInvestigation = async () => {

        setShowUnderProcess(1);
        var obj = {
            "uhid": activeUHID,
            "doctorId": patientDoctId,
            "clientId": window.clientId,
            "userId": window.userId,
            "deptId": patientDeptId,
            "investigationItemDetails": JSON.stringify(sendData),
        }

        // return;
        const response = await FHIRSavePatientInvestigation(obj);
        if (response.status === 1) {
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTosterMessage("Data Saved Successfully.");
            setTimeout(() => {
                setShowToster(0);
            }, 1500)
        }
        else {
            setShowUnderProcess(0);
            setTosterValue(1);
            setShowToster(1);
            setTosterMessage(response.responseValue);
            setTimeout(() => {
                setShowToster(0);
            }, 1500)
        }

    }



    useEffect(() => {
        setData()
    }, [patientsendDataChange])
    return (
        <div className='p-0 boxcontainer mt-2 investigationbox'>
            <div className='opdorder-in'>
                <div className='opdorder'>
                    <Heading text={t("Order Investigation")} />
                </div>
                <div className='opdserchinvest position-relative'>
                    <input type='text' placeholder={t("Search Investigation & Procedure...")} className='searchBarOPD' onChange={handleSearch} />
                    <img src={searchIcon} className='searchBarOPDIcon2' alt='' />
                </div>
                <div className='overflow-auto' style={{ height: "30vh" }}>
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
                {/* <div className='toal-invest-in'>
                    <div className='toal-invest'>
                        {t("TOTAL")} : {total}
                    </div>
                    <div className='toal-invest'>
                        <button type="button" className="btn btn-save-fill" onClick={handlesaveInvestigation}> <img src={send} className='icnn' alt='' /> {t("Save")}</button>
                    </div>
                    <div className='toal-invest'>
                        <button type="button" className="btn btnbluehover btn-clear" onClick={() => { console.log("investigation ", sendData) }}> <img src={clear1} className='icnn' alt='' /> {t("RESET")} </button>
                    </div>
                </div> */}

                <div className='opdorder border-topp suminvest'>
                <div className='totalod'>  {t("Total Investigation Charge")}: <span>{total}</span></div>
                <div className='resetpodinvest relative'>
                    {showUnderProcess === 1 ? <TosterUnderProcess /> :
                        <>
                            {showToster === 1 ?
                                <Toster value={tosterValue} message={tosterMessage} />
                                : <div>
                                    <>
                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlesaveInvestigation}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleReset(); }}><i className="fa fa-refresh" aria-hidden="true"></i> {t("Reset")}</button>
                                    </>

                                </div>}
                        </>
                    }
                </div>
            </div>


            </div>


            {
                showLoder === 1 ? <Loader val={showLoder} /> : ""
            }
            {/* Toaster */}
            {
                isShowToaster === 1 ?
                    <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
            }

            {
                showAlertToster === 1 ?
                    <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
            }

        </div>
    )
}
let searches = (array, value) => {
    const index = array.findIndex(item => item.itemId === value);
    return index
}
