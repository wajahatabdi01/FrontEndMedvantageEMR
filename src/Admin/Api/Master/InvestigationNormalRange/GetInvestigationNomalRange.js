async function GetInvestigationNomalRange() {
    let url = window.AppbaseUrl+"/api/InvestigationNormalRange/GetAllInvestigationNormalRange";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = await fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then();
  
  return response;
  }
  export default GetInvestigationNomalRange;