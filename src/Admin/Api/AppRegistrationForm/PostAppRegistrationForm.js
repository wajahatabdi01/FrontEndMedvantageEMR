async function PostAppRegistrationForm(formData) {
  let url = "https://onc.medvantage.tech:4001/Account/ClientRegistration";
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