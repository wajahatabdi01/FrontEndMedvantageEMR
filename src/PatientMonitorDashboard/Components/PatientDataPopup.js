import React from "react";
import Patientavtar from "../../assets/images/patientmonitordashboard/patientavtar.png";
import { useEffect, useState } from "react";
import BoxHeading from "./BoxHeading";
// import { useSelector } from "react-redux";

export default function PatientDataPopup(props) {

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

  let [nplusSerum, setNplusSerum] = useState("");
  let [nplusSerumId, setNplusSerumId] = useState("");
  let [nplusSerumTime, setNplusSerumTime] = useState("");
  let [nplusSerumColor, setNplusSerumColor] = useState("");
  let [vitals, setVitals] = useState([])
  let [investigations, setInvestigations] = useState([])
  let [data, setData] = useState([])
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

    setBpSys()
    setBpDys()
    setPr()
    setTemp()
    setRbs()
    setRr()
    setHr()
    setSpo2(); setKplus(); setNaplus(); setAlb(); setCaplus(); setPh(); setPco2(); setPo2(); setLactate(); setHco3();
    setCreatinine(); setBurea(); setSgpt(); setSgot(); setCaplus(); setKplusSerum(); setNplusSerum(); setMg();
    setPh(); setPco2(); setPo2(); setHco3(); setSgot(); setSgpt(); setLactate();
    // set vital data
    vitals.map((vital) => {

      if (vital.VitalID.toString() === "4") {
        setBpSys(vital.VitalValue)
        setBpSysColor(vital.VitalColor)
        setBpSysId(vital.VitalID)
        setUhId(props.patientData.UhId)
        if (vital.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())
          let currentTimeSec = parseInt(date.getSeconds())



          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(vital.VitalDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                setBpSysTime(hh + ":" + mm + "-Hr")
              }
              else {

                setBpSysTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setBpSysTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(vital.VitalDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setBpSysTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (vital.VitalID.toString() === "6") {
        setBpDys(vital.VitalValue)
        setBpDysColor(vital.VitalColor)
        setBpDysId(vital.VitalID)
        setUhId(props.patientData.UhId)
        setBpMap(Math.round((bpSys + (2 * vital.VitalValue)) / 3, 2))

        if (vital.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())
          let currentTimeSec = parseInt(date.getSeconds())



          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(vital.VitalDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                setBpDysTime(hh + ":" + mm + "-Hr")
              }
              else {

                setBpDysTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setBpDysTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(vital.VitalDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setBpSysTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (vital.VitalID.toString() === "3") {
        setPr(vital.VitalValue);
        setPrColor(vital.VitalColor);
        setPrId("3")
        setUhId(props.patientData.UhId)


        if (vital.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())
          let currentTimeSec = parseInt(date.getSeconds())



          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(vital.VitalDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"

                setPrTime(hh + ":" + mm + "-Hr")
              }
              else {

                setPrTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setPrTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(vital.VitalDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setPrTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }
      }
      if (vital.VitalID.toString() === "5") {
        setTemp(vital.VitalValue)
        setTempColor(vital.VitalColor)
        setTempId(vital.VitalID)
        setUhId(props.patientData.UhId)


        if (vital.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())
          let currentTimeSec = parseInt(date.getSeconds())



          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(vital.VitalDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                setTempTime(hh + ":" + mm + "-Hr")
              }
              else {

                setTempTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setTempTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(vital.VitalDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setTempTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (vital.VitalID.toString() === "10") {
        setRbs(vital.VitalValue)
        setRbsColor(vital.VitalColor)
        setRbsId(vital.VitalID)
        setUhId(props.patientData.UhId)


        if (vital.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())
          let currentTimeSec = parseInt(date.getSeconds())



          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(vital.VitalDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                setRbsTime(hh + ":" + mm + "-Hr")
              }
              else {

                setRbsTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setRbsTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(vital.VitalDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setRbsTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (vital.VitalID.toString() === "7") {
        setRr(vital.VitalValue)
        setRrColor(vital.VitalColor)
        setRrId(vital.VitalID)
        setUhId(props.patientData.UhId)

        if (vital.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())
          let currentTimeSec = parseInt(date.getSeconds())



          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(vital.VitalDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                setRrTime(hh + ":" + mm + "-Hr")
              }
              else {

                setRrTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setRrTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(vital.VitalDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setRrTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (vital.VitalID.toString() === "74") {
        setHr(vital.VitalValue)
        setHrColor(vital.VitalColor)
        setHrId(vital.VitalID)
        setUhId(props.patientData.UhId)


        if (vital.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())
          let currentTimeSec = parseInt(date.getSeconds())



          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(vital.VitalDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                setHrTime(hh + ":" + mm + "-Hr")
              }
              else {

                setHrTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setHrTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(vital.VitalDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setHrTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (vital.VitalID.toString() === "56") {
        setSpo2(vital.VitalValue)
        setSpo2Color(vital.VitalColor)
        setSpo2Id(vital.VitalID)
        setUhId(props.patientData.UhId)


        if (vital.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(vital.VitalDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(vital.VitalDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())
          let currentTimeSec = parseInt(date.getSeconds())



          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(vital.VitalDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                setSpo2Time(hh + ":" + mm + "-Hr")
              }
              else {

                setSpo2Time((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setSpo2Time(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(vital.VitalDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setSpo2Time(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }

    })



    investigations && investigations.map((investigation) => {
      if (investigation.SubTestID.toString() == "611") {
        setKplus(investigation.SubTestValue)
        setKplusColor(investigation.SubTestColor)
        setKplusId("611")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setKplusTime(hh + ":" + mm + "-Hr")
              }
              else {

                setKplusTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setKplusTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setKplusTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "610") {
        setNaplus(investigation.SubTestValue)
        setNaplusColor(investigation.SubTestColor)
        setNaplusId("610")
        setUhId(props.patientData.UhId)
        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setNaplusTime(hh + ":" + mm + "-Hr")
              }
              else {

                setNaplusTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setNaplusTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setNaplusTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "206") {
        setAlb(investigation.SubTestValue)
        setAlbColor(investigation.SubTestColor)
        setAlbId("206")
        setUhId(props.patientData.UhId)
        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setAlbTime(hh + ":" + mm + "-Hr")
              }
              else {

                setAlbTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setAlbTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setAlbTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }
      }
      if (investigation.SubTestID.toString() == "612") {
        setCaplus(investigation.SubTestValue)
        setCaplusColor(investigation.SubTestColor)
        setCaplusId("612")
        setUhId(props.patientData.UhId)
        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setCaplusTime(hh + ":" + mm + "-Hr")
              }
              else {

                setCaplusTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setCaplusTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setCaplusTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "607") {
        setPh(investigation.SubTestValue)
        setPhColor(investigation.SubTestColor)
        setPhId("607")
        setUhId(props.patientData.UhId)
        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setPhTime(hh + ":" + mm + "-Hr")
              }
              else {

                setPhTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setPhTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setPhTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "608") {
        setPco2(investigation.SubTestValue)
        setPco2Color(investigation.SubTestColor)
        setPco2Id("608")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setPco2Time(hh + ":" + mm + "-Hr")
              }
              else {

                setPco2Time((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setPco2Time(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setPco2Time(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "609") {
        setPo2(investigation.SubTestValue)
        setPo2Color(investigation.SubTestColor)
        setPo2Id("609")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setPo2Time(hh + ":" + mm + "-Hr")
              }
              else {

                setPo2Time((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setPo2Time(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setPo2Time(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "614") {
        setLactate(investigation.SubTestValue)
        setLactateColor(investigation.SubTestColor)
        setLactateId("614")
        setUhId(props.patientData.UhId)
        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setLactateTime(hh + ":" + mm + "-Hr")
              }
              else {

                setLactateTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setLactateTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setLactateTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "613") {
        setHco3(investigation.SubTestValue)
        setHco3Color(investigation.SubTestColor)
        setHco3Id("613")
        setUhId(props.patientData.UhId)
        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setHco3Time(hh + ":" + mm + "-Hr")
              }
              else {

                setHco3Time((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setHco3Time(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setHco3Time(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "497") {
        setCreatinine(investigation.SubTestValue)
        setCreatinineColor(investigation.SubTestColor)
        setCreatinineId("497")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setCreatinineTime(hh + ":" + mm + "-Hr")
              }
              else {

                setCreatinineTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setCreatinineTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setCreatinineTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "496") {
        setBurea(investigation.SubTestValue)
        setBureaColor(investigation.SubTestColor)
        setBureaId("496")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setBureaTime(hh + ":" + mm + "-Hr")
              }
              else {

                setBureaTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setBureaTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setBureaTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "742") {
        setSgpt(investigation.SubTestValue)
        setSgptColor(investigation.SubTestColor)
        setSgptId("742")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setSgptTime(hh + ":" + mm + "-Hr")
              }
              else {

                setSgptTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setSgptTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setSgptTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "743") {
        setSgot(investigation.SubTestValue)
        setSgotColor(investigation.SubTestColor)
        setSgotId("743")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setSgotTime(hh + ":" + mm + "-Hr")
              }
              else {

                setSgotTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setSgotTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setSgotTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "187") {
        setCaplus(investigation.SubTestValue)
        setCaplusColor(investigation.SubTestColor)
        setCaplusId("187")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setCaplusTime(hh + ":" + mm + "-Hr")
              }
              else {

                setCaplusTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setCaplusTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setCaplusTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "499") {
        setKplusSerum(investigation.SubTestValue)
        setKplusSerumColor(investigation.SubTestColor)
        setKplusSerumId("499")
        setUhId(props.patientData.UhId)
      }
      if (investigation.SubTestID.toString() == "498") {
        setNplusSerum(investigation.SubTestValue)
        setNplusSerumColor(investigation.SubTestColor)
        setNplusSerumId("498")
        setUhId(props.patientData.UhId)
      }
      if (investigation.SubTestID.toString() == "250") {
        setMg(investigation.SubTestValue)
        setMgColor(investigation.SubTestColor)
        setMgId("250")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setMgTime(hh + ":" + mm + "-Hr")
              }
              else {

                setMgTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setMgTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setMgTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "607") {
        setPh(investigation.SubTestValue)
        setPhColor(investigation.SubTestColor)
        setPhId("607")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setPhTime(hh + ":" + mm + "-Hr")
              }
              else {

                setPhTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setPhTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setPhTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "608") {
        setPco2(investigation.SubTestValue)
        setPco2Color(investigation.SubTestColor)
        setPco2Id("608")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setPco2Time(hh + ":" + mm + "-Hr")
              }
              else {

                setPco2Time((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setPco2Time(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setPco2Time(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "609") {
        setPo2(investigation.SubTestValue)
        setPo2Color(investigation.SubTestColor)
        setPo2Id("609")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setPo2Time(hh + ":" + mm + "-Hr")
              }
              else {

                setPo2Time((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setPo2Time(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setPco2Time(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "617") {
        setHco3(investigation.SubTestValue)
        setHco3Color(investigation.SubTestColor)
        setHco3Id("617")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setHco3Time(hh + ":" + mm + "-Hr")
              }
              else {

                setHco3Time((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setHco3Time(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setHco3Time(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "743") {
        setSgot(investigation.SubTestValue)
        setSgotColor(investigation.SubTestColor)
        setSgotId("743")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setSgotTime(hh + ":" + mm + "-Hr")
              }
              else {

                setSgotTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setSgotTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setSgotTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "742") {
        setSgpt(investigation.SubTestValue)
        setSgptColor(investigation.SubTestColor)
        setSgptId("742")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setSgptTime(hh + ":" + mm + "-Hr")
              }
              else {

                setSgptTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setSgptTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setSgptTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }
      if (investigation.SubTestID.toString() == "614") {
        setLactate(investigation.SubTestValue)
        setLactateColor(investigation.SubTestColor)
        setLactateId("614")
        setUhId(props.patientData.UhId)

        if (investigation.VitalDateTime !== '') {
          let date = new Date()
          let oldYear = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[0])
          let oldMonth = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[1])
          let oldDate = parseInt(investigation.SubTestDateTime.split(" ")[0].split("-")[2])
          let oldtimeHr = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[0])
          let oldtimeMin = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[1])
          let oldtimeSec = parseInt(investigation.SubTestDateTime.split(" ")[1].split(":")[2])

          let currentYear = parseInt(date.getFullYear())
          let currentMonth = parseInt(date.getMonth()) + 1
          let currentDate = parseInt(date.getDate())
          let currentTimeHr = parseInt(date.getHours())
          let currentTimeMin = parseInt(date.getMinutes())

          let currentTimeSec = parseInt(date.getSeconds())

          if ((currentMonth - oldMonth) === 0) {
            // if same month
            if ((currentDate - oldDate) === 0) {
              // if same day
              if ((currentTimeHr - oldtimeHr) > 0) {
                let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate + " " + currentTimeHr + ":" + currentTimeMin + ":" + currentTimeSec)
                let oldFullDate = new Date(investigation.SubTestDateTime)
                let diffDate = Math.abs(currentFullDate - oldFullDate)

                var msec = diffDate;
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                msec -= mm * 1000 * 60;
                var ss = Math.floor(msec / 1000);
                msec -= ss * 1000;
                // spo2_time = Math.abs(currentTimeHr - oldtimeHr) + ":" + Math.abs(currentTimeMin - oldtimeMin) + "-Hr"
                setLactateTime(hh + ":" + mm + "-Hr")
              }
              else {

                setLactateTime((currentTimeMin - oldtimeMin) + "-Min")
              }
            }

            // if not same day
            else {

              setLactateTime(Math.abs(currentDate - oldDate) + "-D")

            }
          }

          // if month not same
          else {
            let currentFullDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate)
            let oldFullDate = new Date(investigation.SubTestDateTime.split(" ")[0])
            let diffDate = Math.abs(currentFullDate - oldFullDate)

            setLactateTime(Math.round(diffDate / (1000 * 3600 * 24)) + "-D")
          }
        }

      }

    })


    setData(setVitalDataPoup)




  }

  useEffect(() => {
    createData();
  }, []);
  return (
    <div
      className={`modal d-${props.patientpopup === 0 ? "none" : "block"}`}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ "backdrop-filter": "blur(8px)" }}>
      <div className="modal-dialog modal-dialog-top modal-xl">
        <div className="modal-content">
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
            onClick={props.modelCloseFun}>
            <label
              className="text-center pt-2"
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "15px",
                backgroundColor: "red",
                cursor: "pointer",
              }}>
              X
            </label>
          </span>
          <BoxHeading title="Patient Details" />
          <div className="mt-1 ps-3 pe-3 row pt-2">
            <div className="col-4">
              <div className="patdetls">
                <div className="d-flex flex-row justify-content-center pb-2">
                  <img
                    src={Patientavtar}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <table className="table-regular-second">
                  <thead>
                    <tr>
                      <th className="text-center">UHID:</th>
                      <th className="text-center">{props.patientData.UhId}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">Patient Name:</td>
                      <td className="">{props.patientData.PntName}</td>
                    </tr>
                    <tr>
                      <td className="">Age/Gender:</td>
                      <td className="">
                        {props.patientData.PntAge}/{props.patientData.PntGender}
                      </td>
                    </tr>
                    <tr>
                      <td className="">Consultant:</td>
                      <td className="">{props.patientData.Consultant}</td>
                    </tr>
                    <tr>
                      <td className="">Department:</td>
                      <td className="">{props.patientData.PtDep}</td>
                    </tr>
                    <tr>
                      <td className="">Ward/Bed:</td>
                      <td className="">
                        {props.patientData.Ward}/{props.patientData.PtBed}
                      </td>
                    </tr>
                    <tr>
                      <td className="">Patient Admit Date:</td>
                      <td className="">
                        {props.patientData.PtAdmitDays.split(" ")[0]}
                      </td>
                    </tr>
                    <tr>
                      <td className="">Patient Admit Time:</td>
                      <td className="">
                        {props.patientData.PtAdmitDays.split(" ")[1]}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-8 vital-topp">
              <div className="vitalstop">


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${bpSysColor}`, color: bpSysColor }}>
                        BP
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span >{bpSys}/{bpDys}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "50%", backgroundColor: bpSysColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${spo2Color}`, color: spo2Color }}>
                        SPO2
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{spo2}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: spo2Color }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>

                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${rrColor}`, color: rrColor }}>
                        RR
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{rr}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: rrColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${hrColor}`, color:hrColor }}>
                        HR
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{hr}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: hrColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>

                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${prColor}`, color:prColor }}>
                        PR
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{pr}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: prColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${albColor}`, color:albColor }}>
                        ALB
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{alb}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: albColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${caplusColor}`, color:caplusColor }}>
                        Ca++
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{caplus}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: caplusColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${kplusColor}`, color:kplusColor }}>
                        K+
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{kplus}({kplusSerum})</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: kplusColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>

                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${naplusColor}`, color:naplusColor }}>
                        Na+
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{naplus}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: naplusColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${mgColor}`, color:mgColor }}>
                        Mg
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{mg}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: mgColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${phColor}`, color:phColor }}>
                        PH
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{ph}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: phColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>

                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${pco2Color}`, color:pco2Color }}>
                        PCO2
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{pco2}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: pco2Color }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>

                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${etco2Color}`, color:etco2Color }}>
                        EtCO2
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{etco2}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: etco2Color }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>
                


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${po2Color}`, color:po2Color }}>
                        PO2
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{po2}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: po2Color }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>

                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${lactateColor}`, color:lactateColor }}>
                        LACTATE
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{lactate}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: lactateColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${hco3Color}`, color:hco3Color }}>
                        HCO3
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{hco3}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: hco3Color }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${rbsColor}`, color:rbsColor }}>
                        RBS
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{rbs}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: rbsColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${tempColor}`, color:tempColor }}>
                        Temp
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{temp}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: tempColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${creatinineColor}`, color:creatinineColor }}>
                        Creatinine
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{creatinine}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: creatinineColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>



                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${bureaColor}`, color:bureaColor }}>
                        B Urea
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{burea}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: bureaColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>


                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${ioColor}`, color:ioColor }}>
                        	I/O
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{io}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: ioColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>



                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${sgotColor}`, color:sgotColor }}>
                        	SGOT
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{sgot}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: sgotColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>



                <div className="vitlcont">
                  <div className="vitals-card">
                    <div className="albname-hed">
                      <div
                        className="albname"
                        style={{ border: `3px solid ${sgptColor}`, color:sgptColor }}>
                        	SGPT
                      </div>
                    </div>
                    <div className="albname-hed">
                      <span className="val-amb">
                        <span>{sgpt}</span>
                      </span>
                    </div>
                  </div>
                  <div className="progress prgsdtls">
                    <div
                      className="progress-bar bg-custome"
                      role="progressbar"
                      style={{ width: "25%", backgroundColor: sgptColor }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">

                    </div>
                  </div>
                </div>
                



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
