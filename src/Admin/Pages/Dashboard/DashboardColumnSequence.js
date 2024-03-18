import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetAllDashboardColumnMaster from '../../Api/Dashboard/DashboardColumnMaster/GetAllDashboardColumnMaster'
import ValidationDashboardColumnSequence from '../../../Validation/Admin/Dashboard/ValidationDashboardColumnSequence';
import PostDashboardColumnSequence from '../../Api/Dashboard/DashboardColumnSequenceAPI/PostDashboardColumnSequence';
import GetAllDashboardColumnSequence from '../../Api/Dashboard/DashboardColumnSequenceAPI/GetDashboardColumnSequence';
import DeleteDashboardColumnSequence from '../../Api/Dashboard/DashboardColumnSequenceAPI/DeleteDashboardColumnSequence';
import PutDashboardColumnSequence from '../../Api/Dashboard/DashboardColumnSequenceAPI/PutDashboardColumnSequence';
import GetUserList from '../../../SuperAdmin/Api/WidgetSequenceAssign/GetUserList';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import Search from '../../../Code/Serach'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";






export default function DashboardColumnSequence() {
  let [dashboardColumnSequenceList, setDashboardColumnSequenceList] = useState()
  let [dashboardColumnSequenceListMain, setDashboardColumnSequenceListMain] = useState()
  let [columnList, setColumnList] = useState()
  let [assignList, setAssignList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('');

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editColumnName, setEditColumnName] = useState("")
  let [editAssignTo, setEditAssignTo] = useState("")
  const {t} = useTranslation();


  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationDashboardColumnSequence(sendForm.columnId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostDashboardColumnSequence(sendForm);
    
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
    let getResponse = await GetAllDashboardColumnSequence();
    let getColumn = await GetAllDashboardColumnMaster();
    let getAssign = await GetUserList();

    if (getResponse.status === 1) {
      // setLoder(0)
      setDashboardColumnSequenceList(getResponse.responseValue)
      setDashboardColumnSequenceListMain(getResponse.responseValue)
      setColumnList(getColumn.responseValue)
      setAssignList(getAssign.responseValue)
    }
  }
  //Handle Search
  let handleSearch = (e) => {
    let resp = Search(dashboardColumnSequenceListMain, e.target.value)
    if (e.target.value !== "") {
      if (resp.length !== 0) {
        setDashboardColumnSequenceList(resp)
      }
      else {
        setDashboardColumnSequenceList([])

      }
    }
    else {
      setDashboardColumnSequenceList(dashboardColumnSequenceListMain)
    }
  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditColumnName("")
    setEditAssignTo("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }


  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let obj = {
      id: rowId
    }
    let response = await DeleteDashboardColumnSequence(obj)
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
  let handleUpdate = async (id, columnId, sequenceNumber, assignedTo, userId, columnName, name) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "columnId": columnId,
      "sequenceNumber": sequenceNumber,
      "assignedTo": assignedTo,
      "userId": userId

    }))
    setEditColumnName(columnName)
    setEditAssignTo(name)
    // document.getElementById("columnId").value = columnId;
    // document.getElementById("assignedTo").value = assignedTo;
    document.getElementById("sequenceNumber").value = sequenceNumber;
  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationDashboardColumnSequence(sendForm.columnId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutDashboardColumnSequence(sendForm)
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
    setSendForm({ "userId": window.userId })
    setClearDropdown(value)
    setEditColumnName("")
    setEditAssignTo("")
    // document.getElementById("columnId").value = "";
    // document.getElementById("assignedTo").value = 0;
    document.getElementById("sequenceNumber").value = 0;
    setUpdateBool(0)
  }
  useEffect(() => {
    getdata()
  }, [])
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("Dashboard_Column_Sequence")} />
              <BoxContainer>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="columnId" className="form-label">{t("Column_Name")}<span className="starMandatory">*</span></label>
                  {/* <select name='columnId' id="columnId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {columnList && columnList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.columnName}</option>
                      )
                    })}
                  </select> */}
                  {columnList && <DropdownWithSearch defaulNname={t("Column_Name")} name="columnId" list={columnList} valueName="id" displayName="columnName" editdata={editColumnName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="sequenceNumber" className="form-label">{t("Sequence_Number")}<span className="starMandatory">*</span></label>
                  <input type='number' className='form-control form-control-sm' id='sequenceNumber' name='sequenceNumber' onChange={handleChange} placeholder={t("Sequence_Number")} />
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="assignedTo" className="form-label">{t("Assigned_To")}<span className="starMandatory">*</span></label>
                  {/* <select name='assignedTo' id="assignedTo" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {assignList && assignList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.name}</option>
                      )
                    })}
                  </select> */}
                  {assignList && <DropdownWithSearch defaulNname={t("Assigned_To")} name="assignedTo" list={assignList} valueName="id" displayName="name" editdata={editAssignTo} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
                              </>
                              :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}>{t("Cancel")}</button>
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
                <Heading text={t("All_Dashboard_Column_Sequence")} />
                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={handleSearch} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Column_Name")}</th>
                      <th>{t("Sequence_Name")}</th>
                      <th>{t("Assigned_To")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dashboardColumnSequenceList && dashboardColumnSequenceList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.columnName}</td>
                          <td>{val.sequenceNumber}</td>
                          <td>{val.name}</td>
                          <td>
                            {/* <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.columnId, val.sequenceNumber, val.assignedTo, val.userId,val.columnName, val.name) }}></i></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                              </div>
                            </div> */}
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.columnId, val.sequenceNumber, val.assignedTo, val.userId,val.columnName, val.name) }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} />
                              </div>
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
                        <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                         <div className='popDeleteContent'> {t("Are_you_sure_you_want_to_delete?")}</div>
                      </div>
                      <div className="modal-footer1 text-center">

                        <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                        <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
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
