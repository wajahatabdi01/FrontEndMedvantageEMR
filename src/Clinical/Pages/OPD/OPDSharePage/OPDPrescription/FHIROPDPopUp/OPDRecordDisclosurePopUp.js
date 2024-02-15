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
function OPDRecordDisclosurePopUp({ setShowToster }) {
    let [rowId, setRowId] = useState('')
    let [recordList, setRecordList] = useState([])
    let [date, setDate] = useState('');
    const { t } = useTranslation();
    let [discloserId, setDiscloserId] = useState('');
    let [searchTearm, setSearchTerm] = useState('');
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)
    let [recipientOfDisclosure, setRecipientOfDisclosure] = useState('');
    let [descriptionOfTheDisclosure, setDescriptionOfTheDisclosure] = useState('');
    // let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    let providerName = window.sessionStorage.getItem("LoginData") ? JSON.parse(window.sessionStorage.getItem("LoginData")).name : ""

    let getAllRecords = async () => {
        // let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        const response = await GetRecordDiscloser(activeUHID);
        if (response.status === 1) {
            setRecordList(response.responseValue);
        }
    }

    let handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "disclosureDate") {
            setDate(value)
            console.log("disclosureDate", value)
        }
        if (name === "typeOfDisclosure") {
            setDiscloserId(value)
            console.log("typeOfDisclosure", value)
        }
        if (name === "recipientOfDisclosure") {
            setRecipientOfDisclosure(value)
            console.log("recipientOfDisclosure", value)
        }
        if (name === "descriptionOfTheDisclosure") {
            setDescriptionOfTheDisclosure(value)
            console.log("descriptionOfTheDisclosure", value)
        }

    }

    let handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    let handleSave = async () => {
        console.log("Function Invoked")
        const obj = {
            "uhid": activeUHID,
            "disclosureDate": date,
            "typeOfDisclosure": discloserId,
            "recipientOfDisclosure": recipientOfDisclosure,
            "descriptionOfTheDisclosure": descriptionOfTheDisclosure,
            "providerName": providerName,
            "userId": window.userId,
            "clientId": window.clientId
        }
        console.log("sendData", obj)
        // return;
        const response = await PostRecordDiscloser(obj);
        if (response.status === 1) {
            setShowUnderProcess(0);
            setShowToster(8)
            handleClear();
            getAllRecords();
            setTimeout(() => {
                setShowToster(0);
            }, 2000)
            handleClear();
        }
        else {
            setShowUnderProcess(0)
            setShowAlertToster(1)
            setShowMessage(response.responseValue)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }

    let handleClear = () => {
        setDate('');
        setDiscloserId('');
        setRecipientOfDisclosure('');
        setDescriptionOfTheDisclosure('');
    }
    useEffect(() => {
        getAllRecords();
    }, []);
    return (
        <>
            <div className='problemhead' style={{ height: '50vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                <div className='row'>
                    <div className="col-12 mb-2">
                        {/* <label for="bedName" class="form-label relative">Date<span class="starMandatory">*</span></label> */}
                        <label for="bedName" class="form-label relative">Date</label>
                        <input type="date" value={date} className="form-control form-control-sm" id="beginDateTime" name='disclosureDate' onChange={handleChange} />
                        <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                        </small>
                    </div>

                    <div className="col-12 mb-2">
                        <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Type of Disclosure</></label>
                        {/* <sup style={{ color: "red" }}>*</sup> */}
                        <div className='d-flex gap-3' >
                            <select className="form-select form-select-sm" value={discloserId} id="typeOfDisclosure" aria-label=".form-select-sm example" name='typeOfDisclosure' onChange={handleChange} >
                                <option value="0" selected>Select Outcome</option>
                                <option value="1" >Test</option>
                                <option value="2" >Test</option>
                            </select>
                        </div>
                        <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-12 mb-2">
                        <label htmlFor="txtPatientRelationAddress" className="form-label">Recipient of the Disclosure</label>
                        <input type="text" value={recipientOfDisclosure} className="form-control form-control-sm mt-1" id="recipientOfDisclosure" name='recipientOfDisclosure' onChange={handleChange} />
                    </div>
                    <div className="col-12 mb-2">
                        <label htmlFor="txtPatientRelationAddress" className="form-label">Description of the Disclosure</label>
                        <textarea value={descriptionOfTheDisclosure} className='mt-1 form-control' id="descriptionOfTheDisclosure" name="descriptionOfTheDisclosure" style={{ height: '110px' }} onChange={handleChange}></textarea>
                    </div>

                    <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end mt-2">
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-target="#exampleModalToggle2_" data-bs-toggle="modal_" onClick={handleSave}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <div className="col-12 mt-1">
                    <div className='handlser'>
                        <Heading text="Disclosure List" />
                        {/* <Heading text={content} /> */}
                        <div style={{ position: 'relative' }}>
                            <input type="text" className='form-control form-control-sm' placeholder="Search" value={searchTearm} onChange={handleSearch} />
                            <span className="tblsericon"><i class="fas fa-search"></i></span>
                        </div>
                    </div>
                    <div className="med-table-section mt-3" style={{ "height": "24vh" }}>
                        <table className="med-table border_ striped">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                    <th>Recipient Name</th>
                                    <th>Disclosure Type</th>
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
                                            <td>{list.providerName}</td>
                                            <td>{list.typeOfDisclosure}</td>
                                            <td>{list.descriptionOfTheDisclosure}</td>
                                            <td>{list.providerName}</td>
                                            <td>
                                                <div className="action-button">
                                                    <div data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" title="Edit Row"><img src={IconEdit} alt='' /></div>
                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#staticBackdrop"><img src={IconDelete} onClick={() => { setRowId(list.id) }} alt='' /></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
                <div className="modal-dialog modalDelete">
                    <div className="modal-content">

                        <div className="modal-body modelbdy text-center">
                            <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                            <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                            <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                        </div>
                        <div className="modal-footer1 text-center">

                            <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                            <button type="button" className="btn-delete popBtnDelete" onClick={"handleDeleteRow"} data-bs-dismiss="modal">{t("Delete")}</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
        </>
    )
}

export default OPDRecordDisclosurePopUp
