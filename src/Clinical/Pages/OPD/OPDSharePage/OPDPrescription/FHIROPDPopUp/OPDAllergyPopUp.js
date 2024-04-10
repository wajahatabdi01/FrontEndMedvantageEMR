import React, { useEffect, useRef, useState } from 'react'
import GetAllIssueOutCome from '../../../../../../Registartion/API/GET/GetAllIssueOutCome';
import GetAllIssueOccurence from '../../../../../../Registartion/API/GET/GetAllIssueOccurence';
import GetAllVarificationStatus from '../../../../../../Registartion/API/GET/GetAllVarificationStatus';
import GetAllClassification from '../../../../../../Registartion/API/GET/GetAllClassification';
import InsertEncounter from '../../../../../../Registartion/API/POST/InsertEncounter';
import SuccessToster from '../../../../../../Component/SuccessToster';
import AlertToster from '../../../../../../Component/AlertToster';
import GetBrandList from '../../../../../API/KnowMedsAPI/GetBrandList';
import saveButtonIcon from '../../../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../../../assets/images/icons/clear.svg';
import { CodeMaster } from '../../../../../../Admin/Pages/EMR Master/CodeMaster';
import FHIRGetEncounterByUHIDandIssueID from '../../../../../API/FHIRApi/GET/FHIRGetEncounterByUHIDandIssueID';
import UpdateEncounter from '../../../../../API/FHIREncounter/UpdateEncounter';
import { t } from 'i18next';
import GetAllSeverityData from '../../../../../../Registartion/API/GET/GetAllSeverityData';
import GetAllReactionList from '../../../../../../Registartion/API/GET/GetAllReactionList';
import GetFoodListByPrefixText from '../../../../../API/KnowMedsAPI/GetFoodListByPrefixText';
function OPDAllergyPopUp({ getAllEncoutersAsPerIssueID, updatebool, setUpdateBool, rowId, encounterTitle, encounterBeginDate, encounterEndDate, encounterReferredBy, encounterCoding, classificationName, occurrence, verificationStatus, outcome, encounterComments, encounterDestination, titleId, severity, reaction, isCloseModal, fnisClose }) {
    let [allergy, setAllery] = useState('');
    let [coding, setCoding] = useState('');
    let [outComelist, setOutcomeList] = useState([]);
    let [occurencelist, setOccurenceList] = useState([]);
    let [statuslist, setStatusList] = useState([]);
    let [classificationList, setClassificationList] = useState([]);
    const [isCodingSelected, setCodingSelected] = useState(false);
    let [brandList, setBrandList] = useState([]);
    let [brandTempList, setBrandTempList] = useState([]);
    let [foodList, setFoodList] = useState([]);
    let [foodTempList, setFoodTempList] = useState([]);
    let [showList, setShowList] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [showToster, setShowToster] = useState(0)
    let [tosterValue, setTosterValue] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)
    const [isShowPopUp, setIsShowPopUp] = useState(0);
    let [severitylist, setSeverityList] = useState([]);
    let [reactionlist, setReactionList] = useState([]);
    const customStyle = { marginLeft: '0px' };
    const [PopUpId, setPopUpId] = useState('');
    const [txtCoding, setTxtCoding] = useState([]);
    let [makeData, setMakeData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBrand, setIsLoadingBrand] = useState(false);
    const [isLoadingFood, setIsLoadingFood] = useState(false);
    let [getData, setgetData] = useState([]);
    const containerRef = useRef(null);
    const [encounterList, setEncounterList] = useState([]);
    // let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : [];

    const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];

    const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

    let [allergyData, setAllergyData] = useState({
        titleId: '',
        title: '',
        coding: '',
        beginDateTime: '',
        endDateTime: '',
        classificationTypeId: 0,
        occurrenceId: 0,
        verificationStatusId: 0,
        referredby: '',
        comments: '',
        outcomeId: 0,
        destination: '',
        reactionId: 0,
        severityId: 0,
        allergyType: 0,
        allergyTypeId: 0,
    })

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        // Adding leading zero if month/day is less than 10
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
    
        return `${year}-${month}-${day}`;
    }

    const getAllBrandList = async () => {
        const response = await GetBrandList();
        if (response.status === 1) {
            const slicedProblemList = response.responseValue;
            setBrandList(slicedProblemList);
            setBrandTempList(slicedProblemList.slice(0, 15));
        }
    };
    const getAllFoodList = async () => {
        const response = await GetFoodListByPrefixText();
        if (response.status === 1) {
            setFoodList(response.responseValue);
            setFoodTempList(response.responseValue.slice(0, 15));
        }
    };

    const fetchData = () => {
        if (!isLoading && brandTempList.length < brandList.length) { // Check if not already loading and there is more data to fetch
            setIsLoading(true);
            const startIndex = brandTempList.length;
            const endIndex = Math.min(startIndex + 15, brandList.length);
            const newData = brandList.slice(startIndex, endIndex);
            setBrandTempList(prevData => [...prevData, ...newData]);
            setIsLoading(false);
        }
    };
    const fetchFoodData = () => {
        if (!isLoading && foodTempList.length < foodList.length) { // Check if not already loading and there is more data to fetch
            setIsLoading(true);
            const startIndex = foodTempList.length;
            const endIndex = Math.min(startIndex + 15, foodList.length);
            const newData = foodList.slice(startIndex, endIndex);
            setFoodTempList(prevData => [...prevData, ...newData]);
            setIsLoading(false);
        }
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoading) {
            if (showList === 0) {
                fetchFoodData();
            } else {
                fetchData();
            }
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [containerRef]); // Include containerRef in the dependency array to ensure it's updated properly



    let getAllSeverityData = async () => {
        const response = await GetAllSeverityData();
        if (response.status === 1) {
            setSeverityList(response.responseValue);
        }
    }
    let getAllReactionList = async () => {
        const response = await GetAllReactionList();
        if (response.status === 1) {
            setReactionList(response.responseValue);
        }
    }
    let getAllIssueOutCome = async () => {
        const response = await GetAllIssueOutCome();
        if (response.status === 1) {
            setOutcomeList(response.responseValue);
        }
    }
    let getAllIssueOccurence = async () => {
        const response = await GetAllIssueOccurence();
        if (response.status === 1) {
            setOccurenceList(response.responseValue);
        }
    }
    let getAllVarificationStatus = async () => {
        const response = await GetAllVarificationStatus();
        if (response.status === 1) {
            setStatusList(response.responseValue);
        }
    }
    let getClassificationlist = async () => {
        const response = await GetAllClassification();
        if (response.status === 1) {
            setClassificationList(response.responseValue);
        }
    }

    let handleRemove = () => {
        const tempAr = txtCoding;
        let tempData = [];
        let tempNew = "";
        for (var i = 0; i < tempAr.length; i++) {
            if (!document.getElementById("ddlCodingA" + i).checked) {
                tempData.push(tempAr[i])
            }
        }
        console.log('tempData', tempData);
        for (var i = 0; i < tempAr.length; i++) {
            document.getElementById("ddlCodingA" + i).checked = false;
        }
        for (var j = 0; j < tempData.length; j++) {
            tempNew += tempData[j] + ';';
        }

        setAllergyData((prevIssueDetails) => ({
            ...prevIssueDetails,
            coding: tempNew,
        }));
        setTxtCoding(tempData);
    }
    const handleTitleInputChange = (e) => {
        document.getElementById("errTitles").style.display = "none";
        setAllery(e.target.value);
        setCodingSelected(false);
        const { name, value } = e.target;
        setAllergyData((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    };
    const handleOpenModal = (modalID) => {
        setIsShowPopUp(1);
        setPopUpId(modalID);
    }
    const handleCloseModal = () => {
        setIsShowPopUp(0);
        // setPopUpId('');
    }

    let handleIssueDetailsChange = (e) => {

        document.getElementById("errBegindate").style.display = "none";
        const { name, value } = e.target;
        setAllergyData((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    }

    let handleSelectProblem = () => {
        document.getElementById("errTitles").style.display = "none";
        const ddlProblems = document.getElementById("ddlAllergy");
        const ddlAllergyId = document.getElementById("ddlAllergy").value;
        const selectedOption = ddlProblems.options[ddlProblems.selectedIndex];
        const selectProblem = selectedOption ? selectedOption.textContent : "";
        setAllery(selectProblem);
        setCoding(selectProblem);
        setCodingSelected(true);
        setAllergyData((prev) => ({
            ...prev,
            title: selectProblem,
            titleId: ddlAllergyId,
            allergyTypeId: ddlAllergyId,
            issueTypeId: 2
        }))
    }
    const SelectedData = (data, modalID) => {
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
        setAllergyData((prevIssueDetails) => ({
            ...prevIssueDetails,
            coding: temp,
        }));
        const splitData = temp.split(';').slice(0, -1);
        setTxtCoding(splitData);
    }
    const handleCodingInputChange = (e) => {
        setCodingSelected(false);
        const { name, value } = e.target;
        setAllergyData((prevIssueDetails) => ({
            ...prevIssueDetails,
            [name]: value,
        }));
    };

    let handleClear = () => {
        setAllergyData({
            titleId: '',
            title: '',
            coding: '',
            beginDateTime: '',
            endDateTime: '',
            classificationTypeId: '0',
            occurrenceId: '0',
            verificationStatusId: '0',
            referredby: '',
            comments: '',
            outcomeId: '0',
            destination: '',
            reactionId: '',
            severityId: ''
        })
        setUpdateBool(0);
        setTxtCoding([]);
        setAllergyData((prevIssueDetails) => ({
            ...prevIssueDetails,
            coding: [],
        }));
        fnisClose(0);
        document.getElementById("errTitles").style.display = "none";
        document.getElementById("errBegindate").style.display = "none";
    }

    let handleSaveIssues = async () => {
        if (allergyData.title === '' || allergyData.title === undefined || allergyData.title === null) {
            document.getElementById("errTitles").innerHTML = "Please enter title";
            document.getElementById("errTitles").style.display = "block";
        }
        if (allergyData.beginDateTime === '' || allergyData.beginDateTime === undefined || allergyData.beginDateTime === null) {
            document.getElementById("errBegindate").innerHTML = "Please select begin date";
            document.getElementById("errBegindate").style.display = "block";
        }
        else {
            let pobj = {
                uhid: activeUHID,
                encounterDetailsJsonString: JSON.stringify([allergyData]),
                clientId: window.clientId,
                userId: window.userId,
                doctorId: activeDocID,
                departmentId: activeDeptID
            }
            // return;
            const response = await InsertEncounter(pobj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setShowToster(2)
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)
                handleClear();
            }
            else {
                setShowUnderProcess(0)
                setShowAlertToster(1)
                setShowMessage(response.responseValue)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
        }
    }

    let handleSaveUpdate = async () => {
        if (allergyData.title === '' || allergyData.title === undefined || allergyData.title === null) {
            document.getElementById("errTitle").innerHTML = "Please enter title";
            document.getElementById("errTitle").style.display = "block";
        }
        if (allergyData.beginDateTime === '' || allergyData.beginDateTime === undefined || allergyData.beginDateTime === null) {
            document.getElementById("errbegindate").innerHTML = "Please select begin date";
            document.getElementById("errbegindate").style.display = "block";
        }
        else {
            const response = await UpdateEncounter(JSON.stringify([allergyData]));
            if (response.status === 1) {
                setShowUnderProcess(0);
                setShowToster(7)
                getAllEncoutersAsPerIssueID();
                setUpdateBool(0)
                handleClear();
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)
            }
            else {
                setShowUnderProcess(0)
                setShowAlertToster(1)
                setShowMessage(response.responseValue)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
        }
    }

    const handleFoodRadio = async () => {
        setShowList(0); // Set showList to 0 for food
        setFoodTempList([]); // Clear foodTempList
        setIsLoadingFood(true); // Set loading state for food data
        await getAllFoodList(); // Fetch food data
        setIsLoadingFood(false); // Clear loading state for food data
        setAllergyData((prev) => ({
            ...prev,
            allergyType: 1
        }))
    };

    const handleMedicationRadio = async () => {
        setShowList(1); // Set showList to 1 for medication
        setBrandTempList([]); // Clear brandTempList
        setIsLoadingBrand(true); // Set loading state for brand data
        await getAllBrandList(); // Fetch brand data
        setIsLoadingBrand(false); // Clear loading state for brand data
        setAllergyData((prev) => ({
            ...prev,
            allergyType: 2
        }))
    };

    function convertDateFormat(dateString) {
        // Check if dateString is defined
        if (dateString) {
            // Split the date string by "-"
            const parts = dateString.split("-");

            // Check if parts contains three elements
            if (parts.length === 3) {
                // Rearrange the parts in the format yyyy-mm-dd
                const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                return formattedDate;
            } else {
                return null; // Or return an appropriate value indicating an error
            }
        } else {
            return null; // Or return an appropriate value indicating an error
        }
    }
    const newencounterBeginDate = convertDateFormat(encounterBeginDate);
    const newencounterEndDate = convertDateFormat(encounterEndDate);
    useEffect(() => {
        setAllergyData({
            id: rowId,
            issueTypeId: 2,
            titleId: titleId && titleId !== '' ? titleId : '',
            title: encounterTitle && encounterTitle !== '' ? encounterTitle : '',
            coding: encounterCoding && encounterCoding !== '' ? encounterCoding : '',
            beginDateTime: newencounterBeginDate !== undefined ? newencounterBeginDate : '',
            endDateTime: newencounterEndDate !== undefined ? newencounterEndDate : '',
            classificationTypeId: classificationName && classificationName !== '' ? classificationName : '',
            occurrenceId: occurrence && occurrence !== '' ? occurrence : '',
            verificationStatusId: verificationStatus && verificationStatus !== '' ? verificationStatus : '',
            referredby: encounterReferredBy !== undefined ? encounterReferredBy : '',
            comments: encounterComments && encounterComments !== '' ? encounterComments : '',
            outcomeId: outcome && outcome !== '' ? outcome : '',
            severityId: severity && severity !== '' ? severity : '',
            reactionId: reaction && reaction !== '' ? reaction : '',
            destination: encounterDestination && encounterDestination !== '' ? encounterDestination : ''
        });
        const formatCodingData = encounterCoding ? encounterCoding.split(';').slice(0, -1) : [];
        setTxtCoding(formatCodingData)

    }, [encounterTitle, encounterBeginDate, encounterEndDate, encounterReferredBy, encounterCoding, classificationName, occurrence, verificationStatus, outcome, encounterComments, encounterDestination, titleId, severity, reaction,])
    // Used To Clear Modal
    useEffect(() => {
        if (isCloseModal === 1) {
            handleClear();
        }

    }, [isCloseModal]);
    useEffect(() => {
        setAllergyData((prev) => ({
            ...prev,
            alleryType: 1
        }))
        getAllReactionList();
        getAllSeverityData();
        getAllBrandList();
        getAllFoodList();
        getAllIssueOutCome();
        getAllIssueOccurence();
        getAllVarificationStatus();
        getClassificationlist();
    }, [])
    return (
        <>
            <div className='problemhead'>
                <div className='problemhead-inn'>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" checked={showList === 0} value="option1" onChange={handleFoodRadio} />
                        <label class="form-check-label" for="inlineRadio1">Food</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={handleMedicationRadio} />
                        <label class="form-check-label" for="inlineRadio2">Medication</label>
                    </div>
                    <div className="col-12 mb-2" style={{ position: 'relative' }}>
                        <div style={{ position: 'relative' }}>
                            <select className='form-control' id='ddlAllergy' name='titleId' style={{ height: '8em', overflowY: 'scroll' }} multiple ref={containerRef} onScroll={handleScroll} onChange={handleSelectProblem}>
                                {showList === 0 ? (
                                    foodTempList.map((food) => (
                                        <option key={food.id} value={food.id}>
                                            {food.foodName}
                                        </option>
                                    ))
                                ) : (
                                    brandTempList.map((brand) => (
                                        <option key={brand.medicineID} value={brand.medicineID}>
                                            {brand.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        {isLoading && (
                            <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' }}>
                                Loading...
                            </div>
                        )}
                        {(isLoadingBrand || isLoadingFood) && (
                            <div style={{ position: 'absolute', bottom: '55px', left: '50%', transform: 'translateX(-50%)' }}>
                                <span class="loader"></span>
                            </div>
                        )}
                    </div>


                    <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                </div>

                <div className='problemhead-inn'>
                    <div className="col-12 mb-2">
                        <label for="bedName" class="form-label relative">Title<span class="starMandatory">*</span></label>
                        <input type="text" value={allergyData.title} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                        <small id="errTitles" className="form-text text-danger" style={{ display: 'none' }}>
                        </small>
                    </div>

                </div>
                <div className='problemhead-inn'>
                    <div className="col-12 mb-2">
                        <label htmlFor="txtPatientRelationAddress" className="form-label"><>Coding</></label>
                        <div>
                            {/* <select  className='form-control' style={{ height: '8em' }} multiple name='coding' id='coding' >
                                   {txtCoding && txtCoding.length > 0 ?
                                       txtCoding.map((list,i)=>{
                                           return(
                                               <option value={list}>{list}</option>
                                           )
                                       })
                                        
                                       : ''}
                               </select> */}
                            <div className='form-control' style={{ height: '8em', overflow: 'auto' }} multiple name='coding' id='coding' >
                                {txtCoding && txtCoding.length > 0 ?
                                    txtCoding.map((list, i) => {
                                        return (
                                            <>
                                                <span>
                                                    <input type='checkbox' style={{ marginRight: '5px' }} id={'ddlCodingA' + i} />{list}
                                                </span>
                                                <br />
                                            </>
                                        )
                                    })

                                    : ''}
                            </div>

                            {/* <span className='form-control' style={{ height: '8em' }}>{txtCoding}</span> */}
                        </div>

                    </div>
                    <div class="d-inline-flex gap-2">
                        <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }} onClick={() => { handleOpenModal('coding') }}><i class="bi bi-plus"></i> Add</button>
                        <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-6 mb-2">
                            <label for="bedName" class="form-label relative">Begin Date and Time<span class="starMandatory">*</span></label>
                            <input type="date" min={getCurrentDate()} value={allergyData.beginDateTime} className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                            <small id="errBegindate" className="form-text text-danger" style={{ display: 'none' }}>
                            </small>
                        </div>
                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>End Date and Time</></label>
                            <input type="date" min={getCurrentDate()} value={allergyData.endDateTime} className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
                            <div className='mt-2' style={{ float: 'inline-end' }}>
                                <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Classification Type</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select value={allergyData.classificationTypeId} className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={handleIssueDetailsChange} >
                                    <option value="0" selected>Select Classification</option>
                                    {classificationList && classificationList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Occurrence</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select value={allergyData.occurrenceId} className="form-select form-select-sm" id="occurrenceId" aria-label=".form-select-sm example" name='occurrenceId' onChange={handleIssueDetailsChange} >
                                    <option value="0" selected>Select Occurrence</option>
                                    {occurencelist && occurencelist.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Severity</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select value={allergyData.severityId} className="form-select form-select-sm" id="severityId" aria-label=".form-select-sm example" name='severityId' onChange={handleIssueDetailsChange} >
                                    <option value="0" selected>Select Severity</option>
                                    {severitylist && severitylist.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Reaction</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select value={allergyData.reactionId} className="form-select form-select-sm" id="reactionId" aria-label=".form-select-sm example" name='reactionId' onChange={handleIssueDetailsChange} >
                                    <option value="0" selected>Select Reaction</option>
                                    {reactionlist && reactionlist.map((list) => {
                                        return (
                                            <option value={list.id}>{list.title}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Verification Status</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select value={allergyData.verificationStatusId} className="form-select form-select-sm" id="verificationStatusId" aria-label=".form-select-sm example" name='verificationStatusId' onChange={handleIssueDetailsChange} >
                                    <option value="0" selected>Select Status</option>
                                    {statuslist && statuslist.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-4 mb-2">
                            <label htmlFor="ddlRelationshipTertiary" className="form-label"><>Outcome</></label>
                            {/* <sup style={{ color: "red" }}>*</sup> */}
                            <div className='d-flex gap-3' >
                                <select value={allergyData.outcomeId} className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={handleIssueDetailsChange} >
                                    <option value="0" selected>Select Outcome</option>
                                    {outComelist && outComelist.map((list) => {
                                        return (
                                            <option value={list.id}>{list.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <small id="errRelationshipTertiary" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>Destination</></label>
                            <input type="text" className="form-control form-control-sm" id="destination" name='destination' value={allergyData.destination} onChange={handleIssueDetailsChange} />
                        </div>
                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>Referred by</></label>
                            <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' value={allergyData.referredby} onChange={handleIssueDetailsChange} />
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>Comments</></label>
                            <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} value={allergyData.comments} onChange={handleIssueDetailsChange}></textarea>
                        </div>
                    </div>
                </div>

            </div>
            {/* <div class="modal-footer">
                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleSaveIssues}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                </div>
            </div> */}

            <div class="modal-footer">
                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                    {updatebool === 0 ?
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleSaveIssues}><img src={saveButtonIcon} className='icnn' alt='' /> Save</button>
                        : <button type="button" className="btn btn-save btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleSaveUpdate}>{t("UPDATE")}</button>
                    }
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" data-bs-dismiss="modal_" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' /> Clear</button>
                </div>
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
            {showToster === 2 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Allergy saved successFully !!"
                />
            ) : (
                ""
            )}
            {showToster === 7 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Allergy updated successFully !!"
                />
            ) : (
                ""
            )}
        </>
    )
}

export default OPDAllergyPopUp
