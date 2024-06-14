async function GetOAuthClients(data) {
  let url = window.UserbaseUrl+ '/api/Users/GetOAuthClients';
  let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
     
  }
  let response =
      await fetch(url, {
          method: 'GET',
          headers: head,
      })
          .then((res) => res.json())
          .then(data)


  return response;
}
export default GetOAuthClients;