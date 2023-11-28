export default async function GetSubTestListForDashboard(activeUHID, categoryId) {
    // console.log("dsadas")
    let url = window.LabServicebaseUrl + "/api/SubTestListForDashboard/GetSubTestListForDashboard?UHID=" + activeUHID + "&categoryId=" + categoryId
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
    let responsonse = "";
    await fetch(url, {
        method: "GET",
        headers: head,
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
