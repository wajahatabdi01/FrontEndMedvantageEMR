let PutBloodDonorRegistration = async(obj) => {
  let url = window.BloodbaseUrl + "api/DonorRegistration/UpdateDonor";
  const head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
  let data = {};
  let response = await fetch(url,{
    method:'PUT',
    headers:head,
    body:JSON.stringify(obj)
  }).then(res => res.json()).then(data);
  return response;
}
export default PutBloodDonorRegistration;