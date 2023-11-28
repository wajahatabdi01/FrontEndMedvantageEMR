let GetTestData = async(params)=>{
    let url = window.RadiologyservicesUrl + "/api/ValidateRadiologyTest/GetAllRadiologyTestResultAndParameterForValidation?testResultRowId="+params.key+"&userId="+params.userID+"&clientId="+params.clientId;
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
export default GetTestData;