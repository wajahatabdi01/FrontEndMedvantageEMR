import React from 'react'
import sign from '../../assets/images/dashboard/signature1.svg';
import clear from '../../assets/images/dashboard/clear.svg';
import save from '../../assets/images/dashboard/save.svg';


export default function Signature() {
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-12"><div class="med-box  mb-1"><div class="title">Signature</div></div></div>
                        <div className="col-12">
                            <div className="med-box"  style={{ minHeight: '800px' }}>
                                <div className="inner-content">
                                    <div className="signn mt-2 mb-1">Sign Here</div>
                                    <div className='sign-box'>
                                        <img src={sign} alt="" />
                                    </div>

                                    <div class="col-xxl-12 col-xl-12 col-lg-4 col-md-6 mb-3 mt-3 d-flex align-items-end justify-content-end">                                   
                                    <div>
                                    <button type="button" class="btn btn-save btn-save-fill btn-sm mb-1 me-1">
                                    <img src={save} alt="" /> Save</button>
                                    <button type="button" class="btn btn-clear btn-sm mb-1 me-1">
                                    <img src={clear} alt="" /> Clear
                                    </button>
                                    </div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
