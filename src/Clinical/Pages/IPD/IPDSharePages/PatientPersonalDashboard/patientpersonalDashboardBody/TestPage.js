
import React, { useState } from "react";
import Loder from "../../Components/Loder";
import TosterUnderProcess from "../../Components/TosterUnderProcess";
import Toster from "../../Components/Toster";
import GetPatientData from "../../Admin/Api/ExportPatientData/GetPatientData";
import DropdownWithSearch from "../../Components/DropdownWithSearch";
import exportFromJSON from "export-from-json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function TestPage() {
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
        { id: 1, parameterName: "Patient Name" },
        { id: 2, parameterName: "Sex" },
        { id: 3, parameterName: "Date of Birth" },
        { id: 4, parameterName: "Race" },
        { id: 5, parameterName: "Ethinic" },
        { id: 6, parameterName: "Preferred Language" },
        { id: 7, parameterName: "Smoking Status" },
        { id: 8, parameterName: "Problems" },
        { id: 9, parameterName: "Medications" },
        { id: 10, parameterName: "Medications Allergies" },
        { id: 11, parameterName: "Laboratory Tests" },
        { id: 12, parameterName: "Laboratory Values(s)/Result(s)" },
        { id: 13, parameterName: "Vital Signs" },
        { id: 14, parameterName: "Procedures" },
        { id: 15, parameterName: "Care Team Member(s)" },
        { id: 16, parameterName: "Immunizations" },
        { id: 17, parameterName: "Unique Device Identifier(s) for a Patient's Implantable Device(s)" },
        { id: 18, parameterName: "Assessment and Plan of Treatment" },
        { id: 19, parameterName: "Goals" },
        { id: 20, parameterName: "Health Concerns" },
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
        var obj = {
            UHID: key,
            fromDate: fromDate,
            toDate: toDate,
        }
        let response = await GetPatientData(obj)
        if (response.status === 1) {
            setPatientReportDataList(response.responseValue);
            setIsShowImportButton(true);
        }
        else {
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
    let handleExportFile = () => {
        var arrFormat = [];
        patientReportDataList.map((val) => {
            arrFormat.push({ uhid: val.uhId })
            selectedParameterList.map((list) => {
                if (list.id === 1) { arrFormat.push({ patientName: val.patientName }) }
                if (list.id === 2) { arrFormat.push({ sex: val.sex }) }
                if (list.id === 3) { arrFormat.push({ dob: val.dob }) }
                if (list.id === 4) { arrFormat.push({ race: val.raceType }) }
                if (list.id === 5) { arrFormat.push({ ethinic: val.ethinicityName }) }
                if (list.id === 6) { arrFormat.push({ preferredLanguage: val.languageName }) }
                if (list.id === 7) { arrFormat.push({ smokingStatus: val.smokingStatus }) }
                if (list.id === 8) { arrFormat.push({ problems: val.problems }) }
                if (list.id === 9) { arrFormat.push({ medications: val.medications }) }
                if (list.id === 10) { arrFormat.push({ medicationsAllergies: val.medicineAllergy }) }
                if (list.id === 11) { arrFormat.push({ laboratoryTests: val.labTest }) }
                if (list.id === 12) { arrFormat.push({ LaboratoryResult: val.labResult }) }
                if (list.id === 13) { arrFormat.push({ vitalSigns: val.vitals }) }
                if (list.id === 14) { arrFormat.push({ procedures: val.procedures }) }
                if (list.id === 15) { arrFormat.push({ careTeamMember: val.teamMember }) }
                if (list.id === 16) { arrFormat.push({ immunizations: val.immunization }) }
                if (list.id === 17) { arrFormat.push({ UniqueDeviceIdentifierForPatienImplantableDevice: val.inplantableDevice }) }
                if (list.id === 18) { arrFormat.push({ AssessmentAndPlanOfTreatment: val.planOfTreatment }) }
                if (list.id === 19) { arrFormat.push({ goals: val.goals }) }
                if (list.id === 20) { arrFormat.push({ healthConcerns: val.healthConcerns }) }
            })
        });
        const data = arrFormat;
        const fileName = 'PatientData_' + uhid;
        const exportType = exportFromJSON.types.xml;
        exportFromJSON({ data, fileName, exportType });
    }
    useEffect(() => {
        if (uhid === null || uhid === undefined || uhid === '') {
            navigate('/verifyUHID/');
        }
        else {
            handlerSearch(uhid);
        }
    }, []);
    return (
        <>
            <section className="main-content_  pt-3" style={{ marginTop: '60px' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Export Patient Data</div>
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

                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => { handlerSearch(uhid) }}>Search</button>
                                                        {isShowImportButton === true ? <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleExportFile}>Export To XML</button> : ''}
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
                            <div className="med-table-section" style={{ "height": "230px" }}>
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
                                    </thead>
                                    <tbody>
                                        {patientReportDataList && patientReportDataList.map((val, ind) => {
                                            return (
                                                <tr>
                                                    <td>{ind + 1}</td>
                                                    {selectedParameterList && selectedParameterList.map((list, i) => {
                                                        return (
                                                            <>
                                                                {list.id === 1 ? <td>{val.patientName} </td> : ''}
                                                                {list.id === 2 ? <td> {val.sex}</td> : ''}
                                                                {list.id === 3 ? <td> {val.dob}</td> : ''}
                                                                {list.id === 4 ? <td>{val.raceType}</td> : ''}
                                                                {list.id === 5 ? <td>{val.ethinicityName}</td> : ''}
                                                                {list.id === 6 ? <td>{val.languageName} </td> : ''}
                                                                {list.id === 7 ? <td> {val.smokingStatus}</td> : ''}
                                                                {list.id === 8 ? <td> {val.problems}</td> : ''}
                                                                {list.id === 9 ? <td>{val.medications}</td> : ''}
                                                                {list.id === 10 ? <td> {val.medicineAllergy}</td> : ''}
                                                                {list.id === 11 ? <td>{val.labTest}</td> : ''}
                                                                {list.id === 12 ? <td> {val.labResult}</td> : ''}
                                                                {list.id === 13 ? <td> {val.vitals} </td> : ''}
                                                                {list.id === 14 ? <td> {val.procedures}</td> : ''}
                                                                {list.id === 15 ? <td>{JSON.parse(val.teamMember).map((arr) => { return (arr.name) })}</td> : ''}
                                                                {list.id === 16 ? <td> {val.immunization} </td> : ''}
                                                                {list.id === 17 ? <td>{val.inplantableDevice}</td> : ''}
                                                                {list.id === 18 ? <td> {val.planOfTreatment} </td> : ''}
                                                                {list.id === 19 ? <td>{val.goals}</td> : ''}
                                                                {list.id === 20 ? <td> {val.healthConcerns}</td> : ''}
                                                            </>
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
        </>
    )

}