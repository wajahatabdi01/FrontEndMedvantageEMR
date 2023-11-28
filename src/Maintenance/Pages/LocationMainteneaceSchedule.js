import React, { useEffect, useState } from "react";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import Loder from "../../Component/Loader";
import Select from "react-select";
import saveButtonIcon from "../../assets/images/icons/saveButton.svg";
import deleteBtnIcon from "../../assets/images/icons/delete.svg";
import editBtnIcon from "../../assets/images/icons/edit.svg";
import GetMaintenanceScheduleLocation from "../../Maintenance/API/LocationMaintenanceSchedule/GetMaintenanceScheduleLocation";
import GetAllLocationMaintenanceSchedule from "../API/LocationMaintenanceSchedule/GetAllLocationMaintenanceSchedule";
import PostLocationMaintenaceSchedule from "../API/LocationMaintenanceSchedule/PostLocationMaintenaceSchedule";
import PutLocationMaintenaceSchedule from "../API/LocationMaintenanceSchedule/PutLocationMaintenaceSchedule";
import DeleteLocationMaintenaceSchedule from "../API/LocationMaintenanceSchedule/DeleteLocationMaintenaceSchedule";
import GetServiceTypeMaster from "../API/LocationMaintenanceSchedule/GetServiceTypeMaster";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function LocationMainteneaceSchedule() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [Location, setLocation] = useState(null);
  const [MaintenaceType, setMaintenaceType] = useState(null);
  const [isClearable] = useState(true);
  const [isSearchable] = useState(true);
  const [LocationDropdown, setLocationDropdown] = useState([]);
  const [MaintenaceTypeDropdown, setMaintenaceTypeDropdown] = useState([]);
  const [MaintenanceSCheduleTable, setMaintenanceSCheduleTable] = useState([]);
  const [MaintainenceFrequency, setMaintainenceFrequency] = useState("");
  const [lastMaintenanceDate, setlastMaintenanceDate] = useState("");
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setisNewRowAdded] = useState(false)
  let [userID] = useState(
    JSON.parse(sessionStorage.getItem("LoginData")).userId
  );
  const [nextScheduledDate, setnextScheduledDate] = useState("");

  // The Code is  written By S Ayaz

  let Dropdowns = async () => {
    let LocationMaster = await GetMaintenanceScheduleLocation();
    if (LocationMaster.status === 1) {
      console.log("LocationMaster", LocationMaster.responseValue);
      setShowLoder(0);
      setLocationDropdown(
        LocationMaster.responseValue.map((location) => ({
          value: location.id,
          label: `${location.floorName} Floor ${location.buildingName} Building ${location.roomNumber}`,
        }))
      );
    }
    let MaintenaceType = await GetServiceTypeMaster();
    if (MaintenaceType.status === 1) {
      console.log("MaintenaceType", MaintenaceType.responseValue);
      setShowLoder(0);
      setMaintenaceTypeDropdown(
        MaintenaceType.responseValue.map((MaintainenceType) => ({
          value: MaintainenceType.id,
          label: MaintainenceType.serviceType,
        }))
      );
    }
  };

  let AllLocationMaintenanceSchedule = async () => {
    let LocationMaintenanceSchedule = await GetAllLocationMaintenanceSchedule();
    if (LocationMaintenanceSchedule.status === 1) {
      console.log(
        "LocationMaintenanceSchedule",
        LocationMaintenanceSchedule.responseValue
      );
      setMaintenanceSCheduleTable(LocationMaintenanceSchedule.responseValue);
    }
  };

  // POST API called for data saving

  const handleOnChange = (e) => {
    setisNewRowAdded(false)
    setNewlyAddedRowIndex(null);
    document.getElementById("errLocation").style.display = "none";
    document.getElementById("errMaintenaceType").style.display = "none";
    document.getElementById("errnextScheduledDate").style.display = "none";
    document.getElementById("errlastMaintenanceDate").style.display = "none";
    document.getElementById("errMaintainenceFrequency").style.display = "none";

    const { name, value } = e.target;

    if (name === "MaintainenceFrequency") {
      setMaintainenceFrequency(value);
    } else if (name === "lastMaintenanceDate") {
      setlastMaintenanceDate(value);
    } else if (name === "nextScheduledDate") {
      setnextScheduledDate(value);
    }
  };

  const handleSelectChange = (
    selectedOption,
    errorElementId,
    setSelectedFunction
  ) => {
    document.getElementById(errorElementId).style.display = "none";
    setSelectedFunction(selectedOption);
  };

  const handleOnSave = async () => {
    if (Location === null) {
      document.getElementById("errLocation").innerHTML =
        "Please Select Location";
      document.getElementById("errLocation").style.display = "block";
      return;
    } else if (MaintenaceType === null) {
      document.getElementById("errMaintenaceType").innerHTML =
        "Please Enter Maintenance Type";
      document.getElementById("errMaintenaceType").style.display = "block";
      return;
    } else if (
      MaintainenceFrequency.trim() === "" ||
      MaintainenceFrequency === undefined
    ) {
      document.getElementById("errMaintainenceFrequency").innerHTML =
        "Please Enter Maintainence Frequency";
      document.getElementById("errMaintainenceFrequency").style.display =
        "block";
      return;
    } else if (
      lastMaintenanceDate.trim() === "" ||
      lastMaintenanceDate === undefined
    ) {
      document.getElementById("errlastMaintenanceDate").innerHTML =
        "Please Choose Last Maintenance Date";
      document.getElementById("errlastMaintenanceDate").style.display = "block";
      return;
    } else if (
      nextScheduledDate.trim() === "" ||
      nextScheduledDate === undefined
    ) {
      document.getElementById("errnextScheduledDate").innerHTML =
        "Please Choose Next Scheduled Date";
      document.getElementById("errnextScheduledDate").style.display = "block";
      return;
    }

    const obj = {
      id: rowID,
      locationID: Location.value,
      maintenanceTypeID: MaintenaceType.value,
      maintenanceFrequency: MaintainenceFrequency,
      lastMaintenanceDateTime: lastMaintenanceDate,
      nextMaintenanceDateTime: nextScheduledDate,
      userID: userID,
    };

    let data = await PostLocationMaintenaceSchedule(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      AllLocationMaintenanceSchedule();
      setisNewRowAdded(true);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setisNewRowAdded(false);
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
    document.getElementById("errLocation").style.display = "none";
    document.getElementById("errMaintenaceType").style.display = "none";
    document.getElementById("errnextScheduledDate").style.display = "none";
    document.getElementById("errlastMaintenanceDate").style.display = "none";
    document.getElementById("errMaintainenceFrequency").style.display = "none";

    setLocation(null);
    setMaintenaceType(null);
    setMaintainenceFrequency("");
    setlastMaintenanceDate("");
    setnextScheduledDate("");
  };

  const edit = (LocationMaster,index) => {
    setRowID(LocationMaster.id);
    setIsUpdateBtnShow(true);
    setLocation({
      value: LocationMaster.locationID,
      label: `${LocationMaster.floorName} Floor ${LocationMaster.buildingName} Building ${LocationMaster.roomNumber}`,
    });
    setMaintenaceType({
      value: LocationMaster.maintenanceTypeID,
      label: LocationMaster.maintenanceType,
    });
    setMaintainenceFrequency(LocationMaster.maintenanceFrequency);
    setlastMaintenanceDate(LocationMaster.lastMaintenanceDateTime);
    setnextScheduledDate(LocationMaster.nextMaintenanceDateTime);
    setNewlyAddedRowIndex(index)
  };

  const handleUpdate = async () => {
    if (Location === null) {
      document.getElementById("errLocation").innerHTML =
        "Please Select Location";
      document.getElementById("errLocation").style.display = "block";
      return;
    } else if (MaintenaceType === null) {
      document.getElementById("errMaintenaceType").innerHTML =
        "Please Enter Maintenance Type";
      document.getElementById("errMaintenaceType").style.display = "block";
      return;
    } else if (MaintainenceFrequency === "Select Maintenance Frequency") {
      document.getElementById("errMaintainenceFrequency").innerHTML =
        "Please Enter Maintainence Frequency";
      document.getElementById("errMaintainenceFrequency").style.display =
        "block";
      return;
    } else if (lastMaintenanceDate === undefined) {
      document.getElementById("errlastMaintenanceDate").innerHTML =
        "Please Choose Last Maintenance Date";
      document.getElementById("errlastMaintenanceDate").style.display = "block";
      return;
    } else if (nextScheduledDate === undefined) {
      document.getElementById("errnextScheduledDate").innerHTML =
        "Please Choose Next Scheduled Date";
      document.getElementById("errnextScheduledDate").style.display = "block";
      return;
    }

    const obj = {
      id: rowID,
      locationID: Location.value,
      maintenanceTypeID: MaintenaceType.value,
      maintenanceFrequency: MaintainenceFrequency,
      lastMaintenanceDate: lastMaintenanceDate,
      nextScheduledDate: nextScheduledDate,
      userID: userID,
    };

    const data = await PutLocationMaintenaceSchedule(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Updated Successfully!");
      setisNewRowAdded(false)
      AllLocationMaintenanceSchedule();
      handleClear();
      setTimeout(() => {
        setShowToster(0);
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
    handleClear();
    setIsUpdateBtnShow(false);
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);
  };

  const deleteRow = async () => {
    setShowUnderProcess(1);

    const obj = {
      id: rowID,
      userId: userID,
    };

    let data = await DeleteLocationMaintenaceSchedule(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      AllLocationMaintenanceSchedule();
      setTosterMessage("Data Deleted Successfully!!");
      console.log("success");
      setIsUpdateBtnShow(false);
      setTimeout(() => {
        setShowToster(0);
        handleClear();
        
      }, 1000);
    } else {
      setShowUnderProcess(0);
      setShowToster(0);
      setTosterMessage(data.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };

  useEffect(() => {
    Dropdowns();
    AllLocationMaintenanceSchedule();
  }, []);

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Location_Maintenance_Schedule")}</div>
                <div className="inner-content">
                  <div className="row">
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">
                        {t("Location")}<span className="starMandatory">*</span>
                      </label>
                      <Select
                        value={Location}
                        options={LocationDropdown}
                        className=" create-select"
                        id="serviceType"
                        placeholder={t("Choose_Location")}
                        isSearchable={isSearchable}
                        isClearable={isClearable}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "errLocation",
                            setLocation
                          )
                        }
                      />
                      <small
                        id="errLocation"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">
                        {t("Maintenance_Type")}<span className="starMandatory">*</span>
                      </label>
                      <Select
                        value={MaintenaceType}
                        options={MaintenaceTypeDropdown}
                        className=" create-select"
                        id="serviceType"
                        placeholder={t("Choose_Maintenace_Type")}
                        isSearchable={isSearchable}
                        isClearable={isClearable}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "errMaintenaceType",
                            setMaintenaceType
                          )
                        }
                      />
                      <small
                        id="errMaintenaceType"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">
                      {t("MaintenanceFrequency")}{" "}
                        <span className="starMandatory">*</span>
                      </label>
                      <input
                        value={MaintainenceFrequency}
                        id="MaintainenceFrequency"
                        type="text"
                        className="form-control form-control-sm"
                        name="MaintainenceFrequency"
                        placeholder={t("Maintenance_Frequency")}
                        onChange={handleOnChange}
                      />
                      <small
                        id="errMaintainenceFrequency"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">
                        {t("Last_Maintenance_Date")}{" "}
                        <span className="starMandatory">*</span>
                      </label>
                      <input
                        value={lastMaintenanceDate}
                        id="lastMaintenanceDate"
                        type="datetime-local"
                        className="form-control form-control-sm"
                        name="lastMaintenanceDate"
                        placeholder={t("Select_Last_Maintenance_Date")}
                        onChange={handleOnChange}
                      />
                      <small
                        id="errlastMaintenanceDate"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">
                        {t("Next_Scheduled_Date")}{" "}
                        <span className="starMandatory">*</span>
                      </label>
                      <input
                        value={nextScheduledDate}
                        id="lastMaintenanceDate"
                        type="datetime-local"
                        className="form-control form-control-sm"
                        name="nextScheduledDate"
                        placeholder={t("Select_NextScheduled_Date")}
                        onChange={handleOnChange}
                      />
                      <small
                        id="errnextScheduledDate"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        &nbsp;
                      </label>

                      {showUnderProcess === 1 ? (
                        <>
                          <TosterUnderProcess />{" "}
                        </>
                      ) : showToster === 1 ? (
                        <Toster value={tosterValue} message={tosterMessage} />
                      ) : (
                        <div>
                          {isUpdateBtnShow !== true ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-save btn-save-fill btn-sm mb-1 me-1 mx-1"
                                onClick={handleOnSave}
                              >
                                {" "}
                                <img
                                  src={saveButtonIcon}
                                  alt=""
                                  className="icnn"
                                />
                                {t("Save")}
                              </button>
                              <button
                                type="button"
                                className="btn btn-clear btn-sm mb-1 me-1"
                                onClick={handleClear}
                              >
                                {t("Clear")}
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn btn-save btn-sm mb-1 me-1 mx-1"
                                onClick={handleUpdate}
                              >
                                {t("Update")}
                              </button>
                              <button
                                type="button"
                                className="btn btn-clear btn-sm mb-1 me-1"
                                onClick={handleCancel}
                              >
                                {t("Cancel")}
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* table is made using getAllItemMaster API and mapped the data   */}

            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ height: "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: "0" }}>
                    <tr>
                      <th className="text-center" style={{ width: "5%" }}>
                        {t("#")}
                      </th>
                      <th>{t("Location")}</th>
                      <th>{t("Maintenance_Type")}</th>
                      <th>{t("MaintenanceFrequency")}</th>
                      <th>{t("Last_Maintenance_Date")}</th>
                      <th>{t("Next_Scheduled_Date")}</th>
                      <th></th>

                      <th></th>
                      <th style={{ width: "10%" }} className="text-center">
                        {t("Action")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MaintenanceSCheduleTable &&
                      MaintenanceSCheduleTable.map((data, index) => {
                        const isNewRow = newlyAddedRowIndex === index;
                        const isEditing = index === editRowIndex;
                        return (
                          <tr className={index === MaintenanceSCheduleTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{`${data.floorName} Floor ${data.buildingName} Building ${data.roomNumber}`}</td>
                          <td>{data.maintenanceTypeID}</td>
                          <td>{data.maintenanceFrequency}</td>
                          <td>
                            {(() => {
                              const dateTime = new Date(
                                data.lastMaintenanceDateTime
                              );
                              const formattedDate = dateTime.toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              );
                              const formattedTime = dateTime.toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              );

                              return `${formattedDate} at ${formattedTime}`;
                            })()}
                          </td>
                          <td>
                            {(() => {
                              const dateTime = new Date(
                                data.nextMaintenanceDateTime
                              );
                              const formattedDate = dateTime.toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              );
                              const formattedTime = dateTime.toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              );

                              return `${formattedDate} at ${formattedTime}`;
                            })()}
                          </td>

                          <td></td>

                          <td></td>

                          <td>
                            <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"
                              >
                                <img
                                  src={editBtnIcon}
                                  alt=""
                                  onClick={() => {
                                    edit(data, index);
                                  }}
                                />
                              </div>
                              <div
                                data-bs-toggle="modal"
                                data-bs-title="Delete Row"
                                data-bs-placement="bottom"
                                data-bs-target="#deleteModal"
                              >
                                <img
                                  src={deleteBtnIcon}
                                  className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data, index) }}
                                />
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

        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modalDelete">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className="popDeleteIcon">
                  <i className="fa fa-trash"></i>
                </div>
                <div className="popDeleteTitle mt-3"> {t("Delete?")}</div>
                <div className="popDeleteContent">
                  {" "}
                  {t("Are_you_sure_you_want_to_delete?")}
                </div>
              </div>
              <div className="modal-footer1 text-center">
                <button
                  type="button"
                  className="btncancel popBtnCancel me-2"
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  {t("Cancel")}
                </button>
                <button
                  type="button"
                  className="btn-delete popBtnDelete"
                  data-bs-dismiss="modal"
                  onClick={deleteRow}
                >
                  {t("Delete")}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {showLoder === 1 ? <Loder val={showLoder} /> : ""}
      </section>
    </>
  );
}
