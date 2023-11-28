async function GetParticipant(data) {
    let url = window.SpringBoardServicesUrl+"api/Participant/SelectParticipant";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetParticipant;