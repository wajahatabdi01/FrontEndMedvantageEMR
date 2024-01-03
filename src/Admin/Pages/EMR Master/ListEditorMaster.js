import React, { useState } from 'react'
import Heading from '../../../Component/Heading';
import save from "../../../assets/images/icons/save.svg"
import plus from "../../../assets/images/icons/newPlus.png"
import deleteBtn from "../../../assets/images/icons/newDelete.png";
import { CodeMaster } from './CodeMaster';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';

export default function ListEditorMaster() {
    let [clearDropdown, setClearDropdown] = useState(0);
    const customStyle={marginLeft:'0px'};

    const handleTextChange = async (e) => {

    }
    let SelectedData =(data)=>{ 
        console.log('data : ', data)
        document.getElementById("data").value = data.code
    }   

    let handleClear = (value) => {
        setClearDropdown(value);
        
      }
  return (
    <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-12 mt-1">
                            <div className='handlser'>
                                <Heading text="List Editor" />
                                {/* <Heading text={content} /> */}
                                <div style={{ display:'flex', position: 'relative' }}>
                                    {/* <input type="text" className='form-control form-control-sm' placeholder="Search" value={''} onChange={''} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span> */}
                                    <button type="button" className="btn btn-sq-xs btn-save-fill mb-1 me-1" onClick={''} style={{ padding: '5px', width:'30px', height:'30px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} 
                                   data-bs-toggle="modal" data-bs-title="Add New List" data-bs-placement="bottom" data-bs-target="#newListModal" title='New List'>
                                            <img src={plus} className='icnn' alt='' style={{ width: '100%', height: '100%' }}/>
                                    </button>
                                    <button type="button" className="btn btn-sq-xs btn-danger mb-1 me-1" onClick={''} style={{padding: '5px', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center',}}
data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" title='Delete List'>
  <img src={deleteBtn} className='icnn' alt='' style={{ width: '100%', height: '100%' }} />
</button>


                                    {/* <select className='form-select form-select-sm' style={{width:'250px'}}>
                                          <option value='0'>test 1</option>
                                          <option value='1'>test 2</option>
                                        </select> */}
                                        <DropdownWithSearch defaulNname="Adress Book Types" name="bacteriaID" list={''} valueName="" displayName="" editdata={""} getvalue={handleTextChange} clear={clearDropdown} clearFun={handleClear} />
                                        <span style={{padding:'5px'}}>Showing Items: 11 of 11</span>

                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "83vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>
                                            <th>ID </th>
                                            <th>Title</th>
                                            <th>Order</th>
                                            <th>Default</th>
                                            <th>Active</th>
                                            <th>Type</th>
                                            <th>Notes</th>
                                            <th>Code(s)</th>
                                            {/* <th style={{ "width": "10%" }} className="text-center">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                   
                                    <tr>
                                      <td><input type='text' className='form-control form-control-sm' placeholder='Enter Id'/></td>
                                      <td><input type='text' className='form-control form-control-sm' style={{width:'250px'}} placeholder='Enter Title'/></td>
                                      <td><input type='text ' className='form-control form-control-sm' placeholder='Enter Order'/></td>
                                      <td className=''><input type='checkbox' role='switch'/></td>
                                      <td className=''><input type='checkbox' role='switch' /></td>
                                      <td className=''>
                                        <select className='form-select form-select-sm' >
                                          <option value='0'>test 1</option>
                                          <option value='1'>test 2</option>
                                        </select>
                                      </td>
                                      <td><input type='text' className='form-control form-control-sm' style={{width:'250px'}} placeholder='Enter Order'/></td>
                                      <td><input type='text' className='form-control form-control-sm' id={"data"} style={{width:'250px'}} placeholder='Enter Codes' data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#codesModal"/></td>

                                    </tr>
                                        {/* {bedData && bedData.filter((val) => `${val.bedName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((key, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{key.bedName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(key.id, key.bedName) }}><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(key.id) }} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })} */}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="col-12 mt-2">
                        <div className='whitebg1'>
                        <div className='row'>
                        <div className="col-12">
                        <div className='whitebg' style={{padding:"3px"}}>
                        <div className="d-flex  gap-2 mt-2" style={{justifyContent:'left', flexWrap:'wrap'}}>
                            <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" onClick={''}><img src={save} className='icnn' alt='' />Save</button>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>


                    </div>
                </div>


                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">

                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                <div className='popDeleteTitle mt-3'>Delete?</div>
                                <div className='popDeleteContent'>Do you want to delete?</div>
                            </div>
                            <div className="modal-footer1 text-center" >

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={''} data-bs-dismiss="modal">"Delete"</button>
                            </div>
                        </div> 
                    </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

                {/*  <!------------------- Start New List Modal ---------------------------------->  */}
                <div className="modal fade" id="newListModal" tabIndex="-1" aria-labelledby="newListModalLabel" aria-hidden="true" data-bs-backdrop="static">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">

                            <div className="modal-body modelbdy text-center">
                                
                                <div className='popDeleteContent'>Add New List</div>
                                <div className="mb-2 me-2">
                                            
                                            <input type="text" className="form-control form-control-sm" id="bedName" placeholder="Enter Bed Name name" onChange={''} />
                                        </div>
                            </div>
                            <div className="modal-footer1 text-center" style={{ marginTop: "-27px"}}>

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={''} data-bs-dismiss="modal">"Delete"</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {/ -----------------------End New List Modal Popup--------------------- /} */}

                <div className="modal fade" id="codesModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static" >
                    <div className="modal-dialog modalDelete" style={{maxWidth:'550px'}}>
                        <div className="modal-content" >
                        {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
                        <button type="button" class="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i class="bi bi-x-octagon"></i></button>
                           <CodeMaster style={customStyle} SelectedData={SelectedData}/>
                        </div>
                    </div>
                </div>

                {/*####### Chat Button */}
                {/* <div className="chat-btn" title='Start Chat' onClick={btnOpenChatBox}> <i className="bi bi-chat-left-dots"></i></div> */}

            </section>
            {/* <Loder val={loder} /> */}
        </>
  )
}

