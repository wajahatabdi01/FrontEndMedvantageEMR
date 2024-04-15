import React, { useState } from 'react'
import clear from '../../../../../../assets/images/icons/clear.svg';
import IconEdit from '../../../../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../../../../assets/images/icons/IconDelete.svg'
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import { t } from 'i18next';

function FHIRVitals() {
    let [updatebool, setUpdatebool] = useState(0);
    const [showDivs, setShowDivs] = useState({
        weight: false,
        height: false,
        BPSystolic: false,
        BPDiastolic: false,
        Pulse: false,
        Respiration: false,
        Temperature: false,
        TemperatureLocation: false,
        OxygenSaturation: false,
        OxygenFlowRate: false,
        InhaledOxygenConcentration: false,
        HeadCircumference: false,
        WaistCircumference: false,
        BMI: false,
        BMIStatus: false,
        BMI: false,
    });

    const handleAddDiv = (section) => {
        setShowDivs(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="med-box scrollcustum">
                        <div className="inner-content">
                            <div className="row">
                                {/* -----------------------------------------Weight----------------------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Weight</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('weight')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.weight && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* -----------------------------------------------------------Height--------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Height/Length</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('height')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.height && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* -----------------------------------------------------------BP Systolic--------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BP Systolic</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('BPSystolic')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.BPSystolic && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* -----------------------------------------------------------BP Diastolic--------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BP Diastolic</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('BPDiastolic')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.BPDiastolic && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Pulse --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Pulse</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('Pulse')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.Pulse && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Respiration  --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Respiration </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('Respiration')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.Respiration && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Temperature   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Temperature  </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('Temperature')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.Temperature && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Temp Location   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Temp Location  </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('TemperatureLocation')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.TemperatureLocation && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Oxygen Saturation   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Oxygen Saturation</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('OxygenSaturation')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.OxygenSaturation && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Oxygen Flow Rate   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Oxygen Flow Rate</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('OxygenFlowRate')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.OxygenFlowRate && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Inhaled Oxygen Concentration   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Inhaled Oxygen Concentration</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('InhaledOxygenConcentration')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.InhaledOxygenConcentration && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Head Circumference   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Head Circumference</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('HeadCircumference')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.HeadCircumference && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Waist  Circumference   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Waist  Circumference</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('WaistCircumference')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.WaistCircumference && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- BMI --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BMI </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('BMI')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.BMI && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- BMI Status --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BMI Status </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Completed</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2 mt-2">
                                                        <label htmlFor="ddlEmpty" className="form-label"></label>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm addvitals" onClick={() => handleAddDiv('BMIStatus')}><i className="bi bi-plus-lg"></i> Add</button>
                                                    </div>
                                                    {showDivs.BMIStatus && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Other Notes --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Other Notes</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Results/Details</label>
                                                        <textarea id="instructionTextId" type="text" className="form-control form-control-sm" name="instructionText" onChange={"handleChange"} />
                                                        <small id="errInstruction" className="form-text text-danger" style={{ display: 'none' }}>Instructions cannot be empty.</small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                            {updatebool === 0 ?
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleSaveIssues"}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                                : <button type="button" className="btn btn-save btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleSaveUpdate"}>{t("UPDATE")}</button>
                            }
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleClear"}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                        </div>
                    </div>
                </div>

                {/* -------------------------Table----------------------------------------- */}
                {/* <div className="col-12 mt-2">
                            <div className="med-table-section" >
                                <table className="med-table border striped mt-3">
                                    <thead style={{ zIndex: "0" }}>
                                        <tr>
                                            <th className="text-center" style={{ width: "5%" }}>
                                                #
                                            </th>
                                            <th>Instruction</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {getClinicalInstructionList && getClinicalInstructionList.map((list, ind) => {
                                            return (
                                                <tr>
                                                    <td>{ind + 1}</td>
                                                    <td>{list.instruction}</td>

                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-title="Edit Row" title="Edit Row" onClick={() => { "handleUpdate"("list") }}><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-title="Delete Row" data-bs-target="#deleteModal" onClick={() => { "handleDelete"("list.id") }}><img src={IconDelete} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
            </div>
        </div>
    )
}

export default FHIRVitals
