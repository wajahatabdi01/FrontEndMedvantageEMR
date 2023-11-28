import React, { useState } from "react";

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


  let getData = async ()=>{
    
  }