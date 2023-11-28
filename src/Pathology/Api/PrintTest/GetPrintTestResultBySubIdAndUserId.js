let GetPrintTestResultBySubIdAndUserId = async (obj,clientId) => {

 
  let url = window.LabServicebaseUrl+"/api/Print/GetCompleteTestResultForPrintBySubId?ResultPrintJson="+obj+"&clientId="+clientId
  
 
  
  let head = {'Content-Type':'application/json-patch+json', 'accept':'*/*',}
  let data = {};
  let response = await fetch(url, {
    method: 'GET',
    headers: head,
  }).then(res => res.json()).then(data)
  return response;
}
export default GetPrintTestResultBySubIdAndUserId;