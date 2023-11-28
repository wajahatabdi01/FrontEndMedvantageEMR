import React, { useState, useEffect } from 'react'
import GetAssignProject from '../API/AssignProject/GetAssignProject'
//import GetProjectType from '../API/ProjectTypeMaster/GetProjectTypeMaster'
import GetProjectMaster from '../API/ProjectMaster/GetProjectMaster'
import GetUser from '../API/OutsideAPI/GetUser'
import saveAssignProject from '../API/AssignProject/SaveAssignProject'
import UpdateProjectAssign from '../API/AssignProject/UpdateProjectAssign'
import DeletedAssignProject from '../API/AssignProject/DeletedAssignProject'
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


export default function AssignProject() {

    let [getProjectAssignList, setProjectAssignList] = useState([])
    let [getProjectList, setProjectList] = useState([])
    //let [getProjectTypeList, setProjectTypeList] = useState([])
    let [getUserList, setUserList] = useState([])

    const [isChecked, setIsChecked] = useState(false);
    const [getSelectedOptionProject, setSelectedOptionProject] = useState('');
    //const [getSelectedOptionProjectType, setSelectedOptionProjectType] = useState('');
    const [getSelectedOptionUser, setSelectedOptionUser] = useState('');
    const [getRowID, setRowID] = useState('');
    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)

    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    const [searchInput, setSearchInput] = useState('');
    const { t } = useTranslation();
    let [editProjectName, seteditProjectName] = useState("")
    let [editUserName, seteditUserName] = useState("")
    let [clearDropdown, setClearDropdown] = useState(0)

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        // console.log("name", name, "value", value)
        if (name === "projectID") {
          
            setSelectedOptionProject(value)
        }
        else {

            setSelectedOptionUser(value)
        }
        // SetEditDepartment("")
        // setSendForm(sendForm => ({
        //     ...sendForm,
        //     [name]: value
        // }))
    }
    const funGetAllAssignProject = async () => {
        let getResult = await GetAssignProject()
        setLoder(1);
        if (getResult.status === 1) {
            setLoder(0)
            setProjectAssignList(getResult.responseValue);
        }
        else {
            setLoder(0)
            setProjectAssignList(getResult.responseValue);
        }

    };


    let funGetProject = async () => {
        let getResult = await GetProjectMaster()
        setProjectList(getResult.responseValue);
    }

    // let funGetProjectType = async () => {
    //     let getResult = await GetProjectType()
    //     setProjectTypeList(getResult.responseValue);
    // }

    let funGetUser = async () => {
        let getResult = await GetUser()
        console.log('UserList',getResult)
        setUserList(getResult.responseValue);
    }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked ? 1 : 0);
    };



    const SelectedOptionProject = async (event) => {
        setSelectedOptionProject(event.target.value);
    }

    // const SelectedOptionProjectType = async (event) => {
    //     setSelectedOptionProjectType(event.target.value);
    // }
    const SelectedOptionUser = async (event) => {
        setSelectedOptionUser(event.target.value);
    }

    const SaveData = async () => {
        //const getSelectedOptionProject = document.getElementById("projectID").value;
        //const getSelectedOptionProjectType = document.getElementById("sldProjectType").value;
        //const getSelectedOptionUser = document.getElementById("userID").value;
        console.log('check logggggg',getSelectedOptionProject)
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

        else if (getSelectedOptionUser === '0' || getSelectedOptionUser === undefined || getSelectedOptionUser === null || getSelectedOptionUser === "") {
            setMessage("Developer not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else {
            if (isChecked == false) {
                var obj = {
                    projectId: getSelectedOptionProject,
                    //projectTypeId: getSelectedOptionProjectType,
                    teamMembersId: getSelectedOptionUser,
                    isTL: 0,
                    userId: window.userId,
                    clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
                }
            }
            else {
                var obj = {
                    projectId: getSelectedOptionProject,
                    //projectTypeId: getSelectedOptionProjectType,
                    teamMembersId: getSelectedOptionUser,
                    isTL: isChecked,
                    userId: window.userId,
                    clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
                }
                //console.log('Save DATAAAA',obj)
            }
            setLoder(1)
            let response = await saveAssignProject(obj);
            if (response.status === 1) {
                setLoder(0);
                setMessage('Data save successfull !')
                setShowToster(1)
                setSaveUpdateBool(0)
                funGetAllAssignProject()
                clearValues()
            }
            else {
                setLoder(0);
                setMessage(response.responseValue)
                setShowToster(2)
                setSaveUpdateBool(0)
                funGetAllAssignProject()

            }
        }
    };
    const clearValues = async (value) => {
        setClearDropdown(value)
        //document.getElementById('sldProject').value = '0';
        //document.getElementById('sldProjectType').value = '0';
        //document.getElementById('sldDeveloper').value = '0';
        setSelectedOptionProject('');
        //setSelectedOptionProjectType('');
        setSelectedOptionUser('');
        seteditProjectName("");
        seteditUserName("")
        setIsChecked(0)
        setSaveUpdateBool(0);
    };
    //, projectTypeId
    const EditAssignProject = (Id, projectId, teamMembersId, isTL, projectName, userName) => {

        setSaveUpdateBool(1)
        // document.getElementById('sldProject').value = projectId;
        // document.getElementById('sldProjectType').value = projectTypeId;
        // document.getElementById('sldDeveloper').value = teamMembersId;

        setRowID(Id)
        setSelectedOptionProject(projectId);
        //setSelectedOptionProjectType(projectTypeId);
        setSelectedOptionUser(teamMembersId);
        setIsChecked(parseInt(isTL) === 1 ? true : false)
        seteditProjectName(projectName)
        seteditUserName(userName)
    }

    const funUpdateAssignProject = async () => {
        //const getSelectedOptionProject = document.getElementById("sldProject").value;
        //const getSelectedOptionProjectType = document.getElementById("sldProjectType").value;
        //const getSelectedOptionUser = document.getElementById("sldDeveloper").value;
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

        else if (getSelectedOptionUser === '0' || getSelectedOptionUser === undefined || getSelectedOptionUser === null || getSelectedOptionUser === "") {
            setMessage("Developer not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else {
            var obj = {
                Id: getRowID,
                projectId: getSelectedOptionProject,
                //projectTypeId: getSelectedOptionProjectType,
                teamMembersId: getSelectedOptionUser,
                isTL: parseInt(isChecked),
                userID: window.userId,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            console.log('Update Dataaaaaa',obj)
           // return;
            let result = await UpdateProjectAssign(obj);
            console.log('Result',result)
            setLoder(1);
            if (result.status === 1) {
                setLoder(0);
                setMessage('Data update successfull !')
                setShowToster(1)
                setSaveUpdateBool(0)
                funGetAllAssignProject()
                clearValues()
            }
            else {
                setLoder(0);
                setMessage(result.responseValue)
                setShowToster(2)
                funGetAllAssignProject()
            }
        }
    }
    let funDeletedAssignProject = async () => {
        var obj = {
            Id: getRowID,
        }
        let result = await DeletedAssignProject(obj);
        setLoder(1);
        if (result.status === 1) {
            setLoder(0);
            setMessage('Data delete successfull !')
            setShowToster(1)
            funGetAllAssignProject()
        }
        else {
            setLoder(0);
            setMessage(result.responseValue)
            setShowToster(2)
            funGetAllAssignProject()
        }
    }
    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }

    useEffect(() => {
        funGetAllAssignProject()
        funGetProject()
        //funGetProjectType()
        funGetUser()
    }, [])

    return (
        <>
            <section className="main-content pt-3 mt-5">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Assign Project</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="projectName" className="form-label">Project<span className="starMandatory">*</span></label>
                                            {/* <select name='widgetId' id="sldProject" onChange={SelectedOptionProject} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Project</option>
                                                {getProjectList && getProjectList.map((val, index) => {
                                                    return (
                                                        <option value={val.id}>{val.projectName}</option>
                                                    )
                                                })}
                                            </select> */}
                                            {getProjectList && <DropdownWithSearch defaulNname={t("Select Project")} name="projectID" list={getProjectList} valueName="id" displayName="projectName" editdata={editProjectName} getvalue={handleChange} clear={clearDropdown} clearFun={clearValues}/>}

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
                                            <label htmlFor="projectName" className="form-label">Developer<span className="starMandatory">*</span></label>
                                            {/* <select name='widgetId' id="sldDeveloper" onChange={SelectedOptionUser} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="0">Select Developer</option>
                                                {getUserList && getUserList.map((val, index) => {
                                                    return (
                                                        <option value={val.id}>{val.name}</option>
                                                    )
                                                })}
                                            </select> */}
                                            {getUserList && <DropdownWithSearch defaulNname={t("Select User")} name="userId" list={getUserList} valueName="id" displayName="name" editdata={editUserName} getvalue={handleChange} clear={clearDropdown} clearFun={clearValues}/>}

                                        </div>
                                        <div className="mb-2 flex-grow-1 text-center mt-4">
                                            <label htmlFor="projectName" className="form-label" style={{ 'padding-right': '5px' }}>Is TL</label>
                                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                                        </div>
                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>


                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={SaveData}><img src={save} className='icnn' />Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { clearValues(1) }}><img src={reset} className='icnn' /> {t("Clear")}</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funUpdateAssignProject}><img src={save} className='icnn' />Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { setSaveUpdateBool(0);clearValues(1) }}><img src={reset} className='icnn' /> {t("Clear")}</button>
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
                                <div className="title">Project List</div>
                            </div> */}
                            <div className='handlser'>
                                <Heading text="Assign Project List" />
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
                                            <th>Developer</th>
                                            <th>Is TL</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getProjectAssignList && getProjectAssignList.filter((val) => `${val.projectName} ${val.name}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.projectName}</td>
                                                    {/* <td>{val.projectType}</td> val.projectTypeId,*/}
                                                    <td>{val.name}</td>
                                                    <td>{val.isTL === "1" ? "YES" : "NO"}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { EditAssignProject(val.id, val.projectId, val.teamMembersId, val.isTL, val.projectName, val.name) }}><span className='btnbg' style={{ background: "#FFEDD2" }}> <img src={editbtn} className='' /></span></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal" ><span className='btnbg' style={{ background: "#FFEFEF" }} onClick={() => { setRowID(val.id) }}><img src={delbtn} className='icnn' /></span></div>
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={funDeletedAssignProject} data-bs-dismiss="modal">Delete</button>
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
