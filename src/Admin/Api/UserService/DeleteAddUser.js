async function DeleteAddUser(id) {
    let token ='bearer '+ window.AppToken;
    let url = window.UserbaseUrl + "/api/Users/DeleteUserRegistration?Id="+id;
    let head = {
        "Content-Type": "application/JSON",
        accept: "*/*",
        'Authorization': token,

    };
    let data = {};
    let response =
        await fetch(url, {
            headers: head,
            method: "POST",
            // body:JSON.stringify(senddata)
        }).then((res) => res.json()).then(data)
    return response;
}
export default DeleteAddUser;
