import React, { useEffect } from 'react'

export default function AlertToster(props) {
    // function showToaster(msg) {
    //     // alert();
    //     let toast = document.createElement("div");
    //     toast.classList.add("toastClass");
    //     toast.innerHTML = msg;
    //     toastBox.appendChild(toast);

    //     if (msg.includes("error")) {
    //         toast.classList.add("error");
    //     }
    //     if (msg.includes("Invalid")) {
    //         toast.classList.add("Invalid");
    //     }


    // }

    useEffect(() => {
        setTimeout(() => {
            props.handle(0)
        }, 6000);

    }, [])
    return (
        <div id="toastBox" style={{ zIndex: "999999999999999" }}>
            <div className='toastClass error'>

                <i className="bi bi-bookmark-x-fill" onClick={() => { props.handle(0) }}></i> {props.message}
            </div>
        </div>
    )
}
