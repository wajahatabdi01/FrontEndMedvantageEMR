import React, { useState, useEffect } from 'react'
//import GetProjectType from '../API/ProjectTypeMaster/GetProjectTypeMaster'
//import GetProjectMaster from '../API/ProjectMaster/GetProjectMaster'
import GetStory from '../API/StoryMaster/GetStory'
import GetModuleByProjectUser from '../API/ModuleMaster/GetModuleByProjectUser'
import SaveStory from '../API/StoryMaster/SaveStory'
import GetStatusPriority from '../API/StatusMaster/GetStatusPriority'
import UpdateStory from '../API/StoryMaster/UpdateStory'
import DeleteStory from '../API/StoryMaster/DeleteStory'
import GetProjectByUser from '../API/ProjectMaster/GetProjectByUser'
import SuccessToster from '../../Component/SuccessToster'
import WarningToaster from '../../Component/WarningToaster'
import AlertToster from '../../Component/AlertToster'
import Loder from '../../Component/Loader'
import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'
import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";
import Heading from '../../Component/Heading'



export default function StoryMaster() {

    let [getStoryMasterList, setStoryMasterList] = useState([])
    let [getProjectList, setProjectList] = useState([])
    //let [getProjectTypeList, setProjectTypeList] = useState([])
    let [getStatusPriorityList, setStatusPriorityList] = useState([])
    let [getModuleByProjectList, setModuleByProjectList] = useState([])

    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")

    const [getSelectedOptionProject, setSelectedOptionProject] = useState('');
    //const [getSelectedOptionProjectType, setSelectedOptionProjectType] = useState('');
    const [getSelectedOptionModule, setSelectedOptionModule] = useState('');
    const [getSelectedOptionPriority, setSelectedOptionPriority] = useState('');
    const [getWantToAble, setWantToAble] = useState('');
    const [getSoThat, setSoThat] = useState('');
    const [getAppURL, setAppURL] = useState('');
    const [getWebURL, setWebURL] = useState('');
    const [getRemark, setRemark] = useState('');
    const [getRowID, setRowID] = useState('');
    const [searchInput, setSearchInput] = useState('');

    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)

    const funGetStory = async () => {
        let getResult = await GetStory(window.userId)
        setLoder(1);
        if (getResult.status === 1) {
            setLoder(0);
            setStoryMasterList(getResult.responseValue);
        }
        else {
            setLoder(0);
            setStoryMasterList(getResult.responseValue);
        }

    };


    let funGetProject = async () => {
        let getResult = await GetProjectByUser(window.userId)

        setProjectList(getResult.responseValue);
    }

    // let funGetProjectType = async () => {
    //     let getResult = await GetProjectType()
    //     setProjectTypeList(getResult.responseValue);
    // }

    const SelectedOptionProjectHandler = async (event) => {
        setSelectedOptionProject(event.target.value);

        let projectID = document.getElementById('sldProject').value;

        let getResult = await GetModuleByProjectUser(projectID, window.userId)
        if (getResult.status === 1) {
            setModuleByProjectList(getResult.responseValue);
        }
    }
    let funGetStatusPriority = async () => {
        let getResult = await GetStatusPriority()
        setStatusPriorityList(getResult.responseValue);
    }


    // const SelectedOptionProjectType = async (event) => {
    //     setSelectedOptionProjectType(event.target.value);
    // }

    const SelectedOptionModule = async (event) => {
        setSelectedOptionModule(event.target.value);
    }
    const SelectedOptionPriority = async (event) => {
        setSelectedOptionPriority(event.target.value);
    }
    const handleTextboxChange = (event) => {
        if (event.target.name === "wantToAble") {
            setWantToAble(event.target.value);
        }
        else if (event.target.name === "soThat") {
            setSoThat(event.target.value)
        }
        else if (event.target.name === "appURL") {
            setAppURL(event.target.value)
        }
        else if (event.target.name === "webURL") {
            setWebURL(event.target.value)
        }
        else if (event.target.name === "remark") {
            setRemark(event.target.value)
        }
    };

    const SaveData = async () => {
        const getSelectedOptionProject = document.getElementById("sldProject").value;
        //const getSelectedOptionProjectType = document.getElementById("sldProjectType").value;
        const getSelectedOptionModule = document.getElementById("sldModule").value;
        const getWantToAble = document.getElementById("wantToAble").value;
        const getSoThat = document.getElementById("soThat").value;
        const getSelectedOptionPriority = document.getElementById("sldPriority").value;
        // const getAppURL = document.getElementById("appURL").value;
        // const getWebURL = document.getElementById("webURL").value;
        // const getRemark = document.getElementById("remark").value;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;

        if (getSelectedOptionProject === '0' || getSelectedOptionProject === undefined || getSelectedOptionProject === null || getSelectedOptionProject === "") {
            setMessage("Project not fill !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getSelectedOptionProjectType === '0' || getSelectedOptionProjectType === undefined || getSelectedOptionProjectType === null || getSelectedOptionProjectType === "") {
        //     setMessage("Project type not fill !")
        //     setShowToster(3)
        //     setLoder(0)

        // }
        else if (getSelectedOptionModule === '0' || getSelectedOptionModule === undefined || getSelectedOptionModule === null || getSelectedOptionModule === "") {
            setMessage("Module not fill !")
            setShowToster(3)
            setLoder(0)

        }
        else if (getWantToAble === '0' || getWantToAble === undefined || getWantToAble === null || getWantToAble === "") {
            setMessage("Want to able not fill !")
            setShowToster(3)
            setLoder(0)

        }
        else if (getWantToAble.trim().length === 0 || getWantToAble.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getSoThat === '0' || getSoThat === undefined || getSoThat === null || getSoThat === "") {
            setMessage("So that not fill !")
            setShowToster(3)
            setLoder(0)

        }
        else if (getSelectedOptionPriority === '0' || getSelectedOptionPriority === undefined || getSelectedOptionPriority === null || getSelectedOptionPriority === "") {
            setMessage("Priority not fill !")
            setShowToster(3)
            setLoder(0)

        }
        else if (getSoThat.trim().length === 0 || getSoThat.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (specialCharsRegex.test(getWantToAble)) {
        //     setMessage("Want to able contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (specialCharsRegex.test(getSoThat)) {
        //     setMessage("So that contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        else if (numbersRegex.test(getWantToAble)) {
            setMessage("Want to able contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        else if (numbersRegex.test(getSoThat)) {
            setMessage("So that contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        // else if (specialCharsRegex.test(getAppURL)) {
        //     setMessage("appURL contains special characters!");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (specialCharsRegex.test(getWebURL)) {
        //     setMessage("webURL contains special characters!");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (specialCharsRegex.test(getRemark)) {
        //     setMessage("remark contains special characters!");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        else {


            var obj = {
                ProjectId: getSelectedOptionProject,
                //ProjectTypeId: getSelectedOptionProjectType,
                ModuleId: getSelectedOptionModule,
                WantAbleTo: getWantToAble,
                SoThat: getSoThat,
                AppURL: getAppURL,
                WebURL: getWebURL,
                Remark: getRemark,
                priorityID: getSelectedOptionPriority,
                UserID: window.userId,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            let response = await SaveStory(obj);
            setLoder(1)
            if (response.status === 1) {
                setLoder(0);
                setMessage('Data save successfull !')
                setShowToster(1)
                setSaveUpdateBool(0)
                funGetStory()
                clearValues()
            }
            else {
                setLoder(0);
                setMessage(response.responseValue)
                setShowToster(2)
                setSaveUpdateBool(0)
                funGetStory()

            }
        }
    };

    const clearValues = async () => {
        setSaveUpdateBool(0);
        document.getElementById('sldProject').value = '0';
        //document.getElementById('sldProjectType').value = '0';
        document.getElementById('sldModule').value = '0';
        document.getElementById('sldPriority').value = '0';
        setSelectedOptionProject('');
        //setSelectedOptionProjectType('');
        setSelectedOptionModule('');
        setSelectedOptionPriority('');
        setWantToAble('');
        setSoThat('');
        setAppURL('');
        setWebURL('');
        setRemark('');
    };
//projectTypeId,
    const EditStory = async (Id, projectId,  moduleId, priorityID, wantAbleTo, soThat, webURL, appURL, remark) => {
        setSaveUpdateBool(1)
        console.log("moduleId", moduleId)

        document.getElementById('sldProject').value = projectId;
        //document.getElementById('sldProjectType').value = projectTypeId;
        document.getElementById('sldPriority').value = priorityID;
        setRowID(Id)
        setSelectedOptionProject(projectId);
        //setSelectedOptionProjectType(projectTypeId);
        setSelectedOptionModule(moduleId);
        setSelectedOptionPriority(priorityID);
        setWantToAble(wantAbleTo);
        setSoThat(soThat);
        setAppURL(appURL);
        setWebURL(webURL);
        setRemark(remark);

        let getData = await GetModuleByProjectUser(projectId, window.userId);
        if (getData.status === 1) {
            setModuleByProjectList(getData.responseValue);
            //document.getElementById('sldModule').value = moduleId;//getModuleList[0].id;
        }

    }

    const funUpdateStory = async () => {
        const getSelectedOptionProject = document.getElementById("sldProject").value;
        //const getSelectedOptionProjectType = document.getElementById("sldProjectType").value;
        const getSelectedOptionModule = document.getElementById("sldModule").value;
        const getWantToAble = document.getElementById("wantToAble").value;
        const getSoThat = document.getElementById("soThat").value;
        const getSelectedOptionPriority = document.getElementById("sldPriority").value;
        // const getAppURL = document.getElementById("appURL").value;
        // const getWebURL = document.getElementById("webURL").value;
        // const getRemark = document.getElementById("remark").value;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;

        if (getSelectedOptionProject === '0' || getSelectedOptionProject === undefined || getSelectedOptionProject === null || getSelectedOptionProject === "") {
            setMessage("Project not fill !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getSelectedOptionProjectType === '0' || getSelectedOptionProjectType === undefined || getSelectedOptionProjectType === null || getSelectedOptionProjectType === "") {
        //     setMessage("Project type not fill !")
        //     setShowToster(3)
        //     setLoder(0)

        // }
        else if (getSelectedOptionModule === '0' || getSelectedOptionModule === undefined || getSelectedOptionModule === null || getSelectedOptionModule === "") {
            setMessage("Module not fill !")
            setShowToster(3)
            setLoder(0)

        }
        else if (getWantToAble === '0' || getWantToAble === undefined || getWantToAble === null || getWantToAble === "") {
            setMessage("Want to able not fill !")
            setShowToster(3)
            setLoder(0)

        }
        else if (getWantToAble.trim().length === 0 || getWantToAble.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getSoThat === '0' || getSoThat === undefined || getSoThat === null || getSoThat === "") {
            setMessage("So that not fill !")
            setShowToster(3)
            setLoder(0)

        }
        else if (getSelectedOptionPriority === '0' || getSelectedOptionPriority === undefined || getSelectedOptionPriority === null || getSelectedOptionPriority === "") {
            setMessage("Priority not fill !")
            setShowToster(3)
            setLoder(0)

        }
        else if (getSoThat.trim().length === 0 || getSoThat.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (specialCharsRegex.test(getWantToAble)) {
        //     setMessage("Wan to able contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (specialCharsRegex.test(getSoThat)) {
        //     setMessage("So that contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (numbersRegex.test(getWantToAble)) {
        //     setMessage("Want to able contains numbers !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (numbersRegex.test(getSoThat)) {
        //     setMessage("So that contains numbers !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (specialCharsRegex.test(getAppURL)) {
        //     setMessage("appURL contains special characters!");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (specialCharsRegex.test(getWebURL)) {
        //     setMessage("webURL contains special characters!");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (specialCharsRegex.test(getRemark)) {
        //     setMessage("remark contains special characters!");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        else {
            var obj = {
                Id: getRowID,
                projectId: getSelectedOptionProject,
                //projectTypeId: getSelectedOptionProjectType,
                moduleId: document.getElementById('sldModule').value,
                priorityID: getSelectedOptionPriority,
                wantAbleTo: getWantToAble,
                soThat: getSoThat,
                appURL: getAppURL,
                webURL: getWebURL,
                remark: getRemark,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
                //userID: window.userId
            }
            let result = await UpdateStory(obj);
            setLoder(1);
            if (result.status === 1) {
                setLoder(0);
                setMessage('Data update successfull !')
                setShowToster(1)
                setSaveUpdateBool(0)
                funGetStory()
                clearValues()
            }
            else {
                setLoder(0);
                setMessage(result.responseValue)
                setShowToster(2)
                funGetStory()
            }
        }
    }

    let funDeleteStory = async () => {
        var obj = {
            Id: getRowID,
        }
        let result = await DeleteStory(obj);
        setLoder(1);
        if (result.status === 1) {
            setLoder(0);
            setMessage('Data delete successfull !')
            setShowToster(1)
            funGetStory()
            clearValues()
        }
        else {
            setLoder(0);
            setMessage(result.responseValue)
            setShowToster(2)
            funGetStory()
        }
    }
    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }

    useEffect(() => {
        funGetStory()
        funGetProject()
        //funGetProjectType()
        funGetStatusPriority()
    }, [])

    return (
        <>
            <section className="main-content pt-3 mt-5">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Add Story </div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="projectName" className="form-label">Project<span className="starMandatory">*</span></label>
                                            <select name='widgetId' id="sldProject" onChange={SelectedOptionProjectHandler} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Project</option>
                                                {getProjectList && getProjectList.map((val, index) => {
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
                                            <label htmlFor="projectName" className="form-label">Module<span className="starMandatory">*</span></label>
                                            <select name='widgetId' value={getSelectedOptionModule} id="sldModule" onChange={SelectedOptionModule} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Module</option>
                                                {getModuleByProjectList && getModuleByProjectList.map((val, index) => {
                                                    return (
                                                        <option value={val.id}>{val.moduleName}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-2 col-md-4 flex-grow-1 me-2">
                                            <label htmlFor="projectName" className="form-label">I want to able to<span className="starMandatory">*</span></label>
                                            <input type="text" name='wantToAble' id='wantToAble' title='Example : Create Registration page' onChange={handleTextboxChange} value={getWantToAble} className="form-control form-control-sm" placeholder='Enter Able To' />
                                        </div>
                                        <div className="mb-2 col-md-4 flex-grow-1 me-2">
                                            <label htmlFor="projectName" className="form-label">So that<span className="starMandatory">*</span></label>
                                            <input type="text" name='soThat' id='soThat' title='Example : User can Register here' onChange={handleTextboxChange} value={getSoThat} className="form-control form-control-sm" placeholder='Enter So That' />
                                        </div>
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="projectName" className="form-label">App URL</label>
                                            <input type="text" name='appURL' id='appURL' onChange={handleTextboxChange} value={getAppURL} className="form-control form-control-sm" placeholder='Enter App URL' />
                                        </div>
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="projectName" className="form-label">Web URL</label>
                                            <input type="text" name='webURL' id='webURL' onChange={handleTextboxChange} value={getWebURL} className="form-control form-control-sm" placeholder='Enter Web URL' />
                                        </div>
                                        <div className="mb-2 flex-grow-1 col-md-4 me-2">
                                            <label htmlFor="projectName" className="form-label">Remark</label>
                                            <input type="text" name='remark' id='remark' onChange={handleTextboxChange} value={getRemark} className="form-control form-control-sm" placeholder='Enter Remark' />
                                        </div>
                                        <div className="mb-2 col-md-2 me-2">
                                            <label htmlFor="projectName" className="form-label">Priority<span className="starMandatory">*</span></label>
                                            <select name='widgetId' id="sldPriority" onChange={SelectedOptionPriority} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Priority</option>
                                                {getStatusPriorityList && getStatusPriorityList.map((val, index) => {
                                                    return (
                                                        <option value={val.id}>{val.statusText}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={SaveData}><img src={save} className='icnn'/>Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearValues}><img src={reset} className='icnn'/> Clear</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funUpdateStory}><img src={save} className='icnn'/>Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearValues}><img src={reset} className='icnn'/> Clear</button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            {/* <div className="med-box">
                                <div className="title">Story List</div>
                            </div> */}
                            <div className='handlser'>
                                <Heading text="Story List" />
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
                                            <th>Project</th>
                                            {/* <th>Project Type</th> */}
                                            <th>Module</th>
                                            <th>Story</th>
                                            <th>Remark</th>
                                            <th>Web URL</th>
                                            <th>App URL</th>
                                            <th>Priority</th>
                                            {/* <th>Backlog Status</th> */}
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getStoryMasterList && getStoryMasterList.filter((val)=>`${val.projectName} ${val.moduleName} ${val.wantAbleTo + ' ' + val.soThat} ${val.prioprity}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {

                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.projectName}</td>
                                                    {/* <td>{val.projectType}</td> */}
                                                    <td>{val.moduleName}</td>
                                                    <td>{val.wantAbleTo + ' ' + val.soThat}</td>
                                                    <td>{val.remark}</td>
                                                    <td>{val.webURL}</td>
                                                    <td>{val.appURL}</td>
                                                    <td>{val.prioprity}</td>
                                                    {/* <td>{val.backlogStatus}</td> */}
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { EditStory(val.id, val.projectId, val.moduleID, val.priorityID, val.wantAbleTo, val.soThat, val.webURL, val.appURL, val.remark) }}><span className='btnbg'  style={{ background: "#FFEDD2" }}> <img src={editbtn} className=''/></span></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal" ><span className='btnbg' style={{ background: "#FFEFEF" }} onClick={() => { setRowID(val.id) }}><img src={delbtn} className='icnn'/></span></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={funDeleteStory} data-bs-dismiss="modal">Delete</button>
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
