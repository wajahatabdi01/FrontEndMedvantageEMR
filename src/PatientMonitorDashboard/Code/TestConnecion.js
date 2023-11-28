import React from 'react'
import { useEffect } from 'react'
import CreateConnectionWithSignalR, { CallSignalRFunctionAfterConnection, StartConnectionWithSignalR } from './ConnectionSingnalR'
import { useState } from 'react'

export default function TestConnecion() {
    let [connection, setConnection] = useState(null)

    useEffect(()=>{
        let url = ""
        let conn = CreateConnectionWithSignalR(url)
        setConnection(conn)
    }, [])

    useEffect(()=>{
        let result = StartConnectionWithSignalR(connection, "", "")
        let response = CallSignalRFunctionAfterConnection(connection, "");
    }, [connection])
  return (
    <div>
      
    </div>
  )
}
