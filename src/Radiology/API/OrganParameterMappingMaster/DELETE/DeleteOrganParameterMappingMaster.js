
 async function DeleteOrganParameterMappingMaster(key,data,error) {
    let url= window.RadiologyservicesUrl+"/api/OrganParameterMapping/DeleteOrgansParametrsMapping?id="+key
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };

    let response= await fetch(url,{
        headers:head,
        method:"DELETE"
    })
    .then((res)=>res.json())
    .then(data)
    .catch(error)
  return response
}

export default DeleteOrganParameterMappingMaster
