async function GetFamilyHistoryData(param) {
    let url = window.AppbaseUrl + "/api/EMRHistoryData/GetFamilyHistoryData?Uhid=" + param.Uhid + "&HistoryType=" + param.HistoryType + "&EncounterId=" + param.EncounterId + "&ClientId=" + param.ClientId;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(param);

    return response;
}
export default GetFamilyHistoryData;