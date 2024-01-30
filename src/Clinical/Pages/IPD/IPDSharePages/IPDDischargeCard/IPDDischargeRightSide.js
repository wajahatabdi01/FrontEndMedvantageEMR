import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Heading from "../../../../../Component/Heading";
import { EditorState } from "draft-js";
import GetDischargePatientList from "../../../../API/IPD/GetDischargePatientList";
import GetDischargeCard from "./API/GetDischargeCard";
import Loder from "../../../../../Component/Loader";
import TextEditor from "../../../../../Component/TextEditor";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";




export default function IPDDischargeRightSide(props) {

  const {t} = useTranslation();
  document.body.dir = i18n.dir()
  let [procedure, setProcedure] = useState();
  let [remarks, setRemarks] = useState();
  let [investigation, setInvestigation] = useState("");
  let [loader, setLoader] = useState(1)


  let handleChange = (e) => {
    if (e.target.name === "procedure") {
      setProcedure(e.target.value);
      props.setsendProcedure(e.target.value);
    } else if (e.target.name === "remarks") {
      setRemarks(e.target.value);
      props.setsendRemarks(e.target.value);
    } else {
      setInvestigation(e.target.value);
      props.setsendInvestigation(e.target.value);
      setInvestigation(e.target.value)
    }
  };
  let getDischarge = async () => {
    let procedure = "";
    let remark = "";
    let invest = "";
    let UhId = JSON.parse(
      window.sessionStorage.getItem("IPDactivePatient")
    ).Uhid;
    let DischargeTypeId = 2;
   
    let response = await GetDischargeCard(UhId, DischargeTypeId);
    
    if (response.status === 1) {
      response.responseValue.patientComplainHistory.map((val, ind) => {
        if (val.pdmId === 5) {
          setProcedure(val.problemName);
          props.setsendProcedure(val.problemName)

        } else if (val.pdmId === 12) {
          setRemarks(val.problemName);
          props.setsendRemarks(val.problemName)

        } else if (val.pdmId === 13) {
          setInvestigation(val.problemName);
          props.setsendInvestigation(val.problemName)


        }
      });
      
      // setProcedure(procedure);
      // setRemarks(remark);
      // setInvestigation(invest);
    }
    setLoader(0)
  };



  useEffect(() => {
    setLoader(1)
    getDischarge();
  }, []);


  return (
    <div className="dischargrcnt">
      <div className="boxcontainer boxs disrt dischargrcnt1">
        <div className="disch disch5">
          <Heading text={t("Procedure Details")} />
          {/* <input
            type="text"
            className="form-control form-control-sm"
            id="procedure"
            name="procedure"
            value={procedure}
            onChange={handleChange}
          /> */}
          <TextEditor getTextvalue={handleChange} setValue={procedure} name="procedure" id="procedure" />

        </div>

        <div className="disch disch5">
          <Heading text={t("Additional Remarks")} />
          {/* <input
            type="text"
            className="form-control form-control-sm"
            id="remarks"
            name="remarks"
            value={remarks}
            onChange={handleChange}
          /> */}
          <TextEditor getTextvalue={handleChange} setValue={remarks} name="remarks" id="remarks"/>

        </div>

        <div className="disch disch5">
          <Heading text={t("Additional Investigation")} />
          {/* <input
            type="text"
            className="form-control form-control-sm"
            id="investigation"
            name="investigation"
            value={investigation}
            onChange={handleChange}
          /> */}
          <TextEditor getTextvalue={handleChange} setValue={investigation} name="investigation" id="investigation"/>
        </div>
        <Loder val={loader} />
      </div>
    </div>
  );
}
