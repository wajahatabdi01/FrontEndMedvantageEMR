async function GetStateMasterById(id) {
    let url =
    window.AdminbaseUrl+"/api/StateMaster/GetStateMasterByCountryId?id="+id;
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(id);
  
  return response;
  }
  export default GetStateMasterById;