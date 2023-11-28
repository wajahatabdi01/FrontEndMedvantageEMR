import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationTestSubTestMapping from '../../../Validation/LabService/ValidationTestSubTestMapping'
import PostTestSubTestMapping from '../../Api/TestSubTestMapping/PostTestSubTestMapping'
import GetTestSubTestMapping from '../../Api/TestSubTestMapping/GetTestSubTestMapping'
import GetTestMaster from '../../Api/TestMaster/GetTestMaster'
import GetSubTestMaster from '../../Api/SubTestMaster/GetSubTestMaster'
import DeleteTestSubTestMapping from '../../Api/TestSubTestMapping/DeleteTestSubTestMapping'
import PutTestSubTestMapping from '../../Api/TestSubTestMapping/PutTestSubTestMapping'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function TestSubTestMapping() {

    let [testSubTestList, setTestSubTestList] = useState()
    let [testList, setTestList] = useState()
    let [subTestList, setSubTestList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": JSON.parse(sessionStorage.getItem("LoginData")).userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const { t } = useTranslation();

    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationTestSubTestMapping(sendForm.testId, sendForm.subTestId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostTestSubTestMapping(sendForm.testId, sendForm.subTestId, userID, clientID);
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
        let getResponse = await GetTestSubTestMapping(clientID);
        let getTest = await GetTestMaster(clientID);
        let getSubTest = await GetSubTestMaster(clientID);
        
            setTestSubTestList(getResponse.responseValue)
            setTestList(getTest.responseValue)
            setSubTestList(getSubTest.responseValue)
        

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
        let response = await DeleteTestSubTestMapping(rowId)
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
    let handleUpdate = async (id, testId, subTestId, userId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "testId": testId,
            "subTestId": subTestId,
            "userId": userId,
        }))

        document.getElementById("testId").value = testId;
        document.getElementById("subTestId").value = subTestId;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationTestSubTestMapping(sendForm.testId, sendForm.subTestId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutTestSubTestMapping(sendForm.testId, sendForm.subTestId, sendForm.Id, userID)
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
        document.getElementById("testId").value = 0;
        document.getElementById("subTestId").value = 0;
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
                    <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Test_Sub_Test_Mapping")}</div></div></div>
                        <div className="col-12">
                            
                        <div class="inner-content">
                          <div className='dflex regEqualColums whitebg paddingcustom twocol'>
                                <div className="col-2 mb-2 me-2">
                                    <label htmlFor="testId" className="form-label">{t("TEST")}<span className="starMandatory">*</span></label>
                                    <select name='testId' id="testId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">{t("SELECT")}</option>
                                        {testList && testList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.testname}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-2 mb-2 me-2">
                                    <label htmlFor="subTestId" className="form-label">{t("Sub_Test")} <span className="starMandatory">*</span></label>
                                    <select name='subTestId' id="subTestId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">{t("SELECT")}</option>
                                        {subTestList && subTestList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.subTestName}</option>
                                            )
                                        })}
                                    </select>
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
                            <Heading text={t("Test_Sub_Test_Mapping_List")} />
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("testNamePlaceholder")}</th>
                                            <th>{t('Sub_Test_Name')}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {testSubTestList && testSubTestList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td >{val.testname}</td>
                                                    <td >{val.subtestname}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.testId, val.subTestId, val.userId) }}/></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }}/>
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
