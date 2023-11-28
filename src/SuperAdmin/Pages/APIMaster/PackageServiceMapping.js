import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import TableContainer from '../../../Component/TableContainer'
import BoxContainer from '../../../Component/BoxContainer'
import ValidationPackageServiceMapping from '../../../Validation/SuperAdmin/APIMaster/ValidationPackageServiceMapping'
import PostPackageServiceMapping from '../../Api/APIMaster/PackageServiceMapping/PostPackageServiceMapping'
import GetPackageServiceMapping from '../../Api/APIMaster/PackageServiceMapping/GetPackageServiceMapping'
import GetServiceMaster from '../../Api/APIMaster/ServiceMaster/GetServiceMaster'
import GetPackageMaster from '../../Api/APIMaster/PackageMaster/GetPackageMaster'
import DeletePackageServiceMapping from '../../Api/APIMaster/PackageServiceMapping/DeletePackageServiceMapping'
import PutPackageServiceMapping from '../../Api/APIMaster/PackageServiceMapping/PutPackageServiceMapping'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';

export default function PackageServiceMapping() {
  let [serviceApiList, setServiceApiList] = useState()
  let [serviceList, setServiceList] = useState()
  let [packageList, setPackageList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('')

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editPackage, setEditPackage] = useState("")
  let [editService, setEditService] = useState("")
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle changes in the search term
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationPackageServiceMapping(sendForm.serviceId, sendForm.packageId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostPackageServiceMapping(sendForm);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Save SuccessFully!")
        setTosterValue(0)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)

        handleClear(1);
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
    let getResponse = await GetPackageServiceMapping();
    let getService = await GetServiceMaster();
    let getPackage = await GetPackageMaster();
    if (getResponse.status === 1) {
      setServiceApiList(getResponse.responseValue)
      setServiceList(getService.responseValue)
      setPackageList(getPackage.responseValue)
    }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;


    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }


  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let response = await DeletePackageServiceMapping(rowId)
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
  let handleUpdate = async (id, serviceId, packageId, superAdminUserId, serviceName, packageName) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "serviceId": serviceId,
      "packageId": packageId,
      "userId": superAdminUserId,
    }))
    setEditService(serviceName)
    setEditPackage(packageName)
    // document.getElementById("serviceId").value = serviceId;
    // document.getElementById("packageId").value = packageId;
  }

  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationPackageServiceMapping(sendForm.serviceId, sendForm.packageId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutPackageServiceMapping(sendForm)
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
        handleClear(1);
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
  let handleClear = (value) => {
    setSendForm({ "userId": window.superAdminUserId })
    setClearDropdown(value)
    setEditPackage("")
    setEditService("")
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
              <Heading text='Package Service Mapping' />
              <BoxContainer>

                <div className="mb-2 me-2">
                  <label htmlFor="packageId" className="form-label">Package <span className="starMandatory">*</span></label>
                  {packageList && <DropdownWithSearch defaulNname="Select package" name="packageId" list={packageList} valueName="id" displayName="packageTitle" editdata={editPackage} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="serviceId" className="form-label">Service <span className="starMandatory">*</span></label>
                  {serviceList && <DropdownWithSearch defaulNname="Select service" name="serviceId" list={serviceList} valueName="id" displayName="name" editdata={editService} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />Clear</button>
                              </>
                              :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>Update</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}>Cancel</button>
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
                <Heading text='Package and Service Mapping List' />
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
                      <th>Package</th>
                      <th>Service</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {serviceApiList && serviceApiList.filter((val) => `${val.packageName} ${val.serviceName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.packageName}</td>
                          <td>{val.serviceName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.serviceId, val.packageId, val.superAdminUserId, val.serviceName, val.packageName) }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
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
    </>
  )
}
