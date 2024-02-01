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


export default function FHIRImmunization() {

  let [makeData, setMakeData] = useState([]);
  let [getData, setgetData] = useState([]);
  const [PopUpId, setPopUpId] = useState('');
  const [showObservation, setShowObservation] = useState(false);
  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [isShowPopUpCvxSnow, setIsShowPopUpCvxSnow] = useState(0);

  const [getImmunizationManufacture, setImmunizationManufacture] = useState([]);
  const [getImmunizationAdministrationSite, setImmunizationAdministrationSite] = useState([]);
  const [getImmunizationCompletionStatus, setImmunizationCompletionStatus] = useState([]);
  const [getImmunizationObservationCriteria, setImmunizationObservationCriteria] = useState([]);
  const [getImmunizationSubstancerefusalReason, setImmunizationSubstancerefusalReason] = useState([]);
  const [getImmunizationRoute, setImmunizationRoute] = useState([]);
  const [getImmunizationAdministrator, setImmunizationAdministrator] = useState([]);

  const [selectedValues, setSelectedValues] = useState({});


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

  const handleDeleteCarePlanRow = (index, key) => {
    let tempArr = [];
    const data = [...observationRow];
    if (data.length === 1) {
      return;
    }
    
    data.splice(index, 1);
    setObservationRow(data)
  }

  const funToShowObservation = () => {
    setShowObservation(!showObservation)
  }
 //////////////////////////////////////////// Opem modal for immunization an reason code ////////////////////////////////////////
  const handleOpenModal = (modalID) => {
    console.log('modal open')
    setIsShowPopUp(1);
    setPopUpId(modalID);
  }

  const handleCloseModal = () => {
    setIsShowPopUp(0);
     setPopUpId('');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////// Open and close modal for CVX and SNOW Code //////////////////////
    const handleOpenModalCVX = (modalId) => {
      console.log('modalIdddddddddddddd : ', modalId);
      setIsShowPopUpCvxSnow(1)
      setPopUpId(modalId);
    }

    const handleCloseModalCVX = () => {
      setIsShowPopUpCvxSnow(0);
      setPopUpId('');
    }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSelectChange = (event, rowID) => {
    const value = event.target.value;
  
    // Set the selected value in the state for the specific row
    setSelectedValues(prevValues => ({
      ...prevValues,
      [rowID]: value,
    }));
  };

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
    console.log('the modal ID CVX: ', modalID)

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
  const SelectedDataSNOW = (data, modalID) => {
    console.log('the modal ID SNOW: ', modalID)

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
    console.log('the modal ID SNOW: ', modalID)

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
    if(AdministrationSiteRes.status === 1) {
      setImmunizationAdministrator(AdministratorRes.responseValue);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  useEffect(() => {  
    funToGetDropDownLists();
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
                            <input  id="dateId" type="date" className="form-control form-control-sm" name="dateName" onChange={''} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Amount" className="form-label">Amount Administered</label>
                            <input  id="amountId" type="text" className="form-control form-control-sm" name="amountName" onChange={''} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Amount" className="form-label">Amount Administered Unit</label>
                            <select name="" className='form-select form-select-sm' id="amountUnitID">
                              <option value="0">mm/gg</option>
                              <option value="1">mm/CC</option>
                              <option value="2">mm</option>
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="DateTime" className="form-label">Immunization Expiration Date</label>
                            <input  id="expireDateId" type="date" className="form-control form-control-sm" name="expireDateName" onChange={''} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Manufacturer" className="form-label">Immunization Manufacturer</label>
                            <select name="" className='form-select form-select-sm' id="ManufacturerID">
                              <option value="0">--Select Manufacturer--</option>
                              {getImmunizationManufacture && getImmunizationManufacture.map((list, ind) => {
                                return(<option value={list.id}>{list.name}</option>)
                                
                              })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>  
                            <label htmlFor="LotNumber" className="form-label">Immunization Lot Number</label>
                            <select name="" className='form-select form-select-sm' id="LotNumberID">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="DateTime" className="form-label">Date Immunization Information Statements Given</label>
                            <input  id="ImmunizationDateId" type="date" className="form-control form-control-sm" name="ImmunizationDateName"  />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Immunization" className="form-label">Name and Title of Immunization Administrator</label>
                            <input  id="ImmunizationAdministratorId" type="text" className="form-control form-control-sm" name="ImmunizationAdministratorName" onChange={''} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 text-center'>
                            <label htmlFor="Immunization" className="form-label"><b>or choose</b></label>
                            {/* <input  id="ImmunizationAdministratorId" type="text" className="form-control form-control-sm" name="ImmunizationAdministratorName" onChange={''} />   */}
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="LotNumber" className="form-label"></label>
                            <select name="" className='form-select form-select-sm' id="AdministratorID">
                              <option value="0">--Select Administrator--</option>
                              {getImmunizationAdministrator && getImmunizationAdministrator.map((adminList, adminInd) =>{
                                return(<option value={adminList.id}>{adminList.name}</option>)
                                
                              })}
                              
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="VISDateTime" className="form-label">Date of VIS Statement (?)</label>
                            <input  id="VISId" type="date" className="form-control form-control-sm" name="VISName" onChange={''} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Route" className="form-label">Route</label>
                            <select name="" className='form-select form-select-sm' id="RouteID">
                              <option value="0">--Select Route--</option>
                                {getImmunizationRoute && getImmunizationRoute.map((routeList, routeInd) => {
                                  return(<option value={routeList.id}>{routeList.name}</option>)
                                })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Administration" className="form-label">Administration Site</label>
                            <select name="" className='form-select form-select-sm' id="AdministrationID">
                              <option value="0">--Select Site--</option>
                              {getImmunizationAdministrationSite && getImmunizationAdministrationSite.map((siteList, siteInd) => {
                                return(<option value={siteList.id}>{siteList.name}</option>)
                              })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Information" className="form-label">Information Source</label>
                            <select name="" className='form-select form-select-sm' id="InformationID">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Completion" className="form-label">Completion Status</label>
                            <select name="" className='form-select form-select-sm' id="CompletionID">
                              <option value="0">--Select Status--</option>
                              {getImmunizationCompletionStatus && getImmunizationCompletionStatus.map((statusList, statusInd) => {
                                return(<option value={statusList.id}>{statusList.name}</option>)
                              })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Substance" className="form-label">Substance Refusal Reason</label>
                            <select name="" className='form-select form-select-sm' id="SubstanceID">
                              <option value="0">--Select Refusal--</option>
                              {getImmunizationSubstancerefusalReason && getImmunizationSubstancerefusalReason.map((reasonList, reasonInd) => {
                                return(<option value={reasonList.id}>{reasonList.name}</option>)
                              })}
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Reason" className="form-label">Reason Code</label>
                            <input  id="ReasonId" type="text" className="form-control form-control-sm" name="ReasonName" onClick={()=> {handleOpenModal('ReasonId')}} /> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="ImmunizationOrdering" className="form-label">Immunization Ordering Provider</label>
                            <select name="" className='form-select form-select-sm' id="ImmunizationOrderingID">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select> 
                          </div>
                          <div className='col-xxl-12 col-xl-12 col-lg-12 col-md-12 mb-3'>
                            <label htmlFor="Notes" className="form-label">Notes</label>
                            <textarea  id="NotesId" type="text" className="form-control form-control-sm" name="Notes" onChange={''} /> 
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
                                  <select name="" className='form-select form-select-sm' id={"ObservationCriteriaValueID" + observeList.rowID}>
                                    <option value="0">--Select Criteria--</option>
                                    {getImmunizationObservationCriteria && getImmunizationObservationCriteria.map((criteriaList, criteriaInd) => {
                                      return(<option value={criteriaList.id}>{criteriaList.name}</option>)
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
                                    <input  id={"SNOMED-CTCodeId"+observeList.rowID} type="text" className="form-control form-control-sm" name="SNOMED-CTCodeName" onClick={()=> {handleOpenModal("SNOMED-CTCodeId"+observeList.rowID)}} />  
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
                                          <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={() => { handleDeleteCarePlanRow(ind, observeList.rowID) }}>
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
                                
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}><img src={saveButtonIcon} className='icnn' alt="" />Save</button>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}><img src={printIcon} className='icnn' alt="" />Print Record (PDF)</button>
                               
                                  <>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 " >Print Record (HTML)</button>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={''} >Clear</button>
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
                    </tr>
                  </thead>
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
              {PopUpId === 'immunizationCode' ? <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={true}/> : 
              PopUpId === 'ReasonId' ? <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedDataReason} defaultData={makeData} modalID={PopUpId} isMultiple={true}/> :''}
              
              
              {observationRow && observationRow.map((observelist, observeInd)=>{
                console.log('the observe list : ', observelist)
              })}
            </div>
          </div>
        </div>
: ''}
{/* ------------------------------------------ Code Master popUp End------------------------------------ */}
        {/* ------------------------------------------ Code Master CV and SNOW popUp Start------------------------------------ */}
        {isShowPopUpCvxSnow === 1 ? (
          
          <div className={`modal d-${isShowPopUpCvxSnow === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static">
            <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
              <div className="modal-content">
                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window" onClick={handleCloseModalCVX}>
                  <i className="bi bi-x-octagon"></i>
                </button>
                {observationRow && observationRow.map((observelist, observeInd) => (
                  PopUpId === 'CVX_CodeId' + observelist.rowID ?
                    <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedDataCVX} defaultData={makeData} modalID={PopUpId} isMultiple={true}/>
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
