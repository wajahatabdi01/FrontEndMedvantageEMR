let InsertPrescriptionNotification = async (obj)=>{
    let url = window.PharmacyServicesUrl  + '/api/PrescriptionNotification/InsertPrescriptionNotification';
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'POST',
        body:JSON.stringify(obj)
    }).then((res) => res.json()).then(data);

    return response;
}
export default InsertPrescriptionNotification;