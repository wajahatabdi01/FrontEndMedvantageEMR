import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading'
import BoxContainer from '../../../Components/BoxContainer'
import ValidationItemMaster from '../../../Validations/SuperAdmin/UtilityMaster/ValidationItemMaster'
import PostItemMaster from '../../Api/UtilityMaster/ItemMaster/PostItemMaster'
import GetItemMaster from '../../Api/UtilityMaster/ItemMaster/GetItemMaster'
import DeleteItemMaster from '../../Api/UtilityMaster/ItemMaster/DeleteItemMaster'
import PutItemMaster from '../../Api/UtilityMaster/ItemMaster/PutItemMaster'
import GetCategoryMaster from '../../Api/Master/CategoryMaster/GetCategoryMaster'
import TableContainer from '../../../Components/TableContainer'
import Loder from '../../../Components/Loder'

export default function ItemMaster() {
  let [itemList, setItemList] = useState()
  let [categoryList, setCategoryList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)

  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationItemMaster(sendForm.itemName, sendForm.itemCharge, sendForm.categoryId)

    if (valresponse) {
      setLoder(1)

      let response = await PostItemMaster(sendForm);
      if (response.status === 1) {
        setLoder(0)
        getdata()
        handleClear();
      }
    }
    else {
      alert("Field can't be blank!")
    }
  }

  //Get data
  let getdata = async () => {
    let getResponse = await GetItemMaster();
    let getCategory = await GetCategoryMaster();
    if (getResponse.status === 1) {
      setLoder(0)
      setItemList(getResponse.responseValue)
      setCategoryList(getCategory.responseValue);
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
  let handleDeleteRow = async (id) => {
    setLoder(1)
    let response = await DeleteItemMaster(id)
    if (response.status === 1) {
      setLoder(0)
      getdata()
    }
  }

  //Handle Button Change
  let handleUpdate = async (id, categoryId, itemCharge, itemName, superAdminUserId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "categoryId": categoryId,
      "itemCharge": itemCharge,
      "itemName": itemName,
      "userId": superAdminUserId,

    }))

    document.getElementById("categoryId").value = categoryId;
    document.getElementById("itemCharge").value = itemCharge;
    document.getElementById("itemName").value = itemName;
  }

  // Handle Update
  let saveUpdate = async () => {
    let response = await PutItemMaster(sendForm)

    if (response.status === 1) {
      setUpdateBool(0)
      getdata()
      handleClear();
    }
  }
  //Handle Clear
  let handleClear = () => {
    setSendForm({"userId": window.superAdminUserId})
    document.getElementById("itemName").value = "";
    document.getElementById("itemCharge").value = "";
    document.getElementById("categoryId").value = 0;
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
              <Heading text="Item Master" />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="categoryId" className="form-label">Category <span className="starMandatory">*</span></label>
                  <select name='categoryId' id="categoryId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {categoryList && categoryList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.categoryName}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="itemCharge" className="form-label">Item Charge <span className="starMandatory">*</span></label>
                  <input type="number" className="form-control form-control-sm" id="itemCharge" name='itemCharge' onChange={handleChange} placeholder="Enter Item Charge" />
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="itemName" className="form-label">Item Name <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="itemName" name='itemName' onChange={handleChange} placeholder="Enter Item name" />
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                  <div>
                    {updateBool === 0 ?
                      <>
                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveForm}>Save</button>
                        <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}>Clear</button>
                      </>
                      :
                      <>
                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>Update</button>
                        <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>Cancel</button>
                      </>
                    }
                  </div>
                </div>
              </BoxContainer>

            </div>
            <div className="col-12 mt-3">
              <Heading text='All Item List' />
              <div className="med-table-section" style={{ "height": "74vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Category</th>
                      <th>Item Charge</th>
                      <th>Item Name</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {itemList && itemList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.categoryName}</td>
                          <td>{val.itemCharge}</td>
                          <td>{val.itemName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.categoryId, val.itemCharge, val.itemName, val.superAdminUserId) }}></i></div>
                              <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><i className="fa fa-trash actiondel" onClick={() => { handleDeleteRow(val.id) }}></i>
                              </div>
                            </div>
                          </td>
                        </tr>

                      )
                    })}

                  </tbody>
                </TableContainer>


              </div>

            </div>


          </div>
        </div>


      </section>
      <Loder val={loder} />
    </>
  )
}
