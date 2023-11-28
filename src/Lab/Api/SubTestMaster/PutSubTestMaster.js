async function PutSubTestMaster(subTestName, remark,chemicalCompoundID,testtemplate,Id, userId) {

    let url = window.LabServicebaseUrl + `/api/AllMasters/UpdateSubtestMaster?subTestName=${subTestName}&remark=${remark}&chemicalCompoundID=${chemicalCompoundID}&testtemplate=${testtemplate}&UserId=${userId}&Id=${Id}`;
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
export default PutSubTestMaster;
