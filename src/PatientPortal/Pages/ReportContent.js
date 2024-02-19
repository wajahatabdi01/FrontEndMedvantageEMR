import React, { useEffect, useRef, useState } from 'react';
import download from '../../assets/images/dashboard/download.svg'

export default function ReportContent() {
    return(
        <>
         <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
          <div class="col-12">
            <div class="med-box  mb-1">
                <div class="title">Report Content</div>
                  </div>
                   </div>
                <div className="col-12">
                <div className="med-box">
                 <div className="inner-content">
                  <div className="report-main-box mb-3">
                     <div className="record-name-box">
                        <div className='record-name'>Continuity of Care Record(CCR)</div>
                        <div className='report-description'>(Pop ups need to be enabled to see these reports)</div>
                     </div>
                     <div className="report-action-main">
                        <div className='d-flex align-items-center regularCheck justify-content-end'>
                            <div className='me-2'><input type="checkbox" className="form-check-input"/></div>
                            <div className='check-box-action'>Use Date Range</div>
                        </div>
                        <div className='report-btn-main mt-2'>
                            <div><button className='general-report-btn'><i class="bi bi-file-earmark-text-fill me-2"></i>Generate Report</button></div>
                            <div><button className='report-download-btn'><i class="bi bi-download fw-bold me-2"></i>Download</button></div>
                        </div>
                     </div>
                    </div>
                    <div className='horizontal-line report-line'></div>

                    <div className="report-main-box mb-3 mt-3">
                     <div className="record-name-box">
                        <div className='record-name'>Continuity of Care Document(CCD)</div>
                        <div className='report-description'>(Pop ups need to be enabled to see these reports)</div>
                     </div>
                     <div className="report-action-main">
                        <div className='d-flex align-items-center regularCheck justify-content-end'>
                            <div className='me-2'><input type="checkbox" className="form-check-input"/></div>
                            <div className='check-box-action'>Use Date Range</div>
                        </div>
                        <div className='report-btn-main mt-2'>
                            <div><button className='general-report-btn'><i class="bi bi-file-earmark-text-fill me-2"></i>Generate Report</button></div>
                            <div><button className='report-download-btn'><i class="bi bi-download fw-bold me-2"></i>Download</button></div>
                        </div>
                     </div>
                    </div>
                    <div className='horizontal-line report-line'></div>
                    <div className='record-name mt-3 d-flex flex-wrap'>
                     <div className='me-3'>Patient report</div>
                     <div className='check-all me-2'>Check All</div>
                     <div className='clear-all'>Clear All</div>
                    </div>
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                        <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex flex-wrap" style={{columnGap: "103px"}}>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Demographics
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Immunizations
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />History
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Patient Notes
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Insurance
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Transactions
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox"  className="me-2 custom-checkbox form-check-input " />Billing
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox"  className="me-2 custom-checkbox form-check-input" />Communications
                          </div>
                     
                        </div>
                        <div className="exam-heading mb-2 mt-2 no-flex">Encounters & Forms</div>
                        <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex flex-wrap" style={{columnGap: "80px"}}>

                       
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Toe Pain (01 Jun 23)
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Soap
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Vitals
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Consent
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Clinical Notes Form
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Consent
                          </div>
                          
                         
                     
                        </div>
                        <div className="exam-heading mb-2 mt-2 no-flex">Medical Problems</div>
                        <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex flex-wrap" style={{columnGap: "80px"}}>

                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Diabetes <span className="ms-2 medical-active">Active</span>
                          </div>
                      
                          
                         
                     
                        </div>
                        <div className="exam-heading mb-2 mt-2 no-flex">Meditations</div>
                        <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex flex-wrap mb-3" style={{columnGap: "80px"}}>

                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Metaformin <span className="ms-2 medical-active">Active</span>
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Lipitor <span className="ms-2 medical-active">Active</span>
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Lisinopril <span className="ms-2 medical-active">Active</span>
                          </div>
                      
                          
                         
                     
                        </div>
                       
                        <div className='horizontal-line report-line'></div>
                        <div className='record-name mt-3 d-flex flex-wrap mb-3'>
                     <div className='me-3'>Procedures</div>
                     <div className='check-all me-3'>Order Date</div>
                     <div className='check-all me-3'>Encounter Date</div>
                     <div className='check-all me-3'>Order Description</div>
                     
                        </div>
                      <div className='horizontal-line report-line'></div>

                      <div className='record-name mt-3 d-flex flex-wrap mb-3'>
                     <div className='me-3'>Documents</div>
                     </div>
                     <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex flex-wrap" style={{columnGap: "80px",fontWeight: 700}}>

                   <div className="risk-factors-check regularCheck" style={{fontStyle: 'italic'}}>
                    <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Patient ID Card Name: 96zxdfgh78765-jkde876-rtghjm 
                      </div>
                         </div>
                         <div className='report-btn-main mt-2 justify-content-end mb-5'>
                            <div><button className='general-report-btn'><i class="bi bi-file-earmark-text-fill me-2"></i>Generate Report</button></div>
                            <div><button className='report-download-btn'><i class="bi bi-download fw-bold me-2"></i>Download</button></div>
                        </div>


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