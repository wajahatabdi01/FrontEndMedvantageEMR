import React, { useState, useEffect } from 'react';
import ageIcon from '../../../../assets/images/icons/ageIcon.svg';
import patientOPD from '../../../../assets/images/icons/patientOPD.svg';
import calendar from '../../../../assets/images/icons/calendar.svg';
import genderIcon from '../../../../assets/images/icons/genders.svg';
// import { WithContext as ReactTags } from 'react-tag-input';
import { useTranslation } from 'react-i18next';
import Multiselect from 'multiselect-react-dropdown';
import GetGender from '../../../API/GET/GetGender';
import GetAllGenderIdentities from '../../../API/GET/GetAllGenderIdentities';
import GetAllSexualOrientation from '../../../API/GET/GetAllSexualOrientation';
import GetMaritalStatusList from '../../../API/GET/GetMaritalStatusList';
import GetAllTitleForPatient from '../../../API/GET/GetAllTitleForPatient';
import GetCountryList from '../../../API/GET/GetCountryList';
import smartphone from '../../../../assets/images/icons/smartphone.svg';
import GetPatientDetailsByMobileNo from '../../../API/GET/GetPatientDetailsByMobileNo';
import l from '@linways/table-to-excel';

const PatientDetails = ({ clearStatus, setClearStatus, initialPatientDetails, onPriviousNamesAddButtonClick, isShowPriviousModal, priviousNames, patientDetailsData }) => {
    let [patientGender, setPatientGender] = useState('0');
    const [selectedPriviousNames, setSelectedPriviousNames] = useState([]);
    let [getPatientGender, setGetPatientGender] = useState([]);
    let [countryList, setCountryList] = useState([]);
    let [getPatientGenderIdentities, setGetPatientGenderIdentities] = useState([]);
    let [sexualOrientationlist, setSexualOrientationlist] = useState([]);
    let [maritalStatusList, setMaritalStatusList] = useState([]);
    let [titleList, setTitleList] = useState([]);
    const [options, setOptions] = useState([]);
    let [patientListByMobileNo, setPatientListByMobileNo] = useState([]);
    let [showPatientHistory, setShowPatientHistory] = useState(0);
    const handleTagsChange = (movies) => {
        setSelectedPriviousNames(movies);
    };
    const [characterValidation, setCharacterValidation] = useState({
        patientName: '',
        middleName: '',
        lastName: '',
        nameSuffix: '',
        birthFirstName: '',
        birthMiddleName: '',
        birthLastName: '',
        externalId: '',
        socialSecurityNo: '',
        driversLicense: '',
        billingNote: '',
    });
    const today = new Date().toISOString().split('T')[0];
    let getCountryList = async () => {
        console.log('fetch country');
        let response = await GetCountryList();
        console.log('fetch country', response);
        if (response.status === 1) {
            setCountryList(response.responseValue);
            //getStateList(countryID);


        }
    }
    let getAllSexualOrientation = async () => {
        const response = await GetAllSexualOrientation();
        if (response.status === 1) {
            setSexualOrientationlist(response.responseValue);
        }
    }
    let getTitle = async () => {
        const response = await GetAllTitleForPatient();
        if (response.status === 1) {
            setTitleList(response.responseValue);
        }
    }
    let getMaritalStatusList = async () => {
        const response = await GetMaritalStatusList();
        if (response.status === 1) {
            setMaritalStatusList(response.responseValue);
        }
    }
    let getAllGender = async () => {
        const response = await GetGender();
        if (response.status === 1) {
            setGetPatientGender(response.responseValue)
        }
        console.log("GetGender", response)
    }
    let getAllGenderIdentities = async () => {
        const response = await GetAllGenderIdentities();
        if (response.status === 1) {
            setGetPatientGenderIdentities(response.responseValue)
        }
    }


    const [patientDetails, setPatientDetails] = useState({
        mobileNo: '',
        titleId: '',
        patientName: '',
        middleName: '',
        lastName: '',
        nameSuffix: '',
        birthFirstName: '',
        birthMiddleName: '',
        birthLastName: '',
        dob: '',
        sexualOrientationId: '',
        externalId: '',
        socialSecurityNo: '',
        driversLicense: '',
        maritalStatusId: '',
        billingNote: '',
        previousNamesJsonString: '[]',
        genderId: '',
        genderidentityId: ''
    });

    useEffect(() => {
        patientDetailsData(patientDetails);
        getAllGender();
        getCountryList();
        getTitle();
        getAllGenderIdentities();
        getAllSexualOrientation();
        getMaritalStatusList();
        if (initialPatientDetails) {
            setPatientDetails(initialPatientDetails);
        }
        console.log('patientDetails', patientDetails)
        if (clearStatus === 1) {
            setClearStatus(0)
            setPatientDetails({
                mobileNo: '',
                titleId: '',
                patientName: '',
                middleName: '',
                lastName: '',
                nameSuffix: '',
                birthFirstName: '',
                birthMiddleName: '',
                birthLastName: '',
                dob: '',
                sexualOrientationId: '',
                externalId: '',
                socialSecurityNo: '',
                driversLicense: '',
                maritalStatusId: '',
                billingNote: '',
                previousNamesJsonString: '[]',
                genderId: '',
                genderidentityId: ''
            })
        }
    }, [initialPatientDetails, patientDetailsData, patientDetails, clearStatus]);

    let getPatientDetailsByMobileNumber = async (value) => {
        // setisRevisitPatient(1);
        let response = await GetPatientDetailsByMobileNo(value);
        if (response.status === 1) {
            setPatientListByMobileNo(response.responseValue);
            if (response.responseValue.length > 0) {
                setShowPatientHistory(1)
            }
        }
    }

    const handlePatientDetailsChange = (e) => {
        console.log('characterValidation', characterValidation)
        const { name, value } = e.target;
        const isValidInput = (input) => /^[a-zA-Z0-9]*$/.test(input);
        const isValidInputDate = (input) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(input);

        if (name === "dob") {
            if (!isValidInputDate(value)) {
                return;
            }
        } else {
            if (!isValidInput(value)) {
                return;
            }
        }
        if (value.length > 25) {
            setCharacterValidation((prev) => ({ [name]: 'Maximum character limit reached.' }));
            return false;
        }
        else {
            setCharacterValidation(
                {
                    patientName: '',
                    middleName: '',
                    lastName: '',
                    nameSuffix: '',
                    birthFirstName: '',
                    birthMiddleName: '',
                    birthLastName: '',
                    socialSecurityNo: '',
                    driversLicense: '',
                    billingNote: '',
                }
            )
        }
        if (name === "mobileNo") {
            const checkLength = value;
            console.log("hfhfhhffhf", checkLength)
            if (checkLength.toString().length > 10) {
                return false;
            }
            else {
                // setPatientMobileNo(e.target.value);
                if (checkLength.toString().length === 10) {
                    const key = value;
                    getPatientDetailsByMobileNumber(key);
                }
            }
        }
        document.getElementById("errMobile").style.display = "none"
        document.getElementById("errPatientFirstName").style.display = "none";
        document.getElementById("errTitle").style.display = "none";
        document.getElementById("errPatientMiddleName").style.display = "none"
        document.getElementById("errPatientLastName").style.display = "none"
        document.getElementById("errPatientDob").style.display = "none"
        document.getElementById("errPatientGender").style.display = "none"
        document.getElementById("errPatientGenderIdentity").style.display = "none"


        setPatientDetails((prevPatientDetails) => ({
            ...prevPatientDetails,
            [name]: value,

        }));
        console.log("name", name)

    };
    const handlePatientDetailsAdd = (e) => {
        isShowPriviousModal = !isShowPriviousModal
        onPriviousNamesAddButtonClick(isShowPriviousModal);
    }
    const { t } = useTranslation();
    let onSelect = (selectedList, selectedItem) => {
        console.log(selectedList);
        console.log(selectedItem);
        setPatientDetails((prevPatientDetails) => ({
            ...prevPatientDetails,
            previousNamesJsonString: selectedList,
        }));
        // setPatientDetails((prevPatientDetails) => ({
        //     ...prevPatientDetails,
        //     previousNames: selectedList,
        // }));
        // onPatientDetailsChange('previousNames', selectedList);
    }
    return (
        <>
            <div className="col-1 mb-2">
                <label htmlFor="txtMobileNo" className="form-label relative">
                    <img src={smartphone} className='icnn' alt='' />
                    {t("MOBILE_NUMBER")}<span class="starMandatory">*</span></label>

                <div className='lft'>
                    <select className="form-select form-select-sm" id='ddlCountryCode' aria-label=".form-select-sm example" style={{ borderRight: 'transparent', borderTopRightRadius: '0px', borderBottomRightRadius: '0px', width: '80px', padding: '0 5px 0 5px' }}>
                        {/* <option value='0'>+91</option> */}
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
                    <input type="number" className="form-control form-control-sm" id="txtMobileNo" placeholder={t("Mobile_Number")} name='mobileNo' value={patientDetails.mobileNo} onChange={handlePatientDetailsChange} style={{ borderLeft: 'transparent', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} />


                </div>
                {/* <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalSetting"><i className="bi bi-gear-fill"></i></button> */}
                <small id="errMobile" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div>
            <div className="col-1 mb-2">
                <label htmlFor="ddlTitle" className="form-label relative"><img src={ageIcon} className='icnn' alt='' />{t("PatientTitle")}                <span class="starMandatory">*</span>
                </label>
                <select className="form-select form-select-sm" id="ddlTitle" aria-label=".form-select-sm example" name='titleId' value={patientDetails.titleId} onChange={handlePatientDetailsChange}>
                    <option value="0" selected>Select Title</option>
                    {titleList && titleList.map((list) => {
                        return (
                            <option value={list.id}>{list.name}</option>
                        )
                    })}
                </select>
                <small id="errTitle" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtPatientFirstName" className="form-label relative"><img src={patientOPD} className='icnn' alt='' />{t("PatientFirstName")}<span class="starMandatory">*</span></label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.patientName ? 'is-invalid' : ''}`} id="txtPatientFirstName" placeholder={t("Enter_Patient_First_Name")} name='patientName' value={patientDetails.patientName} onChange={handlePatientDetailsChange} />
                {characterValidation.patientName && <div className="invalid-feedback">{characterValidation.patientName}</div>}
                <small id="errPatientFirstName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtPatientMiddleName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PatientMiddleName")}</label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.middleName ? 'is-invalid' : ''}`} id="txtPatientMiddleName" placeholder={t("Enter_Patient_Middle_Name")} name='middleName' value={patientDetails.middleName} onChange={handlePatientDetailsChange} />
                {characterValidation.middleName && <div className="invalid-feedback">{characterValidation.middleName}</div>}
                <small id="errPatientMiddleName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtPatientLastName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PatientLastName")}<span class="starMandatory">*</span></label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.lastName ? 'is-invalid' : ''}`} id="txtPatientLastName" placeholder={t("Enter_Patient_Last_Name")} name='lastName' value={patientDetails.lastName} onChange={handlePatientDetailsChange} />
                {characterValidation.lastName && <div className="invalid-feedback">{characterValidation.lastName}</div>}
                <small id="errPatientLastName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div>
            {/* <div className="col-2 mb-2">
                <label htmlFor="txtPatientSuffix" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PatientSuffix")}</label>
                <sup style={{ color: "red" }}>*</sup>
                <input type="text" className="form-control form-control-sm" id="txtPatientSuffix" placeholder={t("Enter_Patient_Suffix")} name='patientSuffix' value={patientDetails.patientSuffix} onChange={handlePatientDetailsChange} />
                <small id="errPatientSuffix" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div> */}
            <div className="col-2 mb-2">
                <label htmlFor="txtBirthFirstName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BirthFirstName")}</label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.birthFirstName ? 'is-invalid' : ''}`} id="txtBirthFirstName" placeholder={t("Enter_Birth_First_Name")} name='birthFirstName' value={patientDetails.birthFirstName} onChange={handlePatientDetailsChange} />
                {characterValidation.birthFirstName && <div className="invalid-feedback">{characterValidation.birthFirstName}</div>}
                <small id="errBirthFirstName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtBirthMiddleName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BirthMiddleName")}</label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.birthMiddleName ? 'is-invalid' : ''}`} id="txtBirthMiddleName" placeholder={t("Enter_Birth_Middle_Name")} name='birthMiddleName' value={patientDetails.birthMiddleName} onChange={handlePatientDetailsChange} />
                {characterValidation.birthMiddleName && <div className="invalid-feedback">{characterValidation.birthMiddleName}</div>}
                <small id="errBirthMiddleName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtBirthLastName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BirthLastName")}</label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.birthLastName ? 'is-invalid' : ''}`} id="txtBirthLastName" placeholder={t("Enter_Birth_Last_Name")} name='birthLastName' value={patientDetails.birthLastName} onChange={handlePatientDetailsChange} />
                {characterValidation.birthLastName && <div className="invalid-feedback">{characterValidation.birthLastName}</div>}
                <small id="errBirthLastName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div>
            {/* <div className="col-2 mb-2">
                <label htmlFor="txtPatientName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_Name")}</label><sup style={{ color: "red" }}>*</sup>
                <input type="text" className="form-control form-control-sm" id="txtPatientName" placeholder={t("Enter_Patient_Name")} name='patientName' value={patientDetails.patientName} onChange={handlePatientDetailsChange} />
                <small id="errPatientName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div> */}
            <div className="col-2 mb-2 relative">
                <label htmlFor="txtDob" className="form-label "><img src={calendar} className='icnn' alt='' />{t("Date_of_Birth")}<span class="starMandatory">*</span></label>
                <input type="date" className="form-control form-control-sm" max={today} id="txtDob" name='dob' value={patientDetails.dob} onChange={handlePatientDetailsChange} />
                <small id="errPatientDob" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>

            <div className="col-2 mb-2">
                <label htmlFor="ddlsexualOrientation" className="form-label"><img src={ageIcon} className='icnn' />{t("Sexual_Orientation")}</label>
                <select className="form-select form-select-sm" id="ddlsexualOrientation" aria-label=".form-select-sm example" name='sexualOrientationId' value={patientDetails.sexualOrientationId} onChange={handlePatientDetailsChange}>
                    <option value="0">{t("Select_Sexual_Orientation")}</option>
                    {sexualOrientationlist && sexualOrientationlist.map((list) => {
                        return (
                            <option value={list.id}>{list.name}</option>
                        )
                    })}
                </select>
            </div>

            <div className="col-2 mb-2">
                <label htmlFor="txtExternalID" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_ExternalID")}</label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.externalId ? 'is-invalid' : ''}`} id="txtExternalID" placeholder={t("Enter_Patient_ExternalID")} name='externalId' value={patientDetails.externalId} onChange={handlePatientDetailsChange} />
                {characterValidation.externalId && <div className="invalid-feedback">{characterValidation.externalId}</div>}
                <small id="errExternalID" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div>
            <div className="col-2 mb-2">
                <label htmlFor="txtSS" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_Social_Security_Number")}</label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.socialSecurityNo ? 'is-invalid' : ''}`} id="txtSS" placeholder={t("Enter_Social_Security_Number")} name='socialSecurityNo' value={patientDetails.socialSecurityNo} onChange={handlePatientDetailsChange} />
                {characterValidation.socialSecurityNo && <div className="invalid-feedback">{characterValidation.socialSecurityNo}</div>}
                <small id="errSS" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div>
            <div className="col-2 mb-2">
                <label htmlFor="txtLicense" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_License")}</label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.driversLicense ? 'is-invalid' : ''}`} id="txtLicense" placeholder={t("Enter_License")} name='driversLicense' value={patientDetails.driversLicense} onChange={handlePatientDetailsChange} />
                {characterValidation.driversLicense && <div className="invalid-feedback">{characterValidation.driversLicense}</div>}
                <small id="errLicense" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-1 mb-2">
                <label htmlFor="ddlMaritalStatus" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("MaritalStatus")}</label>
                <select className="form-select form-select-sm" id="ddlMaritalStatus" aria-label=".form-select-sm example" name='maritalStatusId' value={patientDetails.maritalStatusId} onChange={handlePatientDetailsChange}>
                    <option value="0" >Select Marital Status</option>
                    {maritalStatusList && maritalStatusList.map((list) => {
                        return (
                            <option value={list.id}>{list.name}</option>
                        )
                    })}
                </select>
                <small id="errMaritalStatus" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtBillingNote" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BillingNote")}</label>
                <input type="text" className={`form-control form-control-sm ${characterValidation.billingNote ? 'is-invalid' : ''}`} id="txtBillingNote" placeholder={t("Enter_BillingNote")} name='billingNote' value={patientDetails.billingNote} onChange={handlePatientDetailsChange} />
                {characterValidation.billingNote && <div className="invalid-feedback">{characterValidation.billingNote}</div>}
                <small id="errBillingNote" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div>

            <div className="col-2 mb-2">
                <label htmlFor="ddlGender" className="form-label"><img src={genderIcon} className='icnn' alt='' />{t("Gender")}<span class="starMandatory">*</span></label>
                <select className="form-select form-select-sm" id="ddlGender" aria-label=".form-select-sm example" name='genderId' value={patientDetails.genderId} onChange={handlePatientDetailsChange}>
                    <option value="0">{t("Select_Gender")}</option>

                    {getPatientGender && getPatientGender.map((val, ind) => {
                        return (
                            <option value={val.id}>{val.name}</option>
                        );
                    })}

                </select>
                <small id="errPatientGender" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>


            <div className="col-2 mb-2">
                <label htmlFor="ddlGenderIdentity" className="form-label"><img src={genderIcon} className='icnn' alt='' />{t("Gender Identity")}<span class="starMandatory">*</span></label>
                <select className="form-select form-select-sm" id="ddlGenderIdentity" aria-label=".form-select-sm example" name='genderidentityId' value={patientDetails.genderidentityId} onChange={handlePatientDetailsChange}>
                    <option value="0">{t("Select Gender Identity")}</option>
                    {getPatientGenderIdentities && getPatientGenderIdentities.map((val, ind) => {
                        return (
                            <option value={val.id}>{val.name}</option>
                        );
                    })}
                </select>
                <small id="errPatientGenderIdentity" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>
            <div className="col-2 mb-2 classMultiselect">
                <label htmlFor="txtPreviousNames" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PreviousNames")}</label>
                {/* <ReactInputTags
                tags={selectedPriviousNames}
                onChange={handleTagsChange}
                options={priviousNames}
            /> */}
                {/* <ReactTags
          tags={tags}
        //   suggestions={priviousNames}
        //   delimiters={delimiters}
        //   handleDelete={handleDelete}
          handleAddition={handleTagsChange}
        //   handleDrag={handleDrag}
        //   handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
        //   autocomplete
        /> */}


                <Multiselect
                    options={priviousNames} // Options to display in the dropdown
                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    // onRemove={this.onRemove} // Function will trigger on remove event
                    displayValue="fullName" // Property name to display in the dropdown options
                />

                {/* <input type="text" className="form-control form-control-sm" id="txtPreviousNames" placeholder={t("Enter_PreviousNames")} name='previousNames' value={patientDetails.previousNames} onChange={handlePatientDetailsChange} /> */}
                <small id="errPreviousNames" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div>
            <div className="col-2 mb-2">
                <label htmlFor="ddlEmpty" className="form-label"></label>
                <button type="button" class="btn btn-save btn-save-fill btn-sm mt-4" id="addPriviousNames" onClick={handlePatientDetailsAdd}><i className="bi bi-plus"></i> Add</button>
            </div>

            {/* ######################## Moodal Pop Area #################### */}
            {showPatientHistory === 1 ?
                <div className={`modal d-${showPatientHistory === 1 ? "block" : ""}`} id="modalSetting" data-bs-backdrop="static">
                    <div className="modal-dialog" style={{ maxWidth: '65vw' }}>
                        <div className="modal-content p-0">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Patient List On This Mobile No.</h1>
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { setShowPatientHistory(0) }}><i className="bi bi-x-octagon"></i></button>
                            </div>
                            <div className="modal-body p-0">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="med-box">
                                            <div className="med-table-section" style={{ height: '30rem' }}>
                                                <table className='med-table border_ striped'>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>UHID</th>
                                                            <th>Patient Name</th>
                                                            <th className='text-center'>Age/Gender</th>
                                                            <th>Mobile Number</th>
                                                            <th>Department</th>
                                                            <th>Address</th>
                                                            <th>Visit Date</th>
                                                            <th className='text-center'>Select Profile</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        {patientListByMobileNo && patientListByMobileNo.map((list, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{list.uhID}</td>
                                                                    <td>{list.patientName}</td>
                                                                    <td className='text-center'>{list.age}<span>{parseInt(list.ageUnitId) === 1 ? 'Y' : parseInt(list.ageUnitId) === 2 ? 'M' : parseInt(list.ageUnitId) === 3 ? 'D' : ''}</span>/{list.patientGender}</td>
                                                                    <td>{list.mobileNo}</td>
                                                                    <td>{list.departmentName}</td>
                                                                    <td>{list.address}</td>
                                                                    <td>{list.registrationDate}</td>
                                                                    <td className='text-center'><i class="fa-regular fa-circle-check" title='Select Patient Profile' onClick={() => { "getPatientRegHistory"(list, 0); setShowPatientHistory(0) }} style={{ fontSize: '1rem', cursor: 'pointer' }} ariaHidden="true" ></i>
                                                                        {/* <i class="fa fa-arrow-up" title='Select Patient Profile' onClick={() => { getPatientRegHistory(list) ;setShowPatientHistory(0) }} style={{ fontSize: '1.5rem', color: 'red', cursor: 'pointer' }} ariaHidden="true" data-dismiss="modal"></i> */}
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
                        </div>
                    </div>
                </div> : ""}

        </>

    );
};

export default PatientDetails;