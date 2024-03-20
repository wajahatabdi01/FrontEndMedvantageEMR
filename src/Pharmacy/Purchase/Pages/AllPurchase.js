import React, { useState, useEffect } from 'react';
import BoxContainer from '../../../../src/Component/BoxContainer';
import visible from '../../../assets/images/icons/viewIcon.svg'
import Heading from '../../../../src/Component/Heading';
import NoDataFound from '../../../assets/images/icons/No data-rafiki.svg'
import GetAllPurchase from '../../Purchase/API/GetAllPurchase'
import GetAllOtherPurchase from '../../Purchase/API/GetAllOtherPurchase'
import IconDelete from '../../../../src/assets/images/icons/IconDelete.svg'
import DeletePurchase from '../../Purchase/API/DeletePurchase'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

function AllPurchase() {

  let [purchaseList, setPurchaseList] = useState('');
  let [purchaseSubList, setPurchaseSubList] = useState('');
  let [unitList, setUnitList] = useState('');
  let [itemList, setItemList] = useState('');
  let [hsnList, setHsnList] = useState('');
  let [billNo, setBillNo] = useState('');
  let [productId, setProductId] = useState('');
  let [unitId, setUnitId] = useState('');
  let [hsnCodeId, setHsnCodeId] = useState('');
  let [batchNo, setBatchNo] = useState('');
  let [purchasePrice, setPurchasePrice] = useState('');
  let [quantity, setQuantity] = useState('');
  let [netAmount, setNetAmount] = useState('');
  let [modifyClick, setModifyClick] = useState(false);
  let [eyeClick, setEyeClick] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  let [rowId, setRowId] = useState('');

  const [isChecked, setIsChecked] = useState(true);

  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [showUnderProcessValidate, setShowUnderProcessValidate] = useState(0);
  let [showTosterValidate, setShowTosterValidate] = useState(0);
  let [tosterMessageValidate, setTosterMessageValidate] = useState("");
  let [tosterValueValidate, setTosterValueValidate] = useState(0);
  let [showImage, setShowImage] = useState(0)
  const { t } = useTranslation();



  const getPurchaseDetails = async () => {
    try {

      let purchaseresponse = await GetAllPurchase();

      if (purchaseresponse.status === 1) {
        setPurchaseList(purchaseresponse.responseValue)
      }

    } catch (e) {

    }
  }

  const getPurchaseSubDetails = async (billNo) => {
    setBillNo(billNo)
    try {

      let purchasesubresponse = await GetAllOtherPurchase(billNo);
      
      if (purchasesubresponse.status === 1) {
        setPurchaseSubList(purchasesubresponse.responseValue)
        const purchasesub = purchasesubresponse.responseValue[0];
        setProductId(purchasesub.productId)
        setUnitId(purchasesub.unitId)
        setHsnCodeId(purchasesub.hsnCodeId)
        setQuantity(purchasesub.quantity)
        setPurchasePrice(purchasesub.purchasePrice)
        setBatchNo(purchasesub.batchNo)
      }

    } catch (e) {

    }
  }

  

  const handleOnChange = (e) => {

    const { name, value } = e.target;

    if (name === 'billNo') {
      setBillNo(value);
    }
    else if (name === 'searchBox') {
      setSearchInput(value)
    }


  };

  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let obj = {
      id: rowId
    }
   
    let response = await DeletePurchase(obj)
    if (response.status === 1) {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage("Data Deleted SuccessFully!")
      setTosterValue(0)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
      getPurchaseDetails()
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



  useEffect(() => {

    getPurchaseDetails();

  }, [])
  document.body.dir = i18n.dir();
  return (
    <>
      <section className='main-content mt-5 pt-3'>
        <div className='container-fluid'>
          {(eyeClick === false && modifyClick === false) &&
            <div className='row'>
              <div className="col-12">
                <div className='handlser'>
                  <Heading text={t("All_Purchase")} id='top' />
                  <div style={{ position: 'relative' }}>
                    <input type="text" name="searchBox" className='form-control form-control-sm' placeholder={t("Search")} value={searchInput} onChange={handleOnChange} />
                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="med-table-section" style={{ "height": "581px", position: 'relative' }}>
                  {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div> :
                    <table className='med-table border_ striped'>
                      <thead>
                        <tr>
                          <th className="" >{t("S.No.")}</th>
                          <th>{t("Supplier_Name")}</th>
                          <th>{t("Bill_No.")}</th>
                          <th>{t("Invoice_Date")}</th>
                          <th>{t("GrossAmount")}</th>
                          <th>{t("Discount")}</th>
                          <th>{t("NetAmount")}</th>
                          <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseList && purchaseList.filter((list) => `${list.billNo}`.toLowerCase().includes(searchInput.toLowerCase())).map((list, index) => {

                          return (

                            <>

                              <tr key={list.purchasemastermainID}>
                                <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>
                                <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.vendorName}</span></td>
                                <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.billNo}</span></td>
                                <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.dateOfPurchase}</span></td>
                                <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.grossAmount}</span></td>
                                <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.discount}</span></td>
                                <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.netAmount}</span></td>
                                <td className='text-center'>
                                  <div className='action-button'>
                                    {/* <div data-bs-toggle='modal'  data-bs-placement='bottom' data-bs-target = '#actionModal' title='Action'><a href='#top'><img src={visible} style={{ 'width': '20px', 'border-radius': '5px' }} alt='' onClick={() => { openPurchaseDetails(); getPurchaseSubDetails(list.billNo); }} /></a></div> */}
                                    <div data-bs-toggle='modal' data-bs-placement='bottom' data-bs-target='#actionModal' title='Action'><a href='#top'><img src={visible} style={{ 'width': '20px', 'border-radius': '5px' }} alt='' onClick={() => { getPurchaseSubDetails(list.billNo) }} /></a></div>
                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt="Delete" onClick={() => { setRowId(list.purchasemastermainID) }} /></div>

                                  </div>
                                </td>
                              </tr>
                            </>
                          )
                        })}
                      </tbody>
                    </table>}
                </div>
              </div>
            </div>
          }


          {/* ################################ After Clicking on Eye Button ################################ */}
          {/* {(eyeClick === true && modifyClick === false) &&
        <div className='row'>
          <div className="col-12">
            <Heading text='' id='top' />
            <div className="fieldsett-in">
              <div className="fieldsett">
                <span className='fieldse'>Item Details</span>
                <div className='row mt-2 px-2'>
                  <div className="col-12 mt-2">


                    <div className="med-table-section" style={{ "height": "581px", position: 'relative' }}>
                      {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div> :
                        <table className='med-table border_ striped'>
                          <thead>
                            <tr>
                              <th className="" >S.No.</th>
                              <th>Item Name</th>
                              <th>Unit Name</th>
                              <th>HSN Code</th>
                              <th>Batch No.</th>
                              <th>Purchase Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>

                          <tbody>
                            {purchaseSubList && purchaseSubList.map((list, index) => {

                              return (

                                <>

                                  <tr>
                                    <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>
                                    <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.productId}</span></td>
                                    <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.unitName}</span></td>
                                    <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.hsnCode}</span></td>
                                    <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.batchNo}</span></td>
                                    <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.purchasePrice}</span></td>
                                    <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.quantity}</span></td>

                                  </tr>
                                </>
                              )
                            })}


                          </tbody>
                        </table>}
                    </div>
                  </div>
                </div>



              </div>


              <div className="rt-btns">
                <BoxContainer>
                  <div className="mb-2 relative">
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={previousPage}>Back</button>

                  </div>
                </BoxContainer>
              </div>
            </div>
          </div>
        </div>
      } */}
          <div className="modal fade" id="actionModal" data-bs-backdrop="static">
            <div className="modal-dialog modal-xl">
              <div className="modal-content p-0">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 text-white" id="exampleModalLabel"> Item List</h1>
                  <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window" >
                    <i className="bi bi-x-octagon"></i>
                  </button>
                </div>
                <div className="modal-body p-0">
                  <div className="row">
                    <div className="col-12">
                      <Heading text='' id='top' />
                      <div className="fieldsett-in">
                        <div className="fieldsett">
                          <span className='fieldse'>Item Details</span>
                          <div className='row mt-2 px-2'>
                            <div className="col-12 mt-2">


                              <div className="med-table-section" style={{ "height": "581px", position: 'relative' }}>
                                {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div> :
                                  <table className='med-table border_ striped'>
                                    <thead>
                                      <tr>
                                        <th className="" >{t("S.No.")}</th>
                                        <th>Item Name</th>
                                        <th>{t("Unit_Name")}</th>
                                        <th>HSN Code</th>
                                        <th>Batch No.</th>
                                        <th>Purchase Price</th>
                                        <th>Quantity</th>
                                        {/* <th><li className="d-flex flex-row ps-1 gap-2">
                                                <input type="checkbox" onChange={() => { changeHead(-1); }}/>
                                                <span>Select All</span>
                                            </li></th> */}
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {purchaseSubList && purchaseSubList.map((list, index) => {

                                        return (
                                          <>
                                            <tr>
                                              <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>
                                              <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.brandName}</span></td>
                                              <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.unitName}</span></td>
                                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.hsnCode}</span></td>
                                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.batchNo}</span></td>
                                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.purchasePrice}</span></td>
                                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.quantity}</span></td>
                                              {/* <td className='text-center'>
                                                <div className='action-button'>
                                                <li className="d-flex flex-row ps-1 gap-2">
                                                        <input type="checkbox" id={list.id} />
                                                        <span htmlFor="list.id"></span>
                                                    </li>
                                                 
                                                </div>
                                              </td> */}
                                            </tr>
                                          </>
                                        )
                                      })}
                                    </tbody>
                                  </table>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  <!--  Delete Pop-Up Modal -->  */}

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
              <div className="modal-dialog modalDelete">
                <div className="modal-content">

                  <div className="modal-body modelbdy text-center">
                    <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                    <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                    <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                  </div>
                  <div className="modal-footer1 text-center">

                    <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                    <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


export default AllPurchase
