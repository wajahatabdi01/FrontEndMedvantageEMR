async function GetDiscussion(data) {
    let url = window.SpringBoardServicesUrl+"api/Discussion/SelectDiscussion";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetDiscussion;