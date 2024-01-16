async function GetAllIndustryData(data) {
    let url = window.fhiropenEMR + "/api/FHIRIndustryMaster/GetAllIndustryData";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllIndustryData;