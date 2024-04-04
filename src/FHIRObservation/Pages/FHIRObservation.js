import React, { useEffect, useState } from 'react'

import save from '../../assets/images/icons/save.svg';
import clear from '../../assets/images/icons/clear.svg'
import plus from '../../assets/images/icons/icons8-plus-30.png';
import deleteIcon from '../../assets/images/icons/icons8-delete-30.png';
import asterik from '../../assets/images/icons/icons8-asterisk-30.png';
import { CodeMaster } from '../../Admin/Pages/EMR Master/CodeMaster';
import FHIRPostObservation from '../API/FHIRPostObservation';
import FHIRGetObservation from '../API/FHIRGetObservation';
import IconEdit from '../../assets/images/icons/IconEdit.svg';
import IconDelete from '../../assets/images/icons/IconDelete.svg';
import FHIRDeleteObservation from '../API/FHIRDeleteObservation';
import FHIRPutObservation from '../API/FHIRPutObservation';
import SuccessToster from '../../Component/SuccessToster';

export default function FHIRObservation({ setObservation, theEncounterId }) {

  const [reasonSectionOpen, setReasonSectionOpen] = useState({});
  const [observationRow, setObservationRow] = useState([{ rowID: 1, },]);
  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [PopUpId, setPopUpId] = useState('');
  let [makeData, setMakeData] = useState([]);
  let [getData, setgetData] = useState([]);
  let [showToster, setShowToster] = useState(0);
  const [getObservationList, setObservationList] = useState([])
  const [toShowButtons, setToShowButtons] = useState(1);
  const [theRowId, setTheRowId] = useState(0)

  const customStyle = { marginLeft: '0px' };
  const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const activeUHID = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : [];

  const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
    JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];

  const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
    JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];


  const SelectedData = (data, modalID) => {


    let t = {
      moduleId: modalID,
      data: data
    }

    setgetData(t);
    setMakeData([...makeData, t])
    let temp = ""
    for (var i = 0; i < data.length; i++) {
      temp = data[i].code
    }

    document.getElementById(modalID).value = temp

  }

  const dataMaker = async (param) => {
    const lastIndexMap = {};
    var jsonData = param;
    jsonData.forEach((item, index, array) => {
      const moduleId = item.moduleId;
      lastIndexMap[moduleId] = array[index];


    });
    const dataArray = Object.values(lastIndexMap);

    return dataArray;
  }


  const handleSave = async () => {

    const getresponse = await dataMaker(makeData);
    if (observationRow.length === getresponse.length) {
      const tempArrList = [];
      const data = [...observationRow];
      for (let i = 0; i < data.length; i++) {


        const date = document.getElementById('obDateID' + data[i].rowID).value;
        const type = document.getElementById('obTypeID' + data[i].rowID).value;
        const description = document.getElementById('obCommentID' + data[i].rowID).value;
        const valueforOb = document.getElementById('obValueID' + data[i].rowID).value;
        const unitforOb = document.getElementById('obUnitID' + data[i].rowID).value;
        const endDate = document.getElementById('obEndDateID' + data[i].rowID).value;
        const reasonCodeElement = document.getElementById('reasonobcodeInputID' + data[i].rowID);
        const reasonCode = reasonCodeElement ? reasonCodeElement.value : '';
        const reasonStatusElement = document.getElementById('reasonObStatusID' + data[i].rowID);
        const reasonStatus = reasonStatusElement ? reasonStatusElement.value : '';
        var arr = getresponse[i].data;
        var maker = "";
        var codeTextMaker = "";
        for (var j = 0; j < arr.length; j++) {
          maker = maker.length === 0 ? arr[j].dropdownName + ':' + arr[j].code : maker + ',' + arr[j].dropdownName + ':' + arr[j].code;
          codeTextMaker = codeTextMaker.length === 0 ? arr[j].codeText : codeTextMaker + '|' + arr[j].codeText;
        }
        tempArrList.push({
          date: date,
          code: maker,
          // codeText: codeTextMaker,
          observation: type,
          description: description,
          ob_value: valueforOb,
          ob_unit: unitforOb,
          date_end: endDate,
          ob_reason_code: reasonCode,
          ob_reason_status: reasonStatus,
          // reason_date_low: reasonRecordingDate,
          // reason_date_high: reasonEndDate,
        });
      }
      let finalObj = {
        uhid: activeUHID,
        clientId: clientID,
        userId: window.userId,
        jsonObservationData: JSON.stringify(tempArrList),
        doctorId: activeDocID,
        departmentId: activeDeptID
      }

      const saveObj = await FHIRPostObservation(finalObj);

      if (saveObj.status === 1) {
        setShowToster(31);
        setTimeout(() => {
          // handleClear();
          setShowToster(31)
        }, 2000)
        handleClear();
        funGetObservationList();
      }
      else {
        alert('Data Not saved')
      }
    }
    else {
      alert('Please select the code.');
    }

  }

  const handleOpenModal = (modalID) => {
    setIsShowPopUp(1);
    setPopUpId(modalID);


  }

  const handleOpenReasonModal = (rowID) => {
    // Update the state to mark the reason section as open for the specified rowID
    const tempArr = [...observationRow]

    setReasonSectionOpen((prevState) => ({
      ...prevState,
      [rowID]: true,
    }));
  };

  const handleCloseModal = () => {
    setIsShowPopUp(0);
    setPopUpId('');
  }

  const handleAddCarePlanRow = (param) => {

    let tempArr = [...observationRow];
    tempArr.push({
      rowID: param + 1,
    });

    setObservationRow(tempArr);
  }

  const handleDeleteCarePlanRow = (index, key) => {
    let tempArr = [];
    const data = [...observationRow];
    if (data.length === 1) {
      return;
    }

    data.splice(index, 1);

    for (var i = 0; i < data.length; i++) {
      const code = document.getElementById('obcodeInputID' + data[i].rowID).value;
      const date = document.getElementById('obDateID' + data[i].rowID).value;
      const endDate = document.getElementById('obEndDateID' + data[i].rowID).value;
      const type = document.getElementById('obTypeID' + data[i].rowID).value;
      const obValue = document.getElementById('obValueID' + data[i].rowID).value;
      const obUnit = document.getElementById('obUnitID' + data[i].rowID).value;
      const description = document.getElementById('obCommentID' + data[i].rowID).value;
      tempArr.push({
        rowID: data[i].rowID,
        Date: date,
        EndDate: endDate,
        Code: code,
        Type: type,
        obValue: obValue,
        obUnit: obUnit,
        Description: description,
      });
    }
    setObservationRow(data);
    setTimeout(() => {
      for (var j = 0; j < tempArr.length; j++) {
        document.getElementById('obcodeInputID' + tempArr[j].rowID).value = tempArr[j].Code;
        document.getElementById('obDateID' + tempArr[j].rowID).value = tempArr[j].Date;
        document.getElementById('obTypeID' + tempArr[j].rowID).value = tempArr[j].Type;
        document.getElementById('obCommentID' + tempArr[j].rowID).value = tempArr[j].Description;
        document.getElementById('obValueID' + tempArr[j].rowID).value = tempArr[j].obValue;
        document.getElementById('obUnitID' + tempArr[j].rowID).value = tempArr[j].obUnit;
        document.getElementById('obEndDateID' + tempArr[j].rowID).value = tempArr[j].EndDate;

      }
    }, 200)

  }

  const handleClear = () => {
    for (let i = 0; i < observationRow.length; i++) {
      const obDateElement = document.getElementById('obDateID' + observationRow[i].rowID);
      const obTypeElement = document.getElementById('obTypeID' + observationRow[i].rowID);
      const obCommentElement = document.getElementById('obCommentID' + observationRow[i].rowID);
      const obValueElement = document.getElementById('obValueID' + observationRow[i].rowID);
      const obUnitElement = document.getElementById('obUnitID' + observationRow[i].rowID);
      const obEndDateElement = document.getElementById('obEndDateID' + observationRow[i].rowID);
      const reasonObStatusElement = document.getElementById('reasonObStatusID' + observationRow[i].rowID);
      const reasonObCodeInputElement = document.getElementById('reasonobcodeInputID' + observationRow[i].rowID);
      const obCodeInputElement = document.getElementById('obcodeInputID' + observationRow[i].rowID);

      // Check if elements exist before setting their values
      obDateElement && (obDateElement.value = '');
      obTypeElement && (obTypeElement.value = 0);
      obCommentElement && (obCommentElement.value = '');
      obValueElement && (obValueElement.value = '');
      obUnitElement && (obUnitElement.value = '');
      obEndDateElement && (obEndDateElement.value = '');
      reasonObStatusElement && (reasonObStatusElement.value = 0);
      reasonObCodeInputElement && (reasonObCodeInputElement.value = '');
      obCodeInputElement && (obCodeInputElement.value = '');
    }
    setMakeData([]);
    setObservationRow([{ rowID: 1, },]);
    setReasonSectionOpen({});
  }

  const handleDelete = async (id) => {
    if (window.confirm("Do you wish to delete?")) {
      const resDel = await FHIRDeleteObservation(id);
      if (resDel.status === 1) {


        setShowToster(29);
        setTimeout(() => {
          setShowToster(29)
        }, 2000);
        funGetObservationList();

      }
    }
  }

  const handleEdit = async (list) => {
    setToShowButtons(0);
    setTheRowId(list.id)
    const inputDate = list.date;
    const parts = inputDate.split('-');
    const formattedDate = parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0');
    // Output: "YYYY-MM-DD"

    const inputEndDate = list.endDate;
    const partsEndDate = inputEndDate.split('-');
    const formattedEndDate = partsEndDate[2] + '-' + partsEndDate[1].padStart(2, '0') + '-' + partsEndDate[0].padStart(2, '0');

    // Output: "YYYY-MM-DD"

    for (let i = 0; i < observationRow.length; i++) {
      document.getElementById('obcodeInputID' + observationRow[i].rowID).value = list.code;
      document.getElementById('obValueID' + observationRow[i].rowID).value = list.ob_value;
      document.getElementById('obUnitID' + observationRow[i].rowID).value = list.ob_unit;
      document.getElementById('obTypeID' + observationRow[i].rowID).value = list.observation;
      document.getElementById('obDateID' + observationRow[i].rowID).value = formattedDate;
      document.getElementById('obEndDateID' + observationRow[i].rowID).value = formattedEndDate;
      document.getElementById('obCommentID' + observationRow[i].rowID).value = list.description;
      if (list.ob_reason_status && list.ob_reason_code) {
        setReasonSectionOpen((prevState) => ({
          ...prevState,
          [1]: true,
        }));
        setTimeout(() => {
          document.getElementById('reasonobcodeInputID' + observationRow[i].rowID).value = list.ob_reason_code;
          document.getElementById('reasonObStatusID' + observationRow[i].rowID).value = list.ob_reason_status;
        }, 100)
      }
    }
  }

  const handleEditSave = async () => {
    const getresponse = await dataMaker(makeData);
    const tempArrList = [];
    const data = [...observationRow];
    for (let i = 0; i < data.length; i++) {

      const date = document.getElementById('obDateID' + data[i].rowID).value;
      const type = document.getElementById('obTypeID' + data[i].rowID).value;
      const description = document.getElementById('obCommentID' + data[i].rowID).value;
      const valueforOb = document.getElementById('obValueID' + data[i].rowID).value;
      const unitforOb = document.getElementById('obUnitID' + data[i].rowID).value;
      const endDate = document.getElementById('obEndDateID' + data[i].rowID).value;
      const reasonCodeElement = document.getElementById('reasonobcodeInputID' + data[i].rowID);
      const reasonCode = reasonCodeElement ? reasonCodeElement.value : '';
      const reasonStatusElement = document.getElementById('reasonObStatusID' + data[i].rowID);
      const reasonStatus = reasonStatusElement ? reasonStatusElement.value : '';
      if (getresponse.length !== 0) {
        const arr = getresponse[i].data;
        var maker = "";
        var codeTextMaker = "";
        for (var j = 0; j < arr.length; j++) {
          maker = maker.length === 0 ? arr[j].dropdownName + ':' + arr[j].code : maker + ',' + arr[j].dropdownName + ':' + arr[j].code;
          codeTextMaker = codeTextMaker.length === 0 ? arr[j].codeText : codeTextMaker + '|' + arr[j].codeText;
        }
      }
      else {
        var codePre = document.getElementById('obcodeInputID' + data[i].rowID).value
      }

      tempArrList.push({
        id: theRowId,
        date: date,
        code: maker ? maker : codePre,
        // codeText: codeTextMaker,
        observation: type,
        description: description,
        ob_value: valueforOb,
        ob_unit: unitforOb,
        date_end: endDate,
        ob_reason_code: reasonCode,
        ob_reason_status: reasonStatus,
        // reason_date_low: reasonRecordingDate,
        // reason_date_high: reasonEndDate,
      });
    }
    const updObj = { JsonObservationData: JSON.stringify(tempArrList) }

    const resUpdate = await FHIRPutObservation(updObj);
    if (resUpdate.status === 1) {
      setShowToster(32);
      setTimeout(() => {
        // handleClear();
        setShowToster(32)
      }, 2000)
      funGetObservationList();
    }
    else {
      alert('Data not updated!')
    }
  }


  const funGetObservationList = async () => {
    const resGet = await FHIRGetObservation(activeUHID, theEncounterId);
    if (resGet.status === 1) {
      setObservationList(resGet.responseValue)
    }
  }

  useEffect(() => {
    funGetObservationList();
  }, [setObservation])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="med-box">
              <div class="title mb-1" style={{ backgroundColor: '#80808036' }}>Observation Form </div>
              <div className="inner-content">
                {observationRow && observationRow.map((observationPlan, index) => {
                  return (<div className='container-fluid border border-primary mb-2 rounded'>
                    <>
                      <div className="row mb-2">
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Code :<span className="starMandatory">*</span></label>
                          <input type='text' className='form-control form-control-sm' id={'obcodeInputID' + observationPlan.rowID} onClick={() => { handleOpenModal('obcodeInputID' + observationPlan.rowID) }} />
                          {/* <span>{observationPlan.rowID}</span> */}
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Type :</label>
                          <select className='form-select form-select-sm' id={'obTypeID' + observationPlan.rowID} >
                            <option value='0'>Select Code</option>
                            <option value='1'>TEST CODE A</option>
                            <option value='2'>TEST Code B</option>
                            {/* {getobservationPlanTypeList && getobservationPlanTypeList.map((list, ind) => (
                            <option key={ind} value={list.id}>{list.typeName}</option>
                  ))} */}


                          </select>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Value</label>
                          <input type='text' className='form-control form-control-sm' id={'obValueID' + observationPlan.rowID} />
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Unit</label>
                          <input type='text' className='form-control form-control-sm' id={'obUnitID' + observationPlan.rowID} />
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Date :</label>
                          <input type='date' className='form-control form-control-sm' id={'obDateID' + observationPlan.rowID} />
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>End Date :</label>
                          <input type='date' className='form-control form-control-sm' id={'obEndDateID' + observationPlan.rowID} />
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 mb-2">
                          <label className='form-label'>Comment</label>
                          <textarea className='form-control form-control-sm' id={'obCommentID' + observationPlan.rowID} />
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 mb-2">
                          {(toShowButtons === 1) ?
                            <>
                              <label className='form-label'>&nbsp;</label>
                              <div className="mb-2 d-flex justify-content-end_ flex-wrap">
                                <div>
                                  <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2" onClick={() => { handleAddCarePlanRow(observationPlan.rowID) }}><img src={plus} className='icnn' alt='' />Add</button>
                                </div>
                                <div>
                                  <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={() => { handleDeleteCarePlanRow(index, observationPlan.rowID) }}><img src={deleteIcon} className='icnn' alt='' />Delete</button>
                                </div>
                                <div>
                                  <button type="button" className="btn btn-light btn-sm btn-light-fill mb-1 ms-2" style={{ borderColor: 'black' }} onClick={() => { handleOpenReasonModal(observationPlan.rowID) }}><img src={asterik} className='icnn' alt='' />Add Reason</button>
                                </div>


                              </div>
                            </> :
                            <div >
                              <button type="button" className="btn btn-light btn-sm btn-light-fill mb-1 ms-2 mt-3" style={{ borderColor: 'black' }} onClick={() => { handleOpenReasonModal(observationPlan.rowID) }}><img src={asterik} className='icnn' alt='' />Add Reason</button>
                            </div>}

                        </div>
                      </div>

                    </>
                    {reasonSectionOpen[observationPlan.rowID] &&
                      <div className="row">
                        <div className="col-12 p-0">
                          <div class="heading" style={{ fontSize: '14px' }}>Observation Reason Information</div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                        </div>

                        <div className="col-12 mt-4">
                          <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason Code</label>
                              <input type='text' className='form-control form-control-sm mb-2' id={'reasonobcodeInputID' + observationPlan.rowID} />
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason Status</label>
                              <select className='form-select form-select-sm' id={'reasonObStatusID' + observationPlan.rowID}>
                                <option value='0'>Select Code</option>
                                <option value='Pending'>Pending</option>
                                <option value='Completed'>Completed</option>
                                <option value='Completed'>Negated</option>
                              </select>
                            </div>

                            {/* <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason Recording Date</label>
                              <input type='date' className='form-control form-control-sm mb-2' id={'reasonRecordingDateID' + observationPlan.rowID} />
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason End Date (Leave empty if there is no end date)</label>
                              <input type='date' className='form-control form-control-sm mb-2' id={'reasonEndDateID' + observationPlan.rowID} />
                            </div> */}
                          </div>
                        </div>

                      </div>}
                  </div>
                  )
                })}
              </div>
            </div>

          </div>
          <div className="col-12 mt-2">
            <div className="whitebg1">
              <div className="row">
                <div className="col-12">
                  <div className="whitebg" style={{ padding: '3px' }}>
                    <div className="d-flex gap-2 mt-2 samplebtnn">
                      {(toShowButtons === 1) ?
                        <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" onClick={handleSave}><img src={save} className='icnn' alt='' />Save</button> :
                        <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" onClick={handleEditSave}><img src={save} className='icnn' alt='' />Update</button>}

                      <button type="button" className="btn btn-clear btn-sm mb-1 me-1 btnbluehover" onClick={handleClear}><img src={clear} className='icnn' alt='' />Clear</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-2">
            <div className="med-table-section" style={{ maxHeight: "40vh", minHeight: '20vh' }}>
              <table className="med-table border striped mt-3">
                <thead style={{ zIndex: "0" }}>
                  <tr>
                    <th className="text-center" style={{ width: "5%" }}>
                      #
                    </th>
                    <th>Date</th>
                    <th>End Date</th>
                    <th>Code</th>
                    <th>Value</th>
                    <th>Comment</th>
                    <th>Observation Type</th>
                    <th>Reason Code</th>
                    <th>Reason Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getObservationList && getObservationList.map((list, ind) => {
                    return (<>
                      <tr key={list.id}>
                        <td className="text-center" style={{ width: "5%" }}>{ind + 1}</td>
                        <td>{list.date === '00-00-0000' ? '--' : list.date}</td>
                        <td>{list.endDate === '00-00-0000' ? '--' : list.endDate}</td>
                        <td>{list.code}</td>
                        <td>{list.ob_value}</td>
                        <td>{list.description}</td>
                        <td>{list.observation}</td>
                        <td>{list.ob_reason_code ? list.ob_reason_code : '---'}</td>
                        <td>{list.ob_reason_status ? list.ob_reason_status : '---'}</td>
                        <td>
                          <div className="action-button">
                            {/* <div><img src={IconDelete}  onClick={() => { deleteImmunizationListData(immunizationList.id) }} alt='' /></div> */}
                            <div onClick={() => { handleEdit(list) }}><img src={IconEdit} alt='' title='Edit Observation' /></div>
                            <div onClick={() => { handleDelete(list.id) }}><img src={IconDelete} title='Delete Observation' alt='' /></div>
                          </div>
                        </td>
                      </tr>
                    </>)
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>


      </div>

      {/* ------------------------------------------ Code Master popUp Start------------------------------------ */}
      {isShowPopUp === 1 ?

        <div className={`modal d-${isShowPopUp === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static" >
          <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
            <div className="modal-content" >
              {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>


              <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={false} />
              {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
            </div>
          </div>
        </div>
        : ''}
      {/* ------------------------------------------ Code Master popUp End------------------------------------ */}
      {showToster === 31 ? (<SuccessToster handle={setShowToster} message="Observation saved successfully !!" />) : ("")}
      {showToster === 32 ? (<SuccessToster handle={setShowToster} message="Observation updated successfully !!" />) : ("")}
    </>
  )
}
