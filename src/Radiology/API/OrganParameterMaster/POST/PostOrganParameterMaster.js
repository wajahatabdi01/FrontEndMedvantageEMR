async function PostOrganParameterMaster(params) {
  // let token = window.SuperAdminToken;
  let url = window.RadiologyservicesUrl + '/api/OrganParameterMaster/InsertTestName?unitId='+params.unitId+'&parameterName='+params.paramName+'&userId='+params.userID;
  let data={};
  let head = {
    'Content-Type': 'application/JSON',
    accept: '*/*',
    // 'Authorization': token
  }
  let response =
    await fetch(url, {
      method: 'POST',
      headers: head,
      body: JSON.stringify()
    })
      .then((res) => res.json())
      .then(data)
    

  return response;
}
export default PostOrganParameterMaster;