import React, { useEffect, useState } from 'react';
import GetHistoryCategory from '../../../SuperAdmin/Api/Master/HistoryCategory/GetHistoryCategory';
import PostHistorycategorydepartmentassignAPI from '../../Api/Master/HistoryCategoryDepartmentAssignAPI/PostHistorycategorydepartmentassignAPI';
import PutHistorycategorydepartmentassignAPI from '../../Api/Master/HistoryCategoryDepartmentAssignAPI/PutHistorycategorydepartmentassignAPI';
import DeleteHistorycategorydepartmentassignAPI from '../../Api/Master/HistoryCategoryDepartmentAssignAPI/DeleteHistorycategorydepartmentassignAPI';
import GetAPIDepartmentMaster from '../../Api/Master/DepartmentMasterAPI/GetAPIDepartmentMaster';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import GetHistoryCategoryDepartmentAssignAPI from '../../Api/Master/HistoryCategoryDepartmentAssignAPI/GetHistoryCategoryDepartmentAssignAPI';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import ValidationHistorycategoryDepartmentMapping from '../../../Validation/SuperAdmin/Master/ValidationHistorycategoryDepartmentMapping';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import TableContainer from '../../../Component/TableContainer';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import Search from '../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function Historycategorydepartmentassign() {

    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [historyList, setHistoryList] = useState([]);
    let [departmentList, setDepartmentList] = useState([]);
    let [historyCategoryDepartmentList, setHistoryCategoryDepartmentList] = useState([]);
    let [historyCategoryDepartmentListMain, setHistoryCategoryDepartmentListMain] = useState([]);
    let [rowId, setRowId] = useState('')
    let [showLoder, setShowLoder] = useState(0);
    let [updateBool, setUpdateBool] = useState(0)
    let [loder, setLoder] = useState(1)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editCategory, setEditCategory] = useState("")
    let [editDepartment, setEditDepartment] = useState("");
    
    const {t} = useTranslation();


    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationHistorycategoryDepartmentMapping(sendForm.categoryId, sendForm.departmentId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostHistorycategorydepartmentassignAPI(sendForm);
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
        let getResponse = await GetHistoryCategoryDepartmentAssignAPI();
        let getCategory = await GetHistoryCategory();
        let getDepartment = await GetAPIDepartmentMaster();
        if (getResponse.status === 1) {
            setHistoryCategoryDepartmentList(getResponse.responseValue)
            setHistoryCategoryDepartmentListMain(getResponse.responseValue)
            setHistoryList(getCategory.responseValue)
            setDepartmentList(getDepartment.responseValue)
        }
    }
    //Handle Search
    let handleSearch = (e) => {
        let resp = Search(historyCategoryDepartmentListMain, e.target.value)
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setHistoryCategoryDepartmentList(resp)
            }
            else {
                setHistoryCategoryDepartmentList([])

            }
        }
        else {
            setHistoryCategoryDepartmentList(historyCategoryDepartmentListMain)
        }
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditCategory("")
        setEditDepartment("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteHistorycategorydepartmentassignAPI(rowId)
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
    let handleUpdate = async (id, categoryId, departmentId, userId, historyCategoryName, departmentName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "moduleID": categoryId,
            "departmentID": departmentId,
            "userId": userId,
        }))
        setEditCategory(historyCategoryName)
        setEditDepartment(departmentName)
        // document.getElementById("categoryId").value = categoryId;
        // document.getElementById("departmentId").value = departmentId;
    }




    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationHistorycategoryDepartmentMapping(sendForm.categoryId, sendForm.departmentId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutHistorycategorydepartmentassignAPI(sendForm)
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
        setEditCategory("")
        setEditDepartment("")
        // document.getElementById("categoryId").value = 0;
        // document.getElementById("departmentId").value = 0;
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
    }, []);
    document.body.dir = i18n.dir();

    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text={t("History_Category_Department_Assign")}/>
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="categoryId" className="form-label">{t("Category_Name")}<span className="starMandatory">*</span></label>

                                    {historyList && <DropdownWithSearch defaulNname= {t("Select_Category")} name="categoryId" list={historyList} valueName="id" displayName="categoryName" editdata={editCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="departmentId" className="form-label"> {t("Department_Name")} <span className="starMandatory">*</span></label>

                                    {departmentList && <DropdownWithSearch defaulNname= {t("Select_Department")}  name="departmentId" list={departmentList} valueName="id" displayName="departmentName" editdata={editDepartment} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' /> {t("Clear")}</button>
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
                                <Heading text={t("History_Category_Department_List")} />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder= {t("Search")} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th> {t("Category_Name")} </th>
                                            <th> {t("Department_Name")} </th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")} </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {historyCategoryDepartmentList && historyCategoryDepartmentList.map((val, ind) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.historyCategoryName}</td>
                                                    <td>{val.departmentName}</td>
                                                    <td>
                                                        {/* <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.categoryId, val.departmentId, val.userId, val.historyCategoryName, val.departmentName) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                                                            </div>
                                                        </div> */}
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.categoryId, val.departmentId, val.userId, val.historyCategoryName, val.departmentName) }} /></div>
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
