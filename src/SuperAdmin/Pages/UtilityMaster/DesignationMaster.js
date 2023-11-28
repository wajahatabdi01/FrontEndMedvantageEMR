import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading';
import TableContainer from '../../../Component/TableContainer';
import BoxContainer from '../../../Component/BoxContainer';
import ValidationDesignationMaster from '../../../Validation/SuperAdmin/UtilityMaster/ValidationDesignationMaster';
import PostDesignationMaster from '../../Api/UtilityMaster/DesignationMaster/PostDesignationMaster';
import GetDesignationMaster from '../../Api/UtilityMaster/DesignationMaster/GetDesignationMaster';
import DeleteDesignationMaster from '../../Api/UtilityMaster/DesignationMaster/DeleteDesignationMaster';
import PutDesignationMaster from '../../Api/UtilityMaster/DesignationMaster/PutDesignationMaster';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';

export default function DesignationMaster() {
  let [designationList, setDesignationList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('')

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationDesignationMaster(sendForm.designationName, sendForm.code)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostDesignationMaster(sendForm);
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
    let getResponse = await GetDesignationMaster();
    if (getResponse.status === 1) {
      setDesignationList(getResponse.responseValue)
    }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value,
      "userId": window.superAdminUserId,
    }))
  }

  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let response = await DeleteDesignationMaster(rowId)
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
  let handleUpdate = async (id, designationName, code, superAdminUserId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "designationName": designationName,
      "code": code,
      "userId": superAdminUserId,
    }))

    document.getElementById("designationName").value = designationName;
    document.getElementById("code").value = code;
  }


  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationDesignationMaster(sendForm.designationName, sendForm.code)
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutDesignationMaster(sendForm)
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
  let handleClear = () => {
    setSendForm({ "userId": window.superAdminUserId })
    document.getElementById("designationName").value = "";
    document.getElementById("code").value = "";
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
              <Heading text='Designation Master' />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="designationName" className="form-label">Designation Name <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="designationName" name='designationName' onChange={handleChange} placeholder="Enter Designation Name" />
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="code" className="form-label">Code <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="code" name="code" onChange={handleChange} placeholder="Enter code" />
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
            <div className="col-12 mt-3">
              <div className='handlser'>
                <Heading text="All Designation List" />
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
                      <th>Designation Name</th>
                      <th>Code</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {designationList && designationList.filter((val) => `${val.designationName} ${val.code}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.designationName}</td>
                          <td>{val.code}</td>
                          <td>

                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.designationName, val.code, val.superAdminUserId) }} /></div>
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
