export default async function GetPatientDetailsByUHID(uhid) {

    console.log("Fsdfh")
    let url = window.AppbaseUrl + "/api/PatientPersonalDashboard/GetPatientDetailsByUHID?UHID=" + uhid
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
