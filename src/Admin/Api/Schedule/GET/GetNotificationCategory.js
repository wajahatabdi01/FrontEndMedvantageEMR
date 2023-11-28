async function GetNotificationCategory(data) {
    let url = window.NotificationUrl+"/api/NotificationCategory/GetAllNotificationCategory";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetNotificationCategory;
