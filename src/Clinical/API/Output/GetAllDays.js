async function GetAllDays(data) {
    // let url = "http://172.16.61.31:7083/api/DepartmentMaster/GetAllDepartmentMaster";
    let url = window.AppbaseUrl + "/api/DayMaster/GetAllDay";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };


    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetAllDays;