import { HubConnectionBuilder } from "@microsoft/signalr"

let CreateConnectionWithSignalR = (url) => {
    let connection = new HubConnectionBuilder().withUrl(url).withAutomaticReconnect().build()
    return connection
}

let StartConnectionWithSignalR = (connection, functionName, qury)=>{
    let result = connection.start(()=>{connection.invoke(functionName, "Helo")})
    return result
}

let CallSignalRFunctionAfterConnection = (connection, functionName) => {
    connection.on(functionName, (response) => {
        return response
     })
}

export default CreateConnectionWithSignalR;
export {CallSignalRFunctionAfterConnection, StartConnectionWithSignalR}