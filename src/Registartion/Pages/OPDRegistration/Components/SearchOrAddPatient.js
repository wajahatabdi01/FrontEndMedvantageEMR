import { useTranslation } from 'react-i18next';

const SearchOrAddPatient = () => {
    const { t } = useTranslation();
    return (
        <>
            <div className='col-12'>
                <div className="row">
                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtName" className="form-label">{t("Name")}</label>
                        <input type="text" className="form-control form-control-sm" id="txtName" placeholder={t("Enter Name")} name='Name' />
                        <small id="errName" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtAttention" className="form-label">{t("Attention")}</label>
                        <input type="text" className="form-control form-control-sm" id="txtAttention" placeholder={t("Enter Attention")} name='Attention' />
                        <small id="errAttention" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtAddress1" className="form-label">{t("Address1")}</label>
                        <textarea name="Address1" id="txtAddress1" className="form-control form-control-sm" rows="1" placeholder={t("Enter Address")}></textarea>
                        <small id="errAddress1" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtAddress2" className="form-label">{t("Address2")}</label>
                        <textarea name="Address2" id="txtAddress2" className="form-control form-control-sm" rows="1" placeholder={t("Enter Address")}></textarea>
                        <small id="errAddress2" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtCity" className="form-label">{t("City")}</label>
                        <input type="text" className="form-control form-control-sm" id="txtCity" placeholder={t("Enter City")} name='city' />
                        <small id="errCity" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtState" className="form-label">{t("State")}</label>
                        <input type="text" className="form-control form-control-sm" id="txtState" placeholder={t("Enter State")} name='state' />
                        <small id="errState" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                </div>
            </div>

            <div className='col-12'>
                <div className="row">
                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtZip" className="form-label">{t("Zip")}</label>
                        <input type="text" className="form-control form-control-sm" id="txtZip" placeholder={t("Enter Zip")} name='Zip' />
                        <small id="errZip" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtCountry" className="form-label">{t("Country")}</label>
                        <input type="text" className="form-control form-control-sm" id="txtCountry" placeholder={t("Enter Country")} name='Country' />
                        <small id="errCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtPhoneNumber" className="form-label">{t("Phone Number")}</label>
                        <input type="number" className="form-control form-control-sm" id="txtPhoneNumber" placeholder={t("Enter Phone Number")} name='PhoneNumber' />
                        <small id="errPhoneNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-md-2 mb-2">
                        <label htmlFor="txtPayerId" className="form-label">{t("Payer ID")}</label>
                        <input type="text" className="form-control form-control-sm" id="txtPayerId" placeholder={t("Enter Payed ID")} name='PayerId' />
                        <small id="errPayerId" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-md-2 mb-2">
                        <label htmlFor="ddlPayerType" className="form-label">{t("Payer Type")}</label>
                        <div className='d-flex gap-3' >
                            <select className="form-select form-select-sm" id="ddlPayerType" aria-label=".form-select-sm example" name='PayerType' >
                                <option value="1" selected>select</option>
                                <option value="2">a</option>
                                <option value="3">a</option>
                                <option value="4">s</option>
                                <option value="5">d</option>
                            </select>
                        </div>
                        <small id="errPayerType" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-md-2 mb-2">
                        <label htmlFor="ddlX12Partner" className="form-label">{t("X12 Partner")}</label>
                        <div className='d-flex gap-3' >
                            <select className="form-select form-select-sm" id="ddlX12Partner" aria-label=".form-select-sm example" name='X12Partner' >
                                <option value="1" selected>select</option>
                                <option value="2">a</option>
                                <option value="3">a</option>
                                <option value="4">s</option>
                                <option value="5">d</option>
                            </select>
                        </div>
                        <small id="errX12Partner" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                </div>
            </div>

            <div className='col-12'>
                <div className="row">
                    <div className='dflex'>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlCQMSourceOfPayment" className="form-label">{t("CQM Source Of Payment")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlCQMSourceOfPayment" aria-label=".form-select-sm example" name='CQMSourceOfPayment' >
                                    <option value="1" selected>select</option>
                                    <option value="2">a</option>
                                    <option value="3">a</option>
                                    <option value="4">s</option>
                                    <option value="5">d</option>
                                </select>
                            </div>
                            <small id="errCQMSourceOfPayment" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className='d-flex gap-1 justify-content-end' >
                            <button type="button" className="btn btn-save btn-save-fill btn-sm" id='btnSave' style={{ marginTop: '24px' }}>{t("Save1")}</button>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm" id='btnSave' style={{ marginTop: '24px' }}>{t("Save2")}</button>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm" id='btnSave' style={{ marginTop: '24px' }}>{t("Save3")}</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SearchOrAddPatient