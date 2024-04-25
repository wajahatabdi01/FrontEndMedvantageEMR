async function GetTemplateByUserId(title, subTitle, userId, isShared, clientId) {
    let url = window.AppbaseUrl+"/api/NotesTemplateMaster/GetTemplateByUserId?tittle="+title+"&subTittle="+subTitle+"&userId="+userId+"&isShared="+isShared+"&clientId="+clientId;
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  let data ={}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetTemplateByUserId;
  