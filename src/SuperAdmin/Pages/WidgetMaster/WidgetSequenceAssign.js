import React, { useEffect, useState } from 'react';
import Toster from '../../../Component/Toster';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import TableContainer from '../../../Component/TableContainer';
import ValidationWidgetSequenceAssign from '../../../Validation/SuperAdmin/WidgetMaster/ValidationWidgetSequenceAssign';
import GetUserList from '../../Api/WidgetSequenceAssign/GetUserList';
import GetWidgetMaster from '../../Api/WidgetMaster/GetWidgetMaster';
import PostWidgetSequenceAssign from '../../Api/WidgetSequenceAssign/PostWidgetSequenceAssign';
import GetWidgetSequenceAssign from '../../Api/WidgetSequenceAssign/GetWidgetSequenceAssign';
import PutWidgetSequenceAssign from '../../Api/WidgetSequenceAssign/PutWidgetSequenceAssign';
import DeleteWidgetSequenceAssign from '../../Api/WidgetSequenceAssign/DeleteWidgetSequenceAssign';
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';

export const WidgetSequenceAssign = () => {

  const [loder, setLoder] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [rowId, setRowId] = useState('');
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [updateBool, setUpdateBool] = useState(0);
  const [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId });
  const [widgetList, setWidgetList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [widgetSequenceAssignList, setwidgetSequenceAssignList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let [clearDropdown, setClearDropdown] = useState(0)
  let [editWidget, setEditWidget] = useState("")
  let [editUser, setEditUser] = useState("")

  const getData = async () => {
    const getWidgetList = await GetWidgetMaster();
    const getUserList = await GetUserList();
    const getWidgetSequenceAssignList = await GetWidgetSequenceAssign();
    console.log('getWidgetSequenceAssignList.responseValue', getUserList);

    if (getWidgetList.status === 1) {
      setWidgetList(getWidgetList.responseValue);
    }

    if (getUserList.status === 1) {
      setUserList(getUserList.responseValue);
    }

    if (getWidgetSequenceAssignList.status === 1) {
      setwidgetSequenceAssignList(getWidgetSequenceAssignList.responseValue);
    }
  };

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditWidget("")
    setEditUser("")
    if (name === "widgetId") {
      document.getElementById("errddlWidgetId").style.display = "none";
    }

    else if (name === "sequenceNumber") {
      document.getElementById("errddlSequenceNumber").style.display = "none";

    }
    else if (name === "assignedTo") {
      document.getElementById("errddlassignedTo").style.display = "none";

    }


    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  };

  const saveForm = async () => {
    const valresponse = ValidationWidgetSequenceAssign(sendForm.widgetId, sendForm.sequenceNumber, sendForm.assignedTo)


    if (valresponse[0]) {
      setShowUnderProcess(1)

      const response = await PostWidgetSequenceAssign(sendForm);
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
      getData()
    }
    else {
      document.getElementById(valresponse[1]).innerHTML = valresponse[2]
      document.getElementById(valresponse[1]).style.display = "block"
    }
  };

  const edit = async (id, widgetId, sequenceNumber, assignedTo, superAdminUserId, widgetname, userName) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "widgetId": widgetId,
      "sequenceNumber": sequenceNumber,
      "assignedTo": assignedTo,
      "userId": superAdminUserId,
    }))
    setEditWidget(widgetname)
    // document.getElementById("widgetId").value = widgetId;
    // document.getElementById('assignedTo').value = assignedTo;
    document.getElementById('sequenceNumber').value = sequenceNumber;
    setEditUser(userName)
  };

  const saveUpdate = async () => {
    const valresponse = ValidationWidgetSequenceAssign(sendForm.widgetId, sendForm.sequenceNumber, sendForm.assignedTo)


    if (valresponse[0]) {
      setShowUnderProcess(1)

      const response = await PutWidgetSequenceAssign(sendForm);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Updated SuccessFully!")
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
      getData()
    }
    else {
      document.getElementById(valresponse[1]).innerHTML = valresponse[2]
      document.getElementById(valresponse[1]).style.display = "block"
    }
  };

  const handleDeleteRow = async () => {
    setShowUnderProcess(1)
    let response = await DeleteWidgetSequenceAssign(rowId)
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

  const handleClear = async (value) => {
    setSendForm([]);
    setClearDropdown(value)
    setUpdateBool(0);
    setEditWidget("")
    setEditUser("")
    // document.getElementById('assignedTo').value = '0';
    // document.getElementById('widgetId').value = '0';
    document.getElementById('sequenceNumber').value = '';
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
              <Heading text='Widget Sequence Assign' />
              <BoxContainer>



                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="widgetId" className="form-label">Widget<span className="starMandatory">*</span></label>
                  {/* <select name='widgetId' id="widgetId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {widgetList && widgetList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.title}</option>
                      )
                    })}
                  </select> */}
                  {widgetList && <DropdownWithSearch defaulNname="Select widget" name="widgetId" list={widgetList} valueName="id" displayName="title" editdata={editWidget} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                  <small id="errddlWidgetId" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>

                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="sequenceNumber" className="form-label">Sequence Number<span className="starMandatory">*</span></label>
                  <input type="number" name="sequenceNumber" id="sequenceNumber" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter Sequence Number" />
                  <small id="errddlSequenceNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>

                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="assignedTo" className="form-label">User Name<span className="starMandatory">*</span></label>
                  {/* <select name='assignedTo' id="assignedTo" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {userList && userList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.name}</option>
                      )
                    })}
                  </select> */}
                  {userList && <DropdownWithSearch defaulNname="Select user" name="assignedTo" list={userList} valueName="id" displayName="name" editdata={editUser} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                  <small id="errddlassignedTo" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                <Heading text='Widget Sequence Assign List' />
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
                      <th>Widget Title</th>
                      <th>Sequence Number</th>
                      <th>User Name</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {widgetSequenceAssignList && widgetSequenceAssignList.filter((val) => `${val.widgetname} ${val.sequenceNumber} ${val.userName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.widgetname}</td>
                          <td>{val.sequenceNumber}</td>
                          <td>{val.userName}</td>

                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => {
                                edit(
                                  val.id, val.widgetId, val.sequenceNumber, val.assignedTo, val.superAdminUserId, val.widgetname, val.userName)
                              }} /></div>
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
      {/* <Loder val={loder} /> */}
    </>
  )
}
