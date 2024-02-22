import React,{ useEffect, useState } from 'react'
import Loder from '../../Component/Loader';
import time from '../../assets/images/icons/time.png';

export default function MedicalHistory() {
    return(
        <>
         <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="inner-content">
                    <div className="row">
                      <div className="d-flex flex-wrap" style={{gap : '10px'}}>
                        <div><button className='medical-history-btn-active'>General</button></div>
                        <div><button className='medical-history-btn-inactive'>Family History</button></div>
                        <div><button className='medical-history-btn-inactive'>Relatives</button></div>
                        <div><button className='medical-history-btn-inactive'>LifeStyle</button></div>
                        <div><button className='medical-history-btn-inactive'>Other</button></div>
                      </div>
                    </div>

                    <div className="row ps-2 mt-4">
                      <div className="declaration-heading">General</div>
                    </div>
                     

                     <div className='main-wrapper'>
                    <div className="row ps-2 mt-2">
                      <div className="title px-2 title-medication">Risk Factors</div>
                      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                        <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between flex-wrap pe-4">
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Varicose Veins
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Hypertension
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Diabetes
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />sickle Cell
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Fibroids
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />PID (Pelvic Inflammatory Disease)
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox"  className="me-2 custom-checkbox form-check-input " />Severe Migraine
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox"  className="me-2 custom-checkbox form-check-input" />Heart Disease
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Thrombosis/stroke
                          </div>
                          
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Hepatitis
                          </div>
                        </div>
                        <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between flex-wrap pe-4">
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Gall Bladder Condition
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Breast Disease
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Depression
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Allergies
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Infertility
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Asthma
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox"  className="me-2 custom-checkbox form-check-input " />Epilepsy
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox"  className="me-2 custom-checkbox form-check-input" />Contact Lenses
                          </div>
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Contraceptive Complication(specify)
                          </div>
                          
                          <div className="risk-factors-check regularCheck">
                            <input type="checkbox" className="me-2 custom-checkbox form-check-input" />Other(specify)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row ps-2 mt-2">
                    <div className="title px-2 title-medication">Exams/Tests</div>




                    <div className='exam-test-main mb-4'>
                   
                      <div className='testexam'>
                        <div className="exam-heading mb-2 mt-2 no-flex">Breast Exam</div>
                        <div className="exam-test-box">
                          <div className='radio-btn-wrapper'>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>N/A</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Nor</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Abn</div>
                          </div>
                          <div className='exam-test-box-input'><input type='text' className='exam-input' placeholder='Enter Date/Notes'/></div>
                        </div>
                      </div>
                
                      <div className='testexam'>
                        <div className="exam-heading mb-2 mt-2 no-flex">Cardiac Echo</div>
                        
                        <div className="exam-test-box">
                        <div className='radio-btn-wrapper'>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>N/A</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Nor</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Abn</div>
                          </div>
                          <div className='exam-test-box-input'><input type='text' className='exam-input' placeholder='Enter Date/Notes'/></div>
                        </div>
                      </div>
                   
                      <div className='testexam'>
                        <div className="exam-heading mb-2 mt-2 no-flex">ECG</div>
                        <div className="exam-test-box">
                        <div className='radio-btn-wrapper'>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>N/A</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Nor</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Abn</div>
                          </div>
                          <div className='exam-test-box-input'><input type='text' className='exam-input' placeholder='Enter Date/Notes'/></div>
                        
                        </div>
                      </div>


                    </div>
                    <div className='exam-test-main mb-4'>
                   
                      <div className='testexam'>
                        <div className="exam-heading mb-2 mt-2">Gynecological Exam</div>
                        <div className="exam-test-box">
                          <div className='radio-btn-wrapper'>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>N/A</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Nor</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Abn</div>
                          </div>
                          <div className='exam-test-box-input'><input type='text' className='exam-input' placeholder='Enter Date/Notes'/></div>
                        </div>
                      </div>
                
                      <div className='testexam'>
                        <div className="exam-heading mb-2 mt-2 no-flex">Mammogram</div>
                        
                        <div className="exam-test-box">
                        <div className='radio-btn-wrapper'>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>N/A</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Nor</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Abn</div>
                          </div>
                          <div className='exam-test-box-input'><input type='text' className='exam-input' placeholder='Enter Date/Notes'/></div>
                        </div>
                      </div>
                   
                      <div className='testexam'>
                        <div className="exam-heading mb-2 mt-2 no-flex">Physical Exam</div>
                        <div className="exam-test-box">
                        <div className='radio-btn-wrapper'>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>N/A</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Nor</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Abn</div>
                          </div>
                          <div className='exam-test-box-input'><input type='text' className='exam-input' placeholder='Enter Date/Notes'/></div>
                        
                        </div>
                      </div>


                    </div>
                    <div className='exam-test-main'>
                   
                      <div className='testexam'>
                        <div className="exam-heading mb-2 mt-2 no-flex">Prostate Exam</div>
                        <div className="exam-test-box">
                          <div className='radio-btn-wrapper'>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>N/A</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Nor</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Abn</div>
                          </div>
                          <div className='exam-test-box-input'><input type='text' className='exam-input' placeholder='Enter Date/Notes'/></div>
                        </div>
                      </div>
                
                      <div className='testexam'>
                        <div className="exam-heading mb-2 mt-2 no-flex">Rectal Exam</div>
                        
                        <div className="exam-test-box">
                        <div className='radio-btn-wrapper'>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>N/A</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Nor</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Abn</div>
                          </div>
                          <div className='exam-test-box-input'><input type='text' className='exam-input' placeholder='Enter Date/Notes'/></div>
                        </div>
                      </div>
                   
                      <div className='testexam'>
                        <div className="exam-heading mb-2 mt-2 no-flex">Siamoid/Colonoscopy</div>
                        <div className="exam-test-box">
                        <div className='radio-btn-wrapper'>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>N/A</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Nor</div>
                          <div className='custom-radio-btn'><input type='radio' className='form-check-input me-2'/>Abn</div>
                          </div>
                          <div className='exam-test-box-input'><input type='text' className='exam-input' placeholder='Enter Date/Notes'/></div>
                        
                        </div>
                      </div>


                    </div>

                    </div>
                    </div>

                       
  
                        <div className="row ps-2 mt-4">
                        <div className="declaration-heading">Family History</div>
                          </div> 

                         <div className='family-main-warpper' style={{overflow: 'auto'}}>
                                   <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12"> 
                          <div className="main-wrapper">
                          <div className='testexam'>
                          <div className="family-detail-heading mb-2 mt-2 no-flex">Father</div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                          <div className="exam-test-box">
                          <div className='radio-btn-wrapper'>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter'/></div>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter Diagnosis Code'/></div>
                          </div>
                          
                        
                        </div>
                        </div>
                      </div>
                          </div>
                          <div className="main-wrapper">
                          <div className='testexam'>
                          <div className="family-detail-heading mb-2 mt-2 no-flex">Siblings</div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                          <div className="exam-test-box">
                          <div className='radio-btn-wrapper'>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter'/></div>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter Diagnosis Code'/></div>
                          </div>
                          
                        
                        </div>
                        </div>
                      </div>
                          </div>
                          <div className="main-wrapper">
                          <div className='testexam'>
                          <div className="family-detail-heading mb-2 mt-2 no-flex">Offspring</div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                          <div className="exam-test-box">
                          <div className='radio-btn-wrapper'>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter'/></div>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter Diagnosis Code'/></div>
                          </div>
                          
                        
                        </div>
                        </div>
                      </div>
                          </div>
                          </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12"> 
                          <div className="main-wrapper">
                          <div className='testexam'>
                          <div className="family-detail-heading mb-2 mt-2 no-flex">Mother</div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                          <div className="exam-test-box">
                          <div className='radio-btn-wrapper'>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter'/></div>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter Diagnosis Code'/></div>
                          </div>
                          
                        
                        </div>
                        </div>
                      </div>
                          </div>
               
                          <div className="main-wrapper">
                          <div className='testexam'>
                          <div className="family-detail-heading mb-2 mt-2 no-flex">Spouse</div>
                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                          <div className="exam-test-box">
                          <div className='radio-btn-wrapper'>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter'/></div>
                          <div className='exam-test-box-input'><input type='text' className='family-input' placeholder='Enter Diagnosis Code'/></div>
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
                </div>
                </div>
                </section>
        </>
    )
}