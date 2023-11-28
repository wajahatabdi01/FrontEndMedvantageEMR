import FileUpload from "../../../../Clinical/API/FileUpload";
async function PostPackageMaster(data) {
    let token ="bearer "+ window.SuperAdminToken;
    let url = window.AdminbaseUrl + '/api/PackageMaster/SavePackageMaster';
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
      'Authorization': token
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)

        let resp = FileUpload(data.imgUrl)
      
  
    return response;
  }
  export default PostPackageMaster;