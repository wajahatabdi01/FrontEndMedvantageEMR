import React, { useEffect, useState } from 'react'
import plus from '../../assets/images/icons/icons8-plus-30.png'
import deleteIcon from '../../assets/images/icons/icons8-delete-30.png'
import asterik from '../../assets/images/icons/icons8-asterisk-30.png'
import save from '../../assets/images/icons/save.svg';
import clear from '../../assets/images/icons/clear.svg';
import { CodeMaster } from '../../Admin/Pages/EMR Master/CodeMaster'
import POSTFHIRCarePlan from '../API/POSTFHIRCarePlan'
import GetCarePlanType from '../API/GetCarePlanType'
import GetCarePlanByUhid from '../API/GetCarePlanByUhid'
import IconEdit from '../../assets/images/icons/IconEdit.svg';
import IconDelete from '../../assets/images/icons/IconDelete.svg'
import DeleteCareplanByID from '../API/DeleteCareplanByID'
import PutCarePlanByID from '../API/PutCarePlanByID';
import SuccessToster from '../../Component/SuccessToster';


export default function FHIRCarePlan({ setCarePlan, theEncounterId }) {
  const [getCarePlanTypeList, setCarePlanTypeList] = useState([])
  let [makeData, setMakeData] = useState([]);
  let [getData, setgetData] = useState([]);
  let [showToster, setShowToster] = useState(0)
  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [reasonSectionOpen, setReasonSectionOpen] = useState({});
  const [PopUpId, setPopUpId] = useState('');
  const [carePlanRow, setCarePlanRow] = useState([{ rowID: 1, Date: '', Code: '', Type: 0, Description: '', reasonCode: '', reasonStatus: '', reasonRecordingDate: '', reasonEndDate: '', },]);
  const [getCarePlanList, setCarePlanList] = useState([]);
  const [toShowButtons, setToShowButtons] = useState(1);
  const [theRowId, setTheRowId] = useState(0)


  // const handleTextChange  =(e) =>{
  //   let arr=[...carePlanRow];

  // }


  const customStyle = { marginLeft: '0px' };
  const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const activeUHID = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : [];

  const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
    JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];

  const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
    JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

  //////////////////////////////////////  TO Get Care Plan Type List ///////////////////////////////

  const funGetCarePlanTypeList = async () => {
    const getCareTypeRes = await GetCarePlanType();
    setCarePlanTypeList(getCareTypeRes.responseValue)
  }

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
  const handleOpenModal = (modalID) => {
    setIsShowPopUp(1);
    setPopUpId(modalID);


  }
  const handleOpenReasonModal = (rowID) => {
    // Update the state to mark the reason section as open for the specified rowID
    const tempArr = [...carePlanRow]

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

    let tempArr = [...carePlanRow];
    tempArr.push({
      rowID: param + 1,
    });

    setCarePlanRow(tempArr);
  }

  const handleDeleteCarePlanRow = (index, key) => {
    let tempArr = [];
    const data = [...carePlanRow];
    if (data.length === 1) {
      return;
    }

    data.splice(index, 1);

    for (var i = 0; i < data.length; i++) {
      const code = document.getElementById('codeInputID' + data[i].rowID).value;
      const date = document.getElementById('careDateID' + data[i].rowID).value;
      const type = document.getElementById('careTypeID' + data[i].rowID).value;
      const description = document.getElementById('careDescriptionID' + data[i].rowID).value;
      tempArr.push({
        rowID: data[i].rowID,
        Date: date,
        Code: code,
        Type: type,
        Description: description,
      });

    }
    setCarePlanRow(data);
    setTimeout(() => {
      for (var j = 0; j < tempArr.length; j++) {
        document.getElementById('codeInputID' + tempArr[j].rowID).value = tempArr[j].Code;
        document.getElementById('careDateID' + tempArr[j].rowID).value = tempArr[j].Date;
        document.getElementById('careTypeID' + tempArr[j].rowID).value = tempArr[j].Type;
        document.getElementById('careDescriptionID' + tempArr[j].rowID).value = tempArr[j].Description;
      }
    }, 200)

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
    if (carePlanRow.length === getresponse.length) {
      let tempArrList = [];
      const data = [...carePlanRow];


      for (var i = 0; i < data.length; i++) {


        const date = document.getElementById('careDateID' + data[i].rowID).value;
        const type = document.getElementById('careTypeID' + data[i].rowID).value;
        const description = document.getElementById('careDescriptionID' + data[i].rowID).value;
        const reasonCodeElement = document.getElementById('reasonCodeInputID' + data[i].rowID);
        const reasonCode = reasonCodeElement ? reasonCodeElement.value : '';
        const reasonStatusElement = document.getElementById('reasonStatusID' + data[i].rowID);
        const reasonStatus = reasonStatusElement ? reasonStatusElement.value : '';
        const reasonRecordingDateElement = document.getElementById('reasonRecordingDateID' + data[i].rowID);
        const reasonRecordingDate = reasonRecordingDateElement ? reasonRecordingDateElement.value : '';
        const reasonEndDateElement = document.getElementById('reasonEndDateID' + data[i].rowID);
        const reasonEndDate = reasonEndDateElement ? reasonEndDateElement.value : '';
        var arr = getresponse[i].data;
        var maker = "";
        var codeTextMaker = "";
        for (var j = 0; j < arr.length; j++) {
          maker = maker.length === 0 ? arr[j].dropdownName + ':' + arr[j].code : maker + ',' + arr[j].dropdownName + ':' + arr[j].code;
          codeTextMaker = codeTextMaker.length === 0 ? arr[j].codeText : codeTextMaker + '|' + arr[j].codeText;
        }
        tempArrList.push({
          date: date,
          codeType: maker,
          codeText: codeTextMaker,
          care_plan_type: type,
          description: description,
          reason_code: reasonCode,
          reason_status: reasonStatus,
          reason_date_low: reasonRecordingDate,
          reason_date_high: reasonEndDate,
        });
      }


      let finalObj = {
        uhid: activeUHID,
        clientId: clientID,
        userId: window.userId,
        jsonCarePlanData: JSON.stringify(tempArrList),
        doctorId: activeDocID,
        departmentId: activeDeptID
      }


      const saveObj = await POSTFHIRCarePlan(finalObj);

      if (saveObj.status === 1) {
        setShowToster(11)
        setTimeout(() => {
          setShowToster(0);
        }, 2000)
        handleClear();
        getCarePlanListByUhid();
      }
      else {
        alert('Data Not saved')
      }
    }
    else {
      alert('Please select the code.');
    }

  }

  ////////////////////////////// to clear the fields //////////////////////////////
  const handleClear = () => {

    for (let i = 0; i < carePlanRow.length; i++) {
      document.getElementById('careDateID' + carePlanRow[i].rowID).value = '';
      document.getElementById('careTypeID' + carePlanRow[i].rowID).value = 0;
      document.getElementById('careDescriptionID' + carePlanRow[i].rowID).value = ''
      document.getElementById('reasonCodeInputID' + carePlanRow[i].rowID).value = '';
      document.getElementById('reasonStatusID' + carePlanRow[i].rowID).value = 0;
      document.getElementById('reasonRecordingDateID' + carePlanRow[i].rowID).value = '';
      document.getElementById('reasonEndDateID' + carePlanRow[i].rowID).value = '';
      document.getElementById('codeInputID' + carePlanRow[i].rowID).value = '';
    }
    setMakeData([]);
  }

  const getCarePlanListByUhid = async () => {

    const getListRes = await GetCarePlanByUhid(activeUHID, theEncounterId);
    if (getListRes.status === 1) {
      setCarePlanList(getListRes.responseValue);
    }
  }

  const handleEdit = async (list) => {

    setToShowButtons(0);
    setTheRowId(list.id)
    const inputDate = list.date;
    const parts = inputDate.split('-');
    const formattedDate = parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0');
    // Output: "YYYY-MM-DD"
    const reasonDateLow = list.date;
    const partsLow = reasonDateLow.split('-');
    const formattedLowDate = partsLow[2] + '-' + partsLow[1].padStart(2, '0') + '-' + partsLow[0].padStart(2, '0');
    // Output: "YYYY-MM-DD"
    const reasonDateHigh = list.date;
    const partsHigh = reasonDateHigh.split('-');
    const formattedHighDate = partsHigh[2] + '-' + partsHigh[1].padStart(2, '0') + '-' + partsHigh[0].padStart(2, '0');
    // Output: "YYYY-MM-DD"

    for (let i = 0; i < carePlanRow.length; i++) {
      document.getElementById('codeInputID' + carePlanRow[i].rowID).value = list.code;
      document.getElementById('careTypeID' + carePlanRow[i].rowID).value = list.care_plan_type;
      document.getElementById('careDateID' + carePlanRow[i].rowID).value = formattedDate;
      document.getElementById('careDescriptionID' + carePlanRow[i].rowID).value = list.description;
      if (list.reason_code || list.reason_description || list.reason_date_low || list.reason_date_high) {
        setReasonSectionOpen((prevState) => ({
          ...prevState,
          [1]: true,
        }));
        setTimeout(() => {
          document.getElementById('reasonCodeInputID' + carePlanRow[i].rowID).value = list.reason_code;
          document.getElementById('reasonStatusID' + carePlanRow[i].rowID).value = list.reason_status;
          document.getElementById('reasonRecordingDateID' + carePlanRow[i].rowID).value = formattedLowDate;
          document.getElementById('reasonEndDateID' + carePlanRow[i].rowID).value = formattedHighDate;
        }, 100)
      }
    }
  }

  const handleEditSave = async () => {
    const getresponse = await dataMaker(makeData);
    const tempArrList = [];
    const data = [...carePlanRow];
    for (let i = 0; i < data.length; i++) {

      const date = document.getElementById('careDateID' + data[i].rowID).value;
      const type = document.getElementById('careTypeID' + data[i].rowID).value;
      const description = document.getElementById('careDescriptionID' + data[i].rowID).value;
      const reasonCodeElement = document.getElementById('reasonCodeInputID' + data[i].rowID);
      const reasonCode = reasonCodeElement ? reasonCodeElement.value : '';
      const reasonStatusElement = document.getElementById('reasonStatusID' + data[i].rowID);
      const reasonStatus = reasonStatusElement ? reasonStatusElement.value : '';
      const lowDateElement = document.getElementById('reasonRecordingDateID' + data[i].rowID);
      const lowDate = lowDateElement ? lowDateElement.value : '';
      const highDateElement = document.getElementById('reasonEndDateID' + data[i].rowID);
      const highDate = highDateElement ? highDateElement.value : '';
      //  const reasonCodeElement = document.getElementById('reasonobcodeInputID' + data[i].rowID);
      //  const reasonCode = reasonCodeElement ? reasonCodeElement.value : '';
      //  const reasonStatusElement = document.getElementById('reasonObStatusID' + data[i].rowID);
      //  const reasonStatus = reasonStatusElement ? reasonStatusElement.value : '';
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
        var codePre = document.getElementById('reasonCodeInputID' + data[i].rowID).value
      }

      tempArrList.push({
        id: theRowId,
        date: date,
        codeType: maker ? maker : codePre,
        codeText: codeTextMaker,
        care_plan_type: type,
        description: description,
        reason_code: reasonCode,
        reason_status: reasonStatus,
        reason_date_low: lowDate,
        reason_date_high: highDate,
      });
    }
    const updObj = {
      userId: window.userId,
      jsonCarePlanData: JSON.stringify(tempArrList)
    }

    const resUpdate = await PutCarePlanByID(updObj);
    if (resUpdate.status === 1) {
      setShowToster(10);
      setTimeout(() => {
        setShowToster(10)
      }, 2000)
      getCarePlanListByUhid();
      handleClear();
    }
    else {
      alert('Data not updated!')
    }

  }

  const handleDelete = async (id) => {
    if (window.confirm('Do you wish to delete!')) {
      const resDel = await DeleteCareplanByID(id);
      if (resDel.status === 1) {


        setShowToster(9);
        setTimeout(() => {
          setShowToster(9)
        }, 2000);
        getCarePlanListByUhid();

      }
    }
  }


  // useEffect(() => {
  //   funGetCarePlanTypeList();
  //   getCarePlanListByUhid();
  // },[props.setCarePlan])
  useEffect(() => {
    if (setCarePlan) {
      funGetCarePlanTypeList();
      getCarePlanListByUhid();
    }
  }, [setCarePlan]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="med-box">
              <div class="title mb-1" style={{ backgroundColor: '#80808036' }}>Care Plan Form </div>
              <div className="inner-content">
                {carePlanRow && carePlanRow.map((carePlan, index) => {
                  return (<div className='container-fluid border border-primary mb-2 rounded'>
                    <>
                      <div className="row mb-2">
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Code :<span className="starMandatory">*</span></label>
                          <input type='text' className='form-control form-control-sm' id={'codeInputID' + carePlan.rowID} onClick={() => { handleOpenModal('codeInputID' + carePlan.rowID) }} />
                          {/* <span>{carePlan.rowID}</span> */}
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Date :</label>
                          <input type='date' className='form-control form-control-sm' id={'careDateID' + carePlan.rowID} />
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Type :</label>
                          <select className='form-select form-select-sm' id={'careTypeID' + carePlan.rowID} >
                            <option value='0'>Select Code</option>
                            {getCarePlanTypeList && getCarePlanTypeList.map((list, ind) => (
                              <option key={ind} value={list.id}>{list.typeName}</option>
                            ))}


                          </select>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 mb-2">
                          <label className='form-label'>Description :</label>
                          <textarea className='form-control form-control-sm' id={'careDescriptionID' + carePlan.rowID} />
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 mb-2">
                          {(toShowButtons === 1) ?
                            <>
                              <label className='form-label'>&nbsp;</label>
                              <div className="mb-2 d-flex justify-content-end_ flex-wrap">
                                <div>
                                  <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2" onClick={() => { handleAddCarePlanRow(carePlan.rowID) }}><img src={plus} className='icnn' alt='' />Add</button>
                                </div>
                                <div>
                                  <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={() => { handleDeleteCarePlanRow(index, carePlan.rowID) }}><img src={deleteIcon} className='icnn' alt='' />Delete</button>
                                </div>
                                <div>
                                  <button type="button" className="btn btn-light btn-sm btn-light-fill mb-1 ms-2" style={{ borderColor: 'black' }} onClick={() => { handleOpenReasonModal(carePlan.rowID) }}><img src={asterik} className='icnn' alt='' />Add Reason</button>
                                </div>


                              </div>
                            </> :
                            <div >
                              <button type="button" className="btn btn-light btn-sm btn-light-fill mb-1 ms-2 mt-3" style={{ borderColor: 'black' }} onClick={() => { handleOpenReasonModal(carePlan.rowID) }}><img src={asterik} className='icnn' alt='' />Add Reason</button>
                            </div>}

                        </div>
                      </div>

                    </>
                    {reasonSectionOpen[carePlan.rowID] &&
                      <div className="row">
                        <div className="col-12 p-0">
                          <div class="heading" style={{ fontSize: '14px' }}>Care Plan Reason Information</div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                        </div>

                        <div className="col-12 mt-4">
                          <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason Code</label>
                              <input type='text' className='form-control form-control-sm mb-2' id={'reasonCodeInputID' + carePlan.rowID} />
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason Status</label>
                              <select className='form-select form-select-sm' id={'reasonStatusID' + carePlan.rowID}>
                                <option value='0'>Select Code</option>
                                <option value='1'>Pending</option>
                                <option value='2'>Completed</option>
                                <option value='3'>Negated</option>
                              </select>
                            </div>

                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason Recording Date</label>
                              <input type='date' className='form-control form-control-sm mb-2' id={'reasonRecordingDateID' + carePlan.rowID} />
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason End Date (Leave empty if there is no end date)</label>
                              <input type='date' className='form-control form-control-sm mb-2' id={'reasonEndDateID' + carePlan.rowID} />
                            </div>
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
                    <th>Code Type</th>
                    <th>Codetext</th>
                    <th>Description</th>
                    <th>Care Plan Type</th>
                    <th>Reason Code</th>
                    <th>Reason Description</th>
                    <th>Reason Recording Date</th>
                    <th>Reason End Date</th>
                    <th>Action</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {getCarePlanList && getCarePlanList.map((list, ind) => {
                    const codingListItem = list.code ? list.code.split(';') : [];

                    return (<>
                      <tr key={list.id}>
                        <td className="text-center" style={{ width: "5%" }}>{ind + 1}</td>
                        <td>{list.date === '00-00-0000' ? '--' : list.date}</td>
                        {/* <td>{list.code}</td> */}
                        <td>
                          <div className='codeSplit'>
                            {codingListItem.map((coding, index) => (
                              coding.trim() !== '' &&
                              <span key={index} className="">{coding}</span>
                            ))}
                          </div>
                        </td>
                        <td>{list.codetext ? list.codetext : 'Not Available'}</td>
                        <td>{list.description}</td>
                        <td>{list.typeName}</td>
                        <td>{list.reason_code}</td>
                        <td>{list.reason_description ? list.reason_description : 'Not Available'}</td>
                        <td>{list.reason_date_low === '00-00-0000' ? '--' : list.reason_date_low}</td>
                        <td>{list.reason_date_high === '00-00-0000' ? '--' : list.reason_date_high}</td>
                        <td>
                          <div className="action-button">
                            {/* <div><img src={IconDelete}  onClick={() => { deleteImmunizationListData(immunizationList.id) }} alt='' /></div> */}
                            <div onClick={() => { handleEdit(list) }}><img src={IconEdit} alt='' title='Edit Careplan' /></div>
                            <div onClick={() => { handleDelete(list.id) }}><img src={IconDelete} title='Delete Careplan' alt='' /></div>
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
      {showToster === 11 ? (<SuccessToster handle={setShowToster} message="Careplan saved successfully !!" />) : ("")}
      {showToster === 10 ? (<SuccessToster handle={setShowToster} message="Careplan updated successfully !!" />) : ("")}

    </>

  )
}
