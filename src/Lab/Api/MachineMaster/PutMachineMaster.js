async function PutMachineMaster(machineName, remark, Id) {

    let url = window.LabServicebaseUrl + `/api/AllMasters/UpdateMachineMaster?machineName=${machineName}&remark=${remark}&UserId=${window.userId}&Id=${Id}`;
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
export default PutMachineMaster;
