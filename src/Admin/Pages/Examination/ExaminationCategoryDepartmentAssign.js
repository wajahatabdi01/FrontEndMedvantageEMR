import React, { useEffect, useState } from 'react'
import ValidationExaminationCategoryDepartmentAssign from '../../../Validation/SuperAdmin/Master/ValidationExaminationCategoryDepartmentAssign';
import PostExamCategoryDeptAssignAPI from '../../Api/Master/ExaminationCategoryDepartmentAssignAPI/PostExamCategoryDeptAssignAPI';
import GetExamCategoryDeptAssignAPI from '../../Api/Master/ExaminationCategoryDepartmentAssignAPI/GetExamCategoryDeptAssignAPI';
import GetExaminationCategoryMasterAPI from '../../Api/Master/ExaminationCategoryMasterAPI/GetExaminationCategoryMasterAPI';
import GetAPIDepartmentMaster from '../../Api/Master/DepartmentMasterAPI/GetAPIDepartmentMaster';
import DeleteExamCategoryDeptAssignAPI from '../../Api/Master/ExaminationCategoryDepartmentAssignAPI/DeleteExamCategoryDeptAssignAPI';
import PutExamCategoryDeptAssignAPI from '../../Api/Master/ExaminationCategoryDepartmentAssignAPI/PutExamCategoryDeptAssignAPI';
import Heading from '../../../Component/Heading';
import TableContainer from '../../../Component/TableContainer';
import BoxContainer from '../../../Component/BoxContainer';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import Search from '../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function ExaminationCategoryDepartmentAssign() {
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [categoryList, setCategoryList] = useState([]);
    let [departmentList, setDepartmentList] = useState([]);
    let [examinationCategoryDepartmentList, setExaminationCategoryDepartmentList] = useState([]);
    let [examinationCategoryDepartmentListMain, setExaminationCategoryDepartmentListMain] = useState([]);
    let [rowId, setRowId] = useState('')
    let [showLoder, setShowLoder] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editCategoryName, seteditCategoryName] = useState("")
    let [editDepartmentName, seteditDepartmentName] = useState("")
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })

    const {t} = useTranslation();

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationExaminationCategoryDepartmentAssign(sendForm.categoryId, sendForm.departmentId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostExamCategoryDeptAssignAPI(sendForm);
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
        let getResponse = await GetExamCategoryDeptAssignAPI();
        let getExamCategory = await GetExaminationCategoryMasterAPI();
        let getDepartment = await GetAPIDepartmentMaster();
        if (getResponse.status === 1) {
            setExaminationCategoryDepartmentList(getResponse.responseValue)
            setExaminationCategoryDepartmentListMain(getResponse.responseValue)
            setCategoryList(getExamCategory.responseValue)
            setDepartmentList(getDepartment.responseValue)
        }
    }
    //Handle Search
    let handleSearch = (e) => {
        let resp = Search(examinationCategoryDepartmentListMain, e.target.value)
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setExaminationCategoryDepartmentList(resp)
            }
            else {
                setExaminationCategoryDepartmentList([])

            }
        }
        else {
            setExaminationCategoryDepartmentList(examinationCategoryDepartmentListMain)
        }
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        seteditCategoryName("")
        seteditDepartmentName("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteExamCategoryDeptAssignAPI(rowId)
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
    let handleUpdate = async (id, categoryId, departmentId, examinationCategoryName, departmentName, userId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "categoryId": categoryId,
            "departmentId": departmentId,
            "userId": userId,
        }))
        seteditCategoryName(examinationCategoryName);
        seteditDepartmentName(departmentName);

    }




    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationExaminationCategoryDepartmentAssign(sendForm.categoryId, sendForm.departmentId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutExamCategoryDeptAssignAPI(sendForm)
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
        seteditCategoryName("")
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
                            <Heading text= {t("Examination_Category_Department_Assign")} />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="categoryId" className="form-label">{t("Category_Name")}<span className="starMandatory">*</span></label>
                                    {categoryList && <DropdownWithSearch defaulNname= {t("Select_Category")}  name="categoryId" list={categoryList} valueName="id" displayName="examinationCategoryName" editdata={editCategoryName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="departmentId" className="form-label">{t("Department_Name")}<span className="starMandatory">*</span></label>
                                    {departmentList && <DropdownWithSearch defaulNname= {t("Select_Department")} name="departmentId" list={departmentList} valueName="id" displayName="departmentName" editdata={editDepartmentName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
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
                                <Heading text={t("Examination_Category_Department_List")}/>
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
                                            <th> {t("Category_Name")}</th>
                                            <th>{t("Department_Name")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {examinationCategoryDepartmentList && examinationCategoryDepartmentList.map((val, ind) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.examinationCategoryName}</td>
                                                    <td>{val.departmentName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.categoryId, val.departmentId, val.examinationCategoryName, val.departmentName, val.userId) }}><img src={IconEdit} alt='' /></div>
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
