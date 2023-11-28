import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationTableMaster from '../../../Validation/Admin/Master/ValidationTableMaster'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import PostTableMaster from '../../Api/Master/TableMasterAPI/PostTableMaster'
import PutTableMaster from '../../Api/Master/TableMasterAPI/PutTableMaster'
import GetTableMaster from '../../Api/Master/TableMasterAPI/GetTableMaster'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import DeleteTableMaster from '../../Api/Master/TableMasterAPI/DeleteTableMaster'
import GetApiMaster from '../../../SuperAdmin/Api/APIMaster/ApiMaster/GetApiMaster';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function TableMaster() {

    let [tableMasterData, setTableMasterData] = useState([])
    let [apiMasterData, setApiMasterData] = useState([])
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId})
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [rowId, setRowId] = useState("")
    let [editApiMasterData, setEditApiMasterData] = useState("")
    let [clearDropdown, setClearDropdown] = useState(0)
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationTableMaster(sendForm.tableName)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostTableMaster(sendForm);
            console.log("sendForm", sendForm)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear();
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

        let getResponse = await GetTableMaster();
        let getApiResponse = await GetApiMaster();
        console.log("getResponse", getResponse)

        if (getResponse.status === 1) {
            setTableMasterData(getResponse.responseValue)

        }

        if (getApiResponse.status === 1) {
            setApiMasterData(getApiResponse.responseValue)

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

    //   let handleSearch = (e) => {
    //     let resp = Search(conversionMainData, e.target.value)
    //     if (e.target.value !== "") {
    //       if (resp.length !== 0) {
    //         setConversionData(resp)
    //       }
    //       else {
    //         setConversionData([])

    //       }
    //     }
    //     else {
    //         setConversionData(conversionMainData)
    //     }
    //   }


    // Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let obj = {
            id: rowId
        }
        let response = await DeleteTableMaster(obj)
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
    let handleUpdate = async (id, tableName, apiUrl, userId) => {

        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "tableName": tableName,
            "apiUrl": apiUrl,
            "userId": userId

        }))
        setEditApiMasterData(apiUrl)
        document.getElementById("tableName").value = tableName;
        // document.getElementById("apiUrl").value = apiUrl;

    }



    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationTableMaster(sendForm.tableName)
        console.log("valresponse", valresponse);
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutTableMaster(sendForm)
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
        setEditApiMasterData(0)
        document.getElementById("tableName").value = '';
        // document.getElementById("apiUrl").value = '';
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
    }, [])
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text={t("Table_Master")} />
                            <BoxContainer>


                                {/* <div className="mb-2 me-2">
                                    <label htmlFor="languageID" className="form-label">Language Id <span className="starMandatory">*</span></label>
                                    <select name='languageID' id="languageID" onChange={handleChange} className="form-select form-select-sm" defaultValue="1" aria-label=".form-select-sm example">
                                        <option onClick={() => { getdata() }}>1</option>
                                        <option onClick={() => { getdata() }}>2</option>
                                        <option onClick={() => { getdata() }}>3</option>
                                        <option onClick={() => { getdata() }}>4</option>
                                    </select>

                                </div> */}



                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="tableName" className="form-label">{t("TableName")}<span class="starMandatory">*</span></label>
                                    <input type='text' className="form-control form-control-sm" id='tableName' name='tableName' onChange={handleChange} placeholder={t("Table_Name")} />
                                </div>

                                {/* <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="apiUrl" className="form-label">API Url<span class="starMandatory">*</span></label>
                                    <input type='text' className="form-control form-control-sm" id='apiUrl' name='apiUrl' onChange={handleChange} placeholder='Enter Url Name' />
                                </div> */}

                                <div className="mb-2 me-2 drpWithSearch" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="apiUrl" className="form-label"> {t("API_Url")} <span className="starMandatory">*</span></label>

                                    {apiMasterData && <DropdownWithSearch defaulNname="Select" name="apiUrl" list={apiMasterData} valueName="id" 
                                    displayName="apiUrl" editdata={editApiMasterData} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveForm}>{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}>{t("Clear")}</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("Update")}</button>
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
                            <Heading text={t("Table_Master_List")} />
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("TableName")}</th>
                                            <th>{t("API_Url")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tableMasterData && tableMasterData.map((key, ind) => {
                                            return (
                                                <tr value={key.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{key.tableName}</td>
                                                    <td>{key.apiUrl}</td>

                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(key.id, key.tableName, key.apiUrl, key.userId) }} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(key.id) }} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                                    <div class="modal-dialog modalDelete">
                                        <div class="modal-content">

                                            <div class="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i class="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                                            </div>
                                            <div class="modal-footer1 text-center">

                                                <button type="button" class="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                                <button type="button" class="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
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
