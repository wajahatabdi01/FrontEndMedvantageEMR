import React from 'react'
import download from '../../assets/images/dashboard/downloadicon.svg';
import downloadbtn from '../../assets/images/dashboard/downloadbtn.svg';

export default function DownloadChartedDocument() {
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-12"><div class="med-box  mb-1"><div class="title">Download Charted Document</div></div></div>
                        <div className="col-12">
                            <div className="med-box" style={{ minHeight: '800px' }}>
                                <div className="inner-content">                             

                                    <div className='mt-2 ps-1 pt-1 download-profile'>
                                        <div className='profile-details1'>                                          
                                            <div>   <img src={download} alt="" /></div>
                                            <div className='download-profl mb-0 pb-0'>  Download all Patient Document
                                                <div className='download-date mt-0 pt-0'><em>  02 Nov, 23 05:55:19</em></div>
                                            </div>
                                        </div>
                                        <div className=''>  <button type="button" class="btn btn-save btn-save-fill btn-sm mb-1 me-1">
                                            <img src={downloadbtn} alt="" /> Download
                                        </button> 
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


