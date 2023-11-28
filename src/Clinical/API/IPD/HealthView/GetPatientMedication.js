async function GetPatientMedication(uhid) {

    let url = window.AppbaseUrl+`/api/PatientMedication/GetAllPatientMedication?UhID=${uhid}`;
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
export default GetPatientMedication;