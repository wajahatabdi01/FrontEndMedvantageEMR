import React, { useEffect, useState } from 'react'
import ValidationUserMaster from '../../../Validation/SuperAdmin/Master/ValidationUserMaster'
import PostUserMaster from '../../Api/Master/UserMaster/PostUserMaster'
import GetUserMaster from '../../Api/Master/UserMaster/GetUserMaster'
import DeleteUserMaster from '../../Api/Master/UserMaster/DeleteUserMaster'
import PutUserMaster from '../../Api/Master/UserMaster/PutUserMaster'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import checkStrength from '../../../Code/StrongPassword'


export default function UserMaster() {
  let [userList, setUserList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('')
  let [password, setPassword] = useState('');

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [passwordShown, setPasswordShown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let togglePassword = () => {

    setPasswordShown(!passwordShown);

  };


  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationUserMaster(sendForm.email, sendForm.password, sendForm.name)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostUserMaster(sendForm);
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
    let getResponse = await GetUserMaster();
    if (getResponse.status === 1) {
      setUserList(getResponse.responseValue)
    }
  }

  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (e.target.name === 'password') {
      setPassword(e.target.value);
      checkStrength(e.target.value)
    }
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }

  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let response = await DeleteUserMaster(rowId)
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
  let handleUpdate = async (id, email, password, name, superAdminUserId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "email": email,
      "password": password,
      "name": name,
      "userId": superAdminUserId,

    }))

    document.getElementById("email").value = email;
    document.getElementById("password").value = password;
    document.getElementById("name").value = name;
  }

  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationUserMaster(sendForm.email, sendForm.password, sendForm.name)
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutUserMaster(sendForm)

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
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("name").value = "";

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
              <Heading text='User Master' />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="name" className="form-label">Name <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="name" name="name" onChange={handleChange} placeholder="Enter name" />
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="email" className="form-label">Email <span className="starMandatory">*</span></label>
                  <input type="email" className="form-control form-control-sm" id="email" name="email" onChange={handleChange} placeholder="Enter email" />
                </div>
                <div className="mb-2 me-2" style={{ position: 'relative' }}>
                  <label htmlFor="password" className="form-label">Password <span className="starMandatory">*</span></label>
                  {/* <input type="text" className="form-control form-control-sm" id="password" name="password" onChange={handleChange} placeholder="Enter Conntry name" /> */}
                  <input className="form-control form-control-sm" id="password" type={passwordShown ? "text" : "password"} placeholder="Password" required="" name="password" onChange={handleChange} />
                  {passwordShown ? <span className="fa fa-eye-slash showPasswordicon1" onClick={togglePassword}></span> : <span className="fas fa-eye showPasswordicon1" onClick={togglePassword}></span>}
                  <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
                  <div id="popover-password">
                    <p><span id="result"></span></p>
                    <div className="progress mb-2" style={{display:'none'}}>
                      <div id="password-strength" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ "width": "0%" }}>
                      </div>
                    </div>
                    {/* <br /> */}
                    <ul className="list-unstyled" style={{ display: "none" }}>
                      <li className="">
                        <span className="low-upper-case">
                          <i className="fas fa-circle" aria-hidden="true"></i>
                          &nbsp;Lowercase &amp; Uppercase
                        </span>
                      </li>
                      <li className="">
                        <span className="one-number">
                          <i className="fas fa-circle" aria-hidden="true"></i>
                          &nbsp;Number (0-9)
                        </span>
                      </li>
                      <li className="">
                        <span className="one-special-char">
                          <i className="fas fa-circle" aria-hidden="true"></i>
                          &nbsp;Special Character (!@#$%^&*)
                        </span>
                      </li>
                      <li className="">
                        <span className="eight-character">
                          <i className="fas fa-circle" aria-hidden="true"></i>
                          &nbsp;Atleast 6 Character
                        </span>
                      </li>
                    </ul>
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
                <Heading text="All User List'" />
                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "73vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Password</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userList && userList.filter((val) => `${val.name} ${val.email} ${val.password}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.name}</td>
                          <td>{val.email}</td>
                          <td>{val.password}</td>
                          <td>

                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.email, val.password, val.name, val.superAdminUserId) }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
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
