import React, { useState, useEffect } from 'react';
import zipCodeIcon from '../../../../assets/images/icons/zipCodeIcon.svg';
import stateIcon from '../../../../assets/images/icons/stateIcon.svg';
import city from '../../../../assets/images/icons/city.svg';
import smartphone from '../../../../assets/images/icons/smartphone.svg';
import emailIcon from '../../../../assets/images/icons/email.svg';
import { useTranslation } from 'react-i18next';
import GetStateList from '../../../API/GET/GetStateList'
import GetCityList from '../../../API/GET/GetCityList';
import GetCountryList from '../../../API/GET/GetCountryList';
const ContactDetails = ({ contactDetailsData, clearStatus, setClearStatus }) => {
    // const ContactDetails = ({ initialContactDetails, onContactDetailsChange }) => {
    let [cityList, setCityList] = useState([]);
    let [cityListAdd, setCityListAdd] = useState([]);
    let [stateList, setStateList] = useState([]);
    let [stateListAdd, setStateListAdd] = useState({});
    let [countryList, setCountryList] = useState([]);
    const [inputCount, setInputCount] = useState(0);
    const [inputValues, setInputValues] = useState(Array.from({ length: inputCount }, () => ''));
    let [additionalAddressess, setAdditionalAddressess] = useState([])
    const [divs, setDivs] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [contactDetails, setContactDetails] = useState({
        address: '',
        addressLine2: '',
        countryId: 0,
        stateId: 0,
        cityId: 0,
        zip: '',
        mothersName: '',
        emergencyContact: '',
        emergencyPhone: '',
        phoneHome: '',
        workPhone: '',
        emailID: '',
        trustedEmail: '',
        additionalAddressJsonString: []
    });

    useEffect(() => {
        getCountryList();
        contactDetailsData(contactDetails);
        console.log('contactDetails', contactDetails)
        if (clearStatus === 1) {
            setClearStatus(0)
            setContactDetails({
                address: '',
                addressLine2: '',
                countryId: '',
                stateId: '',
                cityId: '',
                zip: '',
                mothersName: '',
                emergencyContact: '',
                emergencyPhone: '',
                phoneHome: '',
                workPhone: '',
                emailID: '',
                trustedEmail: '',
            })
            setDivs([
                {
                    addressUseId: '',
                    addressTypeId: '',
                    startDate: '',
                    endDate: '',
                    address: '',
                    addressLine2: '',
                    cityName: '',
                    districtName: '',
                    additionalcountryId: '',
                    additionalstateId: '',
                    postalCode: '',
                }]);
        }
    }, [contactDetails, contactDetailsData, clearStatus]);

    let getCountryList = async () => {
        console.log('fetch country');
        let response = await GetCountryList();
        console.log('fetch country', response);
        if (response.status === 1) {
            setCountryList(response.responseValue);
            //getStateList(countryID);


        }
    }
    let onChangeCountry = async () => {
        const countryID = document.getElementById('ddlCountry').value;
        console.log("countryID", countryID);
        getStateList(countryID);
        setContactDetails((prevData) => ({
            ...prevData,
            countryId: countryID
        }));
    };
    let onChangeAddCountry = async () => {
        const countryID = document.getElementById('countryIdd').value;
        console.log("countryID", countryID);
        getStateList(countryID);
        setContactDetails((prevData) => ({
            ...prevData,
            countryId: countryID
        }));
    };

    let getStateList = async (val) => {
        let data = await GetStateList(val);
        setStateList(data.responseValue);
    }

    // Used to Get Value From Dropdown

    let getCityListByState = async () => {
        // clearErrorMessages();
        const stateID = document.getElementById('ddlState').value;
        console.log("stateID", stateID)
        if (stateID === "0" || stateID === undefined || stateID === null) {
            setCityList([]);
        }
        else {
            let data = await GetCityList(stateID);
            setCityList(data.responseValue);
            setContactDetails((prevData) => ({
                ...prevData,
                stateId: stateID
            }))
        }
    }
    let getAddCityListByState = async () => {
        // clearErrorMessages();
        const stateID = document.getElementById('stateIDD').value;
        console.log("stateID", stateID)
        if (stateID === "0" || stateID === undefined || stateID === null) {
            setCityList([]);
        }
        else {
            let data = await GetCityList(stateID);
            setCityList(data.responseValue);
            setContactDetails((prevData) => ({
                ...prevData,
                stateId: stateID
            }))
        }
    }
    let onChangeCountryAdditional = async (index) => {
        let countryID = document.getElementById('ddlCountry' + index).value;
        getStateListAdditional(index, countryID);
    };
    let getStateListAdditional = async (index, val) => {
        let data = await GetStateList(val);
        console.log(data);
        setStateListAdd({ [index]: data.responseValue });
        console.log(stateListAdd);
    }

    // Used to Get Value From Dropdown

    let getCityListByStateAdditional = async (index) => {
        // clearErrorMessages();
        const stateID = document.getElementById('ddlState' + index).value;
        console.log(stateID)
        if (stateID === "0" || stateID === undefined || stateID === null) {
            setCityListAdd({ [index]: [] });
        }
        else {
            let data = await GetCityList(stateID);
            setCityListAdd({ [index]: data.responseValue });


        }


    }

    const handleContactDetailsChange = (e) => {
        const { name, value } = e.target;
        // Function to check for alphanumeric characters and no spaces
        const isValidInput = (input) => {
            // Trim input to remove leading and trailing spaces
            const trimmedInput = input.trim();
            // Check if input starts with a space
            if (input !== trimmedInput && input.startsWith(' ')) {
                return false; // Input starts with a space
            }
            // Check if trimmed input contains only alphanumeric characters and spaces in between
            const isValid = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/.test(trimmedInput);

            return isValid || trimmedInput === '';
        };

        // Function to check for alphanumeric characters and allow special characters but no spaces
        const isValidInputEmail = (input) => /^[a-zA-Z0-9\S]*$/.test(input);

        if (name === "emailID" || name === "trustedEmail") {
            if (!isValidInputEmail(value)) {
                return;
            }
        } else {
            if (!isValidInput(value)) {
                return;
            }
        }
        setContactDetails((prevPatientDetails) => ({
            ...prevPatientDetails,
            [name]: value,
        }));
    };


    const handleContactDetailsAdditionalChange = (e, index) => {
        const { name, value } = e.target;
        if (index >= 0 && index < contactDetails.additionalAddressess.length) {
        }
        else {
        }
        setContactDetails((prevPatientDetails) => ({
            ...prevPatientDetails,
            [name]: value,
        }));
        // onContactDetailsChange(name, value);
    };

    const handleAddInput = () => {
        setInputCount(prevCount => prevCount + 1);
        // Check if additionalAddressess is an array
        if (!Array.isArray(contactDetails.additionalAddressess)) {
            // If not an array, initialize it as an empty array
            contactDetails.additionalAddressess = [];
        }
        // Now you can safely push elements into it
        contactDetails.additionalAddressess.push({
            addressUseId: '',
            addressTypeId: '',
            startDate: null,
            endDate: null,
            address: '',
            addressLine2: '',
            countryId: '',
            stateId: '',
            cityName: '',
            postalCode: ''
        });
        setInputValues(prevValues => [...prevValues, '']);
    };


    // const handleInputChange = (index, value) => {
    //     // contactDetails.additionalAddressess[index]
    //     setInputValues(prevValues => {
    //         const newValues = [...prevValues];
    //         newValues[index] = value;
    //         return newValues;
    //     });
    // };

    const handleDeleteInput = (index) => {
        setInputCount(prevCount => prevCount - 1);
        setInputValues(prevValues => prevValues.filter((_, i) => i !== index));
    };
    const { t } = useTranslation();

    const handleInputChange = async (e, index) => {
        const { name, value } = e.target;
        const updatedDivs = [...divs];
        updatedDivs[index][name] = value;
        setDivs(updatedDivs);

        const addcountryID = document.getElementById('countryIdd').value;
        getStateList(addcountryID);

        const addstateID = document.getElementById('stateIDD').value;
        if (addstateID === "0" || addstateID === undefined || addstateID === null) {
            setCityList([]);
        }
        else {
            let data = await GetCityList(addstateID);
            setCityList(data.responseValue);
        }
        const additionalAddressjsonData = JSON.stringify(divs);
        console.log(additionalAddressjsonData);
        setContactDetails((prevData) => ({
            ...prevData,
            additionalAddressJsonString: additionalAddressjsonData
        }))
    };

    const handleAddDiv = () => {
        setDivs([...divs,
        {
            addressUseId: '',
            addressTypeId: '',
            startDate: '',
            endDate: '',
            address: '',
            addressLine2: '',
            cityName: '',
            districtName: '',
            additionalcountryId: '',
            additionalstateId: '',
            postalCode: '',
        }]);
    };

    const handleRemoveDiv = (index) => {
        const updatedDivs = [...divs];
        updatedDivs.splice(index, 1);
        setDivs(updatedDivs);
    };

    const handleSaveData = () => {
        // Convert divs data to JSON
        const jsonData = JSON.stringify(divs);
        console.log(jsonData);
        // You can send this jsonData to your backend or wherever you need
    };
    return (

        <>
            <div className="col-2 mb-2">
                <label htmlFor="txtStreet" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Street")}</label>
                <input type="text" className="form-control form-control-sm" id="txtStreet" placeholder={t("Enter_Street")} name='address' value={contactDetails.address} onChange={handleContactDetailsChange} />
                <small id="errStreet" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>
            <div className="col-2 mb-2">
                <label htmlFor="txtStreetLine2" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("StreetLine2")}</label>
                <input type="text" className="form-control form-control-sm" id="txtStreetLine2" placeholder={t("Enter_StreetLine2")} name='addressLine2' value={contactDetails.addressLine2} onChange={handleContactDetailsChange} />
                <small id="errStreetLine2" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>
            <div className="col-2 mb-2">
                <label htmlFor="ddlCountry" className="form-label"><img src={city} className='icnn' alt='' />{t("Country")}</label>
                <select className="form-select form-select-sm" id="ddlCountry" aria-label=".form-select-sm example" onChange={onChangeCountry} name='countryId' value={contactDetails.countryId}>
                    <option value="0">{t("Select_Country")}</option>
                    {countryList && countryList.map((list) => {

                        return (
                            <option value={list.id}>{list.countryName}</option>
                        )
                    })}
                </select>
                <small id="errCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>
            {/* <div className="col-2 mb-2">
                <label htmlFor="ddlEmpty" className="form-label"></label>
                <button type="button" class="form-control form-control-sm" id="addCountry" >Add</button>
            </div> */}
            <div className="col-2 mb-2">
                <label htmlFor="ddlState" className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("State")}</label>
                <select className="form-select form-select-sm" id="ddlState" aria-label=".form-select-sm example" name='stateId' onChange={() => { getCityListByState(); }} value={contactDetails.stateId}>
                    <option value="0">{t("Select_State")}</option>
                    {stateList && Array.isArray(stateList) && stateList.map((list, index) => (
                        <option key={index} value={list.id}>{list.stateName}</option>
                    ))}
                </select>
                <small id="errState" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>
            {/* <div className="col-2 mb-2">
                <label htmlFor="ddlEmpty" className="form-label"></label>
                <button type="button" class="form-control form-control-sm" id="addState" >Add</button>
            </div> */}
            <div className="col-2 mb-2">
                <label htmlFor="ddlCity" className="form-label"><img src={city} className='icnn' alt='' />{t("City_Name")}</label>
                <select className="form-select form-select-sm" id="ddlCity" aria-label=".form-select-sm example" onChange={handleContactDetailsChange} name='cityId' value={contactDetails.cityId}>
                    <option value="0">{t("Select_City_Name")}</option>
                    {cityList && cityList.map((list) => {

                        return (
                            <option value={list.id}>{list.name}</option>
                        );

                    })}
                </select>
                <small id="errCity" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>
            {/* <div className="col-2 mb-2">
                <label htmlFor="ddlEmpty" className="form-label"></label>
                <button type="button" class="form-control form-control-sm" id="addCity" >Add</button>
            </div> */}
            <div className="col-2 mb-2">
                <label htmlFor="txtZip" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Zip")}</label>
                <input type="number" className="form-control form-control-sm" id="txtZip" placeholder={t("Enter_Zip_Code")} name='zip' value={contactDetails.zip} onChange={handleContactDetailsChange} />
                <small id="errZip" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtMotherName" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Mother_Name")}</label>
                <input type="text" className="form-control form-control-sm" id="txtMotherName" placeholder={t("Enter_MotherName")} name='mothersName' value={contactDetails.mothersName} onChange={handleContactDetailsChange} />
                <small id="errMotherName" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtEmergencyContact" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Emergency_Contact")}</label>
                <input type="number" className="form-control form-control-sm" id="txtEmergencyContact" placeholder={t("Enter_Emergency_Contact")} name='emergencyContact' value={contactDetails.emergencyContact} onChange={handleContactDetailsChange} />
                <small id="errEmergencyContact" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtEmergencyPhone" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Emergency_Phone")}</label>
                <input type="number" className="form-control form-control-sm" id="txtEmergencyPhone" placeholder={t("Enter_Emergency_Phone")} name='emergencyPhone' value={contactDetails.emergencyPhone} onChange={handleContactDetailsChange} />
                <small id="errEmergencyPhone" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtHomePhone" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Home_Phone")}</label>
                <input type="number" className="form-control form-control-sm" id="txtHomePhone" placeholder={t("Enter_Home_Phone")} name='phoneHome' value={contactDetails.phoneHome} onChange={handleContactDetailsChange} />
                <small id="errHomePhone" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>
            <div className="col-2 mb-2">
                <label htmlFor="txtWorkPhone" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Work_Phone")}</label>
                <input type="number" className="form-control form-control-sm" id="txtWorkPhone" placeholder={t("Enter_Work_Phone")} name='workPhone' value={contactDetails.workPhone} onChange={handleContactDetailsChange} />
                <small id="errWorkPhone" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>

            {/* <div className="col-2 mb-2">
                <label htmlFor="txtMobileNo" className="form-label">
                    <img src={smartphone} className='icnn' alt='' />
                    {t("MOBILE_NUMBER")}</label>
                <div className='lft'>
                    <select className="form-select form-select-sm" id='ddlCountryCode' aria-label=".form-select-sm example" style={{ borderRight: 'transparent', borderTopRightRadius: '0px', borderBottomRightRadius: '0px', width: '80px', padding: '0 5px 0 5px' }}>
                        <option value='0'>+91</option>
                        {countryList && countryList.map((list, index) => {
                            if (list.id === 101) {
                                return (<option value={list.id} selected>{list.countryCode}</option>);
                            }
                            else {
                                return (
                                    <option value={list.id}>{list.countryCode}</option>
                                );

                            }
                        })}
                    </select>
                    <input type="number" className="form-control form-control-sm" id="txtMobileNo" placeholder={t("Mobile_Number")} name='mobileNo' value={contactDetails.mobileNo} onChange={handleContactDetailsChange} style={{ borderLeft: 'transparent', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} />
                </div>
                <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalSetting"><i className="bi bi-gear-fill"></i></button>
                <small id="errMobile" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div> */}

            <div className="col-2 mb-2">
                <label htmlFor="txtEmailAddress" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("EMAIL_ID")}</label>
                <input type="email" className="form-control form-control-sm" id="txtEmailAddress" placeholder={t("ENTER_EMAIL_ID")} name='emailID' onKeyPress={(e) => {
                    if (e.key === ' ') {
                        e.preventDefault();
                    }
                }} value={contactDetails.emailID} onChange={handleContactDetailsChange} />
            </div><div className="col-2 mb-2">
                <label htmlFor="txtEmailDirect" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("EMAIL_ID_Email_Direct")}</label>
                <input type="email" className="form-control form-control-sm" id="txtEmailDirect" placeholder={t("ENTER_EMAIL_ID_Email_Direct")} name='trustedEmail' onKeyPress={(e) => {
                    if (e.key === ' ') {
                        e.preventDefault();
                    }
                }} value={contactDetails.trustedEmail} onChange={handleContactDetailsChange} />
            </div>
            <div className="dflex">
                <div className="col-2 mb-2">
                    <label htmlFor="ddlEmpty" className="form-label"></label>
                    <button type="button" class="form-control form-control-sm" id="addCity" onClick={handleAddDiv}>Additonal Address <img src={emailIcon} className='icnn' alt='' /></button>
                </div>

            </div>

            {/* -----------------------------------------------------NEW----------------------------------------------------------- */}
            {divs.map((div, index) => (
                <div className="dflex" key={index}>
                    <div className="col-2 mb-2">
                        <label htmlFor="addressUseId" className="form-label"><img src={city} className='icnn' alt='' />Address Use</label>
                        <select className="form-select form-select-sm" id="addressUseId" aria-label=".form-select-sm example" onChange={(e) => handleInputChange(e, index)} name='addressUseId' value={div.addressUseId}
                        >
                            <option value="0">Select Address Use</option>
                            {/* {cityList && cityList.map((list) => {

                                return (
                                    <option value={list.id}>{list.name}</option>
                                );

                            })} */}

                            <option value="1">Address1</option>
                            <option value="2">Address2</option>
                            <option value="3">Address3</option>

                        </select>
                        <small id="errCity" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2">
                        <label htmlFor="addressTypeId" className="form-label"><img src={city} className='icnn' alt='' />Address Type</label>
                        <select className="form-select form-select-sm" id="addressTypeId" aria-label=".form-select-sm example" onChange={(e) => handleInputChange(e, index)} name='addressTypeId' value={div.addressTypeId}
                        >
                            <option value="0">Select Address Type</option>
                            {/* {cityList && cityList.map((list) => {

                                return (
                                    <option value={list.id}>{list.name}</option>
                                );

                            })} */}

                            <option value="1">AddressType1</option>
                            <option value="2">AddressType2</option>
                            <option value="3">AddressType3</option>

                        </select>
                        <small id="errCity" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2 relative">
                        <label htmlFor="txtDob" className="form-label "><img src={"calendar"} className='icnn' alt='' />Start Date<span class="starMandatory">*</span></label>
                        <input type="date" className="form-control form-control-sm" max={"today"} id="startDate" name='startDate' value={div.startDate} onChange={(e) => handleInputChange(e, index)} />
                        <small id="errPatientDob" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2 relative">
                        <label htmlFor="txtDob" className="form-label "><img src={"calendar"} className='icnn' alt='' />End Date<span class="starMandatory">*</span></label>
                        <input type="date" className="form-control form-control-sm" max={"today"} id="endDate" name='endDate' value={div.endDate} onChange={(e) => handleInputChange(e, index)} />
                        <small id="errPatientDob" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2">
                        <label htmlFor="address" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />Address</label>
                        <input type="text" className="form-control form-control-sm" id="address" placeholder="Enter address" name='address' value={div.address} onChange={(e) => handleInputChange(e, index)} />
                        <small id="errAddress" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2">
                        <label htmlFor="addressLine2" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />address Line 2</label>
                        <input type="text" className="form-control form-control-sm" id="addressLine2" placeholder="Enter address" name='addressLine2' value={div.addressLine2} onChange={(e) => handleInputChange(e, index)} />
                        <small id="errAddress" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2">
                        <label htmlFor="cityName" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />City Name</label>
                        <input type="text" className="form-control form-control-sm" id="cityName" placeholder="Enter city name" name='cityName' value={div.cityName} onChange={(e) => handleInputChange(e, index)} />
                        <small id="errAddress" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2">
                        <label htmlFor="districtName" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />District Name</label>
                        <input type="text" className="form-control form-control-sm" id="districtName" placeholder="Enter district name" name='districtName' value={div.districtName} onChange={(e) => handleInputChange(e, index)} />
                        <small id="errAddress" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2">
                        <label htmlFor="countryId" className="form-label"><img src={city} className='icnn' alt='' />{t("Country")}</label>
                        <select className="form-select form-select-sm" id="countryIdd" aria-label=".form-select-sm example" onChange={(e) => handleInputChange(e, index)} name='additionalcountryId' value={div.countryId}>
                            <option value="0">{t("Select_Country")}</option>
                            {countryList && countryList.map((list) => {

                                return (
                                    <option value={list.id}>{list.countryName}</option>
                                )
                            })}
                        </select>
                        <small id="errCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2">
                        <label htmlFor="stateId" className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("State")}</label>
                        <select className="form-select form-select-sm" id="stateIDD" aria-label=".form-select-sm example" name='additionalstateId' onChange={(e) => handleInputChange(e, index)} value={div.stateId}>
                            <option value="0">{t("Select_State")}</option>
                            {stateList && Array.isArray(stateList) && stateList.map((list, index) => (
                                <option key={index} value={list.id}>{list.stateName}</option>
                            ))}
                        </select>
                        <small id="errState" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2">
                        <label htmlFor="postalCode" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />Postal Code</label>
                        <input type="number" className="form-control form-control-sm" id="postalCode" placeholder="Enter postal Code" name='postalCode' value={div.postalCode} onChange={(e) => handleInputChange(e, index)} />
                        <small id="errAddress" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-2 mb-2">
                        <label htmlFor="ddlEmpty" className="form-label"></label>
                        <button type="button" class="btn btn-save btn-save-fill btn-sm mt-4" id="addPriviousNames" onClick={() => handleRemoveDiv(index)}> Remove</button>
                    </div>
                </div>
            ))}
            {/* <div className="col-2 mb-2">
                <label htmlFor="ddlEmpty" className="form-label"></label>
                <button type="button" class="btn btn-save btn-save-fill btn-sm mt-4" id="addPriviousNames" onClick={handleSaveData}> Save</button>
            </div> */}



            {/* OLD Render existing input textboxes with delete buttons */}
            {
                inputValues.map((value, index) => (
                    <><hr />
                        <div className="dflex" key={index}>

                            <div className="col-2 mb-2">
                                <label htmlFor={"ddlAddressUse" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Address_Use")}</label><sup style={{ color: "red" }}>*</sup>
                                <select className="form-select form-select-sm" id={"ddlAddressUse" + index} aria-label=".form-select-sm example" name={"addressUse" + index} onChange={(e) => handleContactDetailsAdditionalChange(e, index)} >
                                    <option value="0">{t("Address_Use")}</option>
                                    {stateList && stateList.map((list, index) => {

                                        return (
                                            <option value={list.id}>{list.stateName}</option>
                                        );

                                    })}

                                </select>

                            </div>

                            <div className="col-2 mb-2">
                                <label htmlFor={"ddlAddressType" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Address_Type")}</label>

                                <select className="form-select form-select-sm" id={"ddlAddressType" + index} aria-label=".form-select-sm example" name={"addressType" + index} >
                                    <option value="0">{t("Address_Type")}</option>
                                    {stateList && stateList.map((list, index) => {

                                        return (
                                            <option value={list.id}>{list.stateName}</option>
                                        );

                                    })}
                                </select>
                            </div>
                            <div className="col-2 mb-2">
                                <label htmlFor={"txtStartDate" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Start_Date")}</label>
                                <input
                                    type="date"
                                    value={value}
                                    id={"txtStartDate" + index}
                                    className="form-control form-control-sm"
                                    name={"startDate" + index}
                                    onChange={(e) => handleInputChange(index, e.target.value)} />

                            </div>


                            <div className="col-2 mb-2">
                                <label htmlFor={"txtEndDate" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("End_Date")}</label>
                                <input
                                    type="date"
                                    value={value}
                                    id={"txtEndDate" + index}
                                    className="form-control form-control-sm"
                                    name={"endDate" + index}
                                    onChange={(e) => handleInputChange(index, e.target.value)} />

                            </div>



                            <div className="col-2 mb-2">
                                <label htmlFor={"txtStreet" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Street")}</label>
                                <input
                                    type="text"
                                    value={value}
                                    id={"txtStreet" + index}
                                    name={"street" + index}
                                    className="form-control form-control-sm"
                                    onChange={(e) => handleInputChange(index, e.target.value)} />

                            </div>

                            <div className="col-2 mb-2">
                                <label htmlFor={"txtStreetLine2" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("Street_Line2")}</label>
                                <input
                                    type="text"
                                    value={value}
                                    id={"txtStreetLine2" + index}
                                    name={"streetLine2" + index}
                                    className="form-control form-control-sm"
                                    onChange={(e) => handleInputChange(index, e.target.value)} />

                            </div>
                            <div className="col-2 mb-2">
                                <label htmlFor={"ddlCountry" + index} className="form-label"><img src={city} className='icnn' alt='' />{t("Country")}</label>
                                <select className="form-select form-select-sm" id={"ddlCountry" + index} aria-label=".form-select-sm example" name={'country' + index} onChange={() => { onChangeCountryAdditional(index); }}>
                                    <option value="0">{t("Select_Country")}</option>
                                    {countryList && countryList.map((list) => {

                                        return (
                                            <option value={list.id}>{list.countryName}</option>
                                        );

                                    })}
                                </select>
                                <small id="errCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                            </div>
                            <div className="col-2 mb-2">
                                <label htmlFor="ddlEmpty" className="form-label"></label>
                                <button type="button" class="form-control form-control-sm" id="addCountryAdd">Add</button>
                            </div>
                            <div className="col-2 mb-2">
                                <label htmlFor={"ddlState" + index} className="form-label"><img src={stateIcon} className='icnn' alt='' />{t("State")}</label><sup style={{ color: "red" }}>*</sup>
                                <select className="form-select form-select-sm" id={"ddlState" + index} aria-label=".form-select-sm example" name={'state' + index} onChange={() => { getCityListByStateAdditional(index); }}>
                                    <option value="0">{t("Select_State")}</option>
                                    {stateListAdd[index] && stateListAdd[index].map((list, index2) => {

                                        return (
                                            <option value={list.id}>{list.stateName}</option>
                                        );

                                    })}

                                </select>
                                <small id="errState" className="form-text text-danger" style={{ display: 'none' }}></small>
                            </div>
                            <div className="col-2 mb-2">
                                <label htmlFor="ddlEmpty" className="form-label"></label>
                                <button type="button" class="form-control form-control-sm" id="addStateAdd">Add</button>
                            </div>
                            <div className="col-2 mb-2">
                                <label htmlFor={"ddlCity" + index} className="form-label"><img src={city} className='icnn' alt='' />{t("City_Name")}</label><sup style={{ color: "red" }}>*</sup>
                                <select className="form-select form-select-sm" id={"ddlCity" + index} name={"city" + index} aria-label=".form-select-sm example">
                                    <option value="0">{t("Select_City_Name")}</option>
                                    {cityListAdd[index] && cityListAdd[index].map((list) => {

                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        );

                                    })}
                                </select>
                                <small id="errCity" className="form-text text-danger" style={{ display: 'none' }}></small>
                            </div>
                            <div className="col-2 mb-2">
                                <label htmlFor="ddlEmpty" className="form-label"></label>
                                <button type="button" class="form-control form-control-sm" id="addCityAdd">Add</button>
                            </div>
                            <div className="col-2 mb-2">
                                <label htmlFor="txtZip" className="form-label"><img src={zipCodeIcon} className='icnn' alt='' />{t("Zip")}</label>
                                <input type="number" className="form-control form-control-sm" id="txtZip" placeholder={t("Enter_Zip_Code")} name={'zipCode' + index} value={contactDetails.zipCode} onChange={handleContactDetailsChange} />
                                <small id="errZip" className="form-text text-danger" style={{ display: 'none' }}></small>
                            </div>

                        </div></>
                ))
            }

        </>

    );
};

export default ContactDetails;