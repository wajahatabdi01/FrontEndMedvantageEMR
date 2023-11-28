async function GetSubTestNameForGraph(objectData) {

    let url = window.LabServicebaseUrl + `/api/PatientInvestigation/GetSubTestNameForGraph?UHID=UHID00181`;
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
export default GetSubTestNameForGraph;