let GetTestResult = async () => {
  let url = window.BloodbaseUrl + 'api/TestResult/GetAllTestResult';
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*', }
  let data = {};
  let response = await fetch(url, {
    method : 'GET',
    headers: head,
  }).then(res => res.json()).then(data);
  return response;
}
export default GetTestResult;