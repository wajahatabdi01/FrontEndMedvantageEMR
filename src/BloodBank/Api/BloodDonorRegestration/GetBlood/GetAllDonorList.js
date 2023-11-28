let GetAllDonorList = async () => {
  const url = window.BloodbaseUrl + "api/DonorRegistration/GetAllDonor";
  const head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
  let data = {};
  let response = await fetch(url,{
    method:'GET',
    header: head,
  }).then((res) => res.json()).then(data);
  return response;
}
export default GetAllDonorList;
