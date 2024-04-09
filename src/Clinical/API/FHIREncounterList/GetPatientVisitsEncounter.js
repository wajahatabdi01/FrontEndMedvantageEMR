async function GetPatientVisitsEncounter(uhid) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetPatientVisitsEncounter";
  let url = window.AppbaseUrl+"/api/EMRDemographicData/GetPatientVisits?Uhid="+uhid;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetPatientVisitsEncounter;