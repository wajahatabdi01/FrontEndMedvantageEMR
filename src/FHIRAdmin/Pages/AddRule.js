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
export default function AddRule() {
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
    let [content, setContent] = useState('');
    const { t } = useTranslation();
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
                                        <span className='fieldse'>{t("Add Rule")}</span>

                                        <div className='row px-1 py-3'>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Title <span className="starMandatory">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" id="" name='' placeholder={t("Enter Title")} />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Type </label>
                                                    <div className='d-flex gap-3 flex-wrap checklabel'>
                                                        <div className="form-check ps-0">
                                                            <input className="form-check-input" type="checkbox" id="" name="" />
                                                            <label className="form-check-label" htmlFor="" >
                                                                Active Alert
                                                            </label>
                                                        </div>
                                                        <div className="form-check ps-0">
                                                            <input className="form-check-input" type="checkbox" id="" name="" />
                                                            <label className="form-check-label" htmlFor="" >
                                                                Passive Alert
                                                            </label>
                                                        </div>
                                                        <div className="form-check ps-0">
                                                            <input className="form-check-input" type="checkbox" id="" name="" />
                                                            <label className="form-check-label" htmlFor="">
                                                                Patient Reminder
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Bibliographic Citation</label>
                                                    <input type="text" className="form-control form-control-sm" id="" name='' placeholder={t("Enter Bibliographic Citation")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Developer</label>
                                                    <input type="text" className="form-control form-control-sm" id="" name='' placeholder={t("Enter Developer")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Funding Source</label>
                                                    <input type="text" className="form-control form-control-sm" id="" name='' placeholder={t("Enter Funding Source")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Release</label>
                                                    <input type="text" className="form-control form-control-sm" id="" name='' placeholder={t("Enter Release")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Web Reference</label>
                                                    <input type="text" className="form-control form-control-sm" id="" name='' placeholder={t("Enter Web Reference")} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="" className="form-label">Referential CDS</label>
                                                    <input type="text" className="form-control form-control-sm" id="" name='' placeholder={t("Enter Referential CDS")} />
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
                                                                        {updateBool === 0 ?
                                                                            <>
                                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" ><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
