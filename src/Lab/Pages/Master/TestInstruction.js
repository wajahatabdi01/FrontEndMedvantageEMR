import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import ValidationTestInstruction from '../../../Validation/LabService/ValidationTestInstruction'
import PostTestInstruction from '../../Api/TestInstruction/PostTestInstruction'
import GetTestInstruction from '../../Api/TestInstruction/GetTestInstruction'
import DeleteTestInstruction from '../../Api/TestInstruction/DeleteTestInstruction'
import PutTestInstruction from '../../Api/TestInstruction/PutTestInstruction'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function TestInstruction() {
    let [instructionList, setInstructionList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": JSON.parse(sessionStorage.getItem("LoginData")).userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('');

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const { t } = useTranslation();

    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

    

    //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationTestInstruction(sendForm.instructions)

    if (valresponse) {
        setShowUnderProcess(1)
        let response = await PostTestInstruction(sendForm.instructions, userID, clientID);
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
        let getResponse = await GetTestInstruction(clientID);


        if (getResponse.status === 1) {
            // setLoder(0)
            setInstructionList(getResponse.responseValue)

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
    setShowUnderProcess(1)
    let response = await DeleteTestInstruction(rowId)
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
    let handleUpdate = async (id, instructions, UserId) => {
       
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "Id": id,
            "instructions": instructions,
            "UserId": UserId,
        }))

        document.getElementById("instructions").value = instructions;
        //document.getElementById("UserId").value = window.UserId;
    }

    

    // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationTestInstruction(sendForm.instructions)

    if (valresponse) {
        setShowUnderProcess(1)
        let response = await PutTestInstruction(sendForm.instructions, sendForm.Id, userID)
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
        setSendForm({ "userId": userID })
        document.getElementById("instructions").value = "";
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
                    <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Test_Instruction_Master")}</div></div></div>
                        <div className="col-12">
                            
                        <div class="inner-content">
                            <div className='dflex regEqualColums whitebg paddingcustom twocol'>
                                <div className="col-2 mb-2 me-2">
                                    <label htmlFor="instructions" className="form-label">{t("Instructions")}<span className="starMandatory">*</span></label>
                                    <input type="text" name="instructions" id="instructions" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Sample_Name")} />
                                </div>

                                <div className="col-2 mb-2 relative">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <div>
                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                            <>
                                                {showToster === 1 ?
                                                    <Toster value={tosterValue} message={tosterMessage} />

                                                    : <div className='textmbtn'>
                                                        {updateBool === 0 ?
                                                            <>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
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
                            </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <Heading text={t("Test_Instruction_List")} />
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Instructions")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {instructionList && instructionList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.instructions}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.instructions, val.UserId) }}/></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }}/>
                                                            </div>
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
                                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
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
