export default async function ADRReportPost(sendData) {
    // console.log("medici", medicineId, "problem", problemId)
    // let sendData = { "medicineId": medicineId.toString(), "problemId": problemId.toString() }
    // let {userId} = JSON.parse(window.sessionStorage.getItem('LoginData'))
    console.log("Fsdfh")
    let url = window.AppbaseUrl + "/api/ADRReport/sideEffectChecker"
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
