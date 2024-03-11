
async function GetFHIRMessage(param) {
    let url = window.AppbaseUrl + `/api/FHIRMessage/GetMessage?Uhid=${param.Uhid}&ClientId=${param.ClientId}`;
    const headers = { "Content-Type": "application/JSON", accept: '*/*' };

    try {
        const response = await fetch(url, { headers, method: 'GET' });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return { status: 1, responseValue: data };
    } catch (error) {
        console.error("Error fetching FHIR message:", error);
        return { status: 0, responseValue: "Error fetching FHIR message" };
    }
}

export default GetFHIRMessage;