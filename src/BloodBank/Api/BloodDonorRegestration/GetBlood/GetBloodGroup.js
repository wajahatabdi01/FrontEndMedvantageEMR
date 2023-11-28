let GetBloodGroup = async() => {
  const url =  window.BloodbaseUrl + "api/BloodGroup/GetAllBloodGroup";
  const head = {'content-type':'application/json','accept':'*/*',}
  let data = {};
  let response = await fetch(url,{
    method: "GET",
    header: head,

  }).then(res => res.json()).then(data);
  return response;
}
export default  GetBloodGroup;