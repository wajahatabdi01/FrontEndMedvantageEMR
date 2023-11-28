import React, { useState, useEffect } from 'react'
import ValidationStateMaster from '../../../Validation/SuperAdmin/Master/ValidationStateMaster'
import PostStateMaster from '../../Api/Master/StateMaster/PostStateMaster'
import DeleteStateMaster from '../../Api/Master/StateMaster/DeleteStateMaster'
import PutStateMaster from '../../Api/Master/StateMaster/PutStateMaster'
import GetCountryMaster from '../../Api/Master/CountryMaster/GetCountryMaster'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetStateMasterById from '../../Api/Master/StateMaster/GetStateMasterById'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';

export default function StateMaster() {
    let [stateList, setStateList] = useState()
    let [countryList, setCountryList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editCountryName, seteditCountryName] = useState("")
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };



    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationStateMaster(sendForm.countryId, sendForm.stateName)

        if (valresponse) {
            setShowUnderProcess(1)

            let response = await PostStateMaster(sendForm);
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
        // let getResponse = await GetStateMaster();
        let getCountry = await GetCountryMaster();

        if (getCountry.status === 1) {
            // setStateList(getResponse.responseValue)
            setCountryList(getCountry.responseValue)

        }
    }
    let getdataByID = async(val) => {
        let getResponse = await GetStateMasterById(val);
        if (getResponse.status === 1) {
            setStateList(getResponse.responseValue)
        }
    }


   // Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        seteditCountryName("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
        if (name === "countryId") {
            getdataByID(value)
        }
    }



    //Handle Delete
    let handleDeleteRow = async () => {
        setShowUnderProcess(1)
        let response = await DeleteStateMaster(rowId)
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
    let handleUpdate = async (id, countryId, stateName, superAdminUserId, countryName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "countryId": countryId,
            "stateName": stateName,
            "userId": superAdminUserId,
        }))
        seteditCountryName(countryName)
        // document.getElementById("countryId").value = countryId;
        document.getElementById("stateName").value = stateName;
    }

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationStateMaster(sendForm.countryId, sendForm.stateName)
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutStateMaster(sendForm)

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
        setClearDropdown(value)
        seteditCountryName("")
        setSendForm({ "userId": window.superAdminUserId })
        // document.getElementById("countryId").value = 0;
        document.getElementById("stateName").value = "";
        setUpdateBool(0)
    }

    useEffect(() => {
        getdata()
        getdataByID(101)
    }, [])

    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text='State Master' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="countryId" className="form-label">Country <span className="starMandatory">*</span></label>
                                    {countryList && <DropdownWithSearch defaulNname="Select Country" name="countryId" list={countryList} valueName="id" displayName="countryName" editdata={editCountryName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="stateName" className="form-label">State Name <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="stateName" name="stateName" placeholder="Enter State name" onChange={handleChange} />
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
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={()=>{handleClear(1)}}><img src={clearIcon} className='icnn' alt='' />Clear</button>
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
                                <Heading text="All State List" />
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
                                            <th>Country </th>
                                            <th>State Name</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {stateList && stateList.filter((val) => `${val.countryName} ${val.stateName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.countryName}</td>
                                                    <td>{val.stateName}</td>
                                                    <td>                                                       
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.countryId, val.stateName, val.superAdminUserId, val.countryName) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        
                                        }
                                        )}
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
