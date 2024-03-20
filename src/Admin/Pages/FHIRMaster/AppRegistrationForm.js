import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';

import { t } from 'i18next'
import GetAllScopes from '../../Api/AppRegistrationForm/GetAllScopes';
import { json } from 'react-router-dom';
import PostAppRegistrationForm from '../../Api/AppRegistrationForm/PostAppRegistrationForm';
import SuccessToster from '../../../Component/SuccessToster';
import AlertToster from '../../../Component/AlertToster';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import clearIcon from '../../../assets/images/icons/clear.svg';

function AppRegistrationForm() {
    let [userType, setUserType] = useState([]);
    let [clientname, setClientName] = useState('')
    let [clientData, setClientData] = useState('')
    let [contactEmail, setContactEmail] = useState('')
    let [redirectUri, setRedirectUri] = useState('')
    let [logoutredirecturis, setLogoutRedirectUris] = useState('')
    let [jwksUri, setJwksUri] = useState('')
    let [jwks, setJwks] = useState('')
    let [scopesList, setScopesList] = useState([
        { id: 1, name: 'add_list' },
        { id: 2, name: 'api' },
        { id: 3, name: 'checksum' },
        { id: 4, name: 'delete' },
        { id: 5, name: 'edit_list' },
        { id: 6, name: 'fee' },
        { id: 7, name: 'login' },
        { id: 8, name: 'login attempt' },
        { id: 9, name: 'logout' },
        { id: 10, name: 'order' },
        { id: 11, name: 'other' },
        { id: 12, name: 'patient' },
        { id: 13, name: 'patient-merge' },
        { id: 14, name: 'patient-record' },
        { id: 15, name: 'portalapi' },
        { id: 16, name: 'print' },
        { id: 17, name: 'qrda3' },
        { id: 18, name: 'scheduling' },
        { id: 19, name: 'security-administration' },
        { id: 20, name: 'uuid' },
        { id: 21, name: 'view' },
        { id: 22, name: 'disclosure' }
    ])
    let [scopeData, setScopeData] = useState([])
    let [filterScopeData, setFilterScopeData] = useState()
    const [applicationType, setApplicationType] = useState(1);
    const [application, setApplication] = useState('private');
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)

    let getAllScopes = async () => {
        const response = await GetAllScopes();
        if (Array.isArray(response)) {
            setScopeData(response);
        }
        console.log("ScopesData", response);
    }
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newValue = value.replace(/\|/g, ' ');
        document.getElementById("errRedirectURI").style.display = "none"
        document.getElementById("errLogoutURI").style.display = "none"
        document.getElementById("errClientname").style.display = "none"


        if (name === "client_name") {
            setClientName(value)
        }
        if (name === "contacts") {
            setContactEmail(newValue);
        }
        if (name === "redirectUri") {
            setRedirectUri(newValue);
        }
        if (name === "post_logout_redirect_uris") {
            setLogoutRedirectUris(newValue);
        }
        if (name === "jwks_uri") {
            setJwksUri(value)
        }
        if (name === "jwks") {
            setJwks(value)
        }
    };
    const handleApplicationType = (isChecked, value, type) => {
        handleClear();
        setApplicationType(isChecked);
        setApplication(type);
        setFilterScopeData(value)
        if(value==='private'){
            setTimeout(() => {
                document.getElementById('systemclient').checked = true
            }, 2000);
        }

       
    }
    const filteredOptions = scopeData ? scopeData.filter(data => {
        if (typeof data.name === 'string') {
            return !data.name.includes(filterScopeData || scopeData);
        } else {
            return false;
        }
    }) : [];

    const formatData = (value) => {
        return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' | ');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const contactEmails = formatData(contactEmail);
        const redirectUris = formatData(redirectUri);
        const logoutredirecturi = formatData(logoutredirecturis);
        const jwksdata = JSON.stringify(jwks);

        // #CONSOLES
        // console.log("client_name", clientname)
        // console.log("application_type", application)
        // console.log("contacts", [contactEmails]);
        // console.log("redirect_uris", [redirectUris]);
        // console.log("post_logout_redirect_uris", [logoutredirecturi]);
        // console.log("jwks_uri", jwksUri);
        // console.log("jwks", jwksdata);
        // console.log("scope", userType);

        const formData = new FormData();
        formData.append("application_type", application);
        formData.append("client_name", clientname);
        formData.append("contacts", contactEmails);
        formData.append("redirect_uris", redirectUris);
        formData.append("post_logout_redirect_uris", logoutredirecturi);
        formData.append("jwks_uri", jwksUri);
        formData.append("jwks", jwksdata);
        formData.append("scope", userType);

        // Log FormData entries
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        if (clientname === '' || clientname === undefined) {
            document.getElementById("errClientname").innerHTML = "Enter app name"
            document.getElementById("errClientname").style.display = "block"
        }
        else if (redirectUri === '' || redirectUri === undefined) {
            document.getElementById("errRedirectURI").innerHTML = "Enter redirect uri"
            document.getElementById("errRedirectURI").style.display = "block"
        }
        else if (logoutredirecturis === '' || logoutredirecturis === undefined) {
            document.getElementById("errLogoutURI").innerHTML = "Enter logout uri"
            document.getElementById("errLogoutURI").style.display = "block"
        }
        else if (userType.length === '' || userType.length === 0 || userType === undefined || userType === null) {
            document.getElementById("errScopes").innerHTML = "Select Scopes"
            document.getElementById("errScopes").style.display = "block"
        }
        else {
            // return
            const response = await PostAppRegistrationForm(formData);
            setClientData(response)
            console.log('response', response)
            setShowUnderProcess(1)
            if (response.length > 0 || response.client_id != null) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save Successfully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.message)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 3000)
            }
        }

    };

    let changeUser = (name) => {
        document.getElementById("errScopes").style.display = "none"
        let data = [...userType];
        console.log("data", name);
        const index = data.findIndex((arr) => arr.scope === name);
        console.log('index', index);

        if (index !== -1) {
            // Remove the item at the found index
            data.splice(index, 1);
        } else {
            // Add the new item
            console.log("LIST OF DATA", name);
            data.push({
                ...name,
                scope: name
            });
        }

        // Update the "Select All" checkbox state
        const allSelected = data.length === scopeData.length;
        document.getElementById('ddlSelectAllUser').checked = allSelected;

        console.log("FINAL", data);

        // Update userType with the array of selected scopes
        setUserType(data);
    };

    let handlerSelectAll = () => {
        document.getElementById("errScopes").style.display = "none"
        const isSelectedAll = document.getElementById("ddlSelectAllUser").checked;
        let tempArr = [];
        console.log('isSelectedAll', isSelectedAll);
        for (let i = 0; i < scopeData.length; i++) {
            const scopeName = scopeData[i].name;
            const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${scopeName}"]`);
            if (checkboxes.length > 0) {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = isSelectedAll;
                    if (isSelectedAll) {
                        tempArr.push({
                            scope: scopeName
                        });
                    }
                });
            } else {
                console.warn(`Checkboxes for name "${scopeName}" not found.`);
            }
        }
        console.log('tempArr', tempArr);
        const scopesjson = JSON.stringify(tempArr); // Convert tempArr to a JSON string
        const parsedScopes = JSON.parse(scopesjson); // Parse the JSON string back to an array
        const formattedScopes = parsedScopes.map(item => item.scope).join(' '); // Use map() on the array
        console.log('formattedScopes', formattedScopes);
        setUserType(formattedScopes);

    };

    let handleClear = () => {
        setClientName('')
        setContactEmail('');
        setRedirectUri('')
        setLogoutRedirectUris('')
        setJwksUri('')
        setJwks('')

        document.getElementById("errRedirectURI").style.display = "none"
        document.getElementById("errLogoutURI").style.display = "none"
        document.getElementById("errClientname").style.display = "none"

    }
    useEffect(() => {
        getAllScopes();
        document.getElementById('systemclient').checked = true
    }, [])
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className='clientSecret'>
                        <div>
                            <Heading text="App Registration Form" />
                        </div>
                        <div>
                            <div className='clientSecret-inn'>
                                <div> <span className='clientdata'>Client Id:&nbsp;</span><span className='clientdatadetails'>{clientData.client_id}</span></div>
                                <div> <span className='clientdata'>Client Secret:&nbsp;</span><span className='clientdatadetails'> {clientData.client_secret} </span></div>
                            </div>
                        </div>
                    </div>

                    <BoxContainer>
                        <div className='applcn-main'>
                            <div className="aplclable">
                                <label htmlFor="name" className="form-label">Application Type<span className="starMandatory">*</span></label>
                                <div className='lifestyleStatus'>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="applicationType" value="system" onClick={() => { handleApplicationType(1, '', 'private') }} checked={applicationType === 1 ? true : false} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">Confidential</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="applicationType" onClick={() => { handleApplicationType(2, 'system', 'public') }} checked={applicationType === 2 ? true : false} />
                                        {/* <input className="form-check-input" type="radio" name="applicationType" onClick={handlePublicRadio} checked={!isPublic} /> */}
                                        <label className="form-check-label" htmlFor="flexRadioDefault">Public</label>
                                    </div>
                                </div>
                            </div>
                            {applicationType === 1 ?
                                <div className="aplcn-label">
                                    <label htmlFor="name" className="form-label">Application Context<span className="starMandatory"></span></label>
                                    <div className='lifestyleStatus'>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault">Single Patient Application
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault">Multiple Patients Application
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id='systemclient' name="flexRadioDefault" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault">System Client Application
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault">Multipurpose Application
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="aplcn-label">
                                    <label htmlFor="name" className="form-label">Application Context<span className="starMandatory">*</span></label>
                                    <div className='lifestyleStatus'>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="ApplicationContext" />
                                            <label className="form-check-label" htmlFor="ApplicationContext" >Single Patient Application
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="ApplicationContext" />
                                            <label className="form-check-label" htmlFor="ApplicationContext">Multiple Patients Application
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="ApplicationContext" />
                                            <label className="form-check-label" htmlFor="ApplicationContext">Multipurpose Application
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>

                    </BoxContainer>

                    <BoxContainer>
                        <div className='row'>
                            <div className='app-inner'>
                                <div className="mb-2 me-2">
                                    <label for="bedName" class="form-label relative">App Name<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="" name='client_name' placeholder='Enter app name' value={clientname} onChange={handleInputChange} />
                                    <small id="errClientname" className="form-text text-danger" style={{ display: 'none' }}>
                                    </small>
                                </div>
                                <div className="mb-2 me-2">
                                    <label for="bedName" class="form-label relative">Contact Email</label>
                                    <input type="text" className="form-control form-control-sm" autocomplete="off" id="contactEmail" name='contacts' value={contactEmail} placeholder='Enter contact email' onChange={handleInputChange} />
                                    <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                    </small>
                                </div>
                                <div className="mb-2 me-2">
                                    <label for="bedName" class="form-label relative">App Redirect URI<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="" name='redirectUri' value={redirectUri} placeholder='Enter URI' onChange={handleInputChange} />
                                    <small id="errRedirectURI" className="form-text text-danger" style={{ display: 'none' }}>
                                    </small>
                                </div>
                                <div className="mb-2 me-2">
                                    <label for="bedName" class="form-label relative">App Logout URI<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="" name='post_logout_redirect_uris' value={logoutredirecturis} placeholder='Enter URI' onChange={handleInputChange} />
                                    <small id="errLogoutURI" className="form-text text-danger" style={{ display: 'none' }}>
                                    </small>
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-4 mb-2">
                                    <label htmlFor="caretakerName" className="form-label">Scopes Requested<span className="starMandatory">*</span></label>
                                    <div className="dropdown">
                                        <button className="btn btn-light dropdown-toggle multi-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            Select Scopes
                                        </button>
                                        <ul className="dropdown-menu multistyl">
                                            <li className="d-flex flex-row ps-1 gap-2">
                                                <input type="checkbox" id="ddlSelectAllUser" onChange={handlerSelectAll} />
                                                <span>Select all</span>
                                            </li>
                                            {filteredOptions.length > 0 ? (
                                                filteredOptions.map((val) => (
                                                    <li className="d-flex flex-row ps-1 gap-2" key={val.name}>
                                                        <input type="checkbox" name={val.name} id={val.name} onClick={() => { changeUser(val.name); }} />
                                                        <label htmlFor={val.name}>{val.name}</label>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No options available</li>
                                            )}


                                        </ul>
                                        <small id="errScopes" className="form-text text-danger" style={{ display: 'none' }}></small>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </BoxContainer>
                    {applicationType === 1 ?
                        <div className='whitebg_'>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="fieldsett-in">
                                        <div className="fieldsett">
                                            <span className='fieldse'>{t("The following items are required for System Scopes")}</span>
                                            <div className='ModalFields mt-2'>
                                                <div className=" ModalFields-inn">
                                                    <label for="bedName" class="form-label relative">JSON Web Key Set URI</label>
                                                    <input type="text" className="form-control form-control-sm" id="startDateTime" name='jwks' placeholder='Enter URI' value={jwks} onChange={handleInputChange} />
                                                    <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div>

                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label">JSON Web Key Set (Note a hosted web URI is preferred and this feature may be removed in future SMART versions)</label>
                                                    <textarea className='mt-1 form-control' id="descriptionOfTheDisclosure" name="jwks_uri" value={jwksUri} style={{ height: '110px' }} onChange={handleInputChange} ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : ''}
                    <div className="med-box mt-2">
                        <div class="inner-content text-right">
                            <div class="mb-2 mt-2 relative">
                                {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                    <>
                                        {showToster === 1 ?
                                            <Toster value={tosterValue} message={tosterMessage} />
                                            :
                                            <div>
                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleSubmit}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                            </div>}
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default AppRegistrationForm
