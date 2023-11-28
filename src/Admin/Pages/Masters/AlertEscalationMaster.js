import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetRoleMaster from '../../Api/Master/RoleMaster/GetRoleMaster';
import ValidationAlertEscalationMaster from '../../../Validation/Admin/Master/ValidationAlertEscalationMaster';
import PostAlertEscalation from '../../Api/Master/AlertEscalationMasterAPI/PostAlertEscalation';
import GetAllAlertEscalation from '../../Api/Master/AlertEscalationMasterAPI/GetAllAlertEscalation';
import DeleteAlertEscalation from '../../Api/Master/AlertEscalationMasterAPI/DeleteAlertEscalation';
import PutAlertEscalation from '../../Api/Master/AlertEscalationMasterAPI/PutAlertEscalation';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import Search from '../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function AlertEscalationMaster() {
  let [alertEscalationList, setAlertEscalationList] = useState()
  let [alertEscalationListMain, setAlertEscalationListMain] = useState()
  let [roleList, setroleList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('');

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editRoleFrom, setEditRoleFrom] = useState("")
  let [editRoleTo, setEditRoleTo] = useState("")
  const {t} = useTranslation();


  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationAlertEscalationMaster(sendForm.alertTypeId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostAlertEscalation(sendForm);
      console.log("sendForm", sendForm)
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
    let getResponse = await GetAllAlertEscalation();
    // let getRole = await GetRoleMaster();

    if (getResponse.status === 1) {
      // setLoder(0)
      setAlertEscalationList(getResponse.responseValue)
      setAlertEscalationListMain(getResponse.responseValue)
      // setroleList(getRole.responseValue)
    }
  }
  //Get All Role
  let getRole = async () => {
    let getRole = await GetRoleMaster();

    if (getRole.status === 1) {   
      setroleList(getRole.responseValue)
    }
  }

  //Handle Search
  let handleSearch = (e) => {
    let resp = Search(alertEscalationListMain, e.target.value)
    if (e.target.value !== "") {
      if (resp.length !== 0) {
        setAlertEscalationList(resp)
      }
      else {
        setAlertEscalationList([])

      }
    }
    else {
      setAlertEscalationList(alertEscalationListMain)
    }
  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditRoleFrom("")
    setEditRoleTo("")
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
    let response = await DeleteAlertEscalation(obj)
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
  let handleUpdate = async (id, alertTypeId, roleIDFrom, roleIDTo, userId, roleIDFromTitle, roleIDToTitle) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "alertTypeId": alertTypeId,
      "roleIDFrom": roleIDFrom,
      "roleIDTo": roleIDTo,
      "userId": userId

    }))
    setEditRoleFrom(roleIDFromTitle)
    setEditRoleTo(roleIDToTitle)
    document.getElementById("alertTypeId").value = alertTypeId;
    // document.getElementById("roleIDFrom").value = roleIDFrom;
    // document.getElementById("roleIDTo").value = roleIDTo; 
  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationAlertEscalationMaster(sendForm.alertTypeId)
    console.log("valresponse", valresponse);
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutAlertEscalation(sendForm)
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
    setSendForm({ "userId": window.userId })
    setClearDropdown(value)
    setEditRoleFrom("")
    setEditRoleTo("")
    document.getElementById("alertTypeId").value = "";
    // document.getElementById("roleIDFrom").value = 0;
    // document.getElementById("roleIDTo").value = 0;
    setUpdateBool(0)
  }
  useEffect(() => {
    getdata();
    getRole();
  }, [])
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("Alert_Escalation_Master")} />
              <BoxContainer>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="alertTypeId" className="form-label">{t("Enter_Alert_Escalation_Id")}<span className="starMandatory">*</span></label>
                  <input type='number' className='form-control' id='alertTypeId' name='alertTypeId' onChange={handleChange} placeholder={t("Enter_Alert_Escalation_Id")} />
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="roleIDFrom" className="form-label">{t("Role_From_Name")}<span className="starMandatory">*</span></label>
                  {roleList && <DropdownWithSearch defaulNname={t("Select_role_from")} name="roleIDFrom" list={roleList} valueName="id" displayName="roleTitle" editdata={editRoleFrom} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="roleIDTo" className="form-label">{t("Role_To_Name")}<span className="starMandatory">*</span></label>
                  {roleList && <DropdownWithSearch defaulNname={t("Select_role_to")} name="roleIDTo" list={roleList} valueName="id" displayName="roleTitle" editdata={editRoleTo} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                <Heading text={t("All_Alert_Escalation_List")} />
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
                      <th>{t("Alert_Escalation_Name")}</th>
                      <th>{t("Role_From_Name")}</th>
                      <th>{t("Role_To_Name")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {alertEscalationList && alertEscalationList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.alertTypeId}</td>
                          <td>{val.roleIDFromTitle}</td>
                          <td>{val.roleIDToTitle}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(val.id, val.alertTypeId, val.roleIDFrom, val.roleIDTo, val.userId, val.roleIDFromTitle, val.roleIDToTitle) }} alt='' /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(val.id) }} alt='' /></div>
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
                        <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
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
