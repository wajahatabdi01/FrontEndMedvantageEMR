
async function GetDepartmentByHead(wardId) {
    let url = window.AppbaseUrl + `/api/PatientRegistration/GetDepartmentByHead?HeadId=${wardId}`;
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
export default GetDepartmentByHead;

// https://localhost:7225/api/PatientRegistration/GetDepartmentByHead?HeadId=75



