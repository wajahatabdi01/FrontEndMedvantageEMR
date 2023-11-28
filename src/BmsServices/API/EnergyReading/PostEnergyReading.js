
async function PostEnergyReading (data) {

    let url = window.BMSservicesUrl + "/api/EnergyReading/InsertEnergyReading";
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default PostEnergyReading;
  