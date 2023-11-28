export default async function  GetExaminationSubCategoryParameterAssignById(id) {
    let url = window.AppbaseUrl + `/api/ExaminationSubCategoryParameterAssign/GetExaminationSubCategoryParameterAssignById?id=${id}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
