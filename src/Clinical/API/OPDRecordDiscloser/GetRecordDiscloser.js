async function GetRecordDiscloser(activePatient, encounterId) {
    let url = window.AppbaseUrl + "/api/FHIRRecordDisclosure/GetAllRecordDisclosure?Uhid="+activePatient+"&EncounterId="+encounterId;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, { 
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(activePatient);

    return response;
}
export default GetRecordDiscloser;