import React, { useEffect, useState } from 'react';
// import GetDiseaseList from '../API/GET/GetDiseaseList';
// import GetSurgeryList from '../API/GET/GetSurgeryList';
// import SaveSurgeryMaster from '../API/POST/SaveSurgeryMaster';
// import UpdateSurgeryMaster from '../API/UPDATE/UpdateSurgeryMaster';
// import DeleteSurgery from '../API/DELETE/DeleteSurgery';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';

//Api Import
import getItems from '../API/getItems';
import SaveItemMaster from '../API/POST/SaveItems';
import UpdateItemMaster from '../API/POST/UpdateItemMaster';
import DeleteItem from '../API/POST/DeleteItem';
import getAllTpaCompany from '../API/getAllTpaCompany';
import SaveTpaCompany from '../API/POST/SaveTpaCompany';
import UpdateTpaCompany from '../API/POST/UpdateTpaCompany';
import DeleteTpaCompany from '../API/POST/DeleteTpaCompany';
//End Api Import

export default function SurgeryMaster() {
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [companyName, setcompanyName] = useState('');
    let [tPACode, setTPACode] = useState('');
    let [address, setaddress] = useState('');
    let [tpaContact, settpaContact] = useState('');
    let [contactPerson, setcontactPerson] = useState('');
    let [contactPersonPhone, setcontactPersonPhone] = useState('');
    let [companyList, setcompanyList] = useState('');
    let [rowID, setRowID] = useState([]);
    let [showLoder, setShowLoder] = useState(0);
   
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);

    let handlerChange = async (e) => {
        document.getElementById('errCompany').style.display = "none";
        if (e.target.name === "companyName") {
            setcompanyName(e.target.value)
        }
        if (e.target.name === "tPACode") {
            setTPACode(e.target.value)
        }
        if (e.target.name === "address") {
            setaddress(e.target.value)
        }
        if (e.target.name === "tpaContact") {
            settpaContact(e.target.value)
        }
        if (e.target.name === "contactPerson") {
            setcontactPerson(e.target.value)
        }
        if (e.target.name === "contactPersonPhone") {
            setcontactPersonPhone(e.target.value)
        }
        
    }

    const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
        document.getElementById(errorElementId).style.display = 'none';
        setSelectedFunction(selectedOption);
    };
    // let getDiseaeList = async () => {
    //     let data = await GetDiseaseList();
    //     setDiseaseList(data.responseValue.map(disease =>({
    //    value : disease.id,
    //    label : disease.problemName
    //     })));
    
    // }
    let getAllItemList = async () => {
        setShowLoder(1)
        let data = await getAllTpaCompany();
        
      
        if (data.status === 1) {
            setShowLoder(0)
            setcompanyList(data.responseValue);
        }

        
        else {
            setShowLoder(0);
         }
    }

    let handlerSave = async () => {
     
        document.getElementById('errCompany').style.display = "none";
  

        if (companyName === '' || companyName === null || companyName === undefined) {
            document.getElementById('errCompany').innerHTML = "Please Fill Company Name";
            document.getElementById('errCompany').style.display = "block";
            return false;
        }
        if ( tpaContact !== "" && tpaContact.length !== 10) {
            document.getElementById('errCompanyContact').innerHTML = "Contact Number is not 10 digit long";
            document.getElementById('errCompanyContact').style.display = "block";
            return false
        }
        if (contactPersonPhone !== "" && contactPersonPhone.length !== 10) {
            document.getElementById('errContactNo').innerHTML = "Contact Number is not 10 digit long";
            document.getElementById('errContactNo').style.display = "block";
            return false
        }
       
        else {
            setShowUnderProcess(1);
            var obj = {
                companyname: companyName,
                TPACode:tPACode,
                address:address,
                contactPerson:contactPerson,
                tpaContact:tpaContact,
                contactPersonPhone:contactPersonPhone,
                status: true,
                userId: userID
            }
            let data = await SaveTpaCompany(obj);

            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                
                    getAllItemList();
                    handlerSaveUpdateClear();
                setTimeout(() => {
                    setShowToster(0);
                   

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

//Edit List 

    let edit = (list) => {
       
        document.getElementById('errCompany').style.display = "none";
        setRowID(list.id);
        setIsUpdateBtnShow(true);
        setcompanyName(list.companyname);
        setTPACode(list.tpaCode);   
        settpaContact(list.tpaContact);
        setaddress(list.address);
        setcontactPerson(list.contactPerson);
        setcontactPersonPhone(list.contactPersonPhone);
    }
//Edit List End

     let handlerUpdate = async () => {
        
        document.getElementById('errCompany').style.display = "none";

        if (companyName.trim() === '' || companyName === null || companyName === undefined) {
            document.getElementById('errCompany').innerHTML = "Please Fill Item Name";
            document.getElementById('errCompany').style.display = "block";
            return false;
        }
        if (tpaContact !== "" &&  tpaContact.length !== 10) {
            document.getElementById('errCompanyContact').innerHTML = "Contact Number is not valid";
            document.getElementById('errCompanyContact').style.display = "block";
            return
        }
        if ( contactPersonPhone.trim() !== "" && contactPersonPhone.length !== 10) {
            document.getElementById('errContactNo').innerHTML = "Contact Number is not valid";
            document.getElementById('errContactNo').style.display = "block";
            return false
        }
        setShowUnderProcess(1);

        var obj = {
            Id: rowID,
            companyname: companyName,
            TPACode:tPACode,
            address:address,
            contactPerson:contactPerson,
            tpaContact:tpaContact,
            contactPersonPhone:contactPersonPhone,
            status: true,
            userId: userID
        }
        
             let data = await UpdateTpaCompany(obj);
             if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                   handlerSaveUpdateClear();
                    getAllItemList();
                setTimeout(() => {
                    setShowToster(0);
                 

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

     

    let handlerClear = async () => {
       
        document.getElementById('errCompany').innerHTML = "";
        document.getElementById('errCompanyContact').innerHTML = "";
        document.getElementById('errContactNo').style.display = "none";

        setcompanyName('');
        setTPACode('');   
        settpaContact('');
        setaddress('');
        setcontactPerson('');
        setcontactPersonPhone('');
        setIsUpdateBtnShow(false);
    }

    let handlerSaveUpdateClear = () => {
        // document.getElementById('errSurgeryTitile').innerHTML = "";
        // document.getElementById('errSurgeryTitile').style.display = "none";
        // document.getElementById('errDisease').innerHTML = "";
        document.getElementById('errCompany').style.display = "none";
        document.getElementById('errCompanyContact').style.display = "none";
        document.getElementById('errContactNo').style.display = "none";
        setcompanyName('');
        setTPACode('');   
        settpaContact('');
        setaddress('');
        setcontactPerson('');
        setcontactPersonPhone('');
        setIsUpdateBtnShow(false);
      
    }
    
    let getRowID = (id) => {
        setRowID(id);
    }


    let deleteRow = async () => {
     
        const obj = {
        id: rowID,
        userID: userID
        }
       
    let data = await DeleteTpaCompany(obj);

        
        if (data.status === 1) {
            setShowUnderProcess(0);
            setShowToster(1);
            setTosterValue(0);
            setTosterMessage("Data Deleted Successfully!");
            getAllItemList();
            handlerSaveUpdateClear();
            setTimeout(() => {
                setShowToster(0);
                
               
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
        document.getElementById('errCompany').style.display = "none";
    
    }
    useEffect(() => {
        // getDiseaeList();
          getAllItemList();


    }, []);
    
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                            
                                <div className="inner-content">
                                <div className='fieldsett-in'>
                                 <div className='fieldsett'>
                                   <span className='fieldse'>Company Master</span>
                                    <div className='row'>
                                 
                                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                    <label htmlFor="Code" className="form-label">Company Name<span className="starMandatory">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" name="companyName" value={companyName} placeholder="Enter Company Name" onChange={handlerChange} />
                                                    <small id="errCompany" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                    <label htmlFor="Code" className="form-label">Company Code <span className="starMandatory"></span></label>
                                                    <input type="text" className="form-control form-control-sm" name="tPACode" value={tPACode} placeholder="Enter Company Code" onChange={handlerChange} />
                                                </div>

                                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                    <label htmlFor="Code" className="form-label">Address<span className="starMandatory"></span></label>
                                                    <input type="text" className="form-control form-control-sm" name="address" value={address} placeholder="Enter Address" onChange={handlerChange} />
                                                </div>

                                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                    <label htmlFor="Code" className="form-label">TPA Company Contact No.<span className="starMandatory"></span></label>
                                                    <input type="number" className="form-control form-control-sm" name="tpaContact" value={tpaContact} placeholder="Enter TPA Company Contact No." onChange={handlerChange} />
                                                    <small id="errCompanyContact" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                    <label htmlFor="Code" className="form-label">Contact Person<span className="starMandatory"></span></label>
                                                    <input type="text" className="form-control form-control-sm" name="contactPerson" value={contactPerson} placeholder="Enter Contact Person" onChange={handlerChange} />
                                                </div>

                                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                    <label htmlFor="Code" className="form-label">Contact Person Number<span className="starMandatory"></span></label>
                                                    <input type="number" className="form-control form-control-sm" name="contactPersonPhone" value={contactPersonPhone} placeholder="Contact Person Number" onChange={handlerChange} />
                                                    <small id="errContactNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                    
                                                </div>

                                                <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                                                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                            :
                                                            <div>
                                                                {isUpdateBtnShow !== true ? <>
                                                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave} ><img src={saveBtnIcon}  className='icnn' alt='' />Save</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}><img src={clearBtnIcon} className='icnn' alt='' />Clear</button>
                                                                </> :
                                                                    <>
                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>Update</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}>Cancel</button>
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
                                <table className="med-table border_ striped">
                                    <thead style={{zIndex: '0'}}>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Company Name</th>
                                            <th>Company Code</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>Contact Person </th>
                                            <th>Contact Person No. </th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {companyList && companyList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.companyname}</td>
                                                    <td>{list.tpaCode == "" ? '---' : list.tpaCode}</td>
                                                    <td>{list.tpaContact == "" ? '---' : list.tpaContact}</td>
                                                    <td>{list.address == "" ? '---' : list.address}</td>
                                                    <td>{list.contactPerson == "" ? '---' : list.contactPerson }</td>
                                                    <td>{list.contactPersonPhone == "" ? '---' : list.contactPersonPhone}</td>
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
                                <div className='popDeleteTitle mt-3'> Delete?</div>
                                <div className='popDeleteContent'> Are you sure you want to delete?</div>
                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={deleteRow} data-bs-dismiss="modal">Delete</button>
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