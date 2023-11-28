export default async function GetUserChat(reciverId, groupId) {
    console.log("dsadas")
    let url = window.ChatingUrl + `/GetUserChat?sendFrom=${window.userId}&sendTo=${reciverId}&groupId=${groupId}`
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
    let responsonse = "";
    await fetch(url, {
        method: "GET",
        headers: head,
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
