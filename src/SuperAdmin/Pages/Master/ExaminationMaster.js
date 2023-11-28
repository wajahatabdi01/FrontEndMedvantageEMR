import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import ValidationExaminationMaster from '../../../Validation/SuperAdmin/Master/ValidationExaminationMaster'
import PostExaminationMaster from '../../Api/Master/ExaminationMaster/PostExaminationMaster'
import GetExaminationMaster from '../../Api/Master/ExaminationMaster/GetExaminationMaster'
import DeleteExaminationMaster from '../../Api/Master/ExaminationMaster/DeleteExaminationMaster'
import PutExaminationMaster from '../../Api/Master/ExaminationMaster/PutExaminationMaster'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'

import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function ExaminationMaster() {
    let [examCategoryList, setExamCategoryList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    let [rowId, setRowId] = useState('');

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');


    const {t} = useTranslation();


    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };



    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationExaminationMaster(sendForm.examinationCategoryName)
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostExaminationMaster(sendForm);
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
        let getResponse = await GetExaminationMaster();
        console.log("dadadad", getResponse)
        if (getResponse.status === 1) {
            setLoder(0)
            setExamCategoryList(getResponse.responseValue)
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
        setLoder(1)
        let response = await DeleteExaminationMaster(rowId)
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
    let handleUpdate = async (id, examinationCategoryName, remark, userId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "examinationCategoryName": examinationCategoryName,
            "remark": remark,
            "userId": window.userId,

        }))

        document.getElementById("examinationCategoryName").value = examinationCategoryName;
        document.getElementById("remark").value = remark;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationExaminationMaster(sendForm.examinationCategoryName)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutExaminationMaster(sendForm)
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
        document.getElementById("examinationCategoryName").value = "";
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
                            <Heading text= {t("Examination_Category_Master")} />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="examinationCategoryName" className="form-label">{t("Category_Name")} <span className="starMandatory">*</span></label>
                                    <input type="text" name="examinationCategoryName" id="examinationCategoryName" onChange={handleChange} className="form-control form-control-sm" placeholder= {t("Enter_Category_Name")} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="remark" className="form-label">{t("Remark")}</label>
                                    <input type="text" name="remark" id="remark" onChange={handleChange} className="form-control form-control-sm" placeholder=  {t("Remarks")}/>
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
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
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
                                <Heading text= {t("Examination_Category_List")}/>
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
                                            <th> {t("Examination_Category_Name")}</th>
                                            <th>{t("Remark")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {examCategoryList && examCategoryList.filter((val) => `${val.examinationCategoryName} ${val.remark}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.examinationCategoryName}</td>
                                                    <td>{val.remark}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.examinationCategoryName, val.remark, val.userId) }}><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(val.id) }} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
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
