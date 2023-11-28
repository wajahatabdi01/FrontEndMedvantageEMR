async function GetMicrobiologyTestResultForValidation(testID,sampleCollectionSubId,cultureTypeId,clientId) {
  let url = window.LabServicebaseUrl+"/api/MicrobiologyResultValidation/GetMicrobiologyTestResultForValidation?testId="+testID+"&sampleCollectionSubId="+sampleCollectionSubId+"&cultureTypeId="+cultureTypeId+"&clientId="+clientId;

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default GetMicrobiologyTestResultForValidation;
