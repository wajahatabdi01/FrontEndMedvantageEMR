import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import ValidationExaminationParameterMaster from '../../../Validation/SuperAdmin/Master/ValidationExaminationParameterMaster'
import PostExaminationParameterMaster from '../../Api/Master/ExaminationParameterMaster/PostExaminationParameterMaster'
import GetExaminationParameterMaster from '../../Api/Master/ExaminationParameterMaster/GetExaminationParameterMaster'
import PutExaminationParameterMaster from '../../Api/Master/ExaminationParameterMaster/PutExaminationParameterMaster'
import DeleteExaminationParameterMaster from '../../Api/Master/ExaminationParameterMaster/DeleteExaminationParameterMaster'
import GetStatusMaster from '../../Api/Master/ExaminationParameterMaster/GetStatusMaster'
import RemoveDuplicateData from '../../../Code/RemoveDuplicateData'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function ExaminationParameterMaster() {
    let [exampParameterList, setExampParameterList] = useState([])
    let [statusList, setStatusList] = useState()
    let [inspectedAsList, setInspectedAsList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editParameterResult, setEditParameterResult] = useState("")
    const [searchTerm, setSearchTerm] = useState('');


    const {t} = useTranslation();


    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };




    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationExaminationParameterMaster(sendForm.parameterName, sendForm.parameterResultType)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostExaminationParameterMaster(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear(1);
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
            getdata()
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }

    }

    //Get data
    let getdata = async () => {
        let getResponse = await GetExaminationParameterMaster();
        let getStatus = await GetStatusMaster();
        let getInspectedAs = await GetStatusMaster();
        if (getResponse.status === 1) {
            setLoder(0)

            setExampParameterList(getResponse.responseValue)
            setInspectedAsList(getInspectedAs.responseValue)
            let temp = RemoveDuplicateData(getStatus.responseValue, "module")
            setStatusList(temp)
        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditParameterResult("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteExaminationParameterMaster(rowId)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted SuccessFully!")
            setTosterValue(0)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
            getdata()
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
    }
    //Handle Button Change
    let handleUpdate = async (id, parameterName, parameterResultType, userId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            // "inspectedAs": inspectedAs,
            "parameterName": parameterName,
            "parameterResultType": parameterResultType,
            "userId": userId,
        }))
        setEditParameterResult(parameterResultType)
        // document.getElementById("inspectedAs").value = inspectedAs;
        document.getElementById("parameterName").value = parameterName;
        document.getElementById("parameterResultType").value = parameterResultType;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationExaminationParameterMaster(sendForm.parameterName, sendForm.parameterResultType)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutExaminationParameterMaster(sendForm)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Updated SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                setUpdateBool(0)
                getdata()
                handleClear(1);
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

        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }

    //Handle Clear
    let handleClear = (value) => {
        setClearDropdown(value)
        setEditParameterResult("")
        setSendForm({ "userId": window.userId })
        // document.getElementById("inspectedAs").value = 0;
        document.getElementById("parameterName").value = "";
        // document.getElementById("parameterResultType").value = 0;
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
    }, [])
 document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text= {t("Examination_Parameter_Master")}/>
                            <BoxContainer>
                                {/* <div className="mb-2 me-2">
                                    <label htmlFor="inspectedAs" className="form-label">Inspected As <span className="starMandatory">*</span></label>
                                    <select name='inspectedAs' id="inspectedAs" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {inspectedAsList && inspectedAsList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.remark}</option>
                                            )
                                        })}
                                    </select>
                                </div> */}
                                <div className="mb-2 me-2">
                                    <label htmlFor="parameterName" className="form-label">{t("Parameter")}<span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="parameterName" name="parameterName" placeholder= {t("Parameter_Name")} onChange={handleChange} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="parameterResultType" className="form-label"> {t("Parameter_Result_Type")}</label>
                                    {/* <select name='parameterResultType' id="parameterResultType" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {statusList && statusList.map((val, index) => {
                                            return (
                                                <option value={val.module}>{val.module}</option>
                                            )
                                        })}
                                    </select> */}
                                    {statusList && <DropdownWithSearch defaulNname= {t("Select_parameter_result")}  name="parameterResultType" list={statusList} valueName="module" displayName="module" editdata={editParameterResult} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}>{t("Cancel")}</button>
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
                                <Heading text= {t("Examination_Parameter_List")}/>
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder= {t("Search")} value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            {/* <th>Inspected As </th> */}
                                            <th>{t("Parameter")}</th>
                                            <th> {t("Parameter_Result_Type")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {exampParameterList && exampParameterList.filter((val) => `${val.parameterName} ${val.parameterResultType}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    {/* <td>{val.remark}</td> */}
                                                    <td>{val.parameterName}</td>
                                                    <td>{val.parameterResultType}</td>
                                                    <td>
                                                        {/* <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.inspectedAs, val.parameterName, val.parameterResultType, val.userId) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                                                            </div>
                                                        </div> */}
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.parameterName, val.parameterResultType, val.userId) }}><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" onClick={() => { setRowId(val.id) }}><img src={IconDelete} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
                                {/*  <!-- Modal -->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                                                <div className='popDeleteContent'> {t("Are you sure you want to delete?")} </div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal"> {t("Cancel")} </button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal"> {t("Delete")} </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
                            </div>

                        </div>


                    </div>
                </div>


            </section>
            {/* <Loder val={loder} /> */}
        </>
    )
}
