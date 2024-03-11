
async function GetChiefComplaint (data) {
   
    let url =  window.AppbaseUrl+'/api/FHIREncounter/GetAllEncounters?Uhid=UHID00877&Issueid=1';
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
  export default GetChiefComplaint;
  