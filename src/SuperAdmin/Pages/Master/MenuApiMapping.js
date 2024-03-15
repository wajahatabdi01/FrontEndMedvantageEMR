import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import ValidationMenuApiMapping from '../../../Validation/SuperAdmin/Master/ValidationMenuApiMapping'
import PostMenuApiMapping from '../../Api/Master/MenuApiMapping/PostMenuApiMapping'
import GetMenuApiMapping from '../../Api/Master/MenuApiMapping/GetMenuApiMapping'
import GetApiMaster from '../../Api/APIMaster/ApiMaster/GetApiMaster'
import DeleteMenuApiMapping from '../../Api/Master/MenuApiMapping/DeleteMenuApiMapping'
import PutMenuApiMapping from '../../Api/Master/MenuApiMapping/PutMenuApiMapping'
import TableContainer from '../../../Component/TableContainer'

import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetAllMenuMaster from '../../Api/Master/MenuMaster/GetAllMenuMaster'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch'


export default function MenuApiMapping() {
  let [menuMappingList, setMenuMappingList] = useState()
  let [menuList, setMenuList] = useState()
  let [apiList, setApiList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)
  let [message, setMessage] = useState("")
  let [showToaster, setShowToaster] = useState(0)
  let [rowId, setRowId] = useState('')

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editMenu, setEditMenu] = useState("")
  let [editApi, setEditApi] = useState("")
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationMenuApiMapping(sendForm.menuID, sendForm.apiID)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostMenuApiMapping(sendForm);
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
    let getResponse = await GetMenuApiMapping();
    let getMenu = await GetAllMenuMaster();
    let getApi = await GetApiMaster();
    

    if (getResponse.status === 1) {
      setMenuMappingList(getResponse.responseValue)
      setMenuList(getMenu.responseValue)
      setApiList(getApi.responseValue)
    }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditMenu("")
    setEditApi("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }

  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let response = await DeleteMenuApiMapping(rowId)
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
  let handleUpdate = async (apiMenuID, menuId, apiID, superAdminUserId, menuName, apiName) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": apiMenuID,
      "menuID": menuId,
      "apiID": apiID,
      "userId": superAdminUserId,
    }))
   
    setEditMenu(menuName)
    setEditApi(apiName)
    // document.getElementById("menuID").value = menuId;
    // document.getElementById("apiID").value = apiID;
  }


  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationMenuApiMapping(sendForm.menuID, sendForm.apiID)
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutMenuApiMapping(sendForm)
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
    setEditMenu("")
    setEditApi("")
    // document.getElementById("menuID").value = 0;
    // document.getElementById("apiID").value = 0;
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
              <Heading text='Menu API Mapping' />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="menuID" className="form-label">Menu <span className="starMandatory">*</span></label>
                  {/* <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='menuID' name='menuID' onChange={handleChange}>
                    <option value="0">Select</option>
                    {menuList && menuList.map((val, index) => {
                      console.log(val)
                      return (
                        <option value={val.id}>{val.menuName}</option>
                      )
                    })}
                  </select> */}
                  {menuList && <DropdownWithSearch defaulNname="Select menu" name="menuID" list={menuList} valueName="id" displayName="menuName" editdata={editMenu} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="Department" className="form-label">API</label>
                  {/* <select name='apiID' id="apiID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {apiList && apiList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.apiName}</option>
                      )
                    })}
                  </select> */}
                  {apiList && <DropdownWithSearch defaulNname="Select api" name="apiID" list={apiList} valueName="id" displayName="apiName" editdata={editApi} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
            <div className="col-12 mt-3">
              <div className='handlser'>
                <Heading text="Menu & API Mapping List" />
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
                      <th>Menu</th>
                      <th>API Name</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {menuMappingList && menuMappingList.filter((val) => `${val.menuName} ${val.apiName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.menuName}</td>
                          <td>{val.apiName}</td>
                          <td>

                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.apiMenuID, val.menuId, val.apiID, val.superAdminUserId, val.menuName, val.apiName) }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.apiMenuID) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })

                    }


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
