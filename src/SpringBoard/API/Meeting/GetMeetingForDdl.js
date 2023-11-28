async function GetMeetingForDdl(data) {
    let url = window.SpringBoardServicesUrl+"api/Meeting/GetMeetingForDdl";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetMeetingForDdl;