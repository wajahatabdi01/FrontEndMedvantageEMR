import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationExaminationSubCategoryParameterAssign from '../../../Validation/SuperAdmin/Master/ValidationExaminationSubCategoryParameterAssign'
import PostExaminationSubCategoryParameterAssign from '../../Api/Master/ExaminationSubCategoryParameterAssign/PostExaminationSubCategoryParameterAssign'
import GetExaminationSubCategoryParameterAssign from '../../Api/Master/ExaminationSubCategoryParameterAssign/GetExaminationSubCategoryParameterAssign'
import GetExaminationSubCategory from '../../Api/Master/ExaminationSubCategory/GetExaminationSubCategory'
import GetExaminationParameterMaster from '../../Api/Master/ExaminationParameterMaster/GetExaminationParameterMaster'
import DeleteExaminationSubCategoryParameterAssign from '../../Api/Master/ExaminationSubCategoryParameterAssign/DeleteExaminationSubCategoryParameterAssign'
import PutExaminationSubCategoryParameterAssign from '../../Api/Master/ExaminationSubCategoryParameterAssign/PutExaminationSubCategoryParameterAssign'
import GetProblemList from '../../Api/Master/ExaminationSubCategoryParameterAssign/GetProblemList'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function ExaminationSubCategoryParameterAssign() {
    let [examSubCatList, setExamSubCatList] = useState()
    let [subCategoryList, setSubCategoryList] = useState()
    let [parameterList, setParameterList] = useState()
    let [problemList, setProblemList] = useState()
    // let [problemListTemp, setProblemListTemp] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editProblem, setEditProblem] = useState("")
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
        let valresponse = ValidationExaminationSubCategoryParameterAssign(sendForm.subCategoryId, sendForm.parameterId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostExaminationSubCategoryParameterAssign(sendForm);
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
        let getResponse = await GetExaminationSubCategoryParameterAssign();
        let getSubCategory = await GetExaminationSubCategory();
        let getParameter = await GetExaminationParameterMaster();
        let getProblem = await GetProblemList()
        if (getResponse.status === 1) {
            setExamSubCatList(getResponse.responseValue)
            setSubCategoryList(getSubCategory.responseValue)
            setParameterList(getParameter.responseValue)
            setProblemList(getProblem.responseValue)
            // setProblemListTemp(getProblem.responseValue)
        }

    }


    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditSubCategory("")
        setEditParameter("")
        setEditProblem("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteExaminationSubCategoryParameterAssign(rowId)
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
    let handleUpdate = async (id, subCategoryId, parameterId, abnormalSymptomID, userId, subCategoryName, parameterName, problemName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "subCategoryId": subCategoryId,
            "parameterId": parameterId,
            "abnormalSymptomID": abnormalSymptomID,
            "userId": userId,
        }))
        setEditSubCategory(subCategoryName)
        setEditParameter(parameterName)
        setEditProblem(problemName)
        document.getElementById("subCategoryId").value = subCategoryId;
        document.getElementById("parameterId").value = parameterId;
        // document.getElementById("abnormalSymptomID").value = abnormalSymptomID;
    }

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationExaminationSubCategoryParameterAssign(sendForm.subCategoryId, sendForm.parameterId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutExaminationSubCategoryParameterAssign(sendForm)
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
        setEditSubCategory("")
        setEditParameter("")
        setEditProblem("")
        // document.getElementById("subCategoryId").value = 0;
        // document.getElementById("parameterId").value = 0;
        // document.getElementById("abnormalSymptomID").value = 0;
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
                            <Heading text= {t("Examination_Sub_Category_Parameter_Assign")} />
                            <BoxContainer>

                                <div className="mb-2 me-2">
                                    <label htmlFor="subCategoryId" className="form-label"> {t("Sub_Category")} <span className="starMandatory">*</span></label>
                                    {/* <select name='subCategoryId' id="subCategoryId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {subCategoryList && subCategoryList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.subCategoryName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {subCategoryList && <DropdownWithSearch defaulNname= {t("Select_subcategory")}  name="subCategoryId" list={subCategoryList} valueName="id" displayName="subCategoryName" editdata={editSubCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="parameterId" className="form-label">{t("Parameter")}</label>
                                    {/* <select name='parameterId' id="parameterId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {parameterList && parameterList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.parameterName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {parameterList && <DropdownWithSearch defaulNname= {t("Select_Parameter")}  name="parameterId" list={parameterList} valueName="id" displayName="parameterName" editdata={editParameter} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="abnormalSymptomID" className="form-label"> {t("Select_Symptom")}  </label>
                                    {/* <select name='abnormalSymptomID' id="abnormalSymptomID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example" style={{ width: '250px' }}>
                                        <option value="0">Select</option>
                                        {problemList && problemList.map((val, index) => {
                                            return (
                                                <option key={index} value={val.id}>{val.problemName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {problemList && <DropdownWithSearch defaulNname={t("Select_Symptom")} name="abnormalSymptomID" list={problemList} valueName="id" displayName="problemName" editdata={editProblem} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>

                                {/* <div className="mb-2 me-2">
                                    <label htmlFor="abnormalSymptomID" className="form-label">Symptom </label>
                                    <input type='text' list='abnormalSymptomID' />
                                    <datalist name='abnormalSymptomID' id="abnormalSymptomID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example" style={{ width: '250px' }}>
                                        {problemList && problemList.map((val, index) => {
                                            return (
                                                <option key={index} value={val.id}>{val.problemName}</option>
                                            )
                                        })}
                                    </datalist>
                                </div> */}

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
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}> {t("Cancel")}</button>
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
                                <Heading text= {t("Examination_Sub_Category_Parameter_Assign_List")}/>
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
                                            <th>{t("Sub_Category")}</th>
                                            <th>{t("Parameter")}</th>
                                            <th>{t("Problem")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {examSubCatList && examSubCatList.filter((val) => `${val.subCategoryName} ${val.parameterName} ${val.problemName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.subCategoryName}</td>
                                                    <td>{val.parameterName}</td>
                                                    <td>{val.problemName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.subCategoryId, val.parameterId, val.abnormalSymptomID, val.userId, val.subCategoryName, val.parameterName, val.problemName) }}><img src={IconEdit} alt='' /></div>
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal"> {t("Delete")} </button>
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
