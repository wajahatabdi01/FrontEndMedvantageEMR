import React, { useEffect, useState } from "react";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import Loder from "../../Component/Loader";
import Select from "react-select";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import deleteBtnIcon from "../../assets/images/icons/delete.svg";
import editBtnIcon from "../../assets/images/icons/edit.svg";
import GetServiceTypeMaintenanceSchedule from "../API/MaintenanceSchedule/GetServiceTypeMaintenanceSchedule";
import PostMaintenanceSchedule from "../API/MaintenanceSchedule/PostMaintenanceSchedule";
import GetMaintenanceSchedule from "../API/MaintenanceSchedule/GetMaintenanceSchedule";
import PutMaintenanceSchedule from "../API/MaintenanceSchedule/PutMaintenanceSchedule";
import DeleteMaintenanceSchedule from "../API/MaintenanceSchedule/DeleteMaintenanceSchedule";
import GetItemMaintenanceContract from "../API/MaintenanceContract/GetItemMaintenanceContract";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function MaintenanceSchedule() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [Equipment, setEquipment] = useState(null);
  const [ServiceType, setServiceType] = useState(null);
  const [EquipmentDropdown, setEquipmentDropdown] = useState([]);
  const [ServiceTypeDropdown, setServiceTypeDropdown] = useState([]);
  const [MaintenanceSCheduleTable, setMaintenanceSCheduleTable] = useState([]);
  const [MaintainenceFrequency, setMaintainenceFrequency] = useState("");
  const [isClearable] = useState(true);
  const [isSearchable] = useState(true);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setisNewRowAdded] = useState(false);
  const [lastMaintenanceDate, setlastMaintenanceDate] = useState("");
  const [nextScheduledDate, setnextScheduledDate] = useState("");
  let [userID, setUserID] = useState(
    JSON.parse(sessionStorage.getItem("LoginData")).userId
  );

  // The Code is  written By S Ayaz

  let Dropdowns = async () => {
    let EquipmentMaster = await GetItemMaintenanceContract();
    if (EquipmentMaster.status === 1) {
      console.log("EquipmentMaster", EquipmentMaster.responseValue);
      setShowLoder(0);
      setEquipmentDropdown(
        EquipmentMaster.responseValue.map((items) => ({
          value: items.id,
          label: items.itemName,
        }))
      );
    }
    let ServiceType = await GetServiceTypeMaintenanceSchedule();
    if (ServiceType.status === 1) {
      console.log("ServiceType", ServiceType.responseValue);
      setShowLoder(0);
      setServiceTypeDropdown(
        ServiceType.responseValue.map((service) => ({
          value: service.id,
          label: service.serviceType,
        }))
      );
    }
  };

  let AllMaintenanceSchedule = async () => {
    let MaintenanceSchedule = await GetMaintenanceSchedule();
    if (MaintenanceSchedule.status === 1) {
      console.log("MaintenanceSchedule", MaintenanceSchedule.responseValue);
      setMaintenanceSCheduleTable(MaintenanceSchedule.responseValue);
    }
  };

  // POST API called for data saving

  const handleOnChange = (e) => {
    setisNewRowAdded(false);
    // document.getElementById('errcomplaintCategory').style.display = 'none';
    // document.getElementById('errRespondendPerson').style.display = 'none';
    // document.getElementById('errRespondentDepartment').style.display = 'none';

    document.getElementById("errEquipment").style.display = "none";
    document.getElementById("errServiceType").style.display = "none";
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
    if (Equipment === null) {
      document.getElementById("errEquipment").innerHTML =
        "Please Select Item Name";
      document.getElementById("errEquipment").style.display = "block";
      return;
    } else if (ServiceType === null) {
      document.getElementById("errServiceType").innerHTML =
        "Please Enter Service Type";
      document.getElementById("errServiceType").style.display = "block";
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
      itemID: Equipment.value,
      serviceTypeID: ServiceType.value,
      maintenanceFrequency: MaintainenceFrequency,
      lastMaintenanceDate: lastMaintenanceDate,
      nextScheduledDate: nextScheduledDate,
      userID: userID,
    };

    let data = await PostMaintenanceSchedule(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      setNewlyAddedRowIndex(0);
      AllMaintenanceSchedule();
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
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
    document.getElementById("errEquipment").style.display = "none";
    document.getElementById("errServiceType").style.display = "none";
    document.getElementById("errnextScheduledDate").style.display = "none";
    document.getElementById("errlastMaintenanceDate").style.display = "none";
    document.getElementById("errMaintainenceFrequency").style.display = "none";

    setEquipment(null);
    setServiceType(null);
    setMaintainenceFrequency("");
    setlastMaintenanceDate("");
    setnextScheduledDate("");
  };

  const edit = (EquipmentMaster, index) => {
    setRowID(EquipmentMaster.id);
    setIsUpdateBtnShow(true);
    setEquipment({
      value: EquipmentMaster.itemID,
      label: EquipmentMaster.itemName,
    });
    setServiceType({
      value: EquipmentMaster.serviceTypeID,
      label: EquipmentMaster.serviceType,
    });
    setMaintainenceFrequency(EquipmentMaster.maintenanceFrequency);
    setlastMaintenanceDate(EquipmentMaster.lastMaintenanceDateTime);
    setnextScheduledDate(EquipmentMaster.nextScheduledDate);
    setNewlyAddedRowIndex(index);
  };

  const handleUpdate = async () => {
    if (Equipment === null) {
      document.getElementById("errEquipment").innerHTML =
        "Please Select Item Name";
      document.getElementById("errEquipment").style.display = "block";
      return;
    } else if (ServiceType === null) {
      document.getElementById("errServiceType").innerHTML =
        "Please Enter Service Type";
      document.getElementById("errServiceType").style.display = "block";
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
      itemID: Equipment.value,
      serviceTypeID: ServiceType.value,
      maintenanceFrequency: MaintainenceFrequency,
      lastMaintenanceDate: lastMaintenanceDate,
      nextScheduledDate: nextScheduledDate,
      userID: userID,
    };

    const data = await PutMaintenanceSchedule(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Updated Successfully!");
      AllMaintenanceSchedule();
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
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
    setEditRowIndex(null);
    setNewlyAddedRowIndex(null);
  };

  const deleteRow = async () => {
    setShowUnderProcess(1);

    const obj = {
      id: rowID,
      userId: userID,
    };

    let data = await DeleteMaintenanceSchedule(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(null);
      setIsUpdateBtnShow(false)
      AllMaintenanceSchedule();
      handleClear();
      console.log("success");
      setTimeout(() => {
        setShowToster(0);
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
    AllMaintenanceSchedule();
  }, []);

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Maintenance_Schedule")}</div>
                <div className="inner-content">
                  <div className="row">
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">
                        {t("ItemName")}<span className="starMandatory">*</span>
                      </label>
                      <Select
                        value={Equipment}
                        placeholder={t("Select_Item_Name")}
                        options={EquipmentDropdown}
                        className="create-select"
                        id="itemcategory"
                        isSearchable={isSearchable}
                        isClearable={isClearable}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "errEquipment",
                            setEquipment
                          )
                        }
                      />
                      <small
                        id="errEquipment"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">
                        {t("ServiceType")}<span className="starMandatory">*</span>
                      </label>
                      <Select
                        value={ServiceType}
                        placeholder={t("Select_Service_Type")}
                        options={ServiceTypeDropdown}
                        className="create-select"
                        id="itemcategory"
                        isSearchable={isSearchable}
                        isClearable={isClearable}
                        onChange={(selectedOption) =>
                          handleSelectChange(
                            selectedOption,
                            "errServiceType",
                            setServiceType
                          )
                        }
                      />
                      <small
                        id="errServiceType"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">
                        {t("Maintainence_Frequency")}{" "}
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
                              ><img src={saveButtonIcon} className='icnn' alt="" />
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
                      <th>{t("Equipment")}</th>
                      <th>{t("ServiceType")}</th>
                      <th>{t("Maintainence_Frequency")}</th>
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
                          <tr className={isNewRow ? "new-row" : ""} key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{data.itemName}</td>
                            <td>{data.serviceType}</td>
                            <td>{data.maintenanceFrequency}</td>

                            <td>
                              {(() => {
                                const dateTime = new Date(
                                  data.lastMaintenanceDateTime
                                );
                                const formattedDate =
                                  dateTime.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  });
                                const formattedTime =
                                  dateTime.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  });

                                return `${formattedDate} at ${formattedTime}`;
                              })()}
                            </td>
                            <td>
                              {(() => {
                                const dateTime = new Date(
                                  data.nextScheduledDate
                                );
                                const formattedDate =
                                  dateTime.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                  });
                                const formattedTime =
                                  dateTime.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  });

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
                                    className={isEditing ? "edited-row" : ""}
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
                                    className=""
                                    alt=""
                                    onClick={() => {
                                      setRowID(data.id);
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
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
