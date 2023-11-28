import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationBuildingMaster from '../../../Validation/Admin/Master/ValidationBuildingMaster'
import PostBuildingMaster from '../../Api/Master/BuildingMaster/PostBuildingMaster'
import GetBuildingMaster from '../../Api/Master/BuildingMaster/GetBuildingMaster'
import DeleteBuildingMaster from '../../Api/Master/BuildingMaster/DeleteBuildingMaster'
import PutBuildingMaster from '../../Api/Master/BuildingMaster/PutBuildingMaster'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function BuildingMaster() {
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
    const {t} = useTranslation();
    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };



    //Handle Save
    let saveForm = async () => {
        // console.log("sendform",sendForm)
        // return
        let valresponse = ValidationBuildingMaster(sendForm.buildingName, sendForm.address, sendForm.noOfFloors)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostBuildingMaster(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

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
        let getResponse = await GetBuildingMaster();
        if (getResponse.status === 1) {
            setBuildingList(getResponse.responseValue)
        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1);
        let obj = {
            id: rowId
        }
        let response = await DeleteBuildingMaster(obj)
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
    let handleUpdate = async (id, buildingName, address, noOfFloors, constructionDate, userId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "buildingName": buildingName,
            "address": address,
            "noOfFloors": noOfFloors,
            "constructionDate": constructionDate,
            // "constructionDate": reformatDateString(constructionDate),
            "userId": userId,
        }))

        document.getElementById("buildingName").value = buildingName;
        document.getElementById("address").value = address;
        document.getElementById("noOfFloors").value = noOfFloors;
        document.getElementById("constructionDate").value = constructionDate.split("T")[0];
        // document.getElementById("constructionDate").value = reformatDateString(constructionDate);
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationBuildingMaster(sendForm.buildingName, sendForm.address, sendForm.noOfFloors)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutBuildingMaster(sendForm)
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
    let handleClear = () => {
        setSendForm({ "userId": window.userId })
        document.getElementById("buildingName").value = "";
        document.getElementById("address").value = "";
        document.getElementById("noOfFloors").value = "";
        document.getElementById("constructionDate").value = "";
        setUpdateBool(0)
    }


    useEffect(() => {
        getdata()        
        setContent(JSON.parse(window.sessionStorage.getItem("departmentmenu")).menuList[0].subMenuList[1].content)
    }, [])
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text={t("Building_Master")} />
                            {/* <Heading text={content} /> */}
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="buildingName" className="form-label">{t("Building_Name")} <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="buildingName" name='buildingName' onChange={handleChange} placeholder={t("Enter_Building_Name")} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="noOfFloors" className="form-label">{t("No_of_Floors")}<span className="starMandatory">*</span></label>
                                    <input type="number" className="form-control form-control-sm" id="noOfFloors" name='noOfFloors' onChange={handleChange} placeholder={t("Enternooffloors")} />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="address" className="form-label">{t("Address")}<span className="starMandatory">*</span></label>
                                    <textarea className='form-control form-control-sm' id='address' name='address' onChange={handleChange} placeholder={t("Enter_Address")}></textarea>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="constructionDate" className="form-label">{t("Construction_Date")}</label>
                                    <input type="date" className="form-control form-control-sm" id="constructionDate" name='constructionDate' onChange={handleChange} placeholder="Construction date" />
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
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>{t("Cancel")}</button>
                                                            </>
                                                        }
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </BoxContainer>

                        </div>
                        <div className="col-12 mt-3">
                            <div className='handlser'>
                                <Heading text={t("Building_List")} />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search_Result")} value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "73vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Building_Name")}</th>
                                            <th>{t("Address")}</th>
                                            <th>{t("No_of_Floors")}</th>
                                            <th>{t("Construction_Date")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* {buildingList && buildingList.map((val, ind) => {
                                            const [datePart] = val.constructionDate.split("T");
                                            const [year, month, day] = datePart.split("-");
                                            const formattedDate = `${month}/${day}/${year}`;
                                            return ( */}
                                        {buildingList && buildingList.filter((val) => `${val.buildingName} ${val.address} ${val.noOfFloors} ${val.constructionDate}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {

                                            const [datePart] = val.constructionDate.split("T");
                                            const [year, month, day] = datePart.split("-");
                                            const formattedDate = `${month}/${day}/${year}`;
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.buildingName}</td>
                                                    <td>{val.address}</td>
                                                    <td>{val.noOfFloors}</td>
                                                    {/* <td>{val.constructionDate.split("T")[0]}</td> */}
                                                    <td>{formattedDate}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(val.id, val.buildingName, val.address, val.noOfFloors, val.constructionDate, val.userId) }} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(val.id) }} alt='' /></div>

                                                        </div>
                                                    </td>
                                                </tr>

                                            );
                                        })}
                                        {/* )
                                        })} */}

                                    </tbody>
                                </TableContainer>
                                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
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
