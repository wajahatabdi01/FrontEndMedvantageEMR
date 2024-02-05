import { useEffect, useState } from "react";
import save from "../../assets/images/icons/save.svg";
import ParseDocument from "../API/ParseDocument";
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg';
const FHIRCareCoordinationImport = () => {
    const [selectedFile, setSelectedFile] = useState("");
    const [parsedData, setParsedData] = useState([]);
    const handleChange = (e) => {
        setSelectedFile(e.target.files[0])
    };
    const handleParseData = async () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        const resp = await ParseDocument(formData);
        if (resp.status === 1) {
            setParsedData(resp.data.field_name_value_array.patient_data);
        }
    };


    useEffect(() => {

    }, []);
    return (
        <>
            <div className='orders-navtabs'>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="CCD-tab" data-bs-toggle="tab" data-bs-target="#CCD" type="button" role="tab" aria-controls="CCD" aria-selected="true">CCD</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="CCR-tab" data-bs-toggle="tab" data-bs-target="#CCR" type="button" role="tab" aria-controls="CCR" aria-selected="false">CCR</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="CCDAORQRDACAT1-tab" data-bs-toggle="tab" data-bs-target="#CCDAORQRDACAT1" type="button" role="tab" aria-controls="CCDAORQRDACAT1" aria-selected="false">CCDA OR QRDA CAT1</button>
                    </li>
                </ul>
            </div>
            <div class="tab-content" id="myTabContent">
                {/* --------------------------------Start CCD Section-------------------------------------------- */}
                <div class="tab-pane fade show active intab" id="CCD" role="tabpanel" aria-labelledby="CCD-tab">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="med-box">
                                    <div class="title">CCD</div>
                                    <div className="inner-content">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="d-flex flex-wrap gap-3 align-content-end">
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label">Choose File</label>
                                                        <input className="form-control form-control-sm" id="chooseFile" type="file" />
                                                    </div>


                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-outline-success">Import <i className="bi bi-arrow-down-short"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className='d-flex justify-content-end'>
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <div class="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" id="Ascending" value="option1" />
                                                            <label className="form-check-label" for="Ascending">Ascending</label>
                                                        </div>
                                                    </div>

                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" ><img src={save} className='icnn' alt='' />Save</button>
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
                {/* -----------------------------------End CCD Section---------------------------------------------- */}

                {/* -----------------------------------Start CCR Section---------------------------------------------- */}

                <div class="tab-pane fade intab" id="CCR" role="tabpanel" aria-labelledby="CCR-tab">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="med-box">
                                    <div class="title">CCR</div>
                                    <div className="inner-content">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="d-flex flex-wrap gap-3 align-content-end">
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label">Choose File</label>
                                                        <input className="form-control form-control-sm" id="chooseFile" type="file" />
                                                    </div>


                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-outline-success">Import <i className="bi bi-arrow-down-short"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className='d-flex justify-content-end'>
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <div class="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" id="Ascending" value="option1" />
                                                            <label className="form-check-label" for="Ascending">Ascending</label>
                                                        </div>
                                                    </div>

                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" ><img src={save} className='icnn' alt='' />Save</button>
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
                {/* -----------------------------------Enf CCR Section---------------------------------------------- */}

                {/* -----------------------------------Start CCDAORQRDACAT1 Section---------------------------------------------- */}

                <div class="tab-pane fade intab" id="CCDAORQRDACAT1" role="tabpanel" aria-labelledby="CCDAORQRDACAT1-tab">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="med-box">
                                    <div class="title">CCDA or QRDA CAT I</div>
                                    <div className="inner-content">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="d-flex flex-wrap gap-3 align-content-end">
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label">Choose File</label>
                                                        <input className="form-control form-control-sm" id="chooseFile" type="file" onChange={handleChange} />
                                                    </div>


                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-outline-success" onClick={handleParseData}>Import <i className="bi bi-arrow-down-short"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className='d-flex justify-content-end'>
                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <div class="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" id="Ascending" value="option1" />
                                                            <label className="form-check-label" for="Ascending">Ascending</label>
                                                        </div>
                                                    </div>

                                                    <div class="mb-2">
                                                        <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                                        <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" ><img src={save} className='icnn' alt='' />Save</button>
                                                    </div>


                                                </div>
                                            </div>
                                            {parsedData.length > 0 ? 
                                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                                <table className="med-table border_ striped">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Title</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>First Name</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Middle Name</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Last Name</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Suffix</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>DOB</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Sex</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>PubPid</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>ReferrerID</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Street</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Street Line 2</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>City</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>State</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Postal Code</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Country Code</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Phone Home</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Status</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Religion</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Race</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Ethnicity</th>
                                                            <th className="text-center" style={{ "width": "5%" }}>Language</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {parsedData && parsedData.map((list, index) => {
                                                            return (
                                                                <>
                                                                    <td>{index + 1}</td>
                                                                    <td>{list.title}</td>
                                                                    <td>{list.fname}</td>
                                                                    <td>{list.mname}</td>
                                                                    <td>{list.lname}</td>
                                                                    <td>{list.suffix}</td>
                                                                    <td>{list.DOB}</td>
                                                                    <td>{list.sex}</td>
                                                                    <td>{list.pubpid}</td>
                                                                    <td>{list.referrerID}</td>
                                                                    <td>{list.street}</td>
                                                                    <td>{list.street_line_2}</td>
                                                                    <td>{list.city}</td>
                                                                    <td>{list.state}</td>
                                                                    <td>{list.postal_code}</td>
                                                                    <td>{list.country_code}</td>
                                                                    <td>{list.phone_home}</td>
                                                                    <td>{list.status}</td>
                                                                    <td>{list.religion}</td>
                                                                    <td>{list.race}</td>
                                                                    <td>{list.ethnicity}</td>
                                                                    <td>{list.language}</td>
                                                                </>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div> : <div className='imageNoDataFound' style={{ marginTop: '68px' }}><img src={NoDataFound} alt="imageNoDataFound" /></div>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* -----------------------------------Enf CCDAORQRDACAT1 Section---------------------------------------------- */}
            </div>

        </>
    )
}

export default FHIRCareCoordinationImport