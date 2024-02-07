async function GetIssueSubType() {
    // let url = window.fhiropenEMR+'/api/FHIRIssueSubTypeMaster/GetAllIssueSubType'
    let url = window.AppbaseUrl+'/api/FHIRIssueSubTypeMaster/GetAllIssueSubType'
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data = {};
    let response = fetch(url,{
      headers: head,
      method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetIssueSubType;