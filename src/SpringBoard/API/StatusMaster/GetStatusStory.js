async function GetStatusStory(data) {
    let url = window.SpringBoardServicesUrl+"api/StatusMaster/GetStatusStory";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetStatusStory;
