import React, { useEffect, useState } from 'react'
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import Heading from '../../../../../../Component/Heading';
import IconEdit from '../../../../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../../../../assets/images/icons/IconDelete.svg'
import GetRecordDiscloser from '../../../../../API/OPDRecordDiscloser/GetRecordDiscloser';
import PostRecordDiscloser from '../../../../../API/OPDRecordDiscloser/PostRecordDiscloser';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import GetFHIRTypeOfDisclosureMaster from '../../../../../../Admin/Pages/FHIRAdmin/Api/FHIRTypeOfDisclosureMaster/GetFHIRTypeOfDisclosureMaster';
import TableContainer from '../../../../../../Component/TableContainer';
import editBtnIcon from '../../../../../../assets/images/icons/edit.svg';
import deleteBtnIcon from '../../../../../../assets/images/icons/delete.svg';
import Toster from '../../../../../../Component/Toster';
import TosterUnderProcess from '../../../../../../Component/TosterUnderProcess';
import PutRecordDiscloser from '../../../../../API/OPDRecordDiscloser/PutRecordDiscloser';
import DeleteRecordDiscloser from '../../../../../API/OPDRecordDiscloser/DeleteRecordDiscloser';
import Loader from '../../../../../../Component/Loader';
import SuccessToster from '../../../../../../Component/SuccessToster';
import AlertToster from '../../../../../../Component/AlertToster';
function OPDRecordDisclosurePopUp() {
    // let [rowId, setRowId] = useState('')
    let [recordList, setRecordList] = useState([])
    let [disclosureTypeList, setDisclosureTypeList] = useState([])
    let [date, setDate] = useState('');
    const { t } = useTranslation();
    let [discloserId, setDiscloserId] = useState('');
    let [searchTearm, setSearchTerm] = useState('');
    // let [recipientOfDisclosure, setRecipientOfDisclosure] = useState('');
    // let [descriptionOfTheDisclosure, setDescriptionOfTheDisclosure] = useState('');
    let [sendForm, setSendForm] = useState({
        "disclosureDate": '',
        "typeOfDisclosure": 0,
        "recipientOfDisclosure": '',
        "descriptionOfTheDisclosure": '',
        "userId": window.userId,
        "clientId": window.clientId
    })

    let [showMessage, setShowMessage] = useState(1)

    const handleAddNew = async () => {
        setShowMessage(0);
    }

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
    // let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    let providerName = window.sessionStorage.getItem("LoginData") ? JSON.parse(window.sessionStorage.getItem("LoginData")).name : ""
    const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;

    const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
  JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId: window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];
  
  const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
  JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId: window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

    let getAllRecords = async () => {
        // let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        const response = await GetRecordDiscloser(activeUHID);
        if (response.status === 1) {
            setRecordList(response.responseValue);
        }
    }

    //Get MessageType
    const getpatientMessageType = async () => {
        const response = await GetFHIRTypeOfDisclosureMaster()
        if (response.status === 1) {
            setDisclosureTypeList(response.responseValue)
        }
    }

    let handleChange = (e) => {
        clearValidationErrMessage();
        let name = e.target.name;
        let value = e.target.value;
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    let handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }
    // Handle Save


    const handleSave = async () => {
        if (sendForm.disclosureDate === '' || sendForm.disclosureDate === null || sendForm.disclosureDate === undefined || sendForm.disclosureDate === 0 || sendForm.disclosureDate === "0") {
            document.getElementById('errDisclosureDate').innerHTML = "Select Date";
            document.getElementById('errDisclosureDate').style.display = "block";
        }
        else if (sendForm.typeOfDisclosure === '' || sendForm.typeOfDisclosure === null || sendForm.typeOfDisclosure === undefined || sendForm.typeOfDisclosure === 0 || sendForm.typeOfDisclosure === "0") {
            document.getElementById('errTypeOfDisclosure').innerHTML = "select Disclosure";
            document.getElementById('errTypeOfDisclosure').style.display = "block";
        }
        else if (sendForm.recipientOfDisclosure === '' || sendForm.recipientOfDisclosure.trim().length === 0 || sendForm.recipientOfDisclosure === null || sendForm.recipientOfDisclosure === undefined) {
            document.getElementById('errRecipientOfDisclosure').innerHTML = "Field can't be blank";
            document.getElementById('errRecipientOfDisclosure').style.display = "block";
        }
        else if (sendForm.descriptionOfTheDisclosure === '' || sendForm.descriptionOfTheDisclosure.trim().length === 0 || sendForm.descriptionOfTheDisclosure === null || sendForm.descriptionOfTheDisclosure === undefined) {
            document.getElementById('errDescriptionOfTheDisclosure').innerHTML = "Field can't be blank";
            document.getElementById('errDescriptionOfTheDisclosure').style.display = "block";
        }
        else {
            setShowUnderProcess(1);
            const obj = {
                "uhid": activeUHID,
                "disclosureDate": sendForm.disclosureDate,
                "typeOfDisclosure": sendForm.typeOfDisclosure,
                "recipientOfDisclosure": sendForm.recipientOfDisclosure,
                "descriptionOfTheDisclosure": sendForm.descriptionOfTheDisclosure,
                "providerName": providerName,
                "userId": window.userId,
                "clientId": window.clientId,
                doctorId : activeDocID,
                departmentId : activeDeptID
            }
            const response = await PostRecordDiscloser(obj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully.");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear();
                }, 1500)
                getAllRecords();
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
    let handleUpdate = async (id, disclosureDate, typeOfDisclosure, recipientOfDisclosure, descriptionOfTheDisclosure) => {
        setUpdateBool(1)
        clearValidationErrMessage();
        setShowMessage(0)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            // "disclosureDate": disclosureDate,
            "disclosureDate": new Date(disclosureDate).toISOString().split('T')[0],
            "typeOfDisclosure": typeOfDisclosure,
            "recipientOfDisclosure": recipientOfDisclosure,
            "descriptionOfTheDisclosure": descriptionOfTheDisclosure,
            "providerName": providerName,
            "clientId": clientID,
            "userId": window.userId
        }))
    }


    //Handle Update
    const handlerUpdate = async () => {
        if (sendForm.disclosureDate === '' || sendForm.disclosureDate === null || sendForm.disclosureDate === undefined || sendForm.disclosureDate === 0 || sendForm.disclosureDate === "0") {
            document.getElementById('errDisclosureDate').innerHTML = "Select Date";
            document.getElementById('errDisclosureDate').style.display = "block";
        }
        else if (sendForm.typeOfDisclosure === '' || sendForm.typeOfDisclosure === null || sendForm.typeOfDisclosure === undefined || sendForm.typeOfDisclosure === 0 || sendForm.typeOfDisclosure === "0") {
            document.getElementById('errTypeOfDisclosure').innerHTML = "select Disclosure";
            document.getElementById('errTypeOfDisclosure').style.display = "block";
        }
        else if (sendForm.recipientOfDisclosure === '' || sendForm.recipientOfDisclosure.trim().length === 0 || sendForm.recipientOfDisclosure === null || sendForm.recipientOfDisclosure === undefined) {
            document.getElementById('errRecipientOfDisclosure').innerHTML = "Field can't be blank";
            document.getElementById('errRecipientOfDisclosure').style.display = "block";
        }
        else if (sendForm.descriptionOfTheDisclosure === '' || sendForm.descriptionOfTheDisclosure.trim().length === 0 || sendForm.descriptionOfTheDisclosure === null || sendForm.descriptionOfTheDisclosure === undefined) {
            document.getElementById('errDescriptionOfTheDisclosure').innerHTML = "Field can't be blank";
            document.getElementById('errDescriptionOfTheDisclosure').style.display = "block";
        }

        else {
            setShowUnderProcess(1);
            const response = await PutRecordDiscloser({
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
                    getAllRecords();

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

    //Handle Delete
    let handleDeleteRow = async (Id) => {
        // var obj = {
        //     "id": id,
        // }
        let response = await DeleteRecordDiscloser(Id)
        if (response.status === 1) {
            setShowLoder(0)
            setisShowToaster(1);
            setShowSuccessMsg("Deleted Successfully")
            setShowMessage(1)
            setTimeout(() => {
                setisShowToaster(0);
                getAllRecords();
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

        const errDisclosureDateElement = document.getElementById('errDisclosureDate');
        if (errDisclosureDateElement) {
            errDisclosureDateElement.style.display = "none";
        }
        const errTypeOfDisclosureElement = document.getElementById('errTypeOfDisclosure');
        if (errTypeOfDisclosureElement) {
            errTypeOfDisclosureElement.style.display = "none";
        }
        const errRecipientOfDisclosureElement = document.getElementById('errRecipientOfDisclosure');
        if (errRecipientOfDisclosureElement) {
            errRecipientOfDisclosureElement.style.display = "none";
        }
        const errDescriptionOfTheDisclosureElement = document.getElementById('errDescriptionOfTheDisclosure');
        if (errDescriptionOfTheDisclosureElement) {
            errDescriptionOfTheDisclosureElement.style.display = "none";
        }
    }
    const handleClear = (value) => {
        clearValidationErrMessage();
        setUpdateBool(0);
        setShowMessage(1)
        setSendForm({
            "disclosureDate": '',
            "typeOfDisclosure": 0,
            "recipientOfDisclosure": '',
            "descriptionOfTheDisclosure": '',
            "providerName": providerName,
            "userId": window.userId,
            "clientId": window.clientId
        })
    }
    useEffect(() => {
        getAllRecords();
        getpatientMessageType();
    }, []);
    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    {showMessage === 1 ?
                        <div className='msgTbl'>
                            <div className='tbl_Heading'>
                                <h3>Disclosure List</h3>
                                <div className='newptmsg'>
                                    <label htmlFor="ddlRelationshipTertiary" className="form-label" onClick={handleAddNew}><i className='fa fa-plus'></i> Add New</label>
                                </div>
                            </div>

                            <div className="med-table-section" style={{ maxHeight: '50vh', minHeight: '30vh', overflow: 'scroll' }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Disclosure Type</th>
                                            <th>Recipient Of Disclosure</th>
                                            <th>Description</th>
                                            <th>Provider</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recordList && recordList.filter((val) => `${val.providerName}`.toLowerCase().includes(searchTearm.toLowerCase())).map((list, ind) => {
                                            return (
                                                <tr key={list.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{list.disclosureTypeName}</td>
                                                    <td>{list.recipientOfDisclosure}</td>
                                                    <td>{list.descriptionOfTheDisclosure}</td>
                                                    <td>{list.providerName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div>
                                                                <img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(list.id, list.disclosureDate, list.typeOfDisclosure, list.recipientOfDisclosure, list.descriptionOfTheDisclosure) }} />
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
                                            )
                                        })}

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
                        <div className='problemhead1'>
                            <div className="row">
                                <div className="col-4 mb-2">
                                    <label for="disclosureDate" class="form-label relative">Date<span className="starMandatory1">*</span></label>
                                    <input type="date" value={sendForm.disclosureDate} className="form-control form-control-sm" id="disclosureDate" name='disclosureDate' onChange={handleChange} />
                                    <small id="errDisclosureDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                                <div className="col-4 mb-2">
                                    <label htmlFor="typeOfDisclosure" className="form-label">Type of Disclosure <span className="starMandatory1">*</span></label>
                                    <select className="form-select form-select-sm" id="typeOfDisclosure" aria-label="form-select-sm example" name='typeOfDisclosure' value={sendForm.typeOfDisclosure} onChange={handleChange}>
                                        <option value="0">{t("Select Disclosure Type")}</option>
                                        {disclosureTypeList && disclosureTypeList.map((list) => {
                                            return (
                                                <option value={list.id}>{list.name}</option>
                                            )
                                        })}
                                    </select>
                                    <small id="errTypeOfDisclosure" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                                <div className="col-4 mb-2">
                                    <label htmlFor="recipientOfDisclosure" className="form-label">Recipient of the Disclosure<span className="starMandatory1">*</span></label>
                                    <input type="text" value={sendForm.recipientOfDisclosure} className="form-control form-control-sm" id="recipientOfDisclosure" name='recipientOfDisclosure' onChange={handleChange} />
                                    <small id="errRecipientOfDisclosure" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-12 mb-2">
                                    <label htmlFor="descriptionOfTheDisclosure" className="form-label">Description of the Disclosure<span className="starMandatory1">*</span></label>
                                    <textarea value={sendForm.descriptionOfTheDisclosure} className='form-control' id="descriptionOfTheDisclosure" name="descriptionOfTheDisclosure" style={{ height: '110px' }} onChange={handleChange}></textarea>
                                    <small id="errDescriptionOfTheDisclosure" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                            </div>

                            <div className='row'>
                                <div className="mb-2 mt-2 relative">
                                    <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                            <>
                                                {showToster === 1 ?
                                                    <Toster value={tosterValue} message={tosterMessage} />

                                                    : <div>
                                                        {updateBool === 0 ?
                                                            <>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveButtonIcon} className='icnn' alt='' />Save</button>
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
                        </div>
                    }
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

export default OPDRecordDisclosurePopUp
