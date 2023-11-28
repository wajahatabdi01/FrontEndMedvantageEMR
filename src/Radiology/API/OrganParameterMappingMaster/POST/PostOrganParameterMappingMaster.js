async function PostOrganParameterMappingMaster(params) {
    let url=window.RadiologyservicesUrl+"/api/OrganParameterMapping/InsertOrgansParametrsMapping?parameterId="+params.parameterId+"&organId="+params.organId+"&userId="+params.userId
    let head = { 'Content-Type': 'application/JSON', accept: '*/*' }
    let data={}

    let response= await fetch(url,{
        headers:head,
        method:"POST"
    })

    .then((res)=>res.json())
    .then (data)

  return response
}

export default PostOrganParameterMappingMaster
