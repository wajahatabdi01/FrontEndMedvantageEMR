import React, { useState } from 'react'
import plus from '../../assets/images/icons/icons8-plus-30.png';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg'
import printIcon from '../../assets/images/icons/icons8-print-26.png'
import FHIRImmunizationCodeMaster from '../Components/FHIRImmunizationCodeMaster';

export default function FHIRImmunization() {

  const [showObservation, setShowObservation] = useState(false);
  const [isShowPopUp, setIsShowPopUp] = useState(0);


  const customStyle = { marginLeft: '0px' };
  const funToShowObservation = () => {
    setShowObservation(!showObservation)
  }

  const handleOpenModal = (modalID) => {
    console.log('modal open')
    setIsShowPopUp(1);
    //setPopUpId(modalID);
  }

  const handleCloseModal = () => {
    setIsShowPopUp(0);
    // setPopUpId('');
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
                            <input  id="immunizationCode" type="text" className="form-control form-control-sm" name="immunizationCode" placeholder= "Enter Code" onClick={handleOpenModal} />
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
                            <input  id="ReasonId" type="text" className="form-control form-control-sm" name="ReasonName" onChange={''} /> 
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
                                <div className="row">
                                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                  <label htmlFor="ObservationCriteria" className="form-label">Observation Criteria</label>
                                  <select name="" className='form-select form-select-sm' id="ObservationCriteriaID">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                  </select> 
                                </div>
                                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                                <label htmlFor="ObservationCriteria" className="form-label"></label>
                                  <div>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}><img src={plus} className='icnn' alt='' />Add</button>
                                  </div>
                                  
                                </div>
                                </div>
                               
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
              <FHIRImmunizationCodeMaster style={customStyle} />
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
