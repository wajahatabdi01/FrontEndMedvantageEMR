import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading'
import BoxContainer from '../../../Components/BoxContainer'
import TableContainer from '../../../Components/TableContainer'
import ValidationUnitMaster from '../../../Validations/SuperAdmin/UtilityMaster/ValidationUnitMaster'
import PostUnitMaster from '../../Api/UtilityMaster/UnitMaster/PostUnitMaster'
import GetUnitMaster from '../../Api/UtilityMaster/UnitMaster/GetUnitMaster'
import DeleteUnitMaster from '../../Api/UtilityMaster/UnitMaster/DeleteUnitMaster'
import PutUnitMaster from '../../Api/UtilityMaster/UnitMaster/PutUnitMaster'
import Loder from '../../../Components/Loder'

export default function UnitMaster() {
  let [unitlList, setUnitList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)

  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationUnitMaster(sendForm.unitName)

    if (valresponse) {
      setLoder(1)

      let response = await PostUnitMaster(sendForm);
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
    let getResponse = await GetUnitMaster();
    if (getResponse.status === 1) {
      setLoder(0)
      setUnitList(getResponse.responseValue)
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
    let response = await DeleteUnitMaster(id)
    if (response.status === 1) {
      setLoder(0)
      getdata()
    }
  }

  //Handle Button Change
  let handleUpdate = async (id, unitName, superAdminUserId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "unitName": unitName,
      "userId": superAdminUserId,

    }))

    document.getElementById("unitName").value = unitName;
  }

  // Handle Update
  let saveUpdate = async () => {
    let response = await PutUnitMaster(sendForm)

    if (response.status === 1) {
      setUpdateBool(0)
      getdata()
      handleClear();
    }
  }
  //Handle Clear
  let handleClear = () => {
    setSendForm({"userId": window.superAdminUserId})
    document.getElementById("unitName").value = "";
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
              <Heading text="Unit Master" />

              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="unitName" className="form-label">Unit Name <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="unitName" name='unitName' onChange={handleChange} placeholder="Enter unit name" />
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                  <div>
                    {
                      updateBool === 0 ?
                        <>
                          <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveForm}>Save</button>
                          <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}>Clear</button>
                        </>
                        :
                        <>
                          <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>Update</button>
                          <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { setUpdateBool(0); handleClear() }}>Cancel</button>
                        </>
                    }

                  </div>
                </div>
              </BoxContainer>
            </div>
            <div className="col-12 mt-3">
              <Heading text="All Unit List" />
              <div className="med-table-section" style={{ "height": "74vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Unit Name</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {unitlList && unitlList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.unitName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.unitName, val.superAdminUserId) }}></i></div>
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
