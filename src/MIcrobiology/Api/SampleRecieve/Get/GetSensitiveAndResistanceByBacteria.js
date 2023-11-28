async function GetSensitiveAndResistanceByBacteria(bacteriaID) {
  
  let url = window.AppbaseUrl+"/api/KnowMedApis/getSensitiveAndResistanceByBacteria?bacteriaId="+bacteriaID;

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default GetSensitiveAndResistanceByBacteria;
