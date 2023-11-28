let GetAllRelation = async () =>
{
  let url  = window.AdminbaseUrl + '/api/GuardianRelationMaster/GetAllGuardianRelationMaster';
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
  let data = {};
  let response = await fetch(url, {
    headers: head,
    method:'GET',
  }).then(res => res.json()).then(data);
  return response;
}
export default GetAllRelation;