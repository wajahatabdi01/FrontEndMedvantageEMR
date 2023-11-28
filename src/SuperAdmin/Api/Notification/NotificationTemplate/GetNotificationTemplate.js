async function GetNotificationTemplate(data) {
    let url = window.NotificationUrl+"/api/NotificationTemplate/GetAllNotificationTemplate";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetNotificationTemplate;