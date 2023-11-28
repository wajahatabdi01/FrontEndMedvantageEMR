import React, { useState, useEffect } from 'react'
import GetKitList from '../API/GET/GetKitList';
import SaveKitAssign from '../API/POST/SaveKitAssign';
import GetItemList from '../API/GET/GetItemList';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import GetUnitList from '../API/GET/GetUnitList';
import GetKitItemAssignList from '../API/GET/GetKitItemAssignMasterList';
import Loder from '../../Component/Loader';
import UpdateKitItemAssignMaster from '../API/UPDATE/UpdateKitItemAssignMaster';
import DeleteSurgeryKitItemAssignMaster from '../API/DELETE/DeleteSurgeryKitItemAssignMaster';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function SurgeryKitItemAssign() {
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let[showLoder,setShowLoder] = useState(0);
    let [quantity, setQuantity] = useState('');
    let [surgerykitItemAssignList, setSurgerykitItemAssignList] = useState([]);
    let [kitList, setKitList] = useState([]);
    let [itemList, setItemList] = useState([]);
    let [unitList, setUnitList] = useState([]);
    let [rowID,setRowID]= useState('');
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    const {t} = useTranslation();
    let handlerChange = (e) => {
        clearToaster();
        if (e.target.name === "quantity") {
            setQuantity(e.target.value);
        }
    }
    let getSurgerykitItemAssignList = async () => {
        setShowLoder(1);
        var data = await GetKitItemAssignList();
        console.log('itemlistsur',data.responseValue);
        if (data.status === 1) {
            setShowLoder(0);
            setSurgerykitItemAssignList(data.responseValue);
        }
       
    }
    let getKitList = async () => {
        var data = await GetKitList();
        console.log(data.responseValue);
        if (data.status === 1) {
            setKitList(data.responseValue);
        }
       
    }
    let getItemList = async () => {
        let data = await GetItemList();
        console.log('itemlist',data);
        if (data.status === 1) {
            setItemList(data.responseValue);
        }

    }
    let getUnitList = async () => {
        let data = await GetUnitList();
        console.log('UnitList',data);
        if (data.status === 1) {
            setUnitList(data.responseValue);
        }

    }
    let handlerSave = async () => {
        clearToaster();
        const KitID = document.getElementById("ddlKit").value;
        const itemID = document.getElementById("ddlItem").value;
        const UnitID = document.getElementById("ddlUnit").value;
        if (KitID === '0' || KitID === null || KitID === undefined) {
            document.getElementById('errddlKit').innerHTML = "Please Select Kit";
            document.getElementById('errddlKit').style.display = "block";
            return false;
        }
        else if (itemID === '0' || itemID === null || itemID === undefined) {
            document.getElementById('errddlItem').innerHTML = "Please Select Item";
            document.getElementById('errddlItem').style.display = "block";
            return false;
        }
        else if (quantity === '' || quantity === null || quantity == []) {
            document.getElementById('errQty').innerHTML = "Please Select Quantity";
            document.getElementById('errQty').style.display = "block";
            return false;
        }
        else if(quantity < 0){
            document.getElementById('errQty').innerHTML = "Please enter non-negative number";
            document.getElementById('errQty').style.display = "block";
        return false;
        }
        else if (UnitID === '0' || UnitID === null || UnitID === undefined) {
            document.getElementById('errddlUnit').innerHTML = "Please Select Unit";
            document.getElementById('errddlUnit').style.display = "block";
            return false;
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                kitID: parseInt(KitID),
                itemID: parseInt(itemID),
                quantity: parseInt(quantity),
                unitID: parseInt(UnitID),
                status:true,
                userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
            }
            console.log('obj', obj);
            let data = await SaveKitAssign(obj);
            console.log('data', data);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    getSurgerykitItemAssignList();
                    handlerClear();
                }, 2000)
            }
            else{
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
        console.log(list);
        setIsUpdateBtnShow(true);
        setRowID(list.id);
        document.getElementById("ddlKit").value = list.kitId;
        document.getElementById("ddlItem").value = list.itemId;
        document.getElementById("ddlUnit").value = list.unitId;
        setQuantity(list.quantity);
      
       
    }
    let handlerUpdate =async () => {
        document.getElementById('errddlKit').style.display = "none";
        document.getElementById('errddlItem').style.display = "none";
        document.getElementById('errQty').style.display = "none";
        document.getElementById('errddlUnit').style.display = "none";
        const KitID = document.getElementById("ddlKit").value;
        const itemID = document.getElementById("ddlItem").value;
        const UnitID = document.getElementById("ddlUnit").value;
        if (KitID === '0' || KitID === null || KitID === undefined) {
            document.getElementById('errddlKit').innerHTML = "Please Select Kit";
            document.getElementById('errddlKit').style.display = "block";
            return false;
        }
        else if (itemID === '0' || itemID === null || itemID === undefined) {
            document.getElementById('errddlItem').innerHTML = "Please Select Item";
            document.getElementById('errddlItem').style.display = "block";
            return false;
        }
        else if (quantity === '' || quantity === null || quantity == []) {
            document.getElementById('errQty').innerHTML = "Please Select Quantity";
            document.getElementById('errQty').style.display = "block";
            return false;
        }
        else if (UnitID === '0' || UnitID === null || UnitID === undefined) {
            document.getElementById('errddlUnit').innerHTML = "Please Select Unit";
            document.getElementById('errddlUnit').style.display = "block";
            return false;
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                id:rowID,
                kitID: KitID,
                itemID: itemID,
                quantity: quantity,
                unitID: UnitID,
                userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userID,
            }
            console.log('obj', obj);
            let response = await UpdateKitItemAssignMaster(obj);
            console.log('response', response);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    getSurgerykitItemAssignList();
                    handlerClear();
                }, 2000)
            }
            else{
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
           

        }

    }
    let handlerClear = () => {
        setQuantity("");
        setIsUpdateBtnShow(false);
        document.getElementById("ddlKit").value = "0";
        document.getElementById("ddlItem").value = "0";
        document.getElementById("ddlUnit").value = "0";
        document.getElementById('errddlKit').style.display = "none";
        document.getElementById('errddlItem').style.display = "none";
        document.getElementById('errQty').style.display = "none";
        document.getElementById('errddlUnit').style.display = "none";
    }
    let clearToaster = () => {
        document.getElementById('errddlKit').style.display = "none";
        document.getElementById('errddlItem').style.display = "none";
        document.getElementById('errQty').style.display = "none";
        document.getElementById('errddlUnit').style.display = "none";
    }
    let deleteRow = async()=>{
        console.log(rowID)
        setShowUnderProcess(1);
        let response = await DeleteSurgeryKitItemAssignMaster(rowID,window.userId);
        if (response.status === 1) {
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTosterMessage("Data Deleted Successfully!");
            setTimeout(() => {
                setShowToster(0);
                getSurgerykitItemAssignList();
            }, 2000)
        }
        else{
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage(response.responseValue)
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }
    useEffect(() => {
        getSurgerykitItemAssignList();
        getKitList();
        getItemList();
        getUnitList();
    }, []);
    document.body.dir = i18n.dir();
    return (

        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Surgery_Kit_Item_Assign")}</div>
                                <div className="inner-content">

                                    <div className='row'>
                                        <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                                            <div className="d-flex flex-wrap align-content-end">

                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="ddlKit" className="form-label">{t("Kit")}<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlKit' aria-label=".form-select-sm example" onChange={clearToaster}>
                                                        <option value="0">{t("Select_Kit")}</option>
                                                        {kitList && kitList.map((list, index) => {
                                                            return (
                                                                <option value={list.id}>{list.kitName}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <small id="errddlKit" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="Iddltem" className="form-label">{t("Items")}<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlItem' aria-label=".form-select-sm example">
                                                        <option value="0">{t("Select_Item")}</option>
                                                        {itemList && itemList.map((list, index) => {
                                                       
                                                            return (
                                                                <option value={list.id}>{list.itemName}</option>
                                                            )
                                                            })}
                                                    </select>
                                                    <small id="errddlItem" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="quantity" className="form-label">{t("Quantity")}<span className="starMandatory">*</span></label>
                                                    <input type="number" className="form-control form-control-sm" name="quantity" value={quantity} placeholder={t("Enter_Quantity")} onChange={handlerChange} />
                                                    <small id="errQty" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="ddlUnit" className="form-label">{t("Unit")}<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlUnit' aria-label=".form-select-sm example">
                                                        <option value="0">{t("Select_Unit")}</option>
                                                        {unitList && unitList.map((list, index) => {
                                                       
                                                            return (
                                                                <option value={list.id}>{list.unitName}</option>
                                                            )
                                                            })}
                                                    </select>
                                                    <small id="errddlUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>


                                                <div className="mb-2 relative">
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

                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="med-table-section" style={{ "height": "80vh" }}>
                                <table className="med-table border_ striped_">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")}</th>
                                            <th>{t("Kit")}</th>
                                            <th>{t("Items")}</th>
                                            <th>{t("Quantity")}</th>
                                            <th>{t("Unit")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                      {
                                        surgerykitItemAssignList && surgerykitItemAssignList.map((list,index)=>{
                                            return(

                                                <tr>
                                            <td className="text-center">{index+1}</td>
                                            <td>{list.kitName}</td>
                                            <td>{list.itemName}</td>
                                            <td>{list.quantity}</td>
                                            <td>{list.unitName}</td>
                                            
                                            <td>
                                                <div className="action-button">
                                                    <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { edit(list) }}/></div>
                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id) }}/>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                            )
                                        })
                                      }
                                        
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
