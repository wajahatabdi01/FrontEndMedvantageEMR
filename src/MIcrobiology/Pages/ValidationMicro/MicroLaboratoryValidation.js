import React, { useState } from 'react'
import BoxContainer from '../../../Component/BoxContainer';
import TableContainer from '../../../Component/TableContainer';
import NoDataFound from '../../../assets/images/icons/No data-rafiki.svg'
import Heading from '../../../Component/Heading';
import GetAllMicrobiologyLaboratoryTestResultForValidation from '../../Api/SampleRecieve/Get/GetAllMicrobiologyLaboratoryTestResultForValidation';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FindByQuery } from '../../../Code/Serach';
import MicroValidation from './MicroValidation';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function MicroLaboratoryValidation() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
const navigate = useNavigate();
  let [searchValue, setSearchValue] = useState([])
  let [viewValidatioShow,setViewValidatioShow] = useState(false)
  let [getLabValidationListTemp, setLabValidationListTemp] = useState([]);
let [getLabValidationList, setLabValidationList] = useState([]);
let[showImage,setShowImage]=useState(0);

const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

let funLabValidationList = async () => {
  let labValidateData = await GetAllMicrobiologyLaboratoryTestResultForValidation(clientID);
  if(labValidateData.status === 1){

    setLabValidationList(labValidateData.responseValue);
    setLabValidationListTemp(labValidateData.responseValue)
    
  }
  else{
    setShowImage(1)
  }
  }

let handleSearch = () => {
  
  let response = FindByQuery(getLabValidationList, searchValue, "billNo")
  
  if (searchValue.length !== 0 && searchValue !== undefined) {
    if (response.length !== 0) {
      setLabValidationListTemp(response)
    }
    else {
      setLabValidationListTemp([])
    }
  }
}

let funViewValidation = (billNo, billMasterID) => {

  sessionStorage.setItem('billNumber',billNo);
  sessionStorage.setItem('billMasterID',billMasterID);
  sessionStorage.setItem('cultureTypeId',3);
  
  navigate('/microvalidation/')

}

useEffect(() => {
  funLabValidationList()
},[])

  return (
    <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
          <div className="row">      
              <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Microbiology_Laboratory_Validation")}</div></div></div>
              <div class="col-12"> 
                <div className='whitebg'>
                  <div className="row">
                    <div className="col-md-12 col-sm-12 analuze">
                      <div className="fieldsett-in">
                        <div className="fieldsett">
                          <span className='fieldse'>{t("Bill_Details")}</span>
                          <BoxContainer>
                            
                            <div className="mt-2 me-2" >
                              {/* <div className='col-12'> 
                                        <img src={bill} className='icnn' alt=''/> <label htmlFor="Bill" className="form-label">Bill No./UHID</label>                             
                                      </div> */}

                              <div className='sert'>
                                <div className='sertin'>
                                  <input type="text" className="form-control form-control-sm" id="Bill" name="Bill" placeholder={t("Enter_Bill_No_UHID")} onChange={(e) => { setSearchValue(e.target.value); if(e.target.value.length === 0){ setLabValidationListTemp(getLabValidationList)} }} />
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
              </div>

              <div class="col-12 mt-1">
                <div className='whitebg' style={{height:'76vh'}}>
                  <div className='titile-txt'>
                    {/* <div className='title-h'><Heading text='Showing 1-10 of 250 entries' /></div>
                    <div className='title-h1'> <img src={pt} className='icnn' alt=''/> </div> */}
                  </div>
                  
                    <div className="med-table-section shadow-none" style={{height: "73vh", position:'relative' }}>
                    {showImage === 1 ?<div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div>:
                      <TableContainer>
                        <thead>
                          <tr>
                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")}</th>
                            <th>{t("Bill_No.")}</th>
                            <th>{t("Lab_NO")}</th>
                            <th>{t("DATE")}</th>
                            <th>{t("View")}</th>
                            
                            
                            {/* <th style={{ "width": "10%" }} className="text-center">Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                        {getLabValidationListTemp && getLabValidationListTemp.map((list, ind) => {
                          
                          return(
                            <tr>
                                  <td className="text-center">{ind+1}</td>
                                  <td>{list.billNo}</td>
                                  <td>{list.labNumber}</td>
                                  <td>{list.labReceivingDateTime}</td>
                                  <td><i className='fa fa-eye actionedit viewaction ' onClick={() => {funViewValidation(list.billNo,list.billMasterId)}}></i></td>
                                  
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
    </section>
  )
}
