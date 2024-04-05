async function FHIRGetAllPrescriptionListByUHID(uhid, clientId, encounterId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/FHIRGetAllPrescriptionListByUHID";
  let url = window.AppbaseUrlNew+"/api/EMRPrescription/GetAllPrescription?Uhid="+uhid+"&ClientId="+clientId+"&EncounterId="+encounterId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default FHIRGetAllPrescriptionListByUHID;