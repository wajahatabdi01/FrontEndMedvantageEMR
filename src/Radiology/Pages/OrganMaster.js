import React from 'react'
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import TableContainer from '../../Component/TableContainer';
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import { useState,useEffect } from 'react';
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import Loder from '../../Component/Loader';
import SuccessToster from '../../Component/SuccessToster';
import AlertToster from '../../Component/AlertToster';
import GetOrganMasterList from '../API/OrganMaster/GET/GetOrganMasterList';
import PostOrganMaster from '../API/OrganMaster/POST/PostOrganMaster';
import UpdateOrganMaster from '../API/OrganMaster/UPDATE/UpdateOrganMaster';
import DeleteOrganMaster from '../API/OrganMaster/Delete/DeleteOrganMaster';
import GetOrganList from '../API/OrganMaster/GET/GetOrganList';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function OrganMaster() {
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [showLoder, setShowLoder] = useState(0);
  let [isShowToaster, setisShowToaster] = useState(0);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showSuccessMsg, setShowSuccessMsg] = useState('');
  let [clearDropdown, setClearDropdown] = useState(0)
  let [updateBool, setUpdateBool] = useState(0);
  let [organList, setOrganList] = useState([]);
  let [organMasterList, setOrganMasterList] = useState([]);
  let [selectedOrgan, setSelectedOrgan] = useState('');
  let [selectedOrganName, setSelectedOrganName] = useState('');
  let [remark, setRemark] = useState('');
  let [rowID, setRowId] = useState(0);
  let [editOrgan, setEditOrgan] = useState('');
  const { t } = useTranslation();
  


  let handleChange = (e) => {
    document.getElementById('errOrgan').style.display="none";
      const name = e.target.name;
      const value = e.target.value;
      if(name === "ddlOrgan"){
          setSelectedOrgan(value)
          setSelectedOrganName(e.target.selectedName)
          setEditOrgan(e.target.selectedName)
      }
      if(name === "remark"){
        setRemark(value);
      }
  } 
  let getOrganList = async()=>{
    const response = await GetOrganList();
    if(response.status === 1){
      setOrganList(response.responseValue)
    }
  }
  let getOrganMasterList = async()=>{
    setShowLoder(1);
    const response = await GetOrganMasterList();
    if(response.status === 1){
      setOrganMasterList(response.responseValue)
      setShowLoder(0);
    }
    else{
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
    }
  }
  let handlerSave = async () => {
    if(selectedOrgan === '' || selectedOrgan === 0 || selectedOrgan === undefined || selectedOrgan === null){
      document.getElementById('errOrgan').innerHTML="Please Select Organ";
      document.getElementById('errOrgan').style.display="block";
    }
    else{
       const obj ={
        organID:selectedOrgan,
        organName:selectedOrganName,
        remark:remark,
        userID:userID
       }
       setShowUnderProcess(1);
      const response = await PostOrganMaster(obj);
     if (response.status === 1) {
         setShowUnderProcess(0);
         setTosterValue(0);
         setShowToster(1);
         setTosterMessage("Saved Successfully");
         setTimeout(() => {
             setShowToster(0);
             handleClear(1);
             getOrganMasterList();
         }, 2000)
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
  }
  let handlerUpdate = async () => {
    if(selectedOrgan === '' || selectedOrgan === 0 || selectedOrgan === undefined || selectedOrgan === null){
      document.getElementById('errOrgan').innerHTML="Please Select Organ";
      document.getElementById('errOrgan').style.display="block";
    }
    else{
       const obj ={
        organID:selectedOrgan,
        organName:selectedOrganName,
        remark:remark,
        userID:userID,
        key:rowID
       }
       setShowUnderProcess(1);
      const response = await UpdateOrganMaster(obj);
     if (response.status === 1) {
         setShowUnderProcess(0);
         setTosterValue(0);
         setShowToster(1);
         setTosterMessage("Updated Successfully");
         setTimeout(() => {
             setShowToster(0);
             handleClear(1);
             getOrganMasterList();
         }, 2000)
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
  }
  let handleDelete = async()=>{
    setShowLoder(1);
    const response = await DeleteOrganMaster(rowID);
    if(response.status === 1){
      setisShowToaster(1);
      setShowSuccessMsg('Organ Deleted Successfully..!!');
      getOrganMasterList();
      setTimeout(() => {
          setisShowToaster(0);
      }, 2000)
    }
    else{
        setShowLoder(0);
        setShowAlertToster(1);
        setShowErrMessage(response.responseValue);
     
    }
  }
  let handleClear = (value) => {
    setRowId(0);
    setUpdateBool(0);
    setClearDropdown(value);
    setRemark('');
    setSelectedOrganName('');
    setSelectedOrgan('');
    setEditOrgan('');
    document.getElementById('errOrgan').style.display="none";
  }
  let handleEdit = (params) => {
    setEditOrgan(params.organName);
    setRemark(params.remark);
    setSelectedOrganName(params.organName);
    setSelectedOrgan(params.organID);
    setRowId(params.id);
    setUpdateBool(1);
  }
  useEffect(()=>{
    getOrganList();
    getOrganMasterList();
  },[]);
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("Organ_Master")} />
              <BoxContainer>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="SampleId" className="form-label">{t("Organ")} <span className="starMandatory">*</span></label>

                  {organList && 
                   <DropdownWithSearch defaulNname={t("Select_Organ")} name="ddlOrgan" list={organList} valueName="id" displayName="regionName" editdata={editOrgan} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                  }
                  <small id="errOrgan" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="TestName" className="form-label">{t("Remark")} <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" name="remark" id="remark" value={remark} onChange={handleChange} placeholder={t("Remarks")} />
                </div>


                <div className="col-2 mb-2 me-2 relative">
                  <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                  <div>
                    {showUnderProcess === 1 ? <TosterUnderProcess /> :
                      <>
                        {showToster === 1 ?
                          <Toster value={tosterValue} message={tosterMessage} />

                          : <div>
                            {updateBool === 0 ?
                              <>
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={()=>{handleClear(1)}}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                              </>
                              :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>{t("Update")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={()=>{handleClear(1)}}>{t("Cancel")}</button>
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
              <Heading text={t("All_Test_List")} />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Organ_Name")}</th>
                      <th>{t("Remark")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {organMasterList && organMasterList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.organName}</td>
                          <td>{val.remark}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => {handleEdit(val)}} /></div>
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
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                  <div className="modal-dialog modalDelete">
                    <div className="modal-content">

                      <div className="modal-body modelbdy text-center">
                        <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                        <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                        <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                      </div>
                      <div className="modal-footer1 text-center">

                        <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                        <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">{t("Delete")}</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

              </div>
            </div>
          </div>
        </div>
        {
                    showLoder === 1 ? <Loder val={showLoder} /> : ""
                }
                {/* Toaster */}
                {
                    isShowToaster === 1 ?
                        <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
                }
               
                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }
      </section>
    </>
  )
}
