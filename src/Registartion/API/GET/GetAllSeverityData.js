async function GetAllSeverityData(data) {
    let url = window.AppbaseUrl + "/api/FHIRSeverityMaster/GetAllSeverityData";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllSeverityData;