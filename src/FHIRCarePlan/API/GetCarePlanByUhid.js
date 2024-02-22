async function GetCarePlanByUhid(uhid) {
  // let url = window.fhiropenEMR+"/api/FHIRCarePlanTypeMaster/GetAllCarePlanType";
  let url = window.AppbaseUrl+"/api/FHIRPatientCarePlan/GetAllPatientCarePlan?Uhid="+uhid;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetCarePlanByUhid;