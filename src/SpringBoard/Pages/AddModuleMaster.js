
import React, { useState, useEffect } from 'react'
import GetProjectByUser from '../API/ProjectMaster/GetProjectByUser'
//import GetProjectType from '../API/ProjectTypeMaster/GetProjectTypeMaster'
import GetModule from '../API/ModuleMaster/GetModule'
import SaveModule from '../API/ModuleMaster/SaveModule'
import UpdateModule from '../API/ModuleMaster/UpdateModule'
import DeleteModule from '../API/ModuleMaster/DeleteModule'
import SuccessToster from '../../Component/SuccessToster'
import WarningToaster from '../../Component/WarningToaster'
import AlertToster from '../../Component/AlertToster'
import Loder from '../../Component/Loader'
import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'
import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";
import Heading from '../../Component/Heading'
import DropdownWithSearch from '../../Component/DropdownWithSearch'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

export default function AddModuleMaster() {

    let [getModuleList, setModuleList] = useState([])
    let [getProjectList, setProjectList] = useState([])
    //let [getProjectTypeList, setProjectTypeList] = useState([])
    let [getId, setId] = useState('')
    let [getModuleName, setModuleName] = useState('')
    const [getSelectedOptionProject, setSelectedOptionProject] = useState('');
    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)
    //const [getSelectedOptionProjectType, setSelectedOptionProjectType] = useState('');
    //let [getLoginUserID, setLoginUserID] = useState('')
    let [clearDropdown, setClearDropdown] = useState(0)
    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    const [searchInput, setSearchInput] = useState('');
    let [editProjectName, seteditProjectName] = useState("")
    const { t } = useTranslation();

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        console.log("name", name, "value", value)
        if (name === "projectID") {

            setSelectedOptionProject(value)
        }
        // else {

        //     setSelectedOptionUser(value)
        // }
    }

    const SelectedOptionProject = async (event) => {
        setSelectedOptionProject(event.target.value);
    }

    let funGetModule = async () => {
        let getResult = await GetModule(window.userId)
        setLoder(1)
        if (getResult.status === 1) {
            setLoder(0)
            setModuleList(getResult.responseValue);
        }

    }
    let funGetProject = async () => {
        let getResult = await GetProjectByUser(window.userId)
        console.log('listsssssssssss', getResult)
        setProjectList(getResult.responseValue);
    }
    // const SelectedOptionProjectType = async (event) => {
    //     setSelectedOptionProjectType(event.target.value);
    // }
    // let funGetProjectType = async () => {
    //     let getResult = await GetProjectType()
    //     setProjectTypeList(getResult.responseValue);
    // }

    const handleTextboxChange = (event) => {
        if (event.target.name === "moduleName") {
            setModuleName(event.target.value);
        }
    };

    const clearValues = (value) => {
        setSaveUpdateBool(0);
        setModuleName('');
        setClearDropdown(value)
        //document.getElementById('sldProject').value = '0';
        //document.getElementById('sldProjectType').value = '0';
        setSelectedOptionProject('');
        seteditProjectName("");
        //setSelectedOptionProjectType('');
    };

    let funSaveModule = async () => {
        const numbersRegex = /^[0-9]*$/;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const getModule = document.getElementById("txtModuleName").value;
        //const getSelectedOptionProject = document.getElementById("sldProject").value;
        //const getSelectedOptionProjectType = document.getElementById("sldProjectType").value;
        //console.log('PROJECTID',getSelectedOptionProject)
        if (getSelectedOptionProject === '0' || getSelectedOptionProject === undefined || getSelectedOptionProject === null || getSelectedOptionProject === "") {
            //alert('Fill Module !');
            setMessage("Fill project !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getSelectedOptionProjectType === '0' || getSelectedOptionProjectType === undefined || getSelectedOptionProjectType === null || getSelectedOptionProjectType === "") {
        //     setMessage("Fill project type !")
        //     setShowToster(3)
        //     setLoder(0)
        // }
        else if (getModule === '0' || getModule === undefined || getModule === null || getModule === "") {
            //alert('Fill Module !');
            setMessage("Fill module !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getModule.trim().length === 0 || getModule.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        else if (specialCharsRegex.test(getModule)) {
            setMessage("Module contains special characters !");
            setShowToster(3);
            setLoder(0);
        }
        else if (numbersRegex.test(getModule)) {
            setMessage("Module contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        else {
            var obj = {
                projectID: getSelectedOptionProject,
                //projectTypeID: getSelectedOptionProjectType,
                moduleName: getModule,
                userID: window.userId,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            setLoder(1)
            let response = await SaveModule(obj);
            if (response.status === 1) {
                setMessage("Data saved successfully !")
                setShowToster(1)
                setLoder(0)
                setSaveUpdateBool(0)
                funGetModule()
                clearValues(1)
            }
            else {
                setLoder(0);
                setMessage(response.responseValue)
                setShowToster(1)
                funGetModule()
            }
        }
    }
    //projectTypeID,
    let editModule = (Id, projectID, moduleName, projectName) => {
        setSaveUpdateBool(1)
        setId(Id);
        //document.getElementById('sldProject').value = projectID;
        //document.getElementById('sldProjectType').value = projectTypeID;
        setSelectedOptionProject(projectID)
        //setSelectedOptionProjectType(projectTypeID)
        setModuleName(moduleName);
        seteditProjectName(projectName);
    }

    let funUpdateModule = async () => {
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;
        const getModule = document.getElementById("txtModuleName").value;
        //const getSelectedOptionProject = document.getElementById("sldProject").value;
        //const getSelectedOptionProjectType = document.getElementById("sldProjectType").value;

        if (getSelectedOptionProject === '0' || getSelectedOptionProject === undefined || getSelectedOptionProject === null || getSelectedOptionProject === "") {
            //alert('Fill Module !');
            setMessage("Fill project !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getSelectedOptionProjectType === '0' || getSelectedOptionProjectType === undefined || getSelectedOptionProjectType === null || getSelectedOptionProjectType === "") {
        //     setMessage("Fill project type !")
        //     setShowToster(3)
        //     setLoder(0)
        // }
        else if (getModule === '0' || getModule === undefined || getModule === null || getModule === "") {
            //alert('Fill Module !');
            setMessage("Fill module !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getModule.trim().length === 0 || getModule.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        else if (specialCharsRegex.test(getModule)) {
            setMessage("Module contains special characters !");
            setShowToster(3);
            setLoder(0);
        }
        else if (numbersRegex.test(getModule)) {
            setMessage("Module contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        else {
            var obj = {
                Id: getId,
                projectId: getSelectedOptionProject,
                //projectTypeId: getSelectedOptionProjectType,
                moduleName: getModuleName,
                userID: window.userId,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            setLoder(1)
            let result = await UpdateModule(obj);
            if (result.status === 1) {
                setLoder(0)
                setMessage("Data update successfully !")
                setShowToster(1)
                setSaveUpdateBool(0)
                funGetModule()
                clearValues(1)
            }
            else {
                setMessage(result.responseValue)
                setShowToster(1)
                setLoder(0)
            }
        }
    }


    let funDeletedModule = async () => {
        var obj = {
            Id: getId,
        }
        setLoder(1)
        let result = await DeleteModule(obj);
        if (result.status === 1) {
            setLoder(0)
            setMessage("Data delete successfully !")
            setShowToster(1)
            clearValues()
            funGetModule()
        }
        else {
            setMessage(result.responseValue)
            setShowToster(1)
            setLoder(0)
        }
    }
    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }

    useEffect(() => {
        //setLoginUserID(window.userId);
        funGetProject()
        //funGetProjectType()
        funGetModule()
    }, [])

    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Add Module</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="moduleName" className="form-label">Project<span className="starMandatory">*</span></label>
                                            {/* <select name='widgetId' id="sldProject" onChange={SelectedOptionProject} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Project</option>
                                                {getProjectList && getProjectList.map((val, index) => {
                                                    return (
                                                        <option value={val.projectId}>{val.projectName}</option>
                                                    )
                                                })}
                                            </select> */}
                                            {getProjectList && <DropdownWithSearch defaulNname={t("Select Project")} name="projectID" list={getProjectList} valueName="projectId" displayName="projectName" editdata={editProjectName} getvalue={handleChange} clear={clearDropdown} clearFun={clearValues} />}
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
                                            <label htmlFor="moduleName" className="form-label">Module<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" value={getModuleName} onChange={handleTextboxChange} id="txtModuleName" name="moduleName" placeholder='Enter Module Name' />
                                        </div>

                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funSaveModule}><img src={save} className='icnn' />Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { clearValues(1) }}><img src={reset} className='icnn' /> {t("Clear")}</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funUpdateModule}><img src={save} className='icnn' />Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { setSaveUpdateBool(0); clearValues(1) }}><img src={reset} className='icnn' /> {t("Clear")}</button>
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
                                <div className="title">Module List</div>
                            </div> */}
                            <div className='handlser'>
                                <Heading text="Module List" />
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
                                            <th>Project Name</th>
                                            {/* <th>Project Type</th> */}
                                            <th>Module Name</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getModuleList && getModuleList.filter((val) => `${val.projectName} ${val.moduleName}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.projectName}</td>
                                                    {/* <td>{val.projectType}</td> val.projectTypeID,*/}
                                                    <td>{val.moduleName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { editModule(val.id, val.projectID, val.moduleName, val.projectName) }}><span className='btnbg' style={{ background: "#FFEDD2" }}> <img src={editbtn} className='' /></span></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal"><span onClick={() => { setId(val.id) }} className='btnbg' style={{ background: "#FFEFEF" }}> <img src={delbtn} className='icnn' /></span ></div>
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={funDeletedModule} data-bs-dismiss="modal">Delete</button>
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
