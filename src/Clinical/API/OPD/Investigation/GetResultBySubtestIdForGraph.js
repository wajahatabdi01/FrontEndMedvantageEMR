async function GetResultBySubtestIdForGraph(objectData) {

    let url = window.LabServicebaseUrl + `/api/PatientInvestigation/GetResultBySubtestIdForGraph?UHID=${objectData.uhid}&subtestID=${objectData.subtest}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetResultBySubtestIdForGraph;