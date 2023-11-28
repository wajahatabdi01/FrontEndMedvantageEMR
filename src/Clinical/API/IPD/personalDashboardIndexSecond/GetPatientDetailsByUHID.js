async function GetPatientDetailsByUHID(uhid) {

    let url = window.AppbaseUrl+`/api/PatientPersonalDashboard/GetPatientDetailsByUHID?UHID=${uhid}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetPatientDetailsByUHID;