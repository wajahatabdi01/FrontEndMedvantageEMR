async function GetHealthViewABGAnalysis(uhid) {

    let url = window.LabServicebaseUrl+`/api/HealthViewABGAnalysis/GetAllHealthViewABGAnalysisData?UhID=${uhid}`;
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
export default GetHealthViewABGAnalysis;