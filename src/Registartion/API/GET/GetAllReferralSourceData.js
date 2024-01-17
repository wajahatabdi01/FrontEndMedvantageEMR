async function GetAllReferralSourceData(data) {
    let url = window.fhiropenEMR + "/api/FHIRReferralSourceMaster/GetAllReferralSourceData";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllReferralSourceData;