let GetDataByTestID = async(key,clientId)=>{
    console.log('clientId : ', clientId)
    let url = window.RadiologyservicesUrl + "/api/RadiologyTestResult/GetOrgansAndParameterForRadiologyTest?testId="+key+"&clientId="+clientId;
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
export default GetDataByTestID;