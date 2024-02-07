import React from 'react';
import plus from '../../assets/images/icons/icons8-plus-30.png';
import editIcon from '../../assets/images/icons/icons8-pencil-30.png';
import deleteIcon from '../../assets/images/icons/icons8-delete-30.png'

export default function FHIRPrescreptionList() {
  return (
    <section className="main-content mt-5 pt-3">
      <div className='container-fluid'>
        <div className="row">
          <div className='col-12'>
             <div className='med-box'>
                <div className='inner-content'>
                  <div className="row">
                    <div className='fieldsett-in col-md-12'>
                      <div className='fieldsett'>
                        <div className='fieldse'>
                        <span className='fieldse'>Prescription List</span>
                        <div className='col-12 mt-2'>
                          <div className='med-table-section' style={{ maxHeight: "80vh" }}>
                            <table className='med-table striped' style={{ borderBottom: '1px solid #dddddd' }}>
                              <thead style={{ zIndex: '0' }}>
                                <tr>
                                  <th style={{ "width": "5%" }}>#</th>
                                  <th>Drug</th>
                                  <th>RxNorm</th>
                                  <th>Created Date</th>
                                  <th>Changed Date</th>
                                  <th>Dosage</th>
                                  <th>Qty.</th>
                                  <th>Unit</th>
                                  <th>Refills </th>
                                  <th>Provider</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td >
                                    <input type='checkbox' className='form-check text-center' />
                                  </td>
                                  <td>Doloracin with Lidocaine</td>
                                  <td>1432537</td>
                                  <td>2023-12-29</td>
                                  <td>2023-12-29</td>
                                  <td>1 in tablet b.i.d.</td>
                                  <td>10</td>
                                  <td>250 mg/1cc </td>
                                  <td>0</td>
                                  <td>Administrator Administrator</td>
                                  <td>
                                  <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 me-1" >
                            <img src={deleteIcon} className='icnn' alt='' /> Delete
                          </button>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}>
                                      <img src={editIcon} className='icnn' alt='' /> Edit
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td >
                                    <input type='checkbox' className='form-check text-center' />
                                  </td>
                                  <td>Doloracin with Lidocaine</td>
                                  <td>1432537</td>
                                  <td>2023-12-29</td>
                                  <td>2023-12-29</td>
                                  <td>1 in tablet b.i.d.</td>
                                  <td>10</td>
                                  <td>250 mg/1cc </td>
                                  <td>0</td>
                                  <td>Administrator Administrator</td>
                                  <td>
                                  <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 me-1" >
                            <img src={deleteIcon} className='icnn' alt='' /> Delete
                          </button>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}>
                                      <img src={editIcon} className='icnn' alt='' /> Edit
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>                            
                          </div>
                        </div>

                        <div className="col-12">
                        <div className='d-flex justify-content-end'>                                
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 mt-2" ><img src={plus} className='icnn' alt="" />Add</button>
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
  )
}
