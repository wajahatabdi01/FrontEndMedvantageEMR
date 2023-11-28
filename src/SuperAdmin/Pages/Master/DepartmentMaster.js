import React, { useState, useEffect } from 'react'
import ValidationDepartmentMaster from '../../../Validation/SuperAdmin/Master/ValidationDepartmentMaster'
import PostDepartmentMaster from '../../Api/Master/DepartmentMaster/PostDepartmentMaster'
import GetDepartmentMaster from '../../Api/Master/DepartmentMaster/GetDepartmentMaster'
import DeleteDepartmentMaster from '../../Api/Master/DepartmentMaster/DeleteDepartmentMaster'
import PutDepartmentMaster from '../../Api/Master/DepartmentMaster/PutDepartmentMaster'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import SuccessToster from '../../../Component/SuccessToster'
import WarningToaster from '../../../Component/WarningToaster'
import AlertToster from '../../../Component/AlertToster'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import GetDepartmentCategoryMaster from '../../Api/Master/DepartmentCategoryMaster/GetDepartmentCategoryMaster'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'

export default function DepartmentMaster() {
    let [departmentList, setDepartmentList] = useState()
    let [departmentCategoryList, setDepartmentCategoryList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [showToaster, setShowToaster] = useState(0)
    let [message, setMessage] = useState("")
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editDepartmentCategory, setEditDepartmentCategory] = useState("")
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationDepartmentMaster(sendForm.departmentName, sendForm.code)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostDepartmentMaster(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setSendForm({ "userId": window.userId })
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
        let getResponse = await GetDepartmentMaster();
        let getDeptCategory = await GetDepartmentCategoryMaster();
        if (getResponse.status === 1) {
            // setLoder(0)
            setDepartmentList(getResponse.responseValue)
            setDepartmentCategoryList(getDeptCategory.responseValue)
        }
    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditDepartmentCategory("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteDepartmentMaster(rowId)
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
    let handleUpdate = async (id, categoryId, departmentName, code, superAdminUserId, categoryName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "categoryId": categoryId,
            "departmentName": departmentName,
            "code": code,
            "userId": superAdminUserId,

        }))
        setEditDepartmentCategory(categoryName)
        document.getElementById("departmentName").value = departmentName;
        document.getElementById("code").value = code;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationDepartmentMaster(sendForm.departmentName, sendForm.code)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutDepartmentMaster(sendForm)
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
        setClearDropdown(value);
        setSendForm({ "userId": window.superAdminUserId});
        setEditDepartmentCategory("");
        document.getElementById("departmentName").value = "";
        document.getElementById("code").value = "";
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
                            <Heading text='Department Master' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="categoryId" className="form-label">Department Category <span className="starMandatory">*</span></label>
                                    {departmentCategoryList && <DropdownWithSearch defaulNname="Select Category" name="categoryId" list={departmentCategoryList} valueName="id" displayName="categoryName" editdata={editDepartmentCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="departmentName" className="form-label">Department Name <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="departmentName" name="departmentName" onChange={handleChange} placeholder="Enter department name" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="code" className="form-label">Department Code <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="code" name="code" onChange={handleChange} placeholder="Enter code" />
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
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />Clear</button>
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
                        <div className="col-12 mt-2">
                            <div className='handlser'>
                                <Heading text="All Department List" />
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
                                            <th>Department Category</th>
                                            <th>Department Name</th>
                                            <th>Department Code</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {departmentList && departmentList.filter((val) => `${val.departmentName} ${val.code}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.categoryName}</td>
                                                    <td>{val.departmentName}</td>
                                                    <td>{val.code}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.categoryId, val.departmentName, val.code, val.superAdminUserId, val.categoryName) }} /></div>
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
                {showToaster === 1 ? <SuccessToster message={message} handle={setShowToaster} /> : ""}
                {showToaster === 2 ? <WarningToaster message={message} handle={setShowToaster} /> : ""}
                {showToaster === 3 ? <AlertToster message={message} handle={setShowToaster} /> : ""}
            </section>
            {/* <Loder val={loder} /> */}
        </>
    )
}
