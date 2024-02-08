import React from 'react';

import plus from '../../assets/images/icons/icons8-plus-30.png'

export default function FHIRAddPrescription() {
  return (
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
                        <span className='fieldse'>Prescription</span>
                        <div className="row">
                          <div className=" col-12 row ms-1">
                            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="Administration" className="form-label">Currently Active</label>
                              <input className="form-check-input" type="checkbox" id="currentlyActive" name="currentlyActive" /> 
                            </div>
                            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="E-Prescription?" className="form-label">E-Prescription?</label>
                              <input className="form-check-input" type="checkbox" id="ePrescription" name="ePrescription" /> 
                            </div>
                            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="Administration" className="form-label">Checked Drug Formulary?</label>
                              <input className="form-check-input" type="checkbox" id="checkedDrug" name="checkedDrug" /> 
                            </div>
                            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="Administration" className="form-label">Controlled Substance?</label>
                              <input className="form-check-input" type="checkbox" id="ControlledSubstance" name="ControlledSubstance" /> 
                            </div>
                          </div>
                          <div className=" col-12 row">
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Starting Date<span className="starMandatory">*</span></label>
                            <input  id="startingdate" type="date" className="form-control form-control-sm" name="startingdate" onClick={''} />
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Provider</label>
                            <input  id="providerID" type="text" className="form-control form-control-sm" name="providerID" placeholder= "Enter Provider" onClick={''} />
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>                          
                            <div><label htmlFor="checkedDrug" className="form-label">Drug</label> </div>
                            <div className="d-flex gap-3">
                              <div>
                                <div class="form-check">
                                  <label class="form-label" for="UseDefault">Use Default</label>
                                  <input class="form-check-input" type="radio" name="exampleRadios" id="UseDefault" value="option1" /> 
                              </div>
                              </div>

                              <div>
                                <div class="form-check">
                                  <label class="form-label" for="UseRxNorm">Use RxNorm</label>
                                  <input class="form-check-input" type="radio" name="exampleRadios" id="UseRxNorm" value="option1" /> 
                              </div>
                              </div>


                              <div>
                                <div class="form-check">
                                  <label class="form-label" for="UseRxCUI">Use RxCUI</label>
                                  <input class="form-check-input" type="radio" name="exampleRadios" id="UseRxCUI" value="option1" /> 
                              </div>
                              </div>

                            </div>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Drug Search</label>
                            <input  id="DrugSearchID" type="text" className="form-control form-control-sm" name="DrugSearchID" placeholder= "Enter Drug" onClick={''} />
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Quantity</label>
                            <input  id="QuantityID" type="text" className="form-control form-control-sm" name="QuantityName" placeholder= "Enter Quantity" onClick={''} />
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Medicine</label>
                            <input  id="medicineID" type="text" className="form-control form-control-sm" name="medicineName" placeholder= "Enter Medicine" onClick={''} />
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Medicine Unit</label>
                            <select name="medicineUnit" className='form-select form-select-sm' id="medicineUnitID"  onChange={''} >
                              <option value="0">mm/gg</option>
                              <option value="1">mm/CC</option>
                              <option value="2">mm</option>
                            </select>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <div className="d-flex gap-2">
                              <div>
                              <label htmlFor="Code" className="form-label">Refills</label>
                            <select name="RefillsUnit" className='form-select form-select-sm' id="RefillsID"  onChange={''} >
                              <option value="0">mm/gg</option>
                              <option value="1">mm/CC</option>
                              <option value="2">mm</option>
                            </select>
                              </div>
                              <div>
                                <label htmlFor="Code" className="form-label"># of tablets:</label>
                                <input  id="ofTabletsID" type="text" className="form-control form-control-sm" name="#oftabletsName" placeholder= "Enter Medicine" onClick={''} />
                              </div>
                            </div>
                          </div>
                          <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 mb-2 mt-2'>
                            <div className="row">
                              <div className="col">
                                <div className="d-flex gap-2">
                                  
                                  <div>
                                    <label htmlFor="Code" className="form-label">Directions</label>
                                    <input  id="DirectionsID" type="text" className="form-control form-control-sm" name="DirectionsName" placeholder= "Enter Directions" onClick={''} />
                                  </div>
                                  <div>
                                    <label htmlFor="Code" className="form-label">Type</label>
                                    <select name="Type" className='form-select form-select-sm' id="TypeID"  onChange={''} >
                                      <option value="0">mm/gg</option>
                                      <option value="1">mm/CC</option>
                                      <option value="2">mm</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="col">
                                <div className="d-flex gap-2">
                                  <div>
                                  <label htmlFor="Code" className="form-label">Area</label>
                                  <select name="AreaName" className='form-select form-select-sm' id="AreaID"  onChange={''} >
                                    <option value="0">mm/gg</option>
                                    <option value="1">mm/CC</option>
                                    <option value="2">mm</option>
                                  </select>
                                  </div>
                                  <div>
                                  <label htmlFor="Code" className="form-label">Frequency</label>
                                  <select name="FrequencyName" className='form-select form-select-sm' id="FrequencyID"  onChange={''} >
                                    <option value="0">mm/gg</option>
                                    <option value="1">mm/CC</option>
                                    <option value="2">mm</option>
                                  </select>
                                  </div>
                                </div>
                              </div>
                            </div>                          
                          </div>
                          
                          <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Notes" className="form-label">Notes</label>
                            <textarea  id="NotesId" type="text" className="form-control form-control-sm" name="Notes"  onChange={''} /> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>                          
                            <div><label htmlFor="checkedDrug" className="form-label">Add to Medication List</label> </div>
                            <div className="d-flex gap-3">
                              <div>
                                <div class="form-check">
                                  <label class="form-label" for="UseDefault">No</label>
                                  <input class="form-check-input" type="radio" name="exampleRadios" id="No" value="0" /> 
                              </div>
                              </div>
                              <div>
                                <div class="form-check">
                                  <label class="form-label" for="UseRxNorm">Yes</label>
                                  <input class="form-check-input" type="radio" name="exampleRadios" id="Yes" value="1" /> 
                              </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Reason</label>
                            <select name="ReasonName" className='form-select form-select-sm' id="ReasonNameID"  onChange={''} >
                              <option value="0">mm/gg</option>
                              <option value="1">mm/CC</option>
                              <option value="2">mm</option>
                            </select>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                            <div className="row align-items-center p-2">
                              <label htmlFor="ObservationCriteria" className="form-label"></label>
                              <div className="d-flex">
                              <label htmlFor="ObservationCriteria" className="form-label"></label>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}>
                                <img src={plus} className='icnn' alt='' /> Add
                              </button>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}>
                                <img src={plus} className='icnn' alt='' /> Add
                              </button>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}>
                                <img src={plus} className='icnn' alt='' /> Add
                              </button>
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
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
