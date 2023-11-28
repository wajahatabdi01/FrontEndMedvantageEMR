import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationSequenceCodeGeneratorMaster from '../../../Validation/Admin/Master/ValidationSequenceCodeGeneratorMaster'
import PostSequenceCodeGeneratorMaster from '../../Api/Master/SequenceCodeGeneratorMaster/PostSequenceCodeGeneratorMaster'
import GetSequenceCodeGeneratorMaster from '../../Api/Master/SequenceCodeGeneratorMaster/GetSequenceCodeGeneratorMaster'
import DeleteSequenceCodeGeneratorMaster from '../../Api/Master/SequenceCodeGeneratorMaster/DeleteSequenceCodeGeneratorMaster'
import PutSequenceCodeGeneratorMaster from '../../Api/Master/SequenceCodeGeneratorMaster/PutSequenceCodeGeneratorMaster'
import Search from '../../../Code/Serach'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function SequenceCodeGeneratorMaster() {
    let [sequenceCodeGeneratorList, setSequenceCodeGeneratorList] = useState()
    let [sequenceCodeGeneratorListMain, setSequenceCodeGeneratorListMain] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0);
    const {t} = useTranslation();

    function reformatDateString(s) {
        var b = s.split(/\D/);
        return b.reverse().join('-');
    };

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationSequenceCodeGeneratorMaster(sendForm.sequenceCode, sendForm.preSample, sendForm.postSample, sendForm.currentSequence, sendForm.sequenceType, sendForm.sequenceYear, sendForm.sequenceDate)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostSequenceCodeGeneratorMaster(sendForm);
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
    };

    //Get data
    let getdata = async () => {
        let getResponse = await GetSequenceCodeGeneratorMaster();
        if (getResponse.status === 1) {
            setSequenceCodeGeneratorList(getResponse.responseValue)
            setSequenceCodeGeneratorListMain(getResponse.responseValue)
        }
    };
    //Handle Search
    let handleSearch = (e) => {
        let resp = Search(sequenceCodeGeneratorListMain, e.target.value)
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setSequenceCodeGeneratorList(resp)
            }
            else {
                setSequenceCodeGeneratorList([])

            }
        }
        else {
            setSequenceCodeGeneratorList(sequenceCodeGeneratorListMain)
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
            autoID: rowId
        }
        let response = await DeleteSequenceCodeGeneratorMaster(obj)
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
    let handleUpdate = async (autoID, sequenceCode, preSample, preSample1, currentSequence, sequenceType, sequenceYear, sequenceDate, description, userId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "autoID": autoID,
            "sequenceCode": sequenceCode,
            "preSample": preSample,
            "postSample": preSample1,
            "currentSequence": currentSequence,
            "sequenceType": sequenceType,
            "sequenceYear": sequenceYear,
            "sequenceDate": reformatDateString(sequenceDate),
            "description": description,
            "userId": userId,
        }))

        document.getElementById("sequenceCode").value = sequenceCode;
        document.getElementById("preSample").value = preSample;
        document.getElementById("postSample").value = preSample1;
        document.getElementById("currentSequence").value = currentSequence;
        document.getElementById("sequenceType").value = sequenceType;
        document.getElementById("sequenceYear").value = sequenceYear;
        document.getElementById("sequenceDate").value = reformatDateString(sequenceDate);
        document.getElementById("description").value = description;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationSequenceCodeGeneratorMaster(sendForm.sequenceCode, sendForm.preSample, sendForm.postSample, sendForm.currentSequence, sendForm.sequenceType, sendForm.sequenceYear, sendForm.sequenceDate)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutSequenceCodeGeneratorMaster(sendForm)
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
        document.getElementById("sequenceCode").value = "";
        document.getElementById("preSample").value = "";
        document.getElementById("postSample").value = "";
        document.getElementById("currentSequence").value = "";
        document.getElementById("sequenceType").value = "";
        document.getElementById("sequenceYear").value = "";
        document.getElementById("sequenceDate").value = "";
        document.getElementById("description").value = "";
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
                            <Heading text={t("Sequence_Code_Generator_Master")} />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="sequenceCode" className="form-label">{t("Sequence_Code")}<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="sequenceCode" name='sequenceCode' onChange={handleChange} placeholder={t("Enter_Sequence_Code")} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="preSample" className="form-label">{t("Pre_Sample")}<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="preSample" name='preSample' onChange={handleChange} placeholder={t("Enter_Pre_Sample")} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="postSample" className="form-label">{t("Post_Sample")} <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="postSample" name='postSample' onChange={handleChange} placeholder={t("Enter_Post_Sample")} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="currentSequence" className="form-label">{t("Current_Sequence")} <span className="starMandatory">*</span></label>
                                    <input type="number" className="form-control form-control-sm" id="currentSequence" name='currentSequence' onChange={handleChange} placeholder={t("Enter_Current_Sequence")} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="sequenceType" className="form-label">{t("Sequence_Type")}<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="sequenceType" name='sequenceType' onChange={handleChange} placeholder={t("Enter_Sequence_Type")}/>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="sequenceYear" className="form-label">{t("Sequence_Year")}<span className="starMandatory">*</span></label>
                                    <input type="number" className="form-control form-control-sm" id="sequenceYear" name='sequenceYear' onChange={handleChange} placeholder= {t("Enter_Sequence_Year")}/>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="sequenceDate" className="form-label">{t("Sequence_Date")}<span className="starMandatory">*</span></label>
                                    <input type="date" className="form-control form-control-sm" id="sequenceDate" name='sequenceDate' onChange={handleChange} placeholder="Sequence Date" />
                                </div>
                                {/* <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="sequenceDate" className="form-label">Installation Date<span className="starMandatory">*</span></label>
                                    <input type="date" className="form-control form-control-sm" name="sequenceDate" id='' placeholder="Enter Installation Date" onChange={handleChange} />

                                </div> */}
                                <div className="mb-2 me-2">
                                    <label htmlFor="description" className="form-label">{t("Description")}</label>
                                    <input type="text" className="form-control form-control-sm" id="description" name='description' onChange={handleChange} placeholder={t("Enter_Description")} />
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
                                <Heading text={t("Sequence_Code_Generator_List")}/>
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
                                            <th>{t("Sequence_Code")}</th>
                                            <th>{t("Pre_Sample")}</th>
                                            <th>{t("Post_Sample")}</th>
                                            <th>{t("Current_Sequence")}</th>
                                            <th>{t("Sequence_Type")}</th>
                                            <th>{t("Sequence_Year")}</th>
                                            <th>{t("Sequence_Date")}</th>
                                            <th>{t("Description")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sequenceCodeGeneratorList && sequenceCodeGeneratorList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.sequenceCode}</td>
                                                    <td>{val.preSample}</td>
                                                    <td>{val.preSample1}</td>
                                                    <td>{val.currentSequence}</td>
                                                    <td>{val.sequenceType}</td>
                                                    <td>{val.sequenceYear}</td>
                                                    <td>{val.sequenceDate}</td>
                                                    <td>{val.description}</td>
                                                    <td>
                                                        {/* <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.autoID, val.sequenceCode, val.preSample, val.preSample1, val.currentSequence, val.sequenceType, val.sequenceYear, val.sequenceDate, val.description, val.userId) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.autoID) }}></i>
                                                            </div>
                                                        </div> */}
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.autoID, val.sequenceCode, val.preSample, val.preSample1, val.currentSequence, val.sequenceType, val.sequenceYear, val.sequenceDate, val.description, val.userId) }}><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} className='' alt='' onClick={() => { setRowId(val.autoID) }} /></div>
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
