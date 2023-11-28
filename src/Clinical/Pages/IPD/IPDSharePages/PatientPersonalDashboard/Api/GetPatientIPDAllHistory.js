let GetPatientIPDAllHistory = async (UHID,userID)=>{
    let url = window.AppbaseUrl + '/api/PatientIPDPrescription/PatientIPDAllHistory?UhId='+UHID+'&UserId='+userID+'&clientId='+window.clientId;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetPatientIPDAllHistory;