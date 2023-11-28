async function GetHeadDepartmentMappingByHeadId(id) {


    let url = window.AdminbaseUrl + `/api/HeadDepartmentMapping/GetHeadDepartmentMappingByHeadId?headId=${id}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*',};

    let response = await fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then();

    return response;
}
export default GetHeadDepartmentMappingByHeadId;

