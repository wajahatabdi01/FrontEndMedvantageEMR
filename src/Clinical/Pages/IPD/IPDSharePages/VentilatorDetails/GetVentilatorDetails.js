const GetVentilatorDetails  = async(key,userID)=>{
    let url = window.AppbaseUrl + "/api/PatientVentilatorData/GetPatientVentilatorData?pmId="+key+"&userId="+userID
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "GET",
        headers: head,
        body: JSON.stringify(),
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
    
}
export default GetVentilatorDetails ;