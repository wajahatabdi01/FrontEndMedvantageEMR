async function GetFamilyHistoryData(activePatient,HistoryType) {
    let url = window.AppbaseUrl + "/api/FHIRHistoryData/GetFamilyHistoryData?Uhid="+activePatient+"&HistoryType="+HistoryType;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, { 
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(activePatient,HistoryType);

    return response;
}
export default GetFamilyHistoryData;