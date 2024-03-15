import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';

import { t } from 'i18next'

function AppRegistrationForm() {
    let [userType, setUserType] = useState([]);
    let [isPublic, setIsPublic] = useState(false);
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

    let handleConfidentialRadio = () => {
        setIsPublic(true);
        setTimeout(() => {
            document.getElementById("systemCLient").checked = true
        }, 200)
    }
    let handlePublicRadio = () => {
        setIsPublic(false);
    }
    let changeUser = (ids) => {
        let data = [...userType]
        console.log("data", ids)
        if (data.length === 0) {
            data.push(
                {
                    id: ids
                }
            )
        }
        else {
            console.log('data List', data)
            var index = data.findIndex((arr, i) => arr.id === ids);
            console.log('index', index)

            if (index !== -1) {
                document.getElementById('ddlSelectAllUser').checked = false;
                data.splice(index, 1);
            }
            else {
                data.push(
                    {
                        id: ids
                    }
                )
            }
        }
        setUserType(data)
    };

    let handlerSelectAll = () => {
        const isSelectedAll = document.getElementById("ddlSelectAllUser").checked;
        let tempArr = [];
        console.log('isSelectedAll', isSelectedAll)
        for (var i = 0; i < scopesList.length; i++) {
            let getID = scopesList[i].id;
            if (isSelectedAll === true) {
                document.getElementById(getID).checked = true;
                tempArr.push({
                    id: getID
                })
            }
            else {
                document.getElementById(getID).checked = false;
            }
        }

        console.log('tempArr', tempArr)
        setUserType(tempArr)
    }
    useEffect(() => {
        handleConfidentialRadio();
        handlePublicRadio();
        setIsPublic(true);
    }, [])
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">

                    <Heading text="App Registration Form" />
                    <BoxContainer>
                        <div className='applcn-main'>
                            <div className="aplclable">
                                <label htmlFor="name" className="form-label">Application Type<span className="starMandatory">*</span></label>
                                <div className='lifestyleStatus'>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault1" onClick={handleConfidentialRadio} checked={isPublic} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">Confidential</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault1" onClick={handlePublicRadio} checked={!isPublic} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault">Public</label>
                                    </div>
                                </div>
                            </div>
                            {isPublic === true ?
                                <div className="aplcn-label">
                                    <label htmlFor="name" className="form-label">Application Context<span className="starMandatory">*</span></label>
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
                                            <input className="form-check-input" type="radio" id="systemCLient" name="flexRadioDefault" />
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
                                    <label for="bedName" class="form-label relative">App Name</label>
                                    <input type="text" className="form-control form-control-sm" id="" name='appname' placeholder='Enter app name' onChange={"handleChange"} />
                                    <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                    </small>
                                </div>
                                <div className="mb-2 me-2">
                                    <label for="bedName" class="form-label relative">Contact Email</label>
                                    <input type="email" className="form-control form-control-sm" id="" name='email1' placeholder='Enter contact email' />
                                    <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                    </small>
                                </div>
                                <div className="mb-2 me-2">
                                    <label for="bedName" class="form-label relative">App Redirect URI</label>
                                    <input type="text" className="form-control form-control-sm" id="" name='appname' placeholder='Enter URI' onChange={"handleChange"} />
                                    <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                    </small>
                                </div>
                                <div className="mb-2 me-2">
                                    <label for="bedName" class="form-label relative">App Logout URI</label>
                                    <input type="text" className="form-control form-control-sm" id="" name='appname' placeholder='Enter URI' onChange={"handleChange"} />
                                    <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
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
                                            {scopesList && scopesList.map((val, index) => {
                                                return (
                                                    <>
                                                        <li className="d-flex flex-row ps-1 gap-2">
                                                            <input type="checkbox" name='ddlUserType' id={val.id} onClick={() => { changeUser(val.id); }} />
                                                            <span htmlFor="val.id">{val.name}</span>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                        </ul>
                                        <small id="errUser" className="form-text text-danger" style={{ display: 'none' }}></small>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </BoxContainer>
                    {isPublic === true ?
                        <div className='whitebg_'>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="fieldsett-in">
                                        <div className="fieldsett">
                                            <span className='fieldse'>{t("The following items are required for System Scopes")}</span>
                                            <div className='ModalFields mt-2'>
                                                <div className=" ModalFields-inn">
                                                    <label for="bedName" class="form-label relative">JSON Web Key Set URI</label>
                                                    <input type="text" className="form-control form-control-sm" id="startDateTime" name='appname' placeholder='Enter URI' onChange={"handleChange"} />
                                                    <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div>

                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label">JSON Web Key Set (Note a hosted web URI is preferred and this feature may be removed in future SMART versions)</label>
                                                    <textarea className='mt-1 form-control' id="descriptionOfTheDisclosure" name="descriptionOfTheDisclosure" style={{ height: '110px' }} ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : ''}

                    <div className='btnfooter'>
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={'handleSave'}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AppRegistrationForm
