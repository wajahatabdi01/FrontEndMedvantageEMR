async function PostAppRegistrationForm(formData) {
    let url = "http://172.16.19.96:5089/Account/ClientRegistration";
    let head = {
   
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: formData  
      })
        .then((res) => res.json())
        .then(formData)
      
  
    return response;
  }
  export default PostAppRegistrationForm;