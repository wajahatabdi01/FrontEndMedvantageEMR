import React, { useEffect, useState } from 'react'
import Heading from '../../../../Component/Heading'

const VisitDetails = ({ visitDetailsData }) => {
    const [visitDetails, setVisitDetails] = useState({
        classId: '0',
        typeId: '0',
        sensitivityId: '0',
        encounterProviderId: '0',
        dischargeDispositionId: '0',
        reasonforVisit: '',
        encounterJsonString: '[]',
    });
    const handleVisitDetailsChange = (e) => {
        const { name, value } = e.target;
        setVisitDetails((prevVisitDetails) => ({
            ...prevVisitDetails,
            [name]: value,
        }));
    };

    useEffect(() => {
        visitDetailsData(visitDetails);
    }, [visitDetails, visitDetailsData]);

    return (
        <>
            <div className="dflex">
                <div className="col-md-2 mb-2">
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Class</label><sup style={{ color: "red" }}>*</sup>
                    <div className='d-flex gap-3' >
                        <select className="form-select form-select-sm" id="ddlSEStateTertiary" aria-label=".form-select-sm example" name='classId' onChange={handleVisitDetailsChange}>
                            <option value="0" selected>Select Class</option>
                            <option value="1">Outpatient</option>
                            <option value="2">Emergency Dept</option>
                            <option value="3">Out in Field</option>
                            <option value="4">Home Health</option>
                        </select>
                    </div>
                    <small id="errClass" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-md-2 mb-2">
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Type</label><sup style={{ color: "red" }}>*</sup>
                    <div className='d-flex gap-3' >
                        <select className="form-select form-select-sm" id="ddlSEStateTertiary" aria-label=".form-select-sm example" name='typeId' value={visitDetails.typeId} onChange={handleVisitDetailsChange}>
                            <option value="0" selected>Select Type</option>
                            <option value="1">Visit out of hours</option>
                            <option value="2">Weekend Visit</option>
                            <option value="3">Out of Hours visit (Not Night)</option>
                            <option value="4">New Patient - 15-29 Minutes</option>
                        </select>
                    </div>
                    <small id="errType" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-md-2 mb-2">
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Sensitivity</label><sup style={{ color: "red" }}>*</sup>
                    <div className='d-flex gap-3' >
                        <select className="form-select form-select-sm" id="ddlSEStateTertiary" aria-label=".form-select-sm example" name='sensitivityId' onChange={handleVisitDetailsChange}>
                            <option value="0" selected>Select Sensitivity</option>
                            <option value="1">Normal</option>
                            <option value="2">High</option>
                            <option value="3">None</option>
                        </select>
                    </div>
                    <small id="errSensitivity" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-md-2 mb-2">
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Encounter Provider</label><sup style={{ color: "red" }}>*</sup>
                    <div className='d-flex gap-3' >
                        <select className="form-select form-select-sm" id="ddlSEStateTertiary" aria-label=".form-select-sm example" name='encounterProviderId' onChange={handleVisitDetailsChange}>
                            <option value="0" selected>Se

                                lect Encounter Provider</option>
                            <option value="1">Administator</option>
                            <option value="2">Provider External</option>
                        </select>
                    </div>
                    <small id="errEncounter" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-md-2 mb-2">
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Discharge Disposition</label><sup style={{ color: "red" }}>*</sup>
                    <div className='d-flex gap-3' >
                        <select className="form-select form-select-sm" id="ddlSEStateTertiary" aria-label=".form-select-sm example" name='dischargeDispositionId' onChange={handleVisitDetailsChange}>
                            <option value="0" selected>Select Discharge Disposition</option>
                            <option value="1">Home</option>
                            <option value="2">Discharge to home for hospice care</option>
                            <option value="3">Alternative Home</option>
                            <option value="4">Other healthcare facility</option>
                            <option value="5">Expired</option>
                        </select>
                    </div>
                    <small id="errDischarge" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
            </div>

            <div className='col-md-12 mt-2'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Heading text="Reason for Visit" />
                        <textarea className='form-control' id="w3review" rows="3" cols="40" name="reasonforVisit" onChange={handleVisitDetailsChange}></textarea>
                    </div>
                    <div className='col-md-4'>
                        <Heading text="Link/Add Issues to This Visit" />
                        <select className='form-control' multiple>
                            <option>Text1</option>
                            <option>Text1</option>
                            <option>Text1</option>
                            <option>Text1</option>
                            <option>Text1</option>
                            <option>Text1</option>
                        </select>
                    </div>
                    <div className='col-md-2 addvisitbtn_ mt-5'>
                        <button type="button" class="btn btn-save btn-save-fill btn-sm" id="addPriviousNames" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-plus"></i> Add</button>
                    </div>

                </div>
            </div>
            {/* --------------------------Modal Popup---------------------------- */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content ">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 text-white " id="staticBackdropLabel">Issue</h1>
                            <button type="button" class="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div class="modal-body">
                            <div className='orders-navtabs'>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#problem" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Problem</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#allergy" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Allergy  </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#medication" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Medication</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#device" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Device</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#surgery  " type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Surgery</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#dental " type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Dental</button>
                                </li>
                            </ul>
                            </div>
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="problem" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                    <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">

                                                <div>
                                                    <select className='form-control' style={{ height: '8em' }} multiple>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                                        </div>

                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder="Enter title" name='guardianAddress' />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div>
                                                    <select className='form-control' style={{ height: '8em' }} multiple>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                        <option>Text1</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm">Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>
                                                        <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="w3review" name="w3review" rows="3" cols="40" style={{ height: '121px' }}></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* --------------------------Allergy Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="allergy" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                    <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-9 mb-2">
                                                <div className='issue-text'>
                                                    <div>
                                                        <ul>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span>(Select one of these, or type your own title)</span>
                                        <div className='problemhead-inn'>
                                            <div className="col-6 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder="Enter title" name='guardianAddress' />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-9 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div className='issue-text'>
                                                    <div>
                                                        <ul>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm">Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>(leave blank if still active)</div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="w3review" name="w3review" rows="3" cols="40" style={{ height: '121px' }}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* --------------------------Medication Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="medication" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                    <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-9 mb-2">
                                                <div className='issue-text'>
                                                    <div>
                                                        <ul>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span>(Select one of these, or type your own title)</span>
                                        <div className='problemhead-inn'>
                                            <div className="col-6 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder="Enter title" name='guardianAddress' />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-9 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div className='issue-text'>
                                                    <div>
                                                        <ul>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm">Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>(leave blank if still active)</div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="w3review" name="w3review" rows="3" cols="40" style={{ height: '121px' }}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* --------------------------Device Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="device" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                    <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-6 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder="Enter title" name='guardianAddress' />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-9 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div className='issue-text'>
                                                    <div>
                                                        <ul>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm">Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>(leave blank if still active)</div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="w3review" name="w3review" rows="3" cols="40" style={{ height: '121px' }}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* --------------------------Surgery Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="surgery" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                    <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-9 mb-2">
                                                <div className='issue-text'>
                                                    <div>
                                                        <ul>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span>(Select one of these, or type your own title)</span>
                                        <div className='problemhead-inn'>
                                            <div className="col-6 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder="Enter title" name='guardianAddress' />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-9 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div className='issue-text'>
                                                    <div>
                                                        <ul>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm">Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>(leave blank if still active)</div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="w3review" name="w3review" rows="3" cols="40" style={{ height: '121px' }}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* --------------------------Dental Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="dental" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                    <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-9 mb-2">
                                                <div className='issue-text'>
                                                    <div>
                                                        <ul>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span>(Select one of these, or type your own title)</span>
                                        <div className='problemhead-inn'>
                                            <div className="col-6 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder="Enter title" name='guardianAddress' />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-9 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div className='issue-text'>
                                                    <div>
                                                        <ul>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                            <li>Text1</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm">Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>(leave blank if still active)</div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="w3review" name="w3review" rows="3" cols="40" style={{ height: '121px' }}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label><sup style={{ color: "red" }}>*</sup>
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="ddlRelationshipTertiary" aria-label=".form-select-sm example" name='relationshipId' >
                                                            <option value="1" selected>Unassigned</option>
                                                            <option value="2">Mother</option>
                                                            <option value="3">Father</option>
                                                            <option value="4">Brother</option>
                                                            <option value="5">Sister</option>
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" name='guardianAddress' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                <button type="button" class="btn btn-save btn-save-fill btn-lg"><i class="bi bi-check-lg"></i> Save</button>
                                <button type="button" class="btn btn-secondary btn-secondry btn-lg" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i> Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VisitDetails;
