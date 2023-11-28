import React, { useEffect, useState } from 'react'
import ValidationCategoryMaster from '../../../Validations/SuperAdmin/Master/ValidationCategoryMaster'
import PostCategoryMaster from '../../Api/Master/CategoryMaster/PostCategoryMaster'
import GetCategoryMaster from '../../Api/Master/CategoryMaster/GetCategoryMaster'
import DeleteCategoryMaster from '../../Api/Master/CategoryMaster/DeleteCategoryMaster'
import PutCategoryMaster from '../../Api/Master/CategoryMaster/PutCategoryMaster'
import Loder from "../../../Components/Loder"
import Heading from '../../../Components/Heading'
import BoxContainer from '../../../Components/BoxContainer'
import TableContainer from '../../../Components/TableContainer'
import SuccessToster from '../../../Components/SuccessToster'
import WarningToaster from '../../../Components/WarningToaster'
import AlertToster from '../../../Components/AlertToster'


export default function CategoryMaster() {
    let [categoryList, setCategoryList] = useState()
    let [categoryName, setCategoryName] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationCategoryMaster(sendForm.categoryName)

        if (valresponse) {
            setLoder(1)

            let response = await PostCategoryMaster(sendForm);
            if (response.status === 1) {
                setMessage("Date saved successfully!!")
                setShowToster(1)
                setLoder(0)
                getdata()
                handleClear();
            }
            else {
                setMessage("Date not saved !!")
                setShowToster(2)
            }
        }
        else {
            setMessage("Fields can't be blank!!")

            setShowToster(3)
        }
    }

    //Get data
    let getdata = async () => {
        let getResponse = await GetCategoryMaster();
        console.log("dadadad", getResponse)
        if (getResponse.status === 1) {
            setLoder(0)
            setCategoryList(getResponse.responseValue)
        }

    }

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }
    //Handle Delete
    let handleDeleteRow = async (id) => {
        setLoder(1)
        let response = await DeleteCategoryMaster(id)
        if (response.status === 1) {
            setMessage("Date deleted successfully!!")
            setShowToster(3)
            setLoder(0)
            getdata()
        }
        else {
            setMessage("Date not deleted !!")
            setShowToster(2)
        }
    }

    //Handle Button Change
    let handleUpdate = async (id, categoryName, superAdminUserId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "categoryName": categoryName,
            "userId": superAdminUserId,

        }))

        document.getElementById("categoryName").value = categoryName;
    }

    // Handle Update
    let saveUpdate = async () => {
        let response = await PutCategoryMaster(sendForm)

        if (response.status === 1) {
            setMessage("Data updated successfully!!")
            setShowToster(1)
            setUpdateBool(0)
            getdata()
            handleClear();
        }
        else {
            setMessage("Date not updated !!")
            setShowToster(2)
        }
    }
    //Handle Clear
    let handleClear = () => {
        setSendForm({"userId": window.superAdminUserId})
        document.getElementById("categoryName").value = "";
        categoryName = "";
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
                            <Heading text='Category Master' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="categoryName" className="form-label">Category Name <span className="starMandatory">*</span></label>
                                    <input type="text" name="categoryName" id="categoryName" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter category name" />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <div>
                                        {updateBool === 0 ?
                                            <>
                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveForm}>Save</button>
                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}>Clear</button>
                                            </>
                                            :
                                            <>
                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>Update</button>
                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>Cancel</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </BoxContainer>
                        </div>
                        <div className="col-12 mt-2">
                            <Heading text='All Category List' />
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Category Name</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {categoryList && categoryList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.categoryName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.categoryName, val.superAdminUserId) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { handleDeleteRow(val.id) }}></i>
                                                            </div>
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
                                            {/* <div className="modal-header">
            <h1 className="modal-title  fs-5" id="deleteModalLabel">Delete</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div> */}
                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> Delete?</div>
                                                <div className='popDeleteContent'> Are you sure you want to delete?</div>

                                            </div>
                                            <div className="modal-footer1 text-center">
                                                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
            <button type="button" className="btn btn-primary">Yes</button> */}
                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn-delete popBtnDelete">Delete</button>
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
