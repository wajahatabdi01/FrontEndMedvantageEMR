import React, { useEffect, useRef, useState } from 'react'
import GetAllIssueOutCome from '../../../API/GET/GetAllIssueOutCome';
import GetAllIssueOccurence from '../../../API/GET/GetAllIssueOccurence';
import GetAllVarificationStatus from '../../../API/GET/GetAllVarificationStatus';
import GetAllClassification from '../../../API/GET/GetAllClassification';
import GetProblemList from '../../../API/GET/GetProblemList';
import { CodeMaster } from '../../../../Admin/Pages/EMR Master/CodeMaster';

const Problem = ({ issueDetailss, issueDetailsData, id }) => {
    let [problem, setProblem] = useState('');
    let [problemList, setProblemList] = useState([]);
    let [coding, setCoding] = useState('');
    let [outComelist, setOutcomeList] = useState([]);
    let [occurencelist, setOccurenceList] = useState([]);
    let [statuslist, setStatusList] = useState([]);
    let [classificationList, setClassificationList] = useState([]);
    const [isCodingSelected, setCodingSelected] = useState(false);
    const [isShowPopUp, setIsShowPopUp] = useState(0);
    let [makeData, setMakeData] = useState([]);
    let [getData, setgetData] = useState([]);
    const customStyle = { marginLeft: '0px' };
    const [PopUpId, setPopUpId] = useState('');
    const [txtCoding, setTxtCoding] = useState('');

    const handleTitleInputChange = (e) => {
        setProblem(e.target.value);
        setCodingSelected(false);
        const { name, value } = e.target;
        let temp = { ...issueDetailss }

        temp[name] = value
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Problem": t }));
    };
    const handleCodingInputChange = (e) => {
        setCodingSelected(false);
        const { name, value } = e.target;
        let temp = { ...issueDetailss }

        temp[name] = value
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Problem": t }));

    };

    let handleRemove = () => {
        // setCoding('');
        // issueDetailsData((issueDetailss) => ({
        //     ...issueDetailss,
        //     Problem: {
        //         'coding': '',
        //     }
        // }));
    }

    let handleIssueDetailsChange = (e) => {
        const { name, value } = e.target;
        let temp = { ...issueDetailss }

        temp[name] = value
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Problem": t }));
    }

    let handleSelectProblem = (e) => {
        const ddlProblems = document.getElementById("ddlproblems");
        const selectedOption = ddlProblems.options[ddlProblems.selectedIndex];
        const selectProblem = selectedOption ? selectedOption.textContent : "";
        setProblem(selectProblem);
       // setCoding(selectProblem);
        console.log('selectProblem', selectProblem);
        setCodingSelected(true);
        const { name, value } = e.target;
        let temp = { ...issueDetailss }
        temp["issueTypeId"] = id
        temp[name] = value
        temp["title"] = selectProblem
        //temp["coding"] = selectProblem
        let t = { ...issueDetailss, ...temp }
        issueDetailsData((prev) => ({ ...prev, "Problem": t }));
        console.log(issueDetailss)
    };


    let getAllProblem = async () => {
        const response = await GetProblemList();
        if (response.status === 1) {
            const slicedProblemList = response.responseValue.slice(0, 100)
            setProblemList(slicedProblemList);
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

    const handleOpenModal = (modalID) => {
        console.log("Khulaaaa")
        setIsShowPopUp(1);
        setPopUpId(modalID);
    }
    const handleCloseModal = () => {
        setIsShowPopUp(0);
        // setPopUpId('');
    }
    const SelectedData = (data, modalID) => {
        console.log("modalID",modalID)
        let t = {
          moduleId: modalID,
          data: data
        }
        setgetData(t);
        setMakeData([...makeData, t])
        let temp = ""
        for (var i = 0; i < data.length; i++) {
          temp +=  data[i].dropdownName +':'+ data[i].code +';'
        }
        // document.getElementById(modalID).value = temp
        console.log('temp',temp);
        
        // issueDetailss.forEach(element => {
        //     element["coding"] = temp
        // });
        issueDetailss ={
            ...issueDetailss,
            coding:temp
        }
        console.log('issueDetailss',issueDetailss)
        setTxtCoding(temp)
      }
    useEffect(() => {
        getAllProblem();
        getAllIssueOutCome();
        getAllIssueOccurence();
        getAllVarificationStatus();
        getClassificationlist();
        // issueDetailsData(issueDetailss)
        // console.log("issueDetailss", issueDetailss)
        // setIssueDetails(issueDetailss.Problem)
        // setIssueDetails(issueDetailss ?  issueDetailss : issueDetailss)
        console.log("issueDetailss", issueDetailss)

    }, [issueDetailsData]);
    return (
        <>
            {
                issueDetailss &&
                <div className='problemhead'>
                    <div className='problemhead-inn'>
                        <div className="col-12 mb-2">
                            <div>
                                <select className='form-control' id='ddlproblems' name='titleId' style={{ height: '8em' }} multiple onChange={handleSelectProblem}>
                                    {problemList && problemList.map((list) => {
                                        return (
                                            <option value={list.id}>{list.problemName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <span className='font-monospace fst-italic'>(Select one of these, or type your own title)</span>
                    </div>

                    <div className='problemhead-inn'>
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Title</b></label>
                            {/* {console.log('issueDetailss check',issueDetailss)} */}
                            <input type="text" value={issueDetailss.title} className="form-control form-control-sm" name="title" id='title' placeholder="Enter title" onChange={handleTitleInputChange} />
                        </div>
                    </div>
                    <div className='problemhead-inn'>
                        <div className="col-12 mb-2">
                            <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Coding</b></label>
                            <div>
                                {/* <select value={issueDetailss.coding} className='form-control' style={{ height: '8em' }} multiple name='coding' id='coding' onChange={handleCodingInputChange}>
                                    {issueDetailss && issueDetailss.coding !== "" ?
                                         <option>{'ICD10:' + issueDetailss.coding}</option>
                                        : ''}
                                </select> */}
                                
                                <span className='form-control' style={{ height: '8em' }}>{txtCoding}</span>
                            </div>

                        </div>
                        <div class="d-inline-flex gap-2">
                            <button type="button" class="btn btn-primary btn-sm" style={{ backgroundColor: '#1d4999' }} onClick={()=>{handleOpenModal('coding')}}><i class="bi bi-plus"></i> Add</button>
                            <button type="button" class="btn btn-secondary btn-sm" onClick={handleRemove}>Remove</button>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="row">
                            <div className="col-6 mb-2">
                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Begin Date and Time</b></label>
                                <input type="date" value={issueDetailss.beginDateTime} className="form-control form-control-sm" id="beginDateTime" name='beginDateTime' onChange={handleIssueDetailsChange} />
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
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="row">
                            <div className="col-6 mb-2">
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
                            <div className="col-6 mb-2">
                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Destination</b></label>
                                <input type="text" className="form-control form-control-sm" id="destination" name='destination' value={issueDetailss.destination} onChange={handleIssueDetailsChange} />
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="row">
                            <div className="col-12 mb-2">
                                <label htmlFor="txtPatientRelationAddress" className="form-label"><b>Referred by</b></label>
                                <input type="text" className="form-control form-control-sm mt-1" id="referredby" name='referredby' value={issueDetailss.referredby} onChange={handleIssueDetailsChange} />
                            </div>
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
                            <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={true} />
                            {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
                        </div>
                    </div>
                </div>
                : ''}
            {/* ------------------------------------------ Code Master popUp End------------------------------------ */}
        </>
    );
};

export default Problem
