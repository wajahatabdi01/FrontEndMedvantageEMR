let GetAllUsers = async(key)=>{
    let url = window.UserbaseUrl + "/api/Users/GetUserListByDepartmentId?departmentId="+key;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let response = "";
    await fetch(url, {
        method: "GET",
        headers: head,
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => { response = data })
        .catch(error => { response = error })


    return response
}
export default GetAllUsers;