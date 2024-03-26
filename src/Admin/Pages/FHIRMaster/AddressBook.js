import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
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

    let [addressData, setAddressData] = useState({
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
        const name = e.target.name;
        const value = e.target.value;
        setAddressData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    let handleSubmit = async () => {
        console.log("Save Data", addressData)
        return
        const response = await PostAddUser(addressData);
        if (response.status === 1) {
            alert('Saved')
        }
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
                                            <label htmlFor="ddlSurgery" className="form-label">Type<span className="starMandatory">*</span></label>
                                            <select className="form-select form-select-sm" id='ddlSurgery' value={addressData.provider_roles_id} name='provider_roles_id' aria-label=".form-select-sm example" onChange={handleChange}>
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
                                            <label htmlFor="ddlSurgery" className="form-label">Title<span className="starMandatory">*</span></label>
                                            <select className="form-select form-select-sm" id="ddlTitle" aria-label=".form-select-sm example" name="titleId" value={addressData.titleID} onChange={handleChange}>
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
                                            <label for="bedName" class="form-label relative">First Name<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='fname' placeholder='Enter first name' value={addressData.fname} onChange={handleChange} />
                                            <small id="errClientname" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Middle Name<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='mname' placeholder='Enter middle name' value={addressData.mname} onChange={handleChange} />
                                            <small id="errClientname" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Last Name<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='lname' placeholder='Enter last name' value={addressData.lname} onChange={handleChange} />
                                            <small id="errClientname" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Suffix</label>
                                            <input type="text" className="form-control form-control-sm" id="contactEmail" name='contacts' value={addressData.suffix} placeholder='Enter suffix' onChange={handleChange} />
                                            <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Specialty<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='redirectUri' placeholder='Enter specialty' onChange={handleChange} />
                                            <small id="errRedirectURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Organization<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter organization' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Valedictory<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter Valedictory' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Home Phone<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter home phone' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Mobile<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter mobile' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Work Phone:<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter work phone' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">2nd<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter 2nd' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Fax<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter fax' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Assistant<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter assistant' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Email<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter email' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Trusted Email<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter trusted email' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Website<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter website' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>

                                        <div className="mb-2 me-2">
                                            <label htmlFor="txtSubscriber" className="form-label relative"><img src={"patientOPD"} className='icnn' alt='' />Main Address<span class="starMandatory">*</span></label>
                                            <div className='d-flex gap-1'>
                                                <input type="text" className="form-control form-control-sm" id="txtSubscriber" name='subscriber1' placeholder='Address Line 1' />
                                                <input type="text" className="form-control form-control-sm" id="txtSubscriber1" name='subscriber2' placeholder='Address Line 2' />
                                            </div>
                                            <small id="errSubscriber" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">City<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter city' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">State<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter state' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">country<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter country' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Postal code<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter postal code' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">UPIN<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter UPIN' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">NPI<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter NPI' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">TIN<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter TIN' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label for="bedName" class="form-label relative">Taxonomy<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' placeholder='Enter taxonomy' onChange={handleChange} />
                                            <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <label htmlFor="txtPatientRelationAddress" className="form-label">Notes</label>
                                            <textarea className='mt-1 form-control' id="descriptionOfTheDisclosure" name="jwks_uri" style={{ height: '90px' }} onChange={handleChange} ></textarea>
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
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={"handleClear"}><img src={clearBtnIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                    </> :
                                                        <>
                                                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={"handleUpdate"}>{t("Update")}</button>
                                                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={"handleClear"}>{t("Cancel")}</button>
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
                                                <th>Local</th>
                                                <th>Type</th>
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
                                                        <td>{list.surgeryTitle}</td>
                                                        <td>{list.kitName}</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>{list.mobileNo}</td>
                                                        <td>--</td>
                                                        <td>{list.email}</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>
                                                            <div className="action-button">
                                                                <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' /></div>
                                                                <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' />
                                                                </div>
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
