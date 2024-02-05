import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GetCountryList from '../../../API/GET/GetCountryList';
import GetStateList from '../../../API/GET/GetStateList';
import GetUserListByRoleId from '../../../API/GET/GetUserListByRoleId';
import GetAllRelations from '../../../API/GET/GetAllRelations';
import patientOPD from '../../../../assets/images/icons/patientOPD.svg';
import calendar from '../../../../assets/images/icons/calendar.svg';
import emailIcon from '../../../../assets/images/icons/email.svg';
import city from '../../../../assets/images/icons/city.svg';
import addressIcon from '../../../../assets/images/icons/addressIcon.svg';
import IconPatientRelation from '../../../../assets/images/icons/IconPatientRelation.svg';
import stateIcon from '../../../../assets/images/icons/stateIcon.svg';
import smartphone from '../../../../assets/images/icons/smartphone.svg';
import Heading from '../../../../Component/Heading';

const InsuranceDetails = ({ initialPatientChoiceDetails, onInsuranceDetailsChange, getInsuranceDetailsPrimary, getInsuranceDetailsSecondry, getInsuranceDetailsTertiary ,clearStatus, setClearStatus}) => {
    let [insuranceDetails, setInsuranceDetails] = useState();
    let [countryList, setCountryList] = useState([]);
    let [providerList, setProviderList] = useState([]);
    let [relationList, setRelationList] = useState([]);
    let [stateListprimary, setStateListPrimary] = useState([]);
    let [stateListSEprimary, setStateListSEPrimary] = useState([]);
    let [stateListsecondry, setStateListSecondry] = useState([]);
    let [stateListSESecondry, setStateListSESecondry] = useState([]);
    let [stateListTertiary, setStateListTertiary] = useState([]);
    let [stateListSETertiary, setStateListSETertiary] = useState([]);
    let [sendFormPrimary, setSendFormPrimary] = useState(
        {
            insuranceProviderId: '',
            planName: '',
            subscriber1: '',
            subscriber2: '',
            subscriber3: '',
            effectiveDate: '',
            relationshipId: '',
            policyNumber: '',
            dob: '',
            groupNumber: '',
            subscriberEmployer: '',
            genderId: '',
            seAddress: '',
            subscriberAddressLine1: '',
            subscriberAddressLine2: '',
            seCity: '',
            socialSecurityNo: '',
            city: '',
            seStateId: '',
            stateId: '',
            seZipCode: '',
            zipCode: '',
            seCountryId: '',
            countryId: '',
            subscriberPhone: '',
            coPay: '',
            isAcceptAssignment: '',
        }
    );
    let [sendFormSecondary, setSendFormSecondary] = useState({
        insuranceProviderId: '',
        planName: '',
        subscriber1: '',
        subscriber2: '',
        subscriber3: '',
        effectiveDate: '',
        relationshipId: '',
        policyNumber: '',
        dob: '',
        groupNumber: '',
        subscriberEmployer: '',
        genderId: '',
        seAddress: '',
        subscriberAddressLine1: '',
        subscriberAddressLine2: '',
        seCity: '',
        socialSecurityNo: '',
        city: '',
        seStateId: '',
        stateId: '',
        seZipCode: '',
        zipCode: '',
        seCountryId: '',
        countryId: '',
        subscriberPhone: '',
        coPay: '',
        isAcceptAssignment: '',
    })
    let [sendFormTri, setSendFormTri] = useState({
        insuranceProviderId: '',
        planName: '',
        subscriber1: '',
        subscriber2: '',
        subscriber3: '',
        effectiveDate: '',
        relationshipId: '',
        policyNumber: '',
        dob: '',
        groupNumber: '',
        subscriberEmployer: '',
        genderId: '',
        seAddress: '',
        subscriberAddressLine1: '',
        subscriberAddressLine2: '',
        seCity: '',
        socialSecurityNo: '',
        city: '',
        seStateId: '',
        stateId: '',
        seZipCode: '',
        zipCode: '',
        seCountryId: '',
        countryId: '',
        subscriberPhone: '',
        coPay: '',
        isAcceptAssignment: '',
    });
    // const handlePrimaryInsuranceProviderChange = (e) => {
    //     const { name, value } = e.target;

    //     onInsuranceDetailsChange((prevPatientDetails) => ({
    //         ...prevPatientDetails,
    //         [name]: value,
    //     }));

    //     onInsuranceDetailsChange(name, value);
    // };

    const handlePrimary = (e) => {
        // -------Primary-----
        document.getElementById("errPrimary").style.display = "none"
        document.getElementById("errPlanName").style.display = "none"
        document.getElementById("errSubscriber").style.display = "none"
        document.getElementById("errEffectiveDate").style.display = "none"
        document.getElementById("errRelationship").style.display = "none"
        document.getElementById("errPolicyNumber").style.display = "none"
        document.getElementById("errGroupNumber").style.display = "none"
        document.getElementById("errAcceptAssignment").style.display = "none"
        document.getElementById("errSubscriberEmployer").style.display = "none"
        document.getElementById("errSEAddress").style.display = "none"
        document.getElementById("errSubsciberAddressLine1").style.display = "none"
        document.getElementById("errSubsciberAddressLine2").style.display = "none"
        document.getElementById("errCountry").style.display = "none"
        document.getElementById("errSECountry").style.display = "none"
        document.getElementById("errZipCode").style.display = "none"
        document.getElementById("errSEZipCode").style.display = "none"
        document.getElementById("errStatePrimary").style.display = "none"
        document.getElementById("errSEStateprimary").style.display = "none"
        document.getElementById("errCityprimary").style.display = "none"
        document.getElementById("errSECity").style.display = "none"
        const { name, value } = e.target;
        setSendFormPrimary((prevPatientDetails) => ({
            ...prevPatientDetails,
            [name]: value,
        }));
    };
    const handleSecondry = (e) => {

        document.getElementById("errSecondary").style.display = "none"
        document.getElementById("errPlanNameSecondary").style.display = "none"
        document.getElementById("errSubscriberSecondary").style.display = "none"
        document.getElementById("errEffectiveDateSecondary").style.display = "none"
        document.getElementById("errRelationshipSecondary").style.display = "none"
        document.getElementById("errPolicyNumberSecondary").style.display = "none"
        document.getElementById("errGroupNumberSecondary").style.display = "none"
        document.getElementById("errAcceptAssignmentSecondary").style.display = "none"
        document.getElementById("errSubscriberEmployerSecondary").style.display = "none"
        document.getElementById("errSEAddressSecondary").style.display = "none"
        document.getElementById("errSubsciberAddressLine1Secondary").style.display = "none"
        document.getElementById("errSubsciberAddressLine2Secondary").style.display = "none"
        document.getElementById("errCountrySecondary").style.display = "none"
        document.getElementById("errSECountrySecondary").style.display = "none"
        document.getElementById("errZipCodeSecondary").style.display = "none"
        document.getElementById("errSEZipCodeSecondary").style.display = "none"
        document.getElementById("errStateSecondary").style.display = "none"
        document.getElementById("errSEStateSecondary").style.display = "none"
        document.getElementById("errCitySecondary").style.display = "none"
        document.getElementById("errSECitySecondary").style.display = "none"
        const { name, value } = e.target;
        setSendFormSecondary((prevPatientDetails) => ({
            ...prevPatientDetails,
            [name]: value,
        }));
    };
    const handleTertiary = (e) => {
        document.getElementById("errTertiary").style.display = "none"
        document.getElementById("errPlanNameTertiary").style.display = "none"
        document.getElementById("errSubscriberTertiary").style.display = "none"
        document.getElementById("errEffectiveDateTertiary").style.display = "none"
        document.getElementById("errRelationshipTertiary").style.display = "none"
        document.getElementById("errPolicyNumberTertiary").style.display = "none"
        document.getElementById("errGroupNumberTertiary").style.display = "none"
        document.getElementById("errAcceptAssignmentTertiary").style.display = "none"
        document.getElementById("errSubscriberEmployerTertiary").style.display = "none"
        document.getElementById("errSEAddressTertiary").style.display = "none"
        document.getElementById("errSubsciberAddressLine1Tertiary").style.display = "none"
        document.getElementById("errSubsciberAddressLine2Tertiary").style.display = "none"
        document.getElementById("errCountryTertiary").style.display = "none"
        document.getElementById("errSECountryTertiary").style.display = "none"
        document.getElementById("errZipCodeTertiary").style.display = "none"
        document.getElementById("errSEZipCodeTertiary").style.display = "none"
        document.getElementById("errStateTertiary").style.display = "none"
        document.getElementById("errSEStateTertiary").style.display = "none"
        document.getElementById("errCityTertiary").style.display = "none"
        document.getElementById("errSECityTertiary").style.display = "none"
        const { name, value } = e.target;
        setSendFormTri((prevPatientDetails) => ({
            ...prevPatientDetails,
            [name]: value,
        }));
    };

    let [insuranceDetailsList, setInsuranceDetailsList] = useState({

    });

    const getUserListByRoleId = async () => {
        const param = {
            roleId: 2,
            clientID: window.clientId,
        }
        const response = await GetUserListByRoleId(param)
        if (response.status === 1) {
            setProviderList(response.responseValue)
            console.log("ProviderList", response.responseValue)
        }
    }


    let getCountryList = async () => {
        console.log('fetch country');
        let response = await GetCountryList();
        console.log('fetch country', response);
        if (response.status === 1) {
            setCountryList(response.responseValue);
            //getStateList(countryID);
        }
    }
    let getStateListPrimary = async (param) => {
        let data = await GetStateList(param);
        console.log('state list', data);
        if (data.status === 1) {

            setStateListPrimary(data.responseValue);
        }
        else {
            console.error(data.responseValue);
            setStateListPrimary([]);
        }
    }

    let getallRelation = async () => {
        const response = await GetAllRelations();
        if (response.status === 1) {
            setRelationList(response.responseValue);
        }
    }

    let getSEStateListPrimary = async (param) => {
        let data = await GetStateList(param);
        console.log('state list', data);
        if (data.status === 1) {

            setStateListSEPrimary(data.responseValue);
        }
        else {
            console.error(data.responseValue);
            setStateListSEPrimary([]);
        }
    }
    let onChangeCountryParimary = async (e) => {
        console.log('e.target', e.target.value);
        getStateListPrimary(e.target.value);
        setSendFormPrimary((prevData) => ({
            ...prevData,
            countryId: e.target.value
        }))
    };
    let onChangeCountrySEPrimary = async (e) => {
        console.log('e.target', e.target.value);
        getSEStateListPrimary(e.target.value);
        setSendFormPrimary((prevData) => ({
            ...prevData,
            seCountryId: e.target.value
        }))
    };

    //Secondry 
    let getStateListSecondry = async (param) => {
        let data = await GetStateList(param);
        console.log('state list', data);
        if (data.status === 1) {

            setStateListSecondry(data.responseValue);
        }
        else {
            console.error(data.responseValue);
            setStateListSecondry([]);
        }
    }
    let getSEStateListSecondry = async (param) => {
        let data = await GetStateList(param);
        console.log('state list', data);
        if (data.status === 1) {

            setStateListSESecondry(data.responseValue);
        }
        else {
            console.error(data.responseValue);
            setStateListSESecondry([]);
        }
    }
    let onChangeCountrySecondry = async (e) => {
        console.log('e.target', e.target.value);
        getStateListSecondry(e.target.value);
        setSendFormSecondary((prevData) => ({
            ...prevData,
            countryId: e.target.value
        }))
    };
    let onChangeCountrySESecondry = async (e) => {
        console.log('e.target', e.target.value);
        getSEStateListSecondry(e.target.value);
        setSendFormSecondary((prevData) => ({
            ...prevData,
            seCountryId: e.target.value
        }))
    };

    //Tertiary
    let getStateListTertiary = async (param) => {
        let data = await GetStateList(param);
        console.log('state list', data);
        if (data.status === 1) {

            setStateListTertiary(data.responseValue);
        }
        else {
            console.error(data.responseValue);
            setStateListTertiary([]);
        }
    }
    let getSEStateListTertiary = async (param) => {
        let data = await GetStateList(param);
        console.log('state list', data);
        if (data.status === 1) {

            setStateListSETertiary(data.responseValue);
        }
        else {
            console.error(data.responseValue);
            setStateListSETertiary([]);
        }
    }
    let onChangeCountryTertiary = async (e) => {
        console.log('e.target', e.target.value);
        getStateListTertiary(e.target.value);
        setSendFormTri((prevData) => ({
            ...prevData,
            countryId: e.target.value
        }))
    };
    let onChangeCountrySETertiary = async (e) => {
        console.log('e.target', e.target.value);
        getSEStateListTertiary(e.target.value);
        setSendFormTri((prevData) => ({
            ...prevData,
            seCountryId: e.target.value
        }))
    };
    useEffect(() => {
        // getStateList();
        getCountryList();
        getUserListByRoleId();
        getallRelation();
        getInsuranceDetailsPrimary(sendFormPrimary);
        getInsuranceDetailsSecondry(sendFormSecondary);
        getInsuranceDetailsTertiary(sendFormTri);
        if (clearStatus === 1) { 
            setClearStatus(0)
            setSendFormPrimary({
                insuranceProviderId: '',
                planName: '',
                subscriber1: '',
                subscriber2: '',
                subscriber3: '',
                effectiveDate: '',
                relationshipId: '',
                policyNumber: '',
                dob: '',
                groupNumber: '',
                subscriberEmployer: '',
                genderId: '',
                seAddress: '',
                subscriberAddressLine1: '',
                subscriberAddressLine2: '',
                seCity: '',
                socialSecurityNo: '',
                city: '',
                seStateId: '',
                stateId: '',
                seZipCode: '',
                zipCode: '',
                seCountryId: '',
                countryId: '',
                subscriberPhone: '',
                coPay: '',
                isAcceptAssignment: '',
            })
            setSendFormSecondary({
                insuranceProviderId: '',
                planName: '',
                subscriber1: '',
                subscriber2: '',
                subscriber3: '',
                effectiveDate: '',
                relationshipId: '',
                policyNumber: '',
                dob: '',
                groupNumber: '',
                subscriberEmployer: '',
                genderId: '',
                seAddress: '',
                subscriberAddressLine1: '',
                subscriberAddressLine2: '',
                seCity: '',
                socialSecurityNo: '',
                city: '',
                seStateId: '',
                stateId: '',
                seZipCode: '',
                zipCode: '',
                seCountryId: '',
                countryId: '',
                subscriberPhone: '',
                coPay: '',
                isAcceptAssignment: '',
            })
            setSendFormTri({
                insuranceProviderId: '',
                planName: '',
                subscriber1: '',
                subscriber2: '',
                subscriber3: '',
                effectiveDate: '',
                relationshipId: '',
                policyNumber: '',
                dob: '',
                groupNumber: '',
                subscriberEmployer: '',
                genderId: '',
                seAddress: '',
                subscriberAddressLine1: '',
                subscriberAddressLine2: '',
                seCity: '',
                socialSecurityNo: '',
                city: '',
                seStateId: '',
                stateId: '',
                seZipCode: '',
                zipCode: '',
                seCountryId: '',
                countryId: '',
                subscriberPhone: '',
                coPay: '',
                isAcceptAssignment: '',
            })
        }
    }, [sendFormPrimary, sendFormSecondary, sendFormTri, getInsuranceDetailsPrimary, getInsuranceDetailsSecondry, getInsuranceDetailsTertiary,clearStatus]);
    const { t } = useTranslation();
    return (
        <>
            {/* Primary Insurance Provider */}
            <Heading text="Primary Insurance Provider" />
            <div className="row">
                <div className="col-md-4 mb-2">
                    <div className='d-flex flex-wrap gap-3' >
                        <div style={{ width: '250px' }}>
                            <label htmlFor="ddlPrimary" className="form-label"><i class="bi bi-people-fill" style={{ color: '#546788' }}></i> {t("Primary Insurance Provider")}</label><sup style={{ color: "red" }}>*</sup>
                            <select className="form-select form-select-sm" id="ddlPrimary" aria-label=".form-select-sm example" name='insuranceProviderId' value={sendFormPrimary.insuranceProviderId} onChange={handlePrimary}>
                                <option value="0">{t("Select_Provider")}</option>
                                {providerList && providerList.map((list) => {
                                    return (
                                        <option value={list.id}>{list.name}</option>
                                    )
                                })}
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
                            <label htmlFor="txtPlanName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Plan Name")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtPlanName" placeholder={t("Enter Plan Name")} name='planName' value={sendFormPrimary.planName} onChange={handlePrimary} />
                            <small id="errPlanName" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-3 mb-2">
                            <label htmlFor="txtSubscriber" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subscriber")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-1'>
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber" name='subscriber1' value={sendFormPrimary.subscriber1} onChange={handlePrimary} />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber1" name='subscriber2' value={sendFormPrimary.subscriber2} onChange={handlePrimary} />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber1" name='subscriber3' value={sendFormPrimary.subscriber3} onChange={handlePrimary} />
                            </div>
                            <small id="errSubscriber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-1 mb-2">
                            <label htmlFor="txtEffectiveDate" className="form-label"><img src={calendar} className='icnn' alt='' />{t("Effective Date")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex'>
                                <input type="date" className="form-control form-control-sm" id="txtEffectiveDate" placeholder={t("Enter Effective Date")} name='effectiveDate' value={sendFormPrimary.effectiveDate} onChange={handlePrimary} />
                            </div>
                            <small id="errEffectiveDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlRelationship" className="form-label"><img src={IconPatientRelation} className='icnn' alt='' />{t("Relationship")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlRelationship" aria-label=".form-select-sm example" name='relationshipId' value={sendFormPrimary.relationshipId} onChange={handlePrimary} >
                                    <option value="0" selected>Select Relation</option>
                                    {relationList && relationList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationship" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPolicyNumber" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Policy Number")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtPolicyNumber" placeholder={t("Enter Policy Number")} name='policyNumber' value={sendFormPrimary.policyNumber} onChange={handlePrimary} />
                            <small id="errPolicyNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtDOB" className="form-label"><img src={calendar} className='icnn' alt='' />{t("DOB")}</label>
                            <input type="date" className="form-control form-control-sm" id="txtDOB" placeholder={t("Enter Policy Number")} name='dob' value={sendFormPrimary.dob} onChange={handlePrimary} />
                            <small id="errDOB" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>

                </div>

                <div className='col-12'>
                    <div className="row">
                        {/* <div className="col-md-2 mb-2">
                            <label htmlFor="txtSS" className="form-label">{t("S.S.")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSS" placeholder={t("Enter S.S.")} name='primaryss' value={sendFormPrimary.ss} onChange={handlePrimary} />
                            <small id="errSS" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div> */}

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubscriberEmployer" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subscriber Employer")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSubscriberEmployer" placeholder={t("Enter Subscriber Employer")} name='subscriberEmployer' value={sendFormPrimary.subscriberEmployer} onChange={handlePrimary} />
                            <small id="errSubscriberEmployer" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSex" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Sex")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSex" aria-label=".form-select-sm example" name='genderId' value={sendFormPrimary.genderId} onChange={handlePrimary}>
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
                            <label htmlFor="txtSEAddress" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("SE Address")}</label><sup style={{ color: "red" }}>*</sup>
                            <textarea name="seAddress" id="txtSEAddress" className="form-control form-control-sm" rows="1" placeholder={t("Enter SE Address")} value={sendFormPrimary.seAddress} onChange={handlePrimary}></textarea>
                            <small id="errSEAddress" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine1" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subsciber Address Line1")}</label><sup style={{ color: "red" }}>*</sup>
                            <textarea name="subscriberAddressLine1" id="txtSubsciberAddressLine1" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line1")} value={sendFormPrimary.subscriberAddressLine1} onChange={handlePrimary}></textarea>
                            <small id="errSubsciberAddressLine1" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine2" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subsciber Address Line2")}</label><sup style={{ color: "red" }}>*</sup>
                            <textarea name="subscriberAddressLine2" id="txtSubsciberAddressLine2" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line2")} value={sendFormPrimary.subscriberAddressLine2} onChange={handlePrimary}></textarea>
                            <small id="errSubsciberAddressLine2" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSECity" className="form-label"><img src={city} className='icnn' alt='' />{t("SE City")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSECity" placeholder={t("Enter SE City")} name='seCity' value={sendFormPrimary.seCity} onChange={handlePrimary} />
                            <small id="errSECity" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCity" className="form-label"><img src={city} className='icnn' alt='' />{t("City")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtCity" placeholder={t("Enter City")} name='city' value={sendFormPrimary.city} onChange={handlePrimary} />
                            <small id="errCityprimary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSECountry" className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("SE Country")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSECountry" aria-label=".form-select-sm example" name='seCountryId' value={sendFormPrimary.seCountryId} onChange={onChangeCountrySEPrimary} >
                                    <option value="0">{t("Select_Country")}</option>
                                    {countryList && countryList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.countryName}</option>
                                        )

                                    })}
                                </select>
                            </div>
                            <small id="errSECountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSEState" className="form-label"><img src={city} className='icnn' alt='' />{t("SE State")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSEState" aria-label=".form-select-sm example" name='seStateId' value={sendFormPrimary.seStateId} onChange={handlePrimary}>
                                    <option value="0">{t("Select_State")}</option>
                                    {stateListSEprimary && stateListSEprimary.map((list) => {
                                        return (
                                            <option value={list.id}>{list.stateName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <small id="errSEStateprimary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlCountry" className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Country")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlCountry" aria-label=".form-select-sm example" name='countryId' value={sendFormPrimary.countryId} onChange={onChangeCountryParimary}>
                                <option value="0">{t("Select_Country")}</option>
                                    {/* <select className="form-select form-select-sm" id="ddlCountry" aria-label=".form-select-sm example" name='countryId' value={sendFormPrimary.countryId} onChange={onChangeCountry}> */}
                                    {countryList && countryList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.countryName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlState" className="form-label"><img src={city} className='icnn' alt='' />{t("State")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlState" aria-label=".form-select-sm example" name='stateId' value={sendFormPrimary.stateId} onChange={handlePrimary}>
                                    <option value="0">{t("Select_State")}</option>
                                    {stateListprimary && stateListprimary.map((list) => {
                                        return (
                                            <option value={list.id}>{list.stateName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <small id="errStatePrimary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSEZipCode" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("SE Zip Code")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCode" placeholder={t("Enter SE Zip Code")} name='seZipCode' value={sendFormPrimary.seZipCode} onChange={handlePrimary} />
                            <small id="errSEZipCode" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtZipCode" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Zip Code")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCode" placeholder={t("Enter Zip Code")} name='zipCode' value={sendFormPrimary.zipCode} onChange={handlePrimary} />
                            <small id="errZipCode" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPhoneNumber" className="form-label"><img src={smartphone} className='icnn' alt='' />{t("Phone Number")}</label>
                            <input type="number" className="form-control form-control-sm" id="txtPhoneNumber" placeholder={t("Enter Phone Number")} name='subscriberPhone' value={sendFormPrimary.subscriberPhone} onChange={handlePrimary} />
                            <small id="errPhoneNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCoPay" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Co Pay")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtCoPay" placeholder={t("Enter Co Pay")} name='coPay' value={sendFormPrimary.coPay} onChange={handlePrimary} />
                            <small id="errcopay" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtGroupNumber" className="form-label"><i class="bi bi-people-fill" style={{ color: '#546788' }}></i> {t("Group Number")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtGroupNumber" placeholder={t("Enter Group Number")} name='groupNumber' value={sendFormPrimary.groupNumber} onChange={handlePrimary} />
                            <small id="errGroupNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlAcceptAssignment" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Accept Assignment")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlAcceptAssignment" aria-label=".form-select-sm example" name='isAcceptAssignment' value={sendFormPrimary.isAcceptAssignment} onChange={handlePrimary} >
                                    <option value="" selected>select</option>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                            <small id="errAcceptAssignment" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Insurance Provider */}
            <Heading text="Secondary Insurance Provider" />
            <div className="row">
                <div className="col-md-4 mb-2">
                    <div className='d-flex flex-wrap gap-3' >
                        <div style={{ width: '250px' }}>
                            <label htmlFor="ddlSecondary" className="form-label"><i class="bi bi-people-fill" style={{ color: '#546788' }}></i> {t("Secondary Insurance Provider")}</label><sup style={{ color: "red" }}>*</sup>
                            <select className="form-select form-select-sm" id="ddlSecondary" aria-label=".form-select-sm example" name='insuranceProviderId' value={sendFormSecondary.insuranceProviderId} onChange={handleSecondry}>
                                <option value="0">{t("Select_Provider")}</option>
                                {providerList && providerList.map((list) => {
                                    return (
                                        <option value={list.id}>{list.name}</option>
                                    )
                                })}
                            </select>
                            <div id="errSecondary" className="form-text text-danger" style={{ display: 'none' }}></div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm" id='btnSave' style={{ marginTop: '24px' }}>{t("Search/ Add Insurer")}</button>
                        </div>
                    </div>

                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPlanNameSecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Plan Name")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtPlanNameSecondary" placeholder={t("Enter Plan Name")} name='planName' value={sendFormSecondary.planName} onChange={handleSecondry} />
                            <small id="errPlanNameSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-3 mb-2">
                            <label htmlFor="txtSubscriberSecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subscriber")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-1'>
                                <input type="text" className="form-control form-control-sm" id="txtSubscriberSecondary" name='subscriber1' value={sendFormSecondary.subscriber1} onChange={handleSecondry} />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber1Secondary" name='subscriber2' value={sendFormSecondary.subscriber2} onChange={handleSecondry} />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber2Secondary" name='subscriber3' value={sendFormSecondary.subscriber3} onChange={handleSecondry} />
                            </div>
                            <small id="errSubscriberSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-1 mb-2">
                            <label htmlFor="txtEffectiveDateSecondary" className="form-label"><img src={calendar} className='icnn' alt='' />{t("Effective Date")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex'>
                                <input type="date" className="form-control form-control-sm" id="txtEffectiveDateSecondary" placeholder={t("Enter Effective Date")} name='effectiveDate' value={sendFormSecondary.effectiveDate} onChange={handleSecondry} />
                            </div>
                            <small id="errEffectiveDateSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlRelationshipSecondary" className="form-label"><img src={IconPatientRelation} className='icnn' alt='' />{t("Relationship")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlRelationshipSecondary" aria-label=".form-select-sm example" name='relationshipId' value={sendFormSecondary.relationshipId} onChange={handleSecondry}>
                                    <option value="0" selected>Select Relation</option>
                                    {relationList && relationList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPolicyNumberSecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Policy Number")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtPolicyNumberSecondary" placeholder={t("Enter Policy Number")} name='policyNumber' value={sendFormSecondary.policyNumber} onChange={handleSecondry} />
                            <small id="errPolicyNumberSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtDOBSecondary" className="form-label"><img src={calendar} className='icnn' alt='' />{t("DOB")}</label>
                            <input type="date" className="form-control form-control-sm" id="txtDOBSecondary" placeholder={t("Enter Policy Number")} name='dob' value={sendFormSecondary.dob} onChange={handleSecondry} />
                            <small id="errDOBSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>

                </div>

                <div className='col-12'>
                    <div className="row">
                        {/* <div className="col-md-2 mb-2">
                            <label htmlFor="txtSSSecondary" className="form-label">{t("S.S.")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSSSecondary" placeholder={t("Enter S.S.")} name='ssSecondary' value={sendFormSecondary.insuranceProviderId} onChange={handleSecondry} />
                            <small id="errSSSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div> */}

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubscriberEmployerSecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subscriber Employer")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSubscriberEmployerSecondary" placeholder={t("Enter Subscriber Employer")} name='subscriberEmployer' value={sendFormSecondary.subscriberEmployer} onChange={handleSecondry} />
                            <small id="errSubscriberEmployerSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSexSecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Sex")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSexSecondary" aria-label=".form-select-sm example" name='genderId' value={sendFormSecondary.genderId} onChange={handleSecondry}>
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
                            <label htmlFor="txtSEAddressSecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("SE Address")}</label><sup style={{ color: "red" }}>*</sup>
                            <textarea name="seAddress" id="txtSEAddressSecondary" className="form-control form-control-sm" rows="1" placeholder={t("Enter SE Address")} value={sendFormSecondary.seAddress} onChange={handleSecondry}></textarea>
                            <small id="errSEAddressSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine1Secondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subsciber Address Line1")}</label><sup style={{ color: "red" }}>*</sup>
                            <textarea name="subscriberAddressLine1" id="txtSubsciberAddressLine1Secondary" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line1")} value={sendFormSecondary.subscriberAddressLine1} onChange={handleSecondry}></textarea>
                            <small id="errSubsciberAddressLine1Secondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine2Secondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subsciber Address Line2")}</label><sup style={{ color: "red" }}>*</sup>
                            <textarea name="subscriberAddressLine2" id="txtSubsciberAddressLine2Secondary" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line2")} value={sendFormSecondary.subscriberAddressLine2} onChange={handleSecondry}></textarea>
                            <small id="errSubsciberAddressLine2Secondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSECitySecondary" className="form-label"><img src={city} className='icnn' alt='' />{t("SE City")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSECitySecondary" placeholder={t("Enter SE City")} name='seCity' value={sendFormSecondary.seCity} onChange={handleSecondry} />
                            <small id="errSECitySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCitySecondary" className="form-label"><img src={city} className='icnn' alt='' />{t("City")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtCitySecondary" placeholder={t("Enter City")} name='city' value={sendFormSecondary.city} onChange={handleSecondry} />
                            <small id="errCitySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSECountrySecondary" className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("SE Country")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSECountrySecondary" aria-label=".form-select-sm example" name='seCountryId' value={sendFormSecondary.seCountryId} onChange={onChangeCountrySESecondry} >
                                    <option value="0">{t("Select_Country")}</option>
                                    {countryList && countryList.map((list) => {

                                        return (
                                            <option value={list.id}>{list.countryName}</option>
                                        )

                                    })}
                                </select>
                            </div>
                            <small id="errSECountrySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSEStateSecondary" className="form-label"><img src={city} className='icnn' alt='' />{t("SE State")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSEStateSecondary" aria-label=".form-select-sm example" name='seStateId' value={sendFormSecondary.seStateId} onChange={handleSecondry}>
                                    <option value="0">{t("Select_State")}</option>
                                    {stateListSESecondry && stateListSESecondry.map((list) => {
                                        return (
                                            <option value={list.id}>{list.stateName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <small id="errSEStateSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlCountrySecondary" className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Country")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlCountrySecondary" aria-label=".form-select-sm example" name='countryId' value={sendFormSecondary.countryId} onChange={onChangeCountrySecondry}>
                                    <option value="0">{t("Select_Country")}</option>
                                    {countryList && countryList.map((list) => {

                                        return (
                                            <option value={list.id}>{list.countryName}</option>
                                        )

                                    })}
                                </select>
                            </div>
                            <small id="errCountrySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlStateSecondary" className="form-label"><img src={city} className='icnn' alt='' />{t("State")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlStateSecondary" aria-label=".form-select-sm example" name='stateId' value={sendFormSecondary.stateId} onChange={handleSecondry}>
                                    <option value="0">{t("Select_State")}</option>
                                    {stateListsecondry && stateListsecondry.map((list) => {
                                        return (
                                            <option value={list.id}>{list.stateName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <small id="errStateSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSEZipCodeSecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("SE Zip Code")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCodeSecondary" placeholder={t("Enter SE Zip Code")} name='seZipCode' value={sendFormSecondary.seZipCode} onChange={handleSecondry} />
                            <small id="errSEZipCodeSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtZipCodeSecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Zip Code")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCodeSecondary" placeholder={t("Enter Zip Code")} name='zipCode' value={sendFormSecondary.zipCode} onChange={handleSecondry} />
                            <small id="errZipCodeSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPhoneNumberSecondary" className="form-label"><img src={smartphone} className='icnn' alt='' />{t("Phone Number")}</label>
                            <input type="number" className="form-control form-control-sm" id="txtPhoneNumberSecondary" placeholder={t("Enter Phone Number")} name='subscriberPhone' value={sendFormSecondary.subscriberPhone} onChange={handleSecondry} />
                            <small id="errPhoneNumberSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCoPaySecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Co Pay")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtCoPaySecondary" placeholder={t("Enter Co Pay")} name='coPay' value={sendFormSecondary.coPay} onChange={handleSecondry} />
                            <small id="errcopaySecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtGroupNumberSecondary" className="form-label"><i class="bi bi-people-fill" style={{ color: '#546788' }}></i> {t("Group Number")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtGroupNumberSecondary" placeholder={t("Enter Group Number")} name='groupNumber' value={sendFormSecondary.groupNumber} onChange={handleSecondry} />
                            <small id="errGroupNumberSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlAcceptAssignmentSecondary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Accept Assignment")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlAcceptAssignmentSecondary" aria-label=".form-select-sm example" name='isAcceptAssignment' value={sendFormSecondary.isAcceptAssignment} onChange={handleSecondry}>
                                    <option value="" selected>select</option>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                            <small id="errAcceptAssignmentSecondary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tertiary Insurance Provider */}
            <Heading text="Tertiary Insurance Provider" />
            <div className="row">
                <div className="col-md-4 mb-2">
                    <div className='d-flex flex-wrap gap-3' >
                        <div style={{ width: '250px' }}>
                            <label htmlFor="ddlTertiary" className="form-label"><i class="bi bi-people-fill" style={{ color: '#546788' }}></i> {t("Tertiary Insurance Provider")}</label><sup style={{ color: "red" }}>*</sup>
                            <select className="form-select form-select-sm" id="ddlTertiary" aria-label=".form-select-sm example" name='insuranceProviderId' value={sendFormTri.insuranceProviderId} onChange={handleTertiary} >
                                <option value="0">{t("Select_Provider")}</option>
                                {providerList && providerList.map((list) => {
                                    return (
                                        <option value={list.id}>{list.name}</option>
                                    )
                                })}
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
                            <label htmlFor="txtPlanNameTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Plan Name")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtPlanNameTertiary" placeholder={t("Enter Plan Name")} name='planName' value={sendFormTri.planName} onChange={handleTertiary} />
                            <small id="errPlanNameTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-3 mb-2">
                            <label htmlFor="txtSubscriberTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subscriber")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-1'>
                                <input type="text" className="form-control form-control-sm" id="txtSubscriberTertiary" name='subscriber1' value={sendFormTri.subscriber1} onChange={handleTertiary} />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber1Tertiary" name='subscriber2' value={sendFormTri.subscriber2} onChange={handleTertiary} />
                                <input type="text" className="form-control form-control-sm" id="txtSubscriber2Tertiary" name='subscriber3' value={sendFormTri.subscriber3} onChange={handleTertiary} />
                            </div>
                            <small id="errSubscriberTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-1 mb-2">
                            <label htmlFor="txtEffectiveDateTertiary" className="form-label"><img src={calendar} className='icnn' alt='' />{t("Effective Date")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex'>
                                <input type="date" className="form-control form-control-sm" id="txtEffectiveDateTertiary" placeholder={t("Enter Effective Date")} name='effectiveDate' value={sendFormTri.effectiveDate} onChange={handleTertiary} />
                            </div>
                            <small id="errEffectiveDateTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><img src={IconPatientRelation} className='icnn' alt='' />{t("Relationship")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' value={sendFormTri.relationshipId} onChange={handleTertiary} >
                                    <option value="0" selected>Select Relation</option>
                                    {relationList && relationList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPolicyNumberTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Policy Number")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtPolicyNumberTertiary" placeholder={t("Enter Policy Number")} name='policyNumber' value={sendFormTri.policyNumber} onChange={handleTertiary} />
                            <small id="errPolicyNumberTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtDOBTertiary" className="form-label"><img src={calendar} className='icnn' alt='' />{t("DOB")}</label>
                            <input type="date" className="form-control form-control-sm" id="txtDOBTertiary" placeholder={t("Enter Policy Number")} name='dob' value={sendFormTri.dob} onChange={handleTertiary} />
                            <small id="errDOBTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>

                </div>

                <div className='col-12'>
                    <div className="row">
                        {/* <div className="col-md-2 mb-2">
                            <label htmlFor="txtSSTertiary" className="form-label">{t("S.S.")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtSS" placeholder={t("Enter S.S.")} name='ssTertiary'value={sendFormSecondary.planName} onChange={handleTertiary} />
                            <small id="errSSTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div> */}

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubscriberEmployerTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subscriber Employer")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSubscriberEmployerTertiary" placeholder={t("Enter Subscriber Employer")} name='subscriberEmployer' value={sendFormTri.subscriberEmployer} onChange={handleTertiary} />
                            <small id="errSubscriberEmployerTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSexTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Sex")}</label>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSexTertiary" aria-label=".form-select-sm example" name='genderId' value={sendFormTri.genderId} onChange={handleTertiary}>
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
                            <label htmlFor="txtSEAddressTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("SE Address")}</label><sup style={{ color: "red" }}>*</sup>
                            <textarea name="seAddress" id="txtSEAddressTertiary" className="form-control form-control-sm" rows="1" placeholder={t("Enter SE Address")} value={sendFormTri.seAddress} onChange={handleTertiary}></textarea>
                            <small id="errSEAddressTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine1Tertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subsciber Address Line1")}</label><sup style={{ color: "red" }}>*</sup>
                            <textarea name="subscriberAddressLine1" id="txtSubsciberAddressLine1Tertiary" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line 1")} value={sendFormTri.subscriberAddressLine1} onChange={handleTertiary}></textarea>
                            <small id="errSubsciberAddressLine1Tertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSubsciberAddressLine2Tertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Subsciber Address Line2")}</label><sup style={{ color: "red" }}>*</sup>
                            <textarea name="subscriberAddressLine2" id="txtSubsciberAddressLine2Tertiary" className="form-control form-control-sm" rows="1" placeholder={t("Enter Subsciber Address Line 2")} value={sendFormTri.subscriberAddressLine2} onChange={handleTertiary}></textarea>
                            <small id="errSubsciberAddressLine2Tertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="row">
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSECityTertiary" className="form-label"><img src={city} className='icnn' alt='' />{t("SE City")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSECityTertiary" placeholder={t("Enter SE City")} name='seCity' value={sendFormTri.seCity} onChange={handleTertiary} />
                            <small id="errSECityTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCityTertiary" className="form-label"><img src={city} className='icnn' alt='' />{t("City")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtCityTertiary" placeholder={t("Enter City")} name='city' value={sendFormTri.city} onChange={handleTertiary} />
                            <small id="errCityTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSECountryTertiary" className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("SE Country")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSECountryTertiary" aria-label=".form-select-sm example" name='seCountryId' value={sendFormTri.seCountryId} onChange={onChangeCountrySETertiary}>
                                    <option value="0">{t("Select_Country")}</option>
                                    {countryList && countryList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.countryName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errSECountryTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlSEStateTertiary" className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("SE State")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlSEStateTertiary" aria-label=".form-select-sm example" name='seStateId' value={sendFormTri.seStateId} onChange={handleTertiary}>
                                    <option value="0">{t("Select_State")}</option>
                                    {stateListSETertiary && stateListSETertiary.map((list) => {
                                        return (
                                            <option value={list.id}>{list.stateName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <small id="errSEStateTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlCountryTertiary" className="form-label"><img src={city} className='icnn' alt='' />{t("Country")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlCountryTertiary" aria-label=".form-select-sm example" name='countryId' value={sendFormTri.countryId} onChange={onChangeCountryTertiary}>
                                    <option value="0">{t("Select_Country")}</option>
                                    {countryList && countryList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.countryName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errCountryTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlStateTertiary" className="form-label"><img src={city} className='icnn' alt='' />{t("State")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlStateTertiary" aria-label=".form-select-sm example" name='stateId' value={sendFormTri.stateId} onChange={handleTertiary}>
                                    <option value="0">{t("Select_State")}</option>
                                    {stateListTertiary && stateListTertiary.map((list) => {
                                        return (
                                            <option value={list.id}>{list.stateName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <small id="errStateTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtSEZipCodeTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("SE Zip Code")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCodeTertiary" placeholder={t("Enter SE Zip Code")} name='seZipCode' value={sendFormTri.seZipCode} onChange={handleTertiary} />
                            <small id="errSEZipCodeTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtZipCodeTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Zip Code")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtSEZipCodeTertiary" placeholder={t("Enter Zip Code")} name='zipCode' value={sendFormTri.zipCode} onChange={handleTertiary} />
                            <small id="errZipCodeTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtPhoneNumberTertiary" className="form-label"><img src={smartphone} className='icnn' alt='' />{t("Phone Number")}</label>
                            <input type="number" className="form-control form-control-sm" id="txtPhoneNumberTertiary" placeholder={t("Enter Phone Number")} name='subscriberPhone' value={sendFormTri.subscriberPhone} onChange={handleTertiary} />
                            <small id="errPhoneNumberTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtCoPayTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Co Pay")}</label>
                            <input type="text" className="form-control form-control-sm" id="txtCoPayTertiary" placeholder={t("Enter Co Pay")} name='coPay' value={sendFormTri.coPay} onChange={handleTertiary} />
                            <small id="errcopayTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="txtGroupNumberTertiary" className="form-label"><i class="bi bi-people-fill" style={{ color: '#546788' }}></i> {t("Group Number")}</label><sup style={{ color: "red" }}>*</sup>
                            <input type="text" className="form-control form-control-sm" id="txtGroupNumberTertiary" placeholder={t("Enter Group Number")} name='groupNumber' value={sendFormTri.groupNumber} onChange={handleTertiary} />
                            <small id="errGroupNumberTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 mb-2">
                            <label htmlFor="ddlAcceptAssignmentTertiary" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Accept Assignment")}</label><sup style={{ color: "red" }}>*</sup>
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="ddlAcceptAssignmentTertiary" aria-label=".form-select-sm example" name='isAcceptAssignment' value={sendFormTri.isAcceptAssignment} onChange={handleTertiary}>
                                    <option value="" selected>select</option>
                                    <option value="0">Yes</option>
                                    <option value="1">No</option>
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