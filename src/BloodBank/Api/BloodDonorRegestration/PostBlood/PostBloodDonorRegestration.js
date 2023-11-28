let PostBloodDonorRegistration = async(dataObj) => {
  let url = window.BloodbaseUrl + "api/DonorRegistration/InsertDonor";
  
  const head = {'content-Type': 'application/json-patch+json','accept':'*/*',};
  let data = {};
  let response = await fetch(url,{
    method:'POST',
    headers:head,
    body:JSON.stringify(dataObj)
  }).then((res)=>res.json()).then(data);
  return response;
} 
export default PostBloodDonorRegistration;  