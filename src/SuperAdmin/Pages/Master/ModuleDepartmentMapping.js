import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import PostModuleDepartmentMapping from '../../Api/Master/ModuleDepartmentMapping/PostModuleDepartmentMapping'
import GetModuleDepartmentMapping from '../../Api/Master/ModuleDepartmentMapping/GetModuleDepartmentMapping'
import GetDepartmentMaster from '../../Api/Master/DepartmentMaster/GetDepartmentMaster'
import DeleteModuleDepartmentMapping from '../../Api/Master/ModuleDepartmentMapping/DeleteModuleDepartmentMapping'
import GetModuleMaster from '../../Api/Master/ModuleMaster/GetModuleMaster'
import PutModuleDepartmentMapping from '../../Api/Master/ModuleDepartmentMapping/PutModuleDepartmentMapping'
import ValidationModuleDepartmentMapping from '../../../Validation/SuperAdmin/Master/ValidationModuleDepartmentMapping'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';

export default function ModuleDepartmentMapping() {
    let [moduleDepartList, setModuleDepartList] = useState()
    let [moduleList, setModuleList] = useState()
    let [departmentList, setDepartmentList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editModule, setEditModule] = useState("")
    let [editDepartment, setEditDepartment] = useState("")
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };



    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationModuleDepartmentMapping(sendForm.moduleID, sendForm.departmentID)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostModuleDepartmentMapping(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear(1);
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
            getdata()
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }

    }

    //Get data
    let getdata = async () => {
        let getResponse = await GetModuleDepartmentMapping();
        let getModule = await GetModuleMaster();
        let getDepartment = await GetDepartmentMaster();
        if (getResponse.status === 1) {
            setModuleDepartList(getResponse.responseValue)
            setModuleList(getModule.responseValue)
            setDepartmentList(getDepartment.responseValue)
        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditModule("")
        setEditDepartment("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteModuleDepartmentMapping(rowId)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted SuccessFully!")
            setTosterValue(0)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
            getdata()
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage(response.responseValue)
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }
    //Handle Button Change
    let handleUpdate = async (moduleDepartmentID, moduleID, departmentID, superAdminUserId, moduleName, departmentName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": moduleDepartmentID,
            "moduleID": moduleID,
            "departmentID": departmentID,
            "userId": superAdminUserId,
        }))
        setEditModule(moduleName)
        setEditDepartment(departmentName)

        // document.getElementById("moduleID").value = moduleID;
        // document.getElementById("departmentID").value = departmentID;
    }




    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationModuleDepartmentMapping(sendForm.moduleID, sendForm.departmentID)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutModuleDepartmentMapping(sendForm)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Updated SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                setUpdateBool(0)
                getdata()
                handleClear(1);
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }

        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }
    //Handle Clear
    let handleClear = (value) => {
        setSendForm({ "userId": window.superAdminUserId })
        setClearDropdown(value)
        setEditModule("")
        setEditDepartment("")
        // document.getElementById("moduleID").value = 0;
        // document.getElementById("departmentID").value = 0;
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
    }, [])

    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text='Module Department Mapping' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="moduleID" className="form-label">Module Name <span className="starMandatory">*</span></label>
                                    {/* <select name='moduleID' id="moduleID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {moduleList && moduleList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.moduleName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {moduleList && <DropdownWithSearch defaulNname="Select module" name="moduleID" list={moduleList} valueName="id" displayName="moduleName" editdata={editModule} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="departmentID" className="form-label">Department Name <span className="starMandatory">*</span></label>
                                    {/* <select name='departmentID' id="departmentID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {departmentList && departmentList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.departmentName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {departmentList && <DropdownWithSearch defaulNname="Select department" name="departmentID" list={departmentList} valueName="id" displayName="departmentName" editdata={editDepartment} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>

                                <div className="mb-2 relative">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <div>
                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                            <>
                                                {showToster === 1 ?
                                                    <Toster value={tosterValue} message={tosterMessage} />

                                                    : <div>
                                                        {updateBool === 0 ?
                                                            <>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />Save</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />Clear</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>Update</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>Cancel</button>
                                                            </>
                                                        }
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </BoxContainer>

                        </div>
                        <div className="col-12 mt-3">
                            <div className='handlser'>
                                <Heading text="Module and Department List" />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Module Name</th>
                                            <th>Department Name</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {moduleDepartList && moduleDepartList.filter((val) => `${val.moduleName} ${val.departmentName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.moduleName}</td>
                                                    <td>{val.departmentName}</td>
                                                    <td>
                                                        
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.moduleDepartmentID, val.moduleID, val.departmentID, val.superAdminUserId, val.moduleName, val.departmentName) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.moduleDepartmentID) }} /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
                                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

                            </div>

                        </div>


                    </div>
                </div>


            </section>
            {/* <Loder val={loder} /> */}
        </>
    )
}
