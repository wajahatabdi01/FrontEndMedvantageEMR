import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationLifeSupportModeMapping from '../../../Validation/Admin/Master/ValidationLifeSupportModeMapping'
import PostLifeSupportModeMapping from '../../Api/Master/LifeSupportModeMapping/PostLifeSupportModeMapping'
import GetLifeSupportModeMapping from '../../Api/Master/LifeSupportModeMapping/GetLifeSupportModeMapping'
import GetLifeSupportMode from '../../Api/Master/LifeSupportMode/GetLifeSupportMode'
import GetAPIEquipmentTypeMaster from '../../Api/Master/EquipmentTypeMasterAPI/GetAPIEquipmentTypeMaster'
import DeleteLifeSupportModeMapping from '../../Api/Master/LifeSupportModeMapping/DeleteLifeSupportModeMapping'
import PutLifeSupportModeMapping from '../../Api/Master/LifeSupportModeMapping/PutLifeSupportModeMapping'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import Search from '../../../Code/Serach'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function LifeSupportModeMapping() {
    let [lifeSupportMappingList, setLifeSupportMappingList] = useState()
    let [lifeSupportMappingListMain, setLifeSupportMappingListMain] = useState()
    let [equipmentTypeList, setEquipmentTypeList] = useState()
    let [lifeSupportModeList, setLifeSupportModeList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editEquipmentType, setEditEquipmentType] = useState("")
    let [editLifeSupport, setEditLifeSupport] = useState("")
    const {t} = useTranslation();

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationLifeSupportModeMapping(sendForm.lifeSupportMasterID, sendForm.lifeSupportModeID)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostLifeSupportModeMapping(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear();
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
        let getResponse = await GetLifeSupportModeMapping();
        let getEquipment = await GetAPIEquipmentTypeMaster();
        let getLifeSupportMode = await GetLifeSupportMode();
        if (getResponse.status === 1) {
            setLifeSupportMappingList(getResponse.responseValue)
            setLifeSupportMappingListMain(getResponse.responseValue)
            setEquipmentTypeList(getEquipment.responseValue)
            setLifeSupportModeList(getLifeSupportMode.responseValue)
        }
    }
    //Handle Search
    let handleSearch = (e) => {
        let resp = Search(lifeSupportMappingListMain, e.target.value)
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setLifeSupportMappingList(resp)
            }
            else {
                setLifeSupportMappingList([])

            }
        }
        else {
            setLifeSupportMappingList(lifeSupportMappingListMain)
        }
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditEquipmentType("")
        setEditLifeSupport("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1);
        let obj = {
            id: rowId
        }
        let response = await DeleteLifeSupportModeMapping(obj)
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
    let handleUpdate = async (id, lifeSupportMasterID, lifeSupportModeID, userId, lifeSupportName, lifeSupportMode) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "lifeSupportMasterID": lifeSupportMasterID,
            "lifeSupportModeID": lifeSupportModeID,
            "userId": userId,
        }))
        setEditEquipmentType(lifeSupportName)
        setEditLifeSupport(lifeSupportMode)
        // document.getElementById("lifeSupportMasterID").value = lifeSupportMasterID;
        // document.getElementById("lifeSupportModeID").value = lifeSupportModeID;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationLifeSupportModeMapping(sendForm.lifeSupportMasterID, sendForm.lifeSupportModeID)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutLifeSupportModeMapping(sendForm)
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
                handleClear();
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
        setSendForm({ "userId": window.userId })
        setClearDropdown(value)
        setEditEquipmentType("")
        setEditLifeSupport("")
        // document.getElementById("lifeSupportMasterID").value = 0;
        // document.getElementById("lifeSupportModeID").value = 0;
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
                            <Heading text={t("Life_Support_Mode_Mapping")} />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="lifeSupportMasterID" className="form-label">{t("Equipment_Type")} <span className="starMandatory">*</span></label>
                                    {/* <select name='lifeSupportMasterID' id="lifeSupportMasterID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {equipmentTypeList && equipmentTypeList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.lifeSupport}</option>
                                            )
                                        })}
                                    </select> */}
                                    {equipmentTypeList && <DropdownWithSearch defaulNname={t("Select_Equipment_Type")} name="lifeSupportMasterID" list={equipmentTypeList} valueName="id" displayName="lifeSupport" editdata={editEquipmentType} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="lifeSupportModeID" className="form-label">{t("Life_Support_Mode")}<span className="starMandatory">*</span></label>
                                    {/* <select name='lifeSupportModeID' id="lifeSupportModeID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {lifeSupportModeList && lifeSupportModeList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.lifeSupportMode}</option>
                                            )
                                        })}
                                    </select> */}
                                    {lifeSupportModeList && <DropdownWithSearch defaulNname={t("Select_life_support_mode")} name="lifeSupportModeID" list={lifeSupportModeList} valueName="id" displayName="lifeSupportMode" editdata={editLifeSupport} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                                <Heading text={t("Life_Support_Mode_Mapping_List")} />
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
                                            <th>{t("Equipment_Type_Name")}</th>
                                            <th>{t("Life_Support_Mode")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {lifeSupportMappingList && lifeSupportMappingList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.lifeSupportName}</td>
                                                    <td>{val.lifeSupportMode}</td>
                                                    <td>
                                                        {/* <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.lifeSupportMasterID, val.lifeSupportModeID, val.userId) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                                                            </div>
                                                        </div> */}
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(val.id, val.lifeSupportMasterID, val.lifeSupportModeID, val.userId, val.lifeSupportName, val.lifeSupportMode) }} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(val.id) }} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </TableContainer>
                                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
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
        </>
    )
}
