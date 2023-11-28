
// headId=${activeWard}&departmentId=${activeDeaprtment}&UserId=${window.userId}
let   GetDieteticsPatientList = async(departmentId)=>{
    console.log(window,'ff');
    let activeWard = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
    // let activeDeaprtment = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId
    // let url = window.DietservicesUrl + `/api/AdmittedPatientList/GetAdmittedPatient?departmentId='+ departmentId+'&UserId='${window.userId}`;
    let url = window.AppbaseUrl + `/api/AdmittedPatientList/GetAdmittedPatient?departmentId=${departmentId}&UserId=${window.userId}&clientID=${window.clientId}&headId=${activeWard} `;


    console.log('foodId',url);
    let head = {"Content-Type": "application/JSON", 'accept' : '*/*' }
    let data={};
    let response =await fetch (url,{
        headers:head,
        method:'GET'
    })
    .then ((res)=>res.json())
    .then (data);
    return response;
}
export default GetDieteticsPatientList;