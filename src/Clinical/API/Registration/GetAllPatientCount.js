async function GetAllPatientCount(wardId) {
    let url = window.AppbaseUrl + `/api/PatientRegistration/GetAllPatientCount?userId=${window.userId}&headId=${wardId}`;
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
export default GetAllPatientCount;

