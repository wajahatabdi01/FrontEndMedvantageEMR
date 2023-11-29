
import React, { useEffect, useState } from 'react';
import Heading from '../../../Component/Heading';

export const CodeMaster = () => {
    let [bedData, setBeddata] = useState([])
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
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


    const handleChange = () => { }
    const handleSearch = () => { }
    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Code Master</div>
                                {/* <div className="title">{content} </div> */}
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2">
                                            <select className='form-select form-select-sm'>
                                                <option value='0'>test 1</option>
                                                <option value='1'>test 2</option>
                                            </select>
                                        </div>

                                        <div className="mb-2 relative">
                                            <input type='checkbox' />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;<span>Include Inactive</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <div className='handlser'>
                                <Heading text="Code Master" />

                                <div style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: 1, marginRight: "20px" }}>
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
                                    </div>

                                    <div>
                                        {/* Items per page select box */}
                                        <label>Show</label>
                                        <select>
                                            <option value={15}>15</option>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                            {/* Add more options based on your needs */}
                                        </select>
                                        <label>Entries</label>
                                    </div>
                                </div>

                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>

                                            <th className="text-center" style={{ "width": "5%" }}> Code </th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination controls */}
                            <nav>
                                <ul className="pagination">
                                    {/* {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                                        <li key={index + 1} className={currentPage === index + 1 ? 'active' : ''}>
                                            <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                                        </li>
                                    ))} */}
                                    <button >1</button>
                                    <button >2</button>
                                    <button >3</button>
                                    <button >4  </button>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>





        </>
    )   
}







