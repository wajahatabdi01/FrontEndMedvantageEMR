async function GetHealthViewPTVitals(uhid) {

    let url = window.AppbaseUrl+`/api/HealthViewPatientVitals/GetAllHealthViewPatientVitals?UhID=${uhid}`;
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
export default GetHealthViewPTVitals;