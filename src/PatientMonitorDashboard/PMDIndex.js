import React, { useEffect, useMemo } from "react";
import "../assets/css/patientMonitoringDashboard.css";
import Navbar from "../Component/Navbar";
import {
  HubConnectionBuilder
} from "@microsoft/signalr";
import { useState } from "react";
import PatientDataLeft from "./Components/PatientDataLeft";
import PatientVitalRight from "./Components/PatientVitalRight";
import SettingPopup from "./Components/SettingPopup";
import LineVitalGrap from './Components/LineVitalGrap';
import LineInvestigationGrap from './Components/LineInvestigationGrap';
import SignalRConnection from "./Code/SignalRConnection";
import handleSearchs from "./Code/PMDCode";
import OffcanvasLogo from "../assets/images/Navbar/offcanvas-logo.png";
import adrIcon from "../assets/images/icons/adrIcon.svg";
import adrTitleIconF from "../assets/images/icons/adrTitleIconF.svg";
import adrTabIcon from "../assets/images/icons/adrTabIcon.svg";
import adrDrugInteractionIcon from "../assets/images/icons/adrDrugInteractionIcon.svg";
import adrDrugAllergyScreeningIcon from "../assets/images/icons/adrDrugAllergyScreeningIcon.svg";
import adrDuplicateTherapyCheckingIcon from "../assets/images/icons/adrDuplicateTherapyCheckingIcon.svg";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import Loader from "../Component/Loader";




export default function PatientMonitoringDashboard() {
  const { t } = useTranslation();
  document.body.dir = i18n.dir();
  /// fixed thead
  let [fullPatientDataList, setFullPatientDataList] = useState([]);
  let [tempFullPatientDataList, setTempFullPatientDataList] = useState([]);
  let [connection, setRedishConnection] = useState();

  // add visibility of columns right side
  let [bpVisibility, setBpSysVisibility] = useState(true);
  let [spo2Visibility, setSpo2Visibility] = useState(true);
  let [rrVisibility, setRrVisibility] = useState(true);
  let [hrVisibility, setHrVisibility] = useState(true);
  let [prVisibility, setPrVisibility] = useState(true);
  let [tempVisibility, setTempVisibility] = useState(true);
  let [rbsVisibility, setRbsVisibility] = useState(true);
  let [albVisibility, setAlbVisibility] = useState(true);
  let [caplusVisibility, setCaplusVisibility] = useState(true);
  let [kplusVisibility, setKplusVisibility] = useState(true);
  let [naplusVisibility, setNaplusVisibility] = useState(true);
  let [mgVisibility, setMgVisibility] = useState(true);
  let [phVisibility, setPhVisibility] = useState(true);
  let [pco2Visibility, setPco2Visibility] = useState(true);
  let [etco2Visibility, setEtco2Visibility] = useState(true);
  let [po2Visibility, setPo2Visibility] = useState(true);
  let [lactateVisibility, setLactateVisibility] = useState(true);
  let [hco3Visibility, setHco3Visibility] = useState(true);
  let [creatinineVisibility, setCreatinineVisibility] = useState(true);
  let [bureaVisibility, setBureaVisibility] = useState(true);
  let [ioVisibility, setIoVisibility] = useState(true);
  let [sgotVisibility, setSgotVisibility] = useState(true);
  let [sgptVisibility, setSgptVisibility] = useState(true);

  // add visibility of columns left side
  let [lifeSupporVisibility, setLifeSupportListVisibility] = useState(true);
  let [diagnosisVisibility, setDiagnosisVisibility] = useState(true);
  let [wardVisibility, setWardVisibility] = useState(true);
  let [infusionVisibility, setInfusionVisibility] = useState(true);
  let [consultantVisibility, setConsultantVisibility] = useState(true);
  let [nSVisibility, setNSVisibility] = useState(true);
  let [bPRVisibility, setbPRVisibility] = useState(true);
  let [sPO2RVisibility, setSPO2RVisibility] = useState(true);
  let [pulseRRVisibility, setPulseRRVisibility] = useState(true);
  let [tempRRVisibility, setTempRRVisibility] = useState(true);

  // extra variable 
  let [showSetting, setShowSetting] = useState(0)
  let [loderBool, setLoderBool] = useState(1)
  let [allWard, setAllWard] = useState([]);
  let [showNextData, setShowNextData] = useState(10)
  let [selectedWard, setSelectedWard] = useState(null)
  let [defaultsearch, setDefualtSarch] = useState(0)
  let [updateData, setUpdateData] = useState();
  let [fullscreen, setFullScreen] = useState('')


  let handleUpdatedata = () => {
    setUpdateData(updateData ? 0 : 1)
  }


  let visibilitpropsleft = {
    lifeSupporVisibility: lifeSupporVisibility,
    diagnosisVisibility: diagnosisVisibility,
    wardVisibility: wardVisibility,
    infusionVisibility: infusionVisibility,
    consultantVisibility: consultantVisibility,
    nSVisibility: nSVisibility,
    bPRVisibility: bPRVisibility,
    sPO2RVisibility: sPO2RVisibility,
    pulseRRVisibility: pulseRRVisibility,
    tempRRVisibility: tempRRVisibility
  }

  let visibilitpropsright = {
    bpVisibility: bpVisibility,
    spo2Visibility: spo2Visibility,
    rrVisibility: rrVisibility,
    hrVisibility: hrVisibility,
    prVisibility: prVisibility,
    tempVisibility: tempVisibility,
    rbsVisibility: rbsVisibility,
    albVisibility: albVisibility,
    caplusVisibility: caplusVisibility,
    kplusVisibility: kplusVisibility,
    naplusVisibility: naplusVisibility,
    mgVisibility: mgVisibility,
    phVisibility: phVisibility,
    pco2Visibility: pco2Visibility,
    etco2Visibility: etco2Visibility,
    po2Visibility: po2Visibility,
    lactateVisibility: lactateVisibility,
    hco3Visibility: hco3Visibility,
    creatinineVisibility: creatinineVisibility,
    bureaVisibility: bureaVisibility,
    ioVisibility: ioVisibility,
    sgotVisibility: sgotVisibility,
    sgptVisibility: sgptVisibility
  }

  let setvisibilitprops = [
    setLifeSupportListVisibility,
    setDiagnosisVisibility,
    setWardVisibility,
    setInfusionVisibility,
    setConsultantVisibility,
    setNSVisibility,
    setbPRVisibility,
    setSPO2RVisibility,
    setPulseRRVisibility,
    setTempRRVisibility,
    setBpSysVisibility,
    setSpo2Visibility,
    setRrVisibility,
    setHrVisibility,
    setPrVisibility,
    setTempVisibility,
    setRbsVisibility,
    setAlbVisibility,
    setCaplusVisibility,
    setKplusVisibility,
    setNaplusVisibility,
    setMgVisibility,
    setPhVisibility,
    setPco2Visibility,
    setEtco2Visibility,
    setPo2Visibility,
    setLactateVisibility,
    setHco3Visibility,
    setCreatinineVisibility,
    setBureaVisibility,
    setIoVisibility,
    setSgotVisibility,
    setSgptVisibility
  ]

  // set grap vital data
  let [grapVitalData, setGrapVitalData] = useState({
    showGrap: 0,
    vitalIdSearchNew: '',
    patientName: '',
    UHID: '',
    userId: ''
  })

  // set grap investigation data

  let [grapInvestigationData, setGrapInvestigationlData] = useState({
    showGrap: 0,
    subTestId: '',
    patientName: '',
    UHID: '',
    userId: ''
  })

  // close grap popup
  let modelCloseFun = (i) => {
    if (i === 1) {
      setGrapVitalData({
        showGrap: 0,
        vitalIdSearchNew: '',
        UHID: '',
        userId: ''
      })
    }
    else {
      setGrapInvestigationlData({
        showGrap: 0,
        subTestId: '',
        UHID: '',
        userId: ''
      })
    }
  }

  // create ward list 
  let createWardList = (patientdatas) => {
    let temp = []
    temp = [...new Set(patientdatas.map(q => JSON.parse(q.patientDataList).Ward))];
   
 
    setAllWard(temp.filter(item => item))

  }

  // handle search 
  let handleSearch = (e, val) => {
    if (typeof e === "object") {
      if (val === 1) {
        handleSearchs(e, tempFullPatientDataList, setFullPatientDataList)
        document.getElementById("wardDropdown").value = 1
        setSelectedWard(1)
      }


      else {
        handleSearchs(e, tempFullPatientDataList, setFullPatientDataList)
      }
    }

    else {
      if (e === 2) {
        document.getElementById("wardDropdown").value = 2
        setSelectedWard(2)
      }

      handleSearchs(e, tempFullPatientDataList, setFullPatientDataList)
    }

  }

  // scrolling function
  function scrollHandle(e) {

    var scrollTop = this.scrollTop;
    document.querySelector(".fixedTheadFirst").style.transform =
      "translateY(" + scrollTop + "px)";
    document.querySelector(".fixedTheadFirst").style.position = "sticky";
    document.querySelector(".fixedTheadFirst").style.zIndex = "2";
    document.querySelector(".fixedTheadSecond").style.transform =
      "translateY(" + scrollTop + "px)";
    document.querySelector(".fixedTheadSecond").style.position = "sticky";
    document.querySelector(".fixedTheadSecond").style.zIndex = "2";

  }
  let [scroll, setScroll] = useState()

  let infinityScroll = () => {
    let getScrollSection = document.querySelector(".scroll-in-section");
    setScroll(getScrollSection.scrollTop)
    let scrollTop = getScrollSection.scrollTop;
    let scrollHeight = getScrollSection.scrollHeight;
    let clientHeight = getScrollSection.clientHeight;
    if ((scrollTop + clientHeight >= scrollHeight) && (showNextData <= fullPatientDataList.length)) {

      setShowNextData(showNextData + 10)
    }


  }

  // set patient Data
  let handlePatientData = () => {

    return (
      fullPatientDataList && fullPatientDataList.slice(0, showNextData).map((patientData, index) => {
        return (
          <PatientDataLeft count={index + 1} patientData={JSON.parse(patientData.patientDataList)} visibilitpropsleft={visibilitpropsleft} sortedIndex={patientData.sortOrderIndex} />

        )
      })
    )


  }
  // set patient vital 
  let handleVitalData = () => {

    return (
      fullPatientDataList && fullPatientDataList.slice(0, showNextData).map((patientData, index) => {
        return (
          <PatientVitalRight patientData={JSON.parse(patientData.patientDataList)} visibilitpropsright={visibilitpropsright} setGrapVitalData={setGrapVitalData} setGrapInvestigationlData={setGrapInvestigationlData} />

        )
      })
    )


  }

  // handle Ward Select
  let handleWardSelect = (e) => {
    setSelectedWard(e)
    handleSearch(e, 2)
    // handleSearch(e, -10)
  }

  let callPatientDatamemo = useMemo(handlePatientData, [fullPatientDataList, showNextData, [...setvisibilitprops], setInterval(() => { return }, 600)])
  let callPatientVitalDatamemo = useMemo(handleVitalData, [fullPatientDataList, showNextData, setInterval(() => { return }, 600)])

  // establish the connection
  useEffect(() => {
    const connection = new HubConnectionBuilder().withUrl(window.PatientMonitorDashboard + "/PatientDashboard", 4).build();
    // const connection = new HubConnectionBuilder().withUrl("http://182.156.200.178:7085/PatientDashboard", 4).build();
    // const connection = new HubConnectionBuilder().withUrl("http://192.168.7.13:7085/PatientDashboard", 4).build(); //not used
    setRedishConnection(connection)
    let getScrollSection = document.querySelector(".scroll-in-section");
    getScrollSection.addEventListener("scroll", scrollHandle);
    if (JSON.parse(window.sessionStorage.getItem("patientData")) != null) {
      let getdata = JSON.parse(window.sessionStorage.getItem("patientData"))
      delete getdata.uhId
      window.sessionStorage.setItem("patientData", JSON.stringify(getdata))
    }

  }, [])

  // infinity scroll 
  useEffect(() => {
    let getScrollSection = document.querySelector(".scroll-in-section");
    getScrollSection.addEventListener("scroll", infinityScroll);

  }, [scroll])

  // now recall the connection
  useEffect(() => {
    SignalRConnection(connection, setTempFullPatientDataList, setLoderBool, createWardList, handleUpdatedata);
  }, [connection]);

  // 
  useEffect(() => {
    let searchvalue = document.getElementById("searchData") ? document.getElementById("searchData").value : "";
    let wardvalue = parseInt(document.getElementById("wardDropdown") ? document.getElementById("wardDropdown").value : 2);

    if (searchvalue === "") {
      setUpdateData()
      setFullPatientDataList(tempFullPatientDataList)
      handleSearch(wardvalue)
    }
    else {
      setUpdateData()
    
      handleSearchs(searchvalue, tempFullPatientDataList, setFullPatientDataList)
      // handleSearch(searchvalue)
      // setFullPatientDataList(tempFullPatientDataList)
    }




  }, [tempFullPatientDataList, updateData === 1])

  let handlefullscreen = (maximaze) => {

    let elem = document.getElementById("mainDiv")
    if (maximaze != 0) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
      if (showNextData <= 10) {
        setShowNextData(20)

      }
      document.getElementById("scrollinsection").style.height = "95vh";

      setFullScreen('maximaze')
    }
    else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
      document.getElementById("scrollinsection").style.height = "calc(100vh - 103px)";

      setFullScreen('')

    }

  }

  // main return functon

  return (
    <div className="patientMonitoringTopWrapper mt-0 pt-1" >

      {/* <div className='layOutSurgeryOTNavbar'>
        <div>
          <div className="offcanvas-logo">
            <Link to="/dashboard/"><img src={OffcanvasLogo} /></Link>
          </div>
        </div>

        <Navbar connection={connection} />
      </div> */}

      <div className={`dashboardtopSecond mt-5 pt-1 ${fullscreen}`} id="mainDiv">
        <div className="dashboartitleSearch">
          <div className="title-indicators">
            <div className="title">{t("Patient Monitoring Dashboard")}</div>
            <div className="indicators">
              <div>
                <span>{t("Normal")}</span> <i className="bi bi-square-fill normal"></i>
              </div>
              <div>
                <span>{t("Borderline Normal Side")}</span>
                <i className="bi bi-square-fill borderlineNormal"></i>
              </div>
              <div>
                <span>{t("Border Line")}</span>
                <i className="bi bi-square-fill borderLine"></i>
              </div>
              <div>
                <span>{t("Borderline Abnormal Side")}</span>
                <i className="bi bi-square-fill borderlineAbnormal"></i>
              </div>
              <div>
                <span>{t("Abnormal")}</span> <i className="bi bi-square-fill abnormal"></i>
              </div>
            </div>
            <div className="d-flex flex-row gap-4">
              <span className="patientCount">{t("Total Patients In Current Ward")}: {fullPatientDataList && fullPatientDataList.length}</span>
            </div>
          </div>
          <div className="fliters">
            <div>
              <select
                className="form-select form-select-sm "
                aria-label=".form-select-sm example"
                onChange={handleWardSelect}
                id="wardDropdown"
              >
                <option value={2}>{t("All")}</option>
                <option value={1}>{t("Critical Care Ward")}</option>
                {allWard && allWard.map((ward) => {
                  return (
                    <option value={ward}>{ward}</option>
                  );
                })}
              </select>
            </div>
            <div>
              <input
                className="form-control form-select-sm inputText"
                type="text"
                placeholder={t("Search Here...")}
                aria-label="default input example"
                id="searchData"
                onChange={(e) => {
                  handleSearch(e, 1);
                }}
              />
            </div>
            <i className="bi bi-arrow-clockwise" title={t("Refresh")} onClick={() => { window.location.reload(true) }}></i>
            {fullscreen !== 'maximaze' ?
              <i
                className="bi bi-arrows-fullscreen"
                title={t("Full Screen")}
                id="btnFullscreen"
                onClick={() => handlefullscreen(1)}
              ></i>
              :
              <i
                className="bi bi-fullscreen-exit"
                title={t("Exit Fullscreen")}
                id="btnExitFullscreen"
                onClick={() => handlefullscreen(0)}
              ></i>
            }
            <i
              className="bi bi-info-square"
              title={t("Help")}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            ></i>
            <i className="bi bi-gear" onClick={() => setShowSetting(1)}></i>
          </div>
        </div>

        <div className="scroll-in-section" id="scrollinsection">
          <div className="table-monitor-section">
            <div className="firstSection">
              <table className="table-monitor">
                <thead className="fixedTheadFirst">
                  <tr key="TableheadKey">
                    <th style={{ width: "40px", textAlign: "center" }}>#</th>
                    <th style={{ width: "220px" }}>
                      {t("patientDetail")}{" "}
                      <i
                        className="bi bi-dash-circle remove-icon"
                        title="Remove Column"
                      ></i>
                    </th>
                    {lifeSupporVisibility &&
                      <th style={{ width: "278px" }} >
                        {/* {t("lifeSupport")}{" "} */}
                        Diagnosis / Life Support{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setLifeSupportListVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {diagnosisVisibility &&
                      <th style={{ width: "190px" }} >
                        {/* {t("diagnosis")}{" "} */}
                        Investigations{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column"
                          onClick={() => { setDiagnosisVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {wardVisibility &&
                      <th style={{ width: "185px" }} >
                        {t("ward")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setWardVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {infusionVisibility &&
                      <th style={{ width: "280px" }} >
                        {t("infusionDetail")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setInfusionVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {consultantVisibility &&
                      <th style={{ width: "200px" }} >
                        {t("consultant")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setConsultantVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {nSVisibility &&
                      <th style={{ width: "290px" }} >
                        {t("nsDetail")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setNSVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {bPRVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("BP-R")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setbPRVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {sPO2RVisibility &&
                      <th style={{ width: "200px" }} >
                        {t("SPO2-R")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setSPO2RVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {pulseRRVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("Pulse-R")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setPulseRRVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {tempRRVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("Temp-R")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setTempRRVisibility(false) }}
                        ></i>
                      </th>
                    }
                  </tr>
                </thead>

                <tbody>

                  {/* shwo data for patient deatls and diagnosis or first half*/}
                  {callPatientDatamemo && callPatientDatamemo}
                </tbody>
              </table>
            </div>
            <div className="secondSection">
              <table className="table-monitor">
                <thead className="fixedTheadSecond">
                  <tr className="TableheadKey2">
                    {bpVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("BP")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setBpSysVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {spo2Visibility &&
                      <th style={{ width: "100px" }}>
                        {t("SPO2")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setSpo2Visibility(false) }}
                        ></i>
                      </th>
                    }
                    {rrVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("RR")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setRrVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {hrVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("HR")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setHrVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {prVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("PR")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setPrVisibility(false) }}
                        ></i>
                      </th>
                    }

                    {albVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("ALB")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setAlbVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {caplusVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("Ca++")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setCaplusVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {kplusVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("K+")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setKplusVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {naplusVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("Na+")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setNaplusVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {mgVisibility &&
                      <th style={{ width: "100px" }}>
                        {t("Mg")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setMgVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {phVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("PH")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setPhVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {pco2Visibility &&
                      <th style={{ width: "100px" }} >
                        {t("PCO2")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setPco2Visibility(false) }}
                        ></i>
                      </th>
                    }
                    {etco2Visibility &&
                      <th style={{ width: "100px" }} >
                        {t("EtCO2")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setEtco2Visibility(false) }}
                        ></i>
                      </th>
                    }
                    {po2Visibility &&
                      <th style={{ width: "100px" }} >
                        {t("PO2")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setPo2Visibility(false) }}
                        ></i>
                      </th>
                    }
                    {lactateVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("LACTATE")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setLactateVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {hco3Visibility &&
                      <th style={{ width: "100px" }} >
                        {t("HCO3")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setHco3Visibility(false) }}
                        ></i>
                      </th>
                    }
                    {rbsVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("RBS")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setRbsVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {tempVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("Temp")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setTempVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {creatinineVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("Creatinine")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setCreatinineVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {bureaVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("B Urea")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setBureaVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {ioVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("I/O")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setIoVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {sgotVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("SGOT")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setSgotVisibility(false) }}
                        ></i>
                      </th>
                    }
                    {sgptVisibility &&
                      <th style={{ width: "100px" }} >
                        {t("SGPT")}{" "}
                        <i
                          className="bi bi-dash-circle remove-icon"
                          title="Remove Column" onClick={() => { setSgptVisibility(false) }}
                        ></i>
                      </th>
                    }

                  </tr>
                </thead>

                <tbody>
                  {/* show data for patient vitals or second halif*/}
                  {callPatientVitalDatamemo && callPatientVitalDatamemo}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ########## pop up Area ############### */}
        {showSetting === 1 ? <SettingPopup close={() => { setShowSetting(0) }} showSetting={showSetting} setvisibilitprops={setvisibilitprops} visibilityData={{ ...visibilitpropsleft, ...visibilitpropsright }} /> : ""}
        {/* ########## End of pop up Area ############### */}

        {/* graph popup */}
        {grapVitalData.showGrap ? <LineVitalGrap grapVitalData={grapVitalData} modelCloseFun={modelCloseFun} /> : ""}
        {grapInvestigationData.showGrap ? <LineInvestigationGrap grapInvestigationData={grapInvestigationData} modelCloseFun={modelCloseFun} /> : ""}





        {/* ######################## Moodal Pop Area #################### */}
        {/* <div className="modal fade" id="modalADRReprt" data-bs-backdrop="static">
        <div className="modal-dialog" style={{maxWidth:'80vw'}}>
          <div className="modal-content p-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white d-flex column-gap-1 py-1" id="exampleModalLabel">
                <img src={adrIcon} alt="ADR Report"  title='ADR Report' style={{width:'25px', height:'25px'}}/> 
                <label htmlFor="">ADR Report</label>
                </h1>
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window'><i className="bi bi-x-octagon"></i></button>
            </div>
            <div className="modal-body p-1">
              <div className="row">
                <div className="col-12"> 
                <div className="adrReportSection" style={{maxHeight:'620px', overflow:'auto'}}>

                <div className="repeatAdrSection mb-2">               
                  <div className="adrTitle"><img src={adrTitleIconF} alt="adrTitleIconF" /> Common Drug Reactions</div> 
                  
                    <table className="tableAdrReport">
                     <thead>
                      <tr>
                        <th className="text-center" style={{width:'3%'}}>#</th>
                        <th>Drug Adminstraterd</th>
                        <th>Drug Adminstraterd</th>                       
                      </tr>
                     </thead>
                     
                     <tbody>
                      <tr>
                        <td className="text-center">1</td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Paracetamol</td>
                        <td>Drug Adminstraterd</td>                       
                      </tr>
                      <tr>
                        <td className="text-center">2</td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Metformin</td>
                        <td>Drug Adminstraterd</td>                       
                      </tr>
                      <tr>
                        <td className="text-center">3</td>
                        <td><img src={adrTabIcon} alt="" /> Cap - Aminoglycosides</td>
                        <td>Drug Adminstraterd</td>                       
                      </tr>
                      <tr>
                        <td className="text-center">4</td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Nitrates</td>
                        <td>Drug Adminstraterd</td>                       
                      </tr>
                    
                     </tbody>
                    </table>
                  </div> 


                  <div className="repeatAdrSection mb-2">               
                  <div className="adrTitle"><img src={adrTitleIconF} alt="adrTitleIconF" /> Serious Drug Reactions</div> 
                  
                    <table className="tableAdrReport">
                    
                     
                     <tbody>
                      <tr>
                        <td className="text-center">
                          <div className="NoDataFountText">No Drug Reaction Found!</div>
                        </td>
                                             
                      </tr>
                     
                    
                     </tbody>
                    </table>
                  </div> 

                  <div className="repeatAdrSection mb-2">               
                  <div className="adrTitle"><img src={adrDrugInteractionIcon} alt="adrTitleIconF" /> Drug Interaction</div> 
                  
                    <table className="tableAdrReport">
                     <thead>
                      <tr>
                        <th className="text-center" style={{width:'3%'}}>#</th>
                        <th>Drugs</th>
                        <th>Interacted Drug</th>                       
                        <th>Effect of Interaction</th>                       
                      </tr>
                     </thead>
                     
                     <tbody>
                      <tr>
                        <td className="text-center">1</td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Paracetamol</td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Azithromicin <span className="substituteText">Substitute Drugs</span></td>
                        <td>Nausea</td>     
                      </tr>
                      <tr>
                        <td className="text-center">2</td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Metformin <span className="substituteText">Substitute Drugs</span></td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Clorine </td>
                        <td>No Effect Found</td>     
                      </tr>
                      <tr>
                        <td className="text-center">3</td>
                        <td><img src={adrTabIcon} alt="" /> Cap - Aminoglycosides</td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Dluretics </td>
                        <td>Increased risk of ototoxicity</td>     
                      </tr>                    
                    
                     </tbody>
                    </table>
                  </div> 


                  <div className="repeatAdrSection mb-2">               
                  <div className="adrTitle"><img src={adrDrugAllergyScreeningIcon} alt="adrTitleIconF" /> Drug Allergy Screening</div> 
                  
                    <table className="tableAdrReport">
                     <thead>
                      <tr>
                        <th className="text-center" style={{width:'3%'}}>#</th>
                        <th>Drugs</th>
                        <th>Allergy Found</th>  
                      </tr>
                     </thead>
                     
                     <tbody>
                      <tr>
                        <td className="text-center">1</td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Paracetamol</td>
                        <td><img src={adrTabIcon} alt="" /> Itching </td>                           
                      </tr>
                      <tr>
                        <td className="text-center">1</td>
                        <td><img src={adrTabIcon} alt="" /> Tab - Metformin</td>
                        <td><img src={adrTabIcon} alt="" /> Itching <span className="substituteText">Substitute Drugs</span></td>                           
                      </tr>            
                    
                     </tbody>
                    </table>
                  </div> 


                  <div className="repeatAdrSection mb-2">               
                  <div className="adrTitle"><img src={adrDuplicateTherapyCheckingIcon} alt="adrTitleIconF" /> Duplicate Therapy Checking</div> 
                  
                    <table className="tableAdrReport">
                    
                     <tbody>
                      <tr>
                        <td className="text-center">
                          <div className="NoDataFountText">No Drug Reaction Found!</div>
                        </td>
                                             
                      </tr>
                     
                    
                     </tbody>
                    </table>
                  </div> 
                    

                  </div> 
                </div>
              </div>

            </div>
          </div>
        </div>
      </div> */}



      </div>

      <Loader val={loderBool} />

    </div>


  );
}
