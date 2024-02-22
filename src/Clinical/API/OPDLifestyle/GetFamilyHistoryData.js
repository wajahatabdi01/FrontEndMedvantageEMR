async function GetFamilyHistoryData(activePatient) {
    let url = window.AppbaseUrl + "/api/FHIRHistoryData/GetFamilyHistoryData?Uhid="+activePatient+"&HistoryType="+2;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, { 
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(activePatient);

    return response;
}
export default GetFamilyHistoryData;