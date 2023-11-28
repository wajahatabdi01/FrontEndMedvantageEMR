
export default async function SettingAPI(datas) {
    let sendData  = {
        "parameterId": 0,
        "parameterName": "string",
        "userId": 0
      }
    let url = "http://182.156.200.178:7087/api/ShowHideParametersForExternalDashboard/GetAllParameterForDashboard"
    let head={ 'Content-Type': 'application/json', 'accept': '*/*', };
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