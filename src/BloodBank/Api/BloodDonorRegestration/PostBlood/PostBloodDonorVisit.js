let PostBloodDonorVisit = async(dataObj) => {
  let url = window.BloodbaseUrl + 'api/VistDonor/InsertVistDonor';
  const head = {'Content-Type':'application/json-patch+json','accept':'*/*',}
  let data = {};
  let response = await fetch(url,{
    method:'POST',
    headers: head,
    body: JSON.stringify(dataObj)
  }).then(res => res.json()).then(data);
  return response;

}
export default PostBloodDonorVisit
