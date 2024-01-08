import { useTranslation } from 'react-i18next';

const InsuranceDetails = () => {
    const handlePrimaryInsuranceProviderChange = () => {
    };
    const { t } = useTranslation();
    return (
        <>
            {/* Primary Insurance Provider */}
            <div className="row">
                <div className="col-md-4 mb-2">
                    <div className='d-flex flex-wrap gap-3' >
                        <div style={{ width: '250px' }}>
                            <label htmlFor="ddlPrimary" className="form-label">{t("Primary Insurance Provider")}</label>
                            <select className="form-select form-select-sm" id="ddlPrimary" aria-label=".form-select-sm example" name='primaryInsuranceprovider' onChange={handlePrimaryInsuranceProviderChange}>
                                <option value="1" selected>Unassigned</option>
                                <option value="2">A</option>
                                <option value="3">B</option>
                                <option value="4">C</option>
                                <option value="5">D</option>
                            </select>
                            <div id="errPrimary" className="form-text text-danger" style={{ display: 'none' }}></div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm" id='btnSave' style={{ marginTop: '24px' }}>{t("Search/ Add Insurer")}</button>
                        </div>
                    </div>

                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPlanName" className="form-label">{t("Plan Name")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtPlanName" placeholder={t("Enter Plan Name")} name='planName' />
                            <small id="errPlanName" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-3 mb-2">
                            <label htmlFor="txtSubscriber" className="form-label">{t("Subscriber")}</label>
                            <div className='d-flex gap-1'>
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber" name='Subscriber' />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber1" name='Subscriber' />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber1" name='Subscriber' />
                            </div>
                            <small id="errSubscriber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-1 mb-2">
                            <label htmlFor="txtEffectiveDate" className="form-label">{t("Effective Date")}</label>
                            <div className='d-flex'>
                                <input type="date" className="form-control form-control-sm" id="txtEffectiveDate" placeholder={t("Enter Effective Date")} name='EffectiveDate' />
                            </div>
                            <small id="errEffectiveDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlRelationship" className="form-label">{t("Relationship")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlRelationship" aria-label=".form-select-sm example" name='Relationship' >
                                    <option value="1" selected>Unassigned</option>
                                    <option value="2">Mother</option>
                                    <option value="3">Father</option>
                                    <option value="4">Brother</option>
                                    <option value="5">Sister</option>
                                </select>
                            </div>
                            <small id="errRelationship" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPolicyNumber" className="form-label">{t("Policy Number")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtPolicyNumber" placeholder={t("Enter Policy Number")} name='PolicyNumber' />
                            <small id="errPolicyNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtDOB" className="form-label">{t("DOB")}</label>
                            <input type="date" className="form-control form-control-sm" id="txtDOB" placeholder={t("Enter Policy Number")} name='dob' />
                            <small id="errDOB" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>

                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSS" className="form-label">{t("S.S.")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSS" placeholder={t("Enter S.S.")} name='ss' />
                            <small id="errSS" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubscriberEmployer" className="form-label">{t("Subscriber Employer")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSubscriberEmployer" placeholder={t("Enter Subscriber Employer")} name='SubscriberEmployer' />
                            <small id="errSubscriberEmployer" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSex" className="form-label">{t("Sex")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSex" aria-label=".form-select-sm example" name='sex' >
                                    <option value="1" selected>select</option>
                                    <option value="2">Male</option>
                                    <option value="3">Female</option>
                                    <option value="4">Trans</option>
                                    <option value="5">Other</option>
                                </select>
                            </div>
                            <small id="errSex" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSEAddress" className="form-label">{t("SE Address")}</label>
                            <textarea name="SEAddress" id="txtSEAddress" className="form-control form-control-sm" rows="1" placeholder={t("Enter SE Address")}></textarea>
                            <small id="errSEAddress" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine1" className="form-label">{t("Subsciber Address Line1")}</label>
                            <textarea name="SubsciberAddressLine1" id="txtSubsciberAddressLine1" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line1")}></textarea>
                            <small id="errSubsciberAddressLine1" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine2" className="form-label">{t("Subsciber Address Line2")}</label>
                            <textarea name="SubsciberAddressLine2" id="txtSubsciberAddressLine2" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line2")}></textarea>
                            <small id="errSubsciberAddressLine2" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSECity" className="form-label">{t("SE City")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSECity" placeholder={t("Enter SE City")} name='secity' />
                            <small id="errSECity" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCity" className="form-label">{t("City")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtCity" placeholder={t("Enter City")} name='city' />
                            <small id="errCity" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSEState" className="form-label">{t("SE State")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSEState" aria-label=".form-select-sm example" name='SEState' >
                                    <option value="1" selected>select</option>
                                    <option value="2">UP</option>
                                    <option value="3">MP</option>
                                    <option value="4">Ap</option>
                                    <option value="5">TN</option>
                                </select>
                            </div>
                            <small id="errSEState" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlState" className="form-label">{t("State")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlState" aria-label=".form-select-sm example" name='State' >
                                    <option value="1" selected>select</option>
                                    <option value="2">UP</option>
                                    <option value="3">MP</option>
                                    <option value="4">Ap</option>
                                    <option value="5">TN</option>
                                </select>
                            </div>
                            <small id="errState" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSEZipCode" className="form-label">{t("SE Zip Code")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCode" placeholder={t("Enter SE Zip Code")} name='SEZipCode' />
                            <small id="errSEZipCode" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtZipCode" className="form-label">{t("Zip Code")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCode" placeholder={t("Enter Zip Code")} name='ZipCode' />
                            <small id="errZipCode" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSECountry" className="form-label">{t("SE Country")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSECountry" aria-label=".form-select-sm example" name='SECountry' >
                                    <option value="1" selected>select</option>
                                    <option value="2">India</option>
                                    <option value="3">England</option>
                                    <option value="4">Austrlia</option>
                                    <option value="5">US</option>
                                </select>
                            </div>
                            <small id="errSECountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlCountry" className="form-label">{t("Country")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlCountry" aria-label=".form-select-sm example" name='Country' >
                                    <option value="1" selected>select</option>
                                    <option value="2">India</option>
                                    <option value="3">England</option>
                                    <option value="4">Austrlia</option>
                                    <option value="5">US</option>
                                </select>
                            </div>
                            <small id="errCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPhoneNumber" className="form-label">{t("Phone Number")}</label>
                            <input type="number" className="form-control form-control-sm" id="txtPhoneNumber" placeholder={t("Enter Phone Number")} name='PhoneNumber' />
                            <small id="errPhoneNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCoPay" className="form-label">{t("Co Pay")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtCoPay" placeholder={t("Enter Co Pay")} name='copay' />
                            <small id="errcopay" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtGroupNumber" className="form-label">{t("Group Number")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtGroupNumber" placeholder={t("Enter Group Number")} name='groupNumber' />
                            <small id="errGroupNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlAcceptAssignment" className="form-label">{t("Accept Assignment")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlAcceptAssignment" aria-label=".form-select-sm example" name='AcceptAssignment' >
                                    <option value="1" selected>select</option>
                                    <option value="2">Yes</option>
                                    <option value="3">No</option>
                                </select>
                            </div>
                            <small id="errAcceptAssignment" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                    </div>
                    <hr />
                </div>
            </div>

            {/* Secondary Insurance Provider */}
            <div className="row">
                <div className="col-md-4 mb-2">
                    <div className='d-flex flex-wrap gap-3' >
                        <div style={{ width: '250px' }}>
                            <label htmlFor="ddlSecondary" className="form-label">{t("Secondary Insurance Provider")}</label>
                            <select className="form-select form-select-sm" id="ddlSecondary" aria-label=".form-select-sm example" name='SecondaryInsuranceprovider' >
                                <option value="1" selected>Unassigned</option>
                                <option value="2">A</option>
                                <option value="3">B</option>
                                <option value="4">C</option>
                                <option value="5">D</option>
                            </select>
                            <div id="errSecondaryy" className="form-text text-danger" style={{ display: 'none' }}></div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm" id='btnSave' style={{ marginTop: '24px' }}>{t("Search/ Add Insurer")}</button>
                        </div>
                    </div>

                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPlanNameSecondary" className="form-label">{t("Plan Name")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtPlanNameSecondary" placeholder={t("Enter Plan Name")} name='planNameSecondary' />
                            <small id="errPlanNameSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-3 mb-2">
                            <label htmlFor="txtSubscriberSecondary" className="form-label">{t("Subscriber")}</label>
                            <div className='d-flex gap-1'>
                                <input type="text" className="form-control form-control-sm" id="txtSubscriberSecondary" name='Subscriber1Secondary' />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber1Secondary" name='Subscriber2Secondary' />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber2Secondary" name='Subscribe3Secondary' />
                            </div>
                            <small id="errSubscriberSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-1 mb-2">
                            <label htmlFor="txtEffectiveDateSecondary" className="form-label">{t("Effective Date")}</label>
                            <div className='d-flex'>
                                <input type="date" className="form-control form-control-sm" id="txtEffectiveDateSecondary" placeholder={t("Enter Effective Date")} name='EffectiveDateSecondary' />
                            </div>
                            <small id="errEffectiveDateSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlRelationshipSecondary" className="form-label">{t("Relationship")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlRelationshipSecondary" aria-label=".form-select-sm example" name='RelationshipSecondary' >
                                    <option value="1" selected>Unassigned</option>
                                    <option value="2">Mother</option>
                                    <option value="3">Father</option>
                                    <option value="4">Brother</option>
                                    <option value="5">Sister</option>
                                </select>
                            </div>
                            <small id="errRelationshipSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPolicyNumberSecondary" className="form-label">{t("Policy Number")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtPolicyNumberSecondary" placeholder={t("Enter Policy Number")} name='PolicyNumberSecondary' />
                            <small id="errPolicyNumberSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtDOBSecondary" className="form-label">{t("DOB")}</label>
                            <input type="date" className="form-control form-control-sm" id="txtDOBSecondary" placeholder={t("Enter Policy Number")} name='dobSecondary' />
                            <small id="errDOBSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>

                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSSSecondary" className="form-label">{t("S.S.")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSSSecondary" placeholder={t("Enter S.S.")} name='ssSecondary' />
                            <small id="errSSSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubscriberEmployerSecondary" className="form-label">{t("Subscriber Employer")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSubscriberEmployerSecondary" placeholder={t("Enter Subscriber Employer")} name='SubscriberEmployerSecondary' />
                            <small id="errSubscriberEmployerSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSexSecondary" className="form-label">{t("Sex")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSexSecondary" aria-label=".form-select-sm example" name='sexSecondary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">Male</option>
                                    <option value="3">Female</option>
                                    <option value="4">Trans</option>
                                    <option value="5">Other</option>
                                </select>
                            </div>
                            <small id="errSexSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSEAddressSecondary" className="form-label">{t("SE Address")}</label>
                            <textarea name="SEAddressSecondary" id="txtSEAddressSecondary" className="form-control form-control-sm" rows="1" placeholder={t("Enter SE Address")}></textarea>
                            <small id="errSEAddressSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine1Secondary" className="form-label">{t("Subsciber Address Line1")}</label>
                            <textarea name="SubsciberAddressLine1Secondary" id="txtSubsciberAddressLine1Secondary" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line1")}></textarea>
                            <small id="errSubsciberAddressLine1Secondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine2Secondary" className="form-label">{t("Subsciber Address Line2")}</label>
                            <textarea name="SubsciberAddressLine2Secondary" id="txtSubsciberAddressLine2Secondary" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line2")}></textarea>
                            <small id="errSubsciberAddressLine2Secondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSECitySecondary" className="form-label">{t("SE City")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSECitySecondary" placeholder={t("Enter SE City")} name='SEcitySecondary' />
                            <small id="errSECitySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCitySecondary" className="form-label">{t("City")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtCitySecondary" placeholder={t("Enter City")} name='citySecondary' />
                            <small id="errCitySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSEStateSecondary" className="form-label">{t("SE State")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSEStateSecondary" aria-label=".form-select-sm example" name='SEStateSecondary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">UP</option>
                                    <option value="3">MP</option>
                                    <option value="4">Ap</option>
                                    <option value="5">TN</option>
                                </select>
                            </div>
                            <small id="errSEStateSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlStateSecondary" className="form-label">{t("State")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlStateSecondary" aria-label=".form-select-sm example" name='StateSecondary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">UP</option>
                                    <option value="3">MP</option>
                                    <option value="4">Ap</option>
                                    <option value="5">TN</option>
                                </select>
                            </div>
                            <small id="errStateSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSEZipCodeSecondary" className="form-label">{t("SE Zip Code")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCodeSecondary" placeholder={t("Enter SE Zip Code")} name='SEZipCodeSecondary' />
                            <small id="errSEZipCodeSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtZipCodeSecondary" className="form-label">{t("Zip Code")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCodeSecondary" placeholder={t("Enter Zip Code")} name='ZipCodeSecondary' />
                            <small id="errZipCodeSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSECountrySecondary" className="form-label">{t("SE Country")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSECountrySecondary" aria-label=".form-select-sm example" name='SECountrySecondary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">India</option>
                                    <option value="3">England</option>
                                    <option value="4">Austrlia</option>
                                    <option value="5">US</option>
                                </select>
                            </div>
                            <small id="errSECountrySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlCountrySecondary" className="form-label">{t("Country")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlCountrySecondary" aria-label=".form-select-sm example" name='CountrySecondary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">India</option>
                                    <option value="3">England</option>
                                    <option value="4">Austrlia</option>
                                    <option value="5">US</option>
                                </select>
                            </div>
                            <small id="errCountrySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPhoneNumberSecondary" className="form-label">{t("Phone Number")}</label>
                            <input type="number" className="form-control form-control-sm" id="txtPhoneNumberSecondary" placeholder={t("Enter Phone Number")} name='PhoneNumberSecondary' />
                            <small id="errPhoneNumberSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCoPaySecondary" className="form-label">{t("Co Pay")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtCoPaySecondary" placeholder={t("Enter Co Pay")} name='copaySecondary' />
                            <small id="errcopaySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtGroupNumberSecondary" className="form-label">{t("Group Number")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtGroupNumberSecondary" placeholder={t("Enter Group Number")} name='groupNumberSecondary' />
                            <small id="errGroupNumberSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlAcceptAssignmentSecondary" className="form-label">{t("Accept Assignment")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlAcceptAssignmentSecondary" aria-label=".form-select-sm example" name='AcceptAssignmentSecondary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">Yes</option>
                                    <option value="3">No</option>
                                </select>
                            </div>
                            <small id="errAcceptAssignmentSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                    </div>
                    <hr />
                </div>
            </div>

            {/* Tertiary Insurance Provider */}

            <div className="row">
                <div className="col-md-4 mb-2">
                    <div className='d-flex flex-wrap gap-3' >
                        <div style={{ width: '250px' }}>
                            <label htmlFor="ddlTertiary" className="form-label">{t("Tertiary Insurance Provider")}</label>
                            <select className="form-select form-select-sm" id="ddlTertiary" aria-label=".form-select-sm example" name='TertiaryInsuranceprovider' >
                                <option value="1" selected>Unassigned</option>
                                <option value="2">A</option>
                                <option value="3">B</option>
                                <option value="4">C</option>
                                <option value="5">D</option>
                            </select>
                            <div id="errTertiary" className="form-text text-danger" style={{ display: 'none' }}></div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm" id='btnSave' style={{ marginTop: '24px' }}>{t("Search/ Add Insurer")}</button>
                        </div>
                    </div>

                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPlanNameTertiary" className="form-label">{t("Plan Name")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtPlanNameTertiary" placeholder={t("Enter Plan Name")} name='planNameTertiary' />
                            <small id="errPlanNameTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-3 mb-2">
                            <label htmlFor="txtSubscriberTertiary" className="form-label">{t("Subscriber")}</label>
                            <div className='d-flex gap-1'>
                                <input type="text" className="form-control form-control-sm" id="txtSubscriberTertiary" name='SubscriberTertiary' />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber1Tertiary" name='SubscriberTertiary' />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber2Tertiary" name='SubscriberTertiary' />
                            </div>
                            <small id="errSubscriberTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-1 mb-2">
                            <label htmlFor="txtEffectiveDateTertiary" className="form-label">{t("Effective Date")}</label>
                            <div className='d-flex'>
                                <input type="date" className="form-control form-control-sm" id="txtEffectiveDateTertiary" placeholder={t("Enter Effective Date")} name='EffectiveDateTertiary' />
                            </div>
                            <small id="errEffectiveDateTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label">{t("Relationship")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='RelationshipTertiary' >
                                    <option value="1" selected>Unassigned</option>
                                    <option value="2">Mother</option>
                                    <option value="3">Father</option>
                                    <option value="4">Brother</option>
                                    <option value="5">Sister</option>
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPolicyNumberTertiary" className="form-label">{t("Policy Number")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtPolicyNumberTertiary" placeholder={t("Enter Policy Number")} name='PolicyNumberTertiary' />
                            <small id="errPolicyNumberTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtDOBTertiary" className="form-label">{t("DOB")}</label>
                            <input type="date" className="form-control form-control-sm" id="txtDOBTertiary" placeholder={t("Enter Policy Number")} name='dobTertiary' />
                            <small id="errDOBTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>

                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSSTertiary" className="form-label">{t("S.S.")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSS" placeholder={t("Enter S.S.")} name='ssTertiary' />
                            <small id="errSSTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubscriberEmployerTertiary" className="form-label">{t("Subscriber Employer")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSubscriberEmployerTertiary" placeholder={t("Enter Subscriber Employer")} name='SubscriberEmployerTertiary' />
                            <small id="errSubscriberEmployerTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSexTertiary" className="form-label">{t("Sex")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSexTertiary" aria-label=".form-select-sm example" name='sexTertiary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">Male</option>
                                    <option value="3">Female</option>
                                    <option value="4">Trans</option>
                                    <option value="5">Other</option>
                                </select>
                            </div>
                            <small id="errSexTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSEAddressTertiary" className="form-label">{t("SE Address")}</label>
                            <textarea name="SEAddress" id="txtSEAddressTertiary" className="form-control form-control-sm" rows="1" placeholder={t("Enter SE Address")}></textarea>
                            <small id="errSEAddressTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine1Tertiary" className="form-label">{t("Subsciber Address Line1")}</label>
                            <textarea name="SubsciberAddressLine1Tertiary" id="txtSubsciberAddressLine1Tertiary" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line1")}></textarea>
                            <small id="errSubsciberAddressLine1Tertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine2Tertiary" className="form-label">{t("Subsciber Address Line2")}</label>
                            <textarea name="SubsciberAddressLine2Tertiary" id="txtSubsciberAddressLine2Tertiary" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line2")}></textarea>
                            <small id="errSubsciberAddressLine2Tertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSECityTertiary" className="form-label">{t("SE City")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSECityTertiary" placeholder={t("Enter SE City")} name='secityTertiary' />
                            <small id="errSECityTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCityTertiary" className="form-label">{t("City")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtCityTertiary" placeholder={t("Enter City")} name='cityTertiary' />
                            <small id="errCityTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSEStateTertiary" className="form-label">{t("SE State")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSEStateTertiary" aria-label=".form-select-sm example" name='SEStateTertiary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">UP</option>
                                    <option value="3">MP</option>
                                    <option value="4">Ap</option>
                                    <option value="5">TN</option>
                                </select>
                            </div>
                            <small id="errSEStateTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlStateTertiary" className="form-label">{t("State")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlStateTertiary" aria-label=".form-select-sm example" name='StateTertiary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">UP</option>
                                    <option value="3">MP</option>
                                    <option value="4">Ap</option>
                                    <option value="5">TN</option>
                                </select>
                            </div>
                            <small id="errStateTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSEZipCodeTertiary" className="form-label">{t("SE Zip Code")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCodeTertiary" placeholder={t("Enter SE Zip Code")} name='SEZipCodeTertiary' />
                            <small id="errSEZipCodeTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtZipCodeTertiary" className="form-label">{t("Zip Code")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCodeTertiary" placeholder={t("Enter Zip Code")} name='ZipCodeTertiary' />
                            <small id="errZipCodeTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSECountryTertiary" className="form-label">{t("SE Country")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSECountryTertiary" aria-label=".form-select-sm example" name='SECountryTertiary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">India</option>
                                    <option value="3">England</option>
                                    <option value="4">Austrlia</option>
                                    <option value="5">US</option>
                                </select>
                            </div>
                            <small id="errSECountryTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlCountryTertiary" className="form-label">{t("Country")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlCountryTertiary" aria-label=".form-select-sm example" name='CountryTertiary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">India</option>
                                    <option value="3">England</option>
                                    <option value="4">Austrlia</option>
                                    <option value="5">US</option>
                                </select>
                            </div>
                            <small id="errCountryTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPhoneNumberTertiary" className="form-label">{t("Phone Number")}</label>
                            <input type="number" className="form-control form-control-sm" id="txtPhoneNumberTertiary" placeholder={t("Enter Phone Number")} name='PhoneNumberTertiary' />
                            <small id="errPhoneNumberTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCoPayTertiary" className="form-label">{t("Co Pay")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtCoPayTertiary" placeholder={t("Enter Co Pay")} name='copayTertiary' />
                            <small id="errcopayTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtGroupNumberTertiary" className="form-label">{t("Group Number")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtGroupNumberTertiary" placeholder={t("Enter Group Number")} name='groupNumberTertiary' />
                            <small id="errGroupNumberTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlAcceptAssignmentTertiary" className="form-label">{t("Accept Assignment")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlAcceptAssignmentTertiary" aria-label=".form-select-sm example" name='AcceptAssignmentTertiary' >
                                    <option value="1" selected>select</option>
                                    <option value="2">Yes</option>
                                    <option value="3">No</option>
                                </select>
                            </div>
                            <small id="errAcceptAssignmentTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default InsuranceDetails;