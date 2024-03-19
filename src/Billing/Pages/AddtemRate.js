import React, { useEffect, useState } from 'react';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';

//Api Import
import getItems from '../API/getItems';
import SaveItemMaster from '../API/POST/SaveItems';
import UpdateItemMaster from '../API/POST/UpdateItemMaster';
import DeleteTpaCompany from '../API/POST/DeleteTpaCompany';
import getAllTpaCompany from '../API/getAllTpaCompany';
import GerItemRateByCompany from '../API/GerItemRateByCompany';

//End Api Import

export default function SurgeryMaster() {
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [companyName, setcompanyName] = useState(null);
    let [item, setitem] = useState(null);
    let [companyList, setcompanyList] = useState([]);
    let [GetAllItemRateList, setAllItemRateList] = useState([]);
    let [rowID, setRowID] = useState([]);
    let [showLoder, setShowLoder] = useState(0);
    let [rate, setRate] = useState('');
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
    let [itemList, setitemList] = useState([]);


    let handlerChange = async (e) => {
        let value = e.target.value
        let name = e.target.name
        document.getElementById('errItemRate').style.display = "none";
       
        if (name === "rate") {
            setRate(value)
        }
      
    }


    const handleSelectChange = async (selectedOption, errorElementId, setSelectedFunction) => {
        document.getElementById(errorElementId).style.display = 'none';
        setSelectedFunction(selectedOption);
     
      };
      const handleTPASelectChange = async (selectedOption, errorElementId, setSelectedFunction) => {
        document.getElementById(errorElementId).style.display = 'none';
        
        if (selectedOption) {
          setSelectedFunction(selectedOption);
          GetitemRate(selectedOption.value);
        } else {
   
          setSelectedFunction(null);
 
        }
      };
      
    

    let getAllItemList = async () => {
        let data = await getItems();
        if (data.status === 1) {
            setitemList(data.responseValue.map(items=>({
                value : items.id,
                label : items.itemName
            })));
        }

    }
    let getAllTpaCompanyList = async () => {
        setShowLoder(1)
        let data = await getAllTpaCompany();
        
        
        if (data.status === 1) {
            setShowLoder(0)
            setcompanyList(data.responseValue.map(Tpa=>({
                value: Tpa.id,
                label: Tpa.companyname
            })));
        }
        else {
            setShowLoder(0);
         }
    }

    let GetitemRate = async(companyId)=>{
      
   let itemRates = await GerItemRateByCompany(companyId)
   if(itemRates.status === 1){
    setAllItemRateList(itemRates.responseValue)
   
      }
    }
    let handlerSave = async (selectedOption) => {
     
        if (companyName  === null || companyName === undefined) {
       
            document.getElementById('errCompany').style.display = "block";
            document.getElementById('errCompany').innerHTML = "Please Select Company";
            return;
        }
        if (item  === null || item === undefined) {
       
            document.getElementById('erritem').style.display = "block";
            document.getElementById('erritem').innerHTML = "Please Select Item";
            return;
        }
        if (rate ==='' || rate === undefined) {
            document.getElementById('errItemRate').style.display = "block";
            document.getElementById('errItemRate').innerHTML = "Please Enter Item Rate";
            return;
        }
       
        else {
            
            const obj = {
                itemID:item.value,
                companyID: companyName.value,
                itemRate: rate,
                status: true,
                userId: userID
            }
           
            let data = await SaveItemMaster(obj);
             
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                handlerClear()
                GetitemRate(companyName.value);
                setTimeout(() => {
                    setShowToster(0);
                    handlerSaveUpdateClear();
                    getAllItemList();
                  

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

     






     let handlerUpdate = async () => {
        
        document.getElementById('errItemTitile').style.display = "none";
  

        if (companyName === '' || companyName === null || companyName === undefined) {
            document.getElementById('errItemTitile').innerHTML = "Please Fill Item Name";
            document.getElementById('errItemTitile').style.display = "block";
            return;
        }
        setShowUnderProcess(1);
        var obj = {
            Id: rowID,
            itemName: companyName,
            status: true,
            userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
        }
        
             let data = await UpdateItemMaster(obj);
             if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                handlerClear()
                setTimeout(() => {
                    setShowToster(0);
                    handlerSaveUpdateClear();
                    getAllItemList();
                   

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

    let handlerClear =  () => {
    
        setcompanyName(null);
    
        setitem(null)
        setRate('')
        setIsUpdateBtnShow(false);
        setAllItemRateList([])
 
    }

    let handlerSaveUpdateClear = () => {
        setcompanyName(null);
        setIsUpdateBtnShow(false);
    }



    let deleteRow = async () => {
    
        setShowUnderProcess(1);
        const userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
        let data = await DeleteTpaCompany(rowID, userID);
   
        if (data.status === 1) {
            setShowUnderProcess(0);
            setShowToster(1);
            setTosterValue(0);
            setTosterMessage("Data Deleted Successfully!");
            setTimeout(() => {
                setShowToster(0);
                handlerSaveUpdateClear();
                getAllItemList();
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


    useEffect(() => {
        
          getAllItemList();
          getAllTpaCompanyList();
          GetitemRate()
          
    }, []);

    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title"> </div>
                                <div className="inner-content">
                                <div className='fieldsett-in'>
                                  <div className='fieldsett'>
                                  <span className='fieldse'>Add Item Rate</span>

                                    <div className='row'>
                                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                        <label htmlFor="ddlitem" className="form-label ">TPA Company<span className="starMandatory">*</span></label>
                                        <Select value={companyName} options={companyList} className=" create-select" id="serviceType" placeholder="Select TPA Company" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleTPASelectChange(selectedOption, "errCompany", setcompanyName)} />
                                        <small id="errCompany" className="form-text text-danger" style={{ display: 'none' }}></small>
                                    </div>

                                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                                        <label htmlFor="ddlitem" className="form-label ">Item Name<span className="starMandatory">*</span></label>
                                        <Select value={item} options={itemList} className=" create-select" id="item" placeholder="Select Item" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "erritem", setitem)} />
                                        <small id="erritem" className="form-text text-danger" style={{ display: 'none' }}></small>
                                    </div>

                                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3">
                                        <label htmlFor="Code" className="form-label">Item Rate<span className="starMandatory">*</span></label>
                                        <input type="number" className="form-control form-control-sm" name="rate" value={rate} placeholder="Enter Item Rate" onChange={handlerChange} />
                                        <small id="errItemRate" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                                            <th>TPA Company Name</th>
                                            <th>Item Name</th>
                                            <th>Item Rate</th>
                                            {/* <th style={{ "width": "10%" }} className="text-center">Action</th> */}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {GetAllItemRateList && GetAllItemRateList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.companyname}</td>
                                                    <td>{list.itemName}</td>
                                                    <td>{list.itemCharge}</td>
                                                    {/* <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id); }}/>
                                                            </div>
                                                        </div>
                                                    </td> */}
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