async function GetMenuByHeadId(data) {
    let token = 'bearer ' + window.AppToken;
    let url = window.AdminbaseUrl+ '/api/MenuMaster/GetMenuByHeadId?id='+data;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
       
    }
    let response =
        await fetch(url, {
            method: 'GET',
            headers: head,
        })
            .then((res) => res.json())
            .then(data)


    return response;
}
export default GetMenuByHeadId;