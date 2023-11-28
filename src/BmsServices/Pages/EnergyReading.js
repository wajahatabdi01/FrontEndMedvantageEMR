import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import GetEnergyReading from "../API/EnergyReading/GetEnergyReading";
import PostEnergyReading from "../API/EnergyReading/PostEnergyReading";
import DeleteEnergyReading from "../API/EnergyReading/DeleteEnergyReading";
import UpdateEnergyReading from "../API/EnergyReading/UpdateEnergyReading";
import GetReadBy from "../API/EnergyReading/GetReadBy";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GetMeterNumberwithEnergyType from "../API/EnergyReading/GetMeterNumberwithEnergyType";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function EnergyReading() {

  const { t } = useTranslation();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  let [selectReadBy, setselectReadBy] = useState([]);
  const [EnergyReadingTable, setEnergyReadingTable] = useState([])
  const [EnterreadingPoint, setEnterreadingPoint] = useState('')
  const [enterMeterNumber, setenterMeterNumber] = useState(null)
  const [enterEnergyUsage, setenterEnergyUsage] = useState('')
  const [EnterReadBy, setEnterReadBy] = useState(null)
  const [ReadingDate, setReadingDate] = useState("")
  const [EnergyMeterTable, setEnergyMeterTable] = useState([])
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setIsNewRowAdded] = useState(false);
  const [isClearable,] = useState(true);
  const [isSearchable,] = useState(true);
  let [userID,] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);




  // The Code written is  By S Ayaz

  let DropDownds = async () => {
    let MeterNumberselect = await GetMeterNumberwithEnergyType()
    if (MeterNumberselect.status === 1) {
      setEnergyMeterTable(MeterNumberselect.responseValue.map(MeterNo => ({
        value: MeterNo.id,
        label: MeterNo.meterAndEnergyType
      })))
      console.log("MeterNumberwithEnergyType", MeterNumberselect)
    }
    let GetreadBY = await GetReadBy();
    if (GetreadBY.status === 1) {
      setShowLoder(0);
      setselectReadBy(GetreadBY.responseValue.map(Readby => ({
        value: Readby.id,
        label: Readby.name
      })));
      console.log("GetreadBY", GetreadBY.responseValue)
    }

  }



  let EnergyReading = async () => {
    let GellEnergyReadingData = await GetEnergyReading();
    if (GellEnergyReadingData.status === 1) {
      console.log("EnergyReading", GellEnergyReadingData.responseValue)
      setShowLoder(0);
      setEnergyReadingTable(GellEnergyReadingData.responseValue);
    }
  }


  // POST API called for data saving


  const handleOnChange = (e) => {
    setNewlyAddedRowIndex(null);
    setIsNewRowAdded(false)
    document.getElementById('errMeterNumber').style.display = 'none';
    document.getElementById('errReadingDate').style.display = 'none';
    document.getElementById('errEnergyReadby').style.display = 'none';
    document.getElementById('errEnergyUsage').style.display = 'none';
    document.getElementById('errreadingpoint').style.display = 'none';

    const { name, value } = e.target;

    if (name === 'EnergyUsage') {
      setenterEnergyUsage(value);
    }
    if (name === 'readingpoint') {
      setEnterreadingPoint(value);
    }
    if (name === 'readingDate') {
      setReadingDate(value);
    }

  };
  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };
  const handleOnSave = async () => {


    if (enterMeterNumber === null) {
      document.getElementById('errMeterNumber').innerHTML = 'Please choose Meter Number';
      document.getElementById('errMeterNumber').style.display = 'block';
      return;
    }

    else if (EnterreadingPoint ===  undefined || EnterreadingPoint === null || EnterreadingPoint.toString().trim() === '') {
      document.getElementById('errreadingpoint').innerHTML = 'Please Enter Reading Point';
      document.getElementById('errreadingpoint').style.display = 'block';
      return;
    }
    else if(EnterreadingPoint < 0){
      document.getElementById('errreadingpoint').innerHTML = 'Reading Point should not be negative';
      document.getElementById('errreadingpoint').style.display = 'block';
      return;
    }
 
    else if (enterEnergyUsage ===  undefined || enterEnergyUsage === null || enterEnergyUsage.toString().trim() === '') {
      document.getElementById('errEnergyUsage').innerHTML = 'Please Enter Energy Usage';
      document.getElementById('errEnergyUsage').style.display = 'block';
      return;
    }
    else if (enterEnergyUsage < 0){
      document.getElementById('errEnergyUsage').innerHTML = 'Energy Usage should not be negative';
      document.getElementById('errEnergyUsage').style.display = 'block';
      return;
    }
  
    else if (EnterReadBy === null) {
      document.getElementById('errEnergyReadby').innerHTML = 'Please choose Read By';
      document.getElementById('errEnergyReadby').style.display = 'block';
      return;
    }

    else if (ReadingDate.trim() === '' || ReadingDate === undefined) {
      document.getElementById('errReadingDate').innerHTML = 'Please choose Energy Reading Date';
      document.getElementById('errReadingDate').style.display = 'block';
      return;
    }


    const obj = {
     
      meterID: enterMeterNumber.value,
      readingDate: ReadingDate,
      readingPoint: EnterreadingPoint,
      energyUsage: enterEnergyUsage,
      readBy: EnterReadBy.value,
      userID: userID,
    };
 

    let data = await PostEnergyReading(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      EnergyReading()
      setIsNewRowAdded(true);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setIsNewRowAdded(false);

      }, 2000);
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(1);
      setTosterMessage("Already Exist!");
      setTosterMessage(data.responseValue);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };

  const handleClear = () => {
    document.getElementById('errMeterNumber').style.display = 'none';
    document.getElementById('errReadingDate').style.display = 'none';
    document.getElementById('errEnergyReadby').style.display = 'none';
    document.getElementById('errEnergyUsage').style.display = 'none';
    document.getElementById('errreadingpoint').style.display = 'none';
   
    setenterMeterNumber(null)
    setEnterreadingPoint("")
    setenterEnergyUsage("")
    setEnterReadBy(null)
    setReadingDate("")
  };


  const edit = (GellEnergyReadingData, index) => {
    setRowID(GellEnergyReadingData.id)
    setIsUpdateBtnShow(true);
    setenterMeterNumber({
      value: GellEnergyReadingData.meterID,
      label : GellEnergyReadingData.meterNumber
    })
    setEnterreadingPoint(GellEnergyReadingData.readingPoint)
    setenterEnergyUsage(GellEnergyReadingData.energyUsage)
    setEnterReadBy({
       value : GellEnergyReadingData.readId,
       label : GellEnergyReadingData.readBy

    })
    setReadingDate(GellEnergyReadingData.readingDate)
    setNewlyAddedRowIndex(index)
  }

  const handleUpdate = async () => {


    if (enterMeterNumber === null) {
      document.getElementById('errMeterNumber').innerHTML = 'Please choose Meter Number';
      document.getElementById('errMeterNumber').style.display = 'block';
      return;
    }

    else if (EnterreadingPoint ===  undefined || EnterreadingPoint === null || EnterreadingPoint.toString().trim() === '') {
      document.getElementById('errreadingpoint').innerHTML = 'Please Enter Reading Point';
      document.getElementById('errreadingpoint').style.display = 'block';
      return;
    }
    else if(EnterreadingPoint < 0){
      document.getElementById('errreadingpoint').innerHTML = 'Reading Point should not be negative';
      document.getElementById('errreadingpoint').style.display = 'block';
      return;
    }
    else if (enterEnergyUsage ===  undefined || enterEnergyUsage === null || enterEnergyUsage.toString().trim() === '') {
      document.getElementById('errEnergyUsage').innerHTML = 'Please Enter Energy Usage';
      document.getElementById('errEnergyUsage').style.display = 'block';
      return;
    }
 
    else if (EnterReadBy === null ) {
      document.getElementById('errEnergyReadby').innerHTML = 'Please choose  Read By';
      document.getElementById('errEnergyReadby').style.display = 'block';
      return;
    }
    else if (enterEnergyUsage < 0){
      document.getElementById('errEnergyUsage').innerHTML = 'Energy Usage should not be negative';
      document.getElementById('errEnergyUsage').style.display = 'block';
      return;
    }
    else if (ReadingDate.trim() === '' || ReadingDate === undefined) {
      document.getElementById('errReadingDate').innerHTML = 'Please choose Energy Reading Date';
      document.getElementById('errReadingDate').style.display = 'block';
      return;
    }


    const obj = {
      id: rowID,
      meterID: enterMeterNumber.value,
      readingDate: ReadingDate,
      readingPoint: EnterreadingPoint,
      energyUsage: enterEnergyUsage,
      readBy: EnterReadBy.value,
      userID: userID,
    };
    const data = await UpdateEnergyReading(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      EnergyReading()

      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
        handleClear()

      }, 2000);
      setIsUpdateBtnShow(false);
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage(data.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };
  const handleCancel = () => {
    handleClear()
    setIsUpdateBtnShow(false);
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);

  };

  const deleteRow = async () => {

    setShowUnderProcess(1);

    const obj = {
      id: rowID,
      userID: userID
    }

    let data = await DeleteEnergyReading(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      setIsNewRowAdded(false)
      EnergyReading()
      setTimeout(() => {
        setShowToster(0);

        handleClear()
      }, 1000)
    }
    else {
      setShowUnderProcess(0)
      setShowToster(0)
      setTosterMessage(data.responseValue)
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0);
      }, 2000)
    }
  };

  useEffect(() => {
    DropDownds()
    EnergyReading()
  }, []);
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Energy_Reading")}</div>
                <div className="inner-content">
                  <div className='row'>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Meter_Number_with_Type")}<span className="starMandatory">*</span></label>
                      <Select value={enterMeterNumber} options={EnergyMeterTable} className=" create-select" id="serviceType" placeholder={t("Choose_Meter_Number_with_Type")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errMeterNumber", setenterMeterNumber)} />
                      <small id="errMeterNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("ReadingPoint")}<span className="starMandatory">*</span></label>
                      <input value={EnterreadingPoint} id="ddlreadingpoint" type="number" className="form-control form-control-sm" name="readingpoint" placeholder={t("Reading_Point")} onChange={handleOnChange} />
                      <small id="errreadingpoint" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("Energy_Usage")}<span className="starMandatory">*</span></label>
                      <input value={enterEnergyUsage} id="ddlenergyUsage" type="number" className="form-control form-control-sm" name="EnergyUsage" placeholder={t("Enter_Energy_Usage")} onChange={handleOnChange} />
                      <small id="errEnergyUsage" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Read_By")}<span className="starMandatory">*</span></label>
                      <Select value={EnterReadBy} options={selectReadBy} className=" create-select" id="serviceType" placeholder={t("Choose_Read_By")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errEnergyReadby", setEnterReadBy)} />
                      <small id="errEnergyReadby" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("Reading_Date")}<span className="starMandatory">*</span></label>
                      <input type="datetime-local" className="form-control form-control-sm" name="readingDate" value={ReadingDate} placeholder={t("Enter_Reading_Date")} onChange={handleOnChange} />
                      <small id="errReadingDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                            {isUpdateBtnShow !== true ? <>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleOnSave}><img src={saveButtonIcon} className='icnn' alt="" />{t("Save")}</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt="" />{t("Clear")}</button>
                            </> :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-3" onClick={handleUpdate} >{t("Update")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancel} >{t("Cancel")}</button>
                              </>
                            }
                          </div>
                      }
                    </div>
                  </div>
                </div>


              </div>
            </div>


            {/* table is made using getAllItemMaster API and mapped the data   */}


            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{zIndex: '0'}}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("MeterNumber")}</th>
                      <th>{t("ReadingPoint")}</th>
                      <th>{t("Energy_Usage_KwH")}</th>
                      <th>{t("Read_By")}</th>
                      <th>{t("Reading_Date")}</th>
                      <th></th>

                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EnergyReadingTable && EnergyReadingTable.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={index === EnergyReadingTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.meterNumber}</td>
                          <td>{data.readingPoint}</td>
                          <td>{data.energyUsage + " " + "KwH"}</td>
                          <td>{data.readBy}</td>
                          <td>{data.readingDate}</td>
                          <td></td>


                          <td></td>

                          <td>
                            <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                                <img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data, index) }} />
                              </div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(data.id); }} />
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
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={deleteRow} >{t("Delete")}</button>
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


