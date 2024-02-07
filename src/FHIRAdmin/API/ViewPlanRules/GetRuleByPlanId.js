let GetRuleByPlanId = async (PlanId) => {
    // let url = window.fhiropenEMR + '/api/FHIRPlanRuleMapping/GetRuleByPlanId?PlanId=' + PlanId;
    let url = window.AppbaseUrl + '/api/FHIRPlanRuleMapping/GetRuleByPlanId?PlanId=' + PlanId;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', }
    let response = "";
    await fetch(url, {
        method: 'GET',
        headers: head
    }).then((res) => res.json()).then(data => { response = data }).catch(error => { response = error });
    return response;
}
export default GetRuleByPlanId;