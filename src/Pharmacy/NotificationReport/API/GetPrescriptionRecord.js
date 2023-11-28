async function GetPrescriptionRecord(){
    let url = window.PharmacyServicesUrl+"/api/PrescriptionNotification/GetAllPrescriptionNotification";
    let head = {'Content-Type' : 'application/JSON', accept: '*/*'};
    let data = {};

    let response = await fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}

export default GetPrescriptionRecord;