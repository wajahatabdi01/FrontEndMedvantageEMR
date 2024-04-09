async function GetFHIRImmunizationManufacturer() {
  let url = window.AppbaseUrl+"/api/EMRImmunizationMaster/GetFHIRImmunizationManufacturer";
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetFHIRImmunizationManufacturer;