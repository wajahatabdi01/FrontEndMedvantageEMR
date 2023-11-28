export default async function PostADRClinicalNotification(obj) {
    let url = window.AppbaseUrl+'/api/ADRReport/patientClinicalNotification?age='+obj.age+'&gender='+obj.gender+'&jsonVitalDetails='+JSON.stringify(obj.jsonVitalDetails)+'&jsonInvestigationDetails='+JSON.stringify(obj.jsonInvestigationDetails)+'&jsonPrescriptionDetails='+JSON.stringify(obj.jsonPrescriptionDetails)+'&jsonSymptomDetails='+JSON.stringify(obj.jsonSymptomDetails);
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
    let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(),
    })
    .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}


