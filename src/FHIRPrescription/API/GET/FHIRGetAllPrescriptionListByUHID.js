async function FHIRGetAllPrescriptionListByUHID(uhid, clientId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/FHIRGetAllPrescriptionListByUHID";
  let url = window.AppbaseUrl+"/api/FHIRPrescription/GetAllPrescription?Uhid="+uhid+"&ClientId="+clientId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default FHIRGetAllPrescriptionListByUHID;