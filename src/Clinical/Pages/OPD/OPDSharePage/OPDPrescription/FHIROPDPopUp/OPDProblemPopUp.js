import React, { useEffect, useState } from 'react'
import GetProblemList from '../../../../../../Registartion/API/GET/GetProblemList';
import GetAllIssueOutCome from '../../../../../../Registartion/API/GET/GetAllIssueOutCome';
import GetAllIssueOccurence from '../../../../../../Registartion/API/GET/GetAllIssueOccurence';
import GetAllVarificationStatus from '../../../../../../Registartion/API/GET/GetAllVarificationStatus';
import GetAllClassification from '../../../../../../Registartion/API/GET/GetAllClassification';
import InsertEncounter from '../../../../../../Registartion/API/POST/InsertEncounter';
import SuccessToster from '../../../../../../Component/SuccessToster';
import AlertToster from '../../../../../../Component/AlertToster';
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import { CodeMaster } from '../../../../../../Admin/Pages/EMR Master/CodeMaster';
import { t } from 'i18next';
import UpdateEncounter from '../../../../../API/FHIREncounter/UpdateEncounter';
import FHIRGetEncounterByUHIDandIssueID from '../../../../../API/FHIRApi/GET/FHIRGetEncounterByUHIDandIssueID';
import GetAllSeverityData from '../../../../../../Registartion/API/GET/GetAllSeverityData';
import GetAllReactionList from '../../../../../../Registartion/API/GET/GetAllReactionList';
function OPDProblemPopUp({ getAllEncoutersAsPerIssueID, updatebool, setUpdateBool, rowId, encounterTitle, encounterBeginDate, encounterEndDate, encounterReferredBy, encounterCoding, classificationName, occurrence, verificationStatus, outcome, encounterComments, encounterDestination, titleId, severity, reaction, isCloseModal, fnisClose }) {
    let [problem, setProblem] = useState('');
    let [coding, setCoding] = useState('');
    let [outComelist, setOutcomeList] = useState([]);
    let [occurencelist, setOccurenceList] = useState([]);
    let [statuslist, setStatusList] = useState([]);
    let [classificationList, setClassificationList] = useState([]);
    const [isCodingSelected, setCodingSelected] = useState(false);
    let [problemList, setProblemList] = useState([]);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showErrMessage, setShowErrMessage] = useState('');
    const [isShowPopUp, setIsShowPopUp] = useState(0);
    const customStyle = { marginLeft: '0px' };
    const [PopUpId, setPopUpId] = useState('');
    const [txtCoding, setTxtCoding] = useState([]);
    let [makeData, setMakeData] = useState([]);
    let [getData, setgetData] = useState([]);
    let [severitylist, setSeverityList] = useState([]);
    let [reactionlist, setReactionList] = useState([]);
    let [showToster, setShowToster] = useState(0)

    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : [];

    const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];

    const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

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
        destination: '',
        reactionId: 0,
        severityId: 0,
        allergyType: 0,
        allergyTypeId: 0,
    })

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Adding leading zero if month/day is less than 10
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }

    let getAllProblem = async () => {
        const response = await GetProblemList();
        if (response.status === 1) {
            const slicedProblemList = response.responseValue.slice(0, 100)
            setProblemList(slicedProblemList);
        }
    }
    let getAllSeverityData = async () => {
        const response = await GetAllSeverityData();
        if (response.status === 1) {
            setSeverityList(response.responseValue);
        }
    }
    let getAllReactionList = async () => {
        const response = await GetAllReactionList();
        if (response.status === 1) {
            setReactionList(response.responseValue);
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
        document.getElementById("errTitle").style.display = "none";
        setProblem(e.target.value);
        setCodingSelected(false);
        const { name, value } = e.target;
        setProblemData((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    };



    let handleIssueDetailsChange = (e) => {
        document.getElementById("errbegindate").style.display = "none";
        const { name, value } = e.target;
        setProblemData((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    }

    let handleRemove = () => {
        const tempAr = txtCoding;
        let tempData = [];
        let tempNew = "";
        for (var i = 0; i < tempAr.length; i++) {
            if (!document.getElementById("ddlCoding" + i).checked) {
                tempData.push(tempAr[i])
            }
        }
        for (var i = 0; i < tempAr.length; i++) {
            document.getElementById("ddlCoding" + i).checked = false;
        }
        for (var j = 0; j < tempData.length; j++) {
            tempNew += tempData[j] + ';';
        }

        setProblemData((prevIssueDetails) => ({
            ...prevIssueDetails,
            coding: tempNew,
        }));
        setTxtCoding(tempData);
    }

    const SelectedData = (data, modalID) => {
        let t = {
            moduleId: modalID,
            data: data
        }
        setgetData(t);
        setMakeData([...makeData, t])
        let temp = ""
        for (var i = 0; i < data.length; i++) {
            temp += data[i].dropdownName + ':' + data[i].code + ';'
        }
        setProblemData((prevIssueDetails) => ({
            ...prevIssueDetails,
            coding: temp,
        }));
        const splitData = temp.split(';').slice(0, -1);
        setTxtCoding(splitData);
    }

    let handleSelectProblem = () => {
        document.getElementById("errTitle").style.display = "none";
        const ddlProblems = document.getElementById("ddlproblems");
        const ddlProblemId = document.getElementById("ddlproblems").value;
        const selectedOption = ddlProblems.options[ddlProblems.selectedIndex];
        const selectProblem = selectedOption ? selectedOption.textContent : "";
        setProblem(selectProblem);
        setCoding(selectProblem);
        setCodingSelected(true);
        setProblemData((prev) => ({
            ...prev,
            title: selectProblem,
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

    let handleClear = () => {
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
            destination: '',
            reactionId: '',
            severityId: ''
        })
        setUpdateBool(0);
        setTxtCoding([]);
        setProblemData((prevIssueDetails) => ({
            ...prevIssueDetails,
            coding: [],
        }));
        fnisClose(0);
        document.getElementById("errTitle").style.display = "none";
        document.getElementById("errbegindate").style.display = "none";
    }
    const handleOpenModal = (modalID) => {
        setIsShowPopUp(1);
        setPopUpId(modalID);
    }
    const handleCloseModal = () => {
        setIsShowPopUp(0);
        // setPopUpId('');
    }


    let handleSaveIssues = async () => {
        if (problemData.title === '' || problemData.title === undefined || problemData.title === null) {
            document.getElementById("errTitle").innerHTML = "Please enter title";
            document.getElementById("errTitle").style.display = "block";
        }
        if (problemData.beginDateTime === '' || problemData.beginDateTime === undefined || problemData.beginDateTime === null) {
            document.getElementById("errbegindate").innerHTML = "Please select begin date";
            document.getElementById("errbegindate").style.display = "block";
        }
        else {
            let pobj = {
                uhid: activeUHID,
                encounterDetailsJsonString: JSON.stringify([problemData]),
                clientId: window.clientId,
                userId: window.userId,
                doctorId: activeDocID,
                departmentId: activeDeptID
            }
            const response = await InsertEncounter(pobj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setShowToster(1)
                handleClear();
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)

            }
            else {
                setShowUnderProcess(0)
                setShowAlertToster(1)
                setShowErrMessage(response.responseValue)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
        }
    }

    let handleSaveUpdate = async () => {
        if (problemData.title === '' || problemData.title === undefined || problemData.title === null) {
            document.getElementById("errTitle").innerHTML = "Please enter title";
            document.getElementById("errTitle").style.display = "block";
        }
        if (problemData.beginDateTime === '' || problemData.beginDateTime === undefined || problemData.beginDateTime === null) {
            document.getElementById("errbegindate").innerHTML = "Please select begin date";
            document.getElementById("errbegindate").style.display = "block";
        }
        else {
            const response = await UpdateEncounter(JSON.stringify([problemData]));
            if (response.status === 1) {
                setShowToster(6)
                getAllEncoutersAsPerIssueID();
                handleClear();
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)
            }
            else {
                setShowAlertToster(1)
                setShowErrMessage(response.responseValue)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
        }
    }
    function convertDateFormat(dateString) {
        // Check if dateString is defined
        if (dateString) {
            // Split the date string by "-"
            const parts = dateString.split("-");

            // Check if parts contains three elements
            if (parts.length === 3) {
                // Rearrange the parts in the format yyyy-mm-dd
                const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                return formattedDate;
            } else {
                return null; // Or return an appropriate value indicating an error
            }
        } else {

            return null; // Or return an appropriate value indicating an error
        }
    }
    const codeName = {
        'ICD10': '2.16.840.1.113883.6.90',
        'SNOMED': '2.16.840.1.113883.6.96'
    }
    const redirectToHealthInfoPage = (param) => {
        const tempData = param.split(":");
        const codingType = tempData[0];
        const codingValue = tempData[1];
        const getCode = codeName[codingType];
        const url = "https://connect.medlineplus.gov/application?mainSearchCriteria.v.cs=" + getCode + "&mainSearchCriteria.v.c=" + codingValue;
        window.open(url, 'blank');
    }
    const newencounterBeginDate = convertDateFormat(encounterBeginDate);
    const newencounterEndDate = convertDateFormat(encounterEndDate);
    useEffect(() => {
        setProblemData({
            id: rowId,
            issueTypeId: 1,
            titleId: titleId && titleId !== '' ? titleId : '',
            title: encounterTitle && encounterTitle !== '' ? encounterTitle : '',
            coding: encounterCoding && encounterCoding !== '' ? encounterCoding : '',
            beginDateTime: newencounterBeginDate !== undefined ? newencounterBeginDate : '',
            endDateTime: newencounterEndDate !== undefined ? newencounterEndDate : '',
            classificationTypeId: classificationName && classificationName !== '' ? classificationName : '',
            occurrenceId: occurrence && occurrence !== '' ? occurrence : '',
            verificationStatusId: verificationStatus && verificationStatus !== '' ? verificationStatus : '',
            referredby: encounterReferredBy !== undefined ? encounterReferredBy : '',
            comments: encounterComments && encounterComments !== '' ? encounterComments : '',
            outcomeId: outcome && outcome !== '' ? outcome : '',
            severityId: severity && severity !== '' ? severity : '',
            reactionId: reaction && reaction !== '' ? reaction : '',
            destination: encounterDestination && encounterDestination !== '' ? encounterDestination : ''
        });
        const formattCodingData = encounterCoding ? encounterCoding.split(';').slice(0, -1) : [];
        setTxtCoding(formattCodingData)
    }, [encounterTitle, encounterBeginDate, encounterEndDate, encounterReferredBy, encounterCoding, classificationName, occurrence, verificationStatus, outcome, encounterComments, encounterDestination, titleId, severity, reaction,])

    useEffect(() => {
        getAllReactionList();
        getAllSeverityData();
        getAllProblem();
        getAllIssueOutCome();
        getAllIssueOccurence();
        getAllVarificationStatus();
        getClassificationlist();



    }, []);
    // Used To Clear Modal
    useEffect(() => {
        if (isCloseModal === 1) {
            handleClear();
            setMakeData([])
        }

    }, [isCloseModal]);
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
                    <div className="col-12 mb-2 ">
                        {/* <label htmlFor="txtPatientRelationAddress" className="form-label"><>Title</><sup style={{ color: "red" }}>*</sup></label> */}

                        <label for="bedName" class="form-label relative">Title<span class="starMandatory">*</span></label>
                        <input type="text" value={problemData.title} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                    </div>
                    <small id="errTitle" className="form-text text-danger" style={{ display: 'none' }}>
                    </small>
                </div>
                <div className='problemhead-inn'>
                    <div className="col-12 mb-2">
                        <label htmlFor="txtPatientRelationAddress" className="form-label"><>Coding</></label>
                        <div>
                            <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding' >
                                {txtCoding && txtCoding.length > 0 ?
                                    txtCoding.map((list, i) => {
                                        return (
                                            <>
                                                <span>
                                                    <input type='checkbox' style={{ marginRight: '5px' }} id={'ddlCoding' + i} />
                                                    {/* <span onClick={() => { redirectToHealthInfoPage(list) }}>{list}</span> */}
                                                    <span>{list}</span>
                                                </span>
                                                <br />
                                            </>
                                        )
                                    })

                                    : ''}
                            </div>
                            {/* <span className='form-control' style={{ height: '8em' }}>{txtCoding}</span> */}
                        </div>

                    </div>
                    <div class="d-inline-flex gap-2">
                        <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }} onClick={() => { handleOpenModal('coding') }}><i class="bi bi-plus"></i> Add</button>
                        <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-6 mb-2">
                            <label for="bedName" className="form-label relative">Begin Date and Time<span className="starMandatory">*</span></label>
                            <input type="date" value={problemData.beginDateTime} min={getCurrentDate()} className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                            <small id="errbegindate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label">End Date and Time</label>
                            <input type="date" min={problemData.beginDateTime || getCurrentDate()} value={problemData.endDateTime} className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
                            <div className='mt-2' style={{ float: 'inline-end' }}>
                                <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Classification Type</></label>
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
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Occurrence</></label>
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
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Severity</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select value={problemData.severityId} className="form-select form-select-sm" id="severityId" aria-label=".form-select-sm example" name='severityId' onChange={handleIssueDetailsChange} >
                                    <option value="0" selected>Select Severity</option>
                                    {severitylist && severitylist.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Reaction</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select value={problemData.reactionId} className="form-select form-select-sm" id="reactionId" aria-label=".form-select-sm example" name='reactionId' onChange={handleIssueDetailsChange} >
                                    <option value="0" selected>Select Reaction</option>
                                    {reactionlist && reactionlist.map((list) => {
                                        return (
                                            <option value={list.id}>{list.title}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Verification Status</></label>
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
                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Outcome</></label>
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
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>Destination</></label>
                            <input type="text" className="form-control form-control-sm" id="destination" name='destination' value={problemData.destination} onChange={handleIssueDetailsChange} />
                        </div>
                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>Referred by</></label>
                            <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' value={problemData.referredby} onChange={handleIssueDetailsChange} />
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">

                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>Comments</></label>
                            <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} value={problemData.comments} onChange={handleIssueDetailsChange}></textarea>
                        </div>
                    </div>
                </div>

            </div>
            {/* <div class="modal-footer">
                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-save btn-save-fill btn-lg " data-bs-dismiss="modal_" onClick={handleSaveIssues}><i class="bi bi-check-lg"></i> Save</button>
                    <button type="button" class="btn btn-secondary btn-secondry btn-lg" data-bs-dismiss="modal" onClick={handleClear}><i class="bi bi-x-lg"></i> Cancel</button>
                </div>
            </div> */}
            <div class="modal-footer">
                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                    {updatebool === 0 ?
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleSaveIssues}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                        : <button type="button" className="btn btn-save btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleSaveUpdate}>{t("UPDATE")}</button>
                    }
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                </div>
            </div>

            {/* ------------------------------------------ Code Master popUp Start------------------------------------ */}
            {isShowPopUp === 1 ?

                <div className={`modal d-${isShowPopUp === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static" >
                    <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
                        <div className="modal-content" >
                            {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>
                            <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={true} />
                            {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
                        </div>
                    </div>
                </div>
                : ''}


            {showToster === 1 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Problem saved successFully !!"
                />
            ) : (
                ""
            )}
            {showToster === 6 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Problem updated successFully !!"
                />
            ) : (
                ""
            )}
            {
                showAlertToster === 1 ?
                    <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
            }
            {/* ------------------------------------------ Code Master popUp End------------------------------------ */}
        </>
    )
}

export default OPDProblemPopUp
