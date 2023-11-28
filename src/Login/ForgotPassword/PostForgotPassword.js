    async function PostForgotPassword(data) {

    // let url = window.UserbaseUrl + "/api/Users/ForgotPassword?userName=" + data.userName  + '&newPassword=' + data.newPassword;
    let url = window.UserbaseUrl + `/api/Users/ForgotPassword?userName=${data.userName}&newPassword=${data.newPassword}`;

    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        // body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default PostForgotPassword;
