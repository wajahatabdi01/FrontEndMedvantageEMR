async function GetFHIRReligionMaster (data) {
    let url = window.AppbaseUrl+"/api/FHIRReligionMaster/GetAllReligionData";
      let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
      }
      let response =
        await fetch(url, {
          method: 'GET',
          headers: head,
          body: JSON.stringify(data)
        })
          .then((res) => res.json())
          .then(data)
    
      return response;
    }
    export default GetFHIRReligionMaster;

   
   
    