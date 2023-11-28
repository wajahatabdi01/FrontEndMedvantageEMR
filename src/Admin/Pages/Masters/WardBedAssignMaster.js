import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationWardBedAssignMaster from '../../../Validation/Admin/Master/ValidationWardBedAssignMaster'
import GetWardBedAssignMaster from '../../Api/Master/WardBedAssignMaster/GetWardBedAssignMaster'
import GetAPIWardMaster from '../../Api/Master/WardMasterAPI/GetAPIWardMaster'
import GetAPIBedMaster from '../../Api/Master/BedMasterAPI/GetAPIBedMaster'
import PutWardBedAssignMaster from '../../Api/Master/WardBedAssignMaster/PutWardBedAssignMaster'
import DeleteWardBedAssignMaster from '../../Api/Master/WardBedAssignMaster/DeleteWardBedAssignMaster'
import PostWardBedAssignMaster from '../../Api/Master/WardBedAssignMaster/PostWardBedAssignMaster'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import Search from '../../../Code/Serach'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function WardBedAssignMaster() {
    let [wardBedAssignList, setWardBedAssignList] = useState()
    let [wardBedAssignListMain, setWardBedAssignListMain] = useState()
    let [wardList, setWardList] = useState()
    let [bedList, setBesList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId, "clientId": window.clientId})
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editWard, setEditWard] = useState("")
    let [editBed, setEditBed] = useState("")
    const {t} = useTranslation();

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationWardBedAssignMaster(sendForm.wardId, sendForm.bedId, sendForm.code)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostWardBedAssignMaster(sendForm);
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
        const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
        let getResponse = await GetWardBedAssignMaster(clientID);
        let getWard = await GetAPIWardMaster(clientID);
        let getBed = await GetAPIBedMaster();
        if (getResponse.status === 1) {
            setWardBedAssignList(getResponse.responseValue)
            setWardBedAssignListMain(getResponse.responseValue)
            setWardList(getWard.responseValue)
            setBesList(getBed.responseValue)
        }

    }


    //Handle Search
    let handleSearch = (e) => {
        let resp = Search(wardBedAssignListMain, e.target.value)
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setWardBedAssignList(resp)
            }
            else {
                setWardBedAssignList([])

            }
        }
        else {
            setWardBedAssignList(wardBedAssignListMain)
        }
    }

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditWard("")
        setEditBed("")
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
        let response = await DeleteWardBedAssignMaster(obj)
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
    let handleUpdate = async (id, wardId, bedId, code, userId, wardName, bedName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "wardId": wardId,
            "bedId": bedId,
            "code": code,
            "userId": userId,
        }))
        setEditWard(wardName);
        setEditBed(bedName);
        // document.getElementById("wardId").value = wardId;
        // document.getElementById("bedId").value = bedId;
        document.getElementById("code").value = code;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationWardBedAssignMaster(sendForm.wardId, sendForm.bedId, sendForm.code)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutWardBedAssignMaster(sendForm)
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
        setClearDropdown(value)
        setEditWard("")
        setEditBed("")
        setSendForm({ "userId": window.userId })
        document.getElementById("code").value = "";
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
                            <Heading text={t("Ward_Bed_Assign")} />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="wardId" className="form-label">{t("ward")} <span className="starMandatory">*</span></label>
                                    {/* <select name='wardId' id="wardId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {wardList && wardList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.wardName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {wardList && <DropdownWithSearch defaulNname={t("Select_Ward")} name="wardId" list={wardList} valueName="id" displayName="wardName" editdata={editWard} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="bedId" className="form-label">{t("Bed")} <span className="starMandatory">*</span></label>
                                    {/* <select name='bedId' id="bedId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {bedList && bedList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.bedName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {bedList && <DropdownWithSearch defaulNname={t("select_Bed")} name="bedId" list={bedList} valueName="id" displayName="bedName" editdata={editBed} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="code" className="form-label">{t("Code")} <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="code" name='code' onChange={handleChange} placeholder={t("Enter_code")} />
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
                        <div className="col-12 mt-3">
                            <div className='handlser'>
                                <Heading text={t("Ward_Bed_Assign_List")} />
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
                                            <th>{t("Ward_Nm")}</th>
                                            <th>{t("Bed_Name")}</th>
                                            <th>{t("Code_Type")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {wardBedAssignList && wardBedAssignList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.wardName}</td>
                                                    <td>{val.bedName}</td>
                                                    <td>{val.code}</td>
                                                    <td>
                                                        {/* <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.wardId, val.bedId, val.code, val.userId,val.wardName,val.bedName) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                                                            </div>
                                                        </div> */}

                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.wardId, val.bedId, val.code, val.userId, val.wardName, val.bedName) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} />
                                                            </div>
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
                                                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
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
