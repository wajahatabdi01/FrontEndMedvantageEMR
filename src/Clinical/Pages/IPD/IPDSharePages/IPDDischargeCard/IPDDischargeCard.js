import React, { useEffect, useState } from "react";
import IPDDischargeBottom from "./IPDDischargeBottom";
import IPDDischargeRightSide from "./IPDDischargeRightSide";
import DischargeComplain from "./DischargeComplain";
import DischargeMedication from "./DischargeMedication";
import IPDBottomButtons from "./IPDBottomButtons";
import GetDischargeCard from "./API/GetDischargeCard";

export default function IPDDischargeCard() {
  let [allData, sendAllData] = useState([]);
  let [allMedication, sendAllMedication] = useState([]);
  let [allComplain, sendAllComplain] = useState([]);
  let [allBtnData, sendAllBtnData] = useState([]);
  let [followUpDate, setFollowUpDate] = useState("");
  let [dischargeType, setDischargeType] = useState("");
  let [getAllData, setGetAllData] = useState([]);

  let [sendprocedure, setsendProcedure] = useState();
  let [sendremarks, setsendRemarks] = useState();
  let [sendinvestigation, setsendInvestigation] = useState();


  return (
    <>
      <div className="row">
        <div className="col-md-8 col-sm-12 plt1">
          {/* <DischargeComplain sendAllComplain={allComplain}/> */}
          <DischargeComplain
            sendAllComplain={sendAllComplain}
            getAllData={getAllData}
          />
          <DischargeMedication
            sendAllMedication={sendAllMedication}
            getAllData={getAllData}
          />
          <IPDBottomButtons
            sendAllBtnData={sendAllBtnData}
            followUpDate={setFollowUpDate}
            dischargeType={setDischargeType}
          />
        </div>
        <div className="col-md-4 col-sm-12 prt1">
          <IPDDischargeRightSide setsendProcedure={setsendProcedure} setsendRemarks={setsendRemarks} setsendInvestigation={setsendInvestigation}/>
          <IPDDischargeBottom
            allMedication={allMedication}
            allComplain={allComplain}
            allBtnData={allBtnData}
            followUpDate={followUpDate}
            dischargeType={dischargeType}
            sendprocedure={sendprocedure}
            sendremarks={sendremarks}
            sendinvestigation={sendinvestigation}
          />
        </div>
      </div>
    </>
  );
}
