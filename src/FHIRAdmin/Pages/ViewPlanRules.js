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
export default function ViewPlanRules() {
    let [buildingList, setBuildingList] = useState([]);
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    const [showAddPlan, setShowAddPlan] = useState(0);

    const handleAddNewPlanClick = () => {
        setShowAddPlan(1);
    };
    const HandleCancelNewPlan = () => {
        setShowAddPlan(0);
    };

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };




    useEffect(() => {

    }, [])
    document.body.dir = i18n.dir();
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

                                        <div className='row px-1'>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Plan <span className="starMandatory">*</span></label>
                                                    <select className='form-select form-select-sm' disabled={showAddPlan === 1}>
                                                        <option value='0'>Select Plan</option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 relative">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                    <div>
                                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                                            <>
                                                                {showToster === 1 ?
                                                                    <Toster value={tosterValue} message={tosterMessage} />

                                                                    : <div>
                                                                        <>
                                                                            <button type="button" id="addNewPlan" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleAddNewPlanClick} disabled={showAddPlan === 1}><img src={saveButtonIcon} className='icnn' alt='' />{t("Add New Plan")}</button>
                                                                        </>

                                                                    </div>}
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ---------------------------------------New Plan Section------------------------------------------------ */}
                                        {showAddPlan === 1 ?
                                            <div className='addPlan'>
                                                <div className='row px-1 py-3'>
                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                        <div className="mb-2 me-2">
                                                            <label htmlFor="" className="form-label">Plan Name <span className="starMandatory">*</span></label>
                                                            <input type="text" className="form-control form-control-sm" id="" name='' placeholder={t("Enter Plan")} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="mb-2 relative">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                            <div>
                                                                {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                                                    <>
                                                                        {showToster === 1 ?
                                                                            <Toster value={tosterValue} message={tosterMessage} />

                                                                            : <div>
                                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"><img src={saveButtonIcon} className='icnn' alt='' />{t("Add")}</button>
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

                                        {/* -------------------------------------Start Plan Rule Mapping Section---------------------------------------------- */}

                                        <div className='PlanRuleMapping'>
                                            <div className="d-flex px-1">

                                                <div className="planrulebrde flex-1">
                                                    <div className='rulesec'>
                                                        <div>rule already in plan</div>
                                                        <div>Remove all rules from plan</div>
                                                    </div>
                                                    <div className='allrules'>
                                                        Text1
                                                    </div>
                                                </div>
                                                <div className="planrulebrde flex-1">
                                                    <div className='rulesec'>
                                                        <div style={{ position: 'relative' }}>
                                                        <input type='text' className='form-control' placeholder={t("Search")} />
                                                        <span className="rulesericon"><i class="fas fa-search"></i></span>
                                                        </div>
                                                        <div>Add all rules to plan</div>
                                                    </div>
                                                    <div className='allrules'>
                                                        Text2
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
                                                                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
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
                                        {/* -------------------------------------End Plan Rule Mapping Section---------------------------------------------- */}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
