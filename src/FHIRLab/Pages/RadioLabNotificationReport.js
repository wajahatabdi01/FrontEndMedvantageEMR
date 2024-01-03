import { useNavigate } from 'react-router-dom';
import Heading from '../../Component/Heading';
import TableContainer from '../../Component/TableContainer';
import visible from '../../assets/images/icons/visible.svg'
import GetLabNotificationReportData from '../API/GET/GetLabNotificationReportData';
import { useEffect, useState } from 'react';
import Search from '../../Code/Serach';

export const RadioLabNotificationReport = () => {
    const [radioData, setRadioData] = useState([]);
    const [radioDataSearch, setRadioDataSearch] = useState([]);
    const navigate = useNavigate();

    const funRedirectPage = (billNumber) => {
        window.sessionStorage.setItem('radioLabBillNumber', billNumber);
        navigate('/Perform-Test/');
    };

    const getData = async () => {
        const radioResp = await GetLabNotificationReportData(3);        
        if (radioResp.status === 1) {
            setRadioData(radioResp.responseValue);
            setRadioDataSearch(radioResp.responseValue);
        }
    };

    const handleSearch = (e) =>{
        let resp = Search(radioData, e.target.value);
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setRadioDataSearch(resp)
            }
            else {
                setRadioDataSearch([])
      
            }
          }
          else {
            setRadioDataSearch(radioData)
          }
    };
    useEffect(() => {
        getData();
        window.sessionStorage.setItem('radioLabBillNumber', '');
    }, []);
    return (
        <section className="main-content mt-5 pt-3">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-2">
                        <div className='handlser'>
                            <Heading text='Radio Lab Notification Report' />

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
                                    {
                                        radioDataSearch && radioDataSearch.map((list, ind) => {
                                            return (
                                                <tr>
                                                    <td>{ind+1}</td>
                                                    <td>{list.uhid}</td>
                                                    <td>{list.billNo}</td>
                                                    <td>{list.billDateTime}</td>                                                    
                                                    <td className=''>
                                                        <div className='action-button '>
                                                            <div className='btn-sm' title='Prescription sent' >
                                                                <img src={visible} style={{ 'width': '20px', 'border-radius': '5px', }} alt='' onClick={() => funRedirectPage(list.billNo)} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
