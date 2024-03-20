import React, { useState } from "react";
import Loder from "../../../Component/Loader";
import TosterUnderProcess from "../../../Component/TosterUnderProcess";
import Toster from "../../../Component/Toster";
import GetPatientData from "../../Api/ExportPatientData/GetPatientData";
import DropdownWithSearch from "../../../Component/DropdownWithSearch";
import exportFromJSON from "export-from-json";
import * as XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function ExportPatientData() {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    let [showLoder, SetshowLoder] = useState();
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [uhid, setUhid] = useState('');
    let [fromDate, setFromDate] = useState('');
    let [toDate, setToDate] = useState('');
    let parameterList = [
        { id: 1, parameterName: "Patient Name" ,apiParamName:"patientName"},
        { id: 2, parameterName: "Sex" ,apiParamName:"sex"},
        { id: 3, parameterName: "Date of Birth" ,apiParamName:"dob"},
        { id: 4, parameterName: "Race" ,apiParamName:"raceType"},
        { id: 5, parameterName: "Ethinic" ,apiParamName:"ethinicityName"},
        { id: 6, parameterName: "Preferred Language" ,apiParamName:"languageName"},
        { id: 7, parameterName: "Smoking Status" ,apiParamName:"smokingStatus"},
        { id: 8, parameterName: "Problems" ,apiParamName:"problems"},
        { id: 9, parameterName: "Medications" ,apiParamName:"medications"},
        { id: 10, parameterName: "Medications Allergies" ,apiParamName:"medicineAllergy"},
        { id: 11, parameterName: "Laboratory Tests" ,apiParamName:"labTest"},
        { id: 12, parameterName: "Laboratory Values(s)/Result(s)" ,apiParamName:"labResult"},
        { id: 13, parameterName: "Vital Signs" ,apiParamName:"vitals"},
        { id: 14, parameterName: "Procedures" ,apiParamName:"procedures"},
        { id: 15, parameterName: "Care Team Member(s)" },
        // { id: 15, parameterName: "Care Team Member(s)" ,apiParamName:"teamMember"},
        { id: 16, parameterName: "Immunizations" ,apiParamName:"immunization"},
        { id: 17, parameterName: "Unique Device Identifier(s) for a Patient’s Implantable Device(s)",apiParamName:"inplantableDevice" },
        { id: 18, parameterName: "Assessment and Plan of Treatment",apiParamName:"planOfTreatment" },
        { id: 19, parameterName: "Goals" ,apiParamName:"goals"},
        { id: 20, parameterName: "Health Concerns" ,apiParamName:"healthConcerns"},


    ]
    let [selectedParameterList, setSelectedParameterList] = useState(parameterList);
    let [patientReportDataList, setPatientReportDataList] = useState([]);
    let [isShowImportButton, setIsShowImportButton] = useState(false)
    let handlerChange = (e) => {
        handlerClearErrorMsg();
        if (e.target.name === "uhid") {
            setUhid(e.target.value)
        }
        if (e.target.name === "fromDate") {
            setFromDate(e.target.value)
        }
        if (e.target.name === "toDate") {
            setToDate(e.target.value)
        }
        if (e.target.name === "parameter") {
            handlerClearErrorMsg();
            var data = e.target.value;
            var arr = [...selectedParameterList];
            for (var i = 0; i < parameterList.length; i++) {
                if (parameterList[i].id === data) {
                    if (arr.length === 0) {
                        arr.push({
                            id: parameterList[i].id,
                            parameterName: parameterList[i].parameterName,
                            apiParamName: parameterList[i].apiParamName,
                        })
                    }
                    else {
                        var index = arr.findIndex((res) => res.id === data);
                        if (index !== -1) {
                            document.getElementById('errParameter').style.display = "block";
                        }
                        else {
                            arr.push({
                                id: parameterList[i].id,
                                parameterName: parameterList[i].parameterName,
                                apiParamName: parameterList[i].apiParamName,
                            });
                        }
                    }
                }
            }
            setSelectedParameterList(arr)
        }


    }
    let removeSelectedParamter = (key) => {
        var arr = [...selectedParameterList];
        arr.splice(key, 1);
        setSelectedParameterList(arr)
    }
    let handlerSearch = async () => {
        setShowUnderProcess(1)
        var obj = {
            UHID: uhid,
            fromDate: fromDate,
            toDate: toDate,
        }
        let response = await GetPatientData(obj)
        if (response.status === 1) {
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTimeout(() => {
                setShowToster(0);
                setPatientReportDataList(response.responseValue);
                setIsShowImportButton(true);
            }, 1500)
           
           
        }
        else {
            setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
        }
    }
    let handlerClear = () => {
        handlerClearErrorMsg();
        setSelectedParameterList(parameterList);
        setToDate('');
        setFromDate('');
        setUhid('');
    }
    let handlerClearErrorMsg = () => {
        document.getElementById('errParameter').style.display = "none";
        document.getElementById('erruhid').style.display = "none";
        document.getElementById('errfromDate').style.display = "none";
        document.getElementById('errToDate').style.display = "none";
    }
    const exportToExcel = () => {
      var arrFormat = [];
      let temp = {}
      patientReportDataList.map((val) => {
              temp["uhid"] = val.uhId 
              selectedParameterList.map((list) => {
                  let tempobj = Object.keys(val);
                
                  tempobj.map((par, ind)=>{
                    if(list.parameterName === "Care Team Member(s)"){
                        if(JSON.parse(val.teamMember).length > 0){
                            temp["teamMember"]=JSON.parse(val.teamMember)[0].name;
                        }
                        else{
                            temp["teamMember"]='';
                        }
                    }
                    else{
                      if (list.apiParamName === par)
                      {
                          let param = list.apiParamName;
                          temp[param]= val[list.apiParamName]
                      }
                    }   
                  })         
              })
              arrFormat.push(temp)
              temp={};
      })
      const data = arrFormat;
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      const fileName = 'PatientUSCDI-Data'+uhid+'.xlsx';
      XLSX.utils.book_append_sheet(wb, ws, 'PatientData');
      XLSX.writeFile(wb, fileName);
    };
    let handleExportFile= ()=>{
        var arrFormat=[];
        patientReportDataList.map((val)=>{
            arrFormat.push({uhid:val.uhId})
            selectedParameterList.map((list)=>{
                let param=list.apiParamName;
                if(list.parameterName === "Care Team Member(s)"){
                    if(JSON.parse(val.teamMember).length > 0){
                        arrFormat.push({ teamMember: JSON.parse(val.teamMember)[0].name})
                    }
                    else{
                        arrFormat.push({ teamMember: ''})
                    }
                }
                else{
                    arrFormat.push({[param]:val[list.apiParamName]})
                }
            })
        })
        const data = arrFormat;
        const fileName = 'PatientUSCDI-Data'+uhid;
        const exportType =  exportFromJSON.types.xml;
        exportFromJSON({ data, fileName, exportType });
    }
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Export_Patient_DataUSCDI-Data")}</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                      <div className="mb-2 me-2" style={{ width: '200px' }}>
                                            <label htmlFor="ddlParameter" className="form-label">{t("Parameter_Filter")}</label>
                                            {/* <input type="text" className="form-control form-control-sm" id="Supplements" name="Supplements" placeholder="Enter Supplements" /> */}
                                            {parameterList && <DropdownWithSearch defaulNname="Select Parameter" name="parameter" list={parameterList} valueName="id" displayName="parameterName" getvalue={handlerChange} editdata={0} clear={0} clearFun={""} id="ddlParameterName" />}
                                           
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label htmlFor="uhid" className="form-label">{t("Uhid")}</label>
                                            <input type="text" className="form-control form-control-sm" id="uhid" name='uhid' value={uhid} placeholder={t("UHID")} onChange={handlerChange} />
                                            <small id="erruhid" className="form-text text-danger" style={{ display: 'none' }}>{t("Fill_UHID")}</small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label htmlFor="fromDate" className="form-label">{t("From Date")}</label>
                                            <input type="date" className="form-control form-control-sm" id="fromDate" name='fromDate' value={fromDate} onChange={handlerChange} />
                                            <small id="errfromDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label htmlFor="toDate" className="form-label">{t("To")}</label>
                                            <input type="date" className="form-control form-control-sm" id="toDate" name='toDate' value={toDate} onChange={handlerChange} />
                                            <small id="errToDate" className="form-text text-danger" style={{ display: 'none' }}>{t("Fill_To_Date")}</small>
                                        </div>
                                      

                                        <div className="mb-2 me-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                    :
                                                    <div>

                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSearch}>{t("Search")}</button>
                                                        {isShowImportButton === true ? <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleExportFile}>{t("Export_To_XML")}</button>:''}
                                                        {isShowImportButton === true ? <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={exportToExcel}>{t("Export_To_EXCEL")}</button>:''}
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}>{t("Clear")}</button>

                                                    </div>
                                            }

                                        </div>

                                        <div className="mb-2">
                                        <small id="errParameter" className="form-text text-danger fw-bold" style={{ display: 'none' }}>{t("Parameter_Already_Selected")}</small>
                                            <div class="addvalue narrt1">
                                                {selectedParameterList && selectedParameterList.map((val, index) => {
                                                    return (
                                                        <div class="addvalue-in">{val.parameterName}<span class="closeadd" onClick={() => { removeSelectedParamter(index) }}><i class="fa fa-times"></i></span></div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="med-table-section" style={{ "height": "80vh" }}>
                                <table className="med-table border striped">
                                    <thead>
                                        <tr>
                                             <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")}</th>
                                            {selectedParameterList && selectedParameterList.map((val, ind) => {
                                                return (
                                                    <th className="text-center">{val.parameterName}</th>
                                                )
                                            })}
                                        </tr>
                                        <tr>
                                            {/* <th className="text-center" style={{ "width": "5%" }}>S.No.</th> */}


                                        </tr>
                                    </thead>

                                    <tbody>
                                        {patientReportDataList && patientReportDataList.map((val, ind) => {
                                            return (
                                              
                                                    <tr>
                                                    <td>{ind +1}</td>
                                                        {selectedParameterList && selectedParameterList.map((list, i) => {
                                                            return (
                                                                        <>
                                                                       
                                                                        {list.id === 15 ?<td>{JSON.parse(val.teamMember).map((arr)=>{return(arr.name)})}</td>:  <td>{val[list.apiParamName]} </td>  }
                                                                       
                                                                        </>
                                                        
                                                                    )
                                                        })
                                                        }
                                                    </tr>
                                              

                                            )


                                        })


                                        }
                                        {/* {patientReportDataList && patientReportDataList.map((val, ind) => {

                                            return (
                                                <tr>
                                                    {ind !== removeIndex ? <td>
                                                        {val.patientName}
                                                    </td> : ""}
                                                      {ind !== removeIndex ? <td>
                                                        {val.sex}
                                                    </td> : ""}
                                                      {ind !== removeIndex ? <td>
                                                        {val.dob}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.raceType}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.ethinicityName}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.languageName}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.smokingStatus}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.problems}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.medications}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.medicineAllergy}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.labTest}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.labResult}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.vitals}
                                                    </td> : ""}
                                                    {ind !== removeIndex ? <td>
                                                        {val.procedures}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.teamMember}
                                                    </td> : ""}
                                                    {ind !== removeIndex ? <td>
                                                        {val.immunization}
                                                    </td> : ""}

                                                     {ind !== removeIndex ? <td>
                                                        {val.inplantableDevice}
                                                    </td> : ""}
                                                    {ind !== removeIndex ? <td>
                                                        {val.planOfTreatment}
                                                    </td> : ""}
                                                    {ind !== removeIndex ? <td>
                                                        {val.goals}
                                                    </td> : ""}

                                                    {ind !== removeIndex ? <td>
                                                        {val.healthConcerns}
                                                    </td> : ""}
                                                    


                                                </tr>

                                            )

                                        })} */}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    showLoder === 1 ? <Loder val={showLoder} /> : ""
                }
            </section>
        </>
    )
}