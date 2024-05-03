import React, { useEffect, useState } from "react";
import GetDieteticsPatientList from "../API/GetDieteticsPatientList";
import { Link } from "react-router-dom";
// import Search from "../../Code/Serach";

import GetAPIDepartmentMaster from "../../Admin/Api/Master/DepartmentMasterAPI/GetAPIDepartmentMaster";
import { useTranslation } from 'react-i18next';
import viewicn from "../../../src/assets/images/PatientListIcons/viewicn.svg";
import  i18n from "i18next";

export default function DieteticsPatientList(props) {
  let patientsendData = window.sessionStorage.getItem("IPDpatientsendData")
    ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData"))
    : [];

  let [patientList, setPatientList] = useState([]);
  let [patientListTemp, setPatientListTemp] = useState([]);
  let [departmentList, setDepartmentList] = useState([]);
  const {t} = useTranslation();
  let getAllDeptList = async () => {
    let response = await GetAPIDepartmentMaster();
    if (response.status === 1) {  
      setDepartmentList(response.responseValue);
    }
  };

  // let navigate = useNavigate()

  let getDieteticsPatientList = async () => {
    let id  =  JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId
    let response = await GetDieteticsPatientList(id);
    if (response.status === 1) {
      setPatientList(response.responseValue);
      setPatientListTemp(response.responseValue);
    }
    console.log("response.responseValue",response.responseValue);
  };

  // let handleActiveUHID = (val) => {
  //   window.sessionStorage.setItem("activeUHIDdiet",JSON.stringify({"uhid":val}))
  //   props.setShowMenu(1)
  // };

  let handleActiveUHID = (val) => {
    console.log("val",val);
    let oldPatientList = window.sessionStorage.getItem("activePatientDatadiet")
      ? JSON.parse(window.sessionStorage.getItem("activePatientDatadiet"))
      : [];

    window.sessionStorage.setItem(
      "activeUHIDdiet",
      JSON.stringify({ Uhid: val.uhId })
    );
    window.sessionStorage.setItem(
      "activePatientDatadiet",
      JSON.stringify([...oldPatientList, val])
    );
    props.setShowMenu(1);
  };

  // let handleSearch = (e) => {
  //   if (e.target.value !== "") {
  //     let result = Search(patientList, e.target.value);
  //     if (result.length != 0) {
  //       setPatientListTemp(result);
  //     }
  //     // else {
  //     //     setPatientListTemp(patientList)
  //     // }
  //   } else {
  //     setPatientListTemp(patientList);
  //   }
  // };

  // let handleChange = (e)=>{

  //   getDieteticsPatientList(e.target.value);

  // }
  useEffect(() => {
    getDieteticsPatientList(13);
    getAllDeptList();
    window.sessionStorage.removeItem("activeUHIDdiet");
    window.sessionStorage.removeItem("activePatientDatadiet");
  }, []);
  document.body.dir = i18n.dir();
  return (
    <>
      {/* {props.showNavbar === 1 ? (
        <div className="layOutSurgeryOTNavbar">
          <div>
            <div className="offcanvas-logo">
              <Link to="/dashboard/">
                <img src={OffcanvasLogo} />
              </Link>
            </div>
          </div>

          <Navbar />
        </div>
      ) : (
        ""
      )} */}
      <div className="col-12 mt-5 pt-2">
        <div className="med-box">
          <div
            className={`${props.showNavbar === 1 ? "otDashboardWrapper" : ""} `}
          >
            <div className="tabular-section pb-2">
              {/* <ul className="nav nav-pills  ipdTab" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#admintted"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    name="0"
                  >
                    {t("ADMITTED_PATIENTS")}
                  </button>
                </li> */}
                {/* <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#consultation" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Consultation Patient</button>
                </li> */}
                {/* <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#admintted"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                    name="1"
                  >
                   {t("Discharge_Patient")}
                  </button>
                </li> */}
              {/* </ul> */}
            </div>
            <div className="mb-2 me-2"></div>
            <div className="d-flex justify-content-between ps-2 pe-2">
              <div className="title">{t("Dietetics_Patient_List")}</div>
              <div className={`col-3 mt-2 pt-2 pe-2 position-relative`}>
                {/* <img src={''} className='icnn'/> <label htmlFor="Unit" className="form-label">Unit</label> */}
                {/* <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  onChange={handleChange}
                >
                  <option value={0}>{t("Select_Department")}</option>
                  <option value={-1} >{t("All")}</option>
                  {departmentList &&
                    departmentList.map((val, index) => {
                      if(val.id === 13)
                      {
                        return (
                        <option value={val.id}  selected>{val.departmentName}</option>
                      );
                      }else{
                        return (
                        <option value={val.id} >{val.departmentName}</option>
                      );
                      }
                    
                    })}
                </select> */}
              </div>

              {/* <div className={`col-3 mt-2 pt-2 pe-2 position-relative`}>
                <input
                  type="text"
                  placeholder={t("Search")}
                  className="searchBarOPD"
                  onChange={handleSearch}
                />
                <img src={searchIcon} className="searchBarOPDIcon" />
              </div> */}
            </div>
            <div className="med-table-section" style={{ height: "77vh" }}>
              <table className="med-table border_ striped">
                <thead>
                  <th className="ps-2">{t("S.No.")}</th>
                  <th>{t("Patient_Name")}</th>
                  <th>{t("Uhid")}</th>
                  <th>{t("IP_No")}</th>
                  <th>{t("Phone")}</th>
                  <th>{t("Admit_Date")}</th>
                  <th>{t("Consultant")}</th>
                  <th>{t("Diagnosis")}</th>
                  {/* <th>Nurse Details</th> */}
                  <th>{t("WARD_BED")}</th>
                  <th>{t("Action")}</th>
                </thead>
                <tbody>
                  {patientListTemp &&
                    patientListTemp.map((val, ind) => { 
                      return (
                        <tr className="">
                          <td className="text-center pe-1">{ind + 1}</td>
                          {/* <td>
                            {val.patientName} {val.age}/{val.gender}
                          </td> */}
                           <td className='pe-3'>
                            <div className='txtb'>{val.patientName.toUpperCase()}</div>
                            <div className="d-flex gap-1" style={{fontSize:'12px'}}> <div className="d-flex"><span title="Age"> {val.age ? val.age :''}{val.ageType ? val.ageType :''}</span> / <span title="Gender"> {val.gender} </span>  </div>  <span className='uhidnao' title="UHID">- {val.uhId}</span></div>
                           
                          </td>
                          <td>{val.uhId}</td>
                          <td>{val.ipNo}</td>
                          <td>{val.mobileNo}</td>
                          <td>{val.admittedDate}</td>
                          <td>{val.doctorName}</td>
                          <td>{val.diagnosis ? val.diagnosis : "-"}</td>
                          <td>
                            {val.wardName}/{val.bedName}
                          </td>
                          {/* <td className="pointer">
                            <Link
                              to="/foodIntake/"
                              onClick={() => {
                                handleActiveUHID(val);
                              }}
                            >
                              {" "}
                              <i className="fa-solid fa-eye "></i>
                            </Link>
                          </td> */}
                          <td className="pointer text-center">
                            <Link to="/foodIntake/" onClick={() => { handleActiveUHID(val);}}>                              
                              <img src={viewicn} className='bgicn' alt="View" title="View" />
                            </Link>  
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
    </>
  );
}
