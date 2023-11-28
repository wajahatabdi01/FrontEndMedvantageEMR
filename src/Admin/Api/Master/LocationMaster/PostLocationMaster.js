async function PostLocationMaster(data) {
    // let token = window.SuperAdminToken;
    let url = window.AppbaseUrl + '/api/LocationMaster/InsertLocation';
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
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
  export default PostLocationMaster;