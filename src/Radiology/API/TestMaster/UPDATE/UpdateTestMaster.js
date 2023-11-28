
let UpdateTestMaster = async (data) =>{
    let url= window.RadiologyservicesUrl+"/api/TestMaster/UpdateTestMaster"
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let response= "";
    await fetch(url,{
        headers:head,
        method:"PUT",
        body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then(data => { response = data }).catch(error => { response = error })
  return response
}

export default UpdateTestMaster
