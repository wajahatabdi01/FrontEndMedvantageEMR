async function GetAllVarificationStatus(data) {
    let url = window.fhiropenEMR + "/api/ConditionVerificationStatusCodesMaster/GetAll";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllVarificationStatus;