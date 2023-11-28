async function SprintStoryAssign(userId) {
    let url = window.SpringBoardServicesUrl+"api/SprintStoryAssign/GetAllSprintStoryAssign?UserID="+userId;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default SprintStoryAssign;