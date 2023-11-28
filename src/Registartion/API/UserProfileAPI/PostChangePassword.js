async function PostChangePassword(data) {
    let token = 'bearer ' + window.AppToken;
    let url = window.UserbaseUrl + `/api/Users/ChangePassword?userId=${data.userId}&oldPassword=${data.oldPassword}&password=${data.password}`;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
        'Authorization': token
    }
    let response =
        await fetch(url, {
            method: 'PUT',
            headers: head,
            body:JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(data)
    return response;
}
export default PostChangePassword;


// async function PostChangePassword(data) {
//     let token = 'bearer ' + window.AppToken;
//     let url = window.UserbaseUrl + `/api/Users/ChangePassword?userId=${data.userId}&oldPassword=${data.oldPassword}&password=${data.password}`;
//     let head = {
//         'Content-Type': 'application/JSON',
//         accept: '*/*',
//         'Authorization': token
//     }
//     let response =
//         await fetch(url, {
//             method: 'POST',
//             headers: head,
//             body:JSON.stringify(data)
//         })
//             .then((res) => res.json())
//             .then(data)
//     return response;
// }
// export default PostChangePassword;



