async function PostRTHoldTypeMaster(data){
 
    const url = window.AppbaseUrl + '/api/RTHoldTypeMaster/InsertRTHoldTypeMaster';

    const head = {
        'Content-Type': 'application/json',
        accept: '*/*',
 
    }

    const response = await fetch(url,{
        headers:head,
        method:'POST',
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then(data)

    return response;
};

export default PostRTHoldTypeMaster;