import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import PostApplicationFeatureChecklistMaster from '../../Api/Master/ApplicationFeatureChecklistMaster/PostApplicationFeatureChecklistMaster'
import PutApplicationFeatureChecklistMaster from '../../Api/Master/ApplicationFeatureChecklistMaster/PutApplicationFeatureChecklistMaster'
import GetAllApplicationFeatureChecklistMaster from '../../Api/Master/ApplicationFeatureChecklistMaster/GetAllApplicationFeatureChecklistMaster'
import DeleteApplicationFeatureChecklistMaster from '../../Api/Master/ApplicationFeatureChecklistMaster/DeleteApplicationFeatureChecklistMaster'
import GetFeatureMaster from '../../Api/APIMaster/FeatureMaster/GetFeatureMaster'
import GetServiceMaster from '../../Api/APIMaster/ServiceMaster/GetServiceMaster'
import GetUserMaster from '../../Api/Master/UserMaster/GetUserMaster'
import ValidationApplicationFeatureChecklistMaster from '../../../Validation/SuperAdmin/Master/ValidationApplicationFeatureChecklistMaster'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';



export default function ApplicationFeatureChecklistMaster() {
  let [applicationFeatureChecklist, setApplicationFeatureChecklist] = useState()
  let [featureList, setFeatureList] = useState()
  let [serviceList, setServiceList] = useState()
  let [checkByList, setCheckByList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [rowId, setRowId] = useState('');

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editFeature, setEditFeature] = useState("")
  let [editService, setEditService] = useState("")
  let [editCheckedBy, setEditChedkedBy] = useState("")
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationApplicationFeatureChecklistMaster(sendForm.featureId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostApplicationFeatureChecklistMaster(sendForm);
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
    let getResponse = await GetAllApplicationFeatureChecklistMaster();
    let getService = await GetServiceMaster();
    let getFeature = await GetFeatureMaster();
    let getCheckBy = await GetUserMaster();
    // let getCheckBy = await GetAdminUser();

    if (getResponse.status === 1) {
      // setLoder(0)
      setApplicationFeatureChecklist(getResponse.responseValue)
      setFeatureList(getFeature.responseValue)
      setServiceList(getService.responseValue)
      setCheckByList(getCheckBy.responseValue)
    }


  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditFeature("")
    setEditService("")
    setEditChedkedBy("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }


  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let response = await DeleteApplicationFeatureChecklistMaster(rowId)
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
  let handleUpdate = async (id, featureId, serviceId, checkedBy, remark, currentStatusId, superAdminUserId, featureName, serviceName, checkedByname) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "featureId": featureId,
      "serviceId": serviceId,
      "checkedBy": checkedBy,
      "remark": remark,
      "currentStatusId": currentStatusId,
      "userId": superAdminUserId

    }))
    setEditFeature(featureName)
    setEditService(serviceName)
    setEditChedkedBy(checkedByname)
    // document.getElementById("featureId").value = featureId;
    // document.getElementById("serviceId").value = serviceId;
    // document.getElementById("checkedBy").value = checkedBy;
    document.getElementById("remark").value = remark;
    document.getElementById("currentStatusId").value = currentStatusId;
  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationApplicationFeatureChecklistMaster(sendForm.featureId)
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutApplicationFeatureChecklistMaster(sendForm)
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
    setEditFeature("")
    setEditService("")
    setEditChedkedBy("")
    // document.getElementById("featureId").value = 0;
    // document.getElementById("serviceId").value = 0;
    // document.getElementById("checkedBy").value = 0;
    document.getElementById("remark").value = "";
    document.getElementById("currentStatusId").value = "";
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
              <Heading text='Application Feature Checklist Master' />
              <BoxContainer>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="featureId" className="form-label"> Feature Name <span className="starMandatory">*</span></label>

                  {featureList && <DropdownWithSearch defaulNname="Select feature" name="featureId" list={featureList} valueName="id" displayName="featureName" editdata={editFeature} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="serviceId" className="form-label">Service Name <span className="starMandatory">*</span></label>

                  {serviceList && <DropdownWithSearch defaulNname="Select service" name="serviceId" list={serviceList} valueName="id" displayName="name" editdata={editService} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="checkedBy" className="form-label">Checked By Name <span className="starMandatory">*</span></label>

                  {checkByList && <DropdownWithSearch defaulNname="Select check by" name="checkedBy" list={checkByList} valueName="id" displayName="name" editdata={editCheckedBy} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="remark" className="form-label"> Remarks <span className="starMandatory">*</span></label>
                  <input type='text' className='form-control' id='remark' name='remark' onChange={handleChange} placeholder='Enter remarks' />
                </div>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="currentStatusId" className="form-label"> Current Status Name <span className="starMandatory">*</span></label>
                  <input type='number' className='form-control' id='currentStatusId' name='currentStatusId' onChange={handleChange} placeholder='Enter current Status Name' />
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
                <Heading text="All Application Feature Checklist" />
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
                      <th>Feature Name</th>
                      <th>Service Name</th>
                      <th>Checked by Name</th>
                      <th>Remarks</th>
                      <th>Current Status Name</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applicationFeatureChecklist && applicationFeatureChecklist.filter((val) => `${val.featureName} ${val.serviceName}${val.checkedByname} ${val.remark}${val.currentStatusId} `.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.featureName}</td>
                          <td>{val.serviceName}</td>
                          <td>{val.checkedByname}</td>
                          <td>{val.remark}</td>
                          <td>{val.currentStatusId}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.featureId, val.serviceId, val.checkedBy, val.remark, val.currentStatusId, val.superAdminUserId, val.featureName, val.serviceName, val.checkedByname) }} /></div>
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
