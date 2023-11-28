import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import ValidationEquipmentNameMaster from '../../../Validation/Admin/Master/ValidationEquipmentNameMaster';
import PostEquipmentNameMaster from '../../Api/Master/EquipmentNameMasterAPI/PostEquipmentNameMaster';
import GetEquipmentNameMaster from '../../Api/Master/EquipmentNameMasterAPI/GetEquipmentNameMaster';
import DeleteEquipmentNameMaster from '../../Api/Master/EquipmentNameMasterAPI/DeleteEquipmentNameMaster';
import PutEquipmentNameMaster from '../../Api/Master/EquipmentNameMasterAPI/PutEquipmentNameMaster';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetAPIEquipmentTypeMaster from '../../../Admin/Api/Master/EquipmentTypeMasterAPI/GetAPIEquipmentTypeMaster'
import GetLocationMaster from '../../Api/Master/EquipmentNameMasterAPI/GetLocationMaster';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import RemoveDuplicateData from '../../../Code/RemoveDuplicateData';
import Search from '../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function EquipmentNameMaster() {
  let [equipmentNameList, setEquipmentNameList] = useState()
  let [equipmentNameListMain, setEquipmentNameListMain] = useState()
  let [equipmentTypeList, setEquipmentTypeList] = useState()
  let [locationList, setLocationList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('');

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editEquipmentType, setEditEquipmentType] = useState("")
  let [editLocation, setEditLocation] = useState("")
  const {t} = useTranslation();


  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationEquipmentNameMaster(sendForm.equipmentName, sendForm.locationId, sendForm.equipmentTypeId)
    console.log("valresponse", valresponse)
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostEquipmentNameMaster(sendForm);
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
    let getResponse = await GetEquipmentNameMaster();
    let getEquipmentType = await GetAPIEquipmentTypeMaster();
    let getLocation = await GetLocationMaster();


    if (getResponse.status === 1) {
      // setLoder(0)
      setEquipmentNameList(getResponse.responseValue)
      setEquipmentNameListMain(getResponse.responseValue)
      setEquipmentTypeList(getEquipmentType.responseValue)
      // setLocationList(getLocation.responseValue)
      let temp = RemoveDuplicateData(getLocation.responseValue, "buildingName")
      setLocationList(temp)

    }
  }
  //Handle Search
  let handleSearch = (e) => {
    let resp = Search(equipmentNameListMain, e.target.value)
    if (e.target.value !== "") {
      if (resp.length !== 0) {
        setEquipmentNameList(resp)
      }
      else {
        setEquipmentNameList([])

      }
    }
    else {
      setEquipmentNameList(equipmentNameListMain)
    }
  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditEquipmentType("")
    setEditLocation("")
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
    let response = await DeleteEquipmentNameMaster(obj)
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
  let handleUpdate = async (id, name, equipmentTypeId, serialNo, locationId, userId, lifeSupport, buildingName) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "equipmentName": name,
      "equipmentTypeId": equipmentTypeId,
      "serialNo": serialNo,
      "locationId": locationId,
      "userId": userId,

    }))
    setEditEquipmentType(lifeSupport)
    setEditLocation(buildingName)
    document.getElementById("equipmentName").value = name;
    // document.getElementById("equipmentTypeId").value = equipmentTypeId;
    document.getElementById("serialNo").value = serialNo;
    // document.getElementById("locationId").value = locationId;
  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationEquipmentNameMaster(sendForm.equipmentName, sendForm.locationId, sendForm.equipmentTypeId)
    console.log("valresponse", valresponse);
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutEquipmentNameMaster(sendForm)
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
    setEditEquipmentType("")
    setEditLocation("")
    document.getElementById("equipmentName").value = "";
    document.getElementById("serialNo").value = "";
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
              <Heading text={t("Equipment_Name_Master")} />
              <BoxContainer>

                <div className="mb-2 me-2">
                  <label htmlFor="equipmentName" className="form-label">{t("Equipment_name")}<span className="starMandatory">*</span></label>
                  <input type="text" name="equipmentName" id="equipmentName" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Equipment_Name")} />
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="serialNo" className="form-label">{t("Serial_Number")}<span className="starMandatory">*</span></label>
                  <input type="text" name="serialNo" id="serialNo" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Enter_Serial_Number")}/>
                </div>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="equipmentTypeId" className="form-label"> {t("Equipment_Type")} <span className="starMandatory">*</span></label>
                  {/* <select name='equipmentTypeId' id="equipmentTypeId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {equipmentTypeList && equipmentTypeList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.lifeSupport}</option>
                      )
                    })}
                  </select> */}
                  {equipmentTypeList && <DropdownWithSearch defaulNname={t("Select_Equipment_Type")} name="equipmentTypeId" list={equipmentTypeList} valueName="id" displayName="lifeSupport" editdata={editEquipmentType} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="locationId" className="form-label">{t("Location_Name")} <span className="starMandatory">*</span></label>
                  {/* <select name='locationId' id="locationId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {locationList && locationList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.buildingName}</option>
                      )
                    })}
                  </select> */}
                  {locationList && <DropdownWithSearch defaulNname={t("Select_Location")} name="locationId" list={locationList} valueName="id" displayName="buildingName" editdata={editLocation} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
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
                <Heading text={t("All_Equipment_Name_List")} />
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
                      <th>{t("Equipment_name")}</th>
                      <th>{t("Serial_Number")}</th>
                      <th>{t("Equipment_Type")}</th>
                      <th>{t("Location_Name")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {equipmentNameList && equipmentNameList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.name}</td>
                          <td>{val.serialNo}</td>
                          <td>{val.lifeSupport}</td>
                          <td>{val.buildingName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.name, val.equipmentTypeId, val.serialNo, val.locationId, val.userId, val.lifeSupport, val.buildingName) }}><img src={IconEdit} alt='' /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
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
