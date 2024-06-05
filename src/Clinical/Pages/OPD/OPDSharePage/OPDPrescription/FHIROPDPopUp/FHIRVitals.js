import React, { useEffect, useState } from 'react'
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import { t } from 'i18next';
import { CodeMaster } from '../../../../../../Admin/Pages/EMR Master/CodeMaster';
import GetEMRVitalAbnMaster from '../../../../../API/OPD/Vitals/GetEMRVitalAbnMaster';
import PostPatientIPDPrescription from '../../../../../API/IPD/Prescription/PostPatientIPDPrescription';
import GetPatientIPDAllHistory from '../../../../../API/IPD/Prescription/GetPatientIPDAllHistory';
import SuccessToster from '../../../../../../Component/SuccessToster';
import AlertToster from '../../../../../../Component/AlertToster';
import POSTOPDPatientPrescription from '../../../../../API/OPD/Prescription/POSTOPDPatientPrescription';


function FHIRVitals({ theEncounterId , setPatientType}) {
    const [isShowPopUp, setIsShowPopUp] = useState(0);
    const [PopUpId, setPopUpId] = useState('');
    const [checkedStates, setCheckedStates] = useState({});
    const [abnList, setAbnList] = useState([]);
    const [txtCoding, setTxtCoding] = useState([]);
    let [updatebool, setUpdatebool] = useState(0);
    let [makeData, setMakeData] = useState([]);
    let [showToster, setShowToster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showErrMessage, setShowErrMessage] = useState('');
    let [getData, setgetData] = useState([]);
    let [vitalData, setVitalData] = useState([]);
    let [vitalType, setVitalType] = useState("");
    const [inputIsValid, setInputIsValid] = useState(false);

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
        console.log('get data from api', response.responseValue)
        if (response.status === 1) {
            setVitalData(response.responseValue)
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
    const [weightValidation, setWeightValidation] = useState({
        vmValue: '',
    });
    const [heightValidation, setHeightValidation] = useState({
        vmValue: '',
    });
    const [bpSystolicValidation, setBpSystolicValidation] = useState({
        vmValue: '',
    });
    const [bpDiastolicValidation, setBPDiastolicValidation] = useState({
        vmValue: '',
    });
    const [pulseRateValidation, setPulseRateValidation] = useState({
        vmValue: '',
    });
    const [respirationRateValidation, setRespirationRateValidation] = useState({
        vmValue: '',
    });
    const [temperatureValidation, setTemperatureValidation] = useState({
        vmValue: '',
    });
    const [inhaledOxygenValidation, setInhaledOxygenValidation] = useState({
        vmValue: '',
    });
    const [oxygenFlowRateValidation, setOxygenFlowRateValidation] = useState({
        vmValue: '',
    });
    const [headCircumferenceValidation, setHeadCircumferenceValidation] = useState({
        vmValue: '',
    });
    const [waistCircumferenceValidation, setWaistCircumferenceValidation] = useState({
        vmValue: '',
    });
    const [bmiValidation, setBMIValidation] = useState({
        vmValue: '',
    });
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
    const [bpDysData, setBpDysData] = useState({
        vmId: 6,
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
    const [pulseData, setPulseData] = useState({
        vmId: 3,
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
    const [respirationData, setRespirationData] = useState({
        vmId: 7,
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
    const [temperatureData, setTemperatureData] = useState({
        vmId: 5,
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

    const [oxygeSatData, setOxygeSatData] = useState({
        vmId: 136,
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
    const [oxygeFlowData, setOxygeFlowData] = useState({
        vmId: 93,
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
    const [inhaledOxygeData, setInhaledOxygeData] = useState({
        vmId: 229,
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
    const [headCircumData, setHeadCircumData] = useState({
        vmId: 230,
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
    const [waistCircumData, setWaistCircumData] = useState({
        vmId: 231,
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
    const [bmiData, setBMIData] = useState({
        vmId: 232,
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
    // const [bmiStatusData, setBMIStatusData] = useState({
    //     vmId: 3,
    //     unit: "mmHg",
    //     vmValue: '',
    //     external_id: '',
    //     reason_code: '',
    //     reason_description: '',
    //     encounterId: 0,
    //     interpretation_option_id: '',
    //     interpretation_codes: '',
    //     reason_status: '',
    //     interpretation_title: '',
    // });

    const [vitalTypeArr, setVitalTypeArr] = useState({ 'vWeight': [], 'vHeight': [], 'vBpSys': [], 'vBpDys': [], 'vPulse': [], 'vRespiration': [], 'vTemperature': [], 'vOxySaturation': [], 'vOxyFlow': [], 'vOxyConcentration': [], 'vHeadCircumference': [], 'vWaistCircumference': [], 'vBMI': [], 'vBMIStatus': [] });
    const [storeReasonData, setStoreReasonData] = useState({
        'vWeight': [],
        'vHeight': [],
        'vBpSys': [],
        'vBpDys': [],
        'vPulse': [],
        'vRespiration': [],
        'vTemperature': [],
        'vOxySaturation': [],
        'vOxyFlow': [],
        'vOxyConcentration': [],
        'vHeadCircumference': [],
        'vWaistCircumference': [],
        'vBMI': [],
        'vBMIStatus': []
    });
    const [vitalReason, setVitalReason] = useState({
        'vWeight': "weightReasonstatus",
        'vHeight': "heightReasonstatus",
        'vBpSys': "bpSysReasonstatus",
        'vBpDys': "bpDysReasonstatus",
        'vPulse': "pulseReasonstatus",
        'vRespiration': "respirationReasonstatus",
        'vTemperature': "tempReasonstatus",
        'vOxySaturation': "oxySaturationReasonstatus",
        'vOxyFlow': "oxyFlowReasonstatus",
        'vOxyConcentration': "oxyConcentrationReasonstatus",
        'vHeadCircumference': "headCircumferenceReasonstatus",
        'vWaistCircumference': "waistCircumferenceReasonstatus",
        'vBMI': "bmiReasonstatus",
        'vBMIStatus': "bmistatusReasonstatus",
    });
    const [vitalReasonModal, setVitalReasonModal] = useState({
        'vWeight': 0,
        'vHeight': 0,
        'vBpSys': 0,
        'vBpDys': 0,
        'vPulse': 0,
        'vRespiration': 0,
        'vTemperature': 0,
        'vOxySaturation': 0,
        'vOxyFlow': 0,
        'vOxyConcentration': 0,
        'vHeadCircumference': 0,
        'vWaistCircumference': 0,
        'vBMI': 0,
        'vBMIStatus': 0
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
        setWeightData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (name === "vmValue") {
            if (!value) {
                setWeightValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const weight = parseFloat(e.target.value); // Convert value to a number
                if (isNaN(weight) || weight < 22 || weight > 1100) { // Assuming 22 lbs to 1100 lbs is the valid range
                    setWeightValidation(prev => ({ ...prev, [name]: 'Enter a weight between 22 lbs and 1100 lbs.' }));
                    setInputIsValid(false);
                } else {
                    setWeightValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }

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
        setHeightData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (name === "vmValue") {
            if (!value) {
                setHeightValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const height = parseFloat(e.target.value); // Convert value to a number
                if (isNaN(height) || height < 12 || height > 120) {
                    setHeightValidation(prev => ({ ...prev, [name]: 'Enter a height between 12 inches and 120 inches.' }));
                    setInputIsValid(false);
                } else {
                    setHeightValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }
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
        setBpSysData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (name === "vmValue") {
            if (!value) {
                setBpSystolicValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const systolicBP = parseInt(value);
                if (isNaN(systolicBP) || systolicBP < 90 || systolicBP > 120) {
                    setBpSystolicValidation(prev => ({ ...prev, [name]: 'Enter a systolic blood pressure between 90 mmHg and 120 mmHg.' }));
                    setInputIsValid(false);
                } else {
                    setBpSystolicValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }
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
    const handleBpDysChange = (e) => {
        const { name, value } = e.target;
        const ddlBpDysHeight = document.getElementById("bpDysInterpretation");
        const selectedOption = ddlBpDysHeight ? ddlBpDysHeight.options[ddlBpDysHeight.selectedIndex] : null;
        const ddlBpDysHeightcode = ddlBpDysHeight ? ddlBpDysHeight.value : '';
        const selectHeightAbn = selectedOption ? selectedOption.textContent : "";
        const bpDysHeightCode = ddlBpDysHeightcode.split(',');
        const interpretation_option_id = bpDysHeightCode.length > 0 ? bpDysHeightCode[0] : '';
        const interpretation_codes = bpDysHeightCode.length > 1 ? bpDysHeightCode[1] : '';


        const interpretation_title = selectHeightAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vBpDys'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)

        if (name === "vmValue") {
            if (!value) {
                setBPDiastolicValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const diastolicBP = parseInt(value);
                if (isNaN(diastolicBP) || diastolicBP < 60 || diastolicBP > 80) {
                    setBPDiastolicValidation(prev => ({ ...prev, [name]: 'Enter a diastolic blood pressure between 60 mmHg and 80 mmHg.' }));
                    setInputIsValid(false);
                } else {
                    setBPDiastolicValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }

        // Update state with diastolic blood pressure value
        setBpDysData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("bpDysReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setBpDysData((prev) => ({
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
            setBpDysData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handlePulseChange = (e) => {
        const { name, value } = e.target;
        const ddlPulse = document.getElementById("bpPulseInterpretation");
        const selectedOption = ddlPulse ? ddlPulse.options[ddlPulse.selectedIndex] : null;
        const selectPulseAbn = selectedOption ? selectedOption.textContent : "";
        const ddlPulsecode = ddlPulse ? ddlPulse.value : '';
        const bpPulseCode = ddlPulsecode.split(',');
        const interpretation_option_id = bpPulseCode.length > 0 ? bpPulseCode[0] : '';
        const interpretation_codes = bpPulseCode.length > 1 ? bpPulseCode[1] : '';

        const interpretation_title = selectPulseAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vPulse'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        if (name === "vmValue") {
            if (!value) {
                setPulseRateValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const pulseRate = parseInt(value);
                if (isNaN(pulseRate) || pulseRate < 60 || pulseRate > 100) {
                    setPulseRateValidation(prev => ({ ...prev, [name]: 'Enter a pulse rate between 60 bpm and 100 bpm.' }));
                    setInputIsValid(false);
                } else {
                    setPulseRateValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }

        setPulseData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("pulseReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setPulseData((prev) => ({
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
            setPulseData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handleRespirationChange = (e) => {
        const { name, value } = e.target;
        const ddlRespiration = document.getElementById("respInterpretation");
        const selectedOption = ddlRespiration ? ddlRespiration.options[ddlRespiration.selectedIndex] : null;
        const selectRespirationAbn = selectedOption ? selectedOption.textContent : "";
        const ddlRespirationcode = ddlRespiration ? ddlRespiration.value : '';
        const bpRespirationCode = ddlRespirationcode.split(',');
        const interpretation_option_id = bpRespirationCode.length > 0 ? bpRespirationCode[0] : '';
        const interpretation_codes = bpRespirationCode.length > 1 ? bpRespirationCode[1] : '';

        const interpretation_title = selectRespirationAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vRespiration'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        setRespirationData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === "vmValue") {
            if (!value) {
                setRespirationRateValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const respirationRate = parseInt(value);
                if (isNaN(respirationRate) || respirationRate < 12 || respirationRate > 20) {
                    setRespirationRateValidation(prev => ({ ...prev, [name]: 'Enter a respiration rate between 12 breaths/min and 20 breaths/min.' }));
                    setInputIsValid(false);
                } else {
                    setRespirationRateValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }


        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("respirationReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setRespirationData((prev) => ({
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
            setRespirationData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handleTemperatureChange = (e) => {
        const { name, value } = e.target;
        const ddlTemperature = document.getElementById("tempInterpretation");
        const selectedOption = ddlTemperature ? ddlTemperature.options[ddlTemperature.selectedIndex] : null;
        const selectTemperatureAbn = selectedOption ? selectedOption.textContent : "";
        const ddlTemperaturecode = ddlTemperature ? ddlTemperature.value : '';
        const temperatureCode = ddlTemperaturecode.split(',');
        const interpretation_option_id = temperatureCode.length > 0 ? temperatureCode[0] : '';
        const interpretation_codes = temperatureCode.length > 1 ? temperatureCode[1] : '';

        const interpretation_title = selectTemperatureAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vTemperature'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        setTemperatureData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === "vmValue") {
            if (!value) {
                setTemperatureValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const bodyTemperature = parseFloat(value)
                if (isNaN(bodyTemperature) || bodyTemperature < 97 || bodyTemperature > 99.5) {
                    setTemperatureValidation(prev => ({ ...prev, [name]: 'Enter a temperature between 97°F and 99.5°F.' }));
                    setInputIsValid(false);
                } else {
                    setTemperatureValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("tempReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setTemperatureData((prev) => ({
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
            setTemperatureData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handleOxygenSaturationChange = (e) => {
        const { name, value } = e.target;
        const ddlOxySat = document.getElementById("oxySatInterpretation");
        const selectedOption = ddlOxySat ? ddlOxySat.options[ddlOxySat.selectedIndex] : null;
        const selectddlOxySatAbn = selectedOption ? selectedOption.textContent : "";
        const ddlOxySatcode = ddlOxySat ? ddlOxySat.value : '';
        const OxySatcode = ddlOxySatcode.split(',');
        const interpretation_option_id = OxySatcode.length > 0 ? OxySatcode[0] : '';
        const interpretation_codes = OxySatcode.length > 1 ? OxySatcode[1] : '';

        const interpretation_title = selectddlOxySatAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vOxySaturation'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        setOxygeSatData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === "vmValue") {
            if (!value) {
                setInhaledOxygenValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const oxygenSaturation = parseInt(value);
                if (isNaN(oxygenSaturation) || oxygenSaturation < 1 || oxygenSaturation > 100) {
                    setInhaledOxygenValidation(prev => ({ ...prev, [name]: 'Enter valid SpO2 value between 1% and 100%.' }));
                    setInputIsValid(false);
                } else {
                    setInhaledOxygenValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("oxySaturationReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setOxygeSatData((prev) => ({
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
            setOxygeSatData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handleOxygenFlowChange = (e) => {
        const { name, value } = e.target;
        const ddlOxyFlow = document.getElementById("oxyFlowInterpretation");
        const selectedOption = ddlOxyFlow ? ddlOxyFlow.options[ddlOxyFlow.selectedIndex] : null;
        const selectOxyFlowAbn = selectedOption ? selectedOption.textContent : "";
        const ddlOxyFlowcode = ddlOxyFlow ? ddlOxyFlow.value : '';
        const OxyFlowcodeCode = ddlOxyFlowcode.split(',');
        const interpretation_option_id = OxyFlowcodeCode.length > 0 ? OxyFlowcodeCode[0] : '';
        const interpretation_codes = OxyFlowcodeCode.length > 1 ? OxyFlowcodeCode[1] : '';

        const interpretation_title = selectOxyFlowAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vOxyFlow'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        setOxygeFlowData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === "vmValue") {
            if (!value) {
                setOxygenFlowRateValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const oxygenFlowRate = parseFloat(value);
                if (isNaN(oxygenFlowRate) || oxygenFlowRate < 0 || oxygenFlowRate > 6) {
                    setOxygenFlowRateValidation(prev => ({ ...prev, [name]: 'Enter an oxygen flow rate between 0 L/min and 6 L/min.' }));
                    setInputIsValid(false);
                } else {
                    setOxygenFlowRateValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("oxyFlowReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setOxygeFlowData((prev) => ({
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
            setOxygeFlowData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handleInhaledOxygenChange = (e) => {
        const { name, value } = e.target;
        const ddlInhaled = document.getElementById("inhaledOxyInterpretation");
        const selectedOption = ddlInhaled ? ddlInhaled.options[ddlInhaled.selectedIndex] : null;
        const selectInhaledAbn = selectedOption ? selectedOption.textContent : "";
        const ddlInhaledcode = ddlInhaled ? ddlInhaled.value : '';
        const InhaledCode = ddlInhaledcode.split(',');
        const interpretation_option_id = InhaledCode.length > 0 ? InhaledCode[0] : '';
        const interpretation_codes = InhaledCode.length > 1 ? InhaledCode[1] : '';

        const interpretation_title = selectInhaledAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['inhaledOxyInterpretation'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("oxyConcentrationReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setInhaledOxygeData((prev) => ({
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
            setInhaledOxygeData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handleHeadCircumChange = (e) => {
        const { name, value } = e.target;
        const ddlHead = document.getElementById("headCircumInterpretation");
        const selectedOption = ddlHead ? ddlHead.options[ddlHead.selectedIndex] : null;
        const selectHeadAbn = selectedOption ? selectedOption.textContent : "";
        const ddlHeadcode = ddlHead ? ddlHead.value : '';
        const headCode = ddlHeadcode.split(',');
        const interpretation_option_id = headCode.length > 0 ? headCode[0] : '';
        const interpretation_codes = headCode.length > 1 ? headCode[1] : '';

        const interpretation_title = selectHeadAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vHeadCircumference'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        setHeadCircumData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === "vmValue") {
            if (!value) {
                setHeadCircumferenceValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const headCircumference = parseFloat(value);
                if (isNaN(headCircumference) || headCircumference < 31 || headCircumference > 59) {
                    setHeadCircumferenceValidation(prev => ({ ...prev, [name]: 'Enter an a head circumference between 31 cm and 59 cm.' }));
                    setInputIsValid(false);
                } else {
                    setHeadCircumferenceValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("headCircumferenceReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setHeadCircumData((prev) => ({
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
            setHeadCircumData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handleWaistCircumChange = (e) => {
        const { name, value } = e.target;
        const ddlWaist = document.getElementById("waistCircumInterpretation");
        const selectedOption = ddlWaist ? ddlWaist.options[ddlWaist.selectedIndex] : null;
        const selectWaistAbn = selectedOption ? selectedOption.textContent : "";
        const ddlWaistcode = ddlWaist ? ddlWaist.value : '';
        const waistCode = ddlWaistcode.split(',');
        const interpretation_option_id = waistCode.length > 0 ? waistCode[0] : '';
        const interpretation_codes = waistCode.length > 1 ? waistCode[1] : '';

        const interpretation_title = selectWaistAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vWaistCircumference'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        setWaistCircumData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === "vmValue") {
            if (!value) {
                setWaistCircumferenceValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const waistCircumference = parseFloat(value);
                if (isNaN(waistCircumference) || waistCircumference <= 0 || waistCircumference > 200) {
                    setWaistCircumferenceValidation(prev => ({ ...prev, [name]: 'Enter an waist circumference between 1 cm and 200 cm.' }));
                    setInputIsValid(false);
                } else {
                    setWaistCircumferenceValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("waistCircumferenceReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setWaistCircumData((prev) => ({
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
            setWaistCircumData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    const handleBMIChange = (e) => {
        const { name, value } = e.target;
        const ddlBmi = document.getElementById("bmiInterpretation");
        const selectedOption = ddlBmi ? ddlBmi.options[ddlBmi.selectedIndex] : null;
        const selectBMIAbn = selectedOption ? selectedOption.textContent : "";
        const ddlBMIcode = ddlBmi ? ddlBmi.value : '';
        const bmiCode = ddlBMIcode.split(',');
        const interpretation_option_id = bmiCode.length > 0 ? bmiCode[0] : '';
        const interpretation_codes = bmiCode.length > 1 ? bmiCode[1] : '';

        const interpretation_title = selectBMIAbn;
        const encounterId = theEncounterId;
        let getVitalReasonModalStatus = vitalReasonModal['vBMI'];
        console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
        setBMIData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === "vmValue") {
            if (!value) {
                setOxygenFlowRateValidation(prev => ({ ...prev, [name]: '' }));
                setInputIsValid(true);
            } else {
                const oxygenFlowRate = parseFloat(value);
                if (isNaN(oxygenFlowRate) || oxygenFlowRate < 0 || oxygenFlowRate > 6) {
                    setOxygenFlowRateValidation(prev => ({ ...prev, [name]: 'Enter an oxygen flow rate between 0 L/min and 6 L/min.' }));
                    setInputIsValid(false);
                } else {
                    setOxygenFlowRateValidation(prev => ({ ...prev, [name]: '' }));
                    setInputIsValid(true);
                }
            }
        }
        if (getVitalReasonModalStatus) {
            const reasonElement = document.getElementById("bmiReasonstatus").value;
            console.log('reasonElement height', reasonElement);
            console.log('reason_status height', reasonElement);
            setBMIData((prev) => ({
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
            setBMIData((prev) => ({
                ...prev,
                [name]: value,
                interpretation_option_id: interpretation_option_id,
                interpretation_codes: interpretation_codes,
                encounterId: encounterId,
                interpretation_title: interpretation_title,
            }));
        }

    };
    // const handleBMIStatusChange = (e) => {
    //     const { name, value } = e.target;
    //     const ddlBMIStatus = document.getElementById("bmistatusInterpretation");
    //     const selectedOption = ddlBMIStatus ? ddlBMIStatus.options[ddlBMIStatus.selectedIndex] : null;
    //     const selectBMIStatusAbn = selectedOption ? selectedOption.textContent : "";
    //     const ddlBMIStatuscode = ddlBMIStatus ? ddlBMIStatus.value : '';
    //     const bpBMIStatusCode = ddlBMIStatuscode.split(',');
    //     const interpretation_option_id = bpBMIStatusCode.length > 0 ? bpBMIStatusCode[0] : '';
    //     const interpretation_codes = bpBMIStatusCode.length > 1 ? bpBMIStatusCode[1] : '';

    //     const interpretation_title = selectBMIStatusAbn;
    //     const encounterId = theEncounterId;
    //     let getVitalReasonModalStatus = vitalReasonModal['vBMIStatus'];
    //     console.log('getVitalReasonModalStatus height', getVitalReasonModalStatus)
    //     if (getVitalReasonModalStatus) {
    //         const reasonElement = document.getElementById("bmistatusInterpretation").value;
    //         console.log('reasonElement height', reasonElement);
    //         console.log('reason_status height', reasonElement);
    //         setBMIStatusData((prev) => ({
    //             ...prev,
    //             [name]: value,
    //             reason_status: reasonElement,
    //             interpretation_option_id: interpretation_option_id,
    //             interpretation_codes: interpretation_codes,
    //             encounterId: encounterId,
    //             interpretation_title: interpretation_title,
    //         }));
    //     }
    //     else {
    //         setBMIStatusData((prev) => ({
    //             ...prev,
    //             [name]: value,
    //             interpretation_option_id: interpretation_option_id,
    //             interpretation_codes: interpretation_codes,
    //             encounterId: encounterId,
    //             interpretation_title: interpretation_title,
    //         }));
    //     }

    // };


    const funSave = async () => {
        if (inputIsValid) {
            const vitalData = JSON.stringify([weightData, heightData, bpSysData, bpDysData, pulseData, respirationData, temperatureData, oxygeSatData, oxygeFlowData, inhaledOxygeData, headCircumData, waistCircumData, bmiData])
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
            if(setPatientType === 'OPD'){
                const response = await POSTOPDPatientPrescription(vitalObj)
            if (response.status === 1) {
                getAllVital();
                setShowToster(1)
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)
            }
            else {
                setShowAlertToster(1)
                setShowErrMessage(response.responseValue)
                setTimeout(() => {
                    setShowAlertToster(0)
                }, 2000)
            }
            }
            else{
                const response = await PostPatientIPDPrescription(vitalObj)
            if (response.status === 1) {
                getAllVital();
                setShowToster(1)
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)
            }
            else {
                setShowAlertToster(1)
                setShowErrMessage(response.responseValue)
                setTimeout(() => {
                    setShowAlertToster(0)
                }, 2000)
            }
            }
            
        }
    }

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
            console.log('getStoreData', getStoreData);
            console.log('getStoreData', Object.keys(getStoreData).length);
            if (Object.keys(getStoreData).length !== 0) {
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
        else if (vitalType === "vBpDys") {
            setBpDysData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vPulse") {
            setPulseData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vRespiration") {
            setRespirationData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vTemperature") {
            setTemperatureData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vOxySaturation") {
            setOxygeSatData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vOxyFlow") {
            setOxygeFlowData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vOxyConcentration") {
            setInhaledOxygeData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vHeadCircumference") {
            setHeadCircumData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vWaistCircumference") {
            setWaistCircumData((prev) => ({
                ...prev,
                reason_code: reason_code,
            }))
        }
        else if (vitalType === "vBMI") {
            setBMIData((prev) => ({
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

    let handleRemove = (index, vitaltype) => {
        const reasonCodeDataTempArr = vitalTypeArr[vitaltype];
        if (reasonCodeDataTempArr.length > 0) {
            reasonCodeDataTempArr.splice(index, 1);
            let tempData = "";
            reasonCodeDataTempArr.forEach((list, i) => {
                tempData = tempData.length === 0 ? list : tempData + ';' + list;
            });
            setVitalTypeArr((prev) => (
                {
                    ...prev,
                    [vitaltype]: reasonCodeDataTempArr
                }
            ));
            if (vitaltype === "vWeight") {
                setWeightData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vHeight") {
                setHeightData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vBpSys") {
                setBpSysData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vBpDys") {
                setBpDysData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vPulse") {
                setPulseData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vRespiration") {
                setRespirationData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vTemperature") {
                setTemperatureData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vOxySaturation") {
                setOxygeSatData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vOxyFlow") {
                setOxygeFlowData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vOxyConcentration") {
                setInhaledOxygeData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vHeadCircumference") {
                setHeadCircumData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vWaistCircumference") {
                setWaistCircumData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
            else if (vitaltype === "vBMI") {
                setBMIData((prev) => ({
                    ...prev,
                    reason_code: tempData,
                }))
            }
        }
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
            //BpDys Data
            const bpDysVital = vitalData[3];
            if (bpDysVital && bpDysVital) {
                console.log("bpDysVital", bpDysVital);
                let selectedBpDysAbnHeight = "0";
                if (bpDysVital.interpretation_option_id && bpDysVital.interpretation_codes) {
                    selectedBpDysAbnHeight = bpDysVital.interpretation_option_id + ',' + bpDysVital.interpretation_codes;
                }
                document.getElementById("bpDysInterpretation").value = selectedBpDysAbnHeight;
                setBpDysData({
                    vmId: 6,
                    unit: "mmHg",
                    vmValue: bpDysVital.vmValue && bpDysVital.vmValue !== '' ? bpDysVital.vmValue : '',
                    external_id: '',
                    reason_code: bpDysVital.reason_code,
                    reason_description: '',
                    encounterId: bpDysVital.encounterId,
                    interpretation_option_id: bpDysVital.interpretation_option_id,
                    interpretation_codes: bpDysVital.interpretation_codes,
                    reason_status: bpDysVital.reason_status,
                    interpretation_title: bpDysVital.interpretation_title
                })
            }
            //Pulse Data
            const pulseData = vitalData[4];
            if (pulseData && pulseData) {
                console.log("pulseData", pulseData);
                let pulseAbnHeight = "0";
                if (pulseData.interpretation_option_id && pulseData.interpretation_codes) {
                    pulseAbnHeight = pulseData.interpretation_option_id + ',' + pulseData.interpretation_codes;
                }
                document.getElementById("bpDysInterpretation").value = pulseAbnHeight;
                setPulseData({
                    vmId: 3,
                    unit: "mmHg",
                    vmValue: pulseData.vmValue && pulseData.vmValue !== '' ? pulseData.vmValue : '',
                    external_id: '',
                    reason_code: pulseData.reason_code,
                    reason_description: '',
                    encounterId: pulseData.encounterId,
                    interpretation_option_id: pulseData.interpretation_option_id,
                    interpretation_codes: pulseData.interpretation_codes,
                    reason_status: pulseData.reason_status,
                    interpretation_title: pulseData.interpretation_title
                })
            }
            //Respiration Data
            const RespirationData = vitalData[5];
            if (RespirationData && RespirationData) {
                console.log("RespirationData", RespirationData);
                let respirationAbnHeight = "0";
                if (RespirationData.interpretation_option_id && RespirationData.interpretation_codes) {
                    respirationAbnHeight = RespirationData.interpretation_option_id + ',' + RespirationData.interpretation_codes;
                }
                document.getElementById("respInterpretation").value = respirationAbnHeight;
                setRespirationData({
                    vmId: 7,
                    unit: "mmHg",
                    vmValue: RespirationData.vmValue && RespirationData.vmValue !== '' ? RespirationData.vmValue : '',
                    external_id: '',
                    reason_code: RespirationData.reason_code,
                    reason_description: '',
                    encounterId: RespirationData.encounterId,
                    interpretation_option_id: RespirationData.interpretation_option_id,
                    interpretation_codes: RespirationData.interpretation_codes,
                    reason_status: RespirationData.reason_status,
                    interpretation_title: RespirationData.interpretation_title
                })
            }
            //Temperature Data
            const temperatureData = vitalData[6];
            if (temperatureData && temperatureData) {
                console.log("temperatureData", temperatureData);
                let temperatureAbnHeight = "0";
                if (temperatureData.interpretation_option_id && temperatureData.interpretation_codes) {
                    temperatureAbnHeight = temperatureData.interpretation_option_id + ',' + temperatureData.interpretation_codes;
                }
                document.getElementById("tempInterpretation").value = temperatureAbnHeight;
                setTemperatureData({
                    vmId: 5,
                    unit: "mmHg",
                    vmValue: temperatureData.vmValue && temperatureData.vmValue !== '' ? pulseData.vmValue : '',
                    external_id: '',
                    reason_code: temperatureData.reason_code,
                    reason_description: '',
                    encounterId: temperatureData.encounterId,
                    interpretation_option_id: temperatureData.interpretation_option_id,
                    interpretation_codes: temperatureData.interpretation_codes,
                    reason_status: temperatureData.reason_status,
                    interpretation_title: temperatureData.interpretation_title
                })
            }
            //Oxygen Saturation Data
            const OxySatData = vitalData[7];
            if (OxySatData && OxySatData) {
                console.log("OxySatData", OxySatData);
                let oxySatAbnHeight = "0";
                if (OxySatData.interpretation_option_id && OxySatData.interpretation_codes) {
                    oxySatAbnHeight = OxySatData.interpretation_option_id + ',' + OxySatData.interpretation_codes;
                }
                document.getElementById("oxySatInterpretation").value = oxySatAbnHeight;
                setOxygeSatData({
                    vmId: 136,
                    unit: "mmHg",
                    vmValue: OxySatData.vmValue && OxySatData.vmValue !== '' ? OxySatData.vmValue : '',
                    external_id: '',
                    reason_code: OxySatData.reason_code,
                    reason_description: '',
                    encounterId: OxySatData.encounterId,
                    interpretation_option_id: OxySatData.interpretation_option_id,
                    interpretation_codes: OxySatData.interpretation_codes,
                    reason_status: OxySatData.reason_status,
                    interpretation_title: OxySatData.interpretation_title
                })
            }
            //Oxygen Flow Data
            const oxyFlowData = vitalData[8];
            if (oxyFlowData && oxyFlowData) {
                console.log("oxyFlowData", oxyFlowData);
                let oxyFlowAbnHeight = "0";
                if (oxyFlowData.interpretation_option_id && oxyFlowData.interpretation_codes) {
                    oxyFlowAbnHeight = oxyFlowData.interpretation_option_id + ',' + oxyFlowData.interpretation_codes;
                }
                document.getElementById("oxyFlowInterpretation").value = oxyFlowAbnHeight;
                setOxygeFlowData({
                    vmId: 93,
                    unit: "mmHg",
                    vmValue: oxyFlowData.vmValue && oxyFlowData.vmValue !== '' ? oxyFlowData.vmValue : '',
                    external_id: '',
                    reason_code: oxyFlowData.reason_code,
                    reason_description: '',
                    encounterId: oxyFlowData.encounterId,
                    interpretation_option_id: oxyFlowData.interpretation_option_id,
                    interpretation_codes: oxyFlowData.interpretation_codes,
                    reason_status: oxyFlowData.reason_status,
                    interpretation_title: oxyFlowData.interpretation_title
                })
            }
            //Inhaled Oxygen Data
            const inhaledOxygenData = vitalData[9];
            if (inhaledOxygenData && inhaledOxygenData) {
                console.log("inhaledOxygenData", inhaledOxygenData);
                let inhaledOxygenAbnHeight = "0";
                if (inhaledOxygenData.interpretation_option_id && inhaledOxygenData.interpretation_codes) {
                    inhaledOxygenAbnHeight = inhaledOxygenData.interpretation_option_id + ',' + inhaledOxygenData.interpretation_codes;
                }
                document.getElementById("inhaledOxyInterpretation").value = inhaledOxygenAbnHeight;
                setInhaledOxygeData({
                    vmId: 229,
                    unit: "mmHg",
                    vmValue: inhaledOxygenData.vmValue && inhaledOxygenData.vmValue !== '' ? inhaledOxygenData.vmValue : '',
                    external_id: '',
                    reason_code: inhaledOxygenData.reason_code,
                    reason_description: '',
                    encounterId: inhaledOxygenData.encounterId,
                    interpretation_option_id: inhaledOxygenData.interpretation_option_id,
                    interpretation_codes: inhaledOxygenData.interpretation_codes,
                    reason_status: inhaledOxygenData.reason_status,
                    interpretation_title: inhaledOxygenData.interpretation_title
                })
            }
            //Head Circumference Data
            const headCircumData = vitalData[10];
            if (headCircumData && headCircumData) {
                console.log("headCircumData", headCircumData);
                let headCircumAbnHeight = "0";
                if (headCircumData.interpretation_option_id && pulseData.interpretation_codes) {
                    headCircumAbnHeight = pulseData.interpretation_option_id + ',' + pulseData.interpretation_codes;
                }
                document.getElementById("headCircumInterpretation").value = headCircumAbnHeight;
                setHeadCircumData({
                    vmId: 230,
                    unit: "mmHg",
                    vmValue: headCircumData.vmValue && headCircumData.vmValue !== '' ? headCircumData.vmValue : '',
                    external_id: '',
                    reason_code: headCircumData.reason_code,
                    reason_description: '',
                    encounterId: headCircumData.encounterId,
                    interpretation_option_id: headCircumData.interpretation_option_id,
                    interpretation_codes: headCircumData.interpretation_codes,
                    reason_status: headCircumData.reason_status,
                    interpretation_title: headCircumData.interpretation_title
                })
            }
            //Waist  Circumference Data
            const waistCircumData = vitalData[11];
            if (waistCircumData && waistCircumData) {
                console.log("waistCircumData", waistCircumData);
                let waistCircumAbnHeight = "0";
                if (waistCircumData.interpretation_option_id && waistCircumData.interpretation_codes) {
                    waistCircumAbnHeight = waistCircumData.interpretation_option_id + ',' + waistCircumData.interpretation_codes;
                }
                document.getElementById("waistCircumInterpretation").value = waistCircumAbnHeight;
                setWaistCircumData({
                    vmId: 231,
                    unit: "mmHg",
                    vmValue: waistCircumData.vmValue && waistCircumData.vmValue !== '' ? waistCircumData.vmValue : '',
                    external_id: '',
                    reason_code: waistCircumData.reason_code,
                    reason_description: '',
                    encounterId: waistCircumData.encounterId,
                    interpretation_option_id: waistCircumData.interpretation_option_id,
                    interpretation_codes: waistCircumData.interpretation_codes,
                    reason_status: waistCircumData.reason_status,
                    interpretation_title: waistCircumData.interpretation_title
                })
            }
            //BMI Data
            const bmiData = vitalData[12];
            if (bmiData && bmiData) {
                console.log("bmiData", bmiData);
                let bmiAbnHeight = "0";
                if (bmiData.interpretation_option_id && bmiData.interpretation_codes) {
                    bmiAbnHeight = bmiData.interpretation_option_id + ',' + bmiData.interpretation_codes;
                }
                document.getElementById("bmiInterpretation").value = bmiAbnHeight;
                setBMIData({
                    vmId: 232,
                    unit: "mmHg",
                    vmValue: bmiData.vmValue && bmiData.vmValue !== '' ? bmiData.vmValue : '',
                    external_id: '',
                    reason_code: bmiData.reason_code,
                    reason_description: '',
                    encounterId: bmiData.encounterId,
                    interpretation_option_id: bmiData.interpretation_option_id,
                    interpretation_codes: bmiData.interpretation_codes,
                    reason_status: bmiData.reason_status,
                    interpretation_title: bmiData.interpretation_title
                })
            }

            //Store Vital Data
            setStoreReasonData((prev) => ({
                ...prev,
                vWeight: firstViatl,
                vHeight: secondVital,
                vBpSys: thirdVital,
                vBpDys: bpDysVital,
                vPulse: pulseData,
                vRespiration: RespirationData,
                vTemperature: temperatureData,
                vOxySaturation: OxySatData,
                vOxyFlow: oxyFlowData,
                vOxyConcentration: inhaledOxygenData,
                vHeadCircumference: headCircumData,
                vWaistCircumference: waistCircumData,
                vBMI: bmiData,
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
                                                        <input type="number" placeholder='Enter weight in lbs' className={`form-control form-control-sm ${weightValidation.vmValue ? 'is-invalid' : ''}`} id="vmValue" name='vmValue' value={weightData.vmValue} onChange={handleChange} />
                                                        {weightValidation.vmValue && <div className="invalid-feedback">{weightValidation.vmValue}</div>}
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
                                                                                                            onClick={() => handleRemove(i, 'vWeight')}
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
                                                        <input placeholder='Enter height in inches' type="number" className={`form-control form-control-sm ${heightValidation.vmValue ? 'is-invalid' : ''}`} id="vmValue" name='vmValue' value={heightData.vmValue} onChange={handleHeightChange} />
                                                        {heightValidation.vmValue && <div className="invalid-feedback">{heightValidation.vmValue}</div>}
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
                                                                                                            onClick={() => handleRemove(i, 'vHeight')}
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
                                                        <input placeholder='Enter BP systolic in mmHg ' type="number" className={`form-control form-control-sm ${bpSystolicValidation.vmValue ? 'is-invalid' : ''}`} value={bpSysData.vmValue} id="beginDateTime" name='vmValue' onChange={handleBySysChange} />
                                                        {bpSystolicValidation.vmValue && <div className="invalid-feedback">{bpSystolicValidation.vmValue}</div>}
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
                                                                                                            onClick={() => handleRemove(i, 'vBpSys')}
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
                                                        <input placeholder='Enter BP Diastolic in mmHg ' type="number" className={`form-control form-control-sm ${bpDiastolicValidation.vmValue ? 'is-invalid' : ''}`} value={bpDysData.vmValue} id="beginDateTime" name='vmValue' onChange={handleBpDysChange} />
                                                        {bpDiastolicValidation.vmValue && <div className="invalid-feedback">{bpDiastolicValidation.vmValue}</div>}
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='bpDysInterpretation' name='interpretation_option_id' onChange={handleBpDysChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('BPDiastolic', 'vBpDys')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vBpDys') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vBpDys && vitalTypeArr.vBpDys.length > 0 ?
                                                                                vitalTypeArr.vBpDys.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vBpDys')}
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
                                                                        <select className='form-select form-select-sm' id='bpDysReasonstatus' name='reason_status' onChange={handleBpDysChange}>
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
                                {/* ----------------------------------------------------------- Pulse --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Pulse</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input placeholder='Enter pulse in bpm' type="number" className={`form-control form-control-sm ${pulseRateValidation.vmValue ? 'is-invalid' : ''}`} value={pulseData.vmValue} id="beginDateTime" name='vmValue' onChange={handlePulseChange} />
                                                        {pulseRateValidation.vmValue && <div className="invalid-feedback">{pulseRateValidation.vmValue}</div>}
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='bpPulseInterpretation' name='interpretation_option_id' onChange={handlePulseChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('Pulse', 'vPulse')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vPulse') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vPulse && vitalTypeArr.vPulse.length > 0 ?
                                                                                vitalTypeArr.vPulse.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vPulse')}
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
                                                                        <select className='form-select form-select-sm' id='pulseReasonstatus' name='reason_status' onChange={handlePulseChange}>
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
                                {/* ----------------------------------------------------------- Respiration  --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Respiration </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input placeholder='Enter respiration rate in bpm' type="number" className={`form-control form-control-sm ${respirationRateValidation.vmValue ? 'is-invalid' : ''}`} value={respirationData.vmValue} id="beginDateTime" name='vmValue' onChange={handleRespirationChange} />
                                                        {respirationRateValidation.vmValue && <div className="invalid-feedback">{respirationRateValidation.vmValue}</div>}
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='respInterpretation' name='interpretation_option_id' onChange={handleRespirationChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('Respiration', 'vRespiration')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vRespiration') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vRespiration && vitalTypeArr.vRespiration.length > 0 ?
                                                                                vitalTypeArr.vRespiration.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vRespiration')}
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
                                                                        <select className='form-select form-select-sm' id='respirationReasonstatus' name='reason_status' onChange={handleRespirationChange}>
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
                                {/* ----------------------------------------------------------- Temperature   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Temperature  </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input placeholder='Enter temperature in °F' type="number" className={`form-control form-control-sm ${temperatureValidation.vmValue ? 'is-invalid' : ''}`} value={temperatureData.vmValue} id="beginDateTime" name='vmValue' onChange={handleTemperatureChange} />
                                                        {temperatureValidation.vmValue && <div className="invalid-feedback">{temperatureValidation.vmValue}</div>}

                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='tempInterpretation' name='interpretation_option_id' onChange={handleTemperatureChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('Temperature', 'vTemperature')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vTemperature') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vTemperature && vitalTypeArr.vTemperature.length > 0 ?
                                                                                vitalTypeArr.vTemperature.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vTemperature')}
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
                                                                        <select className='form-select form-select-sm' id='tempReasonstatus' name='reason_status' onChange={handleTemperatureChange}>
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
                                {/* ----------------------------------------------------------- Temp Location   --------------------------------------- */}
                                {/* <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Temp Location  </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" value={bpDysData.vmValue} id="beginDateTime" name='vmValue' onChange={handleBpDysChange} />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='bpDysInterpretation' name='interpretation_option_id' onChange={handleBpDysChange} >
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vBpDys') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vBpDys && vitalTypeArr.vBpDys.length > 0 ?
                                                                                vitalTypeArr.vBpDys.map((list, i) => {
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
                                                                        <select className='form-select form-select-sm' id='bpDysReasonstatus' name='reason_status' onChange={handleBpDysChange}>
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
                                </div> */}
                                {/* ----------------------------------------------------------- Oxygen Saturation   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Oxygen Saturation</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input placeholder='Enter SpO2' type="number" className={`form-control form-control-sm ${inhaledOxygenValidation.vmValue ? 'is-invalid' : ''}`} value={oxygeSatData.vmValue} id="beginDateTime" name='vmValue' onChange={handleOxygenSaturationChange} />
                                                        {inhaledOxygenValidation.vmValue && <div className="invalid-feedback">{inhaledOxygenValidation.vmValue}</div>}

                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='oxySatInterpretation' name='interpretation_option_id' onChange={handleOxygenSaturationChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('OxygenSaturation', 'vOxySaturation')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vOxySaturation') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vOxySaturation && vitalTypeArr.vOxySaturation.length > 0 ?
                                                                                vitalTypeArr.vOxySaturation.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vOxySaturation')}
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
                                                                        <select className='form-select form-select-sm' id='oxySaturationReasonstatus' name='reason_status' onChange={handleOxygenSaturationChange}>
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
                                {/* ----------------------------------------------------------- Oxygen Flow Rate   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Oxygen Flow Rate</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input placeholder='Enter oxygen flow rate in L/min' type="number" className={`form-control form-control-sm ${oxygenFlowRateValidation.vmValue ? 'is-invalid' : ''}`} value={oxygeFlowData.vmValue} id="beginDateTime" name='vmValue' onChange={handleOxygenFlowChange} />
                                                        {oxygenFlowRateValidation.vmValue && <div className="invalid-feedback">{oxygenFlowRateValidation.vmValue}</div>}

                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='oxyFlowInterpretation' name='interpretation_option_id' onChange={handleOxygenFlowChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('OxygenFlowRate', 'vOxyFlow')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vOxyFlow') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vOxyFlow && vitalTypeArr.vOxyFlow.length > 0 ?
                                                                                vitalTypeArr.vOxyFlow.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vOxyFlow')}
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
                                                                        <select className='form-select form-select-sm' id='oxyFlowReasonstatus' name='reason_status' onChange={handleOxygenFlowChange}>
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
                                {/* ----------------------------------------------------------- Inhaled Oxygen Concentration   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Inhaled Oxygen Concentration</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input placeholder='Enter oxygen concentration' type="number" className="form-control form-control-sm" value={inhaledOxygeData.vmValue} id="beginDateTime" name='vmValue' onChange={handleInhaledOxygenChange} />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='inhaledOxyInterpretation' name='interpretation_option_id' onChange={handleInhaledOxygenChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('InhaledOxygenConcentration', 'vOxyConcentration')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vOxyConcentration') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vOxyConcentration && vitalTypeArr.vOxyConcentration.length > 0 ?
                                                                                vitalTypeArr.vOxyConcentration.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vOxyConcentration')}
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
                                                                        <select className='form-select form-select-sm' id='oxyConcentrationReasonstatus' name='reason_status' onChange={handleInhaledOxygenChange}>
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
                                {/* ----------------------------------------------------------- Head Circumference   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Head Circumference</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input placeholder='Enter Head Circumference in cm' type="number" className={`form-control form-control-sm ${headCircumferenceValidation.vmValue ? 'is-invalid' : ''}`} value={headCircumData.vmValue} id="beginDateTime" name='vmValue' onChange={handleHeadCircumChange} />
                                                        {headCircumferenceValidation.vmValue && <div className="invalid-feedback">{headCircumferenceValidation.vmValue}</div>}

                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='headCircumInterpretation' name='interpretation_option_id' onChange={handleHeadCircumChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('HeadCircumference', 'vHeadCircumference')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vHeadCircumference') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vHeadCircumference && vitalTypeArr.vHeadCircumference.length > 0 ?
                                                                                vitalTypeArr.vHeadCircumference.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vHeadCircumference')}
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
                                                                        <select className='form-select form-select-sm' id='headCircumferenceReasonstatus' name='reason_status' onChange={handleHeadCircumChange}>
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
                                {/* ----------------------------------------------------------- Waist  Circumference   --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">Waist  Circumference</span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input placeholder='Enter waist Circumference in cm' type="number" className={`form-control form-control-sm ${waistCircumferenceValidation.vmValue ? 'is-invalid' : ''}`} value={waistCircumData.vmValue} id="beginDateTime" name='vmValue' onChange={handleWaistCircumChange} />
                                                        {waistCircumferenceValidation.vmValue && <div className="invalid-feedback">{waistCircumferenceValidation.vmValue}</div>}

                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='waistCircumInterpretation' name='interpretation_option_id' onChange={handleWaistCircumChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('WaistCircumference', 'vWaistCircumference')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vWaistCircumference') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vWaistCircumference && vitalTypeArr.vWaistCircumference.length > 0 ?
                                                                                vitalTypeArr.vWaistCircumference.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vWaistCircumference')}
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
                                                                        <select className='form-select form-select-sm' id='waistCircumferenceReasonstatus' name='reason_status' onChange={handleWaistCircumChange}>
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
                                {/* ----------------------------------------------------------- BMI --------------------------------------- */}
                                <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BMI </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input placeholder='Enter BMI' type="number" className={`form-control form-control-sm ${bmiValidation.vmValue ? 'is-invalid' : ''}`} value={bmiData.vmValue} id="beginDateTime" name='vmValue' onChange={handleBMIChange} />
                                                        {bmiValidation.vmValue && <div className="invalid-feedback">{bmiValidation.vmValue}</div>}

                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='bmiInterpretation' name='interpretation_option_id' onChange={handleBMIChange} >
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
                                                        <span className="AddVital" onClick={() => handleAddDiv('BMI', 'vBMI')}><i class="bi bi-asterisk"></i></span>
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vBMI') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vBMI && vitalTypeArr.vBMI.length > 0 ?
                                                                                vitalTypeArr.vBMI.map((list, i) => {
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
                                                                                                            onClick={() => handleRemove(i, 'vBMI')}
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
                                                                        <select className='form-select form-select-sm' id='bmiReasonstatus' name='reason_status' onChange={handleBMIChange}>
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
                                {/* ----------------------------------------------------------- BMI Status --------------------------------------- */}
                                {/* <div className="fieldsett-in col-md-12">
                                    <div className="fieldsett">
                                        <div className="fieldse">
                                            <span className="fieldse">BMI Status </span>
                                            <div className="row">
                                                <div className=" col-12 row ms-1">
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Value</label>
                                                        <input type="number" className="form-control form-control-sm" value={bmiStatusData.vmValue} id="beginDateTime" name='vmValue' onChange={handleBMIStatusChange} />
                                                    </div>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                                                        <label htmlFor="" className="form-label">Abn</label>
                                                        <select className='form-select form-select-sm' id='bmistatusInterpretation' name='interpretation_option_id' onChange={handleBMIStatusChange} >
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

                                                                    <div className=" col-md-4 mb-2">
                                                                        <div className='codelabel'>
                                                                            <span> <label htmlFor="" className="form-label">Reason Code</label></span>
                                                                            <span className='AddCode'><i className="bi bi-plus-lg" onClick={() => { handleOpenModal('coding', 'vBMIStatus') }} title='Add Code'></i></span>
                                                                        </div>
                                                                        <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding'>
                                                                            {vitalTypeArr.vBMIStatus && vitalTypeArr.vBMIStatus.length > 0 ?
                                                                                vitalTypeArr.vBMIStatus.map((list, i) => {
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
                                                                        <select className='form-select form-select-sm' id='bmistatusReasonstatus' name='reason_status' onChange={handleBMIStatusChange}>
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
                                </div> */}
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
                            {/* <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={"handleClear"}><img src={clearIcon} className='icnn' alt='' /> Clear</button> */}
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
            {showToster === 1 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Vitals saved successfully !!"
                />
            ) : (
                ""
            )}
            {
                showAlertToster === 1 ?
                    <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
            }
        </div>

    )
}

export default FHIRVitals
