import React, { useEffect, useState } from 'react'
import Heading from '../../../../Component/Heading'
import GetAllIssueOutCome from '../../../API/GET/GetAllIssueOutCome';
import GetAllIssueOccurence from '../../../API/GET/GetAllIssueOccurence';
import GetAllVarificationStatus from '../../../API/GET/GetAllVarificationStatus';
import GetAllClassification from '../../../API/GET/GetAllClassification';

const VisitDetails = ({ visitDetailsData, issueDetailData }) => {
    // const issueValue = document.getElementById('ddlProblem').getAttribute('value');
    // console.log("issueValue", issueValue);
    let [problem, setProblem] = useState('');
    let [coding, setCoding] = useState('');
    let [outComelist, setOutcomeList] = useState([]);
    let [occurencelist, setOccurenceList] = useState([]);
    let [statuslist, setStatusList] = useState([]);
    let [classificationList, setClassificationList] = useState([]);
    const [isCodingSelected, setCodingSelected] = useState(false);

    const [visitDetails, setVisitDetails] = useState({
        classId: '0',
        typeId: '0',
        sensitivityId: '0',
        encounterProviderId: '0',
        dischargeDispositionId: '0',
        reasonforVisit: '',
    });
    const [issueDetails, setIssueDetails] = useState({
        title: '',
        coding: '',
        beginDateTime: '',
        endDateTime: '',
        classificationTypeId: '0',
        occurrenceId: '0',
        verificationStatusId: '0',
        referredby: '',
        comments: '',
        outcomeId: '0',
        destination: ''
    });
    let handleSaveIssues = async () => {
        console.log("Function Invoked")
        console.log('issueDetails', issueDetails);
        const selectProblem = document.getElementById("ddlproblems").value;
        // const titleForProblem = document.getElementById("title").value;
        // const referredbyForProblem = document.getElementById("referredby").value;
        // const commentsForProblem = document.getElementById("comments").value;
        // const destinationForProblem = document.getElementById("destination").value;
        // const codingSelect = document.getElementById("coding");
        // const selectedCoding = codingSelect.options[codingSelect.selectedIndex].text
        // const beginDateTimeForProblem = document.getElementById("beginDateTime").value;
        // const endDateTimeForProblem = document.getElementById("endDateTime").value;
        // const selectclassificationType = document.getElementById("classificationTypeId");
        // const selectedClassificationType = selectclassificationType.options[selectclassificationType.selectedIndex].text
        // const selectOccurrence = document.getElementById("occurrenceId");
        // const selectedOccurrence = selectOccurrence.options[selectOccurrence.selectedIndex].text
        // const selectVerificationStatus = document.getElementById("verificationStatusId");
        // const selectedVerificationStatus = selectVerificationStatus.options[selectVerificationStatus.selectedIndex].text
        // const selectOutcome = document.getElementById("outcomeId");
        // const selectedOutcome = selectOutcome.options[selectOutcome.selectedIndex].text

        // const dataobj = {
        //     problem: selectProblem,
        //     coding: selectedCoding,
        //     link:'('+selectedCoding+selectProblem+')'
        // }
        // console.log("dataobj", dataobj)
        // setLink(link);
    }
    const handleTitleInputChange = (e) => {
        setProblem(e.target.value);
        setCodingSelected(false);
        const { name, value } = e.target;
        setIssueDetails((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    };
    const handleCodingInputChange = (e) => {
        // setCoding(e.target.value);
        setCodingSelected(false);
        const { name, value } = e.target;
        setIssueDetails((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    };

    let handleRemove = () => {
        setCoding('');
        setIssueDetails((prevIssueDetails) => ({
            ...prevIssueDetails,
            'coding': '',
        }));
    }

    let handleIssueDetailsChange = (e) => {
        console.log("issueDetailData", issueDetailData)
        const { name, value } = e.target;
        setIssueDetails((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    }

    let handleSelectProblem = () => {
        const selectProblem = document.getElementById("ddlproblems").value;
        // const selectedProblem = selectProblem.options[selectProblem.selectedIndex].text
        setProblem(selectProblem);
        setCoding(selectProblem);
        console.log('selectProblem', selectProblem)
        setCodingSelected(true);
        setIssueDetails((prev) => ({
            ...prev,
            title: selectProblem,
            coding: selectProblem,
        }))
    }

    const handleVisitDetailsChange = (e) => {
        const { name, value } = e.target;
        setVisitDetails((prevVisitDetails) => ({
            ...prevVisitDetails,
            [name]: value,
        }));
    };

    let getAllIssueOutCome = async () => {
        const response = await GetAllIssueOutCome();
        if (response.status === 1) {
            setOutcomeList(response.responseValue);
        }
    }
    let getAllIssueOccurence = async () => {
        const response = await GetAllIssueOccurence();
        if (response.status === 1) {
            setOccurenceList(response.responseValue);
        }
    }
    let getAllVarificationStatus = async () => {
        const response = await GetAllVarificationStatus();
        if (response.status === 1) {
            setStatusList(response.responseValue);
        }
    }
    let getClassificationlist = async () => {
        const response = await GetAllClassification();
        if (response.status === 1) {
            setClassificationList(response.responseValue);
        }
    }
    useEffect(() => {
        getAllIssueOutCome();
        getAllIssueOccurence();
        getAllVarificationStatus();
        getClassificationlist();
        visitDetailsData(visitDetails);
        issueDetailData(issueDetails)
    }, [visitDetails, visitDetailsData, issueDetails, issueDetailData]);

    return (
        <>
            <div className="dflex">
                <div className="col-md-2 mb-2">
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Class</label>
                    {/* <sup style={{ color: "red" }}>*</sup> */}
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
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Type</label>
                    {/* <sup style={{ color: "red" }}>*</sup> */}
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
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Sensitivity</label>
                    {/* <sup style={{ color: "red" }}>*</sup> */}
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
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Encounter Provider</label>
                    {/* <sup style={{ color: "red" }}>*</sup> */}
                    <div className='d-flex gap-3' >
                        <select className="form-select form-select-sm" id="ddlSEStateTertiary" aria-label=".form-select-sm example" name='encounterProviderId' onChange={handleVisitDetailsChange}>
                            <option value="0" selected>Select Encounter Provider</option>
                            <option value="1">Administator</option>
                            <option value="2">Provider External</option>
                        </select>
                    </div>
                    <small id="errEncounter" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-md-2 mb-2">
                    <label htmlFor="ddlSEStateTertiary" className="form-label">Discharge Disposition</label>
                    {/* <sup style={{ color: "red" }}>*</sup> */}
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
                            {issueDetails.coding !== "" ?
                                <option>{issueDetails.coding}</option>
                                : ''}
                        </select>
                    </div>
                    {/* <div className='col-md-4'>
                        <Heading text="Link/Add Issues to This Visit" />
                        <select className='form-control' multiple>
                            {Array.isArray(issueDatas) && issueDatas.map((list) => (
                                <option key={list.id} value={0}>{list.coding}</option>
                            ))}
                        </select>
                    </div> */}

                    <div className='col-md-2 addvisitbtn_ mt-5'>
                        <button type="button" class="btn btn-save btn-save-fill btn-sm mt-4" id="addPriviousNames" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-plus"></i> Add Issue</button>
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
                                <div class="tab-pane fade show active" id="problem" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <div>
                                                    <select className='form-control' id='ddlproblems' style={{ height: '8em' }} multiple onChange={handleSelectProblem}>
                                                        <option value='asthma'>asthma</option>
                                                        <option value='BCC'>BCC</option>
                                                        <option value='Dermatochalasis'>Dermatochalasis</option>
                                                        <option value='diabetes'>diabetes</option>
                                                        <option value='Dry Eye'>Dry Eye</option>
                                                        <option value='HTN'>HTN</option>
                                                        <option value='hyperlipidemia'>hyperlipidemia</option>
                                                        <option value='IDDM w/ BDR'>IDDM w/ BDR</option>
                                                        <option value='Keratoconus'>Keratoconus</option>
                                                        <option value='SCC'>SCC</option>
                                                        <option value='POAG'>POAG</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                                        </div>

                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" value={problem} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div>
                                                    <select className='form-control' style={{ height: '8em' }} multiple name='coding' id='coding' onChange={handleCodingInputChange}>
                                                        {issueDetails.coding !== "" ?
                                                            <option>{issueDetails.coding}</option>
                                                            : ''}
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}><i class="bi bi-plus"></i> Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>
                                                        <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Classification</option>
                                                            {classificationList && classificationList.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="occurrenceId" aria-label=".form-select-sm example" name='occurrenceId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Occurrence</option>
                                                            {occurencelist && occurencelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="verificationStatusId" aria-label=".form-select-sm example" name='verificationStatusId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Status</option>
                                                            {statuslist && statuslist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Outcome</option>
                                                            {outComelist && outComelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="destination" name='destination' onChange={handleIssueDetailsChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} onChange={handleIssueDetailsChange}></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* --------------------------Allergy Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="allergy" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <div>
                                                    <select className='form-control' id='ddlproblems' style={{ height: '8em' }} multiple onChange={handleSelectProblem}>
                                                        <option value='asthma'>asthma</option>
                                                        <option value='BCC'>BCC</option>
                                                        <option value='Dermatochalasis'>Dermatochalasis</option>
                                                        <option value='diabetes'>diabetes</option>
                                                        <option value='Dry Eye'>Dry Eye</option>
                                                        <option value='HTN'>HTN</option>
                                                        <option value='hyperlipidemia'>hyperlipidemia</option>
                                                        <option value='IDDM w/ BDR'>IDDM w/ BDR</option>
                                                        <option value='Keratoconus'>Keratoconus</option>
                                                        <option value='SCC'>SCC</option>
                                                        <option value='POAG'>POAG</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                                        </div>

                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" value={problem} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div>
                                                    <select className='form-control' style={{ height: '8em' }} multiple name='coding' id='coding' onChange={handleCodingInputChange}>
                                                        {issueDetails.coding !== "" ?
                                                            <option>{issueDetails.coding}</option>
                                                            : ''}
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>
                                                        <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Classification</option>
                                                            {classificationList && classificationList.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="occurrenceId" aria-label=".form-select-sm example" name='occurrenceId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Occurrence</option>
                                                            {occurencelist && occurencelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="verificationStatusId" aria-label=".form-select-sm example" name='verificationStatusId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Status</option>
                                                            {statuslist && statuslist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Outcome</option>
                                                            {outComelist && outComelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="destination" name='destination' onChange={handleIssueDetailsChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} onChange={handleIssueDetailsChange}></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* --------------------------Medication Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="medication" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <div>
                                                    <select className='form-control' id='ddlproblems' style={{ height: '8em' }} multiple onChange={handleSelectProblem}>
                                                        <option value='asthma'>asthma</option>
                                                        <option value='BCC'>BCC</option>
                                                        <option value='Dermatochalasis'>Dermatochalasis</option>
                                                        <option value='diabetes'>diabetes</option>
                                                        <option value='Dry Eye'>Dry Eye</option>
                                                        <option value='HTN'>HTN</option>
                                                        <option value='hyperlipidemia'>hyperlipidemia</option>
                                                        <option value='IDDM w/ BDR'>IDDM w/ BDR</option>
                                                        <option value='Keratoconus'>Keratoconus</option>
                                                        <option value='SCC'>SCC</option>
                                                        <option value='POAG'>POAG</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                                        </div>

                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" value={problem} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div>
                                                    <select className='form-control' style={{ height: '8em' }} multiple name='coding' id='coding' onChange={handleCodingInputChange}>
                                                        {issueDetails.coding !== "" ?
                                                            <option>{issueDetails.coding}</option>
                                                            : ''}
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>
                                                        <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Classification</option>
                                                            {classificationList && classificationList.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="occurrenceId" aria-label=".form-select-sm example" name='occurrenceId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Occurrence</option>
                                                            {occurencelist && occurencelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="verificationStatusId" aria-label=".form-select-sm example" name='verificationStatusId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Status</option>
                                                            {statuslist && statuslist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Outcome</option>
                                                            {outComelist && outComelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="destination" name='destination' onChange={handleIssueDetailsChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} onChange={handleIssueDetailsChange}></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* --------------------------Device Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="device" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                    <div className='problemhead'>
                                        {/* <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <div>
                                                    <select className='form-control' id='ddlproblems' style={{ height: '8em' }} multiple onChange={handleSelectProblem}>
                                                        <option value='asthma'>asthma</option>
                                                        <option value='BCC'>BCC</option>
                                                        <option value='Dermatochalasis'>Dermatochalasis</option>
                                                        <option value='diabetes'>diabetes</option>
                                                        <option value='Dry Eye'>Dry Eye</option>
                                                        <option value='HTN'>HTN</option>
                                                        <option value='hyperlipidemia'>hyperlipidemia</option>
                                                        <option value='IDDM w/ BDR'>IDDM w/ BDR</option>
                                                        <option value='Keratoconus'>Keratoconus</option>
                                                        <option value='SCC'>SCC</option>
                                                        <option value='POAG'>POAG</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                                        </div> */}

                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div>
                                                    <select className='form-control' style={{ height: '8em' }} multiple name='coding' id='coding' onChange={handleCodingInputChange}>
                                                        {issueDetails.coding !== "" ?
                                                            <option>{issueDetails.coding}</option>
                                                            : ''}
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>
                                                        <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Classification</option>
                                                            {classificationList && classificationList.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="occurrenceId" aria-label=".form-select-sm example" name='occurrenceId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Occurrence</option>
                                                            {occurencelist && occurencelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="verificationStatusId" aria-label=".form-select-sm example" name='verificationStatusId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Status</option>
                                                            {statuslist && statuslist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Outcome</option>
                                                            {outComelist && outComelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="destination" name='destination' onChange={handleIssueDetailsChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} onChange={handleIssueDetailsChange}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* --------------------------Surgery Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="surgery" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <div>
                                                    <select className='form-control' id='ddlproblems' style={{ height: '8em' }} multiple onChange={handleSelectProblem}>
                                                        <option value='asthma'>asthma</option>
                                                        <option value='BCC'>BCC</option>
                                                        <option value='Dermatochalasis'>Dermatochalasis</option>
                                                        <option value='diabetes'>diabetes</option>
                                                        <option value='Dry Eye'>Dry Eye</option>
                                                        <option value='HTN'>HTN</option>
                                                        <option value='hyperlipidemia'>hyperlipidemia</option>
                                                        <option value='IDDM w/ BDR'>IDDM w/ BDR</option>
                                                        <option value='Keratoconus'>Keratoconus</option>
                                                        <option value='SCC'>SCC</option>
                                                        <option value='POAG'>POAG</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                                        </div>

                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" value={problem} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div>
                                                    <select className='form-control' style={{ height: '8em' }} multiple name='coding' id='coding' onChange={handleCodingInputChange}>
                                                        {issueDetails.coding !== "" ?
                                                            <option>{issueDetails.coding}</option>
                                                            : ''}
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>
                                                        <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Classification</option>
                                                            {classificationList && classificationList.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="occurrenceId" aria-label=".form-select-sm example" name='occurrenceId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Occurrence</option>
                                                            {occurencelist && occurencelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="verificationStatusId" aria-label=".form-select-sm example" name='verificationStatusId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Status</option>
                                                            {statuslist && statuslist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Outcome</option>
                                                            {outComelist && outComelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="destination" name='destination' onChange={handleIssueDetailsChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} onChange={handleIssueDetailsChange}></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* --------------------------Dental Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="dental" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                <div className='problemhead'>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <div>
                                                    <select className='form-control' id='ddlproblems' style={{ height: '8em' }} multiple onChange={handleSelectProblem}>
                                                        <option value='asthma'>asthma</option>
                                                        <option value='BCC'>BCC</option>
                                                        <option value='Dermatochalasis'>Dermatochalasis</option>
                                                        <option value='diabetes'>diabetes</option>
                                                        <option value='Dry Eye'>Dry Eye</option>
                                                        <option value='HTN'>HTN</option>
                                                        <option value='hyperlipidemia'>hyperlipidemia</option>
                                                        <option value='IDDM w/ BDR'>IDDM w/ BDR</option>
                                                        <option value='Keratoconus'>Keratoconus</option>
                                                        <option value='SCC'>SCC</option>
                                                        <option value='POAG'>POAG</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                                        </div>

                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                                                <input type="text" value={problem} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                                            </div>
                                        </div>
                                        <div className='problemhead-inn'>
                                            <div className="col-12 mb-2">
                                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                                                <div>
                                                    <select className='form-control' style={{ height: '8em' }} multiple name='coding' id='coding' onChange={handleCodingInputChange}>
                                                        {issueDetails.coding !== "" ?
                                                            <option>{issueDetails.coding}</option>
                                                            : ''}
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="d-inline-flex gap-2">
                                                <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }}>Add</button>
                                                <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                                    <input type="date" className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
                                                    <div className='mt-2' style={{ float: 'inline-end' }}>
                                                        <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Classification</option>
                                                            {classificationList && classificationList.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="occurrenceId" aria-label=".form-select-sm example" name='occurrenceId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Occurrence</option>
                                                            {occurencelist && occurencelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-4 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="verificationStatusId" aria-label=".form-select-sm example" name='verificationStatusId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Status</option>
                                                            {statuslist && statuslist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label>
                                                    {/* <sup style={{ color: "red" }}>*</sup> */}
                                                    <div className='d-flex gap-3' >
                                                        <select className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={handleIssueDetailsChange} >
                                                            <option value="0" selected>Select Outcome</option>
                                                            {outComelist && outComelist.map((list) => {
                                                                return (
                                                                    <option value={list.id}>{list.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-6 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                                    <input type="text" className="form-control form-control-sm" id="destination" name='destination' onChange={handleIssueDetailsChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="row">
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                                    <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' onChange={handleIssueDetailsChange} />
                                                </div>
                                                <div className="col-12 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                                    <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} onChange={handleIssueDetailsChange}></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                <button type="button" class="btn btn-save btn-save-fill btn-lg " data-bs-dismiss="modal" onClick={handleSaveIssues}><i class="bi bi-check-lg"></i> Save</button>
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
