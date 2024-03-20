import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationProductSaltMapping from '../../../Validation/Pharmacy/ValidationProductSaltMapping'
import GetUnitMaster from '../../UnitMaster/API/GetUnitMaster';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import GetProductSaltMapping from '../API/GetProductSaltMapping'
import PostProductSaltMapping from '../API/PostProductSaltMapping'
import DeleteProductSaltMapping from '../API/DeleteProductSaltMapping'
import PutProductSaltMapping from '../API/PutProductSaltMapping'
import GetManufacturer from '../../ManufacturerMaster/API/GetManufacturer'
import GetProduct from '../../ProductMaster/API/GetProduct'
import GetConsumeType from '../../ConsumeTypeMaster/API/GetConsumeType'
import GetSalt from '../../SaltMaster/API/GetSalt'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import Search from '../../../Code/Serach'
import clearIcon from '../../../assets/images/icons/clear.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';

export default function ConversionMaster() {

    let [productSaltMappingData, setProductSaltMappingData] = useState()
    //   let [conversionMainData, setConversionMainData] = useState()
    let [saltList, setSaltList] = useState()
    let [productList, setProductList] = useState()
    let [manufacturerList, setManufacturerList] = useState()
    let [consumeTypeList, setConsumeTypeList] = useState()
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
    let [editSalt, setEditSalt] = useState("")
    let [editManufacturer, setEditManufacturer] = useState("")
    let [editProduct, setEditProduct] = useState("")
    let [editUnit, setEditUnit] = useState("")
    let [editConsumeType, setEditConsumeType] = useState("")
    let [editParameterValue, setEditparameterValue] = useState("")

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationProductSaltMapping(sendForm.saltId, sendForm.manufacturerId, sendForm.productId, sendForm.unitID, sendForm.consumeTypeId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostProductSaltMapping(sendForm);
        
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
        let getResponse = await GetProductSaltMapping();
        let getSaltResponse = await GetSalt();
        let getManufacturerResponse = await GetManufacturer();
        let getProductResponse = await GetProduct();
        let getUnitResponse = await GetUnitMaster();
        let getConsumeTypeResponse = await GetConsumeType();
       

        if (getResponse.status === 1) {
            setProductSaltMappingData(getResponse.responseValue)

        }
        if (getSaltResponse.status === 1) {
            setSaltList(getSaltResponse.responseValue)

        }
        if (getManufacturerResponse.status === 1) {
            setManufacturerList(getManufacturerResponse.responseValue)
        }
        if (getProductResponse.status === 1) {
            setProductList(getProductResponse.responseValue)
        }
        if (getUnitResponse.status === 1) {
            setUnitList(getUnitResponse.responseValue.table)
        }
        if (getConsumeTypeResponse.status === 1) {
            setConsumeTypeList(getConsumeTypeResponse.responseValue)
        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditSalt("")
        setEditProduct("")
        setEditUnit("")
        setEditManufacturer("")
        setEditConsumeType("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //   let handleSearch = (e) => {
    //     let resp = Search(conversionMainData, e.target.value)
    //     if (e.target.value !== "") {
    //       if (resp.length !== 0) {
    //         setConversionData(resp)
    //       }
    //       else {
    //         setConversionData([])

    //       }
    //     }
    //     else {
    //         setConversionData(conversionMainData)
    //     }
    //   }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let obj = {
            id: rowId
        }
        let response = await DeleteProductSaltMapping(obj)
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
    let handleUpdate = async (id, saltId, manufacturerId, productId, dose, unitID, consumeTypeId, brandName, manufacturer, dosageFormName,saltName, unitName, userId) => {

        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "saltId": saltId,
            "manufacturerId": manufacturerId,
            "productId": productId,
            "dose": dose,
            "unitID": unitID,
            "consumeTypeId": consumeTypeId,
            "userId": userId

        }))
        setEditSalt(saltName)
        setEditManufacturer(manufacturer)
        setEditProduct(brandName)
        setEditUnit(unitName)
        setEditConsumeType(dosageFormName)
        // document.getElementById("productId").value = productId;
        // document.getElementById("unitID").value = unitID;
        // document.getElementById("conversionUnitId").value = conversionUnitId;
        document.getElementById("dose").value = dose;


    }



    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationProductSaltMapping(sendForm.saltId, sendForm.manufacturerId, sendForm.productId, sendForm.unitID, sendForm.consumeTypeId)
       
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutProductSaltMapping(sendForm)
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
        setEditUnit(0)
        setEditProduct(0)
        setEditConsumeType(0)
        setEditSalt(0)


        document.getElementById("dose").value = '';
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
                            <Heading text='Product and Salt Mapping' />
                            <BoxContainer>



                                <div className="mb-2 me-2 drpWithSearch" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="saltId" className="form-label"> Salt Name <span className="starMandatory">*</span></label>

                                    {saltList && <DropdownWithSearch defaulNname="Select" name="saltId" list={saltList} valueName="id" displayName="saltName" editdata={editSalt} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>

                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="manufacturerId" className="form-label"> Manufacturer Name <span className="starMandatory">*</span></label>

                                    {manufacturerList && <DropdownWithSearch defaulNname="Select" name="manufacturerId" list={manufacturerList} valueName="id" displayName="manufacturer" editdata={editManufacturer} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>

                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="productId" className="form-label"> Product Name <span className="starMandatory">*</span></label>

                                    {productList && <DropdownWithSearch defaulNname="Select" name="productId" list={productList} valueName="id" displayName="productName" editdata={editProduct} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>

                                <div className="mb-2 me-2">
                                    <label htmlFor="dose" className="form-label">Dose<span class="starMandatory">*</span></label>
                                    <input type='text' className="form-control form-control-sm" id='dose' name='dose' onChange={handleChange} placeholder='Enter dose' />
                                </div>

                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="unitID" className="form-label">Unit Name<span className="starMandatory">*</span></label>

                                    {unitList && <DropdownWithSearch defaulNname="Select" name="unitID" list={unitList} valueName="id" displayName="unitName" editdata={editUnit} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                                </div>

                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="consumeTypeId" className="form-label">Consume Type Name<span className="starMandatory">*</span></label>

                                    {consumeTypeList && <DropdownWithSearch defaulNname="Select" name="consumeTypeId" list={consumeTypeList} valueName="id" displayName="consumeType" editdata={editConsumeType} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

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
                            <Heading text='Product Salt Mapping List' />
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Salt Name</th>
                                            <th>Manufacturer Name</th>
                                            <th>Product Name</th>
                                            <th>Dose</th>
                                            <th>Unit Name</th>
                                            <th>Consume Type</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {productSaltMappingData && productSaltMappingData.map((key, ind) => {
                                            return (
                                                <tr value={key.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{key.saltName}</td>
                                                    <td>{key.manufacturer}</td>
                                                    <td>{key.brandName}</td>
                                                    <td>{key.doseStrength}</td>
                                                    <td>{key.unitName}</td>
                                                    <td>{key.dosageFormName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(key.id, key.saltId, key.manufacturerId, key.productId, key.dose, key.unitID, key.consumeTypeId, key.brandName, key.manufacturer, key.dosageFormName, key.saltName, key.unitName, key.userId) }} alt='' /></div>
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
