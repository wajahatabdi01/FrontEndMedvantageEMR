
import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetHistoryParameterDepartmentAssignAPI from '../../Api/Master/HistoryParameterDepartmentAssignAPI/GetHistoryParameterDepartmentAssignAPI'
import GetHistoryParameterMasterAPI from '../../Api/Master/HistoryParameterMaster/GetHistoryParameterMasterAPI'
import GetAPIDepartmentMaster from '../../Api/Master/DepartmentMasterAPI/GetAPIDepartmentMaster'
import ValidationHistoryParameterDepartmentMapping from '../../../Validation/SuperAdmin/Master/ValidationHistoryParameterDepartmentMapping'
import DeleteHistoryParameterDepartmentAssignAPI from '../../Api/Master/HistoryParameterDepartmentAssignAPI/DeleteHistoryParameterDepartmentAssignAPI'
import PutHistoryParameterDepartmentAssignAPI from '../../Api/Master/HistoryParameterDepartmentAssignAPI/PutHistoryParameterDepartmentAssignAPI'
import PostHistoryParameterDepartmentAssignAPI from '../../Api/Master/HistoryParameterDepartmentAssignAPI/PostHistoryParameterDepartmentAssignAPI'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import Search from '../../../Code/Serach'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function HistoryParameterDepartmentAssign() {
    let [historyDepartList, setHistoryDepartList] = useState()
    let [historyDepartListMain, setHistoryDepartListMain] = useState()
    let [historyList, setHistoryList] = useState()
    let [departmentList, setDepartmentList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editParameterName, seteditParameterName] = useState("")
    let [editDepartmentName, seteditDepartmentName] = useState("")
    const {t} = useTranslation();



    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationHistoryParameterDepartmentMapping(sendForm.parameterId, sendForm.departmentId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostHistoryParameterDepartmentAssignAPI(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear(1);
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
            getdata()
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }

    }

    //Get data
    let getdata = async () => {
        let getResponse = await GetHistoryParameterDepartmentAssignAPI();
        let getParameter = await GetHistoryParameterMasterAPI();
        let getDepartment = await GetAPIDepartmentMaster();
        if (getResponse.status === 1) {
            setHistoryDepartList(getResponse.responseValue)
            setHistoryDepartListMain(getResponse.responseValue)
            setHistoryList(getParameter.responseValue)
            setDepartmentList(getDepartment.responseValue)
        }
    }
    //Handle Search
    let handleSearch = (e) => {
        let resp = Search(historyDepartListMain, e.target.value)
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setHistoryDepartList(resp)
            }
            else {
                setHistoryDepartList([])

            }
        }
        else {
            setHistoryDepartList(historyDepartListMain)
        }
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        seteditParameterName("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteHistoryParameterDepartmentAssignAPI(rowId)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted SuccessFully!")
            setTosterValue(0)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
            getdata()
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage(response.responseValue)
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }
    //Handle Button Change
    let handleUpdate = async (id, parameterId, departmentId, parameterName, departmentName, userId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "parameterId": parameterId,
            "departmentId": departmentId,
            "userId": userId,
        }))
        seteditParameterName(parameterName);
        seteditDepartmentName(departmentName);

    }




    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationHistoryParameterDepartmentMapping(sendForm.parameterId, sendForm.departmentId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutHistoryParameterDepartmentAssignAPI(sendForm)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Updated SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                setUpdateBool(0)
                getdata()
                handleClear(1);
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }

        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }
    //Handle Clear
    let handleClear = (value) => {
        setClearDropdown(value)
        seteditParameterName("")
        seteditDepartmentName("")
        setSendForm({ "userId": window.userId })
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
    }, [])
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text={t("History_Parameter_Department_Assign")} />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="parameterId" className="form-label">{t("Parameter_Name")} <span className="starMandatory">*</span></label>
                                    {historyList && <DropdownWithSearch defaulNname={t("Select_Parameter")} name="parameterId" list={historyList} valueName="id" displayName="parameterName" editdata={editParameterName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="departmentId" className="form-label">{t("Department_Name")}<span className="starMandatory">*</span></label>
                                    {departmentList && <DropdownWithSearch defaulNname={t("Select_Department")} name="departmentId" list={departmentList} valueName="id" displayName="departmentName" editdata={editDepartmentName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>

                                <div className="mb-2 relative">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <div>
                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                            <>
                                                {showToster === 1 ?
                                                    <Toster value={tosterValue} message={tosterMessage} />

                                                    : <div>
                                                        {updateBool === 0 ?
                                                            <>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}>{t("Cancel")}</button>
                                                            </>

                                                        }
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </BoxContainer>

                        </div>
                        <div className="col-12 mt-3">
                            <div className='handlser'>
                                <Heading text={t("History_Parameter_Department_List")} />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Parameter_Name")}</th>
                                            <th>{t("Department_Name")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {historyDepartList && historyDepartList.map((val, ind) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.parameterName}</td>
                                                    <td>{val.departmentName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.parameterId, val.departmentId, val.parameterName, val.departmentName, val.userId) }}><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(val.id) }} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
                                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                                              <div className='popDeleteContent'> {t("Are_you_sure_you_want_to_delete?")}</div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

                            </div>

                        </div>


                    </div>
                </div>


            </section>
            {/* <Loder val={loder} /> */}
        </>
    )
}
