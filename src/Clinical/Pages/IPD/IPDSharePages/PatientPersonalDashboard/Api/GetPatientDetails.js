let GetPatientDetails = async (UHID, clientId)=>{
    let url = window.AppbaseUrl + '/api/PatientPersonalDashboard/GetPatientDetailsByUHID?UHID='+UHID+"&ClientId="+JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetPatientDetails;