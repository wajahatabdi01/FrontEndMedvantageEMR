export default async function POSTOPDPatientPrescription(sendData) {
   
   
    let url = window.AppbaseUrl+"/api/PatientPrescription/InsertPatientOPDPrescription"
    let head={ 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
   let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(sendData),
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })

    
    return responsonse
}
