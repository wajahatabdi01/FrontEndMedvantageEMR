let GetViewPlanRules = async () => {
    // let url = window.fhiropenEMR + '/api/FHIRPlanMaster/GetPlan';
    let url = window.AppbaseUrl + '/api/FHIRPlanMaster/GetPlan';
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', }
    let response = "";
    await fetch(url, {
        method: 'GET',
        headers: head
    }).then((res) => res.json()).then(data => { response = data }).catch(error => { response = error });
    return response;
}
export default GetViewPlanRules;