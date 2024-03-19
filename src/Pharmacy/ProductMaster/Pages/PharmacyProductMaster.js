import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationProductMaster from '../../../Validation/Pharmacy/ValidationProductMaster'
import GetManufacturer from '../../ManufacturerMaster/API/GetManufacturer';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import GetProduct from '../API/GetProduct'
import PostProduct from '../API/PostProduct'
import DeleteProduct from '../API/DeleteProduct'
import PutProduct from '../API/PutProduct'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import Search from '../../../Code/Serach'
import clearIcon from '../../../assets/images/icons/clear.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';

export default function PharmacyProductMaster() {

  let [productData, setProductData] = useState()
  let [manufacturerList, setManufacturerList] = useState()
  let [unitList, setUnitList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('');

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editManufacturer, setEditManufacturer] = useState("")

  let [editParameterValue, setEditparameterValue] = useState("")

  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationProductMaster(sendForm.manufacturerId, sendForm.productName)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostProduct(sendForm);
   
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Save SuccessFully!")
        setTosterValue(0)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)

        handleClear();
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
    let getResponse = await GetProduct();
    let getItemResponse = await GetManufacturer();
    
   

    if (getResponse.status === 1) {
      setProductData(getResponse.responseValue)
   
    }
    if (getItemResponse.status === 1) {
        setManufacturerList(getItemResponse.responseValue)
      }
     

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditManufacturer("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }


  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let obj = {
      id: rowId
    }
    let response = await DeleteProduct(obj)
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
  let handleUpdate = async (id, manufacturerId, manufacturer, productName, userId) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "manufacturerId": manufacturerId,
      "productName": productName,
      "userId": userId

    }))
    setEditManufacturer(manufacturer)
   
    // document.getElementById("productId").value = productId;
    // document.getElementById("unitID").value = unitID;
    // document.getElementById("conversionUnitId").value = conversionUnitId;
    document.getElementById("productName").value = productName;
    

  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationProductMaster(sendForm.manufacturerId)
   
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutProduct(sendForm)
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
    setSendForm({ "userId": window.userId })
    setClearDropdown(value)
    setEditManufacturer(0)
  
    
    document.getElementById("productName").value = '';
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
              <Heading text='Pharmacy Product Master' />
              <BoxContainer>



              <div className="mb-2 me-2 drpWithSearch" style={{ maxWidth: '200px' }}>
                  <label htmlFor="manufacturerId" className="form-label"> Manufacturer Name <span className="starMandatory">*</span></label>

                  {manufacturerList && <DropdownWithSearch defaulNname="Select Item" name="manufacturerId" list={manufacturerList} valueName="id" displayName="manufacturer" editdata={editManufacturer} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                

                <div className="mb-2 me-2">
                  <label htmlFor="productName" className="form-label">Product Name<span class="starMandatory">*</span></label>
                  <input type='text' className="form-control form-control-sm" id='productName' name='productName' onChange={handleChange} placeholder='Enter product Name' />
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
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' />Save</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />Clear</button>
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
            <Heading text='Product List' />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Manufacturer Name</th>
                      <th>Product Name</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {productData && productData.map((key, ind) => {
                      return (
                        <tr value={key.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{key.manufacturer}</td>
                          <td>{key.productName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(key.id, key.manufacturerId, key.manufacturer, key.productName, key.userId) }} alt='' /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(key.id) }} alt='' /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}


                  </tbody>
                </TableContainer>
                {/* -----------------------Start Delete Modal Popup-------------------   */}

                {/*  <!-- Modal -->  */}
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                  <div class="modal-dialog modalDelete">
                    <div class="modal-content">

                      <div class="modal-body modelbdy text-center">
                        <div className='popDeleteIcon'><i class="fa fa-trash"></i></div>
                        <div className='popDeleteTitle mt-3'> Delete?</div>
                        <div className='popDeleteContent'> Are you sure you want to delete?</div>
                      </div>
                      <div class="modal-footer1 text-center">

                        <button type="button" class="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">Delete</button>
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
