import { useEffect, useState } from "react";
import save from "../../assets/images/icons/save.svg";
import ParseDocument from "../API/ParseDocument";
import NoDataFound from '../../assets/images/icons/No data-rafiki.svg';
const FHIRCareCoordinationImport = () => {
    const [selectedFile, setSelectedFile] = useState("");
    const [parsedData, setParsedData] = useState([
        {
            "records": [
                {
                    "amid": "674",
                    "name": "CCDA",
                    "fname": "Administrator",
                    "lname": "Administrator",
                    "imported": "1",
                    "size": "13282",
                    "date": "2024-03-20 10:51:51",
                    "couch_docid": null,
                    "couch_revid": null,
                    "file_url": "file://C:/xamppLatest/htdocs/openemr7/sites/default/documents/00/8405/9b9ba79b-88a1-4a21-96cc-ba5d15123f6f",
                    "document_id": "1509",
                    "document_data": "{\"xsd\":[],\"errorCount\":1,\"warningCount\":0,\"ignoredCount\":5,\"errors\":[{\"type\":\"error\",\"test\":\"count(cda:informationRecipient)=1\",\"simplifiedTest\":null,\"description\":\"SHALL contain exactly one [1..1] informationRecipient (CONF:4444-16703_C01).\",\"line\":1,\"path\":\"\/ClinicalDocument[1]\",\"patternId\":\"QRDA_Category_I_Report_CMS-pattern-errors\",\"ruleId\":\"QRDA_Category_I_Report_CMS-errors\",\"assertionId\":\"a-4444-16703_C01-error\",\"context\":\"cda:ClinicalDocument[cda:templateId[@root='2.16.840.1.113883.10.20.24.1.3'][@extension='2020-02-01']]\",\"xml\":\"<ClinicalDocument xmlns:xsi=\\\"http:\/\/www.w3.org\/2001\/XMLSchema-instance\\\" xmlns=\\\"urn:hl7-org:v3\\\" xmlns:voc=\\\"urn:hl7-org:v3\/voc\\\" xmlns:sdtc=\\\"urn:hl7-org:sdtc\\\"><!-- QRDA Header --><realmCode code=\\\"US\\\"\/><t...\"}],\"warnings\":[],\"ignored\":[{\"errorMessage\":\"XPath parse error\",\"type\":\"error\",\"test\":\"@typeCode=document('voc.xml')\/voc:systems\/voc:system[@valueSetOid='2.16.840.1.113883.1.11.19601']\/voc:code\/@value\",\"simplifiedTest\":\"@typeCode(='PRF' or ='SPRF' or ='PPRF')\",\"description\":\"The performer, if present, SHALL contain exactly one [1..1] @typeCode, which SHALL be selected from ValueSet x_ServiceEventPerformer urn:oid:2.16.840.1.113883.1.11.19601 STATIC (CONF:1198-14840).\",\"patternId\":\"US_Realm-pattern-errors\",\"ruleId\":\"US_Realm-documentationOf-serviceEvent-performer-errors\",\"assertionId\":\"a-1198-14840-error\",\"context\":\"cda:ClinicalDocument[cda:templateId[@root='2.16.840.1.113883.10.20.22.1.1'][@extension='2015-08-01']]\/cda:documentationOf\/cda:serviceEvent\/cda:performer\"},{\"errorMessage\":\"Undeclared variable: $n\",\"type\":\"error\",\"test\":\"not(@extension) or $n = 10\",\"simplifiedTest\":null,\"description\":\"The NPI should have 10 digits. (CONF: CMS_0115)\",\"patternId\":\"p-validate_NPI_format-errors\",\"ruleId\":\"r-validate_NPI_format-errors\",\"assertionId\":\"a-CMS_0115-error\",\"context\":\"\/\/cda:id[@root='2.16.840.1.113883.4.6']\"},{\"errorMessage\":\"Undeclared variable: $s\",\"type\":\"error\",\"test\":\"not(@extension) or number($s)=$s\",\"simplifiedTest\":null,\"description\":\"The NPI should be composed of all digits. (CONF: CMS_0116)\",\"patternId\":\"p-validate_NPI_format-errors\",\"ruleId\":\"r-validate_NPI_format-errors\",\"assertionId\":\"a-CMS_0116-error\",\"context\":\"\/\/cda:id[@root='2.16.840.1.113883.4.6']\"},{\"errorMessage\":\"Undeclared variable: $s\",\"type\":\"error\",\"test\":\"not(@extension) or number(substring($s, $n, 1)) = (10 - ($sum mod 10)) mod 10\",\"simplifiedTest\":null,\"description\":\"The NPI should have a correct checksum, using the Luhn algorithm. (CONF: CMS_0117)\",\"patternId\":\"p-validate_NPI_format-errors\",\"ruleId\":\"r-validate_NPI_format-errors\",\"assertionId\":\"a-CMS_0117-error\",\"context\":\"\/\/cda:id[@root='2.16.840.1.113883.4.6']\"},{\"errorMessage\":\"Undeclared variable: $timeZoneExists\",\"type\":\"error\",\"test\":\"string-length(normalize-space(@value)) <= 8 or (parent::node()[parent::node()[parent::node()[cda:act[cda:templateId[@root='2.16.840.1.113883.10.20.17.3.8.1'][@extension='2016-03-01']]]]]) or ($timeZoneExists=(contains(normalize-space(@value), '-') or contains(normalize-space(@value), '+'))) or @nullFlavor\",\"simplifiedTest\":null,\"description\":\"A Coordinated Universal Time (UTC time) offset should not be used anywhere in a QRDA Category I file or, if a UTC time offset is needed anywhere, then it must be specified everywhere a time field is provided (CONF: CMS_0121).\",\"patternId\":\"p-validate_TZ-errors\",\"ruleId\":\"r-validate_TZ-errors\",\"assertionId\":\"a-CMS_0121-error\",\"context\":\"\/\/cda:time[@value] | \/\/cda:effectiveTime[@value] | \/\/cda:time\/cda:low[@value] | \/\/cda:time\/cda:high[@value] | \/\/cda:effectiveTime\/cda:low[@value] | \/\/cda:effectiveTime\/cda:high[@value]\"}]}",
                    "is_qrda_document": "1",
                    "is_unstructured_document": "0",
                    "ad_lname": "Garcia",
                    "ad_fname": "Emily",
                    "dob_raw": "19610301080000",
                    "enc_count": "1",
                    "prb_count": "0",
                    "cp_count": "0",
                    "ob_count": "0",
                    "proc_count": "0",
                    "med_count": "0",
                    "race": "1002-5",
                    "ethnicity": "hisp_or_latin",
                    "pid": "262",
                    "pat_name": "Garcia Emily",
                    "dob": "1961-03-01",
                    "matched_patient": "Garcia Emily",
                    "dupl_patient": "Matched Demographic and DOB"
                },
                {
                    "amid": "674",
                    "name": "CCDA",
                    "fname": "Administrator",
                    "lname": "Administrator",
                    "imported": "1",
                    "size": "13282",
                    "date": "2024-03-20 10:51:51",
                    "couch_docid": null,
                    "couch_revid": null,
                    "file_url": "file://C:/xamppLatest/htdocs/openemr7/sites/default/documents/00/8405/9b9ba79b-88a1-4a21-96cc-ba5d15123f6f",
                    "document_id": "1509",
                    "document_data": "{\"xsd\":[],\"errorCount\":1,\"warningCount\":0,\"ignoredCount\":5,\"errors\":[{\"type\":\"error\",\"test\":\"count(cda:informationRecipient)=1\",\"simplifiedTest\":null,\"description\":\"SHALL contain exactly one [1..1] informationRecipient (CONF:4444-16703_C01).\",\"line\":1,\"path\":\"\/ClinicalDocument[1]\",\"patternId\":\"QRDA_Category_I_Report_CMS-pattern-errors\",\"ruleId\":\"QRDA_Category_I_Report_CMS-errors\",\"assertionId\":\"a-4444-16703_C01-error\",\"context\":\"cda:ClinicalDocument[cda:templateId[@root='2.16.840.1.113883.10.20.24.1.3'][@extension='2020-02-01']]\",\"xml\":\"<ClinicalDocument xmlns:xsi=\\\"http:\/\/www.w3.org\/2001\/XMLSchema-instance\\\" xmlns=\\\"urn:hl7-org:v3\\\" xmlns:voc=\\\"urn:hl7-org:v3\/voc\\\" xmlns:sdtc=\\\"urn:hl7-org:sdtc\\\"><!-- QRDA Header --><realmCode code=\\\"US\\\"\/><t...\"}],\"warnings\":[],\"ignored\":[{\"errorMessage\":\"XPath parse error\",\"type\":\"error\",\"test\":\"@typeCode=document('voc.xml')\/voc:systems\/voc:system[@valueSetOid='2.16.840.1.113883.1.11.19601']\/voc:code\/@value\",\"simplifiedTest\":\"@typeCode(='PRF' or ='SPRF' or ='PPRF')\",\"description\":\"The performer, if present, SHALL contain exactly one [1..1] @typeCode, which SHALL be selected from ValueSet x_ServiceEventPerformer urn:oid:2.16.840.1.113883.1.11.19601 STATIC (CONF:1198-14840).\",\"patternId\":\"US_Realm-pattern-errors\",\"ruleId\":\"US_Realm-documentationOf-serviceEvent-performer-errors\",\"assertionId\":\"a-1198-14840-error\",\"context\":\"cda:ClinicalDocument[cda:templateId[@root='2.16.840.1.113883.10.20.22.1.1'][@extension='2015-08-01']]\/cda:documentationOf\/cda:serviceEvent\/cda:performer\"},{\"errorMessage\":\"Undeclared variable: $n\",\"type\":\"error\",\"test\":\"not(@extension) or $n = 10\",\"simplifiedTest\":null,\"description\":\"The NPI should have 10 digits. (CONF: CMS_0115)\",\"patternId\":\"p-validate_NPI_format-errors\",\"ruleId\":\"r-validate_NPI_format-errors\",\"assertionId\":\"a-CMS_0115-error\",\"context\":\"\/\/cda:id[@root='2.16.840.1.113883.4.6']\"},{\"errorMessage\":\"Undeclared variable: $s\",\"type\":\"error\",\"test\":\"not(@extension) or number($s)=$s\",\"simplifiedTest\":null,\"description\":\"The NPI should be composed of all digits. (CONF: CMS_0116)\",\"patternId\":\"p-validate_NPI_format-errors\",\"ruleId\":\"r-validate_NPI_format-errors\",\"assertionId\":\"a-CMS_0116-error\",\"context\":\"\/\/cda:id[@root='2.16.840.1.113883.4.6']\"},{\"errorMessage\":\"Undeclared variable: $s\",\"type\":\"error\",\"test\":\"not(@extension) or number(substring($s, $n, 1)) = (10 - ($sum mod 10)) mod 10\",\"simplifiedTest\":null,\"description\":\"The NPI should have a correct checksum, using the Luhn algorithm. (CONF: CMS_0117)\",\"patternId\":\"p-validate_NPI_format-errors\",\"ruleId\":\"r-validate_NPI_format-errors\",\"assertionId\":\"a-CMS_0117-error\",\"context\":\"\/\/cda:id[@root='2.16.840.1.113883.4.6']\"},{\"errorMessage\":\"Undeclared variable: $timeZoneExists\",\"type\":\"error\",\"test\":\"string-length(normalize-space(@value)) <= 8 or (parent::node()[parent::node()[parent::node()[cda:act[cda:templateId[@root='2.16.840.1.113883.10.20.17.3.8.1'][@extension='2016-03-01']]]]]) or ($timeZoneExists=(contains(normalize-space(@value), '-') or contains(normalize-space(@value), '+'))) or @nullFlavor\",\"simplifiedTest\":null,\"description\":\"A Coordinated Universal Time (UTC time) offset should not be used anywhere in a QRDA Category I file or, if a UTC time offset is needed anywhere, then it must be specified everywhere a time field is provided (CONF: CMS_0121).\",\"patternId\":\"p-validate_TZ-errors\",\"ruleId\":\"r-validate_TZ-errors\",\"assertionId\":\"a-CMS_0121-error\",\"context\":\"\/\/cda:time[@value] | \/\/cda:effectiveTime[@value] | \/\/cda:time\/cda:low[@value] | \/\/cda:time\/cda:high[@value] | \/\/cda:effectiveTime\/cda:low[@value] | \/\/cda:effectiveTime\/cda:high[@value]\"}]}",
                    "is_qrda_document": "1",
                    "is_unstructured_document": "0",
                    "ad_lname": "Garcia",
                    "ad_fname": "Emily",
                    "dob_raw": "19610301080000",
                    "enc_count": "1",
                    "prb_count": "0",
                    "cp_count": "0",
                    "ob_count": "0",
                    "proc_count": "0",
                    "med_count": "0",
                    "race": "1002-5",
                    "ethnicity": "hisp_or_latin",
                    "pid": "263",
                    "pat_name": "Garcia Emily",
                    "dob": "1961-03-01",
                    "matched_patient": "Garcia Emily",
                    "dupl_patient": "Matched Demographic and DOB"
                }
            ],
            "category_id": "13",
            "file_location": "14_Emily_Garcia.xml",
            "patient_id": "00",
            "listenerObject": {}
        }
    ]);

    // const [parsedData, setParsedData] = useState([{
    //     "data": [
    //         {
    //             "record_id": 674,
    //             "document_name": "CCDA",
    //             "imported_by": "Administrator Administrator",
    //             "file_size": "13282",
    //             "import_date": "2024-03-20 10:51:51",
    //             "file_url": "file://C:/xamppLatest/htdocs/openemr7/sites/default/documents/00/8405/9b9ba79b-88a1-4a21-96cc-ba5d15123f6f",
    //             "document_id": "1509",
    //             "errors": [
    //                 {
    //                     "type": "error",
    //                     "test": "count(cda:informationRecipient)=1",
    //                     "description": "SHALL contain exactly one [1..1] informationRecipient (CONF:4444-16703_C01).",
    //                     "line": 1
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "XPath parse error",
    //                     "description": "The performer, if present, SHALL contain exactly one [1..1] @typeCode, which SHALL be selected from ValueSet x_ServiceEventPerformer urn:oid:2.16.840.1.113883.1.11.19601 STATIC (CONF:1198-14840)."
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "Undeclared variable: $n",
    //                     "description": "The NPI should have 10 digits. (CONF: CMS_0115)"
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "Undeclared variable: $s",
    //                     "description": "The NPI should be composed of all digits. (CONF: CMS_0116)"
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "Undeclared variable: $s",
    //                     "description": "The NPI should have a correct checksum, using the Luhn algorithm. (CONF: CMS_0117)"
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "Undeclared variable: $timeZoneExists",
    //                     "description": "A Coordinated Universal Time (UTC time) offset should not be used anywhere in a QRDA Category I file or, if a UTC time offset is needed anywhere, then it must be specified everywhere a time field is provided (CONF: CMS_0121)"
    //                 }
    //             ],
    //             "patient_details": {
    //                 "last_name": "Garcia",
    //                 "first_name": "Emily",
    //                 "dob": "1961-03-01",
    //                 "encounter_count": "1",
    //                 "problem_count": "0",
    //                 "procedure_count": "0",
    //                 "medication_count": "0",
    //                 "race": "1002-5",
    //                 "ethnicity": "hisp_or_latin",
    //                 "patient_id": "262",
    //                 "matched_patient": "Garcia Emily",
    //                 "duplicate_status": "Matched Demographic and DOB"
    //             }
    //         },
    //         {
    //             "record_id": "674",
    //             "document_name": "CCDA",
    //             "imported_by": "Administrator Administrator",
    //             "file_size": "13282",
    //             "import_date": "2024-03-20 10:51:51",
    //             "file_url": "file://C:/xamppLatest/htdocs/openemr7/sites/default/documents/00/8405/9b9ba79b-88a1-4a21-96cc-ba5d15123f6f",
    //             "document_id": "1509",
    //             "errors": [
    //                 {
    //                     "type": "error",
    //                     "test": "count(cda:informationRecipient)=1",
    //                     "description": "SHALL contain exactly one [1..1] informationRecipient (CONF:4444-16703_C01).",
    //                     "line": 1
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "XPath parse error",
    //                     "description": "The performer, if present, SHALL contain exactly one [1..1] @typeCode, which SHALL be selected from ValueSet x_ServiceEventPerformer urn:oid:2.16.840.1.113883.1.11.19601 STATIC (CONF:1198-14840)."
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "Undeclared variable: $n",
    //                     "description": "The NPI should have 10 digits. (CONF: CMS_0115)"
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "Undeclared variable: $s",
    //                     "description": "The NPI should be composed of all digits. (CONF: CMS_0116)"
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "Undeclared variable: $s",
    //                     "description": "The NPI should have a correct checksum, using the Luhn algorithm. (CONF: CMS_0117)"
    //                 },
    //                 {
    //                     "type": "error",
    //                     "test": "Undeclared variable: $timeZoneExists",
    //                     "description": "A Coordinated Universal Time (UTC time) offset should not be used anywhere in a QRDA Category I file or, if a UTC time offset is needed anywhere, then it must be specified everywhere a time field is provided (CONF: CMS_0121)"
    //                 }
    //             ],
    //             "patient_details": {
    //                 "last_name": "Garcia",
    //                 "first_name": "Emily",
    //                 "dob": "1961-03-01",
    //                 "encounter_count": "1",
    //                 "problem_count": "0",
    //                 "procedure_count": "0",
    //                 "medication_count": "0",
    //                 "race": "1002-5",
    //                 "ethnicity": "hisp_or_latin",
    //                 "patient_id": "263",
    //                 "matched_patient": "Garcia Emily",
    //                 "duplicate_status": "Matched Demographic and DOB"
    //             }
    //         }
    //     ],
    //     "category_id": "13",
    //     "file_location": "14_Emily_Garcia.xml",
    //     "patient_id": "00"
    // }
    // ]);
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

        // const resp = await ParseDocument(formData);
        // if (resp.status === 1) {
        //     setParsedData(resp.data.field_name_value_array.patient_data);
        // }
    };


    useEffect(() => {
        console.log('data', parsedData);
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
                                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                                <table className="med-table border_ striped">
                                                    <thead>
                                                        <tr>
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
                                                    <tbody>
                                                        {parsedData && parsedData[0].records.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
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
                                                                <td> {item.dupl_patient} </td>
                                                                <td> {item.name} </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
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
                                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                                <table className="med-table border_ striped">
                                                    <thead>
                                                        <tr>
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
                                                    <tbody>
                                                        {parsedData && parsedData[0].records.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
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
                                                                <td> {item.dupl_patient} </td>
                                                                <td> {item.name} </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
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
                                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                                <table className="med-table border_ striped">
                                                    <thead>
                                                        <tr>
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
                                                    <tbody>
                                                        {parsedData && parsedData[0].records.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
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
                                                                <td> {item.dupl_patient} </td>
                                                                <td> {item.name} </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>


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