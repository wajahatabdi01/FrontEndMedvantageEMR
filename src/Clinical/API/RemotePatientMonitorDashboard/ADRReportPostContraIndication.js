export default async function ADRReportPostContraIndication(sendData) {
    // let sendData = { "medicineId": medicineId.toString(), "problemId": problemId.toString() }
    // let {userId} = JSON.parse(window.sessionStorage.getItem('LoginData'))
    let url = window.AppbaseUrl + "/api/ADRReport/getContraIndication"
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
