import React, { useEffect, useState } from 'react'
import ParseDocument from '../../API/ParseDocument';
import GetEachCCDAComponentDetails from '../../API/GetEachCCDAComponentDetails';
import ViewDocument from '../../API/ViewDocuments';
import GetDocumentDetails from '../../API/GetDocumentDetails';
import save from "../../../assets/images/icons/save.svg";
import styles  from "./carecoordination_style.css";
const CCDAORQRDACAT = () => {
    const [selectedFile, setSelectedFile] = useState("");
    const [parsedData, setParsedData] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isListLoading, setIsListLoading] = useState(false);
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
        setIsListLoading(true);

        const resp = await ParseDocument();
        setIsListLoading(false);
        if (resp) {
            setParsedData(resp.records);
           
        }
    };
    const addAsNewPatient = async (amId,document_id) => {
        // if (!selectedFile) {
        //     console.error('No file selected');
        //     return;
        // }

        const userData = JSON.parse(sessionStorage.getItem("LoginData"));
        console.log(userData);
        const formData = new FormData();
        // formData.append('file', selectedFile);
        formData.append('action', 'add_new_patient');
        formData.append('am_id', amId);
        formData.append('document_id', document_id);
        formData.append('userId', userData.userId);


        const resp = await ParseDocument(formData);
        if (resp) {
            setParsedData(resp.records);
        }
    };
    const UndoImports = async () => {
        // if (!selectedFile) {
        //     console.error('No file selected');
        //     return;
        // }

        const userData = JSON.parse(sessionStorage.getItem("LoginData"));
        console.log(userData);
        const formData = new FormData();
        // formData.append('file', selectedFile);
        formData.append('delete_all_imports', true);
        // formData.append('am_id', amId);
        // formData.append('document_id', document_id);
        formData.append('userId', userData.userId);


        const resp = await ParseDocument(formData);
        if (resp) {
            setParsedData(resp.records);
        }
    };
    console.log('records', parsedData);
    const getEachCCDAComponentDetails = async (index, component, amid) => {
        const formData = new FormData();
        formData.append('id', component + amid);
        formData.append('component', component);
        formData.append('amid', amid);

        const resp = await GetEachCCDAComponentDetails(formData);
        if( document.getElementById('hideComp-'+index))
        {
            document.getElementById('hideComp-'+index).innerHTML = resp;
        }
       
    };

   
    const handleExpandCompDetailsClick = async (event) => {
        // const target = event.target;
        // const id = target.id;
        // const my = target.parentNode;

        // let amID = '';
        // let component = '';
        // let documentId = '';
        // if (target.classList.contains('expandCompDetails')) {
        //     const arr = id.split('-');
        //     const clickedComponentClassList = target.classList;

        //     if (clickedComponentClassList.contains('se_in_23')) {
        //         clickedComponentClassList.add('se_in_24');
        //         clickedComponentClassList.remove('se_in_23');
        //         document.getElementById(`hideComp-${arr[1]}`).style.display = 'block';
        //         component = target.getAttribute('component');
        //         amID = target.getAttribute('amid');
        //         documentId = target.getAttribute('id');
        //     } else if (clickedComponentClassList.contains('se_in_24')) {
        //         clickedComponentClassList.add('se_in_23');
        //         clickedComponentClassList.remove('se_in_24');
        //         document.getElementById(`hideComp-${arr[1]}`).style.display = 'none';
        //     }
        // }
        // const formData = new FormData();
        // formData.append('id', component + amID);
        // formData.append('component', component);
        // formData.append('amid', amID);

        // const resp = await GetEachCCDAComponentDetails(formData);
        // console.log('resp', resp);
        // // my.append(resp);
        // document.getElementById(documentId).innerHTML = resp;


        const id = event.target.id;
        const arr = id.split('-');
        const component = event.target.getAttribute('component');
        const amid = event.target.getAttribute('amid');
        if (isExpanded && event.target.classList.contains('se_in_23')) {
            event.target.classList.add("se_in_24");
            event.target.classList.remove("se_in_23");
            if(document.getElementById('hideComp-' + arr[1]))
            {
                document.getElementById('hideComp-' + arr[1]).style.display = 'block';
            }
            
            getEachCCDAComponentDetails(arr[1], component, amid);
          } else if ( isExpanded && event.target.classList.contains('se_in_24')) {
            event.target.classList.add("se_in_23");
            event.target.classList.remove("se_in_24");
            if( document.getElementById('hideComp-' + arr[1]))
            {
                document.getElementById('hideComp-' + arr[1]).style.display = 'none';
            }
       
          }
    };

    const getCCDAComponents = async (id) => {
        const formData = new FormData();
        formData.append('document_id', id);
        const resp = await GetDocumentDetails(formData);
        document.getElementById("hide_" + id).innerHTML = resp;
    }

    const handleDataByDocumentId = async (event) => {
        const id = event.target.id;
        const arr = id.split('_');
        var element = document.getElementById(id);
        console.log(id);
        console.log(event.target.classList.contains('se_in_24'));
        // if (event.target.classList.contains('se_in_23')) {
            if(!isExpanded) {
                setIsExpanded(true);
        //   event.target.classList.remove('se_in_23');
          element.classList.remove('se_in_23');
        //   event.target.classList.add('se_in_24');
          element.classList.add('se_in_24');
          document.getElementById('hide_' + arr[1]).style.display = 'block';
          getCCDAComponents(arr[1]);
        } 
        else {
        // if (event.target.classList.contains('se_in_24')) {
            console.log(arr[1]);
            setIsExpanded(false);
          event.target.classList.remove('se_in_24');
          event.target.classList.add('se_in_23');
          document.getElementById('hide_' + arr[1]).style.display = 'none';
        }
        // const formData = new FormData();
        // formData.append('document_id', documentId)
        // const resp = await GetDocumentDetails(formData);
        // console.log('viewData', resp);
        // document.getElementById("dataView" + documentId).innerHTML = resp;
    };
    const viewDocument = async (documentId) => {
       // var ddd= '{"status":0,"message":"failure","responseValue":"The given key userID was not present in the dictionary....}';
       
    
        const resView = await ViewDocument(documentId);
        console.log(resView);
        if(resView.length == 0){
        
            const jsonResponse = JSON.parse(resView);
            const status = jsonResponse.status;
            if (status === 0) {
              alert('Data not available.');
              // You can choose to show an alert or handle this case in another way
              return;
          }
        }    
          else{
            let newWindow = window.open('', '_blank');
            newWindow.document.write(resView);
          }

        }
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

                            {!isListLoading ?
                             <div class="mb-2">
                                <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                <button type="button" className="btn btn-outline-success" onClick={handleParseData}>Import <i className="bi bi-arrow-down-short"></i></button>
                            </div>
                        :
                        <div class="mb-2">
                                <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
                                </div>    
                        }
                            
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className='d-flex justify-content-end'>
                            <div class="mb-2">
                                <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                {/* <div class="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="Ascending" value="option1" />
                                    <label className="form-check-label" for="Ascending">Ascending</label>
                                </div> */}
                            </div>
                            <div class="mb-2">
                                <label for="chooseFile" className="form-label d-block">&nbsp;</label>
                                <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" onClick={UndoImports}><img src={save} className='icnn' alt='' />Undo Imports</button>
                            </div>
                            

                        </div>
                    </div>
                    {parsedData.length > 0 ?
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
                        
                                <tbody onClick={handleExpandCompDetailsClick}>

                                    {parsedData && parsedData.map((item, index) => (
                                            <React.Fragment key={index}>
                                         <tr >
                                            
                                            <td id={"expandAuditDetails_" + item.amid + "-" + item.pid}  class="expandAuditDetails se_in_23"  onClick={(event) => handleDataByDocumentId(event)}></td>
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
                                                {item.matched_patient !== "" ? (   <i class="bi bi-intersect" title="Review And Approve" style={{cursor:'pointer'}}></i> ) : (<i class="bi bi-intersect" title="Merge To Any Patient" style={{cursor:'pointer'}}></i>)}
                                                    <i class="bi bi-calendar3" title="View Details" style={{cursor:'pointer'}} onClick={() => viewDocument(item.document_id)}></i>
                                                    <i class="bi bi-person-fill" title="Add As New Patient" style={{cursor:'pointer'}} onClick={() => addAsNewPatient(item.amid,item.document_id)}></i>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                        <td colspan="9" id = {"hide_" + item.amid  + "-" + item.pid } class="imported_ccda_details" style={{ display: 'none' }}></td>
                                    </tr>
                                       </React.Fragment>
                                    )
                                    )
                                    }
                                </tbody>
                               
                        </table>
                    </div>
                    : <div class="se_in_8">
                   {/* <div id="uploadFlash" style={{"padding-top":"35px;", "height": "60px;", "width": "60%;", "margin-left": "auto;", "margin-right": "auto;", "margin-bottom": "1rem;", "border": "1px solid #CCCCCC;", "text-align":"center;", "font-size": "15px;", "font-weight": "bold;", "background": "#f7f7f7;"}}> */}
                    <span id="uploadFlashText">Nothing to display</span>
                {/* </div> */}
                </div>
            }

                </div>
            </div>
        </>
    )
};

export default CCDAORQRDACAT;