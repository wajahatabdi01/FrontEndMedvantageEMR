import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import GetAllTitleForPatient from '../../../Registartion/API/GET/GetAllTitleForPatient';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import saveBtnIcon from '../../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import GetAllProviderRole from '../../Api/FHIRMasterAPI/AddressBookMaster/GetAllProviderRole';
import GetUserList from '../../Api/Schedule/GET/GetUserList';
import PostAddUser from '../../Api/UserService/PostAddUser';
export default function AddressBook() {
    let [titleList, setTitleList] = useState([]);
    let [addressList, setAddressList] = useState([]);
    let [typeList, setTypeList] = useState([]);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [isChecked, setIsChecked] = useState(false);
    let [addressData, setAddressData] = useState({
        "clientID": 0,
        "titleID": 0,
        "email": "",
        "mobileNo": "",
        "roleId": 0,
        "userId": 0,
        "departmentId": 0,
        "designationId": 0,
        "npi": "",
        "fname": "",
        "mname": "",
        "lname": "",
        "taxonomy": "",
        "provider_roles_id": 0,
        "physician_type_id": 0,
        "provider_specialty_id": 0,
        "cityId": 0,
        "city": "",
        "stateId": 0,
        "state": "",
        "countryId": 0,
        "country": "",
        "zip": "",
        "organization": "",
        "suffix": "",
        "specialty": "",
        "website": "",
        "upin": "",
        "tin": "",
        "notes": "",
        "valedictory": "",
        "homePhone": "",
        "workPhone1": "",
        "workPhone2": "",
        "fax": "",
        "assisstant": "",
        "trustedEmail": "",
        "address": "",
        "cpoe": 0
    })

    let getTitle = async () => {
        const response = await GetAllTitleForPatient();
        if (response.status === 1) {
            setTitleList(response.responseValue);
        }
    }
    let getAllType = async () => {
        const response = await GetAllProviderRole();
        if (response.status === 1) {
            setTypeList(response.responseValue);
        }
    }
    let getAllAddressData = async () => {
        const response = await GetUserList(window.clientId);
        if (response.status === 1) {
            setAddressList(response.responseValue);
        }
    }

    let handleChange = (e) => {
        document.getElementById("errMobile").style.display = "none"
        document.getElementById("errEmail").style.display = "none"
        if (e.target.name === 'addressLine1' || e.target.name === 'addressLine2') {
            const addressCombine = document.getElementById("addressLine1").value + ' ' + document.getElementById("addressLine2").value;
            setAddressData((prevData) => ({
                ...prevData,
                address: addressCombine
            }));
        }
        else {
            const { name, value } = e.target;
            setAddressData((prevData) => ({
                ...prevData,
                [name]: value,
                clientID: window.clientId,
                userId: window.userId
            }));
        }

    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setAddressData((prevData) => ({
            ...prevData,
            cpoe: isChecked ? 0 : 1
        }));
    };
    let handleSubmit = async () => {
        if (addressData.mobileNo === '' || addressData.mobileNo === null || addressData.mobileNo === undefined) {
            document.getElementById("errMobile").innerHTML = "Enter mobile no !"
            document.getElementById("errMobile").style.display = "block"
        }
        else if (addressData.email === '' || addressData.email === null || addressData.email === undefined) {
            document.getElementById("errEmail").innerHTML = "Enter email !"
            document.getElementById("errEmail").style.display = "block"
        }
        else {
            // return
            setShowUnderProcess(1);
            const response = await PostAddUser(addressData);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data save successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear();
                    getAllAddressData();
                }, 2000)
            }
            else {
                setShowUnderProcess(0);
                setTosterValue(1);
                setShowToster(1);
                setTosterMessage(response.responseValue);
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)
            }
        }

    }

    let handleEdit = (id, organization, fname, mname, lname, userSpecialty, userNpi, userPhoneWork, mobileNo, fax, email, street, city, state, zip) => {
        setIsUpdateBtnShow(true);
        setAddressData({
            id: id,
            organization: organization,
            fname: fname,
            mname: mname,
            lname: lname,
            specialty: userSpecialty,
            npi: userNpi,
            workPhone1: userPhoneWork,
            mobileNo: mobileNo,
            fax: fax,
            email: email,
            address: street,
            city: city,
            state: state,
            zip: zip,
            roleID: 0,
        })
    }
    let handleSaveUpdate = async () => {
        if (addressData.mobileNo === '' || addressData.mobileNo === null || addressData.mobileNo === undefined) {
            document.getElementById("errMobile").innerHTML = "Enter mobile no !"
            document.getElementById("errMobile").style.display = "block"
        }
        else if (addressData.email === '' || addressData.email === null || addressData.email === undefined) {
            document.getElementById("errEmail").innerHTML = "Enter email !"
            document.getElementById("errEmail").style.display = "block"
        }
        else {
            console.log("Updated Data", addressData)
            const response = await PostAddUser(addressData)
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data updated successfully");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear(1);
                    getAllAddressData();
                }, 2000)
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

    }


    let handleClear = () => {
        setIsUpdateBtnShow(false);
        setAddressData({
            provider_roles_id: 0,
            titleID: 0,
            fname: "",
            mname: "",
            lname: "",
            suffix: "",
            specialty: "",
            organization: "",
            valedictory: "",
            homePhone: "",
            mobileNo: "",
            workPhone1: "",
            workPhone2: "",
            fax: "",
            assisstant: "",
            email: "",
            trustedEmail: "",
            website: "",
            address: "",
            city: "",
            state: "",
            country: "",
            zip: "",
            upin: "",
            npi: "",
            tin: "",
            taxonomy: "",
            notes: "",
            cpoe: 0
        })
        setIsChecked(0)
        document.getElementById("addressLine1").value = ''
        document.getElementById("addressLine2").value = ''
    }
    useEffect(() => {
        getTitle();
        getAllType();
        getAllAddressData();
    }, []);
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Address Book</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2" >
                                            <label htmlFor="ddlSurgery" className="form-label">Type<span className="starMandatory"></span></label>
                                            <select className="form-select form-select-sm" id='provider_roles_id' value={addressData.provider_roles_id} name='provider_roles_id' aria-label=".form-select-sm example" onChange={handleChange}>
                                                <option value="0">Select Type</option>
                                                {typeList && typeList.map((list) => {
                                                    return (
                                                        <option value={list.id}>{list.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <small id="errddlSurgery" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label htmlFor="ddlSurgery" className="form-label">Title<span className="starMandatory"></span></label>
                                            <select className="form-select form-select-sm" id="titleId" aria-label=".form-select-sm example" name="titleID" value={addressData.titleID} onChange={handleChange}>
                                                <option value="0" selected>Select Title</option>
                                                {titleList && titleList.map((list) => {
                                                    return (
                                                        <option value={list.id}>{list.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <small id="errTitle" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>

                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">First Name<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="fname" name='fname' placeholder='Enter first name' value={addressData.fname} onChange={handleChange} />
                                            <small id="errClientname" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Middle Name<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="mname" name='mname' placeholder='Enter middle name' value={addressData.mname} onChange={handleChange} />
                                            <small id="errClientname" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Last Name<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="lname" name='lname' placeholder='Enter last name' value={addressData.lname} onChange={handleChange} />
                                            <small id="errClientname" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Suffix</label>
                                            <input type="text" className="form-control form-control-sm" id="suffix" name='suffix' value={addressData.suffix} placeholder='Enter suffix' onChange={handleChange} />
                                            <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Specialty<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="specialty" name='specialty' placeholder='Enter specialty' value={addressData.specialty} onChange={handleChange} />
                                            <small id="errRedirectURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Organization<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="organization" name='organization' placeholder='Enter organization' value={addressData.organization} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Valedictory<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="valedictory" name='valedictory' placeholder='Enter Valedictory' value={addressData.valedictory} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Home Phone<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="homePhone" name='homePhone' placeholder='Enter home phone' value={addressData.homePhone} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Mobile<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="mobileNo" name='mobileNo' placeholder='Enter mobile' value={addressData.mobileNo} onChange={handleChange} />
                                            <small id="errMobile" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Work Phone<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="workPhone1" name='workPhone1' placeholder='Enter work phone' value={addressData.workPhone1} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">2nd<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="workPhone2" name='workPhone2' placeholder='Enter 2nd' value={addressData.workPhone2} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Fax<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="fax" name='fax' placeholder='Enter fax' value={addressData.fax} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Assistant<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="assisstant" name='assisstant' placeholder='Enter assistant' value={addressData.assisstant} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Email<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="email" name='email' placeholder='Enter email' value={addressData.email} onChange={handleChange} />
                                            <small id="errEmail" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Trusted Email<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="trustedEmail" name='trustedEmail' placeholder='Enter trusted email' value={addressData.trustedEmail} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Website<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="website" name='website' placeholder='Enter website' value={addressData.website} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>

                                        <div className="mb-2 me-2">
                                            <label htmlFor="txtSubscriber" className="form-label relative"><img src={"patientOPD"} className='icnn' alt='' />Main Address<span class="starMandatory"></span></label>
                                            <div className='d-flex gap-1'>
                                                <input type="text" className="form-control form-control-sm" id="addressLine1" name='addressLine1' placeholder='Address Line 1' onChange={handleChange} />
                                                <input type="text" className="form-control form-control-sm" id="addressLine2" name='addressLine2' placeholder='Address Line 2' onChange={handleChange} />
                                            </div>
                                            <small id="errSubscriber" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">City<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="city" name='city' placeholder='Enter city' value={addressData.city} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">State<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="state" name='state' placeholder='Enter state' value={addressData.state} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">country<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="country" name='country' placeholder='Enter country' value={addressData.country} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Postal code<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="zip" name='zip' placeholder='Enter postal code' value={addressData.zip} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">UPIN<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="upin" name='upin' placeholder='Enter UPIN' value={addressData.upin} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">NPI<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="npi" name='npi' placeholder='Enter NPI' value={addressData.npi} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">TIN<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="tin" name='tin' placeholder='Enter TIN' value={addressData.tin} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Taxonomy<span className="starMandatory"></span></label>
                                            <input type="text" className="form-control form-control-sm" id="taxonomy" name='taxonomy' placeholder='Enter taxonomy' value={addressData.taxonomy} onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div class="form-check" style={{ marginTop: '28px' }}>
                                            <input class="form-check-input" type="checkbox" id="cpoe" name='cpoe' checked={isChecked} value={addressData.cpoe} onChange={handleCheckboxChange} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Cpoe
                                            </label>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label htmlFor="txtPatientRelationAddress" className="form-label">Notes</label>
                                            <textarea className='mt-1 form-control' id="notes" name="notes" style={{ height: '90px' }} value={addressData.notes} onChange={handleChange} ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="inner-content text-right">
                                    <div class="mb-2 mt-2 relative">
                                        {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                :
                                                <div>
                                                    {isUpdateBtnShow !== true ? <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSubmit}><img src={saveBtnIcon} className='icnn' alt='' />{t("Save")}</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearBtnIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                    </> :
                                                        <>
                                                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleSaveUpdate}>{t("Update")}</button>
                                                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}>{t("Cancel")}</button>
                                                        </>
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <div className="med-table-section" style={{ "height": "80vh" }}>
                                    <table className="med-table border_ striped_">
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ "width": "5%" }}>#</th>
                                                <th>Organization</th>
                                                <th>Name</th>
                                                <th>Specialty</th>
                                                <th>NPI</th>
                                                <th>Phone(W)</th>
                                                <th>Mobile</th>
                                                <th>Fax</th>
                                                <th>Email</th>
                                                <th>Street</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Postal</th>
                                                <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {addressList && addressList.map((list, index) => {
                                                return (
                                                    <tr>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td>{list.organization ? list.organization : '--'}</td>
                                                        <td>
                                                            {list.fname ? (list.mname ? (list.lname ? list.fname + ' ' + list.mname + ' ' + list.lname : list.fname + ' ' + list.mname) : (list.lname ? list.fname + ' ' + list.lname : list.fname)) : '--'}
                                                        </td>
                                                        <td>{list.userSpecialty ? list.userSpecialty : '--'}</td>
                                                        <td>{list.userNpi ? list.userNpi : '--'}</td>
                                                        <td>{list.userPhoneWork ? list.userPhoneWork : '--'}</td>
                                                        <td>{list.mobileNo ? list.mobileNo : '--'}</td>
                                                        <td>{list.userFax ? list.userFax : '--'}</td>
                                                        <td>{list.email ? list.email : '--'}</td>
                                                        <td>{list.userStreet ? list.userStreet : '--'}</td>
                                                        <td>{list.city ? list.city : '--'}</td>
                                                        <td>{list.state ? list.state : '--'}</td>
                                                        <td>{list.zip ? list.zip : '--'}</td>
                                                        <td>
                                                            <div className="action-button">
                                                                <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" onClick={() => { handleEdit(list.id, list.organization, list.fname, list.mname, list.lname, list.userSpecialty, list.userNpi, list.userPhoneWork, list.mobileNo, list.userFax, list.email, list.userStreet, list.city, list.state, list.zip) }}><img src={editBtnIcon} className='' alt='' /></div>
                                                                {/* <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' />
                                                                </div> */}
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
                    </div>
                </div>
            </section>
        </>
    )
}
