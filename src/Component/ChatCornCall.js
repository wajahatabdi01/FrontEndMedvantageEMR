import React, { useState } from 'react'


export default function ChatCornCall() {
  let [chatBoxCornCall, setChatBoxCornCall] = useState(0);
  let [countryCode, setCountryCode] = useState("+91")
  let [cornCallUrl, setCornCornCall] = useState(window.sessionStorage.getItem("LoginData") ? JSON.parse(window.sessionStorage.getItem("LoginData")).userMobileNo : "");


  let btnOpenChatCornCall = () => {
    setChatBoxCornCall(1);
    // setCornCornCall('https://corncall-e7067.web.app/#/mobile=' + '+91' +
    // JSON.parse(window.sessionStorage.getItem("LoginData")).clientdata.mobileNo);
  }

  let btnCloseChatBoxCornCall = () => {
    setChatBoxCornCall(0)
  }
  return (
    <>
      {chatBoxCornCall == 1 ?
        <div className="chatBoxCornCall">
          <i className="bi bi-x-circle iconCloseChatBoxCornCall" title='Close Window' onClick={btnCloseChatBoxCornCall}></i>

          <div>
            {/* <iframe src={'https://corncall-e7067.web.app/#/mobile='+'+91'+cornCallUrl} style={{width:'100%', height:'100vh'}}></iframe> */}
            <iframe src={`https://corncall-e7067.web.app/#/mobile=${countryCode}${cornCallUrl}`} style={{ width: '100%', height: '69vh' }}></iframe>
          </div>

        </div>
        : ''}

      {/* <div className="chatbtnCornCall" title='Start Chat' onClick={btnOpenChatCornCall}> <i className="bi bi-chat-text"></i></div> */}

    </>
  )
}
