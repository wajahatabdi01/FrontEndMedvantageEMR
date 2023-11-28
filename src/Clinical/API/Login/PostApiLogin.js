async function PostApiLogin(data) {

  let url = window.UserbaseUrl + "/api/Users/UserLogin?userName=" + data.userName + '&password=' + data.password;
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
export default PostApiLogin;