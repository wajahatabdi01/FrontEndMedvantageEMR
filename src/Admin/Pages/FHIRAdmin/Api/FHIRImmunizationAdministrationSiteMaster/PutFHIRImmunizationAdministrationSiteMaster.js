async function PutFHIRImmunizationAdministrationSiteMaster (data) {
    let url = window.AppbaseUrl+"/api/FHIRImmunizationAdministrationSiteMaster/UpdateFHIRImmunizationAdministrationSite";
      let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
      }
      let response =
        await fetch(url, {
          method: 'PUT',
          headers: head,
          body: JSON.stringify(data)
        })
          .then((res) => res.json())
          .then(data)
    
      return response;
    }
    export default PutFHIRImmunizationAdministrationSiteMaster;

   
   
    