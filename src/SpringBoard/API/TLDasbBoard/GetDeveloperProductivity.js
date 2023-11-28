
async function GetDeveloperProductivity() {
    let url = window.SpringBoardServicesUrl+"api/TLDashBoard/GetDeveloperProductivity";
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
    let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetDeveloperProductivity

