
async function DeleteLanguageConversionMaster(data) {

    let url = window.AdminbaseUrl + "/api/LanguageConversionMaster/DeleteLanguageConversionMaster?Id="+data.id+"&userId="+window.userId;
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
  export default DeleteLanguageConversionMaster;


