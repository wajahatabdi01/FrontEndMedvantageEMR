import React, { useEffect, useState } from 'react';
import Toster from '../../../Component/Toster';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import TableContainer from '../../../Component/TableContainer';
import ValidationRTHoldTypeMaster from '../../../Validation/Admin/ValidationRTHoldTypeMaster';
import PostRTHoldTypeMaster from '../../Api/Master/RTHoldTypeMaster/PostRTHoldTypeMaster';
import GetRTHoldTypeMaster from '../../Api/Master/RTHoldTypeMaster/GetRTHoldTypeMaster';
import PutRTHoldTypeMaster from '../../Api/Master/RTHoldTypeMaster/PutRTHoldTypeMaster';
import DeleteRTHoldTypeMaster from '../../Api/Master/RTHoldTypeMaster/DeleteRTHoldTypeMaster';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import Search from '../../../Code/Serach';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export const RTHoldTypeMaster = () => {

  const [loder, setLoder] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [rowId, setRowId] = useState('');
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [updateBool, setUpdateBool] = useState(0);
  const [rtHoldTypeMasterList, setRTHoldTypeMaster] = useState([]);
  const [rtHoldTypeMasterListMain, setRTHoldTypeMasterMain] = useState([]);
  const [sendForm, setSendForm] = useState({ "userId": window.userId });
  const {t} = useTranslation();

  const handleChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "name") {
      document.getElementById("errddlname").style.display = "none";
    }
    else if (name === "module") {
      document.getElementById("errddlmodule").style.display = "none";

    }

    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  };
  const saveForm = async () => {
    const valresponse = ValidationRTHoldTypeMaster(sendForm.name, sendForm.module)
    if (valresponse[0]) {
      setShowUnderProcess(1)
      const response = await PostRTHoldTypeMaster(sendForm);
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
      getData();
    }
    else {
      document.getElementById(valresponse[1]).innerHTML = valresponse[2]
      document.getElementById(valresponse[1]).style.display = "block"
    }
  };

  const getData = async () => {
    const data = await GetRTHoldTypeMaster();
    if (data.status === 1) {
      setRTHoldTypeMaster(data.responseValue);
      setRTHoldTypeMasterMain(data.responseValue);
    }
  };
  const edit = async (id, name, module, userId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "name": name,
      "module": module,
      "userId": userId,
    }))

    document.getElementById("name").value = name;
    document.getElementById("module").value = module;
  };

  //Handle Search
  let handleSearch = (e) => {
    let resp = Search(rtHoldTypeMasterListMain, e.target.value)
    if (e.target.value !== "") {
      if (resp.length !== 0) {
        setRTHoldTypeMaster(resp)
      }
      else {
        setRTHoldTypeMaster([])

      }
    }
    else {
      setRTHoldTypeMaster(rtHoldTypeMasterListMain)
    }
  }


  const saveUpdate = async () => {
    const valresponse = ValidationRTHoldTypeMaster(sendForm.name, sendForm.module)
    if (valresponse[0]) {
      setShowUnderProcess(1)
      const response = await PutRTHoldTypeMaster(sendForm);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Update SuccessFully!")
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
      getData();
    }
    else {
      document.getElementById(valresponse[1]).innerHTML = valresponse[2]
      document.getElementById(valresponse[1]).style.display = "block"
    }
  };
  const handleDeleteRow = async () => {

    const obj = {
      id: rowId,
    };
    setShowUnderProcess(1)
    const response = await DeleteRTHoldTypeMaster(obj)
    if (response.status === 1) {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage("Data Deleted SuccessFully!")
      setTosterValue(0)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
      getData()
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

  const handleClear = () => {
    setSendForm([]);
    document.getElementById('name').value = '';
    document.getElementById('module').value = '';
    setUpdateBool(0);
  };

  useEffect(() => {
    getData();
  }, []);
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("RTHold_Type_Master")} />
              <BoxContainer>


                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="name" className="form-label">{t("NAME")}<span className="starMandatory">*</span></label>
                  <input type="text" name="name" id="name" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Name")} />
                  <small id="errddlname" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>


                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="module" className="form-label">{t("Module")}<span className="starMandatory">*</span></label>
                  <input type="text" name="module" id="module" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Module_Name")} />
                  <small id="errddlmodule" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                                {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveForm}>Save</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handleClear(1) }}>Clear</button> */}
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
            <div className="col-12 mt-2">
              <div className='handlser'>
                <Heading text={t("RT_Hold_Type_Maste_List")} />
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
                      <th>{t("NAME")}</th>
                      <th>{t("Module")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rtHoldTypeMasterList && rtHoldTypeMasterList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.name}</td>
                          <td>{val.module}</td>
                          <td>
                            {/* <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => {
                                edit(
                                  val.id, val.name, val.module, val.userId)
                              }}></i></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                              </div>
                            </div> */}
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { edit(val.id, val.name, val.module, val.userId) }} alt='' /></div>
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
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
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
      {/* <Loder val={loder} /> */}
    </>
  )
}
