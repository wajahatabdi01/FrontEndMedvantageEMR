export default async function ADRReportDrugInteraction(sendData) {
    // let sendData = { "medicineId": medicineId.toString(),}
    // let {userId} = JSON.parse(window.sessionStorage.getItem('LoginData'))
    console.log("cdjkc")
    let url = window.AppbaseUrl + "/api/ADRReport/getDrugIntraction"
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
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
