async function PostChatCornCall(data) {

    let url = `https://us-central1-corncall-e7067.cloudfunctions.net/api/api/generateWebAuthToken`;
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
  export default PostChatCornCall;