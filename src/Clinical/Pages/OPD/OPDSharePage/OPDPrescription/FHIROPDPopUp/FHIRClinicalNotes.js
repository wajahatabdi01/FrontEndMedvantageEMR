import React, { useEffect, useState } from 'react'
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import GetUserListByRoleId from '../../../../../../Registartion/API/GET/GetUserListByRoleId';
import { t } from 'i18next';
import GetAllFHIRMessageTypeMaster from '../../../../../../Admin/Pages/FHIRAdmin/Api/FHIRMessageTypeMaster/GetAllFHIRMessageTypeMaster';
import InsertFHIRMessage from '../../../../../API/OPDPatientMessage/InsertFHIRMessage';
import GetFHIRMessage from '../../../../../API/OPDPatientMessage/GetFHIRMessage';
import deleteBtnIcon from '../../../../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../../../../assets/images/icons/edit.svg';
import TableContainer from '../../../../../../Component/TableContainer';
import TosterUnderProcess from '../../../../../../Component/TosterUnderProcess';
import Toster from '../../../../../../Component/Toster';
import PutFHIRMessage from '../../../../../API/OPDPatientMessage/PutFHIRMessage';
import Heading from '../../../../../../Component/Heading';
import DeleteFHIRMessage from '../../../../../API/OPDPatientMessage/DeleteFHIRMessage';
import Loader from '../../../../../../Component/Loader';
import SuccessToster from '../../../../../../Component/SuccessToster';
import AlertToster from '../../../../../../Component/AlertToster';
import InsertClinicalNotesForm from '../../../../../API/FHIRClinicalNotes/InsertClinicalNotesForm';
function FHIRClinicalNotes() {
    let [providerList, setProviderList] = useState([]);
    let [messageTypeList, setMessageTypeList] = useState([]);
    let [messageList, setMessageList] = useState([]);
    const [divs, setDivs] = useState([{
        rowID: 1
    }]);
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
    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
    let [showMessage, setShowMessage] = useState(1)
    let [sendForm, setSendForm] = useState({
        form_id: 0,
        code: '',
        codetext: '',
        description: '',
        clinical_notes_type: 0,
        clinical_notes_category: 0,
        note_related_to: '',
        date: '',
        jsonFormClinicalNotes: '[]',
    })

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        const date=e.target.value
        console.log("Date",date)
        if (name === "date") {
            setDivs([{
                ...divs,
                date: value
            }]);
            clearValidationErrMessage();
        } 
    }


    const handleAddBtnChange = async (e, index) => {
        const { name, value } = e.target;
        const updatedDivs = [...divs];
        updatedDivs[index][name] = value;
        setDivs(updatedDivs);

        const jsonFormClinicalNotes = JSON.stringify(divs);
        console.log(jsonFormClinicalNotes);
        setSendForm((prevData) => ({
            ...prevData,
            jsonFormClinicalNotes: jsonFormClinicalNotes
        }))
    };

    const handleAddDiv = (value) => {
        clearValidationErrMessage()
        const getRowId = divs.length + 1;
        setDivs([...divs,
        {
            rowID: getRowId
        }]);
    };

    const handleRemoveDiv = (index) => {
        const notesList = divs;
        notesList.splice(index, 1)
        setDivs([...notesList]);

        // const updatedDivs = [...divs];
        // updatedDivs.splice(index, 1);
        // setDivs(updatedDivs);
    };

    //Get MessageType
    const getpatientMessageType = async () => {
        const response = await GetAllFHIRMessageTypeMaster()
        if (response.status === 1) {
            setMessageTypeList(response.responseValue)
        }
    }
    //Get Provider
    const getUserListByRoleId = async () => {
        const param = {
            roleId: 2,
            clientID: window.clientId,
        }
        const response = await GetUserListByRoleId(param)
        if (response.status === 1) {
            setProviderList(response.responseValue)
        }
    }

    //getPatient Message by uhid and clientId
    const patientMessage = async () => {
        const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
        const getResponse = await GetFHIRMessage({ Uhid: activeUHID, ClientId: clientID });
        if (getResponse.status === 1) {
            setMessageList(getResponse.responseValue.responseValue);
        }
    }

    //Handle Save
    const handlerSave = async () => {
        if (divs.date === '' || divs.date === null || divs.date === undefined || divs.date === 0 || divs.date === "0") {
            document.getElementById('errDate').innerHTML = "Select date";
            document.getElementById('errDate').style.display = "block";
        }
        else if (divs.clinical_notes_type === '' || divs.clinical_notes_type === null || divs.clinical_notes_type === undefined || divs.clinical_notes_type === 0 || divs.clinical_notes_type === "0") {
            document.getElementById('errType').innerHTML = "Select notes type";
            document.getElementById('errType').style.display = "block";
        }
        else if (divs.clinical_notes_category === '' || divs.clinical_notes_category === null || divs.clinical_notes_category === undefined || divs.clinical_notes_category === 0 || divs.clinical_notes_category === "0") {
            document.getElementById('errCategory').innerHTML = "select category type";
            document.getElementById('errCategory').style.display = "block";
        }
        else if (divs.note_related_to === '' || divs.note_related_to.trim().length === 0 || divs.note_related_to === null || divs.note_related_to === undefined) {
            document.getElementById('errNarrative').innerHTML = "Enter narrative";
            document.getElementById('errNarrative').style.display = "block";
        }
        else {
            const notesList = divs;
            let tempArr = [];
            console.log('notesList', notesList);
            for (var i = 0; i < notesList.length; i++) {
                const getNotesDate = document.getElementById("notesDate" + notesList[i].rowID).value;
                const getNotesType = document.getElementById("typeId" + notesList[i].rowID).value;
                const getNotesCategory = document.getElementById("providerId" + notesList[i].rowID).value;
                const getNotesDescription = document.getElementById("note_related_to" + notesList[i].rowID).value;
                tempArr.push({
                    // id: notesList[i].rowID,
                    id: 0,
                    form_id: 0,
                    code: '',
                    codetext: '',
                    description: '',
                    date: getNotesDate,
                    clinical_notes_type: getNotesType,
                    clinical_notes_category: getNotesCategory,
                    note_related_to: getNotesDescription
                })
            }
            console.log('tempArr', tempArr)
            let obj = {
                uhid: activeUHID,
                clientId: clientID,
                userId: window.userId,
                jsonFormClinicalNotes: JSON.stringify(tempArr)
            }
            console.log(obj);
            // return;
            const response = await InsertClinicalNotesForm(obj);
            setShowUnderProcess(1);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully.");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear();
                }, 1500)
                patientMessage();
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

    //Change handle button
    let handleUpdate = async (id, providerId, typeId, description) => {
        setUpdateBool(1)
        clearValidationErrMessage();
        console.log("description", description)
        setShowMessage(0)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "providerId": providerId,
            "typeId": typeId,
            "description": description,
            "clientId": clientID,
            "userId": window.userId
        }))
    }

    //Handle Update
    const handlerUpdate = async () => {
        // clearValidationErrMessage();    
        if (divs.note_related_to === '' || divs.note_related_to.trim().length === '' || divs.note_related_to === null || divs.note_related_to === undefined) {
            document.getElementById('errMessage').innerHTML = "Message can't be blank";
            document.getElementById('errMessage').style.display = "block";
        } else {
            if (divs.clinical_notes_type !== 0 && divs.clinical_notes_type !== "0") {
                if (divs.clinical_notes_category !== 0 && divs.clinical_notes_category !== "0") {
                    setShowUnderProcess(1);
                    const response = await PutFHIRMessage({
                        ...sendForm,
                    });

                    if (response.status === 1) {
                        setShowUnderProcess(0);
                        setTosterValue(0);
                        setShowToster(1);
                        setTosterMessage("Updated Successfully..");
                        setTimeout(() => {
                            setShowToster(0);
                            handleClear();
                        }, 1500);
                        patientMessage();
                    } else {
                        setShowUnderProcess(0);
                        setTosterValue(1);
                        setShowToster(1);
                        setTosterMessage(response.responseValue);
                        setTimeout(() => {
                            setShowToster(0);
                        }, 1500);
                    }
                } else {
                    document.getElementById('errProvider').innerHTML = "Select provider";
                    document.getElementById('errProvider').style.display = "block";
                }
            } else {
                document.getElementById('errType').innerHTML = "Select message type";
                document.getElementById('errType').style.display = "block";
            }
        }
    };


    //Handle Delete
    let handleDeleteRow = async (id) => {
        var obj = {
            "id": id,
        }
        let response = await DeleteFHIRMessage(obj)
        if (response.status === 1) {
            setShowLoder(0)
            setisShowToaster(1);
            setShowSuccessMsg("Deleted Successfully")
            setShowMessage(1)
            setTimeout(() => {
                setisShowToaster(0);
                patientMessage();
            }, 2000)
            handleClear();
        }
        else {
            setShowLoder(0);
            setShowMessage(1)
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
            setTimeout(() => {
                setShowAlertToster(0);
            }, 2000)
        }
    }

    //Clear Error Message
    const clearValidationErrMessage = () => {

        const errTypeElement = document.getElementById('errDate');
        if (errTypeElement) {
            errTypeElement.style.display = "none";
        }
        const errProviderElement = document.getElementById('errProvider');
        if (errProviderElement) {
            errProviderElement.style.display = "none";
        }
        const errMessageElement = document.getElementById('errMessage');
        if (errMessageElement) {
            errMessageElement.style.display = "none";
        }
    }

    //Handle Clear
    const handleClear = (value) => {
        clearValidationErrMessage();
        setUpdateBool(0);
        setShowMessage(1)
    }

    useEffect(() => {
        getUserListByRoleId();
        getpatientMessageType();
        patientMessage();
    }, []);
    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-12'>
                        <div className='problemhead'>
                            {divs.map((div, index) => (
                                <div className="dflex" key={div.rowID}>
                                    <div className='col-12'>
                                        <div className="row">
                                            <div className="col-4 mb-2">
                                                <label htmlFor="typeId" className="form-label">Date<span className="starMandatory">*</span></label>
                                                <input id={"notesDate" + div.rowID} type="date" className="form-control form-control-sm" name='date' />
                                                <small id="errDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>

                                            <div className="col-4 mb-2">
                                                <label htmlFor="typeId" className="form-label">Type<span className="starMandatory">*</span></label>
                                                <select className="form-select form-select-sm" id={"typeId" + div.rowID} aria-label="form-select-sm example" name='clinical_notes_type'>
                                                    <option value="0">{t("Select Note Type")}</option>
                                                    {messageTypeList && messageTypeList.map((list) => {
                                                        return (
                                                            <option value={list.id}>{list.name}</option>
                                                        )
                                                    })}
                                                </select>
                                                <small id="errType" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="col-4 mb-2">
                                                <label htmlFor="providerId" className="form-label">Category<span className="starMandatory">*</span></label>
                                                <select className="form-select form-select-sm" id={"providerId" + div.rowID} aria-label="form-select-sm example" name='clinical_notes_category' >
                                                    {/* <select className="form-select form-select-sm" id="providerId" aria-label="form-select-sm example" onChange={(e) => handleAddBtnChange(e, index)} name='clinical_notes_category' value={div.clinical_notes_category}> */}
                                                    <option value="0">{t("Select Note Category")}</option>
                                                    {providerList && providerList.map((list) => {
                                                        return (
                                                            <option value={list.id}>{list.name}</option>
                                                        )
                                                    })}
                                                </select>
                                                <small id="errCategory" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className="row">
                                            <div className="col-10 mb-2">
                                                <label htmlFor="description" className="form-label">Narrative<span className="starMandatory">*</span></label>
                                                <textarea className='mt-1 form-control' name='note_related_to' id={"note_related_to" + div.rowID} rows="3" cols="40" style={{ height: '90px' }} ></textarea>
                                                {/* <textarea className='mt-1 form-control' id="description" rows="3" cols="40" style={{ height: '90px' }} onChange={(e) => handleAddBtnChange(e, index)} name='description' value={div.description}></textarea> */}
                                                <small id="errNarrative" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className='col-2'>
                                                {div.rowID === 1 ?

                                                    <button type="button" style={{ marginTop: '70px' }} class="btnaddtnotes" id="addPriviousNames" onClick={() => { handleAddDiv(div) }}><i class="bi bi-plus-lg"></i> Add</button>
                                                    :
                                                    <button type="button" style={{ marginTop: '70px' }} class="btndeltnotes" onClick={() => handleRemoveDiv(index)}><i class="bi bi-trash3"></i></button>
                                                }
                                            </div>
                                            {/* <div className='col-2 mb-2'>
                                                {div.rowID === 1 ?
                                                    <div className="col-md-2 addvisitbtn_ mt-5">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" class="btnaddtnotes" id="addPriviousNames" onClick={() => { handleAddDiv(div) }}><i class="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    :
                                                    <div className="col-md-2 addvisitbtn_ mt-5">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" class="btndeltnotes" onClick={() => handleRemoveDiv(index)}><i class="bi bi-trash3"></i></button>
                                                    </div>
                                                }
                                            </div> */}
                                        </div>
                                    </div>

                                </div>
                            ))}

                            <div className="mb-2 mt-3 relative">
                                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                    {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                        <>
                                            {showToster === 1 ?
                                                <Toster value={tosterValue} message={tosterMessage} />

                                                : <div>
                                                    {updateBool === 0 ?
                                                        <>
                                                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' alt='' />Save</button>
                                                            <button type="button" className="btn btn-clear btn-sm mb-1" data-bs-dismiss="modal" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />Cancel</button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>Update</button>
                                                            <button type="button" className="btn btn-clear btn-sm mb-1"  onClick={"handleClear"}>Cancel</button>
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
            </div>
        </>
    )
}

export default FHIRClinicalNotes
