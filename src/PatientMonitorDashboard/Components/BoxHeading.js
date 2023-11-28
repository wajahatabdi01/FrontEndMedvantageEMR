import React from 'react'

export default function BoxHeading(props) {
    return (
        <div className='d-flex flex-row justify-content-between boxheading'>
            <label className=" fs-6 p-1 " >{props.title}</label>
            <div className='d-flex flex-row gap-5 pe-5'>
                <label className=" fs-5 p-2 ps-3" >{props.patientName}</label>
                <label className=" fs-5 p-2 ps-3" >{props.uhid}</label>
            </div>
        </div>
    )
}
