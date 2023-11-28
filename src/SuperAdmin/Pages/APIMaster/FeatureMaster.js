import React, { useState, useEffect } from 'react'
import ValidationFeatureMaster from '../../../Validations/SuperAdmin/APIMaster/ValidationFeatureMaster'
import PostFeatureMaster from '../../Api/APIMaster/FeatureMaster/PostFeatureMaster'
import GetFeatureMaster from '../../Api/APIMaster/FeatureMaster/GetFeatureMaster'
import DeleteFeatureMaster from '../../Api/APIMaster/FeatureMaster/DeleteFeatureMaster'
import PutFeatureMaster from '../../Api/APIMaster/FeatureMaster/PutFeatureMaster'
import Heading from '../../../Components/Heading'
import BoxContainer from '../../../Components/BoxContainer'
import TableContainer from '../../../Components/TableContainer'
import Loder from '../../../Components/Loder'

export default function FeatureMaster() {
  let [featureList, setFeatureList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
  let [loder, setLoder] = useState(1)
  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationFeatureMaster(sendForm.featureName)

    if (valresponse) {
      setLoder(1)

      let response = await PostFeatureMaster(sendForm);
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
    let getResponse = await GetFeatureMaster();
    if (getResponse.status === 1) {
      setLoder(0)
      setFeatureList(getResponse.responseValue)

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
    let response = await DeleteFeatureMaster(id)
    if (response.status === 1) {
      setLoder(0)
      getdata()
    }
  }
  //Handle Button Change
  let handleUpdate = async (id, featureName, superAdminUserId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "featureName": featureName,
      "userId": superAdminUserId,
    }))

    document.getElementById("featureName").value = featureName;
  }

  // Handle Update
  let saveUpdate = async () => {
    let response = await PutFeatureMaster(sendForm)

    if (response.status === 1) {
      setUpdateBool(0)
      getdata()
      handleClear();
    }
  }

  //Handle Clear
  let handleClear = () => {
    setSendForm({ "userId": window.superAdminUserId })
    document.getElementById("featureName").value = "";
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
              <Heading text='Feature Master' />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="featureName" className="form-label">Feature Name<span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" id="featureName" name="featureName" onChange={handleChange} placeholder="Enter feature name" />
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
              <Heading text='All Feature  List' />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Feature Name </th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {featureList && featureList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.featureName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.featureName, val.superAdminUserId) }}></i></div>
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
