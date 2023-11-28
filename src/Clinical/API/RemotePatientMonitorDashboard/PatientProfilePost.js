export default async function PatientProfilePost(sendData) {
   
    let {userId} = JSON.parse(window.sessionStorage.getItem('LoginData'))
    let url = window.PatientMonitorDashboardAPI+"/api/PatientPersonalDetailsForExternal/PatientPersonalDetailsForExternal"
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
