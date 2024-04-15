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
function OPDPatientMessagePopUp({ theEncounterId }) {
    let [providerList, setProviderList] = useState([]);
    let [messageTypeList, setMessageTypeList] = useState([]);
    let [messageList, setMessageList] = useState([]);
    let [sendForm, setSendForm] = useState({ "typeId": 0, "providerId": 0, "description": '', "userId": window.userId, "clientId": window.clientId })

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
    // let [rowId, setRowId] = useState(0);
    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
    const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];

    const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

    let [showMessage, setShowMessage] = useState(1)

    //Handle Change
    let handleChange = (e) => {
        clearValidationErrMessage();
        let name = e.target.name;
        let value = e.target.value;
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    const handleAddNew = async () => {
        setShowMessage(0);
    }

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
        const getResponse = await GetFHIRMessage({ Uhid: activeUHID, ClientId: clientID, EncounterId: theEncounterId });
        if (getResponse.status === 1) {
            setMessageList(getResponse.responseValue.responseValue);
        }
        else{
            setMessageList([])
        }
    }

    //Handle Save
    const handlerSave = async () => {
        if (sendForm.typeId === '' || sendForm.typeId === null || sendForm.typeId === undefined || sendForm.typeId === 0 || sendForm.typeId === "0") {
            document.getElementById('errType').innerHTML = "Select message type";
            document.getElementById('errType').style.display = "block";
        }
        else if (sendForm.providerId === '' || sendForm.providerId === null || sendForm.providerId === undefined || sendForm.providerId === 0 || sendForm.providerId === "0") {
            document.getElementById('errProvider').innerHTML = "select provider";
            document.getElementById('errProvider').style.display = "block";
        }
        else if (sendForm.description === '' || sendForm.description.trim().length === 0 || sendForm.description === null || sendForm.description === undefined) {
            document.getElementById('errMessage').innerHTML = "Message can't be blank";
            document.getElementById('errMessage').style.display = "block";
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                "uhid": activeUHID,
                "providerId": sendForm.providerId,
                "typeId": sendForm.typeId,
                "description": sendForm.description,
                "clientId": clientID,
                "userId": window.userId,
                doctorId: activeDocID,
                departmentId: activeDeptID
            }
            const response = await InsertFHIRMessage(obj);
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
                setShowErrMessage(response.responseValue);
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
        if (sendForm.description === '' || sendForm.description.trim().length === '' || sendForm.description === null || sendForm.description === undefined) {
            document.getElementById('errMessage').innerHTML = "Message can't be blank";
            document.getElementById('errMessage').style.display = "block";
        } else {
            if (sendForm.typeId !== 0 && sendForm.typeId !== "0") {
                if (sendForm.providerId !== 0 && sendForm.providerId !== "0") {
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
                        setShowErrMessage(response.responseValue);
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

        const errTypeElement = document.getElementById('errType');
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
        setSendForm({ "userId": window.userId, clientId: window.clientId, "typeId": 0, "providerId": 0, 'description': "" })

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
                        {showMessage === 1 ?
                            <div className='msgTbl'>
                                <div className='tbl_Heading'>
                                    <h3>Patient Message List</h3>
                                    <div className='newptmsg'>
                                        <label htmlFor="ddlRelationshipTertiary" className="form-label" onClick={handleAddNew}><i className='fa fa-plus'></i> Add New</label>
                                    </div>
                                </div>

                                <div className="med-table-section msgspantr" style={{ maxHeight: '50vh', minHeight: '30vh', overflow: 'scroll' }}>
                                    <TableContainer>
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ "width": "5%" }}>#</th>
                                                <th>Type</th>
                                                <th>Content</th>
                                                <th>Last Update</th>
                                                <th>Updated By</th>
                                                <th className="text-center">Active</th>
                                                <th>status</th>
                                                <th style={{ "width": "10%" }} className="text-center">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {messageList && messageList.length > 0 ? (
                                                messageList.map((list, ind) => (
                                                    <tr key={list.id}>
                                                        <td className="text-center">{ind + 1}</td>
                                                        <td style={{ color: '#03A9F4', fontWeight: '600' }}>{list.typeName}</td>
                                                        <td>
                                                            {list.createdDate}&nbsp;
                                                            ({list.fromUserName} to {list.toUserName})
                                                            <span>{list.description}</span>
                                                        </td>
                                                        <td>{list.lastUpdated}</td>
                                                        <td>{list.updatedUserName}</td>
                                                        <td className="text-center">
                                                            <div className="form-check ps-0" style={{ marginTop: '7px' }}>
                                                                <input type="checkbox" id={`active-${list.id}`} checked={list.isActive === 1} readOnly />
                                                            </div>
                                                        </td>
                                                        <td>{list.messageStatus}</td>
                                                        <td className="text-center">
                                                            <div className="action-button">
                                                                <div>
                                                                    <img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(list.id, list.providerId, list.typeId, list.description) }} />
                                                                </div>
                                                                <div >
                                                                    <img src={deleteBtnIcon} className='' alt='' onClick={() => { handleDeleteRow(list.id) }} />
                                                                </div>
                                                                {/* <div  data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                                    <img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(list.id) }} />
                                                                </div> */}

                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">No data available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </TableContainer>
                                    {/* -----------------------Start Delete Modal Popup-------------------   */}
                                    {/* <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modalDelete">
                                            <div className="modal-content">

                                                <div className="modal-body modelbdy text-center">
                                                    <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                    <div className='popDeleteTitle mt-3'>Delete?</div>
                                                    <div className='popDeleteContent'>Are you sure want to delete?</div>
                                                </div>
                                                <div className="modal-footer1 text-center">
                                                    <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" className="btn-delete popBtnDelete" onClick={'handleDelete'} data-bs-dismiss="modal">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}




                                </div>
                            </div>
                            :
                            <div className='problemhead'>
                                <div className='col-12'>
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <label htmlFor="typeId" className="form-label">Message Type<span className="starMandatory1">*</span></label>
                                            <select value={sendForm.typeId} className="form-select form-select-sm" id="typeId" aria-label="form-select-sm example" name='typeId' onChange={handleChange}>
                                                <option value="0">{t("Select Message Type")}</option>
                                                {messageTypeList && messageTypeList.map((list) => {
                                                    return (
                                                        <option value={list.id}>{list.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <small id="errType" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <label htmlFor="providerId" className="form-label">To<span className="starMandatory1">*</span></label>
                                            <select value={sendForm.providerId} className="form-select form-select-sm" id="providerId" aria-label="form-select-sm example" name='providerId' onChange={handleChange}>
                                                <option value="0">{t("Select_Provider")}</option>
                                                {providerList && providerList.map((list) => {
                                                    return (
                                                        <option value={list.id}>{list.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <small id="errProvider" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className="row">
                                        <div className="col-12 mb-2">
                                            <label htmlFor="description" className="form-label">Message<span className="starMandatory1">*</span></label>
                                            <textarea value={sendForm.description} className='mt-1 form-control' id="description" name="description" rows="3" cols="40" style={{ height: '121px' }} onChange={handleChange}></textarea>
                                            <small id="errMessage" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2 relative">
                                    <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                            <>
                                                {showToster === 1 ?
                                                    <Toster value={tosterValue} message={tosterMessage} />

                                                    : <div>
                                                        {updateBool === 0 ?
                                                            <>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' alt='' />Save</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />Cancel</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>Update</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}>Cancel</button>
                                                            </>
                                                        }
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>

                            </div>
                        }

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

export default OPDPatientMessagePopUp
