
async function PostEnergyMeter (data) {

    let url = window.BMSservicesUrl + "/api/EnergyMeter/InsertEnergyMeter";
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
  export default PostEnergyMeter;
  