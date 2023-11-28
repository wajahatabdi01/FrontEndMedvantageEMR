async function PutAddUser(data) {
    let token ='bearer '+ window.AppToken;
    let url = window.UserbaseUrl + '/api/Users/UpdateUserRegistration';
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
        'Authorization': token
    }


    let response =
        await fetch(url, {
            method: 'PUT',
            headers: head,
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(data)

    return response;
}
export default PutAddUser