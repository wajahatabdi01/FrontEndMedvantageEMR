async function GetMicrobiologySubtestTemplateBySubTestId(testId) {
  let url = window.LabServicebaseUrl+"/api/MicrobiologySubtestTemplate/MicrobiologySubTestByTestId?testId="+testId;

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default GetMicrobiologySubtestTemplateBySubTestId;
