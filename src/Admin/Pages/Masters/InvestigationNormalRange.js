import React, { useEffect, useState } from 'react';
import Toster from '../../../Component/Toster';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import GetSubtestList from '../../Api/Master/InvestigationNormalRange/GetSubtestList';
import GetGenderList from '../../Api/Master/InvestigationNormalRange/GetGenderList';
import GetUnitList from '../../Api/Master/InvestigationNormalRange/GetUnitList';
import ValidationInvestigationNormalRange from '../../../Validation/Admin/Master/ValidationInvestigationNormalRange';
import PostInvestigationNormalRange from '../../Api/Master/InvestigationNormalRange/PostInvestigationNormalRange';
import GetInvestigationNomalRange from '../../Api/Master/InvestigationNormalRange/GetInvestigationNomalRange';
import DeleteInvestigationNormalRange from '../../Api/Master/InvestigationNormalRange/DeleteInvestigationNormalRange';
import PutInvestigationByRange from '../../Api/Master/InvestigationNormalRange/PutInvestigationByRange';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import Search from '../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export const InvestigationNormalRange = () => {
    const [loder, setLoder] = useState(0);
    const [showToster, setShowToster] = useState(0);
    const [rowId, setRowId] = useState('');
    const [showUnderProcess, setShowUnderProcess] = useState(0);
    const [tosterMessage, setTosterMessage] = useState("");
    const [tosterValue, setTosterValue] = useState(0);
    const [updateBool, setUpdateBool] = useState(0);
    const [sendForm, setSendForm] = useState({ "userId": window.userId });
    const [subTestList, setSubTestList] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [investigationNormalRangeList, setInvestigationNormalRangeList] = useState([]);
    const [investigationNormalRangeListMain, setInvestigationNormalRangeListMain] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const {t} = useTranslation();



    const getData = async () => {
        const getSubtest = await GetSubtestList();
        const getGenderList = await GetGenderList();
        const getUnitList = await GetUnitList();
        const getInvestigationList = await GetInvestigationNomalRange();

        if (getSubtest.status === 1) {
            setSubTestList(getSubtest.responseValue);
        }
        if (getGenderList.status === 1) {
            setGenderList(getGenderList.responseValue);
        }
        if (getUnitList.status === 1) {
            setUnitList(getUnitList.responseValue);
        }
        if (getInvestigationList.status === 1) {
            setInvestigationNormalRangeList(getInvestigationList.responseValue);
            setInvestigationNormalRangeListMain(getInvestigationList.responseValue)
        }
    };

    const handleChange = async (e) => {

        const name = e.target.name;
        const value = e.target.value;

        if (name === "subTestID") {
            document.getElementById("errddlSubTestID").style.display = "none";
        }
        if (name === "genderId") {
            document.getElementById("errddlGenderId").style.display = "none";
        }
        if (name === "minAge") {
            document.getElementById("errddlMinAge").style.display = "none";
        }
        if (name === "maxAge") {
            document.getElementById("errddlMaxAge").style.display = "none";
        }
        if (name === "ageUnitID") {
            document.getElementById("errddlAgeUnitID").style.display = "none";
        }
        if (name === "ageUnit") {
            document.getElementById("errddlAgeUnit").style.display = "none";
        }
        if (name === "minValue") {
            document.getElementById("errddlMinValue").style.display = "none";
        }
        if (name === "maxvalue") {
            document.getElementById("errddlMaxvalue").style.display = "none";
        }
        if (name === "valueUnitID") {
            document.getElementById("errddlValueUnitID").style.display = "none";
        }
        if (name === "ageUnitID") {
            const dropdown = document.getElementById('ageUnitID');
            const selectedOption = dropdown.options[dropdown.selectedIndex];
            const selectedName = selectedOption.textContent;

            document.getElementById("ageUnit").value = selectedName;

            setSendForm(sendForm => ({
                ...sendForm,
                ["ageUnit"]: selectedName
            }))

        }

        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    };

    const saveForm = async () => {
        const valresponse = ValidationInvestigationNormalRange(sendForm.subTestID, sendForm.genderId, sendForm.minAge, sendForm.maxAge,
            sendForm.ageUnitID, sendForm.ageUnit, sendForm.minValue, sendForm.maxvalue, sendForm.valueUnitID);
        if (valresponse[0]) {
            setShowUnderProcess(1)
            const response = await PostInvestigationNormalRange(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Saved SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear();
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
            getData();
        }
        else {
            document.getElementById(valresponse[1]).innerHTML = valresponse[2]
            document.getElementById(valresponse[1]).style.display = "block"
        }
    };

    const edit = async (id, subTestID, genderId, minAge, maxAge, ageUnitID, ageUnit, minValue,
        maxvalue, valueUnitID, resultRemark, userId) => {


        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "subTestID": subTestID,
            "genderId": genderId,
            "minAge": minAge,
            "maxAge": maxAge,
            "ageUnitID": ageUnitID,
            "ageUnit": ageUnit,
            "minValue": minValue,
            "maxvalue": maxvalue,
            "valueUnitID": valueUnitID,
            "resultRemark": resultRemark,
            "userId": userId,
        }))

        document.getElementById("subTestID").value = subTestID;
        document.getElementById("genderId").value = genderId;
        document.getElementById("minAge").value = minAge;
        document.getElementById("maxAge").value = maxAge;
        document.getElementById("ageUnitID").value = ageUnitID;
        document.getElementById("ageUnit").value = ageUnit;
        document.getElementById("minValue").value = minValue;
        document.getElementById("maxvalue").value = maxvalue;
        document.getElementById("valueUnitID").value = valueUnitID;
        document.getElementById("resultRemark").value = resultRemark;
    };

    const saveUpdate = async () => {
        const valresponse = ValidationInvestigationNormalRange(sendForm.subTestID, sendForm.genderId, sendForm.minAge, sendForm.maxAge,
            sendForm.ageUnitID, sendForm.ageUnit, sendForm.minValue, sendForm.maxvalue, sendForm.valueUnitID);
        if (valresponse[0]) {
            setShowUnderProcess(1)
            const response = await PutInvestigationByRange(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Updated SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear();
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
            getData();
        }
        else {
            document.getElementById(valresponse[1]).innerHTML = valresponse[2]
            document.getElementById(valresponse[1]).style.display = "block"
        }
    };


    const handleDeleteRow = async () => {
        const obj = {
            id: rowId,
        };
        setShowUnderProcess(1)
        const response = await DeleteInvestigationNormalRange(obj)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted SuccessFully!")
            setTosterValue(0)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
            getData()
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
    };
    const handleClear = async () => {
        setSendForm([]);
        document.getElementById('subTestID').value = '0';
        document.getElementById('genderId').value = '0';
        document.getElementById('minAge').value = '';
        document.getElementById('maxAge').value = '';
        document.getElementById('ageUnitID').value = '0';
        document.getElementById('ageUnit').value = '';
        document.getElementById('minValue').value = '';
        document.getElementById('maxvalue').value = '';
        document.getElementById('valueUnitID').value = '0';
        document.getElementById('resultRemark').value = '';
        setUpdateBool(0);
    };

    //Handle Search
    let handleSearch = (e) => {
        let resp = Search(investigationNormalRangeListMain, e.target.value)
        if(e.target.value !== ""){
            if(resp.length !== 0)
            {
                setInvestigationNormalRangeList(resp)
            }
            else
            {
                setInvestigationNormalRangeList([])
    
            }
        }
        else{
            setInvestigationNormalRangeList(investigationNormalRangeListMain)
        }        
    }

    useEffect(() => {
        getData();
    }, []);

    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text={t("Investigation_Normal_Range")}/>
                            <BoxContainer>
                                {/* subtest */}
                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="subTestID" className="form-label">{t("Sub_Test")}<span className="starMandatory">*</span></label>
                                    <select name='subTestID' id="subTestID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">{t("SELECT")}</option>
                                        {subTestList && subTestList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.subTestName}</option>
                                            )
                                        })}
                                    </select>
                                    <small id="errddlSubTestID" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                {/* Gender */}
                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="genderId" className="form-label">{t("Select_Gender")}<span className="starMandatory">*</span></label>
                                    <select name='genderId' id="genderId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">{t("SELECT")}</option>
                                        {genderList && genderList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.name}</option>
                                            )
                                        })}
                                    </select>
                                    <small id="errddlGenderId" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                {/* min age */}
                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="minAge" className="form-label">{t("MinAge")}<span className="starMandatory">*</span></label>
                                    <input type="number" name="minAge" id="minAge" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Min_Age")} />
                                    <small id="errddlMinAge" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                {/* max age */}
                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="maxAge" className="form-label">{t("MaxAge")}<span className="starMandatory">*</span></label>
                                    <input type="number" name="maxAge" id="maxAge" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Max_Age")}/>
                                    <small id="errddlMaxAge" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                {/* age unit list */}
                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="ageUnitID" className="form-label">{t("Age_Unit_List")}t<span className="starMandatory">*</span></label>
                                    <select name='ageUnitID' id="ageUnitID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">{t("SELECT")}</option>
                                        {unitList && unitList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.unitName}</option>
                                            )
                                        })}
                                    </select>
                                    <small id="errddlAgeUnitID" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                {/* age unit name */}
                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="ageUnit" className="form-label">{t("Age_Unit")}<span className="starMandatory">*</span></label>
                                    <input type="text" name="ageUnit" id="ageUnit" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Enter_Age_Unit")} />
                                    <small id="errddlAgeUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                {/* min value */}
                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="minValue" className="form-label">{t("Min_Value")}<span className="starMandatory">*</span></label>
                                    <input type="number" name="minValue" id="minValue" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter Min Value" />
                                    <small id="errddlMinValue" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                {/* max value */}
                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="maxvalue" className="form-label">{t("Max_Value")}<span className="starMandatory">*</span></label>
                                    <input type="number" name="maxvalue" id="maxvalue" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Enter_Max_Value")} />
                                    <small id="errddlMaxvalue" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                {/* Value Unit list */}
                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="valueUnitID" className="form-label">{t("Value_Unit")}<span className="starMandatory">*</span></label>
                                    <select name='valueUnitID' id="valueUnitID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">{t("SELECT")}</option>
                                        {unitList && unitList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.unitName}</option>
                                            )
                                        })}
                                    </select>
                                    <small id="errddlValueUnitID" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                {/* <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="machineId" className="form-label">Machine<span className="starMandatory">*</span></label>
                                    <select name='machineId' id="machineId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {machineList && machineList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.roleTitle}</option>
                                            )
                                        })}
                                    </select>
                                    <small id="errddlMachineId" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div> */}

                                {/* Remark */}
                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                    <label htmlFor="resultRemark" className="form-label">{t("Result_Remark")}</label>
                                    <input type="text" name="resultRemark" id="resultRemark" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Result_Remark")} />
                                    <small id="errddlResultRemark" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>

                                <div className="mb-2 relative">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <div>
                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                            <>
                                                {showToster === 1 ?
                                                    <Toster value={tosterValue} message={tosterMessage} />

                                                    : <div>
                                                        {updateBool === 0 ?
                                                            <>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>{t("Cancel")}</button>
                                                            </>
                                                        }
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </BoxContainer>
                        </div>


                        <div className="col-12 mt-2">
                            <div className='handlser'>
                                <Heading text={t("Investigation_Normal_Range_List")}/>
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")}  onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "66vh" }}>
                                <table className='med-table border striped  mt-2'>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Sub_Test")}</th>
                                            <th>{t("Gender")}</th>
                                            <th>{t("MinAge")}</th>
                                            <th>{t("MaxAge")}</th>
                                            <th>{t("Age_Unit")}</th>
                                            <th>{t("Min_Value")}</th>
                                            <th>{t("Max_Value")}</th>
                                            <th>{t("Value_Unit")}</th>
                                            <th>{t("Result_Remark")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {investigationNormalRangeList && investigationNormalRangeList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.subTestName}</td>
                                                    <td>{val.genderName}</td>
                                                    <td>{val.minAge}</td>
                                                    <td>{val.maxAge}</td>
                                                    <td>{val.ageUnit}</td>
                                                    <td>{val.minValue}</td>
                                                    <td>{val.maxvalue}</td>
                                                    <td>{val.valueUnitName}</td>
                                                    <td>{val.resultRemark}</td>

                                                    <td>
                                                        {/* <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => {
                                                                edit(
                                                                    val.id, val.subTestID, val.genderId, val.minAge, val.maxAge, val.ageUnitID, val.ageUnit,  val.minValue,
                                                                    val.maxvalue, val.valueUnitID, val.resultRemark,val.userId)
                                                            }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                                                            </div>
                                                        </div> */}

                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { edit(val.id, val.subTestID, val.genderId, val.minAge, val.maxAge, val.ageUnitID, val.ageUnit, val.minValue, val.maxvalue, val.valueUnitID, val.resultRemark, val.userId) }} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(val.id) }} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>




                            </div>

                        </div>

                    </div>
                </div>



                {/* -----------------------Start Delete Modal Popup-------------------   */}

                {/*  <!-- Modal -->  */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">

                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                <div className='popDeleteContent'> {t("Are_you_sure_you_want_to_delete?")}</div>

                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
            </section>
            {/* <Loder val={loder} /> */}
        </>
    )
}
