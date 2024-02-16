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
                      <div className="d-flex" style={{gap : '10px'}}>
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

                    <div className="row ps-2 mt-2" style={{background : '#F9FAFC'}}>
                      <div className="title ms-2">Risk Factors</div>
                      <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                        <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between flex-wrap" style={{gap: '32px'}}>
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
                        <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between flex-wrap" style={{gap: '32px'}}>
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
                </div>
                </div> 
                </div>
                </div>
                </div>
                </section>
        </>
    )
}