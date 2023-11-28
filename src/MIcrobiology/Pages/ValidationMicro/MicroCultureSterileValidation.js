import React, { useEffect, useState } from 'react';
import NoDataFound from '../../../assets/images/icons/No data-rafiki.svg'
import TableContainer from '../../../Component/TableContainer';
import BoxContainer from '../../../Component/BoxContainer';
import GetAllMicrobiologyCultureStrileTestResultForValidation from '../../Api/SampleRecieve/Get/GetAllMicrobiologyCultureStrileTestResultForValidation';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function MicroCultureSterileValidation() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  let [getCultureSterileValidationList, setCultureSterileValidationList] = useState([]);
  let[showImage,setShowImage]=useState(0);

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  //const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;

  const navigate = useNavigate();

  let funLabValidationList = async () => {
    let labValidateData = await GetAllMicrobiologyCultureStrileTestResultForValidation(clientID);
    if(labValidateData.status === 1)
    {
    setCultureSterileValidationList(labValidateData.responseValue);
    

  }
  else{
    setShowImage(1)
  }
}

let funViewValidation = (billNo, billMasterID) => {

  sessionStorage.setItem('billNumber',billNo);
  sessionStorage.setItem('billMasterID',billMasterID);
  sessionStorage.setItem('cultureTypeId',1);
  
  navigate('/microculturesterilefinalvalidation/')
 
}

  useEffect(() => {
    funLabValidationList()
  },[])
  return (
    <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
          <div className="row">
                <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("culture_sterile_validation")}</div></div></div>
                <div className="col-md-12 col-sm-12">
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
                                    <input type="text" className="form-control form-control-sm" id="Bill" name="Bill" placeholder={t("Enter_Bill_No.")} onChange={''} />
                                  </div>
                                  <div className='searchbtnn' onClick={''}>
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
                <div class="col-md-12 col-sm-12 mt-1">
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
                        {getCultureSterileValidationList && getCultureSterileValidationList.map((list, ind) => {
                          
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
