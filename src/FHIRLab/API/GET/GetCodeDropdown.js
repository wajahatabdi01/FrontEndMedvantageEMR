async function GetCodeDropdown() {
  let url = window.fhiropenEMR+"/api/FHIRCodeType/FHIRGetCodeList";
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetCodeDropdown;