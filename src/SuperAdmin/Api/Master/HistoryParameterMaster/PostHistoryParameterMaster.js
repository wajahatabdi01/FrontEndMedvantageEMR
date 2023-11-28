async function PostHistoryParameterMaster(data) {
    // let token = window.SuperAdminToken;
    let url = window.AppbaseUrl + '/api/HistoryParameter/InsertHistoryParameterMaster';
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
      // 'Authorization': token
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
  export default PostHistoryParameterMaster;