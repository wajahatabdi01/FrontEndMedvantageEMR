let PostTestOrganMaster = async(params)=>{
  let url =window.radiologyService+"/api/TestOrganMapping/InsertTestOrganMapping?testId="+params.testId+"&organId="+params.organId+"&userId="+params.userId
  let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
 let response=""
  await fetch(url,{
    method: "POST",
    headers: head,
    body: JSON.stringify(),
  }).then(res => res.json())
  .then(data => { response = data })
  .catch(error => { response = error })

  return response
}

export default PostTestOrganMaster;