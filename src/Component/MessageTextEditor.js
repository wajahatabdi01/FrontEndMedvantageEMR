import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

export default function MessageTextEditor(props) {
    let [format, setFormat] = useState([
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'clean',
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ])
    let [module, setModule] = useState({
        toolbar: [
           
            ["color","link", "image", "align",'bold', 'italic',
              "bullet",]
        ]
    })

    let handleOnChange = (value)=>{
        props.getTextvalue({target:{
            value:value,
            id:props.id,
            name:props.name
        }})
    }
    
    return (
        <div name={props.name} id={props.id}>
            <ReactQuill value={props.setValue} formats={format} modules={module} onChange={handleOnChange} disabled/>
        </div>
    )
}
