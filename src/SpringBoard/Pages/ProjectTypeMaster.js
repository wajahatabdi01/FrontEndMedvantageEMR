
import React, { useState, useEffect } from 'react'
import GetProjectType from '../API/ProjectTypeMaster/GetProjectTypeMaster'
import saveProjecType from '../API/ProjectTypeMaster/SavetProjectType'
import UpdateProjecType from '../API/ProjectTypeMaster/UpdateProjectType'
import DeletedProjectType from '../API/ProjectTypeMaster/DeleteProjectType'
import SuccessToster from '../../Component/SuccessToster'
import WarningToaster from '../../Component/WarningToaster'
import AlertToster from '../../Component/AlertToster'
import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'

import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";
import Heading from '../../Component/Heading'


export default function ProjectTypeMaster() {

    let [getProjectTypeList, setProjectTypeList] = useState([])
    let [getId, setId] = useState('')
    let [getProjectType, setProjectType] = useState('')
    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)

    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    const [searchInput, setSearchInput] = useState('');

    let funGetProjectType = async () => {
        let getResult = await GetProjectType()
        setProjectTypeList(getResult.responseValue);
    }

    const handleTextboxChange = (event) => {
        if (event.target.name === "projectTypeName") {
            setProjectType(event.target.value);
        }
    };
    const clearTetValues = () => {
        setSaveUpdateBool(0);
        setProjectType('');
    };

    let SaveSubTest = async () => {
        const getProjectType = document.getElementById("textProjectType").value;
        //const specialCharsRegex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;
        if (getProjectType === '0' || getProjectType === undefined || getProjectType === null || getProjectType === "") {
            // alert('Project not fill !');
            setMessage("Project type not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getProjectType.trim().length === 0 || getProjectType.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        else if (specialCharsRegex.test(getProjectType)) {
            setMessage("Project Type contains special characters !");
            setShowToster(3);
            setLoder(0);
        }
        else if (numbersRegex.test(getProjectType)) {
            setMessage("Project Type contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        else {

            var obj = {
                projectType: getProjectType,
                userID: window.userId
            }
            let response = await saveProjecType(obj);
            setLoder(1)
            if (response.status === 1) {
                setLoder(0)
                setMessage("Data saved successfully !")
                setShowToster(1)

                setSaveUpdateBool(0)
                funGetProjectType()
                clearTetValues()
            }
            else {
                setLoder(0)
                setMessage(response.responseValue)
                setShowToster(2)
                setSaveUpdateBool(0)
                funGetProjectType()
            }

        }

    }

    let editProjectType = (Id, projectname) => {
        setSaveUpdateBool(1)
        setId(Id);
        setProjectType(projectname);
    }

    let UpdateProjectType = async () => {
        const getProjectType = document.getElementById("textProjectType").value;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;
        if (getProjectType === '0' || getProjectType === undefined || getProjectType === null || getProjectType === "") {
            // alert('Project not fill !');
            setMessage("Project type not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getProjectType.trim().length === 0 || getProjectType.trim().length === '') {
            setMessage("Fields can't blank or space !")
            setShowToster(3)
            setLoder(0)
        }
        else if (specialCharsRegex.test(getProjectType)) {
            setMessage("Project Type contains special characters !");
            setShowToster(3);
            setLoder(0);
        }
        else if (numbersRegex.test(getProjectType)) {
            setMessage("Project Type contains numbers !");
            setShowToster(3);
            setLoder(0);
        }
        else {
            var obj = {
                Id: getId,
                projectType: getProjectType,
                userID: window.userId
            }
            let result = await UpdateProjecType(obj);
            setLoder(1)
            if (result.status === 1) {
                setLoder(0)
                setMessage("Data update successfully !")
                setShowToster(1)

                setSaveUpdateBool(0)
                funGetProjectType()
                clearTetValues()
            }
            else {
                setLoder(0)
                setMessage(result.responseValue)
                setShowToster(2)
                funGetProjectType()

            }
        }
    }


    let DeletedProjectTypes = async () => {
        var obj = {
            Id: getId,
        }
        let result = await DeletedProjectType(obj);
        setLoder(1)
        if (result.status === 1) {
            setLoder(0)
            setMessage("Data delete successfully !")
            setShowToster(1)
            funGetProjectType()
            clearTetValues()
        }
        else {
            setLoder(0)
            setMessage(result.responseValue)
            setShowToster(2)

            funGetProjectType()
        }
    }
    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }

    useEffect(() => {
        funGetProjectType()
    }, [])

    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Add Project Type</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 col-md-4 me-2">
                                            <label htmlFor="projectName" className="form-label">Project Type<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" value={getProjectType} onChange={handleTextboxChange} id="textProjectType" name="projectTypeName" placeholder='Enter Project Type' />
                                        </div>

                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={SaveSubTest}><img src={save} className='icnn'/>Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTetValues}><img src={reset} className='icnn'/> Clear</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={UpdateProjectType}><img src={save} className='icnn'/>Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTetValues}><img src={reset} className='icnn'/> Clear</button>
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
                                <div className="title">Project Type List</div>
                            </div> */}
                            <div className='handlser'>
                                <Heading text="Project Type List" />
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
                                            <th>Project Type</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getProjectTypeList && getProjectTypeList.filter((val) => `${val.projectType} `.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.projectType}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { editProjectType(val.id, val.projectType) }}> <span className='btnbg'  style={{ background: "#FFEDD2" }}> <img src={editbtn} className=''/></span></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal"><span onClick={() => { setId(val.id) }} className='btnbg' style={{ background: "#FFEFEF" }}> <img src={delbtn} className='icnn'/></span ></div>
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={DeletedProjectTypes} data-bs-dismiss="modal">Delete</button>
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

        </>
    )

}
