import React, { useEffect, useState } from 'react'
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
function OPDAllergyPopUp({ setShowToster, getAllEncoutersAsPerIssueID, updatebool, setUpdateBool, rowId, encounterTitle, encounterBeginDate, encounterEndDate, encounterReferredBy, encounterCoding, classificationName, occurrence, verificationStatus, outcome, encounterComments, encounterDestination, titleId }) {
    let [allergy, setAllery] = useState('');
    let [coding, setCoding] = useState('');
    let [outComelist, setOutcomeList] = useState([]);
    let [occurencelist, setOccurenceList] = useState([]);
    let [statuslist, setStatusList] = useState([]);
    let [classificationList, setClassificationList] = useState([]);
    const [isCodingSelected, setCodingSelected] = useState(false);
    let [brandList, setBrandList] = useState([]);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)
    const [isShowPopUp, setIsShowPopUp] = useState(0);
    const customStyle = { marginLeft: '0px' };
    const [PopUpId, setPopUpId] = useState('');
    const [txtCoding, setTxtCoding] = useState([]);
    let [makeData, setMakeData] = useState([]);
    let [getData, setgetData] = useState([]);
    const [encounterList, setEncounterList] = useState([]);
    // let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []

    let [allergyData, setAllergyData] = useState({
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
        destination: ''
    })

    let getAllBrandList = async () => {
        const response = await GetBrandList();
        if (response.status === 1) {
            const slicedProblemList = response.responseValue.slice(0, 100)
            setBrandList(slicedProblemList);
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
            console.log('ddd', document.getElementById("ddlCoding" + i).checked)
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
        console.log('selectProblem', selectProblem)
        setCodingSelected(true);
        setAllergyData((prev) => ({
            ...prev,
            title: selectProblem,
            // coding: 'ICD10:' + selectProblem,
            titleId: ddlAllergyId,
            issueTypeId: 2
        }))
    }
    const SelectedData = (data, modalID) => {
        console.log("modalID", modalID, data)
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
        console.log('temp', temp);
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
            destination: ''
        })
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
                userId: window.userId
            }
            console.log("pobj", pobj)
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
                setShowToster(6)
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


    function convertDateFormat(dateString) {
        // Split the date string by "-"
        const parts = dateString.split("-");

        // Rearrange the parts in the format yyyy-mm-dd
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        return formattedDate;
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
            destination: encounterDestination && encounterDestination !== '' ? encounterDestination : ''
        })

    }, [encounterTitle, encounterBeginDate, encounterEndDate, encounterReferredBy, encounterCoding, classificationName, occurrence, verificationStatus, outcome, encounterComments, encounterDestination, titleId])

    useEffect(() => {
        getAllBrandList();
        getAllIssueOutCome();
        getAllIssueOccurence();
        getAllVarificationStatus();
        getClassificationlist();
    }, [])
    return (
        <>
            <div className='problemhead'>
                <div className='problemhead-inn'>
                    <div className="col-12 mb-2">
                        <div>
                            <select className='form-control' id='ddlAllergy' name='titleId' style={{ height: '8em' }} multiple onChange={handleSelectProblem}>
                                {brandList && brandList.map((list) => {
                                    return (
                                        <option value={list.id}>{list.name}</option>
                                    )
                                })}
                            </select>
                        </div>
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
                                                    <input type='checkbox' style={{ marginRight: '5px' }} id={'ddlCoding' + i} />{list}
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
                            <input type="date" value={allergyData.beginDateTime} className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                            <small id="errBegindate" className="form-text text-danger" style={{ display: 'none' }}>
                            </small>
                        </div>
                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>End Date and Time</></label>
                            <input type="date" value={allergyData.endDateTime} className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
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
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-6 mb-2">
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
                        <div className="col-6 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>Destination</></label>
                            <input type="text" className="form-control form-control-sm" id="destination" name='destination' value={allergyData.destination} onChange={handleIssueDetailsChange} />
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><>Referred by</></label>
                            <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' value={allergyData.referredby} onChange={handleIssueDetailsChange} />
                        </div>
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
                        : <button type="button" className="btn btn-save btn-sm mb-1 me-1" data-bs-dismiss="modal" onClick={handleSaveUpdate}>{t("UPDATE")}</button>
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
        </>
    )
}

export default OPDAllergyPopUp
