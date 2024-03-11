import React, { useEffect, useState } from 'react'
import IconEdit from '../../../../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../../../../assets/images/icons/IconDelete.svg'
import Heading from '../../../../../../Component/Heading'
import GetRecordDiscloser from '../../../../../API/OPDRecordDiscloser/GetRecordDiscloser'
function OPDViewDiscloserRecord() {
    let [recordList, setRecordList] = useState([])
    let activeUHID = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid:[]
    let getAllRecords = async () => {
        // let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        const response = await GetRecordDiscloser(activeUHID);
        if (response.status === 1) {
            setRecordList(response.responseValue);
        }
    }
    useEffect(() => {
        getAllRecords();
    }, []);

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
                            {recordList && recordList.map((list, ind) => {
                                return (
                                    <tr key={list.id}>
                                        <td className="text-center">{ind + 1}</td>
                                        <td>{list.providerName}</td>
                                        <td>{list.typeOfDisclosure}</td>
                                        <td>{list.descriptionOfTheDisclosure}</td>
                                        <td>{list.providerName}</td>
                                        <td>
                                            <div className="action-button">
                                                <div data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" title="Edit Row"><img src={IconEdit} alt='' /></div>
                                                <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} alt='' /></div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default OPDViewDiscloserRecord
