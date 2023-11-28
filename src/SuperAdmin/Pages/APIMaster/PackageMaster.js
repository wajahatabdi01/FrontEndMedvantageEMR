import React, { useState, useEffect } from 'react'
import ValidationPackageMaster from '../../../Validation/SuperAdmin/APIMaster/ValidationPackageMaster'
import PostPackageMaster from '../../Api/APIMaster/PackageMaster/PostPackageMaster'
import GetPackageMaster from '../../Api/APIMaster/PackageMaster/GetPackageMaster'
import DeletePackageMaster from '../../Api/APIMaster/PackageMaster/DeletePackageMaster'
import PutPackageMaster from '../../Api/APIMaster/PackageMaster/PutPackageMaster'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import FileUpload from '../../../Clinical/API/FileUpload'

export default function PackageMaster() {
    let [packageList, setPackageList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    let [imagePath, setImagePath] = useState("")

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationPackageMaster(sendForm.packageTitle, sendForm.description, sendForm.price)
        if (valresponse) {
            setShowUnderProcess(1)
            let rspon = await FileUpload(imagePath)
            if (rspon.data.status === 1) {
                let temp = sendForm
                temp["defaultImage"] = rspon.data.responseValue
                let response = await PostPackageMaster(temp);
                if (response.status === 1) {
                    setShowUnderProcess(0)
                    setShowToster(1)
                    setTosterMessage("Data Save SuccessFully!")
                    setTosterValue(0)
                    setTimeout(() => {
                        setShowToster(0)
                    }, 2000)

                    // handleClear();
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
        let getResponse = await GetPackageMaster();
        if (getResponse.status === 1) {
            // setLoder(0)
            setPackageList(getResponse.responseValue)
        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "defaultImage") {
            setSendForm(sendForm => ({
                ...sendForm,
                ["defaultImage"]: e.target.files[0].name
            }))
            setImagePath(e.target.files[0])
        }
        else {
            setSendForm(sendForm => ({
                ...sendForm,
                [name]: value
            }))
        }

    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeletePackageMaster(rowId)
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
    let handleUpdate = async (id, packageTitle, description, price, superAdminUserId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "packageTitle": packageTitle,
            "description": description,
            "price": price,
            // "defaultImage": defaultImage,
            "userId": superAdminUserId,
        }))

        document.getElementById("packageTitle").value = packageTitle;
        document.getElementById("description").value = description;
        document.getElementById("price").value = price;
        // document.getElementById("defaultImage").value = defaultImage;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationPackageMaster(sendForm.packageTitle, sendForm.description, sendForm.price)
        if (valresponse) {
            setShowUnderProcess(1)

            let rspon = await FileUpload(imagePath)
            if (rspon.data.status === 1) {
                let temp = sendForm
                temp["defaultImage"] = rspon.data.responseValue

                let a = async () => {
                    let response = await PutPackageMaster(sendForm)
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
                a();
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
    let handleClear = () => {
        setSendForm({ "userId": window.superAdminUserId })
        document.getElementById("packageTitle").value = "";
        document.getElementById("description").value = "";
        document.getElementById("price").value = "";
        document.getElementById("defaultImage").value = "";
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
                            <Heading text='Package Master' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="packageTitle" className="form-label">Package Title<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="packageTitle" name="packageTitle" placeholder="Enter package title" onChange={handleChange} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="description" className="form-label">Description<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="description" name="description" placeholder="Enter description" onChange={handleChange} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="price" className="form-label">Price<span className="starMandatory">*</span></label>
                                    <input type="number" className="form-control form-control-sm" id="price" name="price" placeholder="Enter price" onChange={handleChange} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="defaultImage" className="form-label">Image</label>
                                    <input type="file" accept='image/*' className="form-control form-control-sm" id="defaultImage" name="defaultImage" onChange={handleChange} placeholder="Enter image url" />
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
                                <Heading text="All Package List" />
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
                                            <th>Package Title </th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {packageList && packageList.filter((val) => `${val.packageTitle} ${val.description} ${val.price} ${val.defaultImage}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.packageTitle}</td>
                                                    <td>{val.description}</td>
                                                    <td>{val.price}</td>
                                                    <td>{val.defaultImage}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.packageTitle, val.description, val.price, val.superAdminUserId) }} /></div>
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
