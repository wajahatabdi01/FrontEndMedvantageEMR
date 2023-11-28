import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import PostHSNCode from '../../HSNCodeMaster/API/PostHSNCode'
import PutHSNCode from '../../HSNCodeMaster/API/PutHSNCode'
import DeleteHSNCode from '../../HSNCodeMaster/API/DeleteHSNCode'
import ValidationHSNCodeMaster from '../../../Validation/Pharmacy/ValidationHSNCodeMaster'
import GetHSNCode from '../API/GetHSNCode';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import clearIcon from '../../../assets/images/icons/clear.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';



export default function HSNCodeMaster() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  let [hsnCodeData, setHSNCodeData] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('');

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)


  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationHSNCodeMaster(sendForm.hsnCode)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostHSNCode(sendForm);
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
    let getResponse = await GetHSNCode();
    console.log("getResponse", getResponse)

    if (getResponse.status === 1) {
      // setLoder(0)
      setHSNCodeData(getResponse.responseValue)
    }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
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
    let response = await DeleteHSNCode(obj)
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
  let handleUpdate = async (id, hsnCode, category, gst, userId) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "hsnCode": hsnCode,
      "category": category,
      "gst": gst,
      "userId": userId

    }))

    document.getElementById("hsnCode").value = hsnCode;
    document.getElementById("category").value = category;
    document.getElementById("gst").value = gst;

  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationHSNCodeMaster(sendForm.hsnCode)
    console.log("valresponse", valresponse);
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutHSNCode(sendForm)
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
    setSendForm({ "userId": window.userId })
    document.getElementById("hsnCode").value = "";
    document.getElementById("category").value = "";
    document.getElementById("gst").value = "";
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
              <Heading text={t("HSN_Code_Master")} />
              <BoxContainer>



                <div className="mb-2 me-2">
                  <label htmlFor="hsnCode" className="form-label">{t("HSN_Code_Name")}<span class="starMandatory">*</span></label>
                  <input type='number' className='form-control' id='hsnCode' name='hsnCode' onChange={handleChange} placeholder={t("Enter_HSN_Code")} />
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="category" className="form-label">{t("Category")}<span class="starMandatory">*</span></label>
                  <input type='text' className='form-control' id='category' name='category' onChange={handleChange} placeholder={t("enter_category")} />
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="gst" className="form-label">{t("GST")}<span class="starMandatory">*</span></label>
                  <input type='number' className='form-control' id='gst' name='gst' onChange={handleChange} placeholder={t("Enter_GST_No")} />
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
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                              </>
                              :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("Update")}</button>
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
              <Heading text='HSN Code List' />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("HSN_Code_Name")}</th>
                      <th>{t("Category")}</th>
                      <th>{t("GST")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {hsnCodeData && hsnCodeData.map((key, ind) => {
                      return (
                        <tr value={key}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{key.hsnCode}</td>
                          <td>{key.category}</td>
                          <td>{key.gst}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(key.id, key.hsnCode, key.category, key.gst, key.userId) }} alt='' /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(key.id) }} alt='' /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}


                  </tbody>
                </TableContainer>
                {/* -----------------------Start Delete Modal Popup-------------------   */}

                {/*  <!-- Modal -->  */}
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                  <div class="modal-dialog modalDelete">
                    <div class="modal-content">

                      <div class="modal-body modelbdy text-center">
                        <div className='popDeleteIcon'><i class="fa fa-trash"></i></div>
                        <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                        <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                      </div>
                      <div class="modal-footer1 text-center">

                        <button type="button" class="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                        <button type="button" class="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
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
