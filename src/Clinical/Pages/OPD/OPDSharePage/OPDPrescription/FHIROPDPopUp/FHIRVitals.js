import React, { useEffect, useState } from 'react'
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import { t } from 'i18next';
import { CodeMaster } from '../../../../../../Admin/Pages/EMR Master/CodeMaster';
import GetEMRVitalAbnMaster from '../../../../../API/OPD/Vitals/GetEMRVitalAbnMaster';
import PostPatientIPDPrescription from '../../../../../API/IPD/Prescription/PostPatientIPDPrescription';
import GetPatientIPDAllHistory from '../../../../../API/IPD/Prescription/GetPatientIPDAllHistory';


function FHIRVitals({ theEncounterId }) {
    const [isShowPopUp, setIsShowPopUp] = useState(0);
    const [PopUpId, setPopUpId] = useState('');
    const [checkedStates, setCheckedStates] = useState({});
    const [abnList, setAbnList] = useState([]);
    const [txtCoding, setTxtCoding] = useState([]);
    let [updatebool, setUpdatebool] = useState(0);
    let [makeData, setMakeData] = useState([]);
    let [getData, setgetData] = useState([]);
    let [vitalData, setVitalData] = useState([]);
    let [vitalType, setVitalType] = useState("");
    const customStyle = { marginLeft: '0px' };
    const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;

    const activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : [];

    const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];
    const activePmid = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].pmId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].pmId : [];

    const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];
    const handleCheckboxChange = (id) => {
        setCheckedStates({ ...checkedStates, [id]: !checkedStates[id] });
    };

    const getAbnData = async () => {
        const response = await GetEMRVitalAbnMaster();
        if (response.status === 1) {
            setAbnList(response.responseValue)
        }
    }
    const getAllVital = async () => {
        const uhid = activeUHID
        const pmId = activePmid
        const response = await GetPatientIPDAllHistory(uhid, pmId)
        if (response.status === 1) {
            setVitalData(response.responseValue)
        }
    }
    const [weightData, setWeightData] = useState({
        vmId: 2,
        unit: "lbs",
        vmValue: '',
        external_id: '',
        reason_code: '',
        reason_description: '',
        encounterId: 0,
        interpretation_option_id: '',
        interpretation_codes: '',
        reason_status: '',
        interpretation_title: '',
    });
    const [heightData, setHeightData] = useState({
        vmId: 1,
        unit: "cm",
        vmValue: '',
        external_id: '',
        reason_code: '',
        reason_description: '',
        encounterId: 0,
        interpretation_option_id: '',
        interpretation_codes: '',
        reason_status: '',
        interpretation_title: '',
    });
    const [bpSysData, setBpSysData] = useState({
        vmId: 4,
        unit: "mmHg",
        vmValue: '',
        external_id: '',
        reason_code: '',
        reason_description: '',
        encounterId: 0,
        interpretation_option_id: '',
        interpretation_codes: '',
        reason_status: '',
        interpretation_title: '',
    });
    const [vitalTypeArr, setVitalTypeArr] = useState({ 'vWeight': [], 'vHeight': [], 'vBpSys': [] });
    const [storeReasonData, setStoreReasonData] = useState({
        'vWeight': [],
        'vHeight': [],
        'vBpSys': [],
    });
    const [vitalReason, setVitalReason] = useState({
        'vWeight': "weightReasonstatus",
        'vHeight': "heightReasonstatus",
        'vBpSys': "bpSysReasonstatus",
    });
    const [vitalReasonModal, setVitalReasonModal] = useState({
        'vWeight': 0,
        'vHeight': 0,
        'vBpSys': 0,
    });


    const handleChange = (e) => {
        const { name, value } = e.target
        const ddlWeight = document.getElementById("interpretation_option_id");
        const ddlcode = document.getElementById("interpretation_option_id").value;
        const code = ddlcode.split(',');
        const interpretation_option_id = code[0];
        const interpretation_codes = code[1];
        const selectedOption = ddlWeight.options[ddlWeight.selectedIndex];
        const selectWeightAbn = selectedOption ? selectedOption.textContent : "";
        const interpretation_title = selectWeightAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vWeight'];
        console.log('getVitalReasonModalStatus weight', getVitalReasonModalStatus)
        if (getVitalReasonModalStatus) {
            const reason = document.getElementById("weightReasonstatus").value;
            console.log('weight reason', reason);
            setWeightData((prev) => ({
                ...prev,
                [name]: value,
                reason_status: reason,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }))
        }
        else {

            setWeightData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }))
        }
    }
    const handleHeightChange = (e) => {
        const { name, value } = e.target;
        const ddlHeight = document.getElementById("heightinterpretation");
        const ddlHeightcode = ddlHeight ? ddlHeight.value : '';
        const heightCode = ddlHeightcode.split(',');
        const interpretation_option_id = heightCode.length > 0 ? heightCode[0] : '';
        const interpretation_codes = heightCode.length > 1 ? heightCode[1] : '';
        const selectedOption = ddlHeight ? ddlHeight.options[ddlHeight.selectedIndex] : null;
        const selectHeightAbn = selectedOption ? selectedOption.textContent : "";
        const interpretation_title = selectHeightAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vHeight'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("heightReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setHeightData((prev) => ({
                ...prev,
                [name]: value,
                reason_status: reasonElement,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }
        else {
            setHeightData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handleBySysChange = (e) => {
        const { name, value } = e.target;
        const ddlBpSysHeight = document.getElementById("bpSysInterpretation");
        const selectedOption = ddlBpSysHeight ? ddlBpSysHeight.options[ddlBpSysHeight.selectedIndex] : null;
        const ddlBpSysHeightcode = ddlBpSysHeight ? ddlBpSysHeight.value : '';
        const selectHeightAbn = selectedOption ? selectedOption.textContent : "";
        const bpSysHeightCode = ddlBpSysHeightcode.split(',');
        const interpretation_option_id = bpSysHeightCode.length > 0 ? bpSysHeightCode[0] : '';
        const interpretation_codes = bpSysHeightCode.length > 1 ? bpSysHeightCode[1] : '';


        const interpretation_title = selectHeightAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vBpSys'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("bpSysReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setBpSysData((prev) => ({
                ...prev,
                [name]: value,
                reason_status: reasonElement,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }
        else {
            setBpSysData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };

    const funSave = async () => {
        const vitalData = JSON.stringify([weightData, heightData, bpSysData])
        console.log("vitalData", vitalData)
        const vitalObj = {
            "jsonVital": vitalData,
            "uhid": activeUHID,
            "clientId": clientID,
            "userId": window.userId,
            "doctorId": activeDocID,
            "deptId": activeDeptID
        }
        console.log("vitalObj", vitalObj)
        // return
        const response = await PostPatientIPDPrescription(vitalObj)
        if (response.status === 1) {
            getAllVital();
            alert("Vital Saved")
        }
        else {
            alert(response.responseValue)
        }
    }
    const [showDivs, setShowDivs] = useState({
        weight: false,
        height: false,
        BPSystolic: false,
        BPDiastolic: false,
        Pulse: false,
        Respiration: false,
        Temperature: false,
        TemperatureLocation: false,
        OxygenSaturation: false,
        OxygenFlowRate: false,
        InhaledOxygenConcentration: false,
        HeadCircumference: false,
        WaistCircumference: false,
        BMI: false,
        BMIStatus: false,
        BMI: false,
    });

    const handleAddDiv = (section, vitalType) => {
        setShowDivs(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
        let getVitalReasonModalStatus = vitalReasonModal[vitalType];
        console.log('getVitalReasonModalStatus', getVitalReasonModalStatus);
        let t = getVitalReasonModalStatus;
        if (getVitalReasonModalStatus) {
            setVitalReasonModal((prev) => ({
                ...prev,
                [vitalType]: 0
            }));
        }
        else {
            setVitalReasonModal((prev) => ({
                ...prev,
                [vitalType]: 1
            }));
            const getStoreData = storeReasonData[vitalType];
            if (getStoreData) {
                const getReasonCode = getStoreData.reason_code.split(";");
                console.log('getStoreData', getStoreData);
                console.log('getReasonCode', getReasonCode);
                setVitalTypeArr((prev) => (
                    {
                        ...prev,
                        [vitalType]: getReasonCode
                    }
                ));
                const getReasonStatusID = vitalReason[vitalType];
                console.log('getReasonStatusID', getReasonStatusID);
                setTimeout(() => {
                    document.getElementById(getReasonStatusID).value = getStoreData.reason_status ? getStoreData.reason_status : '0';
                }, 900);
            }
        }
        console.log('test flag', t)

    }
    const handleOpenModal = (modalID, vitalType) => {
        setIsShowPopUp(1);
        setPopUpId(modalID);
        setVitalType(vitalType)
    }
    const handleCloseModal = () => {
        setIsShowPopUp(0);
        // setPopUpId('');
    }

    const SelectedData = (data, modalID) => {
        console.log('data get', data)
        let t = {
            moduleId: modalID,
            data: data
        }
        setgetData(t);
        setMakeData([...makeData, t])
        let temp = ""
        for (var i = 0; i < data.length; i++) {
            temp += data[i].dropdownName + ':' + data[i].code + ';'
        }
        console.log("temp", temp)
        const splitData = temp.split(';').slice(0, -1);
        const txtCodingAsString = String(splitData);
        const interpretationcodes = txtCodingAsString.split(';').map(code => code.trim()).join(';');
        const reason_code = interpretationcodes.replace(/,/g, ';');
        console.log('reason_code', reason_code);
        console.log('vitalType', vitalType)
        if (vitalType === "vWeight") {
            setWeightData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vHeight") {
            setHeightData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vBpSys") {
            setBpSysData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }


        console.log('vitalType', vitalType)
        setVitalTypeArr((prev) => ({
            ...prev,
            [vitalType]: splitData
        }));
    }

    let handleRemove = () => {
        const tempAr = txtCoding;
        let tempData = [];
        let tempNew = "";
        for (var i = 0; i < tempAr.length; i++) {
            if (!document.getElementById("ddlCoding" + i).checked) {
                tempData.push(tempAr[i])
            }
        }
        for (var i = 0; i < tempAr.length; i++) {
            document.getElementById("ddlCoding" + i).checked = false;
        }
        for (var j = 0; j < tempData.length; j++) {
            tempNew += tempData[j] + ';';
        }
        setTxtCoding(tempData);

    }

    useEffect(() => {
        if (vitalData && vitalData.length > 0) {
            console.log("vitalData", vitalData);
            const firstViatl = vitalData[0];
            console.log("firstViatl", firstViatl);
            let selectedAbnWeight = "0";
            if (firstViatl.interpretation_option_id && firstViatl.interpretation_codes) {
                selectedAbnWeight = firstViatl.interpretation_option_id + ',' + firstViatl.interpretation_codes;
            }

            console.log('makeWeightAbnID', selectedAbnWeight)
            document.getElementById("interpretation_option_id").value = selectedAbnWeight;
            setWeightData({
                vmId: 2,
                unit: "lbs",
                vmValue: firstViatl.vmValue && firstViatl.vmValue !== '' ? firstViatl.vmValue : '',
                external_id: '',
                reason_code: firstViatl.reason_code,
                reason_description: '',
                encounterId: firstViatl.encounterId,
                interpretation_option_id: firstViatl.interpretation_option_id,
                interpretation_codes: firstViatl.interpretation_codes,
                reason_status: firstViatl.reason_status,
                interpretation_title: firstViatl.interpretation_title
            });

            //Height Data
            const secondVital = vitalData[1];
            console.log("secondVital", secondVital);
            let selectedAbnHeight = "0";
            if (secondVital.interpretation_option_id && secondVital.interpretation_codes) {
                selectedAbnHeight = secondVital.interpretation_option_id + ',' + secondVital.interpretation_codes;
            }
            document.getElementById("heightinterpretation").value = selectedAbnHeight;
            setHeightData({
                vmId: 1,
                unit: "cm",
                vmValue: secondVital.vmValue && secondVital.vmValue !== '' ? secondVital.vmValue : '',
                external_id: '',
                reason_code: secondVital.reason_code,
                reason_description: '',
                encounterId: secondVital.encounterId,
                interpretation_option_id: secondVital.interpretation_option_id,
                interpretation_codes: secondVital.interpretation_codes,
                reason_status: secondVital.reason_status,
                interpretation_title: secondVital.interpretation_title
            })
            //BpSys Data
            const thirdVital = vitalData[2];
            if (thirdVital && thirdVital) {
                console.log("thirdVital", thirdVital);
                let selectedBpsysAbnHeight = "0";
                if (thirdVital.interpretation_option_id && thirdVital.interpretation_codes) {
                    selectedBpsysAbnHeight = thirdVital.interpretation_option_id + ',' + thirdVital.interpretation_codes;
                }
                document.getElementById("bpSysInterpretation").value = selectedBpsysAbnHeight;
                setBpSysData({
                    vmId: 4,
                    unit: "mmHg",
                    vmValue: thirdVital.vmValue && thirdVital.vmValue !== '' ? thirdVital.vmValue : '',
                    external_id: '',
                    reason_code: thirdVital.reason_code,
                    reason_description: '',
                    encounterId: thirdVital.encounterId,
                    interpretation_option_id: thirdVital.interpretation_option_id,
                    interpretation_codes: thirdVital.interpretation_codes,
                    reason_status: thirdVital.reason_status,
                    interpretation_title: thirdVital.interpretation_title
                })
            }

            //Store Vital Data
            setStoreReasonData((prev) => ({
                ...prev,
                vWeight: firstViatl,
                vHeight: secondVital,
                vBpSys: thirdVital,
            }));
        }

    }, [vitalData])
    useEffect(() => {
        getAbnData();
        getAllVital();
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="med-box scrollcustum">
                        <div className="inner-content">
                            <div className="row">
                                {/* -----------------------------------------Weight----------------------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Weight</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="vmValue" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="vmValue" name='vmValue' value={weightData.vmValue} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='interpretation_option_id' name='interpretation_option_id' onChange={handleChange} >
                                                            <option value='0'>Select</option>
                                                            {abnList && abnList.map((list) => {
                                                                return (
                                                                    <option value={list.id + "," + list.code}>{list.title}</option>

                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <div>
                                                            <span className="AddVital" onClick={() => handleAddDiv('weight', 'vWeight')}><i class="bi bi-asterisk"></i></span>
                                                        </div>
                                                    </div>
                                                    {showDivs.weight && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Weight Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vWeight') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vWeight && vitalTypeArr.vWeight.length > 0 ?
                                                                                vitalTypeArr.vWeight.map((list, i) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div className='codesectn' key={i}>
                                                                                                <span>
                                                                                                    <input type='checkbox' style={{ marginRight: '5px' }} id={'ddlCoding' + i} onChange={() => handleCheckboxChange(i)} />
                                                                                                    {list}
                                                                                                </span>
                                                                                                <span>
                                                                                                    <label htmlFor={'ddlEmpty' + i} className='form-label'></label>
                                                                                                    {checkedStates[i] && (
                                                                                                        <button
                                                                                                            type='button'
                                                                                                            className='btndeltcode'
                                                                                                            onClick={() => handleRemove(i)}
                                                                                                        >
                                                                                                            <i className='bi bi-trash3'></i>
                                                                                                        </button>
                                                                                                    )}
                                                                                                </span>
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                })

                                                                                : ''}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                        <label htmlFor="" className="form-label">Reason Status</label>
                                                                        <select className='form-select form-select-sm' id='weightReasonstatus' name='reason_status' onChange={handleChange} >
                                                                            <option value='0'>Select</option>
                                                                            <option value='Pending'>Pending</option>
                                                                            <option value='Completed'>Completed</option>
                                                                            <option value='Negated'>Negated</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* -----------------------------------------------------------Height--------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Height/Length</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="vmValue" name='vmValue' value={heightData.vmValue} onChange={handleHeightChange} />

                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='heightinterpretation' name='interpretation_option_id' onChange={handleHeightChange} >
                                                            <option value='0'>Select</option>
                                                            {abnList && abnList.map((list) => {
                                                                return (
                                                                    <option value={list.id + "," + list.code}>{list.title}</option>

                                                                )
                                                            })}
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('height', 'vHeight')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.height && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Height/Length Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>


                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vHeight') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vHeight && vitalTypeArr.vHeight.length > 0 ?
                                                                                vitalTypeArr.vHeight.map((list, i) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div className='codesectn' key={i}>
                                                                                                <span>
                                                                                                    <input type='checkbox' style={{ marginRight: '5px' }} id={'ddlCoding' + i} onChange={() => handleCheckboxChange(i)} />
                                                                                                    {list}
                                                                                                </span>
                                                                                                <span>
                                                                                                    <label htmlFor={'ddlEmpty' + i} className='form-label'></label>
                                                                                                    {checkedStates[i] && (
                                                                                                        <button
                                                                                                            type='button'
                                                                                                            className='btndeltcode'
                                                                                                            onClick={() => handleRemove(i)}
                                                                                                        >
                                                                                                            <i className='bi bi-trash3'></i>
                                                                                                        </button>
                                                                                                    )}
                                                                                                </span>
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                })

                                                                                : ''}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                        <label htmlFor="" className="form-label">Reason Status</label>
                                                                        <select className='form-select form-select-sm' id='heightReasonstatus' name='reason_status' onChange={handleHeightChange}>
                                                                            <option value='0'>Select</option>
                                                                            <option value='Pending'>Pending</option>
                                                                            <option value='Completed'>Completed</option>
                                                                            <option value='Negated'>Negated</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* -----------------------------------------------------------BP Systolic--------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BP Systolic</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" value={bpSysData.vmValue} id="beginDateTime" name='vmValue' onChange={handleBySysChange} />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='bpSysInterpretation' name='interpretation_option_id' onChange={handleBySysChange} >
                                                            <option value='0'>Select</option>
                                                            {abnList && abnList.map((list) => {
                                                                return (
                                                                    <option value={list.id + "," + list.code}>{list.title}</option>

                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('BPSystolic', 'vBpSys')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.BPSystolic && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>BP Systolic Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vBpSys') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vBpSys && vitalTypeArr.vBpSys.length > 0 ?
                                                                                vitalTypeArr.vBpSys.map((list, i) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div className='codesectn' key={i}>
                                                                                                <span>
                                                                                                    <input type='checkbox' style={{ marginRight: '5px' }} id={'ddlCoding' + i} onChange={() => handleCheckboxChange(i)} />
                                                                                                    {list}
                                                                                                </span>
                                                                                                <span>
                                                                                                    <label htmlFor={'ddlEmpty' + i} className='form-label'></label>
                                                                                                    {checkedStates[i] && (
                                                                                                        <button
                                                                                                            type='button'
                                                                                                            className='btndeltcode'
                                                                                                            onClick={() => handleRemove(i)}
                                                                                                        >
                                                                                                            <i className='bi bi-trash3'></i>
                                                                                                        </button>
                                                                                                    )}
                                                                                                </span>
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                })

                                                                                : ''}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                        <label htmlFor="" className="form-label">Reason Status</label>
                                                                        <select className='form-select form-select-sm' id='bpSysReasonstatus' name='reason_status' onChange={handleBySysChange}>
                                                                            <option value='0'>Select</option>
                                                                            <option value='Pending'>Pending</option>
                                                                            <option value='Completed'>Completed</option>
                                                                            <option value='Negated'>Negated</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* -----------------------------------------------------------BP Diastolic--------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BP Diastolic</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('BPDiastolic')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.BPDiastolic && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>BP Diastolic Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Pulse --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Pulse</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('Pulse')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.Pulse && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Pulse Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Respiration  --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Respiration </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('Respiration')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.Respiration && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Respiration Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Temperature   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Temperature  </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('Temperature')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.Temperature && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Temperature Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Temp Location   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Temp Location  </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('TemperatureLocation')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.TemperatureLocation && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Oxygen Saturation   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Oxygen Saturation</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('OxygenSaturation')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.OxygenSaturation && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Oxygen Saturation Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Oxygen Flow Rate   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Oxygen Flow Rate</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('OxygenFlowRate')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.OxygenFlowRate && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Oxygen Flow Rate Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Inhaled Oxygen Concentration   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Inhaled Oxygen Concentration</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('InhaledOxygenConcentration')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.InhaledOxygenConcentration && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Inhaled Oxygen Concentration Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Head Circumference   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Head Circumference</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('HeadCircumference')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.HeadCircumference && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Head Circumference Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Waist  Circumference   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Waist  Circumference</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('WaistCircumference')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.WaistCircumference && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>Waist Circumference Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- BMI --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BMI </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('BMI')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.BMI && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>BMI Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- BMI Status --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BMI Status </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' >
                                                            <option value='0'>Select</option>
                                                            <option value='Pending'>Pending</option>
                                                            <option value='Completed'>Completed</option>
                                                            <option value='Completed'>Negated</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-2 mb-2">
                                                        <label htmlFor="ddlEmpty" className="form-label">&nbsp;</label>
                                                        <span className="AddVital" onClick={() => handleAddDiv('BMIStatus')}><i class="bi bi-asterisk"></i></span>
                                                    </div>
                                                    {showDivs.BMIStatus && (
                                                        <div className="med-box">
                                                            <div className="inner-content">
                                                                <div className="row">
                                                                    <div className="col-12 p-0">
                                                                        <div class="heading" style={{ fontSize: '14px' }}>BMI Status Reason Information</div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                                                                    </div>

                                                                    <div className="col-12 mt-4">
                                                                        <div className="row">
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Code</label>
                                                                                <input type='text' className='form-control form-control-sm mb-2' />
                                                                            </div>
                                                                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                                                <label htmlFor="" className="form-label">Reason Status</label>
                                                                                <select className='form-select form-select-sm'>
                                                                                    <option value='0'>Select Code</option>
                                                                                    <option value='1'>Pending</option>
                                                                                    <option value='2'>Completed</option>
                                                                                    <option value='3'>Negated</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ----------------------------------------------------------- Other Notes --------------------------------------- */}
                                {/* <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Other Notes</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Results/Details</label>
                                                        <textarea id="instructionTextId" type="text" className="form-control form-control-sm" name="instructionText" onChange={"handleChange"} />
                                                        <small id="errInstruction" className="form-text text-danger" style={{ display: 'none' }}>Instructions cannot be empty.</small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                            {updatebool === 0 ?
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={funSave}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                                : <button type="button" className="btn btn-save btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleSaveUpdate"}>{t("UPDATE")}</button>
                            }
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleClear"}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                        </div>
                    </div>
                </div>
                {/* {showVital === 1 ? */}
                {/* <div className="col-12 mt-1">
                    <div className='handlser'>
                        <Heading text={t("Vital List")} />
                        <div style={{ position: 'relative' }}>
                            <input type="text" className='form-control form-control-sm' placeholder={t("Search")} value={"searchTerm"} onChange={"handleSearch"} />
                            <span className="tblsericon"><i class="fas fa-search"></i></span>
                        </div>
                    </div>
                    <div className="med-table-section" style={{ "height": "25vh" }}>
                        <table className="med-table border_ striped">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")} </th>
                                    <th>Reason code</th>
                                    <th>Reason status</th>
                                    <th>Interpretation codes</th>
                                    <th>Interpretation title</th>
                                    <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vitalData && vitalData.map((val, index) => {
                                    const codingListItem = val.reason_code ? val.reason_code.split(';') : [];
                                    return (
                                        <tr>
                                            <td className="text-center">{index + 1}</td>
                                            <td>
                                                <div className='codeSplit'>
                                                    {codingListItem.map((coding, index) => (
                                                        coding.trim() !== '' &&
                                                        <span key={index} className="">{coding}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>{val.reason_status}</td>
                                            <td>{val.interpretation_codes}</td>
                                            <td>{val.interpretation_title}</td>
                                            <td>
                                                <div className="action-button">
                                                    <div data-bs-title="Edit Row" title="Edit Row" onClick={() => { "handleUpdate"("list") }}><img src={IconEdit} alt='' /></div>
                                                    <div data-bs-title="Delete Row" data-bs-target="#deleteModal" onClick={() => { "handleDelete"("list.id") }}><img src={IconDelete} alt='' /></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div> */}
                {/* : */}

                {/* } */}
            </div>
            {/* ------------------------------------------ Code Master popUp Start------------------------------------ */}
            {isShowPopUp === 1 ?

                <div className={`modal d-${isShowPopUp === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static" >
                    <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
                        <div className="modal-content" >
                            {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>
                            <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={true} />
                            {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
                        </div>
                    </div>
                </div>
                : ''}
            {/* ------------------------------------------ Code Master popUp End------------------------------------ */}
        </div>

    )
}

export default FHIRVitals
