async function PutTestMaster(TestName, CategoryId, subCategoryId, SampleId, ItemId, InstructionId, Id,userId) {

  let url = window.LabServicebaseUrl + `/api/AllMasters/UpdateTestName?TestName=${TestName}&CategoryId=${CategoryId}&SampleId=${SampleId}&ItemId=${ItemId}&InstructionId=${InstructionId}&UserId=${userId}&Id=${Id}&subCategoryId=${subCategoryId}`;

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
export default PutTestMaster;
