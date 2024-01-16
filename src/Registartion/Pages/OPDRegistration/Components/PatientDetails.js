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

const PatientDetails = ({ initialPatientDetails, onPatientDetailsChange, onPriviousNamesAddButtonClick, isShowPriviousModal, priviousNames,patientDetailsData }) => {
    let [patientGender, setPatientGender] = useState('0');
    const [selectedPriviousNames, setSelectedPriviousNames] = useState([]);
    let [getPatientGender, setGetPatientGender] = useState([]);
    let [getPatientGenderIdentities, setGetPatientGenderIdentities] = useState([]);
    let [sexualOrientationlist, setSexualOrientationlist] = useState([]);
    let [maritalStatusList,setMaritalStatusList]=useState([]);
    let [titleList,setTitleList]=useState([]);
    const [options, setOptions] = useState([]);
    const handleTagsChange = (movies) => {
        setSelectedPriviousNames(movies);
    };
    // const [tags, setTags] = React.useState([
    //     { id: 'Thailand', text: 'Thailand' },
    //     { id: 'India', text: 'India' },
    //     { id: 'Vietnam', text: 'Vietnam' },
    //     { id: 'Turkey', text: 'Turkey' }
    //   ]);
    //   useEffect(() => {
    //     // Transform the previousNames array into the desired format
    //     const newTags = priviousNames.map((name) => ({
    //       id: name,
    //       text: name,
    //     }));
    // console.log(priviousNames);
    //     // Set the state with the newTags array
    //     setOptions(newTags);
    //   }, []); 

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
    let getAllGender=async()=>{
        const response = await GetGender();
        if(response.status===1){
            setGetPatientGender(response.responseValue)
        }
    }
    let getAllGenderIdentities=async()=>{
        const response = await GetAllGenderIdentities();
        if(response.status===1){
            setGetPatientGenderIdentities(response.responseValue)
        }
    }


    const [patientDetails, setPatientDetails] = useState({
        titleId: '',
        patientName: '',
        middleName:'',
        lastName: '',
        nameSuffix: '',
        birthFirstName: '',
        birthMiddleName: '',
        birthLastName: '',
        dob: '',
        sexualOrientationId: '',
        externalId: '',
        socialSecurityNo:'',
        driversLicense: '',
        maritalStatusId: '',
        billingNote: '',
        previousNamesJsonString: '[]',
        genderId: '',
        genderidentityId:''
    });

    useEffect(() => {
        patientDetailsData(patientDetails);
        getAllGender();
        getTitle();
        getAllGenderIdentities();
        getAllSexualOrientation();
        getMaritalStatusList();
        if (initialPatientDetails) {
            setPatientDetails(initialPatientDetails);
        }
        console.log('patientDetails',patientDetails)
    }, [initialPatientDetails,patientDetailsData,patientDetails]);


    const handlePatientDetailsChange = (e) => {
        document.getElementById("errPatientFirstName").style.display = "none";
        document.getElementById("errTitle").style.display = "none";
        document.getElementById("errPatientMiddleName").style.display = "none"
        document.getElementById("errPatientLastName").style.display = "none"
        document.getElementById("errPatientDob").style.display = "none"
        document.getElementById("errPatientGender").style.display = "none"
        document.getElementById("errPatientGenderIdentity").style.display = "none"


        const { name, value } = e.target;
        // console.log(name);
        // console.log(value);
        setPatientDetails((prevPatientDetails) => ({
            ...prevPatientDetails,
            [name]: value,
        }));
        //onPatientDetailsChange(name, value);
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
        <><div className="col-1 mb-2">
            <label htmlFor="ddlTitle" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("PatientTitle")}</label>
            <sup style={{ color: "red" }}>*</sup>
            <select className="form-select form-select-sm" id="ddlTitle" aria-label=".form-select-sm example" name='titleId' value={patientDetails.titleId} onChange={handlePatientDetailsChange}>
                <option value="0" selected>Select Title</option>
                {titleList && titleList.map((list)=>{
                    return(
                        <option value={list.id}>{list.name}</option>
                    )
                })}
            </select>
            <small id="errTitle" className="form-text text-danger" style={{ display: 'none' }}></small>
        </div><div className="col-2 mb-2">
                <label htmlFor="txtPatientFirstName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PatientFirstName")}</label><sup style={{ color: "red" }}>*</sup>
                <input type="text" className="form-control form-control-sm" id="txtPatientFirstName" placeholder={t("Enter_Patient_First_Name")} name='patientName' value={patientDetails.patientName} onChange={handlePatientDetailsChange} />
                <small id="errPatientFirstName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtPatientMiddleName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PatientMiddleName")}</label><sup style={{ color: "red" }}>*</sup>
                <input type="text" className="form-control form-control-sm" id="txtPatientMiddleName" placeholder={t("Enter_Patient_Middle_Name")} name='middleName' value={patientDetails.middleName} onChange={handlePatientDetailsChange} />
                <small id="errPatientMiddleName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtPatientLastName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PatientLastName")}</label><sup style={{ color: "red" }}>*</sup>
                <input type="text" className="form-control form-control-sm" id="txtPatientLastName" placeholder={t("Enter_Patient_Last_Name")} name='lastName' value={patientDetails.lastName} onChange={handlePatientDetailsChange} />
                <small id="errPatientLastName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtPatientSuffix" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PatientSuffix")}</label>
                {/* <sup style={{ color: "red" }}>*</sup> */}
                <input type="text" className="form-control form-control-sm" id="txtPatientSuffix" placeholder={t("Enter_Patient_Suffix")} name='patientSuffix' value={patientDetails.patientSuffix} onChange={handlePatientDetailsChange} />
                <small id="errPatientSuffix" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtBirthFirstName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BirthFirstName")}</label>
                <input type="text" className="form-control form-control-sm" id="txtBirthFirstName" placeholder={t("Enter_Birth_First_Name")} name='birthFirstName' value={patientDetails.birthFirstName} onChange={handlePatientDetailsChange} />
                <small id="errBirthFirstName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtBirthMiddleName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BirthMiddleName")}</label>
                <input type="text" className="form-control form-control-sm" id="txtBirthMiddleName" placeholder={t("Enter_Birth_Middle_Name")} name='birthMiddleName' value={patientDetails.birthMiddleName} onChange={handlePatientDetailsChange} />
                <small id="errBirthMiddleName" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtBirthLastName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BirthLastName")}</label>
                <input type="text" className="form-control form-control-sm" id="txtBirthLastName" placeholder={t("Enter_Birth_Last_Name")} name='birthLastName' value={patientDetails.birthLastName} onChange={handlePatientDetailsChange} />
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
                <label htmlFor="txtDob" className="form-label"><img src={calendar} className='icnn' alt='' />{t("Date_of_Birth")}</label><sup style={{ color: "red" }}>*</sup>
                <input type="date" className="form-control form-control-sm" id="txtDob" name='dob' value={patientDetails.dob} onChange={handlePatientDetailsChange} />
                <small id="errPatientDob" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div>

            <div className="col-2 mb-2">
                <label htmlFor="ddlsexualOrientation" className="form-label"><img src={ageIcon} className='icnn' />{t("Sexual_Orientation")}</label>
                <select className="form-select form-select-sm" id="ddlsexualOrientation" aria-label=".form-select-sm example" name='sexualOrientationId' value={patientDetails.sexualOrientationId} onChange={handlePatientDetailsChange}>
                    <option value="0">{t("Select_Sexual_Orientation")}</option>
                    {sexualOrientationlist && sexualOrientationlist.map((list)=>{
                        return(
                            <option value={list.id}>{list.name}</option>
                        )
                    })}
                </select>
            </div>

            <div className="col-2 mb-2">
                <label htmlFor="txtExternalID" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_ExternalID")}</label>
                <input type="text" className="form-control form-control-sm" id="txtExternalID" placeholder={t("Enter_Patient_ExternalID")} name='externalId' value={patientDetails.externalId} onChange={handlePatientDetailsChange} />
                <small id="errExternalID" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div>
            <div className="col-2 mb-2">
                <label htmlFor="txtSS" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_Social_Security_Number")}</label>
                <input type="text" className="form-control form-control-sm" id="txtSS" placeholder={t("Enter_Social_Security_Number")} name='socialSecurityNo' value={patientDetails.socialSecurityNo} onChange={handlePatientDetailsChange} />
                <small id="errSS" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div>
            <div className="col-2 mb-2">
                <label htmlFor="txtLicense" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_License")}</label>
                <input type="text" className="form-control form-control-sm" id="txtLicense" placeholder={t("Enter_License")} name='driversLicense' value={patientDetails.driversLicense} onChange={handlePatientDetailsChange} />
                <small id="errLicense" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
            </div><div className="col-1 mb-2">
                <label htmlFor="ddlMaritalStatus" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("MaritalStatus")}</label>
                <select className="form-select form-select-sm" id="ddlMaritalStatus" aria-label=".form-select-sm example" name='maritalStatusId' value={patientDetails.maritalStatusId} onChange={handlePatientDetailsChange}>
                    <option value="0" >Select Marital Status</option>
                    {maritalStatusList && maritalStatusList.map((list)=>{
                        return(
                            <option value={list.id}>{list.name}</option>
                        )
                    })}
                </select>
                <small id="errMaritalStatus" className="form-text text-danger" style={{ display: 'none' }}></small>
            </div><div className="col-2 mb-2">
                <label htmlFor="txtBillingNote" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BillingNote")}</label>
                <input type="text" className="form-control form-control-sm" id="txtBillingNote" placeholder={t("Enter_BillingNote")} name='billingNote' value={patientDetails.billingNote} onChange={handlePatientDetailsChange} />
                <small id="errBillingNote" className="form-text text-danger" style={{ display: 'none' }}>
                </small>
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
                <button type="button" class="form-control form-control-sm" id="addPriviousNames" onClick={handlePatientDetailsAdd}><i className="bi bi-plus"></i> Add</button>
            </div>
            <div className="col-2 mb-2">
                <label htmlFor="ddlGender" className="form-label"><img src={genderIcon} className='icnn' alt='' />{t("Gender")}</label><sup style={{ color: "red" }}>*</sup>
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
                <label htmlFor="ddlGenderIdentity" className="form-label"><img src={genderIcon} className='icnn' alt='' />{t("Gender Identity")}</label><sup style={{ color: "red" }}>*</sup>
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
        </>

    );
};

export default PatientDetails;