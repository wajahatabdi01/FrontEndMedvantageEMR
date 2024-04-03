async function GetFunctionAndCog(activeUHID, clientID, theEncounterId) {
  console.log("activeUHID", activeUHID)
  console.log("clientID", clientID)
  console.log("theEncounterId", theEncounterId)
  let url = window.AppbaseUrl + "/api/FHIRFormFunctionalCognitiveStatus/GetAllFHIRFormFunctionalCognitiveStatus?Uhid=" + activeUHID + "&ClientId=" + clientID + "&EncounterId=" + theEncounterId;
  let head = { "Content-Type": "application/JSON", accept: "*/*" }
  let data = {}
  let response = fetch(url, {
    headers: head,
    method: 'GET'
  }).then((res) => res.json()).then(data);
  return response;
}
export default GetFunctionAndCog;