export default async function PostVaccinationData(sendData){
    let url = window.AppbaseUrl + "/api/PatientVaccinationChart/InsertPatientVaccinationChart";
    let head = { 'Content-Type' : 'application/json', 'accept' : '*/*'};
    let response = "";
    await fetch (url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(sendData)
    })
    .then(res => res.json())
    .then(data => {response = data})
    .catch(error => {response = error})
    return response;
}