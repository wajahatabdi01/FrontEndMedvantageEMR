
import React, { useEffect, useState } from 'react';
import Heading from '../../../Component/Heading';
import Delete from '../../../assets/images/icons/delete.svg'
import GetCodeDropdown from '../../../FHIRLab/API/GET/GetCodeDropdown';
import GetCodeBind from '../../../FHIRLab/API/GET/GetCodeBindList';

export const CodeMaster = (props) => {
    
    const [getCodeList, setCodeList] = useState([])
    const [getCodeBindList, setCodeBindList] = useState([])
//     const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   // Calculate the index range for the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Change items per page
//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to the first page when changing items per page
//   };

//////////////////////////////////// to Get Code list in dropdown
let funGetCode =async () => {
     const getResponse = await GetCodeDropdown();
     setCodeList(getResponse.responseValue)
}

/////////////////////////////////////// To Bind the list of code from dropdown ////////////////////////
let funBindCodeList = async (code) =>{
    const getBindRes = await GetCodeBind(code);
    setCodeBindList(getBindRes.responseValue)
    console.log('getBindRes : ', getBindRes)
}

useEffect(() => {
    funGetCode();
},[])
    return (
        <>
            <section className="main-content pt-3 mt-5" style={props.style}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Code Master</div>
                                {/* <div className="title">{content} </div> */}
                                <div className="inner-content">
                                <div className="d-flex flex-wrap align-content-end">
                                     <div className="mb-2 me-2">
                                        <select className='form-select form-select-sm' style={{ width: '179px' }} onChange={(event) => funBindCodeList(event.target.value)}>
                                        <option value='0'>Select Code</option>
                                        {getCodeList && getCodeList.map((list, ind) => (
                                            <option key={ind} value={list.codeId}>{list.codeName}</option>
                                        ))}
                                        </select>
                                    </div>
                                    <div className="mb-2 me-2">
                                        <input type="text" className='form-control form-control-sm' placeholder="Search..." onChange={''} />
                                    </div>
                                    <div className='mb-2 me-2'>
                                        <img src={Delete} alt='' title='Delete' style={{ cursor: 'pointer' }} />
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <div className='handlser'>
                                <Heading text="Code Master" />

                                <div style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    {/* <div style={{ display: 'flex', flexDirection: 'row', gap: 1, marginRight: "20px" }}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="Search"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                        <span >
                                            <i className="fas fa-search"></i>
                                        </span>
                                    </div> */}
                                    

                                    {/* <div>
                                       
                                        <label>Show</label>
                                        <select>
                                            <option value={15}>15</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                           
                                        </select>
                                        <label>Entries</label>
                                    </div> */}
                                </div>

                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>

                                            <th className="text-center" style={{ "width": "5%" }}> Code </th>
                                            <th>Description</th>
                                            <th style={{ position: 'relative', width: '180px' }}>
                                                <input type="text" className='form-control form-control-sm' placeholder="Search..." onChange={''} />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCodeBindList && getCodeBindList.map((bindList, ind) =>{
                                            return(
                                                <tr key={bindList.code}>
                                                    <td style={{textAlign: 'center'}}>{bindList.code}</td>
                                                    <td>{bindList.code_text}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination controls */}
                            {/* <nav>
                                <ul className="pagination">
                                    
                                    <button >1</button>
                                    <button >2</button>
                                    <button >3</button>
                                    <button >4  </button>
                                </ul>
                            </nav> */}
                        </div>
                    </div>
                </div>
            </section>





        </>
    )   
}







