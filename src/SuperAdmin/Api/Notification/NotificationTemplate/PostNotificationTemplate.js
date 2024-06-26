async function PostNotificationTemplate(data) {
    // let token = window.SuperAdminToken;
    let url = window.NotificationUrl + '/api/NotificationTemplate/SaveNotificationTemplate';
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
  export default PostNotificationTemplate;