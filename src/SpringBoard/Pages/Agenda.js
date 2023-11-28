import React, { useEffect, useState } from "react";
import GetAgenda from "../API/Agenda/GetAgenda";
import PostAgenda from "../API/Agenda/PostAgenda";
import DeleteAgenda from "../API/Agenda/DeleteAgenda";
import SuccessToster from '../../Component/SuccessToster'
import WarningToaster from '../../Component/WarningToaster'
import AlertToster from '../../Component/AlertToster'
import Loder from '../../Component/Loader'
import TableContainer from '../../Component/TableContainer'

import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'
import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";
import Heading from '../../Component/Heading'
import PutAgenda from "../API/Agenda/PutAgenda";
export default function Agenda(){
    let [getAgendaList, setAgendaList] = useState([])
    let [getId, setId] = useState('')
    let [getItemNumber, setItemNumber] = useState('')
    let [getItemTitle, setItemTitle] = useState('')
    let[getDescription,setDescription]=useState('')
    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)


    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    const [searchInput, setSearchInput] = useState('');
    let funGetAgenda = async () => {
        let getResult = await GetAgenda()
        if (getResult.status === 1) {
            setLoder(0)
            setAgendaList(getResult.responseValue);
        }

    }
    let funSaveAgenda = async () => {
        setLoder(1)
        // Regular expression to check for special characters
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;
        if (getItemNumber === '0' || getItemNumber === undefined || getItemNumber === null || getItemNumber === "") {
            setMessage("Item number not fill !")
            setShowToster(3)
            setLoder(0)
        }
       else if (getItemTitle === '0' || getItemTitle === undefined || getItemTitle === null || getItemTitle === "") {
            setMessage("Item title not fill !")
            setShowToster(3)
            setLoder(0)
        }
      else  if (getDescription === '0' || getDescription === undefined || getDescription === null || getDescription === "") {
            setMessage("Description not fill !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getProjectName.trim().length === 0 || getProjectName.trim().length === '') {
        //     setMessage("Fields can't blank or space !")
        //     setShowToster(3)
        //     setLoder(0)
        // }
        // else if (specialCharsRegex.test(getProjectName)) {
        //     setMessage("Project name contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (numbersRegex.test(getProjectName)) {
        //     setMessage("ProjectType contains numbers !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        else {

            var obj = {
                itemNumber: getItemNumber,
                itemTitle: getItemTitle,
                description: getDescription,
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId

            }
            console.log('Post Agenda obj',obj)
            //return;
            let result = await PostAgenda(obj);
            if (result.status === 1) {
                setMessage("Data saved successfully !")
                setShowToster(1)
                setLoder(0)
                setSaveUpdateBool(0);
                clearTextValues();
                funGetAgenda()
            }
            else {
                setMessage(result.responseValue)
                setShowToster(2)
            }

        }

    }
    let setValueOnDeletedFunction = async (id) => {;
        setId(id)
    }
    let funDeleteAgenda = async () => {
        var obj = {
            Id: getId,
        }
        setLoder(1)
        let result = await DeleteAgenda(obj);
        if (result.status === 1) {
            setLoder(0);
            setMessage("Data delete successfully !");
            setShowToster(1);
            clearTextValues();
            funGetAgenda();
        }
        else {
            setLoder(0)
            setMessage(result.responseValue)
            setShowToster(2)
        }
    }
    let funEditAgenda = (Id, ItemNumber, ItemTitle,Description) => {
        setSaveUpdateBool(1)
        setId(Id);
        setItemNumber(ItemNumber);
        setItemTitle(ItemTitle);
        setDescription(Description);
    }
    let funUpdateAgenda = async () => {
        //const getProjectName = document.getElementById("txtProjectName").value;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;
        if (getItemNumber === '0' || getItemNumber === undefined || getItemNumber === null || getItemNumber === "") {
            setMessage("Item number not fill !")
            setShowToster(3)
            setLoder(0)
        }
      else if (getItemTitle === '0' || getItemTitle === undefined || getItemTitle === null || getItemTitle === "") {
            setMessage("Item title not fill !")
            setShowToster(3)
            setLoder(0)
        }
      else if (getDescription === '0' || getDescription === undefined || getDescription === null || getDescription === "") {
            setMessage("description not fill !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getProjectName.trim().length === 0 || getProjectName.trim().length === '') {
        //     setMessage("Fields can't blank or space !")
        //     setShowToster(3)
        //     setLoder(0)
        // }
        // else if (specialCharsRegex.test(getProjectName)) {
        //     setMessage("Project name contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (numbersRegex.test(getProjectName)) {
        //     setMessage("Project name contains numbers !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        else {
            setLoder(1)
            var obj = {
                Id: getId,
                ItemNumber: getItemNumber,
                ItemTitle: getItemTitle,
                Description: getDescription,
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId,
                clientId:JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            console.log('Updatedt Value obj:',obj)
            let result = await PutAgenda(obj);
            if (result.status === 1) {
                setMessage("Data update successfully !")
                setShowToster(1)
                setLoder(0)
                setSaveUpdateBool(0)
                funGetAgenda()
                clearTextValues()
            }
            else {
                setMessage(result.responseValue)
                setShowToster(2)
            }
        }
    }
    let handleTextboxChange = (event) => {
        if (event.target.name === "ItemNumber") {
            setItemNumber(event.target.value);
        }
        if (event.target.name === "ItemTitle") {
            setItemTitle(event.target.value);
        }
        if (event.target.name === "Description") {
            setDescription(event.target.value);
        }
    }
    let clearTextValues = (event) => {
        setItemNumber('');
        setItemTitle('');
        setDescription('');
        setSaveUpdateBool(0);

    }
    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }
    useEffect(()=>{
        funGetAgenda()

    },[])
    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Add Agenda</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 col-md-2 flex-grow-1 me-2">
                                            <label htmlFor="itemNumber" className="form-label">Item Number<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" value={getItemNumber} onChange={handleTextboxChange} id="txtItemNumber" name="ItemNumber" placeholder='Enter Item Number' />
                                        </div>
                                        <div className="mb-2 col-md-4 flex-grow-1 me-2">
                                            <label htmlFor="ItemTitle" className="form-label">Agenda Item Title</label>
                                            <input type="text" className="form-control form-control-sm" value={getItemTitle} onChange={handleTextboxChange}  id="txtItemTitle" name="ItemTitle" placeholder='Enter Item Title' />
                                        </div>
                                        <div className="mb-2 col-md-4 flex-grow-1 me-2">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <input type="text" className="form-control form-control-sm" value={getDescription} onChange={handleTextboxChange}  id="txtDescription" name="Description" placeholder='Enter Description' />
                                        </div>
                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funSaveAgenda}><img src={save} className='icnn' />Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTextValues}><img src={reset} className='icnn' /> Clear</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funUpdateAgenda}><img src={save} className='icnn' />Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={clearTextValues}><img src={reset} className='icnn' /> Clear</button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <div className='handlser'>
                                <Heading text="Agenda List" />
                                <div style={{ position: 'relative' }}>
                                    
                                    <input value={searchInput} onChange={handleOnChange} name="searchBox" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>

                            <div className="med-table-section" style={{ "height": "77vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Item Number</th>
                                            <th>Item Title</th>
                                            <th>Description</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getAgendaList && getAgendaList.filter((val) => `${val.itemNumber} ${val.itemTitle}${val.description}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.agendaId}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.itemNumber}</td>
                                                    <td>{val.itemTitle}</td>
                                                    <td>{val.description}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { funEditAgenda(val.id, val.itemNumber, val.itemTitle,val.description) }}><span className='btnbg' style={{ background: "#FFEDD2" }}> <img src={editbtn} className='' /></span></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal"><span className='btnbg' style={{ background: "#FFEFEF" }} onClick={() => { setValueOnDeletedFunction(val.id) }}> <img src={delbtn} className='icnn' /></span ></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
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
                                                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={funDeleteAgenda}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
                            </div>
                        </div>
                    </div>
                </div>
                {showToster === 1 ? <SuccessToster message={message} handle={setShowToster} /> : ""}
                {showToster === 2 ? <WarningToaster message={message} handle={setShowToster} /> : ""}
                {showToster === 3 ? <AlertToster message={message} handle={setShowToster} /> : ""}
            </section>
            <Loder val={loder} />
        </>
    )

}