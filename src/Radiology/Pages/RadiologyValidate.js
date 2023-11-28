import React, { useEffect, useState } from 'react'
import BoxContainer from '../../Component/BoxContainer';
import validate from '../../assets/images/icons/validate.svg'
import Heading from '../../Component/Heading';
import visible from '../../assets/images/icons/viewIcon.svg'
import TableContainer from '../../Component/TableContainer';
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg'
import GetAllRadiologyTestListForValidation from '../API/ValidateRadiologyTest/GET/GetAllRadiologyTestListForValidation';
import { useNavigate } from 'react-router-dom';
import { FindByQuery } from '../../Code/Serach';
import Loder from '../../Component/Loader';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function RadiologyValidate() {

  let [searchValue, setSearchValue] = useState([])
  let [showImage, setShowImage] = useState(0)
  let [validateListTemp, setValidateListTemp] = useState([]);
  let [validateTestList, setValidateTestList] = useState([]);
  let [showLoder, setShowLoder] = useState(0);
  const navigate = useNavigate()
  const { t } = useTranslation();
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;
  let theUserId = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
  /////////////////// To fetch the list of tests to be validated ///////////////////////

  let getValidateList = async () =>{
    setShowLoder(1)
    let radioValidateData = await GetAllRadiologyTestListForValidation(theUserId,clientID);
    if(radioValidateData.status === 1) {
      setShowLoder(0)
      setValidateTestList(radioValidateData.responseValue)
      setValidateListTemp(radioValidateData.responseValue);
      
    }
    else{
      setShowLoder(0)
      setShowImage(1)
    }
  }

  /////////////////////// To navigate to final validation page ////////////////////////////////

  let funViewValidation=(key) =>{
    sessionStorage.setItem('billNumber',key);
    navigate('/RadiologyFinalValidate/')
  }

  ///////////////// To search in list with bill no. ///////////////

  let handleSearch = () => {
    let response = FindByQuery(validateTestList, searchValue, "billNumber")
  
    if (searchValue.length !== 0 && searchValue !== undefined) {
      if (response.length !== 0) {
        setValidateListTemp(response)
      }
      else {
        setValidateListTemp([])
      }
    }
  }

  useEffect(() => {
    getValidateList()
  },[])
  document.body.dir = i18n.dir();
  return (
    <>
  <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
          <div className="row">


            <div className="col-12 mt-2">
              <div className='whitebg1'>
                <div className='row'>



                  <div className="col-md-12 col-sm-12 plt">

                    <div className='whitebg' style={{ margin: "0 0 10px 0" }}>
                      <div className="row">
                        <div className="col-md-12 col-sm-12 analuze">
                          <div className="fieldsett-in">
                            <div className="fieldsett">
                              <span className='fieldse'>{t("Radiology_Validation")}</span>
                              <BoxContainer>
                                
                                <div className="mt-2 me-2" >
                                  {/* <div className='col-12'> 
                                            <img src={bill} className='icnn' alt=''/> <label htmlFor="Bill" className="form-label">Bill No./UHID</label>                             
                                          </div> */}

                                  <div className='sert'>
                                    <div className='sertin'>
                                      <input type="text" className="form-control form-control-sm" id="Bill" name="Bill" placeholder={t("Enter_Bill_No.")} onChange={(e) => { setSearchValue(e.target.value); if(e.target.value.length === 0){ setValidateListTemp(validateTestList)} }} />
                                    </div>
                                    <div className='searchbtnn' onClick={handleSearch}>
                                      <button><i className='fa fa-search' ></i>{t("Search_Result")}</button>
                                    </div>

                                  </div>
                                </div>
                              </BoxContainer>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className='whitebg' style={{height:'82vh'}}>
                      <div className='titile-txt'>
                        {/* <div className='title-h'><Heading text='Showing 1-10 of 250 entries' /></div>
                        <div className='title-h1'> <img src={pt} className='icnn' alt=''/> </div> */}
                      </div>
                     
                        <div className="med-table-section" style={{height: "79vh", position:'relative' }}>
                        {showImage === 1 ?<div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                          <TableContainer>
                            <thead>
                              <tr>
                                <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")}</th>
                                <th>{t("Bill_No.")}</th>
                                <th>{t("Uhid")}</th>
                                <th>{t("DATE")}</th>
                                <th>{t("View")}</th>
                                
                                
                                {/* <th style={{ "width": "10%" }} className="text-center">Action</th> */}
                              </tr>
                            </thead>
                            <tbody>
                            {validateListTemp && validateListTemp.map((list, ind) => {
                              return(
                                <tr>
                                      <td className="text-center">{ind+1}</td>
                                      <td>{list.billNumber}</td>
                                      <td>{list.uhid}</td>
                                      <td>{list.createdDate}</td>
                                      <td><i className='fa fa-eye actionedit viewaction ' onClick={() => {funViewValidation(list.billNumber)}}></i></td>
                                      
                                    </tr>
                              )
                            })}

                            </tbody>                     
                          
                          </TableContainer>}
                        </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
        showLoder === 1 ? <Loder val={showLoder} /> : ""
      }
    </section>
    </>
    
  )
}
