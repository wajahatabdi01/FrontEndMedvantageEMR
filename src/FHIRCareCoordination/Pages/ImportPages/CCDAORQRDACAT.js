import React, { useEffect, useState } from 'react'
import ParseDocument from '../../API/ParseDocument';
import GetEachCCDAComponentDetails from '../../API/GetEachCCDAComponentDetails';
import GetDocumentDetails from '../../API/GetDocumentDetails';
import save from "../../../assets/images/icons/save.svg";

const CCDAORQRDACAT = () => {
    const [selectedFile, setSelectedFile] = useState("");
    const [parsedData, setParsedData] = useState([]);

    const handleChange = (e) => {
        setSelectedFile(e.target.files[0])
    };
    const handleParseData = async () => {
        // if (!selectedFile) {
        //     console.error('No file selected');
        //     return;
        // }

        const userData = JSON.parse(sessionStorage.getItem("LoginData"));
        console.log(userData);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('document_category', 13);
        formData.append('patient_id', 1);
        formData.append('upload', 1);
        formData.append('userId', userData.userId);


        const resp = await ParseDocument();
        if (resp) {
            setParsedData(resp.records);
        }
    };

    console.log('records', parsedData);


    const handleExpandCompDetailsClick = async (event) => {
        const target = event.target;
        const id = target.id;
        const my = target.parentNode;

        let amID = '';
        let component = '';
        let documentId = '';
        if (target.classList.contains('expandCompDetails')) {
            const arr = id.split('-');
            const clickedComponentClassList = target.classList;

            if (clickedComponentClassList.contains('se_in_23')) {
                clickedComponentClassList.add('se_in_24');
                clickedComponentClassList.remove('se_in_23');
                document.getElementById(`hideComp-${arr[1]}`).style.display = 'block';
                component = target.getAttribute('component');
                amID = target.getAttribute('amid');
                documentId = target.getAttribute('id');
            } else if (clickedComponentClassList.contains('se_in_24')) {
                clickedComponentClassList.add('se_in_23');
                clickedComponentClassList.remove('se_in_24');
                document.getElementById(`hideComp-${arr[1]}`).style.display = 'none';
            }
        }
        const formData = new FormData();
        formData.append('id', component + amID);
        formData.append('component', component);
        formData.append('amid', amID);

        const resp = await GetEachCCDAComponentDetails(formData);
        console.log('resp', resp);
        // my.append(resp);
        document.getElementById(documentId).innerHTML = resp;
    };

    const handleDataByDocumentId = async (documentId) => {
        const formData = new FormData();
        formData.append('document_id', documentId)
        const resp = await GetDocumentDetails(formData);
        console.log('viewData', resp);
        document.getElementById("dataView" + documentId).innerHTML = resp;
    };

    useEffect(()=>{
        handleParseData();
    }, []);
    return (
        <>
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
                    <div className="med-table-section accordion" style={{ "height": "74vh" }} >
                        <table className="med-table border_ striped v-top">
                            <thead>
                                <tr>
                                    <th>Toggle</th>
                                    <th className="text-center" style={{ "width": "5%" }}>#</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Date</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Owner</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Patient Name</th>
                                    <th className="text-center" style={{ "width": "5%" }}>DOB</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Race</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Ethnic</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Enc</th>
                                    <th className="text-center" style={{ "width": "5%" }}>CP</th>
                                    <th className="text-center" style={{ "width": "5%" }}>OB</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Proc</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Prob</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Med</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Match Found</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Matched Patient</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Duplicate</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Type</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Action</th>
                                </tr>
                            </thead>
                            {parsedData.length > 0 ?
                                <tbody >

                                    {parsedData && parsedData.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="accordion-header">
                                                    <button style={{ padding: '0', width: '0' }}
                                                        className="accordion-button collapsed expandCompDetails"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={"#dataView" + item.document_id}
                                                        aria-expanded="false"
                                                        aria-controls="panelsStayOpen-collapseOne"
                                                        onClick={() => handleDataByDocumentId(item.document_id)}
                                                    >
                                                    </button>
                                                </div>
                                                <div
                                                    id={"dataView" + item.document_id}
                                                    className="accordion-collapse collapse" onClick={handleExpandCompDetailsClick}>
                                                    <div className="accordion-body" >
                                                        {/* <Loader /> */}
                                                        <div style={{ position: 'absolute', bottom: '290px', left: '55%', transform: 'translateX(-50%)' }}>
                                                            <span class="loader"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="text-center">{index + 1}</td>
                                            <td>{item.date}</td>
                                            <td>{item.fname} {item.lname} </td>
                                            <td> {item.pat_name} </td>
                                            <td> {item.dob} </td>
                                            <td> {item.race} </td>
                                            <td> {item.ethnicity} </td>
                                            <td> {item.enc_count} </td>
                                            <td> {item.cp_count} </td>
                                            <td> {item.ob_count} </td>
                                            <td> {item.proc_count} </td>
                                            <td> {item.prb_count} </td>
                                            <td> {item.med_count} </td>
                                            <td> {item.matched_patient !== "" ? "Yes" : "No"} </td>
                                            <td> {item.matched_patient} </td>
                                            <td style={{ color: 'red' }}> {item.dupl_patient} </td>
                                            <td> {item.name} </td>
                                            <td>
                                                <div className="d-flex gap-1">
                                                    <i class="bi bi-intersect" title="File Merge" style={{cursor:'pointer'}}></i>
                                                    <i class="bi bi-calendar3" title="File Two" style={{cursor:'pointer'}}></i>
                                                    <i class="bi bi-person-fill" title="User" style={{cursor:'pointer'}}></i>
                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                : <div style={{ position: 'absolute', bottom: '290px', left: '55%', transform: 'translateX(-50%)' }}>
                                    <span class="loader"></span>
                                </div>
                            }
                        </table>
                    </div>


                </div>
            </div>
        </>
    )
};

export default CCDAORQRDACAT;