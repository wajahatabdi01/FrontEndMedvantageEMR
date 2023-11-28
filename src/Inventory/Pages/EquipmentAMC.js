import React, { useEffect, useState } from 'react';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loader from '../../Component/Loader';
import Select from 'react-select';
import GetEquipmentList from '../API/EquipmentAMC/GetEquipmentList';
import GetVendorList from '../API/EquipmentAMC/GetVendorList';
import GetUnitList from '../API/EquipmentAMC/GetUnitList';
import PostEquipmentAMC from '../API/EquipmentAMC/PostEquipmentAMC';
import GetTableData from '../API/EquipmentAMC/GetTableData';
import GetServiceTypeMaster from '../API/ServiceTypeMaster/GetServiceTypeMaster';
import PutEquipmentAMC from '../API/EquipmentAMC/PutEquipmentAMC';
import DeleteEquipmentAMC from '../API/EquipmentAMC/DeleteEquipmentAMC';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export const EquipmentAMC = () => {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    const [equipmentList, setEquipmentList] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [installationDate, setInstallationDate] = useState('');
    const [SelectedSerialNumber, setSelectedSerialNumber] = useState(null);
    const [serviceTypeTable, setserviceTypeTable] = useState([]);
    const [warrantyPeriod, setWarrantyPeriod] = useState('');
    const [unitList, setUnitList] = useState([]);
    const [showUnderProcess, setShowUnderProcess] = useState(0);
    const [showToster, setShowToster] = useState(0);
    const [tosterMessage, setTosterMessage] = useState("");
    const [tosterValue, setTosterValue] = useState(0);
    const [rowID, setRowID] = useState(0);
    const [showLoder, setShowLoder] = useState(0);
    const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    const [equipmentAMCList, setEquipmentAMCList] = useState([]);
    const [SelectedVendor, setSelectedVendor] = useState(null)
    const [SelectedUnit, setSelectedUnit] = useState(null)
    const [SelectedServiceType, setSelectedServiceType] = useState(null)
    const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);


    let dropDowns = async () => {
        let Equipmentdata = await GetEquipmentList();
        if (Equipmentdata.status === 1) {
            setShowLoder(0);
            setEquipmentList(Equipmentdata.responseValue.map(SerialNo => ({
                value: SerialNo.id,
                label: `${SerialNo.serialNumber} (${SerialNo.itemName})`
            })));
        }
        
        else {
            setShowLoder(0);
        }
        let Vendordata = await GetVendorList();
        if (Vendordata.status === 1) {
            setShowLoder(0);
            setVendorList(Vendordata.responseValue.map(VendorName => ({
                value: VendorName.id,
                label: VendorName.vendorName
            })));
        }
        else {
            setShowLoder(0);
        }

        let serviceTypelist = await GetServiceTypeMaster()
        if (serviceTypelist.status === 1) {
            setserviceTypeTable(serviceTypelist.responseValue.map(serviceType => ({
                value: serviceType.id,
                label: serviceType.serviceType,
            })))
            console.log('ServiceType', serviceTypelist.responseValue)
        }
    }


    const getVendorList = async () => {

    };

    const getUnitList = async () => {
        const data = await GetUnitList();
        if (data.status === 1) {
            setUnitList(data.responseValue.map(Unit => ({
                value: Unit.id,
                label: Unit.unitName
            })));
        }
        else {
            setShowLoder(0);
        }
    };

    const getEquipmentAMCData = async () => {
        setShowLoder(1);
        const data = await GetTableData();
        console.log('data', data);
        if (data.status === 1) {
            setShowLoder(0);
            setEquipmentAMCList(data.responseValue);
        }
        else {
            setShowLoder(0);
        }
    };


    const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
        document.getElementById(errorElementId).style.display = 'none';
        setSelectedFunction(selectedOption);
    };



       const handleChange = (e) => {
        document.getElementById('errddlEquipment').style.display = 'none';
        document.getElementById('errddlVendor').style.display = 'none';
        document.getElementById('errddlUnit').style.display = 'none';
        document.getElementById('errserviceType').style.display = 'none';
        document.getElementById('errInstallationDatee').style.display = 'none';
        document.getElementById('errWarrantyPeriod').style.display = 'none';


        if (e.target.name === 'InstallationDate') {
            setInstallationDate(e.target.value);
        }
        if (e.target.name === 'WarrantyPeriod') {
            setWarrantyPeriod(e.target.value);
        }
    };

    
       const handleSave = async () => {
        if (SelectedSerialNumber === null) {
            document.getElementById('errddlEquipment').innerHTML = 'Please Select Serial Number';
            document.getElementById('errddlEquipment').style.display = 'block';
        }
        else if (SelectedVendor === null) {
            document.getElementById('errddlVendor').innerHTML = 'Please Select Vendor Name';
            document.getElementById('errddlVendor').style.display = 'block';
        }
        else if (SelectedServiceType === null) {
            document.getElementById('errserviceType').innerHTML = 'Please Select Service Type';
            document.getElementById('errserviceType').style.display = 'block';
        }

        else if (installationDate === '' || installationDate === undefined || installationDate === null) {
            document.getElementById('errInstallationDatee').innerHTML = 'Please Select Date';
            document.getElementById('errInstallationDatee').style.display = 'block';
        }

        else if (warrantyPeriod.toString().trim() === '' || warrantyPeriod === undefined || warrantyPeriod === null) {
            document.getElementById('errWarrantyPeriod').innerHTML = 'Please Enter Warranty Period';
            document.getElementById('errWarrantyPeriod').style.display = 'block';
        }
        else if (warrantyPeriod < 0 ) {
            document.getElementById('errWarrantyPeriod').innerHTML = 'Warranty Period must not be negative';
            document.getElementById('errWarrantyPeriod').style.display = 'block';
        }

        else if (SelectedUnit === null) {
            document.getElementById('errddlUnit').innerHTML = 'Please Select Unit Name';
            document.getElementById('errddlUnit').style.display = 'block';
        }
        else {

            const obj = {

                equipmentID: SelectedSerialNumber.value,
                vendorID: SelectedVendor.value,
                serviceTypeId: SelectedServiceType.value,
                installationDate: installationDate,
                warrantyPeriod: warrantyPeriod,
                warrantyUnitID: SelectedUnit.value,
                userID: userID,
            }

            const data = await PostEquipmentAMC(obj);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully!");
                getEquipmentAMCData();
                setNewlyAddedRowIndex(0);
                handleClear();
                setTimeout(() => {
                    setShowToster(0);
                    setNewlyAddedRowIndex(null);

                }, 2000);
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
    };

    const edit = (list, index) => {
        document.getElementById('errddlEquipment').style.display = 'none';
        document.getElementById('errddlVendor').style.display = 'none';
        document.getElementById('errddlUnit').style.display = 'none';
        document.getElementById('errserviceType').style.display = 'none';

        setRowID(list.id);
        const date = list.installationDate.split('T');
        setIsUpdateBtnShow(true);
        setSelectedSerialNumber({
            value: list.equipmentId,
            label: list.serialNumber,
        })
        setSelectedVendor({
            value: list.vendorId,
            label: list.vendorName
        })
        setSelectedServiceType({
            value: list.serviceTypeID,
            label: list.serviceType,
        });
        setInstallationDate(date[0]);
        setWarrantyPeriod(list.warrantyPeriod);
        setSelectedUnit({
            value: list.warrantyUnitId,
            label: list.unitName,
        });
        setNewlyAddedRowIndex(index)
    };

    const handleUpdate = async () => {

        if (SelectedSerialNumber === null) {
            document.getElementById('errddlEquipment').innerHTML = 'Please Select Serial Number';
            document.getElementById('errddlEquipment').style.display = 'block';
        }
        else if (SelectedVendor === null) {
            document.getElementById('errddlVendor').innerHTML = 'Please Select Vendor Name';
            document.getElementById('errddlVendor').style.display = 'block';
        }
        else if (SelectedServiceType === null) {
            document.getElementById('errserviceType').innerHTML = 'Please Select Service Type';
            document.getElementById('errserviceType').style.display = 'block';
        }

        else if (installationDate === '' || installationDate === undefined || installationDate === null) {
            document.getElementById('errInstallationDatee').innerHTML = 'Please Select Date';
            document.getElementById('errInstallationDatee').style.display = 'block';
        }

        else if (warrantyPeriod.toString().trim() === '' || warrantyPeriod === undefined || warrantyPeriod === null) {
            document.getElementById('errWarrantyPeriod').innerHTML = 'Please Enter Warranty Period';
            document.getElementById('errWarrantyPeriod').style.display = 'block';
        }
        else if (warrantyPeriod < 0 ) {
            document.getElementById('errWarrantyPeriod').innerHTML = 'Warranty Period must not be negative';
            document.getElementById('errWarrantyPeriod').style.display = 'block';
        }

        else if (SelectedUnit === null) {
            document.getElementById('errddlUnit').innerHTML = 'Please Select Unit Name';
            document.getElementById('errddlUnit').style.display = 'block';
        }
        else {
         
            const obj = {
                id: rowID,
                userId: userID,
                equipmentID: SelectedSerialNumber.value,
                vendorID: SelectedVendor.value,
                serviceType: SelectedServiceType.value,
                installationDate: installationDate,
                warrantyPeriod: warrantyPeriod,
                warrantyUnitID: SelectedUnit.value
            }

            const data = await PutEquipmentAMC(obj);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                getEquipmentAMCData();
                setTimeout(() => {
                    setShowToster(0);
                    setNewlyAddedRowIndex(null);
                    handleClear();
                }, 2000);
                setIsUpdateBtnShow(false);
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
    };



    const handleClear = () => {


        document.getElementById('errddlEquipment').style.display = 'none';
        document.getElementById('errddlVendor').style.display = 'none';
        document.getElementById('errddlUnit').style.display = 'none';
        document.getElementById('errserviceType').style.display = 'none';
        document.getElementById('errInstallationDatee').style.display = 'none';


        setSelectedServiceType(null);
        setInstallationDate('');
        setWarrantyPeriod('');
        setSelectedSerialNumber(null)
        setSelectedUnit(null)
        setSelectedVendor(null)
    };

    const deleteRow = async () => {
        setShowUnderProcess(1);
        const userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;

        const obj = {
            id: rowID,
            userId: userID
        };

        let data = await DeleteEquipmentAMC(obj);

        if (data.status === 1) {
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTosterMessage("Data Deleted Successfully!!");
            setNewlyAddedRowIndex(false)
            setIsUpdateBtnShow(false)
            getEquipmentAMCData();
            setTimeout(() => {
                setShowToster(0);
                handleClear();

            }, 1000)
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage(data.responseValue)
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0);
            }, 2000)
        }
    };

    const handleCancel = () => {
        handleClear()
        setIsUpdateBtnShow(false);
        setSelectedSerialNumber(null);
        setSelectedVendor(null)
        setInstallationDate('');
        setWarrantyPeriod('');
        setEditRowIndex(null)
        setNewlyAddedRowIndex(null);
        setSelectedUnit(null)
    };



    useEffect(() => {
        dropDowns();
        getVendorList();
        getUnitList();
        getEquipmentAMCData();
    }, []);

    return (
        <section className="main-content mt-5 pt-3">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="med-box">
                            <div className="title">{t("Equipment_AMC")}</div>
                            <div className="inner-content">

                                <div className='row'>
                                   
                                            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="ddlitemmaster" className="form-label ">{t("Serial_Number_with_Item_Name")}<span className="starMandatory">*</span></label>
                                                <Select value={SelectedSerialNumber} options={equipmentList} className=" create-select" id="serviceType" placeholder = {t("Choose_serial_number_with_item_name")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errddlEquipment",setSelectedSerialNumber)} />
                                                <small id="errddlEquipment" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="ddlitemmaster" className="form-label">{t("Choose_Vendor_Name")}<span className="starMandatory">*</span></label>
                                                <Select value={SelectedVendor} options={vendorList} className=" create-select" id="serviceType" placeholder ={t("Choose_Vendor_Name")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errddlVendor",setSelectedVendor)} />
                                                <small id="errddlVendor" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>
                                            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="ddlitemmaster" className="form-label">{t("ServiceType")}<span className="starMandatory">*</span></label>
                                                <Select  value={SelectedServiceType} options={serviceTypeTable} className=" create-select" id="serviceType" placeholder={t("choose_service_type")} isSearchable={isSearchable} isClearable={isClearable}  onChange={selectedOption => handleSelectChange(selectedOption, "errserviceType",setSelectedServiceType)} />
                                                <small id="errserviceType" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>

                                            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">{t("Installation_Date")}<span className="starMandatory">*</span></label>
                                                <input type="date" className="form-control form-control-sm" name="InstallationDate" value={installationDate} placeholder={t("Enter_Installation_Date")} onChange={handleChange} />
                                                <small id="errInstallationDatee" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>

                                            {/* warrantyPeriod */}
                                            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="Code" className="form-label">{t("WarrantyPeriod")}<span className="starMandatory">*</span></label>
                                                <input type="number" className="form-control form-control-sm"  name="WarrantyPeriod" value={warrantyPeriod} placeholder={t("Warranty_Period")} onChange={handleChange} />
                                                <small id="errWarrantyPeriod" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>

                                            {/* warrantyUnitID */}

                                            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                <label htmlFor="ddlitemmaster" className="form-label">{t("Unit")}<span className="starMandatory">*</span></label>
                                                <Select value={SelectedUnit} placeholder={t("Choose_Unit")} options={unitList} className="create-select"  id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errddlUnit",setSelectedUnit)} />
                                                <small id="errddlUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div>


                                            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                                                {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                    showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                        :
                                                        <div>
                                                            {isUpdateBtnShow !== true ? <>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveButtonIcon} alt='' className='icnn' />{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} alt='' className='icnn' />{t("Clear")}</button>
                                                            </> :
                                                                <>
                                                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleUpdate}>{t("Update")}</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleCancel}>{t("Cancel")}</button>
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
                            <table className="med-table border_ striped">
                                <thead style={{ zIndex: '0' }}>
                                    <tr>
                                        <th className="text-center" style={{ "width": "5%" }}>#</th>
                                        <th>{t("SerialNumber")}</th>
                                        <th>{t("VendorName")}</th>
                                        <th>{t("ServiceType")}</th>
                                        <th>{t("Installation_Date")}</th>
                                        <th>{t("WarrantyPeriod")}</th>
                                        <th>{t("Warranty_Unit")} </th>

                                        <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {equipmentAMCList && equipmentAMCList.map((list, index) => {
                                        const isNewRow = newlyAddedRowIndex === index;
                                        const isEditing = index === editRowIndex;
                                        return (
                                            <tr className={isNewRow ? 'new-row' : ''} key={index} >
                                                <td className="text-center">{index + 1}</td>
                                                <td>{list.serialNumber}</td>
                                                <td>{list.vendorName}</td>
                                                <td>{list.serviceType}</td>
                                                <td>{list.installationDate}</td>
                                                <td>{list.warrantyPeriod}</td>
                                                <td>{list.unitName}</td>


                                                <td>
                                                    <div className="action-button">
                                                        <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(list, index) }} /></div>
                                                        <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id, index) }} />
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
                            <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
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
                showLoder === 1 ? <Loader val={showLoder} /> : ""
            }
        </section>
    )
}
