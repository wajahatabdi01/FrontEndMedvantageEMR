
async function GetOrganParameterMappingMaster(data) {
    let url= window.RadiologyservicesUrl+'/api/OrganParameterMapping/GetAllOrgansParametrsMapping'
    let head = { "Content-Type": "application/JSON", accept : '*/*' };

   let response=fetch(url,{
    headers:head,
    method:'GET'
   })
   .then((res)=>res.json())
   .then(data)

   return response;
}

export default GetOrganParameterMappingMaster
