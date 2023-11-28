async function PostLanguageConversionMaster(data) {
    let token ="bearer "+ window.AppToken;
  
      let url = window.AdminbaseUrl + '/api/LanguageConversionMaster/InsertLanguageConversionMaster';
      let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
        'Authorization': token,
  
      }
      let response =
        await fetch(url, {
          method: 'POST',
          headers: head,
          body: JSON.stringify(data)
        })
          .then((res) => res.json())
          .then(data)
        
    
      return response;
    }
    export default PostLanguageConversionMaster;