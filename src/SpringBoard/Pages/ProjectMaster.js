import React, { useState, useEffect } from 'react'
import GetProjectMaster from '../API/ProjectMaster/GetProjectMaster'
import PostProjectMaster from '../API/ProjectMaster/PostProjectMaster'
import PutProjectMaster from '../API/ProjectMaster/PutProjectMaster'
import DeleteProjectMaster from '../API/ProjectMaster/DeleteProjectMaster'
import SuccessToster from '../../Component/SuccessToster'
import WarningToaster from '../../Component/WarningToaster'
import AlertToster from '../../Component/AlertToster'
import Loder from '../../Component/Loader'
import TableContainer from '../../Component/TableContainer'
import TosterUnderProcess from '../../Component/TosterUnderProcess'

import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'
import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";
import Heading from '../../Component/Heading'

export default function ProjectMaster() {
    let [getProjectMasterList, setProjectMasterList] = useState([])
    let [getId, setId] = useState('')
    let [getProjectName, setProjectName] = useState('')
    let [getRemark, setRemark] = useState('')
    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    const [searchInput, setSearchInput] = useState('');

    let funGetProjectMaster = async () => {
        let getResult = await GetProjectMaster()
        if (getResult.status === 1) {
            setLoder(0)
            setProjectMasterList(getResult.responseValue);
        }

    }
    let handleTextboxChange = (event) => {
        if (event.target.name === "projectName") {
            setProjectName(event.target.value);
        }
    }
    let handleTextboxChangeRemark = (event) => {
        if (event.target.name === "remark") {
            setRemark(event.target.value);
        }
    }

    let clearTextValues = (event) => {
        setProjectName('');
        setRemark('');
        setSaveUpdateBool(0);

    }

    let SaveProject = async () => {
        setLoder(1)
        const getProjectName = document.getElementById("txtProjectName").value;
        // Regular expression to check for special characters
        //const specialCharsRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;
        if (getProjectName === '0' || getProjectName === undefined || getProjectName === null || getProjectName === "") {
            //alert('Project not fill !');
            setMessage("Project not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getProjectName.trim().length === 0 || getProjectName.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        else if (specialCharsRegex.test(getProjectName)) {
            setMessage("Project name contains special characters !");
            setShowToster(3);
            setLoder(0);
        }
        else if (numbersRegex.test(getProjectName)) {
            setMessage("ProjectType contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        else {

            var obj = {
                projectName: getProjectName,
                remark: getRemark,
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId

            }
            let result = await PostProjectMaster(obj);
            if (result.status === 1) {
                setMessage("Data saved successfully !")
                setShowToster(1)
                setLoder(0)
                setSaveUpdateBool(0);
                clearTextValues();
                funGetProjectMaster()
            }
            else {
                setMessage(result.responseValue)
                setShowToster(2)
            }

        }

    }
    let editProjectMaster = (Id, projectName, remark) => {
        setSaveUpdateBool(1)
        setId(Id);
        setProjectName(projectName);
        setRemark(remark);
    }
    let UpdateProjectMaster = async () => {
        const getProjectName = document.getElementById("txtProjectName").value;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;
        if (getProjectName === '0' || getProjectName === undefined || getProjectName === null || getProjectName === "") {
            setMessage("Project not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getProjectName.trim().length === 0 || getProjectName.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        else if (specialCharsRegex.test(getProjectName)) {
            setMessage("Project name contains special characters !");
            setShowToster(3);
            setLoder(0);
        }
        else if (numbersRegex.test(getProjectName)) {
            setMessage("Project name contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        else {
            setLoder(1)
            var obj = {
                Id: getId,
                projectName: getProjectName,
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId,
                remark: getRemark,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
                //userID: 134,
            }
            let result = await PutProjectMaster(obj);
            if (result.status === 1) {
                setMessage("Data update successfully !")
                setShowToster(1)
                setLoder(0)
                setSaveUpdateBool(0)
                funGetProjectMaster()
                clearTextValues()
            }
            else {
                setMessage(result.responseValue)
                setShowToster(2)
            }
        }
    }


    let DeletedProjectMaster = async () => {
        var obj = {
            Id: getId,
        }
        setLoder(1)
        let result = await DeleteProjectMaster(obj);
        if (result.status === 1) {
            setLoder(0)
            setMessage("Data delete successfully !")
            setShowUnderProcess(0)
            setShowToster(1)
            clearTextValues();
            funGetProjectMaster()
        }
        else {
            setLoder(0)
            setMessage(result.responseValue)
            setShowToster(2)
        }
    }
    let setValueOnDeletedFunction = async (id) => {
        //clearTextValues();
        setId(id)
    }
    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }
    useEffect(() => {
        funGetProjectMaster()
    }, [])

    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Add Project</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 col-md-2 flex-grow-1 me-2">
                                            <label htmlFor="projectName" className="form-label">Project Name<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" value={getProjectName} onChange={handleTextboxChange} id="txtProjectName" name="projectName" placeholder='Enter Project Name' />
                                        </div>
                                        <div className="mb-2 col-md-4 flex-grow-1 me-2">
                                            <label htmlFor="remark" className="form-label">Remark</label>
                                            <input type="text" className="form-control form-control-sm" value={getRemark} onChange={handleTextboxChangeRemark} id="txtremark" name="remark" placeholder='Enter Remark' />
                                        </div>

                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={SaveProject}><img src={save} className='icnn' />Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTextValues}><img src={reset} className='icnn' /> Clear</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={UpdateProjectMaster}><img src={save} className='icnn' />Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTextValues}><img src={reset} className='icnn' /> Clear</button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <div className='handlser'>
                                <Heading text="Project Master List" />
                                <div style={{ position: 'relative' }}>
                                    {/* <input type="text" className='form-control form-control-sm' placeholder="Search..." value={searchTerm} onChange={handleSearch} /> */}
                                    <input value={searchInput} onChange={handleOnChange} name="searchBox" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>

                            {/* <div className="med-box">
                                <div className="title">Project Master List</div>
                                <div class="input-group mx-2 mt-1" style={{ width: '15vw', height: '4vh' }}>
                                    <input value={searchInput} onChange={handleOnChange} name="searchBox" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                    <span class="input-group-text border-0" id="search-addon" style={{ background: 'white' }}>
                                        <i class="fas fa-search" style={{ cursor: 'pointer', background: 'white' }}></i>
                                    </span>
                                </div>
                            </div> */}

                            <div className="med-table-section" style={{ "height": "77vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Project Name</th>
                                            <th>Remark</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getProjectMasterList && getProjectMasterList.filter((val) => `${val.projectName} `.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.projectName}</td>
                                                    <td>{val.remark}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { editProjectMaster(val.id, val.projectName, val.remark) }}><span className='btnbg' style={{ background: "#FFEDD2" }}> <img src={editbtn} className='' /></span></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal"><span className='btnbg' style={{ background: "#FFEFEF" }} onClick={() => { setValueOnDeletedFunction(val.id) }}> <img src={delbtn} className='icnn' /></span ></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={DeletedProjectMaster} data-bs-dismiss="modal">Delete</button>
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
