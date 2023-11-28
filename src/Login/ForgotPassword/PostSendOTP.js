
async function PostSendOTP(data) {

    // let url = window.UserbaseUrl + "/api/Users/SendOtp?userName" + data.userName  + '&isForForgotPassword=' + data.isForForgotPassword;
    let url = window.UserbaseUrl + `/api/Users/SendOtp?userName=${data.userName}&isForForgotPassword=true`;
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
export default PostSendOTP;