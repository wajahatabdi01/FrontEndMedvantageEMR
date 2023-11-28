let GetTestList = async(key,clientId)=>{
    let url = window.RadiologyservicesUrl + "/api/RadiologyTestResult/GetListOfItemsForResultPerform?billNumber="+key+"&clientId="+clientId;
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
export default GetTestList;