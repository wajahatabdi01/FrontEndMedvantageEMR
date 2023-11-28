async function PutAPIAssignHeadDepartmentMaster(data) {
    // console.log("cscjsb")
    let url = window.AppbaseUrl + '/api/AssignHeadSubDepartment/UpdateAssignHeadSubDepartment';
  
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
        
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
export default PutAPIAssignHeadDepartmentMaster
