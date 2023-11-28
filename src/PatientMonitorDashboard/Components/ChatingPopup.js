import React, { useEffect, useState } from 'react'
import chat from '../../assets/images/patientmonitordashboard/chat.png'
import GetUserChat from '../../Clinical/API/RemotePatientMonitorDashboard/GetUserChat'
import SaveUserChat from '../../Clinical/API/RemotePatientMonitorDashboard/SaveUserChat'
import { HubConnectionBuilder } from '@microsoft/signalr'

export default function ChatingPopup(props) {

    let [getUserChat, setGetUserChat] = useState([])
    let [message, setMessage] = useState("")

    let [connection, setConnection] = useState()
    let getData = async () => {
        console.log("patientdata", props.patientdata)
        let responsonse = await GetUserChat(props.patientdata.PId, 0)
        if (responsonse.status === 1) {
            setGetUserChat(responsonse.responseValue.reverse())
            console.log("responsonse.responseValue", responsonse.responseValue)
        }
    }

    let handleSendChat = async () => {
        console.log("enter")
        let response = await SaveUserChat(props.patientdata.PId, message)
        if (response.status === 1) {
            console.log("response", response)
            document.getElementById("chattext").value = ""
            getData()
        }
    }
    useEffect(() => {
        try {
            const connection = new HubConnectionBuilder().withUrl("https://demo.medvantage.tech:7100/ChatHubService", 4).build();
            setConnection(connection)
            connection.start().then((result) => {
                console.log("result", result)
                let clientData = JSON.parse(sessionStorage.getItem("LoginData"));
                let clientId = clientData.clientId;
                // var userId = clientData.userId;
                connection.invoke("AddUser", clientId, window.userId).then(function (response) {
                    console.log("adduser", response)
                    connection.on("ReceiveMessage", (response) => {
                        console.log("getMSgsssss", response)
                        getData()
                        // setGetUserChat([...getUserChat, ...response])

                    })
                    connection.on("OnlineUser", (response) => {
                        console.log("getMSg", response)
                        // setGetUserChat([...getUserChat, ...response])
                    })
                })
            })
        }
        catch (e) {
            console.log(e.message)
        }

    }, [])

    let dumy = [
        {
            sendFrom: 199,
            chatTime: "16:50",
            message: "hello"
        },
        {
            sendFrom: 250,
            chatTime: "16:50",
            message: "bye"
        },
        {
            sendFrom: 199,
            chatTime: "16:50",
            message: "hi"
        }
    ]

    useEffect(() => {

    }, [connection])

    let handleEnterMsg = (e) => {
        if(e.keyCode === 13)
        {
            handleSendChat()
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className={`modal d-${props.ShowChatPopup === 0 ? 'none' : 'block'}`}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content p-0">
                        {/* <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white d-flex column-gap-1 py-1 px-2" id="exampleModalLabel">
                                <img src={chat} alt="ADR Report" title='ADR Report' style={{ width: '25px', height: '25px' }} />&nbsp;
                                <label htmlFor="">Chating</label>
                            </h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className="bi bi-x-octagon"></i></button>
                        </div> */}

                        <span className="closee" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>                        
                        <div className='p-profile'>
                        <div className='p-profile-h'><i className="bi bi-chat-dots"></i> Chating</div>
                            <div className='p-profile-h'>
                            <div className='pname'><span>{props.patientdata.UhId}</span></div>
                            <div className='pname'>- {props.patientdata.PntName}</div> 
                        </div>
                        </div>

                        <div className="modal-body p-2">
                            {/* <div className="row"> */}
                            <div className='chattingSection px-3'>
                                {
                                    getUserChat && getUserChat.map((val, ind) => {
                                        return (
                                            <div className='row'>
                                                {
                                                    val.sendFrom === window.userId ?
                                                        <div className="chatMe" title='Incoming from there.'>
                                                            <div className="time">{val.chatTime}</div>
                                                            <div className="chat"><span>{val.message}  </span></div>
                                                        </div> :
                                                        <div className="chatYou" title='Incoming from there.'>
                                                            <div className="time">{val.chatTime}</div>
                                                            <div className="chat"><span>{val.message}  </span></div>
                                                        </div>
                                                }




                                            </div>
                                        )
                                    })
                                 
                                }

                            </div>
                            <div className="inputWriteSection px-3 mt-1">
                                <div className="inputWriteSectionInnerItems">
                                    <textarea name="" id="chattext" rows="1" placeholder='Start Chat...' title='Write as you want...' onChange={(e) => { setMessage(e.target.value) }} onKeyUp={(e) => { handleEnterMsg(e) }}></textarea>
                                    <button title='Send'><i className="bi bi-send-fill" onClick={handleSendChat}></i></button>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

