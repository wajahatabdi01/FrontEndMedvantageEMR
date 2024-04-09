async function GetAllImmunizationData(uhid,encounterId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetAllImmunizationData";
  let url = window.AppbaseUrl+"/api/EMRImmunization/GetAllImmunizationData?Uhid="+uhid+"&EncounterId="+encounterId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetAllImmunizationData;