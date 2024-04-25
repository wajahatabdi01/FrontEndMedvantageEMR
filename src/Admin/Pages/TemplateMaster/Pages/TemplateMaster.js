

import React, { useState } from 'react'
import { t } from 'i18next';
import Search from '../../../../Code/Serach';
import { useEffect } from 'react';
import saveButtonIcon from '../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../../assets/images/icons/edit.svg';
import Toster from '../../../../Component/Toster';
import TosterUnderProcess from '../../../../Component/TosterUnderProcess';
import Heading from '../../../../Component/Heading';
import BoxContainer from '../../../../Component/BoxContainer';
import TableContainer from '../../../../Component/TableContainer';
import SuccessToster from '../../../../Component/SuccessToster';
import AlertToster from '../../../../Component/AlertToster';
import Loader from '../../../../Component/Loader';
import DropdownWithSearch from '../../../../Component/DropdownWithSearch';
import GetNotesTittle from '../API/GetNotesTittle';
import GetAllTemplateMaster from '../API/GetAllTemplateMaster';
import PostTemplateMaster from '../API/PostTemplateMaster';
import DeleteTemplateMaster from '../API/DeleteTemplateMaster';
import PutTemplateMaster from '../API/PutTemplateMaster';
import TextEditor from '../../../../Component/TextEditor';

