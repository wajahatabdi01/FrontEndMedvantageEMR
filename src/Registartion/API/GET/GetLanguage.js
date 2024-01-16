let GetLanguage = async () => {
    const url = window.fhirAdminEMR + "/api/LanguageMaster/GetAllLanguageMaster";
    const head = { 'content-type': 'application/json', 'accept': '*/*', }
    let data = {};
    let response = await fetch(url, {
        method: "GET",
        header: head,
    }).then(res => res.json()).then(data);
    return response;
}
export default GetLanguage;