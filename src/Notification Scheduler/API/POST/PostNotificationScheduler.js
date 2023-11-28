let PostNotificationScheduler = async(params)=>{
    let url = window.NotificationUrl + '/api/NotificationScheduleMaster';
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "POST",
        headers: head,
        body: JSON.stringify(params),
    }).then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
export default PostNotificationScheduler;