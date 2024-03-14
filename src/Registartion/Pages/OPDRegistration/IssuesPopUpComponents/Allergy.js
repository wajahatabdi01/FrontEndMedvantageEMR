import React, { useEffect, useRef, useState } from 'react'
import GetAllIssueOutCome from '../../../API/GET/GetAllIssueOutCome';
import GetAllIssueOccurence from '../../../API/GET/GetAllIssueOccurence';
import GetAllVarificationStatus from '../../../API/GET/GetAllVarificationStatus';
import GetAllClassification from '../../../API/GET/GetAllClassification';
import { CodeMaster } from '../../../../Admin/Pages/EMR Master/CodeMaster';
import GetBrandList from '../../../API/GET/GetBrandList';
import GetAllSeverityData from '../../../API/GET/GetAllSeverityData';
import GetAllReactionList from '../../../API/GET/GetAllReactionList';
import GetFoodListByPrefixText from '../../../../Clinical/API/KnowMedsAPI/GetFoodListByPrefixText';

const Allergy = ({ issueDetailss, issueDetailsData, id }) => {
    let [problem, setProblem] = useState('');
    let [brandList, setBrandList] = useState([]);
    let [brandTempList, setBrandTempList] = useState([]);
    let [foodList, setFoodList] = useState([]);
    let [foodTempList, setFoodTempList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBrand, setIsLoadingBrand] = useState(false);
    const [isLoadingFood, setIsLoadingFood] = useState(false);
    let [showList, setShowList] = useState(0);
    let [coding, setCoding] = useState('');
    let [outComelist, setOutcomeList] = useState([]);
    let [occurencelist, setOccurenceList] = useState([]);
    let [severitylist, setSeverityList] = useState([]);
    let [reactionlist, setReactionList] = useState([]);
    let [statuslist, setStatusList] = useState([]);
    let [classificationList, setClassificationList] = useState([]);
    const [isCodingSelected, setCodingSelected] = useState(false);
    const [isShowPopUp, setIsShowPopUp] = useState(0);
    let [makeData, setMakeData] = useState([]);
    let [getData, setgetData] = useState([]);
    const [txtCoding, setTxtCoding] = useState('');
    const containerRef = useRef(null);
    const customStyle = { marginLeft: '0px' };


    const handleTitleInputChange = (e) => {
        document.getElementById("errTitleAllergies").style.display = "none";
        setProblem(e.target.value);
        setCodingSelected(false);
        const { name, value } = e.target;
        let temp = { ...issueDetailss }

        temp[name] = value
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Allergy": t }));
    };
    const handleCodingInputChange = (e) => {
        setCodingSelected(false);
        const { name, value } = e.target;
        let temp = { ...issueDetailss }

        temp[name] = value
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Allergy": t }));

    };

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
        let tempissueDetailNew = {
            ...issueDetailss,
            coding: tempNew
        }
        issueDetailsData((prev) => ({ ...prev, "Allergy": tempissueDetailNew }));
        setTxtCoding(tempData);

    }

    let handleIssueDetailsChange = (e) => {
        document.getElementById("errDateAllergies").style.display = "none";
        const { name, value } = e.target;
        let temp = { ...issueDetailss }

        temp[name] = value
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Allergy": t }));
    }

    let handleSelectAllergy = (e) => {
        document.getElementById("errTitleAllergies").style.display = "none";
        const ddlProblems = document.getElementById("ddlallergy");
        const ddlAllergyId = document.getElementById("ddlallergy").value;
        const selectedOption = ddlProblems.options[ddlProblems.selectedIndex];
        const selectProblem = selectedOption ? selectedOption.textContent : "";
        setProblem(selectProblem);
        setCoding(selectProblem);
        setCodingSelected(true);
        const { name, value } = e.target;
        let temp = { ...issueDetailss }
        temp["issueTypeId"] = id
        temp["allergyTypeId"] = ddlAllergyId
        temp[name] = value
        temp["title"] = selectProblem
        // temp["coding"] = selectProblem
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Allergy": t }));
    };

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

    const handleFoodRadio = async () => {
        setShowList(0); // Set showList to 0 for food
        setFoodTempList([]); // Clear foodTempList
        setIsLoadingFood(true); // Set loading state for food data
        await getAllFoodList(); // Fetch food data
        setIsLoadingFood(false); // Clear loading state for food data
        let temp = { ...issueDetailss }
        temp["allergyType"] = 1
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Allergy": t }));
    };

    const handleMedicationRadio = async () => {
        setShowList(1); // Set showList to 1 for medication
        setBrandTempList([]); // Clear brandTempList
        setIsLoadingBrand(true); // Set loading state for brand data
        await getAllBrandList(); // Fetch brand data
        setIsLoadingBrand(false); // Clear loading state for brand data
        let temp = { ...issueDetailss }
        temp["allergyType"] = 2
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Allergy": t }));
    };

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
    let getClassificationlist = async () => {
        const response = await GetAllClassification();
        if (response.status === 1) {
            setClassificationList(response.responseValue);
        }
    }

    const handleOpenModal = () => {
        setIsShowPopUp(1);
        // setPopUpId(modalID);
    }
    const handleCloseModal = () => {
        setIsShowPopUp(0);
        // setPopUpId('');
    }
    // const SelectedData = (data, modalID) => {
    //     console.log("modalID",modalID)
    //     let t = {
    //       moduleId: modalID,
    //       data: data
    //     }
    //     setgetData(t);
    //     setMakeData([...makeData, t])
    //     let temp = ""
    //     for (var i = 0; i < data.length; i++) {
    //       temp += " " + data[i].code
    //     }
    //     // document.getElementById(modalID).value = temp
    //   }
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
        // document.getElementById(modalID).value = temp

        // issueDetailss.forEach(element => {
        //     element["coding"] = temp
        // });
        let issueDetail = {
            ...issueDetailss,
            coding: temp
        }
        issueDetailsData((prev) => ({ ...prev, "Allergy": issueDetail }));
        const splitData = temp.split(';').slice(0, -1);
        setTxtCoding(splitData);
    }


    useEffect(() => {
        let temp = { ...issueDetailss }
        temp["allergyType"] = 1
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Allergy": t }));
        getAllBrandList();
        getAllFoodList();
        getAllIssueOutCome();
        getAllIssueOccurence();
        getAllVarificationStatus();
        getClassificationlist();
        getAllSeverityData();
        getAllReactionList();

    }, [issueDetailsData]);
    return (
        <>
            {
                issueDetailss &&
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
                                <select className='form-control' id='ddlallergy' name='titleId' style={{ height: '8em', overflowY: 'scroll' }} multiple ref={containerRef} onScroll={handleScroll} onChange={handleSelectAllergy}>
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
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                            <input type="text" value={issueDetailss.title} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                        </div>
                        <small id="errTitleAllergies" className="form-text text-danger" style={{ display: 'none' }} />
                    </div>
                    <div className='problemhead-inn'>
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
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
                            <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }} onClick={handleOpenModal}><i class="bi bi-plus"></i> Add</button>
                            <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="row">
                            <div className="col-6 mb-2">
                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                <input type="date" value={issueDetailss.beginDateTime} className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
                                <small id="errDateAllergies" className="form-text text-danger" style={{ display: 'none' }} />
                            </div>
                            <div className="col-6 mb-2">
                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>End Date and Time</b></label>
                                <input type="date" value={issueDetailss.endDateTime} className="form-control form-control-sm" id="endDateTime" name='endDateTime' onChange={handleIssueDetailsChange} />
                                <div className='mt-2' style={{ float: 'inline-end' }}>
                                    <span className='font-monospace fst-italic'>(leave blank if still active)</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="row">
                            <div className="col-4 mb-2">
                                <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Classification Type</b></label>
                                {/* <sup style={{ color: "red" }}>*</sup> */}
                                <div className='d-flex gap-3' >
                                    <select value={issueDetailss.classificationTypeId} className="form-select form-select-sm" id="classificationTypeId" aria-label=".form-select-sm example" name='classificationTypeId' onChange={handleIssueDetailsChange} >
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
                                <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Occurrence</b></label>
                                {/* <sup style={{ color: "red" }}>*</sup> */}
                                <div className='d-flex gap-3' >
                                    <select value={issueDetailss.occurrenceId} className="form-select form-select-sm" id="occurrenceId" aria-label=".form-select-sm example" name='occurrenceId' onChange={handleIssueDetailsChange} >
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
                                <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Severity</b></label>
                                {/* <sup style={{ color: "red" }}>*</sup> */}
                                <div className='d-flex gap-3' >
                                    <select value={issueDetailss.severityId} className="form-select form-select-sm" id="severityId" aria-label=".form-select-sm example" name='severityId' onChange={handleIssueDetailsChange} >
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
                                <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Reaction</b></label>
                                {/* <sup style={{ color: "red" }}>*</sup> */}
                                <div className='d-flex gap-3' >
                                    <select value={issueDetailss.reactionId} className="form-select form-select-sm" id="reactionId" aria-label=".form-select-sm example" name='reactionId' onChange={handleIssueDetailsChange} >
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
                                <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Verification Status</b></label>
                                {/* <sup style={{ color: "red" }}>*</sup> */}
                                <div className='d-flex gap-3' >
                                    <select value={issueDetailss.verificationStatusId} className="form-select form-select-sm" id="verificationStatusId" aria-label=".form-select-sm example" name='verificationStatusId' onChange={handleIssueDetailsChange} >
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
                                <label htmlFor="ddlRelationshipTertiary" className="form-label"><b>Outcome</b></label>
                                {/* <sup style={{ color: "red" }}>*</sup> */}
                                <div className='d-flex gap-3' >
                                    <select value={issueDetailss.outcomeId} className="form-select form-select-sm" id="outcomeId" aria-label=".form-select-sm example" name='outcomeId' onChange={handleIssueDetailsChange} >
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
                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                <input type="text" className="form-control form-control-sm" id="destination" name='destination' value={issueDetailss.destination} onChange={handleIssueDetailsChange} />
                            </div>
                            <div className="col-6 mb-2">
                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' value={issueDetailss.referredby} onChange={handleIssueDetailsChange} />
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="row">
                            <div className="col-12 mb-2">
                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Comments</b></label>
                                <textarea className='mt-1 form-control' id="comments" name="comments" rows="3" cols="40" style={{ height: '121px' }} value={issueDetailss.comments} onChange={handleIssueDetailsChange}></textarea>
                            </div>
                        </div>
                    </div>

                </div>
            }


            {/* ------------------------------------------ Code Master popUp Start------------------------------------ */}
            {isShowPopUp === 1 ?

                <div className={`modal d-${isShowPopUp === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static" >
                    <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
                        <div className="modal-content" >
                            {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>
                            <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} isMultiple={true} />
                            {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
                        </div>
                    </div>
                </div>
                : ''}
            {/* ------------------------------------------ Code Master popUp End------------------------------------ */}
        </>
    );
};

export default Allergy
