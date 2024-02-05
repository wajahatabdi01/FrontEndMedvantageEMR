import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading'
import BoxContainer from '../../Component/BoxContainer'
import TableContainer from '../../Component/TableContainer'
import Toster from '../../Component/Toster'
import TosterUnderProcess from '../../Component/TosterUnderProcess'
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import GetViewPlanRules from '../API/ViewPlanRules/GetViewPlanRules'
import Loader from '../../Component/Loader'
import SuccessToster from '../../Component/SuccessToster'
import AlertToster from '../../Component/AlertToster'
import DropdownWithSearch from '../../Component/DropdownWithSearch'
import PostViewPlanRules from '../API/ViewPlanRules/PostViewPlanRules'
import GetAddRule from '../API/AddRule/GetAddRule'
import GetRuleByPlanId from '../API/ViewPlanRules/GetRuleByPlanId'
import InsertPlanRule from '../API/ViewPlanRules/InsertPlanRule'
export default function ViewPlanRules() {
    document.body.dir = i18n.dir();
    let [updateBool, setUpdateBool] = useState(0)
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')
    let [planList, setPlanList] = useState('')
    let [sendForm, setSendForm] = useState({
        "userId": window.userId,
        "clientId": window.clientId,
        name: ''
    })
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showLoder, setShowLoder] = useState(0);
    const { t } = useTranslation();

    let [editPlan, setEditPlan] = useState('');
    let [ruleList, setRuleList] = useState('');

    let [clearDropdown, setClearDropdown] = useState(0);

    const [showAddPlan, setShowAddPlan] = useState(0);
    const [selectedRules, setSelectedRules] = useState([]);
    const [availableRules, setAvailableRules] = useState([]);
    const [tempAvailableRules, setTempAvailableRules] = useState([]);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    const [selectedPlanId, setSelectedPlanId] = useState('0');



    const handleAddNewPlanClick = () => {
        setShowAddPlan(1);
        document.getElementById("planId").value = 0;
    };
    const HandleCancelNewPlan = () => {
        setShowAddPlan(0);
        // handleClear();
    };

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    //Get All Plan    
    let getplan = async () => {
        try {
            let getResponse = await GetViewPlanRules();
            if (getResponse.status === 1) {
                setPlanList(getResponse.responseValue);
            } else {
                console.error("Failed to fetch data:", getResponse.responseValue);
                setShowErrMessage(getResponse.responseValue);
                setShowLoder(0);
                setShowAlertToster(1);
                getAllRule();
                setTimeout(() => {
                    setShowAlertToster(0);
                }, 1500);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //Get All Rule
    let getAllRule = async () => {
        try {
            let getResponse = await GetAddRule();
            if (getResponse.status === 1) {
                const responseData = getResponse.responseValue;
                if (Array.isArray(responseData)) {
                    setAvailableRules(responseData);
                    setTempAvailableRules(responseData);
                } else {
                    console.error("Invalid data structure:", responseData);
                }
            } else {
                console.error("Failed to fetch data:", getResponse.responseValue);
                setShowErrMessage(getResponse.responseValue);
                // setShowLoder(0);
                // setShowAlertToster(1);
                // setTimeout(() => {
                //     setShowAlertToster(0);
                // }, 1500);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    //Get Selected Rule
    let getselectedRule = async (selectedPlanId) => {
        try {
            let getResponse = await GetRuleByPlanId(selectedPlanId);
            if (getResponse.status === 1) {
                const responseData = getResponse.responseValue[0];
                const jsonPlanRuleMappingResult = JSON.parse(responseData.jsonPlanRuleMappingResult);
                setSelectedRules(jsonPlanRuleMappingResult);
            } else {
                console.error("Failed to fetch data:", getResponse.responseValue);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //Handle Add Rule
    const handleAddRule = (rule) => {
        let temp = {
            planId: selectedPlanId,
            ruleId: rule.id,
            ruleTitle: rule.title,
        }
        setSelectedRules((prev) => ([...prev, temp]));
        let avilableIndex = tempAvailableRules.findIndex(val => val.ruleId === rule.id)
        if (avilableIndex) {
            let temprules = [...tempAvailableRules]
            temprules.splice(avilableIndex, 1)
            setTempAvailableRules(temprules)
        }
    };

    // Handle Remove Rule
    const handleRemoveRule = (rule) => {
        let avilableIndex = selectedRules.findIndex(val => val.id === rule.ruleId)
        if (avilableIndex) {
            let temp = {
                planId: selectedPlanId,
                id: rule.ruleId,
                title: rule.ruleTitle,
            }
            setTempAvailableRules((prev) => ([...prev, temp]))
            let temprules = [...selectedRules]
            temprules.splice(avilableIndex, 1)
            setSelectedRules(temprules)
        }
    };
    //Handle Mapping Plan Rule
    let save = async () => {
        let tempjson = {
            // JsonPlanRuleDetails: JSON.stringify(selectedRules)
            // JsonPlanRuleDetails: JSON.stringify(selectedRules.map(({ planId, ruleId }) => ({ planId, ruleId })))
            JsonPlanRuleDetails: JSON.stringify(selectedRules.map(({ planId, ruleId }) => ({ planId, ruleId })))
                .replace(/\\/g, '')
        }
        tempjson.JsonPlanRuleDetails = JSON.parse(tempjson.JsonPlanRuleDetails);
        console.log("tempjson:", tempjson)
        const response = await InsertPlanRule(tempjson);
        if (response.status === 1) {
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTosterMessage("Data Saved Successfully.!");
            setTimeout(() => {
                setShowToster(0);
                HandleCancelNewPlan();
                handleClear();
                getplan();
            }, 1500)
        }
        else {
            setShowUnderProcess(0);
            setTosterValue(1);
            setShowToster(1);
            setTosterMessage(response.responseValue);
            setTimeout(() => {
                setShowToster(0);
            }, 1500)
        }
    }

    //HandleChang
    const handleChange = async (e) => {
        setEditPlan("");
        const { name, value } = e.target;
        setSendForm((prevData) => ({ ...prevData, [name]: value }));

        setSelectedPlanId(value);
        setShowAddPlan(value !== '0');
    };


    //Save Plan
    const handlerSave = async () => {
        if (sendForm.name === '' || sendForm.name === null || sendForm.name === undefined) {
            document.getElementById('errplan').innerHTML = "Plan is Required";
            document.getElementById('errplan').style.display = "block";
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                "name": sendForm.name,
                "userId": window.userId
            }
            const response = await PostViewPlanRules(obj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully.!");
                setTimeout(() => {
                    setShowToster(0);
                    HandleCancelNewPlan();
                    handleClear();
                    getplan();
                }, 1500)
            }
            else {
                setShowUnderProcess(0);
                setTosterValue(1);
                setShowToster(1);
                setTosterMessage(response.responseValue);
                setTimeout(() => {
                    setShowToster(0);
                }, 1500)
            }
        }
    }

    //Handel Clear
    const handleClear = (value) => {
        setUpdateBool(0);
        setEditPlan(0);
        setSendForm({
            "userId": window.userId,
            "clientId": window.clientId,
            name: ''
        });
        if (document.getElementById("name")) {
            document.getElementById("name").value = "";
        }
    };

    useEffect(() => {
        if (Array.isArray(ruleList)) {
            setAvailableRules(ruleList);
        } else {
            console.error("Invalid data structure for ruleList:", ruleList);
        }
        getplan();
        getAllRule();
        getselectedRule();
    }, [])

    useEffect(() => {
        if (selectedPlanId !== '0') {
            getselectedRule(selectedPlanId);
        }
    }, [selectedPlanId]);

    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className='whitebg'>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='fieldse'>{t("View Plan Rules")}</span>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className='row px-1'>
                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                        <div className="mb-2 me-2">
                                                            <label htmlFor="" className="form-label">Plan <span className="starMandatory">*</span></label>
                                                            <select className='form-select form-select-sm' id='planId' name='PlanId' disabled={showAddPlan === 1} onChange={handleChange}>
                                                                <option value='0'>Select Plan</option>
                                                                {planList && planList.map((val) => {
                                                                    return (
                                                                        <option value={val.id}>{val.name}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                            {/* {planList && <DropdownWithSearch defaulNname="Select Plan" name="name" list={planList} valueName="id" displayName="name" editdata={editPlan} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />} */}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                        <div className="mb-2 relative">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                            <div>
                                                                <button type="button" id="addNewPlan" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleAddNewPlanClick} disabled={showAddPlan === 1}><img src={saveButtonIcon} className='icnn' alt='' />{t("Add New Plan")}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                {/* ---------------------------------------New Plan Section------------------------------------------------ */}
                                                {showAddPlan === 1 ?
                                                    <div className='addPlan'>
                                                        <div className='row'>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="mb-2 me-2">
                                                                    <label htmlFor="" className="form-label">Plan Name <span className="starMandatory">*</span></label>
                                                                    <input type="text" className="form-control form-control-sm" id="name" name='name' placeholder={t("Enter Plan")} onChange={handleChange} />
                                                                    <small id="errplan" className="invalid-feedback" style={{ display: 'none' }}></small>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="mb-2 relative">
                                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                                    <div>
                                                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                                                            <>
                                                                                {showToster === 1 ?
                                                                                    <Toster value={tosterValue} message={tosterMessage} />
                                                                                    : <div>
                                                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' alt='' />{t("Add")}</button>
                                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={HandleCancelNewPlan} ><img src={clearIcon} className='icnn' alt='' />{t("Cancel")}</button>
                                                                                    </div>
                                                                                }
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ""}

                                                {/* -------------------------------------End New Plan Section---------------------------------------------- */}
                                            </div>
                                        </div>
                                        {/* -------------------------------------Start Plan Rule Mapping Section---------------------------------------------- */}
                                        {selectedPlanId !== '0' &&
                                            <div className='PlanRuleMapping mt-2' >
                                                {/* <div className='statusRule px-1'><span className='ruleStattxt'>Status: Active </span><span className=''>Deactivate</span></div> */}
                                                <div className="d-flex px-1">
                                                    <div className="planrulebrde flex-1">
                                                        <div className='rulesec'>
                                                            <div><span className='rulecount'>{selectedRules.length}</span> Rule already in plan</div>
                                                            <div>Remove all rules from plan</div>
                                                        </div>
                                                        <div className='allrules'>

                                                            {selectedRules.map((val) => (
                                                                <div className="planrule" key={val.id}>
                                                                    <div className="plantxt" val={val.ruleId}>{val.ruleTitle}</div>
                                                                    <div className="planicon" onClick={() => handleRemoveRule(val)}>
                                                                        <i className="fa fa-minus"></i>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="planrulebrde flex-1">
                                                        <div className='rulesec'>
                                                            <div className='ruleserch'>
                                                                <input type='text' className='form-control' placeholder={t("Search")} />
                                                                <span className="rulesericon"><i className="fas fa-search"></i></span>
                                                            </div>
                                                            <div>Add rules to plan</div>
                                                        </div>
                                                        <div className='allrules'>
                                                            {tempAvailableRules.map((val) => (
                                                                <div className="planrule" key={val.id}>
                                                                    <div className="plantxt" val={val.id}>{val.title}</div>
                                                                    <div className="planicon" onClick={() => handleAddRule(val)}>
                                                                        <i className="fa fa-plus"></i>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row px-1 '>
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
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
                                                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={save}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" ><img src={clearIcon} className='icnn' alt='' />{t("Cancel")}</button>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1">{t("UPDATE")}</button>
                                                                                        <button type="button" className="btn btn-clear btn-sm mb-1">{t("Cancel")}</button>
                                                                                    </>
                                                                                }
                                                                            </div>}
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {/* -------------------------------------End Plan Rule Mapping Section---------------------------------------------- */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showLoder === 1 ? <Loader val={showLoder} /> : ""
                }
                {/* Toaster */}
                {
                    isShowToaster === 1 ?
                        <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
                }
                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }
            </section>
        </>
    )
}
