import React, { useState, useEffect } from 'react'
import Loder from "../../../Components/Loder"
import Heading from '../../../Components/Heading'
import BoxContainer from '../../../Components/BoxContainer'
import TableContainer from '../../../Components/TableContainer'
import Toster from '../../../Components/Toster'
import TosterUnderProcess from '../../../Components/TosterUnderProcess'
import ValidationAddUser from '../../../Validations/Admin/UserService/ValidationAddUser'
import GetAddUser from '../../Api/UserService/GetAddUser'
import GetRoleMaster from '../../Api/Master/RoleMaster/GetRoleMaster'
import GetDepartmentMaster from '../../../SuperAdmin/Api/Master/DepartmentMaster/GetDepartmentMaster'
import GetDesignationMaster from '../../../SuperAdmin/Api/UtilityMaster/DesignationMaster/GetDesignationMaster'
import GetHeadMaster from '../../Api/Master/HeadMaster/GetHeadMaster'
import PostAddUser from '../../Api/UserService/PostAddUser'

export default function AddUser() {
    let [userRegistrationList, setUserRegistrationList] = useState()
    let [roleList, setRoleList] = useState()
    let [designationList, setDesignationList] = useState()
    let [departmentList, setDepartmentList] = useState(0)
    let [headList, setHeadList] = useState(0)
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId, "clientID": 13})
    // let [sendForm, setSendForm] = useState({ "userId": window.userId, "clientID": 13, "headId": window.headId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)

    //Handle Save
    let saveForm = async () => {
       
        let valresponse = ValidationAddUser(sendForm.name, sendForm.userName, sendForm.email, sendForm.mobileNo, sendForm.password, sendForm.empNo, sendForm.roleId, sendForm.designationId, sendForm.departmentId)
        console.log('sendForm',sendForm)
        console.log('valresponse',valresponse)
        if (valresponse) {
            setShowUnderProcess(1)

            let response = await PostAddUser(sendForm);
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
            setSendForm({ "userId": window.userId, "clientID": 13, "headId": window.headId })
            getdata();
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
        let getResponse = await GetAddUser();
        let getRole = await GetRoleMaster();
        let getDepartment = await GetDepartmentMaster();
        let getDesignation = await GetDesignationMaster();
        let getHead = await GetHeadMaster();
        if (getResponse.status === 1) {
            // setLoder(0)
            setUserRegistrationList(getResponse.responseValue)
            setRoleList(getRole.responseValue)
            setDepartmentList(getDepartment.responseValue)
            setDesignationList(getDesignation.responseValue)
            setHeadList(getHead.responseValue)
        }
    }

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        console.log('name',name);
        console.log('value',value);
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Clear
    let handleClear = () => {
        setSendForm([])
        setSendForm({ "userId": window.userId, "clientID": 13})
        document.getElementById("name").value = "";
        document.getElementById("userName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mobileNo").value = "";
        document.getElementById("password").value = "";
        document.getElementById("roleId").value = 0;
        document.getElementById("designationId").value = 0;
        document.getElementById("departmentId").value = 0;
        document.getElementById("empNo").value = "";
        document.getElementById("headId").value = "";
        document.getElementById("uPassword").value = "";
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
                            <Heading text='User Registration' />
                            <BoxContainer>

                                <div className="mb-2 me-2">
                                    <label htmlFor="name" className="form-label"> Name <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="name" name="name" onChange={handleChange} placeholder="Enter name" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="userName" className="form-label">User Name <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="userName" name="userName" onChange={handleChange} placeholder="Enter User name" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="email" className="form-label">Email <span className="starMandatory">*</span></label>
                                    <input type="email" className="form-control form-control-sm" id="email" name="email" onChange={handleChange} placeholder="Enter email" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="mobileNo" className="form-label">Mobile No <span className="starMandatory">*</span></label>
                                    <input type="number" className="form-control form-control-sm" id="mobileNo" name="mobileNo" onChange={handleChange} placeholder="Enter mobile no" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="empNo" className="form-label">Employee No<span className="starMandatory">*</span></label>
                                    <input type="number" className="form-control form-control-sm" id="empNo" name="empNo" onChange={handleChange} placeholder="Enter Employee No" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="roleId" className="form-label">Role<span className="starMandatory">*</span></label>
                                    <select name='roleId' id="roleId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {roleList && roleList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.roleTitle}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="designationId" className="form-label">Designation<span className="starMandatory">*</span></label>
                                    <select name='designationId' id="designationId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {designationList && designationList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.designationName}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="departmentId" className="form-label">Department<span className="starMandatory">*</span></label>
                                    <select name='departmentId' id="departmentId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {departmentList && departmentList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.departmentName}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="departmentId" className="form-label">Head<span className="starMandatory">*</span></label>
                                    <select name='departmentId' id="departmentId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {headList && headList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.headName}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="mb-2 me-2">
                                    <label htmlFor="password" className="form-label">Password <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="password" name="password" onChange={handleChange} placeholder="Enter password" />
                                </div>


                                {/* <div className="form-check">
                                    <label htmlFor="password" className="form-label">&nbsp;</label>
                                    <select name='departmentId' id="departmentId" className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">
                                            <input className="form-check-input" type="checkbox" id="isEXternal" value="isEXternal" name="isEXternal" style={{ height: '20px', width: '20px', marginRight: '10px' }} />
                                            <label className="form-check-label" htmlFor="isEXternal" style={{ lineHeight: '30px' }}>
                                                Select All
                                            </label>
                                        </option>
                                        {departmentList && departmentList.map((val, index) => {
                                            return (
                                                <option value={val.id}>
                                                    <input className="form-check-input" type="checkbox" id="isEXternal" value="isEXternal" name="isEXternal" style={{ height: '20px', width: '20px', marginRight: '10px' }} />
                                                    <label className="form-check-label" htmlFor="isEXternal" style={{ lineHeight: '30px' }}>
                                                        {val.headName}
                                                    </label>
                                                </option>
                                            )
                                        })}

                                    </select>
                                </div> */}


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
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveForm}>Save</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}>Clear</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" >Update</button>
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
                        <div className="col-12 mt-2">
                            <Heading text='User Registration List' />
                            <div className="med-table-section" style={{ "height": "67vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Name </th>
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Mobile No</th>
                                            <th>Employee Id</th>
                                            {/* <th>Role</th>
                                            <th>Designation</th>
                                            <th>Department</th>
                                            <th>Password</th> */}
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {userRegistrationList && userRegistrationList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind+1}</td>
                                                    <td>{val.name}</td>
                                                    <td>{val.userName}</td>
                                                    <td>{val.email}</td>
                                                    <td>{val.mobileNo}</td>
                                                    <td>{val.empNo}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit"></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel"></i>

                                                            </div>
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
                                                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal">Delete</button>
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
