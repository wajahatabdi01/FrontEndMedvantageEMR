let PostModeData = async (obj) => {
  //let url = 'https://localhost:7225/api/PatientLifeSupportAssign/InsertMode';
  let url = window.AppbaseUrl + '/api/PatientLifeSupportAssign/InsertMode'
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
  let data = {}
  let response = await fetch(url, {
    method : 'POST',
    headers: head,
    body: JSON.stringify(obj)
  }).then(res => res.json()).then(data)
  return response;
}
export default PostModeData;