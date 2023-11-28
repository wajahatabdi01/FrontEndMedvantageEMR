async function PostHeadMaster(data) {
    let token = 'bearer ' + window.SuperAdminToken;
    console.log("token", token)
    let url = window.AdminbaseUrl + '/api/HeadMaster/InsertHead';
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
      'Authorization': token
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default PostHeadMaster;
  
  