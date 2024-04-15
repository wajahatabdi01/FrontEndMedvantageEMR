async function GetAllImmunizationObservationList(id) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetAllImmunizationObservationList";
  let url = window.AppbaseUrl+"/api/EMRImmunization/GetAllImmunizationObservationData?Id="+id;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetAllImmunizationObservationList;