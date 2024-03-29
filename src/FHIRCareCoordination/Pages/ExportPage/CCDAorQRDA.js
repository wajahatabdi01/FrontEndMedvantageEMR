import React, { useEffect, useRef, useState } from 'react'

export default function CCDAorQRDA() {
  const [activeCard, setActiveCard] = useState(null);
  const searchRef = useRef(null);
  const popupsRef = useRef([]);

  const handleSearchClick = (cardId) => {
      setActiveCard(cardId);
  };

  

  useEffect(() => {
    const handleClickOutside = (event) => {
        const clickedInsidePopup = popupsRef.current.some(popup => popup.contains(event.target));
        if (!clickedInsidePopup) {
            setActiveCard(null); // Close the popup if clicked outside
        }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, []);

const handleSearchContainerClick = (event) => {
  event.stopPropagation(); // Prevent the event from reaching document listener
};

  return (
    <>
      <div class="title">CCDA or QRDA</div>
      <div className="container-fluid">
        <div className="row mt-1">
            <div class="col-12">
              <div className="commong relative" ref={searchRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={handleSearchContainerClick}>
                <div>
                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => handleSearchClick(1)}>Search</button>
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 ms-3" onClick={''}>Send To</button>
                    <span className='ms-3 me-2' style={{ fontSize: '13px' }}>Export documents</span>
                    <input type="checkbox" role='switch' />
                </div>                

                <div className="card card-toaster" ref={(ref) => { popupsRef.current[0] = ref; }} style={{ display: activeCard === 1 ? 'block' : 'none' }}>
                  
                    
                      <div className="row">
                        <div className="col-12">
                          
                          <div className='row'>
                            <div className='col-xl-6 col-md-6'>
                              <div className="mb-2">
                                <label htmlFor="FullName" style={{fontSize: '13px'}} className="form-label m-0">Start Date</label>
                                <input type="date" className="form-control form-control-sm" id="donor" name="donor" pattern='[A-Za-z]'  onChange={''} value={''} />

                              </div>
                            </div>
                            <div className='col-xl-6 col-md-6'>
                              <div className="mb-2">
                                <label htmlFor="FullName" style={{fontSize: '13px'}} className="form-label m-0">End Date</label>
                                <input type="text" className="form-control form-control-sm" id="donor" name="donor" pattern='[A-Za-z]'  onChange={''} value={''} />

                              </div>
                            </div>

                            <div className='col-md-12'>
                              <div className="mb-2">
                                <label htmlFor="FullName" style={{fontSize: '13px'}} className="form-label m-0">Encounter</label>
                                <input type="text" placeholder='Enter Encounter...' className="form-control form-control-sm" id="donor" name="donor" pattern='[A-Za-z]'  onChange={''} value={''} />

                              </div>
                            </div>

                            <div className='col-md-12'>
                              <div className="mb-2">
                                <label htmlFor="FullName" style={{fontSize: '13px'}} className="form-label m-0">Select Measures to Appear in Report</label>
                                <select multiple name="" id="" className='form-control form-control-sm'>
                                  <option value="One">One</option>
                                  <option value="Two">Two</option>
                                  <option value="Three">Three</option>
                                  <option value="Four">Four</option>
                                  <option value="Five">Five</option>
                                </select>
                              </div>
                            </div>

                            <div className='col-md-12'>
                              <div className="mb-2">
                              <div className="accordion">
                                <div className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button
                                    style={{padding:'7px 5px 3px'}}
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#advanced"
                                      aria-expanded="false"
                                      aria-controls="advanced"
                                    >
                                      Advanced
                                    </button>
                                  </h2>
                                  <div
                                    id="advanced"
                                    class="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample"                                    
                                  >
                                    <div className="accordion-body">
                                      <div className="row">
                                        <label className='mb-2' style={{fontSize:'13px'}}><b> Search By</b></label>
                                        <div className="col-md-6" style={{fontSize:'13px'}}>Encounter Date <input type="radio" name="" id="" /></div>
                                        <div className="col-md-6" style={{fontSize:'13px'}}>Patient Creation Date <input type="radio" name="" id="" /></div>
                                        <label className='mb-2 mt-2' style={{fontSize:'13px'}}>Provider (Encounter Relationship) :</label>
                                        <div className="col-12" >
                                        <select style={{width:'100%'}} className='form-control form-control-sm'>
                                          <option value="one">one</option>
                                          <option value="two">two</option>
                                          <option value="three">three</option>
                                        </select>
                                        </div>
                                        <label className='mb-2 mt-2' style={{fontSize:'13px'}}>Billing Facility (Encounter Relationship) :</label>
                                        <div className="col-12" >
                                        <select style={{width:'100%'}} className='form-control form-control-sm'>
                                          <option value="one">one</option>
                                          <option value="two">two</option>
                                          <option value="three">three</option>
                                        </select>
                                        </div>
                                      
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              </div>
                            </div>

                            <div className='col-md-12'>
                              <div className="d-flex justify-content-end">
                              <button type="button" class="btn btn-save btn-save-fill btn-sm mb-1 me-1">Search</button>                                
                              </div>
                            </div>

                          </div>                        
                          
                        
                        </div>
                      </div>
                    
                   
                 </div>


                </div>   
              </div>
        </div>
        <div className="inner-content">
          <div className="row">
            <div className='med-table-section'>
              <table className="med-table border_ striped v-top">
                <thead>
                  <tr>
                    <th className="text-center" style={{ "width": "5%" }}>#</th>
                    <th >PID</th>
                    <th >Name</th>
                    <th>Encounter Count</th>
                    <th>Total Transfers</th>
                    <th>Successful Transfers</th>
                    <th>Last Visit</th>
                    <th>Creation Date</th>
                    <th style={{ "width": "5%" }}><input type='checkbox' role='switch'/></th>
                    <th >Views</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center" style={{ "width": "5%" }}>1</td>
                    <td >1</td>
                    <td >Loki Laufeyson</td>
                    <td >1</td>
                    <td >0</td>
                    <td >0</td>
                    <td >2022-04-06</td>
                    <td >2022-04-06 14:28:54</td>
                    <td  style={{ "width": "5%" }}><input type='checkbox' role='switch'/></td>
                    <td >
                      <div className="d-flex gap-1">
                        <i class="bi bi-calendar3" title="File One"></i>
                        <i class="bi bi-calendar3" title="File One"></i>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center" style={{ "width": "5%" }}>1</td>
                    <td >1</td>
                    <td >Thor Odinson</td>
                    <td >1</td>
                    <td >0</td>
                    <td >0</td>
                    <td >2022-04-06</td>
                    <td >2022-04-06 14:28:54</td>
                    <td  style={{ "width": "5%" }}><input type='checkbox' role='switch'/></td>
                    <td >
                      <div className="d-flex gap-1">
                        <i class="bi bi-calendar3" title="File One"></i>
                        <i class="bi bi-calendar3" title="File One"></i>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="pagginationSection" style={{marginTop:'11px'}}>
        <div className="paginationItemContainer">
            <div className="d-flex gap-2 align-items-center">
                <span className="spanText" style={{ minWidth: '140px' }}>The page you are on</span>
                <select name="" id="" className="form-select form-select-sm pagginationDrp">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <div className="d-flex gap-2 align-items-center">
                <span className="spanText">Previous</span> <i className="bi bi-arrow-left"></i>
                <i className="bi bi-arrow-right"></i> <span className="spanText">NEXT</span>
            </div>
        </div>
      </div>

      
    </>
  )
}
