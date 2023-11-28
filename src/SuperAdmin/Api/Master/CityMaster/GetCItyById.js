async function GetCItyById(id) {
    let url =
    window.AdminbaseUrl+"/api/CityMaster/GetCityMasterByStateId?id="+id;
    

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(id);
  
  return response;
  }
  export default GetCItyById;