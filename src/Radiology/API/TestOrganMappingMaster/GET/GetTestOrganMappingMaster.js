
async function GetTestOrganMappingMaster(data) {
    let url= window.RadiologyservicesUrl+'/api/TestOrganMapping/GetAllTestOrganMapping'
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

   let response=fetch(url,{
    headers:head,
    method:'GET'
   })
   .then((res)=>res.json())
   .then(data)

   return response;
}

export default GetTestOrganMappingMaster
