export default async function GetPatientDetailsByUHID(uhid, headId = 0) {
    let url = window.AppbaseUrl + "/api/PatientPersonalDashboard/GetPatientDetailsByUHID?UHID=" + uhid + "&HeadId=" + headId
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
    let responsonse = "";
    await fetch(url, {
        method: "GET",
        headers: head,
        // body: JSON.stringify(sendData),
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
