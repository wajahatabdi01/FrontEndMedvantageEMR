import React, { useEffect, useState } from 'react';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import GetSubtestList from '../../Api/SubtestNormalRange/GetSubtestList';
import GetMachineList from '../../Api/SubtestNormalRange/GetMachineList';

// import GetRangeUnitList from '../../Api/SubtestNormalRange/GetRangeUnitList';
import PostSubtestNormalRange from '../../Api/SubtestNormalRange/PostSubtestNormalRange';
import GetTableData from '../../Api/SubtestNormalRange/GetTableData';
import DeleteSubtestNormalRange from '../../Api/SubtestNormalRange/DeleteSubtestNormalRange';
import ValidationSubtestNormalRange from '../../../Validation/LabService/ValidationSubtestNormalRange';
import PutSubtestNormalRange from '../../Api/SubtestNormalRange/PutSubtestNormalRange';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";



export const SubtestNormalRange = () => {
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [subTestNameList, setSubTestNameList] = useState([]);
  const [machineNameList, setMachineNameList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [ageUnit, setAgeUnit] = useState([]);
  const [rangeMin, setRangeMin] = useState('');
  const [rangeMax, setRangeMax] = useState('');
  const { t } = useTranslation();
  // const [rangeUnitList, setRangeUnitList] = useState([]);
  const [rangeRemark, setRangeRemark] = useState('');

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  const getMachineList = async () => {
    setShowLoder(1);
    const data = await GetMachineList(clientID);
    if (data.status === 1) {
      setShowLoder(0);
      setMachineNameList(data.responseValue);
    }
    else {
      setShowLoder(0);
    }
  };

  const getSubtestList = async () => {
    setShowLoder(1);
    const data = await GetSubtestList(clientID);


    if (data.status === 1) {
      setShowLoder(0);
      setSubTestNameList(data.responseValue);
    }
    else {
      setShowLoder(0);
    }
  };

  const getGenderList = async () => {

    const data = genderOptions;
    setGenderList(data);

  };

  // const getRangeUnitList = async ()=>{
  //   setShowLoder(1);
  //   const data = await GetRangeUnitList();


  //   if(data.status === 1){
  //       setShowLoder(0);
  //       setRangeUnitList  (data.responseValue);
  //   }
  //   else{
  //       setShowLoder(0);
  //   }
  // };

  const getAgeUnit = () => {
    setShowLoder(1);
    const data = options;

    setAgeUnit(data);
  };


  const handleChange = async (e) => {

    if (e.target.name === 'AgeMin') {
      setAgeMin(e.target.value);
      document.getElementById("errAgeMin").style.display = "none";
    }

    if (e.target.name === 'AgeMax') {
      setAgeMax(e.target.value);
      document.getElementById("errAgeMax").style.display = "none";
    }
    if (e.target.name === 'RangeMin') {
      setRangeMin(e.target.value);
      document.getElementById("errRangeMin").style.display = "none";
    }

    if (e.target.name === 'RangeMax') {
      setRangeMax(e.target.value);
      document.getElementById("errRangeMax").style.display = "none";
    }
    if (e.target.name === 'RangeRemark') {
      setRangeRemark(e.target.value);
    }

    if (e.target.name === 'ddlSubtest') {
      document.getElementById("errddlSubtest").style.display = "none";
    }
    if (e.target.name === 'ddlMachineName') {
      document.getElementById("errddlMachineName").style.display = "none";
    }
    if (e.target.name === 'ddlGender') {
      document.getElementById("errddlGender").style.display = "none";
    }
    if (e.target.name === 'ddlAgeUnit') {
      document.getElementById("errddlAgeUnit").style.display = "none";
    }
  };

  const handleSave = async () => {
    const subtestId = document.getElementById('ddlSubtest').value;
    const machineNameId = document.getElementById('ddlMachineName').value;
    const genderId = document.getElementById('ddlGender').value;
    const ageUnitId = document.getElementById('ddlAgeUnit').value;
    // const rangeUnitId = document.getElementById('ddlRangeUnit').value;
    //const userID = window.userId;
    const obj = {
      subTestID: subtestId,
      machineID: machineNameId,
      gender: genderId,
      ageMin: ageMin,
      ageMax: ageMax,
      ageUnitID: ageUnitId,
      rangeMin: rangeMin,
      rangeMax: rangeMax,
      // rangeUnitID : rangeUnitId,
      rangeRemark: rangeRemark,
      userID: userID,
      clientId: clientID
    }

    let formValidation = ValidationSubtestNormalRange(obj.subTestID, obj.machineID, obj.gender, obj.ageMin, obj.ageMax, obj.ageUnitID, obj.rangeMin, obj.rangeMax, obj.rangeRemark, obj.clientId)
    if (formValidation[0]) {
      const data = await PostSubtestNormalRange(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Saved Successfully!");
        setTimeout(() => {
          setShowToster(0);
          getSubtestNormalRangeData();
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
    else {
      document.getElementById(formValidation[1]).innerHTML = formValidation[2]
      document.getElementById(formValidation[1]).style.display = "block"
    }
  };

  const getSubtestNormalRangeData = async () => {
    setShowLoder(1);
    const data = await GetTableData(clientID);

    if (data.status === 1) {
      setShowLoder(0);
      setTableData(data.responseValue);
    }
    else {
      setShowLoder(0);
    }
  };
  const edit = async (list) => {
    setIsUpdateBtnShow(true);
    setRowID(list.id);
    document.getElementById('ddlSubtest').value = list.subTestID;
    document.getElementById('ddlMachineName').value = list.machineID;
    document.getElementById('ddlGender').value = list.gender;
    document.getElementById('ddlAgeUnit').value = list.ageUnitID;
    // document.getElementById('ddlRangeUnit').value = list.rangeUnitID;
    setRangeRemark(list.rangeRemark);
    setRangeMax(list.rangeMax);
    setRangeMin(list.rangeMin);
    setAgeMax(list.ageMax);
    setAgeMin(list.ageMin);
  };

  const handleUpdate = async () => {
    const subtestId = document.getElementById('ddlSubtest').value;
    const machineNameId = document.getElementById('ddlMachineName').value;
    const genderId = document.getElementById('ddlGender').value;
    const ageUnitId = document.getElementById('ddlAgeUnit').value;
    // const rangeUnitId = document.getElementById('ddlRangeUnit').value;
    //const userID = window.userId;
    const obj = {
      id: rowID,
      subTestID: subtestId,
      machineID: machineNameId,
      gender: genderId,
      ageMin: ageMin,
      ageMax: ageMax,
      ageUnitID: ageUnitId,
      rangeMin: rangeMin,
      rangeMax: rangeMax,
      // rangeUnitID : rangeUnitId,
      rangeRemark: rangeRemark,
      userID: userID
    }

    let formValidation = ValidationSubtestNormalRange(obj.subTestID, obj.machineID, obj.gender, obj.ageMin, obj.ageMax, obj.ageUnitID, obj.rangeMin, obj.rangeMax, obj.rangeRemark)
    if (formValidation[0]) {
      const data = await PutSubtestNormalRange(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Updated Successfully!");
        setTimeout(() => {
          setShowToster(0);
          getSubtestNormalRangeData();
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
    else {
      document.getElementById(formValidation[1]).innerHTML = formValidation[2]
      document.getElementById(formValidation[1]).style.display = "block"
    }
  };

  const deleteRow = async () => {
    setShowUnderProcess(1);


    const obj = {
      id: rowID,

    };

    let data = await DeleteSubtestNormalRange(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setTimeout(() => {
        setShowToster(0);
        handleClear();
        getSubtestNormalRangeData();
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



  const handleCancel = async () => {
    handleClear();
    setIsUpdateBtnShow(false);
  };

  const handleClear = async () => {
    document.getElementById('ddlAgeUnit').value = '0';
    document.getElementById('ddlGender').value = '0';
    document.getElementById('ddlMachineName').value = '0';
    document.getElementById('ddlSubtest').value = '0';
    setRangeRemark('');
    setRangeMax('');
    setRangeMin('');
    setAgeMax('');
    setAgeMin('');
  };


  const options = [
    { label: 'Year', id: '1' },

    { label: 'Month', id: '2' },

    { label: 'Day', id: '3' },
  ];

  const genderOptions = [
    { label: 'M', id: '1' },

    { label: 'F', id: '2' },

    { label: 'C', id: '3' },
  ];

  useEffect(() => {
    getSubtestList();
    getMachineList();
    getGenderList();
    // getRangeUnitList();
    getAgeUnit();
    getSubtestNormalRangeData();
  }, []);

  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
          <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Subtest_Normal_Range_Master")}</div></div></div>
            <div className="col-12"> 
                <div className="inner-content">

                <div className='dflex regEqualColums whitebg paddingcustom mapp'>
                    {/* <div className='col-md-12 col-sm-12 col-xs-12 mb-3'> */}
                      {/* <div className="d-flex flex-wrap align-content-end"> */}

                        {/* Subtest */}
                        <div className="col-2 mb-2 me-2">
                          <label htmlFor="ddlSubtest" className="form-label">{t("SubtestName")}<span className="starMandatory">*</span></label>
                          <select className="form-select form-select-sm" name='ddlSubtest' id='ddlSubtest' aria-label=".form-select-sm example" onChange={handleChange}>
                            <option value="0">{t("Select_Subtest")}</option>
                            {subTestNameList && subTestNameList.map((val, index) => {
                              return (
                                <option value={val.id}>{val.subTestName}</option>
                              )
                            })}
                          </select>
                          <small id="errddlSubtest" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        {/* machine Name */}
                        <div className="col-2 mb-2 me-2">
                          <label htmlFor="ddlMachineName" className="form-label">{t("Machine_Name")}<span className="starMandatory">*</span></label>
                          <select className="form-select form-select-sm" name='ddlMachineName' id='ddlMachineName' aria-label=".form-select-sm example" onChange={handleChange}>
                            <option value="0">{t("SelectMachine")}</option>
                            {machineNameList && machineNameList.map((val, index) => {
                              return (
                                <option value={val.id}>{val.machineName}</option>
                              )
                            })}
                          </select>
                          <small id="errddlMachineName" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        {/* Gender */}
                        <div className="col-2 mb-2 me-2">
                          <label htmlFor="ddlGender" className="form-label">{t("Gender")}<span className="starMandatory">*</span></label>
                          <select className="form-select form-select-sm" name='ddlGender' id='ddlGender' aria-label=".form-select-sm example" onChange={handleChange}>
                            <option value="0">{t("Select_Gender")}</option>
                            {genderList && genderList.map((val, index) => {
                              return (
                                <option value={val.label}>{val.label}</option>
                              )
                            })}
                          </select>
                          <small id="errddlGender" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        {/* Age min */}
                        <div className="col-2 col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("MinAge")}<span className="starMandatory">*</span></label>
                          <input type="number" className="form-control form-control-sm" name="AgeMin" value={ageMin} placeholder={t("Min_Age")} onChange={handleChange} />
                          <small id="errAgeMin" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        {/* Age Max */}
                        <div className="col-2 col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("MaxAge")}<span className="starMandatory">*</span></label>
                          <input type="number" className="form-control form-control-sm" name="AgeMax" value={ageMax} placeholder={t("Max_Age")} onChange={handleChange} />
                          <small id="errAgeMax" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        {/* Age Unit  */}
                        <div className="col-2 mb-2 me-2">
                          <label htmlFor="ddlAgeUnit" className="form-label">{t("Age_Unit")}<span className="starMandatory">*</span></label>
                          <select className="form-select form-select-sm" name='ddlAgeUnit' id='ddlAgeUnit' aria-label=".form-select-sm example" onChange={handleChange}>
                            <option value="0">{t("Select_Age_Unit")}</option>
                            {ageUnit && ageUnit.map((val, index) => {
                              return (
                                <option value={val.label}>{val.label}</option>
                              )
                            })}
                          </select>
                          <small id="errddlAgeUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        {/* Range Min */}
                        <div className="col-2 col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("MinRange")}<span className="starMandatory">*</span></label>
                          <input type="number" className="form-control form-control-sm" name="RangeMin" value={rangeMin} placeholder={t("Min_Range")} onChange={handleChange} />
                          <small id="errRangeMin" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        {/* Range Max */}
                        <div className="col-2 col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("MaxRange")}<span className="starMandatory">*</span></label>
                          <input type="number" className="form-control form-control-sm" name="RangeMax" value={rangeMax} placeholder={t("Max_Range")} onChange={handleChange} />
                          <small id="errRangeMax" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        {/* Range Unit List
                        <div className="mb-2 me-2" style={{ width: '200px' }}>
                          <label htmlFor="ddlRangeUnit" className="form-label">Range Unit Name<span className="starMandatory">*</span></label>
                          <select className="form-select form-select-sm" id='ddlRangeUnit' aria-label=".form-select-sm example" onChange={clearToasterOrError}>
                            <option value="0">Select Range Unit</option>
                            {rangeUnitList && rangeUnitList.map((val, index) => {
                              return (
                                <option value={val.id}>{val.unitName}</option>
                              )
                            })}
                          </select>
                          <small id="errddlRangeUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div> */}

                        {/* range Remark */}
                        <div className="col-2 col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("RangeRemark")}
                            {isUpdateBtnShow === true ? <span className="starMandatory">*</span> : <span className="starMandatory"></span>}
                          </label>
                          <input type="text" className="form-control form-control-sm" name="RangeRemark" value={rangeRemark} placeholder={t("Range_Remark")} onChange={handleChange} />
                          <small id="errRangeRemark" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        <div className="col-2 mb-2 relative ">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div className='textmbtn'>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={handleSave}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1 btn-save-fill" onClick={handleUpdate}><img src={saveButtonIcon} className='icnn' alt='' />{t("Update")}</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancel}><img src={clearIcon} className='icnn' alt='' />{t("Cancel")}</button>
                                  </>
                                }
                              </div>
                          }
                        </div>
                      {/* </div> */}
                    {/* </div> */}
                  </div>

                </div>
            </div>
            <div className="col-12 mt-1">
              <div className="med-table-section" style={{ "height": "72vh" }}>
                <table className="med-table border_ striped_">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("Sr.No.")}</th>
                      <th>{t("SubtestName")}</th>
                      <th>{t("Machine_Name")}</th>
                      <th>{t("Gender")}</th>
                      <th>{t("MinAge")}</th>
                      <th>{t("MaxAge")}</th>
                      <th>{t("Age_Unit")}</th>
                      <th>{t("MinRange")}</th>
                      <th>{t("MaxRange")}</th>
                      <th>{t("RangeRemark")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tableData && tableData.map((list, index) => {
                      return (
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{list.subTestName}</td>
                          <td>{list.machineName}</td>
                          <td>{list.gender}</td>
                          <td>{list.ageMin}</td>
                          <td>{list.ageMax}</td>
                          <td>{list.ageUnitID}</td>
                          <td>{list.rangeMin}</td>
                          <td>{list.rangeMax}</td>

                          <td>{list.rangeRemark}</td>
                          <td>
                            {/* <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => edit(list)}></i></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowID(list.id); }}></i>
                              </div>
                            </div> */}

                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => edit(list)} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id); }} />
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
                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
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
      
      </section>
    </>
  )
}   
