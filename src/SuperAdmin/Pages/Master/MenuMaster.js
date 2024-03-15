import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import ValidationMenuMaster from '../../../Validation/SuperAdmin/Master/ValidationMenuMaster'
import PostMenuMaster from '../../Api/Master/MenuMaster/PostMenuMaster'
import GetMenuMaster from '../../Api/Master/MenuMaster/GetMenuMaster'
import DeleteMenuMaster from '../../Api/Master/MenuMaster/DeleteMenuMaster'
import PutMenuMaster from '../../Api/Master/MenuMaster/PutMenuMaster'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetAllMenuMaster from '../../Api/Master/MenuMaster/GetAllMenuMaster'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import FileUpload from '../../../Clinical/API/FileUpload'

export default function MenuMaster() {
    let [menuList, setMenuList] = useState([])
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [message, setMessage] = ("")
    let [showToaster, setShowToaster] = useState(0)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editParentMenu, setEditParentMenu] = useState("")
    const [searchTerm, setSearchTerm] = useState('');
    let [imagePath, setImagePath] = useState("")
    const [isShortcut, setIsShortcut] = useState(false);
    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };



    //Handle Save
    let saveForm = async () => {
        
        let valresponse = ValidationMenuMaster(sendForm.menuName, sendForm.url, sendForm.imgUrl, sendForm.tableName, sendForm.description, sendForm.content)

        if (valresponse) {
            setShowUnderProcess(1)
            let rspon = await FileUpload(imagePath)
            if (rspon.data.status === 1) {
                let temp = sendForm
                temp["imgUrl"] = rspon.data.responseValue
                temp["isShortcut"] = isShortcut

                
                let response = await PostMenuMaster(temp);
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
        let getResponse = await GetAllMenuMaster();
       
        if (getResponse.status === 1) {
            setMenuList(getResponse.responseValue)
        }
    }



    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditParentMenu("")
        if (name === "imgUrl") {
            setSendForm(sendForm => ({
                ...sendForm,
                ["imgUrl"]: e.target.files[0].name,
            }))
            setImagePath(e.target.files[0])
        }
        else if (name === "isShortcut") {
            const isChecked = e.target.checked;
            setSendForm(sendForm => ({
                ...sendForm,
                ["isShortcut"]: isChecked,
            }));
        }
        else {
            setSendForm(sendForm => ({
                ...sendForm,
                [name]: value
            }))
        }
    }

    const handleShortcutChange = () => {
        setIsShortcut(isShortcut === false ? true : false);
       

        // setIsShortcut(!isShortcut);
       
    };



    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteMenuMaster(rowId)
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
    let handleUpdate = async (id, parentId, menuName, url, tableName, description, superAdminUserId, content, IsShortcut) => {
       
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "parentId": parentId,
            "menuName": menuName,
            "url": url,
            "tableName": tableName,
            "description": description,
            "userId": superAdminUserId,
            "content": content,
            "IsShortcut": IsShortcut
        }))

        document.getElementById("parentId").value = parentId;
        document.getElementById("menuName").value = menuName;
        document.getElementById("url").value = url;
        // document.getElementById("imgUrl").value = imgUrl;
        document.getElementById("tableName").value = tableName;
        document.getElementById("content").value = content;
        document.getElementById("description").value = description;
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationMenuMaster(sendForm.menuName, sendForm.url, sendForm.imgUrl, sendForm.tableName, sendForm.description, sendForm.content)
        if (valresponse) {
            let rspon = await FileUpload(imagePath)
            if (rspon.data.status === 1) {
                let temp = sendForm
                temp["imageURL"] = rspon.data.responseValue
                temp["isShortcut"] = isShortcut
                let response = await PutMenuMaster(temp)
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

    const clearIsShortcut = () => {
        setIsShortcut(false);
    };

    //Handle Clear
    let handleClear = () => {
        setSendForm({ "userId": window.superAdminUserId })
        document.getElementById("parentId").value = 0;
        document.getElementById("menuName").value = "";
        document.getElementById("url").value = "";
        document.getElementById("imgUrl").value = "";
        document.getElementById("tableName").value = "";
        document.getElementById("description").value = "";
        document.getElementById("content").value = "";
        clearIsShortcut();
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
                            <Heading text='Menu Master' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="parentId" className="form-label">Parent</label>
                                    <select name='parentId' id="parentId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {menuList && menuList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.menuName}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="menuName" className="form-label">Menu</label>
                                    <input type="text" className="form-control form-control-sm" id="menuName" name='menuName' onChange={handleChange} placeholder="Enter menu name" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="url" className="form-label">Url</label>
                                    <input type="text" className="form-control form-control-sm" id="url" name='url' onChange={handleChange} placeholder="Enter Url" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="tableName" className="form-label">Table Name</label>
                                    <input type="text" className="form-control form-control-sm" id="tableName" name='tableName' onChange={handleChange} placeholder="Enter table name" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control form-control-sm" id="description" name='description' onChange={handleChange} placeholder="Enter description" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="description" className="form-label">Heading Content</label>
                                    <input type="text" className="form-control form-control-sm" id="content" name='content' onChange={handleChange} placeholder="Enter heading content" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="imgUrl" className="form-label">Image Url</label>
                                    <input type="file" className="form-control form-control-sm" id="imgUrl" name='imgUrl' onChange={handleChange} placeholder="Enter image url" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label className="form-label">&nbsp;</label>
                                    {/* <input type="checkbox" id="isEXternal" name="isEXternal" onChange={handleChange} style={{height:'30px', width:'30px'}}/> */}

                                    <div className="form-check">
                                        <input
                                            className="form-check-input" type="checkbox"
                                            id="isShortcut"
                                            name="isShortcut"
                                            checked={isShortcut}
                                            onClick={handleShortcutChange}
                                            // onChange={() => setIsShortcut(!isShortcut)}
                                            style={{ height: '20px', width: '20px', marginRight: '10px' }}
                                        />
                                        <label className="form-check-label" htmlFor="isShortcut" style={{ lineHeight: '30px' }} >
                                            IsShortcut
                                        </label>
                                    </div>

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
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />Save</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />Clear</button>
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
                            <div className='handlser'>
                                <Heading text="All Menu List" />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "73vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Parent Name </th>
                                            <th>Menu Name</th>
                                            <th>Url</th>
                                            <th>Image Url</th>
                                            <th>Image</th>
                                            <th>Table Name</th>
                                            <th>Description</th>
                                            <th>Heading Content</th>
                                            <th>Is Shortcut</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {menuList && menuList.filter((val) => `${val.menuName} ${val.url} ${val.imgUrl} ${val.tableName} ${val.description}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>

                                                    <td>{val.parentName}</td>
                                                    <td>{val.menuName}</td>
                                                    <td>{val.url}</td>
                                                    <td>{val.imgUrl}</td>
                                                    <td><div className='tableRowimgBox'><img src={val.imgUrl} alt='' /></div></td>
                                                    <td>{val.tableName}</td>
                                                    <td>{val.description}</td>
                                                    <td>{val.content}</td>
                                                    <td>{val.isShortcut === false ? "False" : "True"}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.parentId, val.menuName, val.url, val.tableName, val.description, val.superAdminUserId, val.content, val.IsShortcut) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        )}


                                    </tbody>
                                </TableContainer>
                                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">Delete</button>
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
