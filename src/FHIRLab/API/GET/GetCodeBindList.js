async function GetCodeBind(code, textSearch) {
  var url = (textSearch === '' || textSearch === undefined || textSearch === null) 
  ? window.AppbaseUrl + "/api/FHIRCodeType/CheckCodeTypeService?codeType=" + code
  : window.AppbaseUrl + "/api/FHIRCodeType/CheckCodeTypeService?codeType="+code+"&search_term="+textSearch;

  
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetCodeBind;