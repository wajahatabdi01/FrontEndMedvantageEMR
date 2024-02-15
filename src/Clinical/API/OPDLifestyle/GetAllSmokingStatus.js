async function GetAllSmokingStatus(activePatient) {
    let url = window.AppbaseUrl + "/api/FHIRsmokingStatusMaster/GetAllSmokingStatus";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, { 
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(activePatient);

    return response;
}
export default GetAllSmokingStatus;