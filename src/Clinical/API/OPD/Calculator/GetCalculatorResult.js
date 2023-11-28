async function GetCalculatorResult(object) {


    let url = window.AppbaseUrl + `/api/Calculator/GetCalculatorResult?`;


    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'POST',
        body:JSON.stringify({
            id:object.calculatorId,
            UHID:object.UHID,
            parameterListJson:object.parameter
        })
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetCalculatorResult;