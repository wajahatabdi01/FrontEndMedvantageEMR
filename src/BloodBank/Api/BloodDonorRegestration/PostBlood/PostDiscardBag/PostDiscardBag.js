let PostDiscardBag = async(obj) =>
{
  console.log('to check : ', obj);
  let url = window.BloodbaseUrl+'api/DiscardBlood/InsertDiscard';
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
  let data = {};
  let response = await fetch(url,{
    method:'POST',
    headers: head,
    body: JSON.stringify(obj)
  }).then(res => res.json()).then(data);
  return response;
}
export default PostDiscardBag;