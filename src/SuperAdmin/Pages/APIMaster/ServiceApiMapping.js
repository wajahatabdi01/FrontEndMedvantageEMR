import React, { useState, useEffect } from 'react'
import Heading from '../../../Components/Heading'
import TableContainer from '../../../Components/TableContainer'
import BoxContainer from '../../../Components/BoxContainer'
import ValidationServiceApiMapping from '../../../Validations/SuperAdmin/APIMaster/ValidationServiceApiMapping'
import PostServiceApiMapping from '../../Api/APIMaster/ServiceApiMapping/PostServiceApiMapping'
import GetServiceApiMapping from '../../Api/APIMaster/ServiceApiMapping/GetServiceApiMapping'
import GetServiceMaster from '../../Api/APIMaster/ServiceMaster/GetServiceMaster'
import GetApiMaster from '../../Api/APIMaster/ApiMaster/GetApiMaster'
import PutServiceApiMapping from '../../Api/APIMaster/ServiceApiMapping/PutServiceApiMapping'
import DeleteServiceApiMapping from '../../Api/APIMaster/ServiceApiMapping/DeleteServiceApiMapping'
import Loder from '../../../Components/Loder'

export default function ServiceApiMapping() {
  let [serviceApiList, setServiceApiList] = useState()
  let [serviceList, setServiceList] = useState()
  let [apiList, setApiList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)

  //Handle Save
  let saveForm = async () => {
    console.log("form", sendForm)
    let valresponse = ValidationServiceApiMapping(sendForm.serviceId, sendForm.apiId)

    if (valresponse) {
      setLoder(1)

      let response = await PostServiceApiMapping(sendForm);
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
    let getResponse = await GetServiceApiMapping();
    let getService = await GetServiceMaster();
    let getApi = await GetApiMaster();
    if (getResponse.status === 1) {
      setLoder(0)
      setServiceApiList(getResponse.responseValue)
      setServiceList(getService.responseValue)
      setApiList(getApi.responseValue)
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
    let response = await DeleteServiceApiMapping(id)
    if (response.status === 1) {
      setLoder(0)
      getdata()
    }
  }
  //Handle Button Change
  let handleUpdate = async (id, serviceId, apiId, superAdminUserId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "serviceId": serviceId,
      "apiId": apiId,
      "userId": superAdminUserId,
    }))

    document.getElementById("serviceId").value = serviceId;
    document.getElementById("moduleID").value = apiId;
  }
  // Handle Update
  let saveUpdate = async () => {
    let response = await PutServiceApiMapping(sendForm)

    if (response.status === 1) {
      setUpdateBool(0)
      getdata()
      handleClear();
    }
  }

  //Handle Clear
  let handleClear = () => {
    setSendForm({ "userId": window.superAdminUserId })
    document.getElementById("serviceId").value = 0;
    document.getElementById("apiId").value = 0;
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
              <Heading text='Service Api Mapping' />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="serviceId" className="form-label">Service <span className="starMandatory">*</span></label>
                  <select name='serviceId' id="serviceId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {serviceList && serviceList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="mb-2 me-2">
                  <label htmlFor="apiId" className="form-label">Api <span className="starMandatory">*</span></label>
                  <select name='apiId' id="apiId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">Select</option>
                    {apiList && apiList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.apiName}</option>
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
            <div className="col-12 mt-2">
              <Heading text='Service and Api Mapping List' />
              <div className="med-table-section" style={{ "height": "73vh" }}>
                <TableContainer>
                  <thead>

                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Service</th>
                      <th>Api</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {serviceApiList && serviceApiList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.serviceName}</td>
                          <td>{val.apiName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.serviceId, val.apiId, val.superAdminUserId) }}></i></div>
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
