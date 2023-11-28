
async function DeleteLanguageHeadMaster(data) {

    let url = window.AdminbaseUrl + "/api/LangHeadMaster/DeleteHeadLang?Id="+data.id+"&userId="+window.userId;
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'DELETE',
        headers: head,
        // body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default DeleteLanguageHeadMaster;


