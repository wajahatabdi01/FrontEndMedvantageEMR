let GetDonorByDonorID = async (id) => {
  let url = window.BloodbaseUrl + 'api/DonorRegistration/GetAllDonorByDonorId?id='+id;
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',}
  let data = {};
  let response = await fetch(url, {
    headers: head,
    method: 'GET',
    body: JSON.stringify()
  }).then(res => res.json()).then(data);
  return response;

}
export default GetDonorByDonorID;