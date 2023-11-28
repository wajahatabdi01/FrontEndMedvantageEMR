import React, { useEffect, useState } from 'react'
import GetApiDocumentDetails from '../../Api/APIMaster/ApiDocumentDetails/GetApiDocumentDetails'
import PostApiDocumentDetails from '../../Api/APIMaster/ApiDocumentDetails/PostApiDocumentDetails'
import DeleteApiDocumentDetails from '../../Api/APIMaster/ApiDocumentDetails/DeleteApiDocumentDetails'
import GetApiDocumentMenuMaster from '../../Api/APIMaster/ApiDocumentMenuMaster/GetApiDocumentMenuMaster'
import GetApiMaster from '../../Api/APIMaster/ApiMaster/GetApiMaster'
import PutApiDocumentDetails from '../../Api/APIMaster/ApiDocumentDetails/PutApiDocumentDetails'
import ValidationApiDocumentDetails from '../../../Validation/SuperAdmin/APIMaster/ValidationApiDocumentDetails'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';



export default function ApiDocumentDetails() {
  let [apiDocumentDetails, setApiDocumentDetails] = useState()
  let [apiDocumentMenuMaster, setApiDocumentMenuMaster] = useState()
  let [apiMaster, setApiMaster] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('')

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editApiDocument, setEditApiDocument] = useState("")
  let [editApiName, setEditApiName] = useState("")
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationApiDocumentDetails(sendForm.apiId, sendForm.apiDocumentMenuId, sendForm.details)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostApiDocumentDetails(sendForm);
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
    let getResponse = await GetApiDocumentDetails();
    let getResponseMenu = await GetApiDocumentMenuMaster();
    let getResponseApi = await GetApiMaster();

    if (getResponse.status === 1) {
      // setLoder(0)
      setApiDocumentDetails(getResponse.responseValue)
      setApiMaster(getResponseApi.responseValue)
      setApiDocumentMenuMaster(getResponseMenu.responseValue)
    }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditApiDocument("")
    setEditApiName("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }


  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let response = await DeleteApiDocumentDetails(rowId)
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
  let handleUpdate = async (id, menuId, apiId, details, superAdminUserId, apiDocumentMenuName, apiName) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "apiDocumentMenuId": menuId,
      "apiId": apiId,
      "details": details,
      "userId": window.superAdminUserId,
    }))
    setEditApiDocument(apiDocumentMenuName)
    setEditApiName(apiName)

    // document.getElementById("apiDocumentMenuId").value = menuId;
    // document.getElementById("apiId").value = apiId;
    document.getElementById("details").value = details


  }

  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationApiDocumentDetails(sendForm.apiId, sendForm.apiDocumentMenuId, sendForm.details)
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutApiDocumentDetails(sendForm)
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
    setEditApiDocument("")
    setEditApiName("")
    document.getElementById("details").value = "";
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
              <Heading text='Create Api Document Details' />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="apiDocumentMenuId" className="form-label">Api Document Menu <span className="starMandatory">*</span></label>
                  {apiDocumentMenuMaster && <DropdownWithSearch defaulNname="Select api document menu" name="apiDocumentMenuId" list={apiDocumentMenuMaster} valueName="id" displayName="apiDocumentMenuName" editdata={editApiDocument} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="apiId" className="form-label">Api Name <span className="starMandatory">*</span></label>
                  {apiMaster && <DropdownWithSearch defaulNname="Select api name" name="apiId" list={apiMaster} valueName="id" displayName="apiName" editdata={editApiName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="details" className="form-label">Details <span className="starMandatory">*</span></label>
                  <input type="text" name="details" id="details" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter details" />
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
                <Heading text="All Api Document List" />
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
                      <th>Api Document</th>
                      <th>Api</th>
                      <th>Details</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>


                  <tbody>
                    {apiDocumentDetails && apiDocumentDetails.filter((val) => `${val.apiDocumentMenuName} ${val.apiName} ${val.details}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.apiDocumentMenuName}</td>
                          <td>{val.apiName}</td>
                          <td>{val.details}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.apiDocumentMenuId, val.apiId, val.details, val.superAdminUserId, val.apiDocumentMenuName, val.apiName) }} /></div>
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
