import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import ValidationExaminationSubCategory from '../../../Validation/SuperAdmin/Master/ValidationExaminationSubCategory'
import PostExaminationSubCategory from '../../Api/Master/ExaminationSubCategory/PostExaminationSubCategory'
import GetExaminationSubCategory from '../../Api/Master/ExaminationSubCategory/GetExaminationSubCategory'
import GetExaminationMaster from '../../Api/Master/ExaminationMaster/GetExaminationMaster'
import DeleteExaminationSubCategory from '../../Api/Master/ExaminationSubCategory/DeleteExaminationSubCategory'
import PutExaminationSubCategory from '../../Api/Master/ExaminationSubCategory/PutExaminationSubCategory'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import Toster from '../../../Component/Toster'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function ExaminationSubCategory() {
    let [examSubCategoruList, setExamSubCategoruList] = useState()
    let [examCategoryList, setExamCategoryList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editExamCategory, setEditExamCategory] = useState("")
    const [searchTerm, setSearchTerm] = useState('');


    const {t} = useTranslation();

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationExaminationSubCategory(sendForm.categoryId, sendForm.subCategoryName)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostExaminationSubCategory(sendForm);
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
        let getResponse = await GetExaminationSubCategory();
        let getExamCategory = await GetExaminationMaster();
        if (getResponse.status === 1) {
            setLoder(0)
            setExamSubCategoruList(getResponse.responseValue)
            setExamCategoryList(getExamCategory.responseValue)
        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditExamCategory("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteExaminationSubCategory(rowId)
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
    let handleUpdate = async (id, categoryId, subCategoryName, remark, userId, examinationCategoryName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "categoryId": categoryId,
            "subCategoryName": subCategoryName,
            "remark": remark,
            "userId": userId,
        }))
        setEditExamCategory(examinationCategoryName)
        // document.getElementById("categoryId").value = categoryId;
        document.getElementById("subCategoryName").value = subCategoryName;
        document.getElementById("remark").value = remark;
    }

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationExaminationSubCategory(sendForm.categoryId, sendForm.subCategoryName)
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutExaminationSubCategory(sendForm)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Updated SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)

                }, 2000)
                getdata()
                setUpdateBool(0)
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
        setEditExamCategory("")
        // document.getElementById("categoryId").value = 0;
        document.getElementById("subCategoryName").value = "";
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
                            <Heading text= {t("Examination_Sub_Category_Master")} />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="categoryId" className="form-label"> {t("Examination_Category_Name")}  <span className="starMandatory">*</span></label>
                                    {/* <select name='categoryId' id="categoryId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {examCategoryList && examCategoryList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.examinationCategoryName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {examCategoryList && <DropdownWithSearch defaulNname= {t("Select_Category")} name="categoryId" list={examCategoryList} valueName="id" displayName="examinationCategoryName" editdata={editExamCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="subCategoryName" className="form-label">{t("Examination_Sub_Category_Name")}<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="subCategoryName" name="subCategoryName" placeholder=  {t("Sub_Category_Name")} onChange={handleChange} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="remark" className="form-label">{t("Remark")}</label>
                                    <input type="text" className="form-control form-control-sm" id="remark" name="remark" placeholder= {t("Remarks")}  onChange={handleChange} />
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
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' /> {t("Save")}</button>
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
                        <div className="col-12 mt-2">
                            <div className='handlser'>
                                <Heading text= {t("Examination_Sub_Category_List")}/>
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder= {t("Search")} value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Examination_Category_Name")}</th>
                                            <th>{t("Examination_Sub_Category_List")}</th>
                                            <th>{t("Remark")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {examSubCategoruList && examSubCategoruList.filter((val) => `${val.examinationCategoryName} ${val.subCategoryName} ${val.remark}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.examinationCategoryName}</td>
                                                    <td>{val.subCategoryName}</td>
                                                    <td>{val.remark}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.categoryId, val.subCategoryName, val.remark, val.userId, val.examinationCategoryName) }}><img src={IconEdit} alt='' /></div>
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
        </>
    )
}
