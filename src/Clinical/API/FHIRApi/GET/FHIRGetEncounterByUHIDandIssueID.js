async function FHIRGetEncounterByUHIDandIssueID(uhid, issueID) {
  console.log('uhid : ', uhid);
  console.log('issueID : ', typeof(issueID));
  let url = window.AppbaseUrl+"/api/FHIREncounter/GetAllEncounters?Uhid="+uhid+"&Issueid="+issueID;

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default FHIRGetEncounterByUHIDandIssueID;
