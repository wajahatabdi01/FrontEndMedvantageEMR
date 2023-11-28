import React, { useEffect, useState } from 'react';
import Toster from '../../../Component/Toster';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import TableContainer from '../../../Component/TableContainer';
import GetWidgetCategoryMaster from '../../Api/WidgetCategoryMaster/GetWidgetCategoryMaster';
import PostWidgetMaster from '../../Api/WidgetMaster/PostWidgetMaster';
import ValidationWidgetMaster from '../../../Validation/SuperAdmin/WidgetMaster/ValidationWidgetMaster';
import GetWidgetMaster from '../../Api/WidgetMaster/GetWidgetMaster';
import PutWidgetMaster from '../../Api/WidgetMaster/PutWidgetMaster';
import DeleteWidgetMaster from '../../Api/WidgetMaster/DeleteWidgetMaster';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';


export const WidgetMaster = () => {
  const [loder, setLoder] = useState(0);
  const [widgetCategoryList, setWidgetCategoryList] = useState([]);
  const [showToster, setShowToster] = useState(0);
  const [rowId, setRowId] = useState('');
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [updateBool, setUpdateBool] = useState(0);
  const [widgetMasterList, setWidgetMasterList] = useState([]);
  const [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId });
  // let [clearDropdown, setClearDropdown] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getData = async () => {
    const widgetCategorydata = await GetWidgetCategoryMaster();
    const widgetMasterData = await GetWidgetMaster();

    if (widgetCategorydata.status === 1) {
      setWidgetCategoryList(widgetCategorydata.responseValue);
    }

    if (widgetMasterData.status === 1) {
      setWidgetMasterList(widgetMasterData.responseValue);
    }

  };

  //Handle Change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "widgetCategoryId") {

      document.getElementById("errddlWidgetCategoryId").style.display = "none"
    }
    else if (name === "title") {
      document.getElementById("errddlTitle").style.display = "none"

    }
    else if (name === "type") {
      document.getElementById("errddlType").style.display = "none"

    }
    else if (name === "headingColor") {
      document.getElementById("errddlHeadingColor").style.display = "none"

    }
    else if (name === "bgColor") {
      document.getElementById("errddlbgColor").style.display = "none"

    }
    else if (name === "fontFamily") {
      document.getElementById("errddlFontFamily").style.display = "none"

    }
    else if (name === "apiURL") {
      document.getElementById("errddlApiURL").style.display = "none"

    }
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))

  };

  //handle save
  const saveForm = async () => {
    const valresponse = ValidationWidgetMaster(sendForm.widgetCategoryId, sendForm.title, sendForm.type, sendForm.headingColor,
      sendForm.bgColor, sendForm.fontFamily, sendForm.apiURL)

    if (valresponse[0]) {
      setShowUnderProcess(1)

      const response = await PostWidgetMaster(sendForm);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Saved SuccessFully!")
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
      getData()
    }
    else {
      document.getElementById(valresponse[1]).innerHTML = valresponse[2]
      document.getElementById(valresponse[1]).style.display = "block"
    }
  };

  const handleClear = async () => {
    setSendForm([]);
    document.getElementById('title').value = '';
    document.getElementById('type').value = '';
    document.getElementById('headingColor').value = '';
    document.getElementById('bgColor').value = '';
    document.getElementById('fontFamily').value = '';
    document.getElementById('apiURL').value = '';
    document.getElementById('widgetCategoryId').value = 0;
    // setClearDropdown(value)
    setUpdateBool(0);

  };

  //handle update
  const saveUpdate = async () => {
    const valresponse = ValidationWidgetMaster(sendForm.widgetCategoryId, sendForm.title, sendForm.type, sendForm.headingColor,
      sendForm.bgColor, sendForm.fontFamily, sendForm.apiURL)

    if (valresponse[0]) {
      setShowUnderProcess(1)

      const response = await PutWidgetMaster(sendForm);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Updated SuccessFully!")
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
      getData()
    }
    else {
      document.getElementById(valresponse[1]).innerHTML = valresponse[2]
      document.getElementById(valresponse[1]).style.display = "block"
    }
  };

  //edit
  const edit = async (id, widgetCategoryId, title, type, headingColor, bgColor, fontFamily, apiURL, superAdminUserId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "widgetCategoryId": widgetCategoryId,
      "title": title,
      "type": type,
      "headingColor": headingColor,
      "bgColor": bgColor,
      "fontFamily": fontFamily,
      "apiURL": apiURL,
      "userId": superAdminUserId,
    }))
    document.getElementById("widgetCategoryId").value = widgetCategoryId;
    document.getElementById('title').value = title;
    document.getElementById('type').value = type;
    document.getElementById('headingColor').value = headingColor;
    document.getElementById('bgColor').value = bgColor;
    document.getElementById('fontFamily').value = fontFamily;
    document.getElementById('apiURL').value = apiURL;
  };

  //handle delete
  const handleDeleteRow = async () => {
    setShowUnderProcess(1)
    let response = await DeleteWidgetMaster(rowId)
    if (response.status === 1) {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage("Data Deleted SuccessFully!")
      setTosterValue(0)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
      getData();
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
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text='Widget Master' />
              <BoxContainer>
                {/* <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="widgetCategoryId" className="form-label">Widget Category <span className="starMandatory">*</span></label>
                  {widgetCategoryList && <DropdownWithSearch defaulNname="Select Widget Category" name="widgetCategoryId" list={widgetCategoryList} displayName="categoryName" valueName="id" getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                </div> */}

                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="widgetCategoryId" className="form-label">Widget Category<span className="starMandatory">*</span></label>
                  <select name='widgetCategoryId' id="widgetCategoryId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {widgetCategoryList && widgetCategoryList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.categoryName}</option>
                      )
                    })}
                  </select>
                  <small id="errddlWidgetCategoryId" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>

                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="title" className="form-label">Title<span className="starMandatory">*</span></label>
                  <input type="text" name="title" id="title" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter Title" />
                  <small id="errddlTitle" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>

                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="type" className="form-label">Data Display Type<span className="starMandatory">*</span></label>
                  <input type="text" name="type" id="type" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter Type" />
                  <small id="errddlType" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>

                <div className=" mb-2 me-2">
                  <label htmlFor="headingColor" className="form-label">Text Color<span className="starMandatory">*</span></label>
                  <input type="color" name="headingColor" id="headingColor" onChange={handleChange} className="form-control form-control-sm" style={{ width: '70px' }} placeholder="Enter Heading Color" />
                  <small id="errddlHeadingColor" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>

                <div className=" mb-2 me-2">
                  <label htmlFor="bgColor" className="form-label">BG Color<span className="starMandatory">*</span></label>
                  <input type="color" name="bgColor" id="bgColor" onChange={handleChange} className="form-control form-control-sm" style={{ width: '70px' }} placeholder="Enter bg Color" />
                  <small id="errddlbgColor" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>

                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2 ">
                  <label htmlFor="fontFamily" className="form-label">Font Size<span className="starMandatory">*</span></label>
                  <input type="number" min={2} max={24} step={2} name="fontFamily" id="fontFamily" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter Font-Size" />
                  <small id="errddlFontFamily" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>

                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                  <label htmlFor="apiURL" className="form-label">API URL<span className="starMandatory">*</span></label>
                  <input type="text" name="apiURL" id="apiURL" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter API URL" />
                  <small id="errddlApiURL" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                                {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveForm}>Save</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handleClear(1) }}>Clear</button> */}
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />Save</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />Clear</button>
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
                <Heading text='Widget Master List' />
                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <table className='med-table border striped  mt-2'>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Widget Category</th>
                      <th>Title</th>
                      <th>Data Display Type</th>
                      <th>Text Color</th>
                      <th>BG Color</th>
                      <th>Font-Family</th>
                      <th>API URL</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {widgetMasterList && widgetMasterList.filter((val) => `${val.categoryName} ${val.title} ${val.type} ${val.headingColor} ${val.bgColor} ${val.fontFamily} ${val.apiURL}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.categoryName}</td>
                          <td>{val.title}</td>
                          <td>{val.type}</td>
                          <td>{val.headingColor} </td>
                          <td style={{ "width": "7%", backgroundColor: val.bgColor, color: val.headingColor }}><b>{val.bgColor}</b></td>
                          <td>{val.fontFamily}</td>
                          <td>{val.apiURL}</td>
                          <td>

                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => {
                                edit(
                                  val.id, val.widgetCategoryId, val.title, val.type, val.headingColor, val.bgColor, val.fontFamily, val.apiURL, val.superAdminUserId)
                              }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

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
