import React from 'react'
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
function OPDRecordDisclosurePopUp() {
    return (
        <>
            <div className='problemhead'>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            {/* <label for="bedName" class="form-label relative">Date<span class="starMandatory">*</span></label> */}
                            <label for="bedName" class="form-label relative">Date</label>
                            <input type="date" value={""} className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={"handleIssueDetailsChange"} />
                            <small id="errbegindatedev" className="form-text text-danger" style={{ display: 'none' }}>
                            </small>
                        </div>
                    </div>
                </div>
            
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Type of Disclosure</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={"handleIssueDetailsChange"} >
                                    <option value="0" selected>Select Outcome</option>
                                    <option value="1" >Test</option>
                                    <option value="2" >Test</option>
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label">Recipient of the Disclosure</label>
                            <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' value={""} onChange={"handleIssueDetailsChange"} />
                        </div>
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label">Description of the Disclosure</label>
                            <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} value={""} onChange={'handleIssueDetailsChange'}></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleSaveIssues"}><img src={saveButtonIcon} className='icnn' alt=''/> Save</button>
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal" onClick={"handleClear"}><img src={clearIcon} className='icnn' alt=''/> Clear</button>
                </div>
            </div>
        </>
    )
}

export default OPDRecordDisclosurePopUp
