async function GetWardDepartmentAssignById() {
    // http://182.156.200.178:7082/api/BedMaster/GetAllBed
    let department = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId
    let url = window.AppbaseUrl + "/api/WardDepartmentAssign/GetWardByDepartmentId?id=" + department;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetWardDepartmentAssignById;
