import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import ValidationHeadMaster from '../../../Validation/SuperAdmin/Master/ValidationHeadMaster'
import PostHeadMaster from '../../Api/HeadMaster/PostHeadMaster'
import GetHeadMaster from '../../Api/HeadMaster/GetHeadMaster'
import DeleteHeadMaster from '../../Api/HeadMaster/DeleteHeadMaster'
import PutHeadMaster from '../../Api/HeadMaster/PutHeadMaster'
import FileUpload from '../../../Clinical/API/FileUpload'
export default function HeadMaster() {
  let [headList, setHeadList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('')

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');
  let [imagePath, setImagePath] = useState("")

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };




  //Handle Save
  let saveForm = async () => {

    let valresponse = ValidationHeadMaster(sendForm.headName, sendForm.headRemark)

    if (valresponse) {
      setShowUnderProcess(1)
      let rspon = await FileUpload(imagePath)
      if (rspon.data.status === 1) {
        let temp = sendForm
        temp["imageURL"] = rspon.data.responseValue
        let response = await PostHeadMaster(temp);
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
    let getResponse = await GetHeadMaster();
    if (getResponse.status === 1) {
      setHeadList(getResponse.responseValue)
    }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "imageURL") {
      setSendForm(sendForm => ({
        ...sendForm,
        ["imageURL"]: e.target.files[0].name
      }))
      setImagePath(e.target.files[0])
    }
    else {
      setSendForm(sendForm => ({
        ...sendForm,
        [name]: value
      }))
    }

  }

  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1);

    let response = await DeleteHeadMaster(rowId)
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
  let handleUpdate = async (id, headName, headRemark, superAdminUserId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "headName": headName,
      "headRemark": headRemark,
      // "imageURL": imageURL,
      "userId": superAdminUserId,
    }))

    document.getElementById("headName").value = headName;
    document.getElementById("headRemark").value = headRemark;
    // document.getElementById("imageURL").value = imageURL;
  }


  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationHeadMaster(sendForm.headName, sendForm.headRemark)

    if (valresponse) {
      setShowUnderProcess(1)

      let rspon = await FileUpload(imagePath)
      console.log("p[ppppppp", rspon.data)

      if (rspon.data.status === 1) {

        let temp = sendForm
        temp["imageURL"] = rspon.data.responseValue
        let a = async () => {
          let response = await PutHeadMaster(temp)
          console.log("dcsdcscsdc", rspon)

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
        a();
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

  //Handle Clear
  let handleClear = () => {
    setSendForm({ "userId": window.superAdminUserId })
    document.getElementById("headName").value = "";
    document.getElementById("headRemark").value = "";
    document.getElementById("imageURL").value = "";
    setUpdateBool(0)
  }

  //Handle File Upload
  let handleUploadFile = async (e) => {
    console.log('file', e.target.files[0]);
    const selectedFile = e.target.files[0];
    const data = new FormData();
    data.append('fileName', selectedFile.name);
    //  console.log('selectedFile.name',selectedFile.name)
    //  console.log('daata',data)
  }


  // const FileUploadComponent = () => {
  //   const [selectedFile, setSelectedFile] = useState(null);

  //   const handleFileChange = (event) => {
  //     setSelectedFile(event.target.files[0]);
  //   };

  //   const handleFileUpload = () => {
  //     if (selectedFile) {
  //       const formData = new FormData();
  //       formData.append('file', selectedFile);
  //       setSelectedFile(null);
  //     }
  //   };

  useEffect(() => {
    getdata()
  }, [])

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text='Head Master' />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="headName" className="form-label">Head Name<span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="headName" name='headName' onChange={handleChange} placeholder="Enter head name" />
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="headName" className="form-label">Remark<span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="headRemark" name='headRemark' onChange={handleChange} placeholder="Enter head name" />
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="imageURL" className="form-label">Image Url<span className="starMandatory">*</span></label>
                  <input type="file" accept='image/*' className="form-control form-control-sm" id="imageURL" name="imageURL" onChange={handleChange} placeholder="Enter image url" />
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
            <div className="col-12 mt-3">
              <div className='handlser'>
                <Heading text="Head Master List" />
                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "74vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Head Name</th>
                      <th>Remark</th>
                      <th>Image</th>
                      <th>Image URL</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {headList && headList.filter((val) => `${val.headName} ${val.headRemark} ${val.imageURL} ${val.imageURL}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.headName}</td>
                          <td>{val.headRemark}</td>
                          <td><div className='tableRowimgBox'><img src={val.imageURL} alt='' /></div></td>
                          <td>{val.imageURL}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.headName, val.headRemark, val.superAdminUserId) }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}

                  </tbody>
                </TableContainer>
                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
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
    </>
  )
}
