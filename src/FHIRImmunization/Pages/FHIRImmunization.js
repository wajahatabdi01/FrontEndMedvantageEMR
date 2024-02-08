import React, { useEffect, useState } from 'react'
import plus from '../../assets/images/icons/icons8-plus-30.png';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg'
import printIcon from '../../assets/images/icons/icons8-print-26.png'
import FHIRImmunizationCodeMaster from '../Components/FHIRImmunizationCodeMaster';

import deleteIcon from '../../assets/images/icons/icons8-delete-30.png'
import GetFHIRImmunizationManufacturer from '../API/GET/GetFHIRImmunizationManufacturer';
import GetFHIRImmunizationAdministrationSite from '../API/GET/GetFHIRImmunizationAdministrationSite';
import GetFHIRImmunizationCompletionStatus from '../API/GET/GetFHIRImmunizationCompletionStatus';
import GetFHIRImmunizationObservationCriteria from '../API/GET/GetFHIRImmunizationObservationCriteria';
import GetFHIRImmunizationSubstancerefusalReason from '../API/GET/GetFHIRImmunizationSubstancerefusalReason';
import GetFHIRImmunizationRoute from '../API/GET/GetFHIRImmunizationRoute';
import GetFHIRNameandTitleofImmunizationAdministrator from '../API/GET/GetFHIRNameandTitleofImmunizationAdministrator';
import { use } from 'i18next';
import PostFHIRImmunization from '../API/POST/PostFHIRImmunization';
import GetAllImmunizationData from '../API/GET/GetAllImmunizationData';
import DeleteImmunizationByRowId from '../API/DELETE/DeleteImmunizationByRowId';


