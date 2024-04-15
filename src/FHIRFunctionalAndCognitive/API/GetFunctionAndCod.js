async function GetFunctionAndCog(activeUHID, clientID, theEncounterId) {
  let url = window.AppbaseUrl + "/api/EMRFormFunctionalCognitiveStatus/GetAllFHIRFormFunctionalCognitiveStatus?Uhid=" + activeUHID + "&ClientId=" + clientID + "&EncounterId=" + theEncounterId;
  let head = { "Content-Type": "application/JSON", accept: "*/*" }
  let data = {}
  let response = fetch(url, {
    headers: head,
    method: 'GET'
  }).then((res) => res.json()).then(data);
  return response;
}
export default GetFunctionAndCog;