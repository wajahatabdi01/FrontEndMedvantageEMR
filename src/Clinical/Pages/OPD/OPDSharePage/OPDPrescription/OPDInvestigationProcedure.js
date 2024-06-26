import React, { useEffect, useMemo, useState } from 'react'
import TableContainer from '../../../../../Component/TableContainer'
import searchIcon from "../../../../../assets/images/Navbar/search.svg"
import Heading from '../../../../../Component/Heading'
import GetAllItemMaster from '../../../../API/OPD/GetAllItemMaster'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import { useSelector } from 'react-redux'
import Search from '../../../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import saveButtonIcon from '../../../../../assets/images/icons/saveButton.svg';
import i18n from "i18next";
import SuccessToster from '../../../../../Component/SuccessToster'
import AlertToster from '../../../../../Component/AlertToster'
import TosterUnderProcess from '../../../../../Component/TosterUnderProcess'
import Toster from '../../../../../Component/Toster'
import Loader from '../../../../../Component/Loader'
import FHIRSavePatientInvestigation from '../../../../API/FHIRPatirntInvestigation/FHIRSavePatientInvestigation'
import clear from '../../../../../assets/images/icons/clear.svg';
import IconEdit from '../../../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../../../assets/images/icons/IconDelete.svg'
import clearIcon from '../../../../../assets/images/icons/clear.svg';


