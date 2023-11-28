import React, { useState, useEffect } from 'react'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import PostAPIEquipmentTypeMaster from '../../Api/Master/EquipmentTypeMasterAPI/PostAPIEquipmentTypeMaster'
import GetAPIEquipmentTypeMaster from '../../Api/Master/EquipmentTypeMasterAPI/GetAPIEquipmentTypeMaster'
import DeleteAPIEquipmenttypeMaster from '../../Api/Master/EquipmentTypeMasterAPI/DeleteAPIEquipmentTypeMaster'
import PutAPIEquipmentTypeMaster from '../../Api/Master/EquipmentTypeMasterAPI/PutAPIEquipmentTypeMaster'
import Heading from '../../../Component/Heading'
import ValidationEquipmentTypeMaster from '../../../Validation/Admin/ValidationEquipmentTypeMaster'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import Search from '../../../Code/Serach'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function EquipmentTypeMaster() {
    let [equipmentTypeList, setEquipmentTypeList] = useState()
    let [equipmentTypeListMain, setEquipmentTypeListMain] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1);
    let [rowId, setRowId] = useState('');

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const {t} = useTranslation();





    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationEquipmentTypeMaster(sendForm.lifeSupport)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostAPIEquipmentTypeMaster(sendForm);
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
        let getResponse = await GetAPIEquipmentTypeMaster();
        if (getResponse.status === 1) {
            setEquipmentTypeList(getResponse.responseValue)
            setEquipmentTypeListMain(getResponse.responseValue)
        }

    }

    //Handle Search
    let handleSearch = (e) => {
        let resp = Search(equipmentTypeListMain, e.target.value)
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setEquipmentTypeList(resp)
            }
            else {
                setEquipmentTypeList([])

            }
        }
        else {
            setEquipmentTypeList(equipmentTypeListMain)
        }
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let obj = {
            id: rowId
        }
        let response = await DeleteAPIEquipmenttypeMaster(obj)
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
    let handleUpdate = async (id, lifeSupport, remark, UserId) => {
        console.log("id", id)
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "Id": id,
            "lifeSupport": lifeSupport,
            "remark": remark,
            "UserId": window.userId,
        }))

        document.getElementById("lifeSupport").value = lifeSupport;
        document.getElementById("remark").value = remark;
        // document.getElementById("UserId").value = window.userId;
    }



    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationEquipmentTypeMaster(sendForm.lifeSupport)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutAPIEquipmentTypeMaster(sendForm)
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
    let handleClear = () => {
        setSendForm({ "userId": window.userId })
        document.getElementById("lifeSupport").value = "";
        document.getElementById("remark").value = "";
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
                            <Heading text={t("Equipment_Type_Master")} />
                            <BoxContainer>

                                <div className="mb-2 me-2">
                                    <label htmlFor="lifeSupport" className="form-label">{t("Equipment_Type_Name")}<span className="starMandatory">*</span></label>
                                    <input type="text" name="lifeSupport" id="lifeSupport" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Enter_equipment_type")} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="remark" className="form-label">{t("Remark")} </label>
                                    <input type="text" name="remark" id="remark" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Remarks")} />
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
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>{t("Cancel")}</button>
                                                            </>
                                                        }
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </BoxContainer>
                        </div>
                        <div className="col-12 mt-2">
                            <div className='handlser'>
                                <Heading text={t("All_Equipment_Type_List")} />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Equipment_Type_Name")}</th>
                                            <th>{t("Remark")}</th>
                                            <th style={{ "width": "10%" }} className="text-center"> {t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {equipmentTypeList && equipmentTypeList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.lifeSupport}</td>
                                                    <td>{val.remark}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.lifeSupport, val.remark, val.userId) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
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
