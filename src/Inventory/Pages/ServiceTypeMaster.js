import React, { useEffect, useState } from 'react';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import PostServiceTypeMaster from '../API/ServiceTypeMaster/PostServiceTypeMaster';
import GetServiceTypeMaster from '../API/ServiceTypeMaster/GetServiceTypeMaster';
import PutServiceTypeMaster from '../API/ServiceTypeMaster/PutServiceTypeMaster';
import DeleteServiceTypeMaster from '../API/ServiceTypeMaster/DeleteServiceTypeMaster';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export const ServiceTypeMaster = () => {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [showLoder, setShowLoder] = useState(1);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [serviceType, setServiceType] = useState('');
  const [remark, setRemark] = useState('');
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);

  const handleChange = (e) => {
    document.getElementById('errServiceType').style.display = 'none';
    document.getElementById('errRemark').style.display = 'none';
    if (e.target.name === 'ServiceType') {
      setServiceType(e.target.value);
    };

    if (e.target.name === 'Remark') {
      setRemark(e.target.value);
    };
  };

  const handleSave = async () => {
    if (serviceType.trim() === '' || serviceType === null || serviceType === undefined) {
      document.getElementById('errServiceType').innerHTML = 'Please Enter Service Type';
      document.getElementById('errServiceType').style.display = 'block';
    }
    //   else if(remark.trim() === '' || remark === null || remark === undefined){
    //     document.getElementById('errRemark').innerHTML = 'Please Enter Remark';
    //     document.getElementById('errRemark').style.display = 'block';
    //     }
    else {
      let userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
      const obj = {
        serviceType: serviceType,
        remark: remark,
        userId: userID
      };
      const data = await PostServiceTypeMaster(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Saved Successfully!");
        getServiceTypeMaster();
        setNewlyAddedRowIndex(0);
        setTimeout(() => {
          setShowToster(0);
          setNewlyAddedRowIndex(null);
          handleClear();
        }, 2000);
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(data.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }
  };

  const getServiceTypeMaster = async () => {
    const data = await GetServiceTypeMaster();

    if (data.status === 1) {
      setShowLoder(0);
      setServiceTypeList(data.responseValue);
    }
    else {
      setShowLoder(0);
    }
  };

  const handleClear = () => {
    document.getElementById('errServiceType').style.display = 'none';
    document.getElementById('errRemark').style.display = 'none';
    setRemark('');
    setServiceType('');
  };

  const edit = (list,index) => {
    document.getElementById('errServiceType').style.display = 'none';
    document.getElementById('errRemark').style.display = 'none';
    setRowID(list.id);
    setIsUpdateBtnShow(true);
    setRemark(list.remark);
    setServiceType(list.serviceType);
    setNewlyAddedRowIndex(index)
  };

  const handleUpdate = async () => {
    if (serviceType.trim() === '' || serviceType === null || serviceType === undefined) {
      document.getElementById('errServiceType').innerHTML = 'Please Enter Service Type';
      document.getElementById('errServiceType').style.display = 'block';
    }
    // else if (remark.trim() === '' || remark === null || remark === undefined) {
    //   document.getElementById('errRemark').innerHTML = 'Please Enter Remark';
    //   document.getElementById('errRemark').style.display = 'block';
    // }
    else {
      let userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
      const obj = {
        id: rowID,
        serviceType: serviceType,
        remark: remark,
        userId: userID
      };
      const data = await PutServiceTypeMaster(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Saved Successfully!");
        getServiceTypeMaster();
        setTimeout(() => {
          setShowToster(0);
          setNewlyAddedRowIndex(null);
          handleClear();
        }, 2000);
        setIsUpdateBtnShow(false);
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(data.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }
  };

  const deleteRow = async () => {
    setShowUnderProcess(1);
    let userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;

    const obj = {
      id: rowID,
      userId: userID
    };
    let data = await DeleteServiceTypeMaster(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      getServiceTypeMaster();
      setTimeout(() => {
        setShowToster(0);
        handleClear();
        
      }, 1000)
    }
    else {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage(data.responseValue)
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0);
      }, 2000)
    }
  };

  const handleCancel = () => {
    setIsUpdateBtnShow(false);
    setRemark('');
    setServiceType('');
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);
  };

  useEffect(() => {
    getServiceTypeMaster();
  }, []);

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Service_Type_Master")}</div>
                <div className="inner-content">

                  <div className='row'>
                    <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                      <div className="d-flex flex-wrap align-content-end">

                        <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("ServiceType")}<span className="starMandatory">*</span></label>
                          <input type="text" className="form-control form-control-sm" name="ServiceType" value={serviceType} placeholder={t("Enter_Service_Type")} onChange={handleChange} />
                          <small id="errServiceType" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-4 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("Remark")}
                            {isUpdateBtnShow === true ? <span className="starMandatory">*</span> : <span className="starMandatory"></span>}
                          </label>
                          <input type="text" className="form-control form-control-sm" name="Remark" value={remark} placeholder= {t("Remarks")} onChange={handleChange} />
                          <small id="errRemark" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>



                        <div className="mb-2 relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleUpdate}>{t("Update")}</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancel}>{t("Cancel")}</button>
                                  </>
                                }
                              </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("ServiceType")}</th>
                      <th>{t("Remark")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {serviceTypeList && serviceTypeList.map((list, index) => {
                         const isNewRow = newlyAddedRowIndex === index;
                         const isEditing = index === editRowIndex;
                      return (
                        <tr className={isNewRow ? 'new-row' : '' } key={index} >
                          <td className="text-center">{index + 1}</td>
                          <td>{list.serviceType}</td>
                          <td>{list.remark}</td>
                          <td>
                            <div className="action-button">
                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon}  className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(list,index) }}/></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id,index) }}/>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------Start Delete Modal Popup-------------------    */}

        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modalDelete">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                <button type="button" className="btn-delete popBtnDelete" onClick={deleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loder val={showLoder} /> : ""
        }
      </section>
    </>
  )
}
