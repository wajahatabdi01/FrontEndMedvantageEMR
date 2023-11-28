let GetElisaTestMaster = async () => 
{
  let url = window.BloodbaseUrl + 'api/BloodTestMaster/GetAllBloodTest';
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
  let data = {}
  let reponse = await fetch(url, {
    method: 'GET',
    headers: head,
  }).then(res => res.json()).then(data)
  return reponse;
}
export default GetElisaTestMaster