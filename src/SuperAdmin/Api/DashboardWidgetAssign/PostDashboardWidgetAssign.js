async function PostDashboardWidgetAssign(data){
    const token ="bearer "+ window.SuperAdminToken;
    const url = window.AdminbaseUrl + '/api/DashboardWidgetAssign/InsertDashboardWidgetAssign';

    const head = {
        'Content-Type': 'application/json',
        accept: '*/*',
        'Authorization' : token
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

export default PostDashboardWidgetAssign;