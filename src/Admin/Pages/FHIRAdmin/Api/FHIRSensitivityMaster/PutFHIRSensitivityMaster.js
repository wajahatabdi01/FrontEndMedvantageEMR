async function PutFHIRSensitivityMaster(data) {
    let url = window.AppbaseUrl + '/api/EMRSensitivityMaster/UpdateFHIRSensitivityMaster';
    let token = window.SuperAdminToken;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
        'Authorization': token
    }


    let response = 
    await fetch(url, {
        method: 'PUT',
        headers: head,
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then(data)

    return response;
}
export default PutFHIRSensitivityMaster