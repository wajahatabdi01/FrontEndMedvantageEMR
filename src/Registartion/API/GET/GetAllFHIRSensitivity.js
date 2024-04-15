async function GetAllFHIRSensitivity(data) {
    let url = window.AppbaseUrl + "/api/EMRSensitivityMaster/GetAllFHIRSensitivityMaster";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllFHIRSensitivity;