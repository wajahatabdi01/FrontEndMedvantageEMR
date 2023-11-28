import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading'
import BoxContainer from '../../../Components/BoxContainer'
import TableContainer from '../../../Components/TableContainer'
import ValidationSubTestMaster from '../../../Validations/SuperAdmin/UtilityMaster/ValidationSubTestMaster'
import PostSubTestMaster from '../../Api/UtilityMaster/SubTestMaster/PostSubTestMaster'
import GetSubTestMaster from '../../Api/UtilityMaster/SubTestMaster/GetSubTestMaster'
import GetUnitMaster from '../../Api/UtilityMaster/UnitMaster/GetUnitMaster'
import DeleteSubTestMaster from '../../Api/UtilityMaster/SubTestMaster/DeleteSubTestMaster'
import PutSubTestMaster from '../../Api/UtilityMaster/SubTestMaster/PutSubTestMaster'
import Loder from '../../../Components/Loder'

export default function SubTestMaster() {
  let [subTestList, setSubTestList] = useState()
  let [unitList, setUnitList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.rolewisemenuassign })
  let [loder, setLoder] = useState(1)

  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationSubTestMaster(sendForm.subTestName, sendForm.unitId)

    if (valresponse) {
      setLoder(1)

      let response = await PostSubTestMaster(sendForm);
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
    let getResponse = await GetSubTestMaster();
    let getUnit = await GetUnitMaster();
    if (getResponse.status === 1) {
      setLoder(0)
      setSubTestList(getResponse.responseValue)
      setUnitList(getUnit.responseValue)
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
    let response = await DeleteSubTestMaster(id)
    if (response.status === 1) {
      setLoder(0)
      getdata()
    }
  }
  //Handle Button Change
  let handleUpdate = async (id, unitId, subTestName, rolewisemenuassign) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "unitId": unitId,
      "subTestName": subTestName,
      "userId": rolewisemenuassign,

    }))
    document.getElementById("unitId").value = unitId;
    document.getElementById("subTestName").value = subTestName;

  }

  // Handle Update
  let saveUpdate = async () => {
    let response = await PutSubTestMaster(sendForm)

    if (response.status === 1) {
      setUpdateBool(0)
      getdata()
      handleClear();
    }
  }

  //Handle Clear
  let handleClear = () => {
    setSendForm({ "userId": window.rolewisemenuassign })
    document.getElementById("subTestName").value = "";
    document.getElementById("unitId").value = 0;
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
              <Heading text='Sub Tests Master' />
              <BoxContainer>


                <div className="mb-2 me-2">
                  <label htmlFor="subTestName" className="form-label">Sub Test Name <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="subTestName" name='subTestName' onChange={handleChange} placeholder="Enter sub test" />
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="unitId" className="form-label">Unit Name <span className="starMandatory">*</span></label>
                  <select name='unitId' id="unitId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {unitList && unitList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.unitName}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                  <div>
                    {updateBool === 0 ?
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
              <Heading text='Subtest List' />
              <div className="med-table-section" style={{ "height": "74vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Sub Test Name</th>
                      <th>Unit Name</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {subTestList && subTestList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>                       
                          <td>{val.subTestName}</td>
                          <td>{val.unitName}</td>

                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.unitId, val.subTestName, val.rolewisemenuassign) }}></i></div>
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
