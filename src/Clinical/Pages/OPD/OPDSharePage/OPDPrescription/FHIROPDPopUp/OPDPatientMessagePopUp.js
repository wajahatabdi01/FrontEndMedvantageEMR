import React from 'react'
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
function OPDPatientMessagePopUp() {
    return (
        <>
            <div className='problemhead' style={{height:'49vh',overflowY:'auto'}}>
                <label htmlFor="ddlRelationshipTertiary" className="form-label" style={{ color: '#1d4999' }}>Add New Message</label>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-6 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Type</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={"handleIssueDetailsChange"} >
                                    <option value="0" selected>Select</option>
                                    <option value="1" >Unassigned</option>
                                    <option value="2" >Chart Note</option>
                                    <option value="3" >Insurance</option>
                                    <option value="4" >New Document</option>
                                    <option value="5" >Pharmacy</option>
                                    <option value="6" >Prior Auth</option>
                                    <option value="7" >Referral</option>
                                    <option value="8" >Test Scheduling</option>
                                    <option value="9" >Bill/Collect</option>
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-6 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>To</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={"handleIssueDetailsChange"} >
                                    <option value="0" selected>Select</option>
                                    <option value="1" >Unassigned</option>
                                    <option value="2" >Chart Note</option>
                                    <option value="3" >Insurance</option>
                                    <option value="4" >New Document</option>
                                    <option value="5" >Pharmacy</option>
                                    <option value="6" >Prior Auth</option>
                                    <option value="7" >Referral</option>
                                    <option value="8" >Test Scheduling</option>
                                    <option value="9" >Bill/Collect</option>
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} value={""} onChange={'handleIssueDetailsChange'}></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleSaveIssues"}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal" onClick={"handleClear"}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                </div>
            </div>
        </>
    )
}

export default OPDPatientMessagePopUp
