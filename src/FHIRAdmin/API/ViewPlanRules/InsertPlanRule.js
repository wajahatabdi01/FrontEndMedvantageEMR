const InsertPlanRule = async (JsonPlanRuleDetails) => {
    // let url = window.fhiropenEMR + "/api/FHIRPlanRuleMapping/InsertPlanRule";
    let url = window.fhiropenEMR + `/api/FHIRPlanRuleMapping/InsertPlanRule?JsonPlanRuleDetails=${JsonPlanRuleDetails}`;
    let head = { 'Content-Type': 'application/JSON', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(JsonPlanRuleDetails),
    }).then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
export default InsertPlanRule;