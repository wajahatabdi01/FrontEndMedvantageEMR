import React, { useEffect, useState } from 'react'

import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetRoleMaster from '../../Api/UtilityMaster/RoleMaster/GetRoleMaster'
import PostRoleWiseDepartmentAssign from '../../Api/UtilityMaster/RoleWiseDepartmentAssign/PostRoleWiseDepartmentAssign'
import GetRoleWiseDepartmentAssign from '../../Api/UtilityMaster/RoleWiseDepartmentAssign/GetRoleWiseDepartmentAssign'
import GetDepartmentMaster from '../../Api/Master/DepartmentMaster/GetDepartmentMaster'
import DeleteRoleWiseDepartmentAssign from '../../Api/UtilityMaster/RoleWiseDepartmentAssign/DeleteRoleWiseDepartmentAssign'
import PutRoleWiseDepartmentAssign from '../../Api/UtilityMaster/RoleWiseDepartmentAssign/PutRoleWiseDepartmentAssign'
import ValidationRoleWiseDepartmentAssign from '../../../Validation/SuperAdmin/UtilityMaster/ValidationRoleWiseDepartmentAssign'
import GetHeadMaster from '../../Api/HeadMaster/GetHeadMaster'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch'

export default function RoleWiseDepartmentAssign() {
    let [roleList, setRoleList] = useState()
    let [departmentList, setDepartmentList] = useState()
    let [headList, setHeadList] = useState()
    let [roleWiseDepartmentList, setroleWiseDepartmentList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editRole, setEditRole] = useState("")
    let [editDepartment, setEditDepartment] = useState("")
    let [editHead, setEditHead] = useState("")
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationRoleWiseDepartmentAssign(sendForm.roleId, sendForm.departmentId, sendForm.headId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostRoleWiseDepartmentAssign(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

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
        let getResponse = await GetRoleWiseDepartmentAssign();
        let getDepartmrnt = await GetDepartmentMaster();
        let getRole = await GetRoleMaster();
        let getHead = await GetHeadMaster();

        if (getResponse.status === 1) {
            // setLoder(0)
            setroleWiseDepartmentList(getResponse.responseValue)
            setDepartmentList(getDepartmrnt.responseValue)
            setRoleList(getRole.responseValue)
            setHeadList(getHead.responseValue)
        }
    }

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditRole("")
        setEditDepartment("")
        setEditHead("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteRoleWiseDepartmentAssign(rowId)
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
    let handleUpdate = async (id, departmentId, roleId, headId, superAdminUserId, roleTitle, departmentName, headName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "departmentId": departmentId,
            "roleId": roleId,
            "headId": headId,
            "userId": window.superAdminUserId,
        }))
        setEditRole(roleTitle)
        setEditDepartment(departmentName)
        setEditHead(headName)
    }

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationRoleWiseDepartmentAssign(sendForm.roleId, sendForm.departmentId, sendForm.headId)
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutRoleWiseDepartmentAssign(sendForm)
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
        setSendForm({ "userId": window.superAdminUserId })
        setClearDropdown(value)
        setEditRole("")
        setEditDepartment("")
        setEditHead("")
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
                            <Heading text='Role Wise Department Assign' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="roleId" className="form-label">Role <span className="starMandatory">*</span></label>
                                    {roleList && <DropdownWithSearch defaulNname="Select role" name="roleId" list={roleList} valueName="id" displayName="roleTitle" editdata={editRole} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>

                                <div className="mb-2 me-2">
                                    <label htmlFor="departmentId" className="form-label"> Department <span className="starMandatory">*</span></label>
                                    {departmentList && <DropdownWithSearch defaulNname="Select department" name="departmentId" list={departmentList} valueName="id" displayName="departmentName" editdata={editDepartment} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>


                                <div className="mb-2 me-2">
                                    <label htmlFor="headId" className="form-label">Head <span className="starMandatory">*</span></label>
                                    {headList && <DropdownWithSearch defaulNname="Select head" name="headId" list={headList} valueName="id" displayName="headName" editdata={editHead} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                                <Heading text="Role Wise Department List" />
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
                                            <th>Role </th>
                                            <th>Department</th>
                                            <th>Head</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {roleWiseDepartmentList && roleWiseDepartmentList.filter((val) => `${val.roleTitle} ${val.departmentName} ${val.headName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.roleTitle}</td>
                                                    <td>{val.departmentName}</td>
                                                    <td>{val.headName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.departmentId, val.roleId, val.headId, val.superAdminUserId, val.roleTitle, val.departmentName, val.headName) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
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
