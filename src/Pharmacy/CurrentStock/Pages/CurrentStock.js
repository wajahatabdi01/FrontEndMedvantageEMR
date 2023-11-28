import React, { useState, useEffect } from 'react'
import GetAllCurrentStock from '../API/GetAllCurrentStock'
import BoxContainer from '../../../Component/BoxContainer';
import TableContainer from '../../../Component/TableContainer';
import NoDataFound from '../../../assets/images/icons/No data-rafiki.svg'
import AlertToster from '../../../Component/AlertToster';
import Heading from '../../../../src/Component/Heading';
import GetAllCurrentStockByProductId from '../API/GetAllCurrentStockByProductId'
import GetAllCurrentStockByPidBno from '../API/GetAllCurrentStockByPidBno'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import GetKnowmedItems from '../../Purchase/API/GetKnowmedItems'
import imgReset from '../../../assets/images/icons/reset.svg'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import clearIcon from '../../../assets/images/icons/clear.svg';


const CurrentStock = () => {


  const { t } = useTranslation();
  document.body.dir = i18n.dir();
  let [stockList, setStockList] = useState([])
  let [showImage, setShowImage] = useState(0);

  let [productId, setProductId] = useState();
  let [batchNo, setBatchNo] = useState();
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [itemList, setItemList] = useState()
  let [clearDropdown, setClearDropdown] = useState(0)

  const [inputValues, setInputValues] = useState({ "userId": window.userId });

  const getAllStockDetails = async () => {
    try {

      let response = await GetAllCurrentStock();
      let itemresponse = await GetKnowmedItems();
      if (response.status === 1) {
        setStockList(response.responseValue)

      }
      if (itemresponse.status === 1) {
        setItemList(itemresponse.responseValue)

      }

    } catch (e) {

    }
  }

  const funcStockByProductId = async () => {
    let productId1 = productId;
    try {

      let response = await GetAllCurrentStockByProductId(productId1);

      if (response.status === 1) {
        setStockList(response.responseValue)

      }


    } catch (e) {

    }
  }

  const funcStockByProductIdBatchNo = async () => {

    let batchNo1 = batchNo;
    let productId2 = productId;
    try {

      let response = await GetAllCurrentStockByPidBno(productId2, batchNo1);

      if (response.status === 1) {
        setStockList(response.responseValue)
      }

    } catch (e) {

    }
  }


  const handleChange = event => {
    const { name, value } = event.target;

    if (event.target.name === "productId") {
      setProductId(value);

    }

    if (event.target.name === "batchNo") {

      setBatchNo(value);

    }

    setInputValues(inputValues => ({
      ...inputValues,
      [name]: value,
    }));

    if (name === "productId") {
      funcStockByProductId(value);

    }


    if (name === "productId" || name === "batchNo") {
      funcStockByProductIdBatchNo(value);

    }


  }


  const resetForm = (value) => {
    setInputValues({
      batchNo: '',
    })
    setClearDropdown(value)
    getAllStockDetails(0);
    setStockList()
  }





  useEffect(() => {

    getAllStockDetails();

  }, [])


  return (
    <>

      <section className='main-content mt-5 pt-3'>
        <div className='container-fluid'>
          {/* {(eyeClick === false && modifyClick === false) && */}
          <div className='row'>
            <div className="col-12">
              <div className='whitebg' style={{ margin: "0 0 10px 0" }}>
                <div className="row">
                  <div className="col-md-12 col-sm-12 analuze" >
                    <div className="fieldsett-in">
                      <div className="fieldsett">
                        <span className='fieldse'>{t("Current_Stock")}</span>
                        <BoxContainer>


                          {itemList &&
                            <div className="drpWithSearch me-2 mb-2" style={{ maxWidth: '200px' }}>
                              <DropdownWithSearch defaulNname="Search" id={productId} name='productId'
                                getvalue={handleChange} list={itemList} valueName="id" displayName="brandName"
                                editdata={""} clear={clearDropdown} clearFun={resetForm} />
                            </div>
                          }


                          <div className='sertin me-2 mb-2'>
                            {/* <label htmlFor="productId" className="form-label">Batch No. </label> */}
                            <input type="text" className="form-control form-control-sm" id="batchNo" name="batchNo" value={inputValues.batchNo} placeholder="Enter Batch No." onChange={handleChange} />
                          </div>

                          <div className='searchbtnn d-flex mb-2'>
                            <button type="button" className="btn btn-save btn-sm" onClick={() => { funcStockByProductId(); funcStockByProductIdBatchNo(); }}><i className='fa fa-search'></i>{t("Search_Result")}</button>
                          </div>
                          <div>
                            <button type="button" className="btn btn-clear btn-sm" onClick={() => { resetForm(1) }}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                          </div>

                        </BoxContainer>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className='handlser'>
                <Heading text='Current Stock List' />

              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="med-table-section" style={{ "height": "581px", position: 'relative' }}>
                {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div> :
                  <table className='med-table border striped'>
                    <thead>
                      <tr>
                        <th className="" >{t("S.No.")}</th>
                        <th>{t("Product_Name")}</th>
                        <th>{t("Batch_No")}.</th>
                        <th>{t("Transaction_Quantity")}</th>
                        <th>{t("In_Stoc")}k</th>
                        <th>{t("Batch_Expiry")}</th>
                        <th>{t("Days_Left_Of_Expiry")}</th>
                        <th>{t("PurchasePrice")}</th>
                        <th>{t("Unit_Price")}</th>
                        <th>{t("M_R_P")}</th>
                        <th>{t("Selling_Price")}</th>
                        <th>{t("TAX")}</th>
                        <th>{t("Price_Excluding_Tax")}</th>

                      </tr>
                    </thead>
                    <tbody>
                      {stockList && stockList.map((list, index) => {

                        return (

                          <>

                            <tr>
                              <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>
                              <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.productId}</span></td>
                              <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.batchNo}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.transactionQty}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.closingStock} - {list.unitName}</span></td>
                              {/* <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.closingStock}</span></td> */}
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.batchExpiry}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.daysLeftToExpiry}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.purchasePrice}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.unitPrice}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.mrp}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.sellingPrice}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.tax}</span></td>
                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.priceExcludingTax}</span></td>

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
      </section>

    </>


  )
}

export default CurrentStock
