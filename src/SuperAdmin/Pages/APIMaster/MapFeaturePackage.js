import React, { useState, useEffect } from 'react'
import ValidationMapFeaturePackage from '../../../Validations/SuperAdmin/APIMaster/ValidationMapFeaturePackage'
import PostMapFeaturePackage from '../../Api/APIMaster/MapFeaturePackage/PostMapFeaturePackage'
import GetMapFeaturePackage from '../../Api/APIMaster/MapFeaturePackage/GetMapFeaturePackage'
import GetPackageMaster from '../../Api/APIMaster/PackageMaster/GetPackageMaster'
import GetFeatureMaster from '../../Api/APIMaster/FeatureMaster/GetFeatureMaster'
import DeleteMapFeaturePackage from '../../Api/APIMaster/MapFeaturePackage/DeleteMapFeaturePackage'
import PutMapFeaturePackage from '../../Api/APIMaster/MapFeaturePackage/PutMapFeaturePackage'
import Heading from '../../../Components/Heading'
import BoxContainer from '../../../Components/BoxContainer'
import TableContainer from '../../../Components/TableContainer'

export default function MapFeaturePackage() {
    let [mapFeatureList, setMapFeatureList] = useState()
    let [packageList, setPackageList] = useState()
    let [featureList, setFeatureList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationMapFeaturePackage(sendForm.packageID, sendForm.featureID)

        if (valresponse) {
            setLoder(1)

            let response = await PostMapFeaturePackage(sendForm);
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
        let getResponse = await GetMapFeaturePackage();
        let getPackage = await GetPackageMaster();
        let getFeature=await GetFeatureMaster();
        if (getResponse.status === 1) {
            setLoder(0)
            setMapFeatureList(getResponse.responseValue)
            setPackageList(getPackage.responseValue)
            setFeatureList(getFeature.responseValue)
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
        let response = await DeleteMapFeaturePackage(id)
        if (response.status === 1) {
            setLoder(0)
            getdata()
        }
    }
    //Handle Button Change
    let handleUpdate = async (pacakgeFeatureID, pacakgeID, featureID, superAdminUserId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": pacakgeFeatureID,
            "packageID": pacakgeID,
            "featureID": featureID,
            "userId": superAdminUserId,
        }))

        document.getElementById("packageID").value = pacakgeID;
        document.getElementById("featureID").value = featureID;
    }

    // Handle Update
    let saveUpdate = async () => {
        let response = await PutMapFeaturePackage(sendForm)

        if (response.status === 1) {
            setUpdateBool(0)
            getdata()
            handleClear();
        }
    }

    //Handle Clear
    let handleClear = () => {
        setSendForm({"userId": window.superAdminUserId})
        document.getElementById("pacakgeID").value = 0;
        document.getElementById("featureID").value = 0;
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
                            <Heading text='Map Feature Package' />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="packageID" className="form-label">Package Name<span className="starMandatory">*</span></label>
                                    <select name='packageID' id="packageID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {packageList && packageList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.packageTitle}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="featureID" className="form-label">Feature Name<span className="starMandatory">*</span></label>
                                    <select name='featureID' id="featureID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">Select</option>
                                        {featureList && featureList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{val.featureName}</option>
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
                            <Heading text='All State List' />
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Package Name </th>
                                            <th>Feature Name</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {mapFeatureList && mapFeatureList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.packageName}</td>
                                                    <td>{val.featureName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.pacakgeFeatureID, val.pacakgeID, val.featureID, val.superAdminUserId) }}></i></div>
                                                            <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><i className="fa fa-trash actiondel" onClick={() => { handleDeleteRow(val.pacakgeFeatureID) }}></i>
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
        </>
    )
}
