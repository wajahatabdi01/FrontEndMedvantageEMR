// async function GetViewCCDAData(uhid) {
//   console.log('hhggdf : ', uhid)
//   let url = "https://localhost:5001/api/AdmissionSuggestion/GenerateCCDA?pid="+uhid;
//   let head = {"Content-Type":"application/JSON", accept : "*/*"}
//   let data = {}
//   let response = fetch(url, {
//     headers: head,
//     method : 'GET'
// }).then((res) => res.json()).then(data);
// return response;  
// }
// export default GetViewCCDAData;

async function GetViewCCDAData(uhid) {
  try {
      let url = "https://localhost:5001/api/AdmissionSuggestion/GenerateCCDA?pid=" + uhid;
      let head = {"Content-Type": "application/JSON", accept: "*/*"};
      let response = await fetch(url, {
          headers: head,
          method: 'POST'
      });
      
      // if (!response.ok) {
        
      //   throw new Error('Failed to fetch CCDA data');
      // }
      // Assuming you want to return the HTML content as a string
      let data = await response.text();
      
      return data;
  } catch (error) {
      console.error('Error fetching CCDA data:', error);
      throw error;
  }
}

export default GetViewCCDAData;
