import React, { useEffect, useState } from 'react'
import Fiosbg from '../../assets/images/patientmonitordashboard/V-FiO2v.svg'
import O2 from '../../assets/images/patientmonitordashboard/Nasalpronge.svg'
import ADRReport from './ADRReport';
import CalculatorPopup from './CalculatorPopup';
import InvestigationReport from './InvestigationReport';
import PatientDataPopup from './PatientDataPopup';
// import book from '../../../assets/images/patientmonitordashboard/book.png'
import chat from '../../assets/images/patientmonitordashboard/chat.png'
// import report from '../../../assets/images/patientmonitordashboard/report.png'
// import bell from '../../../assets/images/patientmonitordashboard/alertbell.png'
import food from '../../assets/images/patientmonitordashboard/food.png'
// import alertman from '../../../assets/images/patientmonitordashboard/alertman.png'
import ClinicalNotification from './ClinicalNotification';
import PatientScorePieChart from './PatientScorePieChart';
import TimeCalculate from '../Code/TimeCalculate';
import InfusionPumpNImage from '../../assets/images/patientmonitordashboard/InfusionPumpN.svg'
import InfusionPumpFImage from '../../assets/images/patientmonitordashboard/InfusionPumpF.svg'
import DVTPumpList from '../../assets/images/patientmonitordashboard/dvtpumpList.svg'
import PatientProfileDetails from './PatientProfileDetails';
import InfusionPumpDeatils from './InfusionPumpDeatils';
import InfusionPumpDeatil from "../../assets/images/patientmonitordashboard/InfusionPumpsDeatils.svg"
import ECGGraphIcon from "../../assets/images/patientmonitordashboard/MachineECG.svg"
// import adrIcon from "../../../assets/images/icons/adrIcon.svg"
import ECGGraph from './ECGGraph';
import SupportivePopUp from './SupportivePopUp';
import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts';
import TestCalCulator from './TestCalCulator';
import SuggestedFood from './SuggestedFood';
import PiChart from './PiChart';
import StethoscopeWaveFromPopup from './StethoscopeWaveFromPopup';
import MedicineChecklist from './Checklist/Components/MedicineChecklist';
import FoodIntake from '../../Dietetics/Pages/FoodIntake';
import FoodIntakeChecklist from './Checklist/Components/FoodIntakeChecklist';
import SupplementChecklist from './Checklist/Components/SupplementChecklist';
import medicIcon from "../../assets/images/patientmonitordashboard/medicine.svg"
import foodIcon from "../../assets/images/patientmonitordashboard/food.svg"
import supplementIcon from "../../assets/images/patientmonitordashboard/supplement.svg"
import stethoscope from "../../assets/images/patientmonitordashboard/stethoscope.svg"
import urinetest from "../../assets/images/patientmonitordashboard/urinetest.png"
import ChatingPopup from './ChatingPopup';
import FamilyHistoryPopUp from './History/FamilyHistoryPopUp';
import ActivityTracker from '../../assets/images/icons/activity tracker.svg'
import PhysicalActivityByUHID from './PhysicalActivityByUHID';
import GetPatientDetailsByUHID from '../../Clinical/API/RemotePatientMonitorDashboard/GetPatientDetailsByUHID';
import GetMenuByDepartmentIdAndUserId from '../../Clinical/API/RemotePatientMonitorDashboard/GetMenuByDepartmentIdAndUserId';

export default function PatientDataLeft(props) {

  let [lifeSupportValue, setLifeSupportValue] = useState("")
  let [calculatorPop, setCalculatorPop] = useState(0)
  let [ADRReportPop, setADRReportPop] = useState(0)
  let [patientpopup, setPatientPopup] = useState(0)
  let [suggestedFoodpopup, setSuggestedFoodPopup] = useState(0)
  let [investigationpopup, setInvestigationPopup] = useState(0)
  let [clinicalnotificationpopup, setClinicalnotificationPopup] = useState(0)
  let [patientScorePieChartpopup, setPatientScorePieChartPopup] = useState(0)
  let [patientProfilepopup, setPatientProfilePopup] = useState(0)
  let [infusionPumpDeatilspopup, setInfusionPumpDeatilsPopup] = useState(0)
  let [ecgGraphpopup, setEcgGraphPopup] = useState(0)
  let [supportivepopup, setSupportivePopup] = useState(0)
  let [ShowStethoScope, setShowStethoScope] = useState(0)
  let [ShowMedicinePopup, setShowMedicinePopup] = useState(0)
  let [ShowFoodIntakePopup, setShowFoodIntakePopup] = useState(0)
  let [ShowSupplimentPopup, setShowSupplimentPopup] = useState(0)
  let [ShowChatPopup, setShowChatPopup] = useState(0)
  let [timeshow, setTimeshow] = useState(0)
  let [familyHistoryShow, setFamilyHistoryShow] = useState(0)
  let [bpMap, setBpMap] = useState()

  let [temperature, setTemperature] = useState({})
  let [pluse, setPulse] = useState({})
  let [spo2, setSpo2] = useState({})
  let [bpSys, setBpSys] = useState({})
  let [bpDis, setBpDis] = useState({});
  let [ShowPhysicalActivityPopup, setShowPhysicalActivityPopup] = useState(0)

  let [pieGraph, setPiGraph] = useState()


  let handleLifeSuppoert = (val = "", id = "") => {
    // console.log("dcsdssdvdv", val)
    if (val.VmId !== 0) {
      if (val.VmId === 179 || val.VmId === 205) {
        setLifeSupportValue(val.VmValue + "%" + "(p-" + id + ")")
      }
      else {

        setLifeSupportValue(id + "%" + "(p-" + val.VmValue + ")")
      }
    }
    else {
      setLifeSupportValue("(p-" + val.VmValue + ")")
    }


  }
  let getbpMap = () => {
    let bpSys = 0;
    let bpDis = 0;
    props.patientData.VitalParametersList && props.patientData.VitalParametersList.map((data) => {

      if (data.VitalID.toString() === "4") {
        bpSys = data.VitalValue
        if (bpDis != 0) {
          setBpMap(Math.round((data.VitalValue + (2 * bpDis)) / 3, 2));
        }
      }
      else if (data.VitalID.toString() === "6") {
        bpDis = bpSys = data.VitalValue
        if (bpSys != 0) {
          setBpMap(Math.round((bpSys + (2 * data.VitalValue)) / 3, 2));
        }
      }
    })
  }
  let modelCloseFun = () => {
    setPatientPopup(0)
    setCalculatorPop(0)
    setADRReportPop(0)
    setInvestigationPopup(0)
    setClinicalnotificationPopup(0)
    setPatientScorePieChartPopup(0)
    setPatientProfilePopup(0)
    setInfusionPumpDeatilsPopup(0)
    setEcgGraphPopup(0)
    setSupportivePopup(0)
    setSuggestedFoodPopup(0)
    setShowStethoScope(0)
    setShowMedicinePopup(0)
    setShowSupplimentPopup(0)
    setShowFoodIntakePopup(0)
    setShowChatPopup(0)
    setFamilyHistoryShow(0)
    setShowPhysicalActivityPopup(0)
  }
  let handleCalulator = () => {
    setCalculatorPop(1)
  }
  let handlesetInvestigationPopup = () => {
    setInvestigationPopup(1)
  }
  let handleADR = () => {
    setADRReportPop(1)
  }
  let handleclinicalnotification = () => {
    setClinicalnotificationPopup(1)
  }
  let handlesetPatientScorePieChartpopup = () => {
    setPatientScorePieChartPopup(1)
  }
  let handlePatientProfilepopup = async () => {
    let resp = await GetPatientDetailsByUHID(props.patientData.UhId)
    if (resp.status === 1) {
      let deptmenu = await GetMenuByDepartmentIdAndUserId(resp.responseValue[0].deptId)
      if (deptmenu.status === 1) {
        window.sessionStorage.setItem("IPDpatientList", JSON.stringify(
          resp.responseValue,
        ))
        window.sessionStorage.setItem("departmentmenu", JSON.stringify({
          "menuList": deptmenu.responseValue.menuList,
          "departmentList": deptmenu.responseValue.departmentList,
        }))
        window.sessionStorage.setItem("IPDpatientsendData", JSON.stringify(
          [[props.patientData.UhId]],
        ))
        window.sessionStorage.setItem("IPDactivePatient", JSON.stringify({ Uhid: props.patientData.UhId }))
        console.log("ne data", props.patientData.PtDep, props)
        window.sessionStorage.setItem("activePage", JSON.stringify({
          "WardId": resp.responseValue[0].wardId,
          "wardName": resp.responseValue[0].wardName,
          "DepartmentId": resp.responseValue[0].deptId,
          "departmentName": props.patientData.PtDep,
          "menuName": "Patient Personal Dashboard",
          "menuId": 51
        }))

        window.open("/patientpersonalDashboardipd/")
      }

      // newWindow["uhid"] = props.patientData.UhId
      // window["clientId"] = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId
    }

    // setPatientProfilePopup(1)
  }
  let handleinfusionPump = () => {
    setInfusionPumpDeatilsPopup(1)
  }
  let handleECGGraph = () => {
    setEcgGraphPopup(1)
  }
  let handlesetSupportivePopup = () => {
    setSupportivePopup(1)
    // console.log("cvndsnv", props.patientData.FeedbackParameterList.FeedBackColor)
  }


  let makeVitalData = () => {
    let bpSys = 0;
    let bpDis = 0;
    props.patientData.AdmitTimeVitalsList && props.patientData.AdmitTimeVitalsList.map((val) => {


      if (val.VitalID === 5) {
        let time = TimeCalculate(val.VitalDateTime)
        val['time'] = time
        setTemperature(val)
      }
      else if (val.VitalID === 56) {
        let time = TimeCalculate(val.VitalDateTime)
        val['time'] = time
        setSpo2(val)
      }
      else if (val.VitalID === 3) {
        let time = TimeCalculate(val.VitalDateTime)
        val['time'] = time
        setPulse(val)
      }
      // BP Dis
      else if (val.VitalID === 6) {
        bpDis = val.VitalValue
        let map = Math.round((bpSys + (2 * bpDis)) / 3, 2)
        let time = TimeCalculate(val.VitalDateTime)
        val['time'] = time
        val["map"] = map

        setBpDis(val)


      }
      else if (val.VitalID === 4) {
        bpSys = val.VitalValue
        let map = Math.round((bpSys + (2 * bpDis)) / 3, 2)

        let time = TimeCalculate(val.VitalDateTime)
        val['time'] = time
        val["map"] = map

        setBpSys(val)

      }
    })
  }

  let handlePacs = (uhid, date) => {
    let CryptoJS = require("crypto-js");

    let url = `http://182.156.200.177:8042/webviewer/index.html?PID=${uhid}&admissionDate=${date}`
    // console.log("url", url)
    let index = url.indexOf('?');
    let queryparams = [url.slice(0, index), url.slice(index + 1)];
    // let userDetails = '&userID=' + window.userId + '&accessToken=' + window.AppToken.toString()
    let userDetails = '&userID=' + 1234567 + '&accessToken=' + "QzMwNzhGQkM2QzVFNDkxODg3QTNFMjUzQzdBQ0Y4N0EtMTIzNDU2Nw==".toString()
    // console.log("userDetails", userDetails)
    let finalString = queryparams[1].toString() + userDetails;
    //var encrypted = CryptoJS.AES.encrypt(finalString, 'sandeep23097');
    //var decrypted = CryptoJS.AES.decrypt(encrypted, 'sandeep23097');
    let iv = CryptoJS.enc.Utf8.parse("ABCDEFGHIJKLMNOP");
    let key = CryptoJS.enc.Utf8.parse("encrypt123456789");
    let encrypted = CryptoJS.AES.encrypt(finalString, key, { iv })
    window.open(queryparams[0] + '?' + encrypted.toString(), '_blank');
  }

  useEffect(() => {
    // console.log("props.", props.patientData)
    setLifeSupportValue("")
    let id179 = null
    let id98 = null
    props.patientData.LifeSupportList && props.patientData.LifeSupportList.map((val, index) => {
      if (val.VmId === 179 || val.VmId === 205) {
        id179 = val.VmValue;
        handleLifeSuppoert(val, id98)

      } else {
        id98 = val.VmValue
        handleLifeSuppoert(val, id179)
      }
    });
    getbpMap();
    makeVitalData();

    setPiGraph({
      chart: {
        plotBackgroundColor: "transparent",
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: 'transparent',
        width: "50px",
        height: "50px",
      },
      exporting: {
        enabled: false
      },
      title: {
        text: '',
        align: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          size: '100%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },

        }
      },
      credits: {
        enabled: false
      },
      series: [{

        data: [

          70.67,


          14.77,


        ]
      }]
    })

  }, [props.patientData.LifeSupportList])




  return (

    <>

      <tr key={props.patientData.UhId + "P"}>
        <td>
          <div className="overflow-max" style={{ textAlign: "center" }}>
            {props.count}
          </div>
        </td>
        <td>
          {/* Patient Detail */}
          <div className="overflow-max">
            {/* <div className="pntName pointer" title={`Patient Name (${props.patientData.PntName.toString().toUpperCase()})`} onClick={() => setPatientPopup(1)}> {props.patientData.PntName.toString().toUpperCase()}</div> */}
            <div className="ptAgeGenderPID fw-semibold">
              <span title='Age/Gender'>{props.patientData.PntAge}/{props.patientData.PntGender}</span> - <span title='Patient UHID'>{props.patientData.UhId}</span>
            </div>
            <div className="ptDepBed fw-bold mb-1">
              <span title='Ward'>{props.patientData.Ward}</span> {props.patientData.PtBed}
              <span className='borderLineColor' title='Department'>{props.patientData.PtDep}</span> {" "}
              ({" "}
              {/* {console.log("send Time", props.patientData.PtAdmitDays)} */}
              <span className='borderLineColor' title='Patient Admitted Days'>{TimeCalculate(props.patientData.PtAdmitDays)}{" "}</span>
              )
            </div>
            <div className="pticons">
              {/* <i className="bi bi-camera-fill" title="Open Camera"></i> */}
              <i className="bi bi-box-arrow-right pointer imgHover" title="Enter Profile" onClick={handlePatientProfilepopup}></i>
              {/* <i className="bi bi-card-checklist" title="ADR Report"></i> */}
              {props.patientData.FeedbackParameterList && <i className="bi bi-star-fill" style={{ color: props.patientData.FeedbackParameterList[0].FeedBackColor }} title='Supportive' onClick={handlesetSupportivePopup}></i>}
              <i className="bi bi-capsule text-primary pointer imgHover" title='ADR Report' onClick={handleADR}></i>
              {/* <span title="sortedIndex" onClick={() => { setPatientScorePieChartPopup(1) }} >{<PiChart patientScore={props.sortedIndex} />}</span> */}
              <i className="bi bi-calculator-fill pointer imgHover" title='Calculator' onClick={handleCalulator}></i>
              {/* <i style={{ width: "25px", height: "25px", background: "green" }}><HighchartsReact highcharts={Highcharts} options={options} /></i> */}
              {/* <div style={{width:"30px", height:"30px"}}> 

              <HighchartsReact highcharts={Highcharts} options={pieGraph} />
              </div> */}
              <img src={chat} alt='' className='pointer imgHover' title='Chat' onClick={() => { setShowChatPopup(1) }} />

              {/* <i className="fas fa-chart-line text-success" title='' onClick={handlesetPatientScorePieChartpopup}></i> */}
              {/* <img src={adrIcon} alt="ADR Report"  title='ADR Report' data-bs-toggle="modal" data-bs-target="#modalADRReprt"/> */}

              <i className="bi bi-card-checklist pointer imgHover" title='Family History' onClick={() => { setFamilyHistoryShow(1) }}></i>


            </div>
          </div>
        </td>
        {props.visibilitpropsleft.lifeSupporVisibility &&
          <td>
            {/* Life Support */}
            <div className="overflow-max pt-2">
              {props.patientData.DiagonsisList !== null && props.patientData.DiagonsisList !== undefined ?
                <div className='d-flex flex-wrap mbc-05'>
                  {
                    props.patientData.DiagonsisList.map((val, ind) => {
                      return (<div className='list-commas' title='Diagnosis'> {val.ProblemName} </div>)
                    })
                  }
                </div>
                : ""
              }


              {
                props.patientData.PatientHomeCareSymtomsList !== null && props.patientData.PatientHomeCareSymtomsList !== undefined ?
                  <div className='d-flex flex-wrap mbc-05'>
                    {
                      props.patientData.PatientHomeCareSymtomsList.map((val, ind) => {
                        return (<div className='list-commas' title='HomeCare Symtoms'>{val.Details}</div>)
                      })
                    }
                  </div>


                  : ""
              }
              {props.patientData.LifeSupportList !== null && props.patientData.LifeSupportList !== undefined ?
                <>
                  <>
                    <div className='borderLineColor d-flex gap-1'> <img src={Fiosbg} style={{ width: "35px" }} title="V-FIO2" alt='Fiosbg' />  <span>{lifeSupportValue && lifeSupportValue}</span>      </div>
                  </>

                  <span className="text-white ">
                    {props.patientData.LifeSupportList !== null
                      ? <span title='Ventilator Mode' >{"VM: " + props.patientData.LifeSupportList[0].VentiModeName}</span>
                      : ""}
                  </span>
                </>
                :
                <>
                  {props.patientData.OxygenSupporList && props.patientData.OxygenSupporList.map((data, ind) => {
                    console.log("daat", data)
                    return (
                      <div className='d-flex flex-wrap flex-inline gap-2'>
                        <img src={O2} style={{ width: "12px", }} title="O2" alt='' />
                        <span className='borderLineColor'>{data.SupportTypeName} <span className='fw-semibold text-white'>{TimeCalculate(data.SupportDateTime)}</span></span>
                      </div>
                    )
                  })}

                </>
              }
              <span className='d-flex flex-wrap gap-1'>
                {props.patientData.InfusionPumpDataList !== null && props.patientData.InfusionPumpDataList !== undefined ? props.patientData.InfusionPumpDataList.map((data, ind) => {
                  if (data.FluidName === "potassium chloride") {
                    return (<img src={InfusionPumpNImage} title={data.FluidName} alt="infusionpump" />)
                  }
                  else if (data.FluidName.trim().toLowerCase() === "NORAD".toLocaleLowerCase()) {

                    return (<><img src={InfusionPumpNImage} title={data.FluidName} />{bpMap >= 65 ? <i title='Decrease the Norad dose' className="bi bi-arrow-down-circle-fill blink" style={{ color: "red", fontSize: "17px" }}></i> : ""}</>)
                  }
                  else if (data.FluidName.trim().toLowerCase() === "FENTANYL".toLocaleLowerCase()) {
                    return (<img src={InfusionPumpFImage} title={data.FluidName} />)
                  }
                  else if (data.FluidName.trim().toLowerCase() === "HYDROCORTISONE".toLocaleLowerCase()) {
                    // return (<img src={InfusionPumpNImage} title={data.FluidName} />)

                  }
                  else if (data.FluidName.trim().toLowerCase() === "INSULIN".toLocaleLowerCase()) {
                    // return (<img src={InfusionPumpNImage} title={data.FluidName} />)
                  }

                }) : ""}
                {props.patientData.DVTPumpList !== null && props.patientData.DVTPumpList !== undefined ? props.patientData.DVTPumpList.map((val) => {
                  return (
                    <span>
                      <img src={DVTPumpList} alt="" className='ms-1' width="10px" title={"DVT Pump Machine Start Time : " + val.DVTPumpDateTime} />
                    </span>
                  )
                }) : ""}


                {

                  props.patientData.InfusionPumpDataList !== null && props.patientData.InfusionPumpDataList !== undefined ?
                    <img src={InfusionPumpDeatil} title="Infusion Pump Deatils" className='ps-1' width="24px" onClick={() => { handleinfusionPump() }} alt='InfusionPumpDeatil' /> : <></>

                }
                {/* {console.log("props.patientData.PatientInputOutputList ",props.patientData.PatientInputOutputList)} */}
                {
                  props.patientData.PatientInputOutputList !== undefined && props.patientData.PatientInputOutputList !== null ?
                    props.patientData.PatientInputOutputList[0].IsLowUrine === 1 ?
                      <img src={urinetest} title="Low Urine" className='ps-1' width="24px" /> : "" : ""

                }

              </span>
            </div>
          </td>
        }
        {props.visibilitpropsleft.diagnosisVisibility &&
          <td>
            {" "}
            {/* Diagnosis */}
            <div className="overflow-max">
              <div className='d-flex flex-inline gap-1 wrap pb-1_ pt-1_'>
                {/* {props.patientData.DiagonsisList && <span className='d-flex flex-inline diagList ' title={`${props.patientData.DiagonsisList && props.patientData.DiagonsisList.map((data, ind) => {
                  if (data.ProblemId === 4) {

                    return ("\n" + (ind + 1) + ". " + data.ProblemName.toString().toUpperCase())
                  }
                })}`}>{props.patientData.DiagonsisList[0].ProblemId === 4 ? props.patientData.DiagonsisList[0].ProblemName.toString().toUpperCase() : ""}</span>}
 */}

              </div>


              <div className='pticons mb-2'>
                {/* <i className='pointer' ><img src={book} /></i> */}
                <i className='pointer fa-solid fa-microscope pointer imgHover text-white pt-1' title='Investigation Details' onClick={handlesetInvestigationPopup}></i>
                <i className='fa-solid fa-x-ray pointer imgHover' title='PACS Details' style={{ color: '#337ab7' }} onClick={() => { handlePacs(props.patientData.UhId, props.patientData.PtAdmitDays.split(" ")[0]) }}>
                  {/* <img src={report} /> */}
                </i>
                <i className='fa-regular fa-bell-slash pointer imgHover pt-1' title='Clinical Notifications' onClick={handleclinicalnotification} style={{ color: "#ec0726" }}></i>
                {/* <i className='pointer' title='Suggested Food Deatils' onClick={() => { setSuggestedFoodPopup(1) }}><img src={food} /></i> */}
                {/* <i className='pointer'><img src={alertman} /></i> */}
                {
                  props.patientData.ECGList !== null ?
                    <img className='pointer imgHover' src={ECGGraphIcon} title="ECG Graph" onClick={() => { handleECGGraph() }} /> : ""
                }
              </div>

              <div className='pticons'>
                <img className='pointer imgHover' src={stethoscope} title="Stethoscope" onClick={() => { setShowStethoScope(1) }} alt='' />
                <img className='pointer imgHover' src={medicIcon} title="Medicine" onClick={() => { setShowMedicinePopup(1) }} alt='' />
                <img className='pointer imgHover' src={food} title="Food Intake" onClick={() => { setShowFoodIntakePopup(1) }} alt='' />
                <img className='pointer imgHover' src={supplementIcon} title="Supplement" onClick={() => { setShowSupplimentPopup(1) }} alt='' />
                <img className='pointer imgHover' src={ActivityTracker} title="Physical Activity" onClick={() => { setShowPhysicalActivityPopup(1) }} alt='' />
              </div>

              {/* <button onClick={() => setShowStethoScope(1)}>Click StethoscopeWave</button> */}
              {/* <button onClick={() => setShowMedicinePopup(1)}>Click Medic</button>
              <button onClick={() => setShowFoodIntakePopup(1)}>Click Food Intake</button>
              <button onClick={() => setShowSupplimentPopup(1)}>Click Suppliment</button> */}

            </div>
          </td>
        }
        {props.visibilitpropsleft.wardVisibility &&
          <td>
            {" "}
            {/* Ward */}
            <div className="overflow-max">
              <span className='text-white'>{props.patientData.Ward ? props.patientData.Ward : "N/A"}</span>&nbsp;&nbsp;
              <span className='borderLineColor'>{props.patientData.PtDep && props.patientData.PtDep}</span><br />
              <span className='text-white'>{props.patientData.PtAdmitDays && props.patientData.PtAdmitDays.split(" ")[0]} <span className='fw-semibold borderLineColor'>({TimeCalculate(props.patientData.PtAdmitDays)})</span></span>
            </div>
          </td>
        }
        {props.visibilitpropsleft.infusionVisibility &&
          <td>
            {" "}
            {/* Infusion Detail */}
            <div className="overflow-max"></div>
          </td>
        }
        {props.visibilitpropsleft.consultantVisibility &&
          <td>
            {" "}
            {/* Consultant */}
            <div className="overflow-max text-white">{props.patientData.Consultant}</div>
          </td>
        }
        {props.visibilitpropsleft.nSVisibility &&
          <td>
            {" "}
            {/* NS Detail */}
            <div className="overflow-max"></div>
          </td>
        }
        {props.visibilitpropsleft.bPRVisibility &&
          <td>
            {" "}
            {/* BPR */}
            <div className="overflow-max vitalClass text-white" ><span style={{ color: bpSys.VitalColor }}>{bpSys.VitalValue}</span> / <span style={{ color: bpDis.VitalColor }}>{bpDis.VitalValue}</span>
              <br />
              {/* <span className="" >{bpDis.time}</span>

              <br /><span className='text-white'>{bpDis.map}</span> */}
            </div>
          </td>
        }
        {props.visibilitpropsleft.sPO2RVisibility &&
          <td>
            {" "}
            {/* SPO2-R */}
            <div className="overflow-max vitalClass text-white" style={{ color: spo2.VitalColor }} >{spo2.VitalValue} <br />{/*<span>{spo2.time}</span>*/}</div>
          </td>
        }
        {props.visibilitpropsleft.pulseRRVisibility &&
          <td>
            {" "}
            {/* Pulse-R */}
            <div className="overflow-max vitalClass text-white" style={{ color: spo2.VitalColor }}>{pluse.VitalValue} <br />{/*<span>{pluse.time}</span>*/}</div>
          </td>
        }
        {props.visibilitpropsleft.tempRRVisibility &&
          <td>
            {" "}
            {/* Temp-R */}
            <div className="overflow-max vitalClass text-white" style={{ color: temperature.VitalColor }}>{temperature.VitalValue} <br />{/*<span>{temperature.time}</span>*/}</div>
          </td>
        }


      </tr>
      {
        patientpopup ? <PatientDataPopup patientpopup={patientpopup} modelCloseFun={modelCloseFun} patientData={props.patientData} /> : ""

      }
      {
        calculatorPop ? <CalculatorPopup showCal={calculatorPop} modelCloseFun={modelCloseFun} uhId={props.patientData.UhId} patientdata={props.patientData} /> : ""
      }
      {
        ADRReportPop ? <ADRReport ADRReportPop={ADRReportPop} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        investigationpopup ? <InvestigationReport investigationpopup={investigationpopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        clinicalnotificationpopup ? <ClinicalNotification clinicalnotificationpopup={clinicalnotificationpopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        patientScorePieChartpopup ? <PatientScorePieChart patientScorePieChartpopup={patientScorePieChartpopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        patientProfilepopup ? <PatientProfileDetails patientProfilepopup={patientProfilepopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        infusionPumpDeatilspopup ? <InfusionPumpDeatils infusionPumpDeatilspopup={infusionPumpDeatilspopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        ecgGraphpopup ? <ECGGraph ecgGraphpopup={ecgGraphpopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        supportivepopup ? <SupportivePopUp SupportivePopUp={SupportivePopUp} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        suggestedFoodpopup ? <SuggestedFood suggestedFoodpopup={suggestedFoodpopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }

      {
        ShowStethoScope ? <StethoscopeWaveFromPopup ShowStethoScope={ShowStethoScope} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }

      {
        ShowMedicinePopup === 1 ? <MedicineChecklist ShowMedicinePopup={ShowMedicinePopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }

      {
        ShowFoodIntakePopup ? <FoodIntakeChecklist ShowFoodIntakePopup={ShowFoodIntakePopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        ShowSupplimentPopup ? <SupplementChecklist ShowSupplimentPopup={ShowSupplimentPopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
      {
        ShowChatPopup ? <ChatingPopup ShowChatPopup={ShowChatPopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }


      {
        familyHistoryShow ? <FamilyHistoryPopUp familyHistoryShow={familyHistoryShow} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }

      {
        ShowPhysicalActivityPopup ? <PhysicalActivityByUHID ShowPhysicalActivityPopup={ShowPhysicalActivityPopup} modelCloseFun={modelCloseFun} patientdata={props.patientData} /> : ""
      }
    </>



  )
}
