async function PutTestSubTestMapping(testId, subTestId, Id, userId) {

    let url = window.LabServicebaseUrl + ` /api/AllMasters/Updatetestsubtestmapping?testId=${testId}&subTestId=${subTestId}&UserId=${userId}&Id=${Id}`;
    let head = {
        "Content-Type": "application/JSON",
        accept: "*/*",
    };

    let response = await fetch(url, {
        method: "PUT",
        headers: head,
        // body: JSON.stringify(data),
    })
        .then((res) => res.json())
    // .then(data);

    return response;
}
export default PutTestSubTestMapping;
