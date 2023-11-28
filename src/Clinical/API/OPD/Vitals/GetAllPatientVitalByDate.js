async function GetAllPatientVitalByDate(date, uhid ) {

    let url = window.AppbaseUrl+`/api/PatientVital/GetAllPatientVitalByDate?Date=${date}&UHID=${uhid}`;
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
export default GetAllPatientVitalByDate;