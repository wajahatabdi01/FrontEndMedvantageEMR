export default async function SaveModality(obj) {
    let url = window.PatientMonitorDashboardAPI+'/api/PatientPersonalDetailsForExternal/SaveModality';
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
    let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(obj),
    })
    .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}

