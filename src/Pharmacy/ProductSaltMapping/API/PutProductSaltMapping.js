

async function PutProductSaltMapping(data) {
    let url = window.PharmacyServicesUrl + '/api/ProductSaltMapping/UpdateSalt';
    
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
        // 'Authorization': token
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
  export default PutProductSaltMapping
  
  
  