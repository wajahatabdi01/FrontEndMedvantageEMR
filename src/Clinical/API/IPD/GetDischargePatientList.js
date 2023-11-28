async function GetDischargePatientList(uhid) {
    let activeDeaprtment = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId
    let activeWard = JSON.parse(window.sessionStorage.getItem("activePage")).WardId
    let url = window.AppbaseUrl + `/api/AdmittedPatientList/GetDischargePatientList?headId=${activeWard}&departmentId=${activeDeaprtment}&UserId=${window.userId}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetDischargePatientList;