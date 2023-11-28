let DeleteBloodBag = async(obj) =>
{
  let url = window.BloodbaseUrl + 'api/CreateProducts/DeleteProducts';
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*'};
  let data = {};
  let response = await fetch(url, {
    method:'Delete',
    headers: head,
    body: JSON.stringify(obj),
  }).then(res => res.json()).then(data);
  return response;
}
export default DeleteBloodBag;