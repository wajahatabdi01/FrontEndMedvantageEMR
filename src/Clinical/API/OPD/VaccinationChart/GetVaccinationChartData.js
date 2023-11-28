async function GetVaccinationChartData(uhid) {

    let url = window.AppbaseUrl+`/api/PatientVaccinationChart/GetAllPatientVaccinationChartData?UHID=${uhid}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = await fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetVaccinationChartData;