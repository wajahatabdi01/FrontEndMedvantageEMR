async function GetCodeBind(code) {
  let url = window.fhiropenEMR+"/api/FHIRCodeType/FHIRGetCodeTableData?CodeType="+code;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetCodeBind;