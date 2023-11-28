import React, { useState, useEffect } from 'react'
//import GetProjectType from '../API/ProjectTypeMaster/GetProjectTypeMaster'
import GetProjectMaster from '../API/ProjectMaster/GetProjectMaster'
import GetSprint from '../API/SprintMaster/GetSprint'
import SaveSprint from '../API/SprintMaster/SaveSprint'
import DeleteSprint from '../API/SprintMaster/DeleteSprint'
import { date } from '@linways/table-to-excel'
import UpdateSprint from '../API/SprintMaster/UpdateSprint'
import GetStatusSprint from '../API/StatusMaster/GetStatusSprint'
import SuccessToster from '../../Component/SuccessToster'
import WarningToaster from '../../Component/WarningToaster'
import AlertToster from '../../Component/AlertToster'
import Loder from '../../Component/Loader'
import GetStoryByModule from '../API/StoryMaster/GetStoryByModule'
import GetModuleByProjectUser from '../API/ModuleMaster/GetModuleByProjectUser'
import GetProjectByUser from '../API/ProjectMaster/GetProjectByUser'
import SaveSprintStoryAssign from '../API/SprintStoryAssign/SaveSprintStoryAssign'
import UpdateSprintStoryAssign from '../API/SprintStoryAssign/UpdateSprintStoryAssign'
import DeleteSprintStoryAssign from '../API/SprintStoryAssign/DeleteSprintStoryAssign'
import { SearchIndex } from '../../Code/Serach'
import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'
import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";
import Heading from '../../Component/Heading'
//  import { Filter } from '@salesforce/design-system-react'

export default function SprintMaster() {
    let [getStoryIDGlobalUpdate, setStoryIDGlobalUpdate] = useState(0)

    let [getSprintList, setSprintList] = useState([])
    let [getStatusList, setStatusList] = useState([])
    //let [getProjectTypeList, setProjectTypeList] = useState([])
    let [getProjectMasterLit, setProjectMasterList] = useState([])
    let [getStoryList, setStoryList] = useState([])
    let [getAssignedToList, setAssignedToList] = useState([])
    let [getModuleByProjectList, setModuleByProjectList] = useState([])

    let [getId, setId] = useState('')
    let [getStartDate, setStartDate] = useState('')
    let [getEndDate, setEndDate] = useState('')
    const [getSprintStoryID, setSprintStoryID] = useState('');
    const [getSelectedOptionProject, setSelectedOptionProject] = useState('');
    //const [getSelectedOptionProjectType, setSelectedOptionProjectType] = useState('');
    const [getSelectedOptionModule, setSelectedOptionModule] = useState('');
    let [getSelectedOptionStory, setSelectedOptionStory] = useState('')
    let [isCheckedAssignDeptSlctAll, setIsCheckedAssignDeptSlctAll] = useState(false);
    let [getStoryArray, setAssignDepartmentArr] = useState([]);

    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)
    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    const [searchInput, setSearchInput] = useState('');

    let funGetAllProjectMaster = async () => {
        let getResult = await GetProjectByUser(window.userId)
        setProjectMasterList(getResult.responseValue)
    }
    let funGetAllSprint = async () => {
        let getResult = await GetSprint(window.userId);
        setLoder(1)
        if (getResult.status === 1) {
            setLoder(0)
            setSprintList(getResult.responseValue)
        }
    }

    const SelectedOptionProjectHandler = async (event) => {
        setSelectedOptionProject(event.target.value);

        const projectID = document.getElementById('sldProject').value;
        let getResult = await GetModuleByProjectUser(projectID, window.userId)
        if (getResult.status === 1) {
            setModuleByProjectList(getResult.responseValue);
            setAssignedToList(getResult.userList)
        }
    }
    const SelectedOptionModuleHandler = async (event) => {
        setSelectedOptionModule(event.target.val);
        const moduleID = document.getElementById('sldModule').value;
        let getResult = await GetStoryByModule(moduleID)
        if (getResult.status === 1) {
            setStoryList(getResult.responseValue);
        }
    }

    // const SelectedOptionProjectType = async (event) => {
    //     //setSelectedOptionProjectType(event.target.value);
    // }
    // let funGetProjectType = async () => {
    //     let getResult = await GetProjectType()
    //     setProjectTypeList(getResult.responseValue);
    // }
    let funGetStatus = async () => {
        let getResult = await GetStatusSprint();
        setStatusList(getResult.responseValue)
    }

    let SaveSprintMaster = async () => {
        var colDept = "";
        const getStartDate = document.getElementById("txtstartDate").value;
        const getEndDate = document.getElementById("txtendDate").value;
        const getSelectedOptionProject = document.getElementById("sldProject").value;
        //const getSelectedOptionProjectType = document.getElementById("sldProjectType").value;
        const getSelectedOptionModule = document.getElementById('sldModule').value;
        const startDate = new Date(getStartDate);
        const endDate = new Date(getEndDate);

        for (var j = 0; j < getStoryArray.length; j++) {
            colDept = colDept === '' ? + getStoryArray[j].id : colDept + ',' + getStoryArray[j].id;

        }
        ///console.log("forCoutCk",getStoryArray.length)
        let checklength = getStoryArray.length;
        let selectedDept = "";
        let selectedDeptSingle = "";
        if (checklength > 1) {
            selectedDept = JSON.parse('[' + colDept.replace(/,\s*,/, ',0,') + ']');
        }
        else {
            selectedDeptSingle = colDept;
            setMessage("Plz select story !")
            setShowToster(3)
            setLoder(0)
        }

        //var selectedDept= JSON.parse('[' + colDept.replace(/,\s*,/, ',0,') + ']');
        if (getStartDate === '0' || getStartDate === undefined || getStartDate === null || getStartDate === "") {
            setMessage("Start date not fill !")
            setShowToster(3)
            setLoder(0)
        }

        else if (getEndDate === '0' || getEndDate === undefined || getEndDate === null || getEndDate === "") {
            setMessage("End date not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getSelectedOptionProject === '0' || getSelectedOptionProject === undefined || getSelectedOptionProject === null || getSelectedOptionProject === "") {
            setMessage("Plz select project !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getSelectedOptionProjectType === '0' || getSelectedOptionProjectType === undefined || getSelectedOptionProjectType === null || getSelectedOptionProjectType === "") {
        //     setMessage("Plz select project type !")
        //     setShowToster(3)
        //     setLoder(0)
        // }
        else if (getSelectedOptionModule === '0' || getSelectedOptionModule === undefined || getSelectedOptionModule === null || getSelectedOptionModule === "") {
            setMessage("Plz select module !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getSelectedOptionProjectType === '0' || getSelectedOptionProjectType === undefined || getSelectedOptionProjectType === null || getSelectedOptionProjectType === "") {
        //     setMessage("plz select story!")
        //     setShowToster(3)
        //     setLoder(0)
        // }
        if (startDate > endDate) {
            setMessage("End date must be greater than start date !");
            setShowToster(3);
            setLoder(0);
        }

        else {
            var objTimeline = {
                startDate: getStartDate,
                endDate: getEndDate,
                userID: window.userId,
                clientId: JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }

            setLoder(1)
            let resultTimeline = await SaveSprint(objTimeline);

            let getLastSprintID = resultTimeline.responseValue[0].id;

            if (resultTimeline.status === 1) {
                setLoder(0);

                if (selectedDeptSingle === null || selectedDeptSingle === '') {
                    selectedDept.forEach(async function callback(value, index) {
                        var objStoryInfo = {
                            sprintID: getLastSprintID,
                            projectID: getSelectedOptionProject,
                            //projectTypeID: getSelectedOptionProjectType,
                            storyID: value,
                            userID: window.userId,
                            clientId: JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
                        }
                        let resultStory = await SaveSprintStoryAssign(objStoryInfo);
                        if (resultStory.status === 1) {
                            setMessage("Data save successfully !")
                            funGetAllSprint();
                            setShowToster(1)
                            setSaveUpdateBool(0);
                            clearTextValues();
                        }
                    })
                }
                else {
                    var objStoryInfoSingle = {
                        sprintID: getLastSprintID,
                        projectID: getSelectedOptionProject,
                        //projectTypeID: getSelectedOptionProjectType,
                        storyID: selectedDeptSingle,
                        userID: window.userId,
                        clientId: JSON.parse(window.sessionStorage.getItem('LoginData')).clientId

                    }

                    let resultStory = await SaveSprintStoryAssign(objStoryInfoSingle);
                    if (resultStory.status === 1) {
                        setMessage("Data save successfully !")
                        document.getElementById('searchval').reset();
                        funGetAllSprint();
                        setShowToster(1)
                        setSaveUpdateBool(0);
                        clearTextValues();
                    }
                    else {
                        setMessage(resultStory.responseValue)

                    }
                }

                //console.log("forCoutCk",objStoryInfo)
                // let resultStory = await SaveSprintStoryAssign(objStoryInfo);
                // if (resultStory.status === 1) {
                //     setMessage("Data save successfully. !")
                //     funGetAllSprint();
                //     setShowToster(1)
                //     setSaveUpdateBool(0);
                //     clearTextValues();
                // }
            }
            else {
                setMessage(resultTimeline.responseValue)
                setLoder(0);
                setSaveUpdateBool(0);
                funGetAllSprint();
            }
        }
    }

    let DeleteSprintMaster = async () => {
        var objSprint = {
            Id: getId,
        }
        var objSprintStory = {
            Id: getSprintStoryID,
        }

        setLoder(1)
        let resultSprint = await DeleteSprint(objSprint);
        let resultSprintStory = await DeleteSprintStoryAssign(objSprintStory);
        if (resultSprint.status === 1 && resultSprintStory.status === 1) {
            setMessage("Data delete successfully !")
            setShowToster(1)
            setLoder(0)
            funGetAllSprint()
            clearTextValues();
        }
        else {
            setMessage(resultSprint.responseValue)
            setShowToster(2)
            setLoder(0)
            funGetAllSprint()
        }
    }

    function reformatDateString(s) {
        if (typeof s === 'string' && s.trim() !== '') {
            var b = s.split(/\D/);
            var day = parseInt(b[2], 10).toString();
            var month = parseInt(b[1], 10).toString();
            var year = b[0];
            return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
        } else {
            return ''; // Return an empty string or handle the error as needed
        }
    }
    //projectTypeID,
    let EditSprintMaster = async (sprintID, startDate, endDate, sprintStoryID, projectID, moduleID, storyID) => {
        document.getElementById('searchval').reset();
        setStoryIDGlobalUpdate(storyID);
        setId(sprintID);
        document.getElementById('sldProject').value = projectID;
        //document.getElementById('sldProjectType').value = projectTypeID;
        setStartDate(reformatDateString(startDate));
        setEndDate(reformatDateString(endDate));
        setSprintStoryID(sprintStoryID)
        setSelectedOptionProject(projectID)
        //setSelectedOptionProjectType(projectTypeID)
        setSelectedOptionModule(moduleID)

        setSaveUpdateBool(1);
        let getResultData = await GetModuleByProjectUser(projectID, window.userId);
        if (getResultData.status === 1) {
            setModuleByProjectList(getResultData.responseValue);
            setAssignedToList(getResultData.userList)
        }
        let getResultID = await GetStoryByModule(moduleID);

        if (getResultID.status === 1) {
            setStoryList(getResultID.responseValue);
            var i;
            for (i = 0; i < getResultID.responseValue.length; i++) {
                if (getResultID.responseValue[i].id === storyID) {
                    setAssignDepartmentArr([getResultID.responseValue[i]]);
                }
            }
        }
    }

    let UpdateSprintMaster = async () => {
        let getStoryCommaSaprates = "";
        for (var j = 0; j < getStoryArray.length; j++) {
            getStoryCommaSaprates = getStoryCommaSaprates === '' ? + getStoryArray[j].id : getStoryCommaSaprates + ',' + getStoryArray[j].id;
        }
        let checkStoryLength = getStoryArray.length;
        let getAllCommaSaprate = '';
        let getAllSingle = '';
        if (checkStoryLength > 1) {
            getAllCommaSaprate = JSON.parse('[' + getStoryCommaSaprates.replace(/,\s*,/, ',0,') + ']');
        }
        else {
            getAllSingle = getStoryCommaSaprates;
            setMessage("Plz select story !")
            setShowToster(3)
            setLoder(0)
        }


        const getStartDate = document.getElementById("txtstartDate").value;
        const getEndDate = document.getElementById("txtendDate").value;
        const getSelectedOptionProject = document.getElementById('sldProject').value;
        //const getSelectedOptionProjectType = document.getElementById('sldProjectType').value;
        const getSelectedOptionModule = document.getElementById('sldModule').value;
        if (getStartDate === '0' || getStartDate === undefined || getStartDate === null || getStartDate === "") {
            setMessage("Start date not fill !")
            setShowToster(3)
            setLoder(0)
        }

        else if (getEndDate === '0' || getEndDate === undefined || getEndDate === null || getEndDate === "") {
            setMessage("End date not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getSelectedOptionProject === '0' || getSelectedOptionProject === undefined || getSelectedOptionProject === null || getSelectedOptionProject === "") {
            setMessage("Plz select project !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getSelectedOptionProjectType === '0' || getSelectedOptionProjectType === undefined || getSelectedOptionProjectType === null || getSelectedOptionProjectType === "") {
        //     setMessage("Plz select project type !")
        //     setShowToster(3)
        //     setLoder(0)
        // }
        else if (getSelectedOptionModule === '0' || getSelectedOptionModule === undefined || getSelectedOptionModule === null || getSelectedOptionModule === "") {
            setMessage("Plz select module !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getSelectedOptionStory === '0' || getSelectedOptionStory === undefined || getSelectedOptionStory === null || getSelectedOptionStory === "") {
        //     setMessage("plz select story!")
        //     setShowToster(3)
        //     setLoder(0)
        // }

        else {
            var objSptint = {
                Id: getId,
                startDate: getStartDate,
                endDate: getEndDate,
                userID: window.userId,
                clientId: JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            setLoder(1)
            let result = await UpdateSprint(objSptint);
            if (result.status === 1) {
                setLoder(0)
                if (getAllSingle === null || getAllSingle === '') {
                    //console.log("getId",getId);
                    getAllCommaSaprate.forEach(async function callback(value, index) {


                        if (value === getStoryIDGlobalUpdate) {
                            return null;
                        }

                        var objSprintStoryComma = {
                            // Id: getSprintStoryID,
                            // projectID: getSelectedOptionProject,
                            // projectTypeID: getSelectedOptionProjectType,
                            // storyID: value,
                            // userID: window.userId,

                            sprintID: getId,
                            projectID: getSelectedOptionProject,
                            //projectTypeID: getSelectedOptionProjectType,
                            storyID: value,
                            userID: window.userId,
                            clientId: JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
                        }
                        let resultStory = await SaveSprintStoryAssign(objSprintStoryComma);
                        // let resultSprintStory = await UpdateSprintStoryAssign(objSprintStoryComma);
                        if (resultStory.status === 1) {
                            //if (resultSprintStory.status === 1) {
                            setMessage("Data update successfully !")
                            setShowToster(1)
                            funGetAllSprint();
                            setSaveUpdateBool(0);
                            clearTextValues();
                        }
                    })
                }
                else {
                    var objSprintStorySingle = {
                        Id: getSprintStoryID,
                        projectID: getSelectedOptionProject,
                        //projectTypeID: getSelectedOptionProjectType,
                        storyID: getAllSingle,
                        userID: window.userId,
                        clientId: JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
                    }
                    let resultSprintStory = await UpdateSprintStoryAssign(objSprintStorySingle);
                    if (resultSprintStory.status === 1) {
                        setMessage("Data update successfully !")
                        document.getElementById('searchval').reset();
                        setShowToster(1)
                        funGetAllSprint();
                        setSaveUpdateBool(0);
                        clearTextValues();
                    }
                }
                //let resultSprintStory = await UpdateSprintStoryAssign(objSprintStory);
                // if (resultSprintStory.status === 1) {
                //     setMessage("Data update successfully. !")
                //     setShowToster(1)
                //     funGetAllSprint();
                //     setSaveUpdateBool(0);
                //     clearTextValues();
                // }
            }
            else {
                setLoder(0);
                setMessage(result.responseValue)
                setShowToster(2)
                funGetAllSprint();
            }
        }

    }


    let handleTextboxChangeStartDate = (event) => {
        if (event.target.name === "startDate") {
            setStartDate(event.target.value);
        }
    }
    let handleTextboxChangeEndDate = (event) => {
        if (event.target.name === "endDate") {
            setEndDate(event.target.value);
        }
    }

    let clearTextValues = (event) => {
        document.getElementById('searchval').reset();
        setStartDate('');
        setEndDate('');
        setSelectedOptionProject('');
        //setSelectedOptionProjectType('');
        setSelectedOptionModule('');
        defaultDate();

        setSaveUpdateBool(0);
    }
    ////////////
    //  Select dropdown with  Checkbox  **********************************************  

    let [headList, setHeadList] = useState()
    let [sendHeadList, setSendHeadList] = useState([]);
    let checkId = (id) => {
        let bool = false;
        sendHeadList.map((val, ind) => {
            if (id === val) {
                bool = true;
                return [bool, ind];
            }
        });
        return [bool, -1];
    };

    //Used To Get Assign Department Checkboxes
    let handleAssignDepartment = (key) => {
        if (getStoryArray.length === 0) {
            getStoryArray.push({
                id: key
            });
        }
        else {
            var index = getStoryArray.findIndex((arr) => arr.id === key);
            if (index !== -1) {
                getStoryArray.splice(index, 1)
            }
            else {
                getStoryArray.push({
                    id: key
                });
            }
        }
    }

    let handleSelectAllDepartment = () => {
        if (document.getElementById("selectAllDepartment").checked === true) {
            setIsCheckedAssignDeptSlctAll(true)
            for (var i = 0; i < getStoryList.length; i++) {
                document.getElementById(getStoryList[i].id + "assignDepartmentCB").checked = true;
                var index = getStoryArray.findIndex((arr) => arr.id === getStoryList[i].id);
                if (index === -1) {
                    getStoryArray.push({
                        id: getStoryList[i].id
                    })
                }
            }
        }
        else {
            for (var j = 0; j < getStoryList.length; j++) {
                document.getElementById(getStoryList[j].id + "assignDepartmentCB").checked = false;
            }
            setIsCheckedAssignDeptSlctAll(false);
            setAssignDepartmentArr([]);
        }
    }

    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }
    let defaultDate = async () => {
        const today = new Date().toISOString().split('T')[0];
        setStartDate(today);
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 15);
        setEndDate(endDate.toISOString().split('T')[0]);
    }
    useEffect(() => {

        defaultDate();
        funGetAllProjectMaster();
        //funGetProjectType()
        funGetAllSprint();
        funGetStatus();

    }, [])
    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Add Sprint</div>
                                <div className="inner-content">
                                    <form id="searchval">
                                        <div className="d-flex flex-wrap align-content-end">


                                            <div className="mb-2 flex-grow-1 me-2">
                                                <label htmlFor="projectName" className="form-label">Project<span className="starMandatory">*</span></label>
                                                <select name='projectId' id="sldProject" value={getSelectedOptionProject} onChange={SelectedOptionProjectHandler} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                    <option value="0">Select project</option>
                                                    {getProjectMasterLit && getProjectMasterLit.map((val, index) => {
                                                        return (
                                                            <option value={val.projectId}>{val.projectName}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            {/* <div className="mb-2 flex-grow-1 me-2">
                                                <label htmlFor="projectName" className="form-label">Project Type<span className="starMandatory">*</span></label>
                                                <select name='widgetId' id="sldProjectType" onChange={SelectedOptionProjectType} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                    <option value="0">Select Project Type</option>
                                                    {getProjectTypeList && getProjectTypeList.map((val, index) => {
                                                        return (
                                                            <option value={val.id}>{val.projectType}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div> */}
                                            <div className="mb-2 flex-grow-1 me-2">
                                                <label htmlFor="Module" className="form-label">Module<span className="starMandatory">*</span></label>
                                                <select name='moduleID' id="sldModule" value={getSelectedOptionModule} onChange={SelectedOptionModuleHandler} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                    <option value="0">Select Module</option>
                                                    {getModuleByProjectList && getModuleByProjectList.map((val, index) => {
                                                        return (
                                                            <option value={val.id}>{val.moduleName}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            {/* <div className="mb-2 me-2">
                                            <label htmlFor="Story" className="form-label">Story<span className="starMandatory">*</span></label>
                                            <select name='storyID' id="sldstoryID" value={getSelectedOptionStory} onChange={handleTextboxChangeStory} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Story</option>
                                                {getStoryList && getStoryList.map((val, index) => {
                                                    return (
                                                        <option value={val.id}>{val.wantAbleTo}{val.soThat}</option>
                                                    )
                                                })}
                                            </select>
                                        </div> */}
                                            {/* -------------------------------------Start MultiCheckDropdown--------------------------- */}
                                            <div className="mb-2 flex-grow-1 me-2">
                                                <label htmlFor="caretakerName" className="form-label">Story <span class="starMandatory">*</span></label>
                                                <div className="dropdown">
                                                    <button className="btn btn-light dropdown-toggle multi-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                                        Select Story
                                                    </button>
                                                    <ul className="dropdown-menu multistyl">
                                                        <li className="d-flex flex-row ps-1 gap-2">
                                                            {/* <input className="form-check-input" type="checkbox" id="selectAllDepartment" onChange={handleSelectAllDepartment} defaultChecked={isCheckedAssignDeptSlctAll === true ? true : false} />
                                                            <span>select All</span> */}
                                                        </li>
                                                        {getStoryList && getStoryList.map((val, index) => {
                                                            return (
                                                                <li className="d-flex flex-row ps-1 gap-2">
                                                                    <input value={val.id} className='departments' type="checkbox" id={'checkboxval' + val.id} defaultChecked={SearchIndex(getStoryArray, "id", val.id) !== "" ? true : false} name="departmentId" onClick={() => { handleAssignDepartment(val.id); }} />
                                                                    <span htmlFor="val.id">{val.wantAbleTo}{val.soThat}</span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="mb-2 flex-grow-1 me-2">
                                                <label htmlFor="startDate" className="form-label">Start Date<span className="starMandatory">*</span></label>
                                                <input type="date" className="form-control form-control-sm" value={getStartDate} onChange={handleTextboxChangeStartDate} id="txtstartDate" name="startDate" placeholder='Enter Start Date' />
                                            </div>
                                            <div className="mb-2 flex-grow-1 me-2">
                                                <label htmlFor="endDate" className="form-label">End Date<span className="starMandatory">*</span></label>
                                                <input type="date" className="form-control form-control-sm" value={getEndDate} onChange={handleTextboxChangeEndDate} id="txtendDate" name="endDate" placeholder='Enter End Date' />
                                            </div>
                                            {/* -------------------------------------End MultiCheckDropdown--------------------------- */}



                                            <div className="mb-2 relative">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                <div>
                                                    {getSaveUpdateBool === 0 ?
                                                        <>
                                                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={SaveSprintMaster} ><img src={save} className='icnn' />Save</button>
                                                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTextValues}><img src={reset} className='icnn' /> Clear</button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={UpdateSprintMaster} ><img src={save} className='icnn' />Update</button>
                                                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTextValues}><img src={reset} className='icnn' /> Clear</button>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            {/* <div className="med-box">
                                <div className="title">Sprint Master List</div>
                            </div> */}
                            <div className='handlser'>
                                <Heading text="Sprint Master List" />
                                <div style={{ position: 'relative' }}>
                                    <input value={searchInput} onChange={handleOnChange} name="searchBox" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "77vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Project</th>
                                            {/* <th>Project Type</th> */}
                                            <th>Story</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getSprintList && getSprintList.filter((val) => `${reformatDateString(val.startDate)} ${reformatDateString(val.endDate)} ${val.projectName} ${val.wantAbleTo + ' ' + val.soThat}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{reformatDateString(val.startDate)}</td>
                                                    <td>{reformatDateString(val.endDate)}</td>
                                                    <td>{val.projectName}</td>
                                                    {/* <td>{val.projectType}</td> */}
                                                    <td>{val.wantAbleTo + ' ' + val.soThat}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" ><span className='btnbg' style={{ background: "#FFEDD2" }} onClick={() => { EditSprintMaster(val.sprintID, val.startDate, val.endDate, val.sprintStoryID, val.projectID, val.moduleID, val.storyID) }}><img src={editbtn} className='' /></span></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal"><span className='btnbg' style={{ background: "#FFEFEF" }} onClick={() => { setId(val.sprintID); setSprintStoryID(val.sprintStoryID) }}><img src={delbtn} className='icnn' /></span></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                { /* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">
                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> Delete?</div>
                                                <div className='popDeleteContent'> Are you sure you want to delete?</div>
                                            </div>
                                            <div className="modal-footer1 text-center">
                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={DeleteSprintMaster} data-bs-dismiss="modal">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
                            </div>
                        </div>
                    </div>
                </div>
                {showToster === 1 ? <SuccessToster message={message} handle={setShowToster} /> : ""}
                {showToster === 2 ? <WarningToaster message={message} handle={setShowToster} /> : ""}
                {showToster === 3 ? <AlertToster message={message} handle={setShowToster} /> : ""}
            </section>
            <Loder val={loder} />
        </>
    )
}
