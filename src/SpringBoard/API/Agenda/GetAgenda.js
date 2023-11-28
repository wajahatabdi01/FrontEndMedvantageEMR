async function GetAgenda(data) {
    let url = window.SpringBoardServicesUrl+"api/Agenda/SelectAgenda";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetAgenda;