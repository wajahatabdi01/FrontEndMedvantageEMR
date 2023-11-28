import React, { useEffect } from 'react'
// import store from '../../../../Store/Store';
// import { getpdmvitalsData } from '../../../../Reducer/PatientMonitorDashboard/PMDVitalsData'

import { useState } from 'react';
import TimeCalculate from '../Code/TimeCalculate';



export default function PatientVitalRight(props) {

  // ----------- vital data -------------------
  let [bpSys, setBpSys] = useState("");
  let [bpSysId, setBpSysId] = useState("");
  let [bpSysTime, setBpSysTime] = useState("");
  let [bpSysColor, setBpSysColor] = useState("");

  let [bpDys, setBpDys] = useState("");
  let [bpDysId, setBpDysId] = useState("");
  let [bpDysTime, setBpDysTime] = useState("");
  let [bpDysColor, setBpDysColor] = useState("");

  let [spo2, setSpo2] = useState("");
  let [spo2Id, setSpo2Id] = useState("");
  let [spo2Time, setSpo2Time] = useState("");
  let [spo2Color, setSpo2Color] = useState("");

  let [rr, setRr] = useState("");
  let [rrId, setRrId] = useState("");
  let [rrTime, setRrTime] = useState("");
  let [rrColor, setRrColor] = useState("");

  let [hr, setHr] = useState("");
  let [hrId, setHrId] = useState("");
  let [hrTime, setHrTime] = useState("");
  let [hrColor, setHrColor] = useState("");

  let [pr, setPr] = useState("");
  let [prId, setPrId] = useState("");
  let [prTime, setPrTime] = useState("");
  let [prColor, setPrColor] = useState("");

  let [temp, setTemp] = useState("");
  let [tempId, setTempId] = useState("");
  let [tempTime, setTempTime] = useState("");
  let [tempColor, setTempColor] = useState("");

  let [rbs, setRbs] = useState("");
  let [rbsId, setRbsId] = useState("");
  let [rbsTime, setRbsTime] = useState("");
  let [rbsColor, setRbsColor] = useState("");
  // ----------- vital data end -------------------

  // ----------- Investigation data  -------------------
  let [alb, setAlb] = useState("");
  let [albId, setAlbId] = useState("");
  let [albTime, setAlbTime] = useState("");
  let [albColor, setAlbColor] = useState("");

  let [caplus, setCaplus] = useState("");
  let [caplusId, setCaplusId] = useState("");
  let [caplusTime, setCaplusTime] = useState("");
  let [caplusColor, setCaplusColor] = useState("");

  let [kplus, setKplus] = useState("");
  let [kplusId, setKplusId] = useState("");
  let [kplusTime, setKplusTime] = useState("");
  let [kplusColor, setKplusColor] = useState("");

  let [naplus, setNaplus] = useState("");
  let [naplusId, setNaplusId] = useState("");
  let [naplusTime, setNaplusTime] = useState("");
  let [naplusColor, setNaplusColor] = useState("");

  let [mg, setMg] = useState("");
  let [mgId, setMgId] = useState("");
  let [mgTime, setMgTime] = useState("");
  let [mgColor, setMgColor] = useState("");

  let [ph, setPh] = useState("");
  let [phId, setPhId] = useState("");
  let [phTime, setPhTime] = useState("");
  let [phColor, setPhColor] = useState("");

  let [pco2, setPco2] = useState("");
  let [pco2Id, setPco2Id] = useState("");
  let [pco2Time, setPco2Time] = useState("");
  let [pco2Color, setPco2Color] = useState("");

  let [etco2, setEtco2] = useState("");
  let [etco2Id, setEtco2Id] = useState("");
  let [etco2Time, setEtco2Time] = useState("");
  let [etco2Color, setEtco2Color] = useState("");

  let [po2, setPo2] = useState("");
  let [po2Id, setPo2Id] = useState("");
  let [po2Time, setPo2Time] = useState("");
  let [po2Color, setPo2Color] = useState("");

  let [lactate, setLactate] = useState("");
  let [lactateId, setLactateId] = useState("");
  let [lactateTime, setLactateTime] = useState("");
  let [lactateColor, setLactateColor] = useState("");

  let [hco3, setHco3] = useState("");
  let [hco3Id, setHco3Id] = useState("");
  let [hco3Time, setHco3Time] = useState("");
  let [hco3Color, setHco3Color] = useState("");

  let [creatinine, setCreatinine] = useState("");
  let [creatinineId, setCreatinineId] = useState("");
  let [creatinineTime, setCreatinineTime] = useState("");
  let [creatinineColor, setCreatinineColor] = useState("");

  let [burea, setBurea] = useState("");
  let [bureaId, setBureaId] = useState("");
  let [bureaTime, setBureaTime] = useState("");
  let [bureaColor, setBureaColor] = useState("");

  let [io, setIo] = useState("");
  let [ioId, setIoId] = useState("");
  let [ioTime, setIoTime] = useState("");
  let [ioColor, setIoColor] = useState("");

  let [sgot, setSgot] = useState("");
  let [sgotId, setSgotId] = useState("");
  let [sgotTime, setSgotTime] = useState("");
  let [sgotColor, setSgotColor] = useState("");

  let [sgpt, setSgpt] = useState("");
  let [sgptId, setSgptId] = useState("");
  let [sgptTime, setSgptTime] = useState("");
  let [sgptColor, setSgptColor] = useState("");

  let [kplusSerum, setKplusSerum] = useState("");
  let [kplusSerumId, setKplusSerumId] = useState("");
  let [kplusSerumTime, setKplusSerumTime] = useState("");
  let [kplusSerumColor, setKplusSerumColor] = useState("");

  let [naplusSerum, setNaplusSerum] = useState("");
  let [naplusSerumId, setNaplusSerumId] = useState("");
  let [naplusSerumTime, setNaplusSerumTime] = useState("");
  let [naplusSerumColor, setNaplusSerumColor] = useState("");

  let [caplusSerum, setCaplusSerum] = useState("");
  let [caplusSerumId, setCaplusSerumId] = useState("");
  let [caplusSerumTime, setCaplusSerumTime] = useState("");
  let [caplusSerumColor, setCaplusSerumColor] = useState("");



  let [vitals, setVitals] = useState([])
  let [investigations, setInvestigations] = useState([])
  // ----------- Investigation data end -------------------

  // -------------- uhId -----------
  let [uhId, setUhId] = useState("");

  // extra variable
  let [bpMap, setBpMap] = useState("");

  let createData = () => {
    let setVitalDataPoup = []

    let vitals = props.patientData.VitalParametersList
      ? props.patientData.VitalParametersList
      : [];
    setVitals(vitals)


    let investigations = props.patientData.InvestigationParameterList
      ? props.patientData.InvestigationParameterList
      : [];
    setInvestigations(investigations)

    setBpSys("");
    setBpSysId("");
    setBpSysTime("");
    setBpSysColor("");
    setBpDys("");
    setBpDysId("");
    setBpDysTime("");
    setBpDysColor("");
    setSpo2("");
    setSpo2Id("");
    setSpo2Time("");
    setSpo2Color("");
    setRr("");
    setRrId("");
    setRrTime("");
    setRrColor("");
    setHr("");
    setHrId("");
    setHrTime("");
    setHrColor("");
    setPr("");
    setPrId("");
    setPrTime("");
    setPrColor("");
    setTemp("");
    setTempId("");
    setTempTime("");
    setTempColor("");
    setRbs("");
    setRbsId("");
    setRbsTime("");
    setRbsColor("");
    setAlb("");
    setAlbId("");
    setAlbTime("");
    setAlbColor("");
    setCaplus("");
    setCaplusId("");
    setCaplusTime("");
    setCaplusColor("");
    setKplus("");
    setKplusId("");
    setKplusTime("");
    setKplusColor("");
    setNaplus("");
    setNaplusId("");
    setNaplusTime("");
    setNaplusColor("");
    setMg("");
    setMgId("");
    setMgTime("");
    setMgColor("");
    setPh("");
    setPhId("");
    setPhTime("");
    setPhColor("");
    setPco2("");
    setPco2Id("");
    setPco2Time("");
    setPco2Color("");
    setEtco2("");
    setEtco2Id("");
    setEtco2Time("");
    setEtco2Color("");
    setPo2("");
    setPo2Id("");
    setPo2Time("");
    setPo2Color("");
    setLactate("");
    setLactateId("");
    setLactateTime("");
    setLactateColor("");
    setHco3("");
    setHco3Id("");
    setHco3Time("");
    setHco3Color("");
    setCreatinine("");
    setCreatinineId("");
    setCreatinineTime("");
    setCreatinineColor("");
    setBurea("");
    setBureaId("");
    setBureaTime("");
    setBureaColor("");
    setIo("");
    setIoId("");
    setIoTime("");
    setIoColor("");
    setSgot("");
    setSgotId("");
    setSgotTime("");
    setSgotColor("");
    setSgpt("");
    setSgptId("");
    setSgptTime("");
    setSgptColor("");
    setKplusSerum("");
    setKplusSerumId("");
    setKplusSerumTime("");
    setKplusSerumColor("");
    setNaplusSerum("");
    setNaplusSerumId("");
    setNaplusSerumTime("");
    setNaplusSerumColor("");
    // set vital data
    vitals.map((vital) => {

      if (vital.VitalID.toString() === "4") {
        setBpSys(Math.round(vital.VitalValue * 100) / 100)
        setBpSysColor(vital.VitalColor)
        setBpSysId(vital.VitalID)
        setUhId(props.patientData.UhId)
        setVitalDataPoup = [...setVitalDataPoup, {
          "name": "BP",
          "value": vital.VitalValue,
          "colorcode": vital.VitalColor
        }]

        if (vital.VitalDateTime !== '') {
          setBpSysTime(TimeCalculate(vital.VitalDateTime))
        }

      }
      if (vital.VitalID.toString() === "6") {
        setBpDys(Math.round(vital.VitalValue * 100) / 100)
        setBpDysColor(vital.VitalColor)
        setBpDysId(vital.VitalID)
        setUhId(props.patientData.UhId)
        setBpMap(Math.round((bpSys + (2 * vital.VitalValue)) / 3, 2))
        setVitalDataPoup = [...setVitalDataPoup, {
          "name": "BPD",
          "value": vital.VitalValue,
          "colorcode": vital.VitalColor
        }]
        if (vital.VitalDateTime !== '') {
          setBpDysTime(TimeCalculate(vital.VitalDateTime))
        }

      }
      if (vital.VitalID.toString() === "3") {
        setPr(Math.round(vital.VitalValue * 100) / 100);
        setPrColor(vital.VitalColor);
        setPrId(vital.VitalID)
        setUhId(props.patientData.UhId)
        setVitalDataPoup = [...setVitalDataPoup, {
          "name": "PR",
          "value": vital.VitalValue,
          "colorcode": vital.VitalColor
        }]

        if (vital.VitalDateTime !== '') {
          setPrTime(TimeCalculate(vital.VitalDateTime))


        }
      }
      if (vital.VitalID.toString() === "5") {
        setTemp(Math.round(vital.VitalValue * 100) / 100)
        setTempColor(vital.VitalColor)
        setTempId(vital.VitalID)
        setUhId(props.patientData.UhId)
        setVitalDataPoup = [...setVitalDataPoup, {
          "name": "Temp",
          "value": vital.VitalValue,
          "colorcode": vital.VitalColor
        }]

        if (vital.VitalDateTime !== '') {
          setTempTime(TimeCalculate(vital.VitalDateTime))

        }

      }
      if (vital.VitalID.toString() === "10") {
        setRbs(Math.round(vital.VitalValue * 100) / 100)
        setRbsColor(vital.VitalColor)
        setRbsId(vital.VitalID)
        setUhId(props.patientData.UhId)
        setVitalDataPoup = [...setVitalDataPoup, {
          "name": "RBS",
          "value": vital.VitalValue,
          "colorcode": vital.VitalColor
        }]

        if (vital.VitalDateTime !== '') {
          setRbsTime(TimeCalculate(vital.VitalDateTime))
        }

      }
      if (vital.VitalID.toString() === "7") {
        setRr(Math.round(vital.VitalValue * 100) / 100)
        setRrColor(vital.VitalColor)
        setRrId(vital.VitalID)
        setUhId(props.patientData.UhId)
        setVitalDataPoup = [...setVitalDataPoup, {
          "name": "RR",
          "value": vital.VitalValue,
          "colorcode": vital.VitalColor
        }]

        if (vital.VitalDateTime !== '') {
          setRrTime(TimeCalculate(vital.VitalDateTime))


        }

      }
      if (vital.VitalID.toString() === "74") {
        setHr(Math.round(vital.VitalValue * 100) / 100)
        setHrColor(vital.VitalColor)
        setHrId(vital.VitalID)
        setUhId(props.patientData.UhId)
        setVitalDataPoup = [...setVitalDataPoup, {
          "name": "HR",
          "value": vital.VitalValue,
          "colorcode": vital.VitalColor
        }]

        if (vital.VitalDateTime !== '') {
          setHrTime(TimeCalculate(vital.VitalDateTime))
        }

      }
      if (vital.VitalID.toString() === "56") {
        setSpo2(Math.round(vital.VitalValue * 100) / 100)
        setSpo2Color(vital.VitalColor)
        setSpo2Id(vital.VitalID)
        setUhId(props.patientData.UhId)
        setVitalDataPoup = [...setVitalDataPoup, {
          "name": "SPO2",
          "value": vital.VitalValue,
          "colorcode": vital.VitalColor
        }]

        if (vital.VitalDateTime !== '') {
          setSpo2Time(TimeCalculate(vital.VitalDateTime))
        }

      }

    })



    investigations && investigations.map((investigation) => {
      if (investigation.SubTestID.toString() === "611") {
        setKplus(Math.round(investigation.SubTestValue * 100) / 100)
        setKplusColor(investigation.SubTestColor)
        setKplusId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setKplusTime(TimeCalculate(investigation.SubTestDateTime))
        }

      }
      if (investigation.SubTestID.toString() === "610") {
        setNaplus(Math.round(investigation.SubTestValue * 100) / 100)
        setNaplusColor(investigation.SubTestColor)
        setNaplusId(investigation.SubTestID)
        setUhId(props.patientData.UhId)
        if (investigation.SubTestDateTime !== '') {
          setNaplusTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      // if(investigation.subTestId.toString() === "191"){
      //   setNaplusSerum(investigation.SubTestValue)
      //   setNaplusSerumColor(investigation.SubTestColor)
      //   setNaplusSerumId("191")
      //   setUhId(props.patientData.UhId)
      // }
      if (investigation.SubTestID.toString() === "206") {
        setAlb(Math.round(investigation.SubTestValue * 100) / 100)
        setAlbColor(investigation.SubTestColor)
        setAlbId(investigation.SubTestID)
        setUhId(props.patientData.UhId)
        if (investigation.SubTestDateTime !== '') {
          setAlbTime(TimeCalculate(investigation.SubTestDateTime))
        }
      }
      if (investigation.SubTestID.toString() === "612") {
        setCaplus(Math.round(investigation.SubTestValue * 100) / 100)
        setCaplusColor(investigation.SubTestColor)
        setCaplusId(investigation.SubTestID)
        setUhId(props.patientData.UhId)
        if (investigation.SubTestDateTime !== '') {
          setCaplusTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "607") {

        setPh(Math.round(investigation.SubTestValue * 100) / 100)
        setPhColor(investigation.SubTestColor)
        setPhId(investigation.SubTestID)
        setUhId(props.patientData.UhId)
        if (investigation.SubTestDateTime !== '') {
          setCaplusTime(TimeCalculate(investigation.SubTestDateTime))

        }

      }
      if (investigation.SubTestID.toString() === "608") {
        setPco2(Math.round(investigation.SubTestValue * 100) / 100)
        setPco2Color(investigation.SubTestColor)
        setPco2Id(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setPco2Time(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "609") {
        setPo2(Math.round(investigation.SubTestValue * 100) / 100)
        setPo2Color(investigation.SubTestColor)
        setPo2Id(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setPo2Time(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "614") {
        setLactate(Math.round(investigation.SubTestValue * 100) / 100)
        setLactateColor(investigation.SubTestColor)
        setLactateId(investigation.SubTestID)
        setUhId(props.patientData.UhId)
        if (investigation.SubTestDateTime !== '') {
          setLactateTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "613") {
        setHco3(Math.round(investigation.SubTestValue * 100) / 100)
        setHco3Color(investigation.SubTestColor)
        setHco3Id(investigation.SubTestID)
        setUhId(props.patientData.UhId)
        if (investigation.SubTestDateTime !== '') {
          setHco3Time(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "497") {
        setCreatinine(Math.round(investigation.SubTestValue * 100) / 100)
        setCreatinineColor(investigation.SubTestColor)
        setCreatinineId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setCreatinineTime(TimeCalculate(investigation.SubTestDateTime))
        }

      }
      if (investigation.SubTestID.toString() === "496") {
        setBurea(Math.round(investigation.SubTestValue * 100) / 100)
        setBureaColor(investigation.SubTestColor)
        setBureaId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setBureaTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "742") {
        setSgpt(Math.round(investigation.SubTestValue * 100) / 100)
        setSgptColor(investigation.SubTestColor)
        setSgptId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setSgptTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "743") {
        setSgot(Math.round(investigation.SubTestValue * 100) / 100)
        setSgotColor(investigation.SubTestColor)
        setSgotId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setSgotTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "187") {
        setCaplus(Math.round(investigation.SubTestValue * 100) / 100)
        setCaplusColor(investigation.SubTestColor)
        setCaplusId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setCaplusTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "499") {
        setKplusSerum(Math.round(investigation.SubTestValue * 100) / 100)
        setKplusSerumColor(investigation.SubTestColor)
        setKplusSerumId(investigation.SubTestID)
        setUhId(props.patientData.UhId)
      }
      if (investigation.SubTestID.toString() === "498") {
        setNaplusSerum(Math.round(investigation.SubTestValue * 100) / 100)
        setNaplusSerumColor(investigation.SubTestColor)
        setNaplusSerumId(investigation.SubTestID)
        setUhId(props.patientData.UhId)
      }
      if (investigation.SubTestID.toString() === "250") {
        setMg(Math.round(investigation.SubTestValue * 100) / 100)
        setMgColor(investigation.SubTestColor)
        setMgId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setMgTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "607") {
        setPh(Math.round(investigation.SubTestValue * 100) / 100)
        setPhColor(investigation.SubTestColor)
        setPhId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setPhTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "608") {
        setPco2(Math.round(investigation.SubTestValue * 100) / 100)
        setPco2Color(investigation.SubTestColor)
        setPco2Id(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setPco2Time(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "609") {
        setPo2(Math.round(investigation.SubTestValue * 100) / 100)
        setPo2Color(investigation.SubTestColor)
        setPo2Id(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setPo2Time(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "617") {
        setHco3(Math.round(investigation.SubTestValue * 100) / 100)
        setHco3Color(investigation.SubTestColor)
        setHco3Id(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setHco3Time(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "743") {
        setSgot(Math.round(investigation.SubTestValue * 100) / 100)
        setSgotColor(investigation.SubTestColor)
        setSgotId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setSgotTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "742") {
        setSgpt(Math.round(investigation.SubTestValue * 100) / 100)
        setSgptColor(investigation.SubTestColor)
        setSgptId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setSgptTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "614") {
        setLactate(Math.round(investigation.SubTestValue * 100) / 100)
        setLactateColor(investigation.SubTestColor)
        setLactateId(investigation.SubTestID)
        setUhId(props.patientData.UhId)

        if (investigation.SubTestDateTime !== '') {
          setLactateTime(TimeCalculate(investigation.SubTestDateTime))


        }

      }
      if (investigation.SubTestID.toString() === "187") {

        setCaplusSerum(Math.round(investigation.SubTestValue * 100) / 100)
        setCaplusSerumId(investigation.SubTestID)
        setCaplusSerumColor(investigation.SubTestColor)
      }

    })


    // store.dispatch(getpdmvitalsData([setVitalDataPoup]))


  }



  useEffect(() => {

    createData();
  }, [props.patientData])

  return (
    <tr key={props.patientData.UhId + "V"}>
      {props.visibilitpropsright.bpVisibility &&
        <td>
          <div className="overflow-max vitalClass">
            {vitals.length != 0 ? <>{bpSys ? <span>
              <span style={{ color: bpSysColor }}>{bpSys} </span> /{" "}
              <span style={{ color: bpDysColor }}>{bpDys}</span>{" "}<br />
              {
                bpSysTime.split("-")[1] === "D" || (bpSysTime.split("-")[0].split(":")[0] >= 2 && bpSysTime.split("-")[1] === "H") ? <span style={{ 'color': 'red', fontSize: "0.7rem" }} className="blink"><i className="bi bi-clock"></i>  {bpSysTime.toLowerCase().replace("-", "")}</span>
                  : (bpSysTime.split("-")[0].split(":")[0] >= 1 && bpSysTime.split("-")[1] === "H") ? <span style={{ "color": 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {bpSysTime.toLowerCase().replace("-", "")}</span>
                    : (bpSysTime.split("-")[0].split(":")[0] <= 1 && bpSysTime.split("-")[1] === "H") || (bpSysTime.split("-")[0] >= 10 && bpSysTime.split("-")[1] === "M") ? <span style={{ 'color': '#ffa500', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {bpSysTime.toLowerCase().replace("-", "")}</span> : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {bpSysTime.toLowerCase().replace("-", "")}</span>
              }
              <br />
              <span className="text-white">Map-{bpMap}</span> <br />
              <div className="" title='BP Graph' ><i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapVitalData({ showGrap: 1, vitalIdSearchNew: [bpSysId, bpDysId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "BP Graph", patientName: props.patientData.PntName }) }}></i></div>
            </span> : 'N/A'}</> : "N/A"}

          </div>
        </td>
      }
      {props.visibilitpropsright.spo2Visibility &&
        <td>
          <div className="overflow-max vitalClass">
            {vitals.length != 0 ? spo2 ? <span>
              <span style={{ color: spo2Color }}>{spo2}</span><br />
              {
                spo2Time.split("-")[1] === "D" || (spo2Time.split("-")[0].split(":")[0] >= 2 && spo2Time.split("-")[1] === "H") ? <span style={{ 'color': 'red', fontSize: "0.7rem" }} className="blink"><i className="bi bi-clock"></i> {spo2Time.toLowerCase().replace("-", "")}</span>

                  : (spo2Time.split(":")[0] >= 1 && spo2Time.split("-")[1] === "H") ? <span style={{ "color": 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {spo2Time.toLowerCase().replace("-", "")}</span>

                    : (spo2Time.split("-")[0].split(":")[0] <= 1 && spo2Time.split("-")[1] === "H") || (spo2Time.split("-")[0] >= 10 && spo2Time.split("-")[1] === "M") ? <span style={{ 'color': '#ffa500', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {spo2Time.toLowerCase().replace("-", "")}</span> : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {spo2Time.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="" title='SPO2 Graph' ><i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapVitalData({ showGrap: 1, vitalIdSearchNew: [spo2Id], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "SPO2 Graph", patientName: props.patientData.PntName }) }}></i></div>
            </span> : 'N/A' : "N/A"}
          </div>
        </td>
      }
      {props.visibilitpropsright.rrVisibility &&
        <td>
          <div className="overflow-max vitalClass">
            {vitals.length != 0 ? rr ? <span>
              <span style={{ color: rrColor }}>{rr}</span><br />

              {
                rrTime.split("-")[1] === "D" || (rrTime.split("-")[0].split(":")[0] >= 2 && rrTime.split("-")[1] === "H") ? <span style={{ 'color': 'red', fontSize: "0.7rem" }} className="blink"><i className="bi bi-clock"></i> {rrTime.toLowerCase().replace("-", "")}</span>

                  : (rrTime.split(":")[0] >= 1 && rrTime.split("-")[1] === "H") ? <span style={{ "color": 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {rrTime.toLowerCase().replace("-", "")}</span>

                    : (rrTime.split("-")[0].split(":")[0] <= 1 && rrTime.split("-")[1] === "H") || (rrTime.split("-")[0] >= 10 && rrTime.split("-")[1] === "M") ? <span style={{ 'color': '#ffa500', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {rrTime.toLowerCase().replace("-", "")}</span> : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {rrTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="" title='RR Graph' ><i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapVitalData({ showGrap: 1, vitalIdSearchNew: [rrId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "RR Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : "N/A"}
          </div>
        </td>
      }
      {props.visibilitpropsright.hrVisibility &&
        <td>
          <div className="overflow-max vitalClass">
            {vitals.length != 0 ? hr ? <span>
              <span style={{ color: hrColor }}>{hr}</span><br />
              {
                hrTime.split("-")[1] === "D" || (hrTime.split("-")[0].split(":")[0] >= 2 && hrTime.split("-")[1] === "H") ? <span style={{ 'color': 'red', fontSize: "0.7rem" }} className="blink"><i className="bi bi-clock"></i> {hrTime.toLowerCase().replace("-", "")}</span>

                  : (hrTime.split(":")[0] >= 1 && hrTime.split("-")[1] === "H") ? <span style={{ "color": 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {hrTime.toLowerCase().replace("-", "")}</span>

                    : (hrTime.split("-")[0].split(":")[0] <= 1 && hrTime.split("-")[1] === "H") || (hrTime.split("-")[0] >= 10 && hrTime.split("-")[1] === "M") ? <span style={{ 'color': '#ffa500', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {hrTime.toLowerCase().replace("-", "")}</span> : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {hrTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="" title='HR Graph' ><i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapVitalData({ showGrap: 1, vitalIdSearchNew: [hrId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "HR Graph", patientName: props.patientData.PntName }) }}></i></div>
            </span> : 'N/A' : "N/A"}

          </div>
        </td>
      }
      {props.visibilitpropsright.prVisibility &&

        <td>
          <div className="overflow-max vitalClass">
            {vitals.length != 0 ? pr ? <span>
              <span style={{ color: prColor }}>{pr}</span><br />
              {
                prTime.split("-")[1] === "D" || (prTime.split("-")[0].split(":")[0] >= 2 && prTime.split("-")[1] === "H") ? <span style={{ 'color': 'red', fontSize: "0.7rem" }} className="blink"><i className="bi bi-clock"></i> {prTime.toLowerCase().replace("-", "")}</span>

                  : (prTime.split(":")[0] >= 1 && prTime.split("-")[1] === "H") ? <span style={{ "color": 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {prTime.toLowerCase().replace("-", "")}</span>

                    : (prTime.split("-")[0].split(":")[0] <= 1 && prTime.split("-")[1] === "H") || (prTime.split("-")[0] >= 10 && prTime.split("-")[1] === "M") ? <span style={{ 'color': '#ffa500', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {prTime.toLowerCase().replace("-", "")}</span> : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {prTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="" title='PR Graph' ><i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapVitalData({ showGrap: 1, vitalIdSearchNew: [prId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "PR Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : "N/A"}
          </div>
        </td>
      }

      {props.visibilitpropsright.albVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? alb ? <span>
              <span style={{ color: albColor }}>{alb}</span><br />
              {
                albTime.split("-")[1] === "D" && albTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i>  {albTime.toLowerCase().replace("-", "")}</span> : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {albTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='ALB Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === albId) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [albId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "ALB Graph", patientName: props.patientData.PntName }) }}></i>
              </div>

            </span> : 'N/A' : "N/A"}

          </div>
        </td>
      }

      {props.visibilitpropsright.caplusVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? caplus ? <span>
              <span style={{ color: caplusColor }}>{caplus}</span> {caplusSerum ? <span style={{ color: caplusSerumColor }}>({caplusSerum})</span> : ""}<br />
              {
                caplusTime.split("-")[1] === "D" && caplusTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {caplusTime.toLowerCase().replace("-", "")}</span> : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {caplusTime.toLowerCase().replace("-", "")}</span>}
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='Calcium (Ca++) Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === caplusId) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [caplusId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "Calcium (Ca++) Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : 'N/A'}
          </div>
        </td>
      }
      {props.visibilitpropsright.kplusVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? (kplus ? kplus : kplusSerum) ? <span>
              <span style={{ color: kplusColor }}>{kplus} ({kplusSerum})</span><br />
              {
                kplusTime.split("-")[1] === "D" && kplusTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {kplusTime.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {kplusTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='Potassium (K+) Graph' >
                { console.log("runnnnnnnnn", typeof kplusId) }
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === kplusId) {

                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [kplusId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "Potassium (K+) Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : 'N/A'}

          </div>
        </td>
      }

      {props.visibilitpropsright.naplusVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ?
              naplus ?
                <span>
                  <span style={{ color: naplusColor }}>{naplus}</span> {naplusSerum ? <span style={{ color: naplusSerumColor }}>({naplusSerum})</span> : ""}<br />
                  {
                    naplusTime.split("-")[1] === "D" && naplusTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {naplusTime.toLowerCase().replace("-", "")}</span>
                      : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {naplusTime.toLowerCase().replace("-", "")}</span>}
                  <br />
                  <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='Sodium (Na+) Graph' >
                    {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                      if (val.SubtestID === parseInt(naplusId)) {
                        return (
                          <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                        )
                      }
                    })}
                    <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [naplusId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "Sodium (Na+) Graph", patientName: props.patientData.PntName }) }}></i></div>

                </span> : 'N/A' : 'N/A'}
          </div>
        </td>
      }

      {props.visibilitpropsright.mgVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? mg ? <span>
              <span style={{ color: mgColor }}>{mg}</span><br />
              {
                mgTime.split("-")[1] === "D" && mgTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {mgTime.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {mgTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='Magnesium (Mg) Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === mgId) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [mgId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "Magnesium (Mg) Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : 'N/A'}

          </div>
        </td>
      }
      {props.visibilitpropsright.phVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? ph ? <span>
              <span style={{ color: phColor }}>{ph}</span><br />

              {
                phTime.split("-")[1] === "D" && phTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {phTime.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {phTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='PH Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === phId) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [phId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "PH Graph", patientName: props.patientData.PntName }) }}></i></div>

              {/* <span>{ph_time}</span> */}
            </span> : 'N/A' : "N/A"}

          </div>
        </td>
      }
      {props.visibilitpropsright.pco2Visibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? pco2 ? <span>
              <span style={{ color: pco2Color }}>{pco2}</span><br />
              {
                pco2Time.split("-")[1] === "D" && pco2Time.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {pco2Time.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {pco2Time.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='PCO2 Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === pco2Id) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [pco2Id], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "PCO2 Graph", patientName: props.patientData.PntName }) }}></i></div>

              {/* <span>{pco2_time}</span> */}
            </span> : 'N/A' : "N/A"}

          </div>
        </td>
      }
      {props.visibilitpropsright.etco2Visibility &&

        <td>
          <div className="overflow-max investigations">
            <span style={{ color: etco2Color }}>{etco2}</span><br />

            {/* <span>{etco2_time}</span> */}

          </div>
        </td>
      }
      {props.visibilitpropsright.po2Visibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? po2 ? <span>
              <span style={{ color: po2Color }}>{po2}</span><br />
              {
                po2Time.split("-")[1] === "D" && po2Time.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {po2Time.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {po2Time.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='PO2 Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === po2Id) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [po2Id], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "PO2 Graph", patientName: props.patientData.PntName }) }}></i></div>

              {/* <span>{po2_time}</span> */}
            </span> : 'N/A' : "N/A"}

          </div>
        </td>
      }
      {props.visibilitpropsright.lactateVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? lactate ? <span>
              <span style={{ color: lactateColor }}>{lactate}</span><br />
              {
                lactateTime.split("-")[1] === "D" && lactateTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {lactateTime.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {lactateTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='LACTATE Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === lactateId) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [lactateId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "LACTATE Graph", patientName: props.patientData.PntName }) }}></i></div>

              {/* <span>{lactate_time}</span> */}
            </span> : 'N/A' : 'N/A'}

          </div>
        </td>
      }

      {props.visibilitpropsright.hco3Visibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? hco3 ? <span>
              <span style={{ color: hco3Color }}>{hco3}</span><br />
              {
                hco3Time.split("-")[1] === "D" && hco3Time.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {hco3Time.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {hco3Time.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='HCO3 Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === hco3Id) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [hco3Id], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "HCO3 Graph", patientName: props.patientData.PntName }) }}></i></div>

              {/* <span>{hco3_time}</span> */}
            </span> : 'N/A' : 'N/A'}
          </div>
        </td>
      }
      {props.visibilitpropsright.rbsVisibility &&

        <td>
          <div className="overflow-max vitalClass">
            {vitals.length != 0 ? rbs ? <span>
              <span style={{ color: rbsColor }}>{rbs}</span><br />
              {
                rbsTime.split("-")[1] === "D" || (rbsTime.split("-")[0].split(":")[0] >= 2 && rbsTime.split("-")[1] === "H") ? <span style={{ 'color': 'red', fontSize: "0.7rem" }} className="blink"><i className="bi bi-clock"></i> {rbsTime.toLowerCase().replace("-", "")}</span>

                  : (rbsTime.split(":")[0] >= 1 && rbsTime.split("-")[1] === "H") ? <span style={{ "color": 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {rbsTime.toLowerCase().replace("-", "")}</span>

                    : (rbsTime.split("-")[0].split(":")[0] <= 1 && rbsTime.split("-")[1] === "H") || (rbsTime.split("-")[0] >= 10 && rbsTime.split("-")[1] === "M") ? <span style={{ 'color': '#ffa500', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {rbsTime}</span> : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {rbsTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="" title='RBS Graph' ><i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapVitalData({ showGrap: 1, vitalIdSearchNew: [rbsId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "RBS Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : "N/A"}
          </div>
        </td>
      }
      {props.visibilitpropsright.tempVisibility &&

        <td>
          <div className="overflow-max vitalClass">
            {vitals.length != 0 ? temp ? <span>
              <span style={{ color: tempColor }}>{temp}</span><br />
              {
                tempTime.split("-")[1] === "D" || (tempTime.split("-")[0].split(":")[0] >= 2 && tempTime.split("-")[1] === "H") ? <span style={{ 'color': 'red', fontSize: "0.7rem" }} className="blink"><i className="bi bi-clock"></i> {tempTime.toLowerCase().replace("-", "")}</span>

                  : (tempTime.split(":")[0] >= 1 && tempTime.split("-")[1] === "H") ? <span style={{ "color": 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {tempTime.toLowerCase().replace("-", "")}</span>

                    : (tempTime.split("-")[0].split(":")[0] <= 1 && tempTime.split("-")[1] === "H") || (tempTime.split("-")[0] >= 10 && tempTime.split("-")[1] === "M") ? <span style={{ 'color': '#ffa500', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {tempTime}</span> : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {tempTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="" title='Temperature Graph' ><i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapVitalData({ showGrap: 1, vitalIdSearchNew: [tempId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "Temperature Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : "N/A"}
          </div>
        </td>
      }
      {props.visibilitpropsright.creatinineVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? creatinine ? <span>
              <span style={{ color: creatinineColor }}>{creatinine}</span><br />
              {
                creatinineTime.split("-")[1] === "D" && creatinineTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {creatinineTime.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {creatinineTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='Creatinine Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === creatinineId) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [creatinineId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "Creatinine Graph", patientName: props.patientData.PntName }) }}></i></div>

              {/* <span >{creatinine_time}</span> */}
            </span> : 'N/A' : 'N/A'}

          </div>
        </td>
      }
      {props.visibilitpropsright.bureaVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? burea ? <span>
              <span style={{ color: bureaColor }}>{burea}</span><br />
              {
                bureaTime.split("-")[1] === "D" && bureaTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {bureaTime.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {bureaTime.toLowerCase().replace("-", "")}</span>}
              {/* <span >{burea_time}</span> */}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='Blood Urea Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === bureaId) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [bureaId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "Blood Urea Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : "N/A"}

          </div>
        </td>
      }
      {props.visibilitpropsright.ioVisibility &&

        <td>
          <div className="overflow-max investigations">
            <span style={{ color: ioColor }}>

              {
                props.patientData.PatientInputOutputList !== null && props.patientData.PatientInputOutputList !== undefined ?
                  props.patientData.PatientInputOutputList[0].Input + "/" + props.patientData.PatientInputOutputList[0].Output
                  : ""

              }

            </span><br />
            {/* {
        po2_time.split("-")[1] === "D" || (po2_time.split("-")[0].split(":")[0] >= 2 && po2_time.split("-")[1] === "H") ? <span style={{ 'color': 'red' }} className="blink">{po2_time}</span>

        : (po2_time.split(":")[0] >= 1 && po2_time.split("-")[1] === "H") || (po2_time.split(":")[0] >= 10 && po2_time.split(":")[1] === "M") ? <span style={{ "color": 'red' }}>{po2_time}</span>

            : <span style={{ 'color': 'green' }}>{po2_time}</span>} */}
            {/* <span >{io_time}</span> */}

          </div>
        </td>
      }

      {props.visibilitpropsright.sgotVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? sgot ? <span>
              <span style={{ color: sgotColor }}>{sgot}</span><br />
              {
                sgotTime.split("-")[1] === "D" && sgotTime.split("-")[0] >= 4 ? <span style={{ 'color': 'red' }} className="blink">{sgotTime.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {sgotTime.toLowerCase().replace("-", "")}</span>}
              {/* <span >{sgot_time}</span> */}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='S.G.O.T Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === sgotId) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [sgotId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "S.G.O.T Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : "N/A"}
          </div>
        </td>
      }
      {props.visibilitpropsright.sgptVisibility &&

        <td>
          <div className="overflow-max investigations">
            {investigations.length != 0 ? sgpt ? <span>
              <span style={{ color: sgptColor }}>{sgpt}</span><br />
              {
                sgptTime.split("-")[1] === "D" && sgptTime.split("-")[0] ? <span style={{ 'color': 'red', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {sgptTime.toLowerCase().replace("-", "")}</span>
                  : <span style={{ 'color': 'green', fontSize: "0.7rem" }}><i className="bi bi-clock"></i> {sgptTime.toLowerCase().replace("-", "")}</span>}
              <br />
              <div className="d-flex flex-row gap-2 justify-content-center pt-1" title='S.G.P.T Graph' >
                {props.patientData.PatientFluidBottleList && props.patientData.PatientFluidBottleList.map((val, ind) => {
                  if (val.SubtestID === sgptId) {
                    return (
                      <i className='fa-solid fa-bottle-droplet ' style={{ color: "#75eafd", fontSize: "16px" }}></i>
                    )
                  }
                })}
                <i className="fas fa-chart-line text-white pointer" onClick={() => { props.setGrapInvestigationlData({ showGrap: 1, subTestId: [sgptId], UHID: uhId, userId: JSON.parse(window.sessionStorage.getItem("LoginData"))['userId'], name: "S.G.P.T Graph", patientName: props.patientData.PntName }) }}></i></div>

            </span> : 'N/A' : "N/A"}
          </div>
        </td>
      }
    </tr>

  )
}
