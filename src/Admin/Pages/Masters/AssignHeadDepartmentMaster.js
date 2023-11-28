import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading'
import BoxContainer from '../../../Components/BoxContainer'
import TableContainer from '../../../Components/TableContainer'
import Loder from '../../../Components/Loder'
import Toster from '../../../Components/Toster'
import TosterUnderProcess from '../../../Components/TosterUnderProcess'
import ValidationAssignHeadDepartmentMaster from '../../../Validations/Admin/Master/ValidationAssignHeadDepartmentMaster'
import PostAPIAssignHeadDepartmentMaster from '../../Api/Master/AssignHeadDepartmentMasterAPI/PostAPIAssignHeadDepartmentMaster'
import GetAPIAssignHeadDepartmentMaster from '../../Api/Master/AssignHeadDepartmentMasterAPI/GetAPIAssignHeadDepartmentMaster'
import GetHeadMaster from '../../Api/Master/HeadMaster/GetHeadMaster'
import GetDepartmentMaster from '../../../SuperAdmin/Api/Master/DepartmentMaster/GetDepartmentMaster'
import DeleteAPIAssignHeadDepartmentMaster from '../../Api/Master/AssignHeadDepartmentMasterAPI/DeleteAPIAssignHeadDepartmentMaster'
import PutAPIAssignHeadDepartmentMaster from '../../Api/Master/AssignHeadDepartmentMasterAPI/PutAPIAssignHeadDepartmentMaster'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Components/DropdownWithSearch'
export default function AssignHeadDepartmentMaster() {
    let [assignHeadDeptList, setAssignHeadDeptList] = useState()
    let [headList, setHeadList] = useState()
    let [departmentList, setDepartmentList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editHeadName, setEditHeadName] = useState("")
    let [editDepartment, setEditDepartment] = useState("")

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationAssignHeadDepartmentMaster(sendForm.departmentId, sendForm.headId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostAPIAssignHeadDepartmentMaster(sendForm);
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
        let getResponse = await GetAPIAssignHeadDepartmentMaster();
        let getHead = await GetHeadMaster();
        let getDepartment = await GetDepartmentMaster();
        if (getResponse.status === 1) {
            setAssignHeadDeptList(getResponse.responseValue)
            setHeadList(getHead.responseValue)
            setDepartmentList(getDepartment.responseValue)
        }
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditHeadName("")
        setEditDepartment("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1);
        let obj = {
            id: rowId
        }
        let response = await DeleteAPIAssignHeadDepartmentMaster(obj)
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
    let handleUpdate = async (id, headId, departmentId, userId, headName, departmentName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "headId": headId,
            "departmentId": departmentId,
            "userId": userId,
        }))

        setEditHeadName(headName)
        setEditDepartment(departmentName)

    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationAssignHeadDepartmentMaster(sendForm.departmentId, sendForm.headId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutAPIAssignHeadDepartmentMaster(sendForm)
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
        setSendForm({ "userId": window.userId })
        setClearDropdown(value)
        setEditHeadName("")
        setEditDepartment("")
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
                            <Heading text='Assign Head To Department' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="headId" className="form-label">Head <span className="starMandatory">*</span></label>
                                    {/* <select name='headId' id="headId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {headList && headList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.headName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {headList && <DropdownWithSearch defaulNname="Select head" name="headId" list={headList} valueName="id" displayName="headName" editdata={editHeadName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="departmentId" className="form-label">Department <span className="starMandatory">*</span></label>
                                    {/* <select name='departmentId' id="departmentId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {departmentList && departmentList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.departmentName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {departmentList && <DropdownWithSearch defaulNname="Select department" name="departmentId" list={departmentList} valueName="id" displayName="departmentName" editdata={editDepartment} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
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
                        <div className="col-12 mt-3">
                            <Heading text="Head Department List" />
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Head</th>
                                            <th>Department</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {assignHeadDeptList && assignHeadDeptList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.headName}</td>
                                                    <td>{val.departmentName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(val.id, val.headId, val.departmentId, val.userId,val.headName,val.departmentName) }} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(val.id) }} alt='' /></div>
                                                            {/* <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.headId, val.departmentId, val.userId) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i></div> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </TableContainer>
                                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
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
        </>
    )
}
