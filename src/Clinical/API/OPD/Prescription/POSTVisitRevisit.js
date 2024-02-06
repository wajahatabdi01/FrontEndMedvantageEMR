export default async function POSTVisitRevisit(sendData) {
    // let url = window.AppbaseUrl+"/api/PatientPrescription/VisitRevisit"
    let url = window.AppbaseUrl+"/api/PatientPrescription/VisitRevisit"
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
