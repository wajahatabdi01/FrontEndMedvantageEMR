async function GetSequenceCodeGeneratorMaster(data) {
    let url = window.AppbaseUrl+"/api/SequenceCodeGeneratorMaster/GetAllSequenceCodeGeneratorMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetSequenceCodeGeneratorMaster;