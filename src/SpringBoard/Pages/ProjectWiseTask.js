import React, { useEffect, useState } from "react";
import GetProjectWiseTask from "../API/Report/GetProjectWisTask";
import GetProjectMaster from '../API/ProjectMaster/GetProjectMaster'
import TableContainer from '../../Component/TableContainer'
import Heading from '../../Component/Heading'
import DropdownWithSearch from '../../Component/DropdownWithSearch'
import exportFromJSON from "export-from-json";
import SuccessToster from '../../Component/SuccessToster'
import WarningToaster from '../../Component/WarningToaster'
import AlertToster from '../../Component/AlertToster'
import Loder from '../../Component/Loader'

import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'
import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";

import { useTranslation } from 'react-i18next';
import i18n from 'i18next'


export default function ProjectWiseTask() {

    let [getProjectWiseTaskList, setProjectWiseTaskList] = useState([])
    const [getSelectedOptionProject, setSelectedOptionProject] = useState('');
    let [getProjectList, setProjectList] = useState([])
    const [searchInput, setSearchInput] = useState('');
    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    const { t } = useTranslation();
    let [editProjectName, seteditProjectName] = useState("")
    let [clearDropdown, setClearDropdown] = useState(0)
    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)

    let funGetProjectWiseTask = async () => {
        if (getSelectedOptionProject === '0' || getSelectedOptionProject === undefined || getSelectedOptionProject === null || getSelectedOptionProject === "") {
            setMessage("Project not fill !")
            setShowToster(3)
            setLoder(0)
        }
        else {
            setLoder(1)
            let getResult = await GetProjectWiseTask(getSelectedOptionProject, window.userId)
            if (getResult.status === 1) {
                setLoder(0)
                setProjectWiseTaskList(getResult.responseValue);
            }
        }
    }
    let funGetProject = async () => {
        let getResult = await GetProjectMaster()
        setProjectList(getResult.responseValue);
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "projectID") {
            setSelectedOptionProject(value)
        }
        else {
            //setSelectedOptionUser(value)
        }
    }
    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }
    const clearValues = async (value) => {
        setClearDropdown(value)
        setSelectedOptionProject('');
        seteditProjectName("");
        setSaveUpdateBool(0);
    };
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
    let handleExportFile = () => {
        var arrFormat = [];
        getProjectWiseTaskList.map((val, ind) => {
            let param = ['SR', 'Project Name', 'Developer Name', 'Story', 'Sprint Backlog', 'Assign Date'];

            arrFormat.push({
                [param[0]]: ind + 1,
                [param[1]]: val.projectName,
                [param[2]]: val.name,
                [param[3]]: val.wantAbleTo + ' ' + val.soThat,
                [param[4]]: val.sprintBacklogText,
                [param[5]]: reformatDateString(val.assignDate)
            });
        });

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        const data = arrFormat;
        const fileName = 'ProjectWiseTaskList_' + '' + formattedDate;
        const exportType = exportFromJSON.types.csv;
        exportFromJSON({ data, fileName, exportType });
    }
    useEffect(() => {
        funGetProject()

    }, [])
    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Project Wise task List</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">

                                        <div className="mb-2 me-2 dropsearch">
                                            <label htmlFor="itemNumber" className="form-label">Project <span className="starMandatory">*</span></label>
                                            {getProjectList && <DropdownWithSearch defaulNname={t("Select Project")} name="projectID" list={getProjectList} valueName="id" displayName="projectName" editdata={editProjectName} getvalue={handleChange} clear={clearDropdown} clearFun={clearValues} />}
                                        </div>
                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funGetProjectWiseTask}><img src={save} className='icnn' />Get Report</button>
                                                        {/* <button type="button" className="btn btn-clear btn-sm mb-1 me-1"><img src={reset} className='icnn' /> Clear</button> */}
                                                    </>
                                                    :
                                                    <>
                                                        {/* <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"><img src={save} className='icnn' />Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1"><img src={reset} className='icnn' /> Clear</button> */}
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
                                <Heading text="Agenda List" />
                                {/* <div style={{ position: 'relative' }}>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleExportFile}>Export To CSV</button>
                                </div> */}
                                <div style={{ position: 'relative', display: 'flex' }}>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleExportFile}>Export To CSV</button>
                                    <input value={searchInput} onChange={handleOnChange} name="searchBox" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>

                                </div>
                            </div>

                            <div className="med-table-section" style={{ "height": "77vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Project Name</th>
                                            <th>Developer Name</th>
                                            <th>Story</th>
                                            <th>Sprint Backlog</th>
                                            <th>Assign Date</th>
                                            {/* <th style={{ "width": "10%" }} className="text-center">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getProjectWiseTaskList && getProjectWiseTaskList.filter((val) => `${val.projectName} ${val.name}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                            //console.log('ListDATAAAA', getProjectWiseTaskList)
                                            return (
                                                <tr key={val.agendaId}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.projectName}</td>
                                                    <td>{val.name}</td>
                                                    <td>{val.wantAbleTo + ' ' + val.soThat}</td>
                                                    <td>{val.sprintBacklogText}</td>
                                                    <td>{reformatDateString(val.assignDate)}</td>
                                                    {/* <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" ><span className='btnbg' style={{ background: "#FFEDD2" }}> <img src={editbtn} className='' /></span></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal"><span className='btnbg' style={{ background: "#FFEFEF" }} > <img src={delbtn} className='icnn' /></span ></div>
                                                        </div>
                                                    </td> */}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
                {showToster === 1 ? <SuccessToster message={message} handle={setShowToster} /> : ""}
                {showToster === 2 ? <WarningToaster message={message} handle={setShowToster} /> : ""}
                {showToster === 3 ? <AlertToster message={message} handle={setShowToster} /> : ""}
            </section>
            {/* <Loder val={loder} /> */}
        </>
    )
}