export default function TemplateMaster() {



    let [templateMasterList, setTemplateMasterList] = useState([])
    let [templateMasterSearch, setTemplateMasterSearch] = useState([])
    let [notesTittleList, setNotesTittleList] = useState([])
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [updateBool, setUpdateBool] = useState(0);
    let [rowId, setRowId] = useState(0);
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editTemplate, setEditTemplate] = useState("")
    let [templateText, setTemplateText] = useState();
    const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
    const [isUrgent, setIsUrgent] = useState(0);
    const [checkBox, setCheckbox] = useState(0);

    let [sendForm, setSendForm] = useState({
        "userId": window.userId,
        "clientId": window.clientId,
        "tittle": '',
        "subTittle": '',
        "body": '',
        // "isShared": 0
    })

    let handleChange = (e) => {
        clearValidationErrMessage();
        let name = e.target.name;
        let value = e.target.value;
        setEditTemplate("")
        if (name === "body") {
            setTemplateText(e.target.value);
        }

        const newValue = e.target.checked ? 1 : 0; // If checkbox is checked, set to 1, else set to 0
        console.log("newValue", newValue)
        setIsUrgent(newValue); // Update state
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))


    }

    const getdata = async () => {
        setShowLoder(1);
        const response = await GetAllTemplateMaster(clientID);
        if (response.status === 1) {
            setTemplateMasterList(response.responseValue);
            setTemplateMasterSearch(response.responseValue);
            setShowLoder(0)
        }
        else {
            setShowLoder(0);
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
            setTimeout(() => {
                setShowAlertToster(0);
            }, 1500)
        }
    }


    const getTemplate = async () => {
        setShowLoder(1);
        try {
            const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
            const response = await GetNotesTittle(clientID);
            if (!response) {
                console.error("Empty response received from GetConsentMaster API.");
                return;
            }
            if (response.status === 1) {
                setNotesTittleList(response.responseValue);
                setShowLoder(0);
            } else {
                setShowLoder(0);
                setShowAlertToster(1);
                setShowErrMessage(response.responseValue);
                setTimeout(() => {
                    setShowAlertToster(0);
                }, 1500);
            }
        } catch (error) {
            console.error("Error in getdata:", error);
            setShowLoder(0);
            // setShowAlertToster(1);
            // setShowErrMessage("No data available.");
            setTimeout(() => {
                // setShowAlertToster(0);
            }, 1500);
        }
    };

    let handleSearch = (e) => {
        let resp = Search(templateMasterSearch, e.target.value)
        if (e.target !== "") {
            if (resp.length !== 0) {
                setTemplateMasterList(resp)
            }
            else {
                setTemplateMasterList([])
            }
        }
        else {
            setTemplateMasterList(templateMasterSearch)
        }
    }

    const handlerSave = async () => {
        if (sendForm.tittle === '' || sendForm.tittle === 0 || sendForm.tittle === null || sendForm.tittle === undefined) {
            document.getElementById('errtittle').innerHTML = "Please select Tittle";
            document.getElementById('errtittle').style.display = "block";
        }
        else if (sendForm.body === '' || sendForm.body === null || sendForm.body === undefined) {
            document.getElementById('errbody').innerHTML = "Template Text is required";
            document.getElementById('errbody').style.display = "block";
        }

        else {
            setShowUnderProcess(1);
            const obj = {
                "tittle": sendForm.tittle,
                "subTittle": sendForm.subTittle,
                "body": sendForm.body,
                "clientId": clientID,
                "userId": window.userId,
                "isShared": isUrgent
            }
            const response = await PostTemplateMaster(obj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully..");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear();
                    getdata();

                }, 1500)
            }
            else {
                setShowUnderProcess(0);
                setTosterValue(1);
                setShowToster(1);
                setTosterMessage(response.responseValue);
                setTimeout(() => {
                    setShowToster(0);
                }, 1500)
            }
        }
    }

    //Handle Button Change
    // let handleUpdate = async (id, title, tittleName, templateText, body, isShared, ind) => {
    
    //   console.log("isShared", isShared);
    //     setUpdateBool(1)
    //     clearValidationErrMessage();
    //     setSendForm(sendForm => ({
    //         ...sendForm,
    //         "id": id,
    //         "tittle": title,
    //         "body": body,
    //         "clientId": clientID,
    //         "userId": window.userId,
    //         "isShared": isShared
    //     }))

    //     console.log("sendForm", sendForm)
    //     document.getElementById("templateText").value = templateText;
    //     setTemplateText(templateText)
    //     setEditTemplate(tittleName)
    //     setIsUrgent(isShared[ind])
    // }
    let handleUpdate =  (data) => {
    
        setUpdateBool(1)
        clearValidationErrMessage();
        setSendForm(sendForm => ({
            ...sendForm,
            "id": data.id,
            "tittle": data.title,
            "subTittle": data.subTittle,
            "body": data.body,
            "clientId": data.clientId,
            "userId": data.userId,
            "isShared": data.isShared
        }))

        console.log("sendForm", sendForm)
        // document.getElementById("templateText").value = templateText;
        setTemplateText(data.body)
        setEditTemplate(data.tittleName)
        setIsUrgent(data.isShared)
        document.getElementById('subTittle').value= data.subTittle;
    }


    // Handle Update
    const handlerUpdate = async () => {
        if (sendForm.tittle === '' || sendForm.tittle === 0 || sendForm.tittle === null || sendForm.tittle === undefined) {
            document.getElementById('errtittle').innerHTML = "Please select Tittle";
            document.getElementById('errtittle').style.display = "block";
        }
        else if (sendForm.body === '' || sendForm.body === null || sendForm.body === undefined) {
            document.getElementById('errbody').innerHTML = "Template Text is required";
            document.getElementById('errbody').style.display = "block";
        }
        else {
            setShowUnderProcess(1);
            const response = await PutTemplateMaster({
                ...sendForm,
            });
            console.log('save Response', response);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Updated Successfully..");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear();
                    getdata();

                }, 1500)
            }
            else {
                setShowUnderProcess(0);
                setTosterValue(1);
                setShowToster(1);
                setTosterMessage(response.responseValue);
                setTimeout(() => {
                    setShowToster(0);
                }, 1500)
            }
        }
    }

    // Handle Delete
    const handleDelete = async () => {
        setShowLoder(1);
        const obj = {
            id: rowId,
            clientId:clientID
        }
        const response = await DeleteTemplateMaster(obj);
        if (response.status === 1) {
            setShowLoder(0)
            setisShowToaster(1);
            setShowSuccessMsg("Deleted Successfully")
            setTimeout(() => {
                setisShowToaster(0);
                getdata();
            }, 1500)
            handleClear();
        }
        else {
            setShowLoder(0);
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
            setTimeout(() => {
                setShowAlertToster(0);
            }, 1500)
        }
    }

    //Clear Error Message
    const clearValidationErrMessage = () => {
        document.getElementById('errtittle').style.display = "none";
        document.getElementById('errbody').style.display = "none";
    }

    //Handle Clear
    const handleClear = (value) => {
        setClearDropdown(value)
        clearValidationErrMessage();
        setUpdateBool(0);
        setSendForm({
            "userId": window.userId,
            "clientId": window.clientId,
            "tittle": '',
            "subTittle": '',
            "body": ''
        })
        setEditTemplate(0)
        document.getElementById("body").value = "";
        document.getElementById('subTittle').value = '';
        setTemplateText('');
        // document.getElementById("templateText").style.height = "100px";
    }

    function stripHtml(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    useEffect(() => {
        getdata();
        getTemplate();
    }, []);
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <Heading text="Template Master" />
                            <div className='inner-content'>
                                <div className='formConsent' style={{ height: '90vh' }}>
                                    <div className="col-md-6 mb-2">
                                        <label htmlFor="tittle" className="form-label">{t("Tittle")} <span className="starMandatory">*</span></label>
                                        {notesTittleList && <DropdownWithSearch defaulNname={t("Select title")} name="tittle" list={notesTittleList} valueName="id" displayName="detailsName" editdata={editTemplate} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                        <small id="errtittle" className="invalid-feedback" style={{ display: 'none' }}></small>
                                    </div>

                                    <div className="col-md-6 mb-2">
                                        <label htmlFor="subTittle" className="form-label">{t("Sub-Tittle")} <span className="starMandatory">*</span></label>
                                        <input type="text" className="form-control form-control-sm" name="subTittle" id="subTittle"  onChange={handleChange} placeholder={t("Enter Sub-Title")} />
                                        <small id="errtittle" className="invalid-feedback" style={{ display: 'none' }}></small>
                                    </div>

                                    <div className="col-md-12 mb-2">
                                        <label htmlFor="body" className="form-label">{t("Body")} <span className="starMandatory">*</span></label>
                                        {/* <textarea rows={3} className="form-control" id="templateText" name="templateText" style={{ height: '100px' }} placeholder={t("Enter template text")} onChange={handleChange}></textarea> */}
                                        <div className='tempEditor'>
                                            <TextEditor getTextvalue={handleChange} setValue={templateText} name="body" id="body" />
                                            {/* <textarea onChange={handleChange} value={templateText} name="body" id="body" ></textarea> */}
                                        </div>

                                        <small id="errbody" className="invalid-feedback" style={{ display: 'none' }}></small>
                                    </div>

                                    <div className="col-md-12 mb-2 risk-factors-check regularCheck">
                                        <input type="checkbox" name='isUrgent' className="me-2 custom-checkbox form-check-input" checked={isUrgent} // Set checked attribute based on state
                                            onChange={handleChange} />Is Shared
                                    </div>

                                    <div className="col-md-6 relative">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                        <div>
                                            {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                                <>
                                                    {showToster === 1 ?
                                                        <Toster value={tosterValue} message={tosterMessage} />

                                                        : <div>
                                                            {updateBool === 0 ?
                                                                <>
                                                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' alt='' />Save</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />Clear</button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>Update</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}>Cancel</button>
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
                        <div className="col-6">
                            <div className='handlser'>
                                <Heading text="Template Master List" />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "89vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Form Title</th>
                                            <th>Form Sub-Title</th>
                                            <th>Template Text</th>
                                            <th>Is Shared</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {templateMasterList && templateMasterList.length > 0 ? (
                                             
                                            templateMasterList.map((val, ind) => (
                                            
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.tittleName}</td>
                                                    <td>{val.subTittle}</td>
                                                    {/* <td>{stripHtml(val.body)}</td> */}
                                                    <td><div dangerouslySetInnerHTML={{ __html:val.body }} style={{ lineHeight: '2px', margin: '0px', padding: '0px', whiteSpace: 'nowrap' }}/></td>
                                                    <td>{val.isShared === 1 ? 'Yes' : 'No'}</td>
                                                    {/* <td>{convertHtmlToText(val.templateText)}</td> */}
                                                    <td>
                                                  
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom">
                                                           
                                                                {/* <img src={editBtnIcon} className="" alt="" onClick={() => { handleUpdate(val.id, val.title, val.tittleName, val.body, val.isShared, ind);}} /> */}
                                                                <img src={editBtnIcon} className="" alt="" onClick={()=>handleUpdate(val,ind)} />
                                                            </div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal">
                                                                <img src={deleteBtnIcon} className="" alt="" onClick={() => { setRowId(val.id); }} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'>Delete?</div>
                                                <div className='popDeleteContent'>Are you sure want to delete?</div>
                                            </div>
                                            <div className="modal-footer1 text-center">
                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

                            </div>
                        </div>
                    </div>
                </div>
                {
                    showLoder === 1 ? <Loader val={showLoder} /> : ""
                }
                {/* Toaster */}
                {
                    isShowToaster === 1 ?
                        <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
                }

                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }
            </section>
        </>
    )
}
