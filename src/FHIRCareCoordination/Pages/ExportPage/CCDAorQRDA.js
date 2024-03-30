import React, { useEffect, useRef, useState } from 'react'
import ExportIndex from '../../API/ExportIndex';

export default function CCDAorQRDA() {
  const [activeCard, setActiveCard] = useState(null);
  const [detailsList, setDetailsList] = useState([]);
  const [current_measures, setMeasureList] = useState([]);
  const [providersList, setProvidersList] = useState([]);
  const [billingList, setBillingList] = useState([]);
  const [getRadioValue, setRadioValue] = useState(1);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [pid, setPid] = useState();
  const [encounter, setEncounter] = useState();
  const [measures, setMeasures] = useState();
  const [provider, setProvider] = useState();
  const [billing, setBilling] = useState();
  const searchRef = useRef(null);
  const popupsRef = useRef([]);
  const [combination, setCombination] = useState([]);
  const [selectedSearchType, setSelectedSearchType] = useState('');

  const handlePatientSelectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCombination(combination => [...combination, value]);

    } else {
      setCombination(combination => combination.filter(comp => comp !== value));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "form_date_from") {
      setStartDate(value);
    }
    if (name === "form_date_to") {
      setEndDate(value);
    }
    if (name === "form_pid") {
      setPid(value);
    }
    if (name === "encounter") {
      setEncounter(value);
    }
    if (name === "form_measures") {
      setMeasures(value);
    }
    if (name === "form_provider_id") {
      setProvider(value);
    }
    if (name === "form_billing_facility_id") {
      setBilling(value);
    }
  }

  const handleRadioChange = (e) => {
    setSelectedSearchType(e.target.value)

  }
  const getCombinationString = () => {

    return combination.join('|');

  };

  const funSetRadioValue = (radioValue) => {
    console.log('radioValue : ', radioValue)
    setRadioValue(radioValue)
  }

  const handleSearchClick = (cardId) => {
    setActiveCard(cardId);
  };
  const handleSearch = async () => {
    // const sendFormData = {
    //   form_date_from: startDate,
    //   form_date_to: endDate,
    //   form_pid: pid,
    //   encounter: encounter,
    //   form_measures: measures,
    //   form_search_type_date: selectedSearchType,
    //   form_provider_id: provider,
    //   form_billing_facility_id: billing,
    // }
    // console.log("Search param", sendFormData)

    const formData = new FormData();
    formData.append("form_date_from", startDate);
    formData.append("form_date_to", endDate);
    formData.append("form_pid", pid);
    formData.append("encounter", encounter);
    formData.append("form_measures", measures);
    formData.append("form_search_type_date", selectedSearchType);
    formData.append("form_provider_id", provider);
    formData.append("form_billing_facility_id", billing);

    // Log FormData entries
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    const response = await ExportIndex(formData)
    if (response.length > 0) {
      alert("Success")
      getAllExport();
    }
  };
  const getAllExport = async () => {
    const response = await ExportIndex();
    if (response) {
      setDetailsList(response.details);
      setMeasureList(response.current_measures);
      setProvidersList(response.providers);
      setBillingList(response.billing_facilities);
    }
  }

  console.log('data', detailsList);






  useEffect(() => {
    getAllExport();
    const handleClickOutside = (event) => {
      const clickedInsidePopup = popupsRef.current.some(popup => popup.contains(event.target));
      if (!clickedInsidePopup) {
        setActiveCard(null); // Close tde popup if clicked outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchContainerClick = (event) => {
    event.stopPropagation(); // Prevent tde event from reaching document listener
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
                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 ms-3" onClick={() => handleSearchClick(2)}>Send To</button>
                <span className='ms-3 me-2' style={{ fontSize: '13px' }}>Export documents</span>
                <input type="checkbox" role='switch' />
              </div>

              <div className="card card-toaster" ref={(ref) => { popupsRef.current[0] = ref; }} style={{ display: activeCard === 1 ? 'block' : 'none' }}>
                <div className="row">
                  <div className="col-12">

                    <div className='row'>
                      <div className='col-xl-6 col-md-6'>
                        <div className="mb-2">
                          <label htmlFor="FullName" style={{ fontSize: '13px' }} className="form-label m-0">Start Date</label>
                          <input type="date" className="form-control form-control-sm" id="startDateID" name="form_date_from" onChange={handleChange} />

                        </div>
                      </div>
                      <div className='col-xl-6 col-md-6'>
                        <div className="mb-2">
                          <label htmlFor="FullName" style={{ fontSize: '13px' }} className="form-label m-0">End Date</label>
                          <input type="date" className="form-control form-control-sm" id="endDateID" name="form_date_to" onChange={handleChange} />

                        </div>
                      </div>
                      <div className='col-md-12'>
                        <div className="mb-2">
                          <label htmlFor="FullName" style={{ fontSize: '13px' }} className="form-label m-0">PID</label>
                          <input type="text" placeholder='Enter PID...' className="form-control form-control-sm" id="encounterID" name="form_pid" pattern='[A-Za-z]' onChange={handleChange} />

                        </div>
                      </div>

                      <div className='col-md-12'>
                        <div className="mb-2">
                          <label htmlFor="FullName" style={{ fontSize: '13px' }} className="form-label m-0">Encounter</label>
                          <input type="text" placeholder='Enter Encounter...' className="form-control form-control-sm" id="encounterID" name="encounter" pattern='[A-Za-z]' onChange={handleChange} />

                        </div>
                      </div>

                      <div className='col-md-12'>
                        <div className="mb-2">
                          <label htmlFor="FullName" style={{ fontSize: '13px' }} className="form-label m-0">Select Measures to Appear in Report</label>
                          <select name="form_measures" className='form-control form-control-sm' onChange={handleChange}>
                            <option value={0}>Select measures</option>
                            {current_measures && current_measures.map((val) => {
                              return (
                                <option value={val.measure_id}>{val.title}</option>
                              )
                            })}


                          </select>
                        </div>
                      </div>

                      <div className='col-md-12'>
                        <div className="mb-2">
                          <div className="accordion">
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button style={{ padding: '7px 5px 3px' }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#advanced" aria-expanded="false" aria-controls="advanced">
                                  Advanced
                                </button>
                              </h2>
                              <div id="advanced" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                  <div className="row">
                                    <label className='mb-2' style={{ fontSize: '13px' }}><b> Search By</b></label>
                                    <div className="col-md-6" style={{ fontSize: '13px' }}>Encounter Date <input type="radio" value="encounter" checked={selectedSearchType === "encounter"} name="searchType" onChange={handleRadioChange} /></div>
                                    <div className="col-md-6" style={{ fontSize: '13px' }}>Patient Creation Date <input type="radio" value="date_patient_creation" checked={selectedSearchType === "date_patient_creation"} name="searchType" onChange={handleRadioChange} /></div>
                                    <label className='mb-2 mt-2' style={{ fontSize: '13px' }}>Provider (Encounter Relationship) :</label>
                                    <div className="col-12" >
                                      <select style={{ widtd: '100%' }} name='form_provider_id' className='form-control form-control-sm' onChange={handleChange}>
                                        <option value='0'>Select provider</option>
                                        {providersList && providersList.map((val) => {
                                          return (
                                            <option value={val.id}>{val.fname} {val.mname} {val.lname} <span>NPI:({val.npi}) </span></option>
                                          )
                                        })}
                                      </select>
                                    </div>
                                    <label className='mb-2 mt-2' style={{ fontSize: '13px' }}>Billing Facility (Encounter Relationship) :</label>
                                    <div className="col-12" >
                                      <select style={{ widtd: '100%' }} name='form_billing_facility_id' className='form-control form-control-sm' onChange={handleChange}>
                                        <option value='0'>Select billing</option>
                                        {billingList && billingList.map((val) => {
                                          return (
                                            <option value={val.id}>{val.name}</option>
                                          )
                                        })}
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
                          <button type="button" class="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSearch}>Search</button>
                        </div>
                      </div>

                    </div>


                  </div>
                </div>


              </div>

              <div className="card card-toaster" ref={(ref) => { popupsRef.current[1] = ref; }} style={{ display: activeCard === 2 ? 'block' : 'none' }}>
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div>
                        <div className="row">
                          <div className="col-sm-4" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                            <label>
                              HIE <input type="radio" name="radioGroup" checked={getRadioValue === 1} onChange={() => funSetRadioValue(1)} />
                            </label>
                          </div>
                          <div className="col-sm-4" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                            <label>
                              EMR Direct <input type="radio" name="radioGroup" onChange={() => funSetRadioValue(2)} />
                            </label>
                          </div>
                          <div className="col-sm-4" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                            <label>
                              Download <input type="radio" name="radioGroup" onChange={() => funSetRadioValue(3)} />
                            </label>
                          </div>

                        </div>
                        <hr />
                      </div>

                      <div className='col-md-12'>
                        <div className="mb-2">
                          <div className="accordion">
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button style={{ padding: '7px 5px 3px' }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#advanced" aria-expanded="false" aria-controls="advanced">
                                  Advanced
                                </button>
                              </h2>
                              <div id="advanced" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                  <div className="row">
                                    <div className="row mt-2">
                                      {getRadioValue === 1 ? (
                                        <>
                                          <div className="col-md-6 col-sm-6" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                                            <label>
                                              My Health <input type="checkbox" name="myHealth" id="myHealthID" />
                                            </label>
                                          </div>
                                          <div className="col-md-6 col-sm-6" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                                            <label>
                                              CCDA <input type="checkbox" name="ccda" id="ccdaID" />
                                            </label>
                                          </div>
                                        </>
                                      ) : null}
                                      {getRadioValue === 2 ? (
                                        <>
                                          <div className='col-xl-12 col-md-12'>
                                            <div className="mb-2">
                                              <label htmlFor="FullName" style={{ fontSize: '13px' }} className="form-label m-0">Direct Address</label>
                                              <input type="text" className="form-control form-control-sm" id="directAddressID" name="directAddressName" onChange={''} value={''} />

                                            </div>
                                          </div>
                                          <div className="col-xl-12 col-md-6">
                                            <div className="row mt-2 flex">
                                              <div className="col-md-4 col-sm-4 col-lg-4" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                                                <label>
                                                  XML <input type="radio" name="radioGroupType" id='xmlID' />
                                                </label>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-lg-4" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                                                <label>
                                                  PDF <input type="radio" name="radioGroupType" id='pdfID' />
                                                </label>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-lg-4" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                                                <label>
                                                  HTML <input type="radio" name="radioGroupType" id='htmlID' />
                                                </label>
                                              </div>

                                            </div>

                                          </div>
                                          <div className='col-xl-12 col-md-12'>
                                            <div className="mb-2 mt-2">
                                              <label htmlFor="FullName" style={{ fontSize: '13px' }} className="form-label m-0">Reason for Referral</label>
                                              <textarea className="form-control form-control-sm" name="referralName" id="referralID" cols="30" rows="3"></textarea>

                                            </div>
                                          </div>
                                          <div className='col-xl-12 col-md-12'>
                                            <div className="col-md-12 mt-2" style={{ fontSize: '13px' }}>
                                              <label>
                                                Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                              </label>
                                              <div className='med-table-section box-shadow-none' >
                                                <table className="med-table_ border_ striped_">
                                                  <tbody>
                                                    <tr>
                                                      <td >Progress Notes <input type="checkbox" name="checkAllName" id="checkAllID" /></td>
                                                    </tr>
                                                    <tr>
                                                      <td >Continuity Care Document <input type="checkbox" name="checkAllName" id="checkAllID" /></td>
                                                    </tr>
                                                    <tr>
                                                      <td >Discharge Summary <input type="checkbox" name="checkAllName" id="checkAllID" /></td>
                                                    </tr>
                                                    <tr>
                                                      <td >Operative Note <input type="checkbox" name="checkAllName" id="checkAllID" /></td>
                                                    </tr>
                                                    <tr>
                                                      <td >Unstructued Document <input type="checkbox" name="checkAllName" id="checkAllID" /></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                            {/* <div className="col-md-6 mt-2" style={{ fontSize: '13px' }}>
                                                <label>
                                                    Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                                </label>
                                                <label>
                                                    Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                                </label>
                                                <label>
                                                    Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                                </label>
                                                <label>
                                                    Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                                </label>
                                                <label>
                                                    Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                                </label>
                                                <label>
                                                    Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                                </label>
                                                <label>
                                                    Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                                </label>
                                                <label>
                                                    Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                                </label>
                                                <label>
                                                    Check All <input type="checkbox" name="checkAllName" id="checkAllID" />
                                                </label>
                                            </div> */}
                                          </div>
                                        </>) : null}
                                      {getRadioValue === 3 ? (
                                        <>
                                          <div className="col-12 ">
                                            <div className="row mt-2">
                                              <div className=" col-sm-4" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                                                <label>
                                                  CCDA <input type="radio" name="radioGroupDownload" id='ccdaDownID' />
                                                </label>
                                              </div>
                                              <div className=" col-sm-4" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                                                <label>
                                                  QRDA I <input type="radio" name="radioGroupDownload" id='qrdaiID' />
                                                </label>
                                              </div>
                                              <div className=" col-sm-4" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
                                                <label>
                                                  QRDA III <input type="radio" name="radioGroupDownload" id='qrdaiiiID' />
                                                </label>
                                              </div>

                                            </div>

                                          </div>

                                        </>
                                      ) : null}

                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="d-flex justify-content-end">
                          <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1">Send Filtered</button>
                          <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1">Send</button>
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
                    <th className="text-center" style={{ "widtd": "5%" }}>#</th>
                    <th >PID</th>
                    <th >Name</th>
                    <th>Encounter Count</th>
                    <th>Total Transfers</th>
                    <th>Successful Transfers</th>
                    <th>Last Visit</th>
                    <th>Creation Date</th>
                    <th style={{ "widtd": "5%" }}><input type='checkbox' role='switch' /></th>
                    <th >Views</th>
                  </tr>
                </thead>
                {console.log("vallllllllllll", detailsList)}
                {detailsList && detailsList.map((val, index) => {
                  return (
                    <tbody>
                      <tr>
                        <td className="text-center" style={{ "widtd": "5%" }}>{index + 1}</td>
                        <td >{val.pid}</td>
                        <td >{val.fname} {val.lname}</td>
                        <td >{val.enc_count}</td>
                        <td >{val.ccda_transfer_count}</td>
                        <td >{val.ccda_successfull_transfer_count}</td>
                        <td >{val.last_visit_date}</td>
                        <td >{val.patient_creation_date}</td>
                        <td style={{ "widtd": "5%" }}><input type='checkbox' role='switch' onChange={handlePatientSelectChange} /></td>
                        <td >
                          <div className="d-flex gap-1">
                            <i class="bi bi-calendar3" title="File One"></i>
                            <i class="bi bi-calendar3" title="File One"></i>
                          </div>
                        </td>
                      </tr>
                      {/* <tr>
                      <td className="text-center" style={{ "widtd": "5%" }}>1</td>
                      <td >1</td>
                      <td >tdor Odinson</td>
                      <td >1</td>
                      <td >0</td>
                      <td >0</td>
                      <td >2022-04-06</td>
                      <td >2022-04-06 14:28:54</td>
                      <td style={{ "widtd": "5%" }}><input type='checkbox' role='switch' /></td>
                      <td >
                        <div className="d-flex gap-1">
                          <i class="bi bi-calendar3" title="File One"></i>
                          <i class="bi bi-calendar3" title="File One"></i>
                        </div>
                      </td>
                    </tr> */}
                    </tbody>
                  )
                })}

              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="pagginationSection" style={{ marginTop: '11px' }}>
        <div className="paginationItemContainer">
          <div className="d-flex gap-2 align-items-center">
            <span className="spanText" style={{ minWidtd: '140px' }}>tde page you are on</span>
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
