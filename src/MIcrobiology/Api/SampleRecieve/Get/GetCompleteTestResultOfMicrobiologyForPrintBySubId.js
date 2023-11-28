async function GetCompleteTestResultOfMicrobiologyForPrintBySubId(sampleCollectionJson, cultureTypeID,clientId) {
  let url = window.LabServicebaseUrl+"/api/Print/GetCompleteTestResultOfMicrobiologyForPrintBySubId?ResultPrintJson="+sampleCollectionJson+"&isCultureTypeId="+cultureTypeID+"&clientId="+clientId;

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default GetCompleteTestResultOfMicrobiologyForPrintBySubId;
