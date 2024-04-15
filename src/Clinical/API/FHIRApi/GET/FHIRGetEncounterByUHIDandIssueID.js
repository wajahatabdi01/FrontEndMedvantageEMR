async function FHIRGetEncounterByUHIDandIssueID(uhid, issueID, encounterId) {
  let url = window.AppbaseUrl+"/api/EMREncounter/GetAllEncounters?Uhid="+uhid+"&Issueid="+issueID+"&EncounterId="+encounterId;

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default FHIRGetEncounterByUHIDandIssueID;
