async function PutHeadMaster(data) {
    console.log("cscjsb")
    let url = window.AdminbaseUrl + '/api/HeadMaster/UpdateHead';
    let token = 'bearer ' + window.SuperAdminToken;
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
export default PutHeadMaster