import React, { useEffect, useState } from 'react'
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import Heading from '../../../../../../Component/Heading';
import IconEdit from '../../../../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../../../../assets/images/icons/IconDelete.svg'
import GetRecordDiscloser from '../../../../../API/OPDRecordDiscloser/GetRecordDiscloser';
import PostRecordDiscloser from '../../../../../API/OPDRecordDiscloser/PostRecordDiscloser';
function OPDRecordDisclosurePopUp({ setShowToster }) {
    let [recordList, setRecordList] = useState([])
    let [date, setDate] = useState('');
    let [discloserId, setDiscloserId] = useState('');
    let [searchTearm, setSearchTerm] = useState('');
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)
    let [recipientOfDisclosure, setRecipientOfDisclosure] = useState('');
    let [descriptionOfTheDisclosure, setDescriptionOfTheDisclosure] = useState('');
    let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    let providerName = window.sessionStorage.getItem("LoginData") ? JSON.parse(window.sessionStorage.getItem("LoginData")).name : ""

    let getAllRecords = async () => {
        let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        const response = await GetRecordDiscloser(activePatient);
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
            "uhid": activePatient,
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
            setShowToster(1)
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

    }
    useEffect(() => {
        getAllRecords();
    }, []);
    return (
        <>
            <div className='problemhead'>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            {/* <label for="bedName" class="form-label relative">Date<span class="starMandatory">*</span></label> */}
                            <label for="bedName" class="form-label relative">Date</label>
                            <input type="date" className="form-control form-control-sm" id="beginDateTime" name='disclosureDate' onChange={handleChange} />
                            <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                            </small>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Type of Disclosure</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="typeOfDisclosure" aria-label=".form-select-sm example" name='typeOfDisclosure' onChange={handleChange} >
                                    <option value="0" selected>Select Outcome</option>
                                    <option value="1" >Test</option>
                                    <option value="2" >Test</option>
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label">Recipient of the Disclosure</label>
                            <input type="text" className="form-control form-control-sm mt-1" id="recipientOfDisclosure" name='recipientOfDisclosure' onChange={handleChange} />
                        </div>
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label">Description of the Disclosure</label>
                            <textarea className='mt-1 form-control' id="descriptionOfTheDisclosure" name="descriptionOfTheDisclosure" rows="3" cols="40" style={{ height: '121px' }} onChange={handleChange}></textarea>
                        </div>
                    </div>

                    <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end mt-2">
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-target="#exampleModalToggle2_" data-bs-toggle="modal_" onClick={handleSave}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal" onClick={"handleClear"}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
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
                    <div className="med-table-section mt-3" style={{ "height": "74vh" }}>
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
                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt='' /></div>
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
        </>
    )
}

export default OPDRecordDisclosurePopUp
