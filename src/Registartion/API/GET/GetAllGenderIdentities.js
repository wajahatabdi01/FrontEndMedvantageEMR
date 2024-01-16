async function GetAllGenderIdentities(data) {
    let url = window.fhirAdminEMR + "/api/FHIRGenderIdentity/GetAllGenderIdentities";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllGenderIdentities;