import React, { useEffect, useState } from 'react'
import Heading from '../../../../Component/Heading'
import GetAllIssueOutCome from '../../../API/GET/GetAllIssueOutCome';
import GetAllIssueOccurence from '../../../API/GET/GetAllIssueOccurence';
import GetAllVarificationStatus from '../../../API/GET/GetAllVarificationStatus';
import GetAllClassification from '../../../API/GET/GetAllClassification';
import Problem from '../IssuesPopUpComponents/Problem';
import Allergy from '../IssuesPopUpComponents/Allergy';
import Medication from '../IssuesPopUpComponents/Medication';
import Device from '../IssuesPopUpComponents/Device';
import Surgery from '../IssuesPopUpComponents/Surgery';
import saveButtonIcon from '../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../assets/images/icons/clear.svg';
import SuccessToster from '../../../../Component/SuccessToster';
import AlertToster from '../../../../Component/AlertToster';
import Dental from '../IssuesPopUpComponents/Dental';
const VisitDetails = ({ visitDetailsData, issueDetailData, issueDetails }) => {
    // const issueValue = document.getElementById('ddlProblem').getAttribute('value');
    let [problem, setProblem] = useState('');
    let [issueDetailss, setIssueDetailss] = useState()
    let [coding, setCoding] = useState('');
    let [outComelist, setOutcomeList] = useState([]);
    let [occurencelist, setOccurenceList] = useState([]);
    let [statuslist, setStatusList] = useState([]);
    let [classificationList, setClassificationList] = useState([]);
    const [isCodingSelected, setCodingSelected] = useState(false);
    let [showToster, setShowToster] = useState(0)
    let [showAlertToster, setShowAlertToster] = useState(0)

    const [visitDetails, setVisitDetails] = useState({
        classId: '0',
        typeId: '0',
        sensitivityId: '0',
        encounterProviderId: '0',
        dischargeDispositionId: '0',
        reasonforVisit: '',
    });

    let handleErrorClear = () => {
        document.getElementById("errTitleISSUE").style.display = "none";
    }
    let handleClear = () => {
        issueDetailData(
            {
                Problem: {
                    titleId: '',
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
                },

                Allergy: {
                    titleId: '',
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
                },

                Medication: {
                    titleId: '',
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
                },
                Device: {
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
                },
                Surgery: {
                    titleId: '',
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
                },
                Dental: {
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
                },
            }
        );
    }
    let handleValidation = (problemData, allergyData,medicationData) => {
        if (problemData.title.trim() !== "" && problemData.beginDateTime.trim() !== "" ||
            allergyData.title.trim() !== "" && allergyData.beginDateTime.trim() !== "") {
            return true
        }
        else if (problemData.title.trim() === "") {
            document.getElementById("errTitleISSUE").innerHTML = "Please enter title";
            document.getElementById("errTitleISSUE").style.display = "block";
            return false
        }
        else if (problemData.beginDateTime.trim() === "") {
            document.getElementById("errTitleBeginDate").innerHTML = "Please select begin date";
            document.getElementById("errTitleBeginDate").style.display = "block";
            return false
        }
        else if (allergyData.title.trim() === "") {
            document.getElementById("errTitleAllergies").innerHTML = "Please enter title";
            document.getElementById("errTitleAllergies").style.display = "block";
            return false
        }
        else if (allergyData.beginDateTime.trim() === "") {
            document.getElementById("errDateAllergies").innerHTML = "Please select begin date";
            document.getElementById("errDateAllergies").style.display = "block";
            return false
        }
    }

    let handleSaveIssues = async () => {
        // let respValidation = handleValidation(issueDetails.Problem, issueDetails.Allergy,issueDetails.Medication)
        // if (respValidation) {
            // setShowToster(1); // Set showToster to 1 only when condition is met
            // setTimeout(() => {
            //     setShowToster(0); // Set back showToster to 0 after 2 seconds
            // }, 2000);
        // }
    };


    const handleTitleInputChange = (e) => {
        //     setProblem(e.target.value);
        //     setCodingSelected(false);
        //     const { name, value } = e.target;
        //     setIssueDetails((prevIssueDetails) => ({
        //         ...prevIssueDetails,
        //         [name]: value,
        //     }));
    };

    const handleCodingInputChange = (e) => {
        //     // setCoding(e.target.value);
        //     setCodingSelected(false);
        //     const { name, value } = e.target;
        //     setIssueDetails((prevIssueDetails) => ({
        //         ...prevIssueDetails,
        //         [name]: value,
        //     }));
    };

    let handleRemove = () => {
        //     setCoding('');
        //     setIssueDetails((prevIssueDetails) => ({
        //         ...prevIssueDetails,
        //         'coding': '',
        //     }));
    }

    let handleIssueDetailsChange = (e) => {
        // const { name, value } = e.target;
        // setIssueDetails((prevIssueDetails) => ({
        //     ...prevIssueDetails,
        //     [name]: value,
        // }));
    }

    let handleSelectProblem = () => {
        // const selectProblem = document.getElementById("ddlproblems").value;
        // const selectedProblem = selectProblem.options[selectProblem.selectedIndex].text
        // setProblem(selectedProblem);
        // setCoding(selectedProblem);
        // setCodingSelected(true);
        // setIssueDetailss((prev) => ({
        //     ...prev,
        //     title: selectedProblem,
        //     coding: selectProblem,
        // }))
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
        // issueDetailData(issueDetails)
    }, [visitDetails, visitDetailsData]);

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
                        <textarea className='form-control' id="w3review" rows="5" name="reasonforVisit" onChange={handleVisitDetailsChange}></textarea>
                    </div>
                    <div className='col-md-4'>
                        <Heading text="Link/Add Issues to This Visit" />
                        <div className='form-control'>
                            {issueDetails !== undefined ?
                                <>
                                    {
                                        issueDetails.Problem.coding !== undefined ?
                                            issueDetails.Problem.coding.split(';').map((li, i) => {
                                                return (<><span>{li}</span> <br /></>)
                                            })
                                            : ""
                                    }
                                    {
                                        issueDetails.Allergy.coding !== undefined ?
                                            issueDetails.Allergy.coding.split(';').map((li, i) => {
                                                return (<><span>{li}</span> <br /></>)
                                            })
                                            : ""
                                    }
                                    {
                                        issueDetails.Medication.coding !== undefined ?
                                            issueDetails.Medication.coding.split(';').map((li, i) => {
                                                return (<><span>{li}</span> <br /></>)
                                            })
                                            : ""
                                    }
                                    {
                                        issueDetails.Device.coding !== undefined ?
                                            issueDetails.Device.coding.split(';').map((li, i) => {
                                                return (<><span>{li}</span> <br /></>)
                                            })
                                            : ""
                                    }
                                    {
                                        issueDetails.Surgery.coding !== undefined ?
                                            issueDetails.Surgery.coding.split(';').map((li, i) => {
                                                return (<><span>{li}</span> <br /></>)
                                            })
                                            : ""
                                    }
                                    {
                                        issueDetails.Dental.coding !== undefined ?
                                            issueDetails.Dental.coding.split(';').map((li, i) => {
                                                return (<><span>{li}</span> <br /></>)
                                            })
                                            : ""
                                    }
                                </>
                                : ''
                            }
                        </div>
                    </div>

                    <div className='col-md-2 addvisitbtn_ mt-5'>
                        <button type="button" class="btn btn-save btn-save-fill btn-sm mt-4" id="addPriviousNames" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-plus"></i> Add Issue</button>
                    </div>

                </div>
            </div>


            {/* --------------------------Modal Popup---------------------------- */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Issue</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className='orders-navtabs'>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#problem" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Problem</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#allergy" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" onClick={handleErrorClear}>Allergy  </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#medication" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Medication</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#device" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Device</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#surgery" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Surgery</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#dental" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Dental</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="problem" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    <Problem issueDetailsData={issueDetailData} issueDetailss={issueDetails.Problem} id={1} />
                                </div>
                                {/* --------------------------Allergy Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="allergy" role="tabpanel" value='2' aria-labelledby="profile-tab" tabindex="0">
                                    <Allergy issueDetailsData={issueDetailData} issueDetailss={issueDetails.Allergy} id={2} />
                                </div>
                                {/* --------------------------Medication Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="medication" role="tabpanel" value='3' aria-labelledby="contact-tab" tabindex="0">
                                    <Medication issueDetailsData={issueDetailData} issueDetailss={issueDetails.Medication} id={3} />
                                </div>
                                {/* --------------------------Device Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="device" role="tabpanel" value='4' aria-labelledby="contact-tab" tabindex="0">
                                    <Device issueDetailsData={issueDetailData} issueDetailss={issueDetails.Device} id={4} />
                                </div>
                                {/* --------------------------Surgery Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="surgery" role="tabpanel" value='5' aria-labelledby="contact-tab" tabindex="0">
                                    <Surgery issueDetailsData={issueDetailData} issueDetailss={issueDetails.Surgery} id={5} />
                                </div>
                                {/* --------------------------Dental Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade" id="dental" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                    <Dental issueDetailsData={issueDetailData} issueDetailss={issueDetails.Dental} id={6} />
                                </div>
                            </div>
                        </div>
                        {/* <div class="modal-footer">
                            <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                <button type="button" class="btn btn-save btn-save-fill btn-lg " data-bs-dismiss="modal" onClick={handleSaveIssues}><i class="bi bi-check-lg"></i> Save</button>
                                <button type="button" class="btn btn-secondary btn-secondry btn-lg" data-bs-dismiss="modal_" onClick={handleClear}><i class="bi bi-x-lg"></i> Cancel</button>
                            </div>
                        </div> */}
                        <div class="modal-footer">
                            <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleSaveIssues}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showToster === 1 ?
                    <SuccessToster handle={setShowToster} message="Issue save successfully !!" /> : ""
            }
            {
                showAlertToster === 2 ?
                    <AlertToster handle={setShowAlertToster} message="Atleast one field is required" /> : ""
            }
        </>
    );
};

export default VisitDetails;
