let GetDetailsByBagNo = async(Id) =>
{
  let url = window.BloodbaseUrl + 'api/GetDetailsByBag/GetDetails?bagSerialNumber='+Id;
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',}
  let data  = {};
  let response = await fetch(url, {
    method:'GET',
    headers: head,
    body: JSON.stringify()
  }).then(res => res.json()).then(data);
  return response;
}
export default GetDetailsByBagNo;