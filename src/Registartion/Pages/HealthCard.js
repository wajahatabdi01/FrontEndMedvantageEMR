import React, { useEffect, useState } from "react";

import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import AdmitPatientValidation from "../../Validation/Registartion/AdmitPatientValidation";

import GetRegisterDetailsByUHID from "../API/GET/GetRegisterDetailsByUHID";
import POSTAdmitPatientByUHID from "../API/POST/POSTAdmitPatientByUHID";
import GetPatientPersonalDashboardByUHID from "../API/GET/GetPatientPersonalDashboardByUHID";
//Icons

import uhidIcon from "../../assets/images/icons/UHID1.svg";
import patientNameIcon from "../../assets/images/icons/patientOPD.svg";
import genderIcon from "../../assets/images/icons/genders.svg";
import ageIcon from "../../assets/images/icons/ageIcon.svg";
import registrationDateIcon from "../../assets/images/icons/date.svg";
import mobileNoIcon from "../../assets/images/icons/smartphone.svg";
import printIcon from "../../assets/images/icons/print.svg";
import printerwhite from "../../assets/images/icons/printerwhite.svg";
import clearIcon from "../../assets/images/icons/clear.svg";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function HealthCard() {
  let [patientData, setPatientData] = useState([]);
  let [patientSendData, setPatientSendData] = useState({
    uhid: "",
  });
  let [clearDropdown, setClearDropdown] = useState(0);

  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [uhid, setUhid] = useState("");
  const {t} = useTranslation();

  let getData = async (value) => {
    let response = await GetPatientPersonalDashboardByUHID(value);
    if (response.status === 1) {
      setPatientData(response.responseValue[0]);
      
      window.sessionStorage.setItem(
        "UHIDQRData",
        JSON.stringify({
          patientData: response.responseValue[0],
          uhid: "vfdvdfv",
        })
      );
    }
  };
  let handleChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "uhid") {
      getData(value); 
      setUhid(value)
    }

    setPatientSendData((patientSendData) => ({
      ...patientSendData,
      [name]: value,
    }));
  };

  let handleSave = async () => {
   
    window.sessionStorage.setItem(
      "UHIDQRData",
      JSON.stringify({ patientData: patientData, uhid: patientSendData.uhid })
    );
    window.open("/ipdPrint/", "noopener,noreferrer");
    let validationreponse = AdmitPatientValidation(patientSendData.uhid);
    if (validationreponse[0]) {
      setShowUnderProcess(1);
      let response = await POSTAdmitPatientByUHID(patientSendData);
      if (response.status === 1) {
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage("Data Save SuccessFully!");
        setTosterValue(0);

        setTimeout(() => {
          setShowToster(0);
          handleClear(1);
          setPatientSendData([]);
        }, 2000);
      } else {
        setShowUnderProcess(0);
        setShowToster(1);
       
        setTosterMessage(
          response.responseValue ? response.responseValue : "Data Not Saved"
        );
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0);
        }, 2000);
      }
    } else {
      setShowToster(1);
      setTosterMessage(validationreponse[1]);
      setTosterValue(2);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };

  let handleClear = (value) => {
    setClearDropdown(value);
    document.getElementById("uhid").value = "";
    setPatientData([]);
  };

  useEffect(() => {
    // let uhids = JSON.parse(window.sessionStorage.getItem("PrintOpdData")).uhID;
    // setUhid(uhids);
    // getData(uhids);
  }, []);
  document.body.dir = i18n.dir();
  return (
    <div className="main-content mt-5 pt-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="med-box">
              <div className="title">{t("Health_Card_Details")}</div>
            </div>
          </div>

          <div className="col-lg-6 mt-2 pe-1">
            <div className="med-box">
              <div className="fieldsett-in">
                <div className="fieldsett" style={{ paddingBottom: "21px" }}>
                  <span className="fieldse">{t("Health_Card")}</span>
                  <div className="row">
                    <div className="col-12">
                      <div className="med-table-section_ mt-2">
                        <table className="med-table border_ striped">
                          <tbody>
                            <tr>
                              <td><img src={uhidIcon} className='icnn' alt="" />{t("Uhid")}</td>
                              <td>
                                <input
                                  type="text"
                                  className="registrationinput ps-2"
                                  id="uhid"
                                  name="uhid"
                                  value={uhid}
                                  // value={uhid ? uhid : ""}
                                  placeholder={t("UHID")}
                                  onChange={handleChange}
                                />
                              </td>
                            </tr>

                            <tr>
                              <td><img src={patientNameIcon} className='icnn' />{t("Patient_nm")}</td>
                              <td>
                                <strong>
                                  {patientData && patientData.patientName}
                                </strong>
                              </td>
                            </tr>

                            <tr>
                              <td><img src={genderIcon} className='icnn' />{t("Gender")}:</td>
                              <td>
                                <strong>
                                  {patientData && patientData.gender}
                                </strong>
                              </td>
                            </tr>

                            <tr>
                              <td><img src={ageIcon} className='icnn' />{t("Age")}:</td>
                              <td>
                                <strong>
                                  {" "}
                                  {patientData && patientData.age}
                                </strong>
                              </td>
                            </tr>

                            <tr>
                              <td><img src={mobileNoIcon} className='icnn' />{t("Mobile_No")}:</td>
                              <td>
                                {" "}
                                <strong>
                                  {patientData && patientData.mobileNo}
                                </strong>
                              </td>
                            </tr>

                            <tr>
                              <td><img src={registrationDateIcon} className='icnn' />{t("Registration_Date")}:</td>
                              <td>
                                {" "}
                                <strong>
                                  {patientData && patientData.registrationDate}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="d-flex justify-content-end mt-1 relative">
                        {showUnderProcess === 1 ? (
                          <TosterUnderProcess />
                        ) : (
                          <>
                            {showToster === 1 ? (
                              <Toster
                                value={tosterValue}
                                message={tosterMessage}
                              />
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-save btn-sm mb-1 me-1 btn-save-fill"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalAntibiogram"
                                  onClick={handleSave}
                                >
                                 <img src={printerwhite} className='icnn' alt="" /> {t("Print")}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-clear btn-sm mb-1 me-1"
                                  onClick={() => {
                                    handleClear(1);
                                  }}
                                >
                                 <img src={clearIcon} className='icnn' alt="" /> {t("Clear")}
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-lg-6 mt-2 ps-1">
                        <div className="med-box">
                            <div className="fieldsett-in">
                                <div className="fieldsett">
                                    <span className='fieldse'>Ward Details</span>


                                    <div className='row'>
                                        <div className="col-12">

                                            <div className="med-table-section_ mt-2">
                                                <table className="med-table border_ striped">
                                                    <tbody>
                                                        <tr>
                                                            <td>Department</td>
                                                            <td className=' d-flex justify-content-end'>

                                                                <div className='registrationinput'>
                                                                    {departmentList &&
                                                                        <DropdownWithSearch defaulNname="Select Department" name="departmentId" list={departmentList} valueName="id" displayName="departmentName" getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>Ward</td>
                                                            <td className=' d-flex justify-content-end'>
                                                                <div className='registrationinput'>
                                                                    {wardList &&
                                                                        <DropdownWithSearch defaulNname="Select Ward" name="wardID" list={wardList} valueName="id" displayName="wardName" getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>Bed</td>
                                                            <td className=' d-flex justify-content-end'>
                                                                <div className='registrationinput'>
                                                                    
                                                                    {bedList &&

                                                                        <DropdownWithSearch defaulNname="Select Bed" name="bedId" list={bedList} valueName="id" displayName="bedName" getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>Doctor's Name</td>
                                                            <td className=' d-flex justify-content-end'> <div className='registrationinput'>
                                                                {doctorList &&
                                                                    <DropdownWithSearch defaulNname="Select Doctor" name="doctorId" list={doctorList} valueName="id" displayName="name" getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                                                                }
                                                            </div></td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className='col-12 mt-2'>
                                            <div className='d-flex justify-content-end mt-1 relative'>
                                                {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                                    <>
                                                        {showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" data-bs-toggle="modal" data-bs-target="#modalAntibiogram" onClick={handleSave}>Save</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}>Clear</button>
                                                            </>
                                                        }
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

          {/* <div className="col-lg-6 mt-2 pe-1">
                        <div className="med-box" >
                            <div className="fieldsett-in">
                                <div className="fieldsett" style={{ paddingBottom: '21px' }}>
                                    <span className='fieldse'>Payment Details</span>
                                    <div className='row'>
                                        <div className="col-12">

                                            <div className="med-table-section_ mt-2">
                                                <table className="med-table border_ striped">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="col-6 mb-2">
                                                                    <label htmlFor="ddlPaymentType" className="form-label">Payment Type</label>
                                                                    <select className="form-select form-select-sm" id="ddlPaymentType" aria-label=".form-select-sm example" onChange={handlePaymentChange}>
                                                                        <option value="0">Select Payment Type</option>
                                                                        <option value="1">Cash</option>
                                                                        <option value="2">Insurance</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            {paymentType === 1
                                                                ? <td>
                                                                    <input type="number" className='registrationinput ps-2' id="txtCashPayment" name='cashpayment' placeholder='Enter Payment' value={cashpayment} onChange={handleChange} />
                                                                </td>
                                                                : ''}

                                                            {paymentType === 2
                                                                ? <td>
                                                                    <div className="col-6 mb-2">
                                                                        <label htmlFor="ddlInsuranceCompany" className="form-label">Insurance Company</label>
                                                                        <select className="form-select form-select-sm" id="ddlInsuranceCompany" aria-label=".form-select-sm example" >
                                                                            <option value="0">Select Insurance Company</option>
                                                                            <option value="1">Max Life Insurance</option>
                                                                            <option value="2">SBI Life Insurance Company</option>
                                                                            <option value="3">Life Insurance Corporation Of India</option>
                                                                            <option value="4">	HDFC Life Insurance</option>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                : ''}


                                                        </tr>



                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  );
}
