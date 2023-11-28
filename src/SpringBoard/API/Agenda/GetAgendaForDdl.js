async function GetAgendaForDdl(data) {
    let url = window.SpringBoardServicesUrl+"api/Agenda/GetAgendaForDdl";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetAgendaForDdl;