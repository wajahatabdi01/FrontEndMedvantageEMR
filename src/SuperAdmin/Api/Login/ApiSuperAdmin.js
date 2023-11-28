export default async function SuperLoginPost(loginForm){

    let url=window.AdminbaseUrl+"/api/UserMaster/Login?email="+loginForm.email+ '&password='+loginForm.password;
    let head={ 'Content-Type': 'application/json', 'accept': '*/*', };
    let data=loginForm;
   
    let response =await fetch(url, {
        method : 'GET',
        headers : head,
    })
    .then(res=>res.json())
    .then(data)
    return response

}
