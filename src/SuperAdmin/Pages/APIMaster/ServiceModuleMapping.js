import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import TableContainer from '../../../Component/TableContainer'
import BoxContainer from '../../../Component/BoxContainer'
import GetServiceMaster from '../../Api/APIMaster/ServiceMaster/GetServiceMaster'
import ValidationServiceModuleMapping from '../../../Validation/SuperAdmin/APIMaster/ValidationServiceModuleMapping'
import PostServiceModuleMapping from '../../Api/APIMaster/ServiceModuleMapping/PostServiceModuleMapping'
import GetServiceModuleMapping from '../../Api/APIMaster/ServiceModuleMapping/GetServiceModuleMapping'
import GetModuleMaster from '../../Api/Master/ModuleMaster/GetModuleMaster'
import DeleteServiceModuleMapping from '../../Api/APIMaster/ServiceModuleMapping/DeleteServiceModuleMapping'
import PutServiceModuleMapping from '../../Api/APIMaster/ServiceModuleMapping/PutServiceModuleMapping'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';

export default function ServiceModuleMapping() {
    let [serviceModuleList, setServiceModuleList] = useState()
    let [serviceList, setServiceList] = useState()
    let [moduleList, setmoduleList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editService, setEditService] = useState("")
    let [editModule, setEditModule] = useState("")


    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationServiceModuleMapping(sendForm.serviceId, sendForm.moduleId)
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostServiceModuleMapping(sendForm);
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
        let getResponse = await GetServiceModuleMapping();
        let getService = await GetServiceMaster();
        let getModule = await GetModuleMaster();
        if (getResponse.status === 1) {
            setServiceModuleList(getResponse.responseValue)
            setServiceList(getService.responseValue)
            setmoduleList(getModule.responseValue)
        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditService("")
        setEditModule("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteServiceModuleMapping(rowId)
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
    let handleUpdate = async (id, serviceId, moduleId, superAdminUserId, serviceName, moduleName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "serviceId": serviceId,
            "moduleId": moduleId,
            "userId": window.superAdminUserId,
        }))
        setEditService(serviceName)
        setEditModule(moduleName)
    }

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationServiceModuleMapping(sendForm.serviceId, sendForm.moduleId)
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutServiceModuleMapping(sendForm)
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
        setSendForm({ "userId": window.superAdminUserId })
        setClearDropdown(value)
        setEditService("")
        setEditModule("")
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
                            <Heading text='Service Module Mapping' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="serviceId" className="form-label">Service <span className="starMandatory">*</span></label>
                                    {/* <select name='serviceId' id="serviceId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {serviceList && serviceList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.name}</option>
                                            )
                                        })}
                                    </select> */}
                                    {serviceList && <DropdownWithSearch defaulNname="Select service" name="serviceId" list={serviceList} valueName="id" displayName="name" editdata={editService} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="moduleId" className="form-label">Module <span className="starMandatory">*</span></label>
                                    {/* <select name='moduleId' id="moduleId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {moduleList && moduleList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.moduleName}</option>
                                            )
                                        })}
                                    </select> */}
                                    {moduleList && <DropdownWithSearch defaulNname="Select module" name="moduleId" list={moduleList} valueName="id" displayName="moduleName" editdata={editModule} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                            <Heading text='Service and Module Mapping List' />
                            <div className="med-table-section" style={{ "height": "73vh" }}>
                                <TableContainer>
                                    <thead>

                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Service</th>
                                            <th>Module</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {serviceModuleList && serviceModuleList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.serviceName}</td>
                                                    <td>{val.moduleName}</td>
                                                    <td>
                                                     
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.serviceId, val.moduleId, val.superAdminUserId, val.serviceName, val.moduleName) }} /></div>
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
