import React, { useEffect, useState } from 'react'
import GetProblemList from '../../../../../../Registartion/API/GET/GetProblemList';
import GetAllIssueOutCome from '../../../../../../Registartion/API/GET/GetAllIssueOutCome';
import GetAllIssueOccurence from '../../../../../../Registartion/API/GET/GetAllIssueOccurence';
import GetAllVarificationStatus from '../../../../../../Registartion/API/GET/GetAllVarificationStatus';
import GetAllClassification from '../../../../../../Registartion/API/GET/GetAllClassification';
import InsertEncounter from '../../../../../../Registartion/API/POST/InsertEncounter';
import SuccessToster from '../../../../../../Component/SuccessToster';
import AlertToster from '../../../../../../Component/AlertToster';

function OPDProblemPopUp({setShowToster}) {
    let [problem, setProblem] = useState('');
    let [coding, setCoding] = useState('');
    let [outComelist, setOutcomeList] = useState([]);
    let [occurencelist, setOccurenceList] = useState([]);
    let [statuslist, setStatusList] = useState([]);
    let [classificationList, setClassificationList] = useState([]);
    const [isCodingSelected, setCodingSelected] = useState(false);
    let [problemList, setProblemList] = useState([]);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    // let [showToster, setShowToster] = useState(0)
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)

    let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid

    let [problemData, setProblemData] = useState({
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
    })

    let getAllProblem = async () => {
        const response = await GetProblemList();
        if (response.status === 1) {
            const slicedProblemList = response.responseValue.slice(0, 100)
            setProblemList(slicedProblemList);
        }
    }

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

    const handleTitleInputChange = (e) => {
        setProblem(e.target.value);
        setCodingSelected(false);
        const { name, value } = e.target;
        setProblemData((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    };

    let handleRemove = () => {
        setCoding('');
        setProblemData((prevIssueDetails) => ({
            ...prevIssueDetails,
            'coding': '',
        }));
    }

    let handleIssueDetailsChange = (e) => {
        const { name, value } = e.target;
        setProblemData((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    }

    let handleSelectProblem = () => {
        const ddlProblems = document.getElementById("ddlproblems");
        const ddlProblemId = document.getElementById("ddlproblems").value;
        const selectedOption = ddlProblems.options[ddlProblems.selectedIndex];
        const selectProblem = selectedOption ? selectedOption.textContent : "";
        setProblem(selectProblem);
        setCoding(selectProblem);
        console.log('selectProblem', selectProblem)
        setCodingSelected(true);
        setProblemData((prev) => ({
            ...prev,
            title: selectProblem,
            coding: 'ICD10:' + selectProblem,
            titleId: ddlProblemId,
            issueTypeId: 1
        }))
    }

    const handleCodingInputChange = (e) => {
        setCodingSelected(false);
        const { name, value } = e.target;
        setProblemData((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    };

    let handleClear =()=>{
        setProblemData({
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
        })
    }

    let handleSaveIssues = async () => {
        let pobj = {
            uhid: activePatient,
            encounterDetailsJsonString: JSON.stringify([problemData]),
            clientId: window.clientId,
            userId: window.userId
        }
        console.log("pobj", pobj)
        // return;
        const response = await InsertEncounter(pobj);
        if (response.status === 1) {
            setShowUnderProcess(0);
            setShowToster(1)
            setTimeout(() => {
                setShowToster(0);
            }, 2000)
            handleClear();
        }
        else {
            setShowUnderProcess(0)
            setShowAlertToster(1)
            setShowMessage(response.responseValue)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }

    useEffect(() => {
        getAllProblem();
        getAllIssueOutCome();
        getAllIssueOccurence();
        getAllVarificationStatus();
        getClassificationlist();
    }, [])
    return (
        <>
            <div className='problemhead'>
                <div className='problemhead-inn'>
                    <div className="col-12 mb-2">
                        <div>
                            <select className='form-control' id='ddlproblems' name='titleId' style={{ height: '8em' }} multiple onChange={handleSelectProblem}>
                                {problemList && problemList.map((list) => {
                                    return (
                                        <option value={list.id}>{list.problemName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                </div>

                <div className='problemhead-inn'>
                    <div className="col-12 mb-2">
                        <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                        <input type="text" value={problemData.title} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                    </div>
                </div>
                <div className='problemhead-inn'>
                    <div className="col-12 mb-2">
                        <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                        <div>
                            <select value={problemData && problemData.coding} className='form-control' style={{ height: '8em' }} multiple name='coding' id='coding' onChange={handleCodingInputChange}>
                                {problemData && problemData.coding !== "" ?
                                    <option>{problemData.coding}</option>
                                    : ''}
                            </select>
                        </div>

                    </div>
                    <div class="d-inline-flex gap-2">
                        <button type="button" disabled class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }} onClick={() => { "handleOpenModal"('coding') }}><i class="bi bi-plus"></i> Add</button>
                        <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                            <input type="date" value={problemData.beginDateTime} className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                        </div>
                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                            <input type="date" value={problemData.endDateTime} className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
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
                                <select value={problemData.classificationTypeId} className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={handleIssueDetailsChange} >
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
                                <select value={problemData.occurrenceId} className="form-select form-select-sm" id="occurrenceId" aria-label=".form-select-sm example" name='occurrenceId' onChange={handleIssueDetailsChange} >
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
                                <select value={problemData.verificationStatusId} className="form-select form-select-sm" id="verificationStatusId" aria-label=".form-select-sm example" name='verificationStatusId' onChange={handleIssueDetailsChange} >
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
                                <select value={problemData.outcomeId} className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={handleIssueDetailsChange} >
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
                            <input type="text" className="form-control form-control-sm" id="destination" name='destination' value={problemData.destination} onChange={handleIssueDetailsChange} />
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                            <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' value={problemData.referredby} onChange={handleIssueDetailsChange} />
                        </div>
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                            <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} value={problemData.comments} onChange={handleIssueDetailsChange}></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-save btn-save-fill btn-lg " data-bs-dismiss="modal" onClick={handleSaveIssues}><i class="bi bi-check-lg"></i> Save</button>
                    <button type="button" class="btn btn-secondary btn-secondry btn-lg" data-bs-dismiss="modal" onClick={handleClear}><i class="bi bi-x-lg"></i> Cancel</button>
                </div>
            </div>
            
        </>
    )
}

export default OPDProblemPopUp