async function FHIRGetAllForm(uhid) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/FHIRGetAllForm";
  let url = window.AppbaseUrl+"/api/EMRFormMaster/GetAllForm";
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default FHIRGetAllForm;