const InsertPlanRule = async (params) => {
    let url = window.fhiropenEMR + "/api/FHIRPlanRuleMapping/InsertPlanRule";
    let head = { 'Content-Type': 'application/JSON', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(params),
    }).then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
export default InsertPlanRule;