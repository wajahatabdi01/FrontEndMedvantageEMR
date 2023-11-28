import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetHistorySubCategory from '../../Api/Master/HistorySubCategory/GetHistorySubCategory'
import GetHistorySubCategoryParameterAssign from '../../Api/Master/HistorySubCategoryParameterAssign/GetHistorySubCategoryParameterAssign'
import GetHistoryParameterMaster from '../../Api/Master/HistoryParameterMaster/GetHistoryParameterMaster'
import DeleteHistorySubCategoryParameterAssign from '../../Api/Master/HistorySubCategoryParameterAssign/DeleteHistorySubCategoryParameterAssign'
import ValidationHistorySubCategoryParameterAssign from '../../../Validation/SuperAdmin/Master/ValidationHistorySubCategoryParameterAssign'
import PostHistorySubCategoryParameterAssign from '../../Api/Master/HistorySubCategoryParameterAssign/PostHistorySubCategoryParameterAssign'
import PutHistorySubCategoryParameterAssign from '../../Api/Master/HistorySubCategoryParameterAssign/PutHistorySubCategoryParameterAssign'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function HistorySubCategoryParameterAssign() {
    let [historySubCatAssignList, setHistorySubCatAssignList] = useState()
    let [historySubCatList, setHistorySubCatList] = useState()
    let [historyParameterList, setHistoryParameterList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editSubCategory, setEditSubCategory] = useState("")
    let [editParameter, setEditParameter] = useState("")
    const [searchTerm, setSearchTerm] = useState('');


    const {t} = useTranslation();


    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationHistorySubCategoryParameterAssign(sendForm.subCategoryId, sendForm.parameterId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostHistorySubCategoryParameterAssign(sendForm);
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
        let getResponse = await GetHistorySubCategoryParameterAssign();
        let getHistSubCat = await GetHistorySubCategory();
        let getHistoryParameter = await GetHistoryParameterMaster();
        if (getResponse.status === 1) {
            setHistorySubCatAssignList(getResponse.responseValue)
            setHistorySubCatList(getHistSubCat.responseValue)
            setHistoryParameterList(getHistoryParameter.responseValue)
        }
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditSubCategory("")
        setEditParameter("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteHistorySubCategoryParameterAssign(rowId)
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
    let handleUpdate = async (id, subCategoryId, parameterId, userId, subCategoryName, parameterName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "subCategoryId": subCategoryId,
            "parameterId": parameterId,
            "userId": userId,
        }))
        setEditSubCategory(subCategoryName);
        setEditParameter(parameterName);

        document.getElementById("subCategoryId").value = subCategoryId;
        document.getElementById("parameterId").value = parameterId;
    }

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationHistorySubCategoryParameterAssign(sendForm.subCategoryId, sendForm.parameterId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutHistorySubCategoryParameterAssign(sendForm)
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
        setSendForm({ "userId": window.userId })
        setClearDropdown(value)
        setEditSubCategory("")
        setEditParameter("")
        // document.getElementById("subCategoryId").value = 0;
        // document.getElementById("parameterId").value = 0;
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
                            <Heading text=  {t("History_Sub_Category_Parameter_Assign")}/>
                            <BoxContainer>

                                <div className="mb-2 me-2">
                                    <label htmlFor="subCategoryId" className="form-label">{t("HISTORY_SUB_CATEGORY")}<span className="starMandatory">*</span></label>
                                    {/* <select name='subCategoryId' id="subCategoryId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {historySubCatList && historySubCatList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.subCategoryName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {historySubCatList && <DropdownWithSearch defaulNname=  {t("Select_Sub_Category")} name="subCategoryId" list={historySubCatList} valueName="id" displayName="subCategoryName" editdata={editSubCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="parameterId" className="form-label"> {t("HISTORY_PARAMETER")}</label>
                                    {/* <select name='parameterId' id="parameterId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {historyParameterList && historyParameterList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.parameterName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {historyParameterList && <DropdownWithSearch defaulNname="Select parameter" name="parameterId" list={historyParameterList} valueName="id" displayName="parameterName" editdata={editParameter} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                        <div className="col-12 mt-2">
                            <div className='handlser'>
                                <Heading text= {t("History_Sub_Category_Parameter_Assign_List")} />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder=  {t("Search")}  value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th> {t("Sub_Category")}</th>
                                            <th>{t("Parameter")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {historySubCatAssignList && historySubCatAssignList.filter((val) => `${val.subCategoryName} ${val.parameterName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.subCategoryName}</td>
                                                    <td>{val.parameterName}</td>
                                                    <td>
                                                        {/* <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.subCategoryId, val.parameterId, val.userId) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                                                            </div>
                                                        </div> */}
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.subCategoryId, val.parameterId, val.userId, val.subCategoryName, val.parameterName) }}><img src={IconEdit} alt='' /></div>
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
                                                <div className='popDeleteContent'> {t("Are you sure you want to delete?")} </div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal"> {t("Cancel")} </button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal"> {t("Delete?")} </button>
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
