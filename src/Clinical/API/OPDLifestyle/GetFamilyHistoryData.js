async function GetFamilyHistoryData(param) {
    let url = window.AppbaseUrl + "/api/FHIRHistoryData/GetFamilyHistoryData?Uhid="+param.Uhid+"&HistoryType="+param.HistoryType;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, { 
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(param);

    return response;
}
export default GetFamilyHistoryData;