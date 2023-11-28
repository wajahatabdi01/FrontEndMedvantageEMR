async function GetPrescriptionRecordForPopUp(rowId){
    let url = window.PharmacyServicesUrl+"/api/ActionPrescriptionNotification/GetByPrescriptionNotificationId?pnid="+rowId;
    let head = {'Content-Type' : 'application/JSON', accept: '*/*'};
    let data = {};

    let response = await fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}

export default GetPrescriptionRecordForPopUp;