
async function PostApplicationFeatureChecklistMaster(data) {
  // let token ='bearer '+ window.SuperAdminToken;
  let token = 'bearer ' + window.SuperAdminToken;
  console.log("token", token)
  let url = window.AdminbaseUrl + '/api/ApplicationFeatureChecklist/InsertApplicationFeatureChecklist';
  let head = {
    'Content-Type': 'application/JSON',
    accept: '*/*',
    'Authorization': token
  }
  let response =
    await fetch(url, {
      method: 'POST',
      headers: head,
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then(data)


  return response;
}
export default PostApplicationFeatureChecklistMaster;