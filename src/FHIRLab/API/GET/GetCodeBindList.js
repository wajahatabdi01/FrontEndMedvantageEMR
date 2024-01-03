async function GetCodeBind(code, textSearch) {
  var url = (textSearch === '' || textSearch === undefined || textSearch === null) 
  ? window.fhiropenEMR + "/api/FHIRCodeType/FHIRGetCodeTableData?CodeType=" + code
  : window.fhiropenEMR + "/api/FHIRCodeType/FHIRGetCodeTableData?SearchCodeText="+textSearch+"&CodeType="+code;

  
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetCodeBind;