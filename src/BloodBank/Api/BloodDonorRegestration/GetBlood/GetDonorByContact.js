let GetDonorByContact = async (countryCode, contact) => {
  
  let url = window.BloodbaseUrl + 'api/DonorRegistration/GetAllDonorByContact?countryCode='+countryCode+'&contactNumber='+contact;
  // let url = window.BloodbaseUrl + 'GetAllDonorByContact?contactNumber='+contact
  console.log('url, ', url);
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*'}
  let data = {};
  let response  = await fetch(url, {
    headers: head,
    method: 'GET',
    body: JSON.stringify()
  }).then((res) => res.json()).then(data);
  return response;
}
export default GetDonorByContact;