export default function OPDInvestigationProcedure(props) {
    console.log('propsssssssssssss : ', props)
    document.body.dir = i18n.dir();
    const { t } = useTranslation();
    let [investigationHistory, setInvestigationHistory] = useState([])
    let [itemMasterList, setItemMasterList] = useState([])
    let [total, setTotal] = useState(0)
    let [disable, setDisable] = useState(0)
    let [searchShow, setSearchShow] = useState([])
    const [showUpdate, setShowUpdate] = useState(0);
    const [showSave, setShowSave] = useState(1);

    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []

    let patientDeptId = window.sessionStorage.getItem("OPDPatientData")
        ? JSON.parse(window.sessionStorage.getItem("OPDPatientData"))[0].departmentId
        : window.sessionStorage.getItem("IPDpatientList") ? JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].deptId : []


    let patientDoctId = window.sessionStorage.getItem("OPDPatientData")
        ? JSON.parse(window.sessionStorage.getItem("OPDPatientData"))[0].doctorId
        : window.sessionStorage.getItem("IPDpatientList") ? JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].doctorId : []



    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [updatebool, setUpdateBool] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    const [getClinicalInstructionList, setClinicalInstructionList] = useState([]);
    let [showInvestigation, setShowInvestigation] = useState([])

    let [sendData, setSendData] = useState([])
    let [sendForm, setSendForm] = useState();
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

    let handleChange = () => {

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

                    if (val.itemId === parseInt(id)) {

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
                    let data = { "itemId": parseInt(id), "itemName": name, "itemCost": cost }
                    setTotal(total + cost)
                    setSendData([...sendData, data])
                    setInvestname([...investname, name])
                    tempN = [...investname, name]
                    showInvestigation[index].checked = 1
                }
            }
            else {
                let data = { "itemId": parseInt(id), "itemName": name, "itemCost": cost }
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
                else {
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
            "departmentId": patientDeptId,
            "encounterId" : props.theEncounterId,
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
    }, [patientsendData])

    // let callInvestigation = useMemo(Investigartiondata, [patientsendData])

    return (

        <>
            {/* <div className='reminder' style={{ paddingTop: '4px' }}>
                <div className='reminder container'>
                    <div className='opdorder-in'>
                        <div className='remhead'>
                            Clinical Reminders <i class="bi bi-bell"></i>
                        </div>
                    </div>
                    <div className='overflow-auto' style={{ height: "20vh" }}>
                        <TableContainer>
                            <thead>
                                <tr>
                                    <th className='wrap-content'>Reminders</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Measurement: Weight</td>
                                    <td>Past Due &nbsp;<i style={{ color: 'red' }} class="bi bi-question-circle-fill"></i></td>
                                </tr>
                                <tr>
                                    <td>
                                        <span data-bs-toggle="modal" data-bs-target="#clinicalReminder" style={{ color: '#1d4999', textDecoration: 'underline', cursor: 'pointer' }}>Measurement: Mammogram</span>
                                    </td>
                                    <td>Past Due &nbsp;<i style={{ color: 'red' }} class="bi bi-question-circle-fill"></i></td>
                                </tr>
                                <tr>
                                    <td>
                                        <span data-bs-toggle="modal" data-bs-target="#clinicalReminder" style={{ color: '#1d4999', textDecoration: 'underline', cursor: 'pointer' }}>Examination: Pap Smear</span>
                                    </td>
                                    <td>Past Due &nbsp;<i style={{ color: 'red' }} class="bi bi-question-circle-fill"></i></td>
                                </tr>
                                <tr>
                                    <td>Treatment: Influenza Vaccine</td>
                                    <td>Past Due &nbsp;<i style={{ color: 'red' }} class="bi bi-question-circle-fill"></i></td>
                                </tr>
                                <tr>
                                    <td>Treatment: Pneumococcal Vaccine</td>
                                    <td>Past Due &nbsp;<i style={{ color: 'red' }} class="bi bi-question-circle-fill"></i></td>
                                </tr>
                                <tr>
                                    <td>Assessment: Tobacco</td>
                                    <td>Past Due &nbsp;<i style={{ color: 'red' }} class="bi bi-question-circle-fill"></i></td>
                                </tr>
                            </tbody>
                        </TableContainer>
                    </div>
                </div>
            </div> */}

            {/* -----------------------------------------------------Clinical Reminders End-------------------------------------------------- */}
            <div className='p-0 boxcontainer mt-2 investigationbox'>
                <div className='opdorder-in'>
                    <div className='opdorder'>
                        <Heading text={t("Order Investigation")} />
                    </div>
                    <div className='opdserchinvest position-relative'>
                        <input type='text' placeholder={t("Search Investigation & Procedure...")} className='searchBarOPD' onChange={handleSearch} disabled={disable === 1 ? true : false} />
                        <img src={searchIcon} className='searchBarOPDIcon2' alt='' />
                    </div>
                </div>
                <div className='overflow-auto' style={{ height: "30vh" }}>
                    <TableContainer>
                        <thead>
                            <th className='wrap-content'>{t("Investigation & Procedure")}</th>
                            <th>Price</th>
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

                {
                    showLoder === 1 ? <Loader val={showLoder} /> : ""
                }
                {
                    isShowToaster === 1 ?
                        <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
                }

                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }

            </div>
            {/* -----------------------------------------------------------------Clinical Reminder PopUp--------------------------------------------------------- */}
            <div class="modal fade opdpopUp" id="clinicalReminder" data-backdrop="static">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title text-white">Clinical Reminder</h4>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close">
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="med-box">
                                            <div className="inner-content">
                                                <div className="row">
                                                    <div className="fieldsett-in col-md-12">
                                                        <div className="fieldsett">
                                                            <div className="fieldse">
                                                                <span className="fieldse">Assessment - Colon Cancer Screening </span>
                                                                <div className="row">
                                                                    <div className=" col-12 row ms-1">
                                                                        <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                            <label htmlFor="" className="form-label">Date/Time</label>
                                                                            <input type="datetime-local" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                                        </div>
                                                                        <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                            <label htmlFor="" className="form-label">Completed</label>
                                                                            <select className='form-select form-select-sm' >
                                                                                <option value='0'>Select</option>
                                                                                <option value='Pending'>Pending</option>
                                                                                <option value='Completed'>Completed</option>
                                                                                <option value='Completed'>Negated</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                            <label htmlFor="" className="form-label">Results/Details</label>
                                                                            <textarea id="instructionTextId" type="text" className="form-control form-control-sm" name="instructionText" onChange={handleChange} />
                                                                            <small id="errInstruction" className="form-text text-danger" style={{ display: 'none' }}>Instructions cannot be empty.</small>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                                {updatebool === 0 ?
                                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleSaveIssues"}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                                                    : <button type="button" className="btn btn-save btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleSaveUpdate"}>{t("UPDATE")}</button>
                                                }
                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleClear"}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* -------------------------Table----------------------------------------- */}
                                    {/* <div className="col-12 mt-2">
                                        <div className="med-table-section" >
                                            <table className="med-table border striped mt-3">
                                                <thead style={{ zIndex: "0" }}>
                                                    <tr>
                                                        <th className="text-center" style={{ width: "5%" }}>
                                                            #
                                                        </th>
                                                        <th>Instruction</th>
                                                        <th className='text-center'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {getClinicalInstructionList && getClinicalInstructionList.map((list, ind) => {
                                                        return (
                                                            <tr>
                                                                <td>{ind + 1}</td>
                                                                <td>{list.instruction}</td>

                                                                <td>
                                                                    <div className="action-button">
                                                                        <div data-bs-title="Edit Row" title="Edit Row" onClick={() => { "handleUpdate"("list") }}><img src={IconEdit} alt='' /></div>
                                                                        <div data-bs-title="Delete Row" data-bs-target="#deleteModal" onClick={() => { "handleDelete"("list.id") }}><img src={IconDelete} alt='' /></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}


let searches = (array, value) => {
    const index = array.findIndex(item => item.itemId === value);
    return index
}
