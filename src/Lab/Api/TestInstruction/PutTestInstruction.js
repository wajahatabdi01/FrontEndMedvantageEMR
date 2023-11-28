async function PutTestInstruction(instructions, Id, userId) {

  let url = window.LabServicebaseUrl + `/api/AllMasters/UpdateTestInstruction?instructions=${instructions}&UserId=${userId}&Id=${Id}`;
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
export default PutTestInstruction;
