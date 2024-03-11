
async function GetPatientData (data) {
   
  
      let url = window.AppbaseUrl + '/api/FHIRDemographicData/GetPatientDemographicDataByPid?Uhid=UHID00877';
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
    export default GetPatientData;
    