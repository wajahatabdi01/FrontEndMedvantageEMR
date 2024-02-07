async function GetAllImmunizationData(uhid) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetAllImmunizationData";
  let url = window.AppbaseUrl+"/api/FHIRImmunization/GetAllImmunizationData?Uhid="+uhid;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetAllImmunizationData;