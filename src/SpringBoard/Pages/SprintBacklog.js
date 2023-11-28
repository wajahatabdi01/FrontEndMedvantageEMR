import React, { useState, useEffect } from 'react'
import GetSprintBAcklogStatus from '../API/SprintBacklog/GetSprintBacklogStatus'
import GetSprint from '../API/SprintMaster/GetSprint'
import GetUser from '../API/OutsideAPI/GetUser'
import GetStory from '../API/StoryMaster/GetStory'
import SaveSprintBacklog from '../API/SprintBacklog/SaveSprintBacklog'
import GetSprintBacklogNotStart from '../API/SprintBacklog/GetSprintBacklogNotStart'
import GetSprintBacklogProgerssHold from '../API/SprintBacklog/GetSprintBacklogProgerssHold'
import GetSprintBacklogComplete from '../API/SprintBacklog/GetSprintBacklogComplete'
import DeleteSprintBacklog from '../API/SprintBacklog/DeleteSprintBacklog'
import UpdateSprintBacklog from '../API/SprintBacklog/UpdateSprintBacklog'
import UpdateStatusSprintBacklog from '../API/SprintBacklog/UpdateStatusSprintBacklog'
import GetProjectByUser from '../API/ProjectMaster/GetProjectByUser'
import GetModuleByProjectUser from '../API/ModuleMaster/GetModuleByProjectUser'
import GetStoryByModule from '../API/StoryMaster/GetStoryByModule'
import SuccessToster from '../../Component/SuccessToster'
import WarningToaster from '../../Component/WarningToaster'
import AlertToster from '../../Component/AlertToster'
import Loder from '../../Component/Loader'
import GetAssignProject from '../API/AssignProject/GetAssignProject'
import UpdateHoldStartSprintBacklog from '../API/SprintBacklog/UpdateHoldStartSprintBacklog'
import GetSprintByUserProject from '../API/SprintMaster/GetSprintByUserProject'
import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'
import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";
import Heading from '../../Component/Heading'
import TaskIsverifyByTL from '../API/SprintBacklog/TaskIsVerifyByTL'


export default function SprintBacklog() {
    let [getProjectAssignList, setProjectAssignList] = useState([])

    let [getId, setId] = useState('')
    let [getSprintBacklogListNotStart, setSprintBacklogListNotStart] = useState([])
    let [getSprintBacklogListProgerssHold, setSprintBacklogListProgerssHold] = useState([])
    let [getSprintBacklogListComplete, setSprintBacklogListComplete] = useState([])
    let [getStoryList, setStoryList] = useState([])
    let [getSprintList, setSprintList] = useState([])
    let [getAssignedToList, setAssignedToList] = useState([])
    let [getSprintBacklogStatusList, setSprintBacklogStatusList] = useState([])
    let [getProjectMasterLit, setProjectMasterList] = useState([])
    let [getModuleByProjectList, setModuleByProjectList] = useState([])
    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)

    const [getSelectedOptionProject, setSelectedOptionProject] = useState('');
    const [getSelectedOptionModule, setSelectedOptionModule] = useState('');
    let [getStoryDLL, setStoryDLL] = useState('')
    let [getSprintDLL, setSprintDLL] = useState('')
    let [getSprintBacklogText, setSprintBacklogText] = useState('')
    let [getSprintBacklogTextNotification, setSprintBacklogTextNotification] = useState('')
    let [getFileUploadedPath, setFileUploadPath] = useState('')
    let [getAssignedToDLL, setAssignedToDLL] = useState('')
    let [getEstimatedHourText, setEstimatedHourText] = useState('')
    let [getSprintStatusIDDLL, setSprintStatusIDDLL] = useState('')
    let [getLoginUserID, setLoginUserID] = useState('')
    let [getIsHoldStart, setIsHoldStart] = useState(0)
    const [searchInput, setSearchInput] = useState('');
    let [getProjectName, setProjectName] = useState('')
    //let[getModuleDLL,setModuleDLL]=useState('')
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionProjectName, setSelectedOptionProjectName] = useState(null);
    let [getAssignedByID, setAssignedByID] = useState('')
    let [getAssignedByName, setAssignedByName] = useState('')
    let [getAssignedToName, setAssignedToName] = useState('')
    let [getBacklogStatusID, setBacklogStatusID] = useState('')
    let [getTaskHoldRemark, setTaskHoldRemark] = useState('')
    let [getShowTaskHoldRemark, setShowTaskHoldRemark] = useState('')
    let [getIsVerifyByTL, setIsVerifyByTL] = useState('')
    let [getAssignedDate, setAssignedDate] = useState('')


    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    const [isChecked, setIsChecked] = useState(true);
    const [isCheckedVerify, setIsCheckedVerify] = useState(true);
    let userID = JSON.parse(window.sessionStorage.getItem('LoginData')).userId;

    let funGetSprintBacklogNotStart = async () => {
        let getResult = await GetSprintBacklogNotStart(userID);
        setLoder(1);
        if (getResult.status === 1) {
            setLoder(0);
            setSprintBacklogListNotStart(getResult.responseValue)
        }
        else {
            setLoder(0);
            setSprintBacklogListNotStart(getResult.responseValue)
        }
    }
    let funGetSprintBacklogProgerssHold = async () => {
        let getResult = await GetSprintBacklogProgerssHold(userID);
        setLoder(1);
        if (getResult.status === 1) {
            setLoder(0);
            setSprintBacklogListProgerssHold(getResult.responseValue)
        }
        else {
            setLoder(0);
            setSprintBacklogListProgerssHold(getResult.responseValue)
        }
    }
    let funGetSprintBacklogComplete = async () => {
        let getResult = await GetSprintBacklogComplete(userID);
        setLoder(1);
        if (getResult.status === 1) {
            setLoder(0);
            setSprintBacklogListComplete(getResult.responseValue)
        }
        else {
            setLoder(0);
            setSprintBacklogListComplete(getResult.responseValue)
        }
    }

    const SelectedOptionProjectHandler = async (event) => {
        setSelectedOptionProject(event.target.value);

        const ProjectId = document.getElementById('sldProject').value;
        let getResult = await GetSprintByUserProject(ProjectId, window.userId)
        if (getResult.status === 1) {
            setModuleByProjectList(getResult.moduleLists);
            setAssignedToList(getResult.userList)
        }
        const selectedProjectName = event.target.options[event.target.selectedIndex];
        setSelectedOptionProjectName(selectedProjectName);
    }

    const SelectedOptionModuleHandler = async (event) => {
        setSelectedOptionModule(event.target.val);
        const moduleID = document.getElementById('sldstoryID').value;
        let getResult = await GetStoryByModule(moduleID)
        if (getResult.status === 1) {
            setStoryList(getResult.responseValue);
        }
    }
    let funGetAllProjectMaster = async () => {
        let getResult = await GetProjectByUser(window.userId)
        setProjectMasterList(getResult.responseValue)
    }
    // let funGetStory=async()=>{
    //     let getResult=await GetStory();
    //     setStoryList(getResult.responseValue)
    // }
    let funGetSprint = async () => {
        let getResult = await GetSprint(window.userId);
        setSprintList(getResult.responseValue);
    }
    // let funGetAssignedTo=async()=>{
    //     let getResult=await GetUser();
    //     setAssignedToList(getResult.responseValue)
    // }
    let funGetSprintBacklogStatus = async () => {
        let getResult = await GetSprintBAcklogStatus();
        setSprintBacklogStatusList(getResult.responseValue);

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


    let SaveSprintBacklogData = async () => {
        const getProject = document.getElementById("sldProject").value;
        const getSelectedOptionModule = document.getElementById("sldstoryID").value;

        const getSprintBacklogText = document.getElementById("txtsprintBacklogText").value;
        const getAssignedToDLL = document.getElementById("sldassignedTo").value;
        //const getAssignedToDLLName//= document.getElementById("sldassignedTo").innerText;
        //if (selectedOption) {
        const getAssignedToDLLName = selectedOption.text;
        const getProjectName=selectedOptionProjectName.text;
        //console.log('Selected AssignName:', getAssignedToDLLName);
        //console.log('Selected project:', getProjectName);
        //}
        const getEstimatedHourText = document.getElementById("txtestimatedHour").value;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;
        const isPositiveNumber = /^\d+(\.\d+)?$/.test(getEstimatedHourText);
        if (getProject === '0' || getProject === undefined || getProject === null || getProject === "") {
            setMessage("Project not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getSelectedOptionModule === '0' || getSelectedOptionModule === undefined || getSelectedOptionModule === null || getSelectedOptionModule === "") {
            setMessage("Story not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getSprintBacklogText === '0' || getSprintBacklogText === undefined || getSprintBacklogText === null || getSprintBacklogText === "") {
            setMessage("Sprint backlog not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getSprintBacklogText.trim().length === 0 || getSprintBacklogText.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }

        else if (getAssignedToDLL === '0' || getAssignedToDLL === undefined || getAssignedToDLL === null || getAssignedToDLL === "") {
            //alert('sprint backlog not fill !');
            setMessage("Assigned to not fill !")
            setShowToster(3)
            setLoder(0)
        }

        else if (getEstimatedHourText === '0' || getEstimatedHourText === undefined || getEstimatedHourText === null || getEstimatedHourText === "") {
            //alert('estimate hour not fill !');
            setMessage("Estimate hour not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getEstimatedHourText.trim().length === 0 || getEstimatedHourText.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        else if (!isPositiveNumber) {
            //setMessage("Estimated hour should be a positive number.");
            setMessage("Estimated hour positive number not string or negative number !");
            setShowToster(3)
            setLoder(0)
        }
        // else if (specialCharsRegex.test(getSprintBacklogText)) {
        //     setMessage("Sprint backlog contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        else if (numbersRegex.test(getSprintBacklogText)) {
            setMessage("Sprint backlog contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        else if (specialCharsRegex.test(getEstimatedHourText)) {
            setMessage("Estimated hour contains special characters or negative value !");
            setShowToster(3);
            setLoder(0);
        }
        else {
            var obj = {
                storyID: getSelectedOptionModule,
                sprintBacklogText: getSprintBacklogText,
                fileUploadedPath: '/testfilepath',
                assignedTo: getAssignedToDLL,
                estimatedHour: getEstimatedHourText,
                backlogStatusID: 12,
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId,
                userName: JSON.parse(window.sessionStorage.getItem('LoginData')).name,
                AssignedToname: getAssignedToDLLName,
                projectName:getProjectName,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            //return
            let result = await SaveSprintBacklog(obj);
            setLoder(1)
            if (result.status === 1) {
                setLoder(0);
                setMessage('Data save successfully !')
                setShowToster(1)
                funGetSprintBacklogNotStart();
                setSaveUpdateBool(0);
                clearTextValues();

            }
            else {
                setLoder(0);
                setMessage(result.responseValue)
                setShowToster(2)
                funGetSprintBacklogNotStart();
                setSaveUpdateBool(0);
            }
        }
    }
    let funDeleteSprintBacklog = async () => {
        var obj = {
            Id: getId,
        }
        let result = await DeleteSprintBacklog(obj)
        setLoder(1)
        if (result.status === 1) {
            setLoder(0)
            setMessage('Data delete successfully !')
            setShowToster(1)
            funGetSprintBacklogNotStart();
            clearTextValues();
        }
        else {
            setLoder(0)
            setMessage(result.responseValue)
            setShowToster(2)
            funGetSprintBacklogNotStart();
        }
    }

    let funUpdateStatusSprintBacklog = async () => {
        const getSprintStatusIDDLL = document.getElementById("sldbacklogStatusID").value;
        //const getTaskHoldRemark = document.getElementById("txtTaskHoldRemark").value;

        if (getSprintStatusIDDLL === '0' || getSprintStatusIDDLL === undefined || getSprintStatusIDDLL === null || getSprintStatusIDDLL === "") {
            setMessage("Status not fill !")
            setShowToster(3)
            setLoder(0)
        }
        //    else if(getSprintStatusIDDLL==='13')
        //     {
        //         if (getTaskHoldRemark === '0' || getTaskHoldRemark === undefined || getTaskHoldRemark === null || getTaskHoldRemark === "") {
        //             setMessage("Remark not fill !")
        //             setShowToster(3)
        //             setLoder(0)
        //         }
        //     }
        else {
            var obj = {
                Id: getId,
                backlogStatusID: getSprintStatusIDDLL,
                sprintBacklogText: getSprintBacklogTextNotification,
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId,
                AssignedByID: getAssignedByID,
                AssignedByName: getAssignedByName,
                AssignedToName: getAssignedToName,
                projectName: getProjectName,
                assignedDate: getAssignedDate,
                TaskHoldRemark: getTaskHoldRemark,

            }
            //console.log('Object Data',obj);
            //return;
            let result = await UpdateStatusSprintBacklog(obj)
            //console.log('Result', result)
            setLoder(1)
            if (result.status === 1) {
                setLoder(0)
                setMessage('Status update successfully !')
                setShowToster(1)
                funGetSprintBacklogNotStart();
                funGetSprintBacklogProgerssHold();
                funGetSprintBacklogComplete();
            }
            else {
                setLoder(0)
                setMessage(result.responseValue)
                setShowToster(2)
                funGetSprintBacklogNotStart();
                funGetSprintBacklogProgerssHold();
                funGetSprintBacklogComplete();
            }
        }
    }

    let EditSprintBackLogMaster = async (Id, storyID, sprintBacklogText, assignedTo, estimatedHour, projectId) => {
        console.log("storyID", storyID);
        setId(Id);
        setSprintBacklogText(sprintBacklogText);
        setAssignedToDLL(assignedTo);
        setEstimatedHourText(estimatedHour)
        setSelectedOptionProject(projectId);
        setSelectedOptionModule(storyID);
        setSaveUpdateBool(1);


        let getResult = await GetSprintByUserProject(projectId, window.userId)
        console.log("getResult", getResult);
        if (getResult.status === 1) {
            setModuleByProjectList(getResult.moduleLists);
            setAssignedToList(getResult.userList)
        }
    }
    let funUpdateSprintBacklog = async () => {
        const getProject = document.getElementById("sldProject").value;
        const getStoryDLL = document.getElementById("sldstoryID").value;
        const getSprintBacklogText = document.getElementById("txtsprintBacklogText").value;
        const getAssignedToDLL = document.getElementById("sldassignedTo").value;
        const getEstimatedHourText = document.getElementById("txtestimatedHour").value;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;
        const isPositiveNumber = /^\d+(\.\d+)?$/.test(getEstimatedHourText);
        const getAssignedToDLLName = selectedOption.text;
        const getProjectName=selectedOptionProjectName.text;
        if (!isPositiveNumber) {
            console.log('isPositiveNumber', isPositiveNumber);
            setMessage("Estimated hour should be a positive number !");
            setShowToster(3)
            setLoder(0)
        }
        else if (getProject === '0' || getProject === undefined || getProject === null || getProject === "") {
            setMessage("Project not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getStoryDLL === '0' || getStoryDLL === undefined || getStoryDLL === null || getStoryDLL === "") {
            setMessage("Story not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getSprintBacklogText === '0' || getSprintBacklogText === undefined || getSprintBacklogText === null || getSprintBacklogText === "") {
            setMessage("Sprint backlog not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getSprintBacklogText.trim().length === 0 || getSprintBacklogText.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }

        else if (getAssignedToDLL === '0' || getAssignedToDLL === undefined || getAssignedToDLL === null || getAssignedToDLL === "") {
            setMessage("Assigned to not fill !")
            setShowToster(3)
            setLoder(0)
        }

        else if (getEstimatedHourText === '0' || getEstimatedHourText === undefined || getEstimatedHourText === null || getEstimatedHourText === "") {
            setMessage("Estimate hour not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getEstimatedHourText.trim().length === 0 || getEstimatedHourText.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (specialCharsRegex.test(getSprintBacklogText)) {
        //     setMessage("Sprint backlog contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        else if (numbersRegex.test(getSprintBacklogText)) {
            setMessage("Sprint backlog contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        else if (specialCharsRegex.test(getEstimatedHourText)) {
            setMessage("Estimated hour contains special characters or negative value !");
            setShowToster(3);
            setLoder(0);
        }
        else {
            var obj = {
                Id: getId,
                storyID: getStoryDLL,
                SprintBacklogtext: getSprintBacklogText,
                fileUploadedPath: '/abctest',
                assignedTo: getAssignedToDLL,
                estimatedHour: getEstimatedHourText,
                backlogStatusID: 12,
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId,
                userName: JSON.parse(window.sessionStorage.getItem('LoginData')).name,
                AssignedToname: getAssignedToDLLName,
                projectName:getProjectName,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            let result = await UpdateSprintBacklog(obj);
            setLoder(1)
            if (result.status === 1) {
                setLoder(0)
                setMessage('Data update successfully !')
                setShowToster(1)
                funGetSprintBacklogNotStart();
                funGetSprintBacklogProgerssHold();
                funGetSprintBacklogComplete();
                clearTextValues();
                setSaveUpdateBool(0);
            }
            else {
                setLoder(0)
                setMessage(result.responseValue)
                setShowToster(2)
                funGetSprintBacklogNotStart();
                funGetSprintBacklogProgerssHold();
                funGetSprintBacklogComplete();
            }
        }
    }

    let handleTextboxChangeSprint = (event) => {
        if (event.target.name === "sprintID") {
            setSprintDLL(event.target.value);
        }
    }
    let handleTextboxChangeSprintBacklogText = (event) => {
        if (event.target.name === "sprintBacklogText") {
            setSprintBacklogText(event.target.value);
        }
    }
    let handleTextboxChangeFileUpload = (event) => {
        if (event.target.name === "fileUploadedPath") {
            setFileUploadPath(event.target.value);
        }
    }
    let handleTextboxChangeAssignedTo = (event) => {
        if (event.target.name === "assignedTo") {
            setAssignedToDLL(event.target.value);
        }
        const selectedOption = event.target.options[event.target.selectedIndex];
        setSelectedOption(selectedOption);
    }
    let handleTextboxChangeEstimatedHour = (event) => {
        if (event.target.name === "estimatedHour") {
            setEstimatedHourText(event.target.value);
        }
    }
    let handleTextboxChangeSprintStatusID = (event) => {
        if (event.target.name === "backlogStatusID") {
            setSprintStatusIDDLL(event.target.value);
        }
    }

    let handleTextboxChangeTaskHoldRemark = (event) => {
        if (event.target.name === "TaskHoldRemark") {
            setTaskHoldRemark(event.target.value);
        }
    }

    let clearTextValues = (event) => {
        setSprintDLL('');
        setSprintBacklogText('');
        setFileUploadPath('');
        setAssignedToDLL('');
        setEstimatedHourText('');
        setSprintStatusIDDLL('');
        setSelectedOptionProject('');
        setSelectedOptionModule('');
        setSaveUpdateBool(0);

    }
    const funUpdateHoldStart =async (id, backlogStatusID) => {
        setIsChecked(!isChecked);
        if (backlogStatusID === "13") {
            var obj = {
                id: id,
                backlogStatusID: 1
            }
            let result =await UpdateHoldStartSprintBacklog(obj)
            setLoder(1)
            if (result.status === 1) {
                setLoder(0)
            }
            else {
                setLoder(0)
            }
        }
        if (backlogStatusID === "1") {
            var obj = {
                id: id,
                backlogStatusID: 13
            }
            let result = UpdateHoldStartSprintBacklog(obj)

            setLoder(1)
            if (result.status === 1) {
                setLoder(0)
            }
            else {
                setLoder(0)
            }
        }
    };
    const funTaskVerifyByTL = async (id,backlogStatusID) => {
        setIsCheckedVerify(!isCheckedVerify);
        var obj = {
            id: id,
            backlogStatusID: backlogStatusID,
            IsVerifyByTL: isCheckedVerify
        }
        console.log('ObjDATAAAAAA',obj)
        //return;
        let result =await TaskIsverifyByTL(obj)
        //console.log('ResultData', result)
        setLoder(1)
        if (result.status === 1) {
            setLoder(0)
            setMessage('Task Verify successfully !')
            setShowToster(1)
            funGetSprintBacklogNotStart();
            funGetSprintBacklogProgerssHold();
            funGetSprintBacklogComplete();
        }
        else {
            setLoder(0)
            setMessage(result.responseValue)
            setShowToster(2)
            funGetSprintBacklogNotStart();
            funGetSprintBacklogProgerssHold();
            funGetSprintBacklogComplete();
        }
    }
    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }
    // const handleCheckboxChange = (event) => {
    //     setIsChecked(event.target.checked ? 1 : 0);
    // };
    useEffect(() => {
        //funGetAllAssignProject();
        setLoginUserID(window.userId);
        funGetSprintBacklogNotStart();
        funGetSprintBacklogProgerssHold();
        funGetSprintBacklogComplete();
        //funGetStory();
        funGetSprint();
        funGetSprintBacklogStatus();
        //funGetAssignedTo();
        funGetAllProjectMaster();

    }, [])
    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        {/* {getProjectAssignList && getProjectAssignList.map((val, ind) => {
                            if ((val.teamMembersId === window.userId && val.isTL === "1") || (val.teamMembersId === "99" && window.userId === "99")) {
                                return ( */}
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Add Sprint Backlog</div>
                                <div className="inner-content">

                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="projectName" className="form-label">Project<span className="starMandatory">*</span></label>
                                            <select name='projectId' id="sldProject" value={getSelectedOptionProject} onChange={SelectedOptionProjectHandler} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Project</option>
                                                {getProjectMasterLit && getProjectMasterLit.map((val, index) => {
                                                    return (
                                                        <option value={val.projectId}>{val.projectName}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-2 col-md-3 flex-grow-1 me-2">
                                            <label htmlFor="Module" className="form-label">Story<span className="starMandatory">*</span></label>
                                            <select name='moduleID' id="sldstoryID" value={getSelectedOptionModule} onChange={SelectedOptionModuleHandler} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Story</option>
                                                {getModuleByProjectList && getModuleByProjectList.map((val, index) => {
                                                    return (
                                                        <option value={val.storyID}>{val.wantAbleTo + ' ' + val.soThat}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>

                                        <div className="mb-2 col-md-5 flex-grow-1 me-2">
                                            <label htmlFor="SprintBacklogtext" className="form-label">Sprint Backlog Text<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="txtsprintBacklogText" name="sprintBacklogText" value={getSprintBacklogText} onChange={handleTextboxChangeSprintBacklogText} placeholder='Enter Sprint Backlog' />
                                        </div>
                                        {/* <div className="mb-2 me-2">
                                                        <label htmlFor="FileUpload" className="form-label">File Upload</label>
                                                        <input type="text" className="form-control form-control-sm" id="txtfileUploadedPath" name="fileUploadedPath" value={getFileUploadedPath} onChange={handleTextboxChangeFileUpload} placeholder='' />
                                                    </div> */}
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="AssignedTo" className="form-label">Assigned To<span className="starMandatory">*</span></label>
                                            <select name='assignedTo' id="sldassignedTo" value={getAssignedToDLL} onChange={handleTextboxChangeAssignedTo} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select User</option>
                                                {getAssignedToList && getAssignedToList.map((val, index) => {
                                                    return (
                                                        <option value={val.teamMembersId} key={index}>{val.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label htmlFor="Estimatehour" className="form-label">Estimate Hour<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="txtestimatedHour" name="estimatedHour" value={getEstimatedHourText} onChange={handleTextboxChangeEstimatedHour} placeholder='Enter Hour' style={{ 'max-width': '100px' }} />
                                        </div>

                                        {/* <div className="mb-2 me-2">
                                            <label htmlFor="sldStatus" className="form-label">Sprint Backlog Status</label>
                                            <select name='backlogStatusID' id="sldbacklogStatusID" value={getSprintStatusIDDLL} onChange={handleTextboxChangeSprintStatusID} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Status</option>
                                                {getSprintBacklogStatusList && getSprintBacklogStatusList.map((val, index) => {
                                                    return (
                                                        <option value={val.id}>{val.statusText}</option>
                                                    )
                                                })}
                                            </select>
                                        </div> */}

                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={SaveSprintBacklogData} ><img src={save} className='icnn' />Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTextValues} ><img src={reset} className='icnn' /> Clear</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funUpdateSprintBacklog}><img src={save} className='icnn' />Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTextValues} ><img src={reset} className='icnn' /> Clear</button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* )
                            }
                            else if (val.teamMembersId === window.userId && val.isTL === 0) {
                                return (
                                    <h1 style={{ display: 'none' }}></h1>
                                )
                            }
                        })} */}
                        <div className="col-12 mt-1">
                            {/* <div className="med-box">
                                <div className="title mb-2">Sprint Backlog List</div>
                            </div> */}
                            <div className='handlser'>
                                <Heading text="Sprint Backlog List" />
                                <div style={{ position: 'relative' }}>
                                    <input value={searchInput} onChange={handleOnChange} name="searchBox" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>


                            <nav className='navbg'>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-NotStarted" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => { funGetSprintBacklogNotStart() }}>Not Started</button>
                                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-WorkInProgress" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={() => { funGetSprintBacklogProgerssHold() }}>Work In Progress</button>
                                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-Completed" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={() => { funGetSprintBacklogComplete() }}>Completed</button>

                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-NotStarted" role="tabpanel" aria-labelledby="nav-NotStarted-tab" tabIndex="0">
                                    {/* <h3>Not Started</h3> */}
                                    <div className="med-table-section" style={{ "height": "77vh" }}>
                                        <table className="med-table border_ striped">
                                            <thead>

                                                <tr>
                                                    <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                                    <th>project</th>
                                                    <th>Story</th>
                                                    <th>Start Date</th>
                                                    <th>Due Date</th>
                                                    <th>Sprint backlog</th>
                                                    <th>Assigned To</th>
                                                    <th>EST Hour</th>
                                                    <th>Assign Date</th>
                                                    <th style={{ "width": "20%" }} className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getSprintBacklogListNotStart && getSprintBacklogListNotStart.filter((val) => `${val.projectName} ${val.story} ${reformatDateString(val.startDate)} ${val.sprintBacklogText} ${val.name} ${reformatDateString(val.endDate)} ${val.estimatedHour}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                                    //if (val.backlogStatusID === "12") {
                                                    return (
                                                        <tr key={val.id}>
                                                            <td className="text-center">{ind + 1}</td>
                                                            <td>{val.projectName}</td>
                                                            <td>{val.story}</td>
                                                            <td>{reformatDateString(val.startDate)}</td>
                                                            <td>{reformatDateString(val.endDate)}</td>
                                                            <td>{val.sprintBacklogText}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.estimatedHour}</td>
                                                            <td>{reformatDateString(val.assignDate)}</td>
                                                            <td>
                                                                <div className="action-button">
                                                                    <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" title="Update Status" data-bs-target="#statusUpdateModal" ><i className="btn btn-outline-success" onClick={() => { setId(val.id); setSprintBacklogTextNotification(val.sprintBacklogText); setAssignedByID(val.assignByID); setProjectName(val.projectName); setAssignedByName(val.assignByName); setAssignedToName(val.name); setAssignedDate(reformatDateString(val.assignDate)); }}>Update Status</i></div>
                                                                    <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { EditSprintBackLogMaster(val.id, val.storyID, val.sprintBacklogText, val.assignedTo, val.estimatedHour, val.projectId) }} ><span className='btnbg' style={{ background: "#FFEDD2" }}> <img src={editbtn} className='' /></span></div>
                                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal" ><span className='btnbg' style={{ background: "#FFEFEF" }} onClick={() => { setId(val.id) }}><img src={delbtn} className='icnn' /></span></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                    // }
                                                })}
                                            </tbody>
                                        </table>

                                    </div>


                                </div>



                                <div className="tab-pane fade" id="nav-WorkInProgress" role="tabpanel" aria-labelledby="nav-WorkInProgress-tab" tabIndex="0">
                                    {/* <h1>WorkInProgress</h1> */}
                                    <div className="med-table-section" style={{ "height": "77vh" }}>
                                        <table className="med-table border_ striped">
                                            <thead>

                                                <tr>
                                                    <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                                    <th>project</th>
                                                    <th>Story</th>
                                                    <th>Start Date</th>
                                                    <th>Due Date</th>
                                                    <th>Sprint backlog</th>
                                                    <th>Assigned To</th>
                                                    <th>EST Hour</th>
                                                    <th>Assign Date</th>
                                                    <th>Hold/Remark</th>
                                                    {/* <th>Remark</th> */}
                                                    <th style={{ "width": "15%" }} className="text-center">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getSprintBacklogListProgerssHold && getSprintBacklogListProgerssHold.filter((val) => `${val.projectName} ${val.story} ${reformatDateString(val.startDate)} ${val.sprintBacklogText} ${val.name} ${reformatDateString(val.endDate)} ${val.estimatedHour}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                                    return (
                                                        <tr key={val.id}>
                                                            <td className="text-center">{ind + 1}</td>
                                                            <td>{val.projectName}</td>
                                                            <td>{val.story}</td>
                                                            <td>{reformatDateString(val.startDate)}</td>
                                                            <td>{reformatDateString(val.endDate)}</td>
                                                            <td>{val.sprintBacklogText}</td>
                                                            <td>{val.name}</td>
                                                            <td>{val.estimatedHour}</td>
                                                            <td>{reformatDateString(val.assignDate)}</td>
                                                            <td>
                                                                <div className="form-check form-switch">
                                                                    {val.backlogStatusID === "13" ?
                                                                        <input className="form-check-input" name={ind} type="checkbox" role="switch" defaultChecked={isChecked} disabled onChange={() => { funUpdateHoldStart(val.id, val.backlogStatusID) }} /> :
                                                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled onChange={() => { funUpdateHoldStart(val.id, val.backlogStatusID) }} />
                                                                    }
                                                                    {val.backlogStatusID === "13" ?
                                                                        <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" title="View Task Hold Remark" data-bs-target="#showRemarkModal" onClick={() => { setId(val.id);setShowTaskHoldRemark(val.taskHoldRemark) }} ><span className='btnbg' style={{ background: "#FFEDD2" }}> <i className='fa fa-eye'></i></span></div> : <></>
                                                                    }
                                                                </div>
                                                            </td>
                                                            {/* <td>{val.taskHoldRemark}</td> */}
                                                            <td>
                                                                <div className="action-button">
                                                                    <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" title="Update Status" data-bs-target="#statusUpdateModal" ><i className="btn btn-outline-success" onClick={() => { setId(val.id); setSprintBacklogTextNotification(val.sprintBacklogText); setAssignedByID(val.assignByID); setBacklogStatusID(val.backlogStatusID); setProjectName(val.projectName); setAssignedByName(val.assignByName); setAssignedToName(val.name); setAssignedDate(val.assignDate); }}>Update Status</i></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>

                                    </div>

                                </div>


                                <div className="tab-pane fade" id="nav-Completed" role="tabpanel" aria-labelledby="nav-Completed-tab" tabIndex="0">
                                    {/* <h1>Completed</h1> */}
                                    <div className="med-table-section" style={{ "height": "77vh" }}>
                                        <table className="med-table border_ striped">
                                            <thead>

                                                <tr>
                                                    <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                                    <th>project</th>
                                                    <th>Story</th>
                                                    <th>Start Date</th>
                                                    <th>Due Date</th>
                                                    <th>Sprint backlog</th>
                                                    <th>Assigned To</th>
                                                    <th>EST Hour</th>
                                                    <th>Assign Date</th>
                                                    <th>Completed Date</th>
                                                    <th>Is Verify</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getSprintBacklogListComplete && getSprintBacklogListComplete.filter((val) => `${val.projectName} ${val.story} ${reformatDateString(val.startDate)} ${val.sprintBacklogText} ${val.name} ${reformatDateString(val.endDate)} ${val.estimatedHour}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                                    //console.log('CompletedList', getSprintBacklogListComplete);
                                                    return (
                                                        <tr key={val.id}>
                                                            <td className="text-center">{ind + 1}</td>
                                                            <td>{val.projectName}</td>
                                                            <td>{val.story}</td>
                                                            <td>{reformatDateString(val.startDate)}</td>
                                                            <td>{reformatDateString(val.endDate)}</td>
                                                            <td>{val.sprintBacklogText}</td>
                                                            <td>{val.name}</td>
                                                            <td className='text-center'>{val.estimatedHour}</td>
                                                            <td>{reformatDateString(val.assignDate)}</td>
                                                            <td>{reformatDateString(val.taskCompletedDate)}</td>
                                                            <td>
                                                                {<div className="form-check form-checkbox">
                                                                    {val.isVerifyByTL === "1" ?
                                                                        <input className="form-check-input" name={ind} type="checkbox" role="switch" disabled defaultChecked={isCheckedVerify} onChange={() => { funTaskVerifyByTL(val.id, val.backlogStatusID) }} /> :
                                                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => { funTaskVerifyByTL(val.id, val.backlogStatusID) }} />
                                                                    }
                                                                </div>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )

                                                })}
                                            </tbody>
                                        </table>

                                    </div>


                                </div>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={funDeleteSprintBacklog} data-bs-dismiss="modal">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

                                {/* -----------------------Start Status Update Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                <div className="modal fade" id="statusUpdateModal" tabIndex="-1" aria-labelledby="statusUpdateModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                {/* <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> Delete?</div>
                                                <div className='popDeleteContent'> Are you sure you want to delete?</div> */}
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="sldStatus" className="form-label">Sprint Backlog Status</label>
                                                    <select name='backlogStatusID' id="sldbacklogStatusID" value={getSprintStatusIDDLL} onChange={handleTextboxChangeSprintStatusID} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        <option value="0">Select Status</option>
                                                        {getSprintBacklogStatusList && getSprintBacklogStatusList.map((val, index) => {
                                                            return (
                                                                <option value={val.id}>{val.statusText}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="mb-2 me-2">
                                                    {getSprintStatusIDDLL === "13" ? (
                                                        <input type="text" className="form-control form-control-sm" id="txtTaskHoldRemark" name="TaskHoldRemark" value={getTaskHoldRemark} onChange={handleTextboxChangeTaskHoldRemark} placeholder='Enter Remark'
                                                        />
                                                    ) : null}

                                                </div>
                                            </div>
                                            <div className="modal-footer1 text-center">
                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={funUpdateStatusSprintBacklog} data-bs-dismiss="modal">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Status Update Modal Popup--------------------- /} */}

                                {/* -----------------------Start show remark Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                <div className="modal fade" id="showRemarkModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">
                                            <div className="modal-body modelbdy text-center">
                                                {/* <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> Delete?</div> */}
                                                {/* <div className='popDeleteContent'>Remark:  {getTaskHoldRemark}</div> */}
                                                <div className="mb-2 me-2">
                                                <label htmlFor="showremark" className="form-label">Remark : {getShowTaskHoldRemark}</label>
                                                </div>
                                            </div>
                                            <div className="modal-footer1 text-center">
                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">close</button>
                                                {/* <button type="button" className="btn-delete popBtnDelete" onClick={funDeleteSprintBacklog} data-bs-dismiss="modal">Delete</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End show remark Modal Popup--------------------- /} */}
                            </div>


                            {/* tabindex */}




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
