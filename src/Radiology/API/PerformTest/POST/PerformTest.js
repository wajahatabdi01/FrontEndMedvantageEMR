let PerformTest = async(params)=>{
    let url = window.RadiologyservicesUrl + "/api/RadiologyTestResult/InsertRadiologyTestResult";
    // let url = window.RadiologyservicesUrl + "/api/RadiologyTestResult/InsertRadiologyTestResult?JsonData="+params.JsonData+"&UHID="+params.UHID+"&billNumber="+params.billNumber+"&pmID="+params.pmID+"&testId="+params.testId+"&normalRangeText="+params.normalRangeText+"&impression="+params.impression+"&resultRemark="+params.resultRemark+"&userID="+params.userID;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(params),
    }).then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
export default PerformTest;