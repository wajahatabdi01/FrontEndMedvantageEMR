import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import PostModuleMenuAssign from '../../Api/Master/ModuleMenuAssign/PostModuleMenuAssign'
import GetModuleMenuAssign from '../../Api/Master/ModuleMenuAssign/GetModuleMenuAssign'
import GetModuleMaster from '../../Api/Master/ModuleMaster/GetModuleMaster'
import DeletModuleMenuAssign from '../../Api/Master/ModuleMenuAssign/DeletModuleMenuAssign'
import ValidationModuleMenuAssign from '../../../Validation/SuperAdmin/Master/ValidationModuleMenuAssign'
import PutModuleMenuAssign from '../../Api/Master/ModuleMenuAssign/PutModuleMenuAssign'
import GetAllMenuMaster from '../../Api/Master/MenuMaster/GetAllMenuMaster'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';


export default function ModuleMenuAssign() {
    let [moduleMenuList, setModuleMenuList] = useState()
    let [moduleList, setModuleList] = useState()
    let [menuList, setMenuList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editMenu, setEditMenu] = useState("")
    let [editModule, setEditModule] = useState("")
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };



    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationModuleMenuAssign(sendForm.moduleID, sendForm.menuID)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostModuleMenuAssign(sendForm);
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
        let getResponse = await GetModuleMenuAssign();
        let getMenu = await GetAllMenuMaster();
        let getModule = await GetModuleMaster();
        if (getResponse.status === 1) {
            setModuleMenuList(getResponse.responseValue)
            setMenuList(getMenu.responseValue)
            setModuleList(getModule.responseValue)
        }
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditModule("")
        setEditMenu("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeletModuleMenuAssign(rowId)
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
    let handleUpdate = async (moduleMenuAssignID, moduleID, menuID, superAdminUserId, moduleName, menuName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": moduleMenuAssignID,
            "moduleID": moduleID,
            "menuID": menuID,
            "userId": superAdminUserId,
        }))
        setEditModule(moduleName)
        setEditMenu(menuName)
        // document.getElementById("moduleID").value = moduleID;
        // document.getElementById("menuID").value = menuID;
    }

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationModuleMenuAssign(sendForm.moduleID, sendForm.menuID)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutModuleMenuAssign(sendForm)
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
                handleClear();
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
        setClearDropdown(value)
        setSendForm({ "userId": window.superAdminUserId })
        setEditModule("")
        setEditMenu("")
        // document.getElementById("moduleID").value = 0;
        // document.getElementById("menuID").value = 0;
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
                            <Heading text='Module Menu Assign' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="moduleID" className="form-label">Module<span className="starMandatory">*</span></label>
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
                                    <label htmlFor="menuID" className="form-label">Menu<span className="starMandatory">*</span></label>
                                    {/* <select name='menuID' id="menuID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {menuList && menuList.map((val, index) => {
                                            return (
                                                <option key={index} value={val.id}>{val.menuName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {menuList && <DropdownWithSearch defaulNname="Select menu" name="menuID" list={menuList} valueName="id" displayName="menuName" editdata={editMenu} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}>Cancel</button>
                                                            </>
                                                        }
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </BoxContainer>
                        </div>
                        <div className="col-12 mt-2">
                            <div className='handlser'>
                                <Heading text="Module Menu List" />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            {/* <th>Status </th> */}
                                            <th>Module</th>
                                            <th>Menu</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {moduleMenuList && moduleMenuList.filter((val) => `${val.moduleName} ${val.menuName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    {/* <td>{val.inspectedAs}</td> */}
                                                    <td>{val.moduleName}</td>
                                                    <td>{val.menuName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.moduleMenuAssignID, val.moduleID, val.menuID, val.superAdminUserId, val.moduleName, val.menuName) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.moduleMenuAssignID) }} /></div>
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
