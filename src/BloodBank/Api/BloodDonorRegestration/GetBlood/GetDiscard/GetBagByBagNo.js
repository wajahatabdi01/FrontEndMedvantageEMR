let GetBagByBagNo = async (bagNo) => {
  let url = window.BloodbaseUrl + 'api/GetBags/GetBagsBybagSerialNo?bagSerialNo='+bagNo;
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
  let data = {};
  let response = await fetch(url, {
    method: 'GET',
    headers: head,
    body : JSON.stringify(),
  }).then(res => res.json()).then(data)
  return response;
}
export default GetBagByBagNo;