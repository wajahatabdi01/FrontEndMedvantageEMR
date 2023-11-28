import React, { useState } from 'react'
import GetModalityMaster from '../API/ModalityMaster/GET/GetModalityMaster';
import { useEffect } from 'react';
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import TableContainer from '../../Component/TableContainer';
import Loder from '../../Component/Loader';
import SuccessToster from '../../Component/SuccessToster';
import AlertToster from '../../Component/AlertToster';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import PostModalitymaster from '../API/ModalityMaster/POST/PostModalitymaster';
import DeleteModalityMaster from '../API/ModalityMaster/DELETE/DeleteModalityMaster';
import UpdateModalityMaster from '../API/ModalityMaster/UPDATE/UpdateModalityMaster';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function ModalityMaster() {
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
    let [rowID, setRowId] = useState(0);
    let [modalityName,setModalityName]=useState();
    let [modalityList,setModalityList]=useState();
    const { t } = useTranslation();

    let handleChange= async(e)=>{
        document.getElementById('errModality').style.display="none";
        const name = e.target.name;
        const value = e.target.value;

        if(name==="modalityName"){
            setModalityName(value)
        }
    }

    let getmodalityList= async ()=>{
        const response =await GetModalityMaster()
        if(response.status===1){
            setModalityList(response.responseValue)
        }
    }

    let handlerSave =async()=>{

        if(modalityName === '' || modalityName === 0 || modalityName === undefined || modalityName === null){
            document.getElementById('errModality').innerHTML="Please Enter Modality Name";
            document.getElementById('errModality').style.display="block";
          }
          else{
             const obj ={
                modalityName:modalityName,
                userID:userID
             }
             
             setShowUnderProcess(1);
            const response = await PostModalitymaster(obj);
        
           if (response.status === 1) {
               setShowUnderProcess(0);
               setTosterValue(0);
               setShowToster(1);
               setTosterMessage("Saved Successfully");
               setTimeout(() => {
                   setShowToster(0);
                   handleClear(1);
                   getmodalityList();
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

    let handlerUpdate =async()=>{
        if(modalityName === '' || modalityName === 0 || modalityName === undefined || modalityName === null){
            document.getElementById('errModality').innerHTML="Please Enter Modality Name";
            document.getElementById('errModality').style.display="block";
          }
          else{
             const obj ={
                modalityName:modalityName,
                userID:userID,
                key:rowID
             }
             
             setShowUnderProcess(1);
            const response = await UpdateModalityMaster(obj);
            
           if (response.status === 1) {
               setShowUnderProcess(0);
               setTosterValue(0);
               setShowToster(1);
               setTosterMessage("Updated Successfully");
               setTimeout(() => {
                   setShowToster(0);
                   handleClear(1);
                   getmodalityList();
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

    let handleEdit = async (params)=>{
        
        setModalityName(params.modalityName);
        setRowId(params.id);
        setUpdateBool(1);
    }

    let handleClear =async()=>{
        setRowId(0);
        setUpdateBool(0);
        setModalityName('');
        document.getElementById('errModality').style.display="none";
   }
   let handleDelete =async()=>{
    setShowLoder(0);
    const response = await DeleteModalityMaster(rowID);
    if(response.status === 1){
      setisShowToaster(1);
      setShowSuccessMsg('Modality Deleted Successfully..!!');
      getmodalityList();
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
    useEffect(()=>{
        getmodalityList();
    },[]);
    document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("Modality_Master")} />
              <BoxContainer>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="TestName" className="form-label">{t("From Date")}</label>
                  <input type="text" className="form-control form-control-sm" name="fromDate" id="fromDate"  />
                  <small id="errFromDate" className="form-text text-danger" style={{ display: 'none' }}></small>

                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="TestName" className="form-label">{t("To Date")}</label>
                  <input type="text" className="form-control form-control-sm" name="toDate" id="toDate"  />
                  <small id="errToDate" className="form-text text-danger" style={{ display: 'none' }}></small>

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
                      <th>{t("Modality")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {modalityList && modalityList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.modalityName}</td>
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
