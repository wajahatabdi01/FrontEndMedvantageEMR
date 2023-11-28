import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationLanguageHeadMaster from '../../../Validation/Pharmacy/ValidationConversionMaster'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import GetLanguageHeadMaster from '../../Api/Master/LanguageHeadMasterAPI/GetLanguageHeadMaster'
import PostLanguageHeadMaster from '../../Api/Master/LanguageHeadMasterAPI/PostLanguageHeadMaster'
import PutLanguageHeadMaster from '../../Api/Master/LanguageHeadMasterAPI/PutLanguageHeadMaster'
import GetHeadMaster from '../../Api/Master/HeadMaster/GetHeadMaster'
import GetLanguageMaster from '../../../Admin/Api/Master/LanguageMaster/GetLanguageMaster'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import DeleteLanguageHeadMaster from '../../Api/Master/LanguageHeadMasterAPI/DeleteLanguageHeadMaster'
import Search from '../../../Code/Serach'

export default function LanguageHeadMaster() {

    let [languageHeadMasterData, setLanguageHeadMasterData] = useState()
    let [dataRowIdList, setDataRowIdList] = useState()
    let [languageMasterData, setLanguageMasterData] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [languageID, setLanguageID] = useState()
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editItem, setEditItem] = useState("")
    let [rowId, setRowId] = useState("")
    let [editLanguageMaster, setEditLanguageMaster] = useState("")
    let [editDataRowID, setEditDataRowID] = useState("")

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationLanguageHeadMaster(sendForm.languageID)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostLanguageHeadMaster(sendForm);
            console.log("sendForm", sendForm)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear();
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

        let getResponse = await GetLanguageHeadMaster();
        let getLangResponse = await GetLanguageMaster();
        let getHeadMasterResponse = await GetHeadMaster();
        console.log("getResponse", getResponse)

        if (getResponse.status === 1) {
            setLanguageHeadMasterData(getResponse.responseValue)

        }
        if (getLangResponse.status === 1) {
            setLanguageMasterData(getLangResponse.responseValue)

        }
        if (getHeadMasterResponse.status === 1) {
            setDataRowIdList(getHeadMasterResponse.responseValue)
        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setEditLanguageMaster("")
        setEditDataRowID("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))


    }

    //   let handleSearch = (e) => {
    //     let resp = Search(conversionMainData, e.target.value)
    //     if (e.target.value !== "") {
    //       if (resp.length !== 0) {
    //         setConversionData(resp)
    //       }
    //       else {
    //         setConversionData([])

    //       }
    //     }
    //     else {
    //         setConversionData(conversionMainData)
    //     }
    //   }


    // Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let obj = {
            id: rowId
        }
        let response = await DeleteLanguageHeadMaster(obj)
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
    let handleUpdate = async (id, languageID, dataRowID, languageText, userId, headName, languageName) => {

        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "languageID": languageID,
            "dataRowID": dataRowID,
            "languageText": languageText,
            "userId": userId

        }))
        document.getElementById("languageID").value = languageID;
        setEditLanguageMaster(languageName)
        setEditDataRowID(headName)
        document.getElementById("languageText").value = languageText;


    }



    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationLanguageHeadMaster(sendForm.languageID)
        console.log("valresponse", valresponse);
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutLanguageHeadMaster(sendForm)
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
                handleClear();
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
        setSendForm({ "userId": window.userId })
        setClearDropdown(value)
        setEditLanguageMaster(0)
        setEditDataRowID(0)


        document.getElementById("languageText").value = '';
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
    }, [])
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text='Language Head Master' />
                            <BoxContainer>


                                {/* <div className="mb-2 me-2">
                                    <label htmlFor="languageID" className="form-label">Language Id <span className="starMandatory">*</span></label>
                                    <select name='languageID' id="languageID" onChange={handleChange} className="form-select form-select-sm" defaultValue="1" aria-label=".form-select-sm example">
                                        <option onClick={() => { getdata() }}>1</option>
                                        <option onClick={() => { getdata() }}>2</option>
                                        <option onClick={() => { getdata() }}>3</option>
                                        <option onClick={() => { getdata() }}>4</option>
                                    </select>

                                </div> */}

                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="languageID" className="form-label">Language Name<span className="starMandatory">*</span></label>

                                    {languageMasterData && <DropdownWithSearch defaulNname="Select" name="languageID" list={languageMasterData} valueName="id"
                                        displayName="language" editdata={editLanguageMaster} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>

                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="dataRowID" className="form-label">Head Name<span className="starMandatory">*</span></label>

                                    {dataRowIdList && <DropdownWithSearch defaulNname="Select" name="dataRowID" list={dataRowIdList} valueName="id"
                                        displayName="headName" editdata={editDataRowID} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>

                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="languageText" className="form-label">Language Text<span class="starMandatory">*</span></label>
                                    <input type='text' className="form-control form-control-sm" id='languageText' name='languageText' onChange={handleChange} placeholder='Enter multiplied by' />
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
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveForm}>Save</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}>Clear</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>Update</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>Cancel</button>
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
                            <Heading text='Language Head Master List' />
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Language Id</th>
                                            <th>Head Name</th>
                                            <th>Language Text</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {languageHeadMasterData && languageHeadMasterData.map((key, ind) => {
                                            return (
                                                <tr value={key.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{key.languageID}</td>
                                                    <td>{key.headName}</td>
                                                    <td>{key.langheadName}</td>

                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(key.id, key.languageID, key.dataRowID, key.languageText, key.userId, key.headName, key.languageName) }} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(key.id) }} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                                    <div class="modal-dialog modalDelete">
                                        <div class="modal-content">

                                            <div class="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i class="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> Delete?</div>
                                                <div className='popDeleteContent'> Are you sure you want to delete?</div>
                                            </div>
                                            <div class="modal-footer1 text-center">

                                                <button type="button" class="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                                <button type="button" class="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">Delete</button>
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
        </>
    )
}
