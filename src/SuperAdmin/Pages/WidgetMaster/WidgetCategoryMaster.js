import React, { useEffect, useState } from 'react';
import Toster from '../../../Component/Toster';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import TableContainer from '../../../Component/TableContainer';
import PostWidgetCategoryMaster from '../../Api/WidgetCategoryMaster/PostWidgetCategoryMaster';
import ValidationWidgetCategoryMaster from '../../../Validation/SuperAdmin/WidgetMaster/ValidationWidgetCategoryMaster';
import GetWidgetCategoryMaster from '../../Api/WidgetCategoryMaster/GetWidgetCategoryMaster';
import PutWidgetCategoryMaster from '../../Api/WidgetCategoryMaster/PutWidgetCategoryMaster';
import DeleteWidgetCategoryMaster from '../../Api/WidgetCategoryMaster/DeleteWidgetCategoryMaster';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';


export const WidgetCategoryMaster = () => {
    const [loder, setLoder] = useState(0);
    const [showToster, setShowToster] = useState(0);
    const [rowId, setRowId] = useState('');
    const [showUnderProcess, setShowUnderProcess] = useState(0);
    const [tosterMessage, setTosterMessage] = useState("");
    const [tosterValue, setTosterValue] = useState(0);
    const [updateBool, setUpdateBool] = useState(0);
    const [categoryNameList, setCategoryNameList] = useState([]);
    const [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId });
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    //Handle Change
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "categoryName") {
            document.getElementById("errddlCategoryName").style.display = "none"
        }
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    };

    //Handle Save
    const saveForm = async () => {
        const valresponse = ValidationWidgetCategoryMaster(sendForm.categoryName)
        if (valresponse[0]) {
            setShowUnderProcess(1)
            const response = await PostWidgetCategoryMaster(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Saved SuccessFully!")
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
            getData();
        }
        else {
            document.getElementById(valresponse[1]).innerHTML = valresponse[2]
            document.getElementById(valresponse[1]).style.display = "block"
        }
    };

    const handleClear = async () => {
        setSendForm([]);
        document.getElementById('categoryName').value = '';
        setUpdateBool(0);
    };

    const getData = async () => {
        const data = await GetWidgetCategoryMaster();
        if (data.status === 1) {
            setLoder(0)
            setCategoryNameList(data.responseValue)
        }
    };

    //HANDLE UPDATE
    const saveUpdate = async () => {
        const valresponse = ValidationWidgetCategoryMaster(sendForm.categoryName)
        if (valresponse[0]) {
            setShowUnderProcess(1)
            const response = await PutWidgetCategoryMaster(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Updated SuccessFully!")
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
            getData();
        }
        else {
            document.getElementById(valresponse[1]).innerHTML = valresponse[2]
            document.getElementById(valresponse[1]).style.display = "block"
        }
    };

    //edit
    const edit = async (id, categoryName, superAdminUserId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "categoryName": categoryName,
            "userId": superAdminUserId,
        }))

        document.getElementById("categoryName").value = categoryName;

    };


    //handle delete
    const handleDeleteRow = async () => {
        setShowUnderProcess(1)
        let response = await DeleteWidgetCategoryMaster(rowId)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted SuccessFully!")
            setTosterValue(0)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
            getData();
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
    };


    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text='Widget Category Master' />
                            <BoxContainer>
                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="categoryName" className="form-label">Category Name<span className="starMandatory">*</span></label>
                                    <input type="text" name="categoryName" id="categoryName" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter Category Name" />
                                    <small id="errddlCategoryName" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                                <Heading text='Widget Category Master List' />
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
                                            <th>Category Name</th>

                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {categoryNameList && categoryNameList.filter((val) => `${val.categoryName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.categoryName}</td>

                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { edit(val.id, val.categoryName, val.superAdminUserId) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
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
