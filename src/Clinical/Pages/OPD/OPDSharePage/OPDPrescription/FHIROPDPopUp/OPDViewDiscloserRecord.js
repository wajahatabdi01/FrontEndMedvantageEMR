import React from 'react'
import IconEdit from '../../../../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../../../../assets/images/icons/IconDelete.svg'
import Heading from '../../../../../../Component/Heading'
function OPDViewDiscloserRecord() {
    return (
        <>
            <div className="col-12 mt-1">
                <div className='handlser'>
                    <Heading text="Disclosure List" />
                    {/* <Heading text={content} /> */}
                    <div style={{ position: 'relative' }}>
                        <input type="text" className='form-control form-control-sm' placeholder="Search" value={""} onChange={"handleSearch"} />
                        <span className="tblsericon"><i class="fas fa-search"></i></span>
                    </div>
                </div>
                <div className="med-table-section mt-3" style={{ "height": "74vh" }}>
                    <table className="med-table border_ striped">
                        <thead>
                            <tr>
                                <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                <th>Recipient Name</th>
                                <th>Disclosure Type</th>
                                <th>Description</th>
                                <th>Provider</th>
                                <th style={{ "width": "10%" }} className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td className="text-center">{1}</td>
                                <td>Test</td>
                                <td>Health Care Operations</td>
                                <td>2024-02-09 11:09:00</td>
                                <td>Administrator Administrator</td>
                                <td>
                                    <div className="action-button">
                                        <div data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" title="Edit Row"><img src={IconEdit} alt='' /></div>
                                        <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt='' /></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center">{2}</td>
                                <td>Test</td>
                                <td>Health Care Operations</td>
                                <td>2024-02-09 11:09:00</td>
                                <td>Administrator Administrator</td>
                                <td>
                                    <div className="action-button">
                                        <div data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" title="Edit Row"><img src={IconEdit} alt='' /></div>
                                        <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt='' /></div>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default OPDViewDiscloserRecord
