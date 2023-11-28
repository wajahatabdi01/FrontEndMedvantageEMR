async function PostVerifyOTP(data) {

    // let url = window.UserbaseUrl + "/api/Users/VerifyOtp?userName=" + data.userName  + '&otp=' + data.otp+'&UserId='+data.userId;
    let url = window.UserbaseUrl + `/api/Users/VerifyOtp?userName=${data.userName}&otp=${data.otp}`;
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
  export default PostVerifyOTP;

