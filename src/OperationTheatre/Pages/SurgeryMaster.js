import React, { useEffect, useState } from 'react';
import GetDiseaseList from '../API/GET/GetDiseaseList';
import GetSurgeryList from '../API/GET/GetSurgeryList';
import SaveSurgeryMaster from '../API/POST/SaveSurgeryMaster';
import UpdateSurgeryMaster from '../API/UPDATE/UpdateSurgeryMaster';
import DeleteSurgery from '../API/DELETE/DeleteSurgery';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";



export default function SurgeryMaster() {
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [surgery, setSurgery] = useState('');
    let [diseaseList, setDiseaseList] = useState([]);
    let [surgeryList, setSurgeryList] = useState([]);
    let [rowID, setRowID] = useState([]);
    let [showLoder, setShowLoder] = useState(0);
    let [SelectedDisease , setSelectedDisease] = useState(null)
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const {t} = useTranslation();

    let handlerChange = async (e) => {
        document.getElementById('errSurgeryTitile').style.display = "none";
        document.getElementById('errDisease').style.display = "none";

        if (e.target.name === "surgery") {
            setSurgery(e.target.value)
        }
    }

    const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
        document.getElementById(errorElementId).style.display = 'none';
        setSelectedFunction(selectedOption);
    };
    let getDiseaeList = async () => {
        let data = await GetDiseaseList();
        setDiseaseList(data.responseValue.map(disease =>({
       value : disease.id,
       label : disease.problemName
        })));
        
    }
    let getSurgeryList = async () => {
        setShowLoder(1)
        let data = await GetSurgeryList();
        if (data.status === 1) {
            setShowLoder(0)
            setSurgeryList(data.responseValue);
        }
        else {
            setShowLoder(0);
         }
    }
    let handlerSave = async () => {
     
        document.getElementById('errSurgeryTitile').style.display = "none";
        document.getElementById('errDisease').style.display = "none";

       

        if (surgery === '' || surgery === null || surgery === undefined ) {
            document.getElementById('errSurgeryTitile').innerHTML = "Please fill Surgery Tiltle";
            document.getElementById('errSurgeryTitile').style.display = "block";
            return false;
        }
            else if(surgery.trim().length===0){
                document.getElementById('errSurgeryTitile').innerHTML = "Please remove blank space";
                document.getElementById('errSurgeryTitile').style.display = "block";
            return false;
        }
    
        else if (SelectedDisease === null) {
            document.getElementById('errDisease').innerHTML = "Please Select Disease";
            document.getElementById('errDisease').style.display = "block";
            return false;
        }
        else {
            setShowUnderProcess(1);

            var obj = {
                surgeryTitle: surgery,
                diseaseId: SelectedDisease.value,
                status: true,
                userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }

           

            
            let data = await SaveSurgeryMaster(obj);

            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handlerSaveUpdateClear();
                    getSurgeryList();

                }, 2000)
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(data.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }

        

        }

    }

    let edit = (list) => {
        document.getElementById('errSurgeryTitile').style.display = "none";
        document.getElementById('errDisease').style.display = "none";
        setRowID(list.id);
        setIsUpdateBtnShow(true);
        setSurgery(list.surgeryTitle);
        setSelectedDisease({
            value : list.id,
            label : list.problemName
        })

    }
    let handlerUpdate = async () => {
        
        document.getElementById('errSurgeryTitile').style.display = "none";
        document.getElementById('errDisease').style.display = "none";
        if (surgery === '' || surgery === null || surgery === undefined) {
            document.getElementById('errSurgeryTitile').innerHTML = "Please Fill Surgery Tiltle";
            document.getElementById('errSurgeryTitile').style.display = "block";
            return false;
        }
        else if (SelectedDisease === null) {
            document.getElementById('errDisease').innerHTML = "Please Select Disease";
            document.getElementById('errDisease').style.display = "block";
            return false;
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                id: rowID,
                surgeryTitle: surgery,
                diseaseId: SelectedDisease.value,
                status: 1,
                userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }
           
            let data = await UpdateSurgeryMaster(obj);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setShowToster(1);
                setTosterValue(0);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handlerSaveUpdateClear();
                    getSurgeryList();

                }, 2000)
               
            }
            else{
                setShowUnderProcess(0);
                setShowToster(1);
                setTosterValue(1);
                setTosterMessage(data.responseValue);
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)

            }

        }
    }
    let handlerClear = async () => {
        // document.getElementById('success').style.display = "none";
        // document.getElementById('successUpdate').style.display = "none";
        document.getElementById('errSurgeryTitile').innerHTML = "";
        document.getElementById('errSurgeryTitile').style.display = "none";
       
        document.getElementById('errDisease').style.display = "none";
        // document.getElementById('sucessResponse').style.display = "none";
        // document.getElementById('errorResponse').style.display = "none";
        setSurgery('');
        setIsUpdateBtnShow(false);
        setSelectedDisease(null)
        
    }
    let handlerSaveUpdateClear = () => {
        // document.getElementById('errSurgeryTitile').innerHTML = "";
        // document.getElementById('errSurgeryTitile').style.display = "none";
        // document.getElementById('errDisease').innerHTML = "";
        // document.getElementById('errDisease').style.display = "none";
        setSurgery('');
        setIsUpdateBtnShow(false);
       setSelectedDisease(null)
    }
    let getRowID = (id) => {
        setRowID(id);
    }
    let deleteRow = async () => {
        
        setShowUnderProcess(1);
        const userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
        let data = await DeleteSurgery(rowID, userID);
       
        if (data.status === 1) {
            setShowUnderProcess(0);
            setShowToster(1);
            setTosterValue(0);
            setTosterMessage("Data Deleted Successfully!");
            setTimeout(() => {
                setShowToster(0);
                handlerSaveUpdateClear();
                getSurgeryList();
            }, 2000)
        }
        else {
            setShowUnderProcess(0);
                setShowToster(1);
                setTosterValue(1);
                setTosterMessage(data.responseValue);
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)
        }
    }
    let clearToaster = () => {
        document.getElementById('errSurgeryTitile').style.display = "none";
        document.getElementById('errDisease').style.display = "none";
    }
    useEffect(() => {
        getDiseaeList();
        getSurgeryList();


    }, []);
   
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Surgery_Master")}</div>
                                <div className="inner-content">

                                    <div className='row'>
                                 
                                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                    <label htmlFor="Code" className="form-label">{t("Surgery_Title")}<span className="starMandatory">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" name="surgery" value={surgery} placeholder={t("Enter_Surgery_Title")} onChange={handlerChange} />
                                                    <small id="errSurgeryTitile" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                 {/* <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Disease<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlDisease' aria-label=".form-select-sm example" onChange={clearToaster}>
                                                        <option value="0">Select Disease</option>
                                                        {diseaseList && diseaseList.map((list, index) => {

                                                            return (
                                                                <option value={list.id}>{list.problemName}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    {/* <DropdownWithSearch list={diseaseList} defaulNname="Select Disease" name="ddlDisease" valueName="id" displayName="problemName" getvalue ={GetId} clear={clearDropdown} clearFun={handleClear} /> */}
                                                    {/* <small id="errDisease" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>   */}
                                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="ddlitemmaster" className="form-label ">{t("Disease")}<span className="starMandatory">*</span></label>
                                                <Select value={SelectedDisease} options={diseaseList} className=" create-select" id="serviceType" placeholder ={t("Select_Disease")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errDisease",setSelectedDisease)} />
                                                <small id="errDisease" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>

                                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                                                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                            :
                                                            <div>
                                                                {isUpdateBtnShow !== true ? <>
                                                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveBtnIcon} className='icnn' alt='' />{t("Save")}</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}><img src={clearBtnIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                                </> :
                                                                    <>
                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>{t("Update")}</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}>{t("Cancel")}</button>
                                                                    </>
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                       

                                </div>

                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="med-table-section" style={{ "height": "80vh" }}>
                                <table className="med-table border_ striped_">
                                    <thead style={{zIndex: '0'}}>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No")}</th>
                                            <th>{t("Surgery_Title")}</th>
                                            <th>{t("Disease")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {surgeryList && surgeryList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.surgeryTitle}</td>
                                                    <td>{list.problemName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { edit(list) }}/></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id); }}/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>

                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------Start Delete Modal Popup-------------------    */}

                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">
                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={deleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------End Delete Modal Popup---------------------  */}
                {
                    showLoder === 1 ? <Loder val={showLoder} /> : ""
                }
            </section>
        </>
    )
}