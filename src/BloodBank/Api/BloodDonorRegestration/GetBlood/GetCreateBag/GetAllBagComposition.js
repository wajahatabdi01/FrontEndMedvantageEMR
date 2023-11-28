let GetAllBagComposition = async() => {
  let url = window.BloodbaseUrl + 'api/BagComposition/GetAllBagComposition';
let head = {'Content-Type':'application/json-patch+json','accept':'*/*',}
let data = {};
let response = await fetch(url, {
  method:'GET',
  headers: head
}).then(res => res.json()).then(data);
return response;
}
export default GetAllBagComposition;