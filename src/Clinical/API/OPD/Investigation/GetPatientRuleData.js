async function GetPatientRuleData(data) {
    let url = window.AppbaseUrlNew + "/api/EMRPatientRuleData/GetPatientRuleData";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetPatientRuleData;