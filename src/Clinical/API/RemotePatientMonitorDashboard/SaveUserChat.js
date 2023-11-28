export default async function SaveUserChat(patientId, msg) {
    console.log("ada")
    let data = new FormData()
    data.append("SendFrom", window.userId)
    data.append("SendTo", patientId)
    data.append("Message", msg)
    data.append("IsGroupChating", "false")
    data.append("GroupId", "0")
    data.append("MessageType", "1")
    data.append("IsContact", "false")
    data.append("IsPatient", "false")
  

   

    let url = window.ChatingUrl + `/SaveUserChat`;
    let head = { 'Content-Type': 'multipart/form-data', 'accept': '*/*', };

    let responsonse = "";
    await fetch(url, {
        method: "POST",
        // headers: head,
        body: data,
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse

}

