import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationOxygenSupportMaster from '../../../Validation/Admin/Master/ValidationOxygenSupportMaster'
import { send } from 'q'
import PostOxygenSupportMaster from '../../Api/Master/OxygenSupportMaster/PostOxygenSupportMaster'
import GetOxygenSupportMaster from '../../Api/Master/OxygenSupportMaster/GetOxygenSupportMaster'
import GetMachineTypeMaster from '../../Api/Master/MachineTypeMaster/GetMachineTypeMaster'
import GetVitalMaster from '../../Api/Master/VitalMaster/GetVitalMaster'
import DeleteOxygenSupportMaster from '../../Api/Master/OxygenSupportMaster/DeleteOxygenSupportMaster'
import PutOxygenSupportMaster from '../../Api/Master/OxygenSupportMaster/PutOxygenSupportMaster'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import Search from '../../../Code/Serach'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OxygenSupportMaster() {
  let [oxygenSupportList, setOxygenSupportList] = useState()
  let [oxygenSupportListMain, setOxygenSupportListMain] = useState()
  let [vitalList, setVitalList] = useState()
  let [machineTypeList, setMachineTypeList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('')

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editVital, setEditVitel] = useState("")
  let [editMachineType, seteditMachineType] = useState("")
  const {t} = useTranslation();

  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationOxygenSupportMaster(sendForm.lifeSupportType, sendForm.vitalID, sendForm.machineTypeID, sendForm.shortName, sendForm.code)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostOxygenSupportMaster(sendForm);
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
    let getResponse = await GetOxygenSupportMaster();
    let getVital = await GetVitalMaster();
    let getMachineId = await GetMachineTypeMaster();
    if (getResponse.status === 1) {
      setOxygenSupportList(getResponse.responseValue)
      setOxygenSupportListMain(getResponse.responseValue)
      setVitalList(getVital.responseValue)
      setMachineTypeList(getMachineId.responseValue)
    }
  }
  //Handle Search
  let handleSearch = (e) => {
    let resp = Search(oxygenSupportListMain, e.target.value)
    if (e.target.value !== "") {
      if (resp.length !== 0) {
        setOxygenSupportList(resp)
      }
      else {
        setOxygenSupportList([])

      }
    }
    else {
      setOxygenSupportList(oxygenSupportListMain)
    }
  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditVitel("")
    seteditMachineType("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }

  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1);
    let obj = {
      id: rowId
    }
    let response = await DeleteOxygenSupportMaster(obj)
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
  let handleUpdate = async (id, lifeSupportType, vitalID, machineTypeID, shortName, code, iconImage, userId, vitalName, machineTypeName) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "lifeSupportType": lifeSupportType,
      "vitalID": vitalID,
      "machineTypeID": machineTypeID,
      "shortName": shortName,
      "code": code,
      "iconImage": iconImage,
      "userId": window.userId,
    }))
    document.getElementById("lifeSupportType").value = lifeSupportType;
    setEditVitel(vitalName)
    seteditMachineType(machineTypeName)
    // document.getElementById("vitalID").value = vitalID;
    // document.getElementById("machineTypeID").value = machineTypeID;
    document.getElementById("shortName").value = shortName;
    document.getElementById("code").value = code;
    document.getElementById("iconImage").value = iconImage;
  }


  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationOxygenSupportMaster(sendForm.lifeSupportType, sendForm.vitalID, sendForm.machineTypeID, sendForm.shortName, sendForm.code)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutOxygenSupportMaster(sendForm)
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
    document.getElementById("lifeSupportType").value = "";
    setEditVitel("");
    seteditMachineType("");
    // document.getElementById("vitalID").value = 0;
    // document.getElementById("machineTypeID").value = 0;
    document.getElementById("shortName").value = "";
    document.getElementById("code").value = "";
    document.getElementById("iconImage").value = "";
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
              <Heading text={t("Oxygen_Support_Master")} />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="lifeSupportType" className="form-label">{t("Life_Support_Type")}<span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="lifeSupportType" name='lifeSupportType' onChange={handleChange} placeholder={t("Enter_Life_Support_Type")}/>
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="vitalID" className="form-label">{t("Vital")} <span className="starMandatory">*</span></label>
                  {/* <select name='vitalID' id="vitalID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {vitalList && vitalList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.vitalName}</option>
                      )
                    })}
                  </select> */}
                  {vitalList && <DropdownWithSearch defaulNname={t("select_Vital")} name="vitalID" list={vitalList} valueName="id" displayName="vitalName" editdata={editVital} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="machineTypeID" className="form-label">{t("Machine_Type")}<span className="starMandatory">*</span></label>
                  {/* <select name='machineTypeID' id="machineTypeID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {machineTypeList && machineTypeList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.machineType}</option>
                      )
                    })}
                  </select> */}
                  {machineTypeList && <DropdownWithSearch defaulNname={t("Select_Machine")} name="machineTypeID" list={machineTypeList} valueName="id" displayName="machineType" editdata={editMachineType} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="shortName" className="form-label">{t("Short_Name")}<span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="shortName" name='shortName' onChange={handleChange} placeholder={t("Enter_Short_Name")} />
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="code" className="form-label">{t("Code")} <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="code" name='code' onChange={handleChange} placeholder={t("Enter_code")} />
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="iconImage" className="form-label">{t("Icon")}</label>
                  <input type="file" className="form-control form-control-sm" id="iconImage" name='iconImage' onChange={handleChange} />
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
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>{t("Cancel")}</button>
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
                <Heading text={t("Oxygen_Support_List")} />
                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={handleSearch} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "74vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Life_Support_Type")}</th>
                      <th>{t("Vital_Name")}</th>
                      <th>{t("Machine_Name")}</th>
                      <th>{t("Short_Name")}</th>
                      <th>{t("Code")}</th>
                      <th>{t("Icon_Image")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {oxygenSupportList && oxygenSupportList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.lifeSupportType}</td>
                          <td>{val.vitalName}</td>
                          <td>{val.machineTypeName}</td>
                          <td>{val.shortName}</td>
                          <td>{val.code}</td>
                          <td>{val.iconImage}</td>
                          <td>
                            {/* <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.lifeSupportType, val.vitalID, val.machineTypeID, val.shortName, val.code, val.iconImage, val.userId) }}></i></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                              </div>
                            </div> */}
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.lifeSupportType, val.vitalID, val.machineTypeID, val.shortName, val.code, val.iconImage, val.userId, val.vitalName, val.machineTypeName) }}><img src={IconEdit} alt='' /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}

                  </tbody>
                </TableContainer>
                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                  <div className="modal-dialog modalDelete">
                    <div className="modal-content">

                      <div className="modal-body modelbdy text-center">
                        <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                        <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
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
