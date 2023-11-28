async function PostInvestigationNormalRange(data){
 
    const url = window.AppbaseUrl + '/api/InvestigationNormalRange/InsertInvestigationNormalRange';

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

export default PostInvestigationNormalRange;