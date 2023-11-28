export default async function  GetVaccineList() {
    let url = window.AppbaseUrl + "/api/PatientVaccinationChart/GetAllVaccineName";
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