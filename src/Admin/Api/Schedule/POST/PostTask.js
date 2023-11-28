async function PostTask(data) {

    let url = window.NotificationUrl + '/api/NotificationLog';
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
  export default PostTask;