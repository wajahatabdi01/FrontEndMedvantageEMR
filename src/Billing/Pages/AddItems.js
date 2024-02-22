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
import Heading from "../../Component/Heading";
//Api Import
import getItems from '../API/getItems';
import SaveItemMaster from '../API/POST/SaveItems';
import UpdateItemMaster from '../API/POST/UpdateItemMaster';
import DeleteItem from '../API/POST/DeleteItem';
//End Api Import
export default function SurgeryMaster() {
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [itemName, setitemName] = useState('');
   
    let [itemList, setitemList] = useState([]);
    let [rowID, setRowID] = useState([]);
    let [showLoder, setShowLoder] = useState(0);
   
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [searchInput, setsearchInput] = useState("");

    let handlerChange = async (e) => {
        document.getElementById('errItemTitile').style.display = "none";
        if (e.target.name === "itemName") {
            setitemName(e.target.value)
        }
        else if (e.target.name  === 'searchBox') {
            setsearchInput(e.target.value)
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
    //     console.log('data', data);
    // }
    let getAllItemList = async () => {
        setShowLoder(1)
        let data = await getItems();
        if (data.status === 1) {
            setShowLoder(0)
            setitemList(data.responseValue);
        }
        else {
            setShowLoder(0);
         }
    }

    let handlerSave = async () => {
     
        document.getElementById('errItemTitile').style.display = "none";
  

        if (itemName.trim() === '' || itemName === null || itemName === undefined) {
            document.getElementById('errItemTitile').innerHTML = "Please Fill Item Name";
            document.getElementById('errItemTitile').style.display = "block";
            return false;
        }
       
        else {
            setShowUnderProcess(1);
            var obj = {
                itemName: itemName,
                status: true,
                userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }
            let data = await SaveItemMaster(obj);
console.log('OBJ',obj);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
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

//Edit List 

    let edit = (list) => {
        document.getElementById('errItemTitile').style.display = "none";
        setRowID(list.id);
        setIsUpdateBtnShow(true);
        setitemName(list.itemName);
   

    }
//Edit List End

     let handlerUpdate = async () => {
        
        document.getElementById('errItemTitile').style.display = "none";
  

        if (itemName === '' || itemName === null || itemName === undefined) {
            document.getElementById('errItemTitile').innerHTML = "Please Fill Item Name";
            document.getElementById('errItemTitile').style.display = "block";
            return false;
        }
        setShowUnderProcess(1);
        var obj = {
            Id: rowID,
            itemName: itemName,
            status: true,
            userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
        }
          console.log('obj update', obj);
             let data = await UpdateItemMaster(obj);
             if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
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

     

    let handlerClear = async () => {
        // document.getElementById('success').style.display = "none";
        // document.getElementById('successUpdate').style.display = "none";
        document.getElementById('errItemTitile').innerHTML = "";
        document.getElementById('errItemTitile').style.display = "none";
        setitemName('');
        setIsUpdateBtnShow(false);
    }

    let handlerSaveUpdateClear = () => {
        // document.getElementById('errSurgeryTitile').innerHTML = "";
        // document.getElementById('errSurgeryTitile').style.display = "none";
        // document.getElementById('errDisease').innerHTML = "";
        // document.getElementById('errDisease').style.display = "none";
        setitemName('');
        setIsUpdateBtnShow(false);
      
    }
    
    let getRowID = (id) => {
        setRowID(id);
    }
    let deleteRow = async () => {
        console.log(rowID);
        setShowUnderProcess(1);
        const userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
        let data = await DeleteItem(rowID, userID);
        console.log('s'.data);
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
    let clearToaster = () => {
        document.getElementById('errItemTitile').style.display = "none";
        document.getElementById('errDisease').style.display = "none";
    }
    useEffect(() => {
        // getDiseaeList();
          getAllItemList();


    }, []);
    let GetId = (id)=>{
        console.log("ID", id)
    }
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title"></div>
                                <div className="inner-content">
                                  <div className='fieldsett-in'>
                                 <div className='fieldsett'>
                                    <span className='fieldse'>Item Master</span>
                                    <div className='row'>
                                 
                                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3">
                                                    <label htmlFor="Code" className="form-label">Item Name<span className="starMandatory">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" name="itemName" value={itemName} placeholder="Enter Item Name" onChange={handlerChange} />
                                                    <small id="errItemTitile" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                        <div className='handlser'>
              <Heading text="Items List" />
                <div style={{ position: 'relative' }}>
                  <input type="text" name="searchBox" className='form-control form-control-sm' placeholder="Search" value={searchInput} onChange={handlerChange} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
                            <div className="med-table-section" style={{ "height": "80vh" }}>
                                <table className="med-table border_ striped">
                                    <thead style={{zIndex: '0'}}>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Item Name</th>
                                            
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {itemList && itemList.filter((val) => `${val.itemName}`.toLowerCase().includes(searchInput.toLowerCase())).sort((a, b) => a.itemName.localeCompare(b.itemName)).map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.itemName}</td>
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