import React, { useState, useEffect } from 'react'
import ValidationCityMaster from '../../../Validation/SuperAdmin/Master/ValidationCityMaster'
import PostCityMaster from '../../Api/Master/CityMaster/PostCityMaster'
import GetStateMaster from '../../Api/Master/StateMaster/GetStateMaster'
import DeleteCityMaster from '../../Api/Master/CityMaster/DeleteCityMaster'
import PutCityMaster from '../../Api/Master/CityMaster/PutCityMaster'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import GetCItyById from '../../Api/Master/CityMaster/GetCItyById'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';

export default function CityMaster() {
    let [cityList, setCityList] = useState()
    let [stateList, setStateList] = useState()
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
    let [editStateName, seteditStateName] = useState("")
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationCityMaster(sendForm.stateId, sendForm.cityName)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostCityMaster(sendForm);
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
            getdataByID()
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
        // let getResponse = await GetCityMaster();
        let getState = await GetStateMaster();
        if (getState.status === 1) {
            // setCityList(getResponse.responseValue)
            setStateList(getState.responseValue)
        }

    }

    let getdataByID = async (val) => {
        let getResponse = await GetCItyById(val);
        if (getResponse.status === 1) {
            setCityList(getResponse.responseValue)
        }
    }


    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        seteditStateName("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
        if (name === "stateId") {
            getdataByID(value)
        }
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteCityMaster(rowId)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted SuccessFully!")
            setTosterValue(0)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
            getdata()
            getdataByID()
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
    let handleUpdate = async (id, stateId, name, superAdminUserId, stateName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "stateId": stateId,
            "cityName": name,
            "userId": superAdminUserId,
        }))
        seteditStateName(stateName)
        // document.getElementById("stateId").value = stateId;
        document.getElementById("cityName").value = name;
    }

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationCityMaster(sendForm.stateId, sendForm.cityName)
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutCityMaster(sendForm)

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
                getdataByID()
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
    }
    //Handle Clear
    let handleClear = (value) => {
        setClearDropdown(value)
        seteditStateName("")
        setSendForm({ "userId": window.superAdminUserId })
        // document.getElementById("stateId").value = 0;
        document.getElementById("cityName").value = "";
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
        getdataByID(38)
    }, [])

    return (

        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text="City Master" />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="Department" className="form-label">State <span className="starMandatory">*</span></label>                                  
                                    {stateList && <DropdownWithSearch defaulNname="Select State" name="stateId" list={stateList} valueName="id" displayName="stateName" editdata={editStateName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="cityName" className="form-label">City Name <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="cityName" name="cityName" placeholder="Enter City name" onChange={handleChange} />
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
                                <Heading text="All City List" />
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
                                            <th>State Name</th>
                                            <th>City Name</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {cityList && cityList.filter((val) => `${val.stateName} ${val.name}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {

                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.stateName}</td>
                                                    <td>{val.name}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.stateId, val.name, val.superAdminUserId, val.stateName) }} /></div>
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
