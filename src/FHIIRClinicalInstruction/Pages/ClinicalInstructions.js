import React, { useEffect, useState } from 'react';

import plus from '../../assets/images/icons/save.svg';
import clear from '../../assets/images/icons/clear.svg';
import IconEdit from '../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../assets/images/icons/IconDelete.svg'
import { set } from 'immutable';
import PostClinicalInstructionList from '../API/PostClinicalInstructionList';
import GetClinicalInstructionListListByUhid from '../API/GetClinicalInstructionlistByUhid';
import PutClinicalInstructionList from '../API/PutClinicalInstructionList';
import DeleteClinicalInstructionList from '../API/DeleteClinicalInstructionList';
import SuccessToster from '../../Component/SuccessToster';



export default function ClinicalInstructions({ setClinicalPres, theEncounterId }) {

  const [showUpdate, setShowUpdate] = useState(0);
  const [showSave, setShowSave] = useState(1);
  let [showToster, setShowToster] = useState(0)
  const [theRowId, setTheRowId] = useState('');
  const [sendForm, setSendForm] = useState({ userId: window.userId, clientId: window.clientId, instructionText: '' });

  const [getClinicalInstructionList, setClinicalInstructionList] = useState([]);
  const [isShowDeletePopUp, setIsShowDeletePopUp] = useState(0);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSendForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    document.getElementById("errInstruction").style.display = "none";
  }

  const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const activeUHID = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : [];

  const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
    JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];

  const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
    JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

  /////////////////////// Save the data //////////////////////////
  const handleSave = async () => {
    if (sendForm.instructionText && sendForm.instructionText.trim() !== "") {
      const finalObj = {
        id: 0,
        instruction: sendForm.instructionText,
        userId: window.userId,
        clientId: clientID,
        uhid: activeUHID,
        doctorId: activeDocID,
        departmentId: activeDeptID
      }

      const saveRes = await PostClinicalInstructionList(finalObj);
      if (saveRes.status === 1) {
        getClinicalList();
        setShowToster(24);
        setTimeout(() => {
          setShowToster(24)
        }, 2000);
        handleClear();
      }
    }
    else {
      document.getElementById("errInstruction").style.display = "block";
    }

  }

  //////////////////////// Update The data ///////////////////////
  const handleUpdate = async (list) => {

    setShowSave(0)
    setShowUpdate(1)
    setSendForm((prev) => ({
      ...prev,
      instructionText: list.instruction,

    }));
    setTheRowId(list.id);


  }

  const handleUpdateSave = async () => {
    if (sendForm.instructionText && sendForm.instructionText.trim() !== "") {
      const finalObjUpdate = {
        id: theRowId,
        instruction: sendForm.instructionText,
        userId: window.userId,
        clientId: clientID,
        uhid: activeUHID
      }
      const resUpdate = await PutClinicalInstructionList(finalObjUpdate);
      if (resUpdate.status === 1) {
        getClinicalList();
        setShowSave(1);
        setShowUpdate(0);
        setShowToster(25);
        setTimeout(() => {
          setShowToster(25)
        }, 2000);
        handleClear();
      }
    }
    else {
      document.getElementById("errInstruction").style.display = "block";
    }

  }

  const handleOpenDeletePopUp = (rowId) => {
    setTheRowId(rowId);
    setIsShowDeletePopUp(1);}

    const handleCloseDeletePopUp = () => {
      setIsShowDeletePopUp(0);
      setTheRowId(0)
    }

  const handleDelete = async (id) => {
    
      const resDel = await DeleteClinicalInstructionList(theRowId, window.userId);
      if (resDel.status === 1) {
        getClinicalList();
        setShowSave(1);
        setShowUpdate(0);
        setShowToster(26);
        setTimeout(() => {
          setShowToster(26)
        }, 2000);
        setIsShowDeletePopUp(0)

      }
    
  }

  const handleClear = () => {
    setSendForm({
      instructionText: ""
    })

  }

  const getClinicalList = async () => {
    const resClinicalLisat = await GetClinicalInstructionListListByUhid(activeUHID, theEncounterId);
    if (resClinicalLisat.status === 1) {
      setClinicalInstructionList(resClinicalLisat.responseValue)
    }
    else {
      setClinicalInstructionList([])
    }
  }

  useEffect(() => {
    getClinicalList();
  }, [setClinicalPres]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="med-box">
              <div className="inner-content">
                <div className="row">
                  <div className="fieldsett-in col-md-12">
                    <div className="fieldsett">
                      <div className="fieldse">
                        <span className="fieldse">Instructions</span>
                        <div className="row">
                          <div className=" col-12 row ms-1">
                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mb-2 mt-2">
                              {/* <label htmlFor="Notes" className="form-label">
                                Notes
                              </label> */}
                              <textarea id="instructionTextId" type="text" className="form-control form-control-sm" name="instructionText" value={sendForm.instructionText} onChange={handleChange} />
                              <small id="errInstruction" className="form-text text-danger" style={{ display: 'none' }}>Instructions cannot be empty.</small>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2">
                              <div className="row align-items-center p-2">
                                <label htmlFor="ObservationCriteria" className="form-label"></label>
                                <div className="d-flex">
                                  <label htmlFor="ObservationCriteria" className="form-label"></label>
                                  {showSave === 1 && <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}>
                                    <img src={plus} className="icnn" alt="" />{" "}
                                    Save
                                  </button>}
                                  {showUpdate === 1 && (
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleUpdateSave}>
                                      <img src={plus} className="icnn" alt="" />
                                      Update
                                    </button>
                                  )}
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1 btnbluehover" onClick={handleClear}>
                                    <img src={clear} className="icnn" alt="" />
                                    Clear
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------Table----------------------------------------- */}
          <div className="col-12 mt-2">
            <div className="med-table-section" >
              <table className="med-table border striped mt-3">
                <thead style={{ zIndex: "0" }}>
                  <tr>
                    <th className="text-center" style={{ width: "5%" }}>
                      #
                    </th>
                    <th>Instruction</th>
                    <th className='text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>

                  {getClinicalInstructionList && getClinicalInstructionList.map((list, ind) => {
                    return (
                      <tr>
                        <td>{ind + 1}</td>
                        <td>{list.instruction}</td>

                        <td>
                          {/* <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 me-1" title="Delete" onClick={() => { handleDelete(list.id) }}>
                            <img src={deleteIcon} className="icnn" alt="" />
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm btn-save-fill mb-1 me-1" onClick={() => { handleUpdate(list) }}>
                            <img src={editIcon} className="icnn" alt="" />
                          </button> */}
                          <div className="action-button">
                            <div data-bs-title="Edit Row" title="Edit Row" onClick={() => { handleUpdate(list) }}><img src={IconEdit} alt='' /></div>
                            <div data-bs-title="Delete Row" data-bs-target="#deleteModal" onClick={() => { handleOpenDeletePopUp(list.id) }}><img src={IconDelete} alt='' /></div>

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
      {isShowDeletePopUp === 1 ? <div className={`modal d-${isShowDeletePopUp === 1 ? 'block' : 'none'}`} id="deleteModal"  data-bs-backdrop="static">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ position: 'relative', zIndex: '1051' }}>
            <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                <div className='popDeleteTitle mt-3'>Delete?</div>
                <div className='popDeleteContent'>Do you want to delete?</div>
            </div>
            <div className="modal-footer1 text-center">
                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={handleCloseDeletePopUp}>Cancel</button>
                <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
            </div>
        </div>
    </div>
</div>
 : ''}
      {showToster === 24 ? (<SuccessToster handle={setShowToster} message="Clinical Instruction saved successfully !!" />) : ("")}
      {showToster === 25 ? (<SuccessToster handle={setShowToster} message="Clinical Instruction updated successfully !!" />) : ("")}

    </>
  )
}
