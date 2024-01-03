import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading';
import TableContainer from '../../Component/TableContainer';
import visible from '../../assets/images/icons/visible.svg'
import { Link, useNavigate } from 'react-router-dom';
import GetLabNotificationReportData from '../API/GET/GetLabNotificationReportData';
import Search from '../../Code/Serach';

export default function PathologyNotificationReport() {

  const [billList, setBillList] = useState([]);
  const [billListSearch, setBillListSearch] = useState([]);

  const navigate = useNavigate();

  const funRedirectPage = (billNu) => {
    window.sessionStorage.setItem('billNu',billNu)
    navigate('/SampleCollection')
  }

  const funGetBillList = async () => {
    
    const getRes = await GetLabNotificationReportData(1);
    if(getRes.status === 1){
      setBillList(getRes.responseValue);
      setBillListSearch(getRes.responseValue)
    }
    
  }

  const handleSearch = (e) =>{
    let resp = Search(billList, e.target.value);
    if (e.target.value !== "") {
        if (resp.length !== 0) {
            setBillListSearch(resp)
        }
        else {
            setBillListSearch([])
  
        }
      }
      else {
        setBillListSearch(billList)
      }
};

  useEffect(() => {
    funGetBillList();
    window.sessionStorage.setItem('billNu','')
  },[]);

  return (
    <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
          <div className="row">
            <div className="col-12 mt-2">
              <div className='handlser'>
                <Heading text='Pathology Notification Report' />

                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder='Search..' onChange={handleSearch} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer >
                  <thead>
                    <tr>
                      <th className="" style={{ "width": "5%" }}>#</th>
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
                    {billListSearch && billListSearch.map((list, ind) => {
                      return(
                        <tr key={ind+1}>
                          <td>{ind+1}</td>
                          <td>{list.billNo}</td>
                          <td>{list.uhid}</td>
                          <td>{list.billDateTime}</td>
                          <td className=''>
                            <div className='action-button '>
                            <div className='btn-sm' title='Prescription sent' >
                            <img src={visible} style={{ 'width': '20px', 'border-radius': '5px',}} alt='' onClick={() => funRedirectPage(list.billNo)}/>
                                 </div>

                            </div>
                          </td>
                        </tr>
                      )
                    })}                    
                  </tbody>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}
