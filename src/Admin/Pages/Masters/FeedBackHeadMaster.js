import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationFeedBackHeadMaster from '../../../Validation/Admin/Master/ValidationFeedBackHeadMaster'
import PostFeedBackHeadMaster from '../../Api/Master/FeedBackHeadMaster/PostFeedBackHeadMaster'
import GetFeedBackHeadMaster from '../../Api/Master/FeedBackHeadMaster/GetFeedBackHeadMaster'
import DeleteFeedBackHeadMaster from '../../Api/Master/FeedBackHeadMaster/DeleteFeedBackHeadMaster'
import PutFeedBackHeadMaster from '../../Api/Master/FeedBackHeadMaster/PutFeedBackHeadMaster'
import Search from '../../../Code/Serach'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function FeedBackHeadMaster() {
    let [feedbackHeadList, setFeedbackHeadList] = useState()
    let [feedbackHeadListMain, setFeedbackHeadListMain] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const {t} = useTranslation();

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationFeedBackHeadMaster(sendForm.feedBackHeadName)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostFeedBackHeadMaster(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save Successfully!")
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
        let getResponse = await GetFeedBackHeadMaster();
        if (getResponse.status === 1) {
            setFeedbackHeadList(getResponse.responseValue)
            setFeedbackHeadListMain(getResponse.responseValue)
        }
    }
    //Handle Search
    let handleSearch = (e) => {
        let resp = Search(feedbackHeadListMain, e.target.value)
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setFeedbackHeadList(resp)
            }
            else {
                setFeedbackHeadList([])

            }
        }
        else {
            setFeedbackHeadList(feedbackHeadListMain)
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
        setShowUnderProcess(1);
        let obj = {
            id: rowId
        }
        let response = await DeleteFeedBackHeadMaster(obj)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted Successfully!")
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
    let handleUpdate = async (id, feedBackHeadName, userId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "feedBackHeadName": feedBackHeadName,
            "userId": userId,
        }))

        document.getElementById("feedBackHeadName").value = feedBackHeadName;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationFeedBackHeadMaster(sendForm.feedBackHeadName)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutFeedBackHeadMaster(sendForm)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Updated Successfully!")
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
        document.getElementById("feedBackHeadName").value = "";
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
                            <Heading text={t("Feedback_Head_Master")} />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="feedBackHeadName" className="form-label">{t("Feedback_Head_Name")}<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="feedBackHeadName" name='feedBackHeadName' onChange={handleChange} placeholder={t("Head_Name")} />
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
                        <div className="col-12 mt-3">
                            <div className='handlser'>
                                <Heading text={t("Feedback_Head_List")} />
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
                                            <th>{t("Feedback_Head_Name")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {feedbackHeadList && feedbackHeadList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.feedBackHeadName}</td>
                                                    <td>
                                                        {/* <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.feedBackHeadName, val.userId) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                                                            </div>
                                                        </div> */}
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.feedBackHeadName, val.userId) }}><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
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
