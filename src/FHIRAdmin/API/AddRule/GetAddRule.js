let GetAddRule = async () => {
    let url = window.fhiropenEMR + '/api/FHIRRuleMaster/GetAllRuleMaster';
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', }
    let response = "";
    await fetch(url, {
        method: 'GET',
        headers: head
    }).then((res) => res.json()).then(data => { response = data }).catch(error => { response = error });
    return response;
}
export default GetAddRule;