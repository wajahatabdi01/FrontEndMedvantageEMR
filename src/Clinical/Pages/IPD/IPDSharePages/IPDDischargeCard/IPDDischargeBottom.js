import React, {useState} from "react";
import PostDischargeCard from "./API/PostDischargeCard";
import { Link, useNavigate } from 'react-router-dom'
import GetDischargeCard from "./API/GetDischargeCard";
import { useEffect } from "react";
import save from '../../../../../assets/images/icons/save.svg'
import print from '../../../../../assets/images/icons/print.svg'
import clear from '../../../../../assets/images/icons/clear.svg'
import bed from '../../../../../assets/images/icons/bed.svg'
import SuccessToster from "../../../../../Component/SuccessToster";
import AlertToster from "../../../../../Component/AlertToster";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function IPDDischargeBottom(props) {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  const navigate = new useNavigate();
  let [showToster, setShowToster] = useState(0)
  let [showAlertToster, setShowAlertToster] = useState(0)
  let [showMessage, setShowMessage] = useState(0)
  let handleSave = async () => {
    if(props.followUpDate === "" || props.followUpDate === null || props.followUpDate === undefined){
      setShowAlertToster(1);
      setShowMessage(t('Please Select Follow-Up-Date '));
    }
    else{
    let procedure = {
      problemId: 0,
      problemName: props.sendprocedure,
      pdmId: 5,
    };
    let sendremarks = {
      problemId: 0,
      problemName: props.sendremarks,
      pdmId: 12,
    };
    let sendinvestigation = {
      problemId: 0,
      problemName: props.sendinvestigation,
      pdmId: 13,
    };
    props.allComplain.push(procedure);
    props.allComplain.push(sendremarks);
    props.allComplain.push(sendinvestigation);
    // props.allMedication.pop()

    var obj = {
      JsonMedication: JSON.stringify(props.allMedication),
      JsonDaignosis: JSON.stringify(props.allComplain),
      followUpDate: props.followUpDate,
      dischargeTypeId: 2,
      // DischargeType:props.DischargeType,
      uhID: window.JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid,
      // uhID:'UHID00287',
      deptID: 1,
      userID: window.userId,
    };

    console.log("object", obj);

    let reponse = await PostDischargeCard(obj);
    console.log("reponse", reponse);
    if (reponse.status === 1) {
      window.sessionStorage.setItem(
        "PrintDischarge",
        JSON.stringify({
          allMedication: props.allMedication,
          allComplain: props.allComplain,
          followUpDate: props.followUpDate,
          dischargeTypeId: 2,
          uhID: window.JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid,
          deptID: 1,
          userID: window.userId,
        })
      );
      setShowToster(1);
      setTimeout(()=>{
        window.open("/printDischargeCard/", "noopener,noreferrer");
    },1500);
      
    }
  else{
    setShowAlertToster(1);
    setShowMessage(reponse.responseValue);
  }
   
  }
  };

  let handleDischarge = async () => {
     if(props.followUpDate === "" || props.followUpDate === null || props.followUpDate === undefined){
       setShowAlertToster(1);
       setShowMessage(t('Please Select Follow-Up-Date '));
     }
    // else if(props.sendremarks === "" || props.sendremarks === null || props.sendremarks === undefined){
    //   setShowAlertToster(1);
    //   setShowMessage('Fill Additional Remarks..!!');
    // }
    // else if(props.sendinvestigation === "" || props.sendinvestigation === null || props.sendinvestigation === undefined){
    //   setShowAlertToster(1);
    //   setShowMessage('Fill Additional Investigation..!!');
    // }
     else{
      
    
    console.log("testname", props.sendprocedure);
    console.log(
      "data allMedication",
      props.allMedication,
      "data allComplain",
      props.allComplain
    );
    // props.allMedication.pop()
    console.log("after pop", props.allMedication);
    console.log("after sendprocedure", props.sendprocedure);
    console.log("after sendremarks", props.sendremarks);
    console.log("after sendinvestigation", props.sendinvestigation);
    let procedure = {
      problemId: 0,
      problemName: props.sendprocedure,
      pdmId: 5,
    };
    let sendremarks = {
      problemId: 0,
      problemName: props.sendremarks,
      pdmId: 12,
    };
    let sendinvestigation = {
      problemId: 0,
      problemName: props.sendinvestigation,
      pdmId: 13,
    };
    props.allComplain.push(procedure);
    props.allComplain.push(sendremarks);
    props.allComplain.push(sendinvestigation);

    var obj = {
      JsonMedication: JSON.stringify(props.allMedication),
      JsonDaignosis: JSON.stringify(props.allComplain),
      followUpDate: props.followUpDate,
      dischargeTypeId: 2,
      // DischargeType:props.DischargeType,
      uhID: window.JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid,
      // uhID:'UHID00287',
      deptID: 1,
      userID: window.userId,
    };
    console.log("object", obj);

    let reponse = await PostDischargeCard(obj);
    console.log("reponse", reponse);
      if(reponse.status === 1){
        setShowToster(1);
        setTimeout(()=>{
            navigate("/ipdpatientlist/");
        },1500);
      }
      else{
        setShowAlertToster(1);
        setShowMessage(reponse.responseValue);
      }
    }
    
    
  };
  let  handleLastPrint =()=>{
    console.log("cdsjbcsdh")
    window.open("/printDischargeCard/", "noopener,noreferrer");
  }

  return (
    <div className={`boxcontainer mt-1 boxs disrt`} >
      <div className="d-flex flex-row align-items-center flex-wrap gap-2 ipddisbtn" style={{ "justifyContent": "center"}}>
        {/* <button className="btn btn-save btn-sm btnbluehover">
        <img src={clear} className="icnn" alt=""/>Clear
        </button> */}
        
        
        {/* <button className="btn btn-save btn-sm btnbluehover" onClick={handleLastPrint}>
        <img src={print} className="icnn" alt="" /> Last Print
        </button> */}
        

        {/* <Link to='/ipdpatientlist/'> */}
        {/* <button className="btn btn-save btn-sm btnbluehover" onClick={handleDischarge}>
          <img src={bed} className="icnn" alt=""/> Discharge
        </button> */}

        {/* </Link> */}

        <button className="btn btn-save btn-sm btn-save-fill"  onClick={handleSave}>
          <img src={save} className="icnn" alt=""/>{t("Discharge_Print")}
        </button>
      </div>
      {
                    showToster === 1 ?
                        <SuccessToster handle={setShowToster} message={t("Patient_Discharge_SuccessFully")} /> : ""
                }
               
                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
                }
    </div>
  );
}
