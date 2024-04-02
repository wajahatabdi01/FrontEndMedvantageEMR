import React, { useState } from 'react'
import ParseDocument from '../../API/ParseDocument';
import GetEachCCDAComponentDetails from '../../API/GetEachCCDAComponentDetails';
import GetDocumentDetails from '../../API/GetDocumentDetails';
import save from "../../../assets/images/icons/save.svg";
import NoDataFound from "../../../assets/images/icons/No data-rafiki.svg"

const CCD = () => {
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

        const userData = JSON.parse(sessionStorage.getItem("LoginData"));
        console.log(userData);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('document_category', 12);
        formData.append('patient_id', 0);
        formData.append('upload', 1);
        formData.append('userId', userData.userId);


        const resp = await ParseDocument(formData);
        if (resp) {
            setParsedData(resp.records);
        }
    };


    
    return (
        <>
            <div class="title">CCD</div>
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
                        
                    </div>
                    <div className="med-table-section accordion" style={{ "height": "74vh" }} >
                        <table className="med-table border_ striped v-top">
                            <thead>
                                <tr>
                                   
                                    <th className="text-center" style={{ "width": "5%" }}>#</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Date</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Owner</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Patient Name</th>
                                    <th className="text-center" style={{ "width": "5%" }}>DOB</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Match Found</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Matched Patient</th>
                                    <th className="text-center" style={{ "width": "5%" }}>Action</th>
                                </tr>
                            </thead>
                            {parsedData.length > 0 ?
                                <tbody >

                                    {parsedData && parsedData.map((item, index) => (
                                        <tr key={index}>
                                           

                                            <td className="text-center">{index + 1}</td>
                                            <td>{item.date}</td>
                                            <td>{item.fname} {item.lname} </td>
                                            <td> {item.pat_name} </td>
                                            <td> {item.dob} </td>
                                            <td> {item.matched_patient !== "" ? "Yes" : "No"} </td>
                                            <td> {item.matched_patient} </td>
                                           
                                            <td>
                                            <i class="bi bi-calendar3" title="File Two"></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                :<div className='imageNoDataFound'>
                                                <img src={NoDataFound} alt="imageNoDataFound" />
                                            </div>}

                        </table>
                    </div>


                </div>
            </div>
        </>
    )
}

export default CCD