async function GetUserDetailsById(id) {
    let url =
    window.UserbaseUrl+"/api/Users/GetUserDetailsById?Id="+id;
    

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(id);
  
  return response;
  }
  export default GetUserDetailsById;