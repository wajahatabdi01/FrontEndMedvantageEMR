import React, { useEffect, useState } from "react";
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Loder from "../../Component/Loader";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import DropdownWithSearch from  "../../Component/DropdownWithSearch";
import exportFromJSON from "export-from-json";
import GetCCDAPatientData from "../../Admin/Api/ExportPatientData/GetCCDAPatientData";
import { useNavigate } from "react-router-dom";
export default function PatientCCDAData() {
    const navigate = useNavigate();
    let [showLoder, SetshowLoder] = useState();
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [uhid, setUhid] = useState(window.sessionStorage.getItem('key'));
    let [fromDate, setFromDate] = useState('');
    let [toDate, setToDate] = useState('');
    let parameterList = [
        { id: 1, parameterName: "Patient Name", apiParamName:"patientName" },
        { id: 2, parameterName: "Sex", apiParamName:"sex"},
        { id: 3, parameterName: "Date of Birth", apiParamName:"dob"},
        { id: 4, parameterName: "Allergies", apiParamName:"allergies" },
        { id: 5, parameterName: "Chief Complaint + Reason for Visit", apiParamName:"chiefComplaint" },
        { id: 6, parameterName: "Family History", apiParamName:"familyHistory" },
        { id: 7, parameterName: "Immunization", apiParamName:"immunization" },
        { id: 8, parameterName: "Medication", apiParamName:"medications" },
        { id: 9, parameterName: "Problem List", apiParamName:"problems" },
        { id: 10, parameterName: "Reason for Referral", apiParamName:"referralReason" },
        { id: 11, parameterName: "Vital Sign", apiParamName:"vitalSign" },
        { id: 12, parameterName: "Social History", apiParamName:"socialHistory" },
        { id: 13, parameterName: "Results", apiParamName:"result" },
        { id: 14, parameterName: "Procedures", apiParamName:"procedures" },
        { id: 15, parameterName: "Plan of Care", apiParamName:"planofCare" },
        { id: 16, parameterName: "Instruction", apiParamName:"instruction" },
        { id: 17, parameterName: "Functional and Cognitive Status", apiParamName:"functionalAndCognitiveStatus" },
        { id: 18, parameterName: "Advanced Directives", apiParamName:"advancedDirectives" },
        { id: 19, parameterName: "Payers", apiParamName:"payers" },
        { id: 20, parameterName: "Medical Equipment", apiParamName:"medicalEquipment" },
        { id: 21, parameterName: "Encounters", apiParamName:"encounters" },
        { id: 22, parameterName: "Assessment", apiParamName:"assessment" },
        { id: 23, parameterName: "History of Present Illness", apiParamName:"historyOfPresentIllness" },
        { id: 24, parameterName: "Physical Exam", apiParamName:"physicalExam"  },
        { id: 25, parameterName: "General Status", apiParamName:"generalStatus"  },
        { id: 26, parameterName: "History of Past Illness", apiParamName:"historyOfPastIllness"},
        { id: 27, parameterName: "Review of Systems" , apiParamName:"reviewOfSystems" },
        { id: 28, parameterName: "DICOM Object Catalog", apiParamName:"dICOMObjectCatalog"  },
        { id: 29, parameterName: "Findings (Radiology Study Observation)", apiParamName:"findings"  },
        { id: 30, parameterName: "Hospital Course", apiParamName:"hospitalCourse"  },
        { id: 31, parameterName: "Hospital Discharge Diagnosis", apiParamName:"hospitalDischargeDiagnosis"  },
        { id: 32, parameterName: "Hospital Discharge Medications", apiParamName:"hospitalDischargMedications"  },
        { id: 33, parameterName: "Anesthesia", apiParamName:"anesthesia"  },
        { id: 34, parameterName: "Complications" ,apiParamName:"complications"  },
        { id: 35, parameterName: "Postoperative Diagnosis", apiParamName:"postoperativeDiagnosis"  },
        { id: 36, parameterName: "Preoperative Diagnosis", apiParamName:"preoperativeDiagnosis"  },
        { id: 37, parameterName: "Procedure Description", apiParamName:"procedureDescription"  },
        { id: 38, parameterName: "Procedure Disposition", apiParamName:"procedureDisposition"  },
        { id: 39, parameterName: "Procedure Estimated Blood Loss", apiParamName:"procedureEstimatedBloodLoss"  },
        { id: 40, parameterName: "Procedure Findings", apiParamName:"procedureFindings"  },
        { id: 41, parameterName: "Procedure Indications", apiParamName:"procedureIndications"  },
        { id: 42, parameterName: "Procedure Specimens Taken", apiParamName:"procedureSpecimensTaken"  },
        { id: 43, parameterName: "Postprocedure Diagnosis", apiParamName:"postprocedureDiagnosis"  },
        { id: 44, parameterName: "Medications Administered", apiParamName:"medicationsAdministered"  },
        { id: 45, parameterName: "SOCIALHISTORY_New", apiParamName:"socialHistoryNew"  },


    ]
    let [selectedParameterList, setSelectedParameterList] = useState(parameterList);
    let [patientReportDataList, setPatientReportDataList] = useState([]);
    let [isShowImportButton, setIsShowImportButton] = useState(false)
    let handlerChange = (e) => {
        handlerClearErrorMsg();
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
    let handlerSearch = async (key) => {
        setShowUnderProcess(1)
        var obj = {
            UHID: key,
            fromDate: fromDate,
            toDate: toDate,
        }
        let response = await GetCCDAPatientData(obj)
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
    }
    let handlerClearErrorMsg = () => {
        document.getElementById('errParameter').style.display = "none";
        document.getElementById('errfromDate').style.display = "none";
        document.getElementById('errToDate').style.display = "none";
    }
    let handleExportFile= ()=>{
        var arrFormat=[];
        patientReportDataList.map((val)=>{
            arrFormat.push({uhid:val.uhId})
            selectedParameterList.map((list)=>{
                let param= list.apiParamName;
                arrFormat.push({
                    [param]:val[list.apiParamName]
                })
            })
        })
        const data = arrFormat;
        const fileName = 'PatientData_'+uhid;
        const exportType =  exportFromJSON.types.xml;
        exportFromJSON({ data, fileName, exportType });
    }
    useEffect(()=>{
        if(uhid === null || uhid === undefined || uhid === ''){
            navigate('/verifyUHID/');
        }
        else{
             handlerSearch(uhid);
        }
    },[]);
    return (
        <>
        <Navbar/>
            <section className='about-us12' style={{minHeight:'50vh', background:'#fff'}}>
                <div className="container-fluid"> 
                    <div className="row">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Export Patient Data (CCDA-Data)</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                      <div className="mb-2 me-2" style={{ width: '200px' }}>
                                            <label htmlFor="ddlParameter" className="form-label">Parameter Filter</label>
                                            {/* <input type="text" className="form-control form-control-sm" id="Supplements" name="Supplements" placeholder="Enter Supplements" /> */}
                                            {parameterList && <DropdownWithSearch defaulNname="Select Parameter" name="parameter" list={parameterList} valueName="id" displayName="parameterName" getvalue={handlerChange} editdata={0} clear={0} clearFun={""} id="ddlParameterName" />}
                                           
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label htmlFor="fromDate" className="form-label">From Date</label>
                                            <input type="date" className="form-control form-control-sm" id="fromDate" name='fromDate' value={fromDate} onChange={handlerChange} />
                                            <small id="errfromDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label htmlFor="toDate" className="form-label">To </label>
                                            <input type="date" className="form-control form-control-sm" id="toDate" name='toDate' value={toDate} onChange={handlerChange} />
                                            <small id="errToDate" className="form-text text-danger" style={{ display: 'none' }}>Fill To Date</small>
                                        </div>
                                      

                                        <div className="mb-2 me-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                    :
                                                    <div>

                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSearch}>Search</button>
                                                        {isShowImportButton === true ? <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleExportFile}>Export To XML</button>:''}
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}>Clear</button>

                                                    </div>
                                            }

                                        </div>

                                        <div className="mb-2">
                                        <small id="errParameter" className="form-text text-danger fw-bold" style={{ display: 'none' }}>Parameter Already Selected</small>
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
                                             <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
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
                                                                        <td>{val[list.apiParamName]} </td>
                                                                    )
                                                        })
                                                        }
                                                    </tr>

                                            )
                                        })
                                        }
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
       <Footer/>
        </>
    )
}