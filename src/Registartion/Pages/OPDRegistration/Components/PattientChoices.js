import React , { useState, useEffect }from 'react';
import zipCodeIcon from '../../../../assets/images/icons/zipCodeIcon.svg';
import stateIcon from '../../../../assets/images/icons/stateIcon.svg';
import city from '../../../../assets/images/icons/city.svg';
import smartphone from '../../../../assets/images/icons/smartphone.svg';
import emailIcon from '../../../../assets/images/icons/email.svg';
import { useTranslation } from 'react-i18next';
import GetStateList from '../../../API/GET/GetStateList'
import GetCityList from '../../../API/GET/GetCityList';
import GetCountryList from '../../../API/GET/GetCountryList';
const PattientChoices = ({ initialContactDetails,onContactDetailsChange }) => {
    const [choicesList, setChoicesList] = useState([{id:1,name:'Yes'},{id:2,name:'No'}]);
    const {t} = useTranslation();
  return (
    <div className="dflex">

    <div className="col-2 mb-2">
<label htmlFor="ddlProvider" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Provider")}</label>
<select className="form-select form-select-sm" id="ddlProvider" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Provider")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errProvider" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="txtProvideSinceDate" className="form-label"><img src={emailIcon} className='icnn'  alt=''/>{t("ProvideSinceDate")}</label>
<input type="date" className="form-control form-control-sm" id="txtProvideSinceDate" placeholder={t("ENTER_Provide_Since_Date")} name='provideSinceDate'  />
</div>

<div className="col-2 mb-2">
<label htmlFor="ddlReferring_Provider" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Referring_Provider")}</label>
<select className="form-select form-select-sm" id="ddlReferring_Provider" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Referring_Provider")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errReferring_Provider" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-2 mb-2">
<label htmlFor="ddlPharmacy" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Pharmacy")}</label>
<select className="form-select form-select-sm" id="ddlPharmacy" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Pharmacy")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errPharmacy" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-2 mb-2">
<label htmlFor="ddlHIPAA_Notice_Received" className="form-label"><img src={city} className='icnn'  alt=''/>{t("HIPAA_Notice_Received")}</label>
<select className="form-select form-select-sm" id="ddlHIPAA_Notice_Received" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_HIPAA_Notice_Received")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errHIPAA_Notice_Received" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-2 mb-2">
<label htmlFor="ddlAllow_Voice_Message" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Allow_Voice_Message")}</label>
<select className="form-select form-select-sm" id="ddlAllow_Voice_Message" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Allow_Voice_Message")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errAllow_Voice_Message" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="txtLeaveMessageWith" className="form-label"><img src={emailIcon} className='icnn'  alt=''/>{t("LeaveMessageWith")}</label>
<input type="text" className="form-control form-control-sm" id="txtLeaveMessageWith" placeholder={t("ENTER_Leave_Message_With")} name='leaveMessageWith'  />
</div>

<div className="col-2 mb-2">
<label htmlFor="ddlAllow_Mail_Message" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Allow_Mail_Message")}</label>
<select className="form-select form-select-sm" id="ddlAllow_Mail_Message" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Allow_Mail_Message")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errAllow_Mail_Message" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-2 mb-2">
<label htmlFor="ddlAllow_SMS" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Allow_SMS")}</label>
<select className="form-select form-select-sm" id="ddlAllow_SMS" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Allow_SMS")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errAllow_SMS" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="ddlAllow_Email" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Allow_Email")}</label>
<select className="form-select form-select-sm" id="ddlAllow_Email" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Allow_Email")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errAllow_Email" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="ddlAllow_Immunization_Registry_Use" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Allow_Immunization_Registry_Use")}</label>
<select className="form-select form-select-sm" id="ddlAllow_Immunization_Registry_Use" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Allow_Immunization_Registry_Use")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errAllow_Immunization_Registry_Use" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="ddlAllow_Immunization_Info_Sharing" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Allow_Immunization_Info_Sharing")}</label>
<select className="form-select form-select-sm" id="ddlAllow_Immunization_Info_Sharing" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Allow_Immunization_Info_Sharing")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errAllow_Immunization_Info_Sharing" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="ddlAllow_Health_Information_Exchange" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Allow_Health_Information_Exchange")}</label>
<select className="form-select form-select-sm" id="ddlAllow_Health_Information_Exchange" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Allow_Health_Information_Exchange")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errAllow_Health_Information_Exchange" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="ddlAllow_Patient_Portal" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Allow_Patient_Portal")}</label>
<select className="form-select form-select-sm" id="ddlAllow_Patient_Portal" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Allow_Patient_Portal")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errAllow_Patient_Portal" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="txtPreventAPIAccess" className="form-label"><img src={emailIcon} className='icnn'  alt=''/>{t("PreventAPIAccess")}</label>
<input type="checkbox" className="form-control form-control-sm" id="chkPreventAPIAccess"  name='preventAPIAccess'  />
</div>

<div className="col-2 mb-2">
<label htmlFor="txtCMSPortalLogin" className="form-label"><img src={emailIcon} className='icnn'  alt=''/>{t("CMSPortalLogin")}</label>
<input type="text" className="form-control form-control-sm" id="txtCMSPortalLogin" placeholder={t("ENTER_CMS_Portal_Login")} name='cMSPortalLogin'  />
</div>


<div className="col-2 mb-2">
<label htmlFor="ddlImmunization_Registry_Status" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Immunization_Registry_Status")}</label>
<select className="form-select form-select-sm" id="ddlImmunization_Registry_Status" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Immunization_Registry_Status")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errImmunization_Registry_Status" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>

<div className="col-2 mb-2">
<label htmlFor="txtImmunizationRegistryStatusEffectiveDate" className="form-label"><img src={emailIcon} className='icnn'  alt=''/>{t("ImmunizationRegistryStatusEffectiveDate")}</label>
<input type="date" className="form-control form-control-sm" id="txtImmunizationRegistryStatusEffectiveDate" placeholder={t("ENTER_Immunization_Registry_Status_Effective_Date")} name='immunizationRegistryStatusEffectiveDate'  />
</div>



<div className="col-2 mb-2">
<label htmlFor="ddlPublicity_Code" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Publicity_Code")}</label>
<select className="form-select form-select-sm" id="ddlPublicity_Code" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Publicity_Code")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errPublicity_Code" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="txtPublicityCodeEffectiveDate" className="form-label"><img src={emailIcon} className='icnn'  alt=''/>{t("PublicityCodeEffectiveDate")}</label>
<input type="date" className="form-control form-control-sm" id="txtPublicityCodeEffectiveDate" placeholder={t("ENTER_Publicity_Code_Effective_Date")} name='publicityCodeEffectiveDate'  />
</div>
<div className="col-2 mb-2">
<label htmlFor="ddlProtection_Indicator" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Protection_Indicator")}</label>
<select className="form-select form-select-sm" id="ddlProtection_Indicator" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Protection_Indicator")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errProtection_Indicator" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="txtProtectionIndicatorEffectiveDate" className="form-label"><img src={emailIcon} className='icnn'  alt=''/>{t("ProtectionIndicatorEffectiveDate")}</label>
<input type="date" className="form-control form-control-sm" id="txtProtectionIndicatorEffectiveDate" placeholder={t("ENTER_Protection_Indicator_Effective_Date")} name='protectionIndicatorEffectiveDate'  />
</div>
<div className="col-2 mb-2">
<label htmlFor="txtCareTeamProvider" className="form-label"><img src={emailIcon} className='icnn'  alt=''/>{t("CareTeamProvider")}</label>
<input type="text" className="form-control form-control-sm" id="txtCareTeamProvider" placeholder={t("ENTER_Care_Team_Provider")} name='careTeamProvider'  />
</div>
<div className="col-2 mb-2">
<label htmlFor="ddlCare_Team_Status" className="form-label"><img src={city} className='icnn'  alt=''/>{t("Care_Team_Status")}</label>
<select className="form-select form-select-sm" id="ddlCare_Team_Status" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Care_Team_Status")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errCare_Team_Status" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>
<div className="col-2 mb-2">
<label htmlFor="txtCareTeamFacility" className="form-label"><img src={emailIcon} className='icnn'  alt=''/>{t("CareTeamFacility")}</label>
<input type="text" className="form-control form-control-sm" id="txtCareTeamFacility" placeholder={t("ENTER_Care_Team_Facility")} name='careTeamFacility'  />
</div>
<div className="col-2 mb-2">
<label htmlFor="ddlPatientCategories" className="form-label"><img src={city} className='icnn'  alt=''/>{t("PatientCategories")}</label>
<select className="form-select form-select-sm" id="ddlPatientCategories" aria-label=".form-select-sm example" >
    <option value="0">{t("Select_Patient_Categories")}</option>
    {choicesList && choicesList.map((list) => {
        
            return (
                <option value={list.id}>{list.name}</option>
            )
        
    })}
</select>
<small id="errPatientCategories" className="form-text text-danger" style={{ display: 'none' }}></small>
</div>







    </div>
   

  );
};

export default PattientChoices;