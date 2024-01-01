import React, { useEffect } from 'react'
import Heading from '../../Component/Heading';
import TableContainer from '../../Component/TableContainer';
import visible from '../../assets/images/icons/visible.svg'
import { Link, useNavigate } from 'react-router-dom';

export default function LabNotificationReport() {

  const navigate = useNavigate();

  const funRedirectPage = (billNu) => {
    console.log('first')
    window.sessionStorage.setItem('billNu',billNu)
    navigate('/SampleCollection')
  }

  useEffect(() => {
    window.sessionStorage.setItem('billNu','')
  });

  return (
    <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
          <div className="row">
            <div className="col-12 mt-2">
              <div className='handlser'>
                <Heading text='Lab Notification Report' />

                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder='Search..' onChange={''} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer >
                  <thead>
                    <tr>
                      <th className="" style={{ "width": "5%" }}>S.No.</th>
                      <th>Bill Number</th>
                      <th>UHID</th>
                      <th>Date & Time</th>
                      <th style={{ "width": "10%" }} className="text-center" >Action</th>

                    </tr>
                  </thead>

                  <tbody>
                    {/* {notificationListSearch && notificationListSearch.map((val, ind) => {
                      console.log('val', val);
                      return (
                        <tr>
                          <td>{ind + 1}</td>
                          <td>{val.date}</td>
                          <td>{val.comingFrom}</td>
                          <td>{JSON.parse(val.prescriptionDetails).doctorName}</td>
                          <td className=''>
                            <div className='action-button '>
                              {val.isSent === 0 ? <div data-bs-toggle='modal' className='btn-sm' data-bs-placement='bottom' data-bs-target="#ViewPrescriptionModal" title='View Prescription' onClick={''}>
                                <a href='#top'> <img src={visible} style={{ 'width': '20px', 'border-radius': '5px' }} alt='' />
                                </a></div>
                                :
                                <div className='btn-sm' title='Prescription sent' >
                                  <a href='#top'> <img src={visible} style={{ 'width': '20px', 'border-radius': '5px', 'opacity': 0.3 }} alt='' />
                                  </a></div>
                              }

                            </div>
                          </td>

                        </tr>
                      )
                    })} */}
                    <tr>
                          <td>1</td>
                          <td>12-11-2023</td>
                          <td>Test</td>
                          <td>Dr. Test</td>
                          <td className=''>
                            <div className='action-button '>
                            <div className='btn-sm' title='Prescription sent' >
                            <img src={visible} style={{ 'width': '20px', 'border-radius': '5px',}} alt='' onClick={() => funRedirectPage('1B-0099999')}/>
                                 </div>

                            </div>
                          </td>

                        </tr>

                  </tbody>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}