export default function FHIRImmunization() {

  let [makeData, setMakeData] = useState([]);
  let [getData, setgetData] = useState([]);
  const [PopUpId, setPopUpId] = useState('');
  const [showObservation, setShowObservation] = useState(false);
  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [isShowPopUpCvx, setIsShowPopUpCvx] = useState(0);
  const [isShowPopUpSnow, setIsShowPopUpSnow] = useState(0);

  const [getImmunizationManufacture, setImmunizationManufacture] = useState([]);
  const [getImmunizationAdministrationSite, setImmunizationAdministrationSite] = useState([]);
  const [getImmunizationCompletionStatus, setImmunizationCompletionStatus] = useState([]);
  const [getImmunizationObservationCriteria, setImmunizationObservationCriteria] = useState([]);
  const [getImmunizationSubstancerefusalReason, setImmunizationSubstancerefusalReason] = useState([]);
  const [getImmunizationRoute, setImmunizationRoute] = useState([]);
  const [getImmunizationAdministrator, setImmunizationAdministrator] = useState([]);
  const [getAllImmunizationDataList, setAllImmunizationDataList] = useState([]);

  const [selectedValues, setSelectedValues] = useState({});

  const [sendForm, setSendForm] = useState({
    DatenTimeAdministered : '',
    AmountAdministered : '',
    AmountAdministeredUnit : 0,
    ExpirationDate : '',
    ImmunizationManufacturer : 0,
    ImmunizationLotNumber : 0,
    ImmunizationStatements : '',
    NameAndTitleofImmunizationAdministrator: '',
    IDofImmunizationAdministrator : 0,
    DateofVISStatement : '',
    Route : 0,
    InformationSource : '',
    AdministrationSite : 0,
    CompletionStatus : 0,
    SubstanceRefusalReason : 0,
    ImmunizationOrderingProvider:0,
    Notes: ''

  })

  const [observationRow, setObservationRow] = useState([
    {
      rowID: 1,
      Date: '',
      Code: '',
      Type: 0,
      Description: '',
      reasonCode: '',
      reasonStatus: '',
      reasonRecordingDate: '',
      reasonEndDate: '',
    },
  ]);
  
  const customStyle = { marginLeft: '0px' };

  const handleAddCarePlanRow = () => {
    setObservationRow(prevRows => [
      ...prevRows,
      {
        rowID: observationRow.length + 1,
        observationCriteria: '1', // '1' corresponds to "Unassigned"
      },
    ]);
  };

  const funToShowObservation = () => {
    setShowObservation(!showObservation)
  }
 //////////////////////////////////////////// Opem modal for immunization an reason code ////////////////////////////////////////
  const handleOpenModal = (modalID) => {
    setIsShowPopUp(1);
    setPopUpId(modalID);
  }

  const handleCloseModal = () => {
    setIsShowPopUp(0);
     setPopUpId('');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////// Open and close modal for CVX  Code //////////////////////
    const handleOpenModalCVX = (modalId) => {
      setIsShowPopUpCvx(1)
      setPopUpId(modalId);
    }

    const handleCloseModalCVX = () => {
      setIsShowPopUpCvx(0);
      setPopUpId('');
    }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  //////////////////////////////////////////////// Open and close modal for  SNOW Code //////////////////////
    const handleOpenModalSnow = (modalId) => {
      setIsShowPopUpSnow(1)
      setPopUpId(modalId);
    }

    const handleCloseModalSnow = () => {
      setIsShowPopUpSnow(0);
      setPopUpId('');
    }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleCriteriaValue = (modalId) => {
    setPopUpId(modalId);
    const t = {
      moduleId: modalId,
    }
    
    setgetData(t);
    setMakeData([...makeData, t])
  }

  const handleSelectChange = (event, rowID) => {
    const value = event.target.value;
  
    // Set the selected value in the state for the specific row
    setSelectedValues(prevValues => ({
      ...prevValues,
      [rowID]: value,
    }));
  };

  const handleChange=(e)=>{
    const {name,value}= e.target;
       setSendForm((arr)=>({
        ...arr,
          [name]:value
       })); 
    }

  /////////////////////////// To send data in codemaster component and to receive it Immunization ///////////////////////////////////////

  const SelectedData = (data, modalID) => {


    const t = {
      moduleId: modalID,
      data: data
    }
    
    setgetData(t);
    setMakeData([...makeData, t])
    let temp = ""
    for (var i = 0; i < data.length; i++) {
      temp += " " + data[i].code
    }

    document.getElementById(modalID).value = temp

  }

  /////////////////////////////////// To send data in codemaster component for CVX Code /////////////////////////////////
  const SelectedDataCVX = (data, modalID) => {

    const t = {
      moduleId: modalID,
      data: data
    }
    
    setgetData(t);
    setMakeData([...makeData, t])
    let temp = ""
    for (var i = 0; i < data.length; i++) {
      temp += " " + data[i].code
    }
    document.getElementById(modalID).value = temp

  }
  
  /////////////////////////////////// To send data in codemaster component for SNOW Code /////////////////////////////////
  const SelectedDataSnow = (data, modalID) => {
  
    const t = {
      moduleId: modalID,
      data: data
    }
    
    setgetData(t);
    setMakeData([...makeData, t])
    let temp = ""
    for (var i = 0; i < data.length; i++) {
      temp += " " + data[i].code
    }

    document.getElementById(modalID).value = temp

  }
  /////////////////////////////////// To send data in codemaster component for Reason Code /////////////////////////////////
  const SelectedDataReason= (data, modalID) => {

    const t = {
      moduleId: modalID,
      data: data
    }
    
    setgetData(t);
    setMakeData([...makeData, t])
    let temp = ""
    for (var i = 0; i < data.length; i++) {
      temp += " " + data[i].code
    }

    document.getElementById(modalID).value = temp

  }

  /////////////////////////////////////////////////////// To delete the observation rows ///////////////////////////////////////

  const handleDeleteObservationRow= (index, key) => {
    let deleteTempArr = [];
    const arrData = [...observationRow];
    if(arrData.length === 1){
      return;
    }
    arrData.splice(index, 1)
    setObservationRow(arrData)
  }



  ///////////////////////////////////////////////// Function to get dropdown lists //////////////////////////////////////////

  const funToGetDropDownLists =  async () => {
    const manufacturerRes = await GetFHIRImmunizationManufacturer(); 
    if(manufacturerRes.status === 1){
      setImmunizationManufacture(manufacturerRes.responseValue);
    }
    const AdministrationSiteRes = await GetFHIRImmunizationAdministrationSite();
    if(AdministrationSiteRes.status === 1){
      setImmunizationAdministrationSite(AdministrationSiteRes.responseValue);
    }
    const CompletionStatusRes = await GetFHIRImmunizationCompletionStatus();
    if(CompletionStatusRes.status === 1) {    
      setImmunizationCompletionStatus(CompletionStatusRes.responseValue);
    }
    const ObservationCriteriaRes = await GetFHIRImmunizationObservationCriteria();
    if(ObservationCriteriaRes.status === 1){
      setImmunizationObservationCriteria(ObservationCriteriaRes.responseValue);
    }
    const SubstancerefusalReasonRes = await GetFHIRImmunizationSubstancerefusalReason();
    if(SubstancerefusalReasonRes.status === 1) {
      setImmunizationSubstancerefusalReason(SubstancerefusalReasonRes.responseValue);
    }
    const ImmunizationRouteRes = await GetFHIRImmunizationRoute();
    if(ImmunizationRouteRes.status === 1){
      setImmunizationRoute(ImmunizationRouteRes.responseValue)
    }
    const AdministratorRes = await GetFHIRNameandTitleofImmunizationAdministrator();
    if(AdministratorRes.status === 1) {
      setImmunizationAdministrator(AdministratorRes.responseValue);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////// function to get list of all immunization given /////////////////////////////////////////////
    const funGetAllImmunizationData = async () => {
      const getAllImmunizationDataRes = await GetAllImmunizationData('UHID00143');
      setAllImmunizationDataList(getAllImmunizationDataRes.responseValue);
    }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  ///////////////////////////////////////////////////////////// Make data for sending in handle save function /////////////////////////////////////////////////////////////////////
  const dataMaker = async(param) => {
       
    const lastIndexMap = {};
    var jsonData = param;
    jsonData.forEach((item, index, array) =>{
      const moduleId = item.moduleId;
      lastIndexMap[moduleId] = array[index];        
      });
      const dataArray = Object.values(lastIndexMap);
         
      return dataArray;
}
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////// To save data //////////////////////////////////////////////////////////////

  const handleSave = async () => {
  
    const getresponse = await dataMaker(makeData);
   
    let tempArrList = [];
    const data = [...observationRow];
    let Date_VIS_Published;
    let Date_VIS_Presented;
    let investDropDown;
    let investCodeTextF;
    let investCodeName;
    let ObservationCriteriaValueRowId;
    let ObservationCriteriaValueRow;
    let ObservationCriteria;
   
    for(var i =0; i<getresponse.length; i++)
    {      
      if(getresponse[i].moduleId === 'immunizationCode')
      {
        const investigationArr = getresponse[i].data;   
        let investMaker = '';
        let investCodeText = '';  
        for(let j=0; j < investigationArr.length; j++)
          { investMaker=investMaker.length === 0 ? investigationArr[j].dropdownName +':'+investigationArr[j].code  : investMaker +';'+investigationArr[j].dropdownName +':'+investigationArr[j].code;
            investCodeText =  investCodeText.length === 0 ? (investigationArr[j].codeText  ? investigationArr[j].codeText : '') : investCodeText +'|'+(investigationArr[j].codeText  ? investigationArr[j].codeText : '');}
          var investConCat = investMaker + ' ' + investCodeText;          
      }
      if(getresponse[i].moduleId === 'ReasonId')
      {
        const investigationArr = getresponse[i].data;  
        let investMakerResaon = '';
        let investCodeTextReason = '';  
        for(let k=0; k < investigationArr.length; k++)
          { investMakerResaon=investMakerResaon.length === 0 ? investigationArr[k].dropdownName +':'+investigationArr[k].code  : investMakerResaon +';'+investigationArr[k].dropdownName +':'+investigationArr[k].code;
          investCodeTextReason =  investCodeTextReason.length === 0 ? (investigationArr[k].codeText  ? investigationArr[k].codeText : '') : investCodeTextReason +'|'+(investigationArr[k].codeText  ? investigationArr[k].codeText : '');}
          var investConCatReason = investMakerResaon + ' ' + investCodeTextReason;
      }

    }
    
    for(let c=0; c<observationRow.length;c++)
    {
    
      for (let b = 0; b < getresponse.length; b++) {
        var investMakerD = '';
        var investCodeTextD = '';  
        var investCodeCVXD = '';
        

        if(getresponse[b].moduleId === 'CVX_CodeId'+observationRow[c].rowID)
        {
          const investigationArr = getresponse[b].data;
            
        for(let j=0; j < investigationArr.length; j++)
          
          { investMakerD=investigationArr[j].dropdownName;
            investCodeCVXD = investigationArr[j].code;
            investCodeTextD =  investigationArr[j].codeText;}

             ObservationCriteria = document.getElementById('ObservationCriteriaID' + data[c].rowID).value;
             Date_VIS_Published = document.getElementById('Date_VIS_Published_Id' + data[c].rowID).value ? document.getElementById('Date_VIS_Published_Id' + data[c].rowID).value: '';
             ObservationCriteriaValueRow = ''
          Date_VIS_Presented = document.getElementById('Date_VIS_PresentedId' + data[c].rowID).value ? document.getElementById('Date_VIS_PresentedId' + data[c].rowID).value : '';
          investDropDown = investMakerD;
         investCodeName = investCodeCVXD;
         investCodeTextF = investCodeTextD;
          
        }      
        if(getresponse[b].moduleId === 'SNOMED-CTCodeId'+observationRow[c].rowID)
        {
          const investigationArr = getresponse[b].data;
        for(let j=0; j < investigationArr.length; j++)
        { investMakerD=investigationArr[j].dropdownName;
          investCodeCVXD = investigationArr[j].code;
          investCodeTextD =  investigationArr[j].codeText;}
           ObservationCriteria = document.getElementById('ObservationCriteriaID' + data[c].rowID).value;
           investDropDown = investMakerD;
           ObservationCriteriaValueRow = '';
         investCodeName = investCodeCVXD;
         investCodeTextF = investCodeTextD;
         Date_VIS_Published = null;
         Date_VIS_Presented = null;                  
        } 
        if(getresponse[b].moduleId === 'ObservationCriteriaValueID'+observationRow[c].rowID)
        {
         
           ObservationCriteria = document.getElementById('ObservationCriteriaValueID' + data[c].rowID).value;
             ObservationCriteriaValueRowId = document.getElementById('ObservationCriteriaValueID' + data[c].rowID);
             ObservationCriteriaValueRow = ObservationCriteriaValueRowId ? ObservationCriteriaValueRowId.value : '';
           investDropDown = '';
         investCodeName = '';
         investCodeTextF = '';
         Date_VIS_Published = null;
         Date_VIS_Presented = null;                  
        }  
      }
      tempArrList.push({
        imo_criteria : ObservationCriteria,
        imo_criteria_value : ObservationCriteriaValueRow ?ObservationCriteriaValueRow : '',
        imo_vis_date_published : Date_VIS_Published ? Date_VIS_Published : 'Date Not Given',
        imo_vis_date_presented : Date_VIS_Presented ? Date_VIS_Presented : 'date not given',
        imo_codetype : investDropDown ?investDropDown: 'not available',
        imo_code : investCodeName?investCodeName : 'not available',
        imo_codetext : investCodeTextF ?investCodeTextF : 'Description not available' ,
      })
      
    }
       if(!investConCat)
       {
        alert('Please select Immunization Code.');
        return;
       }
       else{
        const finalObjInvestAndReason = {
          uhid:'UHID00143',
          clientId: 176,
          userId : 12,
          cvxCode : investConCat,
          reasonCode: investConCatReason,
          administeredDate : sendForm.DatenTimeAdministered,
          amountAdministeredUnit : sendForm.AmountAdministeredUnit,
          amountAdministered : sendForm.AmountAdministered,
          expirationDate : sendForm.ExpirationDate,
          visDate : sendForm.DateofVISStatement,
          manufacturer : sendForm.ImmunizationManufacturer,
          lotNumber : sendForm.ImmunizationLotNumber,
          dateImmunizationInformationStatementsGiven : sendForm.ImmunizationStatements,
          administeredById : sendForm.IDofImmunizationAdministrator.split(':')[0],
          administeredBy : sendForm.IDofImmunizationAdministrator.split(':')[1],
          route : sendForm.Route,
          administrationSite : sendForm.AdministrationSite,
          informationSource : sendForm.InformationSource,
          completionStatus: sendForm.CompletionStatus,
          refusalReason : sendForm.SubstanceRefusalReason,
          orderingProvider : sendForm.ImmunizationOrderingProvider,
          note: sendForm.Notes,
          jsonObservationCriteriaDetails : JSON.stringify(tempArrList)
  
         }
         
         const saveObj = await PostFHIRImmunization(finalObjInvestAndReason);
         if(saveObj.status === 1)
         {
          alert('Data saved of Immunization');
          funGetAllImmunizationData();
         }
        else
         {
          alert('Data Not saved')
         }
       }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////// Delete the specific row from the immunization list on page ///////////////////////////////
  const deleteImmunizationListData = async (rowId) => {
    const deleteRowRes = await DeleteImmunizationByRowId(rowId);
    if(deleteRowRes.status === 1){
      funGetAllImmunizationData();
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleClear = () => {
    document.getElementById('immunizationCode').value = '';
    document.getElementById('ReasonId').value = '';
    sendForm.DatenTimeAdministered = ''; sendForm.AmountAdministeredUnit = 0; sendForm.AmountAdministered = ''; sendForm.ExpirationDate =''; sendForm.ImmunizationManufacturer = 0;
    sendForm.ImmunizationLotNumber = 0; sendForm.ImmunizationStatements = ''; sendForm.DateofVISStatement = '';sendForm.Route = 0; sendForm.AdministrationSite = 0; sendForm.InformationSource = 0;
    sendForm.CompletionStatus = 0; sendForm.SubstanceRefusalReason = 0; sendForm.ImmunizationOrderingProvider = 0; sendForm.Notes = ''
    // document.getElementById('dateId').value = '';
    // document.getElementById('amountId').value = '';
    // document.getElementById('amountUnitID').value = 0;
    setMakeData([])
  }
  

  useEffect(() => {  
    funToGetDropDownLists();
    funGetAllImmunizationData();
  },[])
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className='container-fluid'>
          <div className="row">
            <div className='col-12'>
              <div className='med-box'>
                <div className='inner-content'>
                  <div className="row">
                    <div className='fieldsett-in col-md-12'>
                      <div className='fieldsett'>
                        <div className='fieldse'>
                        <span className='fieldse'>Immunization</span>
                        <div className="row">
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Code" className="form-label">Immunization (CVX Code)<span className="starMandatory">*</span></label>
                            <input  id="immunizationCode" type="text" className="form-control form-control-sm" name="immunizationCode" placeholder= "Enter Code" onClick={()=> {handleOpenModal('immunizationCode')}} />
                            <small id="errImmunizationCode" className="form-text text-danger" style={{ display: 'none' }}></small>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="DateTime" className="form-label">Date & Time Administered</label>
                            <input  id="dateId" type="date" className="form-control form-control-sm" name="DatenTimeAdministered" value={sendForm.DatenTimeAdministered} onChange={handleChange} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Amount" className="form-label">Amount Administered</label>
                            <input  id="amountId" type="text" className="form-control form-control-sm" name="AmountAdministered" value={sendForm.AmountAdministered} onChange={handleChange} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Amount" className="form-label">Amount Administered Unit</label>
                            <select name="AmountAdministeredUnit" className='form-select form-select-sm' id="amountUnitID" value={sendForm.AmountAdministeredUnit} onChange={handleChange} >
                              <option value="0">mm/gg</option>
                              <option value="1">mm/CC</option>
                              <option value="2">mm</option>
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="DateTime" className="form-label">Immunization Expiration Date</label>
                            <input  id="expireDateId" type="date" className="form-control form-control-sm" name="ExpirationDate" value={sendForm.ExpirationDate} onChange={handleChange} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Manufacturer" className="form-label">Immunization Manufacturer</label>
                            <select name="ImmunizationManufacturer" className='form-select form-select-sm' id="ManufacturerID" value={sendForm.ImmunizationManufacturer} onChange={handleChange}>
                              <option value="0">--Select Manufacturer--</option>
                              {getImmunizationManufacture && getImmunizationManufacture.map((list, ind) => {
                                return(<option value={list.id}>{list.name}</option>)
                                
                              })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>  
                            <label htmlFor="LotNumber" className="form-label">Immunization Lot Number</label>
                            <select name="ImmunizationLotNumber" className='form-select form-select-sm' id="LotNumberID" value={sendForm.ImmunizationLotNumber} onChange={handleChange}>
                              <option value="0">1</option>
                              <option value="1">2</option>
                              <option value="2">3</option>
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="DateTime" className="form-label">Date Immunization Information Statements Given</label>
                            <input  id="ImmunizationDateId" type="date" className="form-control form-control-sm" name="ImmunizationStatements" value={sendForm.ImmunizationStatements} onChange={handleChange}/>  
                          </div>
                          {/* <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Immunization" className="form-label">Name and Title of Immunization Administrator</label>
                            <input  id="ImmunizationAdministratorId" type="text" className="form-control form-control-sm" name="NameAndTitleofImmunizationAdministrator" value={sendForm.NameAndTitleofImmunizationAdministrator} onChange={handleChange} />  
                          </div> */}
                          {/* <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 text-center'>
                            <label htmlFor="Immunization" className="form-label"><b>or choose</b></label>
                            <input  id="ImmunizationAdministratorId" type="text" className="form-control form-control-sm" name="ImmunizationAdministratorName" onChange={''} />  
                          </div> */}
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="LotNumber" className="form-label">Name and Title of Immunization Administrator</label>
                            <select name="IDofImmunizationAdministrator" className='form-select form-select-sm' id="AdministratorID" value={sendForm.IDofImmunizationAdministrator} onChange={handleChange}>
                              <option value="0">--Select Administrator--</option>
                              {getImmunizationAdministrator && getImmunizationAdministrator.map((adminList, adminInd) =>{
                                
                                return(<option value={adminList.id + ':' + adminList.title}>{adminList.title}</option>)
                                
                              })}
                              
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="VISDateTime" className="form-label">Date of VIS Statement (?)</label>
                            <input  id="VISId" type="date" className="form-control form-control-sm" name="DateofVISStatement" value={sendForm.DateofVISStatement} onChange={handleChange} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Route" className="form-label">Route</label>
                            <select name="Route" className='form-select form-select-sm' id="RouteID" value={sendForm.Route} onChange={handleChange}>
                              <option value="0">--Select Route--</option>
                                {getImmunizationRoute && getImmunizationRoute.map((routeList, routeInd) => {
                                  return(<option value={routeList.id}>{routeList.name}</option>)
                                })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Administration" className="form-label">Administration Site</label>
                            <select name="AdministrationSite" className='form-select form-select-sm' id="AdministrationID" value={sendForm.AdministrationSite} onChange={handleChange}>
                              <option value="0">--Select Site--</option>
                              {getImmunizationAdministrationSite && getImmunizationAdministrationSite.map((siteList, siteInd) => {
                                return(<option value={siteList.id}>{siteList.name}</option>)
                              })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Information" className="form-label">Information Source</label>
                            <select name="InformationSource" className='form-select form-select-sm' id="InformationID" value={sendForm.InformationSource} onChange={handleChange}>
                              <option value="0">1</option>
                              <option value="1">2</option>
                              <option value="2">3</option>
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Completion" className="form-label">Completion Status</label>
                            <select name="CompletionStatus" className='form-select form-select-sm' id="CompletionID" value={sendForm.CompletionStatus} onChange={handleChange}>
                              <option value="0">--Select Status--</option>
                              {getImmunizationCompletionStatus && getImmunizationCompletionStatus.map((statusList, statusInd) => {
                                return(<option value={statusList.id}>{statusList.title}</option>)
                              })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Substance" className="form-label">Substance Refusal Reason</label>
                            <select name="SubstanceRefusalReason" className='form-select form-select-sm' id="SubstanceID" value={sendForm.SubstanceRefusalReason} onChange={handleChange}>
                              <option value="0">--Select Refusal--</option>
                              {getImmunizationSubstancerefusalReason && getImmunizationSubstancerefusalReason.map((reasonList, reasonInd) => {
                                return(<option value={reasonList.id}>{reasonList.title}</option>)
                              })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Reason" className="form-label">Reason Code</label>
                            <input  id="ReasonId" type="text" className="form-control form-control-sm" name="ReasonName" onClick={()=> {handleOpenModal('ReasonId')}} /> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="ImmunizationOrdering" className="form-label">Immunization Ordering Provider</label>
                            <select name="ImmunizationOrderingProvider" className='form-select form-select-sm' id="ImmunizationOrderingID" value={sendForm.ImmunizationOrderingProvider} onChange={handleChange}>
                              <option value="0">1</option>
                              <option value="1">2</option>
                              <option value="3">3</option>
                            </select> 
                          </div>
                          <div className='col-xxl-12 col-xl-12 col-lg-12 col-md-12 mb-3'>
                            <label htmlFor="Notes" className="form-label">Notes</label>
                            <textarea  id="NotesId" type="text" className="form-control form-control-sm" name="Notes" value={sendForm.Notes} onChange={handleChange} /> 
                          </div>
                          
                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mb-1 mt-2 text-center">
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funToShowObservation}>Show Observation</button>
                            </div>
                            
                            {showObservation && <>
                              <div className='col-12 mt-1'>
                              <div className='fieldsett fieldse '>
                                <span className='fieldse'>Observation Results</span>
                                {observationRow && observationRow.map((observeList, ind) => {
                                  const isLastRow = ind === observationRow.length - 1; // Check if it's the last row
                                  return(
                                    <div className="row">
                                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                  <label htmlFor="ObservationCriteria" className="form-label">Observation Criteria</label>
                                  <select name=""  className='form-select form-select-sm'  value={selectedValues[observeList.rowID]}  id={"ObservationCriteriaID" + observeList.rowID}
                                    onChange={(event) => handleSelectChange(event, observeList.rowID)}>
                                    <option value="1">Unassigned</option>
                                    <option value="2">Vaccine funding program eligibility criteria</option>
                                    <option value="3">Vaccine Type</option>
                                    <option value="4">Disease with presumed immunity</option>
                                  </select> 
                                </div>
                                
                                {selectedValues[observeList.rowID] === '2' && (
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                  <label htmlFor="ObservationCriteriaValue" className="form-label">Observation Criteria Value</label>
                                  <select name="" className='form-select form-select-sm' id={"ObservationCriteriaValueID" + observeList.rowID} onChange={()=>{handleCriteriaValue("ObservationCriteriaValueID" + observeList.rowID)}}>
                                    <option value="0">--Select Criteria--</option>
                                    {getImmunizationObservationCriteria && getImmunizationObservationCriteria.map((criteriaList, criteriaInd) => {
                                      return(<option value={criteriaList.id}>{criteriaList.title}</option>)
                                    })}
                                  </select>
                                  </div>
                                )}
                                
                                {selectedValues[observeList.rowID] === '3' && (
                                  <>
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                    <label htmlFor="CVX_Code" className="form-label">CVX Code</label>
                                    <input  id={"CVX_CodeId" + observeList.rowID} type="text" className="form-control form-control-sm" name="CVX_CodeName" onClick={()=> {handleOpenModalCVX('CVX_CodeId'+observeList.rowID)}} />  
                                  </div>
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                    <label htmlFor="Date_VIS_Published" className="form-label">Date VIS Published</label>
                                    <input  id={"Date_VIS_Published_Id" + observeList.rowID} type="date" className="form-control form-control-sm" name="Date_VIS_Published_Name"  />  
                                  </div>
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                    <label htmlFor="Date_VIS_Presented" className="form-label">Date VIS Presented</label>
                                    <input  id={"Date_VIS_PresentedId" + observeList.rowID} type="date" className="form-control form-control-sm" name="Date_VIS_PresentedName"  />  
                                  </div>
                                  </>
                                )}
                                
                                {selectedValues[observeList.rowID] === '4' && (
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                    <label htmlFor="SNOMED-CT_Code" className="form-label">SNOMED-CT Code</label>
                                    <input  id={"SNOMED-CTCodeId"+observeList.rowID} type="text" className="form-control form-control-sm" name="SNOMED-CTCodeName" onClick={()=> {handleOpenModalSnow("SNOMED-CTCodeId"+observeList.rowID)}} />  
                                  </div>
                                  )}
                                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                  <div className="row align-items-center p-2">
                                    <label htmlFor="ObservationCriteria" className="form-label"></label>

                                    <div className="d-flex">
                                      {isLastRow && ( // Conditionally render the buttons only for the last row
                                        <>
                                          <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => {handleAddCarePlanRow(observeList.rowID); }}>
                                            <img src={plus} className='icnn' alt='' /> Add
                                          </button>

                                        </>
                                      )}
                                          <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={() => { handleDeleteObservationRow(ind, observeList.rowID) }}>
                                            <img src={deleteIcon} className='icnn' alt='' /> Delete
                                          </button>
                                    </div>
                                  </div>
                                </div>

                                </div>
                                  )
                                })}
                               
                              </div>
                              </div>
                            </>}

                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-6 mb-1 text-right ">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          
                              <div>
                                
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveButtonIcon} className='icnn' alt="" />Save</button>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}><img src={printIcon} className='icnn' alt="" />Print Record (PDF)</button>
                               
                                  <>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 " >Print Record (HTML)</button>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleClear} >Clear</button>
                                  </>
                                
                              </div>
                          
                        </div>
                          

                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ################################## Table that binds ######################################## */}

            <div className='col-12 mt-2'>
              <div className='med-table-section' style={{ "height": "80vh" }}>
                <table className='med-table border_ striped'>
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                    <th className="text-center" style={{ "width": "5%" }}>#</th>
                    <th>Vaccine</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Expiration</th>
                    <th>Manufacturer</th>
                    <th>Lot Number</th>
                    <th>Administered By</th>
                    <th>Education Date</th>
                    <th>Route</th>
                    <th>Administered Site</th>
                    <th>Notes</th>
                    <th>Completion Status</th>
                    <th>Error</th>
                    <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {getAllImmunizationDataList && getAllImmunizationDataList.map((immunizationList, ind) => {
                    return(
                      <>
                      <tr key={immunizationList.id}>
                      <td className="text-center" style={{ "width": "5%" }}>{ind + 1}</td>
                        <td>{immunizationList.cvx_code}</td>
                        <td>{immunizationList.administered_date}</td>
                        <td>{immunizationList.amount_administered}</td>
                        <td>{immunizationList.expiration_date}</td>
                        <td>{immunizationList.manufacturerName}</td>
                        <td>{immunizationList.lot_number}</td>
                        <td>{immunizationList.administered_by}</td>
                        <td>{immunizationList.education_date}</td>
                        <td>{immunizationList.route}</td>
                        <td>{immunizationList.administration_site}</td>
                        <td>{immunizationList.note}</td>
                        <td>{immunizationList.completionTitle}</td>
                        <td>{immunizationList.completion_status}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={() => {deleteImmunizationListData(immunizationList.id)}}>
                            <img src={deleteIcon} className='icnn' alt='' /> Delete
                          </button>
                        </td>
                      </tr>
                    </>
                    )
                  })}
                    {/* <td className="text-center" style={{ "width": "5%" }}>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>
                      <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" >
                        <img src={deleteIcon} className='icnn' alt='' /> Delete
                      </button>
                    </td> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------ Code Master popUp Start------------------------------------ */}
      {isShowPopUp === 1 ?

        <div className={`modal d-${isShowPopUp === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static" >
          <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
            <div className="modal-content" >
              {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>


              {/* <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={true} /> */}
              {PopUpId === 'immunizationCode' ? <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={false}/> : 
              PopUpId === 'ReasonId' ? <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedDataReason} defaultData={makeData} modalID={PopUpId} isMultiple={false}/> :''}
            </div>
          </div>
        </div>
: ''}
{/* ------------------------------------------ Code Master popUp End------------------------------------ */}

        {/* ------------------------------------------ Code Master CV  Start------------------------------------ */}
        {isShowPopUpCvx === 1 ? (
          
          <div className={`modal d-${isShowPopUpCvx === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static">
            <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
              <div className="modal-content">
                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window" onClick={handleCloseModalCVX}>
                  <i className="bi bi-x-octagon"></i>
                </button>
                {observationRow && observationRow.map((observelist, observeInd) => (
                  PopUpId === 'CVX_CodeId' + observelist.rowID ?
                    <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedDataCVX} defaultData={makeData} modalID={PopUpId} isMultiple={false}/>
                   : ''
                ))}
              </div>
            </div>
          </div>
        ) : ''}

{/* ------------------------------------------ Code Master popUp End------------------------------------ */}
        
        {/* ------------------------------------------ Code Master CV  Start------------------------------------ */}
        {isShowPopUpSnow === 1 ? (
          
          <div className={`modal d-${isShowPopUpSnow === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static">
            <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
              <div className="modal-content">
                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window" onClick={handleCloseModalSnow}>
                  <i className="bi bi-x-octagon"></i>
                </button>
                {observationRow && observationRow.map((observelist, observeInd) => (
                  PopUpId === 'SNOMED-CTCodeId' + observelist.rowID ?
                    <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedDataSnow} defaultData={makeData} modalID={PopUpId} isMultiple={false}/>
                   : ''
                ))}
              </div>
            </div>
          </div>
        ) : ''}

{/* ------------------------------------------ Code Master popUp End------------------------------------ */}
      </section>
    </>
  )
}