import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import ValidationApiMaster from '../../../Validation/SuperAdmin/APIMaster/ValidationApiMaster'
import GetApiMaster from '../../Api/APIMaster/ApiMaster/GetApiMaster'
import DeleteApiMaster from '../../Api/APIMaster/ApiMaster/DeleteApiMaster'
import PutApiMaster from '../../Api/APIMaster/ApiMaster/PutApiMaster'
import PostApiMaster from '../../Api/APIMaster/ApiMaster/PostApiMaster'
import GetBaseUrlMaster from '../../Api/APIMaster/BaseUrlMaster/GetBaseUrlMaster'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';

export default function ApiMaster() {

  let [apiList, setApiList] = useState()
  let [baseUrlList, setBaseUrlList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('')
  const [isChecked, setIsChecked] = useState(false);

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editBaseUrl, setEditBaseUrl] = useState("")
  const [searchTerm, setSearchTerm] = useState('');
  let [isExternal, setIsExternal] = useState(false);

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationApiMaster(sendForm.apiName, sendForm.baseUrlID, sendForm.apiUrl, sendForm.parameters, sendForm.successResponse, sendForm.failureResponse, sendForm.headerDetails, sendForm.method)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostApiMaster({
        ...sendForm,
        isEXternal: isExternal ? 1 : 0,
      });
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


  const handleCheckboxChange = (id) => {
    const updatedApiList = apiList.map((api) => {
      if (api.id === id) {
        api.isEXternal = !api.isEXternal;
      }
      return api;
    });
    setApiList(updatedApiList);
  };


  //Get data
  let getdata = async () => {
    let getResponse = await GetApiMaster();
    let getBaseUrl = await GetBaseUrlMaster();
    if (getResponse.status === 1) {
      // setLoder(0)
      setApiList(getResponse.responseValue)
      setBaseUrlList(getBaseUrl.responseValue)

    }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditBaseUrl("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }

  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let response = await DeleteApiMaster(rowId)
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
  let handleUpdate = async (id, apiName, baseUrlID, apiUrl, parameters, successResponse, failureResponse, headerDetails, method, isEXternal, superAdminUserId, baseUrl) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "apiName": apiName,
      "baseUrlID": baseUrlID,
      "apiUrl": apiUrl,
      "parameters": parameters,
      "successResponse": successResponse,
      "failureResponse": failureResponse,
      "headerDetails": headerDetails,
      "method": method,
      "isEXternal": isExternal ? 1 : 0,
      "userId": superAdminUserId,
    }))

    document.getElementById("apiName").value = apiName;
    // document.getElementById("baseUrlID").value = baseUrlID;
    setEditBaseUrl(baseUrl)
    document.getElementById("apiUrl").value = apiUrl;
    document.getElementById("parameters").value = parameters;
    document.getElementById("successResponse").value = successResponse;
    document.getElementById("failureResponse").value = failureResponse;
    document.getElementById("headerDetails").value = headerDetails;
    document.getElementById("method").value = method;
    document.getElementById("isEXternal").checked = isExternal;;
  }


  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationApiMaster(sendForm.apiName, sendForm.baseUrlID, sendForm.apiUrl, sendForm.parameters, sendForm.successResponse, sendForm.failureResponse, sendForm.headerDetails, sendForm.method)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutApiMaster(sendForm)
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

  const clearIsExternal = () => {
    setIsExternal(false);
  };

  //Handle Clear
  let handleClear = (value) => {
    setSendForm({ "userId": window.superAdminUserId })
    setClearDropdown(value)
    document.getElementById("apiName").value = "";
    document.getElementById("apiUrl").value = "";
    // document.getElementById("baseUrlID").value = 0;
    setEditBaseUrl("")
    document.getElementById("parameters").value = "";
    document.getElementById("successResponse").value = "";
    document.getElementById("failureResponse").value = "";
    document.getElementById("headerDetails").value = "";
    document.getElementById("method").value = "";
    document.getElementById("isEXternal").value = "";
    clearIsExternal();
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
              <Heading text='Api Master' />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="apiName" className="form-label">Api Name<span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="apiName" name="apiName" onChange={handleChange} placeholder="Enter Api Name" />
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="baseUrlID" className="form-label">Base Url</label>
                  {baseUrlList && <DropdownWithSearch defaulNname="Select base url" name="baseUrlID" list={baseUrlList} valueName="id" displayName="baseUrl" editdata={editBaseUrl} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="apiUrl" className="form-label">Api Url<span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="apiUrl" name="apiUrl" onChange={handleChange} placeholder="Enter Api Url" />
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="headerDetails" className="form-label">Header Details<span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="headerDetails" name="headerDetails" onChange={handleChange} placeholder="Enter header details" />
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="parameters" className="form-label">Parameters<span className="starMandatory">*</span></label>
                  <textarea className="form-control form-control-sm" id="parameters" name="parameters" onChange={handleChange} placeholder="Enter parameter Url">
                  </textarea>

                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="successResponse" className="form-label">Success Response<span className="starMandatory">*</span></label>
                  <textarea className="form-control form-control-sm" id="successResponse" name="successResponse" onChange={handleChange} placeholder="Enter success response">
                  </textarea>
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="failureResponse" className="form-label">Failure Response<span className="starMandatory">*</span></label>
                  <textarea className="form-control form-control-sm" id="failureResponse" name="failureResponse" onChange={handleChange} placeholder="Enter failure response"></textarea>
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="method" className="form-label">Method<span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="method" name="method" onChange={handleChange} placeholder="Enter method" />
                </div>
                <div className="mb-2 me-2">
                  <label className="form-label">&nbsp;</label>
                  {/* <input type="checkbox" id="isEXternal" name="isEXternal" onChange={handleChange} style={{height:'30px', width:'30px'}}/> */}

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isEXternal"
                      name="isEXternal"
                      checked={isExternal}
                      onChange={() => setIsExternal(!isExternal)}
                      style={{ height: '20px', width: '20px', marginRight: '10px' }}
                    />
                    <label className="form-check-label" htmlFor="isEXternal" style={{ lineHeight: '30px' }} >
                      isExternal
                    </label>
                  </div>

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
                <Heading text="Api Details List" />
                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "63vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Api Name </th>
                      <th>Base Url </th>
                      <th>Api Url </th>
                      <th>Parameters </th>
                      <th>Success Response </th>
                      <th>Failure Response </th>
                      <th>Header Details </th>
                      <th>Meathod </th>
                      <th>Is External </th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {apiList && apiList.filter((val) => `${val.apiName} ${val.baseUrl} ${val.apiUrl} ${val.parameters} ${val.successResponse} ${val.failureResponse}${val.headerDetails} ${val.method}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.apiName}</td>
                          <td>{val.baseUrl}</td>
                          <td>{val.apiUrl}</td>
                          <td>{val.parameters}</td>
                          <td>{val.successResponse}</td>
                          <td>{val.failureResponse}</td>
                          <td>{val.headerDetails}</td>
                          <td>{val.method}</td>
                          {/* <td>{val.isEXternal ? <input type='checkbox' checked readOnly /> : <input type='checkbox' readOnly />}</td> */}
                          <td>
                            <input
                              type="checkbox"
                              checked={val.isEXternal}
                              onChange={() => handleCheckboxChange(val.id)}
                              readOnly
                            />
                          </td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.apiName, val.baseUrlID, val.apiUrl, val.parameters, val.successResponse, val.failureResponse, val.headerDetails, val.method, val.isEXternal, val.superAdminUserId, val.baseUrl) }} /></div>
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
    </>
  )
}
