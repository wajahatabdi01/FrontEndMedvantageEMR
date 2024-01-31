import React, { useState } from 'react'
import plus from '../../assets/images/icons/icons8-plus-30.png';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg'
import printIcon from '../../assets/images/icons/icons8-print-26.png'
import FHIRImmunizationCodeMaster from '../Components/FHIRImmunizationCodeMaster';

import deleteIcon from '../../assets/images/icons/icons8-delete-30.png'


export default function FHIRImmunization() {

  let [makeData, setMakeData] = useState([]);
  let [getData, setgetData] = useState([]);
  const [PopUpId, setPopUpId] = useState('');
  const [showObservation, setShowObservation] = useState(false);
  const [isShowPopUp, setIsShowPopUp] = useState(0);

  const [selectedValue, setSelectedValue] = useState('');

  const [getUnassignedField, setUnassignedField] = useState(false);
  const [getVaccineFundingField, setVaccineFundingField] = useState(false);
  const [getVaccineTypeField, setVaccineTypeField] = useState(false);
  const [getDiseaseField, setDiseaseField] = useState(false);

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

  const handleAddCarePlanRow = (param) => {
    
    let tempArr = [...observationRow];
    tempArr.push({
      rowID: param + 1,
    });
    
    setObservationRow(tempArr);
  }

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

  const handleOpenModal = (modalID) => {
    console.log('modal open')
    setIsShowPopUp(1);
    setPopUpId(modalID);
  }

  const handleCloseModal = () => {
    setIsShowPopUp(0);
     setPopUpId('');
  }

  const handleSelectChange = (event) => {
    const value = event.target.value;

    // Add your logic based on the selected value
    if (value === '1') {
      setDiseaseField(false);
      setUnassignedField(false);
      setVaccineFundingField(false);
      setVaccineTypeField(false);
    }
   else if (value === '2') {
      setDiseaseField(false);
      setUnassignedField(false);
      setVaccineFundingField(true);
      setVaccineTypeField(false);
    }
   else if (value === '3') {
      setDiseaseField(false);
      setUnassignedField(false);
      setVaccineFundingField(false);
      setVaccineTypeField(true);
    }
   else if (value === '4') {
      setDiseaseField(true);
      setUnassignedField(false);
      setVaccineFundingField(false);
      setVaccineTypeField(false);
    }

    // Set the selected value in the state
    setSelectedValue(value);
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
                              <option value="0">Abbott Labs</option>
                              <option value="1">Cipla Labs</option>
                              <option value="2">Ranbaxy</option>
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
                              <option value="1">Administrator</option>
                              
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="VISDateTime" className="form-label">Date of VIS Statement (?)</label>
                            <input  id="VISId" type="date" className="form-control form-control-sm" name="VISName" onChange={''} />  
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Route" className="form-label">Route</label>
                            <select name="" className='form-select form-select-sm' id="RouteID">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Administration" className="form-label">Administration Site</label>
                            <select name="" className='form-select form-select-sm' id="AdministrationID">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
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
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3'>
                            <label htmlFor="Substance" className="form-label">Substance Refusal Reason</label>
                            <select name="" className='form-select form-select-sm' id="SubstanceID">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
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
                                  <select name="" className='form-select form-select-sm' value={selectedValue} id={"ObservationCriteriaID"+observeList.rowID} onChange={handleSelectChange}>
                                    <option value="1">Unassigned</option>
                                    <option value="2">Vaccine funding program eligibility criteria</option>
                                    <option value="3">Vaccine Type</option>
                                    <option value="4">Disease with presumed immunity</option>
                                  </select> 
                                </div>
                                {getVaccineFundingField && <>
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                  <label htmlFor="ObservationCriteriaValue" className="form-label">Observation Criteria Value</label>
                                  <select name="" className='form-select form-select-sm' id={"ObservationCriteriaValueID" + observeList.rowID}>
                                    <option value="1">Not VFC eligible</option>
                                    <option value="2">Not VFC eligible</option>
                                    <option value="3">Not VFC eligible</option>
                                  </select> 
                                </div>
                                </>}
                                {getVaccineTypeField && <>
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                    <label htmlFor="CVX_Code" className="form-label">CVX Code</label>
                                    <input  id={"CVX_CodeId" + observeList.rowID} type="text" className="form-control form-control-sm" name="CVX_CodeName" onClick={()=> {handleOpenModal('CVX_CodeId'+observeList.rowID)}} />  
                                  </div>
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                    <label htmlFor="Date_VIS_Published" className="form-label">Date VIS Published</label>
                                    <input  id={"Date_VIS_Published_Id" + observeList.rowID} type="date" className="form-control form-control-sm" name="Date_VIS_Published_Name"  />  
                                  </div>
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                    <label htmlFor="Date_VIS_Presented" className="form-label">Date VIS Presented</label>
                                    <input  id={"Date_VIS_PresentedId" + observeList.rowID} type="date" className="form-control form-control-sm" name="Date_VIS_PresentedName"  />  
                                  </div>
                                </>}
                                {getDiseaseField && <>
                                  <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                    <label htmlFor="SNOMED-CT_Code" className="form-label">SNOMED-CT Code</label>
                                    <input  id={"SNOMED-CTCodeId"+observeList.rowID} type="text" className="form-control form-control-sm" name="SNOMED-CTCodeName" onClick={()=> {handleOpenModal("SNOMED-CTCodeId"+observeList.rowID)}} />  
                                  </div>
                                </>}
                                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                  <div className="row align-items-center p-2">
                                    <label htmlFor="ObservationCriteria" className="form-label"></label>

                                    <div className="d-flex">
                                      {isLastRow && ( // Conditionally render the buttons only for the last row
                                        <>
                                          <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => { handleAddCarePlanRow(observeList.rowID) }}>
                                            <img src={plus} className='icnn' alt='' /> Add
                                          </button>

                                          <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={() => { handleDeleteCarePlanRow(ind, observeList.rowID) }}>
                                            <img src={deleteIcon} className='icnn' alt='' /> Delete
                                          </button>
                                        </>
                                      )}
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
              PopUpId === 'CVX_CodeId' ? <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedDataCVX} defaultData={makeData} modalID={PopUpId} isMultiple={true}/> :
              PopUpId === 'SNOMED-CTCodeId' ? <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedDataSNOW} defaultData={makeData} modalID={PopUpId} isMultiple={true}/> : 
              PopUpId === 'ReasonId' ? <FHIRImmunizationCodeMaster style={customStyle} SelectedData={SelectedDataReason} defaultData={makeData} modalID={PopUpId} isMultiple={true}/> :''}
              
              
              {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
            </div>
          </div>
        </div>
: ''}
{/* ------------------------------------------ Code Master popUp End------------------------------------ */}
      </section>
    </>
  )
}
