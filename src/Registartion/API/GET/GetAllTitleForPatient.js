async function GetAllTitleForPatient(data) {
    let url = window.AppbaseUrl + "/api/FHIRTitleMaster/GetAllTitleForPatient";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllTitleForPatient;