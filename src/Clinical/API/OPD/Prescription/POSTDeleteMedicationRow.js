export default async function POSTDeleteMedicationRow(sendData) {
    let url = window.AppbaseUrl + "/api/PatientPrescription/DeleteMedicine"
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
    let responsonse = "";
    await fetch(url, {
        method: "DELETE",
        headers: head,
        body: JSON.stringify(sendData),
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
