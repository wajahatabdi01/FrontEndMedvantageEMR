let GetListForPrint = async(val,clientId)=>{
    let url = window.RadiologyservicesUrl + "/api/Print/GetListForPrintResult?isDuplicate="+val+"&clientId="+clientId;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "GET",
        headers: head,
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
export default GetListForPrint;